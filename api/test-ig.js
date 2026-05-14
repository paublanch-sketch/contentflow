// api/test-ig.js — Prueba una credencial Instagram vía HTTP (sin browser)
// Llama al endpoint web de IG: obtiene CSRF → intenta login → devuelve resultado

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username y password requeridos' });

  const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) ' +
             'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

  try {
    // ── 1. Obtener CSRF token ────────────────────────────────────────────────
    const pageRes = await fetch('https://www.instagram.com/accounts/login/', {
      headers: {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9',
      },
      signal: AbortSignal.timeout(12000),
    });

    const cookies = pageRes.headers.get('set-cookie') || '';
    const csrf    = (cookies.match(/csrftoken=([^;,\s]+)/) || [])[1] || '';

    if (!csrf) {
      return res.status(200).json({ status: 'error', note: 'No CSRF — Instagram bloqueó la petición del servidor' });
    }

    // ── 2. Login AJAX ────────────────────────────────────────────────────────
    const ts          = Math.floor(Date.now() / 1000);
    const encPassword = `#PWD_INSTAGRAM_BROWSER:0:${ts}:${password}`;

    const loginRes = await fetch('https://www.instagram.com/api/v1/web/accounts/login/ajax/', {
      method:  'POST',
      headers: {
        'Content-Type':       'application/x-www-form-urlencoded',
        'X-CSRFToken':        csrf,
        'X-Instagram-AJAX':   String(ts),
        'X-Requested-With':   'XMLHttpRequest',
        'User-Agent':         UA,
        'Referer':            'https://www.instagram.com/accounts/login/',
        'Cookie':             `csrftoken=${csrf}`,
        'Accept':             '*/*',
        'Accept-Language':    'es-ES,es;q=0.9',
      },
      body: new URLSearchParams({
        username,
        enc_password:          encPassword,
        queryParams:           '{}',
        optIntoOneTap:         'false',
        stopDeletionNonce:     '',
        trustedDeviceRecords:  '{}',
      }).toString(),
      signal: AbortSignal.timeout(15000),
    });

    const data = await loginRes.json().catch(() => ({}));

    // ── 3. Interpretar respuesta ─────────────────────────────────────────────
    if (data.authenticated === true) {
      return res.status(200).json({ status: 'ok', note: 'Login correcto' });
    }
    if (data.two_factor_required) {
      return res.status(200).json({ status: 'needs_2fa', note: '2FA requerido (SMS/app)' });
    }
    if (data.checkpoint_url || data.message === 'checkpoint_required') {
      return res.status(200).json({ status: 'needs_2fa', note: `Checkpoint: ${data.checkpoint_url || ''}` });
    }
    if (data.user === false || data.message === 'bad_password') {
      return res.status(200).json({ status: 'wrong_creds', note: 'Contraseña incorrecta' });
    }
    if (data.user === null) {
      return res.status(200).json({ status: 'wrong_creds', note: 'Usuario no encontrado' });
    }

    // Respuesta desconocida — devolver raw para debug
    return res.status(200).json({
      status: 'error',
      note:   JSON.stringify(data).slice(0, 200),
    });

  } catch (err) {
    return res.status(200).json({
      status: 'error',
      note:   err.message?.slice(0, 150) || 'Timeout o error de red',
    });
  }
};
