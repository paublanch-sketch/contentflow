// supabase/functions/ig-oauth-callback/index.ts
// Instagram Login API: code → short token → long-lived token → guardar en ig_tokens

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const IG_APP_ID            = Deno.env.get('INSTAGRAM_APP_ID') || '972574845424224';
const IG_APP_SECRET        = Deno.env.get('INSTAGRAM_APP_SECRET')!;

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { code, client_id, redirect_uri } = await req.json();

    console.log('[ig-oauth-callback] START', { client_id, redirect_uri, code: code?.slice(0,20)+'...' });
    console.log('[ig-oauth-callback] IG_APP_ID:', IG_APP_ID);
    console.log('[ig-oauth-callback] IG_APP_SECRET present:', !!IG_APP_SECRET);

    if (!code || !client_id) throw new Error('code y client_id requeridos');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // ── 1. Código → Token corto (1 hora) ────────────────────────────────────────
    const tokenBody = new URLSearchParams({
      client_id:     IG_APP_ID,
      client_secret: IG_APP_SECRET,
      grant_type:    'authorization_code',
      redirect_uri:  redirect_uri,
      code:          code,
    });

    console.log('[Step 1] Exchanging code for short-lived IG token...');
    console.log('[Step 1] redirect_uri used:', redirect_uri);

    const shortRes = await fetch('https://api.instagram.com/oauth/access_token', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    tokenBody,
    });
    const shortRaw = await shortRes.text();
    console.log('[Step 1] Response status:', shortRes.status);
    console.log('[Step 1] Response body:', shortRaw);

    let shortData: any;
    try { shortData = JSON.parse(shortRaw); } catch { throw new Error(`IG token parse error: ${shortRaw}`); }
    if (shortData.error_type || shortData.error) {
      throw new Error(`Token corto IG: ${shortData.error_message || shortData.error?.message || JSON.stringify(shortData)}`);
    }

    const shortToken = shortData.access_token;
    const igUserId   = String(shortData.user_id);
    console.log('[Step 1] ✓ short token, user_id:', igUserId);

    // ── 2. Token corto → Token largo (60 días) ──────────────────────────────────
    const longUrl = `https://graph.instagram.com/access_token` +
      `?grant_type=ig_exchange_token` +
      `&client_id=${IG_APP_ID}` +
      `&client_secret=${IG_APP_SECRET}` +
      `&access_token=${shortToken}`;

    console.log('[Step 2] Exchanging for long-lived token...');
    const longRes = await fetch(longUrl);
    const longRaw = await longRes.text();
    console.log('[Step 2] Response status:', longRes.status);
    console.log('[Step 2] Response body:', longRaw);

    let longData: any;
    try { longData = JSON.parse(longRaw); } catch { throw new Error(`Long token parse: ${longRaw}`); }
    if (longData.error) throw new Error(`Token largo IG: ${longData.error.message}`);

    const longToken   = longData.access_token;
    const expiresInMs = (longData.expires_in || 5184000) * 1000;
    console.log('[Step 2] ✓ long-lived token, expires_in:', longData.expires_in, 's');

    // ── 3. Obtener username ──────────────────────────────────────────────────────
    const userRes  = await fetch(
      `https://graph.instagram.com/me?fields=id,username,name&access_token=${longToken}`
    );
    const userData = await userRes.json();
    console.log('[Step 3] User data:', JSON.stringify(userData));
    if (userData.error) throw new Error(`Perfil IG: ${userData.error.message}`);
    const igUsername = userData.username || userData.name || igUserId;

    // ── 4. Guardar en Supabase ───────────────────────────────────────────────────
    const { error: upsertErr } = await sb.from('ig_tokens').upsert({
      client_id,
      ig_user_id:   igUserId,
      ig_username:  igUsername,
      access_token: longToken,
      expires_at:   new Date(Date.now() + expiresInMs).toISOString(),
      updated_at:   new Date().toISOString(),
    });
    if (upsertErr) throw new Error(`Guardando en BD: ${upsertErr.message}`);

    console.log('[SUCCESS] Saved ig_tokens for', igUsername);

    return new Response(
      JSON.stringify({ success: true, ig_username: igUsername, ig_user_id: igUserId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('[ig-oauth-callback] ERROR:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
