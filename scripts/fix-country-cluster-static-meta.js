const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_ROOT = path.join(ROOT, 'blogs', 'news');

const metaMap = {
  'best-a2-ghee-brands-in-uae-what-to-check': {
    title: 'Best A2 Ghee Brands in UAE: What to Check Before Buying | Gir Govalan',
    description: 'A practical checklist for UAE buyers to compare A2 and bilona ghee quality before purchasing.'
  },
  'why-indian-families-in-uae-prefer-gir-cow-ghee': {
    title: 'Why Indian Families in UAE Prefer Gir Cow Ghee | Gir Govalan',
    description: 'Discover why Indian families in UAE choose authentic Gir cow bilona ghee for daily meals.'
  },
  'how-to-import-indian-ghee-to-uae': {
    title: 'How to Import Indian Ghee to UAE: Practical Buyer Guide | Gir Govalan',
    description: 'A practical guide for ordering and importing Indian ghee in UAE with clarity and confidence.'
  },
  'best-a2-ghee-brands-in-canada-what-to-check': {
    title: 'Best A2 Ghee Brands in Canada: What to Check Before Buying | Gir Govalan',
    description: 'A practical checklist for Canada buyers comparing authentic A2 and bilona ghee quality.'
  },
  'why-indian-families-in-canada-prefer-gir-cow-ghee': {
    title: 'Why Indian Families in Canada Prefer Gir Cow Ghee | Gir Govalan',
    description: 'Learn why Indian households in Canada prefer authentic Gir cow ghee for daily cooking.'
  },
  'how-to-import-indian-ghee-to-canada': {
    title: 'How to Import Indian Ghee to Canada: Practical Guide | Gir Govalan',
    description: 'A practical import checklist for buying Indian ghee in Canada from trusted sources.'
  },
  'best-a2-ghee-brands-in-uk-what-to-check': {
    title: 'Best A2 Ghee Brands in UK: What to Check Before Buying | Gir Govalan',
    description: 'A practical UK buyer checklist for selecting authentic A2 bilona ghee online.'
  },
  'why-indian-families-in-uk-prefer-gir-cow-ghee': {
    title: 'Why Indian Families in UK Prefer Gir Cow Ghee | Gir Govalan',
    description: 'See why UK-based Indian families choose authentic Gir cow bilona ghee for home cooking.'
  },
  'how-to-import-indian-ghee-to-uk': {
    title: 'How to Import Indian Ghee to UK: Buyer Checklist | Gir Govalan',
    description: 'A clear UK-focused checklist for importing or ordering Indian ghee with confidence.'
  }
};

for (const [slug, meta] of Object.entries(metaMap)) {
  const file = path.join(BLOG_ROOT, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  if (/<meta name="description"[^>]*>/i.test(html)) {
    html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${meta.description}">`);
  } else {
    html = html.replace(/<\/title>/i, `</title>\n  <meta name="description" content="${meta.description}">`);
  }
  fs.writeFileSync(file, html);
}

console.log('Country cluster static meta fixed for 9 pages.');
