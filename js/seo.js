/* Gir Govalan — SEO meta, Open Graph, Twitter Card, JSON-LD */
(function () {
  const BASE = 'https://girgovalan.com';
  const SITE_NAME = 'Gir Govalan';
  const DEFAULT_IMAGE = 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files/2.jpg';
  const TWITTER = '@GirGovalan';

  const STATIC_PAGES = {
    '/': {
      title: 'Gir Govalan — Authentic A2 Gir Cow Ghee | Bilona Ghee Gujarat',
      description: 'Buy pure A2 Gir Cow Ghee online. Hand-churned bilona ghee from Gir region, Gujarat. Ethical farming, organic practices — Gir Govalan delivers tradition to your home.',
      image: DEFAULT_IMAGE,
      type: 'website'
    },
    '/pages/who-is-gir-govalan/': {
      title: 'Who Is Gir Govalan — Jituben\'s Story | A2 Gir Cow Ghee Gujarat',
      description: 'Meet Jituben and Gir Govalan — Maldhari heritage from Aakolda Amreli, Gir cows, bilona ghee, and our journey from village to your home.',
      image: 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files/WhatsApp_Image_2025-03-16_at_11.06.35_AM.jpg',
      type: 'article'
    },
    '/pages/contact/': {
      title: 'Contact Gir Govalan — Order Ghee & Dairy Products',
      description: 'Contact Gir Govalan for orders, wholesale, and enquiries. Email, phone, WhatsApp. Authentic Gir cow ghee from Gujarat, India.',
      type: 'website'
    },
    '/pages/gallery/': {
      title: 'Gallery — Gir Cows & Bilona Ghee | Gir Govalan',
      description: 'Photos of our Gir cows, farm life in Saurashtra, and traditional bilona ghee making at Gir Govalan.',
      type: 'website'
    },
    '/blogs/news/': {
      title: 'Blog — Gir Cow Ghee Tips & Stories | Gir Govalan',
      description: 'Articles about A2 Gir cow ghee, bilona method, Gir cows, and healthy cooking from Gir Govalan farm.',
      type: 'website'
    },
    '/collections/all/': {
      title: 'Shop All Products — Gir Cow Ghee, Dairy & Sweets',
      description: 'Shop authentic Gir cow ghee, A2 milk, traditional sweets, and dry fruits. Pure products from Gir Govalan, Gujarat.',
      type: 'website'
    },
    '/cart/': {
      title: 'Cart — Gir Govalan',
      description: 'Your shopping cart at Gir Govalan.',
      robots: 'noindex, follow',
      type: 'website'
    }
  };

  const CATEGORY_SEO = {
    ghee: { title: 'Gir Cow Ghee', description: 'Pure A2 Gir cow ghee — bilona method, hand-churned in Gujarat. Shop Gir Govalan ghee online.' },
    dairy: { title: 'Dairy Products', description: 'A2 Gir cow milk, fresh curd and dairy from Gir Govalan farm.' },
    sweets: { title: 'Traditional Sweets', description: 'Homestyle sweets made with Gir cow ghee — ladoo, shrikhand and more.' },
    'seeds-nuts': { title: 'Seeds & Nuts', description: 'Premium almonds and dry fruits from Gir Govalan.' }
  };

  function normalizePath(path) {
    let p = path.split('?')[0];
    if (!p.endsWith('/') && !p.includes('.')) p += '/';
    if (p !== '/' && !p.endsWith('/')) p += '/';
    return p;
  }

  function setMeta(name, content, prop) {
    if (!content) return;
    const attr = prop ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setLink(rel, href) {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  function injectJsonLd(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function resolveMeta() {
    const path = normalizePath(location.pathname);
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    if (path.startsWith('/products/')) {
      const id = path.replace('/products/', '').replace(/\/$/, '');
      const p = typeof getProduct === 'function' ? getProduct(id) : null;
      if (p) {
        return {
          title: `${p.name} — Buy Online | Gir Govalan`,
          description: p.description,
          image: p.image,
          url: `${BASE}/products/${id}/`,
          type: 'product',
          product: p,
          robots: 'index, follow'
        };
      }
    }

    if (path.startsWith('/blogs/news/') && path !== '/blogs/news/') {
      const slug = path.replace('/blogs/news/', '').replace(/\/$/, '');
      const post = typeof getBlogPost === 'function' ? getBlogPost(slug) : null;
      if (post) {
        return {
          title: `${post.title} | Gir Govalan Blog`,
          description: post.excerpt,
          image: post.image,
          url: `${BASE}/blogs/news/${slug}/`,
          type: 'article',
          article: post,
          keywords: post.keywords,
          robots: 'index, follow'
        };
      }
    }

    if (path === '/collections/all/' && category && CATEGORY_SEO[category]) {
      const c = CATEGORY_SEO[category];
      return {
        title: `${c.title} — Shop | Gir Govalan`,
        description: c.description,
        url: `${BASE}/collections/all/?category=${category}`,
        type: 'website',
        robots: 'index, follow'
      };
    }

    const staticMeta = STATIC_PAGES[path] || STATIC_PAGES[path.replace(/\/$/, '')];
    if (staticMeta) {
      return {
        ...staticMeta,
        url: path === '/' ? `${BASE}/` : `${BASE}${path}`,
        robots: staticMeta.robots || 'index, follow'
      };
    }

    return {
      title: document.title || SITE_NAME,
      description: 'Authentic Gir Cow Ghee and farm products from Gujarat.',
      url: BASE + path,
      image: DEFAULT_IMAGE,
      type: 'website',
      robots: 'index, follow'
    };
  }

  function applySeo(meta) {
    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('robots', meta.robots);
    if (meta.keywords) setMeta('keywords', meta.keywords);
    if (meta.article?.keywords) setMeta('keywords', meta.article.keywords);
    setMeta('author', SITE_NAME);
    setMeta('geo.region', 'IN-GJ');
    setMeta('geo.placename', 'Gir, Gujarat');

    setLink('canonical', meta.url);

    setMeta('og:title', meta.title, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:url', meta.url, true);
    setMeta('og:type', meta.type === 'article' ? 'article' : meta.type === 'product' ? 'product' : 'website', true);
    setMeta('og:image', meta.image || DEFAULT_IMAGE, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'en_IN', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', TWITTER);
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('twitter:image', meta.image || DEFAULT_IMAGE);

    if (!document.querySelector('link[rel="icon"]')) {
      setLink('icon', 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files/png_logo.png');
    }
    if (!document.querySelector('link[rel="manifest"]')) {
      setLink('manifest', '/site.webmanifest');
    }
    setMeta('theme-color', '#7b5495');

    injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE,
      logo: 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files/png_logo.png',
      description: 'Authentic A2 Gir Cow Ghee from Gujarat — bilona method, ethical farming.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gir',
        addressRegion: 'Gujarat',
        addressCountry: 'IN'
      },
      sameAs: [
        'https://www.facebook.com/GirGovalan/',
        'https://www.instagram.com/girgovalan/',
        'https://www.youtube.com/@GirGovalan',
        'https://twitter.com/GirGovalan'
      ]
    });

    if (meta.type === 'product' && meta.product) {
      const p = meta.product;
      injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        image: p.image,
        description: p.description,
        brand: { '@type': 'Brand', name: p.vendor || SITE_NAME },
        offers: {
          '@type': 'Offer',
          url: meta.url,
          priceCurrency: 'INR',
          price: p.price,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: SITE_NAME }
        }
      });
    }

    if (meta.type === 'article' && meta.article) {
      const a = meta.article;
      injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.title,
        image: a.image,
        datePublished: a.date,
        description: a.excerpt,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files/png_logo.png' }
        },
        mainEntityOfPage: meta.url
      });
    }

    if (normalizePath(location.pathname) === '/') {
      injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: BASE,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE}/collections/all/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      });
    }

    const crumbs = [{ name: 'Home', url: BASE + '/' }];
    const path = normalizePath(location.pathname);
    if (path.includes('who-is-gir-govalan')) crumbs.push({ name: 'Who Is Gir Govalan', url: BASE + '/pages/who-is-gir-govalan/' });
    else if (path.includes('/pages/contact')) crumbs.push({ name: 'Contact', url: BASE + '/pages/contact/' });
    else if (path.includes('/pages/gallery')) crumbs.push({ name: 'Gallery', url: BASE + '/pages/gallery/' });
    else if (path.includes('/blogs/news/') && path !== '/blogs/news/') {
      crumbs.push({ name: 'Blog', url: BASE + '/blogs/news/' });
      crumbs.push({ name: meta.title.split(' | ')[0], url: meta.url });
    } else if (path.includes('/blogs/news')) crumbs.push({ name: 'Blog', url: BASE + '/blogs/news/' });
    else if (path.includes('/collections/')) crumbs.push({ name: 'Products', url: BASE + '/collections/all/' });
    else if (path.includes('/products/')) {
      crumbs.push({ name: 'Products', url: BASE + '/collections/all/' });
      crumbs.push({ name: meta.product?.name || 'Product', url: meta.url });
    }

    if (crumbs.length > 1) {
      injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: c.url
        }))
      });
    }
  }

  function init() {
    try {
      applySeo(resolveMeta());
    } catch (e) {
      console.warn('SEO init:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
