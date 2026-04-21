// ARCHIVO: src/App.tsx
import { useState, useEffect } from 'react';
import ApprovalWall from './ApprovalWall';
import { supabase } from './lib/supabase';

const INITIAL_DATA = {
  entelsat: {
    name: "Entelsat Instalaciones",
    folder: "entelsat",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Infraestructura de Red', visual_prompt: 'Professional server rack, blue and black ethernet cables perfectly organized, cinematic lighting, corporate tech style.', copy: 'El orden es la base de una infraestructura eficiente. Un rack saneado mejora la ventilación y reduce incidencias técnicas. 🌀🔧', hashtags: ['#Entelsat', '#Telecomunicaciones', '#Mantenimiento'], status: 'review', feedback: '', imageUrl: '' },
      { id: "2", platform: 'IG', headline_visual: 'WiFi Hotelero', visual_prompt: 'Modern luxury hotel building at night, glowing digital WiFi signal waves covering all floors, 3d isometric illustration.', copy: 'Instalamos redes profesionales con cobertura total en cada habitación. Garantiza una conexión segura para tus huéspedes. 🏨📶', hashtags: ['#SmartHotel', '#WiFiHotelero', '#CostaDelSol'], status: 'review', feedback: '', imageUrl: '' },
      { id: "3", platform: 'IG', headline_visual: 'Placas solares', visual_prompt: 'Aerial drone shot of solar panels on a modern house roof, bright sunny day in Malaga, high contrast.', copy: '¿Sabías que una comunidad puede ahorrar hasta un 60% en luz? La energía solar es una inversión rentable desde el primer día. ☀️🔋', hashtags: ['#EnergiaSolar', '#Ahorro', '#Sostenibilidad'], status: 'review', feedback: '', imageUrl: '' },
      { id: "4", platform: 'IG', headline_visual: 'Técnico SatFrio', visual_prompt: 'Professional HVAC technician installing a white air conditioning split unit, specialized tools, natural morning light.', copy: '35 años de experiencia nos avalan. En SatFrio llevamos el confort a tu hogar con instalaciones certificadas. 🌬️🏠', hashtags: ['#SatFrio', '#Climatizacion', '#ConfortHogar'], status: 'review', feedback: '', imageUrl: '' },
      { id: "5", platform: 'IG', headline_visual: 'App Cámaras', visual_prompt: 'Close up of a hand holding a smartphone showing a CCTV security camera app interface, blurred office background.', copy: 'Seguridad inteligente para tu negocio. Controla tus sistemas de CCTV desde cualquier lugar del mundo a través de tu móvil. 🚗🔒', hashtags: ['#Seguridad', '#CCTV', '#SmartBusiness'], status: 'review', feedback: '', imageUrl: '' },
      { id: "6", platform: 'IG', headline_visual: 'Gráfico Inverter', visual_prompt: 'Clean infographic design comparing power consumption: Inverter motor vs Traditional motor, energy savings charts.', copy: 'Ahorra hasta un 40% de luz con tecnología Inverter. Más eficiencia, menos ruido y mayor vida útil para tu equipo. 📉💡', hashtags: ['#AhorroEnergetico', '#Inverter', '#SatFrio'], status: 'review', feedback: '', imageUrl: '' },
      { id: "7", platform: 'IG', headline_visual: 'Atardecer Costa Sol', visual_prompt: 'Cinematic sunset at Marbella beach, luxury hotel silhouette in the background, warm golden hour lighting.', copy: 'Partner tecnológico estratégico de los principales hoteles de la Costa del Sol. Tecnología ICT2 que inspira confianza. 🌊🏨', hashtags: ['#CostaDelSol', '#HotelesMalaga', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' },
      { id: "8", platform: 'IG', headline_visual: 'Filtros Aire', visual_prompt: 'Split screen comparison: macro of a dirty dusty air conditioner filter vs a brand new clean white filter.', copy: '¿Mal olor al encender el aire? Un mantenimiento preventivo mejora la calidad del aire y optimiza el consumo. 🛠️✨', hashtags: ['#AireLimpio', '#Salud', '#Mantenimiento'], status: 'review', feedback: '', imageUrl: '' },
      { id: "9", platform: 'IG', headline_visual: 'Cables Peinados', visual_prompt: 'Macro shot of colorful Ethernet patch cables organized in a server rack, perfect symmetry, professional IT setup.', copy: 'Transformamos el caos en conectividad. Una red bien estructurada es sinónimo de velocidad y seguridad. 🚀🔌', hashtags: ['#Redes', '#InfraestructuraIT', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' },
      { id: "10", platform: 'IG', headline_visual: 'Termostato 24º', visual_prompt: 'Minimalist smart thermostat on a grey wall showing 24 degrees celsius, soft shadows, modern interior.', copy: 'El confort ideal está entre 24°C y 26°C. Un uso responsable te permite disfrutar del verano sin sorpresas. 🌡️✅', hashtags: ['#ConsumoResponsable', '#Confort', '#SatFrio'], status: 'review', feedback: '', imageUrl: '' },
      { id: "11", platform: 'IG', headline_visual: 'Furgoneta Málaga', visual_prompt: 'White commercial van with corporate branding driving through a sunny Malaga street with palm trees.', copy: 'Equipo técnico profesional siempre cerca de ti en toda la provincia de Málaga. Soluciones rápidas y eficaces. 🚐💨', hashtags: ['#Malaga', '#ServicioTecnico', '#Cercania'], status: 'review', feedback: '', imageUrl: '' },
      { id: "12", platform: 'IG', headline_visual: '35 Aniversario', visual_prompt: 'Elegant corporate celebration background, number 35 in 3D gold, dark blue silk texture, particles of light.', copy: '35 años conectando tecnología y confianza. Gracias por dejarnos formar parte de vuestros proyectos. 🥂🏆', hashtags: ['#Aniversario', '#Trayectoria', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' }
    ]
  },
  astival: {
    name: "Astival",
    folder: "astival",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Oficinas Astival', visual_prompt: 'Modern glass corporate building facade, blue sky reflection, professional business environment.', copy: 'En Astival, la excelencia es nuestro estándar diario. Trabajamos para ofrecer soluciones integrales que impulsan tu negocio. 🚀', hashtags: ['#Astival', '#Excelencia', '#Empresa'], status: 'review', feedback: '', imageUrl: '' },
      { id: "2", platform: 'IG', headline_visual: 'Gráfico SEO', visual_prompt: 'Minimalist chart showing upward growth of organic traffic, green and white colors, tech style.', copy: 'Optimización digital para que tus clientes te encuentren primero. Lideramos tu posicionamiento en buscadores. 📈', hashtags: ['#SEO', '#MarketingDigital', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "3", platform: 'IG', headline_visual: 'Reunión Equipo', visual_prompt: 'Diverse professional team in a modern boardroom discussing strategy, bright and clean photography.', copy: 'La clave del éxito es la estrategia. Analizamos cada detalle para convertir desafíos en oportunidades reales. 🤝', hashtags: ['#Estrategia', '#Negocios', '#Equipo'], status: 'review', feedback: '', imageUrl: '' },
      { id: "4", platform: 'IG', headline_visual: 'Iconos Servicios', visual_prompt: 'Abstract representation of business services, clean icons on a professional background.', copy: 'Descubre nuestra gama de servicios diseñados para simplificar la operativa de tu empresa. Eficacia garantizada. 🛠️', hashtags: ['#Astival', '#Soluciones', '#Industria'], status: 'review', feedback: '', imageUrl: '' },
      { id: "5", platform: 'IG', headline_visual: 'Análisis Datos', visual_prompt: 'Close up of data analytics on a high-res tablet screen, person analyzing charts, corporate bokeh.', copy: 'Tomamos decisiones basadas en métricas reales. Garantizamos el máximo retorno de inversión para nuestros partners. 📊', hashtags: ['#DataAnalysis', '#Métricas', '#SEO'], status: 'review', feedback: '', imageUrl: '' },
      { id: "6", platform: 'IG', headline_visual: 'Logo Ciudad', visual_prompt: 'Cityscape at dawn with a clean overlay of a corporate logo, concept of growth and commitment.', copy: 'Comprometidos con el desarrollo de nuestro entorno. Miramos al futuro con la confianza de la experiencia. 🌍', hashtags: ['#Astival', '#Futuro', '#Compromiso'], status: 'review', feedback: '', imageUrl: '' },
      { id: "7", platform: 'IG', headline_visual: 'Lunes Planificación', visual_prompt: 'Coffee cup and laptop on an organized desk, morning light, concept of weekly planning.', copy: 'Empezamos la semana con el foco puesto en los resultados. Transparencia total en cada informe mensual. ☕', hashtags: ['#Planificación', '#SEOReport', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "8", platform: 'IG', headline_visual: 'Gráfico Crecimiento', visual_prompt: '3D bar chart growing upwards, vibrant corporate colors, high resolution.', copy: 'Tu éxito es nuestra mejor métrica. Ayudamos a empresas a escalar sus resultados con soluciones a medida. 🔝', hashtags: ['#Escalabilidad', '#Crecimiento', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "9", platform: 'IG', headline_visual: 'Apretón Manos', visual_prompt: 'Close up of two business professionals shaking hands, formal attire, professional lighting.', copy: 'Más que proveedores, somos socios. Construimos relaciones basadas en resultados tangibles y honestidad. 🤝', hashtags: ['#Partnership', '#Confianza', '#B2B'], status: 'review', feedback: '', imageUrl: '' },
      { id: "10", platform: 'IG', headline_visual: 'Google Search', visual_prompt: 'Clean browser window showing a search result at the top, high visibility concept.', copy: 'Estar en internet es obligatorio, ser relevante es una elección. Deja tu visibilidad en manos expertas. 💻', hashtags: ['#Visibilidad', '#Google', '#SEO'], status: 'review', feedback: '', imageUrl: '' },
      { id: "11", platform: 'IG', headline_visual: 'Oficina Moderna', visual_prompt: 'Wide shot of a contemporary open-plan office, glass walls, natural light, innovation vibes.', copy: 'Innovación constante. Adaptamos nuestras metodologías a las últimas tendencias del mercado. 💡', hashtags: ['#Innovación', '#Tendencias', '#Astival'], status: 'review', feedback: '', imageUrl: '' },
      { id: "12", platform: 'IG', headline_visual: 'Hito J2', visual_prompt: 'Champagne glasses toast in a professional setting, celebration of success, elegant style.', copy: 'Completamos el ciclo de 12 posts para la Fase J2 con la satisfacción del trabajo bien hecho. ¡Seguimos! 🥂', hashtags: ['#KitDigital', '#J2', '#Astival'], status: 'review', feedback: '', imageUrl: '' }
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
      if (INITIAL_DATA[slug]) { setClientId(slug); setIsAdmin(false); }
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
      image_url: finalUpdates.imageUrl || postActual?.imageUrl,
      hashtags: postActual?.hashtags
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
          <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase text-xl italic">Portal de Aprobación</h1>
        </nav>
      )}

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 border-l-4 border-[#2d6a4f] pl-4 text-left">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">{activeClient.name}</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Fase J2 — Justificación Kit Digital</p>
        </div>

        {publishedCount >= 12 && (
          <div className="mb-8 bg-[#2d6a4f] text-white p-6 rounded-2xl shadow-xl flex items-center justify-between border-4 border-white animate-pulse">
            <span className="font-black uppercase text-xl">✅ ¡OBJETIVO J2 CUMPLIDO! 12/12 POSTS REALIZADOS</span>
          </div>
        )}

        <ApprovalWall posts={activeClient.posts} clientFolder={activeClient.folder} onUpdatePost={handleUpdatePost} />
      </div>
    </div>
  );
}
