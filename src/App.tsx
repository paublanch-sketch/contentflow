import { useState, useEffect } from 'react';
import ApprovalWall from './ApprovalWall';
import { supabase } from './lib/supabase';

const INITIAL_DATA = {
  entelsat: {
    name: "Entelsat Instalaciones",
    folder: "entelsat",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Rack impecable', copy: 'El orden es eficiencia...', hashtags: [] },
      { id: "2", platform: 'IG', headline_visual: 'WiFi Hotelero', copy: 'WiFi profesional...', hashtags: [] },
      { id: "3", platform: 'IG', headline_visual: 'Placas solares', copy: 'Ahorro energético...', hashtags: [] },
      { id: "4", platform: 'IG', headline_visual: 'Técnico SatFrio', copy: 'Instalación certificada...', hashtags: [] },
      { id: "5", platform: 'IG', headline_visual: 'App Cámaras', copy: 'Seguridad total...', hashtags: [] },
      { id: "6", platform: 'IG', headline_visual: 'Gráfico Inverter', copy: 'Ahorra un 40%...', hashtags: [] },
      { id: "7", platform: 'IG', headline_visual: 'Hotel Costa Sol', copy: 'Partner tecnológico...', hashtags: [] },
      { id: "8", platform: 'IG', headline_visual: 'Filtros Aire', copy: 'Mantenimiento preventivo...', hashtags: [] },
      { id: "9", platform: 'IG', headline_visual: 'Cables Peinados', copy: 'Orden y velocidad...', hashtags: [] },
      { id: "10", platform: 'IG', headline_visual: 'Termostato 24º', copy: 'Confort ideal...', hashtags: [] },
      { id: "11", platform: 'IG', headline_visual: 'Furgoneta Málaga', copy: 'Cerca de ti...', hashtags: [] },
      { id: "12", platform: 'IG', headline_visual: '35 Aniversario', copy: 'Conectando confianza...', hashtags: [] }
    ]
  },
  astival: {
    name: "Astival",
    folder: "astival",
    posts: [
      { id: "1", platform: 'IG', headline_visual: 'Post Astival 1', copy: 'Texto Astival...', hashtags: [] },
      // ... añadir el resto de posts para Astival
    ]
  }
};

export default function App() {
  const [clients, setClients] = useState(INITIAL_DATA);
  const [clientId, setClientId] = useState<keyof typeof INITIAL_DATA>('entelsat');
  const [isAdmin, setIsAdmin] = useState(true);

  // DETECTAR CLIENTE POR URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/p/')) {
      const slug = path.split('/')[2] as keyof typeof INITIAL_DATA;
      if (INITIAL_DATA[slug]) {
        setClientId(slug);
        setIsAdmin(false); // Si entra por /p/ ocultamos el selector
      }
    }
  }, []);

  // CARGAR DESDE SUPABASE
  useEffect(() => {
    const loadFromCloud = async () => {
      const { data } = await supabase.from('posts').select('*');
      if (data) {
        setClients(prev => {
          const updated = JSON.parse(JSON.stringify(prev));
          data.forEach(dbPost => {
            // El ID en la DB debe ser "entelsat-1" para no chocar
            const [clientKey, postId] = dbPost.id.split('-');
            if (updated[clientKey]) {
              const index = updated[clientKey].posts.findIndex((p: any) => p.id === postId);
              if (index !== -1) {
                updated[clientKey].posts[index] = {
                  ...updated[clientKey].posts[index],
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
    // 1. UI local
    setClients(prev => ({
      ...prev,
      [clientId]: {
        ...prev[clientId],
        posts: prev[clientId].posts.map(p => p.id === postId ? { ...p, ...updates } : p)
      }
    }));

    // 2. Nube (Usamos ID compuesto: entelsat-1)
    const dbId = `${clientId}-${postId}`;
    const postActual = clients[clientId].posts.find(p => p.id === postId);
    
    await supabase.from('posts').upsert({ 
      id: dbId, 
      status: updates.status || postActual?.status || 'review',
      feedback: updates.feedback !== undefined ? updates.feedback : (postActual?.feedback || ''),
      image_url: updates.imageUrl || postActual?.imageUrl || ''
    });
  };

  const active = clients[clientId];

  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sans">
      {/* Selector solo para Pau (Admin) */}
      {isAdmin && (
        <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-[#2d6a4f]">CONTENTFLOW</h1>
            <select 
              value={clientId} 
              onChange={(e) => setClientId(e.target.value as any)}
              className="border p-1 rounded text-sm"
            >
              {Object.keys(INITIAL_DATA).map(key => (
                <option key={key} value={key}>{INITIAL_DATA[key as keyof typeof INITIAL_DATA].name}</option>
              ))}
            </select>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">Admin: Pau Blanch</span>
        </nav>
      )}

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 border-l-4 border-[#2d6a4f] pl-4 text-left">
          <h2 className="text-3xl font-bold text-gray-900">{active.name}</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            {isAdmin ? 'Panel de Control' : 'Portal de Aprobación de Contenido'}
          </p>
        </div>

        <ApprovalWall 
          posts={active.posts} 
          clientFolder={active.folder}
          onUpdatePost={handleUpdatePost} 
        />
      </div>
    </div>
  );
}

