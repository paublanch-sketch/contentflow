// src/ConnectInstagram.tsx
// Conectar Instagram:
//   - Business/Creator → OAuth Meta → token en ig_tokens → API oficial (publicar + programar)
//   - Personal         → usuario/contraseña en ig_credentials → Playwright (publisher_server.py)

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// Instagram Business Login - URL exacta que genera Meta en el paso 4 del setup
const META_APP_ID  = '1124977686473073';
const REDIRECT_URI = 'https://contentflow-4wos.vercel.app/ig-callback';
const OAUTH_URL = (clientId: string) =>
  `https://www.instagram.com/oauth/authorize` +
  `?force_reauth=true` +
  `&client_id=${META_APP_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent('instagram_business_basic,instagram_business_content_publish')}` +
  `&state=${encodeURIComponent(clientId)}`;

// Abre ventana emergente con credenciales y luego redirige
const startOAuthWithCreds = (clientId: string, user?: string, pass?: string) => {
  if (user || pass) {
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Credenciales Instagram</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #0f1117; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; gap: 20px; }
  h2 { font-size: 18px; font-weight: 900; letter-spacing: .05em; text-align: center; }
  p.sub { font-size: 11px; color: #6b7280; text-align: center; line-height: 1.5; }
  .card { background: #1a1d27; border: 1px solid #374151; border-radius: 14px; padding: 20px; width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 12px; }
  .row { display: flex; flex-direction: column; gap: 4px; }
  .label { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; color: #6b7280; }
  .value { font-family: monospace; font-size: 15px; color: #f3f4f6; background: #252836; border-radius: 8px; padding: 10px 12px; word-break: break-all; }
  .value.pass { color: #fbbf24; }
  button { width: 100%; padding: 11px; border: none; border-radius: 10px; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; cursor: pointer; transition: opacity .15s; }
  button:hover { opacity: .85; }
  .btn-user { background: #7c3aed; color: #fff; }
  .btn-pass { background: #d97706; color: #000; }
  .toast { font-size: 11px; font-weight: 700; color: #4ade80; text-align: center; height: 16px; }
  .note { font-size: 10px; color: #374151; text-align: center; line-height: 1.4; }
</style>
</head>
<body>
  <h2>🔑 Credenciales Instagram</h2>
  <p class="sub">Copia usuario y contraseña antes<br>de iniciar sesión en Instagram.</p>
  <div class="card">
    ${user ? `
    <div class="row">
      <span class="label">Usuario</span>
      <div class="value">${user}</div>
      <button class="btn-user" onclick="copyText('${user.replace(/'/g,"\\'")}','btn-u')">📋 Copiar usuario</button>
      <div class="toast" id="btn-u"></div>
    </div>` : ''}
    ${pass ? `
    <div class="row">
      <span class="label">Contraseña</span>
      <div class="value pass">${pass}</div>
      <button class="btn-pass" onclick="copyText('${pass.replace(/'/g,"\\'")}','btn-p')">📋 Copiar contraseña</button>
      <div class="toast" id="btn-p"></div>
    </div>` : ''}
  </div>
  <p class="note">Puedes cerrar esta ventana<br>cuando hayas terminado.</p>
  <script>
    function copyText(text, id) {
      navigator.clipboard.writeText(text).then(() => {
        const el = document.getElementById(id);
        el.textContent = '✅ Copiado al portapapeles';
        setTimeout(() => el.textContent = '', 2500);
      });
    }
  </script>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    window.open(url, 'ig_creds', 'width=380,height=480,top=80,left=80,resizable=yes');
  }
  sessionStorage.setItem('ig_oauth_return_url', window.location.href);
  sessionStorage.setItem('ig_oauth_client_id', clientId);
  window.location.href = OAUTH_URL(clientId);
};

// Navega directamente (no popup) → más fiable
const startOAuth = (clientId: string) => {
  sessionStorage.setItem('ig_oauth_return_url', window.location.href);
  sessionStorage.setItem('ig_oauth_client_id', clientId);
  window.location.href = OAUTH_URL(clientId);
};

interface Props {
  clientId:             string;
  clientName:           string;
  igUser?:              string;
  igPass?:              string;
  onUsernameChange?:    (username: string) => void;
  onAccountTypeChange?: (type: 'business' | 'personal' | 'none') => void;
}

type Mode = 'none' | 'business' | 'personal';

export function ConnectInstagram({ clientId, clientName, igUser, igPass, onUsernameChange, onAccountTypeChange }: Props) {
  const [loading,    setLoading]    = useState(true);
  const [mode,       setMode]       = useState<Mode>('none');
  const [igUsername, setIgUsername] = useState('');
  const [igPassword, setIgPassword] = useState('');
  const [showMenu,   setShowMenu]   = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const [showCreds,  setShowCreds]  = useState(false);
  const [userInput,  setUserInput]  = useState('');
  const [passInput,  setPassInput]  = useState('');
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState('');
  const [copied,     setCopied]     = useState<string>('');

  // ── Helper: hay sesión/cookies reales guardadas ─────────────────────────────
  const checkHasSession = async (cid: string): Promise<boolean> => {
    const { count, error } = await supabase
      .from('sessions')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', cid);
    if (error) return false; // tabla no accesible → asumir sin sesión
    return (count ?? 0) > 0;
  };

  // ── Cargar estado al montar ──────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);

      // 1. ¿Hay token OAuth (Business)? → conectado siempre (API)
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

      // 2. ¿Hay credenciales personales en Supabase?
      const { data: creds } = await supabase
        .from('ig_credentials')
        .select('ig_username, ig_password')
        .eq('client_id', clientId)
        .maybeSingle();

      if (creds?.ig_username) {
        // Pre-cargar siempre para que el popup pueda mostrarlas
        setIgUsername(creds.ig_username);
        setIgPassword(creds.ig_password || '');
        onUsernameChange?.(creds.ig_username);
        // Solo "Cuenta Conectada" si hay cookies/sesión guardadas — si no, botón "Conectar"
        const hasSession = await checkHasSession(clientId);
        if (hasSession) {
          setMode('personal');
          onAccountTypeChange?.('personal');
        } else {
          setMode('none'); // creds guardadas pero sin sesión → mostrar botón conectar
          onAccountTypeChange?.('none');
        }
        setLoading(false);
        return;
      }

      // 3. igUser (clients.json) → solo referencia visual en el modal (NO auto-guardar, NO activar estado)
      // Las creds del JSON se muestran al abrir el popup via igUser/igPass props.
      // El estado "CREDS GUARDADAS" solo se activa cuando el usuario guarda explícitamente.
      if (igUser) {
        setMode('none');
        onUsernameChange?.('');
        onAccountTypeChange?.('none');
        setLoading(false);
        return;
      }

      setMode('none');
      setIgUsername('');
      onUsernameChange?.('');
      onAccountTypeChange?.('none');
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  // ── Guardar credenciales personales ─────────────────────────────────────────
  const handleSavePersonal = async () => {
    if (!clientId) {
      setError('Error: cliente no identificado todavía. Espera un momento y vuelve a intentarlo.');
      return;
    }
    if (!userInput.trim() || !passInput.trim()) {
      setError('Usuario y contraseña obligatorios');
      return;
    }
    setSaving(true); setError('');
    const { error: err } = await supabase.from('ig_credentials').upsert({
      client_id:   clientId,
      ig_username: userInput.trim().replace(/^@/, ''),
      ig_password: passInput.trim(),
      updated_at:  new Date().toISOString(),
    }, { onConflict: 'client_id' });
    if (err) {
      setError('Error: ' + err.message);
    } else {
      const u = userInput.trim().replace(/^@/, '');
      const pw = passInput.trim();
      // Guardar creds ≠ conectado: sin sesión → mode='none' con creds pre-cargadas
      setIgUsername(u);
      setIgPassword(pw);
      setMode('none');
      onUsernameChange?.(u);
      onAccountTypeChange?.('none');
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

  // ── Modal credenciales antes de OAuth ───────────────────────────────────────
  // Este modal aparece SIEMPRE al pulsar "Conectar Instagram", mostrando la contraseña.
  if (showCreds) {
    const hasCredentials = !!(igUsername || igUser || igPassword || igPass);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-[#1a1d27] border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-5">
            <span className="text-3xl">🔑</span>
            <h3 className="font-black text-white text-base mt-2">Credenciales Instagram</h3>
            <p className="text-gray-500 text-xs mt-1">{clientName}</p>
            <p className="text-gray-400 text-[11px] mt-2">
              {hasCredentials
                ? 'Copia usuario y contraseña antes de iniciar sesión en Instagram.'
                : 'No hay credenciales guardadas. Introduce usuario y contraseña primero.'}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {/* Usuario — usa el estado actual (Supabase), no el prop */}
            {(igUsername || igUser) ? (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Usuario</span>
                <div className="flex items-center gap-2">
                  <span className="flex-1 font-mono text-sm text-white bg-[#252836] rounded-xl px-3 py-2 break-all">
                    {igUsername || igUser}
                  </span>
                  <button onClick={() => { navigator.clipboard.writeText(igUsername || igUser || ''); setCopied('user'); setTimeout(() => setCopied(''), 2000); }}
                    className="px-3 py-2 bg-purple-700 hover:opacity-90 text-white text-xs font-black rounded-xl shrink-0">
                    {copied === 'user' ? '✅' : '📋'}
                  </button>
                </div>
              </div>
            ) : null}
            {/* Contraseña — siempre visible en este popup */}
            {(igPassword || igPass) ? (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Contraseña</span>
                <div className="flex items-center gap-2">
                  <span className="flex-1 font-mono text-sm text-amber-400 bg-[#252836] rounded-xl px-3 py-2 break-all">
                    {igPassword || igPass}
                  </span>
                  <button onClick={() => { navigator.clipboard.writeText(igPassword || igPass || ''); setCopied('pass'); setTimeout(() => setCopied(''), 2000); }}
                    className="px-3 py-2 bg-amber-600 hover:opacity-90 text-black text-xs font-black rounded-xl shrink-0">
                    {copied === 'pass' ? '✅' : '📋'}
                  </button>
                </div>
              </div>
            ) : null}

            {/* Botón editar/añadir credenciales */}
            <button onClick={() => { setShowCreds(false); setUserInput(igUsername || igUser || ''); setPassInput(igPassword || igPass || ''); setShowForm(true); }}
              className="w-full py-2 text-gray-400 hover:text-amber-400 border border-gray-700 hover:border-amber-600 text-xs font-black uppercase tracking-widest rounded-xl transition-colors">
              {hasCredentials ? '✏️ Cambiar usuario / contraseña' : '➕ Añadir credenciales'}
            </button>

            {/* Separador */}
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Conectar como</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            {/* Business / Creator → OAuth */}
            <button onClick={async () => {
              const user = (igUsername || igUser || '').replace(/^@/, '');
              const pass = igPassword || igPass || '';
              // Persistir creds a Supabase ANTES del redirect OAuth
              // → quedan guardadas para uso futuro con publisher_server.py (cuenta personal)
              if (user) {
                await supabase.from('ig_credentials').upsert({
                  client_id:   clientId,
                  ig_username: user,
                  ig_password: pass,
                  updated_at:  new Date().toISOString(),
                }, { onConflict: 'client_id' });
              }
              setShowCreds(false);
              startOAuthWithCreds(clientId, user || undefined, pass || undefined);
            }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2">
              🏢 Business / Creator (OAuth)
            </button>

            {/* Personal → guardar creds directamente si las hay, si no abrir form */}
            <button onClick={() => { setShowCreds(false); setUserInput(igUsername || igUser || ''); setPassInput(igPassword || igPass || ''); setShowForm(true); }}
              className="w-full py-2.5 bg-[#252836] hover:bg-[#2d3144] border border-gray-700 text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-colors">
              👤 Cuenta Personal
            </button>

            <button onClick={() => setShowCreds(false)}
              className="w-full py-2 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          onClick={() => { setShowMenu(false); setShowCreds(true); }}
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
          onClick={() => { setShowMenu(false); setUserInput(igUser || ''); setPassInput(igPass || ''); setShowForm(true); }}
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
      <div className="flex items-center gap-2 bg-green-950 border border-green-700 rounded-xl px-3 py-1.5">
        <span className="text-green-400 text-base">✅</span>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Cuenta conectada · API</span>
          <span className="text-xs font-black text-white">📸 @{igUsername.replace(/^@/, '')}</span>
        </div>
      </div>
      <button onClick={() => setShowMenu(true)} title="Cambiar cuenta"
        className="text-[10px] text-gray-500 hover:text-amber-400 border border-gray-700 hover:border-amber-600 px-2 py-1 rounded-lg transition-colors font-bold">✏️</button>
      <button onClick={handleDisconnect} title="Desconectar"
        className="text-[10px] text-gray-500 hover:text-red-400 border border-gray-700 hover:border-red-500 px-2 py-1 rounded-lg transition-colors font-bold uppercase tracking-widest">
        Desconectar
      </button>
    </div>
  );

  // ── Conectado: Personal ──────────────────────────────────────────────────────
  if (mode === 'personal') return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-orange-950 border border-orange-700 rounded-xl px-3 py-1.5">
        <span className="text-orange-400 text-base">✅</span>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">Cuenta conectada · Local</span>
          <span className="text-xs font-black text-white">📸 @{igUsername.replace(/^@/, '')}</span>
        </div>
      </div>
      <button onClick={() => { setUserInput(igUsername); setPassInput(igPassword); setShowForm(true); }} title="Editar"
        className="text-[10px] text-gray-500 hover:text-amber-400 border border-gray-700 hover:border-amber-600 px-2 py-1 rounded-lg transition-colors font-bold">✏️</button>
      <button onClick={handleDisconnect} title="Desconectar"
        className="text-[10px] text-gray-500 hover:text-red-400 border border-gray-700 hover:border-red-500 px-2 py-1 rounded-lg transition-colors font-bold uppercase tracking-widest">
        Desconectar
      </button>
    </div>
  );

  // ── Sin sesión (mode='none') ─────────────────────────────────────────────────
  // Si hay credenciales pre-cargadas → mostrar estado "creds guardadas, sin sesión"
  // Si no hay nada → botón normal "Conectar Instagram"
  if (igUsername) {
    // Credenciales guardadas pero sin sesión/cookies → pendiente de conectar via publisher_server.py
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCreds(true)}
          className="flex items-center gap-2 bg-amber-950 border border-amber-700 rounded-xl px-3 py-1.5 hover:border-amber-500 transition-colors"
          title="Clic para ver credenciales · Sin sesión guardada aún"
        >
          <span className="text-amber-400 text-base">🔑</span>
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Creds guardadas · Sin sesión</span>
            <span className="text-xs font-black text-white">📸 @{igUsername.replace(/^@/, '')}</span>
          </div>
        </button>
        <button onClick={() => { setUserInput(igUsername); setPassInput(igPassword); setShowForm(true); }} title="Editar credenciales"
          className="text-[10px] text-gray-500 hover:text-amber-400 border border-gray-700 hover:border-amber-600 px-2 py-1 rounded-lg transition-colors font-bold">✏️</button>
        <button onClick={handleDisconnect} title="Borrar credenciales"
          className="text-[10px] text-gray-500 hover:text-red-400 border border-gray-700 hover:border-red-500 px-2 py-1 rounded-lg transition-colors font-bold uppercase tracking-widest">
          Borrar
        </button>
      </div>
    );
  }

  // Sin credenciales → botón para conectar
  return (
    <button onClick={() => setShowCreds(true)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-[10px] font-black uppercase tracking-widest transition-opacity">
      📸 Conectar Instagram
    </button>
  );
}
