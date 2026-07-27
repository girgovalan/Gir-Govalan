/**
 * Download/rename poorly named images to SEO keyword filenames
 * and rewrite references across the site.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const CDN = 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files';

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    ensureDir(path.dirname(dest));
    const file = fs.createWriteStream(dest);
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(url + ' -> ' + res.statusCode));
        }
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
      })
      .on('error', (err) => {
        try {
          fs.unlinkSync(dest);
        } catch (_) {}
        reject(err);
      });
  });
}

function renameLocal(fromRel, toRel) {
  const from = path.join(ROOT, fromRel);
  const to = path.join(ROOT, toRel);
  if (!fs.existsSync(from)) {
    console.log('skip missing', fromRel);
    return false;
  }
  ensureDir(path.dirname(to));
  if (path.resolve(from) === path.resolve(to)) return true;
  if (fs.existsSync(to)) fs.unlinkSync(to);
  fs.renameSync(from, to);
  console.log('renamed', fromRel, '->', toRel);
  return true;
}

async function main() {
  ensureDir(path.join(ROOT, 'images', 'icons'));
  ensureDir(path.join(ROOT, 'images', 'products'));

  // CDN downloads → local SEO names
  const downloads = [
    [
      `'/images/gir-cows-gir-govalan-farm-gujarat.jpg'`,
      'images/gir-cows-gir-govalan-farm-gujarat.jpg'
    ],
    [`${CDN}/2.jpg`, 'images/gir-govalan-farm-landscape-gujarat.jpg'],
    [`${CDN}/clean-GHEE-icon.jpg`, 'images/icons/gir-cow-ghee-category-icon.jpg'],
    [
      `${CDN}/girgovalan__DAIRY_icon_729cc151-5743-466c-b219-d727fb6e089e.png`,
      'images/icons/a2-gir-cow-dairy-category-icon.png'
    ],
    [
      `${CDN}/girgovalan__DESSERTS_icon_9c2b61f0-1076-4fc1-aef1-f6359de9c8d0.png`,
      'images/icons/gujarati-desserts-mithai-category-icon.png'
    ],
    [
      `${CDN}/girgovalan__SEED_NUTS_icon_70bea663-b2f9-4021-b14a-4bc4d23c7294.png`,
      'images/icons/seeds-nuts-dry-fruits-category-icon.png'
    ],
    [
      `${CDN}/footer_image_1_home_page.png?v=1676397932`,
      'images/gir-govalan-footer-cows-desktop.png'
    ],
    [
      `${CDN}/footer_image_2_Mobile_view.png?v=1676397930`,
      'images/gir-govalan-footer-cows-mobile.png'
    ],
    [`${CDN}/png_logo.png`, 'images/gir-govalan-logo.png'],
    [`${CDN}/Vector.svg`, 'images/gir-govalan-decor-vector.svg']
  ];

  for (const [url, dest] of downloads) {
    const abs = path.join(ROOT, dest);
    if (fs.existsSync(abs) && fs.statSync(abs).size > 500) {
      console.log('have', dest);
      continue;
    }
    process.stdout.write('download ' + dest + ' ... ');
    await download(url, abs);
    console.log('ok');
  }

  // Local renames
  renameLocal(
    'images/Gir Govalan ghee process.png',
    'images/gir-govalan-bilona-ghee-process.png'
  );
  renameLocal(
    'images/products/Gir Govalan Packaging.jpeg',
    'images/products/gir-govalan-a2-ghee-packaging.jpg'
  );
  renameLocal(
    'images/products/700.jpg',
    'images/products/a2-gir-cow-ghee-jar-front.jpg'
  );
  renameLocal(
    'images/products/700 1.jpg',
    'images/products/a2-gir-cow-ghee-jar-side.jpg'
  );
  renameLocal(
    'images/products/700 2.jpg',
    'images/products/a2-gir-cow-bilona-ghee-closeup.jpg'
  );
  renameLocal(
    'images/products/700 3.jpg',
    'images/products/a2-gir-cow-ghee-product-detail.jpg'
  );
  renameLocal(
    'images/products/642b2faa-b742-44c0-9a83-542d1a418852.jpg',
    'images/products/gir-cow-pasture-gir-govalan.jpg'
  );
  renameLocal(
    'images/products/920c5e90-e7d1-41df-b1b0-7221a0af6bd7.jpg',
    'images/products/maldhari-gir-cow-care-gujarat.jpg'
  );
  renameLocal(
    'images/products/f57b4631-d06c-4bc5-b029-70b3cbb6504a.jpg',
    'images/products/traditional-bilona-ghee-making.jpg'
  );

  // String replacements across code
  const replacements = [
    [
      '/images/gir-cows-gir-govalan-farm-gujarat.jpg',
      '/images/gir-cows-gir-govalan-farm-gujarat.jpg'
    ],
    ['/images/gir-cows-gir-govalan-farm-gujarat.jpg'', "'/images/gir-cows-gir-govalan-farm-gujarat.jpg'"],
    // after quote fix for hero/gallery - handle both patterns carefully below
    [
      '/images/gir-govalan-farm-landscape-gujarat.jpg',
      '/images/gir-govalan-farm-landscape-gujarat.jpg'
    ],
    [
      '/images/gir-govalan-logo.png',
      '/images/gir-govalan-logo.png'
    ],
    ["homeImg('gir-govalan-bilona-ghee-process.png')", "homeImg('gir-govalan-bilona-ghee-process.png')"],
    [
      "productImg('gir-govalan-a2-ghee-packaging.jpg')",
      "productImg('gir-govalan-a2-ghee-packaging.jpg')"
    ],
    [
      'heroImage: '/images/gir-govalan-farm-landscape-gujarat.jpg'',
      "heroImage: '/images/gir-govalan-farm-landscape-gujarat.jpg'"
    ],
    [
      'logoFooter: '/images/gir-govalan-logo.png'',
      "logoFooter: '/images/gir-govalan-logo.png'"
    ],
    [
      'footerImageDesktop: '/images/gir-govalan-footer-cows-desktop.png'',
      "footerImageDesktop: '/images/gir-govalan-footer-cows-desktop.png'"
    ],
    [
      'footerImageMobile: '/images/gir-govalan-footer-cows-mobile.png'',
      "footerImageMobile: '/images/gir-govalan-footer-cows-mobile.png'"
    ],
    [
      'decor: '/images/gir-govalan-decor-vector.svg'',
      "decor: '/images/gir-govalan-decor-vector.svg'"
    ],
    [
      "{ id: 'ghee', title: 'Ghee', icon: '/images/icons/gir-cow-ghee-category-icon.jpg'",
      "{ id: 'ghee', title: 'Ghee', icon: '/images/icons/gir-cow-ghee-category-icon.jpg'"
    ],
    [
      "{ id: 'dairy', title: 'Dairy', icon: '/images/icons/a2-gir-cow-dairy-category-icon.png'",
      "{ id: 'dairy', title: 'Dairy', icon: '/images/icons/a2-gir-cow-dairy-category-icon.png'"
    ],
    [
      "{ id: 'sweets', title: 'Desserts', icon: '/images/icons/gujarati-desserts-mithai-category-icon.png'",
      "{ id: 'sweets', title: 'Desserts', icon: '/images/icons/gujarati-desserts-mithai-category-icon.png'"
    ],
    [
      "{ id: 'seeds-nuts', title: 'Seeds & Nuts', icon: '/images/icons/seeds-nuts-dry-fruits-category-icon.png'",
      "{ id: 'seeds-nuts', title: 'Seeds & Nuts', icon: '/images/icons/seeds-nuts-dry-fruits-category-icon.png'"
    ],
    [
      "{ src: '/images/gir-govalan-farm-landscape-gujarat.jpg', alt: 'Gir Govalan farm landscape' }",
      "{ src: '/images/gir-govalan-farm-landscape-gujarat.jpg', alt: 'Gir Govalan farm landscape' }"
    ],
    [
      'DEFAULT_IMAGE = \'/images/gir-govalan-farm-landscape-gujarat.jpg\'',
      "DEFAULT_IMAGE = '/images/gir-govalan-farm-landscape-gujarat.jpg'"
    ]
  ];

  const walkFiles = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name === 'node_modules' || ent.name === '.git') continue;
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (/\.(js|html|css|xml|md|json)$/i.test(ent.name)) walkFiles.push(p);
    }
  }
  walk(ROOT);

  let fileHits = 0;
  for (const file of walkFiles) {
    let text = fs.readFileSync(file, 'utf8');
    let changed = false;
    // Direct WhatsApp CDN + template literal form
    const before = text;
    text = text.split('gir-cows-gir-govalan-farm-gujarat.jpg').join(
      'gir-cows-gir-govalan-farm-gujarat.jpg'
    );
    // Fix CDN paths that became CDN}/gir-cows... or full URL leftover
    text = text.replace(
      /https:\/\/cdn\.shopify\.com\/s\/files\/1\/0686\/6944\/0297\/files\/gir-cows-gir-govalan-farm-gujarat\.jpg/g,
      '/images/gir-cows-gir-govalan-farm-gujarat.jpg'
    );
    text = text.replace(
      /\$\{CDN\}\/gir-cows-gir-govalan-farm-gujarat\.jpg/g,
      "'/images/gir-cows-gir-govalan-farm-gujarat.jpg'"
    );
    // Fix accidental quote nesting like '/images/...''
    text = text.replace(/''\/images\//g, "'/images/");

    for (const [from, to] of replacements) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changed = true;
      }
    }
    if (text !== before) changed = true;
    if (changed) {
      fs.writeFileSync(file, text);
      fileHits++;
      console.log('updated', path.relative(ROOT, file));
    }
  }
  console.log('files updated:', fileHits);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
