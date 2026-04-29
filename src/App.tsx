// ARCHIVO: src/App.tsx
import { useState, useEffect, useRef } from 'react';
import ApprovalWall, { MetricoolSettingsModal } from './ApprovalWall';
import AdminLogin from './AdminLogin';
import IgCallback from './IgCallback';
import { ConnectInstagram } from './ConnectInstagram';
import { supabase } from './lib/supabase';
import clientsData from './clients.json';

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type PostStatus = 'review' | 'approved' | 'changes' | 'changes_done' | 'scheduling' | 'scheduled';

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

const LS_KEY = 'cf_last_client';

// ─── Componente principal ─────────────────────────────────────────────────────
export default function App() {
  const [clientId, setClientId]     = useState<string>('');
  const [posts, setPosts]           = useState<Post[]>([]);
  const [loading, setLoading]       = useState(false);
  const [isAdmin, setIsAdmin]       = useState(true);
  const [isClientPortal, setIsClientPortal] = useState(false);
  const [isIgCallback, setIsIgCallback] = useState(false);
  const [adminAuth, setAdminAuth]   = useState<boolean>(
    () => sessionStorage.getItem('cf_admin_auth') === '1'
  );
  const [search, setSearch]         = useState('');
  const [showDrop, setShowDrop]     = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const [showMcSettings, setShowMcSettings] = useState(false);
  const [showTracker, setShowTracker]   = useState(false);
  const [shareMode, setShareMode]       = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());
  const [copiedLink, setCopiedLink]     = useState(false);
  const [igUsername, setIgUsername]     = useState('');
  const searchRef                   = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDrop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredClients = search.trim()
    ? CLIENTS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
      )
    : CLIENTS;

  const selectClient = (id: string) => {
    setClientId(id);
    const c = CLIENTS.find(cl => cl.id === id);
    setSearch(c?.name ?? '');
    setShowDrop(false);
    // ── Persistir selección en localStorage ──
    try { localStorage.setItem(LS_KEY, id); } catch {}
  };

  // ── Detectar ruta /p/:slug para portal de aprobación del cliente ──
  // Si NO es /p/:slug → es el panel admin (requiere login)
  useEffect(() => {
    const path = window.location.pathname;

    // Callback de OAuth de Instagram
    if (path === '/ig-callback') {
      setIsIgCallback(true);
      return;
    }

    if (path.startsWith('/p/')) {
      const slug = path.split('/')[2];
      const found = CLIENTS.find(c => c.id === slug);
      if (found) {
        setClientId(found.id);
        setSearch(found.name);
        setIsAdmin(false);
        setIsClientPortal(true);
        return;
      }
      // Slug no encontrado → no revelar lista de clientes
      setIsAdmin(false);
      setIsClientPortal(true);
      return;
    }
    // Ruta raíz o cualquier otra → panel admin protegido
    setIsAdmin(true);
    setIsClientPortal(false);
    if (CLIENTS.length > 0) {
      // ── Restaurar último cliente visitado (persistencia F5) ──
      let initialId = CLIENTS[0].id;
      try {
        const saved = localStorage.getItem(LS_KEY);
        if (saved && CLIENTS.find(c => c.id === saved)) {
          initialId = saved;
        }
      } catch {}
      const initialClient = CLIENTS.find(c => c.id === initialId)!;
      setClientId(initialClient.id);
      setSearch(initialClient.name);
    }
  }, []);

  // ── Cargar ig_username cuando cambia el cliente ──
  useEffect(() => {
    if (!clientId) return;
    setIgUsername('');
    supabase
      .from('ig_credentials')
      .select('ig_username')
      .eq('client_id', clientId)
      .maybeSingle()
      .then(({ data }) => { if (data?.ig_username) setIgUsername(data.ig_username); });
  }, [clientId]);

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

    const allowed = ['status', 'feedback', 'image_url', 'webhook_sent_at', 'copy', 'hashtags', 'headline_visual', 'visual_prompt'] as const;
    const dbUpdates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in updates) dbUpdates[key] = (updates as any)[key];
    }
    if (Object.keys(dbUpdates).length > 0) {
      await supabase.from('posts').update(dbUpdates).eq('id', postId);
    }
  };

  // ── Borrar post ──
  const handleDeletePost = async (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    await supabase.from('posts').delete().eq('id', postId);
  };

  // ── Crear post vacío ──
  const handleCreatePost = async () => {
    if (!clientId || creatingPost) return;
    setCreatingPost(true);
    try {
      // Buscar el primer hueco libre (si se borró el #3, el nuevo ocupa el #3)
      let nextNum = 1;
      if (posts.length > 0) {
        const usedNums = new Set(posts.map(p => p.post_number));
        while (usedNums.has(nextNum)) nextNum++;
      }
      const newPost: Post = {
        id: `${clientId}-${Date.now()}`,
        client_id: clientId,
        post_number: nextNum,
        platform: CLIENTS.find(c => c.id === clientId)?.platform ?? 'IG',
        headline_visual: '',
        visual_prompt: '',
        copy: '',
        hashtags: [],
        status: 'review',
        feedback: '',
        image_url: '',
        webhook_sent_at: null,
      };
      const { data, error } = await supabase
        .from('posts')
        .insert(newPost)
        .select()
        .single();

      if (!error && data) {
        setPosts(prev => [...prev, data as Post]);
        // Scroll al final para ver el nuevo post
        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
      }
    } finally {
      setCreatingPost(false);
    }
  };

  const activeClient   = CLIENTS.find(c => c.id === clientId);
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const approvedCount  = posts.filter(p => p.status === 'approved').length;

  // ── Modal Tracker Excel/Sheets ──
  const TRACKER_EMBED_KEY = 'cf_tracker_url';
  const DEFAULT_TRACKER   = 'https://docs.google.com/spreadsheets/d/18wHuuQiPARQnueM69XidBW94OXsllXG5mY8FW6TO_IY/htmlview';
  const [trackerUrl, setTrackerUrl] = useState<string>(
    () => localStorage.getItem(TRACKER_EMBED_KEY) || DEFAULT_TRACKER
  );
  const [trackerInput, setTrackerInput] = useState('');

  // ── Guard: si es panel admin y no hay auth → mostrar login ──
  if (isIgCallback) {
    return <IgCallback />;
  }
  if (showMcSettings) {
    return <MetricoolSettingsModal onClose={() => setShowMcSettings(false)} />;
  }

  // Modal Tracker
  if (showTracker) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0f1117] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#1a1d27] border-b border-gray-800">
          <h2 className="font-black text-[#52b788] uppercase tracking-widest text-sm">📋 Tracker de Clientes</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={trackerInput}
              onChange={e => setTrackerInput(e.target.value)}
              placeholder="Pega URL de Google Sheets o Excel Online..."
              className="w-96 text-xs bg-[#252836] border border-gray-700 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#52b788] placeholder-gray-600"
            />
            <button
              onClick={() => {
                // Convertir URL de Google Sheets a embed si es necesario
                let url = trackerInput.trim();
                if (url.includes('docs.google.com/spreadsheets') && !url.includes('/htmlview') && !url.includes('output=html')) {
                  url = url.replace('/edit', '/htmlview');
                }
                setTrackerUrl(url);
                localStorage.setItem(TRACKER_EMBED_KEY, url);
                setTrackerInput('');
              }}
              className="text-xs font-black bg-[#52b788] text-black px-3 py-1.5 rounded-lg hover:bg-[#40916c] uppercase tracking-widest"
            >
              Cargar
            </button>
            <button
              onClick={() => setShowTracker(false)}
              className="text-gray-400 hover:text-white text-xl font-black px-2"
            >✕</button>
          </div>
        </div>
        {/* Iframe */}
        {trackerUrl ? (
          <iframe
            src={trackerUrl}
            className="flex-1 w-full border-0"
            title="Tracker clientes"
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
            <p className="text-5xl">📊</p>
            <p className="text-sm font-bold uppercase tracking-widest">Sin tracker configurado</p>
            <p className="text-xs text-gray-600 max-w-md text-center">
              Pega la URL de tu Google Sheets o Excel Online arriba y pulsa Cargar.<br/>
              Se guardará para la próxima vez.
            </p>
            <div className="text-xs text-gray-600 bg-[#1a1d27] rounded-xl p-4 max-w-lg">
              <p className="font-bold text-gray-400 mb-2">Google Sheets:</p>
              <p>Archivo → Compartir → Publicar en la web → Hoja → Página web → Publicar → copia la URL</p>
              <p className="font-bold text-gray-400 mt-3 mb-2">Excel Online (OneDrive):</p>
              <p>Insertar → Compartir → Insertar → copia la URL del iframe (solo la parte del src="...")</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (!isClientPortal && !adminAuth) {
    return <AdminLogin onLogin={() => setAdminAuth(true)} />;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen font-sans pb-20 ${isAdmin ? 'bg-[#0f1117] text-white' : 'bg-[#f7f6f3] text-gray-900'}`}>

      {/* ── Navbar admin ── */}
      {isAdmin ? (
        <nav className="bg-[#1a1d27] border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <h1 className="font-black text-[#52b788] tracking-tighter uppercase text-lg shrink-0">
              ContentFlow
            </h1>

            {/* ── Buscador de cliente ── */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden focus-within:border-[#52b788] bg-[#252836]">
                <span className="pl-2.5 text-gray-500 text-sm">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowDrop(true); }}
                  onFocus={() => setShowDrop(true)}
                  placeholder="Buscar cliente..."
                  className="p-1.5 text-sm font-bold outline-none w-64 bg-[#252836] placeholder-gray-500 text-gray-100"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(''); setShowDrop(true); }}
                    className="pr-2.5 text-gray-300 hover:text-gray-500 text-xs font-black"
                  >✕</button>
                )}
              </div>

              {/* Dropdown */}
              {showDrop && filteredClients.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-[#1a1d27] border border-gray-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  {filteredClients.length === CLIENTS.length && (
                    <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-700">
                      {CLIENTS.length} clientes
                    </div>
                  )}
                  {filteredClients.map(c => (
                    <button
                      key={c.id}
                      onClick={() => selectClient(c.id)}
                      className={`w-full text-left px-3 py-2 hover:bg-[#252836] flex items-center gap-2 transition-colors ${
                        c.id === clientId ? 'bg-[#252836] font-black text-[#52b788]' : 'text-gray-300'
                      }`}
                    >
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        c.platform === 'LI' ? 'bg-blue-900 text-blue-300' : 'bg-pink-900 text-pink-300'
                      }`}>{c.platform}</span>
                      <span className="text-xs font-semibold truncate">{c.name}</span>
                    </button>
                  ))}
                  {filteredClients.length === 0 && (
                    <div className="px-3 py-4 text-xs text-gray-500 text-center">Sin resultados</div>
                  )}
                </div>
              )}
            </div>

            {activeClient && (
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${
                activeClient.platform === 'LI'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-pink-100 text-pink-700'
              }`}>
                {activeClient.platform === 'LI' ? '💼 LinkedIn' : '📸 Instagram'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {posts.length > 0 && (
              <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest">
                <span className="text-green-400">{scheduledCount}/12 publicados</span>
                {approvedCount > 0 && (
                  <span className="text-amber-400">{approvedCount} listos para publicar</span>
                )}
              </div>
            )}

            {/* ── Botón Crear post ── */}
            {isAdmin && clientId && (
              <button
                onClick={handleCreatePost}
                disabled={creatingPost}
                className="text-[10px] font-bold bg-[#52b788] text-black px-3 py-1.5 rounded-lg hover:bg-[#40916c] transition-colors uppercase tracking-widest disabled:opacity-50 flex items-center gap-1.5 shrink-0"
              >
                {creatingPost ? '...' : '＋ Crear post'}
              </button>
            )}

            {activeClient && !shareMode && (
              <button
                onClick={() => { setShareMode(true); setSelectedPosts(new Set()); }}
                className="text-[10px] font-bold text-[#52b788] border border-[#52b788] px-2 py-0.5 rounded hover:bg-[#52b788] hover:text-black transition-colors uppercase tracking-widest hidden md:block"
              >
                🔗 Enviar al cliente
              </button>
            )}

            {/* ── Modo selección: generar enlace con posts elegidos ── */}
            {shareMode && activeClient && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                  {selectedPosts.size === 0 ? 'Selecciona posts' : `${selectedPosts.size} seleccionados`}
                </span>
                <button
                  onClick={() => {
                    const base = `https://contentflow-liard-nine.vercel.app/p/${activeClient.id}`;
                    const url = selectedPosts.size > 0
                      ? `${base}?show=${[...selectedPosts].sort((a,b)=>a-b).join(',')}`
                      : base;
                    navigator.clipboard.writeText(url);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2500);
                  }}
                  disabled={selectedPosts.size === 0}
                  className="text-[10px] font-bold bg-[#52b788] text-black px-2 py-0.5 rounded hover:bg-[#40916c] disabled:opacity-40 uppercase tracking-widest"
                >
                  {copiedLink ? '✅ Copiado' : '📋 Copiar link'}
                </button>
                <button
                  onClick={() => {
                    const allNums = posts.map(p => p.post_number);
                    const allSelected = allNums.every(n => selectedPosts.has(n));
                    if (allSelected) {
                      setSelectedPosts(new Set());
                    } else {
                      setSelectedPosts(new Set(allNums));
                    }
                  }}
                  className="text-[10px] font-bold text-gray-300 border border-gray-600 px-2 py-0.5 rounded hover:bg-gray-800 uppercase tracking-widest"
                >
                  {posts.every(p => selectedPosts.has(p.post_number)) ? '☐ Deseleccionar todos' : '☑ Seleccionar todos'}
                </button>
                <button
                  onClick={() => { setShareMode(false); setSelectedPosts(new Set()); }}
                  className="text-[10px] font-bold text-gray-400 border border-gray-700 px-2 py-0.5 rounded hover:bg-gray-800 uppercase tracking-widest"
                >✕ Cancelar</button>
              </div>
            )}
            {/* Botón ajustes Metricool */}
            <button
              onClick={() => setShowMcSettings(true)}
              title="Ajustes Metricool"
              className="text-[10px] font-bold text-purple-400 border border-purple-800 px-2 py-0.5 rounded hover:bg-purple-900 hover:text-purple-200 transition-colors uppercase tracking-widest hidden md:flex items-center gap-1"
            >
              📊 Metricool
            </button>

            {/* ── Instagram + Tracker (solo clientes IG) ── */}
            {activeClient?.platform === 'IG' ? (
              <div className="flex flex-col items-end gap-0.5">
                <ConnectInstagram
                  clientId={activeClient.id}
                  clientName={activeClient.name}
                />
                <button
                  onClick={() => setShowTracker(true)}
                  className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  📋 Ver tracker de clientes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowTracker(true)}
                className="text-[10px] font-bold text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded hover:bg-emerald-900 hover:text-emerald-200 transition-colors uppercase tracking-widest hidden md:flex items-center gap-1"
              >
                📋 Tracker
              </button>
            )}

            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hidden md:block">
              Interactivos
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
            <div className="border-l-4 border-[#52b788] pl-4">
              <h2 className={`text-3xl font-bold leading-tight ${isAdmin ? 'text-white' : 'text-gray-900'}`}>
                {activeClient.name}
              </h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                {isAdmin
                  ? <>Fase J2 — Kit Digital{' · '}{activeClient.platform === 'LI' ? 'LinkedIn' : 'Instagram'}{activeClient.stage ? ` · ${activeClient.stage}` : ''}</>
                  : 'Kit Digital'
                }
              </p>
            </div>
            {isAdmin && (
              <div className="text-right text-xs text-gray-400 leading-relaxed shrink-0 flex flex-col items-end gap-0.5">
                {/* Contacto */}
                {activeClient.contact && activeClient.contact !== '-' && (
                  <div className="font-bold text-gray-500">{activeClient.contact}</div>
                )}
                {/* Teléfono (campo notes si contiene número) */}
                {activeClient.notes && activeClient.notes !== '-' && /\d{6,}/.test(activeClient.notes) && (
                  <a href={`tel:${activeClient.notes.replace(/\s/g,'')}`} className="text-amber-400 hover:text-amber-300 font-bold">
                    📞 {activeClient.notes}
                  </a>
                )}
                {/* Email */}
                {activeClient.email && activeClient.email !== '-' && (
                  <a href={`mailto:${activeClient.email}`} className="hover:text-[#2d6a4f] block">
                    ✉️ {activeClient.email}
                  </a>
                )}
                {/* Instagram @ (de ig_credentials Supabase) */}
                {igUsername && (
                  <span className="text-pink-400 font-black text-[11px]">📸 @{igUsername}</span>
                )}
                {/* Perfil externo */}
                {activeClient.profile_url && activeClient.profile_url !== '-' && (
                  <a href={activeClient.profile_url} target="_blank" rel="noopener noreferrer"
                     className="text-blue-500 hover:underline text-[10px]">
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
              <div className="w-10 h-10 border-4 border-[#52b788] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
                Pulsa "＋ Crear post" para añadir uno o pídele a Claude que genere los 12 posts
              </p>
            </div>
          </div>
        ) : (
          <ApprovalWall
            posts={posts}
            clientId={clientId}
            clientName={activeClient?.name ?? clientId}
            isAdmin={isAdmin}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
            shareMode={shareMode}
            selectedPosts={selectedPosts}
            onToggleSelect={(n) => setSelectedPosts(prev => {
              const s = new Set(prev);
              s.has(n) ? s.delete(n) : s.add(n);
              return s;
            })}
          />
        )}
      </div>
    </div>
  );
}