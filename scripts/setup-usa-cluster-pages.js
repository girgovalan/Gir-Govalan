const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_ROOT = path.join(ROOT, 'blogs', 'news');
const TEMPLATE = path.join(BLOG_ROOT, 'a2-milk-vs-a1-milk-gir-cow', 'index.html');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const SCRIPT_TAG = '  <script src="/js/blog-usa-cluster.js"></script>';

const SLUGS = [
  'benefits-of-gir-cow-ghee',
  'bilona-ghee-vs-regular-ghee',
  'gir-cow-ghee-price',
  'how-to-identify-pure-ghee'
];

function ensureScriptTag(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('/js/blog-usa-cluster.js') && html.includes('/js/blog-month1-sprint.js')) {
    html = html.replace('  <script src="/js/blog-month1-sprint.js"></script>', `  <script src="/js/blog-month1-sprint.js"></script>\n${SCRIPT_TAG}`);
    fs.writeFileSync(filePath, html);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html') ensureScriptTag(full);
  }
}

ensureScriptTag(path.join(ROOT, 'index.html'));
ensureScriptTag(path.join(ROOT, 'blogs', 'news', 'index.html'));
walk(BLOG_ROOT);

const templateHtml = fs.readFileSync(TEMPLATE, 'utf8');
for (const slug of SLUGS) {
  const dir = path.join(BLOG_ROOT, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), templateHtml);
}

const blogAliasTemplate = (slug) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=/blogs/news/${slug}/">
  <meta name="description" content="Redirecting to the primary article page.">
  <link rel="canonical" href="https://girgovalan.com/blogs/news/${slug}/">
  <meta name="robots" content="noindex, follow">
  <title>Redirecting...</title>
</head>
<body><p><a href="/blogs/news/${slug}/">Open article</a></p></body>
</html>
`;

for (const slug of SLUGS) {
  const dir = path.join(ROOT, 'blog', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), blogAliasTemplate(slug));
}

let xml = fs.readFileSync(SITEMAP, 'utf8');
const urls = [
  'https://girgovalan.com/gir-cow-ghee-usa/',
  ...SLUGS.map(s => `https://girgovalan.com/blogs/news/${s}/`)
];
for (const loc of urls) {
  if (xml.includes(loc)) continue;
  const block = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  xml = xml.replace('</urlset>', `${block}</urlset>`);
}
fs.writeFileSync(SITEMAP, xml);

console.log('USA cluster pages and aliases prepared.');
