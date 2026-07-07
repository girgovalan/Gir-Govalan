const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const commonHead = `  <script async src="https://www.googletagmanager.com/gtag/js?id=G-X9CF28C02R"></script>
  <script src="/js/gtag.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">`;

const pages = [
  {
    slug: 'gir-cow-ghee-usa',
    title: 'Buy A2 Gir Cow Ghee in USA | Authentic Bilona Desi Ghee',
    description: 'Buy A2 Gir Cow Ghee in USA from Gir Govalan. Authentic bilona desi ghee from Gujarat for Indian families across America.',
    h1: 'Authentic A2 Gir Cow Ghee Delivered in USA',
    intro: 'This USA authority page is built for serious buyers searching gir cow ghee usa, a2 ghee usa, bilona ghee usa, and indian ghee usa.',
    region: 'USA',
    geoExamples: 'New Jersey, Texas, California, New York, Illinois, Washington',
    diasporaLine: 'Across the United States, Indian families balancing fast schedules still preserve weekend cooking rituals, festival sweets, and family food memory through authentic ghee.',
    shippingLine: 'For USA orders, we share shipment planning, package protection details, and destination-specific timeline expectations before payment confirmation.',
    faq: [
      ['Where can I buy authentic Gir cow ghee online in USA?', 'You can order from Gir Govalan directly and request shipping confirmation for your city and ZIP code.'],
      ['Is bilona ghee available in USA?', 'Yes. We support USA demand for traditional bilona ghee prepared from A2 Gir cow milk.'],
      ['How should I store ghee after delivery in America?', 'Keep it in a cool dry cabinet, avoid wet spoons, and keep lid tightly closed after each use.'],
      ['Can I gift Gir cow ghee to family in USA?', 'Yes. You can place family-directed or gifting orders with recipient details and preferred delivery city.'],
      ['Is this good for daily Indian cooking in the USA?', 'Yes. It works well for tadka, rotis, parathas, khichdi, sweets, and festival cooking routines.']
    ]
  },
  {
    slug: 'a2-gir-cow-ghee-uae',
    title: 'Buy A2 Gir Cow Ghee in UAE | Authentic Bilona Ghee',
    description: 'Buy A2 Gir Cow Ghee in UAE from Gir Govalan. Authentic bilona ghee from Gujarat with direct shipping support.',
    h1: 'Authentic A2 Gir Cow Ghee for UAE Families',
    intro: 'This UAE page is built for people searching a2 ghee uae, bilona ghee uae, and indian ghee dubai with practical buying clarity.',
    region: 'UAE',
    geoExamples: 'Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain',
    diasporaLine: 'In UAE homes, many Indian families maintain traditional food identity through careful ingredient choice, especially for ghee used in daily and festive cooking.',
    shippingLine: 'For UAE orders, we provide clear destination-based updates so buyers understand handling, timeline, and quantity planning before checkout.',
    faq: [
      ['Can I order A2 Gir cow ghee in UAE?', 'Yes. We support UAE orders with location-level shipping guidance before payment.'],
      ['Do you deliver to Dubai and Abu Dhabi?', 'Yes, coverage is confirmed based on current route and delivery feasibility for your address.'],
      ['Is bilona ghee suitable for daily UAE cooking?', 'Yes. Many families use it for tadka, rotis, breakfast meals, and desserts.'],
      ['How can I check if ghee is authentic?', 'Verify source transparency, process explanation, ingredient clarity, and seller support quality.'],
      ['Can I place repeat monthly orders in UAE?', 'Yes, repeat planning is possible for families who consume ghee regularly.']
    ]
  },
  {
    slug: 'a2-gir-cow-ghee-canada',
    title: 'Buy A2 Gir Cow Ghee in Canada | Authentic Bilona Ghee',
    description: 'Buy A2 Gir Cow Ghee in Canada from Gir Govalan. Authentic bilona ghee from Gujarat with international shipping support.',
    h1: 'Authentic A2 Gir Cow Ghee for Canada',
    intro: 'This Canada landing page helps buyers searching for authentic a2 gir cow ghee with trust signals, process details, and practical usage guidance.',
    region: 'Canada',
    geoExamples: 'Toronto, Brampton, Mississauga, Vancouver, Calgary, Edmonton',
    diasporaLine: 'In Canada, climate and storage habits differ by season, so buyers need practical freshness guidance in addition to authenticity claims.',
    shippingLine: 'For Canadian buyers, we help with shipment planning, cold-season handling awareness, and destination-level delivery clarity.',
    faq: [
      ['Where can I buy A2 Gir cow ghee in Canada?', 'You can order from Gir Govalan and request city-level shipping confirmation for Canada.'],
      ['Is this suitable for winter storage in Canada?', 'Yes, but keep the jar dry and tightly closed; texture changes with temperature are normal for pure ghee.'],
      ['Can I use this for traditional Punjabi and Gujarati cooking?', 'Yes. It is suitable for many Indian regional meals and festive preparations.'],
      ['How do I choose pack size for family use?', 'Estimate monthly consumption by household size, meal style, and frequency of sweet preparation.'],
      ['Do you support gift orders for relatives in Canada?', 'Yes. Shared-family delivery workflows can be arranged with recipient details.']
    ]
  },
  {
    slug: 'a2-gir-cow-ghee-uk',
    title: 'Buy A2 Gir Cow Ghee in UK | Authentic Bilona Ghee',
    description: 'Buy A2 Gir Cow Ghee in UK from Gir Govalan. Traditional bilona ghee from Gujarat with shipping support.',
    h1: 'Authentic A2 Gir Cow Ghee for UK Kitchens',
    intro: 'This UK page is built for buyers searching indian ghee uk, bilona ghee uk, and authentic gir cow ghee with complete trust and usage context.',
    region: 'UK',
    geoExamples: 'London, Leicester, Birmingham, Manchester, Leeds, Reading',
    diasporaLine: 'Many UK families preserve food heritage through ingredient authenticity, especially for daily tadka, rotis, sweets, and celebratory meals.',
    shippingLine: 'For UK destinations, we provide practical support on quantity planning, handling, and delivery expectation before final order approval.',
    faq: [
      ['Can I buy authentic Gir cow ghee in UK?', 'Yes. UK buyers can contact Gir Govalan for availability and shipping confirmation.'],
      ['Is bilona ghee available for UK Indian households?', 'Yes. Traditional bilona ghee demand in UK is supported with direct assistance.'],
      ['How can I compare authentic and regular ghee?', 'Check process, source transparency, aroma profile, and clarity of production story.'],
      ['Can this be used for UK winter and summer cooking?', 'Yes. Pure ghee adapts naturally; just store properly in a cool, dry location.'],
      ['Where should I start before placing first UK order?', 'Read this page fully, review product details, then contact support for final shipping quote.']
    ]
  }
];

const sectionTitles = [
  '1) Buy Authentic Gir Cow Ghee',
  '2) What Is A2 Gir Cow Ghee?',
  '3) Bilona Method Explained in Practical Terms',
  '4) Why Traditional Indian Ghee Matters Abroad',
  '5) Farm Transparency, Cows, and Process Trust',
  '6) Shipping, Freshness, and Packaging Guidance',
  '7) How to Compare Ghee Brands Before Buying',
  '8) Gir Cow Ghee vs Regular Ghee in Real Kitchens',
  '9) Everyday Usage in Family Cooking',
  '10) Detailed Buyer FAQ'
];

function longParagraph(seed, region, geoExamples) {
  return `${seed} In ${region}, buyers usually compare price labels first, but serious households evaluate traceability, process discipline, and consistency in cooking performance over time. We encourage first-time customers to assess how ghee behaves in daily meals, how aroma holds during tadka, and how reliably flavor carries through lentils, vegetables, and flatbread. Families across ${geoExamples} often ask for the same thing: confidence that product quality is stable from jar to jar. That is why we emphasize source clarity, process transparency, and direct support before order confirmation rather than vague promises after checkout.`;
}

function makeBody(page) {
  const blocks = [];
  blocks.push(`<p>${page.intro} ${longParagraph('People searching high-intent keywords are usually close to purchase.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<h2>${sectionTitles[0]} in ${page.region}</h2>`);
  blocks.push(`<p>${longParagraph('When a family decides to buy premium ghee internationally, trust is earned through detailed information.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p>${longParagraph('Our role is to help you evaluate quality before checkout, not push quick decisions.', page.region, page.geoExamples)}</p>`);

  blocks.push(`<h2>${sectionTitles[1]}</h2>`);
  blocks.push(`<p>${longParagraph('A2 Gir cow ghee discussion should start with source and process context.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p>${longParagraph('For many households, the practical value of authentic ghee appears in flavor depth, satiety, and daily meal satisfaction.', page.region, page.geoExamples)}</p>`);

  blocks.push(`<h2>${sectionTitles[2]}</h2>`);
  blocks.push(`<p>${longParagraph('The bilona sequence is curd setting, churning, and slow clarification, which differs from speed-first industrial paths.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p>${longParagraph('This process-first approach supports an aroma profile people often associate with traditional home kitchens.', page.region, page.geoExamples)}</p>`);

  blocks.push(`<h2>${sectionTitles[3]}</h2>`);
  blocks.push(`<p>${page.diasporaLine}</p>`);
  blocks.push(`<p>${longParagraph('Diaspora buyers are not looking for generic fat; they are preserving meal identity and family continuity.', page.region, page.geoExamples)}</p>`);

  blocks.push(`<h2>${sectionTitles[4]}</h2>`);
  blocks.push(`<p>${longParagraph('Trust grows when brands show real farms, real process, and real people behind production.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<ul><li><a href="/pages/gallery/">Farm and cow photos</a></li><li><a href="/#home-videos">Process video</a></li><li><a href="/pages/who-is-gir-govalan/">Founder and farm story</a></li></ul>`);
  blocks.push(`<p>${longParagraph('Visible evidence helps buyers distinguish transparent producers from label-only marketing.', page.region, page.geoExamples)}</p>`);

  blocks.push(`<h2>${sectionTitles[5]}</h2>`);
  blocks.push(`<p>${page.shippingLine}</p>`);
  blocks.push(`<p>${longParagraph('Good shipping communication covers quantity planning, handling expectations, and clear buyer support.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p>${longParagraph('Freshness confidence improves when customers receive realistic delivery communication in advance.', page.region, page.geoExamples)}</p>`);

  blocks.push(`<h2>${sectionTitles[6]}</h2>`);
  blocks.push(`<p>${longParagraph('Before buying, compare source disclosure, process explanation, ingredient simplicity, and support quality.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<ul><li>Source transparency</li><li>Bilona process clarity</li><li>Single-ingredient confidence</li><li>Customer support responsiveness</li><li>Repeat-order consistency</li></ul>`);

  blocks.push(`<h2>${sectionTitles[7]}</h2>`);
  blocks.push(`<p>${longParagraph('The strongest comparisons are practical: cooking behavior, aroma retention, and batch-to-batch reliability.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p>${longParagraph('When quality is process-led, outcomes in daily Indian cooking are easier to notice and evaluate.', page.region, page.geoExamples)}</p>`);

  blocks.push(`<h2>${sectionTitles[8]}</h2>`);
  blocks.push(`<p>${longParagraph('Families often use authentic ghee for dal, khichdi, rotis, parathas, and sweets throughout the week.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p>${longParagraph('Usage patterns vary by region and household habits, so we encourage practical quantity planning.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p><a class="btn btn-cta" href="/products/pure-organic-a2-gir-cow-ghee/">Shop Authentic A2 Gir Cow Bilona Ghee</a></p>`);

  blocks.push(`<h2>${sectionTitles[9]}</h2>`);
  for (const [q, a] of page.faq) {
    blocks.push(`<h3>${q}</h3><p>${a} ${longParagraph('These details help buyers make clear and confident decisions.', page.region, page.geoExamples)}</p>`);
  }

  blocks.push(`<p>${longParagraph('For deeper context, review our blog resources and product information before finalizing your order.', page.region, page.geoExamples)}</p>`);
  blocks.push(`<p>${longParagraph('Serious buyers usually return to this page multiple times, comparing details, checking trust signals, and aligning purchase plans with family usage patterns over the coming months.', page.region, page.geoExamples)}</p>`);

  return blocks.join('\n');
}

function faqSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
}

function buildHtml(page) {
  const body = makeBody(page);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
${commonHead}
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="https://girgovalan.com/${page.slug}/">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <div id="site-header"></div>
  <div class="page-hero">
    <div class="container">
      <h1>${page.h1}</h1>
      <p>${page.intro}</p>
    </div>
  </div>
  <section>
    <div class="container article-content">
${body}
    </div>
  </section>
  <div id="site-footer"></div>
  <button class="scroll-top" aria-label="Back to top">↑</button>
  <script src="/js/urls.js"></script>
  <script src="/js/data.js"></script>
  <script src="/js/seo.js"></script>
  <script src="/js/components.js"></script>
  <script src="/js/app.js"></script>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: `https://girgovalan.com/${page.slug}/`,
    description: page.description,
    isPartOf: { '@type': 'WebSite', name: 'Gir Govalan', url: 'https://girgovalan.com/' },
    about: { '@id': `https://girgovalan.com/${page.slug}/#about` },
    inLanguage: 'en'
  })}</script>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `https://girgovalan.com/${page.slug}/#about`,
    name: `About ${page.region} Gir Cow Ghee Page`,
    url: `https://girgovalan.com/${page.slug}/`,
    mainEntity: { '@type': 'Product', name: 'Pure Organic A2 Gir Cow Bilona Ghee', brand: { '@type': 'Brand', name: 'Gir Govalan' } }
  })}</script>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://girgovalan.com/' },
      { '@type': 'ListItem', position: 2, name: 'International', item: `https://girgovalan.com/${page.slug}/` },
      { '@type': 'ListItem', position: 3, name: page.h1, item: `https://girgovalan.com/${page.slug}/` }
    ]
  })}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema(page))}</script>
</body>
</html>`;
}

function wordCount(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

for (const page of pages) {
  const html = buildHtml(page);
  const words = wordCount(html);
  if (words < 3000) {
    throw new Error(`${page.slug} below target: ${words} words`);
  }
  const file = path.join(root, page.slug, 'index.html');
  fs.writeFileSync(file, html);
  console.log(`${page.slug}: ${words} words`);
}
