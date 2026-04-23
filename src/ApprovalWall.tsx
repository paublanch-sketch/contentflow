// ARCHIVO: src/ApprovalWall.tsx
import {
  CheckCircle, MessageSquare, Image as ImageIcon,
  Link as LinkIcon, Loader2, AlertCircle, Sparkles, Send,
  ChevronLeft, ChevronRight, Trash2, PlusCircle
} from 'lucide-react';
import { useState } from 'react';
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
  post, clientId, clientName, isAdmin, onUpdatePost, uploadingId, handleFile, handleUrl
}: {
  post: Post;
  clientId: string;
  clientName: string;
  isAdmin: boolean;
  onUpdatePost: Props['onUpdatePost'];
  uploadingId: string | null;
  handleFile: (id: string, e: React.ChangeEvent<HTMLInputElement>, existing: string[], mode: 'replace'|'add', idx?: number) => void;
  handleUrl:  (id: string, existing: string[], mode: 'replace'|'add', idx?: number) => void;
}) {
  const [scheduling, setScheduling]   = useState(false);
  const [toast, setToast]             = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
  const [editingCopy, setEditingCopy] = useState(false);
  const [copyDraft, setCopyDraft]     = useState(post.copy);
  const [editingTags, setEditingTags] = useState(false);
  const [tagsDraft, setTagsDraft]     = useState(post.hashtags?.join(' ') ?? '');

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
      isChanges     ? 'border-red-400 bg-red-50/20' :
      isChangesDone ? 'border-green-400 bg-green-50/10' :
      isScheduled   ? 'border-green-500 bg-green-50/10' :
      isApproved    ? 'border-amber-400 bg-amber-50/10' :
                      'border-gray-100'
    }`}>

      {/* Cabecera de estado */}
      <div className="p-4 border-b border-gray-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span>{post.platform} · #{post.post_number}</span>
        {isChanges     && <span className="text-red-600">⚠ Cambios solicitados</span>}
        {isChangesDone && <span className="text-green-600">✅ Cambios hechos</span>}
        {isApproved    && <span className="text-amber-600">✓ Aprobado</span>}
        {isScheduled   && <span className="text-green-600">🚀 Publicado en Metricool</span>}
        {post.status === 'scheduling' && <span className="text-gray-400 animate-pulse">⏳ Enviando...</span>}
      </div>

      {/* Imagen / Carrusel */}
      <div className="flex flex-col border-b border-gray-100">
        <div className="aspect-square bg-gray-50 flex items-center justify-center relative group">
          {uploadingId === post.id
            ? <Loader2 className="animate-spin text-[#2d6a4f]" />
            : currentImage
              ? <img key={currentImage} src={currentImage} className="w-full h-full object-cover" alt="Post" />
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

          {/* Botón eliminar imagen actual (admin) — siempre visible, z-30 sobre todo */}
          {isAdmin && currentImage && !isScheduled && (
            <button
              onClick={e => { e.stopPropagation(); handleDeleteImage(); }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 z-30 shadow-md"
              title="Eliminar esta imagen"
            ><Trash2 size={13} /></button>
          )}

          {/* Overlay para subir/añadir imagen (solo admin) — pointer-events-none en el fondo para no bloquear botones encima */}
          {isAdmin && !isScheduled && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              {/* Reemplazar imagen actual */}
              <label className="pointer-events-auto cursor-pointer bg-white text-gray-800 px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-gray-100 w-36 justify-center shadow-lg">
                <input type="file" className="hidden" accept="image/*"
                  onChange={e => handleFile(post.id, e, imageUrls, 'replace', safeIdx)} />
                <ImageIcon size={11} /> Reemplazar
              </label>
              <button
                onClick={() => handleUrl(post.id, imageUrls, 'replace', safeIdx)}
                className="pointer-events-auto bg-white text-gray-700 px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-gray-100 w-36 justify-center shadow-lg border"
              >
                <LinkIcon size={11} /> Reemplazar URL
              </button>
              {/* Añadir nueva(s) slide(s) — multiple permite seleccionar varias a la vez */}
              <label className="pointer-events-auto cursor-pointer bg-[#2d6a4f] text-white px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-[#1b4332] w-36 justify-center shadow-lg">
                <input type="file" className="hidden" accept="image/*" multiple
                  onChange={e => { handleFile(post.id, e, imageUrls, 'add'); }} />
                <PlusCircle size={11} /> Añadir slides
              </label>
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

      {/* Botones de utilidad admin: copiar texto, copiar hashtags, descargar imágenes */}
      {isAdmin && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              navigator.clipboard.writeText(post.copy);
              const btn = document.activeElement as HTMLButtonElement;
              const orig = btn.textContent;
              btn.textContent = '✅ Copiado';
              setTimeout(() => { if (btn) btn.textContent = orig; }, 1500);
            }}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 text-gray-600 hover:text-green-700 transition-colors"
            title="Copiar texto del post"
          >📋 Copiar texto</button>

          <button
            onClick={() => {
              const tags = post.hashtags?.map(h => `#${h}`).join(' ') ?? '';
              navigator.clipboard.writeText(tags);
              const btn = document.activeElement as HTMLButtonElement;
              const orig = btn.textContent;
              btn.textContent = '✅ Copiado';
              setTimeout(() => { if (btn) btn.textContent = orig; }, 1500);
            }}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-gray-600 hover:text-blue-700 transition-colors"
            title="Copiar hashtags"
          >#️⃣ Copiar tags</button>

          {imageUrls.length > 0 && (
            <button
              onClick={async () => {
                const downloadBlob = async (url: string, filename: string) => {
                  try {
                    const res = await fetch(url);
                    const blob = await res.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                  } catch {
                    // fallback: abrir en nueva pestaña
                    window.open(url, '_blank');
                  }
                };
                for (let i = 0; i < imageUrls.length; i++) {
                  await downloadBlob(imageUrls[i], `${post.id}_${i + 1}.jpg`);
                  if (i < imageUrls.length - 1) await new Promise(r => setTimeout(r, 500));
                }
              }}
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-purple-50 hover:border-purple-300 text-gray-600 hover:text-purple-700 transition-colors"
              title="Descargar imagen(es)"
            >⬇️ {imageUrls.length > 1 ? `Descargar ${imageUrls.length} imágenes` : 'Descargar imagen'}</button>
          )}
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
        {/* ── Copy editable (solo admin) ── */}
        {isAdmin && editingCopy ? (
          <div className="mb-6 flex-grow flex flex-col gap-2">
            <textarea
              className="w-full text-sm text-gray-800 leading-relaxed border border-[#52b788] rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#52b788]/40 min-h-[160px] font-medium"
              value={copyDraft}
              onChange={e => setCopyDraft(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
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
            <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">{post.copy}</p>
            {isAdmin && !isScheduled && (
              <button
                onClick={() => { setCopyDraft(post.copy); setEditingCopy(true); }}
                className="absolute top-0 right-0 opacity-0 group-hover/copy:opacity-100 transition-opacity bg-white border border-gray-200 text-gray-400 hover:text-[#2d6a4f] text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm"
              >✏️ Editar</button>
            )}
          </div>
        )}

        {/* ── Hashtags editables (solo admin) ── */}
        <div className="pt-4 border-t border-gray-50">
          {isAdmin && editingTags ? (
            <div className="flex flex-col gap-2">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Hashtags (sin # separados por espacios)</p>
              <input
                className="w-full text-[11px] border border-[#52b788] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#52b788]/40"
                value={tagsDraft}
                onChange={e => setTagsDraft(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    const newTags = tagsDraft.split(/\s+/).map(t => t.replace(/^#/, '')).filter(Boolean);
                    await onUpdatePost(post.id, { hashtags: newTags });
                    setEditingTags(false);
                    showToast('Hashtags guardados', 'ok');
                  }}
                  className="flex-1 py-1.5 bg-[#2d6a4f] text-white rounded-lg text-[11px] font-black uppercase hover:bg-[#1b4332]"
                >Guardar</button>
                <button
                  onClick={() => { setTagsDraft(post.hashtags?.join(' ') ?? ''); setEditingTags(false); }}
                  className="flex-1 py-1.5 border border-gray-200 text-gray-500 rounded-lg text-[11px] font-black uppercase hover:bg-gray-50"
                >Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="relative group/tags flex flex-wrap gap-1.5">
              {post.hashtags?.length > 0
                ? post.hashtags.map(h => (
                    <span key={h} className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      #{h}
                    </span>
                  ))
                : <span className="text-[10px] text-gray-300 italic uppercase">Sin hashtags</span>
              }
              {isAdmin && !isScheduled && (
                <button
                  onClick={() => { setTagsDraft(post.hashtags?.join(' ') ?? ''); setEditingTags(true); }}
                  className="opacity-0 group-hover/tags:opacity-100 transition-opacity ml-1 bg-white border border-gray-200 text-gray-400 hover:text-[#2d6a4f] text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm"
                >✏️ Editar</button>
              )}
            </div>
          )}
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
