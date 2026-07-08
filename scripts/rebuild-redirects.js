/**
 * Rebuild redirect configs with priority rules first (locale hubs, query stripping),
 * then base redirects, then generated Shopify legacy rules.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const locales = ['en-us', 'en-ae', 'ar', 'ar-ae'];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
}

function priorityVercelRules() {
  const rules = [];

  // Locale collection hubs → canonical products page in one hop.
  for (const loc of locales) {
    rules.push({ source: `/${loc}/collections`, destination: '/collections/all/', permanent: true });
    rules.push({ source: `/${loc}/collections/`, destination: '/collections/all/', permanent: true });
    rules.push({ source: `/${loc}`, destination: '/', permanent: true });
    rules.push({ source: `/${loc}/`, destination: '/', permanent: true });
  }

  return rules;
}

function priorityNetlify() {
  const lines = [];
  for (const loc of locales) {
    lines.push(`/${loc}/collections`.padEnd(72) + '/collections/all/'.padEnd(42) + '301');
    lines.push(`/${loc}/collections/`.padEnd(72) + '/collections/all/'.padEnd(42) + '301');
    lines.push(`/${loc}`.padEnd(72) + '/'.padEnd(42) + '301');
    lines.push(`/${loc}/`.padEnd(72) + '/'.padEnd(42) + '301');
  }
  return lines;
}

function priorityHtaccess() {
  const lines = ['# Priority: locale hubs'];
  for (const loc of locales) {
    lines.push(`RewriteRule ^${loc}/collections/?$ /collections/all/ [R=301,L]`);
    lines.push(`RewriteRule ^${loc}/?$ / [R=301,L]`);
  }
  return lines;
}

// Regenerate Shopify legacy block.
execSync('node scripts/generate-shopify-legacy-redirects.js', { cwd: ROOT, stdio: 'inherit' });
const generated = JSON.parse(fs.readFileSync(path.join(__dirname, '_shopify-legacy-redirects.json'), 'utf8'));

// Base redirects = current vercel minus generated shopify duplicates.
const current = readJson('vercel.json');
const generatedKeys = new Set(generated.vercelRules.map((r) => r.source + '=>' + r.destination));
const priorityKeys = new Set(priorityVercelRules().map((r) => r.source + '=>' + r.destination));

const baseRedirects = current.redirects.filter((r) => {
  const key = r.source + '=>' + r.destination;
  if (generatedKeys.has(key) || priorityKeys.has(key)) return false;
  // Drop broken Shopify tracking-param rules (Vercel preserves query → redirect loop).
  if (Array.isArray(r.has) && r.has.some((h) => /^pr_/.test(h.key || ''))) return false;
  return true;
});

const vercel = {
  ...current,
  redirects: [...priorityVercelRules(), ...baseRedirects, ...generated.vercelRules]
};
fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify(vercel, null, 2) + '\n');

// Rebuild _redirects: keep content before Shopify block, add priority + regenerated shopify.
let redirects = fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8');
redirects = redirects.split('# Shopify marketplace/locale legacy URLs')[0].trimEnd();
redirects += '\n\n# Priority locale hubs (one-hop canonical consolidation)\n';
redirects += priorityNetlify().join('\n') + '\n';
redirects += '\n# Shopify marketplace/locale legacy URLs (GSC blocked-by-robots leftovers)\n';
redirects += generated.netlify.join('\n') + '\n';
fs.writeFileSync(path.join(ROOT, '_redirects'), redirects);

// Rebuild .htaccess Shopify block.
let htaccess = fs.readFileSync(path.join(ROOT, '.htaccess'), 'utf8');
htaccess = htaccess.split('# Shopify marketplace/locale legacy URLs')[0].trimEnd();
const shopifyBlock =
  '\n\n' +
  priorityHtaccess().join('\n') +
  '\n\n# Shopify marketplace/locale legacy URLs (GSC blocked-by-robots leftovers)\n' +
  generated.htaccess.join('\n') +
  '\n';
if (htaccess.includes('# Trailing slash for pages')) {
  htaccess = htaccess.replace('# Trailing slash for pages', shopifyBlock + '\n# Trailing slash for pages');
} else {
  htaccess += shopifyBlock;
}
fs.writeFileSync(path.join(ROOT, '.htaccess'), htaccess);

console.log('Rebuilt redirects:', {
  priority: priorityVercelRules().length,
  base: baseRedirects.length,
  shopify: generated.vercelRules.length,
  total: vercel.redirects.length
});
