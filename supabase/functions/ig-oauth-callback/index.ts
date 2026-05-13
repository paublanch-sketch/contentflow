// supabase/functions/ig-oauth-callback/index.ts
// Facebook Graph API: code → User Token → Long Token → IG Business Account → ig_tokens

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const META_APP_ID          = Deno.env.get('META_APP_ID')!;
const META_APP_SECRET      = Deno.env.get('META_APP_SECRET')!;

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { code, client_id, redirect_uri } = await req.json();
    console.log('[START]', { client_id, redirect_uri, code: code?.slice(0,20)+'...' });
    console.log('META_APP_ID:', META_APP_ID, '| SECRET present:', !!META_APP_SECRET);
    if (!code || !client_id) throw new Error('code y client_id requeridos');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // ── 1. code → short-lived User Token ────────────────────────────────────────
    const shortUrl = `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
      `&code=${code}`;

    const shortRes = await fetch(shortUrl);
    const shortRaw = await shortRes.text();
    console.log('[Step 1] status:', shortRes.status, 'body:', shortRaw);

    let shortData: any;
    try { shortData = JSON.parse(shortRaw); } catch { throw new Error(`Parse step1: ${shortRaw}`); }
    if (shortData.error) throw new Error(`Token corto: ${shortData.error.message}`);
    const shortToken = shortData.access_token;

    // ── 2. short token → long-lived User Token (60 días) ────────────────────────
    const longUrl = `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?grant_type=fb_exchange_token` +
      `&client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&fb_exchange_token=${shortToken}`;

    const longRes = await fetch(longUrl);
    const longRaw = await longRes.text();
    console.log('[Step 2] status:', longRes.status, 'body:', longRaw);

    let longData: any;
    try { longData = JSON.parse(longRaw); } catch { throw new Error(`Parse step2: ${longRaw}`); }
    if (longData.error) throw new Error(`Token largo: ${longData.error.message}`);
    const longToken   = longData.access_token;
    const expiresInMs = (longData.expires_in || 5184000) * 1000;

    // ── 3. Obtener páginas FB con Instagram Business Account ─────────────────────
    const pagesUrl = `https://graph.facebook.com/v21.0/me/accounts` +
      `?fields=id,name,access_token,instagram_business_account{id,username,name}` +
      `&access_token=${longToken}`;

    const pagesRes = await fetch(pagesUrl);
    const pagesRaw = await pagesRes.text();
    console.log('[Step 3] status:', pagesRes.status, 'body:', pagesRaw);

    let pagesData: any;
    try { pagesData = JSON.parse(pagesRaw); } catch { throw new Error(`Parse step3: ${pagesRaw}`); }
    if (pagesData.error) throw new Error(`Páginas FB: ${pagesData.error.message}`);

    const pages = pagesData.data || [];
    const pageWithIG = pages.find((p: any) => p.instagram_business_account?.id);

    let igUserId: string;
    let igUsername: string;
    let accessToken: string;

    if (pageWithIG) {
      // Cuenta Business vinculada a página FB
      igUserId   = pageWithIG.instagram_business_account.id;
      igUsername = pageWithIG.instagram_business_account.username ||
                   pageWithIG.instagram_business_account.name || igUserId;
      accessToken = pageWithIG.access_token; // Page Token (no caduca)
      console.log('[Step 3] Found via FB Page:', igUsername, igUserId);
    } else {
      // Fallback: buscar IG en el propio usuario (Creator accounts)
      const meRes  = await fetch(
        `https://graph.facebook.com/v21.0/me?fields=id,name,instagram_business_account{id,username,name}&access_token=${longToken}`
      );
      const meData = await meRes.json();
      console.log('[Step 3b] me:', JSON.stringify(meData));

      if (meData.instagram_business_account?.id) {
        igUserId   = meData.instagram_business_account.id;
        igUsername = meData.instagram_business_account.username ||
                     meData.instagram_business_account.name || igUserId;
        accessToken = longToken;
        console.log('[Step 3b] Found via me:', igUsername, igUserId);
      } else {
        throw new Error(
          'No se encontró ninguna cuenta Instagram Business/Creator vinculada. ' +
          'Asegúrate de que tu Instagram esté en modo Business o Creator y vinculado a una Página de Facebook.'
        );
      }
    }

    // ── 4. Guardar en Supabase ───────────────────────────────────────────────────
    const { error: upsertErr } = await sb.from('ig_tokens').upsert({
      client_id,
      ig_user_id:   igUserId,
      ig_username:  igUsername,
      access_token: accessToken,
      expires_at:   new Date(Date.now() + expiresInMs).toISOString(),
      updated_at:   new Date().toISOString(),
    });
    if (upsertErr) throw new Error(`Guardando: ${upsertErr.message}`);

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
