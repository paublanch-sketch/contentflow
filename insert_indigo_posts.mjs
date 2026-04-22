// insert_indigo_posts.mjs
// Ejecutar con: node insert_indigo_posts.mjs
// Inserta los 12 posts de INDIGO DJ SCHOOL en Supabase

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'sergio-rodriguez-cortazar';

const POSTS = [
  {
    post_number: 1,
    platform: 'IG',
    headline_visual: 'SOLD OUT — Texto bold blanco sobre fondo oscuro con efecto grain morado',
    visual_prompt: 'Dark near-black background with indigo purple grain texture. Large bold white italic text: "SOLD OUT". Below in smaller white text: "CURSOS ABRIL-JUNIO COMPLETOS". Bottom: "GRACIAS POR CONFIAR" in neon yellow. ÍNDIGO logo top-left. Arrows >>> as decorative elements.',
    copy: `🔴 SOLD OUT

Cursos abril-junio completos.

Gracias a cada uno de vosotros por confiar en ÍNDIGO para dar el paso. Las plazas volaron.

¿Te quedaste fuera? 👇
Inscripciones abiertas para septiembre.

🔗 Link en bio para reservar tu plaza.`,
    hashtags: ['IndigoDJSchool', 'SoldOut', 'CursoDJ', 'EscuelaDJ', 'DJSchool', 'Valladolid', 'FormacionDJ'],
    status: 'scheduled',
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Foto alumno/a con filtro lila — texto "NUESTROS ALUMNOS EN ACCIÓN" superpuesto',
    visual_prompt: 'Photo of DJ school student at decks with lila/purple color filter overlay (like film grain + purple tint). Bold white text overlay top: "NUESTROS ALUMNOS" bottom: "EN ACCIÓN >>>". ÍNDIGO logo corner. Dark vignette edges. Gritty, cinematic look.',
    copy: `🎧 NUESTROS ALUMNOS EN ACCIÓN >>>

Esto es lo que pasa cuando empiezas a tomarte en serio tu carrera como DJ.

Práctica real. Equipos profesionales. Resultados que se ven.

¿Cuándo empieza tu historia?

📲 Más info en bio · www.indigodjschool.com`,
    hashtags: ['IndigoDJSchool', 'AlumnosDJ', 'CursoDJ', 'EscuelaDJ', 'AprendeDJ', 'FormacionDJ', 'DJLife'],
    status: 'review',
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Fondo oscuro con CDJs iluminados — texto "TU PRIMER SET EMPIEZA AQUÍ"',
    visual_prompt: 'Dark studio background with professional CDJ setup glowing in purple/blue light. Bold italic white text: "TU PRIMER SET" on first line, "EMPIEZA AQUÍ" larger below. Arrow >>> element. Small text: "CURSO DJ PRO · PLAZAS LIMITADAS". ÍNDIGO logo. Glow and smoke effect.',
    copy: `🎚️ TU PRIMER SET EMPIEZA AQUÍ >>>

No hace falta experiencia previa. Solo hace falta querer aprender de verdad.

En el Curso DJ PRO de ÍNDIGO vas de cero a actuar ante público en semanas.

📍 Valladolid + Online
🎓 Clases pequeñas · Atención personalizada
⚡ Plazas muy limitadas

📲 Reserva la tuya: link en bio`,
    hashtags: ['CursoDJ', 'IndigoDJSchool', 'AprendeDJ', 'DJPro', 'EscuelaDJ', 'Valladolid', 'DJSchool', 'PrimerSet'],
    status: 'review',
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Grid de preguntas típicas sobre ser DJ — estética oscura morada con texto amarillo',
    visual_prompt: 'Dark indigo background. Grid layout with 4 speech bubble icons. Title: "PREGUNTAS TÍPICAS SOBRE SER DJ" in bold yellow. Questions in white text. ÍNDIGO logo corner. La Tribu DJ badge. Urban, bold typography style.',
    copy: `💬 Las preguntas que TODO el mundo hace antes de empezar:

❓ "¿Necesito saber música?"
❓ "¿Es muy caro el equipo?"
❓ "¿Hay salida profesional de verdad?"
❓ "¿A qué edad es tarde para empezar?"

Y la respuesta a todas es: menos complicado de lo que crees.

Te lo contamos todo en La Tribu DJ 👇
🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'DJQuestions', 'AprendeDJ', 'CursoDJ', 'LaTribuDJ', 'SerDJ', 'EscuelaDJ'],
    status: 'review',
  },
  {
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Banner oscuro con logo La Tribu DJ — texto "PORQUE TU CARRERA NO VA A DESPEGAR SOLA"',
    visual_prompt: 'Dark black background with purple diagonal lines pattern. La Tribu DJ logo prominent. Bold italic white text: "PORQUE TU CARRERA DJ" and "NO VA A DESPEGAR SOLA". Neon yellow accent lines. ÍNDIGO branding corner. Dynamic, community energy.',
    copy: `⚡ LA TRIBU DJ >>>

La comunidad formativa DJ online más importante de habla hispana.

Aquí encontrarás:
🎧 Clases y talleres en directo
📚 Recursos exclusivos para DJs
🤝 Red de contactos real
🚀 El empujón que tu carrera necesita

Acelera tu profesionalización. Ahorra tiempo y errores.

🔗 Únete: link en bio`,
    hashtags: ['LaTribuDJ', 'IndigoDJSchool', 'ComunidadDJ', 'FormacionDJ', 'DJOnline', 'CursoDJ', 'DJLIFE'],
    status: 'review',
  },
  {
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Laptop con Ableton abierto en fondo oscuro — texto "CREA TUS PROPIOS MASHUPS"',
    visual_prompt: 'Close-up of laptop screen showing Ableton Live waveforms, dark ambient background with purple glow. Bold white text overlay: "CREA TUS PROPIOS" top, "MASHUPS >>>" large below. Yellow badge: "CON ABLETON LIVE". 6 HORAS · VÍA ZOOM badge. ÍNDIGO logo.',
    copy: `🎛️ CREACIÓN DE MASHUPS CON ABLETON LIVE

Aprende a construir los mashups que van a hacer que tus sets sean únicos.

De la mano de @sergeirez_ — DJ y productor con tracks publicados en Toolroom, Armada, Hexagon, Revealed, CR2 y Protocol Recordings.

⏱️ 6 HORAS · VÍA ZOOM
📅 Próximas fechas: consulta en bio

💡 No necesitas experiencia con Ableton
📲 Más info: www.indigodjschool.com`,
    hashtags: ['Mashups', 'AbletonLive', 'IndigoDJSchool', 'CursoDJ', 'ProduccionMusical', 'DJSchool', 'SergeiRez'],
    status: 'review',
  },
  {
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Foto backstage/evento — texto "DESDE DENTRO" con efecto cinematográfico morado',
    visual_prompt: 'Cinematic backstage DJ event photo with strong purple/indigo color grade. Film grain texture. Bold text: "DESDE DENTRO >>>". Subtitle: "ASÍ ES UNA CLASE EN ÍNDIGO". ÍNDIGO logo. Raw, authentic documentary feel.',
    copy: `🎬 DESDE DENTRO >>>

Así es una clase real en ÍNDIGO.

Sin postureo. Sin teoría aburrida.
Equipos profesionales, instructores que actúan en festivales, y tú aprendiendo de verdad.

Esto es lo que te espera cuando te apuntas.

📲 Reserva tu plaza: link en bio
📍 Valladolid · Online · Ibiza`,
    hashtags: ['IndigoDJSchool', 'DesdeDentro', 'ClaseDJ', 'EscuelaDJ', 'BehindTheScenes', 'CursoDJ', 'DJSchool'],
    status: 'review',
  },
  {
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Vinilo amarillo sobre fondo negro — texto con consejo DJ',
    visual_prompt: 'Minimalist dark background with single yellow vinyl record. Clean bold white typography. Title: "LO QUE NADIE TE CUENTA" top, subtitle "DE CUANDO CRECES COMO DJ" below. ÍNDIGO small logo bottom-right. Elegant, graphic, simple contrast.',
    copy: `🖤 LO QUE NADIE TE CUENTA DE CUANDO CRECES COMO DJ

El equipo importa, pero no es lo primero.
La técnica se aprende, pero no es suficiente.
Los contactos abren puertas, pero hay que saber llamar.

Lo que marca la diferencia real es la mentalidad y la constancia.

¿Quieres saber cómo acelerar ese proceso?
👉 Te lo contamos en La Tribu DJ.
🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'ConsejoDJ', 'CrecerComoDJ', 'MentalidadDJ', 'LaTribuDJ', 'DJLife', 'FormacionDJ'],
    status: 'review',
  },
  {
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Foto Ibiza con CDJs — banner "CURSO DJ INTENSIVO EN IBIZA"',
    visual_prompt: 'Ibiza nightlife/sunset background with DJ equipment in foreground. Dark purple/orange gradient overlay. Bold white italic text: "CURSO DJ INTENSIVO" top, "EN IBIZA >>>" large. Yellow badge: "CON SERGEI REZ". Dates badge. ÍNDIGO logo. Epic, aspirational feeling.',
    copy: `🌴 CURSO DJ INTENSIVO EN IBIZA

La capital mundial de la música electrónica como aula.

Con @sergeirez_ · 3 días de inmersión total.

✅ Técnica avanzada
✅ Clases en clubs reales
✅ Experiencia DJ única
✅ Grupo reducido

📅 Próximas fechas: consulta en bio
💶 Plazas muy limitadas — no esperes

📲 Más info: www.indigodjschool.com`,
    hashtags: ['CursoDJIbiza', 'IndigoDJSchool', 'SergeiRez', 'Ibiza', 'CursoDJ', 'DJSchool', 'IbizaDJ', 'MusicaElectronica'],
    status: 'review',
  },
  {
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Mapa de España con puntos de alumnos — texto "FORMANDO DJS POR TODA ESPAÑA"',
    visual_prompt: 'Dark indigo background with subtle map of Spain showing glowing dots across cities. Bold white text: "FORMANDO DJS" top, "POR TODA ESPAÑA >>>" large. Small yellow text: "+500 ALUMNOS". ÍNDIGO logo. Pride, national reach, community feeling.',
    copy: `🇪🇸 FORMANDO DJS POR TODA ESPAÑA >>>

De Valladolid al resto del país.

Alumnos de Madrid, Barcelona, Bilbao, Sevilla, Valencia, Málaga... y muchos más ciudades han pasado por ÍNDIGO.

La distancia no es excusa:
📍 Formato presencial en Valladolid
💻 Formato online para todo el mundo

¿De dónde eres tú? 👇 Cuéntanoslo en comentarios.

📲 www.indigodjschool.com`,
    hashtags: ['IndigoDJSchool', 'FormandoDJs', 'EscuelaDJ', 'CursoDJOnline', 'DJEspaña', 'DJSchool', 'CursoDJ'],
    status: 'review',
  },
  {
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Showcase event — anuncio con foto del evento y detalles',
    visual_prompt: 'Dark event poster style. DJ mixing at showcase with purple stage lighting. Bold white text: "INDIGO DJ SCHOOL" top, "SHOWCASE >>>" large center. Event details in yellow: date, venue, time. "SORTEO DE CASCOS DJ" badge. ÍNDIGO branding. Hype, energy, event poster feel.',
    copy: `🎤 INDIGO DJ SCHOOL SHOWCASE

Nuestros alumnos suben al escenario.

Ven a ver en directo el nivel que se alcanza después de formarse en ÍNDIGO.
Y sí — habrá sorteo de cascos DJ entre los asistentes. 🎧

📍 Espacio Joven Norte · Valladolid
🕕 17:30h
📅 Próxima fecha: consulta en bio

Entrada libre · ¡No te lo pierdas!
🔗 Link en bio`,
    hashtags: ['IndigoDJShowcase', 'IndigoDJSchool', 'ShowcaseDJ', 'EscuelaDJ', 'Valladolid', 'EventoDJ', 'DJSchool'],
    status: 'review',
  },
  {
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Foto del estudio/sala con frase de impacto — cierre de ciclo de posts',
    visual_prompt: 'Professional DJ studio wide shot, dark with purple ambient glow on equipment. Strong cinematic color grade. Bold italic white text centered: "DONDE NACEN" top, "LOS DJS PROFESIONALES >>>". ÍNDIGO full logo below. Bottom: "622.15.14.11 · indigodjschool.com". Epic, definitive, brand statement.',
    copy: `🎧 DONDE NACEN LOS DJS PROFESIONALES >>>

En ÍNDIGO no enseñamos a poner música.

Formamos DJs que trabajan.
Que actúan en festivales.
Que publican sus propias producciones.
Que construyen carreras reales.

35 años de experiencia del sector en cada clase.

¿Listo para dar el paso?
📲 622.15.14.11
🌐 www.indigodjschool.com
📍 Valladolid · Online · Ibiza`,
    hashtags: ['IndigoDJSchool', 'EscuelaDJ', 'DJProfesional', 'CursoDJ', 'DJSchool', 'FormacionDJ', 'Valladolid', 'DondeNacenLosProfe'],
    status: 'review',
  },
];

async function run() {
  console.log('🗑️  Eliminando posts anteriores de SERGIO...\n');
  const { error: delErr } = await sb.from('posts').delete().eq('client_id', CLIENT_ID);
  if (delErr) console.warn('⚠️  Delete warning:', delErr.message);

  console.log('📝 Insertando 12 posts de INDIGO DJ SCHOOL...\n');
  let ok = 0;
  for (const p of POSTS) {
    const record = {
      id: `${CLIENT_ID}-${p.post_number}`,
      client_id: CLIENT_ID,
      post_number: p.post_number,
      platform: p.platform,
      headline_visual: p.headline_visual,
      visual_prompt: p.visual_prompt,
      copy: p.copy,
      hashtags: p.hashtags,
      status: p.status,
      feedback: '',
      image_url: '',
      webhook_sent_at: null,
    };
    const { error } = await sb.from('posts').upsert(record);
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else { console.log(`✅ Post #${p.post_number} — ${p.headline_visual.slice(0,50)}`); ok++; }
  }
  console.log(`\n🏁 Listo. ${ok}/12 posts insertados.`);
  console.log(`🔗 Ver en: https://contentflow-liard-nine.vercel.app (busca SERGIO RODRIGUEZ CORTAZAR)`);
}

run();
