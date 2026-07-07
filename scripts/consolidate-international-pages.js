const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mainSlug = 'a2-gir-cow-ghee-usa';
const secondary = [
  'bilona-ghee-usa',
  'gir-cow-ghee-usa',
  'indian-organic-ghee-usa',
  'a2-ghee-uae',
  'indian-ghee-dubai',
  'bilona-ghee-uae'
];

for (const slug of secondary) {
  const p = path.join(root, slug, 'index.html');
  if (!fs.existsSync(p)) continue;
  let html = fs.readFileSync(p, 'utf8');
  html = html.replace(/<meta name="robots"[^>]*>/i, '');
  html = html.replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="https://girgovalan.com/a2-gir-cow-ghee-usa/">');
  if (!/<meta name="robots"/i.test(html)) {
    html = html.replace(/<meta name="description"[^>]*>/i, `$&\n  <meta name="robots" content="noindex, follow">`);
  }
  html = html.replace(
    /<div class="container article-content">[\s\S]*?<\/div>\s*<\/section>/i,
    `<div class="container article-content">
      <h2>International Ghee Page Merged</h2>
      <p>This page is consolidated into our primary international page for stronger SEO authority and backlinks.</p>
      <p><a class="btn btn-cta" href="/a2-gir-cow-ghee-usa/">Go to the main international Gir cow ghee page</a></p>
    </div>
  </section>`
  );
  fs.writeFileSync(p, html);
}

const sitemapPath = path.join(root, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let xml = fs.readFileSync(sitemapPath, 'utf8');
  for (const slug of secondary) {
    const re = new RegExp(`\\s*<url>\\s*<loc>https://girgovalan.com/${slug}/<\\/loc>[\\s\\S]*?<\\/url>\\s*`, 'g');
    xml = xml.replace(re, '\n');
  }
  fs.writeFileSync(sitemapPath, xml);
}

console.log('International pages consolidated to /a2-gir-cow-ghee-usa/.');
