/**
 * Ensure at most one FUTURE blog post per calendar day.
 * Keeps the higher-priority post on a contested date.
 * Moves only the extras into empty calendar gaps (does not cascade
 * every later post forward).
 *
 * Run: node scripts/fix-blog-one-per-day.js
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

function nextDay(iso) {
  const d = new Date(iso + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function priority(slug, files) {
  let score = 50;
  if (files.some((f) => f.includes('international-long') || f.includes('country-clusters'))) {
    score += 40;
  }
  if (files.some((f) => f.includes('month1'))) score -= 30;
  if (
    /diwali|navratri|raksha|janmashtami|dussehra|christmas|bestu|karva|gurpurab|govatsa|independence|wedding|festival/i.test(
      slug
    )
  ) {
    score += 25;
  }
  if (/usa|uae|canada|uk|import|families-in/i.test(slug)) score += 20;
  return score;
}

const posts = new Map();
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?date:\s*'(\d{4}-\d{2}-\d{2})'/g;
  let m;
  while ((m = re.exec(t))) {
    const slug = m[1];
    const date = m[2];
    if (!posts.has(slug)) {
      posts.set(slug, { date, files: [f] });
    } else {
      const cur = posts.get(slug);
      if (!cur.files.includes(f)) cur.files.push(f);
      if (date < cur.date) cur.date = date;
    }
  }
}

const list = [...posts.entries()].map(([slug, meta]) => ({
  slug,
  date: meta.date,
  files: meta.files,
  score: priority(slug, meta.files)
}));

const assignments = new Map();
for (const p of list) {
  if (p.date <= TODAY) assignments.set(p.slug, p.date);
}

const future = list.filter((p) => p.date > TODAY);
const byDate = new Map();
for (const p of future) {
  if (!byDate.has(p.date)) byDate.set(p.date, []);
  byDate.get(p.date).push(p);
}

const keep = [];
const displaced = [];
for (const date of [...byDate.keys()].sort()) {
  const group = byDate.get(date).sort(
    (a, b) => b.score - a.score || a.slug.localeCompare(b.slug)
  );
  keep.push(group[0]);
  for (let i = 1; i < group.length; i++) displaced.push(group[i]);
}

const occupied = new Set(keep.map((p) => p.date));
for (const p of keep) assignments.set(p.slug, p.date);

const moves = [];
let cursor = nextDay(TODAY);
displaced.sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
for (const p of displaced) {
  while (occupied.has(cursor)) cursor = nextDay(cursor);
  assignments.set(p.slug, cursor);
  occupied.add(cursor);
  moves.push({ slug: p.slug, from: p.date, to: cursor, score: p.score });
  cursor = nextDay(cursor);
}

console.log('Today:', TODAY);
console.log('Future posts:', future.length);
console.log('Contested extras moved into gaps:', moves.length);
for (const m of moves) {
  console.log(' ', m.from, '->', m.to, m.slug);
}

let filesTouched = 0;
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  let src = fs.readFileSync(f, 'utf8');
  let changed = false;
  for (const [slug, newDate] of assignments) {
    const re = new RegExp(
      "(slug:\\s*'" + slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'[\\s\\S]*?date:\\s*)'(\\d{4}-\\d{2}-\\d{2})'",
      'g'
    );
    src = src.replace(re, (full, prefix, oldDate) => {
      if (oldDate === newDate) return full;
      changed = true;
      return prefix + "'" + newDate + "'";
    });
  }
  if (changed) {
    fs.writeFileSync(f, src);
    filesTouched++;
  }
}

const verify = {};
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?date:\s*'(\d{4}-\d{2}-\d{2})'/g;
  let m;
  while ((m = re.exec(t))) {
    if (!verify[m[2]]) verify[m[2]] = new Set();
    verify[m[2]].add(m[1]);
  }
}
const futureCollisions = Object.entries(verify).filter(
  ([d, set]) => d > TODAY && set.size > 1
);
console.log('Files updated:', filesTouched);
console.log('Future collision days remaining:', futureCollisions.length);
if (futureCollisions.length) {
  for (const [d, set] of futureCollisions) console.log(d, [...set].join(', '));
  process.exit(1);
}
