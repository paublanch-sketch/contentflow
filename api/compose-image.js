// api/compose-image.js — Vercel Serverless Function
// Composita: fondo + overlay color + texto (canvas, fonts reals) + logo PNG + imagen extra
// Requiere: npm install sharp @napi-rs/canvas

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    bgUrl,                        // URL imagen de fondo O base64 data:image/...
    text        = '',             // Texto 1
    textPos     = 'bc',          // Posición: t2l/t2c/t2r/tl/tc/tr/ml/mc/mr/bl/bc/br/b2l/b2c/b2r
    textColor   = '#ffffff',
    fontSize    = 72,
    fontWeight  = 'bold',
    fontName    = 'montserrat',   // 'montserrat' | 'inter' | 'poppins'
    text2       = '',             // Texto 2 (opcional)
    text2Pos    = 'tc',
    text2Color  = '#ffffff',
    text2Size   = 48,
    text2Weight = 'bold',
    text2Font   = 'montserrat',
    logoUrl      = '',            // URL logo PNG (opcional)
    logoPos      = 'tl',
    logoSize     = 180,
    logoRotation = 0,
    img2Url      = '',
    img2Pos      = 'br',
    img2Size     = 300,
    textRotation  = 0,
    text2Rotation = 0,
    overlayOpacity = 0.35,        // 0–1
    overlayColor   = '#000000',   // hex color del overlay
  } = req.body || {};

  if (!bgUrl) return res.status(400).json({ error: 'bgUrl es obligatorio' });

  try {
    const sharp = require('sharp');

    // ── 1. Fondo ─────────────────────────────────────────────────────────────
    const bgBuf = await fetchBuf(bgUrl);
    const base  = sharp(bgBuf).resize(1080, 1080, { fit: 'cover', position: 'centre' });

    const composites = [];

    // ── 2. Capa de color (overlay) ───────────────────────────────────────────
    if (overlayOpacity > 0) {
      const alpha = Math.min(Math.round(overlayOpacity * 255), 255);
      const hex   = (overlayColor || '#000000').replace('#', '');
      const r     = parseInt(hex.slice(0, 2), 16) || 0;
      const g     = parseInt(hex.slice(2, 4), 16) || 0;
      const b     = parseInt(hex.slice(4, 6), 16) || 0;
      const overlayBuf = await sharp({
        create: { width: 1080, height: 1080, channels: 4,
                  background: { r, g, b, alpha } },
      }).png().toBuffer();
      composites.push({ input: overlayBuf, top: 0, left: 0 });
    }

    // ── 3. Texto 1 con @napi-rs/canvas (fonts reals, sin librsvg) ────────────
    if (text && text.trim()) {
      try {
        const textBuf = await buildTextLayer(
          text, textPos, textColor,
          Number(fontSize), fontWeight, fontName, Number(textRotation)
        );
        composites.push({ input: textBuf, top: 0, left: 0 });
      } catch (e) { console.warn('[compose-image] text1 error:', e.message); }
    }

    // ── 3b. Texto 2 ──────────────────────────────────────────────────────────
    if (text2 && text2.trim()) {
      try {
        const textBuf2 = await buildTextLayer(
          text2, text2Pos, text2Color,
          Number(text2Size), text2Weight, text2Font, Number(text2Rotation)
        );
        composites.push({ input: textBuf2, top: 0, left: 0 });
      } catch (e) { console.warn('[compose-image] text2 error:', e.message); }
    }

    // ── 4. Logo ──────────────────────────────────────────────────────────────
    if (logoUrl) {
      try {
        const lBuf     = await fetchBuf(logoUrl);
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
        const i2Buf     = await fetchBuf(img2Url);
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

async function fetchBuf(url) {
  if (url && url.startsWith('data:')) {
    const comma = url.indexOf(',');
    if (comma !== -1) return Buffer.from(url.slice(comma + 1), 'base64');
    throw new Error('base64 malformado');
  }

  const MAX_RETRIES = 3;
  const DELAYS      = [3000, 6000, 10000];

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let res;
    try {
      res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    } catch (e) {
      if (attempt < MAX_RETRIES) { await sleep(DELAYS[attempt]); continue; }
      throw new Error(`Timeout/red fetching image after ${MAX_RETRIES + 1} intentos`);
    }
    if (res.status === 429) {
      if (attempt < MAX_RETRIES) { await sleep(DELAYS[attempt]); continue; }
      throw new Error('Servicio de imágenes ocupado (429).');
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching image`);
    return Buffer.from(await res.arrayBuffer());
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ─── calcTL: posición top/left para logos e imágenes (9 posiciones) ──────────
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

// ─── Canvas text engine — usa @napi-rs/canvas (fonts reals, sin librsvg) ─────
// Les fonts es descarreguen un cop i es guarden en memòria (Lambda warm reuse).

const _fontRegistered = new Set();   // noms de família ja registrats
const _fontBufCache   = {};          // nom → Buffer TTF

const FONT_FAMILIES = {
  montserrat: 'Montserrat',
  inter:      'Inter',
  poppins:    'Poppins',
};

// Descarrega el TTF de Google Fonts usant un UA antic (força format TTF)
async function downloadTTF(family) {
  if (_fontBufCache[family]) return _fontBufCache[family];
  try {
    const cssUrl = `https://fonts.googleapis.com/css?family=${family}:400,700`;
    const cssRes = await fetch(cssUrl, {
      headers: { 'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)' },
      signal: AbortSignal.timeout(6000),
    });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    // Extreu la URL .ttf del @font-face
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
    if (!match) { console.warn('[canvas] No TTF URL found for', family, css.slice(0, 300)); return null; }
    const ttfRes = await fetch(match[1], { signal: AbortSignal.timeout(10000) });
    if (!ttfRes.ok) return null;
    const buf = Buffer.from(await ttfRes.arrayBuffer());
    _fontBufCache[family] = buf;
    return buf;
  } catch (e) {
    console.warn('[canvas] downloadTTF failed for', family, e.message);
    return null;
  }
}

async function ensureFont(fontKey) {
  const key    = (fontKey || 'montserrat').toLowerCase();
  const family = FONT_FAMILIES[key];
  if (!family) return 'sans-serif';
  if (_fontRegistered.has(family)) return family;
  try {
    const { GlobalFonts } = require('@napi-rs/canvas');
    const buf = await downloadTTF(family);
    if (buf) {
      GlobalFonts.register(buf, family);
      _fontRegistered.add(family);
      return family;
    }
  } catch (e) {
    console.warn('[canvas] ensureFont error:', e.message);
  }
  return 'sans-serif';
}

// 15 posicions: t2l/t2c/t2r · tl/tc/tr · ml/mc/mr · bl/bc/br · b2l/b2c/b2r
function textPosToXY(pos, W, H, fontSize, totalH) {
  const PAD   = 60;
  const TIGHT = 15;
  const half  = (total, elem) => (total - elem) / 2;
  const map = {
    t2l: { align: 'left',   x: TIGHT,      y: TIGHT + fontSize           },
    t2c: { align: 'center', x: W / 2,      y: TIGHT + fontSize           },
    t2r: { align: 'right',  x: W - TIGHT,  y: TIGHT + fontSize           },
    tl:  { align: 'left',   x: PAD,        y: PAD + fontSize             },
    tc:  { align: 'center', x: W / 2,      y: PAD + fontSize             },
    tr:  { align: 'right',  x: W - PAD,    y: PAD + fontSize             },
    ml:  { align: 'left',   x: PAD,        y: half(H, totalH) + fontSize },
    mc:  { align: 'center', x: W / 2,      y: half(H, totalH) + fontSize },
    mr:  { align: 'right',  x: W - PAD,    y: half(H, totalH) + fontSize },
    bl:  { align: 'left',   x: PAD,        y: H - PAD   - totalH + fontSize },
    bc:  { align: 'center', x: W / 2,      y: H - PAD   - totalH + fontSize },
    br:  { align: 'right',  x: W - PAD,    y: H - PAD   - totalH + fontSize },
    b2l: { align: 'left',   x: TIGHT,      y: H - TIGHT - totalH + fontSize },
    b2c: { align: 'center', x: W / 2,      y: H - TIGHT - totalH + fontSize },
    b2r: { align: 'right',  x: W - TIGHT,  y: H - TIGHT - totalH + fontSize },
  };
  return map[pos] ?? map['bc'];
}

async function buildTextLayer(rawText, pos, color, fontSize, fontWeight, fontName, rotation) {
  const { createCanvas } = require('@napi-rs/canvas');
  const family  = await ensureFont(fontName);
  const W = 1080, H = 1080;

  // Canvas temporal per mesurar text
  const tmp = createCanvas(W, H);
  const tmpCtx = tmp.getContext('2d');
  const weight = (fontWeight === 'bold') ? 'bold' : 'normal';
  tmpCtx.font = `${weight} ${fontSize}px "${family}", sans-serif`;

  // Word wrap usant measureText (precís!)
  const maxW = W - 120;
  const words = String(rawText).split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (tmpCtx.measureText(test).width <= maxW) { cur = test; }
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);

  const lineH  = fontSize * 1.3;
  const totalH = lines.length * lineH;

  // Canvas final transparent
  const canvas = createCanvas(W, H);
  const ctx    = canvas.getContext('2d');
  ctx.font     = `${weight} ${fontSize}px "${family}", sans-serif`;

  const { align, x, y } = textPosToXY(pos, W, H, fontSize, totalH);
  ctx.textAlign = align;

  // Rotació al voltant del punt d'ancoratge
  if (rotation !== 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-x, -y);
  }

  lines.forEach((ln, i) => {
    const ly = y + i * lineH;
    // Ombra
    ctx.fillStyle = 'rgba(0,0,0,0.70)';
    ctx.fillText(ln, x + 2, ly + 2);
    // Text principal
    ctx.fillStyle = color;
    ctx.fillText(ln, x, ly);
  });

  if (rotation !== 0) ctx.restore();

  return canvas.encode('png');
}
