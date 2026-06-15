/* Gir Govalan — site content (from original Shopify theme) */
const CDN = 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files';
const IMG_PRODUCTS = '/images/products';

function productImg(filename) {
  return `${IMG_PRODUCTS}/${encodeURIComponent(filename)}`;
}

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
    twitter: 'https://twitter.com/GirGovalan'
  },
  logo: `${CDN}/logo_done_3a598d0d-0c1a-41fb-9aac-92c5d9a2f98f.jpg`,
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
  gheeHero: productImg('Gir Govalan Packaging.jpeg'),
  gheeJar: productImg('Gir Govalan Packaging.jpeg'),
  gheeJar2: productImg('Gir Govalan Packaging.jpeg'),
  gheeBilona: productImg('Gir Govalan Packaging.jpeg'),
  gheeAlt1: productImg('Gir Govalan Packaging.jpeg'),
  gheeAlt2: productImg('Gir Govalan Packaging.jpeg'),
  gheeAlt3: productImg('Gir Govalan Packaging.jpeg'),
  milk: productImg('a2-gir-milk.jpg'),
  curd: productImg('fresh-curd.jpg'),
  ladoo: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476b?w=800&q=85',
  peda: 'https://images.unsplash.com/photo-1606312619070-df7c6a486c70?w=800&q=85',
  shrikhand: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85',
  almonds: 'https://images.unsplash.com/photo-1508747703725-f2f5e0f3974b?w=800&q=85',
  dryFruits: 'https://images.unsplash.com/photo-1599594001899-afa833055e28?w=800&q=85'
};

const CATEGORIES = [
  { id: 'ghee', title: 'Ghee', icon: `${CDN}/clean-GHEE-icon.jpg`, url: '/collections/all/?category=ghee' },
  { id: 'sweets', title: 'Desserts', icon: `${CDN}/girgovalan__DESSERTS_icon_9c2b61f0-1076-4fc1-aef1-f6359de9c8d0.png`, url: '/collections/all/?category=sweets' },
  { id: 'dairy', title: 'Dairy', icon: `${CDN}/girgovalan__DAIRY_icon_729cc151-5743-466c-b219-d727fb6e089e.png`, url: '/collections/all/?category=dairy' },
  { id: 'seeds-nuts', title: 'Seed & Nuts', icon: `${CDN}/girgovalan__SEED_NUTS_icon_70bea663-b2f9-4021-b14a-4bc4d23c7294.png`, url: '/collections/all/?category=seeds-nuts' }
];

const PRODUCTS = [
  {
    id: 'pure-organic-a2-gir-cow-ghee',
    name: 'Pure Organic A2 Gir Cow Ghee',
    vendor: 'Gir Govalan',
    price: 1440,
    compareAt: 1499,
    category: 'ghee',
    image: PRODUCT_IMAGES.gheeHero,
    images: [PRODUCT_IMAGES.gheeHero, PRODUCT_IMAGES.gheeJar, PRODUCT_IMAGES.gheeJar2, PRODUCT_IMAGES.gheeAlt1],
    rating: 5,
    featured: true,
    reviewCount: 3,
    features: ['Wooden Bilona Method', 'Organic Fodder For Cows', 'No Added Preservatives'],
    description: 'Each drop of Gir Govalan Pure A2 Gir Cow Ghee is as pure as gold. Fresh milk from our Gir cows is hand-churned into makhan and slow-cooked using the traditional Bilona method — preserving natural nutrients, aroma, and rich flavour.',
    tabLabels: {
      description: 'Product Description',
      ingredients: 'Ingredients',
      benefits: 'Benefits',
      storage: 'Storage Info',
      faq: 'FAQ'
    },
    tabs: {
      description: `<p>Each drop of our golden <strong>Gir Govalan A2 Cow Ghee</strong> is crafted with care. Fresh, untouched milk from our Gir cows is first turned into makhan by hand-churning and then slowly processed using the traditional Bilona method. The makhan is gently simmered to create pure ghee, preserving all its natural nutrients, aroma, and rich flavour.</p>
<p>Our Gir cows are raised naturally in the Gir region of Gujarat. They graze on open land and are never given hormonal injections or synthetic feed. We deeply respect our गौ माता (Mother Cow) and धर्ती माता (Mother Earth), making sure every step honours the cows, the land, and nature.</p>
<p>Every batch is made in small quantities to ensure freshness, purity, and full-bodied taste. Each jar is packed with care so you get authentic, wholesome ghee straight from our farm to your kitchen.</p>`,
      ingredients: `<p><strong>100% Pure A2 Gir Cow Ghee</strong> — nothing else.</p>
<ul>
<li>Indigenous Gir cow milk (A2 protein)</li>
<li>Traditional cultured curd → bilona churned butter → clarified ghee</li>
<li>No preservatives, colours, or artificial flavours</li>
</ul>`,
      benefits: `<ul class="check-list">
<li>Rich in healthy fats and fat-soluble vitamins A, D, E, K</li>
<li>Traditional bilona method preserves authentic aroma and taste</li>
<li>A2 Gir cow milk — easier to digest for many families</li>
<li>High smoke point — ideal for Indian cooking and tadka</li>
<li>Prized in Ayurveda for daily nourishment</li>
</ul>`,
      storage: `<p><strong>Storage:</strong> Keep in an airtight container in a cool, dry place away from direct sunlight. Do not use a wet spoon.</p>
<p><strong>Shelf life:</strong> 12 months from date of packing when stored properly. No refrigeration required under normal conditions.</p>`,
      faq: `<div class="product-faq">
<h3>What is A2 Ghee or Gir Cow Ghee?</h3>
<p>A2 Ghee is made from the milk of purebred Indian cows like the Gir breed, which naturally produce A2 beta-casein protein. It is known to be easier to digest, highly nutritious, and ideal for daily consumption.</p>
<h3>How is Gir Cow Ghee prepared?</h3>
<p>We use the Vedic Bilona method: milk → curd → hand-churned butter → slow-cooked pure golden ghee.</p>
<h3>What makes Gir Govalan ghee unique?</h3>
<p>Small-batch production from indigenous Gir cows in the Gir region, Maldhari heritage, ethical farming, and no artificial additives.</p>
<h3>Do you accept international orders?</h3>
<p>Yes — contact us on WhatsApp for delivery to UAE, USA, UK, and Canada. We will share shipping options and pricing.</p>
</div>`
    },
    longDescription: `<div class="product-details-intro">
<h2>Premium A2 Gir Cow Ghee — Traditional Vedic Bilona Method</h2>
<p>Gir Govalan Pure A2 Gir Cow Ghee is handcrafted from indigenous Gir cows using the time-honoured bilona process — for families who want authentic desi ghee from Gujarat.</p>
</div>
<h2>Why Choose Gir Govalan?</h2>
<ul class="check-list">
<li>100% A2 Gir Cow Milk</li>
<li>Traditional Wooden Bilona Preparation</li>
<li>Small-batch farm freshness</li>
<li>No artificial preservatives or colours</li>
</ul>
<p class="product-tagline"><strong>Gir Govalan – Pure Tradition. Pure Nutrition. Pure Ghee.</strong></p>`,
    variants: [
      { label: '250ml', price: 859, compareAt: 900 },
      { label: '500ml', price: 1440, compareAt: 1499 },
      { label: '1L', price: 2790, compareAt: 2999 },
      { label: '5L', price: 12900, compareAt: 13999 }
    ]
  },
  {
    id: 'bilona-gir-ghee-500ml',
    name: 'Bilona Gir Cow Ghee — 500ml',
    vendor: 'Gir Govalan',
    price: 1199,
    category: 'ghee',
    image: PRODUCT_IMAGES.gheeJar,
    images: [PRODUCT_IMAGES.gheeJar, PRODUCT_IMAGES.gheeAlt2],
    rating: 5,
    description: 'Premium bilona-churned ghee from indigenous Gir cows, nourished with organic feed in natural surroundings.'
  },
  {
    id: 'bilona-gir-ghee-1l',
    name: 'Bilona Gir Cow Ghee — 1L',
    vendor: 'Gir Govalan',
    price: 2299,
    category: 'ghee',
    image: PRODUCT_IMAGES.gheeBilona,
    images: [PRODUCT_IMAGES.gheeBilona, PRODUCT_IMAGES.gheeHero, PRODUCT_IMAGES.gheeAlt3],
    rating: 5,
    description: 'Family-size pack of authentic bilona ghee — ideal for daily cooking and traditional sweets.'
  },
  {
    id: 'a2-gir-milk',
    name: 'A2 Gir Cow Milk',
    vendor: 'Gir Govalan',
    price: 89,
    category: 'dairy',
    image: PRODUCT_IMAGES.milk,
    images: [PRODUCT_IMAGES.milk],
    rating: 4,
    description: 'Fresh A2 milk from Gir cows — delivered with care from our farm to your home.'
  },
  {
    id: 'fresh-curd',
    name: 'Fresh Curd (Dahi)',
    vendor: 'Gir Govalan',
    price: 79,
    category: 'dairy',
    image: PRODUCT_IMAGES.curd,
    images: [PRODUCT_IMAGES.curd],
    rating: 4,
    description: 'Thick, creamy curd made from pure Gir cow milk using traditional methods.'
  },
  {
    id: 'traditional-ladoo',
    name: 'Traditional Ladoo',
    vendor: 'Gir Govalan',
    price: 349,
    category: 'sweets',
    image: PRODUCT_IMAGES.ladoo,
    images: [PRODUCT_IMAGES.ladoo],
    rating: 5,
    description: 'Homestyle ladoos prepared with our Gir cow ghee for authentic taste and richness.'
  },
  {
    id: 'milk-peda',
    name: 'Milk Peda',
    vendor: 'Gir Govalan',
    price: 399,
    compareAt: 449,
    category: 'sweets',
    image: PRODUCT_IMAGES.peda,
    images: [PRODUCT_IMAGES.peda],
    rating: 5,
    featured: true,
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
      { label: '250g', price: 249 },
      { label: '500g', price: 399 },
      { label: '1kg', price: 749 }
    ]
  },
  {
    id: 'shrikhand',
    name: 'Shrikhand',
    vendor: 'Gir Govalan',
    price: 299,
    category: 'sweets',
    image: PRODUCT_IMAGES.shrikhand,
    images: [PRODUCT_IMAGES.shrikhand],
    rating: 4,
    description: 'Creamy Gujarati shrikhand made from hung curd and natural flavours.'
  },
  {
    id: 'premium-almonds',
    name: 'Premium Almonds',
    vendor: 'Gir Govalan',
    price: 449,
    category: 'seeds-nuts',
    image: PRODUCT_IMAGES.almonds,
    images: [PRODUCT_IMAGES.almonds],
    rating: 4,
    description: 'Hand-selected premium almonds — perfect for snacking and traditional recipes.'
  },
  {
    id: 'mixed-dry-fruits',
    name: 'Mixed Dry Fruits',
    vendor: 'Gir Govalan',
    price: 599,
    category: 'seeds-nuts',
    image: PRODUCT_IMAGES.dryFruits,
    images: [PRODUCT_IMAGES.dryFruits],
    rating: 4,
    description: 'A wholesome mix of nuts and dry fruits sourced with quality you can trust.'
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
  { src: PRODUCT_IMAGES.gheeHero, alt: 'Gir Cow Ghee — Gir Govalan' },
  { src: PRODUCT_IMAGES.gheeJar, alt: 'Gir Govalan ghee jar' },
  { src: PRODUCT_IMAGES.gheeJar2, alt: 'Gir Cow Ghee product' },
  { src: PRODUCT_IMAGES.gheeBilona, alt: 'Premium Gir Cow Ghee' },
  { src: PRODUCT_IMAGES.gheeAlt1, alt: 'Gir Govalan ghee' },
  { src: `${CDN}/WhatsApp_Image_2025-03-16_at_11.06.35_AM.jpg`, alt: 'Our Gir cows' },
  { src: `${CDN}/woman-making-gir_cow-ghee-bilona-ghee.jpg`, alt: 'Bilona ghee making' },
  { src: `${CDN}/2.jpg`, alt: 'Gir Govalan farm landscape' }
];

const BLOG_POSTS = [
  {
    slug: 'benefits-of-gir-cow-ghee',
    title: 'Benefits of Gir Cow Ghee for Your Daily Diet',
    date: '2025-03-10',
    image: PRODUCT_IMAGES.gheeHero,
    excerpt: 'Discover why A2 Gir cow ghee is prized in Ayurveda and everyday Indian cooking for nourishment and flavour.',
    content: `<p>Gir cow ghee has been treasured for generations in Gujarat and across India. Rich in healthy fats and made through the traditional bilona process, it supports digestion, adds depth to cooking, and carries the authentic taste of the Gir region.</p>
    <p>When you choose ghee from indigenous Gir cows raised ethically on organic feed, you are choosing purity — for your family, for the cows, and for the land.</p>
    <h3>Why bilona matters</h3>
    <p>The bilona method slowly churns curd into butter and then clarifies it into ghee. This labour-intensive process preserves nutrients and creates the distinctive aroma that sets Gir ghee apart from mass-produced alternatives.</p>`
  },
  {
    slug: 'what-is-bilona-ghee',
    title: 'What Is Bilona Ghee and Why It Matters',
    date: '2025-02-18',
    image: `${CDN}/woman-making-gir_cow-ghee-bilona-ghee.jpg`,
    excerpt: 'Learn how the ancient bilona method turns A2 milk into the golden ghee your grandmother trusted.',
    content: `<p>Bilona ghee begins with whole A2 milk from Gir cows. The milk is cultured into curd, hand-churned to extract butter, and then slow-cooked until water evaporates and pure ghee remains.</p>
    <p>At Gir Govalan, we honour this craft because it aligns with our values: no shortcuts, no compromise on quality, and full respect for our cows and their natural rhythm.</p>`
  },
  {
    slug: 'know-your-gir-cow',
    title: 'Know Your Gir Cow — The Pride of Gujarat',
    date: '2025-01-25',
    image: `${CDN}/Gir_cow_gir_cow_ghee.jpg`,
    excerpt: 'The indigenous Gir breed is known for rich A2 milk and resilience — the heart of our farm.',
    content: `<p>Gir cows are native to the Gir forest region of Gujarat. They are admired for their gentle nature, distinctive appearance, and milk that is naturally high in A2 protein.</p>
    <p>Our herd grazes in open surroundings and receives care like family — because healthy, happy cows are the foundation of exceptional ghee.</p>`
  },
  {
    slug: 'cooking-with-pure-ghee',
    title: 'Cooking with Pure Ghee — Tips from Our Kitchen',
    date: '2024-12-05',
    image: `${CDN}/2.jpg`,
    excerpt: 'From tadka to sweets, here is how to get the most from authentic Gir cow ghee in your recipes.',
    content: `<p>Use Gir ghee for tempering spices, roasting grains, or finishing dal — a little goes a long way. Its high smoke point makes it excellent for traditional frying and festive sweets like ladoo and halwa.</p>
    <p>Store ghee in a cool, dry place away from direct sunlight. Properly made bilona ghee stays fresh and aromatic for months when handled with care.</p>`
  }
];

const PAGES = {
  about: {
    title: 'Who Is Gir Govalan',
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
    intro: 'A glimpse into our farm, our Gir cows, and the traditional craft of making pure bilona ghee.'
  },
  contact: {
    title: 'Contact Us',
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
