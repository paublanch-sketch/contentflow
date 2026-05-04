import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'javier-manrique-de-lara';

// ─────────────────────────────────────────────────────────────────────────────
// 12 POSTS — TAO CENTER MADRID (JAVIER MANRIQUE DE LARA)
// Red social: Instagram + Facebook
// Tono: filosófico, sereno, inspirador — nunca comercial agresivo
// Temáticas: 12 diferentes, sin repetir
// ─────────────────────────────────────────────────────────────────────────────
const posts = [
  {
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Tao Yin K.Y. — El arte de canalizar la energía',
    visual_prompt: 'ESTILO INSPIRACIONAL. Foto de persona practicando Tao Yin en el suelo sobre esterilla, fondo de naturaleza verde con luz dorada. Texto en blanco sobre foto: "El arte de canalizar la energía" (grande, arriba). Subtítulo "Tao Yin K.Y." debajo. Botón negro redondeado con "Descúbrelo". Logo TAO Center pequeño esquina superior. Paleta: verdes, dorado, blanco.',
    copy: `El Tao Yin K.Y. es la joya más celosamente guardada del Taoísmo. 🌿

A través de movimientos en el suelo y respiración consciente, activamos la energía que fluye por nuestra columna vertebral.

Cada movimiento es un diálogo entre tu cuerpo y tu energía.

¿Cuándo fue la última vez que escuchaste a tu cuerpo de verdad?

👉 Primera clase gratuita en taocenter.es`,
    hashtags: ['TaoYin','TaoCenterMadrid','TaoYinKY','EnergiaVital','BienestarMadrid','SaludHolistica','TaoCenter'],
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Tai Chi — Fluir con la vida',
    visual_prompt: 'ESTILO EDUCATIVO/HOOK. Foto de persona practicando Tai Chi en parque, amanecer con luz naranja/dorada de fondo. Texto en negrita grande oscuro sobre parte inferior clara: "APRENDE A FLUIR CON LA VIDA". Subtítulo: "con esta práctica milenaria". Footer oscuro con "TAO CENTER MADRID" en blanco. Logo TAO pequeño.',
    copy: `El Tai Chi no es solo movimiento. 💫

Es la práctica de ser agua: adaptarse, fluir, encontrar el camino sin forzar.

Cada sesión calma el sistema nervioso, fortalece articulaciones y conecta cuerpo, mente y espíritu.

Millones de personas en el mundo lo practican cada día. ¿Sabes por qué?

👉 Ven a descubrirlo en taocenter.es`,
    hashtags: ['TaiChi','TaoCenterMadrid','ChiKung','BienestarMadrid','ArtesMarciales','ArtesMarcialesInternas','TaoCenter'],
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Chi Kung — La respiración que sana',
    visual_prompt: 'ESTILO INSPIRACIONAL. Manos abiertas hacia arriba recibiendo luz solar, fondo de cielo dorado. Texto negro grande arriba: "Chi Kung es infinito" — subtítulo: "Cada respiración, una oportunidad de sanar". Botón redondeado negro: "Empieza hoy". Logo TAO Center pequeño. Cálido, luminoso.',
    copy: `Cada respiración es una oportunidad de sanar. ✨

El Chi Kung combina respiración consciente, movimiento armónico e intención para mover la energía vital por todo el cuerpo.

3 beneficios que notarás desde la primera sesión:
➡️ Menos tensión en el cuerpo
➡️ Mente más calmada
➡️ Mayor vitalidad y energía

👉 Conoce nuestros programas en taocenter.es`,
    hashtags: ['ChiKung','Qigong','TaoCenterMadrid','BienestarMadrid','SaludNatural','EnergiaVital','TaoCenter'],
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Chi Nei Tsang — El masaje que libera emociones',
    visual_prompt: 'ESTILO EDUCATIVO/HOOK. Foto de masaje terapéutico abdominal, luz cálida suave. Texto en negrita grande en la mitad inferior: "LIBERA LAS EMOCIONES ACUMULADAS EN TU CUERPO". Subtítulo pequeño: "Con el masaje de órganos internos". Footer "TAO CENTER MADRID". Logo pequeño. Paleta cálida, granate y beige.',
    copy: `Durante años acumulamos emociones en el vientre. 🙏

Miedo en los riñones. Tristeza en los pulmones. Rabia en el hígado.

El Chi Nei Tsang trabaja directamente en ese centro energético, liberando bloqueos que afectan a todo el cuerpo.

Una sesión puede transformar años de tensión acumulada.

👉 Reserva tu cita en taocenter.es`,
    hashtags: ['ChiNeiTsang','MasajeTerapeutico','TaoCenterMadrid','TerapiasNaturales','BienestarMadrid','SaludEmocional','TaoCenter'],
  },
  {
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Sonidos Curativos — Libera el miedo con vibración',
    visual_prompt: 'ESTILO EDUCATIVO/HOOK. Foto de hombre con expresión serena, oficina o espacio interior de fondo. Texto negrita grande: "QUITA TUS MIEDOS Y BLOQUEOS CON ESTA TÉCNICA MILENARIA". Footer oscuro "TAO CENTER MADRID". Estilo similar al post de "miedos" de referencia. Logo TAO pequeño.',
    copy: `¿El miedo o la inseguridad te frenan? 🌙

Los Sonidos Curativos son una técnica milenaria china que, a través de la vibración, depura cada órgano de las emociones que lo bloquean.

☯️ Riñones → miedo e inseguridad
☯️ Pulmones → tristeza y depresión
☯️ Hígado → rabia y frustración

Cada sonido es una limpieza profunda.

👉 Aprende la práctica en taocenter.es`,
    hashtags: ['SonidosCurativos','TaoCenterMadrid','TerapiasNaturales','BienestarMadrid','AlquimiaTaoista','SaludEmocional','TaoCenter'],
  },
  {
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Sonrisa Interior — La meditación más poderosa del Tao',
    visual_prompt: 'ESTILO INSPIRACIONAL. Mujer sonriendo con ojos cerrados, luz dorada cálida envolviendo su rostro. Texto negro sobre fondo blanco/claro: "Sonríete a ti mismo" (grande). Subtítulo: "La práctica más poderosa del Taoísmo". Botón "Descúbrela". Logo TAO pequeño esquina. Paleta: dorado, blanco, beige.',
    copy: `La Sonrisa Interior es la práctica más sencilla y más poderosa del Taoísmo. ✨

Cerrar los ojos. Sonreír con el corazón. Enviar amor y gratitud a cada órgano de tu cuerpo.

Los taoístas sabían que la sonrisa es medicina.

¿Cuándo fue la última vez que te sonreíste a ti mismo de verdad?

👉 Próximas clases en taocenter.es`,
    hashtags: ['SonrisaInterior','TaoCenterMadrid','MeditacionTaoista','AlquimiaTaoista','BienestarMadrid','AutoConocimiento','TaoCenter'],
  },
  {
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Yin & Yang — El equilibrio que todo lo ordena',
    visual_prompt: 'ESTILO INSPIRACIONAL. Símbolo Yin-Yang natural (blanco y negro) sobre fondo oscuro verde bosque o agua. Texto blanco: "Eres hacedor de equilibrio" (grande). Subtítulo: "Descubre el principio que lo ordena todo". Botón blanco oscuro: "Saber más". Logo TAO pequeño. Paleta: negro, verde oscuro, blanco, dorado.',
    copy: `El Yin y el Yang no son opuestos. ☯️

Son complementarios. Son el mismo baile.

Cuando entendemos este principio milenario, dejamos de luchar contra la vida y empezamos a fluir con ella.

Toda enfermedad es un desequilibrio entre estas dos polaridades. El Tao nos enseña a restaurarlo.

👉 taocenter.es`,
    hashtags: ['YinYang','TaoCenterMadrid','Taoismo','Equilibrio','BienestarMadrid','FilosofiaTaoista','TaoCenter'],
  },
  {
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Iron Shirt Chi Kung — La armadura interior',
    visual_prompt: 'ESTILO EDUCATIVO/HOOK. Persona en postura marcial fuerte, luz dramática lateral oscura. Texto grande en blanco: "FORTALECE TUS ÓRGANOS INTERNOS DESDE DENTRO". Subtítulo: "Iron Shirt Chi Kung". Footer "TAO CENTER MADRID". Paleta: negro, granate, dorado. Aspecto poderoso pero sereno.',
    copy: `Los monjes guerreros la practicaban en secreto. 🌿

Hoy puedes aprenderla tú.

El Iron Shirt Chi Kung fortalece los órganos internos, enraíza tu energía en la Tierra y unifica cuerpo, mente y espíritu.

No necesitas fuerza exterior cuando tu interior es sólido.

👉 Infórmate en taocenter.es`,
    hashtags: ['IronShirtChiKung','TaoCenterMadrid','ChiKung','EnergiaVital','FuerzaInterior','TaoCenter','BienestarMadrid'],
  },
  {
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Energía — Somos fundamentalmente energía',
    visual_prompt: 'ESTILO INSPIRACIONAL. Mujer con brazos abiertos en contraluz, fondo de atardecer naranja/dorado brillante — similar al post de referencia "pilares para ser feliz". Texto negro sobre parte clara: "Eres energía" (grande). Subtítulo: "¿Estás cultivando la tuya?". Logo TAO pequeño.',
    copy: `Somos fundamentalmente energía. ⚡️

La ciencia moderna lo confirma. Los taoístas lo sabían hace 5.000 años.

La diferencia es que ellos aprendieron a cultivarla, moverla y transformarla conscientemente.

¿Estás creando tu vida desde el equilibrio interior, o dejándote arrastrar por las frecuencias del exterior?

En Tao Center te enseñamos cómo tomar las riendas.

👉 taocenter.es`,
    hashtags: ['EnergiaVital','TaoCenterMadrid','Taoismo','Consciencia','BienestarMadrid','CultivaTuEnergia','TaoCenter'],
  },
  {
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Estrés — Técnicas taoístas para liberarte',
    visual_prompt: 'ESTILO EDUCATIVO/HOOK. Persona meditando en entorno natural, transición de oficina tensa a calma natural. Texto negrita grande: "LIBÉRATE DEL ESTRÉS CON TÉCNICAS MILENARIAS". Subtítulo: "Lo que el Taoísmo sabe que occidente aún aprende". Footer "TAO CENTER MADRID". Logo TAO.',
    copy: `El estrés no es el problema. La respuesta al estrés sí lo es. 🙏

El Taoísmo lleva miles de años ofreciendo técnicas para transformar esa energía en calma y vitalidad:

☯️ Respiración consciente (Chi Kung)
☯️ Meditación y Sonrisa Interior
☯️ Movimiento energético (Tai Chi)
☯️ Wu-Wei: el arte de no forzar

Aprende a vivir sin tensión.

👉 taocenter.es | 639 45 37 89`,
    hashtags: ['EstresMadrid','TaoCenterMadrid','BienestarMadrid','TecnicasRelajacion','SaludMental','MindfulnessMadrid','TaoCenter'],
  },
  {
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Formación Maestros de la Energía — Conviértete en instructor',
    visual_prompt: 'ESTILO EDUCATIVO/HOOK. Grupo de alumnos en formación, maestra enseñando postura, espacio luminoso. Texto negrita grande dorado sobre fondo oscuro: "CONVIÉRTETE EN MAESTRO DE LA ENERGÍA ⭐️". Subtítulo: "Formación de profesores Tao Yin K.Y.". Footer "TAO CENTER MADRID". Paleta: negro, dorado, blanco.',
    copy: `El Tao Yin cambió mi vida. Ahora puede ser tu profesión. ⭐️

La Formación MAESTROS DE LA ENERGÍA de Tao Yin K.Y. es la más completa de España:

✅ Instructores certificados por MANTAK CHIA
✅ 1 fin de semana al mes en Madrid
✅ Para desarrollo personal y para enseñar
✅ Con Mª Stella Murias, pionera en España

Un camino de transformación que ya han recorrido cientos de personas.

👉 Infórmate en taocenter.es`,
    hashtags: ['MaestrosDeLaEnergia','TaoYin','TaoCenterMadrid','FormacionTao','MantakChia','ProfesorTao','TaoCenter'],
  },
  {
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Tao Center Madrid — El camino comienza aquí',
    visual_prompt: 'ESTILO INSPIRACIONAL. Vista desde pabellón exterior hacia naturaleza exuberante (similar al primer post de referencia "Eres hacedor de paz"). Texto negro grande: "El camino del TAO comienza aquí". Subtítulo: "Somos el Centro de Referencia del Tao Yin K.Y. en España". Botón negro: "Te esperamos". Datos de contacto abajo: taocenter.es | 639 45 37 89. Logo TAO.',
    copy: `Somos el Centro de Referencia del Tao Yin K.Y. en España. 🙏

Fundado por Mª Stella Murias — primera española en difundir el Tao Yin para occidentales. Instructores certificados por Mantak Chia.

Ofrecemos:
🌿 Clases semanales de Tao Yin, Tai Chi y Chi Kung
🌿 Seminarios intensivos
🌿 Formaciones certificadas
🌿 Chi Nei Tsang y terapias naturales

El camino del Tao comienza con un primer paso.

📩 info@taocenter.es | 📞 639 45 37 89
👉 taocenter.es`,
    hashtags: ['TaoCenter','TaoCenterMadrid','TaoYin','MantakChia','BienestarMadrid','CentroTaoMadrid','Taoismo'],
  },
];

async function run() {
  console.log('🔄 Insertando 12 posts de Tao Center Madrid...\n');

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

  console.log('\n✅ Todos los posts de Tao Center insertados.');
  console.log('   → https://contentflow-4wos.vercel.app/p/javier-manrique-de-lara');
}

run();
