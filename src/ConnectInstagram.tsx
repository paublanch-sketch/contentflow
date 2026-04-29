// src/ConnectInstagram.tsx
// Conectar Instagram:
//   - Business/Creator → OAuth Meta → token en ig_tokens → API oficial (publicar + programar)
//   - Personal         → usuario/contraseña en ig_credentials → Playwright (publisher_server.py)

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

const META_APP_ID  = import.meta.env.VITE_META_APP_ID || '1124977686473073';
const REDIRECT_URI = `${window.location.origin}/ig-callback`;
const OAUTH_URL = (clientId: string) =>
  `https://www.facebook.com/dialog/oauth` +
  `?client_id=${META_APP_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=instagram_basic,instagram_content_publish,pages_read_engagement,pages_show_list` +
  `&response_type=code` +
  `&state=${clientId}`;

interface Props {
  clientId:             string;
  clientName:           string;
  onUsernameChange?:    (username: string) => void;
  onAccountTypeChange?: (type: 'business' | 'personal' | 'none') => void;
}

type Mode = 'none' | 'business' | 'personal';

export function ConnectInstagram({ clientId, clientName, onUsernameChange, onAccountTypeChange }: Props) {
  const [loading,    setLoading]    = useState(true);
  const [mode,       setMode]       = useState<Mode>('none');
  const [igUsername, setIgUsername] = useState('');
  const [showMenu,   setShowMenu]   = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const [userInput,  setUserInput]  = useState('');
  const [passInput,  setPassInput]  = useState('');
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState('');

  // ── Cargar estado al montar ──────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);

      // 1. ¿Hay token OAuth (Business)?
      const { data: token } = await supabase
        .from('ig_tokens')
        .select('ig_username')
        .eq('client_id', clientId)
        .maybeSingle();

      if (token?.ig_username) {
        setMode('business');
        setIgUsername(token.ig_username);
        onUsernameChange?.(token.ig_username);
        onAccountTypeChange?.('business');
        setLoading(false);
        return;
      }

      // 2. ¿Hay credenciales (Personal)?
      const { data: creds } = await supabase
        .from('ig_credentials')
        .select('ig_username')
        .eq('client_id', clientId)
        .maybeSingle();

      if (creds?.ig_username) {
        setMode('personal');
        setIgUsername(creds.ig_username);
        onUsernameChange?.(creds.ig_username);
        onAccountTypeChange?.('personal');
        setLoading(false);
        return;
      }

      setMode('none');
      setIgUsername('');
      onUsernameChange?.('');
      onAccountTypeChange?.('none');
      setLoading(false);
    })();
  }, [clientId]);

  // ── Guardar credenciales personales ─────────────────────────────────────────
  const handleSavePersonal = async () => {
    if (!userInput.trim() || !passInput.trim()) {
      setError('Usuario y contraseña obligatorios');
      return;
    }
    setSaving(true); setError('');
    const { error: err } = await supabase.from('ig_credentials').upsert({
      client_id:   clientId,
      ig_username: userInput.trim(),
      ig_password: passInput.trim(),
      updated_at:  new Date().toISOString(),
    });
    if (err) {
      setError('Error: ' + err.message);
    } else {
      setMode('personal');
      setIgUsername(userInput.trim());
      onUsernameChange?.(userInput.trim());
      onAccountTypeChange?.('personal');
      setShowForm(false);
      setUserInput(''); setPassInput('');
    }
    setSaving(false);
  };

  // ── Desconectar ──────────────────────────────────────────────────────────────
  const handleDisconnect = async () => {
    if (!confirm(`¿Borrar cuenta Instagram de ${clientName}?`)) return;
    await supabase.from('ig_tokens').delete().eq('client_id', clientId);
    await supabase.from('ig_credentials').delete().eq('client_id', clientId);
    await supabase.from('sessions').delete().eq('client_id', clientId);
    setMode('none'); setIgUsername(''); onUsernameChange?.(''); onAccountTypeChange?.('none');
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) return (
    <span className="text-[10px] text-gray-500 animate-pulse font-bold uppercase tracking-widest">
      Comprobando IG...
    </span>
  );

  // ── Modal formulario Personal ────────────────────────────────────────────────
  if (showForm) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1a1d27] border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-5">
          <span className="text-3xl">🔐</span>
          <h3 className="font-black text-white text-base mt-2">Cuenta Personal Instagram</h3>
          <p className="text-gray-500 text-xs mt-1">{clientName}</p>
          <p className="text-gray-600 text-[10px] mt-2 leading-relaxed">
            Publicación via automatización del navegador.<br/>
            Requiere <code className="text-amber-400">publisher_server.py</code> corriendo.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Usuario de Instagram" value={userInput}
            onChange={e => { setUserInput(e.target.value); setError(''); }}
            autoFocus autoComplete="username"
            className="w-full px-3 py-2.5 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm font-bold focus:outline-none focus:border-[#52b788] placeholder-gray-600"
          />
          <input type="password" placeholder="Contraseña" value={passInput}
            onChange={e => { setPassInput(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSavePersonal()}
            autoComplete="current-password"
            className="w-full px-3 py-2.5 rounded-xl bg-[#252836] border border-gray-700 text-white text-sm font-bold focus:outline-none focus:border-[#52b788] placeholder-gray-600"
          />
          {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}
          <button onClick={handleSavePersonal} disabled={saving}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white font-black text-sm uppercase tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? '⏳ Guardando...' : '💾 Guardar'}
          </button>
          <button onClick={() => { setShowForm(false); setUserInput(''); setPassInput(''); setError(''); }}
            className="w-full py-2 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  // ── Menú selector de tipo de cuenta ─────────────────────────────────────────
  if (showMenu) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1a1d27] border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-3xl">📸</span>
          <h3 className="font-black text-white text-base mt-2">Conectar Instagram</h3>
          <p className="text-gray-500 text-xs mt-1">{clientName}</p>
        </div>

        {/* Opción Business / Creator */}
        <button
          onClick={() => { setShowMenu(false); window.open(OAUTH_URL(clientId), '_blank', 'width=600,height=700'); }}
          className="w-full mb-3 p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-xl transition-opacity text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏢</span>
            <div>
              <p className="font-black text-sm uppercase tracking-wide">Business / Creator</p>
              <p className="text-purple-200 text-[11px] mt-0.5">API oficial · Recomendado</p>
            </div>
          </div>
          <div className="mt-3 bg-white/10 rounded-lg px-3 py-2 text-[10px] text-purple-100 leading-relaxed">
            ✅ Publicar ahora o programar fecha<br/>
            ✅ Sin servidor local necesario<br/>
            ✅ Como Metricool pero directo<br/>
            ⚠️ Requiere cuenta Business/Creator + Facebook vinculado
          </div>
        </button>

        {/* Opción Personal */}
        <button
          onClick={() => { setShowMenu(false); setShowForm(true); }}
          className="w-full p-4 bg-[#252836] hover:bg-[#2d3144] border border-gray-700 text-white rounded-xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <div>
              <p className="font-black text-sm uppercase tracking-wide">Cuenta Personal</p>
              <p className="text-gray-400 text-[11px] mt-0.5">Automatización navegador</p>
            </div>
          </div>
          <div className="mt-3 bg-white/5 rounded-lg px-3 py-2 text-[10px] text-gray-400 leading-relaxed">
            ✅ Sin necesidad de Facebook<br/>
            ✅ Publicar inmediatamente<br/>
            ⚠️ Requiere publisher_server.py corriendo<br/>
            ⚠️ No soporta programación de fecha
          </div>
        </button>

        <button onClick={() => setShowMenu(false)}
          className="w-full mt-3 py-2 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest">
          Cancelar
        </button>
      </div>
    </div>
  );

  // ── Conectado: Business ──────────────────────────────────────────────────────
  if (mode === 'business') return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-end">
        <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">Business · API ✓</span>
        <span className="text-xs font-black text-green-400">📸 @{igUsername}</span>
      </div>
      <button onClick={() => setShowMenu(true)} title="Cambiar cuenta"
        className="text-[10px] text-gray-500 hover:text-amber-400 border border-gray-700 hover:border-amber-600 px-2 py-0.5 rounded-lg transition-colors font-bold">✏️</button>
      <button onClick={handleDisconnect} title="Desconectar"
        className="text-[10px] text-gray-600 hover:text-red-400 border border-gray-700 hover:border-red-500 px-2 py-0.5 rounded-lg transition-colors font-bold">✕</button>
    </div>
  );

  // ── Conectado: Personal ──────────────────────────────────────────────────────
  if (mode === 'personal') return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-end">
        <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Personal · Playwright</span>
        <span className="text-xs font-black text-green-400">📸 @{igUsername}</span>
      </div>
      <button onClick={() => { setUserInput(igUsername); setShowForm(true); }} title="Editar"
        className="text-[10px] text-gray-500 hover:text-amber-400 border border-gray-700 hover:border-amber-600 px-2 py-0.5 rounded-lg transition-colors font-bold">✏️</button>
      <button onClick={handleDisconnect} title="Desconectar"
        className="text-[10px] text-gray-600 hover:text-red-400 border border-gray-700 hover:border-red-500 px-2 py-0.5 rounded-lg transition-colors font-bold">✕</button>
    </div>
  );

  // ── Sin cuenta ───────────────────────────────────────────────────────────────
  return (
    <button onClick={() => setShowMenu(true)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-[10px] font-black uppercase tracking-widest transition-opacity">
      📸 Conectar Instagram
    </button>
  );
}
