// src/ConnectInstagram.tsx
// Guarda credenciales de Instagram en Supabase + sesión para publicar sin re-login

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

interface Props {
  clientId:   string;
  clientName: string;
}

export function ConnectInstagram({ clientId, clientName }: Props) {
  const [connected,  setConnected]  = useState(false);
  const [igUsername, setIgUsername] = useState('');
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [userInput,  setUserInput]  = useState('');
  const [passInput,  setPassInput]  = useState('');
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('ig_credentials')
        .select('ig_username')
        .eq('client_id', clientId)
        .maybeSingle();
      setConnected(!!data);
      setIgUsername(data?.ig_username || '');
      setLoading(false);
    })();
  }, [clientId]);

  const handleSave = async () => {
    if (!userInput.trim() || !passInput.trim()) {
      setError('Usuario y contraseña obligatorios');
      return;
    }
    setSaving(true);
    setError('');
    const { error: err } = await supabase.from('ig_credentials').upsert({
      client_id:   clientId,
      ig_username: userInput.trim(),
      ig_password: passInput.trim(),
      updated_at:  new Date().toISOString(),
    });
    if (err) {
      setError('Error: ' + err.message);
    } else {
      setConnected(true);
      setIgUsername(userInput.trim());
      setShowForm(false);
      setUserInput('');
      setPassInput('');
    }
    setSaving(false);
  };

  const handleDisconnect = async () => {
    if (!confirm(`¿Borrar credenciales de Instagram de ${clientName}?`)) return;
    await supabase.from('ig_credentials').delete().eq('client_id', clientId);
    await supabase.from('sessions').delete().eq('client_id', clientId);
    setConnected(false);
    setIgUsername('');
  };

  if (loading) return (
    <span className="text-[10px] text-gray-500 animate-pulse font-bold uppercase tracking-widest">
      Comprobando IG...
    </span>
  );

  // ── Modal formulario ──────────────────────────────────────────────────────────
  if (showForm) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1a1d27] border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-5">
          <span className="text-3xl">📸</span>
          <h3 className="font-black text-white text-base mt-2">Conectar Instagram</h3>
          <p className="text-gray-500 text-xs mt-1">{clientName}</p>
          <p className="text-gray-600 text-[10px] mt-2 leading-relaxed">
            Las credenciales se guardan en Supabase.<br/>
            Cualquier miembro del equipo podrá publicar.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Usuario de Instagram"
            value={userInput}
            onChange={e => { setUserInput(e.target.value); setError(''); }}
            autoFocus
            autoComplete="username"
            className="w-full px-3 py-2.5 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm font-bold focus:outline-none focus:border-[#52b788] placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={passInput}
            onChange={e => { setPassInput(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            autoComplete="current-password"
            className="w-full px-3 py-2.5 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm font-bold focus:outline-none focus:border-[#52b788] placeholder-gray-600"
          />
          {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? '⏳ Guardando...' : '💾 Guardar y conectar'}
          </button>
          <button
            onClick={() => { setShowForm(false); setUserInput(''); setPassInput(''); setError(''); }}
            className="w-full py-2 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  // ── Estado conectado ──────────────────────────────────────────────────────────
  if (connected) return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-end">
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Cuenta Instagram guardada</span>
        <span className="text-xs font-black text-green-400">✅ @{igUsername}</span>
      </div>
      <button
        onClick={() => { setUserInput(igUsername); setShowForm(true); }}
        title="Actualizar credenciales"
        className="text-[10px] text-gray-500 hover:text-amber-400 border border-gray-700 hover:border-amber-600 px-2 py-0.5 rounded-lg transition-colors font-bold"
      >✏️</button>
      <button
        onClick={handleDisconnect}
        title="Borrar credenciales"
        className="text-[10px] text-gray-600 hover:text-red-400 border border-gray-700 hover:border-red-500 px-2 py-0.5 rounded-lg transition-colors font-bold"
      >✕</button>
    </div>
  );

  // ── Sin credenciales ──────────────────────────────────────────────────────────
  return (
    <button
      onClick={() => setShowForm(true)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white text-[10px] font-black uppercase tracking-widest transition-opacity"
    >
      📸 Conectar Instagram
    </button>
  );
}
