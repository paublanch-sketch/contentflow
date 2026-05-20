// ARCHIVO: src/App.tsx
import { useState, useEffect, useRef } from 'react';
import logoInteractivos from './assets/logo-interactivos.png';
import ApprovalWall, { MetricoolSettingsModal } from './ApprovalWall';
import AdminLogin from './AdminLogin';
import IgCallback from './IgCallback';
import { ConnectInstagram } from './ConnectInstagram';
import IgCredentialTest from './IgCredentialTest';
import { supabase } from './lib/supabase';
import clientsData from './clients.json';

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type PostStatus = 'review' | 'approved' | 'changes' | 'changes_done' | 'scheduling' | 'scheduled';

export type Post = {
  id: string;
  client_id: string;
  post_number: number;
  platform: string;
  headline_visual: string;
  visual_prompt: string;
  copy: string;
  hashtags: string[];
  status: PostStatus;
  feedback: string;
  image_url: string;
  reel_url?: string;
  webhook_sent_at: string | null;
  created_by?: 'admin' | 'client' | null;
  admin_comment?: string;
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
  ig_username?: string;
  ig_password?: string;
  fb_username?: string;
  fb_password?: string;
  li_username?: string;
  li_password?: string;
};

// ─── Fuente de verdad de clientes (generado por generate_clients_json.py) ─────
const CLIENTS: Client[] = clientsData as Client[];

const LS_KEY             = 'cf_last_client';
const LS_DYNAMIC_CLIENTS = 'cf_dynamic_clients';
const LS_PLATFORMS_EXTRA = 'cf_platforms_extra';
const LS_DELETED_CLIENTS = 'cf_deleted_clients';

// ─── Helper: texto → slug kebab-case ─────────────────────────────────────────
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// ─── Badge de plataforma ──────────────────────────────────────────────────────
function PlatformBadge({ p, small = false }: { p: string; small?: boolean }) {
  const label =
    p === 'LI'  ? '💼 LinkedIn' :
    p === 'FB'  ? '📘 Facebook' :
    p === 'IG2' ? '📸 2ª IG'    : '📸 Instagram';
  const cls =
    p === 'LI'  ? 'bg-blue-100 text-blue-700' :
    p === 'FB'  ? 'bg-blue-200 text-blue-900' :
    p === 'IG2' ? 'bg-pink-200 text-pink-800' : 'bg-pink-100 text-pink-700';
  const smCls =
    p === 'LI'  ? 'bg-blue-900 text-blue-300' :
    p === 'FB'  ? 'bg-blue-950 text-blue-400' :
    p === 'IG2' ? 'bg-pink-950 text-pink-300' : 'bg-pink-900 text-pink-300';
  if (small) {
    return (
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${smCls}`}>{p}</span>
    );
  }
  return (
    <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${cls}`}>
      {label}
    </span>
  );
}

// ─── Modal: Añadir Cliente ────────────────────────────────────────────────────

// ─── CredRow: muestra usuario + contraseña con click = revelar + copiar ───────
function CredRow({ icon, label, user, pass }: { icon: string; label: string; user: string; pass: string }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState<'user' | 'pass' | null>(null);

  const copyUser = () => {
    navigator.clipboard.writeText(user);
    setCopied('user');
    setTimeout(() => setCopied(null), 2000);
  };

  const copyPass = () => {
    navigator.clipboard.writeText(pass);
    setShow(true);
    setCopied('pass');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex items-center gap-1.5 w-full relative">
      <span className="text-[10px] text-gray-500 w-4">{icon}</span>
      <span className="text-[9px] font-black text-gray-600 uppercase w-4">{label}</span>
      <button
        onClick={copyUser}
        title="Copiar usuario"
        className="text-[10px] font-mono text-gray-300 hover:text-white truncate max-w-[100px]"
      >{copied === 'user' ? <span className="text-green-400">✅ copiado</span> : user}</button>
      <span className="text-gray-700 text-[10px]">/</span>
      <button
        onClick={copyPass}
        title="Click: revelar y copiar contrasena"
        className="text-[10px] font-mono text-amber-400 hover:text-amber-200"
      >
        {copied === 'pass'
          ? <span className="text-green-400">✅ copiada!</span>
          : show ? pass : '••••••'}
      </button>
    </div>
  );
}

function AddClientModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (client: Client, extraPlatforms: string[]) => void;
}) {
  const [companyName, setCompanyName] = useState('');
  const [contact,     setContact]     = useState('');
  const [email,       setEmail]       = useState('');
  const [platforms,   setPlatforms]   = useState<string[]>(['IG']);
  const [profileUrl,  setProfileUrl]  = useState('');
  const [igUser,      setIgUser]      = useState('');
  const [igPass,      setIgPass]      = useState('');
  const [recentPosts, setRecentPosts] = useState('');
  const [notes,       setNotes]       = useState('');

  const PLATFORM_OPTIONS = [
    { id: 'IG', label: '📸 Instagram' },
    { id: 'LI', label: '💼 LinkedIn'  },
    { id: 'FB', label: '📘 Facebook'  },
  ];

  const togglePlatform = (p: string) => {
    setPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const handleSubmit = () => {
    if (!companyName.trim() || platforms.length === 0) return;
    const id = toSlug(companyName.trim());
    const finalNotes = [
      notes || '',
      recentPosts ? `\n--- ÚLTIMOS POSTS ---\n${recentPosts}` : '',
    ]
      .filter(Boolean)
      .join('')
      .trim() || '-';

    const newClient: Client = {
      id,
      name:        companyName.trim().toUpperCase(),
      platform:    platforms[0],
      estado:      'Contactado',
      stage:       '-',
      tecnico:     '-',
      contact:     contact.trim()    || '-',
      email:       email.trim()      || '-',
      profile_url: profileUrl.trim() || '-',
      folder:      companyName.trim().toUpperCase(),
      notes:       finalNotes,
    };

    // Guardar credenciales IG en localStorage + Supabase para que sean visibles desde cualquier navegador
    if ((platforms.includes('IG') || platforms.includes('IG2')) && igUser) {
      try {
        const igCreds = JSON.parse(localStorage.getItem('cf_ig_local') || '{}');
        igCreds[id] = { ig_username: igUser, ig_password: igPass };
        localStorage.setItem('cf_ig_local', JSON.stringify(igCreds));
      } catch {}
      // También en Supabase para persistencia cross-browser
      supabase.from('ig_credentials').upsert({
        client_id:   id,
        ig_username: igUser.replace(/^@/, ''),
        ig_password: igPass,
        updated_at:  new Date().toISOString(),
      }, { onConflict: 'client_id' }).then(() => {});
    }

    onAdd(newClient, platforms.slice(1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#1a1d27] border border-gray-700 rounded-2xl p-6 w-full max-w-xl shadow-2xl my-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-gray-500 text-xs uppercase tracking-widest">➕ Nuevo Cliente</h3>
            <p className="text-white text-xl font-black mt-1">Añadir cliente a ContentFlow</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xl font-black">✕</button>
        </div>

        <div className="space-y-4">
          {/* Nombre empresa */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">
              Nombre empresa <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Ej: MARTA BAYONA MAS"
              className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm font-bold focus:outline-none focus:border-[#52b788] placeholder-gray-600"
            />
            {companyName.trim() && (
              <p className="text-[10px] text-gray-500 mt-1">
                ID: <span className="text-[#52b788] font-mono">{toSlug(companyName)}</span>
              </p>
            )}
          </div>

          {/* Contacto + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Nombre contacto</label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="Ej: Marta"
                className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#52b788] placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="cliente@email.com"
                className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#52b788] placeholder-gray-600"
              />
            </div>
          </div>

          {/* Redes sociales */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
              Redes sociales <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => togglePlatform(opt.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors border ${
                    platforms.includes(opt.id)
                      ? opt.id === 'LI' ? 'bg-blue-600 border-blue-500 text-white'
                        : opt.id === 'FB' ? 'bg-blue-800 border-blue-700 text-white'
                        : 'bg-pink-600 border-pink-500 text-white'
                      : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Credenciales IG */}
          {platforms.includes('IG') && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Usuario Instagram</label>
                <input
                  type="text"
                  value={igUser}
                  onChange={e => setIgUser(e.target.value)}
                  placeholder="@usuario"
                  className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-pink-800 text-white text-sm font-mono focus:outline-none focus:border-pink-500 placeholder-gray-600"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Contraseña Instagram</label>
                <input
                  type="password"
                  value={igPass}
                  onChange={e => setIgPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-pink-800 text-white text-sm font-mono focus:outline-none focus:border-pink-500 placeholder-gray-600"
                />
              </div>
            </div>
          )}

          {/* URL perfil */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">URL perfil</label>
            <input
              type="url"
              value={profileUrl}
              onChange={e => setProfileUrl(e.target.value)}
              placeholder="https://www.instagram.com/..."
              className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#52b788] placeholder-gray-600"
            />
          </div>

          {/* Últimos posts */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">
              Pega aquí sus últimos posts <span className="text-gray-600 normal-case font-normal">(para capturar su tono y estilo)</span>
            </label>
            <textarea
              value={recentPosts}
              onChange={e => setRecentPosts(e.target.value)}
              rows={4}
              placeholder="Pega aquí ejemplos de posts anteriores del cliente..."
              className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#52b788] placeholder-gray-600 resize-none"
            />
          </div>

          {/* Notas */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Notas internas</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Segunda cuenta, notas de seguimiento..."
              className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#52b788] placeholder-gray-600"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={!companyName.trim() || platforms.length === 0}
            className="flex-1 py-3 bg-[#52b788] hover:bg-[#40916c] disabled:opacity-40 text-black font-black text-sm uppercase tracking-widest rounded-xl transition-colors"
          >
            ➕ Añadir cliente
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest border border-gray-700 rounded-xl"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Añadir Red Social ─────────────────────────────────────────────────
function AddSocialModal({
  client,
  currentPlatforms,
  onClose,
  onAdd,
}: {
  client: Client;
  currentPlatforms: string[];
  onClose: () => void;
  onAdd: (platform: string, igUser: string, igPass: string, profileUrl: string) => void;
}) {
  const [platform,    setPlatform]   = useState('IG');
  const [igUser,      setIgUser]     = useState('');
  const [igPass,      setIgPass]     = useState('');
  const [profileUrl,  setProfileUrl] = useState('');

  const PLATFORM_OPTIONS = [
    { id: 'IG',  label: '📸 Instagram',     color: 'bg-pink-600 border-pink-500'  },
    { id: 'IG2', label: '📸 2ª Instagram',   color: 'bg-pink-800 border-pink-700'  },
    { id: 'LI',  label: '💼 LinkedIn',       color: 'bg-blue-600 border-blue-500'  },
    { id: 'FB',  label: '📘 Facebook',       color: 'bg-blue-800 border-blue-700'  },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1a1d27] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-gray-500 text-xs uppercase tracking-widest">📲 Añadir Red Social</h3>
            <p className="text-white text-xl font-black mt-1 leading-tight">{client.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xl font-black">✕</button>
        </div>

        {/* Plataformas actuales */}
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Redes actuales</p>
          <div className="flex flex-wrap gap-2">
            {currentPlatforms.map((p, i) => (
              <span key={`${p}-${i}`} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                p === 'LI'  ? 'bg-blue-900 text-blue-300'  :
                p === 'FB'  ? 'bg-blue-950 text-blue-400'  :
                p === 'IG2' ? 'bg-pink-950 text-pink-300'  :
                'bg-pink-900 text-pink-300'
              }`}>{p === 'IG2' ? '2ª IG' : p}</span>
            ))}
          </div>
        </div>

        {/* Elegir nueva red */}
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Añadir nueva red</p>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORM_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setPlatform(opt.id)}
                className={`px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-colors border ${
                  platform === opt.id
                    ? `${opt.color} text-white`
                    : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Credenciales IG */}
        {(platform === 'IG' || platform === 'IG2') && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Usuario</label>
              <input
                type="text"
                value={igUser}
                onChange={e => setIgUser(e.target.value)}
                placeholder="@usuario"
                className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-pink-800 text-white text-sm font-mono focus:outline-none focus:border-pink-500 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Contraseña</label>
              <input
                type="password"
                value={igPass}
                onChange={e => setIgPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-pink-800 text-white text-sm font-mono focus:outline-none focus:border-pink-500 placeholder-gray-600"
              />
            </div>
          </div>
        )}

        {/* URL perfil */}
        <div className="mb-5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">URL perfil (opcional)</label>
          <input
            type="url"
            value={profileUrl}
            onChange={e => setProfileUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#52b788] placeholder-gray-600"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onAdd(platform, igUser, igPass, profileUrl)}
            className="flex-1 py-3 bg-[#52b788] hover:bg-[#40916c] text-black font-black text-sm uppercase tracking-widest rounded-xl transition-colors"
          >
            ➕ Añadir red social
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest border border-gray-700 rounded-xl"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Política de Privacidad (ruta pública /p/privacy) ────────────────────────
function PrivacyPage() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 760, margin: '0 auto', padding: '40px 20px 80px', color: '#1a1a1a', lineHeight: 1.7 }}>
      <div style={{ borderBottom: '2px solid #e5e5e5', marginBottom: 48, paddingBottom: 24 }}>
        <div style={{ display:'inline-block', background:'#f0fdf4', border:'1px solid #86efac', color:'#166534', fontSize:13, fontWeight:600, padding:'4px 12px', borderRadius:999, marginBottom:16 }}>
          Última actualización: Mayo 2025
        </div>
        <h1 style={{ fontSize:28, fontWeight:800, marginBottom:8 }}>Política de Privacidad</h1>
        <p style={{ color:'#666', fontSize:14 }}>ContentFlow — Desarrollado por <strong>Interactivos Digital S.L.</strong></p>
      </div>

      {[
        { title: '1. Información general', content: (
          <>
            <p>ContentFlow es una herramienta interna de gestión y publicación de contenido en redes sociales desarrollada por <strong>Interactivos Digital S.L.</strong>, agencia adherida al programa <strong>Kit Digital</strong> del Gobierno de España.</p>
            <p>ContentFlow se utiliza exclusivamente por Interactivos Digital S.L. para gestionar y publicar contenido en las redes sociales de sus clientes empresariales dentro del marco del servicio de <em>Gestión de Redes Sociales</em> del Kit Digital. Los clientes autorizan expresamente a Interactivos a publicar en su nombre al contratar el servicio.</p>
          </>
        )},
        { title: '2. Datos que recopilamos', content: (
          <>
            <p>ContentFlow recopila únicamente los datos estrictamente necesarios:</p>
            <ul style={{ marginLeft:24, marginBottom:14 }}>
              <li><strong>Token de acceso de Instagram:</strong> almacenado de forma segura para publicar en tu nombre.</li>
              <li><strong>Nombre de usuario de Instagram:</strong> para identificar la cuenta conectada.</li>
              <li><strong>ID de usuario de Instagram:</strong> identificador técnico para las llamadas a la API.</li>
              <li><strong>Contenido de publicaciones:</strong> textos, imágenes y hashtags introducidos en la plataforma.</li>
            </ul>
            <p><strong>No recopilamos</strong> contraseñas, datos bancarios ni documentos de identidad.</p>
          </>
        )},
        { title: '3. Finalidad del tratamiento', content: (
          <ul style={{ marginLeft:24, marginBottom:14 }}>
            <li>Publicar o programar contenido en Instagram mediante la API oficial de Meta.</li>
            <li>Identificar qué cuenta de Instagram está asociada a cada cliente en ContentFlow.</li>
            <li>Renovar el token de acceso cuando esté próximo a caducar.</li>
          </ul>
        )},
        { title: '4. Compartición de datos con terceros', content: (
          <>
            <ul style={{ marginLeft:24, marginBottom:14 }}>
              <li><strong>Meta (Instagram Graph API):</strong> autenticación y publicación. Sujeto a la <a href="https://www.facebook.com/policy.php" style={{ color:'#2d6a4f' }}>Política de Meta</a>.</li>
              <li><strong>Supabase:</strong> base de datos cifrada donde se almacenan los tokens. <a href="https://supabase.com/privacy" style={{ color:'#2d6a4f' }}>Política de Supabase</a>.</li>
              <li><strong>Vercel:</strong> hosting de la aplicación. <a href="https://vercel.com/legal/privacy-policy" style={{ color:'#2d6a4f' }}>Política de Vercel</a>.</li>
            </ul>
            <p>No vendemos ni compartimos tus datos con ninguna otra empresa.</p>
          </>
        )},
        { title: '5. Almacenamiento y seguridad', content: (
          <p>Los tokens se almacenan en una base de datos cifrada con acceso restringido exclusivamente al servidor. Los tokens caducan cada 60 días. Toda la comunicación se realiza mediante HTTPS.</p>
        )},
        { title: '6. Permisos de Instagram utilizados', content: (
          <ul style={{ marginLeft:24, marginBottom:14 }}>
            <li><strong>instagram_basic:</strong> leer información básica del perfil.</li>
            <li><strong>instagram_content_publish:</strong> publicar fotos y vídeos en Instagram.</li>
            <li><strong>pages_show_list / pages_read_engagement:</strong> acceder a páginas de Facebook vinculadas.</li>
            <li><strong>business_management:</strong> gestión de activos Business de Meta.</li>
          </ul>
        )},
        { title: '7. Derechos del usuario y eliminación de datos', content: (
          <>
            <p>Puedes solicitar acceso, rectificación o eliminación de tus datos enviando un correo a <a href="mailto:hola@interactivos.net" style={{ color:'#2d6a4f' }}>hola@interactivos.net</a> con el asunto <em>"Eliminación de datos ContentFlow"</em>. Respondemos en un máximo de 30 días.</p>
            <p>También puedes revocar los permisos desde Instagram: <strong>Configuración → Seguridad → Aplicaciones y sitios web</strong>.</p>
          </>
        )},
        { title: '8. Contacto', content: (
          <ul style={{ marginLeft:24, marginBottom:14 }}>
            <li><strong>Empresa:</strong> Interactivos Digital S.L.</li>
            <li><strong>Email:</strong> <a href="mailto:hola@interactivos.net" style={{ color:'#2d6a4f' }}>hola@interactivos.net</a></li>
            <li><strong>Web:</strong> <a href="https://www.interactivos.net" style={{ color:'#2d6a4f' }}>www.interactivos.net</a></li>
          </ul>
        )},
      ].map(({ title, content }) => (
        <div key={title}>
          <h2 style={{ fontSize:18, fontWeight:700, marginTop:40, marginBottom:12, paddingLeft:14, borderLeft:'4px solid #52b788' }}>{title}</h2>
          {content}
        </div>
      ))}

      <div style={{ marginTop:60, paddingTop:24, borderTop:'1px solid #e5e5e5', fontSize:13, color:'#888' }}>
        © 2025 Interactivos Digital S.L. · ContentFlow · Todos los derechos reservados.
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function App() {
  const [clientId, setClientId]     = useState<string>('');
  const [posts, setPosts]           = useState<Post[]>([]);
  const [loading, setLoading]       = useState(false);
  const [isAdmin, setIsAdmin]       = useState(true);
  const [isClientPortal, setIsClientPortal] = useState(false);
  const [isIgCallback, setIsIgCallback] = useState(false);
  const [isPrivacyPage, setIsPrivacyPage] = useState(false);
  const [adminAuth, setAdminAuth]   = useState<boolean>(
    () => sessionStorage.getItem('cf_admin_auth') === '1'
  );
  const [search, setSearch]         = useState('');
  const [showDrop, setShowDrop]     = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const [showMcSettings, setShowMcSettings] = useState(false);
  const [shareMode, setShareMode]       = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());
  const [copiedLink, setCopiedLink]     = useState(false);
  const [igUsername, setIgUsername]     = useState('');
  const [igPassword, setIgPassword]     = useState('');
  const [showIgPassword, setShowIgPassword] = useState(false);
  const [igAccountType, setIgAccountType] = useState<'business' | 'personal' | 'none'>('none');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject]   = useState('');
  const [emailBody, setEmailBody]         = useState('');
  const [igJustConnected, setIgJustConnected] = useState(false);
  const [igRefreshKey,   setIgRefreshKey]     = useState(0);
  // Slug del portal pendiente de resolver (cliente dinámico aún no cargado de Supabase)
  const [portalSlug, setPortalSlug] = useState<string>('');
  const searchRef                   = useRef<HTMLDivElement>(null);

  // ── Detectar retorno de OAuth IG ──────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ig_connected') === '1') {
      setIgJustConnected(true);
      // Forzar re-fetch de ig_tokens y re-mount de ConnectInstagram
      setIgRefreshKey(k => k + 1);
      // Limpiar URL sin recargar
      window.history.replaceState({}, '', window.location.pathname);
      // Limpiar banner tras 4s
      setTimeout(() => setIgJustConnected(false), 4000);
    }
  }, []);

  // ── Nuevos clientes añadidos dinámicamente (Supabase + localStorage fallback) ──
  const [dynamicClients, setDynamicClients] = useState<Client[]>(() => {
    try { return JSON.parse(localStorage.getItem(LS_DYNAMIC_CLIENTS) || '[]'); } catch { return []; }
  });

  // ── IDs de clientes eliminados (para ocultar también los estáticos del JSON) ──
  const [deletedClientIds, setDeletedClientIds] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(LS_DELETED_CLIENTS) || '[]')); } catch { return new Set(); }
  });

  // ── Cargar clientes dinámicos y extra_platforms desde Supabase al montar ──
  useEffect(() => {
    supabase
      .from('clients')
      .select('*')
      .then(async ({ data, error }) => {
        // ── A. Migrar clientes de localStorage → Supabase (primera vez o cliente sin sync) ──
        // Esto garantiza que cualquier cliente creado antes de que existiera la tabla
        // también quede en Supabase y sea visible en todos los navegadores.
        const localDynamic: Client[] = (() => {
          try { return JSON.parse(localStorage.getItem(LS_DYNAMIC_CLIENTS) || '[]'); } catch { return []; }
        })();

        if (localDynamic.length > 0) {
          const remoteIds = new Set((data || []).map((c: any) => c.id));
          const toMigrate = localDynamic.filter(c => !remoteIds.has(c.id));
          for (const c of toMigrate) {
            supabase.from('clients').upsert({
              id:          c.id,
              name:        c.name,
              platform:    c.platform,
              estado:      c.estado  || '-',
              stage:       c.stage   || '-',
              tecnico:     c.tecnico || '-',
              contact:     c.contact || '-',
              email:       c.email   || '-',
              profile_url: c.profile_url || '-',
              folder:      c.folder  || '-',
              notes:       c.notes   || '-',
            }, { onConflict: 'id' }).then(() => {});
          }
        }

        // ── B. Migrar credenciales IG de cf_ig_local → ig_credentials en Supabase ──
        try {
          const igCredsLocal: Record<string, { ig_username?: string; ig_password?: string }> =
            JSON.parse(localStorage.getItem('cf_ig_local') || '{}');
          for (const [key, val] of Object.entries(igCredsLocal)) {
            if (val?.ig_username) {
              supabase.from('ig_credentials').upsert({
                client_id:   key,
                ig_username: val.ig_username,
                ig_password: val.ig_password || '',
                updated_at:  new Date().toISOString(),
              }, { onConflict: 'client_id' }).then(() => {});
            }
          }
        } catch {}

        // Si la tabla aún no existe o hay error, usar solo localStorage
        if (error || !data) return;

        const staticIds = new Set((clientsData as Client[]).map(c => c.id));

        // ── C. Cargar extra_platforms de Supabase (fuente de verdad) ──
        const extraFromSupabase: Record<string, string[]> = {};
        for (const c of data as (Client & { extra_platforms?: string[] })[]) {
          if (c.extra_platforms && Array.isArray(c.extra_platforms) && c.extra_platforms.length > 0) {
            extraFromSupabase[c.id] = c.extra_platforms;
          }
        }
        if (Object.keys(extraFromSupabase).length > 0) {
          setPlatformsExtra(prev => {
            const merged = { ...prev, ...extraFromSupabase };
            try { localStorage.setItem(LS_PLATFORMS_EXTRA, JSON.stringify(merged)); } catch {}
            return merged;
          });
        }

        // ── D. Cargar clientes dinámicos (los que no están en el JSON estático) ──
        const remoteOnly = (data as Client[]).filter(c => !staticIds.has(c.id));
        if (remoteOnly.length === 0) return;
        setDynamicClients(prev => {
          const existingIds = new Set(prev.map(c => c.id));
          const merged = [...prev, ...remoteOnly.filter(c => !existingIds.has(c.id))];
          try { localStorage.setItem(LS_DYNAMIC_CLIENTS, JSON.stringify(merged)); } catch {}
          return merged;
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Plataformas extra por cliente (e.g. { 'marta-bayona-mas': ['FB'] }) ──
  const [platformsExtra, setPlatformsExtra] = useState<Record<string, string[]>>(() => {
    try { return JSON.parse(localStorage.getItem(LS_PLATFORMS_EXTRA) || '{}'); } catch { return {}; }
  });

  // ── Modales ──
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [confirmDeleteClient, setConfirmDeleteClient] = useState(false);

  // ── Lista completa de clientes (estáticos + dinámicos, sin los eliminados) ──
  const ALL_CLIENTS: Client[] = [...CLIENTS, ...dynamicClients].filter(c => !deletedClientIds.has(c.id));

  // ── Cerrar dropdown al hacer click fuera ──
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
    ? ALL_CLIENTS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
      )
    : ALL_CLIENTS;

  const selectClient = (id: string) => {
    setClientId(id);
    const c = ALL_CLIENTS.find(cl => cl.id === id);
    setSearch(c?.name ?? '');
    setShowDrop(false);
    try { localStorage.setItem(LS_KEY, id); } catch {}
  };

  // ── Detectar ruta /p/:slug para portal de aprobación del cliente ──
  useEffect(() => {
    const path = window.location.pathname;

    if (path === '/ig-callback') {
      setIsIgCallback(true);
      return;
    }

    if (path === '/p/privacy' || path === '/privacy') {
      setIsPrivacyPage(true);
      return;
    }

    if (path.startsWith('/p/')) {
      const slug = path.split('/')[2];
      const found = ALL_CLIENTS.find(c => c.id === slug);
      if (found) {
        setClientId(found.id);
        setSearch(found.name);
        setIsAdmin(false);
        setIsClientPortal(true);
        return;
      }
      // Cliente no encontrado todavía — puede ser dinámico (Supabase aún no respondió).
      // Marcamos portal activo + guardamos slug; un segundo effect lo resolverá.
      setIsAdmin(false);
      setIsClientPortal(true);
      setPortalSlug(slug);
      return;
    }
    setIsAdmin(true);
    setIsClientPortal(false);
    if (ALL_CLIENTS.length > 0) {
      let initialId = ALL_CLIENTS[0].id;
      try {
        const saved = localStorage.getItem(LS_KEY);
        if (saved && ALL_CLIENTS.find(c => c.id === saved)) {
          initialId = saved;
        }
      } catch {}
      const initialClient = ALL_CLIENTS.find(c => c.id === initialId)!;
      setClientId(initialClient.id);
      setSearch(initialClient.name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Resolver cliente portal cuando Supabase carga clientes dinámicos ──
  useEffect(() => {
    if (!portalSlug || clientId) return; // ya resuelto o no hay slug pendiente
    const found = ALL_CLIENTS.find(c => c.id === portalSlug);
    if (found) {
      setClientId(found.id);
      setSearch(found.name);
      setPortalSlug('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicClients, portalSlug]);

  // ── Cargar ig_username y tipo de cuenta cuando cambia el cliente o vuelve de OAuth ──
  useEffect(() => {
    if (!clientId) return;
    setIgUsername('');
    setIgPassword('');
    setShowIgPassword(false);
    setIgAccountType('none');
    (async () => {
      // 1. ¿Tiene token OAuth Business/Creator?
      const { data: token } = await supabase
        .from('ig_tokens').select('ig_username').eq('client_id', clientId).maybeSingle();
      if (token?.ig_username) {
        setIgUsername(token.ig_username);
        setIgAccountType('business');
        return;
      }
      // 2. ¿Tiene credenciales personales en Supabase?
      const { data: creds } = await supabase
        .from('ig_credentials').select('ig_username, ig_password').eq('client_id', clientId).maybeSingle();
      if (creds?.ig_username) {
        setIgUsername(creds.ig_username);
        if (creds?.ig_password) setIgPassword(creds.ig_password);
        setIgAccountType('personal');
        return;
      }
      // 3. ¿Tiene credenciales en localStorage? (clientes añadidos dinámicamente)
      try {
        const igCreds = JSON.parse(localStorage.getItem('cf_ig_local') || '{}');
        if (igCreds[clientId]?.ig_username) {
          setIgUsername(igCreds[clientId].ig_username);
          if (igCreds[clientId].ig_password) setIgPassword(igCreds[clientId].ig_password);
          setIgAccountType('personal');
          return;
        }
      } catch {}
      // 4. clients.json ya NO auto-conecta — requiere autenticación real en ConnectInstagram
    })();
  }, [clientId, igRefreshKey]);

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

  // ── Actualizar post ──
  const handleUpdatePost = async (postId: string, updates: Partial<Post>) => {
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, ...updates } : p)
    );
    const allowed = ['status', 'feedback', 'image_url', 'reel_url', 'webhook_sent_at', 'copy', 'hashtags', 'headline_visual', 'visual_prompt', 'admin_comment'] as const;
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
    const scrollY = window.scrollY;
    setPosts(prev => prev.filter(p => p.id !== postId));
    await supabase.from('posts').delete().eq('id', postId);
    requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior }));
  };

  // ── Crear post vacío ──
  const handleCreatePost = async (createdBy: 'admin' | 'client' = 'admin') => {
    if (!clientId || creatingPost) return;
    setCreatingPost(true);
    try {
      let nextNum = 1;
      if (posts.length > 0) {
        const usedNums = new Set(posts.map(p => p.post_number));
        while (usedNums.has(nextNum)) nextNum++;
      }
      const basePost = {
        id: `${clientId}-${Date.now()}`,
        client_id: clientId,
        post_number: nextNum,
        platform: ALL_CLIENTS.find(c => c.id === clientId)?.platform ?? 'IG',
        headline_visual: '',
        visual_prompt: '',
        copy: '',
        hashtags: [],
        status: 'review' as const,
        feedback: '',
        image_url: '',
        webhook_sent_at: null,
      };
      let result = await supabase.from('posts').insert({ ...basePost, created_by: createdBy }).select().single();
      if (result.error) {
        result = await supabase.from('posts').insert(basePost).select().single();
      }
      if (!result.error && result.data) {
        setPosts(prev => [...prev, result.data as Post]);
      } else {
        alert(`Error al crear post: ${result.error?.message}`);
      }
    } finally {
      setCreatingPost(false);
    }
  };

  // ── Añadir cliente dinámico ──
  const handleAddClient = async (newClient: Client, extraPlatforms: string[]) => {
    // 1. Guardar en Supabase para que todos lo vean
    const { error } = await supabase.from('clients').upsert({
      id:          newClient.id,
      name:        newClient.name,
      platform:    newClient.platform,
      estado:      newClient.estado,
      stage:       newClient.stage,
      tecnico:     newClient.tecnico,
      contact:     newClient.contact,
      email:       newClient.email,
      profile_url: newClient.profile_url,
      folder:      newClient.folder,
      notes:       newClient.notes,
    }, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase clients insert error:', error.message);
      // Si falla (tabla no existe), seguimos igual con localStorage
    }

    // 2. Actualizar estado local + localStorage como fallback
    const updated = [...dynamicClients, newClient];
    setDynamicClients(updated);
    try { localStorage.setItem(LS_DYNAMIC_CLIENTS, JSON.stringify(updated)); } catch {}

    if (extraPlatforms.length > 0) {
      const extra = { ...platformsExtra, [newClient.id]: extraPlatforms };
      setPlatformsExtra(extra);
      try { localStorage.setItem(LS_PLATFORMS_EXTRA, JSON.stringify(extra)); } catch {}
      // Guardar extra_platforms en Supabase también
      supabase.from('clients').update({ extra_platforms: extraPlatforms }).eq('id', newClient.id).then(() => {});
    }

    setShowAddClientModal(false);
    selectClient(newClient.id);
  };

  // ── Añadir red social extra a cliente existente ──
  const handleAddSocial = (platform: string, igUser: string, igPass: string, _profileUrl: string) => {
    const current = platformsExtra[clientId] ?? [];
    const updatedExtra = [...current, platform];
    const updated  = { ...platformsExtra, [clientId]: updatedExtra };
    setPlatformsExtra(updated);
    try { localStorage.setItem(LS_PLATFORMS_EXTRA, JSON.stringify(updated)); } catch {}

    // Guardar extra_platforms en Supabase para persistencia cross-browser
    supabase.from('clients').update({ extra_platforms: updatedExtra }).eq('id', clientId).then(() => {});

    // Guardar credenciales si es IG — SIEMPRE en Supabase (fuente principal) + localStorage (fallback)
    if ((platform === 'IG' || platform === 'IG2') && igUser) {
      const key = platform === 'IG2' ? `${clientId}_ig2` : clientId;
      // localStorage fallback
      try {
        const igCreds = JSON.parse(localStorage.getItem('cf_ig_local') || '{}');
        igCreds[key] = { ig_username: igUser, ig_password: igPass };
        localStorage.setItem('cf_ig_local', JSON.stringify(igCreds));
      } catch {}
      // Supabase — fuente principal para todos los navegadores
      supabase.from('ig_credentials').upsert({
        client_id:   key,
        ig_username: igUser.replace(/^@/, ''),
        ig_password: igPass,
        updated_at:  new Date().toISOString(),
      }, { onConflict: 'client_id' }).then(() => {});
    }

    setShowAddSocialModal(false);
  };

  // ── Borrar cliente (estático o dinámico) ──
  const handleDeleteClient = async () => {
    if (!clientId) return;
    const deletedId = clientId;

    // Borrar de Supabase (solo si existe allí)
    await supabase.from('clients').delete().eq('id', deletedId);

    // Borrar de estado local + localStorage (clientes dinámicos)
    const updatedDynamic = dynamicClients.filter(c => c.id !== deletedId);
    setDynamicClients(updatedDynamic);
    try { localStorage.setItem(LS_DYNAMIC_CLIENTS, JSON.stringify(updatedDynamic)); } catch {}

    // Registrar el ID como eliminado (cubre también clientes estáticos del JSON)
    const updatedDeleted = new Set(deletedClientIds);
    updatedDeleted.add(deletedId);
    setDeletedClientIds(updatedDeleted);
    try { localStorage.setItem(LS_DELETED_CLIENTS, JSON.stringify([...updatedDeleted])); } catch {}

    // Seleccionar el primer cliente disponible
    const remaining = [...CLIENTS, ...updatedDynamic].filter(c => !updatedDeleted.has(c.id));
    const next = remaining[0];
    if (next) selectClient(next.id); else setClientId('');
    setConfirmDeleteClient(false);
  };

  const activeClient   = ALL_CLIENTS.find(c => c.id === clientId);
  const clientPlatforms = activeClient
    ? [activeClient.platform, ...(platformsExtra[clientId] ?? [])]
    : [];
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const approvedCount  = posts.filter(p => p.status === 'approved').length;

  // ── Guards ──
  if (isIgCallback) return <IgCallback />;
  // ig-test DESACTIVADO — causaba alertas de seguridad en cuentas de clientes (login desde Vercel/Virginia)
  // if (window.location.pathname === '/ig-test') return <IgCredentialTest />;
  if (isPrivacyPage) return <PrivacyPage />;
  if (showMcSettings) return <MetricoolSettingsModal onClose={() => setShowMcSettings(false)} />;
  if (!isClientPortal && !adminAuth) return <AdminLogin onLogin={() => setAdminAuth(true)} />;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen font-sans pb-20 ${isAdmin ? 'bg-[#0f1117] text-white' : 'bg-[#f7f6f3] text-gray-900'}`}>

      {/* ── Navbar admin ── */}
      {isAdmin ? (
        <nav className="bg-[#1a1d27] border-b border-gray-800 px-5 py-2.5 flex flex-col gap-2 sticky top-0 z-50 shadow-lg">

          {/* ── Fila 1: Logo + Buscador + Badges plataforma ── */}
          <div className="flex items-center gap-4">
            <img src={logoInteractivos} alt="Interactivos" className="h-7 w-auto shrink-0 object-contain" />

            {/* Buscador */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden focus-within:border-[#52b788] bg-[#252836]">
                <span className="pl-3 text-gray-500 text-base">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowDrop(true); }}
                  onFocus={() => setShowDrop(true)}
                  placeholder="Buscar cliente..."
                  className="p-2 text-sm font-bold outline-none w-64 bg-[#252836] placeholder-gray-500 text-gray-100"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(''); setShowDrop(true); }}
                    className="pr-3 text-gray-300 hover:text-gray-500 text-sm font-black"
                  >✕</button>
                )}
              </div>

              {/* Dropdown */}
              {showDrop && filteredClients.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-[#1a1d27] border border-gray-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  {filteredClients.length === ALL_CLIENTS.length && (
                    <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-700">
                      {ALL_CLIENTS.length} clientes
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
                      <PlatformBadge p={c.platform} small />
                      <span className="text-sm font-bold truncate">{c.name}</span>
                      {(platformsExtra[c.id] ?? []).map((ep, i) => (
                        <PlatformBadge key={i} p={ep} small />
                      ))}
                    </button>
                  ))}
                  {filteredClients.length === 0 && (
                    <div className="px-3 py-4 text-xs text-gray-500 text-center">Sin resultados</div>
                  )}
                </div>
              )}
            </div>

            {/* Badges plataforma del cliente activo */}
            {activeClient && clientPlatforms.map((p, i) => (
              <PlatformBadge key={i} p={p} />
            ))}
          </div>

          {/* ── Fila 2: Stats + Botones de acción ── */}
          <div className="flex items-center justify-between gap-2">

            {/* Stats publicación */}
            <div className="flex items-center gap-3">
              {posts.length > 0 && (
                <>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                    {scheduledCount}/12 publicados
                  </span>
                  {approvedCount > 0 && (
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      {approvedCount} listos
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Botones */}
            <div className="flex items-center gap-2">

              {/* Modo selección activo */}
              {shareMode && activeClient ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">
                    {selectedPosts.size === 0 ? 'Selecciona posts' : `${selectedPosts.size} seleccionados`}
                  </span>
                  <button
                    onClick={() => {
                      const base = `https://contentflow-4wos.vercel.app/p/${activeClient.id}`;
                      const url = selectedPosts.size > 0
                        ? `${base}?show=${[...selectedPosts].sort((a,b)=>a-b).join(',')}`
                        : base;
                      navigator.clipboard.writeText(url);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2500);
                    }}
                    disabled={selectedPosts.size === 0}
                    className="text-xs font-bold bg-[#52b788] text-black px-3 py-1.5 rounded-lg hover:bg-[#40916c] disabled:opacity-40 uppercase tracking-widest"
                  >
                    {copiedLink ? '✅ Copiado' : '📋 Copiar link'}
                  </button>
                  <button
                    onClick={() => {
                      const selectableNums = posts
                        .filter(p => p.status !== 'approved' && p.status !== 'scheduled')
                        .map(p => p.post_number);
                      const allSelected = selectableNums.every(n => selectedPosts.has(n));
                      if (allSelected) setSelectedPosts(new Set());
                      else setSelectedPosts(new Set(selectableNums));
                    }}
                    className="text-xs font-bold text-gray-300 border border-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-800 uppercase tracking-widest"
                  >
                    {posts.filter(p => p.status !== 'approved' && p.status !== 'scheduled')
                         .every(p => selectedPosts.has(p.post_number))
                      ? '☐ Deselec. todos' : '☑ Selec. todos'}
                  </button>
                  <button
                    onClick={() => { setShareMode(false); setSelectedPosts(new Set()); }}
                    className="text-xs font-bold text-gray-400 border border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-800 uppercase tracking-widest"
                  >✕ Cancelar</button>
                </div>
              ) : (
                <>
                  {/* ＋ Cliente */}
                  <button
                    onClick={() => setShowAddClientModal(true)}
                    className="text-xs font-bold text-[#52b788] border border-[#52b788] px-3 py-1.5 rounded-lg hover:bg-[#52b788] hover:text-black transition-colors uppercase tracking-widest shrink-0"
                  >
                    ＋ Cliente
                  </button>

                  {/* 🗑 Borrar cliente */}
                  {activeClient && !confirmDeleteClient && (
                    <button
                      onClick={() => setConfirmDeleteClient(true)}
                      className="text-xs font-bold text-red-400 border border-red-800 px-3 py-1.5 rounded-lg hover:bg-red-900 hover:text-red-200 transition-colors uppercase tracking-widest shrink-0"
                    >
                      🗑 Borrar
                    </button>
                  )}
                  {confirmDeleteClient && (
                    <div className="flex items-center gap-2 bg-red-950 border border-red-700 rounded-lg px-3 py-1.5 shrink-0">
                      <span className="text-red-300 text-xs font-bold uppercase tracking-widest">¿Seguro?</span>
                      <button
                        onClick={handleDeleteClient}
                        className="text-xs font-black text-white bg-red-600 hover:bg-red-500 px-2 py-0.5 rounded transition-colors uppercase"
                      >
                        Sí, borrar
                      </button>
                      <button
                        onClick={() => setConfirmDeleteClient(false)}
                        className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}

                  {/* ＋ Crear post */}
                  {clientId && (
                    <button
                      onClick={() => handleCreatePost('admin')}
                      disabled={creatingPost}
                      className="text-xs font-bold bg-[#52b788] text-black px-4 py-1.5 rounded-lg hover:bg-[#40916c] transition-colors uppercase tracking-widest disabled:opacity-50 shrink-0"
                    >
                      {creatingPost ? '...' : '＋ Crear post'}
                    </button>
                  )}

                  {/* 🔗 Compartir (abre modo selección) */}
                  {activeClient && (
                    <button
                      onClick={() => { setShareMode(true); setSelectedPosts(new Set()); }}
                      className="text-xs font-bold text-[#52b788] border border-[#52b788] px-3 py-1.5 rounded-lg hover:bg-[#52b788] hover:text-black transition-colors uppercase tracking-widest shrink-0"
                    >
                      🔗 Compartir
                    </button>
                  )}

                  {/* ✉️ Email cliente */}
                  {activeClient?.email && activeClient.email !== '-' && (
                    <button
                      onClick={() => {
                        setEmailSubject(`Revisión de posts – ${activeClient.name}`);
                        const contactName = (activeClient.contact && activeClient.contact !== '-')
                          ? activeClient.contact
                          : activeClient.name;
                        setEmailBody(`Hola ${contactName},\n\nte envío el enlace para aprobar los posts:\n\n`);
                        setShowEmailModal(true);
                      }}
                      className="text-xs font-bold text-amber-400 border border-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-900 hover:text-amber-200 transition-colors uppercase tracking-widest shrink-0"
                    >
                      ✉️ Email
                    </button>
                  )}


                  {/* Instagram / Facebook / Metricool */}
                  {activeClient?.platform === 'IG' ? (
                    <ConnectInstagram
                      key={`${activeClient.id}-${igRefreshKey}`}
                      clientId={activeClient.id}
                      clientName={activeClient.name}
                      igUser={activeClient.ig_username}
                      igPass={activeClient.ig_password}
                      onUsernameChange={setIgUsername}
                      onAccountTypeChange={setIgAccountType}
                    />
                  ) : activeClient?.platform === 'FB' ? (
                    <a
                      href={activeClient.profile_url && activeClient.profile_url !== '-' ? activeClient.profile_url : 'https://www.facebook.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-400 border border-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-900 hover:text-blue-200 transition-colors uppercase tracking-widest flex items-center gap-1 shrink-0"
                    >
                      📘 Facebook
                    </a>
                  ) : activeClient ? (
                    <button
                      onClick={() => setShowMcSettings(true)}
                      title="Ajustes Metricool"
                      className="text-xs font-bold text-purple-400 border border-purple-800 px-3 py-1.5 rounded-lg hover:bg-purple-900 hover:text-purple-200 transition-colors uppercase tracking-widest flex items-center gap-1 shrink-0"
                    >
                      📊 Metricool
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </nav>
      ) : (
        /* ── Navbar cliente ── */
        <nav className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-50 shadow-sm px-6">
          <div className="flex items-center gap-3">
            <img src={logoInteractivos} alt="Interactivos" className="h-10 w-auto object-contain" />
            <h1 className="font-black text-[#2d6a4f] tracking-tighter uppercase text-xl italic">
              Portal de Aprobación
            </h1>
          </div>
          {isClientPortal && clientId && (
            <button
              onClick={() => handleCreatePost('client')}
              disabled={creatingPost}
              className="text-[11px] font-black bg-[#2d6a4f] text-white px-4 py-2 rounded-xl hover:bg-[#1b4332] transition-colors uppercase tracking-widest disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
            >
              {creatingPost ? '...' : '＋ Añadir post'}
            </button>
          )}
        </nav>
      )}

      {/* ── Banner Instagram conectado ── */}
      {igJustConnected && (
        <div className="bg-green-600 text-white px-5 py-3 flex items-center gap-3 text-sm font-bold animate-pulse">
          <span className="text-lg">📸</span>
          ¡Instagram conectado correctamente! Ya puedes publicar desde ContentFlow.
          <button onClick={() => setIgJustConnected(false)} className="ml-auto text-green-200 hover:text-white">✕</button>
        </div>
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
                  ? <>Fase J2 — Kit Digital{' · '}{activeClient.platform === 'LI' ? 'LinkedIn' : activeClient.platform === 'FB' ? 'Facebook' : 'Instagram'}{activeClient.stage ? ` · ${activeClient.stage}` : ''}</>
                  : 'Kit Digital'
                }
              </p>
              {/* ── Botón Añadir Red Social ── */}
              {isAdmin && (
                <button
                  onClick={() => setShowAddSocialModal(true)}
                  className="mt-2 text-[10px] font-bold text-gray-500 border border-gray-700 px-2.5 py-1 rounded-lg hover:border-[#52b788] hover:text-[#52b788] transition-colors uppercase tracking-widest"
                >
                  📲 ＋ Red social
                </button>
              )}
              {/* Badges de plataformas extra */}
              {(platformsExtra[clientId] ?? []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(platformsExtra[clientId] ?? []).map((p, i) => (
                    <span key={i} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      p === 'LI'  ? 'bg-blue-900 text-blue-300'  :
                      p === 'FB'  ? 'bg-blue-950 text-blue-400'  :
                      p === 'IG2' ? 'bg-pink-950 text-pink-300'  :
                      'bg-pink-900 text-pink-300'
                    }`}>{p === 'IG2' ? '2ª Instagram' : p === 'FB' ? 'Facebook' : p === 'LI' ? 'LinkedIn' : 'Instagram'}</span>
                  ))}
                </div>
              )}
            </div>

            {isAdmin && (
              <div className="text-right text-sm text-gray-400 leading-relaxed shrink-0 flex flex-col items-end gap-1.5">
                {activeClient.notes && activeClient.notes !== '-' && /\d{6,}/.test(activeClient.notes) && (
                  <a href={`tel:${activeClient.notes.replace(/\s/g,'')}`} className="text-amber-400 hover:text-amber-300 font-bold text-xs">
                    📞 {activeClient.notes}
                  </a>
                )}
                {activeClient.email && activeClient.email !== '-' && (
                  <a href={`mailto:${activeClient.email}`} className="hover:text-[#52b788] block text-xs">
                    ✉️ {activeClient.email}
                  </a>
                )}

                {/* ── Acceso portal cliente ── */}
                <div className="mt-1 flex flex-col items-end gap-1.5 bg-[#252836] rounded-xl px-3 py-2.5 border border-gray-700">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Acceso cliente</span>
                  {activeClient.contact && activeClient.contact !== '-' && (
                    <span className="text-lg font-black text-white leading-tight">{activeClient.contact}</span>
                  )}
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://contentflow-4wos.vercel.app/p/${activeClient.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 font-mono underline underline-offset-2 truncate max-w-[200px] text-right"
                    >
                      🔗 /p/{activeClient.id}
                    </a>
                    <button
                      onClick={() => navigator.clipboard.writeText(`https://contentflow-4wos.vercel.app/p/${activeClient.id}`)}
                      title="Copiar enlace"
                      className="text-gray-500 hover:text-gray-300 transition-colors text-xs px-1"
                    >
                      📋
                    </button>
                  </div>
                  {igUsername && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-500">👤</span>
                      <span className="text-xs text-pink-400 font-black">@{igUsername}</span>
                    </div>
                  )}
                  {igPassword && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-500">🔒</span>
                      <button
                        onClick={() => setShowIgPassword(p => !p)}
                        className="text-xs font-mono text-amber-300 hover:text-amber-200"
                        title="Mostrar/ocultar contraseña"
                      >
                        {showIgPassword ? igPassword : '••••••••'}
                      </button>
                    </div>
                  )}
                  {/* ── Credenciales del Excel (siempre visibles para admin) ── */}
                  {(activeClient?.ig_username || activeClient?.fb_username || activeClient?.li_username) && (
                    <div className="w-full border-t border-gray-700 mt-1 pt-1.5 flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Credenciales</span>
                      {activeClient?.ig_username && (
                        <CredRow icon="📸" label="IG" user={activeClient.ig_username} pass={activeClient.ig_password || ''} />
                      )}
                      {activeClient?.fb_username && (
                        <CredRow icon="📘" label="FB" user={activeClient.fb_username} pass={activeClient.fb_password || ''} />
                      )}
                      {activeClient?.li_username && (
                        <CredRow icon="💼" label="LI" user={activeClient.li_username} pass={activeClient.li_password || ''} />
                      )}
                    </div>
                  )}
                </div>

                {activeClient.profile_url && activeClient.profile_url !== '-' && (
                  <a
                    href={activeClient.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-1 flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md hover:scale-105 active:scale-95 ${
                      activeClient.platform === 'IG'
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:from-purple-500 hover:via-pink-500 hover:to-orange-400'
                        : activeClient.platform === 'FB'
                        ? 'bg-[#1877F2] text-white hover:bg-[#166FE5]'
                        : 'bg-blue-600 text-white hover:bg-blue-500'
                    }`}
                  >
                    {activeClient.platform === 'IG' ? '📸' : activeClient.platform === 'FB' ? '📘' : '💼'}
                    Ver perfil de {activeClient.platform === 'IG' ? 'Instagram' : activeClient.platform === 'FB' ? 'Facebook' : 'LinkedIn'}
                    <span className="opacity-75">→</span>
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Banner J2 completado */}
        {isAdmin && scheduledCount >= 12 && (
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
            clientPlatform={activeClient?.platform}
            isAdmin={isAdmin}
            isClientPortal={isClientPortal}
            igAccountType={igAccountType}
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

      {/* ── Modal Enviar Email ── */}
      {showEmailModal && activeClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1a1d27] border border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-gray-500 text-xs uppercase tracking-widest">✉️ Email al cliente</h3>
                {activeClient.contact && activeClient.contact !== '-' && (
                  <p className="text-white text-2xl font-black mt-1 leading-tight">{activeClient.contact}</p>
                )}
                <p className="text-gray-400 text-sm font-bold mt-0.5">{activeClient.name}</p>
                <p className="text-amber-400 text-xs font-bold mt-0.5">{activeClient.email}</p>
              </div>
              <button onClick={() => setShowEmailModal(false)} className="text-gray-500 hover:text-gray-300 text-xl font-black">✕</button>
            </div>
            <div className="mb-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Para</label>
              <div className="px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-amber-400 text-sm font-bold">
                {activeClient.email}
              </div>
            </div>
            <div className="mb-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Asunto</label>
              <input
                type="text"
                value={emailSubject}
                onChange={e => setEmailSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm font-bold focus:outline-none focus:border-amber-500 placeholder-gray-600"
              />
            </div>
            <div className="mb-5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Mensaje</label>
              <textarea
                value={emailBody}
                onChange={e => setEmailBody(e.target.value)}
                rows={7}
                className="w-full px-3 py-2 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm focus:outline-none focus:border-amber-500 placeholder-gray-600 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const to      = encodeURIComponent(activeClient.email);
                  const subject = encodeURIComponent(emailSubject);
                  const body    = encodeURIComponent(emailBody);
                  window.open(`https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`, '_blank');
                }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-widest rounded-xl transition-colors"
              >
                ✉️ Abrir en Gmail
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-3 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest border border-gray-700 rounded-xl"
              >
                Cancelar
              </button>
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-3">
              Abre Gmail en el navegador con el mensaje listo para enviar
            </p>
          </div>
        </div>
      )}

      {/* ── Modal Añadir Cliente ── */}
      {showAddClientModal && (
        <AddClientModal
          onClose={() => setShowAddClientModal(false)}
          onAdd={handleAddClient}
        />
      )}

      {/* ── Modal Añadir Red Social ── */}
      {showAddSocialModal && activeClient && (
        <AddSocialModal
          client={activeClient}
          currentPlatforms={clientPlatforms}
          onClose={() => setShowAddSocialModal(false)}
          onAdd={handleAddSocial}
        />
      )}
    </div>
  );
}
