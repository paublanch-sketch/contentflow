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
    const { type, client_name, portal_url, feedback } = await req.json();

    // Sin emojis ni caracteres especiales para evitar quoted-printable
    const typeClean = type.includes('Aprobado') ? 'Aprobado' : 'Cambios solicitados';
    const subject   = `FlowAPP - ${typeClean} - ${client_name}`;

    const lines = [
      `${typeClean} - ${client_name}`,
      feedback ? `Feedback: ${feedback}` : '',
      `Ver post: ${portal_url}`,
    ].filter(Boolean).join('\n');

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
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
