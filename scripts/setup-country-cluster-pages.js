const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_ROOT = path.join(ROOT, 'blogs', 'news');
const TEMPLATE = path.join(BLOG_ROOT, 'a2-milk-vs-a1-milk-gir-cow', 'index.html');
const SITEMAP = path.join(ROOT, 'sitemap.xml');

const COUNTRY_SLUGS = [
  'best-a2-ghee-brands-in-uae-what-to-check',
  'why-indian-families-in-uae-prefer-gir-cow-ghee',
  'how-to-import-indian-ghee-to-uae',
  'best-a2-ghee-brands-in-canada-what-to-check',
  'why-indian-families-in-canada-prefer-gir-cow-ghee',
  'how-to-import-indian-ghee-to-canada',
  'best-a2-ghee-brands-in-uk-what-to-check',
  'why-indian-families-in-uk-prefer-gir-cow-ghee',
  'how-to-import-indian-ghee-to-uk'
];

function ensureTag(html, tag, afterTag) {
  if (html.includes(tag)) return html;
  if (html.includes(afterTag)) return html.replace(afterTag, `${afterTag}\n${tag}`);
  return html;
}

function patchFile(file) {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  html = ensureTag(html, '  <script src="/js/blog-country-clusters.js"></script>', '  <script src="/js/blog-month1-sprint.js"></script>');
  fs.writeFileSync(file, html);
}

patchFile(path.join(ROOT, 'index.html'));
patchFile(path.join(ROOT, 'blogs', 'news', 'index.html'));

for (const slug of COUNTRY_SLUGS) {
  const dir = path.join(BLOG_ROOT, slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = fs.readFileSync(TEMPLATE, 'utf8');
  const patched = ensureTag(html, '  <script src="/js/blog-country-clusters.js"></script>', '  <script src="/js/blog-month1-sprint.js"></script>');
  fs.writeFileSync(path.join(dir, 'index.html'), patched);
}

let xml = fs.readFileSync(SITEMAP, 'utf8');
for (const slug of COUNTRY_SLUGS) {
  const loc = `https://girgovalan.com/blogs/news/${slug}/`;
  if (xml.includes(loc)) continue;
  const block = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  xml = xml.replace('</urlset>', `${block}</urlset>`);
}
fs.writeFileSync(SITEMAP, xml);

console.log('Country cluster pages ready:', COUNTRY_SLUGS.length);
