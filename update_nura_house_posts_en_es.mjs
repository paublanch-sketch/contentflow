import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'marta-bayona-mas';

// ─────────────────────────────────────────────────────────────────────────────
// ACTUALIZACIÓN — Posts #14 al #25 — NURA HOUSE
// Idioma: INGLÉS + ESPAÑOL (formato: inglés — separador — español)
// Temática: 100% Personal Shopper Inmobiliario
// ─────────────────────────────────────────────────────────────────────────────
const updates = [
  {
    post_number: 14,
    copy: `We don't work for the seller.
We work exclusively for you. No agency commissions. No conflicts of interest.
We analyze every opportunity with independence and expertise, so the decision is always yours — and the best one.
—
No trabajamos para el vendedor.
Trabajamos exclusivamente para ti. Sin comisiones de agencia. Sin conflictos de interés.
Analizamos cada oportunidad con independencia y criterio, para que la decisión sea siempre tuya — y la mejor.
↳ One vision. Your side.`,
    hashtags: ['personalshopperinmobiliario','independencia','comprarcasabarcelona','nurahouse','realestate','barcelona','assessoramentimmobiliari','comprarcasa','inversioimmobiliaria','barcelonarealestate'],
  },
  {
    post_number: 15,
    copy: `From first step to keys in hand.
A real estate process doesn't have to be stressful. It has to be clear.
—
Del primer paso a la llave en la mano.
Un proceso inmobiliario no tiene que ser estresante. Tiene que ser claro.

→ Step 1 — SEARCH: We define your criteria and find the right opportunities.
→ Step 2 — ANALYSIS: We evaluate the real potential of each property: location, condition, price, transformation.
→ Step 3 — PURCHASE: We accompany you through negotiations and the entire process until signing.
—
→ Paso 1 — BÚSQUEDA: Definimos tus criterios y localizamos las oportunidades adecuadas.
→ Paso 2 — ANÁLISIS: Evaluamos el potencial real de cada activo: ubicación, estado, precio, transformación.
→ Paso 3 — COMPRA: Te acompañamos en las negociaciones y todo el proceso hasta la firma.
↳ Save this for when you need it.`,
    hashtags: ['personalshopperinmobiliario','procesoinmobiliario','comprarcasabarcelona','nurahouse','barcelona','realestate','guiacomprar','inversioimmobiliaria','realestatebarcelona','comprarcasa'],
  },
  {
    post_number: 16,
    copy: `Who is this service for?
Whether you're looking for your first home or exploring investment opportunities, our guidance adapts to your goals.
We work with people who want to make real estate decisions with criteria — and without improvising.
Not for everyone. For those who value time and rigor.
—
¿Para quién es este servicio?
Tanto si buscas tu primera residencia como si exploras oportunidades de inversión, nuestro acompañamiento se adapta a tus objetivos.
Trabajamos con personas que quieren tomar decisiones inmobiliarias con criterio y sin improvisar.
No para todos. Para quienes valoran el tiempo y el rigor.
↳ Decide with criteria.`,
    hashtags: ['personalshopperinmobiliario','inversion inmobiliaria','comprarcasabarcelona','primeravivienda','realestatebarcelona','nurahouse','realestate','barcelona','habitatgebarcelona','propiedadinmobiliaria'],
  },
  {
    post_number: 17,
    copy: `Not everything that shines is a good buy.
Knowing how to read the real potential of a property is a skill.
Not intuition — it's experience and analysis.
At Nura House we evaluate every asset holistically: location, condition, market, transformation potential and long-term return.
Because what looks like a bargain can be a trap. And what seems expensive can be the opportunity.
—
No todo lo que brilla es una buena compra.
Saber leer el potencial real de un inmueble es una habilidad.
No es intuición — es experiencia y análisis.
En Nura House evaluamos cada activo de forma integral: ubicación, estado, mercado, potencial de transformación y retorno a largo plazo.
Porque lo que parece una ganga puede ser una trampa. Y lo que parece caro puede ser la oportunidad.
↳ Real insight. Real value.`,
    hashtags: ['personalshopperinmobiliario','potencialinmobiliario','comprarcasabarcelona','inversion','nurahouse','realestate','barcelona','valoracionsolicitud','realestatebarcelona','comprarconcriterio'],
  },
  {
    post_number: 18,
    copy: `The purchase is just the beginning.
At Nura House, the service doesn't end with the signing.
When needed, we also accompany the transformation and added value of the acquired property.
We rethink spaces to adapt them to new needs, improving functionality and aesthetic coherence.
One global vision — from origin to result.
—
La compra es solo el principio.
En Nura House el servicio no termina con la firma.
Si hace falta, acompañamos también la transformación y la puesta en valor del inmueble adquirido.
Repensamos espacios para adaptarlos a nuevas necesidades, mejorando funcionalidad y coherencia estética.
Una visión global, del origen al resultado.
↳ From purchase to home.`,
    hashtags: ['transformacioninmobiliaria','personalshopperinmobiliario','reformabarcelona','puestaenvalor','nurahouse','diseñodeinterior','barcelona','comprarireformar','realestate','realestatebarcelona'],
  },
  {
    post_number: 19,
    copy: `New ways of living.
Co-living and intergenerational models are not trends.
They are responses to a new way of understanding life in community.
At Nura House we develop and accompany projects linked to new housing formats, adapted to changing social contexts.
For those who want to live differently.
—
Nuevas formas de vivir.
El co-living y los modelos intergeneracionales no son tendencias.
Son respuestas a una nueva manera de entender la vida en comunidad.
En Nura House desarrollamos y acompañamos proyectos vinculados a nuevos formatos de vivienda, adaptados a contextos sociales cambiantes.
Para los que buscan vivir de otra manera.
↳ The future of living.`,
    hashtags: ['coliving','nuevoformatovivienda','colivingbarcelona','nurahouse','viviendainnovadora','barcelona','habitatgeintergeneracional','realestate','comunidad','personalshopperinmobiliario'],
  },
  {
    post_number: 20,
    copy: `Making decisions without uncertainty.
Buying a property should be a conscious and safe decision. Not a source of anxiety.
The Real Estate Personal Shopper exists to eliminate uncertainty: we analyze, accompany and advise so you can decide with peace of mind.
A service designed for important decisions.
—
Tomar decisiones sin incertidumbre.
Comprar un inmueble debería ser una decisión consciente y segura. No una fuente de ansiedad.
El Personal Shopper Inmobiliario existe para eliminar la incertidumbre: analizamos, acompañamos y asesoramos para que puedas decidir con tranquilidad.
Un servicio pensado para decisiones importantes.
↳ Clarity, not chaos.`,
    hashtags: ['personalshopperinmobiliario','tranquilidad','comprarcasabarcelona','nurahouse','realestate','barcelona','seguridad','decidirconcriterio','inversion','barcelonarealestate'],
  },
  {
    post_number: 21,
    copy: `Our expertise is your asset.
At Nura House we work from real experience in housing transformation and our own projects.
We don't advise from theory. We advise from those who have lived the process.
Listening, analyzing and accompanying with rigor, honesty and personal involvement.
—
Nuestro criterio es tu activo.
En Nura House trabajamos desde una experiencia real en transformación de viviendas y proyectos propios.
No asesoramos desde la teoría. Asesoramos desde quien ha vivido el proceso.
Escuchando, analizando y acompañando con rigor, honestidad e implicación personal.
↳ Experience you can trust.`,
    hashtags: ['personalshopperinmobiliario','honestidad','nurahouse','barcelona','realestate','experienciareal','criterioprofesional','comprarcasabarcelona','confianza','barcelonarealestate'],
  },
  {
    post_number: 22,
    copy: `Knowing the market makes the difference.
Not all neighborhoods behave the same. Not all assets have the same potential.
Knowing Barcelona's real estate market — its dynamics, cycles and opportunities — is the first step to making good decisions.
—
Conocer el mercado marca la diferencia.
No todos los barrios se comportan igual. No todos los activos tienen el mismo potencial.
Conocer el mercado inmobiliario de Barcelona — su dinámica, sus ciclos y sus oportunidades — es el primer paso para tomar buenas decisiones.
↳ Local knowledge. Global vision.`,
    hashtags: ['barcelonarealestate','mercadoinmobiliario','personalshopperinmobiliario','comprarcasabarcelona','nurahouse','barcelona','inversion','habitatgebarcelona','realestatebarcelona','oportunidad'],
  },
  {
    post_number: 23,
    copy: `Do you know how a Real Estate Personal Shopper works?
↳ Swipe slowly.

→ STEP 1 — FIRST CONVERSATION
We define your objectives, budget and the criteria that will guide the search.

→ STEP 2 — SEARCH & ANALYSIS
We identify opportunities, visit them and evaluate them objectively and independently.

→ STEP 3 — NEGOTIATION & CLOSING
We accompany you through the offer, negotiation, due diligence and the entire process until signing.
—
¿Sabes cómo funciona un Personal Shopper Inmobiliario?
↳ Léelo con calma.

→ PASO 1 — PRIMERA CONVERSACIÓN
Definimos tus objetivos, presupuesto y los criterios que guiarán la búsqueda.
→ PASO 2 — BÚSQUEDA Y ANÁLISIS
Identificamos oportunidades, las visitamos y las valoramos de forma objetiva e independiente.
→ PASO 3 — NEGOCIACIÓN Y CIERRE
Te acompañamos en la oferta, negociación, due diligence y todo el proceso hasta la firma.
↳ Save this. You'll need it.`,
    hashtags: ['personalshopperinmobiliario','comofunciona','comprarcasabarcelona','nurahouse','realestate','barcelona','guiacomprar','inversion','realestatebarcelona','pasoapaso'],
  },
  {
    post_number: 24,
    copy: `The first conversation is free.
If you're thinking about buying a property — to live, to invest, or to transform — let's talk.
The first conversation doesn't commit you to anything. Just to understanding if we can accompany you well.
📩 info@nurahouse.com
📱 +34 619 29 40 25
🌐 nurahouse.com
—
La primera conversación es gratuita.
Si estás pensando en comprar un inmueble — para vivir, para invertir, o para transformar — hablemos.
La primera conversación no te compromete a nada. Solo a entender si podemos acompañarte bien.
📩 info@nurahouse.com
📱 +34 619 29 40 25
🌐 nurahouse.com
↳ Start here.`,
    hashtags: ['personalshopperinmobiliario','nurahouse','barcelona','realestate','comprarcasabarcelona','inversion','personalshopperinmobiliario','habitatgebarcelona','hablemos','barcelonarealestate'],
  },
  {
    post_number: 25,
    copy: `Real estate personal shopping — done right.
We accompany people and projects through real estate processes, from search to transformation, with expertise and long-term vision.
—
Personal Shopper Inmobiliario — hecho bien.
Acompañamos personas y proyectos en procesos inmobiliarios, desde la búsqueda hasta la transformación, con criterio y visión a largo plazo.

→ Independent advice
→ Real market analysis
→ End-to-end accompaniment

→ Asesoramiento independiente
→ Análisis real del mercado
→ Acompañamiento de principio a fin
↳ This is Nura House.`,
    hashtags: ['personalshopperinmobiliario','nurahouse','barcelona','realestate','comprarcasabarcelona','inversion','independencia','criterio','barcelonarealestate','visionglobal'],
  },
];

async function run() {
  console.log('🔄 Actualizando posts #14–#25 de Nura House a inglés + español...\n');

  for (const u of updates) {
    const { error } = await supabase
      .from('posts')
      .update({ copy: u.copy, hashtags: u.hashtags })
      .eq('client_id', CLIENT_ID)
      .eq('post_number', u.post_number);

    if (error) console.error(`❌ Post #${u.post_number}:`, error.message);
    else        console.log(`✅ Post #${u.post_number} actualizado`);
  }

  console.log('\n✅ Todos los posts actualizados a inglés + español.');
  console.log('   → https://contentflow-4wos.vercel.app/p/marta-bayona-mas');
}

run();
