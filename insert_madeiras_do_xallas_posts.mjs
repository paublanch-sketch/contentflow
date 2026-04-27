import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'madeiras-do-xallas';

const posts = [
  {
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Bienvenido a Madeiras do Xallas',
    visual_prompt: 'Foto bosque gallego fondo completo difuminada tons marrons — texto blanco encima. Presentación de marca.',
    copy: `🌲 Bienvenido a Madeiras do Xallas. Trabajamos con compromiso y respeto por el entorno, ofreciendo soluciones forestales responsables en Galicia.
🌳 Nuestra meta: aprovechar los recursos naturales sin comprometer el futuro del monte.
♻️ Gestión sostenible | Confianza | Profesionalidad`,
    hashtags: ['MadeirasDoXallas','GestiónForestal','BosquesDeGalicia','MaderaGallega','ForestalSostenible','GaliciaRural'],
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Servicio completo desde tala hasta transporte',
    visual_prompt: 'Foto maquinaria forestal o troncos apilats fons complet tons marrons — texto blanco encima. Comercial informativo.',
    copy: `🌿 En Madeiras do Xallas nos encargamos de todo el proceso: desde la tala hasta el transporte.
🪓 Trabajamos con enfoque responsable y maquinaria propia para garantizar resultados eficientes y seguros.
💬 ¿Necesitas valorar tu madera? Escríbenos sin compromiso.`,
    hashtags: ['MadeirasDoXallas','ServiciosForestales','MaquinariaForestal','GestiónForestal','MaderaResponsable','TrabajoForestal'],
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Servicio completo para propietarios y empresas',
    visual_prompt: 'Foto bosc o troncos fons complet difuminada tons marrons — texto blanco encima. Informativo servicios.',
    copy: `🚜 Ofrecemos un servicio completo para propietarios y empresas del sector forestal:
🌳 Explotación forestal
💰 Tasación sin coste
🌱 Gestión sostenible certificada (FSC y PEFC)
Confía en un equipo con experiencia y compromiso con el medio rural gallego.`,
    hashtags: ['MadeirasDoXallas','ServiciosForestales','MaquinariaForestal','GestiónForestal','MaderaResponsable','TrabajoForestal'],
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: '¿Tienes madera? Te valoramos sin compromiso',
    visual_prompt: 'Foto troncos apilats o bosc fons complet tons marrons — texto blanco grande CTA encima con contacto.',
    copy: `📞 Ponte en contacto con nosotros: valoramos tu madera sin compromiso.
☎️ 689 532 374 | 881 090 502
📩 madeirasdoxallas@outlook.es
📍 Mazaricos (A Coruña)
💬 Te ayudamos a gestionar tu monte de forma responsable y rentable.`,
    hashtags: ['MadeirasDoXallas','TasaciónForestal','GestiónForestal','MaderaGallega','ServiciosForestales','GaliciaRural'],
  },
  {
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Del monte a la fábrica',
    visual_prompt: 'Foto processo tala madera o camió transport fons complet tons marrons — texto blanco encima. Educativo.',
    copy: `🌲 Nuestro trabajo consiste en cortar la madera directamente en el monte y transportarla a fábrica.
🚛 Un proceso completo, eficiente y respetuoso con el entorno.
🔧 Confía en profesionales con experiencia en gestión forestal sostenible.`,
    hashtags: ['MadeirasDoXallas','TrabajoForestal','AprovechamientoForestal','GestiónForestal','MaderaResponsable','BosquesDeGalicia'],
  },
  {
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Madera preparada para la industria',
    visual_prompt: 'Foto troncos seleccionats apilats fons complet tons marrons — texto blanco encima. Producto.',
    copy: `🪵 Madera preparada para industria, seleccionada y lista para su transformación. En Madeiras do Xallas garantizamos calidad y sostenibilidad en cada lote.
♻️ Desde el monte hasta la fábrica, cuidamos cada detalle.`,
    hashtags: ['MadeirasDoXallas','MaderaGallega','IndustriaForestal','MaderaSostenible','GestiónForestal','FSCPEFC'],
  },
  {
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Gestión forestal certificada FSC y PEFC',
    visual_prompt: 'Foto bosc saludable sostenible fons complet tons marrons — texto blanco encima. Certificaciones.',
    copy: `🌳 Apostamos por una gestión forestal certificada. Trabajamos con los sellos FSC y PEFC, que avalan la sostenibilidad de cada proyecto.
Porque el futuro del bosque también es nuestra responsabilidad.`,
    hashtags: ['MadeirasDoXallas','GestiónSostenible','CertificaciónForestal','FSCPEFC','MaderaResponsable','BosquesDeGalicia'],
  },
  {
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Eucalipto y pino — nuestra especialidad',
    visual_prompt: 'Foto eucaliptus o pins alts fons complet tons marrons ambre — texto blanco encima. Educativo tipos madera.',
    copy: `🎋 En Madeiras do Xallas trabajamos con todo tipo de madera, especialmente eucalipto y pino.
🌲 Nos adaptamos a las necesidades de cada cliente, priorizando calidad y sostenibilidad.
📍 Galicia es bosque, y nosotros lo cuidamos cada día.`,
    hashtags: ['MadeirasDoXallas','EucaliptoYPino','MaderaGallega','SectorForestal','GestiónForestal','ForestalSostenible'],
  },
  {
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Maquinaria forestal propia',
    visual_prompt: 'Foto maquinaria forestal procesadora o tractor bosc fons complet tons marrons — texto blanco encima.',
    copy: `🚜 Contamos con maquinaria forestal propia: procesadoras, taladoras, cargadores y camiones.
⚙️ Eso nos permite ofrecer un servicio ágil, eficiente y sin depender de terceros.
🌲 Tu monte, en manos de profesionales.`,
    hashtags: ['MadeirasDoXallas','MaquinariaForestal','ExplotaciónForestal','SectorForestal','GaliciaRural','BosquesDeGalicia'],
  },
  {
    post_number: 10,
    platform: 'IG',
    headline_visual: '¿Tienes un monte? Te ayudamos',
    visual_prompt: 'Foto vista monte gallego fons complet tons marrons — texto blanco encima dirigit a propietaris.',
    copy: `🌳 ¿Tienes un monte con madera y no sabes por dónde empezar?
📋 Te ofrecemos tasación gratuita y sin compromiso, directamente sobre el terreno.
☎️ Llámanos: 689 532 374 | 881 090 502`,
    hashtags: ['MadeirasDoXallas','PropietariosForestales','TasaciónGratuita','GestiónForestal','MaderaGallega','GaliciaRural'],
  },
  {
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Proceso integral: tala, extracción y transporte',
    visual_prompt: 'Foto processo tala o troncos en camió fons complet tons marrons — texto blanco encima. Proceso completo.',
    copy: `🌲 Del monte a la fábrica: así trabajamos en Madeiras do Xallas.
🪓 Tala → 🚛 Transporte → 🏭 Entrega en fábrica
Un servicio integral que garantiza eficiencia y calidad en cada paso.`,
    hashtags: ['MadeirasDoXallas','ProcesoForestal','MaderaResponsable','GestiónForestal','BosquesDeGalicia'],
  },
  {
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Calidad certificada FSC® y PEFC',
    visual_prompt: 'Foto bosc saludable lluminós fons complet tons marrons — texto blanco encima. CTA final certificaciones.',
    copy: `🏆 Calidad avalada por certificaciones FSC® y PEFC.
🌱 Porque gestionar bien el bosque hoy es garantizar madera para el futuro.
📩 madeirasdoxallas@outlook.es
📍 Mazaricos, A Coruña · ☎️ 689 532 374`,
    hashtags: ['MadeirasDoXallas','FSC','PEFC','GestiónSostenible','MaderaGallega','ForestalResponsable'],
  },
];

async function run() {
  const { error: delErr } = await supabase
    .from('posts')
    .delete()
    .eq('client_id', CLIENT_ID);
  if (delErr) { console.error('Error al borrar:', delErr.message); process.exit(1); }
  console.log('🗑️  Posts anteriores borrados');

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
  console.log('\n✅ Listo. Recarga ContentFlow para ver los posts de MADEIRAS DO XALLAS.');
}

run();
