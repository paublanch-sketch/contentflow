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
      const mcRes = await fetch(
        `https://app.metricool.com/api/v2/scheduler/posts?userId=${MC_USER_ID}&blogId=${blogId}&size=10`,
        { headers: { 'Accept': 'application/json', 'X-Mc-Auth': MC_TOKEN } }
      );
      return res.status(mcRes.status).setHeader('Content-Type', 'application/json').send(await mcRes.text());
    }

    if (mode === 'docs') {
      // Intentar obtener swagger/openapi docs de Metricool
      const urls = [
        'https://app.metricool.com/v2/api-docs',
        'https://app.metricool.com/api/v2/api-docs',
        'https://app.metricool.com/api-docs',
        'https://app.metricool.com/swagger/v2/api-docs',
      ];
      const results = [];
      for (const url of urls) {
        try {
          const r = await fetch(url, { headers: { 'Accept': 'application/json', 'X-Mc-Auth': MC_TOKEN } });
          const text = await r.text();
          results.push({ url, status: r.status, snippet: text.slice(0, 500) });
        } catch(e) { results.push({ url, error: String(e) }); }
      }
      return res.status(200).json(results);
    }

    if (mode === 'schema') {
      // Intentar obtener el schema del ScheduledPost enviando un body inválido
      // para que el error nos revele los campos disponibles
      const r = await fetch(
        `https://app.metricool.com/api/v2/scheduler/posts?userId=${MC_USER_ID}&blogId=${blogId}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Mc-Auth': MC_TOKEN },
          body: JSON.stringify({ _unknownField_xyz: true }) }
      );
      return res.status(200).json({ status: r.status, body: await r.text() });
    }

    // Modo test: crear post con imagen pública para ver qué formato acepta
    const now = new Date(Date.now() + 5 * 60000);
    const dateTime = now.toLocaleString('sv-SE', { timeZone: 'Europe/Madrid' }).replace(' ', 'T');

    const now2 = new Date(Date.now() + 10 * 60000);
    const dt2 = now2.toLocaleString('sv-SE', { timeZone: 'Europe/Madrid' }).replace(' ', 'T');
    const base = { text: 'TEST img field', publicationDate: { dateTime: dt2, timezone: 'Europe/Madrid' }, providers: [{ network: 'INSTAGRAM' }] };

    // Probar distintos nombres de campo dentro de instagramData
    const fieldTests = ['imageUrls', 'imageUrl', 'media', 'mediaUrls', 'urls', 'photoUrls', 'attachments'];
    const fieldResults = [];
    for (const field of fieldTests) {
      const r = await fetch(
        `https://app.metricool.com/api/v2/scheduler/posts?userId=${MC_USER_ID}&blogId=${blogId}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Mc-Auth': MC_TOKEN },
          body: JSON.stringify({ ...base, instagramData: { [field]: [{ url: imgUrl }] } }) }
      );
      const txt = await r.text();
      fieldResults.push({ field, status: r.status, ok: r.status === 201, full: txt });
    }
    return res.status(200).json({ fieldResults });

    const post = async (label, body) => {
      const r = await fetch(
        `https://app.metricool.com/api/v2/scheduler/posts?userId=${MC_USER_ID}&blogId=${blogId}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Mc-Auth': MC_TOKEN }, body: JSON.stringify(body) }
      );
      return { label, status: r.status, response: JSON.parse(await r.text()) };
    };

    // Probar 3 formatos distintos para media
    const results = await Promise.all([
      post('instagramData.images array', {
        text: 'TEST instagramData.images',
        publicationDate: { dateTime, timezone: 'Europe/Madrid' },
        providers: [{ network: 'INSTAGRAM' }],
        instagramData: { images: [{ url: imgUrl }] },
      }),
      post('instagramData.imageUrls', {
        text: 'TEST instagramData.imageUrls',
        publicationDate: { dateTime, timezone: 'Europe/Madrid' },
        providers: [{ network: 'INSTAGRAM' }],
        instagramData: { imageUrls: [imgUrl] },
      }),
      post('media string array', {
        text: 'TEST media string array',
        publicationDate: { dateTime, timezone: 'Europe/Madrid' },
        providers: [{ network: 'INSTAGRAM' }],
        media: [imgUrl],
      }),
    ]);

    res.status(200).json({ imgUrl, results });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
};
