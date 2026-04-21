import { CheckCircle, MessageSquare, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function ApprovalWall({ posts, clientFolder, onUpdatePost }: any) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // ... (Mantenemos handleUpload igual)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post: any) => {
        const hasChanges = post.status === 'changes';
        const isApproved = post.status === 'published';

        return (
          <div key={post.id} className={`bg-white rounded-2xl border-2 transition-all overflow-hidden shadow-sm flex flex-col ${
            hasChanges ? 'border-red-500 bg-red-50/20' : isApproved ? 'border-green-500' : 'border-gray-100'
          }`}>
            <div className="p-4 border-b border-gray-50 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
              <span className="text-gray-400">{post.platform}</span>
              {hasChanges && <span className="text-red-600">⚠ Cambios</span>}
              {isApproved && <span className="text-green-600">✓ Realizado</span>}
            </div>

            {/* Imagen */}
            <label className="aspect-square bg-gray-50 flex items-center justify-center cursor-pointer relative group">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(post.id, e)} />
              {uploadingId === post.id ? <Loader2 className="animate-spin text-[#2d6a4f]" /> : 
               post.imageUrl ? <img src={post.imageUrl} className="w-full h-full object-cover" /> :
               <div className="text-center p-4 text-gray-300"><ImageIcon size={40} className="mx-auto mb-2" /><p className="text-[10px] font-bold">Subir Diseño</p></div>}
            </label>

            <div className="p-6 flex-grow flex flex-col">
              {post.feedback && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-xl text-xs text-red-800 italic font-medium">
                  "{post.feedback}"
                </div>
              )}
              
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap text-left mb-6 flex-grow">
                {post.copy}
              </p>

              {/* BLOQUE DE HASHTAGS (Ahora muy visible) */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
                {post.hashtags?.map((h: string) => (
                  <span key={h} className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button onClick={() => onUpdatePost(post.id, { status: 'approved' })} className="flex-1 py-3 bg-[#2d6a4f] text-white rounded-xl text-xs font-black uppercase tracking-tighter">Aprobar</button>
              <button onClick={() => {
                const n = prompt("Cambios:");
                if (n) onUpdatePost(post.id, { status: 'changes', feedback: n });
              }} className="flex-1 py-3 border-2 border-gray-200 bg-white text-gray-600 rounded-xl text-xs font-black uppercase tracking-tighter">Cambios</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}



