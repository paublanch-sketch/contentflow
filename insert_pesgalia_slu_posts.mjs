import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'pesgalia-slu';

// ─────────────────────────────────────────────────────────────────
// ESTILO VISUAL PESGALIA:
//   Fondo: azul marino oscuro #0B2A4A
//   Acento: amarillo/dorado #F5C518
//   Texto: blanco bold (fuente sans-serif)
//   Logo: PESGALIA esquina superior izquierda
//   Nombre especie/tema: grande bold en la parte inferior
//   Foto producto: centrada, bien iluminada sobre fondo marino
//   Formato Instagram: 1080×1080 px cuadrado
// ─────────────────────────────────────────────────────────────────

const posts = [
  {
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Merluza del Atlántico — especie estrella',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto de merluza entera fresca sobre hielo picado, brillante, plateada. Esquina superior izquierda: logo PESGALIA en blanco. Banda inferior (#0B2A4A con opacidad): texto bold blanco grande "Merluza" y debajo texto pequeño "Merluccius merluccius". Franja amarilla/dorada (#F5C518) fina horizontal sobre la banda inferior. Ancla ⚓ pequeña decorativa en blanco. Estética limpia, profesional, sector pesquero premium.',
    copy: `La merluza del Atlántico. La especie más valorada de nuestros caladeros. 🐟

En Pesgalia distribuimos merluza de máxima calidad, capturada por palangre y arrastre en aguas del Atlántico norte.

Tallas comerciales disponibles:
▪️ 0,5 – 1 kg/pieza
▪️ 1 – 2 kg/pieza
▪️ 2 – 3 kg/pieza

Entera, en cajas POLYSPAN de 5-6 kg con hielo.

🌊 Del océano a tu empresa. Con trazabilidad total y cadena de frío garantizada.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#Merluza', '#MerluzaGallega', '#PescadoFresco', '#DistribuciónPescado', '#CalidadGallega', '#Atlántico', '#Galicia', '#Vigo', '#PescaFresca'],
  },
  {
    post_number: 2,
    platform: 'IG',
    headline_visual: 'Pulpo gallego — producto icónico del litoral atlántico',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto de pulpo gallego fresco y brillante, tentáculos visibles, sobre hielo. Esquina superior izquierda: logo PESGALIA blanco. Banda inferior con texto bold blanco grande "Pulpo" y subtítulo "Octopus vulgaris" más pequeño. Franja acento amarillo (#F5C518) fina. Ancla ⚓ decorativa pequeña. Luz fría que resalta la textura del cefalópodo.',
    copy: `El pulpo gallego: uno de los productos más icónicos de nuestra costa. 🐙

Capturado en el litoral atlántico con nasas y arrastre, el pulpo de Galicia destaca por su textura firme y su sabor intenso.

Calibres disponibles:
▪️ 0,5 – 1 kg/pieza
▪️ 1 – 2 kg/pieza
▪️ 2 – 3 kg/pieza
▪️ +3 kg/pieza

Entero, en cajas POLYSPAN de 5-6 kg con hielo.

🐙 Origen controlado. Frescura garantizada. Desde Galicia hasta tu puerta.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#PulpoGallego', '#Pulpo', '#MariscoGalicia', '#PescadoFresco', '#GastronomíaGallega', '#CalidadDelMar', '#DistribuciónMarisco', '#Galicia', '#Atlántico'],
  },
  {
    post_number: 3,
    platform: 'IG',
    headline_visual: 'Sardina atlántica — temporada y frescura',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto de sardinas frescas alineadas sobre hielo picado, brillantes con reflejos azul-verdosos plateados. Logo PESGALIA blanco esquina superior izquierda. Banda inferior: texto bold blanco grande "Sardina", subtítulo "Sardina Pilchardus". Acento amarillo (#F5C518) fina franja horizontal. Ancla ⚓ decorativa. Imagen vibrante que transmite frescura marina.',
    copy: `La sardina atlántica: pequeña en tamaño, grande en valor. 🐟

Capturada con cerco en las costas atlánticas, la sardina es uno de los pescados más frescos y nutritivos del mar.

Calibres disponibles:
▪️ 12 a 16 piezas/kg
▪️ 16 a 20 piezas/kg
▪️ 20 a 24 piezas/kg

Entera, en cajas POLYSPAN de 5-6 kg con hielo.

💡 Rica en omega-3, proteínas y minerales esenciales.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#SardinaFresca', '#Sardina', '#PescadoFresco', '#CalidadGallega', '#PescaConCerco', '#Atlántico', '#SectorPesquero', '#DistribuciónPescado', '#Galicia'],
  },
  {
    post_number: 4,
    platform: 'IG',
    headline_visual: 'Pez espada — especie premium de aguas abiertas',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A) con textura marina sutil. Centro: foto imponente de pez espada entero sobre superficie de hielo, su característica mandíbula larga en primer plano, colores azul oscuro dorsal y vientre plateado. Logo PESGALIA blanco arriba izquierda. Banda inferior: texto bold blanco grande "Pez Espada", subtítulo "Xiphias Gladius". Franja acento amarillo (#F5C518). Ancla ⚓ decorativa. Estética premium y poderosa.',
    copy: `El rey del océano abierto. El pez espada. ⚔️🌊

Capturado mediante palangre de superficie en el Atlántico y el Mediterráneo, el pez espada es una especie de alto valor y demanda constante en el mercado europeo.

Tallas comerciales disponibles:
▪️ 12 a 16 piezas/kg
▪️ 16 a 20 piezas/kg
▪️ 20 a 24 piezas/kg

Entero. Cajas POLYSPAN de 5-6 kg con hielo.

🎯 Trazabilidad desde el anzuelo hasta el destino final.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#PezEspada', '#Espadón', '#PescadoFresco', '#PescaPremium', '#CalidadGallega', '#PalangreDeSuerficie', '#SectorPesquero', '#Atlántico', '#DistribuciónPescado'],
  },
  {
    post_number: 5,
    platform: 'IG',
    headline_visual: 'Rape — del fondo del mar a tu empresa',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto de rape fresco entero sobre hielo, su característica cabeza grande y aplanada bien visible, textura rugosa de la piel en detalle. Logo PESGALIA blanco arriba izquierda. Banda inferior: texto bold blanco grande "Rape", subtítulo "Lophius Budegassa". Franja acento amarillo (#F5C518). Ancla ⚓ decorativa. Iluminación fría que destaca la textura única de la especie.',
    copy: `El rape: apariencia única, sabor inconfundible. 🎣

Especie de fondo, capturada por arrastre en profundidades de 10 a 500 metros, el rape es uno de los pescados más apreciados del mercado europeo.

Disponible en:
▪️ Rape blanco: 1-2 · 2-4 · 4-6 · +6 kg/pieza
▪️ Rape negro: 0,5-0,7 · 0,7-1 · 1-1,5 · 1,5-3 · +3 kg/pieza
▪️ Colas: desde 1 hasta 4 kg/cola

Entero o en colas. Cajas POLYSPAN de 5-10 kg con hielo.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#Rape', '#PescadoFresco', '#CalidadGallega', '#SectorPesquero', '#PescaAtlántica', '#Arrastre', '#DistribuciónPescado', '#MariscoGalicia', '#FrescuraDelMar'],
  },
  {
    post_number: 6,
    platform: 'IG',
    headline_visual: 'Instalaciones en Vigo y Marín — en el corazón del puerto',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto panorámica del Puerto Pesquero de Vigo o Marín al amanecer/atardecer, barcos pesqueros atracados, lonja visible. Overlay azul marino semitransparente sobre la foto. Logo PESGALIA blanco arriba izquierda. Banda inferior: texto bold blanco grande "Vigo · Marín", subtítulo "En el corazón del Atlántico". Franja acento amarillo (#F5C518). Ancla ⚓ más grande, decorativa. Estética épica y marinera.',
    copy: `Desde los puertos más importantes del mundo. ⚓️

Nuestras instalaciones en Vigo y Marín nos permiten descargar directamente desde los barcos hasta nuestras cámaras frigoríficas, garantizando la máxima frescura desde el primer minuto.

🏭 Salas de manipulación con maquinaria de última generación
❄️ Cámaras de frío de alta capacidad
🚛 Logística hacia cualquier destino de Europa

Estar en el corazón de los puertos pesqueros no es una ventaja. Es nuestra forma de trabajar.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#PuertoDeVigo', '#PuertoMarín', '#CadenaDeFrío', '#LogísticaPesquera', '#PescadoFresco', '#Galicia', '#Atlántico', '#InstalacionesPesqueras', '#CalidadTotal'],
  },
  {
    post_number: 7,
    platform: 'IG',
    headline_visual: 'Distribución a Europa — del mar gallego al continente',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: mapa de Europa estilizado en tonos azul claro/blanco con punto de origen marcado en Galicia (Vigo/Marín) y líneas de distribución radiando hacia capitales europeas: Madrid, Lisboa, París, Berlín, Roma. Logo PESGALIA blanco arriba izquierda. Banda inferior: texto bold blanco grande "Distribución Europa", subtítulo "Desde Galicia, sin límites". Franja acento amarillo (#F5C518). Ancla ⚓ decorativa.',
    copy: `Del mar gallego a toda Europa. Sin escalas de calidad. 🗺️

Desde Vigo y Marín distribuimos pescado y marisco fresco a destinos de toda Europa, con cadena de frío garantizada en cada kilómetro.

🌍 España · Portugal · Francia · Alemania · Italia y más
❄️ Transporte refrigerado certificado
📋 Trazabilidad completa en cada lote
⏱️ Tiempos de entrega optimizados para máxima frescura

¿Tu empresa necesita un proveedor de confianza en el sector pesquero europeo?

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#DistribuciónEuropa', '#PescadoFresco', '#ExportaciónPescado', '#LogísticaPesquera', '#CadenaDeFrío', '#CalidadGallega', '#Galicia', '#SectorPesquero', '#PescaResponsable'],
  },
  {
    post_number: 8,
    platform: 'IG',
    headline_visual: 'Jurel — azul iridiscente del Atlántico',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto de jureles frescos sobre hielo, cuerpos iridiscentes con reflejos azul-verde-dorado y la característica línea lateral arqueada. Logo PESGALIA blanco arriba izquierda. Banda inferior: texto bold blanco grande "Jurel", subtítulo "Trachurus Trachurus". Franja acento amarillo (#F5C518). Ancla ⚓ decorativa. Foto vívida que destaca los reflejos metálicos del jurel.',
    copy: `El jurel: azul, iridiscente y de una frescura sin igual. 🐟✨

Capturado mediante arrastre y cerco en el Atlántico, el jurel es una especie de alta rentabilidad para el sector alimentario.

Calibre disponible:
▪️ De 20 a 22 piezas/kg

Entero, en cajas POLYSPAN de 5-6-7 kg con hielo.

🌊 Origen atlántico garantizado y cadena de frío en todo el trayecto.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#Jurel', '#PescadoFresco', '#CalidadAtlántica', '#SectorPesquero', '#PescaConCerco', '#DistribuciónPescado', '#GaliciaFrescura', '#Galicia', '#ProductoDelMar'],
  },
  {
    post_number: 9,
    platform: 'IG',
    headline_visual: 'El curricán — movimiento y selectividad en alta mar',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto de embarcación pesquera gallega en plena faena de curricán en mar abierto, líneas tensas en el agua, espuma en la estela, horizonte atlántico al fondo. Overlay azul marino semitransparente. Logo PESGALIA blanco arriba izquierda. Banda inferior: texto bold blanco grande "Curricán", subtítulo "Técnica de pesca selectiva". Franja acento amarillo (#F5C518). Ancla ⚓ decorativa. Imagen dinámica y marina.',
    copy: `El curricán: una danza entre el barco y el mar. 🎣🌊

Esta técnica consiste en arrastrar cebos o señuelos mientras la embarcación navega, tentando a especies pelágicas de alto valor.

Tres modalidades:
▪️ Curricán de superficie — aguas altas, especies costeras
▪️ Curricán de medio fondo — profundidades intermedias
▪️ Curricán de fondo — especies bentónicas de alto valor

Una pesca activa, selectiva y respetuosa con el entorno marino.

En Pesgalia trabajamos con los mejores caladeros atlánticos regulados para garantizarte siempre el mejor producto.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#Curricán', '#MétodosDePesca', '#PescaSelectiva', '#PescaResponsable', '#Atlántico', '#CalidadGallega', '#SectorPesquero', '#FrescuraDelMar', '#Galicia'],
  },
  {
    post_number: 10,
    platform: 'IG',
    headline_visual: 'Proceso de manipulación — del barco a tu empresa',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Centro: foto interior de nave de manipulación de pescado: trabajadores con EPIs blancos y guantes, cajas POLYSPAN con hielo, ambiente limpio y refrigerado, iluminación fría. Overlay azul marino sutil. Logo PESGALIA blanco arriba izquierda. Banda inferior: texto bold blanco grande "Proceso & Calidad", subtítulo "Del barco a tu empresa". Franja acento amarillo (#F5C518). Ancla ⚓ decorativa.',
    copy: `Más allá de la pesca: el proceso que garantiza tu calidad. 🏭

En Pesgalia el producto pasa por un control riguroso antes de llegar a tu empresa:

1️⃣ Recepción directa en muelle propio (Vigo y Marín)
2️⃣ Control de calidad y clasificación por talla y especie
3️⃣ Manipulación en sala refrigerada con personal especializado
4️⃣ Empaquetado en cajas POLYSPAN con hielo renovado
5️⃣ Etiquetado de trazabilidad por lote
6️⃣ Expedición en transporte refrigerado certificado

Cada paso, controlado. Cada lote, garantizado.

📩 gestion@pesgalia.com
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#ProcesoProductivo', '#ManipulaciónPescado', '#CadenaDeFrío', '#TrazabilidadGarantizada', '#PescadoFresco', '#CalidadTotal', '#SectorPesquero', '#Galicia', '#FrescuraGarantizada'],
  },
  {
    post_number: 11,
    platform: 'IG',
    headline_visual: 'Por qué Pesgalia — propuesta de valor B2B',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A). Diseño infográfico elegante: 6 iconos blancos en cuadrícula (barco ⚓, termómetro ❄️, mapa 🗺️, lupa 🔍, caja 📦, estrella ⭐) cada uno con una línea de texto blanco pequeño junto a él. Título central grande bold blanco "¿Por qué Pesgalia?". Logo PESGALIA arriba izquierda. Franja acento amarillo (#F5C518) en la parte superior como barra de color. Estética corporativa limpia y directa.',
    copy: `¿Por qué trabajar con Pesgalia? Aquí la respuesta. ⚓️

✅ Ubicación estratégica en los puertos de Vigo y Marín
✅ Descarga directa desde los barcos a nuestras instalaciones
✅ Cadena de frío ininterrumpida desde el mar hasta tu empresa
✅ Trazabilidad total: conoces el origen de cada lote
✅ Amplia gama de especies atlánticas disponibles todo el año
✅ Distribución a toda Europa con tiempos de entrega garantizados

Calidad no es una promesa. En Pesgalia, es nuestro estándar.

📩 gestion@pesgalia.com
☎️ 986 43 56 58
🌐 www.pesgalia.com`,
    hashtags: ['#Pesgalia', '#PorQuéElegirnos', '#PescadoFresco', '#CalidadGallega', '#SectorPesquero', '#DistribuciónPescado', '#TrazabilidadGarantizada', '#CadenaDeFrío', '#Galicia', '#MariscoyPescado'],
  },
  {
    post_number: 12,
    platform: 'IG',
    headline_visual: 'CTA contacto — distribuidores, restaurantes y empresas',
    visual_prompt: 'Instagram post 1080x1080px. Fondo azul marino oscuro (#0B2A4A) con textura muy sutil de escamas de pez o agua marina. Centro: logo PESGALIA grande en blanco, bien visible. Debajo del logo: línea de texto blanco "Pescados & Mariscos desde Galicia". Zona inferior con datos de contacto en blanco: correo, teléfonos, web. Barra acento amarillo (#F5C518) horizontal ancha en la parte superior. Ancla ⚓ grande decorativa esquina inferior derecha semitransparente. Post de cierre de campaña elegante.',
    copy: `¿Eres distribuidor, restaurante o empresa del sector alimentario? Hablemos. 🐟📞

En Pesgalia llevamos años conectando el mar gallego con negocios de toda Europa.

Si buscas un proveedor de pescado y marisco fresco con:
⚓️ Origen garantizado desde Galicia
❄️ Cadena de frío certificada
📋 Trazabilidad total en cada pedido
🚛 Distribución a toda Europa

...tienes el proveedor que necesitas.

📩 pesgalia@pesgalia.com
☎️ Administración: 986 43 56 58
☎️ Nave Marín: 986 89 20 00
🌐 www.pesgalia.com

📍 C/ Urzaiz 21 – Vigo | Av. de Orense s/n – Puerto de Marín`,
    hashtags: ['#Pesgalia', '#ContactaConNosotros', '#PescadoFresco', '#MariscoGalicia', '#DistribuciónPescado', '#CalidadGallega', '#SectorPesquero', '#Galicia', '#Vigo', '#PescaFresca'],
  },
];

// ─── INSERT ────────────────────────────────────────────────────────
async function run() {
  console.log(`\n🐟 Insertando ${posts.length} posts para cliente: ${CLIENT_ID}\n`);

  for (const post of posts) {
    const record = {
      id: `${CLIENT_ID}-${post.post_number}`,
      client_id: CLIENT_ID,
      post_number: post.post_number,
      platform: post.platform,
      headline_visual: post.headline_visual,
      visual_prompt: post.visual_prompt,
      copy: post.copy,
      hashtags: post.hashtags,
      status: 'review',
      feedback: '',
      image_url: '',
      webhook_sent_at: null,
    };

    const { error } = await supabase
      .from('posts')
      .upsert(record, { onConflict: 'id' });

    if (error) {
      console.error(`  ✗ Post ${post.post_number} — ERROR:`, error.message);
    } else {
      console.log(`  ✓ Post ${post.post_number}: ${post.headline_visual}`);
    }
  }

  console.log('\n✅ Listo. Revisa los posts en FlowAPP bajo el cliente: pesgalia-slu\n');
}

run();
