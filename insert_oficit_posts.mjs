import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'tienda-oficit-sl';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    client_id: CLIENT_ID,
    post_number: 1,
    platform: 'IG',
    headline_visual: '🎞️ SLIDER 5 slides — "Todo lo que necesita tu oficina, fabricado en España" — REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'https://www.canva.com/d/_Z1bNB6g4QjpQNs',
    copy: `🏢 En Oficit no solo vendemos muebles — los fabricamos.

Desde Cabra (Córdoba) diseñamos y producimos mobiliario de oficina de alta calidad para empresas, despachos, academias y espacios de trabajo de toda España.

Desliza y descubre todo lo que podemos hacer por tu espacio 👉

✅ Mesas de oficina: Ofiplus Modern, Classic, Bench y formación
✅ Sillas ergonómicas, confidentes y de formación
✅ Mostradores y recepción a medida
✅ Almacenamiento y organización
✅ Envío express 72h a toda la Península
✅ Asistencia al montaje por videollamada

📦 Envíos peninsulares gratuitos
📞 957 04 89 26
🌐 oficit.com`,
    hashtags: ['#oficit', '#mueblesdeoficina', '#mobiliariodeoficina', '#fabricaciónnacional', '#oficinasmodernas', '#hechoenespaña', '#mueblesespañoles', '#espaciosdetrabajo', '#oficinacordoba', '#diseñodeoficina'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-2`,
    client_id: CLIENT_ID,
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Foto de mesa Ofiplus Modern ML en oficina diáfana, acabado blanco o gris marengo, iluminación natural',
    visual_prompt: 'https://www.canva.com/d/k0Q0vivjSrBSv5q',
    copy: `💼 La mesa que marca la diferencia en tu puesto de trabajo.

La Mesa Ofiplus Modern ML es nuestra más vendida por algo: combina diseño actual, materiales de primera y una resistencia pensada para el uso diario intensivo.

✔ Tablero melamina 25mm de alta densidad
✔ Estructura metálica en epoxi texturizado
✔ Disponible en múltiples acabados y medidas
✔ Fácil montaje — estructura parcialmente premontada

Desde 173€ (imp. no incl.) 📦 Envío 72h incluido

¿Buscas algo diferente? También fabricamos a medida.

📞 957 04 89 26
🌐 oficit.com`,
    hashtags: ['#mesasdeoficina', '#ofiplushmodern', '#mueblesdeoficina', '#oficinasmodernas', '#oficit', '#diseñodeoficina', '#espaciosdetrabajo', '#mobiliarioempresarial'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-3`,
    client_id: CLIENT_ID,
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Silla ergonómica TNK Flex con respaldo de malla en despacho moderno, fondo neutro, luz suave lateral',
    visual_prompt: 'https://www.canva.com/d/oqv6j-MhGuhf7Bu',
    copy: `🪑 Tu espalda te lo agradecerá.

La Silla TNK FLEX está diseñada para quienes pasan muchas horas en su puesto de trabajo. Ergonomía real, no solo de catálogo.

▫️ Respaldo de malla transpirable de alta calidad
▫️ Reposabrazos y cabezal ajustables
▫️ Asiento acolchado con regulación de altura
▫️ Base giratoria con ruedas de movilidad fluida
▫️ Válida para uso operativo y directivo

Porque la comodidad también es productividad. ☑️

📞 957 04 89 26
📩 comercial@oficit.es
🌐 oficit.com`,
    hashtags: ['#sillaergonomica', '#sillasdeoficina', '#ergonomia', '#oficit', '#mueblesdeoficina', '#trabajocomodo', '#oficinasmodernas', '#salud laboral'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-4`,
    client_id: CLIENT_ID,
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Furgoneta o caja de embalaje con logo Oficit, fondo de almacén limpio con cajas apiladas y luz cálida',
    visual_prompt: 'https://www.canva.com/d/fk6vm6PMmQVMwY1',
    copy: `⏱️ ¿Necesitas tu mobiliario sin esperas? Tenemos la solución.

Nuestro servicio EXPRESS te garantiza salida de almacén en 72 horas hábiles. Porque cuando tu empresa arranca o renueva su espacio, no puede permitirse esperar semanas.

📦 Envíos peninsulares GRATUITOS
🛠️ Embalaje protector a medida
📹 Asistencia al montaje por videollamada (L-V 8:30-14:00h)
✅ Reclamación de desperfectos en 24h

Más de 943 clientes satisfechos avalan nuestra logística. 🌟

🌐 Consulta disponibilidad express en oficit.com
📞 957 04 89 26`,
    hashtags: ['#enviorapido', '#mueblesexpress', '#oficinalista', '#oficit', '#mobiliariodeoficina', '#entrega72h', '#logistica', '#servicioprofesional'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-5`,
    client_id: CLIENT_ID,
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Mesa bench de 6 puestos con separadores en oficina abierta moderna, vista frontal o ligeramente lateral, luz natural',
    visual_prompt: 'https://www.canva.com/d/1zZiqdFHytnTAfq',
    copy: `👥 Más puestos, el mismo orden. Más colaboración, el mismo rendimiento.

La Mesa BENCH MODERN de 6 puestos está pensada para equipos que comparten espacio sin sacrificar concentración ni estética.

✔ Separadores para delimitar zonas de trabajo
✔ Diseño compacto y modular
✔ Tablero ML resistente al uso intensivo
✔ Compatible con cajoneras y almacenaje auxiliar
✔ Disponible en varios acabados y configuraciones

Ideal para startups, coworkings y oficinas en crecimiento. 🚀

📐 También fabricamos a medida para tu planta.

📞 957 04 89 26
🌐 oficit.com`,
    hashtags: ['#mesasbench', '#oficinascolaborativas', '#coworking', '#oficit', '#mueblesdeoficina', '#espaciosdetrabajo', '#oficinasabiertas', '#mobiliarioempresarial'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-6`,
    client_id: CLIENT_ID,
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Aula de formación con mesas y sillas apilables ordenadas en filas, ambiente de academia o sala de cursos, luz blanca',
    visual_prompt: 'https://www.canva.com/d/gekgvCbtkizB8_l',
    copy: `📚 El espacio también enseña. Equípalo como merece.

En Oficit somos especialistas en mobiliario para centros de formación, academias, aulas corporativas y salas de cursos.

🪑 Sillas de formación: con pala, sin pala, tapizadas o en polipropileno
📏 Mesas desmontables y apilables: desde 55€
🖥️ Configuraciones flexibles para cualquier formato de aula
♻️ Materiales con certificaciones FSC y PEFC

Lo que más valoran nuestros clientes: resistencia al uso diario intensivo y facilidad de reorganización del espacio.

Desde academias privadas hasta departamentos de RRHH. 🏫

📞 957 04 89 26
📩 comercial@oficit.es`,
    hashtags: ['#mobiliarioformacion', '#sillasdeformacion', '#aulasmodernas', '#centrosdeformacion', '#oficit', '#academias', '#mobiliarioeducativo', '#espaciosformativos'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-7`,
    client_id: CLIENT_ID,
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Mostrador de recepción elegante en blanco con iluminación LED bajo el tablero, recepción de empresa moderna',
    visual_prompt: 'https://www.canva.com/d/tfNuzQSyBYDOkJ2',
    copy: `🛋️ La recepción es el primer apretón de manos de tu empresa.

Un mostrador bien diseñado comunica profesionalidad antes de que nadie hable. En Oficit lo fabricamos a tu medida.

🪵 Acabados disponibles: Blanco, Nogal, Olmo, Roble Azabache, Haya
📏 Melamina 25mm de alta calidad
🔧 Fabricación nacional — instalación profesional
🎨 Diseño adaptado a tu imagen corporativa

Desde el mostrador BASIC compacto hasta proyectos de recepción completos con zona de espera.

¿Tienes una apertura o reforma prevista? Hablemos. 📐

📞 957 04 89 26
🌐 oficit.com`,
    hashtags: ['#mostradorrecepcion', '#recepcionoficina', '#mobiliarioarecepcion', '#oficit', '#mueblesdeoficina', '#diseñodeinterior', '#espaciosprofesionales', '#fabricaciónnacional'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-8`,
    client_id: CLIENT_ID,
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Bosque certificado FSC con luz solar entre árboles + infografía con logos FSC y PEFC superpuestos, fondo verde y madera',
    visual_prompt: 'https://www.canva.com/d/lGxsL1lq-xcRSdt',
    copy: `🌱 La sostenibilidad también se fabrica.

En Oficit utilizamos maderas con certificaciones FSC y PEFC, procedentes de bosques gestionados de forma responsable.

Por qué importa:
✔ Garantía de origen legal y sostenible de la madera
✔ Apoyo a la gestión forestal responsable
✔ Tableros resistentes para uso intensivo en múltiples acabados
✔ Producción 100% nacional

No es solo una etiqueta. Es un compromiso con el entorno y con la calidad de lo que entra en tu oficina.

🏭 Fabricado en Cabra, Córdoba. Enviado a toda España.

🧩 Más en oficit.com`,
    hashtags: ['#sostenibilidad', '#fsc', '#pefc', '#mueblesecologicos', '#oficit', '#fabricaciónnacional', '#madercertificada', '#oficinaverde', '#mueblesdeoficina', '#compromisoambiental'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-9`,
    client_id: CLIENT_ID,
    post_number: 9,
    platform: 'IG',
    headline_visual: 'Armario de oficina metálico gris con puertas cerradas en despacho ordenado, zona de almacenamiento corporativo',
    visual_prompt: 'https://www.canva.com/d/G-aW0zuDN3YW6sR',
    copy: `🗃️ Una oficina ordenada es una oficina productiva.

El Armario ML de Oficit está diseñado para mantener todo en su sitio sin renunciar al estilo.

✔ Disponible en varios colores y medidas
✔ Apto para documentos, carpetas archivadoras y material de oficina
✔ Melamina de alta densidad — resistente al uso diario
✔ Compatible con nuestras mesas de la gama Ofiplus

Porque el orden en el espacio de trabajo no es opcional — es eficiencia. ☑️

🎨 Elige el acabado que mejor combine con tu oficina.

📦 Envío 72h a toda la Península
📞 957 04 89 26
🌐 oficit.com`,
    hashtags: ['#armariodeoficina', '#almacenamiento', '#ordenoficina', '#oficit', '#mueblesdeoficina', '#espaciosdetrabajo', '#oficinasmodernas', '#mobiliarioempresarial'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-10`,
    client_id: CLIENT_ID,
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Foto real de proyecto de montaje integral: sala de trabajo equipada completamente con mesas bench, sillas y almacenaje Oficit',
    visual_prompt: 'https://www.canva.com/d/48MEP0Zvhte1khv',
    copy: `🚧 Proyecto finalizado. Oficina lista para trabajar.

Una semana más, entregamos un espacio de trabajo completo: desde la planificación hasta el último tornillo.

🔹 Puestos operativos con mesas Ofiplus Modern
🔹 Sillas ergonómicas para uso intensivo
🔹 Sistemas bench colaborativos con separadores
🔹 Zonas de reunión y descanso equipadas
🔹 Armarios y almacenaje integrado

En Oficit adaptamos cada proyecto a las necesidades reales del espacio.

📐 Diseño cuidado
🛠️ Instalación profesional incluida
💰 Costes optimizados — relación calidad/precio imbatible

¿Tienes un espacio por amueblar? Cuéntanoslo.

📞 957 04 89 26 · 🌐 oficit.com`,
    hashtags: ['#proyectofinalizado', '#montajeoficina', '#oficit', '#mueblesdeoficina', '#interiorismooficinas', '#diseñodeoficina', '#espaciosdetrabajo', '#oficinasmodernas', '#proyectointegral'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-11`,
    client_id: CLIENT_ID,
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Sofá de 2 plazas CAVIRA en sala de espera corporativa elegante, tono azul marino o gris, planta y mesa auxiliar de fondo',
    visual_prompt: 'https://www.canva.com/d/nzlgBQ3FEuJaGbz',
    copy: `🛋️ La sala de espera también comunica quién eres.

El sofá CAVIRA de 2 plazas aporta elegancia, comodidad y una imagen profesional que tus clientes y visitantes notarán desde el primer momento.

Un diseño moderno que transmite cercanía y confianza.

✔ Estructura resistente para uso intensivo
✔ Tapizado en varios colores para adaptar a tu imagen corporativa
✔ Compacto — ideal para recepciones con tránsito frecuente
✔ Compatible con butacas y módulos de la misma gama

Porque hacer agradable la espera también es cuidar a tus visitantes. ❤️

📞 957 04 89 26
📩 comercial@oficit.es
🌐 oficit.com`,
    hashtags: ['#saladeespera', '#recepcionempresa', '#sofasdeoficina', '#mobiliariorecepcion', '#oficit', '#mueblesdeoficina', '#diseñocorporativo', '#espaciosprofesionales'],
    status: 'review',
    feedback: '',
    image_url: ''
  },
  {
    id: `${CLIENT_ID}-12`,
    client_id: CLIENT_ID,
    post_number: 12,
    platform: 'IG',
    headline_visual: 'Collage de 4 fotos: mesa, silla, mostrador y proyecto montado — cuadrícula 2x2 sobre fondo blanco con logo Oficit centrado — REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'https://www.canva.com/d/fNLXCOO-Tz4epIP',
    copy: `🏢 Todo lo que necesita tu oficina. Fabricado en España. Enviado en 72h.

En Oficit llevamos años ayudando a empresas, despachos, academias y negocios a crear espacios de trabajo donde las personas rindan y se sientan bien.

✅ Mesas de oficina desde 167€
✅ Sillas ergonómicas y de formación
✅ Mostradores y recepciones a medida
✅ Almacenamiento y mobiliario auxiliar
✅ Proyectos integrales llave en mano
✅ Envío gratuito a toda la Península

Más de 943 opiniones verificadas. ⭐⭐⭐⭐⭐

¿Necesitas equipar tu espacio? Estamos aquí para ayudarte. 💡

📞 957 04 89 26 · 689 324 108
📩 comercial@oficit.es
🌐 oficit.com
📍 Av. de la Constitución Nº2, Cabra (Córdoba)`,
    hashtags: ['#oficit', '#mueblesdeoficina', '#mobiliariodeoficina', '#fabricaciónnacional', '#oficinasmodernas', '#enviogratis', '#hechoenespaña', '#equipatuficina', '#espaciosdetrabajo', '#diseñodeoficina'],
    status: 'review',
    feedback: '',
    image_url: ''
  }
];

async function insertPosts() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID}...`);

  for (const post of posts) {
    const { data, error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'id' });

    if (error) {
      console.error(`✗ Post #${post.post_number}:`, error.message);
    } else {
      const preview = post.headline_visual.substring(0, 60);
      console.log(`✓ Post #${post.post_number}: ${preview}...`);
    }
  }

  console.log(`✅ Listo. Recarga ContentFlow para ver los posts de TIENDA OFICIT.`);
}

insertPosts();
