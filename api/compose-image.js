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
    bgUrl,                        // URL imagen de fondo O base64 data:image/...
    text        = '',             // Texto 1
    textPos     = 'bc',          // Posición: tl/tc/tr/ml/mc/mr/bl/bc/br
    textColor   = '#ffffff',
    fontSize    = 72,
    fontWeight  = 'bold',
    fontName    = 'montserrat',   // 'montserrat' | 'inter' | 'poppins' | 'sans-serif'
    text2       = '',             // Texto 2 (opcional)
    text2Pos    = 'tc',
    text2Color  = '#ffffff',
    text2Size   = 48,
    text2Weight = 'bold',
    text2Font   = 'montserrat',
    logoUrl      = '',            // URL logo PNG (opcional)
    logoPos      = 'tl',
    logoSize     = 180,           // px ancho máximo del logo
    logoRotation = 0,             // grados
    img2Url      = '',            // Segunda imagen (opcional)
    img2Pos      = 'br',
    img2Size     = 300,
    textRotation  = 0,            // rotación texto 1
    text2Rotation = 0,            // rotación texto 2
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
        await buildTextSVG(text, textPos, textColor, Number(fontSize), fontWeight, fontName, Number(textRotation))
      );
      composites.push({ input: svgBuf, top: 0, left: 0 });
    }

    // ── 3b. Texto 2 con SVG (opcional) ───────────────────────────────────────
    if (text2 && text2.trim()) {
      const svgBuf2 = Buffer.from(
        await buildTextSVG(text2, text2Pos, text2Color, Number(text2Size), text2Weight, text2Font, Number(text2Rotation))
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

// Fetch con retry 429 — acepta URL normal O base64 data:image/...
// Si es base64 lo decodifica directamente sin llamada de red (fix Pollinations IP)
async function fetchBuf(url) {
  // ── base64 enviado desde el cliente (browser ya fetcheó Pollinations) ──
  if (url && url.startsWith('data:')) {
    const comma = url.indexOf(',');
    if (comma !== -1) return Buffer.from(url.slice(comma + 1), 'base64');
    throw new Error('base64 malformado');
  }

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

// ─── Cache de fuentes Google (se cachean en memoria entre invocaciones warm) ──
const _fontCache = {};
const GOOGLE_FONTS = {
  montserrat: 'https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
  inter:      'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
  poppins:    'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2',
};

async function loadFontBase64(name) {
  if (_fontCache[name]) return _fontCache[name];
  try {
    const url = GOOGLE_FONTS[name];
    if (!url) return null;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    _fontCache[name] = buf.toString('base64');
    return _fontCache[name];
  } catch { return null; }
}

// Fuentes soportadas — el cliente puede pasar 'montserrat' | 'inter' | 'poppins' | 'sans-serif'
async function buildFontFaceCSS(fontName) {
  const key = fontName?.toLowerCase();
  if (!GOOGLE_FONTS[key]) return { css: '', family: 'DejaVu Sans, Liberation Sans, sans-serif' };
  const b64 = await loadFontBase64(key);
  if (!b64) return { css: '', family: 'DejaVu Sans, Liberation Sans, sans-serif' };
  const format = key === 'inter' ? 'woff2' : 'woff2';
  const css = `@font-face { font-family: '${fontName}'; src: url('data:font/woff2;base64,${b64}') format('${format}'); font-weight: 100 900; }`;
  return { css, family: `'${fontName}', DejaVu Sans, sans-serif` };
}

async function buildTextSVG(rawText, pos, color, fontSize, fontWeight, fontName = 'montserrat', rotation = 0) {
  const PAD          = 60;
  const maxWidth     = 1080 - PAD * 2;
  // Montserrat/Poppins son más anchas, Inter más estrecha
  const charW        = fontName === 'inter' ? 0.50 : 0.58;
  const charsPerLine = Math.max(1, Math.floor(maxWidth / (fontSize * charW)));

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

  const lineH  = fontSize * 1.3;
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

  const { css, family } = await buildFontFaceCSS(fontName);

  const mkTspans = (dx) => lines
    .map((ln, i) => `<tspan x="${x + dx}" ${i > 0 ? `dy="${lineH}"` : ''}>${esc(ln)}</tspan>`)
    .join('');

  const rotAttr = rotation !== 0 ? ` transform="rotate(${rotation}, ${x}, ${y})"` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
  <defs><style>${css}</style></defs>
  <!-- sombra -->
  <text x="${x + 2}" y="${y + 2}" text-anchor="${ax}"${rotAttr}
        font-family="${family}"
        font-size="${fontSize}" font-weight="${fontWeight}"
        fill="rgba(0,0,0,0.75)">${mkTspans(2)}</text>
  <!-- texto principal -->
  <text x="${x}" y="${y}" text-anchor="${ax}"${rotAttr}
        font-family="${family}"
        font-size="${fontSize}" font-weight="${fontWeight}"
        fill="${esc(color)}">${mkTspans(0)}</text>
</svg>`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
