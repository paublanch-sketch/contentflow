import { useState, useEffect } from 'react';
import ApprovalWall from './ApprovalWall';
import { supabase } from './lib/supabase';

const INITIAL_DATA = {
  entelsat: {
    name: "Entelsat Instalaciones",
    folder: "entelsat",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Rack impecable', visual_prompt: 'Foto realista de un rack de servidores perfectamente ordenado con cables azules y negros, iluminación LED profesional, estilo tech limpio.', copy: 'El orden es la base de una infraestructura eficiente. Un rack saneado mejora la ventilación y reduce incidencias técnicas. 🌀🔧', hashtags: ['#Entelsat', '#IT', '#Mantenimiento'], status: 'review', feedback: '', imageUrl: '' },
      { id: "2", platform: 'IG', headline_visual: 'WiFi Hotelero', visual_prompt: 'Ilustración 3D de un hotel moderno con ondas de señal WiFi cubriendo todas las habitaciones, ambiente premium.', copy: 'Instalamos redes profesionales con cobertura total en cada habitación. Garantiza una conexión segura para tus huéspedes. 🏨📶', hashtags: ['#SmartHotel', '#WiFiHotelero', '#CostaDelSol'], status: 'review', feedback: '', imageUrl: '' },
      { id: "3", platform: 'IG', headline_visual: 'Placas solares', visual_prompt: 'Vista aérea de paneles solares en un tejado residencial bajo el sol de Málaga, alta definición.', copy: '¿Sabías que una comunidad puede ahorrar hasta un 60% en luz? La energía solar es una inversión rentable desde el primer día. ☀️🔋', hashtags: ['#EnergiaSolar', '#Ahorro', '#Sostenibilidad'], status: 'review', feedback: '', imageUrl: '' },
      { id: "4", platform: 'IG', headline_visual: 'Técnico SatFrio', visual_prompt: 'Técnico instalando un aire acondicionado split en una pared blanca, herramientas a la vista, luz natural.', copy: '35 años de experiencia nos avalan. En SatFrio llevamos el confort a tu hogar con instalaciones certificadas. 🌬️🏠', hashtags: ['#SatFrio', '#Climatizacion', '#ConfortHogar'], status: 'review', feedback: '', imageUrl: '' },
      { id: "5", platform: 'IG', headline_visual: 'App Cámaras', visual_prompt: 'Mano sosteniendo móvil con una app de seguridad CCTV abierta, fondo de oficina moderna desenfocado.', copy: 'Seguridad inteligente para tu negocio. Controla tus sistemas de CCTV desde cualquier lugar del mundo a través de tu móvil. 🚗🔒', hashtags: ['#Seguridad', '#CCTV', '#SmartBusiness'], status: 'review', feedback: '', imageUrl: '' },
      { id: "6", platform: 'IG', headline_visual: 'Gráfico Inverter', visual_prompt: 'Infografía comparativa de consumo energético: Motor Inverter vs Tradicional, colores verde y rojo.', copy: 'Ahorra hasta un 40% de luz con tecnología Inverter. Más eficiencia, menos ruido y mayor vida útil para tu equipo. 📉💡', hashtags: ['#AhorroEnergetico', '#Inverter', '#SatFrio'], status: 'review', feedback: '', imageUrl: '' },
      { id: "7", platform: 'IG', headline_visual: 'Atardecer Costa Sol', visual_prompt: 'Playa de Málaga al atardecer con un hotel de lujo en el horizonte, estilo fotográfico de alta gama.', copy: 'Partner tecnológico de los principales hoteles de la Costa del Sol. Tecnología ICT2 que inspira confianza. 🌊🏨', hashtags: ['#CostaDelSol', '#HotelesMalaga', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' },
      { id: "8", platform: 'IG', headline_visual: 'Filtros Aire', visual_prompt: 'Close-up de un filtro de aire acondicionado limpio vs uno sucio, resaltando la higiene.', copy: '¿Mal olor al encender el aire? Un mantenimiento preventivo mejora la calidad del aire y optimiza el consumo. 🛠️✨', hashtags: ['#AireLimpio', '#Salud', '#Mantenimiento'], status: 'review', feedback: '', imageUrl: '' },
      { id: "9", platform: 'IG', headline_visual: 'Cables Peinados', visual_prompt: 'Macro de conectores Ethernet organizados en un panel de parcheo, orden milimétrico.', copy: 'Transformamos el caos en conectividad. Una red bien estructurada es sinónimo de velocidad y seguridad. 🚀🔌', hashtags: ['#Redes', '#InfraestructuraIT', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' },
      { id: "10", platform: 'IG', headline_visual: 'Termostato 24º', visual_prompt: 'Termostato digital en una pared minimalista marcando 24 grados centígrados, luz suave.', copy: 'El confort ideal está entre 24°C y 26°C. Un uso responsable te permite disfrutar del verano sin sorpresas en la factura. 🌡️✅', hashtags: ['#ConsumoResponsable', '#Confort', '#SatFrio'], status: 'review', feedback: '', imageUrl: '' },
      { id: "11", platform: 'IG', headline_visual: 'Furgoneta Málaga', visual_prompt: 'Furgoneta de servicio técnico rotulada circulando por una calle con palmeras en Málaga.', copy: 'Equipo técnico profesional siempre cerca de ti en toda la provincia de Málaga. Soluciones rápidas y eficaces. 🚐💨', hashtags: ['#Malaga', '#ServicioTecnico', '#Cercania'], status: 'review', feedback: '', imageUrl: '' },
      { id: "12", platform: 'IG', headline_visual: '35 Aniversario', visual_prompt: 'Diseño elegante conmemorativo del 35 aniversario, colores azul y dorado, estilo corporativo.', copy: '35 años conectando tecnología y confianza. Gracias por dejarnos formar parte de vuestros proyectos. 🥂🏆', hashtags: ['#Aniversario', '#Trayectoria', '#Entelsat'], status: 'review', feedback: '', imageUrl: '' }
    ]
  },
  astival: {
    name: "Astival",
    folder: "astival",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Oficinas Astival', visual_prompt: 'Foto de fachada de edificio corporativo moderno con cristaleras.', copy: 'En Astival, la excelencia es nuestro estándar diario. 🚀', hashtags: ['#Astival', '#Empresa'], status: 'review', feedback: '', imageUrl: '' }
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
            <select value={clientId} onChange={(e) => setClientId(e.target.value as any)} className="border p-1 rounded text-sm font-bold">
              {Object.keys(INITIAL_DATA).map(k => <option key={k} value={k}>{INITIAL_DATA[k as keyof typeof INITIAL_DATA].name}</option>)}
            </select>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">Admin: Pau Blanch Mercader</span>
        </nav>
      ) : (
        <nav className="bg-white border-b p-4 flex justify-center items-center sticky top-0 z-50 shadow-sm">
          <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase">Portal de Aprobación</h1>
        </nav>
      )}

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 border-l-4 border-[#2d6a4f] pl-4 text-left">
          <h2 className="text-3xl font-bold text-gray-900 leading-none">{activeClient.name}</h2>
          <p className="text-gray-500 text-xs mt-2 font-bold uppercase tracking-widest">Justificación Kit Digital — Fase J2</p>
        </div>

        {publishedCount >= 12 && (
          <div className="mb-8 bg-[#2d6a4f] text-white p-5 rounded-2xl shadow-xl flex items-center justify-between border-4 border-white animate-bounce">
            <span className="font-black uppercase text-xl text-white">✅ ¡OBJETIVO J2 CUMPLIDO! 12/12 POSTS REALIZADOS</span>
          </div>
        )}

        <ApprovalWall posts={activeClient.posts} clientFolder={activeClient.folder} onUpdatePost={handleUpdatePost} />
      </div>
    </div>
  );
}


