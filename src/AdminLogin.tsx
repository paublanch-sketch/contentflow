// ARCHIVO: src/AdminLogin.tsx
import { useState } from 'react';

// Credenciales del panel admin
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'interactivos2025';

type Props = {
  onLogin: () => void;
};

export default function AdminLogin({ onLogin }: Props) {
  const [user, setUser]     = useState('');
  const [pass, setPass]     = useState('');
  const [error, setError]   = useState(false);
  const [shake, setShake]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem('cf_admin_auth', '1');
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setPass('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full p-3 rounded-lg bg-[#252836] border text-white text-sm font-bold outline-none transition-colors placeholder-gray-600 ${
      hasError
        ? 'border-red-500 focus:border-red-400'
        : 'border-gray-700 focus:border-[#52b788]'
    }`;

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div
        className={`bg-[#1a1d27] border border-gray-800 rounded-2xl p-10 w-full max-w-sm shadow-2xl transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="font-black text-[#52b788] tracking-tighter uppercase text-2xl">
            ContentFlow
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">
            Panel Admin · Interactivos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={user}
            onChange={e => { setUser(e.target.value); setError(false); }}
            placeholder="Usuario"
            autoFocus
            autoComplete="username"
            className={inputClass(error)}
          />
          <input
            type="password"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(false); }}
            placeholder="Contraseña"
            autoComplete="current-password"
            className={inputClass(error)}
          />
          {error && (
            <p className="text-red-400 text-xs font-bold text-center">
              Usuario o contraseña incorrectos
            </p>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-[#52b788] hover:bg-[#40a070] text-black font-black text-sm uppercase tracking-widest rounded-lg transition-colors"
          >
            Acceder
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </div>
  );
}
