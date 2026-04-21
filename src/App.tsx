// ARCHIVO: src/App.tsx
import { useState, useEffect } from 'react';
import ApprovalWall from './ApprovalWall';
import { supabase } from './lib/supabase';
import clientsData from './clients.json';

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type PostStatus = 'review' | 'approved' | 'changes' | 'scheduling' | 'scheduled';

export type Post = {
  id: string;           // e.g. "entelsat-instalaciones-1"
  client_id: string;
  post_number: number;
  platform: string;     // 'IG' | 'LI'
  headline_visual: string;
  visual_prompt: string;
  copy: string;
  hashtags: string[];
  status: PostStatus;
  feedback: string;
  image_url: string;
  webhook_sent_at: string | null;
};

export type Client = {
  id: string;
  name: string;
  platform: string;
  estado: string;
  stage: string;
  tecnico: string;
  contact: string;
  email: string;
  profile_url: string;
  folder: string;
  notes: string;
};

// ─── Fuente de verdad de clientes (generado por generate_clients_json.py) ─────
const CLIENTS: Client[] = clientsData as Client[];

// ─── Componente principal ─────────────────────────────────────────────────────
export default function App() {
  const [clientId, setClientId]   = useState<string>('');
  const [posts, setPosts]         = useState<Post[]>([]);
  const [loading, setLoading]     = useState(false);
  const [isAdmin, setIsAdmin]     = useState(true);

  // ── Detectar ruta /p/:slug para portal de aprobación del cliente ──
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/p/')) {
      const slug = path.split('/')[2];
      const found = CLIENTS.find(c => c.id === slug);
      if (found) {
        setClientId(found.id);
        setIsAdmin(false);
        return;
      }
    }
    if (CLIENTS.length > 0) setClientId(CLIENTS[0].id);
  }, []);

  // ── Cargar posts desde Supabase cuando cambia el cliente ──
  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;

    const loadPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('client_id', clientId)
        .order('post_number', { ascending: true });

      if (!cancelled) {
        if (!error && data) setPosts(data as Post[]);
        else setPosts([]);
        setLoading(false);
      }
    };

    loadPosts();
    return () => { cancelled = true; };
  }, [clientId]);

  // ── Actualizar post: optimista en UI + sync a Supabase ──
  const handleUpdatePost = async (postId: string, updates: Partial<Post>) => {
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, ...updates } : p)
    );

    const allowed = ['status', 'feedback', 'image_url', 'webhook_sent_at'] as const;
    const dbUpdates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in updates) dbUpdates[key] = (updates as any)[key];
    }
    if (Object.keys(dbUpdates).length > 0) {
      await supabase.from('posts').update(dbUpdates).eq('id', postId);
    }
  };

  const activeClient   = CLIENTS.find(c => c.id === clientId);
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const approvedCount  = posts.filter(p => p.status === 'approved').length;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sans pb-20">

      {/* ── Navbar admin ── */}
      {isAdmin ? (
        <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase text-lg">
              ContentFlow
            </h1>
            <select
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              className="border p-1.5 rounded-lg text-sm font-bold outline-none focus:border-[#2d6a4f] max-w-xs truncate"
            >
              {CLIENTS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {activeClient && (
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                activeClient.platform === 'LI'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-pink-100 text-pink-700'
              }`}>
                {activeClient.platform === 'LI' ? '💼 LinkedIn' : '📸 Instagram'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {posts.length > 0 && (
              <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest">
                <span className="text-green-600">{scheduledCount}/12 publicados</span>
                {approvedCount > 0 && (
                  <span className="text-amber-500">{approvedCount} listos para publicar</span>
                )}
              </div>
            )}
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden md:block">
              Admin: Pau Blanch Mercader
            </span>
          </div>
        </nav>
      ) : (
        /* ── Navbar cliente ── */
        <nav className="bg-white border-b p-4 flex justify-center items-center sticky top-0 z-50 shadow-sm">
          <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase text-xl italic">
            Portal de Aprobación
          </h1>
        </nav>
      )}

      {/* ── Contenido ── */}
      <div className="max-w-7xl mx-auto p-8">

        {/* Header de cliente */}
        {activeClient && (
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="border-l-4 border-[#2d6a4f] pl-4">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                {activeClient.name}
              </h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                Fase J2 — Kit Digital
                {' · '}{activeClient.platform === 'LI' ? 'LinkedIn' : 'Instagram'}
                {activeClient.stage ? ` · ${activeClient.stage}` : ''}
              </p>
            </div>
            {isAdmin && activeClient.contact && activeClient.contact !== '-' && (
              <div className="text-right text-xs text-gray-400 leading-relaxed shrink-0">
                <div className="font-bold text-gray-600">{activeClient.contact}</div>
                {activeClient.email && activeClient.email !== '-' && (
                  <a href={`mailto:${activeClient.email}`} className="hover:text-[#2d6a4f] block">
                    {activeClient.email}
                  </a>
                )}
                {activeClient.profile_url && activeClient.profile_url !== '-' && (
                  <a href={activeClient.profile_url} target="_blank" rel="noopener noreferrer"
                     className="text-blue-500 hover:underline">
                    Ver perfil →
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Banner J2 completado */}
        {scheduledCount >= 12 && (
          <div className="mb-8 bg-[#2d6a4f] text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border-4 border-white">
            <span className="text-4xl">🏆</span>
            <div>
              <p className="font-black uppercase text-xl">¡OBJETIVO J2 CUMPLIDO!</p>
              <p className="text-green-200 text-sm">12/12 posts publicados en Metricool</p>
            </div>
          </div>
        )}

        {/* Loading / Empty / Posts */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="text-center text-gray-400">
              <div className="w-10 h-10 border-4 border-[#2d6a4f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest">Cargando posts...</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex items-center justify-center py-40">
            <div className="text-center">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Sin posts generados
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Pídele a Claude que trabaje este cliente para generar los 12 posts de la J2
              </p>
            </div>
          </div>
        ) : (
          <ApprovalWall
            posts={posts}
            clientId={clientId}
            isAdmin={isAdmin}
            onUpdatePost={handleUpdatePost}
          />
        )}
      </div>
    </div>
  );
}
