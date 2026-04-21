import { CheckCircle, MessageSquare, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function ApprovalWall({ posts, clientFolder, onUpdatePost }: any) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpload = async (postId: string, e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(postId);
    
    const path = `${clientFolder}/post${postId}.png`;
    
    // Subir a Storage
    const { error } = await supabase.storage.from('post-images').upload(path, file, { upsert: true });
    
    if (!error) {
      const { data } = supabase.storage.from('post-images').getPublicUrl(path);
      // Guardar la URL en la tabla de posts
      onUpdatePost(postId, { imageUrl: data.publicUrl });
    }
    setLoading(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <div key={post.id} className={`p-4 rounded-xl border-2 bg-white transition-all ${post.status === 'changes' ? 'border-red-500 shadow-lg shadow-red-100' : 'border-gray-100'}`}>
          <label className="aspect-square bg-gray-50 mb-4 flex items-center justify-center cursor-pointer overflow-hidden rounded-lg border border-gray-100">
            <input type="file" className="hidden" onChange={(e) => handleUpload(post.id, e)} />
            {loading === post.id ? <Loader2 className="animate-spin text-[#2d6a4f]" /> : 
             post.imageUrl ? <img src={post.imageUrl} className="w-full h-full object-cover" /> : 
             <div className="text-center text-gray-300"><ImageIcon className="mx-auto mb-1" size={32}/><p className="text-[10px] font-bold uppercase">Subir Imagen</p></div>}
          </label>
          
          {post.feedback && (
            <div className="bg-red-50 p-3 mb-4 rounded-lg text-xs text-red-700 italic border border-red-100 font-medium">
              "{post.feedback}"
            </div>
          )}

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">{post.copy}</p>

          <div className="flex gap-2 mt-auto">
            <button onClick={() => onUpdatePost(post.id, { status: 'approved', feedback: '' })} className="flex-1 bg-[#2d6a4f] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#1b4332]">Aprobar</button>
            <button onClick={() => {
              const f = prompt("¿Qué cambios necesitas?");
              if (f) onUpdatePost(post.id, { status: 'changes', feedback: f });
            }} className="flex-1 border border-gray-200 py-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50">Cambios</button>
          </div>
        </div>
      ))}
    </div>
  );
}


