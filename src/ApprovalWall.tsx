// ARCHIVO: src/ApprovalWall.tsx
import {
  CheckCircle, MessageSquare, Image as ImageIcon,
  Link as LinkIcon, Loader2, AlertCircle, Sparkles, Send
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from './lib/supabase';
import type { Post } from './App';

// ─── Webhooks Make.com ────────────────────────────────────────────────────────
const METRICOOL_WEBHOOK_URL  = 'https://hook.eu1.make.com/owpgy88g47ibpstoqt8ktmsg9pek9cs9';
const NOTIFY_WEBHOOK_URL     = 'https://hook.eu1.make.com/qlmec519xrgc86oslwykvgsblxfxqr4l';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Props = {
  posts: Post[];
  clientId: string;
  clientName: string;
  isAdmin: boolean;
  onUpdatePost: (postId: string, updates: Partial<Post>) => Promise<void>;
};

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

  const saveToCloud = async (postId: string, fileOrBlob: Blob | File) => {
    setUploadingId(postId);
    // Nombre único por timestamp para evitar caché del navegador
    const ts = Date.now();
    const fileName = `${clientId}/${postId}_${ts}.png`;
    const { error } = await supabase.storage
      .from('post-images')
      .upload(fileName, fileOrBlob, { upsert: true });

    if (!error) {
      const { data } = supabase.storage.from('post-images').getPublicUrl(fileName);
      // Añadir cache-buster a la URL para forzar recarga en el navegador
      const url = `${data.publicUrl}?v=${ts}`;
      await onUpdatePost(postId, { image_url: url });
    }
    setUploadingId(null);
  };

  const handleFile = async (postId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await saveToCloud(postId, file);
      // Reset input para permitir subir el mismo archivo otra vez
      e.target.value = '';
    }
  };

  const handleUrl = async (postId: string) => {
    const url = prompt('Pega la URL de la imagen para clonarla:');
    if (!url) return;
    setUploadingId(postId);
    try {
      const blob = await fetch(url).then(r => r.blob());
      await saveToCloud(postId, blob);
    } catch {
      alert('CORS Error: Esta web bloquea el acceso directo. Descarga la imagen y súbela desde PC.');
      setUploadingId(null);
    }
  };

  return { uploadingId, handleFile, handleUrl };
}

// ─── Lógica de webhook con retry ──────────────────────────────────────────────
async function callWebhookWithRetry(
  payload: object,
  attempt = 1
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(METRICOOL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { ok: true };

    if (attempt < MAX_RETRIES) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS * attempt));
      return callWebhookWithRetry(payload, attempt + 1);
    }

    return { ok: false, error: `HTTP ${res.status} tras ${MAX_RETRIES} intentos` };
  } catch (err: any) {
    if (attempt < MAX_RETRIES) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS * attempt));
      return callWebhookWithRetry(payload, attempt + 1);
    }
    return { ok: false, error: err?.message ?? 'Error de red' };
  }
}

// ─── Notificació d'aprovació per email (via Make.com) ────────────────────────
async function notifyApproval(post: Post, clientName: string) {
  if (NOTIFY_WEBHOOK_URL.includes('PENDING_SETUP')) return;  // no enviar fins que estigui configurat
  try {
    await fetch(NOTIFY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'approval',
        client_id: post.client_id,
        client_name: clientName,
        post_number: post.post_number,
        platform: post.platform,
        copy_preview: post.copy.slice(0, 120) + (post.copy.length > 120 ? '...' : ''),
        headline_visual: post.headline_visual,
        portal_url: `${window.location.origin}/p/${post.client_id}`,
        approved_at: new Date().toISOString(),
      }),
    });
  } catch {
    // silenciós — la notificació és opcional, no ha de bloquejar l'aprovació
  }
}

async function notifyChangesRequested(post: Post, clientName: string, feedback: string) {
  if (NOTIFY_WEBHOOK_URL.includes('PENDING_SETUP')) return;
  try {
    await fetch(NOTIFY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'changes_requested',
        client_id: post.client_id,
        client_name: clientName,
        post_number: post.post_number,
        platform: post.platform,
        feedback,
        copy_preview: post.copy.slice(0, 120) + (post.copy.length > 120 ? '...' : ''),
        portal_url: `${window.location.origin}/p/${post.client_id}`,
        requested_at: new Date().toISOString(),
      }),
    });
  } catch {
    // silenciós
  }
}

// ─── Tarjeta de post ──────────────────────────────────────────────────────────
function PostCard({
  post, clientId, clientName, isAdmin, onUpdatePost, uploadingId, handleFile, handleUrl
}: {
  post: Post;
  clientId: string;
  clientName: string;
  isAdmin: boolean;
  onUpdatePost: Props['onUpdatePost'];
  uploadingId: string | null;
  handleFile: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrl: (id: string) => void;
}) {
  const [scheduling, setScheduling] = useState(false);
  const [toast, setToast]           = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const isChanges   = post.status === 'changes';
  const isApproved  = post.status === 'approved';
  const isScheduled = post.status === 'scheduled';

  // ── Publicar a Metricool ──
  const handlePublish = async () => {
    setScheduling(true);
    await onUpdatePost(post.id, { status: 'scheduling' });

    const payload = {
      idempotency_key: post.id,          // evita duplicados en Make/Zapier
      client_id: clientId,
      post_number: post.post_number,
      platform: post.platform,
      copy: post.copy,
      hashtags: post.hashtags.join(' '),
      image_url: post.image_url || '',
      headline_visual: post.headline_visual,
      sent_at: new Date().toISOString(),
    };

    const result = await callWebhookWithRetry(payload);

    if (result.ok) {
      const now = new Date().toISOString();
      await onUpdatePost(post.id, { status: 'scheduled', webhook_sent_at: now });
      showToast('¡Enviado a Metricool correctamente!', 'ok');
    } else {
      // Revertir a approved si falla
      await onUpdatePost(post.id, { status: 'approved' });
      showToast(`Error al publicar: ${result.error}`, 'err');
    }

    setScheduling(false);
  };

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all overflow-hidden shadow-sm flex flex-col ${
      isChanges   ? 'border-red-400 bg-red-50/20' :
      isScheduled ? 'border-green-500 bg-green-50/10' :
      isApproved  ? 'border-amber-400 bg-amber-50/10' :
                    'border-gray-100'
    }`}>

      {/* Cabecera de estado */}
      <div className="p-4 border-b border-gray-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span>{post.platform} · #{post.post_number}</span>
        {isChanges   && <span className="text-red-600">⚠ Cambios solicitados</span>}
        {isApproved  && <span className="text-amber-600">✓ Aprobado</span>}
        {isScheduled && <span className="text-green-600">🚀 Publicado en Metricool</span>}
        {post.status === 'scheduling' && <span className="text-gray-400 animate-pulse">⏳ Enviando...</span>}
      </div>

      {/* Imagen */}
      <div className="flex flex-col border-b border-gray-100">
        <div className="aspect-square bg-gray-50 flex items-center justify-center relative group">
          {uploadingId === post.id
            ? <Loader2 className="animate-spin text-[#2d6a4f]" />
            : post.image_url
              ? <img src={post.image_url} className="w-full h-full object-cover" alt="Post" />
              : (
                <div className="text-center p-4 text-gray-300">
                  <ImageIcon size={40} className="mx-auto mb-2" />
                  <p className="text-[10px] font-bold">Sin imagen</p>
                </div>
              )
          }
          {/* Overlay para subir imagen */}
          {!isScheduled && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg text-[10px] font-bold flex items-center gap-2 hover:bg-gray-100 w-32 justify-center shadow-lg">
                <input type="file" className="hidden" accept="image/*" onChange={e => handleFile(post.id, e)} />
                <ImageIcon size={12} /> Desde PC
              </label>
              <button
                onClick={() => handleUrl(post.id)}
                className="bg-[#2d6a4f] text-white px-4 py-2 rounded-lg text-[10px] font-bold flex items-center gap-2 hover:bg-[#1b4332] w-32 justify-center shadow-lg"
              >
                <LinkIcon size={12} /> URL
              </button>
            </div>
          )}
        </div>

        {/* Prompt de imagen */}
        <div className="p-3 bg-gray-50/50 border-t border-gray-100">
          <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold text-[#2d6a4f] uppercase tracking-widest">
            <Sparkles size={10} /> Idea de imagen:
          </div>
          <p className="text-[10px] text-gray-500 italic leading-tight">{post.headline_visual}</p>
          <p className="text-[9px] text-gray-400 leading-tight mt-1">{post.visual_prompt}</p>
        </div>
      </div>

      {/* Copy y hashtags */}
      <div className="p-6 flex-grow flex flex-col">
        {post.feedback && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-xl text-xs text-red-800 italic flex gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>"{post.feedback}"</span>
          </div>
        )}
        <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-grow font-medium">
          {post.copy}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
          {post.hashtags?.length > 0
            ? post.hashtags.map(h => (
                <span key={h} className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {h}
                </span>
              ))
            : <span className="text-[10px] text-gray-300 italic uppercase">Sin hashtags</span>
          }
        </div>
      </div>

      {/* Acciones */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-2 mt-auto">

        {/* Botón publicar Metricool — solo admin + approved */}
        {isAdmin && isApproved && (
          <button
            onClick={handlePublish}
            disabled={scheduling}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-tighter hover:from-blue-700 hover:to-blue-800 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {scheduling
              ? <><Loader2 size={14} className="animate-spin" /> Enviando a Metricool...</>
              : <><Send size={14} /> 🚀 Publicar a Metricool</>
            }
          </button>
        )}

        {/* Scheduled — estado final, sin botones */}
        {isScheduled && (
          <div className="text-center text-[10px] font-bold text-green-600 uppercase tracking-widest py-2">
            ✅ Publicado en Metricool
            {post.webhook_sent_at && (
              <span className="block text-gray-400 font-normal mt-0.5">
                {new Date(post.webhook_sent_at).toLocaleString('es-ES')}
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
                if (!isAdmin) notifyApproval(post, clientName);
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
            <button
              onClick={async () => {
                const n = prompt('Describe los cambios que necesitas:');
                if (n) {
                  await onUpdatePost(post.id, { status: 'changes', feedback: n });
                  if (!isAdmin) notifyChangesRequested(post, clientName, n);
                }
              }}
              className="flex-1 py-3 border-2 bg-white text-gray-600 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <MessageSquare size={12} /> Cambios
            </button>
          </div>
        )}
      </div>

      {/* Toast local */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

// ─── Grid principal ───────────────────────────────────────────────────────────
export default function ApprovalWall({ posts, clientId, clientName, isAdmin, onUpdatePost }: Props) {
  const { uploadingId, handleFile, handleUrl } = useImageUpload(clientId, onUpdatePost);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          clientId={clientId}
          clientName={clientName}
          isAdmin={isAdmin}
          onUpdatePost={onUpdatePost}
          uploadingId={uploadingId}
          handleFile={handleFile}
          handleUrl={handleUrl}
        />
      ))}
    </div>
  );
}
