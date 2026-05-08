import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'kbio-slp';

const posts = [
  {
    id: `${CLIENT_ID}-13`,
    client_id: CLIENT_ID,
    post_number: 13,
    platform: 'IG',
    headline_visual: 'Sistema SATE en Egia, Donostia — fachada rehabilitada, diseño e innovación',
    visual_prompt: 'Instagram 1080x1080px. Architectural photo of a rehabilitated building facade with SATE external insulation system in Egia, Donostia. Clean, modern finish. Kabio branding. Editorial construction photography style.',
    copy: `La fachada no es solo la primera impresión.

Es el escudo energético de un edificio.

Sistema SATE en Egia, Donostia. Menos consumo. Más confort. Mejor calidad de vida.

Cada detalle proyectado para durar.

📞 +34 682 188 145
✉️ info@kabio.es
🌐 kabio.es`,
    hashtags: ['kabio', 'arquitectura', 'rehabilitacion', 'SATE', 'donostia', 'sansebastian', 'eficienciaenergetica', 'fachadas', 'euskadi', 'arquitecturavasca', 'diseñoeinnovacion', 'reformas', 'ingenieria', 'construccionsostenible', 'paisvasco'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-14`,
    client_id: CLIENT_ID,
    post_number: 14,
    platform: 'IG',
    headline_visual: 'Universidad y entorno urbano en Sestao — regeneración urbana con propósito',
    visual_prompt: 'Instagram 1080x1080px. Architectural rendering or photo of a university building integrated into an urban environment in Sestao, Bizkaia. Modern design, people-focused urban architecture. Editorial style.',
    copy: `Cuando la ciudad puede reimaginar su propio futuro.

Hay proyectos que trascienden el edificio.

Universidad y entorno urbano en Sestao. Arquitectura al servicio de las personas y del territorio que las acoge.

Eso es diseño con propósito.

📞 +34 682 188 145
✉️ info@kabio.es
🌐 kabio.es`,
    hashtags: ['kabio', 'urbanismo', 'arquitectura', 'sestao', 'bizkaia', 'regeneracionurbana', 'diseñourbano', 'euskadi', 'arquitecturavasca', 'paisvasco', 'ingenieria', 'proyectourbano', 'ciudad', 'innovacion', 'diseñoeinnovacion'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-15`,
    client_id: CLIENT_ID,
    post_number: 15,
    platform: 'IG',
    headline_visual: 'Rehabilitación completa de envolvente en Astigarraga, Gipuzkoa — antes y después',
    visual_prompt: 'Instagram 1080x1080px. Before/after or process photo of a complete building envelope rehabilitation in Astigarraga, Gipuzkoa. Renovated facade, improved aesthetics, neighborhood context. Warm editorial architectural photography.',
    copy: `Antes era un edificio. Ahora es un hogar.

Rehabilitación completa de la envolvente en Astigarraga, Gipuzkoa.

Eficiencia energética, estética renovada y un barrio que vuelve a respirar.

Cada proyecto es una segunda oportunidad.

📞 +34 682 188 145
✉️ info@kabio.es
🌐 kabio.es`,
    hashtags: ['kabio', 'rehabilitacion', 'astigarraga', 'gipuzkoa', 'euskadi', 'fachadas', 'arquitectura', 'reformas', 'eficienciaenergetica', 'diseñoeinnovacion', 'arquitecturavasca', 'paisvasco', 'ingenieria', 'hogar', 'renovacion'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-16`,
    client_id: CLIENT_ID,
    post_number: 16,
    platform: 'IG',
    headline_visual: 'Reforma y mobiliario a medida para Casa Rodriguez, San Sebastián — diseño de interior comercial',
    visual_prompt: 'Instagram 1080x1080px. Interior design photo of a reformed commercial space "Casa Rodriguez" in San Sebastián. Custom furniture, cohesive brand experience, every square meter working for the brand. Warm editorial interior photography.',
    copy: `El espacio también vende.

Diseñar un local no es llenarlo de muebles. Es crear una experiencia.

Reforma y mobiliario a medida para Casa Rodriguez, San Sebastián. Cada metro cuadrado trabaja por la marca.

¿Tienes un espacio que transformar?

📞 +34 682 188 145
✉️ info@kabio.es
🌐 kabio.es`,
    hashtags: ['kabio', 'diseñointerior', 'reforma', 'interiorismo', 'arquitectura', 'comercial', 'mobiliario', 'sansebastian', 'donostia', 'gipuzkoa', 'euskadi', 'diseñoeinnovacion', 'espacios', 'reformacomercial', 'paisvasco'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
];

async function run() {
  console.log(`Insertando posts #13–16 para ${CLIENT_ID}...`);

  for (const post of posts) {
    const { error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'id' });

    if (error) {
      console.error(`✗ Post #${post.post_number}: ${error.message}`);
    } else {
      console.log(`✓ Post #${post.post_number} (${post.id}): OK`);
    }
  }

  console.log('\n✅ Posts 13–16 de KABIO SLP añadidos a ContentFlow.');
}

run();
