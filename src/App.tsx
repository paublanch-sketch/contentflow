import { useState, useEffect } from 'react';
import ApprovalWall from './ApprovalWall';
import { supabase } from './lib/supabase';

const INITIAL_DATA = {
    entelsat: {
    name: "Entelsat Instalaciones",
    folder: "entelsat",
    posts: [
      { 
        id: "1", 
        platform: 'IG', 
        headline_visual: 'Rack de telecomunicaciones impecable + REQUIERE LOGO', 
        copy: 'El orden no es solo estética, es la base de una infraestructura eficiente. Un rack saneado y etiquetado mejora la ventilación de los equipos, facilita el mantenimiento preventivo y reduce drásticamente el tiempo de respuesta ante cualquier incidencia técnica. En Entelsat, transformamos el caos en conectividad de alto rendimiento. 🌀🔧', 
        hashtags: ['#Entelsat', '#Telecomunicaciones', '#MantenimientoIT', '#Málaga'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "2", 
        platform: 'IG', 
        headline_visual: 'Gráfico comparativo Wi-Fi Hotelero vs Wi-Fi Doméstico', 
        copy: 'En el sector hospitality, el Wi-Fi ya no es un extra, es una necesidad básica para el huésped. Instalamos redes profesionales con cobertura total en cada habitación, garantizando una conexión segura, sin cortes y con gestión inteligente del ancho de banda. Elevamos la experiencia digital de tu hotel en la Costa del Sol. 🏨📶', 
        hashtags: ['#SmartHotel', '#WiFiHotelero', '#CostaDelSol', '#Conectividad'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "3", 
        platform: 'IG', 
        headline_visual: 'Placas solares en comunidad de vecinos + REQUIERE LOGO', 
        copy: '¿Sabías que una comunidad de vecinos puede reducir hasta un 60% su gasto eléctrico anual? La energía solar fotovoltaica es una inversión de alta rentabilidad que aumenta el valor de la propiedad desde el primer día. Nos encargamos de todo el proceso: desde el estudio de viabilidad hasta la instalación final. ☀️🔋', 
        hashtags: ['#EnergiaSolar', '#AhorroComunitario', '#Sostenibilidad', '#Fotovoltaica'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "4", 
        platform: 'IG', 
        headline_visual: 'Técnico de SatFrio instalando Split en salón moderno', 
        copy: 'Más de 35 años de experiencia nos avalan como líderes en climatización. Como parte del Grupo Entelsat, en SatFrio llevamos el confort real a tu hogar o negocio con instalaciones certificadas, equipos de máxima eficiencia y un servicio técnico de confianza que siempre responde. Tu bienestar es nuestra prioridad. 🌬️🏠', 
        hashtags: ['#SatFrio', '#Climatizacion', '#ConfortHogar', '#Málaga'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "5", 
        platform: 'IG', 
        headline_visual: 'Móvil mostrando app de cámaras de seguridad en tiempo real', 
        copy: 'Seguridad inteligente para la tranquilidad de tu negocio. Integramos sistemas avanzados de CCTV y control de accesos que puedes gestionar íntegramente desde tu smartphone, estés donde estés. Vigilancia en alta definición y alertas en tiempo real para que nunca pierdas el control de lo que más te importa. 🚗🔒', 
        hashtags: ['#SeguridadEmpresarial', '#CCTV', '#SmartBusiness', '#ControlAccesos'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "6", 
        platform: 'IG', 
        headline_visual: 'Gráfico de ahorro: Sistema Inverter vs Tradicional', 
        copy: 'Optimiza tu consumo sin renunciar al confort. La tecnología Inverter regula la velocidad del compresor para mantener una temperatura constante, ahorrando hasta un 40% en tu factura de luz frente a sistemas tradicionales. Menos ruido, más ahorro y mayor vida útil para tu equipo de aire acondicionado. 📉💡', 
        hashtags: ['#AhorroEnergetico', '#TecnologiaInverter', '#SatFrio', '#Eficiencia'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "7", 
        platform: 'IG', 
        headline_visual: 'Atardecer en hotel de lujo de la Costa del Sol', 
        copy: 'Orgullosos de ser el partner tecnológico estratégico de los principales hoteles de la Costa del Sol. Diseñamos e instalamos infraestructuras ICT2 que garantizan servicios de TV, datos y telefonía impecables. Tecnología que pasa desapercibida porque simplemente funciona a la perfección. 🌊🏨', 
        hashtags: ['#CostaDelSol', '#HotelesMalaga', '#ICT2', '#Entelsat'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "8", 
        platform: 'IG', 
        headline_visual: 'Filtros de aire sucios vs limpios (Primer plano)', 
        copy: '¿Notas un olor extraño al encender el aire acondicionado? Es la señal de que tus filtros necesitan atención. Un mantenimiento preventivo no solo alarga la vida de tu equipo, sino que mejora drásticamente la calidad del aire que respiras, eliminando bacterias y alérgenos de tu hogar. ¡Pide tu revisión hoy! 🛠️✨', 
        hashtags: ['#MantenimientoAire', '#AireLimpio', '#SaludHogar', '#SatFrio'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "9", 
        platform: 'IG', 
        headline_visual: 'Cables de red perfectamente peinados y etiquetados', 
        copy: 'Transformamos el caos de cables en una autopista de datos. Una red bien estructurada y saneada es sinónimo de velocidad y seguridad para tu empresa. Evita caídas de sistema innecesarias con una infraestructura profesional diseñada para escalar junto a tu negocio. El futuro de tu oficina empieza aquí. 🚀🔌', 
        hashtags: ['#SaneamientoRedes', '#InfraestructuraIT', '#EmpresasMalaga', '#Entelsat'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "10", 
        platform: 'IG', 
        headline_visual: 'Termostato digital marcando 24 grados en ambiente relajado', 
        copy: 'El confort ideal no tiene por qué ser caro. Recomendamos mantener tu aire acondicionado entre los 24°C y 26°C: es el punto de equilibrio perfecto entre bienestar térmico y consumo responsable. Pequeños hábitos en el uso de tu climatización marcan una gran diferencia en tu factura y en el planeta. 🌡️✅', 
        hashtags: ['#ConsumoResponsable', '#ConfortYBienestar', '#TipsClimatizacion', '#SatFrio'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "11", 
        platform: 'IG', 
        headline_visual: 'Furgoneta rotulada de Entelsat circulando por Málaga', 
        copy: 'Siempre en movimiento, siempre cerca de ti. Nuestro equipo de técnicos certificados recorre toda la provincia de Málaga para ofrecer soluciones rápidas en telecomunicaciones, seguridad y climatización. Profesionalidad, cercanía y la garantía de una empresa líder en el sector. 🚐💨', 
        hashtags: ['#ServicioTecnico', '#Malaga', '#Cercania', '#Instaladores'], 
        status: 'review', feedback: '', imageUrl: '' 
      },
      { 
        id: "12", 
        platform: 'IG', 
        headline_visual: 'Diseño corporativo elegante: "35 años conectando confianza"', 
        copy: 'Tres décadas y media evolucionando junto a la tecnología para ofrecerte lo mejor. Gracias por confiar en Entelsat y SatFrio para vuestros proyectos más ambiciosos, desde el hogar hasta los grandes complejos hoteleros. Celebramos 35 años conectando tecnología y, sobre todo, confianza. ¡Seguimos! 🥂🏆', 
        hashtags: ['#Aniversario', '#Trayectoria', '#Confianza', '#Entelsat'], 
        status: 'review', feedback: '', imageUrl: '' 
      }
    ]
  },
  astival: {
    name: "Astival",
    folder: "astival",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Post 1', copy: 'Cargando contenido estratégico...', hashtags: [], status: 'review', feedback: '', imageUrl: '' }
    ]
  }
};

export default function App() {
  const [clients, setClients] = useState(INITIAL_DATA);
  const [clientId, setClientId] = useState<keyof typeof INITIAL_DATA>('entelsat');
  const [isAdmin, setIsAdmin] = useState(true);

  const activeClient = clients[clientId];
  const publishedCount = activeClient.posts.filter(p => p.status === 'published').length;

  // 1. Detectar si es vista de cliente por URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/p/')) {
      const slug = path.split('/')[2] as keyof typeof INITIAL_DATA;
      if (INITIAL_DATA[slug]) {
        setClientId(slug);
        setIsAdmin(false);
      }
    }
  }, []);

  // 2. Cargar datos de Supabase
  useEffect(() => {
    const loadFromCloud = async () => {
      const { data } = await supabase.from('posts').select('*');
      if (data) {
        setClients(prev => {
          const updated = JSON.parse(JSON.stringify(prev));
          data.forEach(dbPost => {
            const [cKey, pId] = dbPost.id.split('-');
            if (updated[cKey]) {
              const idx = updated[cKey].posts.findIndex((p: any) => p.id === pId);
              if (idx !== -1) {
                updated[cKey].posts[idx] = { 
                  ...updated[cKey].posts[idx], 
                  status: dbPost.status,
                  feedback: dbPost.feedback,
                  imageUrl: dbPost.image_url 
                };
              }
            }
          });
          return updated;
        });
      }
    };
    loadFromCloud();
  }, [clientId]);

  const handleUpdatePost = async (postId: string, updates: any) => {
    const isApproving = updates.status === 'approved';
    const finalUpdates = isApproving ? { ...updates, status: 'published', feedback: '' } : updates;

    setClients(prev => ({
      ...prev,
      [clientId]: {
        ...prev[clientId],
        posts: prev[clientId].posts.map(p => p.id === postId ? { ...p, ...finalUpdates } : p)
      }
    }));

    const postActual = activeClient.posts.find(p => p.id === postId);
    await supabase.from('posts').upsert({ 
      id: `${clientId}-${postId}`, 
      status: finalUpdates.status,
      feedback: finalUpdates.feedback,
      image_url: finalUpdates.imageUrl || postActual?.imageUrl
    });

    if (isApproving) {
      const tags = postActual?.hashtags ? postActual.hashtags.join(' ') : '';
      try {
        await fetch('TU_URL_WEBHOOK_DE_MAKE', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cliente: activeClient.name,
            texto_completo: `${postActual?.copy}\n\n${tags}`,
            imagen: finalUpdates.imageUrl || postActual?.imageUrl
          })
        });
      } catch (e) { console.error("Error en auto-publicación", e); }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sans pb-20">
      {isAdmin && (
        <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase">ContentFlow</h1>
            <select 
              value={clientId} 
              onChange={(e) => setClientId(e.target.value as any)} 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg p-1.5 font-bold outline-none focus:border-[#2d6a4f]"
            >
              {Object.keys(INITIAL_DATA).map(k => (
                <option key={k} value={k}>{INITIAL_DATA[k as keyof typeof INITIAL_DATA].name}</option>
              ))}
            </select>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin: Pau Blanch Mercader</span>
        </nav>
      )}

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 border-l-4 border-[#2d6a4f] pl-4 text-left">
          <h2 className="text-3xl font-bold text-gray-900">{activeClient.name}</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
            {isAdmin ? 'Gestión de Contenidos J2' : 'Portal de Aprobación de Contenido'}
          </p>
        </div>

        {publishedCount >= 12 && (
          <div className="mb-8 bg-[#2d6a4f] text-white p-5 rounded-2xl shadow-xl flex items-center justify-between animate-pulse border-4 border-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <span className="font-black uppercase tracking-tighter text-xl text-white">¡OBJETIVO J2 CUMPLIDO! 12/12 POSTS REALIZADOS</span>
            </div>
            <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-bold uppercase">Listo para informe SEO</span>
          </div>
        )}

        <ApprovalWall 
          posts={activeClient.posts} 
          clientFolder={activeClient.folder} 
          onUpdatePost={handleUpdatePost} 
        />
      </div>
    </div>
  );
}
