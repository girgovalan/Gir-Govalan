const fs = require('fs');
const vm = require('vm');
const path = require('path');

const files = [
  'js/data.js',
  'js/blog-scheduled.js',
  'js/blog-scheduled-extended.js',
  'js/blog-scheduled-recommended.js',
  'js/blog-month1-sprint.js',
  'js/blog-country-clusters.js',
  'js/blog-international-long.js'
];

let code = '';
for (const f of files) code += fs.readFileSync(f, 'utf8') + '\n';
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(
  code +
    '\nthis.posts = typeof getPublishedBlogPosts === "function" ? getPublishedBlogPosts() : BLOG_POSTS.filter(p => p.date <= "2026-07-30");',
  ctx
);

const posts = (ctx.posts || []).slice(0, 30);
const esc = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');

const cards = posts
  .map(
    (p) => `      <a href="/blogs/news/${esc(p.slug)}/" class="blog-card">
        <div class="blog-card-image" style="background-image:url('${esc(p.image)}')"></div>
        <div class="blog-card-body">
          <span class="blog-card-date">${esc(p.date)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.excerpt)}</p>
        </div>
      </a>`
  )
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-X9CF28C02R"></script>
  <script src="/js/gtag.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — A2 Gir Cow Ghee, Bilona Method &amp; Dairy Tips | Gir Govalan</title>
  <meta name="description" content="Gir Govalan blog — A2 milk, bilona ghee, milk peda, Ayurveda tips, and Gir cow farming stories from Gujarat. Expert guides for pure desi ghee.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.girgovalan.com/blogs/news/">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <div id="site-header"></div>
  <div class="page-hero">
    <div class="container">
      <h1>Blog — Gir Cow Ghee, Bilona &amp; Farm Wisdom</h1>
      <p>Tips, stories, and guides about Gir cows, bilona ghee, A2 milk, and wholesome living from Gujarat.</p>
    </div>
  </div>
  <section>
    <div class="container blog-grid" id="blog-list">
${cards}
    </div>
  </section>
  <div id="site-footer"></div>
  <button class="scroll-top" aria-label="Back to top">↑</button>
  <script src="/js/urls.js"></script>
  <script src="/js/data.js"></script>
  <script src="/js/blog-scheduled.js"></script>
  <script src="/js/blog-scheduled-extended.js"></script>
  <script src="/js/blog-scheduled-recommended.js"></script>
  <script src="/js/blog-month1-sprint.js"></script>
  <script src="/js/blog-international-long.js"></script>
  <script src="/js/blog-country-clusters.js"></script>
  <script src="/js/blog-usa-cluster.js"></script>
  <script src="/js/seo.js"></script>
  <script src="/js/components.js"></script>
  <script src="/js/app.js"></script>
  <script>
    document.getElementById('blog-list').innerHTML = getPublishedBlogPosts().map(post => \`
      <a href="\${URLS.blogPost(post.slug)}" class="blog-card">
        <div class="blog-card-image" style="background-image:url('\${post.image}')"></div>
        <div class="blog-card-body">
          <span class="blog-card-date">\${new Date(post.date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</span>
          <h3>\${post.title}</h3>
          <p>\${post.excerpt}</p>
        </div>
      </a>
    \`).join('');
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join('blogs', 'news', 'index.html'), html);
console.log('Updated blogs/news/index.html with', posts.length, 'static cards');
