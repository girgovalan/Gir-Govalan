const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const targets = [
  path.join(root, 'images', 'blog'),
  path.join(root, 'images', 'products'),
  path.join(root, 'images')
];
const minBytes = 250 * 1024;
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  const stat = fs.statSync(file);
  if (!exts.has(ext) || stat.size < minBytes) return null;

  const input = sharp(file);
  let output;
  if (ext === '.jpg' || ext === '.jpeg') {
    output = await input.jpeg({ quality: 72, mozjpeg: true, progressive: true }).toBuffer();
  } else if (ext === '.png') {
    output = await input.png({ compressionLevel: 9, palette: true }).toBuffer();
  } else if (ext === '.webp') {
    output = await input.webp({ quality: 72 }).toBuffer();
  } else {
    return null;
  }

  if (output.length >= stat.size) return null;
  fs.writeFileSync(file, output);
  return {
    file: file.replace(root, '').replace(/\\/g, '/'),
    before: stat.size,
    after: output.length
  };
}

(async () => {
  const seen = new Set();
  const files = [];
  for (const dir of targets) {
    for (const file of walk(dir)) {
      if (seen.has(file)) continue;
      seen.add(file);
      files.push(file);
    }
  }

  const results = [];
  for (const file of files) {
    try {
      const r = await optimize(file);
      if (r) results.push(r);
    } catch (_) {
      // Skip unreadable/corrupt images without failing full run.
    }
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  console.log(JSON.stringify({
    optimizedFiles: results.length,
    totalSavedBytes: totalBefore - totalAfter,
    topSavings: results
      .map(r => ({ ...r, saved: r.before - r.after }))
      .sort((a, b) => b.saved - a.saved)
      .slice(0, 20)
  }, null, 2));
})();
