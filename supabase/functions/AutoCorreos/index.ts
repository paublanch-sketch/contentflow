// supabase/functions/AutoCorreos/index.ts
// Envía emails via Resend API (3000/mes gratis, sin librerías SMTP)
// Secret en Supabase → Edge Functions → Secrets:
//   RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxx

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const NOTIFY_EMAIL   = 'pau.blanch@interactivos.net';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const {
      type,
      client_name,
      post_number,
      platform,
      copy_preview,
      portal_url,
      feedback,
    } = await req.json();

    const isApproval = type?.includes('Aprobado');
    const subject    = `FlowAPP · ${type} — ${client_name} Post #${post_number}`;

    const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:20px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">
    <div style="background:${isApproval ? '#16a34a' : '#d97706'};padding:20px 24px">
      <h1 style="color:#fff;margin:0;font-size:20px">${type}</h1>
      <p style="color:rgba(255,255,255,.85);margin:4px 0 0;font-size:14px">FlowAPP · Notificación automática</p>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr>
          <td style="padding:8px 0;color:#6b7280;width:130px">Cliente</td>
          <td style="padding:8px 0;font-weight:600;color:#111827">${client_name}</td>
        </tr>
        <tr style="background:#f9fafb">
          <td style="padding:8px 6px;color:#6b7280">Post</td>
          <td style="padding:8px 6px;font-weight:600;color:#111827">#${post_number} · ${platform}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;vertical-align:top">Copy</td>
          <td style="padding:8px 0;color:#374151;font-style:italic">"${copy_preview}"</td>
        </tr>
        ${feedback ? `<tr style="background:#fef3c7">
          <td style="padding:8px 6px;color:#92400e;vertical-align:top">Feedback</td>
          <td style="padding:8px 6px;color:#78350f">${feedback}</td>
        </tr>` : ''}
      </table>
      <div style="margin-top:24px;text-align:center">
        <a href="${portal_url}" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:600;font-size:15px">Ver en FlowAPP →</a>
      </div>
    </div>
    <div style="background:#f9fafb;padding:12px 24px;border-top:1px solid #e5e7eb;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">FlowAPP · Gestión de contenidos Kit Digital</p>
    </div>
  </div>
</body>
</html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'FlowAPP <onboarding@resend.dev>',
        to:      [NOTIFY_EMAIL],
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Resend error: ${JSON.stringify(data)}`);

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('AutoCorreos error:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
