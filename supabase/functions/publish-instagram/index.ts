// supabase/functions/publish-instagram/index.ts
// Edge Function — publica en Instagram via Graph API oficial
// Deploy: supabase functions deploy publish-instagram

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { post_id } = await req.json();
    if (!post_id) throw new Error('post_id requerido');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // 1. Obtener el post
    const { data: post, error: postErr } = await sb
      .from('posts')
      .select('*')
      .eq('id', post_id)
      .single();
    if (postErr || !post) throw new Error(`Post no encontrado: ${post_id}`);

    // 2. Obtener token de Instagram del cliente
    const { data: tokenRow, error: tokenErr } = await sb
      .from('ig_tokens')
      .select('*')
      .eq('client_id', post.client_id)
      .single();
    if (tokenErr || !tokenRow) throw new Error(
      `No hay cuenta de Instagram conectada para "${post.client_id}". ` +
      `Conecta la cuenta en la sección de ajustes del cliente.`
    );

    const { access_token, ig_user_id } = tokenRow;

    // 3. Construir caption
    const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : (post.hashtags || '');
    const caption  = [post.copy, hashtags].filter(Boolean).join('\n\n');

    // 4. Obtener URL de imagen (debe ser pública)
    const imageUrls: string[] = (() => {
      if (!post.image_url) return [];
      try {
        const parsed = JSON.parse(post.image_url);
        return Array.isArray(parsed) ? parsed : [post.image_url];
      } catch { return [post.image_url]; }
    })();

    if (!imageUrls.length) throw new Error('El post no tiene imagen. Sube la imagen primero.');

    let creationId: string;

    if (imageUrls.length === 1) {
      // ── Post individual ────────────────────────────────────────────────────
      const containerRes = await fetch(
        `https://graph.facebook.com/v19.0/${ig_user_id}/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url:    imageUrls[0],
            caption,
            access_token,
          }),
        }
      );
      const container = await containerRes.json();
      if (container.error) throw new Error(`Error creando contenedor: ${container.error.message}`);
      creationId = container.id;

    } else {
      // ── Carrusel ────────────────────────────────────────────────────────────
      // Crear contenedor por cada imagen
      const childIds: string[] = [];
      for (const url of imageUrls) {
        const res = await fetch(
          `https://graph.facebook.com/v19.0/${ig_user_id}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_url: url, is_carousel_item: true, access_token }),
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(`Error en imagen de carrusel: ${data.error.message}`);
        childIds.push(data.id);
      }
      // Crear contenedor del carrusel
      const carouselRes = await fetch(
        `https://graph.facebook.com/v19.0/${ig_user_id}/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            media_type:   'CAROUSEL',
            children:     childIds.join(','),
            caption,
            access_token,
          }),
        }
      );
      const carousel = await carouselRes.json();
      if (carousel.error) throw new Error(`Error creando carrusel: ${carousel.error.message}`);
      creationId = carousel.id;
    }

    // 5. Esperar a que el contenedor esté listo (hasta 30s)
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 3000));
      const statusRes = await fetch(
        `https://graph.facebook.com/v19.0/${creationId}?fields=status_code&access_token=${access_token}`
      );
      const { status_code } = await statusRes.json();
      if (status_code === 'FINISHED') break;
      if (status_code === 'ERROR') throw new Error('Instagram rechazó la imagen. Comprueba que sea JPG/PNG < 8MB y URL pública.');
    }

    // 6. Publicar
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${ig_user_id}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creation_id: creationId, access_token }),
      }
    );
    const published = await publishRes.json();
    if (published.error) throw new Error(`Error publicando: ${published.error.message}`);

    // 7. Marcar como publicado en Supabase
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
