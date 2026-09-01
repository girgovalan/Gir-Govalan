const fs = require('fs');
const files = [
  'js/blog-scheduled.js',
  'js/blog-scheduled-extended.js',
  'js/blog-scheduled-recommended.js',
  'js/blog-month1-sprint.js',
  'js/blog-country-clusters.js',
  'js/blog-international-long.js',
  'js/data.js'
];
const today = '2026-07-27';
const posts = [];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?date:\s*'(\d{4}-\d{2}-\d{2})'[\s\S]*?content:\s*`([\s\S]*?)`/g;
  let m;
  while ((m = re.exec(t))) {
    const content = m[3];
    const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    posts.push({ slug: m[1], date: m[2], words, file: f, future: m[2] > today });
  }
}

posts.sort((a, b) => a.words - b.words);
const short = posts.filter((p) => p.words < 280);
console.log('Total matched', posts.length);
console.log('Under 280 words', short.length);
console.log('Future under 280', short.filter((p) => p.future).length);
console.log('\nAll short:');
for (const p of short) {
  console.log(
    String(p.words).padStart(4),
    p.future ? 'FUT' : 'pub',
    p.date,
    p.slug,
    p.file.replace(/^js\//, '')
  );
}
