const MC_TOKEN   = 'GCZMPVRNJMKUTWNOFCKRHZGJILQQFULCFHSGEAGWAEUTQGQXAIUYEHOAYNWFIXUX';
const MC_USER_ID = 1440018;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const incoming = req.body;
    // userId va como query param, NO en el body
    const rawDate = incoming.publicationDate;
    const dt = rawDate ? new Date(rawDate) : new Date(Date.now() + 60000);
    const dateTime = dt.toISOString().slice(0, 19);
    const { userId: _u, blogId, ...rest } = incoming;
    const body = {
      ...rest,
      publicationDate: { dateTime, timezone: 'Europe/Madrid' },
    };
    console.log('[metricool-post] body enviado:', JSON.stringify(body));
    const mcRes = await fetch(`https://app.metricool.com/api/v2/scheduler/posts?userId=${MC_USER_ID}&blogId=${blogId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Mc-Auth': MC_TOKEN,
      },
      body: JSON.stringify(body),
    });
    const text = await mcRes.text();
    res.status(mcRes.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
};
