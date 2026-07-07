const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'blogs', 'news', 'a2-milk-vs-a1-milk-gir-cow', 'index.html');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');

const BUYER_SLUGS = [
  'best-gir-cow-ghee-in-india-what-to-look-for',
  'where-to-buy-authentic-a2-gir-cow-ghee-online',
  'gir-cow-ghee-price-why-premium-ghee-costs-more',
  'best-ghee-for-daily-cooking-family-guide',
  'organic-vs-traditional-bilona-ghee-differences',
  'is-bilona-ghee-worth-the-price-honest-guide',
  'how-much-ghee-should-family-buy-monthly'
];

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

for (const slug of BUYER_SLUGS) {
  const dir = path.join(ROOT, 'blogs', 'news', slug);
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, 'index.html');
  const fallbackTitle = `${titleFromSlug(slug)} | Gir Govalan Blog`;
  const fallbackDesc = `Read ${titleFromSlug(slug).toLowerCase()} insights from Gir Govalan on A2 Gir cow ghee, bilona methods, and everyday buying tips.`;
  const pageHtml = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${fallbackTitle}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${fallbackDesc}">`);
  fs.writeFileSync(target, pageHtml);
}

let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
for (const slug of BUYER_SLUGS) {
  const loc = `https://girgovalan.com/blogs/news/${slug}/`;
  if (sitemap.includes(loc)) continue;
  const urlEntry = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  sitemap = sitemap.replace('</urlset>', `${urlEntry}</urlset>`);
}
fs.writeFileSync(SITEMAP_PATH, sitemap);

console.log(`Buyer-intent blog pages ensured: ${BUYER_SLUGS.length}`);
