// supabase/functions/ig-oauth-callback/index.ts
// Intercambia el código OAuth de Meta por un token de larga duración
// y guarda el ig_user_id + access_token en ig_tokens
// Deploy: supabase functions deploy ig-oauth-callback

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const META_APP_ID          = Deno.env.get('META_APP_ID')!;
const META_APP_SECRET      = Deno.env.get('META_APP_SECRET')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { code, client_id, redirect_uri } = await req.json();
    if (!code || !client_id) throw new Error('code y client_id requeridos');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // 1. Intercambiar código por token corto
    const tokenRes = await fetch(
      `https://graph.facebook.com/oauth/access_token?` +
      `client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}` +
      `&client_secret=${META_APP_SECRET}&code=${code}`
    );
    const tokenData = await tokenRes.json();
    if (tokenData.error) throw new Error(`Meta OAuth error: ${tokenData.error.message}`);
    const shortToken = tokenData.access_token;

    // 2. Intercambiar por token de larga duración (60 días)
    const longRes = await fetch(
      `https://graph.facebook.com/oauth/access_token?` +
      `grant_type=fb_exchange_token&client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}&fb_exchange_token=${shortToken}`
    );
    const longData = await longRes.json();
    if (longData.error) throw new Error(`Error obteniendo token largo: ${longData.error.message}`);
    const longToken   = longData.access_token;
    const expiresInMs = (longData.expires_in || 5184000) * 1000; // default 60 días

    // 3. Obtener páginas de Facebook conectadas
    const pagesRes  = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${longToken}`);
    const pagesData = await pagesRes.json();
    if (pagesData.error) throw new Error(`Error obteniendo páginas: ${pagesData.error.message}`);

    if (!pagesData.data?.length) {
      throw new Error('No se encontraron Páginas de Facebook. La cuenta de Instagram debe estar conectada a una Página de Facebook.');
    }

    // 4. Obtener Instagram Business Account de la primera página
    const page       = pagesData.data[0];
    const pageToken  = page.access_token;
    const igBizRes   = await fetch(
      `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${pageToken}`
    );
    const igBizData  = await igBizRes.json();
    const igUserId   = igBizData.instagram_business_account?.id;
    if (!igUserId) {
      throw new Error('No se encontró cuenta de Instagram Business vinculada a esta Página de Facebook.');
    }

    // 5. Obtener username de Instagram
    const igInfoRes  = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}?fields=username&access_token=${pageToken}`
    );
    const igInfo     = await igInfoRes.json();
    const igUsername = igInfo.username || '';

    // 6. Guardar en Supabase (upsert)
    const { error: upsertErr } = await sb.from('ig_tokens').upsert({
      client_id:    client_id,
      ig_user_id:   igUserId,
      ig_username:  igUsername,
      access_token: pageToken,  // Token de página (válido para publicar)
      expires_at:   new Date(Date.now() + expiresInMs).toISOString(),
      updated_at:   new Date().toISOString(),
    });
    if (upsertErr) throw new Error(`Error guardando token: ${upsertErr.message}`);

    return new Response(
      JSON.stringify({ success: true, ig_username: igUsername, ig_user_id: igUserId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
