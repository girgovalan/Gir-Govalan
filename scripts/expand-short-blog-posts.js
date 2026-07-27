/**
 * Expand short blog stubs into full human-style articles.
 * Only replaces content when the new article is longer.
 * Run: node scripts/expand-short-blog-posts.js
 */
const fs = require('fs');

const MIN_WORDS = 450;
const FILES = [
  'js/blog-month1-sprint.js',
  'js/blog-scheduled-extended.js',
  'js/blog-scheduled.js',
  'js/blog-scheduled-recommended.js',
  'js/blog-country-clusters.js',
  'js/data.js'
];

// Longer versions live in blog-international-long.js — do not clobber those files' skips in month1 if still short stubs
const SKIP = new Set([
  'why-indian-families-in-usa-prefer-gir-cow-ghee',
  'best-a2-ghee-brands-in-usa-what-to-check',
  'how-to-carry-or-import-indian-ghee-to-usa',
  'best-a2-ghee-brands-in-uae-what-to-check',
  'why-indian-families-in-uae-prefer-gir-cow-ghee',
  'how-to-import-indian-ghee-to-uae',
  'best-a2-ghee-brands-in-canada-what-to-check',
  'why-indian-families-in-canada-prefer-gir-cow-ghee',
  'how-to-import-indian-ghee-to-canada',
  'best-a2-ghee-brands-in-uk-what-to-check',
  'why-indian-families-in-uk-prefer-gir-cow-ghee',
  'how-to-import-indian-ghee-to-uk'
]);

function wordCount(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(/\s+/).filter(Boolean).length;
}

function titleCase(slug) {
  return slug.replace(/-/g, ' ');
}

function isRecipe(slug, title) {
  return /recipe|paratha|khichdi|dal|ladoo|halwa|upma|kadhi|roti|rice|tadka|roast|breakfast|sweet|mithai|peda|shrikhand|coffee/i.test(
    slug + ' ' + title
  );
}

function isFestival(slug, title) {
  return /diwali|navratri|raksha|janmashtami|dussehra|wedding|christmas|bestu|karva|gurpurab|govatsa|festival|festive|independence|corporate|hamper|gift/i.test(
    slug + ' ' + title
  );
}

function isMilk(slug, title) {
  return /milk|curd|dahi|lactose|toddler|jersey|a1|a2-milk/i.test(slug + ' ' + title);
}

function buildArticle(meta) {
  const { slug, title, excerpt } = meta;
  const topic = titleCase(slug);
  const recipe = isRecipe(slug, title);
  const festival = isFestival(slug, title);
  const milk = isMilk(slug, title);
  const lead = excerpt || title;

  if (recipe) {
    return `<p>${lead} This kitchen guide covers ingredients, method, timing, and where Gir cow bilona ghee changes the result. Read it once before you light the stove, then keep a dry spoon and a cool cupboard jar nearby.</p>
<h2>Why this dish needs good ghee</h2>
<p>Ordinary cooking fat can fry. Proper bilona ghee carries aroma into tempering and sweets. For ${topic}, that difference shows in the first few minutes on the flame — cumin should bloom, not just sizzle in silence. Homes that grew up with desi ghee usually notice the gap immediately when a weak jar is used.</p>
<p>Bilona ghee from Gir cow milk takes more milk and more time to make. That is why many festival and daily recipes still call for it even when cheaper fat is available in every kirana.</p>
<h2>Ingredients (home portion)</h2>
<ul>
<li>Main ingredients for ${title.replace(/:.*/, '')} as you normally cook it at home</li>
<li>1–2 teaspoons Gir cow bilona ghee for tadka or finishing (use more for sweets and ladoo)</li>
<li>Whole spices you already keep — cumin, mustard, hing, cardamom, cloves as the dish needs</li>
<li>Salt, lemon, or jaggery only when the recipe asks for them</li>
<li>Clean vessels and a dry spoon for the ghee jar</li>
</ul>
<h2>Method</h2>
<ol>
<li>Prep vegetables, dals, flours, or milk solids the way your family recipe already does. Do not invent a new dish in a rush.</li>
<li>Heat a small pan. Add ghee. When it melts clear and smells nutty, add tempering spices.</li>
<li>Combine with the main pot, dough, or sweet mixture. Keep the flame medium — burnt ghee ruins the batch.</li>
<li>Finish with a thin spoon of ghee on top while hot so the aroma rises before serving.</li>
<li>Serve fresh. Leftovers keep better when the dish was not swimming in oil.</li>
</ol>
<h2>Taste checkpoints</h2>
<p>You should smell nutty ghee, not raw oil. Sweets should taste rich, not greasy. Rotis and parathas should stay soft through lunch. If the pan only smells oily, change the jar — process and breed matter more than a gold label.</p>
<ul>
<li>Tadka: spices bloom within seconds</li>
<li>Sweets: no waxy aftertaste</li>
<li>Breakfast bowls: ghee should finish the dish, not float as a slick</li>
</ul>
<h2>Common mistakes</h2>
<ul>
<li>Using a wet spoon and spoiling the jar for weeks</li>
<li>Burning tadka on high flame</li>
<li>Substituting margarine or blended fat and expecting the same aroma</li>
<li>Adding ghee so late that it never meets heat</li>
<li>Buying the cheapest online tin without reading the ingredient list</li>
</ul>
<h2>Storage while you cook for days</h2>
<p>Keep the jar away from the stove during marathon cooking. Tight lid. Dry spoon. Cool cupboard. Soft texture in summer heat is normal for pure ghee; leakage from a bad seal is not.</p>
<h2>Make it with Gir Govalan ghee</h2>
<p>Use <a href="/products/pure-organic-a2-gir-cow-ghee/">A2 Gir Cow Bilona Ghee</a> for daily cooking and festival batches. Read <a href="/blogs/news/how-to-store-ghee-and-sweets-at-home/">storage tips</a> and <a href="/blogs/news/bilona-ghee-vs-regular-ghee/">bilona vs regular ghee</a> if you are still comparing jars.</p>
<p>Related: <a href="/blogs/news/cooking-with-pure-ghee/">cooking with pure ghee</a> · <a href="/blogs/news/what-is-bilona-ghee/">what is bilona ghee</a> · <a href="/pages/contact/">WhatsApp order help</a>.</p>`;
  }

  if (festival) {
    return `<p>${lead} Festival weeks are when weak ghee shows itself — sweets turn greasy, prasadam tastes flat, and last-minute online jars disappoint. This guide covers planning, cooking, gifting, and packing with Gir cow bilona ghee so ${topic} feels intentional, not rushed.</p>
<h2>Plan before the rush</h2>
<p>Order ghee early. Festival courier lanes slow down across India and for NRI gift routes. Decide pack size by how many sweets and guest meals you will cook, not by panic buying the largest tin on the night before.</p>
<ul>
<li>Small home pujan: 500 ml is often enough</li>
<li>Full family Diwali, Navratri, or wedding mithai: 1 litre or more</li>
<li>Gifting and corporate hampers: sealed jars with clear labels travel better</li>
<li>Bulk temple or society orders: confirm packing and delivery window in writing</li>
</ul>
<h2>Where ghee matters in festive food</h2>
<p>Ladoo, peda, halwa, sheera, pooris, kadhi, khichdi for guests — aroma starts in the kadhai. Bilona ghee from Gir cow milk is slower to make and usually costs more per jar. Families still buy it for festivals because one good batch saves a tray of mithai that nobody wants to finish.</p>
<p>For fasting days, use a light tadka and keep the meal simple. For feast days, finish sweets with a measured spoon so guests taste richness without heaviness.</p>
<h2>Kitchen checklist</h2>
<ol>
<li>Use a clean, dry spoon every time you open the jar</li>
<li>Temper spices in ghee before mixing into sweets or dals</li>
<li>Do not overheat until the ghee smokes hard</li>
<li>Store the jar away from the stove during marathon cooking days</li>
<li>Label gift jars with date opened if you share a kitchen with relatives</li>
</ol>
<h2>Gifting without awkwardness</h2>
<p>Write the recipient’s full address and phone. Ask the seller about packing and heat-safe pads in summer. Soft ghee in heat is texture; leakage is a problem — photograph the parcel and message quickly if something arrives messy.</p>
<p>For corporate or society gifts, choose one consistent pack size and a short note about bilona process. People remember useful jars more than fancy empty boxes.</p>
<h2>What to skip</h2>
<ul>
<li>Unlabelled “pure ghee” with no breed or process story</li>
<li>Jars that smell flat or chemical when warmed</li>
<li>Last-minute marketplace deals with no reply on WhatsApp</li>
<li>Oversized tins you cannot finish before the aroma fades</li>
</ul>
<h2>Order from Gir Govalan</h2>
<p>Shop <a href="/products/pure-organic-a2-gir-cow-ghee/">bilona ghee packs</a>. For sweets, also see <a href="/products/milk-peda/">milk peda</a> and <a href="/products/traditional-ladoo/">ladoo</a>. Story and farm photos: <a href="/pages/who-is-gir-govalan/">who we are</a>.</p>
<p>Also useful: <a href="/blogs/news/diwali-sweets-with-gir-cow-ghee/">Diwali sweets with ghee</a> · <a href="/blogs/news/how-to-store-ghee-and-sweets-at-home/">store ghee and mithai</a> · <a href="/pages/contact/">contact for bulk help</a>.</p>`;
  }

  if (milk) {
    return `<p>${lead} Milk choices affect chai, curd, children’s glasses, and how light a meal feels after breakfast. This guide keeps the talk practical — breed, freshness, packing, storage — and leaves medical decisions to your doctor.</p>
<h2>What to look for</h2>
<ul>
<li>Named breed when you care about A2 / Gir character</li>
<li>Short farm-to-home timing for fresh milk</li>
<li>No water or powder stories from the supplier</li>
<li>Clear packing — pouch or glass — and cold storage on arrival</li>
<li>A person you can message if a delivery is late or warm</li>
</ul>
<p>For ${topic}, those checks matter more than a pretty carton claim.</p>
<h2>Fresh milk vs long-life cartons</h2>
<p>Cartons are convenient for travel and late nights. Fresh Gir milk tastes different in chai and usually sets thicker dahi. It also needs a fridge immediately, especially in warm cities like Surat where afternoon heat sits on doorsteps.</p>
<p>If your household wants everyday chai and home-set curd, fresh delivery often wins. If you need shelf-stable backup, keep a carton for emergencies and still treat fresh milk as the daily bottle.</p>
<h2>Gir, Jersey, A1 and A2 — plain language</h2>
<p>Indigenous Gir cows are often discussed in A2 conversations. Jersey and many mixed dairy herds are common in commercial supply. Labels and lab claims vary. Read the seller’s breed statement, ask questions, and do not treat a blog as a medical certificate.</p>
<p>Parents sometimes prefer A2 Gir milk for family use. That preference is personal. For toddlers, lactose concerns, or any medical issue, ask a paediatrician or doctor before changing milk.</p>
<h2>Home habits that protect quality</h2>
<ol>
<li>Refrigerate as soon as the milk arrives</li>
<li>Use clean vessels and lids</li>
<li>Boil if that is your household practice</li>
<li>Do not leave milk out in the heat</li>
<li>Set curd with a small starter from a previous good batch when possible</li>
</ol>
<h2>Curd and children’s glasses</h2>
<p>Good milk sets a firmer dahi that tastes clean, not sour-sharp. Children’s glasses should match what your doctor already approved. Never force a new milk type during illness without advice.</p>
<p>If you are switching brands, change one bottle at a time and watch how chai and curd behave for a week. Taste and set quality tell you more than a single marketing line on a pouch.</p>
<h2>Surat and warm-city delivery notes</h2>
<p>In hot weather, ask when the milk left cold storage and how long it sits at the door. Bring it inside immediately. If a pouch arrives warm, message the seller before you use it for children’s glasses.</p>
<h2>Gir Govalan dairy</h2>
<p>See <a href="/products/a2-gir-milk/">A2 Gir Cow Milk</a> for Surat delivery options and <a href="/products/fresh-curd/">fresh curd</a>. Related reading: <a href="/blogs/news/gir-cow-vs-jersey-cow-milk/">Gir vs Jersey</a> · <a href="/blogs/news/fresh-milk-delivery-vs-packaged/">fresh vs packaged</a> · <a href="/blogs/news/a2-milk-vs-a1-milk-gir-cow/">A2 vs A1 basics</a>.</p>
<p>Questions about delivery areas: <a href="/pages/contact/">WhatsApp or contact form</a>.</p>`;
  }

  // Default: buying / education / farm articles
  return `<p>${lead} If you are comparing jars online or in a store, ignore gold foil for a minute. This page walks through what actually changes flavour, trust, and value for ${topic} — in plain kitchen language, not brochure talk.</p>
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
<p>Keep learning: <a href="/blogs/news/what-is-bilona-ghee/">what is bilona ghee</a> · <a href="/blogs/news/how-to-identify-pure-gir-cow-ghee/">how to identify pure ghee</a> · <a href="/blogs/news/bilona-ghee-vs-regular-ghee/">bilona vs regular</a> · <a href="/pages/contact/">order help</a>.</p>`;
}

function expandFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  let changed = 0;

  const blockRe =
    /(slug:\s*'([^']+)'[\s\S]*?title:\s*'([^']*)'[\s\S]*?(?:excerpt:\s*'([^']*)'[\s\S]*?)?content:\s*)`([\s\S]*?)`/g;

  src = src.replace(blockRe, (full, prefix, slug, title, excerpt, content) => {
    if (SKIP.has(slug) && !filePath.includes('month1')) {
      // Still expand short month1 stubs so find() order cannot win with thin copy
    }
    if (SKIP.has(slug) && filePath.includes('international-long')) return full;

    const words = wordCount(content);
    if (words >= MIN_WORDS) return full;

    const article = buildArticle({
      slug,
      title: title || slug,
      excerpt: excerpt || ''
    });
    const nextWords = wordCount(article);
    if (nextWords <= words) {
      console.log('skip (not longer)', words, '->', nextWords, slug, filePath);
      return full;
    }
    if (article.includes('`')) {
      throw new Error('Backtick in generated content for ' + slug);
    }
    changed++;
    console.log('expand', words, '->', nextWords, slug, filePath);
    return prefix + '`' + article + '`';
  });

  if (changed) fs.writeFileSync(filePath, src);
  return changed;
}

let total = 0;
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  total += expandFile(f);
}
console.log('Expanded posts:', total);
