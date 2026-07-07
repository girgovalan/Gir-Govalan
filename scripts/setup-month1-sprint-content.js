const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_JS = path.join(ROOT, 'js', 'blog-month1-sprint.js');
const TEMPLATE = path.join(ROOT, 'blogs', 'news', 'a2-milk-vs-a1-milk-gir-cow', 'index.html');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const TAG = '  <script src="/js/blog-month1-sprint.js"></script>';

const slugs = [];
const src = fs.readFileSync(BLOG_JS, 'utf8');
for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) slugs.push(m[1]);

function addScriptTag(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('/js/blog-month1-sprint.js') && html.includes('/js/blog-scheduled-recommended.js')) {
    html = html.replace('  <script src="/js/blog-scheduled-recommended.js"></script>', `  <script src="/js/blog-scheduled-recommended.js"></script>\n${TAG}`);
    fs.writeFileSync(file, html);
  }
}

addScriptTag(path.join(ROOT, 'index.html'));
addScriptTag(path.join(ROOT, 'blogs', 'news', 'index.html'));

const templateHtml = fs.readFileSync(TEMPLATE, 'utf8');
const withTag = templateHtml.includes('/js/blog-month1-sprint.js')
  ? templateHtml
  : templateHtml.replace('  <script src="/js/blog-scheduled-recommended.js"></script>', `  <script src="/js/blog-scheduled-recommended.js"></script>\n${TAG}`);

function titleFromSlug(slug) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim();
}

for (const slug of slugs) {
  const dir = path.join(ROOT, 'blogs', 'news', slug);
  fs.mkdirSync(dir, { recursive: true });
  const title = `${titleFromSlug(slug)} | Gir Govalan Blog`;
  const description = `Read ${titleFromSlug(slug).toLowerCase()} insights from Gir Govalan about A2 Gir cow ghee, bilona tradition, and practical buying tips.`;
  const page = withTag
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${description}">`);
  fs.writeFileSync(path.join(dir, 'index.html'), page);
}

let sitemap = fs.readFileSync(SITEMAP, 'utf8');
for (const slug of slugs) {
  const loc = `https://girgovalan.com/blogs/news/${slug}/`;
  if (sitemap.includes(loc)) continue;
  const block = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  sitemap = sitemap.replace('</urlset>', `${block}</urlset>`);
}
fs.writeFileSync(SITEMAP, sitemap);

console.log(`Month1 setup complete. Pages: ${slugs.length}`);
