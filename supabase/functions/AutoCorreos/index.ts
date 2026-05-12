import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const GMAIL_USER         = Deno.env.get('GMAIL_USER')!;
const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { type, client_name, post_number, platform, portal_url, feedback } = await req.json();

    const subject = `FlowAPP · ${type} — ${client_name}`;

    const lines = [
      `${type}`,
      ``,
      `Cliente: ${client_name}`,
      `Post: #${post_number} · ${platform}`,
      feedback ? `Feedback: ${feedback}` : null,
      ``,
      `Ver post: ${portal_url}`,
    ].filter(l => l !== null).join('\n');

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: { username: GMAIL_USER, password: GMAIL_APP_PASSWORD },
      },
    });

    await client.send({
      from:    GMAIL_USER,
      to:      GMAIL_USER,
      subject,
      content: lines,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('AutoCorreos error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
