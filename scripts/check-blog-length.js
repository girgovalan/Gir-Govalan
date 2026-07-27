/**
 * Fail if any blog post content is under MIN_WORDS.
 * Run: node scripts/check-blog-length.js
 * Wired as: npm run check:blog-length
 */
const fs = require('fs');

const MIN_WORDS = 400;
const FILES = [
  'js/blog-scheduled.js',
  'js/blog-scheduled-extended.js',
  'js/blog-scheduled-recommended.js',
  'js/blog-month1-sprint.js',
  'js/blog-country-clusters.js',
  'js/blog-international-long.js',
  'js/data.js'
];

function wordCount(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(/\s+/).filter(Boolean).length;
}

const short = [];
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?date:\s*'(\d{4}-\d{2}-\d{2})'[\s\S]*?content:\s*`([\s\S]*?)`/g;
  let m;
  while ((m = re.exec(t))) {
    const words = wordCount(m[3]);
    if (words < MIN_WORDS) {
      short.push({ file: f, slug: m[1], date: m[2], words });
    }
  }
}

if (short.length) {
  console.error('Blog posts under ' + MIN_WORDS + ' words (' + short.length + '):');
  for (const p of short.sort((a, b) => a.words - b.words)) {
    console.error(
      String(p.words).padStart(4),
      p.date,
      p.slug,
      p.file
    );
  }
  console.error('\nExpand them (or run node scripts/expand-short-blog-posts.js) before shipping.');
  process.exit(1);
}

console.log('OK: all blog posts have at least ' + MIN_WORDS + ' words.');
