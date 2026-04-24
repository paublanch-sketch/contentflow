const MC_TOKEN   = 'GCZMPVRNJMKUTWNOFCKRHZGJILQQFULCFHSGEAGWAEUTQGQXAIUYEHOAYNWFIXUX';
const MC_USER_ID = 1440018;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const blogId  = req.query.blogId  || '6159097';
  const imgUrl  = req.query.imgUrl  || 'https://picsum.photos/1080/1080.jpg';
  const mode    = req.query.mode    || 'test'; // 'test' = POST de prueba, 'get' = listar

  try {
    if (mode === 'get') {
      // Listar posts (todos los estados)
      const mcRes = await fetch(
        `https://app.metricool.com/api/v2/scheduler/posts?userId=${MC_USER_ID}&blogId=${blogId}&size=10`,
        { headers: { 'Accept': 'application/json', 'X-Mc-Auth': MC_TOKEN } }
      );
      return res.status(mcRes.status).setHeader('Content-Type', 'application/json').send(await mcRes.text());
    }

    // Modo test: crear post con imagen pública para ver qué formato acepta
    const now = new Date(Date.now() + 5 * 60000);
    const dateTime = now.toLocaleString('sv-SE', { timeZone: 'Europe/Madrid' }).replace(' ', 'T');

    // Probar formato 1: objeto con url
    const body1 = {
      text: 'TEST imagen - formato objeto {url}',
      publicationDate: { dateTime, timezone: 'Europe/Madrid' },
      providers: [{ network: 'INSTAGRAM' }],
      media: [{ url: imgUrl }],
    };

    const r1 = await fetch(
      `https://app.metricool.com/api/v2/scheduler/posts?userId=${MC_USER_ID}&blogId=${blogId}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Mc-Auth': MC_TOKEN }, body: JSON.stringify(body1) }
    );
    const t1 = await r1.text();

    res.status(200).json({
      sentBody: body1,
      response: { status: r1.status, body: JSON.parse(t1) },
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
};
