import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'pesgalia-slu';

// ─────────────────────────────────────────────────────────────────
// ESTILO VISUAL PESGALIA:
//   Fondo: azul marino oscuro #0B2A4A
//   Acento: amarillo/dorado #F5C518
//   Texto: blanco bold (fuente sans-serif)
//   Logo: PESGALIA esquina superior central
//   Texto grande bold parte inferior
//   Formato Instagram: 1080×1080 px cuadrado
// ─────────────────────────────────────────────────────────────────

const posts = [
  {
    post_number: 14,
    platform: 'IG',
    headline_visual: 'La mejor flota + Mejores caladeros = Garantía de calidad',
    visual_prompt: 'Instagram post 1080x1080px. Fondo: foto real de barco pesquero "Santa Anita 388" en el mar Mediterráneo, agua azul profundo. Logo PESGALIA blanco centrado arriba. Banda inferior azul marino (#0B2A4A): texto bold blanco grande multilínea "LA MEJOR FLOTA + MEJORES CALADEROS = GARANTÍA DE CALIDAD". Decoración esquinas con forma orgánica amarillo dorado (#F5C518). Estética profesional sector pesquero premium.',
    copy: `La mejor flota. Los mejores caladeros. La mejor garantía de calidad. 🎣⚓

En Pesgalia no dejamos nada al azar.

Embarcaciones preparadas, caladeros seleccionados y un equipo que conoce el mar como nadie.

El resultado: pescado de primera calidad, directo desde el océano hasta tu mesa.

Porque la calidad no es suerte. Es dedicación. 💪🐟

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#GarantíaDeCalidad', '#PescaResponsable', '#MejorFlota', '#Caladeros', '#PescadoFresco', '#SectorPesquero', '#Galicia', '#PescaDeAltura', '#CalidadGarantizada'],
  },
  {
    post_number: 15,
    platform: 'IG',
    headline_visual: 'Entrega garantizada en cualquier destino',
    visual_prompt: 'Instagram post 1080x1080px. Fondo: foto aérea de puerto marítimo grande con cruceros y barcos, ciudad portuaria vista desde arriba (estilo Vigo). Logo PESGALIA blanco centrado arriba. Banda inferior azul marino (#0B2A4A): texto bold blanco grande "ENTREGA GARANTIZADA EN CUALQUIER DESTINO". Decoración esquinas con forma orgánica amarillo dorado (#F5C518). Estética logística y distribución pesquera premium.',
    copy: `Da igual donde estés. Llegamos. 🚢📦

Entrega garantizada en cualquier destino.

Desde nuestros puertos hasta tu punto de destino, Pesgalia asegura que el producto llegue en perfectas condiciones, a tiempo y con la frescura de siempre.

Logística eficiente. Compromiso real.
Pescado de calidad — donde lo necesites. 🌊

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#EntregaGarantizada', '#LogísticaPesquera', '#PescadoFresco', '#DistribuciónPesquera', '#Galicia', '#CualquierDestino', '#PescaDeCalidad', '#SectorPesquero', '#MarAMesa'],
  },
];

async function run() {
  console.log('➕ Añadiendo posts #14 y #15 — Pesgalia SLU...');

  for (const p of posts) {
    const { error } = await supabase.from('posts').insert({
      id:              `${CLIENT_ID}-${p.post_number}`,
      client_id:       CLIENT_ID,
      post_number:     p.post_number,
      platform:        p.platform,
      headline_visual: p.headline_visual,
      visual_prompt:   p.visual_prompt,
      copy:            p.copy,
      hashtags:        p.hashtags,
      status:          'review',
      feedback:        '',
      image_url:       '',
      webhook_sent_at: null,
    });
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else        console.log(`✅ Post #${p.post_number} — ${p.headline_visual}`);
  }

  console.log('\n✅ Listo! Posts #14 y #15 añadidos a Pesgalia SLU.');
  console.log('   → https://contentflow-4wos.vercel.app/p/pesgalia-slu');
}

run();
