const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const redirectPages = [
  { file: 'blog.html', title: 'Blog Redirect — Gir Govalan', description: 'Redirecting to Gir Govalan blog posts.', canonical: 'https://girgovalan.com/blogs/news/', target: '/blogs/news/' },
  { file: 'products.html', title: 'Products Redirect — Gir Govalan', description: 'Redirecting to Gir Govalan products collection.', canonical: 'https://girgovalan.com/collections/all/', target: '/collections/all/' },
  { file: 'contact.html', title: 'Contact Redirect — Gir Govalan', description: 'Redirecting to the Gir Govalan contact page.', canonical: 'https://girgovalan.com/pages/contact/', target: '/pages/contact/' },
  { file: 'gallery.html', title: 'Gallery Redirect — Gir Govalan', description: 'Redirecting to the Gir Govalan gallery page.', canonical: 'https://girgovalan.com/pages/gallery/', target: '/pages/gallery/' },
  { file: 'who-is-gir-govalan.html', title: 'Who Is Gir Govalan Redirect', description: 'Redirecting to the Gir Govalan story page.', canonical: 'https://girgovalan.com/pages/who-is-gir-govalan/', target: '/pages/who-is-gir-govalan/' }
];

function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function setOrAddTag(html, regex, replacement, anchorRegex) {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace(anchorRegex, `$&\n  ${replacement}`);
}

function updateRedirectPage(cfg) {
  const full = path.join(root, cfg.file);
  if (!fs.existsSync(full)) return;
  let html = fs.readFileSync(full, 'utf8');
  html = setOrAddTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${cfg.title}</title>`, /<meta charset="UTF-8">/i);
  html = setOrAddTag(html, /<meta name="viewport"[^>]*>/i, '<meta name="viewport" content="width=device-width, initial-scale=1.0">', /<script src="\/js\/gtag\.js"><\/script>/i);
  html = setOrAddTag(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${cfg.description}">`, /<title>[\s\S]*?<\/title>/i);
  html = setOrAddTag(html, /<meta name="robots"[^>]*>/i, '<meta name="robots" content="noindex, follow">', /<meta name="description"[^>]*>/i);
  html = setOrAddTag(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${cfg.canonical}">`, /<meta name="robots"[^>]*>/i);
  html = html.replace(/location\.replace\((['"]).*?\1\);/i, `location.replace('${cfg.target}');`);
  fs.writeFileSync(full, html);
}

function updateTemplateFile(file, defaults) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  let html = fs.readFileSync(full, 'utf8');
  html = setOrAddTag(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${defaults.description}">`, /<title>[\s\S]*?<\/title>/i);
  html = setOrAddTag(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${defaults.canonical}">`, /<meta name="description"[^>]*>/i);
  fs.writeFileSync(full, html);
}

function walkBlogs(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkBlogs(p));
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

function updateBlogPages() {
  const dir = path.join(root, 'blogs', 'news');
  if (!fs.existsSync(dir)) return;
  const files = walkBlogs(dir);
  for (const file of files) {
    let html = fs.readFileSync(file, 'utf8');
    const rel = file.replace(root, '').replace(/\\/g, '/');
    const slug = rel.split('/').slice(-2, -1)[0];
    if (!slug || slug === 'news') continue;
    const pretty = titleFromSlug(slug);
    const title = `${pretty} | Gir Govalan Blog`;
    const desc = `Read ${pretty.toLowerCase()} insights from Gir Govalan on A2 Gir cow ghee, traditional bilona methods, and healthy daily use.`;
    html = setOrAddTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`, /<meta name="viewport"[^>]*>/i);
    html = setOrAddTag(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${desc}">`, /<title>[\s\S]*?<\/title>/i);
    fs.writeFileSync(file, html);
  }
}

function updateProductPages() {
  const dir = path.join(root, 'products');
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const index = path.join(dir, entry.name, 'index.html');
    if (!fs.existsSync(index)) continue;
    let html = fs.readFileSync(index, 'utf8');
    const pretty = titleFromSlug(entry.name);
    html = setOrAddTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${pretty} — Buy Online | Gir Govalan</title>`, /<meta name="viewport"[^>]*>/i);
    html = setOrAddTag(
      html,
      /<meta name="description"[^>]*>/i,
      `<meta name="description" content="Buy ${pretty.toLowerCase()} from Gir Govalan. Pure farm products from Gujarat with trusted quality and authentic taste.">`,
      /<title>[\s\S]*?<\/title>/i
    );
    fs.writeFileSync(index, html);
  }
}

for (const cfg of redirectPages) updateRedirectPage(cfg);

updateTemplateFile('blog-post.html', {
  description: 'Read Gir Govalan blog stories on A2 Gir cow ghee, bilona methods, and authentic Gujarati food wisdom.',
  canonical: 'https://girgovalan.com/blogs/news/'
});
updateTemplateFile('product.html', {
  description: 'Shop authentic Gir Govalan products including A2 Gir cow ghee, dairy, and traditional sweets from Gujarat.',
  canonical: 'https://girgovalan.com/collections/all/'
});
updateTemplateFile(path.join('products', '_product.html'), {
  description: 'Explore pure Gir Govalan products crafted with quality, tradition, and farm-fresh ingredients.',
  canonical: 'https://girgovalan.com/collections/all/'
});

updateBlogPages();
updateProductPages();

console.log('Static SEO fixes applied.');
