// insert_creati_rr_posts.mjs
// CREATI RR SL – ROTUWEAR (@rotuwear)
// Red Social: Instagram | Stage: Faltan post para J2
// Ropa laboral, merchandising, rótulos y vinilos. Personalización: serigrafía, DTF, bordado, vinilo.
// Run: node FlowAPP/insert_creati_rr_posts.mjs

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';
const CLIENT_ID = 'creati-rr-sl';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    post_number: 1,
    platform: 'IG',
    headline_visual: 'DESTACA TU MARCA — Slider presentación Rotuwear',
    visual_prompt: 'https://www.canva.com/d/kB-YtnmBcK9SxNk',
    copy: `¿Tu empresa todavía no tiene ropa con su logo? 😮

En Rotuwear lo cambiamos.

Somos especialistas en ropa personalizada y merchandising corporativo para empresas, equipos y eventos. Desde camisetas y sudaderas hasta tote bags, tazas y rótulos para tu local.

🎽 Ropa laboral y deportiva
🎁 Merchandising corporativo
🖨️ Serigrafía · DTF · Bordado · Vinilo
📍 rotuwear.com

¡Destaca tu marca y dile al mundo quién eres!`,
    hashtags: ['#Rotuwear', '#RopaPersonalizada', '#MerchandisingEmpresarial', '#RopaLaboral', '#PersonalizacionTextil', '#BrandingEmpresa'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-2`,
    post_number: 2,
    platform: 'IG',
    headline_visual: '¿TIENES LA IDEA? NOSOTROS LA HACEMOS REALIDAD',
    visual_prompt: 'https://www.canva.com/d/VUAgtqXWoeNrlw8',
    copy: `¿Tienes la idea? Nosotros la hacemos realidad. 💡

Da igual si buscas camisetas para tu equipo, uniformes para tu restaurante, vinilos para tu furgoneta o regalos para tus clientes.

En Rotuwear convertimos tu logo y tu visión en productos que hablan por ti.

¿Cómo? Con 4 técnicas de personalización:

✅ Serigrafía
✅ DTF (Direct to Film)
✅ Bordado
✅ Vinilo de corte

Escríbenos y te hacemos presupuesto sin compromiso. 📩`,
    hashtags: ['#Rotuwear', '#PersonalizacionTextil', '#Serigrafia', '#Bordado', '#DTF', '#RopaPersonalizada'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-3`,
    post_number: 3,
    platform: 'IG',
    headline_visual: 'ROPA LABORAL A TU MEDIDA',
    visual_prompt: 'https://www.canva.com/d/IPBK0k28cluSyYo',
    copy: `Tu equipo merece una imagen profesional. 👔

La ropa laboral personalizada no es solo uniforme. Es identidad de marca en movimiento.

En Rotuwear tenemos todo lo que necesitas:

🔶 Camisas y camisetas de trabajo
🔶 Monos y pantalones de trabajo
🔶 Ropa de alta visibilidad
🔶 Chaquetas y softshell
🔶 Uniformes para hostelería

Todo con tu logo, en los colores de tu empresa, con la técnica que mejor se adapte al tejido.

📦 Pedidos desde 1 unidad · Entrega en 3-4 días
📩 Pide tu presupuesto en rotuwear.com`,
    hashtags: ['#RopaLaboral', '#Rotuwear', '#UniformesEmpresa', '#RopaPersonalizada', '#ImagenCorporativa', '#RopaTrabajo'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-4`,
    post_number: 4,
    platform: 'IG',
    headline_visual: 'DALE VIDA A TU NEGOCIO — Merchandising corporativo',
    visual_prompt: 'https://www.canva.com/d/UoKAspiijx6r1rs',
    copy: `El merchandising es la forma más visual de hacer publicidad. 🎁

Un tote bag con tu logo. Una taza en el escritorio de tu cliente. Una libreta en cada reunión. Pequeños detalles que dejan huella.

En Rotuwear tenemos cientos de productos personalizables:

🛍️ Tote bags · Mochilas · Bolsos
☕ Tazas · Botellas · Termos
📓 Cuadernos · Bolígrafos · Sets
🧢 Gorras · Calcetines · Accesorios

Perfectos para eventos, lanzamientos, regalos de empresa o ferias. Al mejor precio del mercado. 💰

¡Pide tu presupuesto sin compromiso!`,
    hashtags: ['#MerchandisingEmpresarial', '#Rotuwear', '#RegalosEmpresa', '#BrandingCorporativo', '#MarketingPromocional', '#MerchandisingPersonalizado'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-5`,
    post_number: 5,
    platform: 'IG',
    headline_visual: 'VISTE A TU EQUIPO — Ropa deportiva personalizada',
    visual_prompt: 'https://www.canva.com/d/484LOSRaQ4bDH0D',
    copy: `¿Tu equipo compite este fin de semana? ⚽🏀🎽

Que lo haga con estilo y con identidad propia.

En Rotuwear diseñamos equipaciones deportivas personalizadas para cualquier deporte y cualquier tamaño de grupo:

✔️ Camisetas técnicas transpirables
✔️ Chándales y pantalones deportivos
✔️ Chaquetas y cortavientos
✔️ Mallas y accesorios deportivos

Con tu escudo, tus colores y el nombre de cada jugador si lo quieres.

Desde grupos pequeños hasta equipos completos. 🏆

Entra en rotuwear.com y elige tu equipación.`,
    hashtags: ['#RopaDeportiva', '#Rotuwear', '#EquipacionesPersonalizadas', '#TeamWear', '#RopaEquipo', '#PersonalizacionDeportiva'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-6`,
    post_number: 6,
    platform: 'IG',
    headline_visual: 'DESCUBRE NUESTRA TIENDA ONLINE',
    visual_prompt: 'https://www.canva.com/d/ISabLZXu2dXmDLu',
    copy: `¿Sabías que puedes personalizar tu ropa y merchandising directamente desde casa? 🖥️

Nuestra tienda online está disponible 24/7 para que explores, elijas y personalices sin esperas.

En rotuwear.com encontrarás:

👕 Camisetas, polos y sudaderas
🧥 Abrigos, chaquetas y softshell
👔 Ropa laboral y de hostelería
🎁 Merchandising corporativo
🖼️ Rótulos y vinilos

Todo personalizable con tu logo mediante serigrafía, DTF, bordado o vinilo.

Haz tu pedido online y recíbelo en 3-4 días. 📦

👉 rotuwear.com`,
    hashtags: ['#TiendaOnline', '#Rotuwear', '#RopaPersonalizada', '#ComprarOnline', '#MerchandisingOnline', '#PersonalizacionTextil'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-7`,
    post_number: 7,
    platform: 'IG',
    headline_visual: 'RÓTULOS Y VINILOS — Tu marca visible en todas partes',
    visual_prompt: 'https://www.canva.com/d/YQO3L8eS44vHTgL',
    copy: `Tu logo merece estar en todas partes. 🚐🏪

No solo en la ropa. También en tu furgoneta, tu escaparate, tu local o tu stand en ferias.

En Rotuwear hacemos rótulos y vinilos personalizados que convierten cualquier superficie en publicidad para tu negocio:

🚗 Rotulación de vehículos
🏬 Vinilos para escaparates y cristales
📌 Rótulos de local y señalética
🎪 Diseño para stands y ferias
🖨️ Impresión de gran formato

Lleva tu marca más lejos. Literalmente. 😎

📩 Pídenos presupuesto sin compromiso.`,
    hashtags: ['#RotulosYVinilos', '#Rotuwear', '#Rotulacion', '#ViniloPorsonalizado', '#BrandingVisual', '#PublicidadExterior'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-8`,
    post_number: 8,
    platform: 'IG',
    headline_visual: 'TECNOLOGÍA PARA TU EMPRESA — 4 técnicas de personalización',
    visual_prompt: 'https://www.canva.com/d/lN-Jq4AmjmgOHDM',
    copy: `No todos los logos son iguales. No todas las prendas son iguales. Por eso usamos la técnica adecuada para cada caso. 🎯

En Rotuwear trabajamos con 4 métodos de personalización profesional:

🖨️ SERIGRAFÍA — Ideal para grandes cantidades. Colores sólidos y durables.

🎨 DTF (Direct to Film) — Perfecta para diseños complejos y multicolor sin mínimos.

🪡 BORDADO — Acabado premium para polos, gorras y ropa laboral de alta gama.

✂️ VINILO DE CORTE — Para texto y logos simples con acabado impecable.

¿No sabes cuál es la mejor para ti? Consúltanos y te asesoramos sin compromiso. 📩`,
    hashtags: ['#Rotuwear', '#Serigrafia', '#DTF', '#Bordado', '#ViniloPorsonalizado', '#PersonalizacionTextil'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-9`,
    post_number: 9,
    platform: 'IG',
    headline_visual: 'EN 3-4 DÍAS EN TUS MANOS — Merchandising urgente',
    visual_prompt: 'https://www.canva.com/d/mlJwsRoxYADm4ui',
    copy: `¿Necesitas merchandising para un evento la próxima semana? ⏱️

No hay problema. En Rotuwear somos especialistas en pedidos urgentes.

Entregamos productos personalizados con tu logo en solo 3-4 días, al mejor precio del mercado.

Ideal para:

🎪 Ferias y eventos corporativos
🚀 Lanzamientos de producto
🏆 Premios y reconocimientos de equipo
🎁 Regalos de empresa de última hora
👕 Uniformes para nueva temporada

Desde camisetas y tote bags hasta botellas y cuadernos. Todo listo cuando lo necesitas.

📦 Haz tu pedido en rotuwear.com`,
    hashtags: ['#MerchandisingUrgente', '#Rotuwear', '#EntregaRapida', '#MerchandisingEmpresarial', '#RopaPersonalizada', '#EventosCorporativos'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-10`,
    post_number: 10,
    platform: 'IG',
    headline_visual: 'ROPA PARA HOSTELERÍA — Uniformes con identidad',
    visual_prompt: 'https://www.canva.com/d/hilCvUAQbm1WRP9',
    copy: `La primera impresión en hostelería lo es todo. 🍽️

Un equipo bien uniformado transmite profesionalidad, higiene y coherencia de marca desde el primer momento.

En Rotuwear vestimos a restaurantes, cafeterías, hoteles y catering con uniformes personalizados:

👨‍🍳 Chaquetas de cocina y delantales
🧑‍💼 Camisas y polos para sala
👕 Camisetas técnicas para el equipo
🧢 Gorras con logo del restaurante

Todo con tu logo bordado o en serigrafía, en los colores de tu marca.

Da a tu equipo la imagen que se merece. 💪

📩 Solicita tu presupuesto en rotuwear.com`,
    hashtags: ['#RopaHosteleria', '#Rotuwear', '#UniformesRestaurante', '#ImagenCorporativa', '#RopaLaboral', '#HotelerosMallorca'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-11`,
    post_number: 11,
    platform: 'IG',
    headline_visual: 'ALTA VISIBILIDAD — Seguridad con tu imagen de marca',
    visual_prompt: 'https://www.canva.com/d/fKM3KRhly4TNzKG',
    copy: `Seguridad y marca. Las dos van juntas. 🦺

Si tu equipo trabaja en obras, almacenes, logística o al aire libre, la ropa de alta visibilidad es obligatoria. Pero eso no significa que no pueda llevar tu logo.

En Rotuwear personalizamos ropa de alta visibilidad homologada:

🟡 Chalecos reflectantes con tu logo
🟠 Camisetas técnicas de alta visibilidad
🔶 Pantalones y monos de trabajo
🦺 Chaquetas y cortavientos reflectantes

Tu equipo bien protegido y con la imagen de tu empresa. Seguridad con identidad. 💼

📩 Pide tu presupuesto sin compromiso en rotuwear.com`,
    hashtags: ['#AltaVisibilidad', '#Rotuwear', '#RopaSeguridad', '#RopaLaboral', '#EquipamientoLaboral', '#RopaPersonalizada'],
    status: 'review',
  },
  {
    id: `${CLIENT_ID}-12`,
    post_number: 12,
    platform: 'IG',
    headline_visual: 'DILE AL MUNDO QUIÉN ERES — CTA final Rotuwear',
    visual_prompt: 'https://www.canva.com/d/exT9QBH01F9bYNL',
    copy: `Dile al mundo quién eres y qué representas. 🌍

Tu marca merece estar en todas partes: en la ropa de tu equipo, en tus productos promocionales, en tu escaparate, en tus vehículos.

En Rotuwear lo hacemos posible:

🎽 Ropa laboral y deportiva personalizada
🎁 Merchandising corporativo
🖼️ Rótulos y vinilos para tu negocio
🖨️ Serigrafía · DTF · Bordado · Vinilo

Entrega en 3-4 días. Al mejor precio del mercado. Desde 1 unidad.

No esperes más para darle a tu empresa la imagen que se merece. 💪

👉 rotuwear.com
📩 Escríbenos sin compromiso`,
    hashtags: ['#Rotuwear', '#RopaPersonalizada', '#MerchandisingEmpresarial', '#BrandingCorporativo', '#DileAlMundoQuienEres', '#PersonalizacionTextil'],
    status: 'review',
  },
];

async function insertPosts() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID} (ROTUWEAR)...`);

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

  console.log('\n✅ Todos los posts insertados para CREATI RR SL (ROTUWEAR)');
}

insertPosts().catch(console.error);
