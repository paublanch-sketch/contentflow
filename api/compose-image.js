// api/compose-image.js — Vercel Serverless Function
// Usada NOMÉS per al panel "Fondo IA + Texto" (handleCompose).
// El panel "Añadir texto/imagen al post" (handleTextLogo) funciona
// 100% al browser (sense servidor).
// Requiere: npm install sharp

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    bgUrl,
    text        = '',
    textPos     = 'bc',
    textColor   = '#ffffff',
    fontSize    = 72,
    fontWeight  = 'bold',
    img2Url     = '',
    img2Pos     = 'br',
    img2Size    = 300,
    overlayOpacity = 0.35,
    overlayColor   = '#000000',
  } = req.body || {};

  if (!bgUrl) return res.status(400).json({ error: 'bgUrl es obligatorio' });

  try {
    const sharp = require('sharp');

    // ── 1. Fondo ─────────────────────────────────────────────────────────────
    const bgBuf = await fetchBuf(bgUrl);
    const base  = sharp(bgBuf).resize(1080, 1080, { fit: 'cover', position: 'centre' });
    const composites = [];

    // ── 2. Overlay de color ───────────────────────────────────────────────────
    if (overlayOpacity > 0) {
      const alpha = Math.min(Math.round(overlayOpacity * 255), 255);
      const hex   = (overlayColor || '#000000').replace('#', '');
      const r     = parseInt(hex.slice(0, 2), 16) || 0;
      const g     = parseInt(hex.slice(2, 4), 16) || 0;
      const b     = parseInt(hex.slice(4, 6), 16) || 0;
      const ovBuf = await sharp({
        create: { width: 1080, height: 1080, channels: 4, background: { r, g, b, alpha } },
      }).png().toBuffer();
      composites.push({ input: ovBuf, top: 0, left: 0 });
    }

    // ── 3. Texto via SVG (fonts del sistema, sense woff2) ────────────────────
    if (text && text.trim()) {
      const svgBuf = buildTextSVG(text, textPos, textColor, Number(fontSize), fontWeight);
      composites.push({ input: svgBuf, top: 0, left: 0 });
    }

    // ── 4. Imagen extra ───────────────────────────────────────────────────────
    if (img2Url) {
      try {
        const i2Buf    = await fetchBuf(img2Url);
        const i2Rsz    = await sharp(i2Buf)
          .resize(Number(img2Size), Number(img2Size), { fit: 'inside' }).png().toBuffer();
        const { width: i2W, height: i2H } = await sharp(i2Rsz).metadata();
        const { top, left } = calcTL(img2Pos, 1080, 1080, i2W, i2H, 40);
        composites.push({ input: i2Rsz, top, left });
      } catch { /* ignorar */ }
    }

    // ── 5. Componer ───────────────────────────────────────────────────────────
    const resultBuf = await base.composite(composites).png({ compressionLevel: 8 }).toBuffer();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(resultBuf);

  } catch (e) {
    console.error('[compose-image]', e);
    return res.status(500).json({ error: String(e) });
  }
};

// ─── SVG text (fallback system fonts — Liberation/DejaVu disponibles a Lambda) ─
function buildTextSVG(rawText, pos, color, fontSize, fontWeight) {
  const W = 1080, H = 1080, PAD = 60, TIGHT = 15;
  // Liberation Sans i DejaVu Sans solen estar disponibles a Amazon Linux
  const family = 'Liberation Sans, DejaVu Sans, Arial, Helvetica, sans-serif';

  const charW  = 0.55;
  const maxCh  = Math.max(1, Math.floor((W - PAD * 2) / (fontSize * charW)));
  const words  = String(rawText).split(' ');
  const lines  = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length <= maxCh) { cur = test; } else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);

  const lineH  = fontSize * 1.3;
  const totalH = lines.length * lineH;
  const half   = (a, b) => (a - b) / 2;

  const pm = {
    t2l:{ ax:'start',  x:TIGHT,   y:TIGHT+fontSize         },
    t2c:{ ax:'middle', x:W/2,     y:TIGHT+fontSize         },
    t2r:{ ax:'end',    x:W-TIGHT, y:TIGHT+fontSize         },
    tl: { ax:'start',  x:PAD,     y:PAD+fontSize           },
    tc: { ax:'middle', x:W/2,     y:PAD+fontSize           },
    tr: { ax:'end',    x:W-PAD,   y:PAD+fontSize           },
    ml: { ax:'start',  x:PAD,     y:half(H,totalH)+fontSize },
    mc: { ax:'middle', x:W/2,     y:half(H,totalH)+fontSize },
    mr: { ax:'end',    x:W-PAD,   y:half(H,totalH)+fontSize },
    bl: { ax:'start',  x:PAD,     y:H-PAD-totalH+fontSize  },
    bc: { ax:'middle', x:W/2,     y:H-PAD-totalH+fontSize  },
    br: { ax:'end',    x:W-PAD,   y:H-PAD-totalH+fontSize  },
    b2l:{ ax:'start',  x:TIGHT,   y:H-TIGHT-totalH+fontSize},
    b2c:{ ax:'middle', x:W/2,     y:H-TIGHT-totalH+fontSize},
    b2r:{ ax:'end',    x:W-TIGHT, y:H-TIGHT-totalH+fontSize},
  };
  const { ax, x, y } = pm[pos] ?? pm['bc'];

  const mkSpans = (dx) => lines
    .map((ln, i) => `<tspan x="${x+dx}"${i>0?` dy="${lineH}"`:''}>${esc(ln)}</tspan>`)
    .join('');

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="${x+2}" y="${y+2}" text-anchor="${ax}"
        font-family="${family}" font-size="${fontSize}" font-weight="${fontWeight}"
        fill="rgba(0,0,0,0.75)">${mkSpans(2)}</text>
  <text x="${x}" y="${y}" text-anchor="${ax}"
        font-family="${family}" font-size="${fontSize}" font-weight="${fontWeight}"
        fill="${esc(color)}">${mkSpans(0)}</text>
</svg>`);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function fetchBuf(url) {
  if (url && url.startsWith('data:')) {
    const comma = url.indexOf(',');
    if (comma !== -1) return Buffer.from(url.slice(comma + 1), 'base64');
    throw new Error('base64 malformado');
  }
  const DELAYS = [3000, 6000, 10000];
  for (let attempt = 0; attempt <= 3; attempt++) {
    let r;
    try { r = await fetch(url, { signal: AbortSignal.timeout(8000) }); }
    catch (e) {
      if (attempt < 3) { await new Promise(x => setTimeout(x, DELAYS[attempt])); continue; }
      throw new Error('Timeout fetching image');
    }
    if (r.status === 429) {
      if (attempt < 3) { await new Promise(x => setTimeout(x, DELAYS[attempt])); continue; }
      throw new Error('429 - servei ocupat');
    }
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }
}

function calcTL(pos, cW, cH, eW = 0, eH = 0, pad = 40) {
  const half = (a, b) => Math.max(0, Math.floor((a - b) / 2));
  const M = {
    tl:[pad,pad], tc:[pad,half(cW,eW)], tr:[pad,cW-eW-pad],
    ml:[half(cH,eH),pad], mc:[half(cH,eH),half(cW,eW)], mr:[half(cH,eH),cW-eW-pad],
    bl:[cH-eH-pad,pad], bc:[cH-eH-pad,half(cW,eW)], br:[cH-eH-pad,cW-eW-pad],
  };
  const [top, left] = M[pos] ?? M['bc'];
  return { top: Math.max(0, top), left: Math.max(0, left) };
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
