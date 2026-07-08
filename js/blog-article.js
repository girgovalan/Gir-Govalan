/* Blog article page — load post by URL slug */
(function () {
  const root = document.getElementById('article-root');
  if (!root || typeof getBlogPost !== 'function') return;

  const slug = location.pathname.replace(/\/$/, '').split('/').pop();
  const post = getBlogPost(slug);

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function relatedPostsHTML(currentSlug) {
    return getPublishedBlogPosts()
      .filter(p => p.slug !== currentSlug)
      .slice(0, 3)
      .map(p => `
        <a href="${URLS.blogPost(p.slug)}" class="blog-card">
          <div class="blog-card-image" style="background-image:url('${p.image}')"></div>
          <div class="blog-card-body">
            <span class="blog-card-date">${formatDate(p.date)}</span>
            <h3>${p.title}</h3>
          </div>
        </a>`)
      .join('');
  }

  const GHEE_CLUSTER_SLUGS = [
    'benefits-of-gir-cow-ghee',
    'how-to-identify-pure-gir-cow-ghee',
    'bilona-ghee-vs-regular-ghee',
    'how-to-store-ghee-and-sweets-at-home',
    'cooking-with-pure-ghee',
    'a2-milk-vs-a1-milk-gir-cow',
    'what-is-bilona-ghee',
    'know-your-gir-cow'
  ];

  function gheeClusterHTML(currentPost) {
    const text = `${currentPost.title} ${currentPost.keywords || ''}`.toLowerCase();
    const isGheeTopic = /(ghee|bilona|a2|gir cow)/i.test(text);
    if (!isGheeTopic) return '';

    const links = GHEE_CLUSTER_SLUGS
      .filter(slug => slug !== currentPost.slug)
      .map(slug => getBlogPost(slug))
      .filter(Boolean)
      .slice(0, 6);

    if (!links.length) return '';

    return `
      <aside class="article-cluster-links">
        <h2>Gir Cow Ghee Topic Cluster</h2>
        <p>Explore related guides to understand Gir cow ghee quality, usage, and buying decisions.</p>
        <ul>
          ${links.map(p => `<li><a href="${URLS.blogPost(p.slug)}">${p.title}</a></li>`).join('')}
          <li><a href="/products/pure-organic-a2-gir-cow-ghee/">Shop Authentic A2 Gir Cow Bilona Ghee</a></li>
        </ul>
      </aside>`;
  }

  if (!post) {
    root.innerHTML = `
      <div class="text-center container" style="padding:80px">
        <h2>Post not found</h2>
        <p style="color:var(--text-muted);margin-bottom:24px">This article may not be published yet.</p>
        <a href="/blogs/news/" class="btn btn-primary">Back to blog</a>
      </div>`;
    return;
  }

  document.title = `${post.title} — Gir Govalan Blog`;
  document.querySelector('link[rel=canonical]')?.remove();
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = `https://www.girgovalan.com/blogs/news/${slug}/`;
  document.head.appendChild(link);

  root.innerHTML = `
    <div class="article-content">
      <a href="/blogs/news/">← Back to blog</a>
      <p class="article-meta">${formatDate(post.date)}</p>
      <h1>${post.title}</h1>
      <img class="article-hero-img" src="${post.image}" alt="${post.title}">
      <div class="article-body">${post.content}</div>
      ${gheeClusterHTML(post)}
    </div>`;

  const morePosts = document.getElementById('more-posts');
  if (morePosts) morePosts.innerHTML = relatedPostsHTML(slug);
})();
