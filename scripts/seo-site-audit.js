const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const skip = new Set(['.git', 'node_modules', '.cursor', '.vercel']);

const htmlFiles = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (skip.has(e.name)) continue;
      walk(p);
    } else if (e.name.endsWith('.html')) {
      htmlFiles.push(p);
    }
  }
}
walk(root);

const missingTitle = [];
const missingDesc = [];
const titleMap = new Map();
const descMap = new Map();
const canonicalMap = new Map();
const brokenLinks = [];
const insecureRefs = [];

function rel(p) {
  return p.replace(root, '').replace(/\\/g, '/');
}

function addMap(map, key, file) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(file);
}

function existsLocal(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  const target = path.join(root, clean);
  return (
    fs.existsSync(target) ||
    fs.existsSync(target + '.html') ||
    fs.existsSync(path.join(target, 'index.html'))
  );
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileRel = rel(file);

  const tm = content.match(/<title>([^<]*)<\/title>/i);
  if (!tm || !tm[1].trim()) missingTitle.push(fileRel);
  else addMap(titleMap, tm[1].trim(), fileRel);

  const dm = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!dm || !dm[1].trim()) missingDesc.push(fileRel);
  else addMap(descMap, dm[1].trim(), fileRel);

  const cm = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (cm && cm[1].trim()) addMap(canonicalMap, cm[1].trim(), fileRel);

  for (const m of content.matchAll(/<a[^>]+href="([^"]+)"/gi)) {
    const href = m[1];
    if (href.includes('${')) continue;
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      href.startsWith('javascript:')
    ) continue;
    if (href.startsWith('/') && !existsLocal(href)) {
      brokenLinks.push({ file: fileRel, href });
    }
  }

  for (const m of content.matchAll(/http:\/\/[^\s"'<>]+/gi)) {
    insecureRefs.push({ file: fileRel, url: m[0] });
  }
}

const dupTitles = [...titleMap.entries()].filter(([, files]) => files.length > 1);
const dupDescs = [...descMap.entries()].filter(([, files]) => files.length > 1);
const dupCanonical = [...canonicalMap.entries()].filter(([, files]) => files.length > 1);

const media = [];
function walkMedia(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (skip.has(e.name)) continue;
      walkMedia(p);
    } else if (/\.(png|jpe?g|webp|gif|svg|mp4)$/i.test(e.name)) {
      media.push({ file: rel(p), size: fs.statSync(p).size });
    }
  }
}
walkMedia(root);

const largeMedia = media.filter(m => m.size > 300 * 1024).sort((a, b) => b.size - a.size).slice(0, 25);
const veryLargeMedia = media.filter(m => m.size > 1024 * 1024).sort((a, b) => b.size - a.size).slice(0, 25);

const report = {
  htmlCount: htmlFiles.length,
  missingTitle,
  missingDescription: missingDesc,
  duplicateTitles: dupTitles,
  duplicateDescriptions: dupDescs,
  duplicateCanonicals: dupCanonical,
  brokenLinks: brokenLinks.slice(0, 200),
  insecureHttpReferences: insecureRefs,
  largeMedia,
  veryLargeMedia
};

console.log(JSON.stringify(report, null, 2));
