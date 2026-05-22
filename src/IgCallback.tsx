// src/IgCallback.tsx
// Página /ig-callback — Meta redirige aquí con el código OAuth
// Intercambia código → token → guarda en Supabase ig_tokens

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function IgCallback() {
  const [status,  setStatus]  = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Procesando autorización de Instagram...');

  useEffect(() => {
    (async () => {
      const params   = new URLSearchParams(window.location.search);
      const code     = params.get('code');
      const clientId = params.get('state') || sessionStorage.getItem('ig_oauth_client_id') || '';

      if (!code) {
        setStatus('error');
        setMessage('No se recibió el código de autorización de Meta. Vuelve a intentarlo.');
        return;
      }

      try {
        setMessage('Intercambiando código por token...');
        // Usar supabase.functions.invoke — maneja auth correctamente con cualquier formato de key
        const { data, error: fnError } = await supabase.functions.invoke('ig-oauth-callback', {
          body: { code, client_id: clientId, redirect_uri: 'https://contentflow-4wos.vercel.app/ig-callback' },
        });
        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);

        setStatus('success');
        setMessage(`✅ Instagram conectado: @${data.ig_username}\n\nVolviendo a ContentFlow...`);

        // Volver a la página donde estaba (o home si no hay) forzando recarga
        const rawReturn = sessionStorage.getItem('ig_oauth_return_url') || '/';
        sessionStorage.removeItem('ig_oauth_client_id');
        sessionStorage.removeItem('ig_oauth_return_url');

        // Pasar ig_connected=1 + ig_client para que la app seleccione el cliente correcto
        // (crítico en incógnito donde no hay localStorage con el cliente guardado)
        const returnUrl = rawReturn.split('?')[0] + `?ig_connected=1&ig_client=${encodeURIComponent(clientId)}`;
        setTimeout(() => { window.location.replace(returnUrl); }, 1500);

      } catch (err: any) {
        setStatus('error');
        setMessage(`Error: ${err.message}`);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center space-y-4">
        {status === 'loading' && (
          <div className="animate-spin text-4xl">⏳</div>
        )}
        {status === 'success' && <div className="text-4xl">✅</div>}
        {status === 'error'   && <div className="text-4xl">❌</div>}

        <h2 className="font-black text-gray-900">
          {status === 'loading' ? 'Conectando Instagram...' :
           status === 'success' ? '¡Cuenta conectada!' : 'Error de conexión'}
        </h2>
        <p className="text-sm text-gray-600 whitespace-pre-line">{message}</p>

        {status === 'success' && (
          <p className="text-xs text-gray-400">Volviendo a ContentFlow en 3 segundos...</p>
        )}
        {status === 'error' && (
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-black uppercase tracking-widest"
          >
            Volver
          </button>
        )}
      </div>
    </div>
  );
}
