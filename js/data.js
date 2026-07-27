/* Gir Govalan — site content (from original Shopify theme) */
const CDN = 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files';
const IMG_PRODUCTS = '/images/products';

function productImg(filename) {
  return `${IMG_PRODUCTS}/${encodeURIComponent(filename)}`;
}

function homeImg(filename) {
  return `/images/${encodeURIComponent(filename)}`;
}

const HOME_IMAGES = {
  gheeProcessJourney: homeImg('Gir Govalan ghee process.png')
};

const SITE = {
  name: 'Gir Govalan',
  tagline: 'Rooted in Heritage. Blessed with Purity.',
  email: 'info@girgovalan.com',
  phone: '+91 93282 89550',
  whatsapp: '919328289550',
  address: 'Gir, Gujarat, India',
  social: {
    facebook: 'https://www.facebook.com/GirGovalan/',
    instagram: 'https://www.instagram.com/girgovalan/',
    youtube: 'https://www.youtube.com/@GirGovalan',
    twitter: 'https://twitter.com/GirGovalan',
    linkedin: 'https://www.linkedin.com/company/girgovalan/',
    pinterest: 'https://in.pinterest.com/girgovalan/'
  },
  logo: `${CDN}/png_logo.png`,
  logoWidth: 300,
  logoFooter: `${CDN}/png_logo.png`,
  footerImageDesktop: `${CDN}/footer_image_1_home_page.png?v=1676397932`,
  footerImageMobile: `${CDN}/footer_image_2_Mobile_view.png?v=1676397930`,
  decor: `${CDN}/Vector.svg`,
  heroImage: `${CDN}/2.jpg`,
  colors: {
    accent1: '#7b5495',
    accent2: '#faefc6',
    bg1: '#fcfcfc',
    bg2: '#f6f3ee',
    text: '#000000'
  }
};

/* Product photos — currently using available local files in images/products/ */
const PRODUCT_IMAGES = {
  gheeJarPhoto: productImg('gir-govalan-ghee-jar.png'),
  gheeBilonaProcess: productImg('bilona-ghee-process.png'),
  gheeBoilingMakhan: productImg('boiling-makhan-ghee.png'),
  gheeMilkingCow: productImg('milking-gir-cow.png'),
  gheeCaringCow: productImg('caring-gir-cow.png'),
  gheeHero: productImg('gir-govalan-ghee-jar.png'),
  gheeJar: productImg('gir-govalan-ghee-jar.png'),
  gheeJar2: productImg('bilona-ghee-process.png'),
  gheeBilona: productImg('boiling-makhan-ghee.png'),
  gheeAlt1: productImg('milking-gir-cow.png'),
  gheeAlt2: productImg('caring-gir-cow.png'),
  gheeAlt3: productImg('Gir Govalan Packaging.jpeg'),
  milk: productImg('a2-gir-milk.jpg'),
  curd: productImg('fresh-curd.jpg'),
  ladoo: productImg('traditional-ladoo.jpg'),
  peda: productImg('milk-peda.jpg'),
  shrikhand: productImg('shrikhand.jpg'),
  almonds: 'https://images.unsplash.com/photo-1508747703725-f2f5e0f3974b?w=800&q=85',
  dryFruits: 'https://images.unsplash.com/photo-1599594001899-afa833055e28?w=800&q=85'
};

const CATEGORIES = [
  { id: 'ghee', title: 'Ghee', icon: `${CDN}/clean-GHEE-icon.jpg`, url: '/collections/all/?category=ghee' },
  { id: 'dairy', title: 'Dairy', icon: `${CDN}/girgovalan__DAIRY_icon_729cc151-5743-466c-b219-d727fb6e089e.png`, url: '/collections/all/?category=dairy' },
  { id: 'sweets', title: 'Desserts', icon: `${CDN}/girgovalan__DESSERTS_icon_9c2b61f0-1076-4fc1-aef1-f6359de9c8d0.png`, url: '/collections/all/?category=sweets' },
  { id: 'seeds-nuts', title: 'Seeds & Nuts', icon: `${CDN}/girgovalan__SEED_NUTS_icon_70bea663-b2f9-4021-b14a-4bc4d23c7294.png`, url: '/collections/all/?category=seeds-nuts' }
];

const PRODUCTS = [
  {
    id: 'pure-organic-a2-gir-cow-ghee',
    name: 'Pure Organic A2 Gir Cow Bilona Ghee',
    vendor: 'Gir Govalan',
    price: 1300,
    compareAt: 1399,
    category: 'ghee',
    imageStyle: 'fill',
    imageFocus: 'center',
    image: PRODUCT_IMAGES.gheeJarPhoto,
    images: [
      PRODUCT_IMAGES.gheeJarPhoto,
      PRODUCT_IMAGES.gheeBilonaProcess,
      PRODUCT_IMAGES.gheeBoilingMakhan,
      PRODUCT_IMAGES.gheeMilkingCow,
      PRODUCT_IMAGES.gheeCaringCow
    ],
    rating: 5,
    featured: true,
    reviewCount: 130,
    reviews: [
      { author: 'Priya Sharma', role: 'Home Chef', date: '2025-11-12', rating: 5, body: 'The bilona aroma is real — not like store ghee. We use it daily for dal and paratha.' },
      { author: 'Rajesh Kumar', role: 'Food Blogger', date: '2025-10-03', rating: 5, body: 'Authentic Gir cow ghee with a rich nutty finish. On our third repeat order for the 1 litre jar.' }
    ],
    features: ['Curd-Churned Bilona', 'Pasture-Raised Gir Cows', 'Single-Ingredient Purity'],
    description: 'Slow-cooked desi ghee from A2 Gir cow milk, prepared the Vedic way — curd first, then bilona-churned butter, then clarified over a gentle flame for a deep aroma and clean finish.',
    tabLabels: {
      description: 'About This Ghee',
      ingredients: 'What\'s Inside',
      benefits: 'Why Families Choose It',
      storage: 'Storage & Shelf Life',
      faq: 'Questions & Answers'
    },
    tabs: {
      description: `<p><strong>Gir Govalan Pure A2 Gir Cow Bilona Ghee</strong> is made the way Indian households have trusted for generations: whole milk is set into curd, churned into fresh butter, and simmered until only clear golden ghee remains. We never start from cream — the full bilona path is what gives this ghee its character.</p>
<p>Our cows belong to the Gir breed, native to the forests and grasslands of Gujarat. They are cared for by pastoral families who know these animals by name. The milk travels a short path from herd to kitchen, so every jar reflects the region it comes from.</p>
<p>We work in modest batches because ghee is not a commodity to us — it is food for daily rotis, festive sweets, and the quiet ritual of a well-made tadka. That is the standard we pack into every bottle.</p>`,
      ingredients: `<p>One ingredient only: <strong>clarified butter (ghee)</strong> obtained from A2 Gir cow milk through the traditional curd-and-bilona process.</p>
<ul>
<li>No added salt, sugar, or flavouring</li>
<li>No artificial colours or stabilisers</li>
<li>No blending with vegetable fats</li>
</ul>`,
      benefits: `<ul class="check-list">
<li>High smoke point — suited for frying, roasting, and everyday Indian cooking</li>
<li>Natural nutty aroma from slow clarification, not factory deodorising</li>
<li>A2 Gir cow milk base — a choice many families prefer for daily diets</li>
<li>Contains naturally occurring fat-soluble vitamins</li>
<li>Works well for parathas, dal, khichdi, halwa, and Ayurvedic home remedies</li>
</ul>`,
      storage: `<p>Store the jar tightly closed in a cool, dry cupboard. Keep away from heat and direct sun. Always use a clean, dry spoon.</p>
<p>When stored correctly, the ghee stays good for up to 12 months from packing. Refrigeration is optional; at room temperature it should remain grain-free and pleasant-smelling.</p>`,
      faq: `<div class="product-faq">
<h3>What is A2 Gir Cow Ghee?</h3>
<p>A2 Gir Cow Ghee is clarified butter made from milk of indigenous Gir cows that naturally produce A2 protein milk. At Gir Govalan, it is made using the traditional curd-churned bilona process.</p>
<h3>How long does ghee stay fresh?</h3>
<p>When stored in a cool, dry place with a clean dry spoon, our ghee stays fresh for up to 12 months from packing.</p>
<h3>What is bilona ghee?</h3>
<p>Bilona ghee is prepared from cultured curd, not direct cream. The curd is churned to separate butter, and that butter is cooked down into ghee. It takes longer and uses more milk, which is why true bilona ghee has a fuller taste.</p>
<h3>How is Gir Govalan ghee different from regular store ghee?</h3>
<p>We use indigenous Gir cow milk, follow the curd-churned bilona route, and avoid shortcuts like cream-only processing or added chemicals. The result is a single-ingredient product with a pronounced desi aroma.</p>
<h3>How is bilona ghee different from regular ghee?</h3>
<p>Regular ghee is often cream-based and industrially processed. Bilona ghee follows milk to curd to hand-churned butter to slow-cooked ghee, delivering richer aroma and traditional authenticity.</p>
<h3>Which size should I buy?</h3>
<p>250 ml suits first-time buyers or small households. 500 ml and 1 litre are popular for regular cooking. The 5 litre pack works well for joint families, caterers, or monthly stocking.</p>
<h3>Can I order from abroad?</h3>
<p>Yes. Message us on WhatsApp with your country and pin code — we will confirm whether we can ship to your address and share the final cost.</p>
</div>`
    },
    longDescription: `<div class="product-details-intro">
<h2>Authentic A2 Gir Cow Bilona Ghee from Gujarat</h2>
<p>Gir Govalan ghee is rooted in the Gir region’s pastoral heritage — where Maldhari communities have lived alongside indigenous cattle for centuries. Our process respects that lineage: patient churning, slow cooking, and zero compromise on what goes into the jar.</p>
</div>
<h2>The Bilona Process, Step by Step</h2>
<ol>
<li>A2 Gir cow milk is cultured into thick curd.</li>
<li>Curd is churned with a wooden bilona to draw out butter.</li>
<li>Butter is heated slowly until water evaporates and pure ghee remains.</li>
<li>The ghee is filtered, rested, and packed while still aromatic.</li>
</ol>
<h2>Good to Know</h2>
<ul class="check-list">
<li>100% A2 Gir cow milk — no mixing with other breeds</li>
<li>Curd-based bilona — not industrial cream ghee</li>
<li>Batch-wise production for consistent quality</li>
<li>Transparent labelling — ghee only, nothing else</li>
</ul>
<h2>Why Choose Our Gir Cow Ghee?</h2>
<ul class="check-list">
<li>Traditional bilona method in every batch</li>
<li>Made from indigenous Gir cow milk</li>
<li>Farm sourced from Gir region, Gujarat</li>
<li>Fresh batch preparation with traceable quality</li>
</ul>
<h2>How Our Bilona Ghee Is Made</h2>
<p>We follow a four-step process: milk collection, curd setting, bilona churning, and slow clarification. This preserves aroma, texture, and purity expected from authentic desi ghee.</p>
<p class="product-tagline"><strong>Gir Govalan — Live Pure. Eat Pure.</strong></p>`,
    variants: [
      { label: '250ml', price: 725, compareAt: 799 },
      { label: '500ml', price: 1300, compareAt: 1399 },
      { label: '1L', price: 2500, compareAt: 2699 },
      { label: '5L', price: 12000, compareAt: 12999 }
    ]
  },
  {
    id: 'a2-gir-milk',
    name: 'A2 Gir Cow Milk',
    productSubtitle: '1 Litre/day',
    seoTitle: 'A2 Gir Cow Milk Surat — Fresh Farm Delivery | Gir Govalan',
    metaDescription: 'Buy fresh A2 Gir cow milk in Surat from Gir Govalan. Pure indigenous Gir breed milk with A2 protein — farm-sourced, hygienically packed, and delivered across Surat & Gujarat.',
    keywords: 'A2 Gir cow milk Surat, fresh milk delivery Surat, pure Gir cow milk Surat, A2 milk home delivery Surat, farm fresh milk Surat Gujarat, desi cow milk Surat, Gir cow milk near me Surat, A2 milk Mota Varachha Surat, milk delivery Varachha Katargam',
    vendor: 'Gir Govalan',
    price: 840,
    compareAt: 840,
    category: 'dairy',
    imageStyle: 'fill',
    imageFocus: 'center',
    image: PRODUCT_IMAGES.milk,
    images: [PRODUCT_IMAGES.milk],
    rating: 5,
    reviewCount: 118,
    reviews: [
      { author: 'Nidhi Shah', role: 'Adajan, Surat', date: '2026-06-20', rating: 5, body: 'Fresh A2 milk for our morning chai. Delivery to Adajan was smooth and the taste is proper desi.' },
      { author: 'Ketan Desai', role: 'Vesu, Surat', date: '2026-05-14', rating: 5, body: 'We switched from carton milk to Gir Govalan for home curd. Thick dahi every time.' }
    ],
    features: ['A2 Gir Cow Milk', 'Farm Fresh Quality', 'Surat & Gujarat Delivery', 'No Adulteration'],
    description: 'Fresh A2 Gir cow milk from indigenous Gir cows — hygienically handled and delivered with care from our Gujarat farm to homes in Surat and across the state.',
    tabLabels: {
      description: 'About This Milk',
      ingredients: 'What\'s Inside',
      benefits: 'Why Surat Families Choose It',
      delivery: 'Surat Delivery & Areas',
      faq: 'Questions & Answers'
    },
    tabs: {
      description: `<p><strong>Gir Govalan A2 Gir Cow Milk</strong> comes from indigenous Gir cows raised in the pastoral heartland of Gujarat — the same Gir region heritage that families in Surat have trusted for generations when they want pure, full-flavoured desi milk.</p>
<p>Unlike mass-market mixed-breed dairy, our milk carries naturally occurring <strong>A2 beta-casein protein</strong> from Gir cows. It is collected fresh, chilled quickly, and packed with hygiene standards suited for daily household use — for morning chai, children\'s glasses, curd setting at home, and traditional Gujarati cooking.</p>
<p>Many Surat households on Adajan, Vesu, Piplod, Athwa, Varachha, Mota Varachha, and Katargam routes order our milk when they want farm-linked purity instead of anonymous packaged cartons. We bridge village honesty with city convenience.</p>`,
      ingredients: `<p><strong>One ingredient:</strong> fresh milk from A2 Gir cows.</p>
<ul>
<li>No added water, powder, or preservatives</li>
<li>No artificial colours or flavours</li>
<li>No hormonal or antibiotic residues from irresponsible farming</li>
<li>Short farm-to-pack timeline for natural freshness</li>
</ul>
<p>Milk composition naturally includes protein, calcium, healthy fats, and vitamins — the way nature intended from indigenous Gir cattle.</p>`,
      benefits: `<ul class="check-list">
<li><strong>A2 protein milk</strong> — preferred by many Gujarati families for daily diets</li>
<li><strong>Rich, creamy taste</strong> — suited for chai, halwa, shrikhand, and home curd</li>
<li><strong>Indigenous Gir breed</strong> — adapted to Gujarat\'s climate and grazing</li>
<li><strong>Ethical cow care</strong> — pastoral farming, not industrial confinement</li>
<li><strong>Trusted for children & elders</strong> — a choice parents make for purity</li>
<li><strong>Pairs with our ghee & sweets</strong> — same Gir cow lineage across products</li>
</ul>`,
      delivery: `<p>We deliver <strong>A2 Gir cow milk across Surat</strong> and ship farm products throughout Gujarat. Surat city areas we commonly serve include:</p>
<ul>
<li>Adajan & Pal</li>
<li>Vesu & Bharthana</li>
<li>Piplod & City Light</li>
<li>Athwa & Ghod Dod Road</li>
<li>Varachha, Mota Varachha & Katargam</li>
<li>Udhna, Puna, and surrounding zones</li>
</ul>
<p>Orders are confirmed on WhatsApp with your area pin code and preferred quantity. Dispatch is typically within <strong>24–48 hours</strong>. Free delivery above ₹999 on combined orders.</p>
<p>Not in Surat? We also deliver across Gujarat and support enquiries from other cities on WhatsApp.</p>`,
      faq: `<div class="product-faq">
<h2>Frequently Asked Questions</h2>
<h3>Is Gir Govalan milk genuine A2 Gir cow milk?</h3>
<p>Yes. Our milk comes only from indigenous <strong>Gir cows</strong> — not Jersey, HF, or other crossbreeds. Gir cows naturally produce <strong>A2 beta-casein protein</strong> milk. Gir Govalan is rooted in Maldhari pastoral heritage from Aakolda, Amreli, in Gir country, where cattle care and milk quality have been a way of life for generations.</p>
<h3>Where do you deliver milk?</h3>
<p>We deliver <strong>A2 Gir cow milk across Surat</strong> — including Adajan, Vesu, Piplod, City Light, Athwa, Varachha, Mota Varachha, Katargam, Udhna, Puna, and surrounding areas. We also ship farm products throughout <strong>Gujarat</strong>. Share your pin code on WhatsApp and we will confirm delivery timing for your location.</p>
<h3>Is Gir Govalan milk pasteurised?</h3>
<p>Our milk is <strong>fresh farm milk</strong> — collected from the herd, filtered, chilled promptly, and hygienically packed for dispatch. It is not long-life UHT carton milk. Refrigerate immediately on delivery and consume within the use-by guidance on your pack. Many Surat households boil milk before use, as with traditional home dairy.</p>
<h3>Is milk available in pouch or glass bottle?</h3>
<p>Yes. Choose <strong>Pouch</strong> (Rs 100/ltr) or <strong>Glass Bottle</strong> (Rs 120/ltr) when ordering. Select <strong>7 litres</strong> (1 week) or <strong>31 litres</strong> (1 month) on a 1 litre/day plan, or enter a custom quantity between 1 and 31 litres.</p>
<h3>Are Gir cows given hormone or growth injections?</h3>
<p>No. We do not use hormonal or growth boosters to push milk yield. Our Gir cows are raised under ethical pastoral care — open grazing, calm handling, and attention to animal health the Maldhari way, not industrial factory farming.</p>
<h3>What are your Gir cows fed?</h3>
<p>Our cows graze on natural grasslands and seasonal vegetation in the Gir region, supplemented with clean farm feed where needed. They are nourished without the heavy industrial feed regimes common in high-volume dairies — healthy cows, honest milk.</p>
<h3>What is the difference between A1 and A2 milk?</h3>
<p>Milk protein includes beta-casein. <strong>A2 milk</strong> contains the A2 type — found naturally in indigenous Indian breeds like Gir. Many commercial milks come from crossbred cows and may contain <strong>A1 protein</strong>, or a mix of A1 and A2. Surat families often prefer Gir A2 milk for chai, home curd, and daily drinking because it matches the desi milk tradition they grew up with.</p>
<h3>Is the milk packed fresh after milking?</h3>
<p>Yes. Milk moves through a short farm-to-pack chain — milking, chilling, and packing without long warehouse storage. Orders from Surat are typically dispatched within <strong>24–48 hours</strong> of confirmation so your household receives milk meant for daily use.</p>
<h3>Can I set curd at home with this milk?</h3>
<p>Yes. A2 Gir cow milk sets thick, creamy dahi — a reason many Gujarati households prefer indigenous breed milk. You can also order our ready-made <a href="/products/fresh-curd/">Fresh Curd (Dahi)</a> from the same farm.</p>
<h3>Is this milk suitable for children?</h3>
<p>Many parents in Surat choose A2 Gir cow milk for growing children. Always consult your paediatrician for infants and toddlers. Read our guide: <a href="/blogs/news/gir-cow-milk-for-toddlers/">Gir Cow Milk for Toddlers</a>.</p>
<h3>Do you add water, powder, or preservatives?</h3>
<p>No. Gir Govalan milk is pure Gir cow milk — no added water, milk powder, preservatives, or artificial ingredients.</p>
<h3>How do I place an order for Surat delivery?</h3>
<p>Add to cart on this page or tap Order on WhatsApp. Share your area, pin code, material (pouch or glass bottle), and litres needed. You can combine milk with our <a href="/products/pure-organic-a2-gir-cow-ghee/">bilona ghee</a> or sweets in one cart — free delivery above ₹999.</p>
<h3>How should I store the milk?</h3>
<p>Refrigerate at 4°C or below as soon as you receive it. Do not leave milk at room temperature for long in Surat\'s warm climate. Use within the period marked on your pack.</p>
</div>`
    },
    longDescription: `<div class="product-details-intro">
<h2>Fresh A2 Gir Cow Milk in Surat — Farm Purity for Your Family</h2>
<p>Surat is a city that loves good food — from morning chai and gathiya to festive mithai. The milk in your glass sets the tone for all of it. <strong>Gir Govalan A2 Gir Cow Milk</strong> brings indigenous Gir breed purity from Gujarat\'s pastoral heartland to households across Surat who want milk they can trust.</p>
<p>Whether you live in Vesu\'s apartment corridors, Adajan\'s family homes, or Varachha and Mota Varachha\'s busy neighbourhoods, our milk is for families who care about <em>what</em> goes into their kitchen — not just <em>how much</em> they pay per litre.</p>
</div>

<h2>Why Surat Families Are Switching to A2 Gir Cow Milk</h2>
<p>City milk aisles are full of cartons with long shelf life and unclear sourcing. Many Surat parents, grandparents, and health-conscious buyers now look for:</p>
<ul>
<li><strong>A2 protein</strong> from indigenous Gir cows — not mixed A1/A2 commodity milk</li>
<li><strong>Farm-linked traceability</strong> — knowing the brand and region behind the product</li>
<li><strong>Rich taste for chai and curd</strong> — the fuller flavour of desi cow milk</li>
<li><strong>Ethical pastoral farming</strong> — cows raised with care, not factory lines</li>
</ul>
<p>Gir Govalan was born in Aakolda, Amreli — in Gir country. That heritage is what we pack into every bottle of milk we send to Surat.</p>

<h2>A2 Milk vs Regular Milk — What Surat Buyers Should Know</h2>
<table class="product-compare-table">
<thead><tr><th>Factor</th><th>Gir Govalan A2 Milk</th><th>Typical Packaged Milk</th></tr></thead>
<tbody>
<tr><td>Source breed</td><td>Indigenous Gir cow</td><td>Often mixed / crossbred</td></tr>
<tr><td>Protein type</td><td>A2 beta-casein</td><td>A1, A2, or blended</td></tr>
<tr><td>Supply chain</td><td>Short farm-to-home</td><td>Long industrial chain</td></tr>
<tr><td>Traditional use</td><td>Chai, curd, sweets, kids</td><td>Generic consumption</td></tr>
<tr><td>Origin transparency</td><td>Named Gujarat farm brand</td><td>Often unclear</td></tr>
</tbody>
</table>

<h2>Surat Areas We Deliver To</h2>
<p>We deliver A2 Gir cow milk across Surat city and surrounding zones. Common delivery areas include:</p>
<ul>
<li><strong>West Surat:</strong> Adajan, Pal, Rander, Jahangirpura</li>
<li><strong>South Surat:</strong> Vesu, Bharthana, Magdalla, Piplod</li>
<li><strong>Central Surat:</strong> Athwa, Ghod Dod Road, City Light, Parle Point</li>
<li><strong>East Surat:</strong> Varachha, Mota Varachha, Katargam, Udhna, Pandesara</li>
<li><strong>North Surat:</strong> Puna, Dindoli, Limbayat</li>
</ul>
<p>Share your pin code on WhatsApp — we confirm delivery availability for your exact location in Surat.</p>

<h2>How We Handle Milk — From Gir Farm to Surat Home</h2>
<ol>
<li>Gir cows graze and are milked under hygienic farm supervision.</li>
<li>Milk is filtered, chilled, and packed quickly to protect freshness.</li>
<li>Orders from Surat are dispatched within 24–48 hours of confirmation.</li>
<li>WhatsApp support helps with quantity, repeat orders, and combined ghee or sweet purchases.</li>
</ol>

<h2>Perfect For Daily Surat Kitchens</h2>
<ul class="check-list">
<li>Morning chai with a creamy, full taste</li>
<li>Setting thick dahi for Gujarati thali meals</li>
<li>Children\'s daily glass of milk</li>
<li>Making halwa, kheer, and festival sweets at home</li>
<li>Pairing with Gir Govalan <a href="/products/pure-organic-a2-gir-cow-ghee/">bilona ghee</a> for authentic cooking</li>
</ul>

<h2>Related Reading</h2>
<ul>
<li><a href="/blogs/news/gir-cow-milk-for-toddlers/">Gir Cow Milk for Toddlers — What Parents Should Know</a></li>
<li><a href="/blogs/news/a2-milk-lactose-digestion/">A2 Milk and Digestion — Why Families Prefer Gir Cow Milk</a></li>
<li><a href="/blogs/news/gir-cow-vs-jersey-cow-milk/">Gir Cow vs Jersey Cow Milk — Key Differences</a></li>
<li><a href="/blogs/news/fresh-milk-delivery-vs-packaged/">Fresh Farm Milk vs Packaged Milk</a></li>
</ul>`,
    variants: [
      { label: 'Pouch · 7 Litres', price: 700 },
      { label: 'Glass Bottle · 7 Litres', price: 840 },
      { label: 'Pouch · 31 Litres', price: 3100 },
      { label: 'Glass Bottle · 31 Litres', price: 3720 }
    ],
    variantPricing: {
      rates: { pouch: 100, glass: 120 },
      litrePresets: [
        { litres: 7, hint: '1 week · 1 ltr/day' },
        { litres: 31, hint: '1 month · 1 ltr/day' }
      ],
      customLitres: { min: 1, max: 31 },
      default: { material: 'glass', litres: 7 }
    },
    deliveryCheck: true
  },
  {
    id: 'fresh-curd',
    name: 'Fresh Curd (Dahi)',
    vendor: 'Gir Govalan',
    price: 150,
    compareAt: 165,
    category: 'dairy',
    imageStyle: 'fill',
    imageFocus: 'center',
    image: PRODUCT_IMAGES.curd,
    images: [PRODUCT_IMAGES.curd],
    rating: 5,
    reviewCount: 105,
    reviews: [
      { author: 'Meera Patel', role: 'Homemaker', date: '2025-12-08', rating: 5, body: 'Creamy curd from the same farm as their ghee. Sets well and tastes fresh.' },
      { author: 'Anita Joshi', role: 'Rajkot', date: '2025-09-22', rating: 5, body: 'Good thickness for Gujarati thali. We order with ghee every month.' }
    ],
    description: 'Thick, creamy curd made from pure Gir cow milk using traditional methods.',
    variants: [
      { label: '500g', price: 80, compareAt: 89 },
      { label: '1kg', price: 150, compareAt: 165 }
    ]
  },
  {
    id: 'traditional-ladoo',
    name: 'Traditional Ladoo',
    vendor: 'Gir Govalan',
    price: 349,
    compareAt: 379,
    category: 'sweets',
    image: PRODUCT_IMAGES.ladoo,
    images: [PRODUCT_IMAGES.ladoo],
    rating: 5,
    reviewCount: 112,
    reviews: [
      { author: 'Harsha Mehta', role: 'Surat', date: '2025-10-18', rating: 5, body: 'Festival ladoos with real ghee taste — not oily or overly sweet.' },
      { author: 'Vikram Singh', role: 'Ahmedabad', date: '2025-08-30', rating: 5, body: 'Ordered for Raksha Bandhan gifting. Family loved the texture and aroma.' }
    ],
    description: 'Homestyle ladoos prepared with our Gir cow ghee for authentic taste and richness.'
  },
  {
    id: 'milk-peda',
    name: 'Milk Peda',
    vendor: 'Gir Govalan',
    price: 650,
    compareAt: 699,
    category: 'sweets',
    imageStyle: 'fill',
    imageFocus: 'center',
    image: PRODUCT_IMAGES.peda,
    images: [PRODUCT_IMAGES.peda],
    rating: 5,
    featured: true,
    reviewCount: 142,
    reviews: [
      { author: 'Divya Rana', role: 'Mumbai', date: '2025-11-25', rating: 5, body: 'Soft peda with real milk flavour — perfect for Diwali gifting.' },
      { author: 'Suresh Parmar', role: 'Vadodara', date: '2025-09-10', rating: 5, body: 'Not too sweet, fresh batch taste. Kids finished the box in two days.' }
    ],
    description: 'Gir Govalan Milk Peda is handcrafted from pure A2 Gir cow milk and our traditional bilona ghee. Soft, rich, and naturally sweet — a classic Indian mithai made in small batches for authentic taste and freshness.',
    longDescription: `<div class="product-details-intro">
<h2>Premium Milk Peda Made from Pure A2 Gir Cow Milk</h2>
<p>Gir Govalan Milk Peda is handcrafted from the milk of indigenous Gir cows and prepared using time-honoured methods passed down through generations. Each peda is slow-cooked to a rich, creamy texture with a delicate sweetness and the unmistakable aroma of pure desi milk.</p>
<p>Our Milk Peda is made in small batches to maintain freshness, quality, and the authentic taste of traditional Gujarati mithai.</p>
</div>

<h2>What is Milk Peda?</h2>
<p>Milk Peda (also known as Doodh Peda or Penda) is one of India's most beloved traditional sweets. Made primarily from reduced milk (khoya or mawa), sugar, and ghee, peda has a soft, grainy texture and a rich milky flavour that melts in the mouth.</p>
<p>Unlike mass-produced sweets, Gir Govalan Milk Peda is prepared using pure A2 Gir cow milk and our own bilona ghee — preserving the authentic taste that Indian households have cherished for centuries.</p>

<h2>Our Traditional Preparation</h2>
<p>Gir Govalan Milk Peda follows a careful, time-tested process to deliver superior taste and texture.</p>
<h3>Our Process</h3>
<ol>
<li>Fresh A2 Gir Cow Milk is collected from our farm.</li>
<li>Milk is slowly reduced to rich, creamy khoya (mawa).</li>
<li>Pure Gir Govalan bilona ghee and natural ingredients are added.</li>
<li>The mixture is hand-kneaded and shaped into classic peda rounds.</li>
<li>Each batch is prepared fresh in small quantities for optimal quality.</li>
</ol>
<p>This traditional method requires patience and skill, resulting in pedas with a richer taste and smoother texture than factory-made alternatives.</p>

<h2>Why Choose Gir Govalan Milk Peda?</h2>
<h3>Made from A2 Gir Cow Milk</h3>
<p>Prepared exclusively from the milk of indigenous Gir cows, known for naturally occurring A2 protein and rich, creamy quality.</p>
<h3>Prepared with Bilona Ghee</h3>
<p>Enhanced with our own traditional bilona ghee for authentic aroma, depth of flavour, and a truly homestyle taste.</p>
<h3>Handcrafted in Small Batches</h3>
<p>Every batch is made fresh in limited quantities to ensure quality, consistency, and natural freshness.</p>
<h3>Classic Homestyle Taste</h3>
<p>Soft, melt-in-the-mouth texture with balanced sweetness — just like pedas made in traditional Gujarati kitchens.</p>
<h3>No Artificial Additives</h3>
<ul class="check-list">
<li>No Preservatives</li>
<li>No Artificial Colors</li>
<li>No Artificial Flavors</li>
<li>No Adulteration</li>
</ul>

<h2>Nutritional Highlights</h2>
<p>Gir Govalan Milk Peda is a wholesome traditional sweet made from pure milk-based ingredients.</p>
<p>It naturally contains:</p>
<ul>
<li>Milk proteins and calcium from A2 Gir cow milk</li>
<li>Healthy fats from bilona ghee</li>
<li>Natural milk sugars</li>
<li>Essential nutrients from pure, unadulterated ingredients</li>
</ul>
<p>Enjoyed in moderation, Milk Peda is a cherished part of festive celebrations and everyday indulgence in Indian culture.</p>

<h2>Perfect For</h2>
<p>Gir Govalan Milk Peda is ideal for:</p>
<ul>
<li>Festivals and celebrations (Diwali, Raksha Bandhan, weddings)</li>
<li>Prasad and religious offerings</li>
<li>Gifting to family and friends</li>
<li>Tea-time snacks and sweet cravings</li>
<li>Traditional Gujarati gatherings</li>
<li>Children and elders who love authentic mithai</li>
</ul>

<h2>Commitment to Purity</h2>
<p>At Gir Govalan, we focus on:</p>
<ul>
<li>Traditional sweet-making methods</li>
<li>Ethical cow care and pure A2 milk sourcing</li>
<li>Small-batch, fresh preparation</li>
<li>No shortcuts or artificial enhancers</li>
<li>Authentic taste rooted in Gir heritage</li>
</ul>
<p>Every peda reflects our commitment to purity, tradition, and the love we put into every product from our farm.</p>

<h2>Frequently Asked Questions</h2>
<div class="product-faq">
<h3>What is the difference between peda and penda?</h3>
<p>Peda and penda refer to the same traditional Indian milk sweet. The spelling varies by region — both names describe the classic soft, round milk fudge enjoyed across Gujarat and India.</p>
<h3>Is Gir Govalan Milk Peda made from A2 Gir cow milk?</h3>
<p>Yes. Our Milk Peda is prepared from pure A2 Gir cow milk sourced from indigenous Gir cows raised with care on our farm.</p>
<h3>Does Milk Peda contain preservatives?</h3>
<p>No. Gir Govalan Milk Peda contains no artificial preservatives, colors, or flavors. We recommend storing in a cool, dry place and consuming within the recommended freshness period.</p>
<h3>Can I order Milk Peda for festivals and gifting?</h3>
<p>Absolutely. Milk Peda is one of our most popular sweets for festivals, celebrations, and gifting. Contact us via WhatsApp for bulk or custom orders.</p>
</div>

<h2>Experience Authentic Tradition</h2>
<p>Bring home the sweetness of traditional Gujarati mithai with Gir Govalan Milk Peda. Crafted from pure A2 Gir Cow Milk and our bilona ghee, every bite delivers the warmth, richness, and timeless flavour of homestyle Indian sweets.</p>
<p class="product-tagline"><strong>Gir Govalan – Pure Tradition. Pure Sweetness. Pure Peda.</strong></p>`,
    variants: [
      { label: '500g', price: 650, compareAt: 699 },
      { label: '1kg', price: 1200, compareAt: 1299 }
    ]
  },
  {
    id: 'shrikhand',
    name: 'Shrikhand',
    vendor: 'Gir Govalan',
    price: 299,
    compareAt: 329,
    category: 'sweets',
    image: PRODUCT_IMAGES.shrikhand,
    images: [PRODUCT_IMAGES.shrikhand],
    rating: 4,
    reviewCount: 108,
    reviews: [
      { author: 'Pooja Desai', role: 'Surat', date: '2025-10-05', rating: 4, body: 'Creamy shrikhand with natural sweetness. Good with puri on weekends.' },
      { author: 'Rahul Trivedi', role: 'Gandhinagar', date: '2025-07-19', rating: 5, body: 'Tastes like homemade shrikhand. We pair it with their fresh curd orders.' }
    ],
    description: 'Creamy Gujarati shrikhand made from hung curd and natural flavours.'
  }
];

const FEATURED_VIDEOS = [
  {
    id: 'gir-govalan-ghee-process',
    title: 'How We Make Bilona Ghee',
    seoTitle: 'How We Make Bilona Ghee',
description: 'From A2 Gir cow milk to pure golden ghee — see the traditional bilona process at Gir Govalan.',
    src: '/Videos/gir-govalan-ghee-process.mp4',
    poster: PRODUCT_IMAGES.gheeBilonaProcess
  }
];

const TESTIMONIALS = [
  {
    text: 'Gir Cow Ghee has been a game-changer in my kitchen! The rich aroma and exceptional taste of their ghee elevate every dish I prepare. Not only does it add a delightful flavor, but I also appreciate its purity and quality. Highly recommended!',
    author: 'Priya Sharma',
    role: 'Home Chef'
  },
  {
    text: "Switching to Gir Cow Ghee has been a revelation for me. The difference in taste and aroma compared to other ghees is remarkable. It's truly a taste of tradition and excellence in every spoonful.",
    author: 'Rajesh Kumar',
    role: 'Food Blogger'
  },
  {
    text: 'As a mother who takes pride in nurturing her family through wholesome cooking, Gir Cow Ghee has become my trusted ally in the kitchen. With Gir Cow Ghee, I can confidently serve meals filled with love and the goodness of pure, natural ingredients.',
    author: 'Meera Patel',
    role: 'Homemaker'
  }
];

const GALLERY = [
  { src: PRODUCT_IMAGES.gheeJarPhoto, alt: 'Gir Govalan A2 Gir Cow Bilona Ghee jar' },
  { src: PRODUCT_IMAGES.gheeBilonaProcess, alt: 'Traditional bilona ghee process — Gir Govalan' },
  { src: PRODUCT_IMAGES.gheeBoilingMakhan, alt: 'Hand-churned bilona ghee — Gir Govalan' },
  { src: PRODUCT_IMAGES.gheeMilkingCow, alt: 'Milking Gir cow — Gir Govalan farm' },
  { src: PRODUCT_IMAGES.gheeCaringCow, alt: 'Caring for Gir cows — Gir Govalan' },
  { src: `${CDN}/WhatsApp_Image_2025-03-16_at_11.06.35_AM.jpg`, alt: 'Our Gir cows' },
  { src: `${CDN}/2.jpg`, alt: 'Gir Govalan farm landscape' }
];

const BLOG_POSTS = [
  {
    slug: 'benefits-of-gir-cow-ghee',
    title: 'Benefits of Gir Cow Ghee for Your Daily Diet',
    seoTitle: 'Benefits of Gir Cow Ghee for Your Daily Diet',
date: '2025-03-10',
    image: '/images/blog/benefits-of-gir-cow-ghee.jpg',
    excerpt: 'Discover why A2 Gir cow ghee is prized in Ayurveda and everyday Indian cooking for nourishment and flavour.',
    metaDescription: 'Discover why A2 Gir cow ghee is prized in Ayurveda and everyday Indian cooking for nourishment and flavour.',
content: `<p>Discover why A2 Gir cow ghee is prized in Ayurveda and everyday Indian cooking for nourishment and flavour. If you are comparing jars online or in a store, ignore gold foil for a minute. This page walks through what actually changes flavour, trust, and value for benefits of gir cow ghee — in plain kitchen language, not brochure talk.</p>
<h2>Start with the real questions</h2>
<ol>
<li>Which cow breed supplied the milk?</li>
<li>Was the ghee made bilona-style (curd → churn → slow cook) or a faster cream route?</li>
<li>Is the ingredient list only ghee?</li>
<li>Can you message a person before you pay?</li>
<li>Does the seller show farm or process photos that look real?</li>
</ol>
<p>Those five answers matter more than buzzwords like “pure,” “premium,” or “organic-looking” packaging.</p>
<h2>Process and taste</h2>
<p>Bilona ghee takes more milk and more time. The aroma is usually deeper in tadka and sweets. Cream-only industrial ghee can still cook food — many homes use it — but families who grew up with desi ghee often notice a gap in smell and aftertaste within one meal.</p>
<p>Gir cow milk is part of that story when the brand is honest about breed. A jar that will not say which cow or which process is asking you to trust a label alone.</p>
<h2>How to judge a jar at home</h2>
<ul>
<li>Warm a spoon: nutty and clean is good; flat or chemical is a warning</li>
<li>Tadka test: spices should bloom, not just fry silently</li>
<li>Storage: dry spoon, tight lid, cool cupboard</li>
<li>Texture changes with weather are normal for pure ghee</li>
<li>Keep notes for a week — one good day of cooking tells more than a certificate photo</li>
</ul>
<h2>Buying and pack size</h2>
<p>First-time buyers often start with 500 ml. Daily cooks and festival bakers move to 1 litre. Bulk only makes sense if you store the jar well and finish it while it still smells fresh.</p>
<p>Compare price only after you compare process. A cheap jar that sits unused costs more than a smaller bilona jar you finish. Watch for blended fats, vague “cow ghee” claims, and shops that never reply to messages.</p>
<h2>Everyday kitchen uses</h2>
<p>Dal tadka, paratha, khichdi, halwa, children’s ghee rice, and guest kadhi all show the jar’s character. Use a measured spoon. Good ghee is not meant to drown the plate.</p>
<h2>Where Gir Govalan fits</h2>
<p>We make <a href="/products/pure-organic-a2-gir-cow-ghee/">A2 Gir Cow Bilona Ghee</a> from indigenous Gir cow milk using the curd-churned route. See the <a href="/pages/gallery/">farm gallery</a>, <a href="/#home-videos">process video</a>, and <a href="/pages/who-is-gir-govalan/">our story</a>.</p>
<p>Keep learning: <a href="/blogs/news/what-is-bilona-ghee/">what is bilona ghee</a> · <a href="/blogs/news/how-to-identify-pure-gir-cow-ghee/">how to identify pure ghee</a> · <a href="/blogs/news/bilona-ghee-vs-regular-ghee/">bilona vs regular</a> · <a href="/pages/contact/">order help</a>.</p>`
  },
  {
    slug: 'what-is-bilona-ghee',
    title: 'What Is Bilona Ghee and Why It Matters',
    seoTitle: 'What Is Bilona Ghee and Why It Matters',
date: '2025-02-18',
    image: '/images/blog/what-is-bilona-ghee.jpg',
    excerpt: 'Learn how the ancient bilona method turns A2 milk into the golden ghee your grandmother trusted.',
    metaDescription: 'Learn how the ancient bilona method turns A2 milk into the golden ghee your grandmother trusted.',
content: `<p>Learn how the ancient bilona method turns A2 milk into the golden ghee your grandmother trusted. If you are comparing jars online or in a store, ignore gold foil for a minute. This page walks through what actually changes flavour, trust, and value for what is bilona ghee — in plain kitchen language, not brochure talk.</p>
<h2>Start with the real questions</h2>
<ol>
<li>Which cow breed supplied the milk?</li>
<li>Was the ghee made bilona-style (curd → churn → slow cook) or a faster cream route?</li>
<li>Is the ingredient list only ghee?</li>
<li>Can you message a person before you pay?</li>
<li>Does the seller show farm or process photos that look real?</li>
</ol>
<p>Those five answers matter more than buzzwords like “pure,” “premium,” or “organic-looking” packaging.</p>
<h2>Process and taste</h2>
<p>Bilona ghee takes more milk and more time. The aroma is usually deeper in tadka and sweets. Cream-only industrial ghee can still cook food — many homes use it — but families who grew up with desi ghee often notice a gap in smell and aftertaste within one meal.</p>
<p>Gir cow milk is part of that story when the brand is honest about breed. A jar that will not say which cow or which process is asking you to trust a label alone.</p>
<h2>How to judge a jar at home</h2>
<ul>
<li>Warm a spoon: nutty and clean is good; flat or chemical is a warning</li>
<li>Tadka test: spices should bloom, not just fry silently</li>
<li>Storage: dry spoon, tight lid, cool cupboard</li>
<li>Texture changes with weather are normal for pure ghee</li>
<li>Keep notes for a week — one good day of cooking tells more than a certificate photo</li>
</ul>
<h2>Buying and pack size</h2>
<p>First-time buyers often start with 500 ml. Daily cooks and festival bakers move to 1 litre. Bulk only makes sense if you store the jar well and finish it while it still smells fresh.</p>
<p>Compare price only after you compare process. A cheap jar that sits unused costs more than a smaller bilona jar you finish. Watch for blended fats, vague “cow ghee” claims, and shops that never reply to messages.</p>
<h2>Everyday kitchen uses</h2>
<p>Dal tadka, paratha, khichdi, halwa, children’s ghee rice, and guest kadhi all show the jar’s character. Use a measured spoon. Good ghee is not meant to drown the plate.</p>
<h2>Where Gir Govalan fits</h2>
<p>We make <a href="/products/pure-organic-a2-gir-cow-ghee/">A2 Gir Cow Bilona Ghee</a> from indigenous Gir cow milk using the curd-churned route. See the <a href="/pages/gallery/">farm gallery</a>, <a href="/#home-videos">process video</a>, and <a href="/pages/who-is-gir-govalan/">our story</a>.</p>
<p>Keep learning: <a href="/blogs/news/what-is-bilona-ghee/">what is bilona ghee</a> · <a href="/blogs/news/how-to-identify-pure-gir-cow-ghee/">how to identify pure ghee</a> · <a href="/blogs/news/bilona-ghee-vs-regular-ghee/">bilona vs regular</a> · <a href="/pages/contact/">order help</a>.</p>`
  },
  {
    slug: 'know-your-gir-cow',
    title: 'Know Your Gir Cow — The Pride of Gujarat',
    seoTitle: 'Know Your Gir Cow — The Pride of Gujarat',
date: '2025-01-25',
    image: '/images/blog/know-your-gir-cow.jpg',
    excerpt: 'The indigenous Gir breed is known for rich A2 milk and resilience — the heart of our farm.',
    metaDescription: 'The indigenous Gir breed is known for rich A2 milk and resilience — the heart of our farm.',
content: `<p>The indigenous Gir breed is known for rich A2 milk and resilience — the heart of our farm. If you are comparing jars online or in a store, ignore gold foil for a minute. This page walks through what actually changes flavour, trust, and value for know your gir cow — in plain kitchen language, not brochure talk.</p>
<h2>Start with the real questions</h2>
<ol>
<li>Which cow breed supplied the milk?</li>
<li>Was the ghee made bilona-style (curd → churn → slow cook) or a faster cream route?</li>
<li>Is the ingredient list only ghee?</li>
<li>Can you message a person before you pay?</li>
<li>Does the seller show farm or process photos that look real?</li>
</ol>
<p>Those five answers matter more than buzzwords like “pure,” “premium,” or “organic-looking” packaging.</p>
<h2>Process and taste</h2>
<p>Bilona ghee takes more milk and more time. The aroma is usually deeper in tadka and sweets. Cream-only industrial ghee can still cook food — many homes use it — but families who grew up with desi ghee often notice a gap in smell and aftertaste within one meal.</p>
<p>Gir cow milk is part of that story when the brand is honest about breed. A jar that will not say which cow or which process is asking you to trust a label alone.</p>
<h2>How to judge a jar at home</h2>
<ul>
<li>Warm a spoon: nutty and clean is good; flat or chemical is a warning</li>
<li>Tadka test: spices should bloom, not just fry silently</li>
<li>Storage: dry spoon, tight lid, cool cupboard</li>
<li>Texture changes with weather are normal for pure ghee</li>
<li>Keep notes for a week — one good day of cooking tells more than a certificate photo</li>
</ul>
<h2>Buying and pack size</h2>
<p>First-time buyers often start with 500 ml. Daily cooks and festival bakers move to 1 litre. Bulk only makes sense if you store the jar well and finish it while it still smells fresh.</p>
<p>Compare price only after you compare process. A cheap jar that sits unused costs more than a smaller bilona jar you finish. Watch for blended fats, vague “cow ghee” claims, and shops that never reply to messages.</p>
<h2>Everyday kitchen uses</h2>
<p>Dal tadka, paratha, khichdi, halwa, children’s ghee rice, and guest kadhi all show the jar’s character. Use a measured spoon. Good ghee is not meant to drown the plate.</p>
<h2>Where Gir Govalan fits</h2>
<p>We make <a href="/products/pure-organic-a2-gir-cow-ghee/">A2 Gir Cow Bilona Ghee</a> from indigenous Gir cow milk using the curd-churned route. See the <a href="/pages/gallery/">farm gallery</a>, <a href="/#home-videos">process video</a>, and <a href="/pages/who-is-gir-govalan/">our story</a>.</p>
<p>Keep learning: <a href="/blogs/news/what-is-bilona-ghee/">what is bilona ghee</a> · <a href="/blogs/news/how-to-identify-pure-gir-cow-ghee/">how to identify pure ghee</a> · <a href="/blogs/news/bilona-ghee-vs-regular-ghee/">bilona vs regular</a> · <a href="/pages/contact/">order help</a>.</p>`
  },
  {
    slug: 'cooking-with-pure-ghee',
    title: 'Cooking with Pure Ghee — Tips from Our Kitchen',
    seoTitle: 'Cooking with Pure Ghee — Tips from Our Kitchen',
date: '2024-12-05',
    image: '/images/blog/cooking-with-pure-ghee.jpg',
    excerpt: 'From tadka to sweets, here is how to get the most from authentic Gir cow ghee in your recipes.',
    metaDescription: 'From tadka to sweets, here is how to get the most from authentic Gir cow ghee in your recipes.',
content: `<p>From tadka to sweets, here is how to get the most from authentic Gir cow ghee in your recipes. If you are comparing jars online or in a store, ignore gold foil for a minute. This page walks through what actually changes flavour, trust, and value for cooking with pure ghee — in plain kitchen language, not brochure talk.</p>
<h2>Start with the real questions</h2>
<ol>
<li>Which cow breed supplied the milk?</li>
<li>Was the ghee made bilona-style (curd → churn → slow cook) or a faster cream route?</li>
<li>Is the ingredient list only ghee?</li>
<li>Can you message a person before you pay?</li>
<li>Does the seller show farm or process photos that look real?</li>
</ol>
<p>Those five answers matter more than buzzwords like “pure,” “premium,” or “organic-looking” packaging.</p>
<h2>Process and taste</h2>
<p>Bilona ghee takes more milk and more time. The aroma is usually deeper in tadka and sweets. Cream-only industrial ghee can still cook food — many homes use it — but families who grew up with desi ghee often notice a gap in smell and aftertaste within one meal.</p>
<p>Gir cow milk is part of that story when the brand is honest about breed. A jar that will not say which cow or which process is asking you to trust a label alone.</p>
<h2>How to judge a jar at home</h2>
<ul>
<li>Warm a spoon: nutty and clean is good; flat or chemical is a warning</li>
<li>Tadka test: spices should bloom, not just fry silently</li>
<li>Storage: dry spoon, tight lid, cool cupboard</li>
<li>Texture changes with weather are normal for pure ghee</li>
<li>Keep notes for a week — one good day of cooking tells more than a certificate photo</li>
</ul>
<h2>Buying and pack size</h2>
<p>First-time buyers often start with 500 ml. Daily cooks and festival bakers move to 1 litre. Bulk only makes sense if you store the jar well and finish it while it still smells fresh.</p>
<p>Compare price only after you compare process. A cheap jar that sits unused costs more than a smaller bilona jar you finish. Watch for blended fats, vague “cow ghee” claims, and shops that never reply to messages.</p>
<h2>Everyday kitchen uses</h2>
<p>Dal tadka, paratha, khichdi, halwa, children’s ghee rice, and guest kadhi all show the jar’s character. Use a measured spoon. Good ghee is not meant to drown the plate.</p>
<h2>Where Gir Govalan fits</h2>
<p>We make <a href="/products/pure-organic-a2-gir-cow-ghee/">A2 Gir Cow Bilona Ghee</a> from indigenous Gir cow milk using the curd-churned route. See the <a href="/pages/gallery/">farm gallery</a>, <a href="/#home-videos">process video</a>, and <a href="/pages/who-is-gir-govalan/">our story</a>.</p>
<p>Keep learning: <a href="/blogs/news/what-is-bilona-ghee/">what is bilona ghee</a> · <a href="/blogs/news/how-to-identify-pure-gir-cow-ghee/">how to identify pure ghee</a> · <a href="/blogs/news/bilona-ghee-vs-regular-ghee/">bilona vs regular</a> · <a href="/pages/contact/">order help</a>.</p>`
  }
];

const PAGES = {
  about: {
    title: 'Who Is Gir Govalan',
    seoTitle: 'Who Is Gir Govalan',
hero: `${CDN}/WhatsApp_Image_2025-03-16_at_11.06.35_AM.jpg`,
    photoCaption: 'Gir Govalan real photo',
    sections: [
      {
        heading: 'Who is Gir Govalan?',
        body: `<p><strong>Gir Govalan (Jituben)</strong> was born in Aakolda Amreli, a small town in the Gir area. Unable to go to school since it was the custom in her community for girls not to attend school. Belonging to the Maldhari community, whose primary occupation involves caring for cows and animals. Our little home is tucked away in the area where the famous Asiatic lions reside. With more than 500 lions living in Saurashtra and in close proximity, conflicts with these majestic creatures are not uncommon.</p>
        <p>Despite the occasional clashes, we've developed strategies to safeguard our herds of cows and buffaloes. Our animals are well-trained to deter lions from entering and hunting. However, there are instances when lions manage to isolate and prey on a member of the herd right before our eyes. Witnessing this becomes a part of our daily routine, and the hunted prey serves as the lions' dinner.</p>
        <p>In such situations, we display resilience, coexisting with these magnificent beasts with smiles on our faces. When a lion targets a small calf, we don't allow it to consume the kill; instead, we swiftly retrieve and bury it, emphasizing our profound affection for our cattle, akin to our own children.</p>
        <p>Growing up in these unusual circumstances, I saw a large number of our community's families progressively move into cities. However, I chose a different path. Now, with three children of my own, we lead a content life engaged in farming and dairy business together. Both my boys are pursuing their studies, and as a family, we navigate life with gratitude and determination.</p>`
      },
      {
        heading: 'A New Life.',
        body: `<p>In 2019, we made a significant move to the city. The year 2020, marked by the challenges of the pandemic, saw my son completing his 10th standard. Unfortunately, his father succumbed to COVID-19, compelling me to step up and support my son in building resilience. To adapt to the changing times, he began working part-time. Reflecting on our traditional ways, we realized the necessity of transitioning to the online era. In a world dominated by laptops, we acknowledged the shift from 'lakdis' (sticks) to laptops and online platforms. This realization prompted the inception of Gir Govalan.</p>
        <p>Nestled in Gir, our hometown, <strong>'Gir Govalan'</strong> embodies the spirit of our community. The term <strong>'Govalan'</strong> refers to women who trade in milk and ghee. In navigating this new journey, we find strength in our roots and adapt to the contemporary landscape of online commerce and technology.</p>`
      },
      {
        heading: 'The Future and our aims.',
        body: `<p>Residing in the city presents distinct challenges compared to our hometown, particularly concerning the quality of milk. My son is dissatisfied with the milk available here. In our village, we have a tradition of freely distributing buttermilk to everyone, and any surplus is poured around the sweet neem tree. We've consistently provided pure milk, and often our customers send their children to collect deliveries. Observing the joy on their faces, we always provide extra milk because we believe in encouraging children to consume it. However, obtaining pure milk and ghee in the city has proven to be quite challenging in recent years but we make it possible with Gir Govalan.</p>
        <ul>
          <li>Enhancing access to affordable and high-quality milk and ghee.</li>
          <li>Ensuring ethical and responsible practices in all aspects of our service.</li>
          <li>Our commitment is to enrich lives through health-focused products that embody excellence and prioritize organic goodness.</li>
          <li>As we strive to be a global leader, our vision extends beyond products; we aspire to create a healthy environment, fostering a world where wellness thrives naturally.</li>
        </ul>`
      },
      {
        heading: 'Rooted in Heritage. Blessed with Purity.',
        body: `<p>At Gir Govalan, we honor the timeless legacy of Gir Cow Ghee, crafted the way nature intended. Born in the heart of the Gir region, our ghee is a testament to purity, tradition, and the unwavering care we give to our cows. Every drop is hand-churned using the ancient bilona method, nourished by organic practices, and steeped in ethical values. Join us in celebrating a healthier tomorrow — for you, our gentle Gir cows, and the earth we cherish.</p>`
      }
    ]
  },
  gallery: {
    title: 'Gallery',
    seoTitle: 'Gallery',
intro: 'A glimpse into our farm, our Gir cows, and the traditional craft of making pure bilona ghee.'
  },
  contact: {
    title: 'Contact Us',
    seoTitle: 'Contact Us',
intro: 'We would love to hear from you. Reach out for orders, wholesale enquiries, or any questions about our products.'
  }
};

function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

const HOME_PRODUCT_IDS = [
  'pure-organic-a2-gir-cow-ghee',
  'a2-gir-milk',
  'milk-peda',
  'fresh-curd'
];

function getHomeProducts() {
  return HOME_PRODUCT_IDS.map(id => getProduct(id)).filter(Boolean);
}

function getBlogPost(slug) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post || post.date > todayISO()) return null;
  return post;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function getPublishedBlogPosts() {
  const today = todayISO();
  return BLOG_POSTS
    .filter(p => p.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function getScheduledBlogPosts() {
  const today = todayISO();
  return BLOG_POSTS
    .filter(p => p.date > today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getCategoryLabel(id) {
  const map = { ghee: 'Ghee', dairy: 'Dairy Products', sweets: 'Traditional Sweets', 'seeds-nuts': 'Seeds & Nuts', all: 'All Products' };
  return map[id] || id;
}
