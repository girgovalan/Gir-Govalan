/* Normalize blog SEO fields for all current/future scheduled datasets */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TARGETS = [
  'js/data.js',
  'js/blog-scheduled.js',
  'js/blog-scheduled-extended.js',
  'js/blog-scheduled-recommended.js'
];

function syncFile(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return { relPath, changed: false };
  let text = fs.readFileSync(abs, 'utf8');
  const before = text;

  // Add seoTitle mirroring title when missing.
  text = text.replace(
    /(title:\s*'([^']*(?:\\'[^']*)*)',\r?\n)(\s*)(?!seoTitle:)/g,
    (_, line, title, indent) => `${line}${indent}seoTitle: '${title}',\n`
  );

  // Add metaDescription mirroring excerpt when missing.
  text = text.replace(
    /(excerpt:\s*'([^']*(?:\\'[^']*)*)',\r?\n)(\s*)(?!metaDescription:)/g,
    (_, line, excerpt, indent) => `${line}${indent}metaDescription: '${excerpt}',\n`
  );

  if (text !== before) fs.writeFileSync(abs, text);
  return { relPath, changed: text !== before };
}

const results = TARGETS.map(syncFile);
for (const r of results) {
  console.log(`${r.changed ? 'updated' : 'ok'} ${r.relPath}`);
}
