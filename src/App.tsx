import { useState, useEffect } from 'react';
import ApprovalWall from './ApprovalWall';
import { supabase } from './lib/supabase';

const INITIAL_DATA = {
  entelsat: {
    name: "Entelsat Instalaciones",
    folder: "entelsat",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Rack impecable + REQUIERE LOGO', copy: 'El orden es la base de una infraestructura eficiente. Un rack saneado mejora la ventilación y reduce incidencias técnicas. 🌀🔧', hashtags: ['#Entelsat', '#IT', '#Mantenimiento'], status: 'review', feedback: '', imageUrl: '' },
      { id: "2", platform: 'IG', headline_visual: 'WiFi Hotelero', copy: 'Instalamos redes profesionales con cobertura total en cada habitación. Garantiza una conexión segura y sin cortes para tus huéspedes. 🏨📶', hashtags: ['#SmartHotel', '#WiFiHotelero', '#CostaDelSol'], status: 'review', feedback: '', imageUrl: '' },
      { id: "3", platform: 'IG', headline_visual: 'Placas solares + REQUIERE LOGO', copy: '¿Sabías que una comunidad puede ahorrar hasta un 60% en luz? La energía solar es una inversión rentable desde el primer día. ☀️🔋', hashtags: ['#EnergiaSolar', '#Ahorro', '#Sostenibilidad'], status: 'review', feedback: '', imageUrl: '' },
      { id: "4", platform: 'IG', headline_visual: 'Técnico SatFrio', copy: '35 años de experiencia nos avalan. En SatFrio llevamos el confort a tu hogar con instalaciones certificadas y garantía total. 🌬️🏠', hashtags: ['#SatFrio', '#Climatizacion', '#ConfortHogar'], status: 'review', feedback: '', imageUrl: '' },
      { id: "5", platform: 'IG', headline_visual: 'App Cámaras', copy: 'Seguridad inteligente para tu negocio. Controla tus sistemas de CCTV desde cualquier lugar del mundo a través de tu móvil. 🚗🔒', hashtags: ['#Seguridad', '#CCTV', '#SmartBusiness'], status: 'review', feedback: '', imageUrl: '' },
      { id: "6", platform: 'IG', headline_visual: 'Gráfico Inverter', copy: 'Ahorra hasta un 40% de luz con tecnología Inverter. Más eficiencia, menos ruido y mayor vida útil para tu equipo. 📉💡', hashtags: ['#AhorroEnergetico', '#Inverter', '#SatFrio'], status: 'review', feedback: '', imageUrl: '' },
      { id: "7", platform: 'IG', headline_visual: 'Atardecer Costa del Sol', copy: 'Orgullosos de ser el partner tecnológico de los principales hoteles de la Costa del Sol. Tecnología ICT2 de confianza. 🌊🏨', hashtags: ['#CostaDelSol', '#Hoteles', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' },
      { id: "8", platform: 'IG', headline_visual: 'Filtros Aire', copy: '¿Mal olor al encender el aire? Un mantenimiento preventivo mejora la calidad del aire que respiras y optimiza el consumo. 🛠️✨', hashtags: ['#AireLimpio', '#Salud', '#Mantenimiento'], status: 'review', feedback: '', imageUrl: '' },
      { id: "9", platform: 'IG', headline_visual: 'Cables Peinados', copy: 'Transformamos el caos en conectividad. Una red bien estructurada es sinónimo de velocidad y seguridad para tu empresa. 🚀🔌', hashtags: ['#Redes', '#InfraestructuraIT', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' },
      { id: "10", platform: 'IG', headline_visual: 'Termostato 24º', copy: 'El confort ideal está entre 24°C y 26°C. Un uso responsable te permite disfrutar del verano sin sorpresas en la factura. 🌡️✅', hashtags: ['#ConsumoResponsable', '#Confort', '#SatFrio'], status: 'review', feedback: '', imageUrl: '' },
      { id: "11", platform: 'IG', headline_visual: 'Furgoneta Málaga', copy: 'Siempre cerca de ti. Nuestro equipo técnico recorre toda la provincia para ofrecer soluciones rápidas y profesionales. 🚐💨', hashtags: ['#Malaga', '#ServicioTecnico', '#Cercania'], status: 'review', feedback: '', imageUrl: '' },
      { id: "12", platform: 'IG', headline_visual: '35 Aniversario', copy: '35 años conectando tecnología y confianza. Gracias por dejarnos formar parte de vuestros proyectos más ambiciosos. 🥂🏆', hashtags: ['#Aniversario', '#Trayectoria', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' }
    ]
  },
  astival: {
    name: "Astival",
    folder: "astival",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Oficinas Astival + LOGO', copy: 'En Astival, la excelencia es nuestro estándar diario. Trabajamos para ofrecer soluciones integrales que impulsan tu negocio. 🚀', hashtags: ['#Astival', '#Excelencia', '#Empresa'], status: 'review', feedback: '', imageUrl: '' },
      { id: "2", platform: 'IG', headline_visual: 'Gráfico SEO', copy: 'Optimización digital para que tus clientes te encuentren primero. Lideramos tu posicionamiento en buscadores. 📈', hashtags: ['#SEO', '#MarketingDigital', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "3", platform: 'IG', headline_visual: 'Reunión Equipo', copy: 'La clave del éxito es la estrategia. Analizamos cada detalle para convertir desafíos en oportunidades reales. 🤝', hashtags: ['#Estrategia', '#Negocios', '#Equipo'], status: 'review', feedback: '', imageUrl: '' },
      { id: "4", platform: 'IG', headline_visual: 'Iconos Servicios + LOGO', copy: 'Descubre nuestra gama de servicios diseñados para simplificar la operativa de tu empresa. Eficacia garantizada. 🛠️', hashtags: ['#Astival', '#Soluciones', '#Industria'], status: 'review', feedback: '', imageUrl: '' },
      { id: "5", platform: 'IG', headline_visual: 'Análisis Datos', copy: 'Tomamos decisiones basadas en métricas reales. Garantizamos el máximo retorno de inversión para nuestros partners. 📊', hashtags: ['#DataAnalysis', '#Métricas', '#SEO'], status: 'review', feedback: '', imageUrl: '' },
      { id: "6", platform: 'IG', headline_visual: 'Logo Ciudad + LOGO', copy: 'Comprometidos con el desarrollo de nuestro entorno. Miramos al futuro con la confianza de la experiencia. 🌍', hashtags: ['#Astival', '#Futuro', '#Compromiso'], status: 'review', feedback: '', imageUrl: '' },
      { id: "7", platform: 'IG', headline_visual: 'Lunes Planificación', copy: 'Empezamos la semana con el foco puesto en los resultados. Transparencia total en cada informe mensual. ☕', hashtags: ['#Planificación', '#SEOReport', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "8", platform: 'IG', headline_visual: 'Gráfico Crecimiento + LOGO', copy: 'Tu éxito es nuestra mejor métrica. Ayudamos a empresas a escalar sus resultados con soluciones a medida. 🔝', hashtags: ['#Escalabilidad', '#Crecimiento', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "9", platform: 'IG', headline_visual: 'Apretón Manos', copy: 'Más que proveedores, somos socios. Construimos relaciones basadas en resultados tangibles y honestidad. 🤝', hashtags: ['#Partnership', '#Confianza', '#B2B'], status: 'review', feedback: '', imageUrl: '' },
      { id: "10", platform: 'IG', headline_visual: 'Google Search', copy: 'Estar en internet es obligatorio, ser relevante es una elección. Deja tu visibilidad en manos expertas. 💻', hashtags: ['#Visibilidad', '#Google', '#SEO'], status: 'review', feedback: '', imageUrl: '' },
      { id: "11", platform: 'IG', headline_visual: 'Oficina Moderna', copy: 'Innovación constante. Adaptamos nuestras metodologías a las últimas tendencias para que nunca te quedes atrás. 💡', hashtags: ['#Innovación', '#Tendencias', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "12", platform: 'IG', headline_visual: 'Hito J2 + LOGO', copy: 'Completamos el ciclo de 12 posts para la Fase J2 con la satisfacción del trabajo bien hecho. ¡Seguimos! 🥂', hashtags: ['#KitDigital', '#J2', '#Astival'], status: 'review', feedback: '', imageUrl: '' }
    ]
  }
};

export default function App() {
  const [clients, setClients] = useState(INITIAL_DATA);
  const [clientId, setClientId] = useState<keyof typeof INITIAL_DATA>('entelsat');
  const [isAdmin, setIsAdmin] = useState(true);

  const activeClient = clients[clientId];
  const publishedCount = activeClient.posts.filter(p => p.status === 'published').length;

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
                updated[cKey].posts[idx] = { ...updated[cKey].posts[idx], ...dbPost, imageUrl: dbPost.image_url };
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
  };

  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sans pb-20">
      {isAdmin ? (
        <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase">ContentFlow</h1>
            <select value={clientId} onChange={(e) => setClientId(e.target.value as any)} className="border p-1.5 rounded-lg text-sm font-bold outline-none focus:border-[#2d6a4f]">
              {Object.keys(INITIAL_DATA).map(k => <option key={k} value={k}>{INITIAL_DATA[k as keyof typeof INITIAL_DATA].name}</option>)}
            </select>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin: Pau Blanch Mercader</span>
        </nav>
      ) : (
        <nav className="bg-white border-b p-4 flex justify-center items-center sticky top-0 z-50 shadow-sm">
          <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase">Portal de Aprobación</h1>
        </nav>
      )}

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 border-l-4 border-[#2d6a4f] pl-4 text-left">
          <h2 className="text-3xl font-bold text-gray-900">{activeClient.name}</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Justificación Kit Digital — Fase J2</p>
        </div>

        {publishedCount >= 12 && (
          <div className="mb-8 bg-[#2d6a4f] text-white p-5 rounded-2xl shadow-xl flex items-center justify-between border-4 border-white animate-pulse">
            <span className="font-black uppercase text-xl text-white">✅ ¡OBJETIVO J2 CUMPLIDO! 12/12 POSTS REALIZADOS</span>
          </div>
        )}

        <ApprovalWall posts={activeClient.posts} clientFolder={activeClient.folder} onUpdatePost={handleUpdatePost} />
      </div>
    </div>
  );
}
