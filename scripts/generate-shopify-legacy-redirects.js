/**
 * Builds Shopify→static migration redirects for:
 * - locale prefixes (/en-us, /en-ae, /ar, /ar-ae)
 * - deleted Shopify market/country pages
 * - draft "copy-of-" products
 * - old blog and collection URLs
 */
const fs = require('fs');
const path = require('path');

const map = [
  ['/pages/buy-authentic-gir-cow-ghee-in-the-usa-free-shipping', '/gir-cow-ghee-usa/'],
  ['/pages/copy-of-copy-of-buy-authentic-gir-cow-ghee-in-the-canada', '/a2-gir-cow-ghee-canada/'],
  ['/pages/copy-of-copy-of-copy-of-buy-authentic-gir-cow-ghee-in-the-austalia', '/gir-cow-ghee-usa/'],
  ['/pages/buy-authentic-gir-cow-ghee-in-the-new-zealand', '/gir-cow-ghee-usa/'],
  ['/pages/gir-cow-ghee-in-the-dubai', '/a2-gir-cow-ghee-uae/'],
  ['/pages/what-is-gir-cow-gir-govalan', '/pages/who-is-gir-govalan/'],
  ['/pages/who-is-gir-govalan', '/pages/who-is-gir-govalan/'],
  ['/pages/contact', '/pages/contact/'],
  ['/blogs/news/what-is-gir-cow-ghee', '/blogs/news/benefits-of-gir-cow-ghee/'],
  ['/blogs/news/what-is-desi-cow-ghee', '/blogs/news/what-is-bilona-ghee/'],
  ['/blogs/news/what-is-a2-gir-cow-ghee', '/blogs/news/a2-milk-vs-a1-milk-gir-cow/'],
  ['/blogs/news/what-is-bilona-ghee', '/blogs/news/what-is-bilona-ghee/'],
  ['/blogs/news', '/blogs/news/'],
  ['/products/pure-organic-a2-gir-cow-ghee-desi-cow-gir-govalan', '/products/pure-organic-a2-gir-cow-ghee/'],
  ['/products/pure-a2-gir-desi-cow-ghee-by-bilona', '/products/pure-organic-a2-gir-cow-ghee/'],
  ['/products/pure-a2-gir-desi-cow-bilona-ghee-100-organic-ayurvedic-certified-usa', '/products/pure-organic-a2-gir-cow-ghee/'],
  ['/products/copy-of-pure-organic-a2-gir-cow-ghee-desi-cow-gir-govalan', '/products/pure-organic-a2-gir-cow-ghee/'],
  ['/products/copy-of-copy-of-pure-organic-a2-gir-cow-ghee-desi-cow-gir-govalan', '/products/pure-organic-a2-gir-cow-ghee/'],
  ['/collections/all', '/collections/all/'],
  ['/collections/ghee', '/collections/all/?category=ghee'],
  ['/collections/dairy', '/collections/all/?category=dairy'],
  ['/collections/sweets', '/collections/all/?category=sweets'],
  ['/collections/desserts', '/collections/all/?category=sweets'],
  ['/collections/seed-nuts', '/collections/all/?category=seeds-nuts'],
  ['/collections/seeds-nuts', '/collections/all/?category=seeds-nuts'],
  ['/collections', '/collections/all/'],
  ['/comments', '/'],
  ['/search', '/']
];

const locales = ['en-us', 'en-ae', 'ar', 'ar-ae'];

function variants(p) {
  const bare = p.replace(/\/$/, '');
  return [bare, bare + '/'];
}

const vercelRules = [];
const netlify = [];
const htaccess = [];

function normalize(p) {
  return p.replace(/\/$/, '') || '/';
}

function isSelfRedirect(from, to) {
  return normalize(from) === normalize(to);
}

function add(from, to) {
  const selfish = isSelfRedirect(from, to);
  for (const v of variants(from)) {
    if (isSelfRedirect(v, to)) continue;
    vercelRules.push({ source: v, destination: to, permanent: true });
    netlify.push(`${v.padEnd(72)}${to.padEnd(42)}301`);
  }
  // Skip Apache rules that would only add a slash (trailing-slash block already does that).
  // Avoid `/?$` matching an already-slashed URL and looping onto itself.
  if (selfish) return;
  const bare = from.replace(/^\//, '').replace(/\/$/, '');
  htaccess.push(`RewriteRule ^${bare}/?$ ${to} [R=301,L]`);
}

for (const [from, to] of map) add(from, to);

for (const [from, to] of map) {
  for (const loc of locales) add(`/${loc}${from}`, to);
}

for (const loc of locales) {
  add(`/${loc}`, '/');
  add(`/${loc}/cart`, '/cart/');
}

for (const loc of locales) {
  vercelRules.push({ source: `/${loc}/:path*`, destination: '/:path*', permanent: true });
  netlify.push(`/${loc}/*`.padEnd(72) + '/:splat'.padEnd(42) + '301');
  htaccess.push(`RewriteRule ^${loc}/(.*)$ /$1 [R=301,L]`);
}

const out = path.join(__dirname, '_shopify-legacy-redirects.json');
fs.writeFileSync(out, JSON.stringify({ vercelRules, netlify, htaccess }, null, 2));
console.log('Generated', vercelRules.length, 'vercel rules →', out);
