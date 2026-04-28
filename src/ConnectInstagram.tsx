// src/ConnectInstagram.tsx
// Flujo OAuth para conectar cuenta de Instagram Business/Creator via Meta
// Guarda el token en Supabase ig_tokens → permite publicar sin servidor local

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

const META_APP_ID     = import.meta.env.VITE_META_APP_ID || '';
const REDIRECT_URI    = `${window.location.origin}/ig-callback`;
const SCOPES          = 'instagram_content_publish,instagram_basic,pages_read_engagement,pages_show_list';

interface Props {
  clientId:   string;
  clientName: string;
  onConnected?: () => void;
}

export function ConnectInstagram({ clientId, clientName, onConnected }: Props) {
  const [connected,  setConnected]  = useState(false);
  const [igUsername, setIgUsername] = useState('');
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');

  // Comprobar si ya hay token guardado
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('ig_tokens')
        .select('ig_username, expires_at')
        .eq('client_id', clientId)
        .maybeSingle();
      if (data) {
        setConnected(true);
        setIgUsername(data.ig_username || '');
      }
      setLoading(false);
    })();
  }, [clientId]);

  const handleConnect = () => {
    // Guardar client_id en sessionStorage para recuperarlo al volver del OAuth
    sessionStorage.setItem('ig_oauth_client_id', clientId);
    sessionStorage.setItem('ig_oauth_client_name', clientName);
    const url = `https://www.facebook.com/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&response_type=code&state=${clientId}`;
    window.location.href = url;
  };

  const handleDisconnect = async () => {
    if (!confirm(`¿Desconectar Instagram de ${clientName}?`)) return;
    await supabase.from('ig_tokens').delete().eq('client_id', clientId);
    setConnected(false);
    setIgUsername('');
  };

  if (loading) return <span className="text-xs text-gray-400 animate-pulse">Comprobando conexión...</span>;

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
          ✅ @{igUsername || 'Instagram conectado'}
        </span>
        <button
          onClick={handleDisconnect}
          className="text-[10px] text-gray-400 hover:text-red-500 underline transition-colors"
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleConnect}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
      >
        📸 Conectar Instagram
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!META_APP_ID && (
        <p className="text-[10px] text-amber-600">
          ⚠️ Añade VITE_META_APP_ID en .env
        </p>
      )}
    </div>
  );
}
