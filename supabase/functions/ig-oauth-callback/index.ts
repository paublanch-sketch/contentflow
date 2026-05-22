// supabase/functions/ig-oauth-callback/index.ts
// Instagram Login API (sub-app 972574845424224): code → short token → long token → username

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const META_APP_ID     = Deno.env.get('META_APP_ID')!;
const META_APP_SECRET = Deno.env.get('META_APP_SECRET')!;

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { code, client_id, redirect_uri } = await req.json();
    console.log('[START]', { client_id, code: code?.slice(0,20)+'...' });
    console.log('META_APP_ID:', META_APP_ID, '| SECRET present:', !!META_APP_SECRET);
    if (!code || !client_id) throw new Error('code y client_id requeridos');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // ── 1. code → short-lived token (1h) via Instagram Login API ────────────────
    const body = new URLSearchParams({
      client_id:     META_APP_ID,
      client_secret: META_APP_SECRET,
      grant_type:    'authorization_code',
      redirect_uri,
      code,
    });

    const shortRes = await fetch('https://api.instagram.com/oauth/access_token', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const shortRaw = await shortRes.text();
    console.log('[Step 1] status:', shortRes.status, '| body:', shortRaw);

    let shortData: any;
    try { shortData = JSON.parse(shortRaw); } catch { throw new Error(`Parse: ${shortRaw}`); }
    if (shortData.error_type || shortData.error) {
      throw new Error(shortData.error_message || shortData.error?.message || JSON.stringify(shortData));
    }
    const shortToken = shortData.access_token;
    const igUserId   = String(shortData.user_id);
    // La nueva Instagram Login for Business API devuelve tokens ya long-lived (60 días)
    // El endpoint graph.instagram.com/access_token es de la antigua Basic Display API → no aplica
    const longToken   = shortToken;
    const expiresInMs = 5184000 * 1000; // 60 días por defecto
    console.log('[Step 1] ✓ user_id:', igUserId, '| token long-lived directo');

    // ── 2. Obtener username vía Instagram Login API ─────────────────────────────
    // Los tokens IGAAN... usan api.instagram.com, no graph.instagram.com
    let igUsername = igUserId;
    let igUserIdReal = igUserId;
    try {
      // Intento 1: api.instagram.com (misma base que el token exchange)
      const userRes1 = await fetch(
        `https://api.instagram.com/v1.0/me?fields=id,username&access_token=${longToken}`
      );
      const userData1 = await userRes1.json();
      console.log('[Step 2a] api.instagram.com:', JSON.stringify(userData1));
      if (!userData1.error && userData1.username) {
        igUsername = userData1.username;
        igUserIdReal = String(userData1.id || igUserId);
      } else {
        // Intento 2: graph.instagram.com con user_id en path
        const userRes2 = await fetch(
          `https://graph.instagram.com/${igUserId}?fields=username,name&access_token=${longToken}`
        );
        const userData2 = await userRes2.json();
        console.log('[Step 2b] graph por id:', JSON.stringify(userData2));
        if (!userData2.error) {
          igUsername = userData2.username || userData2.name || igUserId;
          igUserIdReal = String(userData2.id || igUserId);
        }
      }
    } catch(e: any) {
      console.log('[Step 2] fetch error:', e.message, '— usando user_id como username');
    }
    console.log('[Step 2] ✓ ig_user_id:', igUserIdReal, 'username:', igUsername);

    // ── 4. Guardar en Supabase (misma estrategia que clientes: upsert con onConflict) ──
    const { error: upsertErr } = await sb.from('ig_tokens').upsert({
      client_id,
      ig_user_id:   igUserIdReal,
      ig_username:  igUsername,
      access_token: longToken,
      expires_at:   new Date(Date.now() + expiresInMs).toISOString(),
      updated_at:   new Date().toISOString(),
    }, { onConflict: 'client_id' });
    if (upsertErr) throw new Error(`BD: ${upsertErr.message}`);

    console.log('[SUCCESS]', igUsername);
    return new Response(
      JSON.stringify({ success: true, ig_username: igUsername, ig_user_id: igUserId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('[ERROR]', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
