import { CheckCircle, MessageSquare, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function ApprovalWall({ posts, clientFolder, onUpdatePost }: any) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleUpload = async (postId: string, e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(postId);
    const fileName = `${clientFolder}/post${postId}.png`;
    const { error } = await supabase.storage.from('post-images').upload(fileName, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(fileName);
      onUpdatePost(postId, { imageUrl: urlData.publicUrl });
    }
    setUploadingId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: any) => {
        const hasChanges = post.status === 'changes';
        const isApproved = post.status === 'approved' || post.status === 'published';

        return (
          <div key={post.id} className={`bg-white rounded-xl border-2 transition-all overflow-hidden shadow-sm flex flex-col ${
            hasChanges ? 'border-red-500 bg-red-50/30' : isApproved ? 'border-green-500 bg-green-50/30' : 'border-gray-200'
          }`}>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
              <span className="text-gray-400">{post.platform}</span>
              {hasChanges && <span className="text-red-600">⚠ Cambios</span>}
              {isApproved && <span className="text-green-600">✓ Aprobado</span>}
            </div>

            <label className="aspect-square bg-gray-50 flex flex-col items-center justify-center overflow-hidden border-b border-gray-50 cursor-pointer relative group">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(post.id, e)} />
              {uploadingId === post.id ? <Loader2 className="animate-spin text-[#2d6a4f]" /> : 
               post.imageUrl ? <img src={post.imageUrl} className="w-full h-full object-cover" alt="Post" /> :
               <div className="text-center p-4 text-gray-300"><ImageIcon className="mx-auto mb-2" /><p className="text-[10px] uppercase font-bold tracking-tighter">Subir Diseño</p></div>}
            </label>

            <div className="p-5 flex-grow">
              {post.feedback && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg flex gap-2 items-start text-left">
                  <AlertCircle size={14} className="text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-800 italic font-medium">"{post.feedback}"</p>
                </div>
              )}
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap text-left">{post.copy}</p>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2 mt-auto">
              <button onClick={() => onUpdatePost(post.id, { status: 'approved', feedback: '' })} className="flex-1 py-2 bg-[#2d6a4f] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle size={16} /> Aprobar
              </button>
              <button onClick={() => {
                const note = prompt("¿Qué cambios necesitas?");
                if (note) onUpdatePost(post.id, { status: 'changes', feedback: note });
              }} className="flex-1 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                <MessageSquare size={16} /> Cambios
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}



