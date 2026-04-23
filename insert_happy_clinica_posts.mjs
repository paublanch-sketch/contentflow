import { createClient } from '/sessions/eager-wizardly-clarke/mnt/AutoRedesSociales/FlowAPP/node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'happy-clinica';

const posts = [
  {
    id: `${CLIENT_ID}-1`,
    client_id: CLIENT_ID,
    post_number: 1,
    platform: 'IG',
    headline_visual: 'Carousel 5 slides — "¿Respiras por la boca?" fondo blanco con ilustración de nariz vs boca, tipografía bold verde salvia',
    visual_prompt: 'Carousel 5 slides Instagram 1080x1350. Estilo minimalista blanco con acentos verde salvia (#7fad7a) y crema (#f5f0e8). Slide 1 (portada): Texto grande "¿RESPIRAS POR LA BOCA?" centro, subtítulo "Esto está afectando tu salud bucal" en gris suave, ilustración simple de silueta con boca abierta vs nariz en el aire. Slide 2: Icono nariz vs boca, texto "La respiración bucal cambia la postura de tu lengua, seca las mucosas y altera el desarrollo maxilar." Slide 3: Lista con checkmarks verdes: impacto en desarrollo de maxilares, maloclusiones, apnea del sueño, postura corporal. Slide 4: Texto "¿Y los niños?" con ilustración de niño y señales de alerta: roncar, boca abierta al dormir, ojeras. Slide 5: CTA "#happyclínica • Carrer del Rosselló 255 • 665 64 86 93" logo verde salvia fondo blanco.',
    copy: `¿Respiras por la boca? 🫁

Puede parecer algo sin importancia, pero la respiración bucal tiene consecuencias reales en tu salud bucal y en la de tus peques.

Cuando respiramos por la boca de forma habitual:
✔ La lengua pierde su posición correcta en el paladar
✔ Los maxilares no se desarrollan bien
✔ Aparecen maloclusiones (dientes mal colocados)
✔ Aumenta el riesgo de apnea del sueño
✔ Se altera la postura corporal

👉 La nariz no es solo para respirar bonito. Filtra, calienta y humidifica el aire que llega a tus pulmones. La boca no fue diseñada para eso.

En HappyClínica trabajamos la respiración como parte del tratamiento bucal, porque la función hace la forma.

¿Sabes si respiras bien? 💭 Cuéntanos en los comentarios.

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#respiracionnasal', '#respiracionbucal', '#odontologiaintegrativa', '#odontologiaholistica', '#happyclínica', '#odontologiamasalladelosdientes', '#dentistabarcelona', '#ortopediafuncional', '#maloclusiones', '#saludbucal'],
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
    headline_visual: 'Single image — "Materiales biocompatibles" diseño oscuro con elementos de vidrio/cristal y texto blanco elegante',
    visual_prompt: 'Single image Instagram 1080x1350. Fondo oscuro texturizado (#1a1a2e) con elementos orgánicos: hoja de planta, materiales de vidrio y cerámica dental dispuestos artísticamente. Texto en blanco "MATERIALES BIOCOMPATIBLES" grande y bold en la parte superior. Subtítulo en letra fina: "Porque no todo lo que entra en tu boca te sienta igual." Centro-bajo: tres iconos pequeños en blanco: cerámica, zirconio, composite. HappyClínica logo pequeño en esquina inferior. Estética limpia, clínica pero cálida.',
    copy: `¿Sabías que los materiales que usamos en odontología pueden afectar tu salud general? 🌱

En HappyClínica solo trabajamos con materiales biocompatibles.

¿Qué significa esto?
✔ Que no liberan sustancias tóxicas en tu organismo
✔ Que respetan tu sistema inmunológico
✔ Que son especialmente importantes si tienes sensibilidades, alergias o patologías crónicas

Los materiales que usamos:
• Cerámica y porcelana (sin metal)
• Composite libre de BPA
• Zirconio (para coronas e implantes)
• Materiales de obturación sin mercurio

👉 Tu boca no está aislada del resto del cuerpo. Lo que ponemos en ella entra en contacto con tu sangre, tus tejidos y tu sistema nervioso.

Si has tenido amalgamas de mercurio y quieres retirarlas de forma segura, ven a vernos.

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#materialesbiocompatibles', '#odontologiabilogica', '#odontologiaholistica', '#happyclínica', '#odontologiaintegrativa', '#amalgamasmercurio', '#saludintegral', '#dentistabarcelona', '#SensibilidadQuimicaMultiple', '#zirconio'],
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
    headline_visual: 'Carousel 4 slides — "¿Te despiertas con dolor de mandíbula?" fondo crema con ilustración de mandíbula y ondas de tensión',
    visual_prompt: 'Carousel 4 slides Instagram 1080x1350. Paleta: crema (#f9f4ee), terracota suave (#c87941), blanco. Slide 1 (portada): Pregunta grande bold "¿TE DESPIERTAS CON DOLOR DE MANDÍBULA?" en terracota, ilustración minimalista de mandíbula con líneas de tensión en gris. Slide 2: Texto "El bruxismo no es solo apretar los dientes." Lista de síntomas con iconos: dolor de cabeza, desgaste dental, tinnitus, tensión cervical, insomnio. Slide 3: Fondo terracota suave, texto blanco "En HappyClínica tratamos el bruxismo de forma integrativa: férula + gestión emocional + terapia corporal." Slide 4: CTA blanco con logo verde, dirección y teléfono.',
    copy: `¿Te aprietas los dientes por la noche? 😬

El bruxismo es mucho más que desgaste dental.

Síntomas que quizás no relacionas:
✔ Dolor de cabeza al despertar
✔ Tensión en el cuello y los hombros
✔ Pitidos en los oídos (tinnitus)
✔ Dientes sensibles o desgastados
✔ Insomnio o sueño de poca calidad

¿Y por qué aparece?
La mayoría de veces, el bruxismo está relacionado con el estrés acumulado, tensiones emocionales no procesadas o una oclusión dental que no está en equilibrio.

👉 Tratar solo la férula es tratar el síntoma. En HappyClínica buscamos la causa.

Nuestro enfoque incluye:
• Análisis de la oclusión
• Férula de descarga
• Acompañamiento en la gestión emocional
• Terapia Neural cuando es necesario

¿Te identificas con esto? 💭

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#bruxismo', '#dolormandibula', '#odontologiaintegrativa', '#odontologiaholistica', '#happyclínica', '#terapianeural', '#equilibriocuerpomente', '#dentistabarcelona', '#feruladeoclusión', '#saludbucal'],
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
    headline_visual: 'Single image — "Tu boca y tu postura están conectadas" silueta corporal con línea que va desde mandíbula a columna',
    visual_prompt: 'Single image Instagram 1080x1350. Fondo blanco puro. Centro: ilustración minimalista de silueta humana de perfil, con una línea de conexión energética desde la mandíbula/cuello hacia la columna vertebral y pelvis (línea ondulada verde salvia). Texto superior: "TU BOCA Y TU POSTURA ESTÁN CONECTADAS" en negro bold. Texto inferior más pequeño: "Una mandíbula en desequilibrio afecta todo tu cuerpo." Logo HappyClínica pequeño en esquina inferior derecha. Estética clean, casi ilustración de libro de anatomía moderno.',
    copy: `¿Sabías que 8 de cada 10 personas sufre dolores de espalda?

¿Y si te dijéramos que tu boca tiene mucho que ver? 🦷

La mandíbula forma parte del sistema cráneo-sacral. Cuando hay un desequilibrio en la oclusión dental, ese desequilibrio viaja hacia abajo:

👉 Mandíbula descompensada → tensión en el cuello
👉 Tensión cervical → compensación en hombros
👉 Compensación en hombros → dolor de espalda
👉 Todo el eje postural se adapta a lo que pasa en tu boca

En HappyClínica miramos toda tu postura, no solo tus dientes.

Por eso trabajamos en equipo con fisioterapeutas, osteópatas y terapeutas corporales cuando el caso lo requiere.

¿Tienes dolor de espalda crónico y nadie ha mirado tu boca? Cuéntanos 👇

📲 Agenda tu cita: 665 64 86 93
📍 Carrer del Rosselló, 255 2° 1ª, Barcelona`,
    hashtags: ['#posturacorporal', '#mandibula', '#odontologiaintegrativa', '#odontologiaholistica', '#happyclínica', '#dolorespalda', '#sistemacraniosacral', '#dentistabarcelona', '#oclusión', '#equilibriocuerpomente'],
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
    headline_visual: 'Carousel 6 slides — "¿Comes para tus dientes?" alimentos en fondo blanco con tipografía colores vibrantes',
    visual_prompt: 'Carousel 6 slides Instagram 1080x1350. Fondo blanco. Slide 1 (portada): Fotografía estética de alimentos naturales: apio, almendras, manzana, queso, agua con limón. Texto superpuesto bold verde oscuro "¿COMES PARA TUS DIENTES?" Slide 2: "Lo que protege tu esmalte" lista con iconos: queso, verduras crujientes, agua, té verde. Slide 3: "Lo que daña tu esmalte" lista roja: azúcar, refrescos, zumos, alcohol. Slide 4: "Dato: los ácidos atacan el esmalte 20 minutos después de comer algo dulce." Fondo amarillo suave. Slide 5: "Tip HappyClínica: espera 30 min antes de cepillarte tras comer algo ácido." Slide 6: CTA verde con dirección.',
    copy: `La alimentación es el primer dentista que tienes. 🥦🦷

Lo que comes cada día afecta directamente a la salud de tu boca. Y no solo a los dientes... también a las encías, la mandíbula y la microbiota oral.

✔ PROTEGE tu esmalte:
• Lácteos (calcio y fósforo)
• Verduras crujientes (estimulan la saliva)
• Agua (neutraliza el pH)
• Almendras y semillas
• Té verde (efecto antimicrobiano)

✔ OJO con esto:
• Azúcar refinado → alimenta a las bacterias que forman ácidos
• Refrescos y zumos → atacan el esmalte incluso sin azúcar (por el ácido cítrico)
• Alcohol → reseca la boca y altera la microbiota
• Picar entre horas → no da tiempo a que la saliva neutralice el pH

💡 Tip HappyClínica: si comes algo ácido, espera 30 minutos antes de cepillarte. Si te cepillas inmediatamente, frotas el ácido sobre el esmalte.

¿Cuándo fue tu última higiene dental? 📅

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#alimentacionsaludable', '#saludbucal', '#esmalte', '#odontologiaintegrativa', '#odontologiaholistica', '#happyclínica', '#nutricion', '#higienedental', '#dentistabarcelona', '#microbiota'],
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
    headline_visual: 'Single image — Invisalign alineadores sobre fondo verde salvia con texto "Ortodoncia que respeta tu biología"',
    visual_prompt: 'Single image Instagram 1080x1350. Fondo verde salvia suave (#c8e6c0). Centro: fotografía o ilustración estética de alineadores Invisalign transparentes sobre superficie neutra. Texto superior bold blanco "ORTODONCIA INVISIBLE" con subtítulo "que respeta tu biología." Parte inferior: tres beneficios en iconos blancos: sin metal, sin BPA, sin dolor. Logo HappyClínica blanco en esquina inferior derecha. Estética moderna, clean, natural.',
    copy: `Cuántas alegrías nos dan estos "plastiquitos"... 🦷✨

El Invisalign ha cambiado la ortodoncia para siempre.

Pero en HappyClínica no solo te lo ofrecemos como un tratamiento estético. Lo integramos dentro de un enfoque funcional completo:

✔ Analizamos tu respiración y tu función antes de empezar
✔ Nos aseguramos de que la ortodoncia no interfiera con tu postura
✔ Planificamos de forma dinámica, adaptando cada fase a tu evolución
✔ Elegimos materiales libres de BPA siempre que es posible

¿El resultado?
Una sonrisa alineada que también funciona bien. Sin que nadie se entere del proceso.

Si tienes dudas sobre si el Invisalign es para ti, mándanos un mensaje y te lo resolvemos sin compromiso. 📲

#invisalign 💬

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#invisalign', '#ortodonciainvisible', '#happyclínica', '#odontologiaholistica', '#odontologiaintegrativa', '#ortodonciabarcelona', '#happyortodoncia', '#saludbucal', '#sonrisasana', '#dentistabarcelona'],
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
    headline_visual: 'Carousel 5 slides — "Señales en la boca de tus peques" ilustraciones infantiles sobre fondo pastel',
    visual_prompt: 'Carousel 5 slides Instagram 1080x1350. Paleta pastel: fondo melocotón suave (#ffe4cc), verde menta, amarillo. Slide 1 (portada): Ilustración adorable de niño con bocado grande, texto bold "¿QUÉ TE ESTÁ DICIENDO LA BOCA DE TU PEQUE?" en verde oscuro. Slide 2-5: cada uno con icono y texto simple de señal de alerta (roncar, boca abierta, no mastica de los dos lados, dientes apretados). Estilo ilustración suave tipo Canva education, amigable y no alarmista.',
    copy: `¿Le miras la boca a tus hijos con atención? 👧🦷

La infancia es el momento más importante para detectar problemas funcionales. A tiempo, muchos se resuelven solos con un poco de guía.

Señales que no deberías ignorar en tus peques:

👉 Roncan o duermen con la boca abierta
→ Puede indicar respiración bucal o hipertrofia de adenoides

👉 Solo mastica por un lado
→ Desequilibrio que puede afectar el desarrollo maxilar

👉 Tienen ojeras o se despiertan cansados
→ Calidad del sueño comprometida, muchas veces relacionada con la boca

👉 Empujan la lengua hacia adelante al tragar
→ Deglución atípica que condiciona la posición de los dientes

👉 Tienen los dientes apretados, labios secos, cara larga
→ Señales clásicas de respiración oral

La ortopedia funcional temprana puede cambiarlo todo.
Y sí, lo antes mejor 😊

¿Reconoces alguno de estos signos en tu hijo? Cuéntanos 👇

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#odontopediatrabarcelona', '#ortopediafuncional', '#respiracionnasal', '#saludbucalinfantil', '#happyclínica', '#odontologiaintegrativa', '#ninos', '#maloclusiones', '#dentistabarcelona', '#trastornosmiofuncionales'],
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
    headline_visual: 'Single image — "El miedo al dentista tiene solución" fotografía de consulta cálida, luz natural, tonos madera y blanco',
    visual_prompt: 'Single image Instagram 1080x1350. Fotografía o composición de interior de consulta dental moderna y acogedora: luz natural, plantas verdes, silla dental minimalista, tonos madera y blanco. Overlay suave crema 30% de opacidad. Texto superpuesto: "EL MIEDO AL DENTISTA TIENE SOLUCIÓN" bold blanco. Subtítulo: "Odontología SLOW — a tu ritmo, con todo el tiempo del mundo." Logo HappyClínica pequeño blanco. Sensación de calma, no de clínica fría.',
    copy: `Para muchas personas, ir al dentista no es un trámite. Es enfrentarse a algo que les genera ansiedad real. 💙

Y lo entendemos.

Por eso en HappyClínica practicamos la Odontología SLOW.

¿Qué significa?
✔ Dedicamos el tiempo que necesitas, sin prisas
✔ Explicamos cada paso antes de hacerlo
✔ Respetamos tu ritmo y tus sensaciones
✔ Creamos un ambiente relajado y de confianza
✔ Si necesitas parar, paramos

Porque cuando el miedo al dentista no se trabaja, simplemente se deja de ir. Y eso tiene consecuencias reales en tu salud.

La relación entre el profesional y el paciente lo cambia todo.

Si llevas tiempo posponiendo ir al dentista por miedo o ansiedad, este es tu lugar.

¿Te animas a darnos una oportunidad? 😊

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#odontofobia', '#miedo aldentista', '#odontologiaslow', '#happyclínica', '#odontologiaintegrativa', '#odontologiaholistica', '#dentistabarcelona', '#ansiedad', '#bienestar', '#saludbucal'],
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
    headline_visual: 'Carousel 4 slides — "Tu microbiota oral" ilustración científica moderna con micro-organismos en acuarela sobre fondo oscuro',
    visual_prompt: 'Carousel 4 slides Instagram 1080x1350. Fondo azul noche (#0d1b2a). Ilustraciones tipo acuarela digital de micro-organismos: bacterias y hongos en tonos verde fosforescente, turquesa, dorado. Slide 1 (portada): "EL UNIVERSO QUE VIVE EN TU BOCA" text blanco bold sobre ilustración microbiana. Slide 2: "700 especies de microorganismos. La mayoría, tus aliadas." Slide 3: "¿Qué altera tu microbiota oral?" lista con iconos: antibióticos, azúcar, estrés, tabaco, enjuagues con alcohol. Slide 4: CTA sobre fondo oscuro con texto verde: "Cuida tu microbiota, cuida tu salud."',
    copy: `¿Sabías que en tu boca viven más de 700 especies diferentes de microorganismos? 🦠

La mayoría son tus aliadas. Protegen el esmalte, regulan el pH, combaten bacterias patógenas y comunican información a tu sistema inmunológico.

El problema no son las bacterias. El problema es cuando el equilibrio se rompe.

¿Qué altera tu microbiota oral?
✔ Antibióticos (eliminan lo bueno y lo malo)
✔ Enjuagues con alcohol (excesivamente antisépticos)
✔ Azúcar y alimentos ultraprocesados
✔ Estrés crónico
✔ Tabaco
✔ Falta de saliva (boca seca)

En HappyClínica no trabajamos para eliminar bacterias. Trabajamos para que las bacterias buenas dominen.

Por eso usamos productos de higiene que respetan la microbiota y tratamos la raíz del problema, no solo los síntomas.

¿Te gustaría saber qué productos son mejores para tu microbiota? 💬 Te lo contamos en la próxima consulta.

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#microbiota', '#microbiotaoral', '#saludbucal', '#odontologiaintegrativa', '#odontologiaholistica', '#happyclínica', '#higienebucal', '#bacterias', '#equilibriocuerpomente', '#dentistabarcelona'],
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
    headline_visual: 'Carousel 5 slides tipo #happyconsell — fondo verde salvia con iconos blancos, tips de higiene bucal completa',
    visual_prompt: 'Carousel 5 slides Instagram 1080x1350. Identidad visual de serie #happyconsell: fondo verde salvia (#7fad7a), iconos y texto blancos. Slide 1: Cabecera "✦ HAPPYCONSELL ✦" grande, subtítulo "La rutina de higiene bucal completa." Slide 2-5: cada slide con icono grande centrado (cepillo, hilo dental, rascador lingual, irrigador) y texto de consejo en bold blanco sobre verde. Estilo coherente, tipografía sans-serif clean, minimalista pero impactante visualmente.',
    copy: `#happyconsell 🦷

La rutina de higiene bucal completa (y en orden).

Muchas personas hacen la mitad. Aquí tienes la versión completa:

1️⃣ RASCADOR LINGUAL (antes de cepillarte)
Elimina la capa de toxinas y bacterias acumuladas durante la noche. El de cobre es el mejor aliado.

2️⃣ HILO DENTAL o IRRIGADOR
Antes del cepillo. Elimina la placa entre dientes donde el cepillo no llega.

3️⃣ CEPILLO DENTAL
2 minutos mínimo. Suave, con la inclinación correcta. Ni mucha presión ni demasiada pasta.

4️⃣ ENJUAGUE (opcional)
Si lo usas, sin alcohol. Mejor un colutorio que respete tu microbiota.

💡 Extra: limpiate la lengua también por las noches.

⚠️ No tiene sentido usar el hilo dental DESPUÉS del cepillo. Las partículas entre dientes ya se las tragaste.

¿Cuántos pasos haces tú actualmente? Cuéntanos 👇

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93`,
    hashtags: ['#happyconsell', '#higienebucal', '#rutinabucal', '#odontologiaintegrativa', '#odontologiaholistica', '#happyclínica', '#dentistabarcelona', '#higieneoral', '#cepillodientes', '#saludbucal'],
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
    headline_visual: 'Single image — "Las caries y las emociones" composición con diente ilustrado y fondo de textura orgánica, texto centrado',
    visual_prompt: 'Single image Instagram 1080x1350. Fondo textura orgánica crema y ocre suave, como papel artesanal. Centro: ilustración delicada de un diente con raíces que se transforman en ramas de árbol (concepto de la caries como mensaje emocional). Texto superior: "¿A CASO LA CARIES TIENE GPS?" bold oscuro. Texto inferior más pequeño: "Lo que tus dientes te están intentando decir." Logo HappyClínica en esquina inferior. Estética poética, contemplativa, diferente al resto.',
    copy: `Las caries son una patología multifactorial.

Pero hay algo que muy pocos dentistas te cuentan. 🤔

A través de la biodescodificación podemos entender el significado emocional de dónde aparecen las caries. Porque no es lo mismo que aparezcan arriba o abajo, en el lado derecho o en el izquierdo, en los molares o en los incisivos.

¿Sino, qué sentido tiene que parezcan en algunos dientes y no en otros? ¿Acaso la caries tiene GPS? 💭

En HappyClínica tratamos las caries clínicamente (con obturaciones o lo que necesites), pero también te acompañamos a explorar la causa emocional que puede estar detrás.

Nos basamos en lo aprendido de Christian Beyer, padre de la biodescodificación.

Porque tratar solo el diente sin mirar por qué aparece es como apagar una alarma sin investigar el humo.

¿Te gustaría saber más sobre este enfoque? Escríbenos 📲

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona`,
    hashtags: ['#biodescodificacion', '#caries', '#odontologiaintegrativa', '#odontologiaholistica', '#happyclínica', '#odontologiamasalladelosdientes', '#equilibriocuerpomente', '#detosofia', '#dentistabarcelona', '#saludemocional'],
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
    headline_visual: 'Carousel 3 slides CTA revisión — slide 1 fondo blanco con "SIEMPRE HAPPY" grande, slide 2 servicios, slide 3 contacto con fondo verde',
    visual_prompt: 'Carousel 3 slides Instagram 1080x1350. Slide 1: Fondo blanco puro, texto bold verde salvia "SIEMPRE HAPPY 🌱" enorme centrado, subtítulo negro "Somos otra forma de entender y acompañar la salud bucal." Fotografía de fondo muy suave: consulta luminosa, plantas. Slide 2: Fondo crema (#f5f0e8), lista de servicios en verde oscuro con iconos: Odontología integrativa, Ortopedia funcional, Dentosofía, Invisalign, Terapia Neural, Materiales biocompatibles. Slide 3: Fondo verde salvia, texto blanco bold "¿NOS CONOCEMOS?" subtítulo dirección y teléfono grande. Logo HappyClínica blanco.',
    copy: `Somos otra forma de entender y acompañar La Vida y La Salud Bucal. 🦷🌱

En HappyClínica no solo tratamos los dientes.

Rehabilitamos la masticación y la respiración de forma integrativa, individualizada y respetuosa, acompañándote para que potencies tu capacidad natural de sanarte.

Trabajamos desde:
✔ Odontología integrativa y biológica
✔ Ortopedia funcional
✔ Dentosofía
✔ Ortodoncia invisible (Invisalign)
✔ Terapia Neural
✔ Materiales biocompatibles
✔ Biodescodificación

Porque cuida tu salud bucal es cuidar tu salud general.

Si todavía no nos conoces, este es el momento de venir a vernos. Agenda tu primera cita y empieza a entender lo que tu boca lleva tiempo intentando decirte.

¿Nos vemos pronto? 😊

📍 Carrer del Rosselló, 255 2° 1ª, Barcelona
📲 665 64 86 93
✉️ info@happyclinica.com`,
    hashtags: ['#happyclínica', '#odontologiaintegrativa', '#odontologiaholistica', '#odontologiabiologica', '#odontologiamasalladelosdientes', '#dentistadelanariz', '#dentistabarcelona', '#detosofia', '#equilibriocuerpomente', '#saludbucal'],
    status: 'review',
    feedback: '',
    image_url: '',
    webhook_sent_at: null,
  },
];

async function run() {
  console.log(`Insertando ${posts.length} posts para ${CLIENT_ID}...`);

  for (const post of posts) {
    // Upsert para no duplicar si se vuelve a ejecutar
    const { error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'id' });

    if (error) {
      console.error(`✗ Post #${post.post_number}: ${error.message}`);
    } else {
      console.log(`✓ Post #${post.post_number}: ${post.headline_visual.substring(0, 60)}...`);
    }
  }

  console.log('\n✅ Listo. Recarga ContentFlow para ver los posts de HAPPY CLINICA.');
}

run();
