// insert_jose_luis_burriel_posts.mjs
// WIN FITNESS CLUBS SL – JOSÉ LUIS BURRIEL JARQUE
// Red Social: LinkedIn | Stage: Faltan post para J2
// Tono: educativo, reflexivo, MetodoWIN. Basado en posts reales del perfil.
// Run: node FlowAPP/insert_jose_luis_burriel_posts.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'jose-luis-burriel-jarque';

const posts = [
  {
    post_number: 1,
    id: `jose-luis-burriel-jarque-1`,
    platform: 'LI',
    headline_visual: 'Un buen entrenamiento empieza con un buen entrenador',
    visual_prompt: 'Fondo azul marino oscuro. Texto blanco en grande: "Un buen entrenamiento empieza con un buen entrenador." Foto de entrenador con cliente en sesión individual. Logo WIN Fitness Club esquina inferior. Estilo profesional y cercano.',
    copy: `Un buen entrenamiento empieza con un buen entrenador.

En WIN Fitness Club nuestro equipo está formado por profesionales con formación universitaria en Ciencias del Deporte.

Pero más allá de la titulación, creemos que lo que realmente marca la diferencia es el acompañamiento. Escuchar. Adaptar. Motivar. Guiar.

Cada cliente tiene un objetivo diferente, y nuestro trabajo es ayudarle a alcanzarlo de forma segura y sostenible. 🤝

¿Qué valoras más de un entrenador personal?`,
    hashtags: ['#MetodoWIN', '#WinFitClubs', '#EntrenadoresPersonales', '#FitnessBarcelona'],
    status: 'review',
  },
  {
    post_number: 2,
    id: `jose-luis-burriel-jarque-2`,
    platform: 'LI',
    headline_visual: 'A partir de los 30, el entrenamiento de fuerza no es opcional',
    visual_prompt: 'Diseño oscuro profesional. Número grande "30" en blanco con texto: "A partir de aquí, el músculo empieza a disminuir." Subtítulo: "El entrenamiento de fuerza es tu mejor inversión." Estética científica y motivadora. WIN Fitness Club.',
    copy: `A partir de los 30 años empezamos a perder masa muscular de forma progresiva.

No es algo que notemos de inmediato… pero tiene un impacto directo en nuestra energía, metabolismo y salud a largo plazo.

Aquí es donde entra en juego el entrenamiento de fuerza. En WIN Fitness Club lo utilizamos como la base de cualquier programa porque:

→ Mejora la composición corporal
→ Previene lesiones
→ Aumenta la energía diaria
→ Protege la salud articular

Entrenar fuerza no es solo una cuestión estética. Es una inversión en calidad de vida. 🧬

¿Incluyes trabajo de fuerza en tu rutina semanal?`,
    hashtags: ['#MetodoWIN', '#EntrenamientoDeFuerza', '#Salud', '#FitnessBarcelona'],
    status: 'review',
  },
  {
    post_number: 3,
    id: `jose-luis-burriel-jarque-3`,
    platform: 'LI',
    headline_visual: 'La mayoría de gimnasios venden acceso. Nosotros vendemos acompañamiento.',
    visual_prompt: 'Diseño minimalista oscuro. Dos columnas: izquierda "La mayoría" en gris, derecha "Nosotros" en blanco brillante. Contraste visual fuerte. Frase central: "Acceso vs Acompañamiento." Marca WIN Fitness Club. LinkedIn profesional.',
    copy: `La mayoría de gimnasios venden acceso. Nosotros vendemos acompañamiento.

WIN Fitness Club nació con una idea clara: entrenar debería ser una experiencia personalizada, basada en conocimiento profesional y diseñada para cada persona.

Durante años hemos visto a muchas personas entrenar con constancia… pero sin resultados reales. No por falta de esfuerzo, sino por falta de método.

Por eso creamos el #MetodoWIN: sesiones estructuradas, supervisadas y adaptadas a cada cliente.

Porque entrenar mejor siempre será más importante que entrenar más. 💪

Si estás en Barcelona y buscas un enfoque realmente profesional, estaremos encantados de conocerte.`,
    hashtags: ['#MetodoWIN', '#WinFitClubs', '#EntrenamientoPersonal', '#BarcelonaFitness'],
    status: 'review',
  },
  {
    post_number: 4,
    id: `jose-luis-burriel-jarque-4`,
    platform: 'LI',
    headline_visual: '20 minutos de EMS = lo que otros tardan 2 horas en conseguir',
    visual_prompt: 'Fondo negro con destellos de luz azul eléctrica. Texto impactante blanco: "20 minutos. 90% de tu musculatura activada." Subtítulo: "Electroestimulación muscular en WIN Fitness Club." Estilo tecnológico y de alto rendimiento.',
    copy: `La electroestimulación muscular (EMS) está cambiando la forma en que entrenamos.

Con una sesión de solo 20 minutos activamos más del 90% de la musculatura de forma simultánea. Algo que no es posible con el entrenamiento convencional.

¿Qué significa esto en la práctica?

→ Mayor reclutamiento muscular en menos tiempo
→ Resultados más rápidos en fuerza y tonificación
→ Ideal para recuperación activa y rehabilitación
→ Perfecto para personas con poco tiempo disponible

En WIN Fitness Club combinamos la tecnología EMS con la supervisión de nuestros entrenadores para garantizar que cada sesión sea eficaz y segura. ⚡

¿Habías escuchado hablar de la electroestimulación antes?`,
    hashtags: ['#MetodoWIN', '#EMS', '#Electroestimulacion', '#FitnessBarcelona'],
    status: 'review',
  },
  {
    post_number: 5,
    id: `jose-luis-burriel-jarque-5`,
    platform: 'LI',
    headline_visual: 'Rehabilitarse bien es la mitad del camino hacia el rendimiento',
    visual_prompt: 'Diseño cálido y profesional sobre fondo azul oscuro. Icono de cuerpo humano con movimiento. Texto: "De la recuperación al rendimiento." Subtítulo: "Protocolo de rehabilitación funcional integrado." WIN Fitness Club Barcelona.',
    copy: `Después de una lesión, muchos cometen el mismo error: volver demasiado pronto y sin el proceso adecuado.

La recuperación no termina cuando deja de doler. Termina cuando tu cuerpo vuelve a rendir al nivel que necesitas.

En WIN Fitness Club trabajamos la rehabilitación funcional de forma integrada:

→ Evaluación inicial de capacidades y limitaciones
→ Protocolo progresivo y supervisado
→ Coordinación con fisioterapeutas cuando es necesario
→ Transición gradual hacia el rendimiento pleno

Volver bien, no volver rápido. Ese es nuestro principio. 🔄

¿Has tenido alguna lesión que haya cambiado tu forma de entrenar?`,
    hashtags: ['#MetodoWIN', '#RehabilitacionFuncional', '#WinFitClubs', '#FitnessBarcelona'],
    status: 'review',
  },
  {
    post_number: 6,
    id: `jose-luis-burriel-jarque-6`,
    platform: 'LI',
    headline_visual: 'No necesitas máquinas complejas. Necesitas método.',
    visual_prompt: 'Foto de sala boutique con TRX, kettlebells y bandas elásticas. Overlay oscuro con texto blanco: "TRX · Kettlebells · Peso libre · Bandas." Subtítulo: "El entrenamiento funcional del Método WIN." Estilo limpio y profesional.',
    copy: `TRX. Kettlebells. Peso libre. Bandas elásticas.

Cuatro herramientas. Un principio: el cuerpo se entrena como un sistema completo.

El entrenamiento funcional que practicamos en WIN Fitness Club no busca aislar músculos. Busca mejorar la forma en que te mueves, trabajas y vives.

Los beneficios son claros:

→ Mayor fuerza aplicada al movimiento real
→ Mejor estabilidad y coordinación
→ Menor riesgo de lesiones del día a día
→ Rendimiento sostenible a largo plazo

No necesitas la máquina más cara. Necesitas el método correcto. 💡

¿Practicas entrenamiento funcional en tu rutina habitual?`,
    hashtags: ['#MetodoWIN', '#EntrenamientoFuncional', '#WinFitClubs', '#BarcelonaFitness'],
    status: 'review',
  },
  {
    post_number: 7,
    id: `jose-luis-burriel-jarque-7`,
    platform: 'LI',
    headline_visual: 'Tu primera sesión en WIN Fitness Club es gratuita',
    visual_prompt: 'Diseño limpio, fondo azul marino con franja blanca inferior. Texto grande: "Empieza sin compromiso." Subtítulo: "Sesión de evaluación gratuita · Plan personalizado." CTA claro. Logo WIN Fitness Club Barcelona.',
    copy: `El primer paso siempre es el más difícil.

Por eso en WIN Fitness Club ofrecemos una sesión de evaluación gratuita para que puedas conocernos sin ningún tipo de compromiso.

¿Qué incluye?

→ Evaluación de tu condición física actual
→ Conversación sobre tus objetivos reales
→ Primer esbozo de tu plan personalizado
→ Conocer al entrenador que te acompañará

No importa tu punto de partida. Importa que des el primer paso.

Si estás en Barcelona, en Sant Gervasi o en Les Corts, nuestras puertas están abiertas. 🤝

¿Te animarías a probarlo?`,
    hashtags: ['#MetodoWIN', '#WinFitClubs', '#EntrenadorPersonal', '#FitnessBarcelona'],
    status: 'review',
  },
  {
    post_number: 8,
    id: `jose-luis-burriel-jarque-8`,
    platform: 'LI',
    headline_visual: '5 señales de que necesitas un entrenador personal',
    visual_prompt: 'Infografía en fondo azul marino. Lista numerada del 1 al 5 en blanco, cada item en una línea. Título en grande: "¿Reconoces alguna de estas señales?" Diseño limpio y claro. Marca WIN Fitness Club esquina inferior.',
    copy: `Llevas meses entrenando pero no avanzas. ¿Te suena?

A veces el problema no es la constancia. Es el método.

5 señales de que un entrenador personal puede ayudarte:

1️⃣ No sabes qué ejercicios hacer para tu objetivo concreto
2️⃣ Sufres lesiones o molestias recurrentes al entrenar
3️⃣ Tu progreso lleva tiempo estancado
4️⃣ Te cuesta mantener la motivación sin supervisión
5️⃣ Entrenas mucho pero no ves resultados proporcionales

Un entrenador personal no es un lujo. Es la diferencia entre esfuerzo sin dirección y progreso real y medible.

En WIN Fitness Club llevamos años ayudando a personas a superar exactamente estos obstáculos. 💪

¿Con cuál de estos puntos te identificas más?`,
    hashtags: ['#MetodoWIN', '#EntrenadorPersonal', '#WinFitClubs', '#FitnessBarcelona'],
    status: 'review',
  },
  {
    post_number: 9,
    id: `jose-luis-burriel-jarque-9`,
    platform: 'LI',
    headline_visual: 'Dos centros en Barcelona. Un mismo método.',
    visual_prompt: 'Mapa estilizado de Barcelona con dos puntos destacados en azul claro. Fondo oscuro. Texto: "Sant Gervasi · Les Corts" en grande. Subtítulo: "El Método WIN cerca de ti." Logo WIN Fitness Club. Diseño corporativo y local.',
    copy: `Porque la distancia no debería ser un obstáculo para entrenar bien.

WIN Fitness Club tiene dos centros boutique en Barcelona, pensados para estar cerca de donde vives o trabajas:

📍 Sant Gervasi — zona alta de Barcelona
📍 Les Corts — eixample oeste, junto a Diagonal

En ambos encontrarás:

→ El mismo equipo de entrenadores cualificados
→ La misma metodología personalizada
→ Grupos de máximo 5 personas
→ El mismo compromiso con tu progreso

Dos ubicaciones. Una forma de entender el entrenamiento.

¿Cuál te queda más cerca? 🗺️`,
    hashtags: ['#MetodoWIN', '#WinFitClubs', '#FitnessBarcelona', '#SantGervasi', '#LesCorts'],
    status: 'review',
  },
  {
    post_number: 10,
    id: `jose-luis-burriel-jarque-10`,
    platform: 'LI',
    headline_visual: 'Entrenar bien es una ciencia',
    visual_prompt: 'Fondo azul oscuro con elementos visuales sutiles de datos (líneas, gráficos). Texto blanco grande: "Entrenar bien es una ciencia." Subtítulo: "Metodología basada en evidencia · Ciencias del Deporte." Estilo profesional y científico. WIN Fitness Club.',
    copy: `El fitness de calidad no se basa en tendencias. Se basa en evidencia.

En WIN Fitness Club nuestros entrenadores combinan formación universitaria en Ciencias del Deporte con actualización constante en investigación sobre fisiología del ejercicio.

Esto se traduce en algo muy concreto para nuestros clientes:

→ Cada sesión está diseñada con base en tu fisiología real
→ Los programas se ajustan según tu evolución y respuesta
→ Las decisiones de entrenamiento se toman con criterio, no por intuición
→ El riesgo de lesión se minimiza desde el primer día

No entrenamos por inercia. Entrenamos con conocimiento. 🔬

¿Sabes exactamente por qué haces cada ejercicio de tu rutina?`,
    hashtags: ['#MetodoWIN', '#CienciasDelDeporte', '#WinFitClubs', '#RendimientoDeportivo'],
    status: 'review',
  },
  {
    post_number: 11,
    id: `jose-luis-burriel-jarque-11`,
    platform: 'LI',
    headline_visual: 'Los tres pilares del Método WIN: Fuerza, Movilidad, Salud',
    visual_prompt: 'Tres columnas verticales sobre fondo oscuro. Columna 1: icono de peso + "FUERZA". Columna 2: icono de movimiento + "MOVILIDAD". Columna 3: icono de corazón + "SALUD". Colores: azul, verde menta, blanco. Título: "El Método WIN." Diseño premium.',
    copy: `En WIN Fitness Club no entrenamos solo para vernos mejor. Entrenamos para vivir y rendir mejor.

Nuestra metodología se apoya en tres pilares fundamentales:

💪 FUERZA
La base de todo rendimiento físico. Sin fuerza, la movilidad se deteriora y el riesgo de lesión aumenta.

🔄 MOVILIDAD
Moverse sin restricciones y sin dolor es la base de una vida activa. La movilidad no se mantiene sola: se entrena.

❤️ SALUD FUNCIONAL
El objetivo real. No solo estética. Un cuerpo que funcione bien hoy y dentro de 20 años.

Estos tres pilares guían cada sesión y cada decisión dentro del #MetodoWIN.

¿Trabajas los tres en tu entrenamiento actual?`,
    hashtags: ['#MetodoWIN', '#WinFitClubs', '#Salud', '#FitnessBarcelona'],
    status: 'review',
  },
  {
    post_number: 12,
    id: `jose-luis-burriel-jarque-12`,
    platform: 'LI',
    headline_visual: 'Esto es WIN Fitness Club en números',
    visual_prompt: 'Infografía de datos sobre fondo azul marino. Números grandes en blanco: "2 centros" / "5 personas máx." / "20 min EMS" / "+5 años exp." Título: "El Método WIN en cifras." Diseño impactante y corporativo. Logo WIN Fitness Club.',
    copy: `A veces los números cuentan mejor que las palabras.

WIN Fitness Club en cifras:

🏢 2 centros boutique en Barcelona
👥 Máximo 5 personas por sesión
⏱ Sesiones de 40 minutos de alta eficiencia
⚡ EMS: 20 minutos de activación muscular profunda
🎓 Entrenadores con formación universitaria y +5 años de experiencia
📋 Plan 100% individualizado para cada cliente
📈 Seguimiento continuo de tu evolución

Detrás de cada número hay una decisión de diseño: crear el entorno donde las personas realmente progresan.

Eso es el #MetodoWIN.

¿Te gustaría conocernos? Primera sesión gratuita en winfitclubs.com 👉`,
    hashtags: ['#MetodoWIN', '#WinFitClubs', '#EntrenadorPersonal', '#BarcelonaFitness'],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID}...`);

  for (const post of posts) {
    const payload = {
      id: post.id,
      client_id: CLIENT_ID,
      post_number: post.post_number,
      platform: post.platform,
      headline_visual: post.headline_visual,
      visual_prompt: post.visual_prompt,
      copy: post.copy,
      hashtags: post.hashtags,
      status: post.status,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`✗ Post ${post.post_number}: ${err}`);
    } else {
      console.log(`✓ Post ${post.post_number}: ${post.headline_visual}`);
    }
  }

  console.log('\n✅ Todos los posts insertados para WIN FITNESS CLUBS (José Luis Burriel)');
}

insertPosts().catch(console.error);
