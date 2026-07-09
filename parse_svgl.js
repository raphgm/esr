const https = require('https');
https.get('https://svgl.app/api/svgs', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const svgs = JSON.parse(data);
    const matches = svgs.filter(s => /Microsoft|Salesforce|Airbnb|Shopify|Netflix/i.test(s.title));
    matches.forEach(m => console.log(m.title, typeof m.route === 'object' ? m.route.light : m.route));
  });
});
