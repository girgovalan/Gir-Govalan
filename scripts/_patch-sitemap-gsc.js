const fs = require('fs');
const today = new Date().toISOString().slice(0, 10);
let sm = fs.readFileSync('sitemap.xml', 'utf8');

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const drop = [
  'https://www.girgovalan.com/blogs/news/how-to-identify-pure-ghee/',
  'https://www.girgovalan.com/blogs/news/gir-cow-ghee-price/'
];
for (const loc of drop) {
  const re = new RegExp(
    '<url>\\s*<loc>' + escapeRe(loc) + '</loc>[\\s\\S]*?</url>\\s*',
    'g'
  );
  const before = sm.length;
  sm = sm.replace(re, '');
  console.log('drop', loc, before !== sm.length ? 'ok' : 'not found');
}

const need = [
  'https://www.girgovalan.com/blogs/news/how-to-identify-pure-gir-cow-ghee/',
  'https://www.girgovalan.com/blogs/news/gir-cow-ghee-price-why-premium-ghee-costs-more/',
  'https://www.girgovalan.com/pages/return-policy/',
  'https://www.girgovalan.com/gir-cow-ghee-usa/',
  'https://www.girgovalan.com/a2-gir-cow-ghee-uae/',
  'https://www.girgovalan.com/a2-gir-cow-ghee-canada/',
  'https://www.girgovalan.com/a2-gir-cow-ghee-uk/'
];
for (const loc of need) {
  if (!sm.includes('<loc>' + loc + '</loc>')) {
    sm = sm.replace(
      '</urlset>',
      '  <url>\n    <loc>' +
        loc +
        '</loc>\n    <lastmod>' +
        today +
        '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>'
    );
    console.log('added', loc);
  } else {
    console.log('have', loc);
  }
}

fs.writeFileSync('sitemap.xml', sm);
console.log('urls', [...sm.matchAll(/<loc>/g)].length);
console.log(
  'exists premium html',
  fs.existsSync('blogs/news/gir-cow-ghee-price-why-premium-ghee-costs-more/index.html')
);
