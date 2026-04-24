// api/metricool-blogs.js — Vercel Serverless Function
// Lista los blogs/perfiles conectados a la cuenta Metricool

const MC_TOKEN = 'GCZMPVRNJMKUTWNOFCKRHZGJILQQFULCFHSGEAGWAEUTQGQXAIUYEHOAYNWFIXUX';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const mcRes = await fetch('https://app.metricool.com/api/v2.0/blogs', {
      headers: {
        'Accept': 'application/json',
        'X-Mc-Auth': MC_TOKEN,
      },
    });

    const text = await mcRes.text();
    res.status(mcRes.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
