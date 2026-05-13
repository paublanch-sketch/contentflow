// supabase/functions/ig-oauth-callback/index.ts
// Facebook Graph API OAuth: code → User Token → Long-lived Token → IG Business Account
// Mismo enfoque que Metricool: usa META_APP_ID (Facebook App) no Instagram App

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
    const body = await req.json();
    const { code, client_id, redirect_uri } = body;

    console.log('[ig-oauth-callback] START', { client_id, redirect_uri, code: code?.slice(0,20)+'...' });
    console.log('[ig-oauth-callback] META_APP_ID:', META_APP_ID);
    console.log('[ig-oauth-callback] META_APP_SECRET present:', !!META_APP_SECRET);

    if (!code || !client_id) throw new Error('code y client_id requeridos');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // ── 1. Código → Token corto de usuario (Facebook) ───────────────────────────
    const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
      `&code=${code}`;

    console.log('[Step 1] Exchanging code for short-lived user token...');
    const shortRes = await fetch(tokenUrl);
    const shortRaw = await shortRes.text();
    console.log('[Step 1] Response status:', shortRes.status);
    console.log('[Step 1] Response body:', shortRaw);

    let shortData: any;
    try { shortData = JSON.parse(shortRaw); } catch { throw new Error(`Facebook token parse: ${shortRaw}`); }
    if (shortData.error) throw new Error(`Token corto FB: ${shortData.error.message} (code ${shortData.error.code})`);

    const shortToken = shortData.access_token;
    console.log('[Step 1] Got short-lived token ✓');

    // ── 2. Token corto → Token largo (60 días) ──────────────────────────────────
    const longUrl = `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?grant_type=fb_exchange_token` +
      `&client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&access_token=${shortToken}`;

    console.log('[Step 2] Exchanging for long-lived token...');
    const longRes = await fetch(longUrl);
    const longRaw = await longRes.text();
    console.log('[Step 2] Response status:', longRes.status);
    console.log('[Step 2] Response body:', longRaw);

    let longData: any;
    try { longData = JSON.parse(longRaw); } catch { throw new Error(`Long token parse: ${longRaw}`); }
    if (longData.error) throw new Error(`Token largo FB: ${longData.error.message}`);

    const longToken    = longData.access_token;
    const expiresInMs  = (longData.expires_in || 5184000) * 1000;
    console.log('[Step 2] Got long-lived token ✓ expires_in:', longData.expires_in, 's');

    // ── 3. Obtener páginas de Facebook con cuentas de Instagram conectadas ───────
    const pagesUrl = `https://graph.facebook.com/v21.0/me/accounts` +
      `?fields=id,name,access_token,instagram_business_account{id,username,name}` +
      `&access_token=${longToken}`;

    console.log('[Step 3] Fetching Facebook pages with Instagram accounts...');
    const pagesRes = await fetch(pagesUrl);
    const pagesRaw = await pagesRes.text();
    console.log('[Step 3] Response status:', pagesRes.status);
    console.log('[Step 3] Response body:', pagesRaw);

    let pagesData: any;
    try { pagesData = JSON.parse(pagesRaw); } catch { throw new Error(`Pages parse: ${pagesRaw}`); }
    if (pagesData.error) throw new Error(`Páginas FB: ${pagesData.error.message}`);

    const pages = pagesData.data || [];
    console.log('[Step 3] Pages found:', pages.length);
    pages.forEach((p: any, i: number) => {
      console.log(`  [${i}] Page: ${p.name} (${p.id}), IG: ${JSON.stringify(p.instagram_business_account)}`);
    });

    // Buscar la primera página con Instagram Business Account
    const pageWithIG = pages.find((p: any) => p.instagram_business_account?.id);

    if (!pageWithIG) {
      // Si no hay páginas con IG Business, intentar con el propio usuario (Creator accounts)
      console.log('[Step 3] No pages with IG Business found, trying user-level IG account...');
      const userIgUrl = `https://graph.facebook.com/v21.0/me?fields=id,name,instagram_business_account{id,username,name}&access_token=${longToken}`;
      const userIgRes = await fetch(userIgUrl);
      const userIgRaw = await userIgRes.text();
      console.log('[Step 3b] User IG response:', userIgRaw);
      let userIgData: any;
      try { userIgData = JSON.parse(userIgRaw); } catch { throw new Error(`User IG parse: ${userIgRaw}`); }

      if (userIgData.instagram_business_account?.id) {
        const igAccount = userIgData.instagram_business_account;
        console.log('[Step 3b] Found user-level IG account:', igAccount);

        const { error: upsertErr } = await sb.from('ig_tokens').upsert({
          client_id,
          ig_user_id:    igAccount.id,
          ig_username:   igAccount.username || igAccount.name || igAccount.id,
          access_token:  longToken,
          expires_at:    new Date(Date.now() + expiresInMs).toISOString(),
          updated_at:    new Date().toISOString(),
        });
        if (upsertErr) throw new Error(`Guardando (user IG): ${upsertErr.message}`);

        console.log('[SUCCESS] Saved user-level IG account:', igAccount.username);
        return new Response(
          JSON.stringify({ success: true, ig_username: igAccount.username || igAccount.id, ig_user_id: igAccount.id }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(
        `No se encontró ninguna cuenta de Instagram Business/Creator vinculada a tu Facebook. ` +
        `Asegúrate de que tu cuenta de Instagram esté configurada como Business o Creator y vinculada a una Página de Facebook.`
      );
    }

    // Tenemos página con IG Business
    const igAccount  = pageWithIG.instagram_business_account;
    const pageToken  = pageWithIG.access_token; // Page token (long-lived si viene de long-lived user token)
    const igUserId   = igAccount.id;
    const igUsername = igAccount.username || igAccount.name || igUserId;

    console.log('[Step 4] Found IG Business Account:', igUsername, '(', igUserId, ')');
    console.log('[Step 4] Via Facebook Page:', pageWithIG.name, '(', pageWithIG.id, ')');

    // ── 4. Guardar en Supabase ───────────────────────────────────────────────────
    // Usamos el Page Token para publicar (no caduca si el user token era long-lived)
    const { error: upsertErr } = await sb.from('ig_tokens').upsert({
      client_id,
      ig_user_id:    igUserId,
      ig_username:   igUsername,
      access_token:  pageToken,  // Page Access Token para publicar
      expires_at:    new Date(Date.now() + expiresInMs).toISOString(),
      updated_at:    new Date().toISOString(),
    });
    if (upsertErr) throw new Error(`Guardando en BD: ${upsertErr.message}`);

    console.log('[SUCCESS] Saved to ig_tokens:', igUsername);

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
