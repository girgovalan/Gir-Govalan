const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');

const pages = [
  {
    slug: 'a2-ghee-usa',
    title: 'A2 Ghee USA — Authentic Gir Cow Bilona Ghee',
    description: 'Order authentic A2 ghee in USA. Gir Govalan ships traditional Gir cow bilona ghee with quality-first sourcing from Gujarat.',
    h1: 'A2 Ghee USA — Authentic Gir Cow Bilona Ghee',
    intro: 'Looking for authentic A2 ghee in USA? Gir Govalan brings traditional Gir cow bilona ghee from Gujarat to Indian families abroad.',
    shipping: 'USA shipping available on confirmed quote. Typical dispatch starts in 24-48 hours from order confirmation. We share final shipping and customs details on WhatsApp before payment.',
    why: 'Indians in the USA choose Gir ghee for familiar aroma, trusted bilona process, and the comfort of traditional daily cooking.',
    faq1: 'Can I order A2 ghee from USA?',
    faq1a: 'Yes. Message us with your city and ZIP code. We will confirm availability, delivery timeline, and final landed cost.',
    faq2: 'Is this pure Gir cow bilona ghee?',
    faq2a: 'Our ghee is made from A2 Gir cow milk using the curd-churned bilona process with single-ingredient purity.'
  },
  {
    slug: 'bilona-ghee-usa',
    title: 'Bilona Ghee USA — Traditional Gir Cow Ghee',
    description: 'Buy bilona ghee in USA from Gir Govalan. Traditional curd-churned A2 Gir cow ghee for Indian cooking and wellness.',
    h1: 'Bilona Ghee USA — Traditional Gir Cow Ghee',
    intro: 'Searching for bilona ghee in USA? Choose a transparent source rooted in Gir-region dairy traditions.',
    shipping: 'International delivery to the USA is supported based on location. Contact us for shipping quote and expected delivery time.',
    why: 'Families abroad prefer bilona ghee for richer flavor, trusted traditional process, and consistency in everyday meals.',
    faq1: 'How is bilona ghee different from regular ghee?',
    faq1a: 'Bilona ghee is made from curd-churned butter and slow clarification, not direct cream processing.',
    faq2: 'Do you support repeat monthly orders for USA?',
    faq2a: 'Yes, many customers place recurring orders. We can help plan batch-friendly quantity and schedule.'
  },
  {
    slug: 'gir-cow-ghee-usa',
    title: 'Gir Cow Ghee USA — Premium A2 Ghee',
    description: 'Premium Gir cow ghee in USA. Order authentic A2 Gir cow bilona ghee with trusted farm sourcing and support.',
    h1: 'Gir Cow Ghee USA — Premium A2 Ghee',
    intro: 'Bring home authentic Gir cow ghee in USA with Gir Govalan, directly sourced from Gujarat heritage dairy practices.',
    shipping: 'USA shipment support is available with destination-based costing. Contact us to confirm rates and customs guidance.',
    why: 'Indian homes in USA choose Gir cow ghee for familiar taste, premium quality, and clean-label trust.',
    faq1: 'Do you ship Gir cow ghee to all US states?',
    faq1a: 'Shipping depends on courier coverage and import requirements. Share your address for accurate confirmation.',
    faq2: 'Which pack size is best for USA families?',
    faq2a: 'Most families start with 500ml or 1L packs. Heavy users often choose larger packs for better value.'
  },
  {
    slug: 'indian-organic-ghee-usa',
    title: 'Indian Organic Ghee USA — Shop A2 Bilona Ghee',
    description: 'Shop Indian organic ghee in USA from Gir Govalan. Authentic A2 Gir cow bilona ghee crafted in small batches.',
    h1: 'Indian Organic Ghee USA — Shop A2 Bilona Ghee',
    intro: 'If you are searching for Indian organic ghee in USA, choose a source that combines transparent farming and traditional process.',
    shipping: 'USA shipping is available on request. We provide order support, packaging details, and dispatch updates end to end.',
    why: 'NRI families choose our ghee for authentic Indian flavor, process integrity, and direct support from the producer.',
    faq1: 'Is your ghee suitable for daily Indian cooking?',
    faq1a: 'Yes. It is widely used for tadka, roti, khichdi, sweets, and everyday family meals.',
    faq2: 'How do I place an international order?',
    faq2a: 'Use WhatsApp or contact form. We share shipping quote, payment steps, and dispatch updates.'
  },
  {
    slug: 'a2-ghee-uae',
    title: 'A2 Ghee UAE — Authentic Gir Cow Bilona Ghee',
    description: 'Order authentic A2 ghee in UAE. Gir Govalan supplies Gir cow bilona ghee trusted by Indian families in UAE.',
    h1: 'A2 Ghee UAE — Authentic Gir Cow Bilona Ghee',
    intro: 'Looking for premium A2 ghee in UAE? Gir Govalan offers authentic bilona ghee from Gujarat to your kitchen abroad.',
    shipping: 'UAE shipping support is available with location-based pricing and timeline confirmation before checkout.',
    why: 'Indian households in UAE choose Gir ghee for purity, reliable aroma, and familiar traditional quality.',
    faq1: 'Do you deliver A2 ghee to UAE cities?',
    faq1a: 'Yes, we support UAE orders subject to courier coverage. Contact us with your exact location.',
    faq2: 'Can I order in bulk for family use?',
    faq2a: 'Yes. We support bulk and repeat orders for households and gifting.'
  },
  {
    slug: 'indian-ghee-dubai',
    title: 'Indian Ghee Dubai — Authentic Gir Cow Bilona Ghee',
    description: 'Buy Indian ghee in Dubai from Gir Govalan. Authentic Gir cow A2 bilona ghee for traditional Indian cooking.',
    h1: 'Indian Ghee Dubai — Authentic Gir Cow Bilona Ghee',
    intro: 'Searching for Indian ghee in Dubai? Get authentic Gir-cow bilona ghee with transparent sourcing and support.',
    shipping: 'Dubai orders are supported with pre-confirmed shipping and delivery window details.',
    why: 'Indian families in Dubai choose Gir ghee for trusted quality, rich taste, and consistency across batches.',
    faq1: 'How fast is delivery to Dubai?',
    faq1a: 'Timelines vary by batch and courier route. We confirm ETA before final payment.',
    faq2: 'Is this suitable for sweets and festive cooking?',
    faq2a: 'Yes. Our bilona ghee is used for sweets, festive meals, and everyday Indian cuisine.'
  },
  {
    slug: 'bilona-ghee-uae',
    title: 'Bilona Ghee UAE — Traditional A2 Gir Cow Ghee',
    description: 'Shop bilona ghee in UAE. Gir Govalan offers traditional A2 Gir cow ghee with international order support.',
    h1: 'Bilona Ghee UAE — Traditional A2 Gir Cow Ghee',
    intro: 'For families searching bilona ghee in UAE, this page gives shipping details, product quality highlights, and order support.',
    shipping: 'UAE delivery is available on supported locations with pre-shipment confirmation and tracking updates.',
    why: 'Buyers in UAE prefer bilona ghee for authentic process, fuller flavor, and trustworthy farm story.',
    faq1: 'What makes your bilona ghee premium?',
    faq1a: 'A2 Gir cow milk source, curd-churned process, and small-batch slow cooking.',
    faq2: 'How do I order from UAE?',
    faq2a: 'Message us on WhatsApp with your area and quantity. We will share quote and next steps.'
  }
];

function pageHtml(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-X9CF28C02R"></script>
  <script src="/js/gtag.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
  <meta name="keywords" content="${p.title}, Gir cow ghee, A2 ghee, bilona ghee, international shipping">
  <link rel="canonical" href="https://girgovalan.com/${p.slug}/">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <div id="site-header"></div>
  <div class="page-hero">
    <div class="container">
      <h1>${p.h1}</h1>
      <p>${p.intro}</p>
    </div>
  </div>
  <section>
    <div class="container article-content">
      <h2>Shipping Information</h2>
      <p>${p.shipping}</p>
      <h2>Why Indians Abroad Choose Gir Ghee</h2>
      <p>${p.why}</p>
      <h2>Product Details</h2>
      <ul>
        <li>Authentic A2 Gir cow milk source</li>
        <li>Traditional bilona preparation method</li>
        <li>Single-ingredient purity</li>
        <li>Multiple pack sizes for family usage</li>
      </ul>
      <p><a class="btn btn-cta" href="/products/pure-organic-a2-gir-cow-ghee/">Shop Authentic A2 Gir Cow Bilona Ghee</a></p>
      <h2>Frequently Asked Questions</h2>
      <h3>${p.faq1}</h3>
      <p>${p.faq1a}</p>
      <h3>${p.faq2}</h3>
      <p>${p.faq2a}</p>
      <h3>How can I contact Gir Govalan for international orders?</h3>
      <p>Reach us on <a href="https://wa.me/919328289550" target="_blank" rel="noopener">WhatsApp</a> or visit our <a href="/pages/contact/">contact page</a> for support.</p>
    </div>
  </section>
  <div id="site-footer"></div>
  <button class="scroll-top" aria-label="Back to top">↑</button>
  <script src="/js/urls.js"></script>
  <script src="/js/data.js"></script>
  <script src="/js/seo.js"></script>
  <script src="/js/components.js"></script>
  <script src="/js/app.js"></script>
</body>
</html>`;
}

for (const p of pages) {
  const dir = path.join(ROOT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(p));
}

let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
for (const p of pages) {
  const loc = `https://girgovalan.com/${p.slug}/`;
  if (sitemap.includes(loc)) continue;
  const block = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  sitemap = sitemap.replace('</urlset>', `${block}</urlset>`);
}
fs.writeFileSync(SITEMAP_PATH, sitemap);

console.log(`International landing pages created: ${pages.length}`);
