/**
 * Build product pages with static Product JSON-LD + review snippets
 * matching the A2 milk SEO pattern.
 * Run: node scripts/build-product-seo-pages.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const code = fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.PRODUCTS = PRODUCTS;', ctx);

const SEO = {
  'pure-organic-a2-gir-cow-ghee': {
    seoTitle: 'Buy A2 Gir Cow Bilona Ghee Online | Pure Desi Ghee Gujarat — Gir Govalan',
    metaDescription:
      'Buy pure A2 Gir cow bilona ghee online from Gir Govalan, Gujarat. Curd-churned, single-ingredient desi ghee for daily cooking, tadka, and festival sweets. Free delivery above ₹999.',
    keywords:
      'buy A2 Gir cow ghee online, bilona ghee Gujarat, pure desi ghee, A2 bilona ghee, Gir cow ghee online India, authentic Gir ghee, hand churned ghee',
    h1: 'Pure A2 Gir Cow Bilona Ghee — Buy Online from Gujarat',
    intro:
      'Buy <strong>A2 Gir cow bilona ghee</strong> from Gir Govalan. Curd-churned from indigenous Gir cow milk in Gujarat — nutty aroma for dal tadka, paratha, and festival mithai.',
    bullets: [
      'Traditional bilona process — curd → churn → slow cook',
      'A2 protein milk from indigenous Gir cows',
      'Single ingredient — no blended vegetable fats',
      'Free delivery above ₹999 on eligible orders'
    ],
    related: [
      ['/products/a2-gir-milk/', 'A2 Gir cow milk'],
      ['/products/milk-peda/', 'milk peda'],
      ['/products/traditional-ladoo/', 'traditional ladoo']
    ]
  },
  'fresh-curd': {
    seoTitle: 'Fresh Curd (Dahi) from Gir Cow Milk | Buy Online — Gir Govalan',
    metaDescription:
      'Buy fresh thick curd (dahi) made from Gir cow milk at Gir Govalan. Creamy homemade-style dahi for thali, raita, and daily meals. Farm-fresh dairy from Gujarat.',
    keywords:
      'fresh curd online, Gir cow dahi, buy fresh dahi Gujarat, thick homemade curd, A2 milk curd, farm fresh dahi',
    h1: 'Fresh Curd (Dahi) from Gir Cow Milk',
    intro:
      'Buy <strong>fresh Gir cow curd (dahi)</strong> from Gir Govalan — thick, creamy, and made from the same farm milk families trust for chai and thali.',
    bullets: [
      'Made from pure Gir cow milk',
      'Thick set for Gujarati thali and raita',
      'No artificial thickeners',
      'Order with ghee or milk for combined delivery'
    ],
    related: [
      ['/products/a2-gir-milk/', 'A2 Gir cow milk'],
      ['/products/shrikhand/', 'shrikhand'],
      ['/products/pure-organic-a2-gir-cow-ghee/', 'bilona ghee']
    ]
  },
  'traditional-ladoo': {
    seoTitle: 'Traditional Ladoo with Bilona Ghee | Festival Sweets — Gir Govalan',
    metaDescription:
      'Buy traditional ladoo made with Gir Govalan bilona ghee. Homestyle festival mithai for Diwali, Raksha Bandhan, and gifting — authentic taste, not oily or overly sweet.',
    keywords:
      'traditional ladoo online, bilona ghee ladoo, festival sweets Gujarat, buy ladoo Diwali, desi ghee ladoo, Gir Govalan mithai',
    h1: 'Traditional Ladoo Made with Bilona Ghee',
    intro:
      'Order <strong>traditional ladoo</strong> prepared with Gir cow bilona ghee — festival mithai with real ghee aroma for gifting and family celebrations.',
    bullets: [
      'Made with Gir Govalan bilona ghee',
      'Homestyle texture — not oily or artificial',
      'Ideal for festivals and gift boxes',
      'Small-batch freshness from Gujarat'
    ],
    related: [
      ['/products/milk-peda/', 'milk peda'],
      ['/products/pure-organic-a2-gir-cow-ghee/', 'bilona ghee'],
      ['/products/shrikhand/', 'shrikhand']
    ]
  },
  'milk-peda': {
    seoTitle: 'Milk Peda from A2 Gir Cow Milk | Buy Online — Gir Govalan',
    metaDescription:
      'Buy soft milk peda handcrafted from A2 Gir cow milk and bilona ghee. Authentic Gujarati mithai for Diwali gifting and family sweets — small batches, pure taste.',
    keywords:
      'milk peda online, A2 milk peda, Gujarati peda, buy doodh peda, bilona ghee peda, Diwali mithai Gujarat',
    h1: 'Milk Peda from A2 Gir Cow Milk & Bilona Ghee',
    intro:
      'Buy <strong>milk peda</strong> handcrafted from pure A2 Gir cow milk and our bilona ghee — soft, rich, and naturally sweet traditional Gujarati mithai.',
    bullets: [
      'Made from A2 Gir cow milk',
      'Finished with Gir Govalan bilona ghee',
      'Soft grainy texture — not overly sweet',
      'Popular for Diwali and family gifting'
    ],
    related: [
      ['/products/traditional-ladoo/', 'traditional ladoo'],
      ['/products/a2-gir-milk/', 'A2 Gir cow milk'],
      ['/products/pure-organic-a2-gir-cow-ghee/', 'bilona ghee']
    ]
  },
  shrikhand: {
    seoTitle: 'Shrikhand from Hung Curd | Gujarati Sweet — Gir Govalan',
    metaDescription:
      'Buy creamy Gujarati shrikhand made from hung curd at Gir Govalan. Natural sweetness for puri, festivals, and weekend thali — farm dairy tradition from Gujarat.',
    keywords:
      'buy shrikhand online, Gujarati shrikhand, hung curd sweet, fresh shrikhand Gujarat, homemade style shrikhand',
    h1: 'Creamy Gujarati Shrikhand',
    intro:
      'Order <strong>creamy shrikhand</strong> made from hung curd with natural flavours — the Gujarati classic for puri, festivals, and weekend meals.',
    bullets: [
      'Hung-curd base with natural sweetness',
      'Homemade-style creamy texture',
      'Pairs with puri and festival thali',
      'Order with fresh curd from the same farm'
    ],
    related: [
      ['/products/fresh-curd/', 'fresh curd'],
      ['/products/milk-peda/', 'milk peda'],
      ['/products/a2-gir-milk/', 'A2 Gir cow milk']
    ]
  }
};

function absImg(src) {
  if (!src) return 'https://www.girgovalan.com/images/gir-govalan-farm-landscape-gujarat.jpg';
  if (src.startsWith('http')) return src;
  return 'https://www.girgovalan.com' + src;
}

function buildPage(p, seo) {
  const url = `https://www.girgovalan.com/products/${p.id}/`;
  const ratingValue = (p.rating || 5).toFixed(1);
  const reviewCount = String(p.reviewCount || (p.reviews || []).length || 1);
  const reviews = (p.reviews || []).slice(0, 2);
  const reviewSchema = reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    datePublished: r.date,
    reviewBody: r.body,
    name: `Review by ${r.author}`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(r.rating || 5),
      bestRating: '5',
      worstRating: '1'
    }
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: seo.metaDescription,
    image: absImg(p.image),
    brand: { '@type': 'Brand', name: 'Gir Govalan' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      price: String(p.price),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Gir Govalan' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'INR' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 7,
            unitCode: 'DAY'
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      ratingCount: reviewCount,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviewSchema
  };

  const bullets = seo.bullets.map((b) => `          <li>${b}</li>`).join('\n');
  const quotes = reviews
    .map(
      (r) =>
        `        <blockquote><p>${r.body}</p><footer>— ${r.author}${r.role ? ', ' + r.role : ''}</footer></blockquote>`
    )
    .join('\n');
  const related = seo.related
    .map(([href, label]) => `<a href="${href}">${label}</a>`)
    .join(' and ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-X9CF28C02R"></script>
  <script src="/js/gtag.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seo.seoTitle}</title>
  <meta name="description" content="${seo.metaDescription}">
  <meta name="keywords" content="${seo.keywords}">
  <link rel="canonical" href="${url}">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <div id="site-header"></div>
  <section class="product-page-section">
    <div id="product-root">
      <article class="container article-content product-static-fallback">
        <h1>${seo.h1}</h1>
        <p>${seo.intro}</p>
        <p><strong>Customer rating:</strong> ${ratingValue} out of 5 from ${reviewCount} reviews.</p>
        <h2>Why families choose Gir Govalan</h2>
        <ul>
${bullets}
        </ul>
        <h2>Customer reviews</h2>
${quotes}
        <p><a href="/pages/contact/">Contact us</a> or order via WhatsApp. Also explore ${related}.</p>
      </article>
    </div>
  </section>
  <section class="bg-cream">
    <div class="container-wide">
      <div class="section-title"><h2>You may also like</h2></div>
      <div class="products-grid products-grid--catalog" id="related-products"></div>
    </div>
  </section>
  <div id="site-footer"></div>
  <button class="scroll-top" aria-label="Back to top">↑</button>
  <script src="/js/urls.js"></script>
  <script src="/js/data.js"></script>
  <script src="/js/seo.js"></script>
  <script src="/js/components.js"></script>
  <script src="/js/app.js"></script>
  <script src="/js/product-page.js"></script>
</body>
</html>
`;
}

// Patch data.js SEO fields
let data = fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8');
for (const [id, seo] of Object.entries(SEO)) {
  const re = new RegExp(
    `(id:\\s*'${id}',\\s*\\n\\s*name:\\s*'[^']*',\\s*\\n\\s*vendor:\\s*'[^']*',)`,
    'm'
  );
  if (!re.test(data)) {
    console.warn('pattern miss', id);
    continue;
  }
  if (data.includes(`id: '${id}'`) && data.match(new RegExp(`id: '${id}'[\\s\\S]{0,200}seoTitle:`))) {
    console.log('seo already present', id);
    continue;
  }
  data = data.replace(
    re,
    `$1\n    seoTitle: ${JSON.stringify(seo.seoTitle)},\n    metaDescription: ${JSON.stringify(seo.metaDescription)},\n    keywords: ${JSON.stringify(seo.keywords)},`
  );
  console.log('patched data.js', id);
}
fs.writeFileSync(path.join(ROOT, 'js/data.js'), data);

for (const p of ctx.PRODUCTS) {
  if (p.id === 'a2-gir-milk') continue; // already best-in-class
  const seo = SEO[p.id];
  if (!seo) continue;
  const dir = path.join(ROOT, 'products', p.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(p, seo));
  console.log('wrote', p.id);
}
