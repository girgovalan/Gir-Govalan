/* Create article pages and wire recommended blog script */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'blogs/news/a2-milk-vs-a1-milk-gir-cow/index.html'), 'utf8');

const SLUGS = [
  '15-easy-indian-breakfast-recipes-gir-cow-ghee',
  'why-bilona-ghee-costs-more-than-regular-ghee',
  'how-we-make-gir-cow-bilona-ghee',
  'gujarati-family-recipes-with-pure-ghee',
  '10-myths-about-desi-ghee',
  'what-makes-gir-forest-ideal-for-gir-cows'
];

const SCRIPT_TAG = '  <script src="/js/blog-scheduled-recommended.js"></script>';

for (const slug of SLUGS) {
  const dir = path.join(ROOT, 'blogs/news', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), TEMPLATE);
}

function patchHtml(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('blog-scheduled-recommended.js') && html.includes('blog-scheduled-extended.js')) {
    html = html.replace(
      '  <script src="/js/blog-scheduled-extended.js"></script>',
      `  <script src="/js/blog-scheduled-extended.js"></script>\n${SCRIPT_TAG}`
    );
    fs.writeFileSync(file, html);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html') patchHtml(full);
  }
}

patchHtml(path.join(ROOT, 'index.html'));
walk(path.join(ROOT, 'blogs/news'));

const sitemapPath = path.join(ROOT, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const entries = SLUGS.map(slug => `  <url>
    <loc>https://girgovalan.com/blogs/news/${slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

if (!sitemap.includes(SLUGS[0])) {
  sitemap = sitemap.replace(
    '  <url>\n    <loc>https://girgovalan.com/products/pure-organic-a2-gir-cow-ghee/</loc>',
    entries + '\n  <url>\n    <loc>https://girgovalan.com/products/pure-organic-a2-gir-cow-ghee/</loc>'
  );
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log(`Created ${SLUGS.length} article pages and updated sitemap.`);
