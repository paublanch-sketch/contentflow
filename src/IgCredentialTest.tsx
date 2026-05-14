// src/IgCredentialTest.tsx — /ig-test
// Prueba automática de credenciales Instagram contra /api/test-ig
// TEMPORAL: eliminar tras obtener resultados.

import { useState, useEffect, useRef, useCallback } from 'react';
import clientsData from './clients.json';

type Client = { id: string; name: string; ig_username?: string; ig_password?: string; };
type Status = 'pending' | 'running' | 'ok' | 'needs_2fa' | 'wrong_creds' | 'error';
type Result = { status: Status; note: string; testedAt: string; };

const LS_KEY = 'ig_test_v2';
const ICON: Record<Status, string> = {
  pending: '⏳', running: '🔄', ok: '✅', needs_2fa: '⚠️', wrong_creds: '❌', error: '🔴',
};
const COLOR: Record<Status, string> = {
  pending: '#f3f4f6', running: '#dbeafe', ok: '#bbf7d0',
  needs_2fa: '#fef08a', wrong_creds: '#fecaca', error: '#fecaca',
};

const IG_CLIENTS: Client[] = (clientsData as Client[]).filter(c => c.ig_username && c.ig_password);

export default function IgCredentialTest() {
  const [results, setResults]     = useState<Record<string, Result>>(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch { return {}; }
  });
  const [running, setRunning]     = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [delay, setDelay]         = useState(2000);
  const stopRef                   = useRef(false);

  // Persistir
  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(results)); }, [results]);

  const pending  = IG_CLIENTS.filter(c => !results[c.id] || results[c.id].status === 'pending');
  const done     = IG_CLIENTS.filter(c => results[c.id]  && results[c.id].status !== 'pending');
  const ok       = done.filter(c => results[c.id].status === 'ok');
  const twofa    = done.filter(c => results[c.id].status === 'needs_2fa');
  const wrong    = done.filter(c => results[c.id].status === 'wrong_creds');
  const errors   = done.filter(c => results[c.id].status === 'error');
  const progress = Math.round((done.length / IG_CLIENTS.length) * 100);

  // ── Loop automático ────────────────────────────────────────────────────────
  const runLoop = useCallback(async () => {
    stopRef.current = false;
    setRunning(true);

    const queue = IG_CLIENTS.filter(c => !results[c.id] || results[c.id].status === 'pending' || results[c.id].status === 'error');

    for (const client of queue) {
      if (stopRef.current) break;

      setCurrentId(client.id);
      setResults(prev => ({
        ...prev,
        [client.id]: { status: 'running', note: 'Probando...', testedAt: new Date().toISOString() },
      }));

      let result: Result;
      try {
        const res  = await fetch('/api/test-ig', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ username: client.ig_username, password: client.ig_password }),
          signal:  AbortSignal.timeout(20000),
        });
        const data = await res.json();
        result = {
          status:   (data.status as Status) || 'error',
          note:     data.note || '',
          testedAt: new Date().toISOString(),
        };
      } catch (e: unknown) {
        result = { status: 'error', note: (e as Error).message || 'Timeout', testedAt: new Date().toISOString() };
      }

      setResults(prev => ({ ...prev, [client.id]: result }));

      if (delay > 0 && !stopRef.current) await new Promise(r => setTimeout(r, delay));
    }

    setRunning(false);
    setCurrentId(null);
  }, [results, delay]);

  const stop  = () => { stopRef.current = true; };
  const reset = () => { if (!window.confirm('¿Borrar todos los resultados?')) return; localStorage.removeItem(LS_KEY); setResults({}); };
  const exportCSV = () => {
    const rows = IG_CLIENTS.map(c => {
      const r = results[c.id];
      return [c.id, `"${c.name}"`, c.ig_username, r?.status ?? 'pending', `"${r?.note ?? ''}"`, r?.testedAt ?? ''].join(',');
    });
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent('id,nombre,username,estado,nota,fecha\n' + rows.join('\n'));
    a.download = `ig_test_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background:'#f5f5f5', minHeight:'100vh', padding:20 }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div>
          <h1 style={{ margin:0, fontSize:20, color:'#111' }}>🔑 Test Credenciales Instagram</h1>
          <p style={{ margin:'3px 0 0', color:'#888', fontSize:12 }}>
            {IG_CLIENTS.length} cuentas · loop automático vía API · <span style={{color:'#dc2626',fontWeight:600}}>ELIMINAR tras usar</span>
          </p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={exportCSV} style={btn('#fff','#374151','#d1d5db')}>⬇️ CSV</button>
          <button onClick={reset} style={btn('#fff','#dc2626','#fca5a5')}>🗑️ Reset</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
        {[
          ['Total',        IG_CLIENTS.length, '#6b7280'],
          ['✅ OK',         ok.length,    '#16a34a'],
          ['⚠️ 2FA',        twofa.length, '#d97706'],
          ['❌ Incorrectas',wrong.length, '#dc2626'],
          ['🔴 Error',      errors.length,'#9ca3af'],
          ['⏳ Pendientes', pending.length,'#3b82f6'],
        ].map(([lbl, val, col]) => (
          <div key={String(lbl)} style={{ background:'#fff', borderRadius:10, padding:'10px 18px',
                                          boxShadow:'0 1px 3px rgba(0,0,0,.1)', textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:700, color: String(col) }}>{val}</div>
            <div style={{ fontSize:11, color:'#888' }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Barra */}
      <div style={{ background:'#e5e7eb', borderRadius:99, height:8, marginBottom:20 }}>
        <div style={{ background: done.length === IG_CLIENTS.length ? '#16a34a' : '#3b82f6',
                      borderRadius:99, height:8, width:`${progress}%`, transition:'width .4s' }} />
      </div>

      {/* Controles */}
      <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:20 }}>
        {!running ? (
          <button onClick={runLoop} disabled={pending.length === 0}
            style={{ ...btn('#111','#fff','#111'), padding:'12px 28px', fontSize:15, fontWeight:700,
                     opacity: pending.length === 0 ? 0.4 : 1 }}>
            ▶ {done.length === 0 ? 'Iniciar loop' : `Continuar (${pending.length} pendientes)`}
          </button>
        ) : (
          <button onClick={stop} style={{ ...btn('#dc2626','#fff','#dc2626'), padding:'12px 28px', fontSize:15, fontWeight:700 }}>
            ⏹ Parar
          </button>
        )}
        <label style={{ fontSize:13, color:'#555', display:'flex', alignItems:'center', gap:6 }}>
          Delay entre pruebas:
          <select value={delay} onChange={e => setDelay(Number(e.target.value))}
            style={{ border:'1px solid #ddd', borderRadius:6, padding:'4px 8px', fontSize:13 }}>
            <option value={0}>0s (máxima velocidad)</option>
            <option value={1000}>1s</option>
            <option value={2000}>2s (recomendado)</option>
            <option value={4000}>4s (más seguro)</option>
          </select>
        </label>
        {running && currentId && (
          <span style={{ fontSize:13, color:'#3b82f6', fontWeight:600 }}>
            🔄 Probando: @{IG_CLIENTS.find(c=>c.id===currentId)?.ig_username}
          </span>
        )}
      </div>

      {/* Tabla de resultados */}
      <div style={{ background:'#fff', borderRadius:12, boxShadow:'0 1px 4px rgba(0,0,0,.1)', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#111', color:'#fff' }}>
              {['','Cliente','Usuario','Estado','Nota','Hora'].map(h => (
                <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:12,
                                     textTransform:'uppercase', letterSpacing:'.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {IG_CLIENTS.map(c => {
              const r     = results[c.id];
              const st    = r?.status ?? 'pending';
              const isCur = c.id === currentId;
              return (
                <tr key={c.id} style={{ background: isCur ? '#eff6ff' : COLOR[st],
                                        borderBottom:'1px solid rgba(0,0,0,.05)' }}>
                  <td style={{ padding:'8px 14px', fontSize:18 }}>{ICON[st]}</td>
                  <td style={{ padding:'8px 14px', fontSize:13, color:'#374151' }}>{c.name}</td>
                  <td style={{ padding:'8px 14px', fontFamily:'monospace', fontSize:13, fontWeight:600 }}>
                    @{c.ig_username}
                  </td>
                  <td style={{ padding:'8px 14px', fontSize:13, fontWeight:600 }}>{st}</td>
                  <td style={{ padding:'8px 14px', fontSize:12, color:'#6b7280' }}>{r?.note || '—'}</td>
                  <td style={{ padding:'8px 14px', fontSize:11, color:'#9ca3af' }}>
                    {r?.testedAt ? new Date(r.testedAt).toLocaleTimeString('es-ES') : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Resumen final si todo hecho */}
      {done.length === IG_CLIENTS.length && (
        <div style={{ marginTop:20, background:'#fff', borderRadius:12, padding:24,
                      boxShadow:'0 1px 4px rgba(0,0,0,.1)' }}>
          <h3 style={{ margin:'0 0 12px', color:'#111' }}>📋 Resumen final</h3>
          {twofa.length > 0 && (
            <div style={{ background:'#fefce8', border:'1px solid #fde047', borderRadius:8, padding:12, marginBottom:10 }}>
              <strong>⚠️ Necesitan 2FA — usar desde Mac de Sunamis:</strong>
              <div style={{ marginTop:6, display:'flex', flexWrap:'wrap', gap:6 }}>
                {twofa.map(c => <code key={c.id} style={{ background:'#fef08a', padding:'2px 8px', borderRadius:4, fontSize:12 }}>@{c.ig_username}</code>)}
              </div>
            </div>
          )}
          {wrong.length > 0 && (
            <div style={{ background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:8, padding:12 }}>
              <strong>❌ Contraseña incorrecta — actualizar en ContentFlow:</strong>
              <div style={{ marginTop:6, display:'flex', flexWrap:'wrap', gap:6 }}>
                {wrong.map(c => <code key={c.id} style={{ background:'#fecaca', padding:'2px 8px', borderRadius:4, fontSize:12 }}>@{c.ig_username}</code>)}
              </div>
            </div>
          )}
          <button onClick={exportCSV} style={{ marginTop:14, ...btn('#111','#fff','#111'), padding:'10px 24px', fontWeight:700 }}>
            ⬇️ Descargar CSV completo
          </button>
        </div>
      )}
    </div>
  );
}

function btn(bg: string, color: string, border: string) {
  return {
    background: bg, color, border: `1px solid ${border}`,
    borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13,
  } as React.CSSProperties;
}
