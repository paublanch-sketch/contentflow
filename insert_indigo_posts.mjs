// insert_indigo_posts.mjs
// Ejecutar con: node insert_indigo_posts.mjs
// Inserta los 16 posts de INDIGO DJ SCHOOL en Supabase (calendario completo)

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
    scheduled_date: '2026-03-27',
    format: 'Imagen',
    headline_visual: 'SOLD OUT — Texto bold blanco sobre fondo oscuro con efecto grain morado',
    visual_prompt: 'Dark near-black background with indigo purple grain texture. Large bold white italic text: "SOLD OUT". Below in smaller white text: "CURSOS ABRIL-JUNIO COMPLETOS". Bottom: "GRACIAS POR CONFIAR" in neon yellow. ÍNDIGO logo top-left. Arrows >>> as decorative elements.',
    copy: `🔴 SOLD OUT

Abrimos inscripciones... y volvimos a llenar.

Los cursos de abril a junio están completos. Gracias a todos los que confiáis en Índigo para formaros. Ahora miramos a lo siguiente.

Ya están abiertas las inscripciones para septiembre.

🔗 Link en bio para reservar tu plaza.`,
    hashtags: ['IndigoDJSchool', 'SoldOut', 'CursoDJ', 'EscuelaDJ', 'DJSchool', 'Valladolid', 'FormacionDJ'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 2,
    platform: 'IG',
    scheduled_date: '2026-03-30',
    format: 'Carrusel',
    headline_visual: 'Foto alumno/a con filtro lila — texto "NUESTRXS ALUMNXS EN ACCIÓN" superpuesto',
    visual_prompt: 'Photo of DJ school student at decks with lila/purple color filter overlay (film grain + purple tint). Bold white text overlay top: "NUESTRXS ALUMNXS" bottom: "EN ACCIÓN >>>". ÍNDIGO logo corner. Dark vignette edges. Gritty, cinematic look.',
    copy: `🎧 NUESTRXS ALUMNXS EN ACCIÓN >>>

Entre teoría y reflexión, pasa esto.

Horas de práctica, errores que enseñan, correcciones en tiempo real. Nada espectacular para Instagram, pero todo lo que construye un DJ de verdad.

¿Cuándo empieza tu historia?

📲 Más info en bio · www.indigodjschool.com`,
    hashtags: ['IndigoDJSchool', 'AlumnosDJ', 'CursoDJ', 'EscuelaDJ', 'AprendeDJ', 'FormacionDJ', 'DJLife'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 3,
    platform: 'IG',
    scheduled_date: '2026-04-02',
    format: 'Reel',
    headline_visual: 'Reel de alumno en bolo real — texto "DE LA CLASE AL BOLO"',
    visual_prompt: 'Cover for Instagram Reel. Dark stage background with DJ performing at real event. Purple stage lighting. Bold white text: "DE LA CLASE" top, "AL BOLO >>>" large. Subtitle: "ALUMNOS ÍNDIGO EN DIRECTO". ÍNDIGO logo. Epic, live music energy.',
    copy: `🎤 DE LA CLASE AL BOLO >>>

Esto no es una práctica. Son alumnos tocando en eventos reales.

Porque aprender está bien... pero hacerlo fuera es lo que cambia todo.

¿Quieres ser el próximo?
📲 Reserva tu plaza: link en bio
📍 Valladolid · Online · Ibiza`,
    hashtags: ['IndigoDJSchool', 'AlumnosDJ', 'DelaClaseAlBolo', 'CursoDJ', 'DJSchool', 'EscuelaDJ', 'DJLife'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 4,
    platform: 'IG',
    scheduled_date: '2026-04-06',
    format: 'Carrusel',
    headline_visual: 'Texto directo sobre fondo oscuro — "SEAMOS FRANCOS"',
    visual_prompt: 'Dark indigo background with bold typographic layout. First slide: "SEAMOS" bold white top, "FRANCOS >>>" large yellow-accented. Subsequent slides reveal each point. Gritty, honest editorial aesthetic. ÍNDIGO logo.',
    copy: `💬 SEAMOS FRANCOS

Pinchar bien ya no es suficiente.

Si nadie piensa en ti, no estás en el juego. Y eso no se construye solo.

Esto no va de talento. Va de contexto, visibilidad y relaciones.

¿Tienes todo eso trabajado?

👉 En La Tribu DJ te ayudamos a construirlo.
🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'CursoDJ', 'SeamosFrancos', 'LaTribuDJ', 'DJCareer', 'FormacionDJ', 'DJProfesional'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 5,
    platform: 'IG',
    scheduled_date: '2026-04-10',
    format: 'Reel',
    headline_visual: 'Reel mostrando el interior de La Tribu — "ESTO PASA DENTRO DE LA TRIBU"',
    visual_prompt: 'Cover for Instagram Reel. Dark black background with purple diagonal lines pattern. La Tribu DJ logo prominent. Bold italic white text: "ESTO PASA DENTRO" and "DE LA TRIBU >>>". Neon yellow accent lines. ÍNDIGO branding corner. Dynamic, community energy.',
    copy: `⚡ ESTO PASA DENTRO DE LA TRIBU >>>

Esto no es contenido. Es contexto, feedback y dirección.

Lo que pasa aquí dentro es lo que muchos echan en falta fuera.

🎧 Clases y talleres en directo
📚 Recursos exclusivos para DJs
🤝 Red de contactos real
🚀 El empujón que tu carrera necesita

🔗 Únete: link en bio`,
    hashtags: ['LaTribuDJ', 'IndigoDJSchool', 'ComunidadDJ', 'FormacionDJ', 'DJOnline', 'CursoDJ', 'DJLife'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 6,
    platform: 'IG',
    scheduled_date: '2026-04-14',
    format: 'Reel',
    headline_visual: 'Testimonios en reel — "LO DICEN ELLOS"',
    visual_prompt: 'Cover for Instagram Reel. Dark cinematic background with purple color grade. Film grain. Bold white text: "LO DICEN" top, "ELLOS >>>" large. Authentic, raw, testimonial feel. ÍNDIGO logo.',
    copy: `🎬 LO DICEN ELLOS >>>

No es una promesa. Es lo que está pasando dentro.

DJs con historias distintas, pero con algo en común: quieren avanzar con dirección.

¿Qué te está frenando a ti?

📲 www.indigodjschool.com
🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'LoDicenEllos', 'TestimoniosDJ', 'LaTribuDJ', 'CursoDJ', 'FormacionDJ', 'DJSchool'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 7,
    platform: 'IG',
    scheduled_date: '2026-04-18',
    format: 'Carrusel',
    headline_visual: 'Carrusel directo — "DJs ATENCIÓN UN SEGUNDO"',
    visual_prompt: 'Dark black background. First slide: "DJs," bold yellow, "ATENCIÓN" huge white, "UN SEGUNDO >>>" below. Subsequent slides with bold statements. Urban, punchy editorial feel. ÍNDIGO logo.',
    copy: `🎚️ DJs, ATENCIÓN UN SEGUNDO >>>

La mayoría no está estancada por falta de talento.

Está estancada por falta de dirección.

Y eso cambia cuando empiezas a rodearte bien.

¿Con quién te estás formando tú?

👉 La Tribu DJ — comunidad formativa para DJs que quieren avanzar.
🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'DJsAtencion', 'CursoDJ', 'LaTribuDJ', 'FormacionDJ', 'DJCareer', 'EscuelaDJ'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 8,
    platform: 'IG',
    scheduled_date: '2026-04-22',
    format: 'Imagen',
    headline_visual: 'Foto alumnos en clase — frase directa superpuesta',
    visual_prompt: 'Photo of students in DJ class, dark studio with purple ambient light. Candid, real classroom moment. Text overlay in bold white: "ESTO TAMBIÉN ES PARTE DEL PROCESO." below in smaller: "MENOS RUIDO. MÁS TRABAJO." ÍNDIGO logo corner. Documentary, raw feel.',
    copy: `🖤 ESTO TAMBIÉN ES PARTE DEL PROCESO.

Menos ruido. Más trabajo.

Así es como se construye.

📍 Valladolid · Online · Ibiza
📲 www.indigodjschool.com`,
    hashtags: ['IndigoDJSchool', 'CursoDJ', 'EscuelaDJ', 'AlumnosDJ', 'DJLife', 'FormacionDJ', 'Proceso'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 9,
    platform: 'IG',
    scheduled_date: '2026-05-02',
    format: 'Carrusel',
    headline_visual: 'Carrusel de criterio — "ESTO SIGUE PASANDO"',
    visual_prompt: 'Dark indigo background. First slide: bold white title "ESTO SIGUE" top, "PASANDO >>>" large yellow. Each subsequent slide reveals a reality check statement. Bold, confrontational typography. ÍNDIGO branding.',
    copy: `⚡ ESTO SIGUE PASANDO >>>

No es personal. Es profesional.

Cuando entiendes esto, todo cambia.

DJs que llevan años sin avanzar. DJs que trabajan solos sin red. DJs con técnica pero sin visibilidad.

La solución no es más práctica sola.
Es dirección, contexto y comunidad.

🔗 La Tribu DJ — link en bio`,
    hashtags: ['IndigoDJSchool', 'EstoSiguePasando', 'CursoDJ', 'LaTribuDJ', 'DJCareer', 'FormacionDJ', 'EscuelaDJ'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 10,
    platform: 'IG',
    scheduled_date: '2026-05-07',
    format: 'Carrusel',
    headline_visual: 'Vinilo con frase — "LO QUE NADIE TE CUENTA DE CRECER COMO DJ"',
    visual_prompt: 'Dark background with single yellow vinyl record. Clean bold white typography. Title: "LO QUE NADIE TE CUENTA" top, subtitle "DE CRECER COMO DJ" below. ÍNDIGO small logo bottom-right. Elegant, graphic, simple contrast.',
    copy: `🖤 LO QUE NADIE TE CUENTA DE CRECER COMO DJ

Crecer no siempre es cómodo. Pero es necesario si quieres avanzar de verdad.

El equipo importa, pero no es lo primero.
La técnica se aprende, pero no es suficiente.
Los contactos abren puertas, pero hay que saber llamar.

Lo que marca la diferencia real es la mentalidad y la constancia.

¿Quieres saber cómo acelerar ese proceso?
👉 Te lo contamos en La Tribu DJ.
🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'CrecerComoDJ', 'ConsejoDJ', 'MentalidadDJ', 'LaTribuDJ', 'DJLife', 'FormacionDJ'],
    status: 'review',
    image_url: 'https://www.canva.com/d/TYBuuJ8lX8rQcI2',
  },
  {
    post_number: 11,
    platform: 'IG',
    scheduled_date: '2026-05-12',
    format: 'Carrusel',
    headline_visual: 'Split visual — "DJ AMATEUR VS PROFESIONAL"',
    visual_prompt: 'Dark indigo background split composition. Two sides: amateur vs professional DJ mindset. Bold white text "DJ AMATEUR" left vs "PROFESIONAL" right with VS divider in neon yellow. Urban gritty typography. ÍNDIGO logo corner.',
    copy: `🎧 DJ AMATEUR VS PROFESIONAL >>>

La diferencia no está en la técnica.

Está en cómo piensas lo que haces.

AMATEUR: practica y espera.
PROFESIONAL: practica, conecta, posiciona y construye.

¿En qué lado estás tú?

👉 En La Tribu DJ trabajamos los dos.
🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'AmateurVsProfesional', 'DJProfesional', 'CursoDJ', 'LaTribuDJ', 'FormacionDJ', 'DJSchool'],
    status: 'review',
    image_url: 'https://www.canva.com/d/6jgr2uhpfkXmnFB',
  },
  {
    post_number: 12,
    platform: 'IG',
    scheduled_date: '2026-05-18',
    format: 'Carrusel',
    headline_visual: 'CDJs en club oscuro — "ERRORES QUE NO ARREGLAS EN CASA"',
    visual_prompt: 'Dark studio background. CDJ setup in dim blue/purple club light. Bold white text overlay: "ERRORES QUE NO" top, "ARREGLAS EN CASA >>>" large below. Neon yellow accents. ÍNDIGO branding. Raw club vibe.',
    copy: `🎚️ ERRORES QUE NO ARREGLAS EN CASA >>>

No todo se corrige practicando.

Algunas cosas solo se entienden cuando sales fuera.

El nerviosismo en directo.
La presión de un bolo real.
La lectura de una pista que no conoces.

Eso no se aprende en el salón.

Por eso en Índigo practicamos en entornos reales.
📍 Valladolid · Online · Ibiza

🔗 Link en bio`,
    hashtags: ['IndigoDJSchool', 'CursoDJ', 'EscuelaDJ', 'DJSchool', 'AprendeDJ', 'ErroresDJ', 'FormacionDJ'],
    status: 'review',
    image_url: 'https://www.canva.com/d/Rt4_PfVoGRrrz70',
  },
  {
    post_number: 13,
    platform: 'IG',
    scheduled_date: '2026-06-02',
    format: 'Carrusel',
    headline_visual: 'FAQ estilo grid morado — "PREGUNTAS REALES LA TRIBU DJ"',
    visual_prompt: 'Dark indigo/black background with subtle purple grid. 4 question icons. Bold neon yellow title: "PREGUNTAS REALES" top, "LA TRIBU DJ >>>" white below. FAQ layout. La Tribu DJ badge. ÍNDIGO logo corner. Urban bold typography.',
    copy: `💬 PREGUNTAS REALES · LA TRIBU DJ

Dudas normales. Cuando te planteas tomarte esto en serio, necesitas entender bien dónde te metes.

❓ "¿Para qué nivel es La Tribu?"
❓ "¿Hay clases en directo o solo contenido grabado?"
❓ "¿Puedo cancelar cuando quiera?"
❓ "¿En cuánto tiempo se notan resultados?"

Las respondemos todas en el link de bio.
🔗 Entra y decide con criterio.`,
    hashtags: ['LaTribuDJ', 'IndigoDJSchool', 'ComunidadDJ', 'CursoDJ', 'FormacionDJ', 'DJOnline', 'PreguntrasDJ'],
    status: 'review',
    image_url: 'https://www.canva.com/d/KTja5hzowldHzey',
  },
  {
    post_number: 14,
    platform: 'IG',
    scheduled_date: '2026-06-08',
    format: 'Carrusel',
    headline_visual: 'Carrusel preguntas 2 — "MÁS PREGUNTAS LA TRIBU DJ"',
    visual_prompt: 'Dark black background with indigo purple diagonal lines. Bold white text: "MÁS PREGUNTAS" top, "LA TRIBU DJ >>>" large. Neon yellow arrows. Question mark icons. ÍNDIGO logo. La Tribu DJ badge.',
    copy: `💬 MÁS PREGUNTAS · LA TRIBU DJ

Seguimos respondiendo lo que más nos preguntáis. Porque decidir con criterio es parte del proceso.

❓ "¿Qué diferencia a La Tribu de un curso normal?"
❓ "¿Puedo entrar aunque acabe de empezar?"
❓ "¿Hay comunidad activa o solo se sube contenido?"
❓ "¿Vale la pena si ya tengo experiencia?"

La respuesta corta: sí a todo.
La respuesta larga: en bio.
🔗 Link en bio`,
    hashtags: ['LaTribuDJ', 'IndigoDJSchool', 'ComunidadDJ', 'FormacionDJ', 'DJOnline', 'CursoDJ', 'EscuelaDJ'],
    status: 'review',
    image_url: 'https://www.canva.com/d/cnGYJaNvdz3aL2M',
  },
  {
    post_number: 15,
    platform: 'IG',
    scheduled_date: '2026-06-15',
    format: 'Carrusel',
    headline_visual: 'Dos opciones de precio — "MENSUAL O ANUAL | 25% DESCUENTO"',
    visual_prompt: 'Dark indigo background with premium feel. Two pricing card options: MENSUAL and ANUAL. Bold neon yellow badge: "AHORRA UN 25%". Bold white title: "MENSUAL O ANUAL". ÍNDIGO logo and La Tribu DJ branding. Premium purple accent glow.',
    copy: `⚡ MENSUAL O ANUAL · TÚ DECIDES

Muchos empiezan probando. Muchos se quedan.

Porque cuando entiendes lo que hay dentro, la decisión es fácil.

📅 MENSUAL → entra y prueba sin compromiso
📆 ANUAL → ahorra un 25% y va en serio

Los dos acceden a todo:
🎧 Clases en directo
📚 Biblioteca de recursos
🤝 Comunidad activa
🚀 Mentoría y feedback real

🔗 Elige la tuya: link en bio`,
    hashtags: ['LaTribuDJ', 'IndigoDJSchool', 'ComunidadDJ', 'FormacionDJ', 'DJOnline', 'CursoDJ', 'MembresíaDJ'],
    status: 'review',
    image_url: 'https://www.canva.com/d/aSXMqmIl4DrM76S',
  },
  {
    post_number: 16,
    platform: 'IG',
    scheduled_date: '2026-06-22',
    format: 'Reel',
    headline_visual: 'Reel de testimonio final — "ESTO ESTÁ PASANDO"',
    visual_prompt: 'Cover for Instagram Reel. Dark black background with deep purple cinematic color grade. Film grain texture overlay. Bold italic white text centered: "ESTO ESTÁ" top, "PASANDO >>>" large below. Dramatic purple stage lighting glow. ÍNDIGO full logo. Epic, raw, testimonial energy.',
    copy: `🎬 ESTO ESTÁ PASANDO

No lo decimos nosotros.

Lo dice lo que está pasando dentro de La Tribu DJ.

DJs que dan el paso. Que empiezan a actuar. Que construyen su carrera con dirección.

¿Tú cuándo?

🔗 Link en bio · www.indigodjschool.com
📲 622.15.14.11`,
    hashtags: ['IndigoDJSchool', 'LaTribuDJ', 'EstáPasando', 'CursoDJ', 'EscuelaDJ', 'FormacionDJ', 'DJSchool'],
    status: 'review',
    image_url: 'https://www.canva.com/d/GtCOxhY426P0IV9',
  },
];

async function run() {
  console.log('🗑️  Eliminando posts anteriores de SERGIO...\n');
  const { error: delErr } = await sb.from('posts').delete().eq('client_id', CLIENT_ID);
  if (delErr) console.warn('⚠️  Delete warning:', delErr.message);

  console.log('📝 Insertando 16 posts de INDIGO DJ SCHOOL...\n');
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
      image_url: p.image_url || '',
      webhook_sent_at: null,
    };
    const { error } = await sb.from('posts').upsert(record);
    if (error) console.error(`❌ Post #${p.post_number}:`, error.message);
    else { console.log(`✅ Post #${p.post_number} (${p.scheduled_date}) — ${p.headline_visual.slice(0,50)}`); ok++; }
  }
  console.log(`\n🏁 Listo. ${ok}/16 posts insertados.`);
  console.log(`🔗 Ver en: https://contentflow-liard-nine.vercel.app (busca SERGIO RODRIGUEZ CORTAZAR)`);
}

run();
