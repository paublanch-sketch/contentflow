// supabase/functions/publish-instagram/index.ts
// Publica o programa en Instagram via Graph API oficial (Business/Creator)
// POST body: { post_id, scheduled_time? }
//   scheduled_time = ISO string → programa para esa fecha/hora
//   sin scheduled_time          → publica inmediatamente

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
      `No hay cuenta de Instagram conectada para "${post.client_id}". ` +
      `Conecta la cuenta Business/Creator desde la barra superior.`
    );

    const { access_token, ig_user_id } = tokenRow;

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
      const body: Record<string, unknown> = {
        image_url: imageUrls[0],
        caption,
        access_token,
      };
      if (isScheduled) {
        body.published             = false;
        body.scheduled_publish_time = schedUnix;
      }
      const res  = await fetch(`https://graph.instagram.com/v21.0/${ig_user_id}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) throw new Error(`Error creando contenedor: ${data.error.message}`);
      creationId = data.id;

    } else {
      // Carrusel: hijos primero
      const childIds: string[] = [];
      for (const url of imageUrls) {
        const res  = await fetch(`https://graph.instagram.com/v21.0/${ig_user_id}/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_url: url, is_carousel_item: true, access_token }),
        });
        const data = await res.json();
        if (data.error) throw new Error(`Error en imagen de carrusel: ${data.error.message}`);
        childIds.push(data.id);
      }
      const carouselBody: Record<string, unknown> = {
        media_type: 'CAROUSEL',
        children:   childIds.join(','),
        caption,
        access_token,
      };
      if (isScheduled) {
        carouselBody.published              = false;
        carouselBody.scheduled_publish_time = schedUnix;
      }
      const res  = await fetch(`https://graph.instagram.com/v21.0/${ig_user_id}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carouselBody),
      });
      const data = await res.json();
      if (data.error) throw new Error(`Error creando carrusel: ${data.error.message}`);
      creationId = data.id;
    }

    // 7. Si es programado: guardar y devolver (Instagram lo publica solo a su hora)
    if (isScheduled) {
      await sb.from('posts').update({
        status:          'scheduled',
        webhook_sent_at: new Date(scheduled_time).toISOString(),
      }).eq('id', post_id);

      return new Response(
        JSON.stringify({
          success:          true,
          scheduled:        true,
          scheduled_time,
          ig_container_id: creationId,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 8. Si es inmediato: esperar contenedor listo y publicar
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 3000));
      const sr = await fetch(
        `https://graph.instagram.com/v21.0/${creationId}?fields=status_code&access_token=${access_token}`
      );
      const { status_code } = await sr.json();
      if (status_code === 'FINISHED') break;
      if (status_code === 'ERROR') throw new Error(
        'Instagram rechazó la imagen. Comprueba que sea JPG/PNG < 8MB y URL pública.'
      );
    }

    const publishRes = await fetch(`https://graph.instagram.com/v21.0/${ig_user_id}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: creationId, access_token }),
    });
    const published = await publishRes.json();
    if (published.error) throw new Error(`Error publicando: ${published.error.message}`);

    await sb.from('posts').update({
      status:          'scheduled',
      webhook_sent_at: new Date().toISOString(),
    }).eq('id', post_id);

    return new Response(
      JSON.stringify({ success: true, ig_media_id: published.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
