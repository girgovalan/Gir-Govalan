/**
 * Fail if two or more unique blog slugs share a FUTURE publish date.
 * Run: node scripts/check-blog-one-per-day.js
 */
const fs = require('fs');

const TODAY = new Date().toISOString().slice(0, 10);
const FILES = [
  'js/data.js',
  'js/blog-scheduled.js',
  'js/blog-scheduled-extended.js',
  'js/blog-scheduled-recommended.js',
  'js/blog-month1-sprint.js',
  'js/blog-country-clusters.js',
  'js/blog-international-long.js'
];

const byDate = {};
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?date:\s*'(\d{4}-\d{2}-\d{2})'/g;
  let m;
  while ((m = re.exec(t))) {
    const slug = m[1];
    const date = m[2];
    if (!byDate[date]) byDate[date] = new Set();
    byDate[date].add(slug);
  }
}

const collisions = Object.entries(byDate)
  .filter(([date, set]) => date > TODAY && set.size > 1)
  .sort((a, b) => a[0].localeCompare(b[0]));

if (collisions.length) {
  console.error(
    'Future blog schedule has multiple posts on the same day (' + collisions.length + ' days):'
  );
  for (const [date, set] of collisions) {
    console.error(date, [...set].join(' | '));
  }
  console.error('\nRun: node scripts/fix-blog-one-per-day.js');
  process.exit(1);
}

console.log('OK: at most one future blog post per calendar day (today=' + TODAY + ').');
