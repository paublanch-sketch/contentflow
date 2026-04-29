// api/groq-generate.js — Vercel Serverless Function
// Orden de contexto para generar el copy:
//   1. sociales.txt del cliente (voz, estilo, histórico)
//   2. Posts ya creados en la página (para no repetir temas)
//   3. Contexto del post actual (plataforma, idea de imagen)

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const SUPABASE_URL = process.env.SUPABASE_URL  || 'https://afbussamfzqfvozrycsr.supabase.co';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY no configurada en las variables de entorno de Vercel.' });
  }

  const {
    client_id,
    platform,
    headline_visual,
    clientName,
    currentCopy,
    existingPosts = [],   // array de strings: "Post #1: texto..."
    language,
  } = req.body || {};

  // ── 1. Leer sociales.txt del cliente (voz + histórico real) ─────────────────
  let socialesContext = '';
  if (client_id) {
    try {
      const url = `${SUPABASE_URL}/storage/v1/object/public/sociales/${client_id}.txt`;
      const socRes = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (socRes.ok) {
        const text = await socRes.text();
        if (text && text.length > 10) {
          socialesContext = text.slice(0, 3000); // máx 3000 chars para no gastar tokens
        }
      }
    } catch (_) {
      // Sin contexto de sociales → seguimos igualmente
    }
  }

  // ── 2. Preparar resumen de posts ya creados (para no repetir) ───────────────
  const existingPostsSummary = Array.isArray(existingPosts) && existingPosts.length > 0
    ? existingPosts.slice(0, 11).join('\n').slice(0, 2500)
    : '';

  // ── 3. Construir el prompt completo ─────────────────────────────────────────
  const platformLabel = platform === 'LI'
    ? 'LinkedIn (tono profesional, B2B, insights de valor)'
    : 'Instagram (tono cercano, visual, emojis estratégicos)';

  const langNote = language === 'ca'
    ? 'Escribe SIEMPRE en catalán.'
    : language === 'en'
    ? 'Write ALWAYS in English.'
    : 'Escribe SIEMPRE en español.';

  const systemPrompt = `Eres un experto copywriter de redes sociales especializado en marketing digital para PYMEs españolas.
Tu misión: crear el copy perfecto para un post en ${platformLabel}.
${langNote}

REGLAS DE FORMATO:
- Para Instagram: emojis estratégicos, llamada a la acción clara. Máximo 300 caracteres idealmente, nunca más de 2200.
- Para LinkedIn: tono profesional y ejecutivo, puede ser más largo (200-500 palabras), con insight de valor real.
- NUNCA incluyas hashtags en el copy (se añaden aparte en otro campo).
- NUNCA añadas explicaciones ni comentarios extra. Devuelve SOLO el texto del post.
${socialesContext ? `
═══ VOZ Y ESTILO DEL CLIENTE (leer primero) ═══
A continuación tienes el histórico real de publicaciones y notas de estilo del cliente.
Imita exactamente esta voz. Usa sus expresiones habituales, su tono y sus temas recurrentes.
─────────────────────────────────────
${socialesContext}
─────────────────────────────────────` : ''}
${existingPostsSummary ? `
═══ POSTS YA CREADOS PARA ESTE CLIENTE (no repetir estos temas) ═══
Los siguientes posts ya han sido generados. El nuevo post DEBE ser diferente en tema y enfoque:
─────────────────────────────────────
${existingPostsSummary}
─────────────────────────────────────
Asegúrate de que el nuevo post aporte un ángulo, tema o formato completamente distinto a los anteriores.` : ''}`;

  const userPrompt = `Cliente: ${clientName || 'empresa cliente'}
Red social: ${platformLabel}
Idea de imagen / contexto visual del post: ${headline_visual || 'imagen profesional del negocio'}
${currentCopy ? `Texto actual (mejóralo o reescríbelo completamente si conviene):\n${currentCopy}` : 'Genera un copy original y diferente a los ya existentes.'}

Responde SOLO con el texto del post. Sin hashtags. Sin explicaciones.`;

  // ── 4. Llamar a Groq ─────────────────────────────────────────────────────────
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userPrompt   },
        ],
        max_tokens: 800,
        temperature: 0.78,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('[groq-generate] API error:', errText);
      return res.status(502).json({ error: `Groq API error: ${errText.slice(0, 200)}` });
    }

    const data      = await groqRes.json();
    const generated = data.choices?.[0]?.message?.content?.trim() || '';

    return res.status(200).json({
      copy:        generated,
      had_context: !!socialesContext,
      had_posts:   existingPosts.length > 0,
    });
  } catch (e) {
    console.error('[groq-generate] Error:', e);
    return res.status(500).json({ error: String(e) });
  }
};
