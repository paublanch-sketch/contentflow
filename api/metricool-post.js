// api/metricool-post.js — Vercel Serverless Function

const MC_TOKEN   = 'GCZMPVRNJMKUTWNOFCKRHZGJILQQFULCFHSGEAGWAEUTQGQXAIUYEHOAYNWFIXUX';
const MC_USER_ID = 1440018;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const body = { userId: MC_USER_ID, ...req.body };

    const mcRes = await fetch('https://app.metricool.com/api/v2.0/posts', {
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
}
