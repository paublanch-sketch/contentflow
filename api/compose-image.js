// api/compose-image.js — Vercel Serverless Function
// Composita: fondo Pollinations + oscuridad + texto + logo PNG + imagen extra
// Requiere: npm install sharp

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    bgUrl,                        // URL imagen de fondo
    text        = '',             // Texto 1
    textPos     = 'bc',          // Posición: tl/tc/tr/ml/mc/mr/bl/bc/br
    textColor   = '#ffffff',
    fontSize    = 72,
    fontWeight  = 'bold',
    text2       = '',             // Texto 2 (opcional)
    text2Pos    = 'tc',
    text2Color  = '#ffffff',
    text2Size   = 48,
    text2Weight = 'bold',
    logoUrl     = '',             // URL logo PNG (opcional)
    logoPos     = 'tl',
    logoSize    = 180,            // px ancho máximo del logo
    img2Url     = '',             // Segunda imagen (opcional)
    img2Pos     = 'br',
    img2Size    = 300,
    overlayOpacity = 0.35,        // Oscuridad sobre el fondo (0–1)
  } = req.body || {};

  if (!bgUrl) return res.status(400).json({ error: 'bgUrl es obligatorio' });

  try {
    const sharp = require('sharp');

    // ── 1. Fondo ─────────────────────────────────────────────────────────────
    const bgBuf = await fetchBuf(bgUrl);
    const base  = sharp(bgBuf).resize(1080, 1080, { fit: 'cover', position: 'centre' });

    const composites = [];

    // ── 2. Capa oscura para legibilidad ──────────────────────────────────────
    if (overlayOpacity > 0) {
      const alpha = Math.min(Math.round(overlayOpacity * 255), 255);
      const darkBuf = await sharp({
        create: { width: 1080, height: 1080, channels: 4,
                  background: { r: 0, g: 0, b: 0, alpha } },
      }).png().toBuffer();
      composites.push({ input: darkBuf, top: 0, left: 0 });
    }

    // ── 3. Texto 1 con SVG ───────────────────────────────────────────────────
    if (text.trim()) {
      const svgBuf = Buffer.from(
        buildTextSVG(text, textPos, textColor, Number(fontSize), fontWeight)
      );
      composites.push({ input: svgBuf, top: 0, left: 0 });
    }

    // ── 3b. Texto 2 con SVG (opcional) ───────────────────────────────────────
    if (text2 && text2.trim()) {
      const svgBuf2 = Buffer.from(
        buildTextSVG(text2, text2Pos, text2Color, Number(text2Size), text2Weight)
      );
      composites.push({ input: svgBuf2, top: 0, left: 0 });
    }

    // ── 4. Logo ──────────────────────────────────────────────────────────────
    if (logoUrl) {
      try {
        const lBuf  = await fetchBuf(logoUrl);
        const lResized = await sharp(lBuf)
          .resize(Number(logoSize), Number(logoSize), { fit: 'inside' })
          .png().toBuffer();
        const { width: lW, height: lH } = await sharp(lResized).metadata();
        const { top, left } = calcTL(logoPos, 1080, 1080, lW, lH, 40);
        composites.push({ input: lResized, top, left });
      } catch { /* logo fallido → ignorar */ }
    }

    // ── 5. Imagen extra ───────────────────────────────────────────────────────
    if (img2Url) {
      try {
        const i2Buf = await fetchBuf(img2Url);
        const i2Resized = await sharp(i2Buf)
          .resize(Number(img2Size), Number(img2Size), { fit: 'inside' })
          .png().toBuffer();
        const { width: i2W, height: i2H } = await sharp(i2Resized).metadata();
        const { top, left } = calcTL(img2Pos, 1080, 1080, i2W, i2H, 40);
        composites.push({ input: i2Resized, top, left });
      } catch { /* imagen fallida → ignorar */ }
    }

    // ── 6. Componer y devolver PNG ────────────────────────────────────────────
    const resultBuf = await base
      .composite(composites)
      .png({ compressionLevel: 8 })
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(resultBuf);

  } catch (e) {
    console.error('[compose-image]', e);
    return res.status(500).json({ error: String(e) });
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Fetch con retry 429 — timeouts cortísimos para no superar los 60s de Vercel Hobby
// Peor caso total: 8+3+8+6+8+10 = 43s < 60s
async function fetchBuf(url) {
  const MAX_RETRIES = 3;
  const DELAYS      = [3000, 6000, 10000]; // ms entre intentos

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let res;
    try {
      res = await fetch(url, { signal: AbortSignal.timeout(8000) }); // 8s por intento
    } catch (e) {
      // timeout o error de red
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, DELAYS[attempt]));
        continue;
      }
      throw new Error(`Timeout/red fetching image after ${MAX_RETRIES + 1} intentos`);
    }

    if (res.status === 429) {
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, DELAYS[attempt]));
        continue;
      }
      throw new Error('Servicio de imágenes ocupado (429). Inténtalo en 30 segundos.');
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching image`);
    return Buffer.from(await res.arrayBuffer());
  }
}

function calcTL(pos, cW, cH, eW = 0, eH = 0, pad = 40) {
  const half = (total, elem) => Math.max(0, Math.floor((total - elem) / 2));
  const M = {
    tl: [pad,            pad           ],
    tc: [pad,            half(cW, eW)  ],
    tr: [pad,            cW - eW - pad ],
    ml: [half(cH, eH),   pad           ],
    mc: [half(cH, eH),   half(cW, eW)  ],
    mr: [half(cH, eH),   cW - eW - pad ],
    bl: [cH - eH - pad,  pad           ],
    bc: [cH - eH - pad,  half(cW, eW)  ],
    br: [cH - eH - pad,  cW - eW - pad ],
  };
  const [top, left] = M[pos] ?? M.bc;
  return { top: Math.max(0, top), left: Math.max(0, left) };
}

function buildTextSVG(rawText, pos, color, fontSize, fontWeight) {
  const PAD          = 60;
  const maxWidth     = 1080 - PAD * 2;
  const charsPerLine = Math.max(1, Math.floor(maxWidth / (fontSize * 0.55)));

  // Wrap words into lines
  const words = rawText.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const candidate = cur ? `${cur} ${w}` : w;
    if (candidate.length <= charsPerLine) { cur = candidate; }
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);

  const lineH  = fontSize * 1.25;
  const totalH = lines.length * lineH;

  const posMap = {
    tl: { ax: 'start',  x: PAD,         y: PAD + fontSize           },
    tc: { ax: 'middle', x: 540,          y: PAD + fontSize           },
    tr: { ax: 'end',    x: 1080 - PAD,   y: PAD + fontSize           },
    ml: { ax: 'start',  x: PAD,         y: (1080 - totalH) / 2 + fontSize },
    mc: { ax: 'middle', x: 540,          y: (1080 - totalH) / 2 + fontSize },
    mr: { ax: 'end',    x: 1080 - PAD,   y: (1080 - totalH) / 2 + fontSize },
    bl: { ax: 'start',  x: PAD,         y: 1080 - PAD - totalH + fontSize  },
    bc: { ax: 'middle', x: 540,          y: 1080 - PAD - totalH + fontSize  },
    br: { ax: 'end',    x: 1080 - PAD,   y: 1080 - PAD - totalH + fontSize  },
  };
  const { ax, x, y } = posMap[pos] ?? posMap.bc;

  const mkTspans = (dx, dy) => lines
    .map((ln, i) => `<tspan x="${x + dx}" ${i > 0 ? `dy="${lineH}"` : ''}>${esc(ln)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
  <!-- sombra -->
  <text x="${x + 2}" y="${y + 2}" text-anchor="${ax}"
        font-family="sans-serif"
        font-size="${fontSize}" font-weight="${fontWeight}"
        fill="rgba(0,0,0,0.75)">${mkTspans(2, 2)}</text>
  <!-- texto principal -->
  <text x="${x}" y="${y}" text-anchor="${ax}"
        font-family="sans-serif"
        font-size="${fontSize}" font-weight="${fontWeight}"
        fill="${esc(color)}">${mkTspans(0, 0)}</text>
</svg>`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
