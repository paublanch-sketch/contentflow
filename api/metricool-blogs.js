// api/metricool-blogs.js — Vercel Serverless Function

const MC_TOKEN = 'GCZMPVRNJMKUTWNOFCKRHZGJILQQFULCFHSGEAGWAEUTQGQXAIUYEHOAYNWFIXUX';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

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
};
