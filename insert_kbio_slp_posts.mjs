import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'kbio-slp';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    client_id: CLIENT_ID,
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Foto real de placas solares integradas en cubierta de casa rural vasca, cielo azul, entorno verde. Texto overlay sutil: "Energía propia." Logo Kabio esquina inferior derecha. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'Instagram 1080x1080px. Full-bleed photo of photovoltaic solar panels seamlessly integrated into the sloped roof of a traditional Basque stone house, lush green hills in background, clear blue sky. Warm golden afternoon light. Minimal white italic text overlay top-left: "Energía propia." Small Kabio green house logo bottom-right corner. No heavy graphics — photo-first aesthetic matching kabio_sl Instagram style.',
    copy: `El sol ya pagaba el alquiler mucho antes de que existieran las facturas de la luz. ☀️

En Kabio instalamos placas fotovoltaicas integradas en cubierta: sin perder carácter, sin renunciar al diseño.

Porque una buena instalación solar no se ve. Se nota en la factura.

✔️ Estudio previo de viabilidad y orientación
✔️ Integración estética con la arquitectura existente
✔️ Gestión completa de permisos y tramitación
✔️ Monitorización de producción en tiempo real
✔️ Autoconsumo + excedentes a red

Cada casa es diferente. Cada instalación, también.

¿Hablamos de la tuya?
📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#PlacasFotovoltaicas', '#EnergíaSolar', '#Autoconsumo', '#ArquitecturaSostenible', '#PaísVasco', '#Baserri', '#ConstrucciónSostenible', '#EnergíaRenovable', '#KitDigital'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-2`,
    client_id: CLIENT_ID,
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Foto de estructura de madera/hormigón de baserri nuevo en construcción, paisaje vasco al fondo. Overlay: "Nuevo Baserri by Kabio" en script ligero. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'Instagram 1080x1080px. Photo of a new Basque farmhouse (baserri) under construction — timber frame and stone structure, green Basque hills backdrop, dramatic sky. Raw and honest construction photography. Elegant italic script overlay center-right: "Nuevo Baserri by Kabio" in cream/white. Kabio logo bottom-left. Warm earthy tones — stone, wood, green. Style: editorial construction photography matching kabio_sl feed.',
    copy: `Un baserri no se construye. Se hereda.

Y cuando no hay herencia, se crea desde cero. Con criterio, materiales honestos y respeto por el lugar.

Este es uno de nuestros proyectos en curso: un nuevo baserri en el que cada decisión — desde la orientación hasta la elección de la piedra — tiene una razón de ser.

🪨 Piedra local
🪵 Madera estructural certificada
☀️ Orientación bioclimática
🌿 Cubierta viva integrada

Construir bien lleva tiempo. Vale la pena.

📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#NuevoBaserri', '#CasaVasca', '#ArquitecturaVasca', '#ConstrucciónNueva', '#Baserri', '#PaísVasco', '#ArquitecturaNatural', '#MaterialesNaturales', '#ProyectoEnCurso'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-3`,
    client_id: CLIENT_ID,
    post_number: 3,
    platform: 'IG',
    headline_visual: '🎞️ SLIDER 5 slides — "De la ruina al hogar" — Rehabilitación completa. Slide 1: exterior en ruinas. Slide 2: vaciado interior. Slide 3: estructura nueva. Slide 4: acabados. Slide 5: resultado final. Fotos reales de obra.',
    visual_prompt: 'Instagram carousel 5 slides 1080x1080px each. Raw authentic construction photography style matching kabio_sl. Slide 1 (cover): Abandoned/ruined stone building exterior, overlay text "De la ruina al hogar ▶" in white italic + Kabio logo top-left. Slide 2: Interior stripped to bare walls/structure, caption "01 · Vaciado y diagnosis". Slide 3: New structure/framing going in, "02 · Nueva estructura". Slide 4: Plaster, wood details, windows installed, "03 · Acabados naturales". Slide 5: Warm finished interior with wood beam ceiling, stone wall, "04 · El resultado · kabio.es". Consistent style: dark caption bar at bottom of each slide, Kabio green accent.',
    copy: `Cada rehabilitación empieza con una pregunta: ¿qué queda por salvar?

👉 Desliza y mira lo que puede llegar a ser un edificio que parecía perdido.

[1] El punto de partida — una estructura con historia y mucho potencial
[2] Vaciado y diagnosis — lo que no se ve también importa
[3] Nueva estructura — la base para los próximos 100 años
[4] Acabados naturales — piedra, madera, cal
[5] El resultado — un hogar donde antes había ruinas

No hacemos magia. Hacemos arquitectura con criterio.

¿Tienes un edificio con potencial?
📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#Rehabilitación', '#RehabilitaciónArquitectónica', '#AntesDespués', '#CasaRural', '#ArquitecturaVasca', '#MaterialesNaturales', '#ReformaIntegral', '#PaísVasco', '#TransformaciónDeEspacios'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-4`,
    client_id: CLIENT_ID,
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Foto interior con luz natural entrando por grandes ventanales, madera vista en techo, piedra en pared. Overlay sutil: "Soluciones bioclimáticas." Logo Kabio. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'Instagram 1080x1080px. Bright warm interior photo: large south-facing windows flooding room with natural light, exposed wooden beam ceiling, stone accent wall, minimal Scandinavian-Basque aesthetic. Editorial architectural photography. Subtle white text overlay bottom: "Soluciones bioclimáticas · kabio.es". Kabio house logo top-right small. Color palette: warm wood tones, cream plaster, natural stone, bright daylight.',
    copy: `La mejor calefacción es la que no necesitas encender.

La arquitectura bioclimática no es una tendencia. Es la forma más antigua y más inteligente de construir.

En Kabio diseñamos cada proyecto para que la propia casa regule su temperatura:

🌞 Orientación sur para captación solar pasiva
🌬️ Ventilación cruzada natural sin climatización
🏗️ Inercia térmica con materiales de masa pesada
🪟 Protecciones solares estacionales (vuelan en invierno, dan sombra en verano)
🌿 Cubierta vegetal como aislante natural

El resultado: confort todo el año con una factura que apenas se nota.

¿Te lo explicamos aplicado a tu proyecto?
📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#ArquitecturaBioclimática', '#Bioclimático', '#EficienciaEnergética', '#CasaPasiva', '#DiseñoSostenible', '#LuzNatural', '#ConstrucciónSostenible', '#ArquitecturaNatural', '#PaísVasco'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-5`,
    client_id: CLIENT_ID,
    post_number: 5,
    platform: 'IG',
    headline_visual: '🎞️ SLIDER 4 slides — "Los materiales que elegimos" — Detalle macro de piedra local, madera, barro cocido, cal. Cada slide es una textura diferente con nombre del material.',
    visual_prompt: 'Instagram carousel 4 slides 1080x1080px each. Extreme close-up macro photography of natural building materials. Slide 1 (cover): Split composition — stone texture left, wood grain right, title "Los materiales que elegimos · Kabio" in dark earthy overlay, green brand bar at bottom. Slide 2: Full-bleed close-up rough-cut local limestone, caption "PIEDRA LOCAL · Extracción a menos de 50km". Slide 3: Raw timber beam cross-section with growth rings visible, "MADERA CERTIFICADA · Estructura que dura siglos". Slide 4: Smooth lime plaster wall with warm light raking across, "CAL NATURAL · Transpira. Regula. Dura." + kabio.es. Warm earthy palette throughout.',
    copy: `Construimos con lo que ha funcionado durante siglos. 🪨🪵

No porque sea moda. Porque es lo correcto.

Los materiales que elegimos en Kabio no son un capricho estético — son una decisión técnica y ética:

[1] PIEDRA LOCAL — huella de transporte mínima, inercia térmica máxima
[2] MADERA CERTIFICADA — estructura, acabados y alma del proyecto
[3] CAL NATURAL — transpira, regula la humedad, no emite VOCs
[4] TIERRA CRUDA — aislamiento, acabado, reciclable al 100%

Cada material tiene una historia. La de tu casa también.

📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#MaterialesNaturales', '#Bioconstrucción', '#PiedraLocal', '#MaderaCertificada', '#CalNatural', '#ConstrucciónSostenible', '#ArquitecturaNatural', '#EcoArquitectura', '#PaísVasco'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-6`,
    client_id: CLIENT_ID,
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Foto en blanco y negro de interior en obra — escombros, paredes desnudas, luz entrando por hueco de ventana. Overlay: "Últimos detalles." en script blanco. Logo Kabio.',
    visual_prompt: 'Instagram 1080x1080px. Black and white photography of construction interior — raw walls stripped to stone/brick, construction debris on floor, dramatic shaft of natural light entering through empty window opening. Moody, documentary photography style matching kabio_sl B&W posts. Italic script overlay bottom-center: "Últimos detalles." in white. Small Kabio logo bottom-right. High contrast B&W, grain texture, editorial construction aesthetic.',
    copy: `Antes del resultado, está el proceso. Y el proceso también tiene su belleza. 🖤

Cuando entramos en una obra, lo primero que hacemos es leer lo que hay. Cada grieta cuenta algo. Cada muro tiene una razón.

Esto que ves es el punto de partida de un proyecto de rehabilitación en curso.

Queda poco para ver el resultado final.

¿Nos sigues para verlo?

📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#ProcesoDeObra', '#EnObra', '#Rehabilitación', '#ArquitecturaVasca', '#ConstrucciónNatural', '#UltimosDetalles', '#DetrásDelTelón', '#ProyectoEnCurso', '#PaísVasco'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-7`,
    client_id: CLIENT_ID,
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Foto de cocina/comedor terminado: madera, piedra, horno de leña, ventanal al verde. Cálido y auténtico. Overlay: "Espacios para vivir." Logo Kabio. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'Instagram 1080x1080px. Warm editorial interior photo of a completed Basque rural kitchen/dining space: stone walls, exposed wood beam ceiling, wood-burning pizza/bread oven as focal point, large window overlooking green hills, simple wooden furniture, warm afternoon light. Color palette: stone grey, warm wood, cream, soft green from outside. Minimal italic white text overlay: "Espacios para vivir." Kabio logo small bottom-right. Authentic, lived-in, architectural photography.',
    copy: `Una cocina con horno de leña, viga de castaño y vistas al verde.

No lo hacemos por estética. Lo hacemos porque es como se vive bien.

En Kabio diseñamos espacios que conectan con el lugar: con el paisaje, con el clima, con la forma de vida de quien los habita.

Cada detalle tiene una función. Cada función tiene un carácter.

Este es uno de nuestros proyectos terminados. ¿Cuál será el tuyo?

📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#DiseñoInterior', '#CocinaRural', '#InterioresNaturales', '#HornoDeLeña', '#ArquitecturaVasca', '#EspaciosParaVivir', '#ReformaIntegral', '#MaterialesNaturales', '#CasaRural'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-8`,
    client_id: CLIENT_ID,
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Foto de detalle de fachada: sistema de aislamiento exterior con acabado de piedra o mortero, visiblemente cuidado. Overlay técnico: "Cerramiento inteligente." Logo Kabio.',
    visual_prompt: 'Instagram 1080x1080px. Architectural detail photo of an exterior wall system showing ETICS/SATE external insulation — clean installation with natural stone cladding or lime render finish. Worker applying final coat in background (slight blur). Demonstrates craftsmanship and technical quality. Clean architectural photography. Bold minimal white text overlay: "Cerramiento inteligente." + small Kabio logo. Neutral tones: stone, grey, cream.',
    copy: `La fachada no es solo lo que ves. Es lo que sientes dentro. 🏠

Un cerramiento bien resuelto es la diferencia entre una casa que gasta 900€ al mes en calefacción y una que gasta 90€.

En Kabio trabajamos el aislamiento desde el inicio del proyecto, no como parche final:

🧱 SATE (Sistema de Aislamiento Térmico Exterior) — sin puentes térmicos
💨 Control de vapor — sin condensaciones, sin humedades
🪟 Carpintería de altas prestaciones — Uw < 1,0 W/m²K
🔊 Aislamiento acústico integrado — porque el silencio también es confort

¿Tu casa tiene frío en invierno o calor en verano? El problema suele estar en el cerramiento.

📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#AislamientoTérmico', '#EficienciaEnergética', '#SATE', '#CerramientoExterior', '#CasaEficiente', '#ConstrucciónSostenible', '#RehabilitaciónEnergética', '#PaísVasco', '#ArquitecturaBioclimática'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-9`,
    client_id: CLIENT_ID,
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Foto de exterior de edificio antiguo o solar vacío con buena luz. Overlay en script elegante: "New project encountered." Logo Kabio esquina superior.',
    visual_prompt: 'Instagram 1080x1080px. Exterior photo of an old rural or semi-urban building with rehabilitation potential — stone walls, old wooden shutters, slightly overgrown. Beautiful light, slightly mysterious atmosphere. Editorial/documentary photography style. Elegant italic script overlay center: "New project encountered." in cream/white. Small Kabio logo top-left. Color palette: aged stone, rust, green vegetation, warm light. Matching the authentic kabio_sl Instagram aesthetic.',
    copy: `Cada edificio con historia es una oportunidad. 🔍

Nuevo proyecto en cartera.

No podemos contar mucho todavía — pero sí podemos decir que tiene potencial, tiene carácter y tiene mucho por delante.

En Kabio no elegimos proyectos fáciles. Elegimos proyectos interesantes.

Quedaos por aquí. 👀

📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#NuevoProyecto', '#NewProject', '#Rehabilitación', '#ArquitecturaVasca', '#CasaConHistoria', '#ProyectoEnCurso', '#PaísVasco', '#Arquitectura', '#ConstrucciónSostenible'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-10`,
    client_id: CLIENT_ID,
    post_number: 10,
    platform: 'IG',
    headline_visual: '🎞️ SLIDER 4 slides — "¿Qué es construir bien?" — 4 principios Kabio. Fondo foto de obra/material + texto grande blanco. Estilo editorial.',
    visual_prompt: 'Instagram carousel 4 slides 1080x1080px each. Bold editorial style. Slide 1 (cover): Dark moody photo of stone wall under construction at sunset, large bold white text "¿Qué es construir bien?" + Kabio logo. Slide 2: Warm interior with natural light, bold text overlay "01 · Durar 100 años" + small description. Slide 3: Close-up of lime plaster or stone detail, "02 · Sin dejar huella" — sustainability angle. Slide 4: Finished warm interior, "03 · Que el espacio te haga feliz" + CTA kabio.es. Consistent green brand bar at bottom of each slide. Clean, modern editorial layout.',
    copy: `¿Qué significa construir bien? 🏗️

Para nosotros, tres cosas:

[1] DURAR — una construcción bien hecha no necesita rehabilitación en 20 años. La calidad de hoy es el ahorro de mañana.

[2] NO DEJAR HUELLA — elegir materiales locales, naturales y reciclables no es una opción. Es una obligación.

[3] HACER FELIZ AL QUE LO HABITA — la arquitectura que no mejora la vida de las personas no sirve de nada.

Esto es lo que guía cada proyecto en Kabio. Sin más.

¿Empezamos con el tuyo?
📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#ConstruirBien', '#ArquitecturaSostenible', '#FilosofíaKabio', '#ConstrucciónDeCalidad', '#ArquitecturaHumana', '#Bioconstrucción', '#PaísVasco', '#DiseñoSostenible', '#ArquitecturaVasca'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-11`,
    client_id: CLIENT_ID,
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Foto de detalle artesanal: azulejos tradicionales vascos, madera tallada, herraje de forja o detalle de carpintería. Overlay: "El detalle lo es todo." Logo Kabio.',
    visual_prompt: 'Instagram 1080x1080px. Extreme close-up detail photo of artisanal craftsmanship in construction — traditional Basque ceramic tiles with blue pattern, hand-forged iron door hardware, or carved wood detail. High detail macro photography, warm natural light, shallow depth of field. Editorial style matching kabio_sl feed texture posts. Italic white text overlay: "El detalle lo es todo." Kabio logo bottom-right small.',
    copy: `En arquitectura, los detalles no son los detalles. Los detalles son el diseño. 🔩

Una bisagra de forja. Un alero bien medido. Un rodapié de piedra bien ejecutado. Una junta de cal hecha a mano.

Son cosas que nadie busca. Que todo el mundo nota.

En Kabio trabajamos cada detalle como si fuera lo único que estuvieras mirando. Porque en algún momento lo será.

📩 alex@kabio.es
🌐 kabio.es`,
    hashtags: ['#Kabio', '#ElDetalleLoEsTodo', '#Artesanía', '#ConstrucciónArtesanal', '#ArquitecturaVasca', '#DetallesArquitectónicos', '#MaterialesNaturales', '#Forja', '#CarpinteríaArtesanal', '#PaísVasco'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-12`,
    client_id: CLIENT_ID,
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Foto de equipo Kabio en obra o delante de proyecto terminado, actitud cercana y natural (no posada). Overlay: "Somos Kabio." Logo grande. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'Instagram 1080x1080px. Candid authentic team photo — Kabio team members on a construction site or in front of a completed project, casual and genuine, hard hats optional, natural smiles. Not corporate stock-photo style — real people, real project. Warm afternoon light. Kabio green house logo prominently placed top-center or center. White bold text overlay: "Somos Kabio." Subtitle small: "Arquitectura · Rehabilitación · Bioclimática · Solar · kabio.es". Brand green (#2B8A3E) accent bar at bottom.',
    copy: `Somos Kabio. 👋

Un equipo pequeño con proyectos grandes.

Hacemos arquitectura, rehabilitación, bioclimática y energía solar en el País Vasco y alrededores.

No somos la empresa más grande. Somos la que más cuida lo que hace.

Cada proyecto es nuestro. Lo seguimos desde el primer boceto hasta el último tornillo. Alex y el equipo en cada paso.

Si tienes un proyecto en mente — grande, pequeño, complejo, o todavía sin forma — escríbenos.

📩 alex@kabio.es
📱 kabio.es

Gracias por seguirnos. ❤️`,
    hashtags: ['#Kabio', '#SomosKabio', '#EquipoKabio', '#ArquitecturaVasca', '#Rehabilitación', '#Bioclimático', '#EnergíaSolar', '#PaísVasco', '#ArquitecturaSostenible', '#KitDigital'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
];

async function run() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID}...`);

  for (const post of posts) {
    const { error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'id' });

    if (error) {
      console.error(`✗ Post #${post.post_number}: ${error.message}`);
    } else {
      console.log(`✓ Post #${post.post_number}: ${post.headline_visual.substring(0, 70)}...`);
    }
  }

  console.log('\n✅ Listo. Recarga ContentFlow para ver los posts de KBIO SLP.');
}

run();
