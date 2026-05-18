// api/test-ig.js — Prueba una credencial Instagram vía HTTP (sin browser)
// Llama al endpoint web de IG: obtiene CSRF → intenta login → guarda cookies en Supabase

const SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg';

// Guarda storage_state (formato Playwright) en Supabase tabla sessions
async function saveSessionSupabase(client_id, storage_state) {
  const state_str = JSON.stringify(storage_state);
  await fetch(`${SUPABASE_URL}/rest/v1/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer':        'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      client_id,
      platform:       'IG',
      storage_state:  state_str,
    }),
  });
}

// Parsea cookies del header set-cookie al formato Playwright
function parseCookies(rawCookieHeader, extraCookies = '') {
  const cookieStrings = [];

  // Combinar cookies de pageRes y loginRes
  const all = [rawCookieHeader, extraCookies].filter(Boolean).join(', ');

  // Extraer pares clave=valor ignorando atributos (Path, Domain, etc.)
  const seen = new Set();
  const regex = /([^,=\s]+)=([^;,]*)/g;
  let m;
  while ((m = regex.exec(all)) !== null) {
    const name = m[1].trim();
    const val  = m[2].trim();
    // Ignorar atributos de cookie
    if (['path','domain','expires','max-age','samesite','httponly','secure','version'].includes(name.toLowerCase())) continue;
    if (seen.has(name)) continue;
    seen.add(name);
    cookieStrings.push({
      name,
      value:    val,
      domain:   '.instagram.com',
      path:     '/',
      expires:  -1,
      httpOnly: false,
      secure:   true,
      sameSite: 'Lax',
    });
  }
  return cookieStrings;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { username, password, client_id } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username y password requeridos' });

  const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) ' +
             'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

  try {
    // ── 1. Obtener CSRF token ────────────────────────────────────────────────
    const pageRes = await fetch('https://www.instagram.com/accounts/login/', {
      headers: {
        'User-Agent':     UA,
        'Accept':         'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':'es-ES,es;q=0.9',
      },
      signal: AbortSignal.timeout(12000),
    });

    const pageCookies = pageRes.headers.get('set-cookie') || '';
    const csrf        = (pageCookies.match(/csrftoken=([^;,\s]+)/) || [])[1] || '';

    if (!csrf) {
      return res.status(200).json({ status: 'error', note: 'No CSRF — Instagram bloqueó la petición del servidor' });
    }

    // ── 2. Login AJAX ────────────────────────────────────────────────────────
    const ts          = Math.floor(Date.now() / 1000);
    const encPassword = `#PWD_INSTAGRAM_BROWSER:0:${ts}:${password}`;

    const loginRes = await fetch('https://www.instagram.com/api/v1/web/accounts/login/ajax/', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/x-www-form-urlencoded',
        'X-CSRFToken':       csrf,
        'X-Instagram-AJAX':  String(ts),
        'X-Requested-With':  'XMLHttpRequest',
        'User-Agent':        UA,
        'Referer':           'https://www.instagram.com/accounts/login/',
        'Cookie':            `csrftoken=${csrf}`,
        'Accept':            '*/*',
        'Accept-Language':   'es-ES,es;q=0.9',
      },
      body: new URLSearchParams({
        username,
        enc_password:         encPassword,
        queryParams:          '{}',
        optIntoOneTap:        'false',
        stopDeletionNonce:    '',
        trustedDeviceRecords: '{}',
      }).toString(),
      signal: AbortSignal.timeout(15000),
    });

    const loginCookies = loginRes.headers.get('set-cookie') || '';
    const data         = await loginRes.json().catch(() => ({}));

    // ── 3. Interpretar respuesta y guardar sesión si OK ──────────────────────
    if (data.authenticated === true) {
      // Guardar cookies en Supabase si se pasó client_id
      if (client_id) {
        const allCookies   = parseCookies(pageCookies, loginCookies);
        const storageState = { cookies: allCookies, origins: [] };
        await saveSessionSupabase(client_id, storageState).catch(e =>
          console.error('Supabase save error:', e.message)
        );
      }
      return res.status(200).json({ status: 'ok', note: 'Login correcto — sesión guardada en Supabase' });
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
