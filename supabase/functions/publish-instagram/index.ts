// supabase/functions/publish-instagram/index.ts
// Publica o programa en Instagram via Graph API oficial (Business/Creator)
// Tokens IGAAN...: graph.instagram.com con access_token como query param
// POST body: { post_id, scheduled_time? }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const IG_API               = 'https://graph.instagram.com/v21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper: POST — access_token como query param (más compatible con IGAAN)
async function igPost(path: string, token: string, body: Record<string, unknown>) {
  const url = `${IG_API}${path}?access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const text = await res.text();
  console.log(`[ig-post] ${path} (${res.status}):`, text.slice(0, 300));
  try { return JSON.parse(text); } catch { throw new Error(`Respuesta no JSON: ${text.slice(0,200)}`); }
}

// Helper: GET — access_token como query param
async function igGet(path: string, token: string, params: Record<string, string> = {}) {
  const qs  = new URLSearchParams({ ...params, access_token: token }).toString();
  const url = `${IG_API}${path}?${qs}`;
  const res = await fetch(url);
  const text = await res.text();
  console.log(`[ig-get] ${path} (${res.status}):`, text.slice(0, 300));
  try { return JSON.parse(text); } catch { throw new Error(`Respuesta no JSON: ${text.slice(0,200)}`); }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { post_id, scheduled_time } = await req.json();
    if (!post_id) throw new Error('post_id requerido');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // 1. Obtener el post
    const { data: post, error: postErr } = await sb
      .from('posts').select('*').eq('id', post_id).single();
    if (postErr || !post) throw new Error(`Post no encontrado: ${post_id}`);

    // 2. Obtener token
    const { data: tokenRow } = await sb
      .from('ig_tokens').select('*').eq('client_id', post.client_id).single();
    if (!tokenRow) throw new Error(
      `No hay cuenta Instagram conectada para "${post.client_id}". Conecta la cuenta Business/Creator.`
    );

    const { access_token, ig_user_id } = tokenRow;
    console.log('[publish-ig] ig_user_id:', ig_user_id, '| token prefix:', access_token?.slice(0, 10));

    // Debug: tipo de cuenta
    try {
      const meData = await igGet('/me', access_token, { fields: 'id,username,name,account_type' });
      console.log('[publish-ig] /me:', JSON.stringify(meData));
    } catch(e: any) {
      console.log('[publish-ig] /me error:', e.message);
    }

    // 3. Caption
    const hashtags = (Array.isArray(post.hashtags) ? post.hashtags : [])
      .map((h: string) => h.startsWith('#') ? h : `#${h}`).join(' ');
    const caption  = [post.copy, hashtags].filter(Boolean).join('\n\n');

    // 4. Imágenes
    const imageUrls: string[] = (() => {
      if (!post.image_url) return [];
      try {
        const p = JSON.parse(post.image_url);
        return Array.isArray(p) ? p.filter(Boolean) : [post.image_url];
      } catch { return [post.image_url]; }
    })();
    if (!imageUrls.length) throw new Error('El post no tiene imagen. Sube la imagen primero.');

    // 5. ¿Programado o inmediato?
    const schedUnix = scheduled_time
      ? Math.floor(new Date(scheduled_time).getTime() / 1000)
      : null;
    const isScheduled = !!schedUnix;

    // 6. Crear contenedor(es)
    let creationId: string;

    if (imageUrls.length === 1) {
      const body: Record<string, unknown> = { image_url: imageUrls[0], caption };
      if (isScheduled) {
        body.published              = false;
        body.scheduled_publish_time = schedUnix;
      }
      const data = await igPost(`/${ig_user_id}/media`, access_token, body);
      if (data.error) throw new Error(`Error creando contenedor: ${data.error.message}`);
      creationId = data.id;

    } else {
      // Carrusel
      const childIds: string[] = [];
      for (const url of imageUrls) {
        const data = await igPost(`/${ig_user_id}/media`, access_token, {
          image_url: url, is_carousel_item: true,
        });
        if (data.error) throw new Error(`Error imagen carrusel: ${data.error.message}`);
        childIds.push(data.id);
      }
      const carouselBody: Record<string, unknown> = {
        media_type: 'CAROUSEL', children: childIds.join(','), caption,
      };
      if (isScheduled) {
        carouselBody.published              = false;
        carouselBody.scheduled_publish_time = schedUnix;
      }
      const data = await igPost(`/${ig_user_id}/media`, access_token, carouselBody);
      if (data.error) throw new Error(`Error creando carrusel: ${data.error.message}`);
      creationId = data.id;
    }

    // 7. Programado → guardar y devolver
    if (isScheduled) {
      await sb.from('posts').update({
        status: 'scheduled', webhook_sent_at: new Date(scheduled_time).toISOString(),
      }).eq('id', post_id);

      return new Response(
        JSON.stringify({ success: true, scheduled: true, scheduled_time, ig_container_id: creationId }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 8. Inmediato: esperar FINISHED y publicar
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 3000));
      const statusData = await igGet(`/${creationId}`, access_token, { fields: 'status_code' });
      const { status_code } = statusData;
      console.log(`[publish-ig] Status check ${i+1}:`, status_code);
      if (status_code === 'FINISHED') break;
      if (status_code === 'ERROR') throw new Error(
        'Instagram rechazó la imagen. Comprueba que sea JPG/PNG < 8MB y URL pública accesible.'
      );
    }

    const published = await igPost(`/${ig_user_id}/media_publish`, access_token, {
      creation_id: creationId,
    });
    if (published.error) throw new Error(`Error publicando: ${published.error.message}`);

    await sb.from('posts').update({
      status: 'scheduled', webhook_sent_at: new Date().toISOString(),
    }).eq('id', post_id);

    return new Response(
      JSON.stringify({ success: true, ig_media_id: published.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('[publish-ig] ERROR:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
