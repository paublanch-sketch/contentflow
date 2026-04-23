import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'pinturas-muse';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    client_id: CLIENT_ID,
    post_number: 1,
    platform: 'LI',
    headline_visual: 'Single image — Estructura metálica lacada en línea de producción, tonos azul marino y acero. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'Professional LinkedIn post image 1200x627px. Dark navy blue (#1A3A5C) background with metallic steel texture overlay. Large bold white headline top: "PINTURAS MUSE" in industrial sans-serif. Center: dramatic photo of metal framework/structure with perfect powder coat finish, workers in background with PPE. Bottom bar: dark steel grey with white text "Recubrimientos industriales certificados QUALICOAT | pinturasmuse.com". Small QUALICOAT badge bottom right. Clean B2B industrial aesthetic.',
    copy: `Tus estructuras metálicas merecen más que una capa de pintura. 🏗️

En Pinturas Muse sabemos que la carpintería metálica —perfiles, cerramientos, puertas industriales o estructuras de acero— no solo debe lucir bien. Debe aguantar.

Por eso aplicamos recubrimientos adaptados a cada tipología de pieza:

✅ Pintura en polvo termoendurecida: adherencia máxima sobre aluminio, acero y fundición.
✅ Tratamiento superficial previo: desengrasado y fosfatado para eliminar oxidación y garantizar una base perfecta.
✅ Control de espesor de capa: medición en micras para cumplir con las especificaciones técnicas de cada proyecto.
✅ Gama cromática ilimitada: cualquier color RAL o personalizado con fidelidad total.

Desde cerramientos arquitectónicos hasta mobiliario urbano e industrial, en Pinturas Muse garantizamos un acabado que cumple con las normativas más exigentes del sector.

¿Tu proyecto de carpintería metálica necesita un recubrimiento a la altura?

📩 Solicita tu propuesta técnica personalizada:
📱 +34 619 783 440 / +34 620 740 370
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#CarpinteríaMetálica', '#RecubrimientosIndustriales', '#PinturaEnPolvo', '#AcabadosMetálicos', '#EstructurasMetálicas', '#LacadoAlHorno', '#CalidadIndustrial', '#PerfilesDeAluminio', '#MadridIndustrial'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-2`,
    client_id: CLIENT_ID,
    post_number: 2,
    platform: 'LI',
    headline_visual: '🎞️ SLIDER 5 slides (PDF carousel LinkedIn) — "Del metal desnudo al acabado perfecto". Portada + 4 pasos del proceso. Fondo navy, tipografía bold blanca, numeración grande.',
    visual_prompt: 'LinkedIn PDF carousel, 5 square slides 1080x1080px each. Dark navy (#1A3A5C) background, white bold typography, industrial steel accents. Slide 1 (cover): Large title "DEL METAL DESNUDO AL ACABADO PERFECTO ⚙️" + "Pinturas Muse" logo top, step counter "1/5" bottom right. Slide 2: Big number "01" + title "PREPARACIÓN" + subtitle "Desengrase y pretratamiento superficial" + industrial cleaning/blasting image. Slide 3: "02 APLICACIÓN" + electrostatic powder gun in booth image. Slide 4: "03 CURADO" + oven with metal parts image. Slide 5 (CTA): "04 CONTROL DE CALIDAD" + logo + pinturasmuse.com + +34 619 783 440. Consistent step indicator dots at bottom of each slide.',
    copy: `Del metal desnudo al acabado perfecto: así trabajamos en Pinturas Muse. ⚙️

Un recubrimiento industrial no empieza con la pistola de polvo. Empieza mucho antes.

👉 Desliza para descubrir nuestro proceso completo, la razón por la que nuestros acabados duran más y rinden mejor.

[Slide 1] ▶ El proceso que marca la diferencia
[Slide 2] ▶ PREPARACIÓN: Desengrase y pretratamiento superficial. Sin una base limpia, ningún acabado dura.
[Slide 3] ▶ APLICACIÓN: Pistola electrostática en cabina de polvo con filtro absoluto. Cobertura uniforme, sin contaminación.
[Slide 4] ▶ CURADO: Horno estático con control preciso de temperatura. La química hace el resto.
[Slide 5] ▶ CONTROL DE CALIDAD: Medición de espesor, adherencia y aspecto. Si no cumple, no sale.

Tres décadas perfeccionando cada paso del proceso. Eso es lo que diferencia a Pinturas Muse.

¿Quieres saber qué proceso se adapta mejor a tus piezas?

📩 Hablemos:
📱 +34 619 783 440
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#ProcesoIndustrial', '#PinturaEnPolvo', '#PowderCoating', '#RecubrimientosIndustriales', '#CalidadGarantizada', '#LacadoAlHorno', '#ControlDeCalidad', '#FabricaciónIndustrial', '#IngenieríaDeProcesos'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-3`,
    client_id: CLIENT_ID,
    post_number: 3,
    platform: 'LI',
    headline_visual: '🎞️ SLIDER 4 slides (PDF carousel LinkedIn) — "1.000 m² de precisión industrial". Tour visual del taller: nave, hornos, cabinas, logística.',
    visual_prompt: 'LinkedIn PDF carousel, 4 square slides 1080x1080px each. Industrial photography style. Slide 1 (cover): Bold white text "1.000 M² DE PRECISIÓN INDUSTRIAL" on dark navy overlay of wide factory floor shot. PINTURAS MUSE logo top left. Slide 2: Wide shot of 1000sqm factory nave with overhead lighting, metal parts hanging on conveyor. Caption "NAVE DE PRODUCCIÓN — 1.000 m² interiores · 3.000 m² de terreno". Slide 3: Split image — static oven with 7m capacity + powder coating booth. Caption "MAQUINARIA: Horno hasta 7m · 2 cabinas polvo · Cabina líquida 4,5m". Slide 4: Loading dock / logistics area. CTA: pinturasmuse.com · +34 619 783 440 · Torres de la Alameda, Madrid.',
    copy: `1.000 m² de precisión industrial. Así es nuestro taller por dentro. 🏭

No todos los talleres están preparados para afrontar proyectos de gran escala. El nuestro, sí.

👉 Desliza y descubre la infraestructura que hace posible lo que otros no pueden.

[Slide 1] ▶ Una instalación diseñada para no tener límites
[Slide 2] ▶ NAVE DE PRODUCCIÓN: 1.000 m² interiores sobre 3.000 m² de terreno. Flujo optimizado de producción, sin cuellos de botella.
[Slide 3] ▶ MAQUINARIA: Horno estático hasta 7 m · Horno hasta 3,5 m · 2 cabinas de polvo con filtro absoluto · Cabina líquida hasta 4,5 m · Cabina líquida presurizada de alta calidad.
[Slide 4] ▶ LOGÍSTICA: Amplias zonas de carga y descarga. Tu cadena de producción no para.

Tecnología, capacidad y experiencia al servicio de tus proyectos industriales más ambiciosos.

¿Tienes piezas de gran formato que necesitan un recubrimiento profesional?

📩 Solicita visita técnica o presupuesto:
📱 +34 619 783 440 / +34 620 740 370
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#TallerIndustrial', '#GranFormato', '#InfraestructuraIndustrial', '#LacadoAlHorno', '#PinturaEnPolvo', '#MaquinariaIndustrial', '#Madrid', '#CapacidadIndustrial', '#PiezasDeGranTamaño'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-4`,
    client_id: CLIENT_ID,
    post_number: 4,
    platform: 'LI',
    headline_visual: 'Single image — Primer plano de pieza metálica con acabado impecable, reflejo perfecto. Badge QUALICOAT visible. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'LinkedIn post image 1200x627px. Close-up macro photo of perfectly powder-coated metal surface with mirror-like finish. Dark background. Top left: PINTURAS MUSE logo white. Bold headline center: "PINTAMOS CON GARANTÍA. LITERAL." Below: Three horizontal badges in steel grey: "QUALICOAT" · "Garantía escrita" · "Desde 2002". Bottom strip navy: "pinturasmuse.com | +34 619 783 440". Premium industrial B2B aesthetic.',
    copy: `Pintamos con garantía. Literal. 📋

En un sector donde el "ya lo verás cuando llegue" es demasiado frecuente, en Pinturas Muse hacemos algo diferente: lo ponemos por escrito.

Desde 2002 trabajamos con empresas líderes que necesitan un proveedor en el que confiar. Y nuestra garantía no es marketing; es un compromiso técnico:

✅ Certificación QUALICOAT: polímeros Epoxi y Poliéster que cumplen con los estándares europeos más exigentes.
✅ Medición y control de espesor en cada lote: el recubrimiento tiene las micras correctas, siempre.
✅ Garantía de plazo: sabemos que tu cadena de producción no puede esperar, y nos organizamos para cumplir.
✅ Garantía de resultado: si algo no cumple nuestros estándares, lo repetimos. Sin excusas.

La calidad no se presupone. Se demuestra en cada pieza que sale de nuestro taller.

¿Buscas un proveedor de pintura industrial con el que puedas firmar un SLA de calidad?

📩 Solicita tu propuesta:
📱 +34 619 783 440
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#Qualicoat', '#CalidadIndustrial', '#GarantíaIndustrial', '#PinturaEnPolvo', '#NormasDeCalidad', '#RecubrimientosCertificados', '#ProveedorIndustrial', '#AcabadosGarantizados', '#MadeInSpain'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-5`,
    client_id: CLIENT_ID,
    post_number: 5,
    platform: 'LI',
    headline_visual: 'Single image — Técnico de Pinturas Muse con EPI aplicando pintura sobre maquinaria industrial in situ, en instalaciones de un cliente.',
    visual_prompt: 'LinkedIn post image 1200x627px. Action photo of industrial painter with full PPE (mask, suit, gloves) applying liquid paint with airless spray gun on large industrial machinery in situ at client facility. Dynamic angle, professional lighting. Top overlay: PINTURAS MUSE logo. Bold text overlay right side: "¿No puedes mover tus equipos? Nosotros vamos." Dark navy banner at bottom: "Servicio de intervención in situ | pinturasmuse.com".',
    copy: `¿No puedes mover tus equipos? Nosotros vamos a donde están. 🚐

Hay piezas que no pueden entrar en un taller. Maquinaria anclada, estructuras en obra, instalaciones críticas que no se pueden parar.

Para eso existe nuestro servicio de intervención in situ.

Nuestro equipo móvil se desplaza a tus instalaciones y aplica la misma calidad técnica que en nuestro taller de Torres de la Alameda, con los medios adecuados para cada tipo de trabajo:

✅ Pintura líquida de altas prestaciones aplicada directamente sobre la pieza.
✅ Equipo de proyección airless y convencional para cualquier geometría.
✅ Preparación y pretratamiento superficial previo (lija, desengrase, imprimación).
✅ Coordinación con tu equipo de producción para minimizar paradas.

Desde maquinaria de vending hasta estructuras industriales o elementos de gran formato. Sin que tu actividad se detenga.

¿Tienes equipos que necesitan mantenimiento de recubrimiento sin poder moverlos?

📩 Cuéntanos el reto:
📱 +34 619 783 440 / +34 620 740 370
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#ServicioInSitu', '#PinturaIndustrial', '#MantenimientoIndustrial', '#ServicioMóvil', '#RecubrimientosIndustriales', '#PinturaLíquida', '#SolucionesAMedida', '#EquipoIndustrial', '#MadridIndustrial'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-6`,
    client_id: CLIENT_ID,
    post_number: 6,
    platform: 'LI',
    headline_visual: 'Single image — Interior de cabina de polvo electrostático, proceso limpio y sin emisiones. Tono verde industrial y acero.',
    visual_prompt: 'LinkedIn post image 1200x627px. Interior of clean powder coating spray booth, worker in PPE applying electrostatic powder with gun. Clean bright white booth environment. Green tinted professional lighting. Top: PINTURAS MUSE logo. Headline: "0% DISOLVENTES. 100% RENDIMIENTO." Stats bar below: 3 columns — "COV: 0" · "Recuperación de polvo: máxima" · "Eficiencia energética: alta". Bottom navy: "Sostenibilidad industrial real | pinturasmuse.com".',
    copy: `Alto rendimiento y bajo impacto ambiental. No es un compromiso; es nuestra forma de trabajar. 🌿

En Pinturas Muse llevamos años apostando por la pintura en polvo electrostática no solo por su calidad técnica, sino por sus ventajas medioambientales respecto a los recubrimientos líquidos convencionales:

✅ 0% disolventes: el proceso de pintura en polvo no genera COV (Compuestos Orgánicos Volátiles).
✅ Recuperación del exceso de polvo: lo que no se adhiere a la pieza se recoge y reutiliza. Desperdicio mínimo.
✅ Menor consumo energético por lote gracias a nuestros hornos de alta eficiencia térmica.
✅ Residuos reducidos: sin envases de disolventes, sin lodos de pintura líquida.

Esto no solo es mejor para el planeta. Es mejor para tu empresa: menos gestión de residuos peligrosos, más eficiencia en el proceso productivo.

La sostenibilidad industrial no es un extra. En Pinturas Muse, es el estándar.

¿Tu empresa tiene objetivos de sostenibilidad en la cadena de suministro?

📩 Hablemos de cómo podemos contribuir:
📱 +34 619 783 440
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#SostenibilidadIndustrial', '#EcoEficiencia', '#PinturaEnPolvo', '#PowderCoating', '#CeroDisolventes', '#IndustriaVerde', '#GreenManufacturing', '#CircularEconomy', '#RecubrimientosSostenibles'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-7`,
    client_id: CLIENT_ID,
    post_number: 7,
    platform: 'LI',
    headline_visual: 'Single image — Comparativa visual split: izquierda pieza con pintura en polvo, derecha pieza con pintura líquida. Diseño infográfico limpio.',
    visual_prompt: 'LinkedIn post image 1200x627px. Clean infographic split design. Left half (dark navy #1A3A5C): "PINTURA EN POLVO" with powder coat texture, bullet points in white: termoendurecida, sin disolventes, hasta 7m horno, ideal metal. Right half (steel grey #4A5568): "PINTURA LÍQUIDA" with liquid paint texture, bullet points: piezas sensibles al calor, acabados especiales, formatos sin límite, in situ. Center divider: vertical line with VS badge. PINTURAS MUSE logo top. "¿No sabes cuál necesitas? Hablamos" CTA bottom.',
    copy: `Pintura en polvo o pintura líquida: ¿cuál necesita realmente tu proyecto? ⚙️

Una de las preguntas más frecuentes que recibimos en Pinturas Muse. La respuesta honesta: depende de la pieza, el entorno y la exigencia técnica.

Aquí el resumen técnico que usamos nosotros para decidir:

PINTURA EN POLVO ✅ Ideal cuando:
— La pieza es metálica y puede pasar por horno (hasta 200°C).
— Necesitas máxima dureza superficial y resistencia a golpes.
— El proyecto requiere bajo impacto ambiental (sin disolventes).
— Buscas un acabado de alta cobertura con bajo rechazo.

PINTURA LÍQUIDA ✅ Ideal cuando:
— La pieza no puede someterse a temperatura (materiales sensibles al calor).
— Requieres acabados especiales: efectos, bicapas, pinturas funcionales anticorrosión.
— Trabajas en grandes formatos que superan las dimensiones del horno.
— Necesitas una intervención in situ en instalaciones del cliente.

En Pinturas Muse ofrecemos las dos tecnologías y la experiencia para recomendarte la más adecuada. Sin sesgos.

¿No estás seguro de cuál necesitas?

📩 Cuéntanos tu proyecto y te asesoramos:
📱 +34 619 783 440
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#PinturaEnPolvo', '#PinturaLíquida', '#PowderCoating', '#AsesoramientoTécnico', '#RecubrimientosIndustriales', '#Ingeniería', '#AcabadosIndustriales', '#IndustriaManufacturera', '#SolucionesIndustriales'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-8`,
    client_id: CLIENT_ID,
    post_number: 8,
    platform: 'LI',
    headline_visual: 'Single image — Pieza industrial de gran tamaño (camión, estructura metálica de más de 5m) en el interior del taller de Pinturas Muse. Escala impactante.',
    visual_prompt: 'LinkedIn post image 1200x627px. Wide dramatic angle shot of large industrial factory oven or coated structure of 6-7 meters length inside industrial facility. Worker next to it for scale. Dark dramatic lighting with warm oven glow. Top overlay: PINTURAS MUSE logo white. Bold measurement graphic: "7 METROS" in massive type center. Bottom tagline: "¿Tu pieza cabe en algún otro taller de Madrid?" Navy bottom bar: pinturasmuse.com | Torres de la Alameda, Madrid.',
    copy: `7 metros. ¿Hay algún otro taller en Madrid que pueda decir lo mismo? 📏

En Pinturas Muse no hemos construido nuestra infraestructura para proyectos estándar. La hemos diseñado para los que nadie más puede hacer.

Nuestro horno estático para piezas de hasta 7 metros de longitud nos posiciona como una de las pocas instalaciones en la Comunidad de Madrid capaz de procesar elementos de gran formato con la misma calidad que una pieza pequeña de precisión.

¿Qué tipo de proyectos procesamos en gran formato?

— Estructuras metálicas y perfilería de gran longitud.
— Elementos de señalización e infraestructura viaria.
— Maquinaria industrial de envergadura.
— Componentes de vehículos especiales.
— Mobiliario urbano y equipamiento exterior.

Además, contamos con cabina de pintura líquida para piezas de hasta 4,5 m, cubriendo todos los rangos y tipologías.

Si tu proyecto tiene dimensiones que otros talleres no pueden asumir, Pinturas Muse tiene la solución.

📩 Consulta capacidad y plazos para tu pieza:
📱 +34 619 783 440 / +34 620 740 370
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#GranFormato', '#PiezasXXL', '#TallerIndustrial', '#LacadoAlHorno', '#PinturaEnPolvo', '#Madrid', '#CarpinteríaMetálica', '#InfraestructuraIndustrial', '#RecubrimientosDeGranEscala'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-9`,
    client_id: CLIENT_ID,
    post_number: 9,
    platform: 'LI',
    headline_visual: 'Single image — Máquina de vending o terminal de parking con acabado lacado impecable y serigrafía integrada de alta calidad.',
    visual_prompt: 'LinkedIn post image 1200x627px. Professional photo of vending machine or parking terminal with perfect powder coat finish and precision silk-screen printed graphics. Clean outdoor or indoor setting. PINTURAS MUSE logo overlay top left. Bold headline: "Tu maquinaria habla de tu marca. Asegúrate de que lo hace bien." Two-column feature list at bottom on dark overlay: left "LACADO INDUSTRIAL" / right "SERIGRAFÍA INTEGRADA". Navy bottom bar: pinturasmuse.com.',
    copy: `Tu maquinaria está en la calle, expuesta al público. Que hable bien de tu marca. 🏧

Dispensadores de parking, terminales de pago, máquinas de vending, equipos de acceso controlado. Todos tienen algo en común: están en la calle, son el primer punto de contacto con tu cliente, y soportan condiciones extremas cada día.

En Pinturas Muse hemos desarrollado una solución integral para este tipo de equipos que combina dos disciplinas técnicas:

✅ Lacado industrial: recubrimiento en polvo o líquido de alta resistencia a la intemperie, vandalismo y uso intensivo.
✅ Gráfica integrada: serigrafía de precisión sobre el propio acabado, con tintas resistentes a UV, rayado y limpieza química.

El resultado: una máquina que mantiene su aspecto profesional y comunica la identidad de tu marca incluso después de años de uso continuado.

Hemos trabajado con fabricantes y operadores de maquinaria de los principales sectores: parking, hostelería, retail y transporte.

¿Tu parque de maquinaria necesita renovación de acabados o rebranding?

📩 Pregúntanos por nuestra solución integral:
📱 +34 619 783 440
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#SectorVending', '#MaquinariaIndustrial', '#GráficaIndustrial', '#BrandingIndustrial', '#AcabadosMetálicos', '#SerigrafíaTécnica', '#LacadoIndustrial', '#ResistenciaExtrema', '#EquiposDeAcceso'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-10`,
    client_id: CLIENT_ID,
    post_number: 10,
    platform: 'LI',
    headline_visual: 'Single image — Split antes/después: pieza metálica oxidada vs misma pieza restaurada con acabado perfecto. Alto impacto visual.',
    visual_prompt: 'LinkedIn post image 1200x627px. Dramatic split-screen comparison. Left half: severely corroded/rusted metal part with flaking paint, label "ANTES" in red. Right half: same part after full restoration with perfect powder coat finish, gleaming and uniform, label "DESPUÉS" in green. Center vertical divider with PINTURAS MUSE logo. Bold text below: "Antes de sustituirla, restaura." Subtext: "Diagnóstico técnico sin compromiso." Dark navy bottom bar with contact info.',
    copy: `Antes de dar esa pieza por perdida, llámanos. 🛠️

En Pinturas Muse no solo aplicamos recubrimientos nuevos. También recuperamos piezas que, a primera vista, parecen irrecuperables.

Oxidación avanzada, impactos, descascarillado, corrosión puntual o generalizada. En muchos casos, la pieza puede tener una segunda vida con un proceso técnico correcto, evitando el coste —y el tiempo— de fabricar una nueva.

Nuestro proceso de restauración técnica incluye:

✅ Diagnóstico previo: evaluación del estado superficial y determinación de viabilidad.
✅ Tratamiento mecánico: chorreado abrasivo, lijado de precisión y eliminación de focos de oxidación.
✅ Imprimación protectora: aplicación de fondo epoxídico o anticorrosivo adaptado a la exposición de la pieza.
✅ Acabado final: pintura en polvo o líquida con el mismo estándar que una pieza nueva.

Hemos restaurado desde maquinaria industrial hasta componentes de automoción, pasando por piezas de fibra de carbono y estructuras metálicas de alta exigencia técnica.

¿Tienes piezas dañadas que no sabes si vale la pena recuperar?

📩 Envíanos fotos y te damos una valoración técnica sin compromiso:
📱 +34 619 783 440 / +34 620 740 370
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#RestauraciónIndustrial', '#PiezasMetálicas', '#MantenimientoIndustrial', '#AnticorrosiónIndustrial', '#RecuperaciónDePiezas', '#AcabadosIndustriales', '#PinturaIndustrial', '#RestauraciónTécnica', '#MadridIndustrial'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-11`,
    client_id: CLIENT_ID,
    post_number: 11,
    platform: 'LI',
    headline_visual: 'Single image — Collage histórico: foto antigua del taller (estilo vintage) combinada con foto actual moderna. Gran impacto visual de trayectoria. REQUIERE INTEGRACIÓN DE LOGO',
    visual_prompt: 'LinkedIn post image 1200x627px. Split design: left side vintage/aged photo style of old industrial workshop 1990s, sepia tones. Right side modern professional photo of current Pinturas Muse state-of-the-art facility, full color. Connecting timeline element center with "1994 → 2024". PINTURAS MUSE logo top center. Bold text overlay: "30 AÑOS PINTANDO LA INDUSTRIA ESPAÑOLA." Subtext: "No es experiencia. Es criterio." Dark navy bottom bar.',
    copy: `30 años pintando la industria española. No es solo experiencia. Es criterio. ⚙️

Pinturas Muse nació en 1994. Treinta años después, seguimos en el mismo sitio: Torres de la Alameda, Madrid. Con el mismo compromiso con la calidad y la misma obsesión por el detalle técnico.

Pero lo que ha cambiado es mucho:

— De cabinas manuales a sistemas electrostáticos de última generación.
— De hornos convencionales a instalaciones que procesan piezas de hasta 7 metros.
— De pinturas estándar a recubrimientos certificados QUALICOAT con garantía escrita.
— De clientes locales a empresas referentes en sectores como el vending, el transporte, la arquitectura metálica y la maquinaria industrial.

Tres décadas de proyectos resueltos, plazos cumplidos y clientes que vuelven nos han dado algo que no se compra: criterio técnico para saber exactamente qué necesita cada pieza.

Gracias a todos los clientes, proveedores y colaboradores que han hecho posible este camino.

El próximo capítulo lo escribimos juntos.

📩 Descubre lo que podemos hacer por tu proyecto:
📱 +34 619 783 440
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#30Años', '#AniversarioIndustrial', '#PinturaIndustrial', '#MadeInSpain', '#TrayectoriaIndustrial', '#LacadoAlHorno', '#PowderCoating', '#EmpresaFamiliar', '#IndustriaEspañola'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-12`,
    client_id: CLIENT_ID,
    post_number: 12,
    platform: 'LI',
    headline_visual: 'Single image — Equipo técnico de Pinturas Muse en el taller con EPI, posando de forma profesional y cercana. Transmite confianza y profesionalidad.',
    visual_prompt: 'LinkedIn post image 1200x627px. Professional team photo of 4-6 industrial workers in matching PPE (masks around neck, company jackets/shirts) posing confidently inside the Pinturas Muse factory. Warm industrial lighting, metal parts and equipment visible in background. PINTURAS MUSE logo top left. Bold white text overlay at bottom: "Detrás de cada acabado perfecto, hay un equipo que lo hace posible." Dark navy bottom bar: pinturasmuse.com | Torres de la Alameda, Madrid.',
    copy: `Detrás de cada acabado perfecto, hay un equipo que lo hace posible. 👷

En Pinturas Muse podemos hablar de nuestros hornos, nuestras cabinas y nuestra certificación QUALICOAT. Pero la verdad es que lo que marca la diferencia somos las personas.

Nuestro equipo técnico lleva años perfeccionando cada paso del proceso:

✅ Formación continua en nuevas técnicas de recubrimiento y materiales.
✅ Rigor en cada preparación superficial, porque sabemos que ahí empieza la calidad.
✅ Compromiso con la seguridad en cada turno de trabajo.
✅ Criterio técnico para detectar problemas antes de que lleguen al cliente.

En Pinturas Muse no solo aplicamos pintura: construimos confianza.

Eso significa que cuando un proyecto entra por nuestra puerta, cada miembro del equipo lo trata como si fuera suyo. Porque así es como se consiguen los resultados que nuestros clientes esperan.

¿Buscas un socio industrial con el que puedas contar a largo plazo?

📩 Hablemos:
📱 +34 619 783 440 / +34 620 740 370
🌐 https://pinturasmuse.com/`,
    hashtags: ['#PinturasMuse', '#EquipoHumano', '#TalentoCualificado', '#PinturaIndustrial', '#RecubrimientosIndustriales', '#EmpresaFamiliar', '#CulturaDeCalidad', '#IndustriaEspañola', '#ProfesionalesIndustriales', '#TeamWork'],
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

  console.log('\n✅ Listo. Recarga ContentFlow para ver los posts de PINTURAS MUSE.');
}

run();
