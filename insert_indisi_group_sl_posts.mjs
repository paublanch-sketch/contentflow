import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'indisi-group-sl';

// ─────────────────────────────────────────────────────────────────────────────
// 4 POSTS — KENSINGTON MARESME · INDISI GROUP SL · Instagram
// Tono: profesional, aspiracional, lujo inmobiliario
// Marca: verde oscuro #1F4A3F/#0E2723 · Frutiger (títulos) · Proxima Nova
// Zona: Maresme, Costa Barcelona
// ─────────────────────────────────────────────────────────────────────────────
const posts = [
  {
    post_number: 1,
    platform: 'IG',
    headline_visual: 'VIVE EN EL MARESME',
    visual_prompt: 'Foto de villa mediterránea con piscina desbordante y vistas al mar. Overlay verde oscuro semitransparente en franja inferior. Título en blanco mayúsculas bold "VIVE EN EL MARESME", subtítulo "La costa que lo tiene todo." Etiqueta "LIFESTYLE" arriba izquierda. Logo KENSINGTON abajo centrado. Paleta #1F4A3F y blanco.',
    copy: `Vivir en el Maresme no es solo elegir una dirección.
Es elegir un estilo de vida.

Mar, montaña, naturaleza y conexión directa con Barcelona por la C-32.
Una combinación que pocas zonas del mundo pueden ofrecer.

En KENSINGTON Maresme encontramos propiedades que no solo cumplen tus expectativas — las superan.

¿Preparado para cambiar de horizonte? ✨🏡

Descubre nuestro portfolio en kensington-maresme.com`,
    hashtags: ['KENSINGTON', 'KENSINGTONMaresme', 'maresme', 'vivirmaresme', 'costadebarcelona', 'luxuryliving', 'inmobiliaria', 'realestatebarcelona', 'propiedadeslujo', 'mediterraneanlife'],
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'INVERTIR EN MARESME',
    visual_prompt: 'Foto de casa moderna de diseño con jardín y fachada elegante. Franja verde oscuro arriba con etiqueta "INVERSIÓN" en blanco. Título bold blanco "INVERTIR EN MARESME", subtítulo "Decisiones inteligentes, resultados excepcionales." Logo KENSINGTON abajo. Estética premium, minimalista.',
    copy: `El mercado inmobiliario del Maresme evoluciona — pero una cosa no cambia:
las propiedades bien ubicadas mantienen y aumentan su valor. 📈🏠

Ubicación privilegiada, demanda creciente y acceso a Barcelona.
Tres razones que convierten al Maresme en una inversión sólida.

En KENSINGTON Maresme te acompañamos con asesoramiento profesional en cada paso.
Desde la búsqueda hasta la firma.

Descubre cómo tomar decisiones inteligentes con nuestro equipo. ✨

#InversionSegura`,
    hashtags: ['KENSINGTON', 'KENSINGTONMaresme', 'inversioninmobiliaria', 'maresme', 'inversionSegura', 'realestatebarcelona', 'mercadoinmobiliario', 'propiedadeslujo', 'barcelona', 'luxuryrealestate'],
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'TU PRÓXIMO CAPÍTULO',
    visual_prompt: 'Interior luminoso de villa de lujo — ventanales grandes, luz mediterránea, decoración minimalista elegante. Título blanco bold "TU PRÓXIMO CAPÍTULO", subtítulo "Propiedades que inspiran." Etiqueta "INMUEBLES" arriba izquierda verde oscuro. Logo KENSINGTON abajo. Sensación cálida y aspiracional.',
    copy: `Vivir en una propiedad de KENSINGTON es una experiencia que va más allá de las paredes.

Se trata de disfrutar espacios que te inspiran cada día.
De sentir que cada detalle ha sido pensado para ti.

🏡 No solo vendemos propiedades.
Creamos conexiones entre personas extraordinarias y hogares excepcionales.

¿Tienes curiosidad por el estilo de vida que ofrecemos?

✨ Bienvenido a KENSINGTON Maresme.
📍 Port Balis 3, Sant Andreu de Llavaneres
🌐 kensington-maresme.com`,
    hashtags: ['KENSINGTON', 'KENSINGTONFinestProperties', 'maresme', 'propiedades', 'casasdiseño', 'luxuryliving', 'inmobiliaria', 'vivirmaresme', 'costadebarcelona', 'dreamhome'],
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: 'EXPERTOS A TU LADO',
    visual_prompt: 'Agente inmobiliario profesional con cliente revisando documentación en oficina elegante o exterior de propiedad. Iluminación natural, ambiente de confianza. Barra acento verde oscuro lateral izquierdo. Título blanco "EXPERTOS A TU LADO", subtítulo "Desde la búsqueda hasta la firma." Etiqueta "SERVICIO" arriba. Logo KENSINGTON abajo.',
    copy: `Encontrar la propiedad perfecta no es solo cuestión de metros cuadrados.

Es encontrar el lugar donde empezará tu próxima etapa.

En KENSINGTON Maresme somos parte de una red internacional con más de 1.375 franquicias operativas y presencia en los mejores mercados del mundo.

Lo que nos diferencia: un trato cercano, personalizado y profesional — adaptado a cada cliente.

📞 +34 931 591 558
📍 Port Balis 3, Sant Andreu de Llavaneres
🌐 kensington-maresme.com

El equipo que necesitas para decidir con criterio. 🤝✨`,
    hashtags: ['KENSINGTON', 'KENSINGTONMaresme', 'KENSINGTONInternational', 'agenteinmobiliario', 'maresme', 'realestatebarcelona', 'asesoramiento', 'inmobiliaria', 'lujo', 'costadebarcelona'],
  },
];

async function run() {
  console.log('➕ Insertando posts #1–#4 para INDISI GROUP SL (KENSINGTON Maresme)...\n');

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

  console.log('\n✅ Llest! Posts #1–#4 inserits. Recarrega ContentFlow.');
  console.log('   → https://contentflow-4wos.vercel.app/p/indisi-group-sl');
}

run();
