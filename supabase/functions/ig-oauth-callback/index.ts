// supabase/functions/ig-oauth-callback/index.ts
// Facebook OAuth code → Facebook user token → Instagram Business Account → guarda en ig_tokens

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

    // 1. Código Facebook → token corto de usuario Facebook
    const fbTokenRes = await fetch(
      `https://graph.facebook.com/oauth/access_token` +
      `?client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
      `&code=${code}`
    );
    const fbTokenData = await fbTokenRes.json();
    if (fbTokenData.error) {
      throw new Error(`Facebook token error: ${fbTokenData.error.message || JSON.stringify(fbTokenData.error)}`);
    }
    const fbShortToken = fbTokenData.access_token;

    // 2. Token corto → token largo de usuario Facebook (60 días)
    const fbLongRes = await fetch(
      `https://graph.facebook.com/oauth/access_token` +
      `?grant_type=fb_exchange_token` +
      `&client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&fb_exchange_token=${fbShortToken}`
    );
    const fbLongData = await fbLongRes.json();
    if (fbLongData.error) {
      throw new Error(`Token largo Facebook: ${fbLongData.error.message}`);
    }
    const fbLongToken  = fbLongData.access_token;
    const expiresInMs  = (fbLongData.expires_in || 5184000) * 1000;

    // 3. Obtener páginas del usuario
    const pagesRes = await fetch(
      `https://graph.facebook.com/me/accounts?access_token=${fbLongToken}`
    );
    const pagesData = await pagesRes.json();
    if (pagesData.error) {
      throw new Error(`Páginas Facebook: ${pagesData.error.message}`);
    }
    const pages: Array<{ id: string; access_token: string; name: string }> = pagesData.data || [];
    if (pages.length === 0) {
      throw new Error('No se encontraron páginas de Facebook. Asegúrate de tener una Página vinculada a tu cuenta de Instagram Business/Creator.');
    }

    // 4. Buscar cuenta Instagram Business en las páginas
    let igUserId   = '';
    let igUsername = '';
    let igToken    = fbLongToken; // fallback al token de usuario

    for (const page of pages) {
      const igRes = await fetch(
        `https://graph.facebook.com/v21.0/${page.id}` +
        `?fields=instagram_business_account` +
        `&access_token=${page.access_token}`
      );
      const igData = await igRes.json();

      if (igData.instagram_business_account?.id) {
        igUserId = igData.instagram_business_account.id;
        igToken  = page.access_token; // token de página para publicar

        // 5. Obtener username del IG Business Account
        const userRes = await fetch(
          `https://graph.facebook.com/v21.0/${igUserId}` +
          `?fields=id,username,name` +
          `&access_token=${igToken}`
        );
        const userData = await userRes.json();
        if (userData.error) throw new Error(`Perfil IG: ${userData.error.message}`);
        igUsername = userData.username || userData.name || igUserId;
        break; // usar la primera página con IG Business
      }
    }

    if (!igUserId) {
      throw new Error(
        'No se encontró ninguna cuenta de Instagram Business/Creator vinculada a tus páginas de Facebook. ' +
        'Ve a Configuración de Instagram → Cuenta → Cambiar a cuenta profesional y vincula tu página de Facebook.'
      );
    }

    // 6. Guardar en Supabase
    const { error: upsertErr } = await sb.from('ig_tokens').upsert({
      client_id,
      ig_user_id:   igUserId,
      ig_username:  igUsername,
      access_token: igToken,
      expires_at:   new Date(Date.now() + expiresInMs).toISOString(),
      updated_at:   new Date().toISOString(),
    });
    if (upsertErr) throw new Error(`Guardando: ${upsertErr.message}`);

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
