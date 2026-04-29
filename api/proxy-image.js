// api/proxy-image.js — Proxy para imágenes externas (evita CORS del navegador)
// Incluye retry automático para 429 de Pollinations

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: 'url es obligatorio' });

  // Retry con backoff para 429
  const MAX_RETRIES = 4;
  const DELAYS      = [3000, 6000, 12000, 20000]; // ms entre intentos

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(45000) });

      if (response.status === 429) {
        if (attempt < MAX_RETRIES) {
          await sleep(DELAYS[attempt]);
          continue; // reintento
        }
        return res.status(429).json({ error: 'Servicio ocupado, inténtalo en unos segundos' });
      }

      if (!response.ok) {
        return res.status(response.status).json({ error: `Error HTTP ${response.status}` });
      }

      const contentType = response.headers.get('content-type') || 'image/png';
      const buffer      = Buffer.from(await response.arrayBuffer());

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).send(buffer);

    } catch (e) {
      if (attempt < MAX_RETRIES) {
        await sleep(DELAYS[attempt]);
        continue;
      }
      return res.status(500).json({ error: String(e) });
    }
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
