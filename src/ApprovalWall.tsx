// ARCHIVO: src/ApprovalWall.tsx
import {
  CheckCircle, MessageSquare, Image as ImageIcon,
  Link as LinkIcon, Loader2, AlertCircle, Sparkles,
  ChevronLeft, ChevronRight, Trash2, PlusCircle
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import type { Post } from './App';

// ─── Helpers para carrusel de imágenes ───────────────────────────────────────
// image_url puede ser: "" | "https://..." | '["url1","url2"]'
function parseImageUrls(raw: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch {}
  return [raw];
}
function serializeImageUrls(urls: string[]): string {
  const clean = urls.filter(Boolean);
  if (clean.length === 0) return '';
  if (clean.length === 1) return clean[0];
  return JSON.stringify(clean);
}

// ─── Servidor de publicación (local o cloud según VITE_PUBLISHER_URL) ────────
const PUBLISHER_URL = import.meta.env.VITE_PUBLISHER_URL || 'http://localhost:8765';

// ─── Metricool API ────────────────────────────────────────────────────────────
const MC_API      = 'https://app.metricool.com/api/v2.0';
const MC_TOKEN    = 'GCZMPVRNJMKUTWNOFCKRHZGJILQQFULCFHSGEAGWAEUTQGQXAIUYEHOAYNWFIXUX';
const MC_USER_ID  = 1440018;
const MC_PLATFORM: Record<string, string> = { IG: 'INSTAGRAM', LI: 'LINKEDIN', FB: 'FACEBOOK' };

type McClientCreds = { blogId: string };

function getMcBlogId(clientId: string): string {
  try {
    const all = JSON.parse(localStorage.getItem('mc_blogs') ?? '{}');
    return all[clientId] ?? '';
  } catch { return ''; }
}
function saveMcBlogId(clientId: string, blogId: string) {
  try {
    const all = JSON.parse(localStorage.getItem('mc_blogs') ?? '{}');
    all[clientId] = blogId;
    localStorage.setItem('mc_blogs', JSON.stringify(all));
  } catch {}
}

// ─── DateTimePicker bonito ────────────────────────────────────────────────────
function DateTimePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const parsed   = value ? new Date(value + ':00') : new Date();
  const [viewY, setViewY] = useState(parsed.getFullYear());
  const [viewM, setViewM] = useState(parsed.getMonth()); // 0-11
  const selDate  = value ? value.slice(0, 10) : '';
  const selTime  = value ? value.slice(11, 16) : '09:00';

  const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAYS   = ['L','M','X','J','V','S','D'];

  // Primer día del mes (0=dom…6=sab) convertido a lunes=0
  const firstDay = () => { const d = new Date(viewY, viewM, 1).getDay(); return d === 0 ? 6 : d - 1; };
  const daysInMonth = () => new Date(viewY, viewM + 1, 0).getDate();

  const todayStr = new Date().toISOString().slice(0, 10);

  const selectDay = (day: number) => {
    const dd = String(day).padStart(2, '0');
    const mm = String(viewM + 1).padStart(2, '0');
    onChange(`${viewY}-${mm}-${dd}T${selTime}`);
  };

  const onTimeChange = (t: string) => {
    if (selDate) onChange(`${selDate}T${t}`);
  };

  const prevMonth = () => { if (viewM === 0) { setViewM(11); setViewY(y => y - 1); } else setViewM(m => m - 1); };
  const nextMonth = () => { if (viewM === 11) { setViewM(0); setViewY(y => y + 1); } else setViewM(m => m + 1); };

  const cells: (number | null)[] = [...Array(firstDay()).fill(null), ...Array.from({length: daysInMonth()}, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col gap-1.5">
      {/* Cabecera mes */}
      <div className="flex items-center justify-between px-0.5">
        <button onClick={prevMonth} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-purple-100 text-purple-700 font-black transition-colors">‹</button>
        <span className="text-[10px] font-black text-gray-800 uppercase tracking-wide">{MONTHS[viewM]} {viewY}</span>
        <button onClick={nextMonth} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-purple-100 text-purple-700 font-black transition-colors">›</button>
      </div>
      {/* Días */}
      <div className="grid grid-cols-7 gap-px">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[8px] font-black text-gray-400 uppercase py-0.5">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const mm  = String(viewM + 1).padStart(2, '0');
          const dd  = String(day).padStart(2, '0');
          const dStr = `${viewY}-${mm}-${dd}`;
          const isPast     = dStr < todayStr;
          const isToday    = dStr === todayStr;
          const isSelected = dStr === selDate;
          return (
            <button key={i} onClick={() => !isPast && selectDay(day)} disabled={isPast}
              className={`aspect-square rounded text-[10px] font-bold transition-all flex items-center justify-center
                ${isSelected ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-sm' :
                  isToday    ? 'bg-purple-100 text-purple-700 font-black border border-purple-300' :
                  isPast     ? 'text-gray-200 cursor-not-allowed' :
                               'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}
            >{day}</button>
          );
        })}
      </div>
      {/* Sliders hora + minutos */}
      <div className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">🕐 Hora</span>
          <span className="text-sm font-black text-purple-700">{selTime}h</span>
        </div>
        {/* Slider horas */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-gray-400 w-4">0</span>
          <input type="range" min={0} max={23} value={parseInt(selTime.split(':')[0])}
            onChange={e => {
              const h = String(e.target.value).padStart(2,'0');
              const m = selTime.split(':')[1] || '00';
              onTimeChange(`${h}:${m}`);
            }}
            className="flex-1 accent-purple-600 h-1.5 cursor-pointer"
          />
          <span className="text-[9px] text-gray-400 w-4">23</span>
        </div>
        {/* Slider minutos */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-gray-400 w-4">:00</span>
          <input type="range" min={0} max={59} step={5} value={parseInt(selTime.split(':')[1] || '0')}
            onChange={e => {
              const h = selTime.split(':')[0] || '09';
              const m = String(e.target.value).padStart(2,'0');
              onTimeChange(`${h}:${m}`);
            }}
            className="flex-1 accent-pink-500 h-1.5 cursor-pointer"
          />
          <span className="text-[9px] text-gray-400 w-4">:55</span>
        </div>
        <input type="time" value={selTime} onChange={e => onTimeChange(e.target.value)}
          className="text-center text-xs font-black text-gray-600 bg-transparent border-none outline-none" />
      </div>
      {selDate && (
        <div className="text-center text-[9px] font-bold text-purple-700 bg-purple-50 rounded py-1 border border-purple-100">
          📅 {new Date(selDate + 'T12:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} · {selTime}h
        </div>
      )}
    </div>
  );
}

// ─── Export vacío para no romper el import en App.tsx ────────────────────────
export function MetricoolSettingsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => { onClose(); }, []);
  return null;
}

// ─── Modal Metricool — solo Blog ID + fecha (token y userId son fijos) ────────
type McBlog = { id: number; label: string; instagram: string | null };

function MetricoolModal({
  clientId, clientName, postNumber, imageUrls, onConfirm, onCancel,
}: {
  clientId: string; clientName: string; postNumber: number; imageUrls: string[];
  onConfirm: (creds: McClientCreds, date: string) => void;
  onCancel: () => void;
}) {
  const [blogId, setBlogId] = useState(getMcBlogId(clientId));
  const [selectedBlog, setSelectedBlog] = useState<McBlog | null>(null);
  const tomorrow = new Date(Date.now() + 86400000);
  tomorrow.setHours(9, 0, 0, 0);
  const tomorrowMadrid = tomorrow.toLocaleString('sv-SE', { timeZone: 'Europe/Madrid' }).replace(' ', 'T').slice(0, 16);
  const [schedDate, setSchedDate] = useState(tomorrowMadrid);
  const [blogs, setBlogs]         = useState<McBlog[] | null>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [blogsError, setBlogsError]     = useState('');

  const fetchBlogs = async () => {
    setLoadingBlogs(true); setBlogsError(''); setBlogs(null);
    try {
      const res = await fetch('/api/metricool-blogs');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (data?.data && Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        setBlogsError('Formato inesperado: ' + JSON.stringify(data).slice(0, 100));
      }
    } catch (e) {
      setBlogsError(`Error al conectar: ${String(e).slice(0, 100)}`);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleConfirm = (publishNow = false) => {
    if (!blogId) return alert('Introduce el Blog ID del cliente.');
    saveMcBlogId(clientId, blogId);
    let date: string;
    if (publishNow) {
      // +3 min buffer — margen para cuentas no premium
      const now = new Date(Date.now() + 3 * 60000);
      date = now.toLocaleString('sv-SE', { timeZone: 'Europe/Madrid' }).replace(' ', 'T').slice(0, 16);
    } else {
      date = schedDate; // datetime-local ya da hora local del navegador (Madrid)
    }
    onConfirm({ blogId }, date);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-sm w-full border-2 border-purple-200 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📊</span>
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">Metricool — Post #{postNumber}</h3>
          </div>

          {/* Página Cliente */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Página Cliente</span>

            {/* Si hay blog seleccionado: mostrar tarjeta bonita */}
            {selectedBlog ? (
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl px-3 py-2.5 gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg shrink-0">📄</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-gray-900 truncate">{selectedBlog.label || clientName}</span>
                    {selectedBlog.instagram
                      ? <span className="text-[10px] font-bold text-pink-500">@{selectedBlog.instagram}</span>
                      : null}
                    <span className="text-[9px] text-gray-400 font-mono">ID {selectedBlog.id}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedBlog(null); setBlogId(''); setBlogs(null); }}
                  className="shrink-0 text-[10px] text-gray-400 hover:text-red-500 border border-gray-200 bg-white rounded-lg px-2 py-1 transition-colors"
                >✕ Cambiar</button>
              </div>
            ) : (
              /* Sin selección: input manual + botón buscar */
              <div className="flex gap-2">
                <input type="text" value={blogId} onChange={e => { setBlogId(e.target.value); setSelectedBlog(null); }}
                  placeholder="Busca abajo ↓ o introduce ID"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300" />
                <button
                  onClick={fetchBlogs}
                  disabled={loadingBlogs}
                  className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs font-black transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {loadingBlogs ? '⏳' : '🔍 Buscar'}
                </button>
              </div>
            )}
            {!selectedBlog && <span className="text-[10px] text-gray-400">Se guarda por cliente automáticamente.</span>}
          </div>

          {/* Lista de páginas */}
          {blogsError && (
            <p className="text-[10px] text-red-500 bg-red-50 rounded-lg px-3 py-2">{blogsError}</p>
          )}
          {!selectedBlog && blogs && blogs.length > 0 && (
            <div className="border border-purple-100 rounded-xl overflow-hidden max-h-44 overflow-y-auto">
              <p className="text-[9px] font-bold text-gray-400 uppercase px-3 py-1.5 bg-gray-50 border-b border-gray-100">
                Selecciona la página del cliente:
              </p>
              {blogs.map(b => (
                <button
                  key={b.id}
                  onClick={() => { setBlogId(String(b.id)); setSelectedBlog(b); }}
                  className={`w-full text-left px-3 py-2.5 flex items-center gap-2.5 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-0 ${String(b.id) === blogId ? 'bg-purple-50' : ''}`}
                >
                  <span className="text-base shrink-0">📄</span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className={`text-xs font-bold truncate ${String(b.id) === blogId ? 'text-purple-700' : 'text-gray-800'}`}>{b.label || 'Sin nombre'}</span>
                    {b.instagram && <span className="text-[10px] text-pink-500 font-bold">@{b.instagram}</span>}
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono shrink-0">{b.id}</span>
                </button>
              ))}
            </div>
          )}
          {!selectedBlog && blogs && blogs.length === 0 && (
            <p className="text-[10px] text-gray-400 text-center py-2">No se encontraron páginas en esta cuenta.</p>
          )}

          {/* Fecha */}
          {/* Calendario */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Fecha y hora</span>
            <div className="border border-purple-100 rounded-xl p-3 bg-white">
              <DateTimePicker value={schedDate} onChange={setSchedDate} />
            </div>
          </div>

          {/* Preview imágenes que se enviarán */}
          {imageUrls.length > 0 ? (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
                📎 {imageUrls.length} imagen{imageUrls.length > 1 ? 'es' : ''} que se enviarán:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {imageUrls.map((url, i) => (
                  <img key={i} src={url} alt={`img ${i+1}`}
                    className="h-16 w-16 object-cover rounded-lg border border-purple-200 flex-shrink-0"
                    onError={e => { (e.target as HTMLImageElement).style.outline = '2px solid red'; }} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              ⚠️ Este post no tiene imagen subida. Instagram requiere imagen para publicar en el feed.
            </p>
          )}

          {/* Publicar ahora */}
          <button onClick={() => handleConfirm(true)}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors">
            ⚡ Publicar ahora
          </button>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-xs font-black uppercase hover:bg-gray-50">Cancelar</button>
            <button onClick={() => handleConfirm(false)} className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-black uppercase hover:opacity-90 flex items-center justify-center gap-1.5">
              📅 Programar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Props = {
  posts: Post[];
  clientId: string;
  clientName: string;
  isAdmin: boolean;
  isClientPortal?: boolean;
  igAccountType?: 'business' | 'personal' | 'none';
  onUpdatePost: (postId: string, updates: Partial<Post>) => Promise<void>;
  onDeletePost: (postId: string) => Promise<void>;
  shareMode?: boolean;
  selectedPosts?: Set<number>;
  onToggleSelect?: (n: number) => void;
};

// ─── Modal de confirmación de borrado ─────────────────────────────────────────
function ConfirmDeleteModal({ postNumber, onConfirm, onCancel }: {
  postNumber: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border-2 border-red-200">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={22} className="text-red-500" />
          </div>
          <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">
            ¿Borrar el post #{postNumber}?
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Esta acción eliminará el post permanentemente de la base de datos.
            <strong className="block text-red-500 mt-1">No se puede deshacer.</strong>
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 size={12} /> Sí, borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal confirmación publicar Instagram ────────────────────────────────────
const PLATFORM_CFG: Record<string, { label: string; icon: React.ReactNode; border: string; btnCls: string }> = {
  IG: { label: 'Instagram', icon: <span className="text-lg">📸</span>, border: 'border-pink-200',   btnCls: 'bg-gradient-to-r from-pink-500 to-purple-600' },
  LI: { label: 'LinkedIn',  icon: <span className="text-lg">💼</span>, border: 'border-blue-200',   btnCls: 'bg-gradient-to-r from-blue-600 to-blue-800'   },
  FB: { label: 'Facebook',  icon: <span className="text-lg">📘</span>, border: 'border-indigo-200', btnCls: 'bg-gradient-to-r from-blue-700 to-indigo-800'  },
};

function ConfirmPublishModal({ postNumber, platform, onConfirm, onCancel }: {
  postNumber: number;
  platform: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const cfg = PLATFORM_CFG[platform] ?? PLATFORM_CFG['IG'];
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className={`bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border-2 ${cfg.border}`}>
        <div className="flex flex-col items-center text-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cfg.btnCls}`}>
            {cfg.icon}
          </div>
          <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">
            ¿Publicar el Post #{postNumber}?
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Se abrirá Chrome, hará login en <strong className="text-gray-700">{cfg.label}</strong> y publicará el post automáticamente.
          </p>
          <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 w-full">
            ⚠️ Asegúrate de que <code className="font-mono">publisher_server.py</code> está corriendo en tu Mac.
          </p>
          <div className="flex gap-3 w-full mt-1">
            <button onClick={onCancel} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button onClick={onConfirm} className={`flex-1 py-2.5 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 ${cfg.btnCls}`}>
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal programar Instagram (Business API) ────────────────────────────────
function IgSchedulerModal({ postNumber, imageUrls, onPublishNow, onSchedule, onCancel }: {
  postNumber: number;
  imageUrls: string[];
  onPublishNow: () => void;
  onSchedule: (dt: string) => void;
  onCancel: () => void;
}) {
  const tomorrow = new Date(Date.now() + 86400000);
  tomorrow.setHours(9, 0, 0, 0);
  const tomorrowStr = tomorrow.toLocaleString('sv-SE', { timeZone: 'Europe/Madrid' }).replace(' ', 'T').slice(0, 16);
  const [schedDate, setSchedDate] = useState(tomorrowStr);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-5 max-w-sm w-full border-2 border-pink-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📸</span>
          <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">Instagram · Post #{postNumber}</h3>
        </div>

        {!imageUrls.length && (
          <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
            ⚠️ Este post no tiene imagen. Instagram requiere imagen para publicar.
          </p>
        )}

        {/* Publicar ahora */}
        <button onClick={onPublishNow}
          className="w-full py-3 mb-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:opacity-90 flex items-center justify-center gap-2">
          ⚡ Publicar ahora
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">o programar</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Calendario */}
        <div className="border border-pink-100 rounded-xl p-3 bg-white mb-4">
          <DateTimePicker value={schedDate} onChange={setSchedDate} />
        </div>

        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-xs font-black uppercase hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={() => onSchedule(schedDate)}
            disabled={!schedDate}
            className="flex-1 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-xs font-black uppercase hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-1.5">
            📅 Programar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal estado publicación Instagram ───────────────────────────────────────
type PublishJobStatus = 'running' | 'needs_2fa' | 'wrong_credentials' | 'success' | 'error';

function PublishStatusModal({ status, message, jobId, onClose }: {
  status: PublishJobStatus;
  message: string;
  jobId: string;
  onClose: () => void;
}) {
  const [continuing, setContinuing] = useState(false);

  const handle2FA = async () => {
    setContinuing(true);
    try {
      await fetch(`${PUBLISHER_URL}/continue/${jobId}`, { method: 'POST' });
    } catch { /* silencioso */ }
    setContinuing(false);
  };

  const canClose = ['success', 'error', 'wrong_credentials'].includes(status);

  const icons: Record<PublishJobStatus, React.ReactNode> = {
    running:           <Loader2 size={32} className="animate-spin text-blue-500" />,
    needs_2fa:         <span className="text-4xl">📱</span>,
    wrong_credentials: <span className="text-4xl">🔐</span>,
    success:           <CheckCircle size={32} className="text-green-500" />,
    error:             <AlertCircle size={32} className="text-red-500" />,
  };

  const titles: Record<PublishJobStatus, string> = {
    running:           'Publicando en Instagram...',
    needs_2fa:         'Verificación en 2 pasos',
    wrong_credentials: 'Credenciales incorrectas',
    success:           '¡Publicado! 🎉',
    error:             'Error al publicar',
  };

  const borderColors: Record<PublishJobStatus, string> = {
    running:           'border-blue-200',
    needs_2fa:         'border-amber-300',
    wrong_credentials: 'border-red-300',
    success:           'border-green-300',
    error:             'border-red-200',
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className={`bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border-2 ${borderColors[status]}`}>
        <div className="flex flex-col items-center text-center gap-4">
          {icons[status]}
          <h3 className="text-base font-black text-gray-900">{titles[status]}</h3>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{message}</p>

          {status === 'needs_2fa' && (
            <button
              onClick={handle2FA}
              disabled={continuing}
              className="w-full py-3 bg-[#2d6a4f] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#1b4332] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {continuing ? <Loader2 size={14} className="animate-spin" /> : '✅'}
              Ya introduje el código
            </button>
          )}

          {status === 'wrong_credentials' && (
            <div className="text-[11px] text-gray-500 bg-gray-50 rounded-lg px-3 py-2 w-full text-left">
              Abre <code className="font-mono text-[10px]">clients_credentials.json</code> y comprueba
              usuario y contraseña para este cliente.
            </div>
          )}

          {canClose && (
            <button
              onClick={onClose}
              className="w-full py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              {status === 'success' ? '🎉 Cerrar' : 'Cerrar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Botón publicar dinámico por plataforma ──────────────────────────────────
function PublishButton({ platform, onClick }: { platform: string; onClick: () => void }) {
  const cfg: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    IG: {
      label: 'Publicar ahora en Instagram',
      icon:  <span className="text-lg">📸</span>,
      cls:   'bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 shadow-lg shadow-slate-900/30',
    },
    LI: {
      label: 'Publicar en LinkedIn',
      icon:  <span className="text-lg">💼</span>,
      cls:   'bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90',
    },
    FB: {
      label: 'Publicar en Facebook',
      icon:  <span className="text-lg">📘</span>,
      cls:   'bg-gradient-to-r from-blue-700 to-indigo-800 hover:opacity-90',
    },
  };
  const c = cfg[platform] ?? cfg['IG'];
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-3 ${c.cls}`}
    >
      {c.icon} {c.label}
    </button>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ urls, startIdx, onClose }: { urls: string[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);

  // Cerrar con Escape, navegar con flechas
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => Math.min(urls.length - 1, i + 1));
      if (e.key === 'ArrowLeft')  setIdx(i => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [urls.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Imagen */}
      <img
        src={urls[idx]}
        alt={`Imagen ${idx + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      />

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-black transition-colors"
      >✕</button>

      {/* Flechas */}
      {urls.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); setIdx(i => Math.max(0, i - 1)); }}
            disabled={idx === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl disabled:opacity-20 transition-colors"
          ><ChevronLeft size={24} /></button>
          <button
            onClick={e => { e.stopPropagation(); setIdx(i => Math.min(urls.length - 1, i + 1)); }}
            disabled={idx === urls.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl disabled:opacity-20 transition-colors"
          ><ChevronRight size={24} /></button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">
            {idx + 1} / {urls.length}
          </span>
        </>
      )}
    </div>
  );
}

// ─── Toast interno ────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: 'ok' | 'err' }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-bold text-white flex items-center gap-2 animate-bounce ${
      type === 'ok' ? 'bg-[#2d6a4f]' : 'bg-red-500'
    }`}>
      {type === 'ok' ? '✅' : '❌'} {msg}
    </div>
  );
}

// ─── Hook para subir imagen a Supabase Storage ────────────────────────────────
function useImageUpload(clientId: string, onUpdatePost: Props['onUpdatePost']) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // mode: 'replace' sustituye la imagen actual del carrusel, 'add' añade una nueva slide
  const saveToCloud = async (
    postId: string,
    fileOrBlob: Blob | File,
    existingUrls: string[],
    mode: 'replace' | 'add',
    replaceIdx: number = 0
  ) => {
    setUploadingId(postId);
    const ts = Date.now();
    const fileName = `${clientId}/${postId}_${ts}.png`;
    const { error } = await supabase.storage
      .from('post-images')
      .upload(fileName, fileOrBlob, { upsert: true });

    if (!error) {
      const { data } = supabase.storage.from('post-images').getPublicUrl(fileName);
      const newUrl = `${data.publicUrl}?v=${ts}`;
      let updatedUrls: string[];
      if (mode === 'add') {
        updatedUrls = [...existingUrls, newUrl];
      } else {
        updatedUrls = existingUrls.length > 0
          ? existingUrls.map((u, i) => i === replaceIdx ? newUrl : u)
          : [newUrl];
      }
      await onUpdatePost(postId, { image_url: serializeImageUrls(updatedUrls) });
    }
    setUploadingId(null);
  };

  const handleFile = async (
    postId: string,
    e: React.ChangeEvent<HTMLInputElement>,
    existingUrls: string[],
    mode: 'replace' | 'add',
    replaceIdx: number = 0
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (mode === 'add' || files.length > 1) {
      // Subir todas las fotos seleccionadas como slides nuevas
      let currentUrls = [...existingUrls];
      for (let i = 0; i < files.length; i++) {
        const ts = Date.now() + i;
        const fileName = `${postId}_${ts}.png`;
        setUploadingId(postId);
        const { error } = await supabase.storage
          .from('post-images')
          .upload(`${clientId}/${fileName}`, files[i], { upsert: true });
        if (!error) {
          const { data } = supabase.storage.from('post-images').getPublicUrl(`${clientId}/${fileName}`);
          currentUrls = [...currentUrls, `${data.publicUrl}?v=${ts}`];
        }
      }
      await onUpdatePost(postId, { image_url: serializeImageUrls(currentUrls) });
      setUploadingId(null);
    } else {
      // Reemplazar una sola imagen
      await saveToCloud(postId, files[0], existingUrls, mode, replaceIdx);
    }
    e.target.value = '';
  };

  const handleUrl = async (
    postId: string,
    existingUrls: string[],
    mode: 'replace' | 'add',
    replaceIdx: number = 0
  ) => {
    const url = prompt('Pega la URL de la imagen:');
    if (!url) return;
    setUploadingId(postId);
    try {
      const blob = await fetch(url).then(r => r.blob());
      await saveToCloud(postId, blob, existingUrls, mode, replaceIdx);
    } catch {
      alert('CORS Error: Esta web bloquea el acceso directo. Descarga la imagen y súbela desde PC.');
      setUploadingId(null);
    }
  };

  return { uploadingId, handleFile, handleUrl };
}


// ─── Notificaciones email vía EmailJS ────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_9hv3bd4';
const EMAILJS_TEMPLATE_ID = 'template_laumpek';
const EMAILJS_PUBLIC_KEY  = 'PnA_k4lRMrrGR5XJP';
const NOTIFY_EMAIL        = 'pau.blanch@interactivos.net';

async function sendEmailNotification(templateParams: Record<string, string>) {
  if (EMAILJS_TEMPLATE_ID === 'PENDING_TEMPLATE') return;
  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id:      EMAILJS_SERVICE_ID,
        template_id:     EMAILJS_TEMPLATE_ID,
        user_id:         EMAILJS_PUBLIC_KEY,
        template_params: templateParams,
      }),
    });
  } catch { /* silencioso */ }
}

async function notifyApproval(post: Post, clientName: string) {
  await sendEmailNotification({
    to_email:     NOTIFY_EMAIL,
    type:         'Aprobado ✅',
    client_name:  clientName,
    post_number:  String(post.post_number),
    platform:     post.platform,
    copy_preview: post.copy.slice(0, 120) + (post.copy.length > 120 ? '...' : ''),
    portal_url:   `${window.location.origin}/p/${post.client_id}`,
    feedback:     '',
  });
}

async function notifyChangesRequested(post: Post, clientName: string, feedback: string) {
  await sendEmailNotification({
    to_email:     NOTIFY_EMAIL,
    type:         'Cambios solicitados ⚠️',
    client_name:  clientName,
    post_number:  String(post.post_number),
    platform:     post.platform,
    copy_preview: post.copy.slice(0, 120) + (post.copy.length > 120 ? '...' : ''),
    portal_url:   `${window.location.origin}/p/${post.client_id}`,
    feedback:     feedback,
  });
}

// ─── Tarjeta de post ──────────────────────────────────────────────────────────
function PostCard({
  post, allPosts, clientId, clientName, isAdmin, isClientPortal = false, igAccountType = 'none', onUpdatePost, onDeletePost, uploadingId, handleFile, handleUrl,
  shareMode, isSelected, onToggleSelect,
}: {
  post: Post;
  allPosts: Post[];
  clientId: string;
  clientName: string;
  isAdmin: boolean;
  isClientPortal?: boolean;
  igAccountType?: 'business' | 'personal' | 'none';
  onUpdatePost: Props['onUpdatePost'];
  onDeletePost: Props['onDeletePost'];
  uploadingId: string | null;
  handleFile: (id: string, e: React.ChangeEvent<HTMLInputElement>, existing: string[], mode: 'replace'|'add', idx?: number) => void;
  handleUrl:  (id: string, existing: string[], mode: 'replace'|'add', idx?: number) => void;
  shareMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}) {
  // El cliente puede editar todos los posts visibles en su portal
  const canClientEdit = isClientPortal;

  const [toast, setToast]                 = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
  const [editingCopy, setEditingCopy]     = useState(false);
  const [copyDraft, setCopyDraft]         = useState(post.copy);
  const [grokLoading, setGrokLoading]     = useState(false);

  // ── Generar imagen con IA ──
  const [showAIImg, setShowAIImg]         = useState(false);
  const [aiImgPrompt, setAIImgPrompt]     = useState('');
  const [aiImgLoading, setAIImgLoading]   = useState(false);
  const [hashtagsLoading, setHashtagsLoading] = useState(false);

  // ── Metricool Publisher ──
  const [showMcModal, setShowMcModal]     = useState(false);
  const [mcSending, setMcSending]         = useState(false);
  const [lightboxIdx, setLightboxIdx]     = useState<number | null>(null);

  const handleSendToMetricool = async (creds: McClientCreds, schedDate: string) => {
    setShowMcModal(false); setMcSending(true);
    try {
      const { blogId } = creds;
      const userToken  = MC_TOKEN;
      const userId     = MC_USER_ID;
      const caption = post.copy + '\n\n' + (post.hashtags ?? []).map(h => `#${h.replace(/^#+/, '')}`).join(' ');
      const imageUrls = parseImageUrls(post.image_url);
      const network = MC_PLATFORM[post.platform] ?? 'INSTAGRAM';
      const body: Record<string, unknown> = {
        blogId:          Number(blogId),
        text:            caption,
        publicationDate: schedDate,
        autoPublish:     true,
        providers:       [{ network }],
      };
      // Metricool: media = array de strings (URLs directas), saveExternalMediaFiles: true
      if (imageUrls.length > 0) {
        body.media = imageUrls.map(u => u.split('?')[0]);
        body.saveExternalMediaFiles = true;
      }
      // autoPublish también dentro del objeto de datos de red (cubre todos los formatos de la API)
      if (network === 'INSTAGRAM') {
        body.instagramData = { autoPublish: true };
      } else if (network === 'LINKEDIN') {
        body.linkedInData = { autoPublish: true };
      } else if (network === 'FACEBOOK') {
        body.facebookData = { autoPublish: true };
      }

      // Llamamos a la Vercel Serverless Function (sin CORS, sin servidor local)
      const res = await fetch('/api/metricool-post', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      if (res.ok) {
        await onUpdatePost(post.id, {
          status:          'scheduled',
          webhook_sent_at: new Date(schedDate).toISOString(),
        });
        showToast('✅ Programado en Metricool', 'ok');
      } else {
        const err = await res.text();
        console.error('Metricool error completo:', err);
        showToast(`Error Metricool: ${err.slice(0, 200)}`, 'err');
      }
    } catch (e: unknown) {
      showToast(`Error de red: ${String(e).slice(0, 60)}`, 'err');
    } finally {
      setMcSending(false);
    }
  };

  // ── Instagram Publisher ──
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showIgScheduler,    setShowIgScheduler]    = useState(false);
  const [publishJobId, setPublishJobId]             = useState<string | null>(null);
  const [publishStatus, setPublishStatus]           = useState<PublishJobStatus | null>(null);
  const [publishMessage, setPublishMessage]         = useState('');
  const pollRef                                     = useRef<ReturnType<typeof setInterval> | null>(null);
  const [editingTags, setEditingTags]     = useState(false);
  const [tagsDraft, setTagsDraft]         = useState(post.hashtags?.map(h => `#${h.replace(/^#+/, '')}`).join(' ') ?? '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const isChanges     = post.status === 'changes';
  const isChangesDone = post.status === 'changes_done';
  const isApproved    = post.status === 'approved';
  const isScheduled   = post.status === 'scheduled';

  // ── Carrusel de imágenes ──
  const imageUrls = parseImageUrls(post.image_url);
  const [currentIdx, setCurrentIdx] = useState(0);
  const safeIdx = imageUrls.length > 0 ? Math.min(currentIdx, imageUrls.length - 1) : 0;
  const currentImage = imageUrls[safeIdx] ?? null;

  const handleDeleteImage = async () => {
    const updated = imageUrls.filter((_, i) => i !== safeIdx);
    await onUpdatePost(post.id, { image_url: serializeImageUrls(updated) });
    setCurrentIdx(Math.max(0, safeIdx - 1));
  };

  // ── Publicar Instagram: primero intenta API oficial (nube), luego servidor local ──
  const handlePublishIG = async () => {
    setShowPublishConfirm(false);
    setPublishStatus('running');
    setPublishMessage('Iniciando publicación...');
    setPublishJobId('_api');

    // ── RUTA 1: Instagram Graph API (sin servidor local) ─────────────────────
    const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
    try {
      const apiRes = await fetch(`${FUNCTIONS_URL}/publish-instagram`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY },
        body: JSON.stringify({ post_id: post.id }),
      });
      const apiData = await apiRes.json();
      if (apiRes.ok && apiData.success) {
        setPublishStatus('success');
        setPublishMessage('✅ Publicado en Instagram via API oficial.');
        await onUpdatePost(post.id, { status: 'scheduled', webhook_sent_at: new Date().toISOString() });
        return;
      }
      // Si el error es "no hay token" → caer al servidor local
      if (apiData.error && apiData.error.includes('No hay cuenta de Instagram conectada')) {
        console.log('Sin token API → intentando servidor local...');
      } else {
        // Error real de la API (imagen inválida, token caducado, etc.)
        setPublishStatus('error');
        setPublishMessage(apiData.error || 'Error publicando via API');
        return;
      }
    } catch {
      // Edge Function no disponible → intentar servidor local
      console.log('Edge Function no responde → intentando servidor local...');
    }

    // ── RUTA 2: Servidor local publisher_server.py (fallback) ────────────────
    try {
      const health = await fetch(`${PUBLISHER_URL}/health`, { signal: AbortSignal.timeout(2500) });
      if (!health.ok) throw new Error('not ok');
    } catch {
      setPublishStatus('error');
      setPublishMessage(
        'No hay cuenta de Instagram conectada para este cliente.\n' +
        'Conecta la cuenta en ajustes, o ejecuta publisher_server.py si prefieres el modo local.'
      );
      return;
    }

    let res: Response;
    try {
      res = await fetch(`${PUBLISHER_URL}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id }),
      });
    } catch {
      setPublishStatus('error');
      setPublishMessage('Error de red conectando con publisher_server.py');
      return;
    }

    const data = await res.json();
    if (!res.ok) {
      if (data.error === 'wrong_credentials') {
        setPublishStatus('wrong_credentials');
        setPublishMessage(data.message ?? 'Credenciales no encontradas');
      } else {
        setPublishStatus('error');
        setPublishMessage(data.error ?? 'Error al iniciar publicación');
      }
      return;
    }

    const jobId = data.job_id as string;
    setPublishJobId(jobId);
    setPublishStatus('running');
    setPublishMessage('Iniciando...');
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const sr = await fetch(`${PUBLISHER_URL}/status/${jobId}`);
        const sd = await sr.json() as { status: PublishJobStatus; message: string };
        setPublishStatus(sd.status);
        setPublishMessage(sd.message);
        if (['success', 'error', 'wrong_credentials'].includes(sd.status)) {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          if (sd.status === 'success') {
            await onUpdatePost(post.id, { status: 'scheduled', webhook_sent_at: new Date().toISOString() });
          }
        }
      } catch { }
    }, 1500);
  };

  // Limpiar polling al desmontar
  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  // ── Helper: Generar copy con IA ──────────────────────────────────────────────
  const handleGenerateCopy = async (draft: string) => {
    if (grokLoading) return;
    setGrokLoading(true);
    try {
      const existingCopies = allPosts
        .filter(p => p.id !== post.id && p.copy && p.copy.trim())
        .map(p => `Post #${p.post_number}: ${p.copy.slice(0, 220)}`);
      const res = await fetch('/api/groq-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId, platform: post.platform,
          headline_visual: post.headline_visual, clientName,
          currentCopy: draft, existingPosts: existingCopies,
          language: 'es', mode: 'copy',
        }),
      });
      const data = await res.json();
      if (res.ok && data.copy) {
        setCopyDraft(data.copy);
        showToast('✨ Texto generado con IA', 'ok');
      } else {
        showToast(`❌ Error IA: ${data.error?.slice(0, 80)}`, 'err');
      }
    } catch (e) {
      showToast(`❌ Error de red: ${String(e).slice(0, 60)}`, 'err');
    } finally {
      setGrokLoading(false);
    }
  };

  // ── Helper: Generar hashtags con IA ─────────────────────────────────────────
  const handleGenerateHashtags = async () => {
    if (hashtagsLoading) return;
    setHashtagsLoading(true);
    try {
      const res = await fetch('/api/groq-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId, platform: post.platform,
          headline_visual: post.headline_visual, clientName,
          currentCopy: post.copy || tagsDraft,
          language: 'es', mode: 'hashtags',
        }),
      });
      const data = await res.json();
      if (res.ok && data.copy) {
        const words = data.copy.split(/\s+/).map((t: string) => t.replace(/^#+/, '')).filter(Boolean);
        setTagsDraft(words.map((t: string) => `#${t}`).join(' '));
        if (!editingTags) setEditingTags(true);
        showToast('✨ Hashtags generados con IA', 'ok');
      } else {
        showToast(`❌ Error IA: ${data.error?.slice(0, 80)}`, 'err');
      }
    } catch (e) {
      showToast(`❌ Error de red: ${String(e).slice(0, 60)}`, 'err');
    } finally {
      setHashtagsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all overflow-hidden shadow-sm flex flex-col ${
      isChanges     ? 'border-red-400 bg-red-50/20' :
      isChangesDone ? 'border-green-400 bg-green-50/10' :
      isScheduled   ? 'border-green-500 bg-green-50/10' :
      isApproved    ? 'border-amber-400 bg-amber-50/10' :
                      'border-gray-100'
    }`}>

      {/* Modal confirmación borrar */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          postNumber={post.post_number}
          onConfirm={async () => {
            setShowDeleteModal(false);
            await onDeletePost(post.id);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && imageUrls.length > 0 && (
        <Lightbox
          urls={imageUrls}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      {/* Modal Metricool */}
      {showMcModal && (
        <MetricoolModal
          clientId={clientId}
          clientName={clientName}
          postNumber={post.post_number}
          imageUrls={imageUrls}
          onConfirm={handleSendToMetricool}
          onCancel={() => setShowMcModal(false)}
        />
      )}

      {/* Modal programar / publicar IG (Business API) */}
      {showIgScheduler && (
        <IgSchedulerModal
          postNumber={post.post_number}
          imageUrls={imageUrls}
          onPublishNow={async () => {
            setShowIgScheduler(false);
            await handlePublishIG();
          }}
          onSchedule={async (dt: string) => {
            setShowIgScheduler(false);
            setPublishStatus('running');
            setPublishMessage('Programando en Instagram...');
            setPublishJobId('_api_sched');
            const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
            try {
              const res  = await fetch(`${FUNCTIONS_URL}/publish-instagram`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY },
                body:    JSON.stringify({ post_id: post.id, scheduled_time: dt }),
              });
              const data = await res.json();
              if (res.ok && data.success) {
                setPublishStatus('success');
                setPublishMessage(`✅ Programado para el ${new Date(dt).toLocaleString('es-ES', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}h`);
                await onUpdatePost(post.id, { status: 'scheduled', webhook_sent_at: new Date(dt).toISOString() });
              } else {
                setPublishStatus('error');
                setPublishMessage(data.error || 'Error programando');
              }
            } catch (e: any) {
              setPublishStatus('error');
              setPublishMessage(e.message);
            }
          }}
          onCancel={() => setShowIgScheduler(false)}
        />
      )}

      {/* Modal confirmación publicar */}
      {showPublishConfirm && (
        <ConfirmPublishModal
          postNumber={post.post_number}
          platform={post.platform}
          onConfirm={handlePublishIG}
          onCancel={() => setShowPublishConfirm(false)}
        />
      )}

      {/* Modal estado publicación */}
      {publishStatus && publishJobId && (
        <PublishStatusModal
          status={publishStatus}
          message={publishMessage}
          jobId={publishJobId}
          onClose={() => {
            setPublishStatus(null);
            setPublishJobId(null);
          }}
        />
      )}

      {/* Cabecera de estado */}
      <div className={`p-4 border-b border-gray-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 ${shareMode ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={shareMode ? onToggleSelect : undefined}>
        <div className="flex items-center gap-2">
          {shareMode && (
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#52b788] border-[#52b788]' : 'border-gray-300'}`}>
              {isSelected && <span className="text-white text-[10px] font-black leading-none">✓</span>}
            </div>
          )}
          <span>{post.platform} · #{post.post_number}</span>
          {/* Etiqueta si lo creó el cliente */}
          {post.created_by === 'client' && (
            <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-600 uppercase tracking-widest">
              👤 Cliente
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isChanges     && <span className="text-red-600">⚠ Cambios solicitados</span>}
          {isChangesDone && <span className="text-green-600">✅ Cambios hechos</span>}
          {isApproved    && <span className="text-amber-600">✓ Aprobado</span>}
          {isScheduled && (
            <span className="text-green-600 flex items-center gap-1">
              {post.platform === 'IG' ? '📸' : post.platform === 'LI' ? '💼' : '📘'}
              Publicado
              {post.webhook_sent_at && (
                <span className="text-gray-400 font-normal normal-case tracking-normal">
                  · {new Date(post.webhook_sent_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              )}
            </span>
          )}
          {post.status === 'scheduling' && <span className="text-gray-400 animate-pulse">⏳ Enviando...</span>}
          {/* Borrar: solo admin */}
          {isAdmin && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="ml-1 text-gray-300 hover:text-red-500 transition-colors p-0.5 rounded hover:bg-red-50"
              title="Borrar post"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Imagen / Carrusel */}
      <div className="flex flex-col border-b border-gray-100">
        <div className="aspect-square bg-gray-50 flex items-center justify-center relative group">
          {uploadingId === post.id
            ? <Loader2 className="animate-spin text-[#2d6a4f]" />
            : currentImage
              ? (
                <img
                  key={currentImage}
                  src={currentImage}
                  className="w-full h-full object-cover cursor-zoom-in"
                  alt="Post"
                  onClick={() => setLightboxIdx(safeIdx)}
                  title="Click para ver en grande"
                />
              )
              : (
                <div className="text-center p-4 text-gray-300">
                  <ImageIcon size={40} className="mx-auto mb-2" />
                  <p className="text-[10px] font-bold">Sin imagen</p>
                </div>
              )
          }

          {/* Flechas navegación (siempre visibles si hay >1 imagen, z-20 para estar por encima del overlay admin) */}
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setCurrentIdx(i => Math.max(0, i - 1)); }}
                disabled={safeIdx === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-1.5 hover:bg-black/90 disabled:opacity-20 z-20"
              ><ChevronLeft size={16} /></button>
              <button
                onClick={e => { e.stopPropagation(); setCurrentIdx(i => Math.min(imageUrls.length - 1, i + 1)); }}
                disabled={safeIdx === imageUrls.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-1.5 hover:bg-black/90 disabled:opacity-20 z-20"
              ><ChevronRight size={16} /></button>
              {/* Contador */}
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
                {safeIdx + 1}/{imageUrls.length}
              </span>
            </>
          )}

          {/* Botón eliminar imagen actual — solo admin */}
          {isAdmin && currentImage && !isScheduled && (
            <button
              onClick={e => { e.stopPropagation(); handleDeleteImage(); }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 z-30 shadow-md"
              title="Eliminar esta imagen"
            ><Trash2 size={13} /></button>
          )}

          {/* Overlay para subir/añadir imagen — admin siempre, cliente solo en sus posts */}
          {(isAdmin || canClientEdit) && !isScheduled && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              {/* Subir / Reemplazar imagen */}
              <label className="pointer-events-auto cursor-pointer bg-white text-gray-800 px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-gray-100 w-36 justify-center shadow-lg">
                <input type="file" className="hidden" accept="image/*"
                  onChange={e => handleFile(post.id, e, imageUrls, 'replace', safeIdx)} />
                <ImageIcon size={11} /> {currentImage ? 'Reemplazar' : 'Subir imagen'}
              </label>
              {isAdmin && (
                <button
                  onClick={() => handleUrl(post.id, imageUrls, 'replace', safeIdx)}
                  className="pointer-events-auto bg-white text-gray-700 px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-gray-100 w-36 justify-center shadow-lg border"
                >
                  <LinkIcon size={11} /> {currentImage ? 'Reemplazar URL' : 'URL imagen'}
                </button>
              )}
              {/* Añadir nueva(s) slide(s) — multiple permite seleccionar varias a la vez */}
              {currentImage && (
                <label className="pointer-events-auto cursor-pointer bg-[#2d6a4f] text-white px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-[#1b4332] w-36 justify-center shadow-lg">
                  <input type="file" className="hidden" accept="image/*" multiple
                    onChange={e => { handleFile(post.id, e, imageUrls, 'add'); }} />
                  <PlusCircle size={11} /> Añadir slides
                </label>
              )}
              {/* Generar imagen con IA */}
              <button
                onClick={() => setShowAIImg(v => !v)}
                className="pointer-events-auto bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 w-36 justify-center shadow-lg transition-colors"
              >
                🎨 Imagen IA
              </button>
            </div>
          )}
        </div>

        {/* Miniaturas del carrusel */}
        {imageUrls.length > 1 && (
          <div className="flex gap-1 p-2 bg-gray-50 overflow-x-auto">
            {imageUrls.map((url, i) => (
              <div key={url} className="relative shrink-0 group/thumb">
                <button
                  onClick={() => setCurrentIdx(i)}
                  className={`w-10 h-10 rounded border-2 overflow-hidden transition-all block ${
                    i === safeIdx ? 'border-[#2d6a4f]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} className="w-full h-full object-cover" alt={`Slide ${i+1}`} />
                </button>
                {/* Borrar miniatura (solo admin) */}
                {isAdmin && !isScheduled && (
                  <button
                    onClick={async () => {
                      const updated = imageUrls.filter((_, idx) => idx !== i);
                      await onUpdatePost(post.id, { image_url: serializeImageUrls(updated) });
                      setCurrentIdx(Math.max(0, safeIdx - (i <= safeIdx ? 1 : 0)));
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hidden group-hover/thumb:flex z-10 shadow"
                    title="Eliminar slide"
                  ><Trash2 size={9} /></button>
                )}
              </div>
            ))}
          </div>
        )}


        {/* Prompt de imagen — solo admin */}
        {isAdmin && (
          <div className="p-3 bg-gray-50/50 border-t border-gray-100">
            <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold text-[#2d6a4f] uppercase tracking-widest">
              <Sparkles size={10} /> Idea de imagen:
            </div>
            <p className="text-[10px] text-gray-500 italic leading-tight">{post.headline_visual}</p>
            <p className="text-[9px] text-gray-400 leading-tight mt-1">{post.visual_prompt}</p>
          </div>
        )}
      </div>

      {/* Botones de utilidad: copiar texto, copiar hashtags, descargar imágenes */}
      {(isAdmin || canClientEdit) && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5">

          {isAdmin && <button
            onClick={() => {
              navigator.clipboard.writeText(post.copy);
              const btn = document.activeElement as HTMLButtonElement;
              const orig = btn.textContent;
              btn.textContent = '✅ Copiado';
              setTimeout(() => { if (btn) btn.textContent = orig; }, 1500);
            }}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 text-gray-600 hover:text-green-700 transition-colors"
            title="Copiar texto del post"
          >📋 Copiar texto</button>}

          <button
            onClick={() => {
              const tags = post.hashtags?.map(h => `#${h.replace(/^#+/, '')}`).join(' ') ?? '';
              navigator.clipboard.writeText(tags);
              const btn = document.activeElement as HTMLButtonElement;
              const orig = btn.textContent;
              btn.textContent = '✅ Copiado';
              setTimeout(() => { if (btn) btn.textContent = orig; }, 1500);
            }}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-gray-600 hover:text-blue-700 transition-colors"
            title="Copiar hashtags"
          >#️⃣ Copiar tags</button>

          {isAdmin && imageUrls.length > 0 && (
            <button
              onClick={async () => {
                const downloadBlob = async (url: string, filename: string) => {
                  const isSupabase = url.includes('supabase.co/storage');
                  const dlUrl = isSupabase
                    ? (url.includes('?') ? `${url}&download=${filename}` : `${url}?download=${filename}`)
                    : url;
                  try {
                    const res = await fetch(dlUrl, { mode: 'cors', credentials: 'omit' });
                    if (!res.ok) throw new Error('fetch failed');
                    const blob = await res.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
                  } catch {
                    window.open(url, '_blank');
                  }
                };
                for (let i = 0; i < imageUrls.length; i++) {
                  await downloadBlob(imageUrls[i], `${post.id}_${i + 1}.jpg`);
                  if (i < imageUrls.length - 1) await new Promise(r => setTimeout(r, 800));
                }
              }}
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-purple-50 hover:border-purple-300 text-gray-600 hover:text-purple-700 transition-colors"
              title="Descargar imagen(es)"
            >⬇️ {imageUrls.length > 1 ? `Descargar ${imageUrls.length} imágenes` : 'Descargar imagen'}</button>
          )}
        </div>
      )}

      {/* ── Panel Generar imagen con IA ── */}
      {showAIImg && (isAdmin || canClientEdit) && !isScheduled && (
        <div className="mx-4 mb-3 p-3 bg-violet-50 border border-violet-200 rounded-xl flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-violet-700 uppercase tracking-widest">🎨 Generar imagen con IA</span>
          </div>
          <textarea
            rows={2}
            value={aiImgPrompt}
            onChange={e => setAIImgPrompt(e.target.value)}
            placeholder="Describe la imagen... ej: luxury sailing yacht at sunset in Barcelona, aerial view, cinematic, 8k, photorealistic, no text"
            className="w-full text-xs border border-violet-200 rounded-lg px-2.5 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white placeholder-violet-300 text-gray-700"
          />
          {/* Sugerencias rápidas */}
          <div className="flex flex-wrap gap-1">
            {['no text, photorealistic, 8k', 'cinematic lighting', 'aerial drone shot', 'golden hour', 'dark moody'].map(tag => (
              <button
                key={tag}
                onClick={() => setAIImgPrompt(p => p ? `${p}, ${tag}` : tag)}
                className="text-[9px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 font-bold border border-violet-200"
              >{tag}</button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={async () => {
                if (!aiImgPrompt.trim() || aiImgLoading) return;
                setAIImgLoading(true);
                try {
                  // Generación IA: Instagram 1080x1080, sin logo, seed aleatorio
                  const seed   = Math.floor(Math.random() * 999999);
                  const encoded = encodeURIComponent(aiImgPrompt.trim() + ', no text, no watermark');
                  const url    = `https://image.pollinations.ai/prompt/${encoded}?width=1080&height=1080&nologo=true&seed=${seed}`;
                  showToast('⏳ Generando imagen... (20-40s)', 'ok');
                  const blob = await fetch(url).then(r => {
                    if (!r.ok) throw new Error('Error generando imagen');
                    return r.blob();
                  });
                  // Subir a Supabase usando la infraestructura existente
                  const ts = Date.now();
                  const fileName = `${clientId}/${post.id}_ai_${ts}.png`;
                  const { error } = await supabase.storage
                    .from('post-images')
                    .upload(fileName, blob, { upsert: true, contentType: 'image/png' });
                  if (error) throw error;
                  const { data } = supabase.storage.from('post-images').getPublicUrl(fileName);
                  const newUrl = `${data.publicUrl}?v=${ts}`;
                  const updatedUrls = imageUrls.length > 0 ? [...imageUrls, newUrl] : [newUrl];
                  await onUpdatePost(post.id, { image_url: updatedUrls.length === 1 ? newUrl : JSON.stringify(updatedUrls) });
                  setShowAIImg(false);
                  setAIImgPrompt('');
                  showToast('✅ Imagen generada y guardada', 'ok');
                } catch (e) {
                  showToast(`❌ Error: ${String(e).slice(0, 60)}`, 'err');
                } finally {
                  setAIImgLoading(false);
                }
              }}
              disabled={!aiImgPrompt.trim() || aiImgLoading}
              className="flex-1 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-[11px] font-black uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              {aiImgLoading ? <><span className="animate-spin inline-block">⏳</span> Generando...</> : '🎨 Generar y añadir'}
            </button>
            <button
              onClick={() => { setShowAIImg(false); setAIImgPrompt(''); }}
              className="px-3 py-1.5 text-gray-400 hover:text-gray-600 text-[11px] font-bold border border-gray-200 rounded-lg"
            >Cancelar</button>
          </div>
          <p className="text-[9px] text-violet-400 text-center">
            La imagen se genera en 20-40 segundos y se añade automáticamente al post
          </p>
        </div>
      )}

      {/* Copy y hashtags */}
      <div className="p-6 flex-grow flex flex-col">
        {post.feedback && isChanges && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-xl text-xs text-red-800 italic flex gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>"{post.feedback}"</span>
          </div>
        )}
        {post.feedback && isChangesDone && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700 italic flex gap-2">
            <CheckCircle size={14} className="shrink-0 mt-0.5" />
            <span>"{post.feedback}"</span>
          </div>
        )}
        {/* ── Copy editable (admin, o cliente en sus propios posts) ── */}
        {(isAdmin || canClientEdit) && editingCopy ? (
          <div className="mb-6 flex-grow flex flex-col gap-2">
            <textarea
              className="w-full text-sm text-gray-800 leading-relaxed border border-[#52b788] rounded-xl p-3 resize-y focus:outline-none focus:ring-2 focus:ring-[#52b788]/40 min-h-[300px] font-medium"
              value={copyDraft}
              onChange={e => setCopyDraft(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2 flex-wrap">
              {/* ── Botón IA copy ── */}
              <button
                onClick={() => handleGenerateCopy(copyDraft)}
                disabled={grokLoading}
                className="flex-1 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg text-[11px] font-black uppercase hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1"
              >
                {grokLoading ? <><span className="animate-spin">⏳</span> Generando...</> : '🤖 Generar con IA'}
              </button>
              <button
                onClick={async () => {
                  await onUpdatePost(post.id, { copy: copyDraft });
                  setEditingCopy(false);
                  showToast('Texto guardado', 'ok');
                }}
                className="flex-1 py-1.5 bg-[#2d6a4f] text-white rounded-lg text-[11px] font-black uppercase hover:bg-[#1b4332]"
              >Guardar</button>
              <button
                onClick={() => { setCopyDraft(post.copy); setEditingCopy(false); }}
                className="flex-1 py-1.5 border border-gray-200 text-gray-500 rounded-lg text-[11px] font-black uppercase hover:bg-gray-50"
              >Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex-grow relative group/copy">
            {post.copy ? (
              <>
                <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">{post.copy}</p>
                {(isAdmin || canClientEdit) && !isScheduled && (
                  <div className="absolute top-0 right-0 opacity-0 group-hover/copy:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => { setCopyDraft(post.copy); setEditingCopy(true); }}
                      className="bg-white border border-gray-200 text-gray-400 hover:text-[#2d6a4f] text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm"
                    >✏️ Editar</button>
                  </div>
                )}
              </>
            ) : (isAdmin || canClientEdit) && !isScheduled ? (
              <button
                onClick={async () => { setCopyDraft(''); setEditingCopy(true); await handleGenerateCopy(''); }}
                disabled={grokLoading}
                className="w-full py-3 border-2 border-dashed border-violet-300 rounded-xl text-violet-600 font-black text-[12px] uppercase tracking-wide hover:bg-violet-50 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
              >
                {grokLoading ? <><span className="animate-spin">⏳</span> Generando...</> : '🤖 Generar texto con IA'}
              </button>
            ) : (
              <span className="text-gray-300 italic text-sm">Sin texto</span>
            )}
          </div>
        )}

        {/* ── Hashtags editables (admin o cliente en sus posts) ── */}
        <div className="pt-4 border-t border-gray-50">
          {(isAdmin || canClientEdit) && editingTags ? (
            <div className="flex flex-col gap-2">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Hashtags (con # separados por espacios)</p>
              <input
                className="w-full text-[11px] border border-[#52b788] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#52b788]/40"
                value={tagsDraft}
                onChange={e => setTagsDraft(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleGenerateHashtags}
                  disabled={hashtagsLoading}
                  className="flex-1 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg text-[11px] font-black uppercase hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  {hashtagsLoading ? <><span className="animate-spin">⏳</span> Generando...</> : '🤖 IA hashtags'}
                </button>
                <button
                  onClick={async () => {
                    const newTags = tagsDraft.split(/\s+/).map(t => t.replace(/^#+/, '')).filter(Boolean);
                    await onUpdatePost(post.id, { hashtags: newTags });
                    setEditingTags(false);
                    showToast('Hashtags guardados', 'ok');
                  }}
                  className="flex-1 py-1.5 bg-[#2d6a4f] text-white rounded-lg text-[11px] font-black uppercase hover:bg-[#1b4332]"
                >Guardar</button>
                <button
                  onClick={() => { setTagsDraft(post.hashtags?.map(h => `#${h.replace(/^#+/, '')}`).join(' ') ?? ''); setEditingTags(false); }}
                  className="flex-1 py-1.5 border border-gray-200 text-gray-500 rounded-lg text-[11px] font-black uppercase hover:bg-gray-50"
                >Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="relative group/tags flex flex-wrap gap-1.5 items-center">
              {post.hashtags?.length > 0
                ? post.hashtags.map(h => (
                    <span key={h} className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      #{h.replace(/^#+/, '')}
                    </span>
                  ))
                : (isAdmin || canClientEdit) && !isScheduled
                  ? <button
                      onClick={handleGenerateHashtags}
                      disabled={hashtagsLoading}
                      className="text-[10px] font-black px-3 py-1 rounded-lg border-2 border-dashed border-violet-300 text-violet-500 hover:bg-violet-50 disabled:opacity-50 flex items-center gap-1 transition-colors"
                    >
                      {hashtagsLoading ? <><span className="animate-spin">⏳</span> Generando...</> : '🤖 Generar hashtags IA'}
                    </button>
                  : <span className="text-[10px] text-gray-300 italic uppercase">Sin hashtags</span>
              }
              {(isAdmin || canClientEdit) && !isScheduled && post.hashtags?.length > 0 && (
                <button
                  onClick={() => { setTagsDraft(post.hashtags?.map(h => `#${h.replace(/^#+/, '')}`).join(' ') ?? ''); setEditingTags(true); }}
                  className="opacity-0 group-hover/tags:opacity-100 transition-opacity ml-1 bg-white border border-gray-200 text-gray-400 hover:text-[#2d6a4f] text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm"
                >✏️ Editar</button>
              )}
              {(isAdmin || canClientEdit) && !isScheduled && post.hashtags?.length > 0 && (
                <button
                  onClick={handleGenerateHashtags}
                  disabled={hashtagsLoading}
                  className="opacity-0 group-hover/tags:opacity-100 transition-opacity ml-0.5 bg-white border border-violet-200 text-violet-500 hover:bg-violet-50 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm disabled:opacity-50"
                >🤖 IA</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-2 mt-auto">

        {/* Botones publicar — solo admin + approved */}
        {isAdmin && isApproved && (
          <div className="flex flex-col gap-2">
            {post.platform === 'IG' ? (
              <>
                {/* Botón 1: Instagram API (Business) o publisher.py (Personal) */}
                <button
                  onClick={() => setShowIgScheduler(true)}
                  className={`w-full py-3 text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${
                    igAccountType === 'business'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90'
                      : igAccountType === 'personal'
                        ? 'bg-gradient-to-br from-orange-500 to-rose-500 hover:opacity-90'
                        : 'bg-gradient-to-br from-slate-700 to-slate-800 hover:opacity-90'
                  }`}
                >
                  📸 {igAccountType === 'business' ? 'Instagram API' : igAccountType === 'personal' ? 'Instagram (Publisher)' : 'Publicar Instagram'}
                </button>
                {/* Botón 2: Metricool (siempre visible) */}
                <button
                  onClick={() => setShowMcModal(true)}
                  disabled={mcSending}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-black uppercase tracking-tighter hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {mcSending ? <Loader2 size={14} className="animate-spin" /> : '📊'}
                  {mcSending ? 'Enviando a Metricool...' : 'Programar en Metricool'}
                </button>
              </>
            ) : (
              <>
                {/* LinkedIn / Facebook: botón directo + Metricool */}
                <PublishButton platform={post.platform} onClick={() => setShowPublishConfirm(true)} />
                <button
                  onClick={() => setShowMcModal(true)}
                  disabled={mcSending}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-black uppercase tracking-tighter hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {mcSending ? <Loader2 size={14} className="animate-spin" /> : '📊'}
                  {mcSending ? 'Enviando a Metricool...' : 'Programar en Metricool'}
                </button>
              </>
            )}
          </div>
        )}

        {/* Selector de estado manual — solo admin */}
        {isAdmin && (
          <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">Estado:</span>
            <select
              value={post.status}
              onChange={async e => {
                const newStatus = e.target.value;
                await onUpdatePost(post.id, {
                  status: newStatus,
                  ...(newStatus !== 'scheduled' ? { webhook_sent_at: null } : {}),
                  ...(newStatus === 'approved' ? { feedback: '' } : {}),
                });
              }}
              className="flex-1 text-[10px] font-bold text-gray-700 border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer"
            >
              <option value="review">🔵 En revisión</option>
              <option value="approved">✅ Aprobado</option>
              <option value="changes">⚠️ Cambios solicitados</option>
              <option value="changes_done">🟢 Cambios hechos</option>
              <option value="scheduled">📅 Publicado</option>
            </select>
          </div>
        )}

        {/* Scheduled — estado final, sin botones */}
        {isScheduled && (
          <div className="flex flex-col items-center gap-1 py-3 px-4 bg-green-50 rounded-xl border border-green-200">
            <span className="text-[11px] font-black text-green-700 uppercase tracking-widest flex items-center gap-1.5">
              {post.platform === 'IG' ? '📸' : post.platform === 'LI' ? '💼' : '📘'}
              Publicado en {post.platform === 'IG' ? 'Instagram' : post.platform === 'LI' ? 'LinkedIn' : 'Facebook'}
            </span>
            {post.webhook_sent_at && (
              <span className="text-sm font-bold text-green-800">
                {new Date(post.webhook_sent_at).toLocaleDateString('es-ES', {
                  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
                })}
              </span>
            )}
            {post.webhook_sent_at && (
              <span className="text-[10px] text-green-600">
                {new Date(post.webhook_sent_at).toLocaleTimeString('es-ES', {
                  hour: '2-digit', minute: '2-digit'
                })}h
              </span>
            )}
          </div>
        )}

        {/* Botones de revisión — no mostrar si ya está scheduled */}
        {!isScheduled && (
          <div className="flex gap-2">
            <button
              onClick={async () => {
                await onUpdatePost(post.id, { status: 'approved', feedback: '' });
                notifyApproval(post, clientName);
              }}
              disabled={isApproved}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-tighter transition-colors flex items-center justify-center gap-1.5 shadow-sm ${
                isApproved
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : 'bg-[#2d6a4f] text-white hover:bg-[#1b4332]'
              }`}
            >
              <CheckCircle size={12} />
              {isApproved ? 'Aprobado' : 'Aprobar'}
            </button>
            {/* Botón Cambios — toggle entre changes / changes_done / nuevo cambio */}
            {isChanges ? (
              <button
                onClick={async () => {
                  await onUpdatePost(post.id, { status: 'changes_done' });
                }}
                className="flex-1 py-3 bg-green-500 text-white rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-green-600 transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle size={12} /> Cambios hechos
              </button>
            ) : isChangesDone ? (
              <div className="flex flex-col gap-2 flex-1">
                <button
                  onClick={async () => {
                    await onUpdatePost(post.id, { status: 'changes' });
                  }}
                  className="w-full py-3 border-2 border-green-400 bg-white text-green-600 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-green-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={12} /> Ver cambios
                </button>
                <button
                  onClick={async () => {
                    const n = prompt('Describe los nuevos cambios que necesitas:');
                    if (n) {
                      await onUpdatePost(post.id, { status: 'changes', feedback: n });
                      notifyChangesRequested(post, clientName, n);
                    }
                  }}
                  className="w-full py-2 bg-white text-gray-400 rounded-xl text-[10px] font-bold uppercase tracking-tighter hover:bg-red-50 hover:text-red-500 hover:border-red-300 border-2 border-gray-200 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={10} /> Pedir más cambios
                </button>
              </div>
            ) : (
              <button
                onClick={async () => {
                  const n = prompt('Describe los cambios que necesitas:');
                  if (n) {
                    await onUpdatePost(post.id, { status: 'changes', feedback: n });
                    notifyChangesRequested(post, clientName, n);
                  }
                }}
                className="flex-1 py-3 border-2 bg-white text-gray-600 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={12} /> Cambios
              </button>
            )}
          </div>
        )}
      </div>

      {/* Toast local */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

// ─── Grid principal ───────────────────────────────────────────────────────────
export default function ApprovalWall({ posts, clientId, clientName, isAdmin, isClientPortal = false, igAccountType = 'none', onUpdatePost, onDeletePost, shareMode, selectedPosts, onToggleSelect }: Props) {
  const { uploadingId, handleFile, handleUrl } = useImageUpload(clientId, onUpdatePost);

  // Portal cliente: filtrar por ?show=1,3,5 si existe
  const visiblePosts = (() => {
    if (isAdmin) return posts;
    const params = new URLSearchParams(window.location.search);
    const show = params.get('show');
    if (!show) return posts;
    const nums = new Set(show.split(',').map(Number).filter(Boolean));
    return posts.filter(p => nums.has(p.post_number));
  })();

  const activePosts    = visiblePosts.filter(p => p.status !== 'scheduled');
  const publishedPosts = visiblePosts.filter(p => p.status === 'scheduled');

  const cardProps = (post: Post) => ({
    key: post.id,
    post,
    allPosts: visiblePosts,
    clientId,
    clientName,
    isAdmin,
    isClientPortal,
    igAccountType,
    onUpdatePost,
    onDeletePost,
    uploadingId,
    handleFile,
    handleUrl,
    shareMode,
    isSelected: selectedPosts?.has(post.post_number) ?? false,
    onToggleSelect: () => onToggleSelect?.(post.post_number),
  });

  return (
    <div className="space-y-12">
      {/* Posts activos */}
      {activePosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {activePosts.map(post => <PostCard {...cardProps(post)} />)}
        </div>
      )}

      {/* Sección Publicados */}
      {publishedPosts.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-green-200" />
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-300 rounded-full">
              <CheckCircle size={14} className="text-green-600" />
              <span className="text-xs font-black uppercase tracking-widest text-green-700">
                Publicados ✓
              </span>
            </div>
            <div className="flex-1 h-px bg-green-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left opacity-80">
            {publishedPosts.map(post => <PostCard {...cardProps(post)} />)}
          </div>
        </div>
      )}
    </div>
  );
}
