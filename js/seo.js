/* Gir Govalan — SEO meta, Open Graph, Twitter Card, JSON-LD */
(function () {
  const BASE = 'https://www.girgovalan.com';
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
    '/pages/return-policy/': {
      title: 'Return & Refund Policy — Gir Govalan',
      description: 'Gir Govalan return and refund policy for A2 Gir cow ghee, milk, curd, and sweets. Quality issues handled via WhatsApp support.',
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
    },
    '/a2-gir-cow-ghee-usa/': {
      title: 'Gir Cow Ghee USA — Redirect',
      description: 'Redirecting to the primary Gir Cow Ghee USA landing page.',
      robots: 'noindex, follow',
      type: 'website'
    },
    '/gir-cow-ghee-usa/': {
      title: 'Buy A2 Gir Cow Ghee in USA | Authentic Bilona Desi Ghee',
      description: 'Order A2 Gir cow bilona ghee for USA homes from Gir Govalan in Gujarat. Real farm ghee for tadka, rotis, and festival sweets — WhatsApp shipping support.',
      type: 'website'
    },
    '/a2-gir-cow-ghee-uae/': {
      title: 'Buy A2 Gir Cow Ghee in UAE | Authentic Bilona Ghee',
      description: 'Order A2 Gir cow bilona ghee in UAE from Gir Govalan. Traditional Gujarat farm ghee for Dubai, Abu Dhabi, and Sharjah kitchens — WhatsApp order support.',
      type: 'website'
    },
    '/a2-gir-cow-ghee-canada/': {
      title: 'Buy A2 Gir Cow Ghee in Canada | Authentic Bilona Ghee',
      description: 'Order A2 Gir cow bilona ghee in Canada from Gir Govalan. Gujarat farm ghee for Toronto, Brampton, Vancouver kitchens — clear shipping help on WhatsApp.',
      type: 'website'
    },
    '/a2-gir-cow-ghee-uk/': {
      title: 'Buy A2 Gir Cow Ghee in UK | Authentic Bilona Ghee',
      description: 'Order A2 Gir cow bilona ghee in the UK from Gir Govalan. Farm ghee from Gujarat for London, Leicester, Birmingham kitchens — WhatsApp shipping support.',
      type: 'website'
    }
  };

  const CATEGORY_SEO = {
    ghee: { title: 'Gir Cow Ghee', description: 'Pure A2 Gir cow ghee — bilona method, hand-churned in Gujarat. Shop Gir Govalan ghee online.' },
    dairy: { title: 'Dairy Products', description: 'A2 Gir cow milk Surat delivery, fresh curd and dairy from Gir Govalan farm. Shop pure Gir breed milk online.' },
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

  function excerptFromContent(html, maxLen) {
    if (!html) return '';
    const plain = html
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!plain) return '';
    return plain.length > maxLen ? `${plain.slice(0, maxLen - 1).trim()}…` : plain;
  }

  function toAbsoluteImage(url) {
    if (!url) return DEFAULT_IMAGE;
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith('/')) return `${BASE}${url}`;
    return `${BASE}/${url}`;
  }

  function extractFaqEntities(html) {
    if (!html) return [];
    const hasFaq = /Frequently Asked Questions/i.test(html) || /class="product-faq"/i.test(html);
    if (!hasFaq) return [];
    const qa = [];
    const re = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gis;
    let m;
    while ((m = re.exec(html))) {
      const q = m[1].replace(/<[^>]+>/g, '').trim();
      const a = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (q && a) {
        qa.push({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a }
        });
      }
    }
    return qa.slice(0, 12);
  }

  function resolveMeta() {
    const path = normalizePath(location.pathname);
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    if (path.startsWith('/products/')) {
      const id = path.replace('/products/', '').replace(/\/$/, '');
      const p = typeof getProduct === 'function' ? getProduct(id) : null;
      if (p) {
        const productTitle = p.seoTitle || `${p.name} — Buy Online | Gir Govalan`;
        const productDescription = p.metaDescription || p.description;
        return {
          title: productTitle,
          description: productDescription,
          image: p.image,
          url: `${BASE}/products/${id}/`,
          type: 'product',
          product: p,
          keywords: p.keywords,
          robots: 'index, follow'
        };
      }
    }

    if (path.startsWith('/blogs/news/') && path !== '/blogs/news/') {
      const slug = path.replace('/blogs/news/', '').replace(/\/$/, '');
      const post = typeof getBlogPost === 'function' ? getBlogPost(slug) : null;
      if (post) {
        const articleDescription =
          post.metaDescription ||
          post.excerpt ||
          excerptFromContent(post.content, 180) ||
          'Read this Gir Govalan blog article about pure A2 Gir cow ghee and traditional dairy wisdom.';
        const articleTitle = post.seoTitle || post.title;
        return {
          title: `${articleTitle} | Gir Govalan Blog`,
          description: articleDescription,
          image: toAbsoluteImage(post.image),
          url: `${BASE}/blogs/news/${slug}/`,
          type: 'article',
          article: post,
          articleTitle,
          articleDescription,
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

  function productOfferExtras() {
    return {
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'INR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN'
        },
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
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        returnPolicyLink: `${BASE}/pages/return-policy/`
      }
    };
  }

  function productReviewExtras(p) {
    if (!p.reviewCount || !p.rating) return {};
    const extras = {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Number(p.rating).toFixed(1),
        reviewCount: String(p.reviewCount),
        ratingCount: String(p.reviewCount),
        bestRating: '5',
        worstRating: '1'
      }
    };
    if (p.reviews?.length) {
      extras.review = p.reviews.slice(0, 5).map(r => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.date,
        reviewBody: r.body,
        name: `Review by ${r.author}`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(r.rating || p.rating),
          bestRating: '5',
          worstRating: '1'
        }
      }));
    }
    return extras;
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
    setMeta('og:image', toAbsoluteImage(meta.image), true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'en_IN', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', TWITTER);
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('twitter:image', toAbsoluteImage(meta.image));

    if (!document.querySelector('link[rel="icon"]')) {
      setLink('icon', 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files/png_logo.png');
    }
    if (!document.querySelector('link[rel="manifest"]')) {
      setLink('manifest', '/site.webmanifest');
    }
    setMeta('theme-color', '#3d2850');

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
        'https://twitter.com/GirGovalan',
        'https://www.linkedin.com/company/girgovalan/',
        'https://in.pinterest.com/girgovalan/'
      ]
    });

    if (meta.type === 'product' && meta.product) {
      const p = meta.product;
      // Prefer one Product graph: drop static Product JSON-LD if present, then inject complete schema.
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          const types = Array.isArray(data)
            ? data.map(item => item && item['@type'])
            : [data && data['@type']];
          if (types.includes('Product')) script.remove();
        } catch (_) { /* ignore invalid JSON-LD */ }
      });
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        image: toAbsoluteImage(p.image),
        description: p.metaDescription || p.description,
        brand: { '@type': 'Brand', name: p.vendor || SITE_NAME },
        offers: {
          '@type': 'Offer',
          url: meta.url,
          priceCurrency: 'INR',
          price: String(p.price),
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: SITE_NAME },
          ...productOfferExtras()
        },
        ...productReviewExtras(p)
      };
      injectJsonLd(productSchema);

      const faqHtml = [p.tabs?.faq, p.longDescription].filter(Boolean).join('\n');
      const faqEntities = extractFaqEntities(faqHtml);
      if (faqEntities.length) {
        injectJsonLd({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqEntities
        });
      }
    }

    if (meta.type === 'article' && meta.article) {
      const a = meta.article;
      injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: meta.articleTitle || a.title,
        image: toAbsoluteImage(a.image),
        datePublished: a.date,
        description: meta.articleDescription || a.excerpt || excerptFromContent(a.content, 180),
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: 'https://cdn.shopify.com/s/files/1/0686/6944/0297/files/png_logo.png' }
        },
        mainEntityOfPage: meta.url
      });

      const faqEntities = extractFaqEntities(a.content);
      if (faqEntities.length) {
        injectJsonLd({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqEntities
        });
      }
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
