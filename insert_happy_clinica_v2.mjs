import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'happy-clinica';

// 1. Borrar posts anteriores
const { error: delError } = await supabase
  .from('posts')
  .delete()
  .eq('client_id', CLIENT_ID);

if (delError) {
  console.error('Error borrando posts anteriores:', delError.message);
  process.exit(1);
}
console.log('✅ Posts anteriores eliminados');

// 2. Insertar los 12 nuevos
const posts = [
  {
    id: `${CLIENT_ID}-1`,
    client_id: CLIENT_ID,
    post_number: 1,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Imagen holística respiración — ilustración nariz vs boca, fondo blanco, acentos verde salvia y crema · INCLUYE DATOS CONTACTO',
    visual_prompt: 'Canva: https://www.canva.com/d/dcq3V3YgcVBEUzN — Post ¿Respiras por la boca?',
    copy: `¿Respiras por la boca sin darte cuenta? 👄💨

La respiración bucal parece algo menor, pero tiene un impacto enorme en tu salud bucodental y sistémica.

Cuando respiramos por la boca de forma crónica:
✔ La boca se reseca y hay menos saliva protectora
✔ Aumenta el riesgo de caries y enfermedad periodontal
✔ Los maxilares se desarrollan de forma diferente
✔ Puede afectar al sueño y la calidad del descanso
✔ Altera la postura corporal y la posición de la lengua
✔ Interfiere en el desarrollo facial en niños

La respiración ideal es nasal. La nariz filtra, humidifica y calienta el aire antes de llegar a los pulmones.

En HappyClínica trabajamos la respiración desde un enfoque integrativo:
👉 Evaluamos tu patrón respiratorio
👉 Trabajamos la posición lingual
👉 Colaboramos con fisioterapeutas y osteópatas cuando es necesario

¿Respiras bien? ¿Lo has valorado alguna vez?

📍 Carrer del Rosselló, 255, 2º 1ª, Eixample, Barcelona
📲 665 648 693 · info@happyclinica.com`,
    hashtags: ['happyclínica','respiracionnasal','respiracionbucal','odontologiaintegrativa','odontologiaholistica','saludbucal','dentistabarcelona','posturacorporal','saludintegral','odontologiamasalladelosdientes'],
  },
  {
    id: `${CLIENT_ID}-2`,
    client_id: CLIENT_ID,
    post_number: 2,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Materiales biocompatibles — materiales naturales sobre fondo crema, tipografía bold · INCLUYE DATOS CONTACTO',
    visual_prompt: 'Canva: https://www.canva.com/d/RuCwaiVVVdqoSVK — Post Materiales biocompatibles',
    copy: `¿Sabes qué materiales lleva tu boca? 🦷✨

En HappyClínica, elegir los materiales con los que trabajamos no es algo secundario. Es parte de nuestra filosofía de cuidar tu salud desde adentro hacia afuera.

Los materiales biocompatibles son aquellos que el cuerpo tolera sin generar respuesta inflamatoria, alérgica ni tóxica.

¿Por qué importa tanto?
✔ Tu boca está en contacto directo con el sistema digestivo y respiratorio
✔ Algunos materiales convencionales contienen metales pesados como el mercurio
✔ Las resinas y cerámicas de alta calidad respetan mejor los tejidos
✔ Para personas con sensibilidades químicas o enfermedades autoinmunes, es especialmente importante

En nuestra clínica utilizamos:
👉 Resinas compuestas libres de BPA
👉 Cerámica libre de metales para coronas y carillas
👉 Protocolo de retirada segura de amalgamas (SMART)
👉 Anestésicos locales adaptados a cada persona

Porque tratar tu boca también es tratar tu cuerpo entero.

¿Tienes dudas sobre los materiales que llevas? Escríbenos 📲

📍 Carrer del Rosselló, 255, 2º 1ª, Eixample, Barcelona
📲 665 648 693 · info@happyclinica.com`,
    hashtags: ['happyclínica','materialesbiocompatibles','odontologiaholistica','odontologiaintegrativa','sinmercurio','amalgamasegura','saludbucal','dentistabarcelona','saludintegral','odontologiabiologica'],
  },
  {
    id: `${CLIENT_ID}-3`,
    client_id: CLIENT_ID,
    post_number: 3,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Bruxismo — ilustración mandíbula con tensión, tonos neutros · SIN datos de contacto en imagen',
    visual_prompt: 'Canva: https://www.canva.com/d/W7DBtyC4pR3nPQq — Post Bruxismo',
    copy: `¿Despiertas con la mandíbula tensa o los dientes desgastados? 😬

Puede que seas bruxista sin saberlo.

El bruxismo es el apretamiento o rechinamiento involuntario de los dientes, habitualmente durante el sueño. Y es mucho más que "un tic": es una señal que tu cuerpo envía.

Señales de alerta:
✔ Dolor de cabeza o mandíbula al despertar
✔ Desgaste visible en el esmalte
✔ Sensibilidad dental aumentada
✔ Tensión cervical y de hombros
✔ Ruidos articulares al abrir la boca

¿Y la causa? En odontología integrativa sabemos que el bruxismo no tiene una sola raíz:
👉 Estrés y ansiedad acumulados
👉 Maloclusión dental
👉 Tensión postural
👉 Conflictos emocionales no resueltos

En HappyClínica abordamos el bruxismo de forma global:
• Férula de descarga personalizada
• Estudio oclusal completo
• Acompañamiento emocional si lo necesitas

Tu mandíbula habla. ¿La estás escuchando?`,
    hashtags: ['happyclínica','bruxismo','bruxismobarcelona','odontologiaintegrativa','odontologiaholistica','saludbucal','mandibula','estres','saludintegral','dentistabarcelona'],
  },
  {
    id: `${CLIENT_ID}-4`,
    client_id: CLIENT_ID,
    post_number: 4,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Tu boca y tu postura — silueta corporal con conexión mandíbula-columna · SIN datos de contacto en imagen',
    visual_prompt: 'Canva: https://www.canva.com/d/obAbd5HuCoxdWYG — Post Tu boca y tu postura',
    copy: `¿Y si el dolor de espalda tiene algo que ver con tu boca? 🦷💆‍♀️

8 de cada 10 personas sufre dolor de espalda en algún momento de su vida. Pero muy pocas lo relacionan con su salud bucodental.

La relación entre la boca y la postura corporal es bidireccional:
👉 Una maloclusión puede generar tensiones musculares en cadena desde la mandíbula hasta la pelvis
👉 La posición de la lengua influye en la postura de la columna vertebral
👉 El bruxismo crea sobrecargas que se distribuyen por todo el cuerpo
👉 Una mordida asimétrica puede provocar compensaciones posturales crónicas

El sistema estomatognático forma parte de una red corporal interconectada.

Por eso en HappyClínica trabajamos en equipo con fisioterapeutas, osteópatas y especialistas en postura cuando el caso lo requiere.

Porque a veces la solución al dolor de espalda empieza en la boca.

¿Te han valorado la relación entre tu mordida y tu postura?`,
    hashtags: ['happyclínica','posturacorporal','odontologiaintegrativa','dolorespalda','odontologiaholistica','mandibula','saludintegral','dentistabarcelona','odontologiamasalladelosdientes','sistemaestomatognatico'],
  },
  {
    id: `${CLIENT_ID}-5`,
    client_id: CLIENT_ID,
    post_number: 5,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Alimentos para tus dientes — composición colorida de frutas, verduras y frutos secos · INCLUYE DATOS CONTACTO',
    visual_prompt: 'Canva: https://www.canva.com/d/MRpcLDRDh1FLfCr — Post ¿Comes para tus dientes?',
    copy: `La alimentación que cuida tu sonrisa 🥦🦷

¿Sabías que lo que comes cada día influye directamente en la salud de tus dientes y encías?

Más allá del azúcar —que ya sabemos que es el gran enemigo— hay alimentos que protegen tu boca y otros que la debilitan sin que lo sepas.

✅ Aliados de tu sonrisa:
• Lácteos fermentados, brócoli y almendras → calcio para el esmalte
• Huevos y pescado azul → vitamina D
• Frutas y verduras crudas → activan la saliva y limpian mecánicamente
• Agua → la mejor bebida para neutralizar los ácidos

❌ Lo que debilita el esmalte:
• Azúcar y carbohidratos refinados
• Bebidas ácidas: refrescos, zumos, vinagreta
• Picoteo constante entre horas
• Alcohol y tabaco

💡 Consejo HappyClínica: el orden y la frecuencia importan tanto como lo que comes. Cada vez que comes, la boca entra en período ácido unos 30-40 minutos. Mejor 3 comidas que picar constantemente.

📍 Carrer del Rosselló, 255, 2º 1ª, Eixample, Barcelona
📲 665 648 693 · info@happyclinica.com`,
    hashtags: ['happyclínica','alimentacionsaludable','saludbucal','odontologiaintegrativa','odontologiaholistica','nutricion','esmalte','dentistabarcelona','saludintegral','higienebucal'],
  },
  {
    id: `${CLIENT_ID}-6`,
    client_id: CLIENT_ID,
    post_number: 6,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Invisalign ortodoncia invisible — alineadores transparentes sobre fondo claro · INCLUYE DATOS CONTACTO',
    visual_prompt: 'Canva: https://www.canva.com/d/anp1tT6rUQwymVZ — Post Invisalign ortodoncia invisible',
    copy: `¿Ortodoncia sin que nadie se entere? Eso existe 😉✨

Los alineadores de Invisalign son una revolución en la manera de corregir la posición dental: transparentes, removibles y adaptados exactamente a tu anatomía.

¿Cómo funciona?
✔ Escáner digital: tomamos la forma exacta de tu dentadura sin impresiones incómodas
✔ Planificación digital paso a paso del movimiento de cada diente
✔ Recibes una serie de alineadores que cambias progresivamente
✔ Revisiones periódicas para asegurar que el tratamiento avanza bien

Ventajas que lo hacen especial:
👉 Estética: prácticamente invisibles
👉 Comodidad: sin brackets ni alambres
👉 Higiene: se quitan para comer y cepillarse
👉 Predictibilidad: sabes cómo quedará tu sonrisa antes de empezar

En HappyClínica planificamos y reajustamos el tratamiento de forma dinámica, adaptándonos siempre a tus necesidades reales.

¿Tienes dudas sobre si Invisalign es para ti? Escríbenos 📲

📍 Carrer del Rosselló, 255, 2º 1ª, Eixample, Barcelona
📲 665 648 693 · info@happyclinica.com`,
    hashtags: ['happyclínica','invisalign','ortodonciainvisible','happyortodoncia','ortodonciabarcelona','alineadores','sonrisa','odontologiaintegrativa','dentistabarcelona','transformacionsonrisa'],
  },
  {
    id: `${CLIENT_ID}-7`,
    client_id: CLIENT_ID,
    post_number: 7,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Salud bucal infantil — ilustración niño sonriente, colores cálidos suaves · INCLUYE DATOS CONTACTO',
    visual_prompt: 'Canva: https://www.canva.com/d/UU4lduGqDFqchta — Post Salud bucal infantil',
    copy: `La salud bucal empieza mucho antes de que salga el primer diente 🍼🦷

Muchos papás y mamás nos preguntan: ¿cuándo debo llevar a mi hijo al dentista por primera vez?

La respuesta es: antes de los 2 años, o cuando erupcione el primer diente de leche.

Y es que los dientes de leche importan muchísimo:
✔ Reservan el espacio para los dientes definitivos
✔ Son esenciales para aprender a hablar correctamente
✔ Influyen en el desarrollo óseo facial
✔ Una caries en un diente de leche puede afectar al diente definitivo que hay debajo

En HappyClínica trabajamos la odontopediatría desde un enfoque tranquilo, sin prisas y adaptado a cada niño:
👉 Revisiones preventivas desde pequeños
👉 Valoración de la respiración y posición lingual
👉 Ortopedia funcional si se detecta a tiempo
👉 Crear un vínculo positivo con el dentista desde el principio

Regalar a tus hijos una buena salud bucal es un regalo para toda la vida. 💚

📍 Carrer del Rosselló, 255, 2º 1ª, Eixample, Barcelona
📲 665 648 693 · info@happyclinica.com`,
    hashtags: ['happyclínica','odontopediatría','odontopediatrabarcelona','saludbucalinfantil','dientesdeleche','odontologiaintegrativa','saludinfantil','dentistabarcelona','prevención','familias'],
  },
  {
    id: `${CLIENT_ID}-8`,
    client_id: CLIENT_ID,
    post_number: 8,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Miedo al dentista / SLOW — ambiente cálido y relajado, plantas, luz suave',
    visual_prompt: 'Canva: https://www.canva.com/d/-q4gxBXpT9T3PrP — Post Miedo al dentista / Odontología SLOW',
    copy: `¿Tienes miedo al dentista? No estás solo/a. 🌿

El miedo o la ansiedad dental afecta a una de cada tres personas. Muchas evitan ir años por esa razón, y eso tiene consecuencias reales en su salud bucal.

En HappyClínica practicamos la odontología SLOW, porque creemos que el ritmo importa tanto como la técnica.

¿Qué significa SLOW en nuestra clínica?
✔ Citas de tiempo suficiente. Sin prisas, sin sensación de cinta transportadora
✔ Escucha real. Antes de tocar nada, hablamos y entendemos tu historia
✔ Ambiente cálido y relajado. Nada de clínica fría y aséptica
✔ Técnicas de anestesia mínimamente molestas
✔ Adaptamos el ritmo a ti. Si necesitas pausas, las hacemos
✔ Sin juicios. Aquí no se culpa al paciente de nada

Creemos que cuando reduces el estrés en la consulta, el tratamiento es mejor y el vínculo más profundo.

¿Llevas tiempo sin ir al dentista por miedo? Da el paso. Aquí te recibimos como mereces. 💚`,
    hashtags: ['happyclínica','miedoaldentista','odontologiaslow','ansiedaddental','odontologiaintegrativa','odontologiaholistica','dentistabarcelona','saludbucal','bienestardental','odontologiamasalladelosdientes'],
  },
  {
    id: `${CLIENT_ID}-9`,
    client_id: CLIENT_ID,
    post_number: 9,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Microbiota oral — ilustración bacterias amigables, colores verdes y tierra · INCLUYE DATOS CONTACTO',
    visual_prompt: 'Canva: https://www.canva.com/d/NUNL4RVFr6lfq6o — Post Microbiota oral',
    copy: `Tu boca tiene más de 700 especies de microorganismos. ¿Los cuidas? 🦠🌱

La microbiota oral es el conjunto de bacterias, hongos y microorganismos que viven en equilibrio en tu boca. Y cuando ese equilibrio se rompe, aparecen los problemas.

¿Qué altera la microbiota oral?
✔ Antibióticos y enjuagues con clorhexidina de uso prolongado
✔ Alimentación rica en azúcar y ultraprocesados
✔ Estrés crónico
✔ Respiración bucal
✔ Tabaco y alcohol

¿Qué ocurre cuando se desequilibra?
👉 Proliferan bacterias patógenas → caries y periodontitis
👉 Se altera la digestión (el 30% de la digestión empieza en la boca)
👉 Puede afectar al sistema inmune

¿Cómo cuidar tu microbiota?
• Evita enjuagues antisépticos agresivos de uso diario
• Come alimentos fermentados (probióticos naturales)
• Limpia la lengua con rascador de cobre
• Hidratación abundante
• Reduce el azúcar

En HappyClínica valoramos tu microbiota oral como parte de tu salud integral. 📲

📍 Carrer del Rosselló, 255, 2º 1ª, Eixample, Barcelona
📲 665 648 693 · info@happyclinica.com`,
    hashtags: ['happyclínica','microbiotaoral','odontologiaintegrativa','odontologiaholistica','saludbucal','microbiota','saludintegral','dentistabarcelona','equilibriobucal','bienestar'],
  },
  {
    id: `${CLIENT_ID}-10`,
    client_id: CLIENT_ID,
    post_number: 10,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'Happyconsell higiene bucal — infografía limpia con iconos, fondo claro verde salvia',
    visual_prompt: 'Canva: https://www.canva.com/d/iDb5hN34D56Drrm — Post #happyconsell higiene bucal',
    copy: `#happyconsell 🦷✨ Tu rutina de higiene bucal, al detalle.

🪥 EL CEPILLO
✔ Cerdas suaves o ultrasuaves — no fuerces el esmalte ni las encías
✔ Cámbialo cada 2-3 meses o antes si las cerdas se abren
✔ Eléctrico u oscilante: más eficaces para la mayoría

⏱ TIEMPO Y TÉCNICA
✔ Mínimo 2 minutos, 2 veces al día (mañana y noche)
✔ Movimientos circulares suaves, no horizontales de fuerza
✔ No olvides la línea de la encía y la cara interna

🧵 EL HILO DENTAL
✔ Úsalo cada día, preferiblemente antes de dormir
✔ O sustitúyelo por cepillos interdentales si los espacios son amplios

👅 LA LENGUA
✔ Límpiala diariamente con un rascador de cobre
✔ El 80% del mal aliento viene de la lengua

💧 LOS ENJUAGUES
✔ Evita los de clorhexidina para uso diario
✔ Prefiere base natural o sin alcohol

¿Tienes dudas sobre tu rutina? Cuéntanosla en comentarios 👇`,
    hashtags: ['happyclínica','happyconsell','higienebucal','cepilladodental','saludbucal','odontologiaintegrativa','dentistabarcelona','consejossalud','rutinabucal','odontologiaholistica'],
  },
  {
    id: `${CLIENT_ID}-11`,
    client_id: CLIENT_ID,
    post_number: 11,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'La caries tiene GPS — diagrama de dientes con conexión emocional, estilo ilustración',
    visual_prompt: 'Canva: https://www.canva.com/d/bGU33us60b746XF — Post ¿La caries tiene GPS?',
    copy: `¿Sino, qué sentido tiene que la caries aparezca siempre en el mismo diente? 🤔💭

Las caries son una patología multifactorial: el ácido de las bacterias destruye el esmalte. Eso lo sabemos.

Pero en odontología integrativa y desde la biodescodificación, la caries también puede ser una señal emocional.

La biodescodificación, desarrollada por Christian Beyer, propone que cada diente tiene un significado simbólico relacionado con la masticación de la vida: nuestra manera de procesar situaciones, conflictos o etapas vitales.

👉 Los incisivos → capacidad de "hincar el diente" a algo nuevo, de afrontar
👉 Los caninos → agresividad sana, la defensa personal
👉 Los premolares y molares → capacidad de triturar y asimilar lo vivido

¿Tienes caries recurrentes siempre en el mismo lugar? Quizás vale la pena preguntarse qué está pasando más allá del esmalte.

En HappyClínica tratamos las caries clínicamente con obturaciones de resina de alta calidad, pero también te acompañamos a explorar la causa emocional si te interesa.

Porque sanar de verdad implica ir más allá.`,
    hashtags: ['happyclínica','caries','biodescodificacion','odontologiaintegrativa','odontologiaholistica','saludbucal','emocionesysalud','dentistabarcelona','saludintegral','odontologiamasalladelosdientes'],
  },
  {
    id: `${CLIENT_ID}-12`,
    client_id: CLIENT_ID,
    post_number: 12,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
    headline_visual: 'SIEMPRE HAPPY CTA — branding verde salvia, logo HappyClínica, tipografía bold · SIN datos de contacto en imagen',
    visual_prompt: 'Canva: https://www.canva.com/d/TU0WGG8OwpkHVC8 — Post SIEMPRE HAPPY CTA',
    copy: `En HappyClínica creemos que ir al dentista puede ser una experiencia diferente. 🌿🦷

No solo se trata de arreglar dientes. Se trata de acompañarte en el cuidado de tu salud desde un enfoque integrativo, respetuoso y a tu ritmo.

Somos otra forma de entender y acompañar La Vida y La Salud Bucal.

✔ Odontología integrativa y holística
✔ Materiales biocompatibles
✔ Ortodoncia con Invisalign
✔ Odontopediatría sin miedo
✔ Dentosofía y biodescodificación
✔ Terapia neural
✔ Atención SLOW: tiempo, escucha y cuidado real

Si buscas una clínica dental donde te traten como persona, no como expediente, aquí estamos.

¿Tienes alguna pregunta? Mándanos un mensaje y te respondemos con mucho gusto 🤗

SIEMPRE HAPPY 🌟`,
    hashtags: ['happyclínica','odontologiaintegrativa','odontologiaholistica','dentistabarcelona','saludbucal','odontologiabiologica','saludintegral','ortodonciabarcelona','happyortodoncia','dentistaintegrativa'],
  },
];

const { error } = await supabase.from('posts').insert(posts);

if (error) {
  console.error('❌ Error insertando posts:', error.message);
} else {
  console.log(`✅ ${posts.length} posts de Happy Clínica insertados en ContentFlow (status: review)`);
  console.log('   → El cliente los verá en su portal de aprobación');
  console.log('   → No se publicará nada hasta que estén aprobados');
}
