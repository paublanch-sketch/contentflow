import { useState, useEffect } from 'react';
import ApprovalWall from './ApprovalWall';
import { supabase } from './lib/supabase';

const INITIAL_DATA = {
  entelsat: {
    name: "Entelsat Instalaciones",
    folder: "entelsat",
    posts: [
      { 
        id: "1", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Rack impecable', 
        visual_prompt: 'Professional server rack, blue and black ethernet cables perfectly organized with cable ties, cinematic data center lighting, 8k resolution, corporate tech style.',
        copy: 'El orden es la base de una infraestructura eficiente. Un rack saneado mejora la ventilación y reduce incidencias técnicas. 🌀🔧', 
        hashtags: ['#Entelsat', '#IT', '#Mantenimiento'] 
      },
      { 
        id: "2", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'WiFi Hotelero', 
        visual_prompt: 'Modern luxury hotel building at night, glowing digital WiFi signal waves covering all floors, 3d isometric illustration, tech blue colors.',
        copy: 'Instalamos redes profesionales con cobertura total en cada habitación. Garantiza una conexión segura para tus huéspedes. 🏨📶', 
        hashtags: ['#SmartHotel', '#WiFiHotelero', '#CostaDelSol'] 
      },
      { 
        id: "3", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Placas solares', 
        visual_prompt: 'Aerial drone shot of solar panels on a modern house roof, bright sunny day in Malaga, Mediterranean architecture, high contrast, realistic.',
        copy: '¿Sabías que una comunidad puede ahorrar hasta un 60% en luz? La energía solar es una inversión rentable desde el primer día. ☀️🔋', 
        hashtags: ['#EnergiaSolar', '#Ahorro', '#Sostenibilidad'] 
      },
      { 
        id: "4", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Técnico SatFrio', 
        visual_prompt: 'Professional HVAC technician installing a white air conditioning split unit on a living room wall, specialized tools, natural morning light, realistic photography.',
        copy: '35 años de experiencia nos avalan. En SatFrio llevamos el confort a tu hogar con instalaciones certificadas. 🌬️🏠', 
        hashtags: ['#SatFrio', '#Climatizacion', '#ConfortHogar'] 
      },
      { 
        id: "5", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'App Cámaras', 
        visual_prompt: 'Close up of a hand holding a smartphone showing a CCTV security camera app interface, blurred modern office background, sharp focus on screen.',
        copy: 'Seguridad inteligente para tu negocio. Controla tus sistemas de CCTV desde cualquier lugar del mundo a través de tu móvil. 🚗🔒', 
        hashtags: ['#Seguridad', '#CCTV', '#SmartBusiness'] 
      },
      { 
        id: "6", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Gráfico Inverter', 
        visual_prompt: 'Clean infographic design comparing power consumption: Inverter motor vs Traditional motor, green energy savings charts, minimalist style.',
        copy: 'Ahorra hasta un 40% de luz con tecnología Inverter. Más eficiencia, menos ruido y mayor vida útil para tu equipo. 📉💡', 
        hashtags: ['#AhorroEnergetico', '#Inverter', '#SatFrio'] 
      },
      { 
        id: "7", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Atardecer Costa Sol', 
        visual_prompt: 'Cinematic sunset at Marbella beach, luxury hotel silhouette in the background, warm golden hour lighting, high-end travel photography.',
        copy: 'Partner tecnológico estratégico de los principales hoteles de la Costa del Sol. Tecnología ICT2 que inspira confianza. 🌊🏨', 
        hashtags: ['#CostaDelSol', '#HotelesMalaga', '#Entelsat'] 
      },
      { 
        id: "8", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Filtros Aire', 
        visual_prompt: 'Split screen comparison: macro of a dirty dusty air conditioner filter vs a brand new clean white filter, health and hygiene concept.',
        copy: '¿Mal olor al encender el aire? Un mantenimiento preventivo mejora la calidad del aire y optimiza el consumo. 🛠️✨', 
        hashtags: ['#AireLimpio', '#Salud', '#Mantenimiento'] 
      },
      { 
        id: "9", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Cables Peinados', 
        visual_prompt: 'Macro shot of colorful Ethernet patch cables organized in a server rack, perfect symmetry, shallow depth of field, professional IT setup.',
        copy: 'Transformamos el caos en conectividad. Una red bien estructurada es sinónimo de velocidad y seguridad. 🚀🔌', 
        hashtags: ['#Redes', '#InfraestructuraIT', '#Entelsat'] 
      },
      { 
        id: "10", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Termostato 24º', 
        visual_prompt: 'Minimalist smart thermostat on a grey wall showing 24 degrees celsius, soft shadows, modern interior design style.',
        copy: 'El confort ideal está entre 24°C y 26°C. Un uso responsable te permite disfrutar del verano sin sorpresas en la factura. 🌡️✅', 
        hashtags: ['#ConsumoResponsable', '#Confort', '#SatFrio'] 
      },
      { 
        id: "11", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: 'Furgoneta Málaga', 
        visual_prompt: 'White commercial van with corporate branding driving through a sunny Malaga street with palm trees, bright daylight, realistic.',
        copy: 'Equipo técnico profesional siempre cerca de ti en toda la provincia de Málaga. Soluciones rápidas y eficaces. 🚐💨', 
        hashtags: ['#Malaga', '#ServicioTecnico', '#Cercania'] 
      },
      { 
        id: "12", platform: 'IG', status: 'review', feedback: '', imageUrl: '',
        headline_visual: '35 Aniversario', 
        visual_prompt: 'Elegant corporate celebration background, number 35 in 3D gold, dark blue silk texture, particles of light, premium awards style.',
        copy: '35 años conectando tecnología y confianza. Gracias por dejarnos formar parte de vuestros proyectos. 🥂🏆', 
        hashtags: ['#Aniversario', '#Trayectoria', '#Entelsat'] 
      }
    ]
  },
  astival: {
    name: "Astival",
    folder: "astival",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Oficinas Astival', visual_prompt: 'Modern glass corporate building facade, blue sky reflection, professional business environment.', copy: 'En Astival, la excelencia es nuestro estándar diario. 🚀', hashtags: ['#Astival', '#Empresa'], status: 'review', feedback: '', imageUrl: '' }
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


