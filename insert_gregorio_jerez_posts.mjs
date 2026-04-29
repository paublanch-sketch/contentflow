import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'gregorio-jerez';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    client_id: CLIENT_ID,
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Foto real de terraza exterior con baldosa antideslizante, luz mediterránea. Red strip inferior con texto blanco: "Suelo exterior que dura." Logo BdB esquina superior izquierda.',
    visual_prompt: 'Instagram 1080x1350px. Real photo of a modern outdoor terrace with large format non-slip ceramic floor tiles, Mediterranean light. Bold red horizontal banner at bottom with white text: "Suelo exterior que dura." BdB brand red logo placeholder top-left. Clean, professional construction photography. Red #CC1212, white text, dark drop shadow on banner. Matches BdB Instagram editorial style.',
    copy: `Las baldosas de exterior no son un capricho. Son la diferencia entre un espacio que envejece bien y uno que se deteriora en dos veranos. ☀️❄️

En BdB tenemos cerámica de exterior:
✔️ Antideslizante (segura en mojado)
✔️ Resistente a la helada y al sol intenso
✔️ Fácil de mantener y limpiar
✔️ En múltiples formatos y colores

Terrazas, jardines, zonas de piscina, accesos.

¿Tu proyecto necesita suelo exterior? Cuéntanos.
📩 adrian@gregoriojerez.com
🌐 gregoriojerez.com`,
    hashtags: ['BdB', 'SueloExterior', 'CerámicaExterior', 'Reforma', 'Azulejos', 'Terraza', 'Jardín', 'Construcción', 'Antideslizante', 'LespedreresBdB'],
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
    headline_visual: 'Foto editorial de baño moderno con cerámica elegante, formato grande, luz cálida. Overlay sutil inferior: "El baño que siempre imaginaste." Logo BdB.',
    visual_prompt: 'Instagram 1080x1350px. Editorial photo of a sleek modern bathroom with large format ceramic tiles — warm white and beige tones, frameless shower, natural light. Minimal red brand bar at bottom with white text: "El baño que siempre imaginaste." BdB logo placeholder top-left corner. Architectural interior photography style, clean lines, upscale residential feel.',
    copy: `Un baño no es solo funcional. Es el espacio donde empiezas y terminas el día.

La cerámica adecuada cambia completamente cómo se siente ese espacio. El tamaño del formato, el acabado (mate o brillo), el color, la junta.

En BdB te ayudamos a elegir sin agobios:
🪟 Formato grande para menos juntas y más amplitud
✨ Brillo si quieres luminosidad
🧱 Mate si prefieres un estilo más sereno
🚿 Antihumedad para zonas de ducha

¿Empezamos con el tuyo?
📩 adrian@gregoriojerez.com
🌐 gregoriojerez.com`,
    hashtags: ['BdB', 'BañoModerno', 'Azulejos', 'ReformaBaño', 'CerámicaBaño', 'Diseño', 'Reforma', 'DecoracionInteriores', 'InteriorDesign', 'LespedreresBdB'],
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
    headline_visual: 'Diseño gráfico BdB estilo: fondo oscuro/granito, texto blanco bold "¿SABES QUÉ ES EL PORCELATO?" con subtítulo pequeño. Icono de baldosa. Logo BdB rojo arriba.',
    visual_prompt: 'Instagram 1080x1350px. Bold graphic design post in BdB style. Dark charcoal/anthracite background texture (like stone). Large bold white uppercase text center: "¿SABES QUÉ ES EL PORCELATO?" Smaller white text below explaining key benefits. Red BdB accent color for highlight lines. Clean modern typography, sans-serif. BdB logo placeholder top-left in red. Matches BdB educational graphic post aesthetic.',
    copy: `El porcelato es la cerámica más resistente del mercado. Y probablemente la que más se usa hoy en proyectos de calidad.

¿Por qué?

🔵 Absorción de agua casi cero
🔵 Resistente a arañazos y golpes
🔵 Fácil de limpiar y mantener
🔵 No se decolora con el sol ni el calor
🔵 Apto para interior Y exterior

En BdB lo tenemos en múltiples formatos: desde 30x30 hasta grandes losas de 120x120, en mate, brillo y textura piedra.

¿Quieres ver opciones para tu proyecto?
📩 adrian@gregoriojerez.com`,
    hashtags: ['BdB', 'Porcelato', 'Cerámica', 'Azulejos', 'SabiasQue', 'TipsConstrucción', 'MaterialesCalidad', 'Reforma', 'Construir', 'LespedreresBdB'],
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
    headline_visual: 'Foto editorial de piscina rodeada de piedra natural, agua turquesa, jardín. Red strip superior: "Piedra natural + piscina." Logo BdB.',
    visual_prompt: 'Instagram 1080x1350px. Elegant swimming pool surrounded by natural stone coping and terrace, turquoise water, Mediterranean garden, warm afternoon light. Bold red horizontal banner at top with white text: "Piedra natural + piscina." BdB logo placeholder top-left. Architecture/construction photography quality. Stone in warm beige and sand tones matching real Catalonia/Spain regional stone.',
    copy: `La piedra natural alrededor de la piscina no es solo estética. Es decisión técnica. 🏊

Aguanta el agua constante, el sol mediterráneo y el uso intensivo sin decolorarse ni deteriorarse.

Y con el paso de los años, no pierde carácter — lo gana.

En BdB trabajamos con piedra natural para:
🪨 Bordillos y coronación de piscina
🪨 Pavimento de terraza exterior
🪨 Muros y cerramientos de jardín
🪨 Revestimientos de duchas exteriores

¿Tienes un proyecto de piscina en marcha?
📩 adrian@gregoriojerez.com
🌐 gregoriojerez.com`,
    hashtags: ['BdB', 'Piedranatural', 'Piscina', 'Exteriores', 'ConstrucciónPiscina', 'PiedraFachada', 'Jardín', 'ProyectoReal', 'MaterialNatural', 'LespedreresBdB'],
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
    headline_visual: 'Foto de fachada moderna con piedra natural, ventanales oscuros, cielo despejado. Overlay bold: "LA FACHADA ES TU FIRMA." en rojo. Logo BdB.',
    visual_prompt: 'Instagram 1080x1350px. Modern residential facade clad in natural stone — light beige limestone, dark aluminum windows, clean contemporary architecture, clear blue sky. Bold white text overlay on dark semi-transparent bottom strip: "LA FACHADA ES TU FIRMA." Red BdB accent bar. BdB logo placeholder top-left. Real architectural photography quality, matches BdB editorial style for project showcases.',
    copy: `La fachada es lo primero que ven. Y lo que queda.

La piedra natural en fachada no necesita pintura cada 10 años. No se decolora. No se agrieta con los ciclos de frío y calor. Y se integra en cualquier entorno: urbano o rural, moderno o tradicional.

En BdB tenemos piedra natural para fachada en varios formatos y tonalidades:
🏠 Aplacado fino para fachadas modernas
🏚️ Mampostería para construcción tradicional
🧱 Piedra irregular para muros rústicos

Cuéntanos tu proyecto.
📩 adrian@gregoriojerez.com
🌐 gregoriojerez.com`,
    hashtags: ['BdB', 'FachadaDePiedra', 'PiedraFachada', 'ConstrucciónNatural', 'Fachada', 'ArquitecturaResidencial', 'PiedraCaliza', 'Reforma', 'MaterialNatural', 'LespedreresBdB'],
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
    headline_visual: 'Diseño gráfico BdB estilo checklist: fondo rojo fuerte, texto blanco, lista de errores con ✗ en rojo. "Antes de comprar azulejos, lee esto." Bold y directo.',
    visual_prompt: 'Instagram 1080x1350px. Bold graphic checklist post in BdB style. Strong red (#CC1212) background. Large bold white uppercase title: "ANTES DE COMPRAR AZULEJOS". Below: list of common mistakes with X marks in white. Clean sans-serif typography, high contrast. BdB logo placeholder top-left in white. Matches BdB educational/tips graphic post aesthetic. No photos — pure bold typography design.',
    copy: `Errores comunes al comprar azulejos para obra. Guarda esto. 📌

❌ No calcular el 10% extra de merma
❌ No comprobar que todas las cajas sean del mismo calibre
❌ Elegir por foto sin ver el material en persona
❌ No preguntar si es apto para tu uso (interior/exterior/zona húmeda)
❌ Comprar sin saber el antideslizamiento necesario para exterior
❌ No prever tiempo de entrega antes del inicio de obra

Evitar estos errores te ahorra dinero, tiempo y disgustos.

En BdB te asesoramos antes de que compres. Sin coste. Sin compromiso.

📩 adrian@gregoriojerez.com`,
    hashtags: ['BdB', 'ConsejosDeObra', 'Azulejos', 'TipsDeReforma', 'Obra', 'CerámicaCalidad', 'Reforma', 'AsesoramientoGratis', 'Construir', 'LespedreresBdB'],
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
    headline_visual: 'Foto editorial de salón moderno con pared de piedra natural como acento, sofá neutral, luz indirecta. Overlay suave: "La piedra también vive dentro." Logo BdB.',
    visual_prompt: 'Instagram 1080x1350px. Upscale modern living room interior with a natural stone accent wall — warm beige limestone or travertine, contemporary furniture, warm ambient lighting. Minimal white italic text overlay at bottom: "La piedra también vive dentro." Red BdB accent stripe at bottom. BdB logo placeholder top-left. Editorial interior design photography, sophisticated and aspirational. Warm neutral palette.',
    copy: `La piedra natural en interiores ya no es exclusiva de casas de pueblo. 🏡

Hoy entra en salones de diseño, cocinas modernas y baños de lujo. Como pared de acento, como suelo, como revestimiento de chimenea.

El resultado: espacios únicos, cálidos, con una textura que ningún papel pintado puede imitar.

Y una ventaja que no se ve: la piedra natural regula temperatura y humedad de forma pasiva.

¿Lo hablamos aplicado a tu proyecto?
📩 adrian@gregoriojerez.com
🌐 gregoriojerez.com`,
    hashtags: ['BdB', 'PiedraInterior', 'InteriorismoNatural', 'DecoracionInteriores', 'Piedranatural', 'RevestimientoNatural', 'DiseñoInteriores', 'CasaModerna', 'InspiracionDecor', 'LespedreresBdB'],
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
    headline_visual: 'Foto blanco y negro o cálida de arco de piedra antigua restaurado, detalle artesanal. Overlay elegante: "Recuperamos lo que parecía perdido." Logo BdB.',
    visual_prompt: 'Instagram 1080x1350px. Black and white or warm-toned editorial photo of a restored stone arch — ancient limestone blocks, skilled masonry work visible, dramatic natural light through the arch opening. Elegant white italic overlay text at bottom: "Recuperamos lo que parecía perdido." Subtle red BdB brand accent line. BdB logo placeholder. Documentary construction photography meets architectural heritage. Moody and timeless.',
    copy: `Recuperar una construcción antigua con piedra natural no es solo nostalgia. 🏛️

Es sostenibilidad. Es durabilidad. Es no tirar lo que ya funcionaba.

En BdB trabajamos con proyectos de rehabilitación donde la piedra es protagonista: arcos, muros de carga, fachadas históricas, bóvedas.

El material nuevo que aportamos es compatible con el original. El resultado: lo antiguo y lo nuevo conviven sin que se note la diferencia.

Un edificio bien rehabilitado dura otro siglo.

¿Tienes un proyecto de estas características?
📩 adrian@gregoriojerez.com`,
    hashtags: ['BdB', 'Rehabilitación', 'PiedraHistórica', 'PatrimonioArquitectónico', 'RecuperaciónPatrimonio', 'ConstrucciónSostenible', 'Restauración', 'Mampostería', 'ProyectoReal', 'LespedreresBdB'],
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
    headline_visual: 'Diseño gráfico educativo: tres columnas MATE / BRILLO / TEXTURADO con color/foto representativa de cada acabado. Fondo oscuro. Texto BdB blanco en negrita.',
    visual_prompt: 'Instagram 1080x1350px. Educational graphic design in BdB style. Dark background with three vertical panels showing: MATE (matte finish tile sample, grey/warm tone), BRILLO (glossy ceramic, lighter/reflective), TEXTURADO (textured anti-slip tile). Each panel has bold white label. Red BdB accent color for dividers and highlights. Clean minimalist graphic design, strong typography, professional. BdB logo placeholder top-left. Infographic tile finish comparison.',
    copy: `¿MATE, BRILLO O TEXTURADO? La diferencia importa más de lo que parece. 🧱

MATE →
✔️ Disimula huellas y manchas
✔️ Estilo más sereno y moderno
✔️ Ideal para suelos y baños sin luz directa

BRILLO →
✔️ Amplía visualmente el espacio
✔️ Más fácil de limpiar la superficie
✔️ Perfecto para cocinas y baños pequeños

TEXTURADO →
✔️ Antideslizante natural
✔️ Para exterior, terrazas y zonas húmedas
✔️ Aguanta el uso intensivo

En BdB tienes los tres. Y te ayudamos a elegir el que mejor encaja con tu proyecto.

📩 adrian@gregoriojerez.com`,
    hashtags: ['BdB', 'AcabadosCerámica', 'AzulejomMate', 'AzulejoBrillo', 'Antideslizante', 'TipsDeObra', 'CerámicaInterior', 'ReformaHogar', 'Azulejos', 'LespedreresBdB'],
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
    headline_visual: 'Foto de detalle de mano de operario colocando piedra en fachada, mortero visible, trabajo artesanal. Overlay: "El proceso importa." en texto bold rojo/blanco.',
    visual_prompt: 'Instagram 1080x1350px. Close-up documentary photo of a skilled mason applying natural stone to a facade — hands visible, mortar work, stone pieces being placed precisely. Authentic construction photography, warm daylight, slightly shallow depth of field. Bold white text overlay: "EL PROCESO IMPORTA." Red BdB accent bar at bottom. BdB logo placeholder. Raw craftsmanship aesthetic matching BdB Instagram real work photos.',
    copy: `Colocar bien la piedra natural no se improvisa. 🪨

Requiere preparar bien el soporte, elegir el mortero adecuado, respetar juntas, y sellar correctamente para que aguante décadas sin problemas de humedad ni desprendimientos.

Cada proyecto tiene sus propias condiciones: tipo de soporte, orientación, exposición al agua, peso del material.

En BdB no solo te vendemos el material. Te orientamos sobre cómo instalarlo bien, qué productos auxiliares necesitas y cuáles son los errores más comunes.

Porque el resultado final depende de los dos.

¿Tienes dudas sobre la instalación?
📩 adrian@gregoriojerez.com`,
    hashtags: ['BdB', 'InstalacionPiedra', 'ProcesoDeObra', 'PiedraFachada', 'TrabajoBienHecho', 'Obra', 'Construcción', 'MaterialNatural', 'PiedraCaliza', 'LespedreresBdB'],
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
    headline_visual: 'Foto de muro de jardín con piedra natural bien integrado en entorno verde, jardinería alrededor. Overlay sutil: "Tu jardín también merece piedra." Logo BdB.',
    visual_prompt: 'Instagram 1080x1350px. Photo of a beautiful garden stone wall — natural limestone or sandstone in warm tones, lush green plants climbing or surrounding it, dappled natural light. Relaxed Mediterranean garden atmosphere. Subtle white text overlay at bottom: "Tu jardín también merece piedra." Red BdB accent stripe. BdB logo placeholder top-left. Warm, aspirational garden photography, authentic and natural.',
    copy: `Un muro de piedra natural en el jardín es inversión a largo plazo. 🌿

No se decolora. No necesita pintura cada 5 años. No se agrieta con el hielo. Y envejece bien — con el tiempo gana musgo, textura y carácter.

En BdB tenemos piedra para muros de jardín en varios formatos:
🪨 Piedra irregular para muros rústicos y tradicionales
🪨 Aplacado para cerramientos modernos y limpios
🪨 Adoquín para caminos y bordillos
🪨 Losa para pavimento de terraza exterior

Rústico, moderno, mediterráneo. La piedra encaja en todos.

¿Cuál es el estilo de tu jardín?
📩 adrian@gregoriojerez.com`,
    hashtags: ['BdB', 'MurosJardín', 'PiedraExterior', 'JardínNatural', 'PiedraJardín', 'CerramientoJardín', 'Exteriores', 'PiedraCaliza', 'ConstrucciónExterior', 'LespedreresBdB'],
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
    headline_visual: 'Foto de proyecto completo terminado: casa moderna con fachada de piedra natural, piscina, jardín exterior. Overlay bold: "UN PROYECTO. UN RESULTADO." Logo BdB grande.',
    visual_prompt: 'Instagram 1080x1350px. Full exterior project showcase photo — modern house with natural stone facade, swimming pool with stone coping, manicured garden, clean contemporary architecture, golden hour light. Bold white text overlay on dark bottom strip: "UN PROYECTO. UN RESULTADO." Smaller text below: "gregoriojerez.com". Red BdB brand bar. BdB logo placeholder prominent. Flagship editorial portfolio photography, aspirational, high quality residential project.',
    copy: `Esto es lo que pasa cuando el cliente sabe lo que quiere y el material acompaña. 🏠

Fachada de piedra natural. Pavimento de porcelato exterior. Piscina con piedra. Muro de jardín. Proyecto completo.

Todo con material de BdB.

En BdB no vendemos solo metros cuadrados de cerámica o piedra. Trabajamos con arquitectos, constructores y particulares para que el proyecto salga como se imaginó desde el principio.

Desde la elección del material hasta el asesoramiento en la instalación.

¿El tuyo, cuándo empieza?
📩 adrian@gregoriojerez.com
🌐 gregoriojerez.com`,
    hashtags: ['BdB', 'ProyectoCompleto', 'PiedraYCerámica', 'ProyectoReal', 'FachadaPiedra', 'Porcelato', 'Piscina', 'CasaConEstilo', 'LespedreresBdB', 'Construir'],
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

  console.log('\n✅ Listo. Recarga ContentFlow para ver los posts de GREGORIO JEREZ.');
}

run();
