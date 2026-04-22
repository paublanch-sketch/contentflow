// insert_terafis_posts.mjs
// Ejecutar con: node insert_terafis_posts.mjs
// Inserta los 12 posts de TERAPIAS Y TRATAMIENTOS FÍSICOS SLP en Supabase

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'terapias-y-tratamientos-fisicos-slp';

const POSTS = [
  {
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Slide 1 — Título bold teal sobre fondo blanco limpio con logo ACTIVA\'T arriba centrado',
    visual_prompt: 'Clean white background. Top center: ACTIVA\'T by TERAFIS logo in teal. Large bold teal text centered: "FUSIÓN DE TÉCNICAS EFICACES CON CRITERIO CIENTÍFICO". Subtle gray divider line. Minimalist professional medical clinic aesthetic.',
    copy: `¿Te han diagnosticado una hernia discal, estenosis de canal lumbar o escoliosis y quieres evitar la cirugía?

En TERAFIS & ACTIVA'T trabajamos con el método VERTEBRAL GLOBAL SYSTEM: una unidad avanzada e integral de columna vertebral que combina lo que la ciencia avala.

✔ Descompresión vertebral
✔ Neuromodulación del dolor
✔ Terapia manual experta
✔ Electroestimulación muscular
✔ Ejercicio terapéutico personalizado

Puedes dejar de sentir dolor y recuperar movilidad, fuerza y buena postura con nosotros.

🔗 Reserva tu valoración en el link de la bio o por DM.`,
    hashtags: ['Terafis', 'Activat', 'ColumnaVertebral', 'FisioterapiaAvanzada', 'HerniaDiscal', 'EstenosisCanal', 'DolorDeEspalda', 'TerapiaManual', 'NeuromodulacionPercutanea', 'VertebralGlobalSystem'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Slide 2 — Foto camilla de fondo con overlay teal y lista de servicios en blanco + logo',
    visual_prompt: 'Full background: professional adjustable medical treatment table (camilla) with ultrasound equipment in clean clinical room. Dark teal overlay 55% opacity. ACTIVA\'T by TERAFIS logo top center in white. White bold text: "Osteopatía · Quiropráctica · Miofascial". White checklist below. Professional medical aesthetic.',
    copy: `Nuestra Terapia Integrativa Avanzada combina las técnicas más eficaces con criterio científico:

🔹 Osteopatía · Quiropráctica · Miofascial
🔹 Neuromodulación Percutánea Ecoguiada
🔹 Superinductiva Mag Rex 7,5 Teslas
🔹 Tecarterapia Capenergy
🔹 Laser de Alta Potencia
🔹 Ejercicio Terapéutico y Reeducación Postural

32 años y más de 30.000 pacientes tratados nos avalan.

📍 C/ Blai, 49 · Barcelona
📲 628 626 344 · info@terafis.es`,
    hashtags: ['Terafis', 'TerapiaIntegraiva', 'FisioterapiaBarcelona', 'Osteopatia', 'Neuromodulacion', 'MagRex', 'Tecarterapia', 'Activat', 'PobleSec', 'FisioterapiaAvanzada'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Diseño con fondo blanco, icono columna vertebral en teal y texto explicativo — estilo infografía limpia',
    visual_prompt: 'Clean white background. Teal icon of spine/vertebral column top. Bold teal header: "¿SABES QUÉ ES LA DESCOMPRESIÓN VERTEBRAL?". Below, clean text blocks explaining the treatment. ACTIVA\'T logo bottom. Medical infographic style matching terafis_bcn Instagram aesthetic.',
    copy: `¿Sabías que muchas operaciones de columna se pueden evitar? 🦴

La descompresión vertebral es una técnica no invasiva que alivia la presión sobre los discos y nervios, reduciendo el dolor sin cirugía.

En TERAFIS la combinamos dentro del programa VERTEBRAL GLOBAL SYSTEM con:
✔ Neuromodulación percutánea ecoguiada
✔ Terapia manual experta
✔ Electroestimulación muscular
✔ Ejercicio terapéutico personalizado

Especialmente indicada para:
→ Hernias discales y discopatías
→ Estenosis de canal lumbar
→ Problemas posturales y escoliosis
→ Rigidez vertebral

No te resignes al dolor. Existe solución.
📲 Reserva tu valoración: link en bio.`,
    hashtags: ['DescompresionVertebral', 'HerniaDiscal', 'EstenosisLumbar', 'Terafis', 'FisioterapiaBarcelona', 'DolorDeEspalda', 'SaludEspalda', 'TerapiaIntegrativa', 'Activat', 'ColumnaVertebral'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Foto de paciente en camilla con fisioterapeuta — overlay blanco inferior con texto en teal',
    visual_prompt: 'Photo of physiotherapist treating patient on treatment table. Professional clinical setting. White gradient overlay at bottom 40%. Bold teal text: "¿DOLOR QUE SIEMPRE VUELVE?". ACTIVA\'T logo corner. Clean, trustworthy, medical.',
    copy: `¿Sientes que has probado de todo y tu dolor de espalda siempre vuelve? 😣

Un analgésico o un masaje aislado no siempre son la solución definitiva. El cuerpo es una unidad y el dolor suele ser solo la "alarma" de algo más profundo.

Por eso nuestro enfoque es diferente:

✅ No tratamos solo el síntoma: vamos más allá de donde te duele hoy.
✅ Tratamos la causa: análisis global con enfoque integrativo, avanzado y 100% personalizado.

Combinamos tecnología de vanguardia + terapia manual experta + ejercicio terapéutico específico para devolverte la movilidad que has perdido. 🚀

No te resignes a vivir con dolor. Reserva tu valoración.
🔗 Link en bio.`,
    hashtags: ['DolorDeEspalda', 'SaludEspalda', 'FisioterapiaIntegrativa', 'Terafis', 'Activat', 'FisioterapiaTecnologica', 'TerapiaManual', 'FisioterapiaBarcelona', 'RecuperaTuBienestar', 'SinDolor'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Diseño split teal/blanco — lista de servicios TERAFIS con iconos a la izquierda y logo',
    visual_prompt: 'Split design: left teal panel (#006B7A) with white ACTIVA\'T logo and subtitle "TERAFIS · Blai, 49". Right white panel with bold teal title "SERVICIOS DESTACADOS" and clean list with arrow icons. Professional medical clinic style matching terafis_bcn.',
    copy: `¿Qué tratamos en TERAFIS? 🏥

> Osteopatía y Fisioterapia Avanzadas
> Traumatología y Cirugía Ortopédica
> Ecografía Musculoesquelética
> Neuromodulación Percutánea y Transcutánea
> Electrólisis EPTE System
> Magnetoterapia Superinductiva MAG REX (7,5 Teslas)
> Ondas de Choque
> Tecarterapia Capenergy
> Psiconeuroendocrinoinmunología
> Suelo Pélvico Masculino y Femenino
> ATM · Terapia Craneo-Mandibular
> Masaje Terapéutico y Deportivo

Todo bajo un mismo techo, con rigor científico y tecnología de vanguardia.

📍 C/ Blai, 49 · Barcelona · www.terafis.es`,
    hashtags: ['Terafis', 'FisioterapiaBarcelona', 'OsteopatiaBarcelona', 'Traumatologia', 'EctesisSystem', 'MagRex', 'OndasDeChoque', 'Tecarterapia', 'SueloPelvico', 'PobleSec'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Foto del gimnasio ACTIVA\'T con personas entrenando — overlay teal suave con texto blanco',
    visual_prompt: 'Photo of modern physiotherapy gym with exercise equipment. People training with physiotherapist supervision. Subtle teal overlay. Bold white title: "EJERCICIO TERAPÉUTICO". ACTIVA\'T by TERAFIS logo. Clean, active, health-focused aesthetic matching terafis_bcn style.',
    copy: `¿Sabías que muchas recaídas de lesiones crónicas se producen por falta de fortalecimiento y control muscular específico? 💪

El ejercicio terapéutico personalizado es la mejor herramienta para prevenir dolor futuro, mejorar la movilidad y proteger tus articulaciones.

En ACTIVA'T by TERAFIS evaluamos tu historial clínico, identificamos los desequilibrios musculares y diseñamos rutinas adaptadas a tu cuerpo, edad y nivel.

✅ Trabajo de fuerza específico
✅ Ejercicios de estabilidad y coordinación
✅ Movilidad articular
✅ Estiramientos y técnicas de recuperación

Recupera confianza en tu cuerpo y previene recaídas de forma progresiva y segura.
📲 Reserva tu sesión: link en bio.`,
    hashtags: ['EjercicioTerapeutico', 'Activat', 'Terafis', 'PrevencionLesiones', 'FisioterapiaFuncional', 'BienestarConTerafis', 'RecuperacionMuscular', 'FortalecimientoMuscular', 'SaludIntegral', 'ActivaTbyTerafis'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Infografía teal/blanca con texto "POSTURA" y figura corporal — estilo educativo limpio',
    visual_prompt: 'Clean white background. Teal header: "¿TU POSTURA TE ESTÁ PASANDO FACTURA?". Simple body posture illustration in teal. List of consequences and solutions. ACTIVA\'T logo. Educational infographic style matching terafis_bcn Instagram posts.',
    copy: `💙 Pasar muchas horas sentado, mirar constantemente el móvil o entrenar sin control postural puede generar tensiones en cuello, espalda y hombros, afectando tu bienestar diario.

Una buena postura es movimiento eficiente: te ayuda a respirar mejor, mantener equilibrio y moverte con libertad.

En ACTIVA'T by TERAFIS te enseñamos ejercicios personalizados para:
→ Reeducar tu postura
→ Fortalecer la musculatura profunda
→ Mejorar la coordinación

Porque cuidar la base es la mejor inversión en tu salud.

📲 Solicita tu plan personalizado: link en bio o por teléfono.`,
    hashtags: ['PosturaCorrecta', 'ReeducacionPostural', 'Terafis', 'EjercicioTerapeutico', 'FisioterapiaFuncional', 'Activat', 'SaludIntegral', 'PrevenciónLesiones', 'BienestarConTerafis', 'ActivaTbyTerafis'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Carrusel educativo — "5 SEÑALES de que tu suelo pélvico necesita atención" con iconos teal',
    visual_prompt: 'Clean white background. Bold teal header: "¿CUIDAS TU SUELO PÉLVICO?". 5 numbered items with teal checkmarks. ACTIVA\'T logo bottom. Clean medical infographic style. Educational, clear typography matching terafis_bcn.',
    copy: `🔹 El suelo pélvico y los abdominales se trabajan de la mano. Si haces deporte, especialmente de fuerza, asegúrate de hacerlo correctamente.

Un ejercicio mal ejecutado genera un aumento de presión intra-abdominal que afecta directamente a la musculatura del periné.

La buena noticia: con el entrenamiento adecuado puedes protegerlo y fortalecerlo.

En TERAFIS & ACTIVA'T somos especialistas en:
✔ Suelo pélvico masculino y femenino
✔ Control motor abdominal
✔ Readaptación deportiva con enfoque pélvico

💙 Acércate y programa una sesión de valoración.
📲 628 626 344 · info@terafis.es`,
    hashtags: ['SueloPelvico', 'SaludPelvica', 'Terafis', 'FisioterapiaAvanzada', 'Activat', 'ReadaptacionDeportiva', 'FisioterapiaBarcelona', 'SaludIntegral', 'MusculaturaCore', 'MovimientoEsSalud'],
    status: 'review',
    image_url: '',
  },
  {
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Foto equipo TERAFIS en clínica — texto "32 AÑOS CUIDANDO TU SALUD" con logo',
    visual_prompt: 'Photo of professional physiotherapy team in modern clinic. Warm teal overlay. Bold white text: "32 AÑOS CUIDANDO TU SALUD". Below: "+30.000 PACIENTES TRATADOS". ACTIVA\'T by TERAFIS logo. Trustworthy, warm, professional.',
    copy: `¡Por muchos años más juntos! 💙

Gracias por caminar a nuestro lado.

En TERAFIS, después de 32 años y más de 30.000 pacientes tratados, mantenemos la misma ilusión y energía para seguir mejorando a todos los niveles.

➡ Hemos actualizado nuestras instalaciones: TERAFIS (Blai, 49) y ACTIVA'T (Creu dels Molers, 47). Más espacio, más confort, más calidad asistencial.

➡ Hemos creado la TERAPIA INTEGRATIVA AVANZADA: el resultado de 32 años de conocimiento + formación continua en múltiples campos de la ciencia y la salud.

Mejorar tu salud y recuperar tu bienestar es nuestro objetivo.

Seguimos. 🙏`,
    hashtags: ['Terafis', 'Activat', 'Aniversario', '32Anos', 'FisioterapiaBarcelona', 'TerapiaIntegrativa', 'CuidatuSalud', 'Bienestar', 'TeCuidamos', 'PobleSec'],
    status: 'review',
    image_url: 'https://www.canva.com/d/mH5cnAY1ZmOuZvY',
  },
  {
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Diseño teal con texto "FISIOPILATES" y figura en movimiento — estilo ACTIVA\'T gym',
    visual_prompt: 'Teal background (#006B7A) with white ACTIVA\'T by TERAFIS logo. White bold title: "FISIOPILATES". Below in white: clean list of activities with icons. TERAFIS & ACTIVA\'T branding. Active, health, movement aesthetic matching their Instagram style.',
    copy: `¿Conoces nuestro centro ACTIVA'T en Creu dels Molers, 47? 🏋️

Más que un gimnasio: un espacio terapéutico donde el ejercicio es medicina.

> 🧘 Fisiopilates
> 💪 Entrenamiento de fuerza
> 🏃 Ejercicio terapéutico
> 🧍 Reeducación postural global
> ⚽ Readaptación deportiva
> 👥 Entrenos personales y en grupo

Todo supervisado por fisioterapeutas especializados, diseñado para tu cuerpo y tu historial clínico.

Porque el mejor ejercicio es el que haces bien.

📍 Creu dels Molers, 47 · Barcelona
🌐 www.terafis.es · 📲 628 626 344`,
    hashtags: ['Activat', 'Fisiopilates', 'EntrenamientoTerapeutico', 'Terafis', 'ReeducacionPostural', 'ReadaptacionDeportiva', 'EjercicioTerapeutico', 'GimnasioBarcelona', 'FisioterapiaBarcelona', 'ActivaTbyTerafis'],
    status: 'review',
    image_url: 'https://www.canva.com/d/owh5C1iwMGZcq2m',
  },
  {
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Foto ecografía musculoesquelética en consulta — texto "DIAGNÓSTICO DE PRECISIÓN" en teal',
    visual_prompt: 'Photo of musculoskeletal ultrasound in professional clinic setting. Teal and white color scheme. Bold text overlay: "DIAGNÓSTICO DE PRECISIÓN". ACTIVA\'T by TERAFIS logo. Medical technology aesthetic, clean and trustworthy.',
    copy: `Estamos a la vanguardia del diagnóstico clínico. 🔬

La ecografía musculoesquelética nos permite ver en tiempo real el estado de tus músculos, tendones, ligamentos y articulaciones, guiando los tratamientos con una precisión imposible sin imagen.

En TERAFIS la utilizamos para:
✔ Neuromodulación percutánea ecoguiada
✔ Diagnóstico de roturas, inflamaciones y atrapamientos
✔ Control del tratamiento en tiempo real
✔ Infiltraciones ecoguiadas con traumatología

Somos especialistas en el abordaje del sistema nervioso autónomo y el eje intestino-cerebro — podemos evaluarte y tratarte con rigor científico.

📲 Pide tu cita: link en bio.`,
    hashtags: ['EcografiaMusculoesqueletica', 'DiagnosticoDePrecision', 'Terafis', 'NeuromodulacionPercutanea', 'FisioterapiaAvanzada', 'FisioterapiaBarcelona', 'MedicinaIntegrativa', 'TerapiaIntegrativa', 'Activat', 'Traumatologia'],
    status: 'review',
    image_url: 'https://www.canva.com/d/YpucLVRJ9yHAFx2',
  },
  {
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Diseño cierre de ciclo — foto clínica + logo grande ACTIVA\'T + texto "TU SALUD, NUESTRA MISIÓN"',
    visual_prompt: 'Professional shot of TERAFIS clinic interior with modern equipment. Teal overlay. Large ACTIVA\'T by TERAFIS logo centered. Bold white text: "TU SALUD, NUESTRA MISIÓN". Bottom: clinic address and contact info. Definitive, brand statement aesthetic matching terafis_bcn.',
    copy: `💙 En TERAFIS & ACTIVA'T no tratamos enfermedades. Cuidamos personas.

Nuestro objetivo es que recuperes tu bienestar, vuelvas a moverte sin miedo y tengas herramientas para mantenerte activo/a el resto de tu vida.

Para eso ofrecemos:
🔹 DIAGNÓSTICO integral y personalizado
🔹 TRATAMIENTO con tecnología de vanguardia
🔹 MANTENIMIENTO con ejercicio terapéutico
🔹 PREVENCIÓN para que no vuelva a pasar

32 años y más de 30.000 pacientes nos dicen que el enfoque funciona.

¿Te unirás?

📍 TERAFIS · C/ Blai, 49 · Barcelona
📍 ACTIVA'T · Creu dels Molers, 47 · Barcelona
🌐 www.terafis.es
📲 628 626 344 / 934 434 208
✉ info@terafis.es`,
    hashtags: ['Terafis', 'Activat', 'TuSaludNuestraMision', 'FisioterapiaBarcelona', 'TerapiaIntegrativa', 'SaludIntegral', 'BienestarConTerafis', 'FisioterapiaAvanzada', 'PobleSec', 'CuidatuSalud'],
    status: 'review',
    image_url: 'https://www.canva.com/d/30VdXK40SVz5-KQ',
  },
];

async function run() {
  console.log('🗑️  Eliminando posts anteriores de TERAFIS...\n');
  const { error: delErr } = await sb.from('posts').delete().eq('client_id', CLIENT_ID);
  if (delErr) console.warn('⚠️  Delete warning:', delErr.message);

  console.log('📝 Insertando 12 posts de TERAPIAS Y TRATAMIENTOS FÍSICOS SLP...\n');
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
    else { console.log(`✅ Post #${p.post_number} — ${p.headline_visual.slice(0,55)}`); ok++; }
  }
  console.log(`\n🏁 Listo. ${ok}/12 posts insertados.`);
  console.log(`🔗 Ver en: https://contentflow-liard-nine.vercel.app (busca TERAPIAS Y TRATAMIENTOS FÍSICOS SLP)`);
}

run();
