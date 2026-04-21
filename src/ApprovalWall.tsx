import { CheckCircle, MessageSquare, Image as ImageIcon, Link as LinkIcon, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function ApprovalWall({ posts, clientFolder, onUpdatePost }: any) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const saveToCloud = async (postId: string, fileOrBlob: Blob | File) => {
    setUploadingId(postId);
    const fileName = `${clientFolder}/post${postId}.png`;
    const { error } = await supabase.storage.from('post-images').upload(fileName, fileOrBlob, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(fileName);
      onUpdatePost(postId, { imageUrl: urlData.publicUrl });
    }
    setUploadingId(null);
  };

  const handleFileUpload = async (postId: string, e: any) => {
    const file = e.target.files?.[0];
    if (file) await saveToCloud(postId, file);
  };

  const handleUrlClone = async (postId: string) => {
    const url = prompt("Pega la URL para clonarla al servidor:");
    if (!url) return;
    setUploadingId(postId);
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      await saveToCloud(postId, blob);
    } catch (e) {
      alert("CORS Error: Descarga la imagen y súbela desde el PC.");
      setUploadingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post: any) => {
        const hasChanges = post.status === 'changes';
        const isApproved = post.status === 'published';

        return (
          <div key={post.id} className={`bg-white rounded-2xl border-2 transition-all overflow-hidden shadow-sm flex flex-col ${
            hasChanges ? 'border-red-500 bg-red-50/20' : isApproved ? 'border-green-500' : 'border-gray-100'
          }`}>
            <div className="p-4 border-b border-gray-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>{post.platform}</span>
              {hasChanges && <span className="text-red-600 font-bold">⚠ Cambios</span>}
              {isApproved && <span className="text-green-600 font-bold">✓ Realizado</span>}
            </div>

            {/* IMAGEN Y PROMPT */}
            <div className="flex flex-col border-b border-gray-100">
              <div className="aspect-square bg-gray-50 flex items-center justify-center relative group">
                {uploadingId === post.id ? <Loader2 className="animate-spin text-[#2d6a4f]" /> : 
                 post.imageUrl ? <img src={post.imageUrl} className="w-full h-full object-cover" /> :
                 <div className="text-center p-4 text-gray-300"><ImageIcon size={40} className="mx-auto mb-2" /><p className="text-[10px] font-bold">Sin diseño</p></div>}

                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg text-[10px] font-bold flex items-center gap-2 w-32 justify-center">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(post.id, e)} />
                    <ImageIcon size={12} /> PC
                  </label>
                  <button onClick={() => handleUrlClone(post.id)} className="bg-[#2d6a4f] text-white px-4 py-2 rounded-lg text-[10px] font-bold flex items-center gap-2 w-32 justify-center">
                    <LinkIcon size={12} /> URL (Clonar)
                  </button>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50/50 border-t border-gray-100 text-left">
                <div className="flex items-center gap-2 mb-1 text-[9px] font-bold text-[#2d6a4f] uppercase">
                  <Sparkles size={10} /> Prompt para nanobanana:
                </div>
                <p className="text-[10px] text-gray-500 italic leading-tight">{post.visual_prompt}</p>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col text-left">
              {post.feedback && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-xl text-xs text-red-800 italic font-medium flex gap-2">
                  <AlertCircle size={14} className="shrink-0" /> "{post.feedback}"
                </div>
              )}
              <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-grow">{post.copy}</p>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
                {post.hashtags?.map((h: string) => (
                  <span key={h} className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{h}</span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button onClick={() => onUpdatePost(post.id, { status: 'approved' })} className="flex-1 py-3 bg-[#2d6a4f] text-white rounded-xl text-xs font-black uppercase">Aprobar</button>
              <button onClick={() => {
                const n = prompt("Comentario:");
                if (n) onUpdatePost(post.id, { status: 'changes', feedback: n });
              }} className="flex-1 py-3 border-2 bg-white text-gray-600 rounded-xl text-xs font-black uppercase">Cambios</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

