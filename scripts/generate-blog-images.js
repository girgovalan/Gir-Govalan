/* Generate branded blog hero images (1200×630) for scheduled posts */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'images/blog');
const WIDTH = 1200;
const HEIGHT = 630;

const BACKGROUNDS = {
  ghee: [
    'images/products/gir-govalan-ghee-jar.png',
    'images/products/bilona-ghee-process.png',
    'images/products/boiling-makhan-ghee.png',
    'images/blog/bilona-ghee-vs-regular-ghee.jpg',
    'images/blog/how-to-identify-pure-gir-cow-ghee.jpg',
    'images/blog/ayurveda-gir-cow-ghee-daily-uses.jpg'
  ],
  milk: [
    'images/products/a2-gir-milk.jpg',
    'images/products/milking-gir-cow.png',
    'images/blog/a2-milk-vs-a1-milk-gir-cow.jpg'
  ],
  sweets: [
    'images/products/milk-peda.jpg',
    'images/products/traditional-ladoo.jpg',
    'images/products/shrikhand.jpg',
    'images/blog/milk-peda-traditional-gujarati-sweet.jpg'
  ],
  curd: ['images/products/fresh-curd.jpg'],
  farm: [
    'images/products/caring-gir-cow.png',
    'images/products/milking-gir-cow.png',
    'images/blog/maldhari-community-gir-cow-farming.jpg',
    'images/blog/why-gir-region-ghee-famous-gujarat.jpg'
  ],
  lifestyle: [
    'images/blog/gir-cow-ghee-benefits-for-children.jpg',
    'images/blog/how-to-store-ghee-and-sweets-at-home.jpg',
    'images/blog/buy-pure-gir-cow-ghee-online-gujarat.jpg'
  ]
};

const EXTRA_ORIGINAL = [
  { slug: 'benefits-of-gir-cow-ghee', title: 'Benefits of Gir Cow Ghee for Your Daily Diet' },
  { slug: 'what-is-bilona-ghee', title: 'What Is Bilona Ghee and Why It Matters' },
  { slug: 'know-your-gir-cow', title: 'Know Your Gir Cow — The Pride of Gujarat' },
  { slug: 'cooking-with-pure-ghee', title: 'Cooking with Pure Ghee — Tips from Our Kitchen' }
];

function pickBackground(slug, index) {
  const s = slug.toLowerCase();
  let pool = BACKGROUNDS.lifestyle;
  if (/ghee|bilona|tadka|paratha|khichdi|butter|oil|coffee|purity|store|wholesale|hamper|gift|corporate|christmas|diwali|export|immunity|joint|winter|weight|pregnancy|athlete|navratri|karva|janmashtami|gurpurab|govatsa|year-end|six-month|south-indian|home-ghee/.test(s)) pool = BACKGROUNDS.ghee;
  else if (/milk|lactose|toddlers|delivery|packaged|jersey/.test(s)) pool = BACKGROUNDS.milk;
  else if (/peda|ladoo|mithai|sweet|shrikhand|dussehra|wedding|raksha|bestu|festival/.test(s)) pool = BACKGROUNDS.sweets;
  else if (/curd|dahi/.test(s)) pool = BACKGROUNDS.curd;
  else if (/farm|maldhari|amreli|ethical|cow-care|organic-farming|zero-waste|jituben|gir-govalan|heritage|gir-cow-vs|gir-region/.test(s)) pool = BACKGROUNDS.farm;
  return pool[index % pool.length];
}

function wrapTitle(title, max = 26) {
  const words = title.replace(/ — /g, ' — ').split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function overlaySvg(title, lines) {
  const tspans = lines.map((l, i) =>
    `<tspan x="72" dy="${i === 0 ? 0 : 44}">${escapeXml(l)}</tspan>`
  ).join('');
  return Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d2850" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="#2a1838" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#1a1024" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="0" y="0" width="100%" height="6" fill="#d4a017"/>
  <rect x="72" y="88" width="120" height="4" fill="#f0c84a" rx="2"/>
  <text x="72" y="72" fill="#f0c84a" font-family="Georgia, 'Times New Roman', serif" font-size="15" font-weight="700" letter-spacing="3">GIR GOVALAN BLOG</text>
  <text x="72" y="200" fill="#ffffff" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="700" letter-spacing="-0.5">${tspans}</text>
  <text x="72" y="${HEIGHT - 48}" fill="rgba(255,255,255,0.75)" font-family="Arial, sans-serif" font-size="18">Pure A2 Gir Cow · Bilona Ghee · Gujarat</text>
</svg>`);
}

function parseExtendedPosts() {
  const content = fs.readFileSync(path.join(ROOT, 'js/blog-scheduled-extended.js'), 'utf8');
  return [...content.matchAll(/slug: '([^']+)',\s*\n\s*title: '((?:\\'|[^'])*)'/g)].map(m => ({
    slug: m[1],
    title: m[2].replace(/\\'/g, "'")
  }));
}

async function renderHero({ slug, title }, index) {
  const bgRel = pickBackground(slug, index);
  const bgPath = path.join(ROOT, bgRel);
  if (!fs.existsSync(bgPath)) throw new Error(`Missing background: ${bgRel}`);

  const lines = wrapTitle(title);
  const svg = overlaySvg(title, lines);
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);

  await sharp(bgPath)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .composite([{ input: svg, top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);

  return `/images/blog/${slug}.jpg`;
}

function updateExtendedImages(mapping) {
  let content = fs.readFileSync(path.join(ROOT, 'js/blog-scheduled-extended.js'), 'utf8');
  for (const { slug, image } of mapping) {
    const re = new RegExp(`(slug: '${slug}',[\\s\\S]*?image: ')[^']+(')`, 'm');
    content = content.replace(re, `$1${image}$2`);
  }
  fs.writeFileSync(path.join(ROOT, 'js/blog-scheduled-extended.js'), content);
}

function updateDataJsImages(mapping) {
  let content = fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8');
  for (const { slug, image } of mapping) {
    const re = new RegExp(`(slug: '${slug}',[\\s\\S]*?image: )([^,\\n]+)`, 'm');
    if (re.test(content)) {
      content = content.replace(re, `$1'${image}'`);
    }
  }
  fs.writeFileSync(path.join(ROOT, 'js/data.js'), content);
}

function parseRecommendedPosts() {
  const file = path.join(ROOT, 'js/blog-scheduled-recommended.js');
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf8');
  return [...content.matchAll(/slug: '([^']+)',\s*\n\s*title: '((?:\\'|[^'])*)'/g)].map(m => ({
    slug: m[1],
    title: m[2].replace(/\\'/g, "'")
  }));
}

function updateRecommendedImages(mapping) {
  const file = path.join(ROOT, 'js/blog-scheduled-recommended.js');
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  for (const { slug, image } of mapping) {
    const re = new RegExp(`(slug: '${slug}',[\\s\\S]*?image: ')[^']+(')`, 'm');
    content = content.replace(re, `$1${image}$2`);
  }
  fs.writeFileSync(file, content);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const extended = parseExtendedPosts();
  const recommended = parseRecommendedPosts();
  const posts = [...extended, ...EXTRA_ORIGINAL, ...recommended];
  const mapping = [];
  const startIndex = extended.length + EXTRA_ORIGINAL.length;

  for (let i = 0; i < posts.length; i++) {
    const image = await renderHero(posts[i], i);
    mapping.push({ slug: posts[i].slug, image });
    console.log(`✓ ${posts[i].slug}`);
  }

  updateExtendedImages(mapping.filter(m => extended.some(p => p.slug === m.slug)));
  updateDataJsImages(mapping.filter(m => EXTRA_ORIGINAL.some(p => p.slug === m.slug)));
  updateRecommendedImages(mapping.filter(m => recommended.some(p => p.slug === m.slug)));

  // Update generate-blog-extended.js to use slug-based images on regen
  const genPath = path.join(ROOT, 'scripts/generate-blog-extended.js');
  let gen = fs.readFileSync(genPath, 'utf8');
  if (!gen.includes("image: `/images/blog/${t.slug}.jpg`")) {
    gen = gen.replace(
      "const image = IMAGES[i % IMAGES.length];",
      "const image = `/images/blog/${t.slug}.jpg`;"
    );
    fs.writeFileSync(genPath, gen);
  }

  console.log(`\nGenerated ${mapping.length} blog hero images in images/blog/`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
