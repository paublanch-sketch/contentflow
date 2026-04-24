import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabase = createClient(
  'https://afbussamfzqfvozrycsr.supabase.co',
  'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
);

const CLIENT_ID = 'crespi-oliver-assessors-sl';

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
    visual_prompt: 'https://www.canva.com/d/wdZJ0gYFv8SVR3k',
    copy: `¿Tu empresa tiene todo en orden fiscalmente? 📊\n\nEn Crespi – Oliver Assessors llevamos más de 35 años gestionando la fiscalidad de empresas, autónomos y particulares en Palma de Mallorca.\n\n✅ Declaraciones trimestrales y anuales\n✅ IVA, IRPF y Impuesto de Sociedades\n✅ Planificación fiscal estratégica\n✅ Revisión y corrección de declaraciones\n\nDeja la fiscalidad en manos de expertos y céntrate en hacer crecer tu negocio. 🚀\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#AsesoríaFiscal", "#GestoríaMallorca", "#PalmadeMallorca", "#Fiscalidad", "#PYMES", "#Impuestos", "#EmpresasMallorca", "#Contabilidad", "#AsesoríaPalma"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-2`,
    client_id: CLIENT_ID,
    post_number: 2,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/K4DPnAha_VJAdij',
    copy: `Tu equipo es tu mayor activo. Asegúrate de que su gestión esté en las mejores manos. 👥\n\nEn Crespi – Oliver Assessors nos encargamos de toda tu gestión laboral:\n\n✔️ Altas y bajas en la Seguridad Social\n✔️ Elaboración y revisión de contratos\n✔️ Cálculo y emisión de nóminas\n✔️ Seguros sociales al día\n✔️ Gestión de ERTEs y bajas laborales\n\nTu empresa, siempre cumpliendo con la normativa laboral vigente. 📑\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#GestiónLaboral", "#AsesoríaLaboral", "#GestoríaMallorca", "#PalmadeMallorca", "#Nóminas", "#RecursosHumanos", "#EmpresasMallorca", "#AsesoríaPalma", "#Contratos"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-3`,
    client_id: CLIENT_ID,
    post_number: 3,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/MIueg3ITT1-U7Xz',
    copy: `¿Necesitas gestionar tu permiso de residencia o el de alguien de tu empresa? 🌍\n\nEn Crespi – Oliver Assessors gestionamos todos los trámites de extranjería de forma ágil y eficaz:\n\n✅ Renovaciones de permisos de residencia y trabajo\n✅ Arraigos social, familiar y laboral\n✅ Reagrupaciones familiares\n✅ Nacionalidad española\n✅ Modificaciones y permisos iniciales\n✅ Citas, recursos y seguimiento integral\n\nNos encargamos de todo el proceso para que tú solo tengas que aparecer el día de la cita. 🤝\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#Extranjería", "#TrámitesExtranjería", "#GestoríaMallorca", "#PalmadeMallorca", "#Residencia", "#Nacionalidad", "#InmigraciónEspaña", "#AsesoríaPalma", "#ExtranjeríaEspaña"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-4`,
    client_id: CLIENT_ID,
    post_number: 4,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/TATGBryiUSJj0TA',
    copy: `Una contabilidad ordenada es la base de una empresa sana. 💼\n\nEn Crespi – Oliver Assessors llevamos la contabilidad de tu empresa con precisión y rigor:\n\n📊 Registro y control contable diario\n📊 Elaboración de balances e informes financieros\n📊 Cierre contable anual\n📊 Libros oficiales y cuentas anuales\n📊 Asesoramiento en decisiones financieras clave\n\n¿Tienes dudas sobre la contabilidad de tu empresa? Consúltanos sin compromiso. 📲\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#Contabilidad", "#GestoríaMallorca", "#PalmadeMallorca", "#AsesoríaFiscal", "#GestiónFinanciera", "#EmpresasMallorca", "#PYMES", "#AsesoríaPalma", "#Fiscalidad"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-5`,
    client_id: CLIENT_ID,
    post_number: 5,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/2o7S7_tG4g9tQRm',
    copy: `¿Tienes una idea de negocio y no sabes por dónde empezar? 🚀\n\nEn Crespi – Oliver Assessors te acompañamos en todo el proceso de constitución de tu empresa:\n\n✅ Elección de la forma jurídica más adecuada\n✅ Constitución de SL, SA, autónomos...\n✅ Registro en el Registro Mercantil\n✅ Altas fiscales y laborales\n✅ Asesoramiento inicial personalizado\n\nMás de 35 años ayudando a emprendedores a dar el paso con confianza. 💪\n\n📍 C/ Antonio Marques nº12, ET-B, Palma\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#CreaciónDeEmpresas", "#Emprendedores", "#GestoríaMallorca", "#PalmadeMallorca", "#NuevaEmpresa", "#Autónomos", "#AsesoríaPalma", "#EmpresasMallorca", "#StartUp"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-6`,
    client_id: CLIENT_ID,
    post_number: 6,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/65jZTYfoJEdvlVE',
    copy: `Los trámites jurídicos pueden ser complejos y emocionalmente difíciles. Nosotros los simplificamos por ti. ⚖️\n\nEn Crespi – Oliver Assessors gestionamos:\n\n✔️ Herencias y sucesiones\n✔️ Contratos de compraventa\n✔️ Contratos de arrendamiento\n✔️ Divorcios y separaciones\n✔️ Representación legal\n\nCon más de 35 años de experiencia, te ofrecemos el acompañamiento jurídico que tu familia y tu empresa necesitan.\n\nConsúltanos sin compromiso. 🤝\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#Herencias", "#TrámitesJurídicos", "#GestoríaMallorca", "#PalmadeMallorca", "#DerechoLaboral", "#AsuntosFamiliares", "#AsesoríaPalma", "#Contratos", "#EmpresasMallorca"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-7`,
    client_id: CLIENT_ID,
    post_number: 7,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/Dj_vdvuJJ9kWPD2',
    copy: `¿Necesitas gestionar un trámite de tráfico y no quieres perder el día en colas? 🚗\n\nEn Crespi – Oliver Assessors lo hacemos por ti:\n\n✅ Transferencias de vehículos\n✅ Cambios de titularidad\n✅ Duplicados de permisos de circulación\n✅ Bajas y altas de vehículos\n✅ Cambios de domicilio en el permiso\n\nRápido, sencillo y sin complicaciones. Solo tráenos la documentación y nosotros nos encargamos del resto. 📄\n\n📍 C/ Antonio Marques nº12, ET-B, Palma\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#TrámitesTráfico", "#TransferenciaVehículo", "#GestoríaMallorca", "#PalmadeMallorca", "#GestoríaAdministrativa", "#AsesoríaPalma", "#EmpresasMallorca", "#Tráfico"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-8`,
    client_id: CLIENT_ID,
    post_number: 8,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/oTtGbGHHw9-8CpS',
    copy: `La Seguridad Social y las pensiones tienen más matices de lo que parece. Que no te pille desprevenido. 🛡️\n\nEn Crespi – Oliver Assessors gestionamos:\n\n📋 Solicitud y trámite de pensiones (jubilación, viudedad, orfandad...)\n📋 Prestaciones por desempleo\n📋 Incapacidades temporales y permanentes\n📋 Altas y bajas en la Seguridad Social\n📋 Recursos y reclamaciones\n\nConocemos la normativa al detalle para asegurarnos de que recibes todo lo que te corresponde. 💪\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#SeguridadSocial", "#Pensiones", "#GestoríaMallorca", "#PalmadeMallorca", "#GestiónLaboral", "#AsesoríaPalma", "#EmpresasMallorca", "#PYMES", "#Jubilación"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-9`,
    client_id: CLIENT_ID,
    post_number: 9,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/b86CCP9FerJhKDw',
    copy: `Alquilar una propiedad sin el contrato adecuado puede traerte muchos problemas. 🏠\n\nEn Crespi – Oliver Assessors redactamos y gestionamos contratos de arrendamiento con todas las garantías legales:\n\n✅ Contratos de alquiler residencial\n✅ Contratos de arrendamiento de local comercial\n✅ Asesoramiento en depósito y fianza\n✅ Actualización de rentas\n✅ Resolución de conflictos entre partes\n\nTanto si eres propietario como inquilino, podemos ayudarte. 🤝\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#ContratosAlquiler", "#GestoríaMallorca", "#PalmadeMallorca", "#Arrendamiento", "#InmobiliariaMallorca", "#AsesoríaPalma", "#DerechoLaboral", "#EmpresasMallorca"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-10`,
    client_id: CLIENT_ID,
    post_number: 10,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/kjydpPaRnKtKU0m',
    copy: `La experiencia no se improvisa. Se construye con trabajo, dedicación y la confianza de cada cliente. 🏆\n\nCrespi – Oliver Assessors lleva desde 1990 acompañando a empresas, autónomos y particulares de Palma de Mallorca.\n\n35 años siendo el aliado de confianza en:\n\n💼 Asesoría fiscal, contable y jurídica\n👥 Gestión laboral completa\n🌍 Trámites de extranjería y nacionalidad\n🚗 Tráfico y gestiones administrativas\n\nPorque cuando tienes un equipo experto a tu lado, tu negocio avanza con más seguridad.\n\n📍 Palma de Mallorca | 📞 971 75 66 05`,
    hashtags: ["#CrespiOliverAssessors", "#35AñosDeExperiencia", "#GestoríaMallorca", "#PalmadeMallorca", "#AsesoríaIntegral", "#EmpresasMallorca", "#Confianza", "#AsesoríaPalma", "#Contabilidad", "#Fiscalidad"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-11`,
    client_id: CLIENT_ID,
    post_number: 11,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/rvDK0NmOddy8t2Z',
    copy: `¡La Campaña de la Renta 2025 ya está aquí! 📅💼\n\n¿Sabes si tu declaración está optimizada al máximo?\n\nEn Crespi – Oliver Assessors nos encargamos de que pagues solo lo que debes, aprovechando todas las deducciones a las que tienes derecho:\n\n✅ Deducciones por vivienda habitual\n✅ Planes de pensiones y aportaciones\n✅ Deducción por hijos y familia numerosa\n✅ Actividades económicas y autónomos\n✅ Revisión de borradores de la AEAT\n\nNo presentes el borrador sin revisarlo antes. Un pequeño error puede costarte mucho. 🚨\n\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#Renta2025", "#DeclaraciónDeLaRenta", "#AsesoríaFiscal", "#PalmadeMallorca", "#IRPF", "#AhorroFiscal", "#GestoríaMallorca", "#AsesoríaPalma", "#Impuestos"],
    webhook_sent_at: null,
  },
  {
    id: `${CLIENT_ID}-12`,
    client_id: CLIENT_ID,
    post_number: 12,
    platform: 'IG',
    status: 'review',
    feedback: '',
    image_url: '',
    visual_prompt: 'https://www.canva.com/d/e75wJoKmE54WgjF',
    copy: `¿Buscas una asesoría de confianza que te lo resuelva todo? 🤝\n\nEn Crespi – Oliver Assessors somos especialistas en asesoría integral para empresas, autónomos y particulares en Palma de Mallorca.\n\n✔️ Asesoría fiscal, contable y jurídica personalizada\n✔️ Gestión laboral completa: contratos, nóminas y seguros sociales\n✔️ Trámites de extranjería y nacionalidad\n✔️ Contratos de alquiler, herencias y representación legal\n✔️ Tráfico y gestiones administrativas\n✔️ Pensiones y Seguridad Social\n\nTú marcas el rumbo, nosotros nos encargamos de que todo esté en orden. 📊🚀\n\n📍 C/ Antonio Marques nº12, ET-B, Palma\n🌐 crespioliverassessors.es\n📞 971 75 66 05 | 📲 628 59 59 80`,
    hashtags: ["#CrespiOliverAssessors", "#AsesoríaIntegral", "#GestoríaMallorca", "#PalmadeMallorca", "#EmpresasMallorca", "#AsesoríaFiscal", "#GestiónLaboral", "#Extranjería", "#AsesoríaPalma", "#PYMES"],
    webhook_sent_at: null,
  },
];

const { error: insError } = await supabase.from('posts').insert(posts);

if (insError) {
  console.error('Error insertando posts:', insError.message);
  process.exit(1);
}

console.log(`✅ ${posts.length} posts insertados correctamente para ${CLIENT_ID}`);
console.log('\nLinks de Canva por post:');
posts.forEach(p => console.log(`  Post ${p.post_number}: ${p.visual_prompt}`));
