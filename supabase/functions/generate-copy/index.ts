// supabase/functions/generate-copy/index.ts
// Genera copy de post leyendo el sociales.txt del cliente desde Supabase Storage
// y llamando a Claude API con el estilo del cliente

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANTHROPIC_API_KEY    = Deno.env.get('ANTHROPIC_API_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { client_id, platform, headline_visual, post_number } = await req.json();
    if (!client_id) throw new Error('client_id requerido');

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // 1. Leer sociales.txt del cliente desde Storage
    const { data: fileData, error: fileErr } = await sb.storage
      .from('sociales')
      .download(`${client_id}.txt`);

    let socialesContext = '';
    if (!fileErr && fileData) {
      socialesContext = await fileData.text();
    }

    // 2. Construir prompt
    const platformLabel = platform === 'LI' ? 'LinkedIn (tono B2B/corporativo)' : 'Instagram (tono visual/cercano)';
    const prompt = socialesContext
      ? `Eres un experto en redes sociales. Tu tarea es escribir el copy de un post para ${platformLabel}.

HISTORIAL Y ESTILO DEL CLIENTE:
${socialesContext}

---
Escribe el copy del POST #${post_number || '?'} sobre: "${headline_visual || 'tema general del cliente'}"

REGLAS:
- Imita exactamente el tono, estilo y longitud de los posts anteriores del cliente
- Usa emojis si el cliente los usa habitualmente
- NO incluyas hashtags (se añaden por separado)
- Máximo 300 palabras para Instagram, 400 para LinkedIn
- Solo devuelve el texto del post, sin explicaciones ni comentarios`
      : `Eres un experto en redes sociales. Escribe el copy de un post para ${platformLabel}.

El post es sobre: "${headline_visual || 'tema general'}"
Es el post #${post_number || '?'} de una campaña de Kit Digital.

REGLAS:
- Tono profesional pero cercano
- NO incluyas hashtags
- Máximo 300 palabras
- Solo devuelve el texto del post`;

    // 3. Llamar a Claude API
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    const claudeData = await claudeRes.json();
    if (claudeData.error) throw new Error(`Claude error: ${claudeData.error.message}`);

    const copy = claudeData.content?.[0]?.text?.trim() || '';

    return new Response(
      JSON.stringify({ success: true, copy }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
