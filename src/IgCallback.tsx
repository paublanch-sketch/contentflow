// src/IgCallback.tsx
// Página /ig-callback — Meta redirige aquí con el código OAuth
// Intercambia código → token → guarda en Supabase ig_tokens

import { useEffect, useState } from 'react';

const SUPABASE_FUNCTIONS_URL = 'https://afbussamfzqfvozrycsr.supabase.co/functions/v1';
const SUPABASE_ANON_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';

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
        // Llamar a Edge Function que hace el exchange (protege App Secret)
        const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/ig-oauth-callback`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
          body: JSON.stringify({ code, client_id: clientId, redirect_uri: `${window.location.origin}/ig-callback` }),
        });
        const rawText = await res.text();
        let data: any = {};
        try { data = JSON.parse(rawText); } catch { data = { error: rawText }; }
        if (!res.ok || data.error) throw new Error(data.error || data.message || `HTTP ${res.status}: ${rawText}`);

        setStatus('success');
        setMessage(`✅ Instagram conectado: @${data.ig_username}\n\nYa puedes publicar desde ContentFlow sin ningún servidor local.`);
        sessionStorage.removeItem('ig_oauth_client_id');

        // Redirigir al home después de 3s
        setTimeout(() => { window.location.href = '/'; }, 3000);

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
          <p className="text-xs text-gray-400">Redirigiendo en 3 segundos...</p>
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
