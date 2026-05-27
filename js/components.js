/* Shared header & footer */
(function () {
  function getCurrentPage() {
    const p = window.location.pathname.toLowerCase();
    if (p === '/' || p.endsWith('/index.html') && !p.includes('/pages/') && !p.includes('/blogs/') && !p.includes('/collections/') && !p.includes('/products/') && !p.includes('/cart')) return 'home';
    if (p.includes('who-is-gir-govalan')) return 'about';
    if (p.includes('/pages/contact') || p.endsWith('contact.html')) return 'contact';
    if (p.includes('/pages/gallery') || p.endsWith('gallery.html')) return 'gallery';
    if (p.includes('/blogs/news') || p.endsWith('blog.html') || p.endsWith('blog-post.html')) return 'blog';
    if (p.includes('/collections/') || p.endsWith('products.html')) return 'products';
    if (p.includes('/products/') || p.endsWith('product.html')) return 'products';
    if (p.includes('/cart')) return 'cart';
    return '';
  }

  const current = getCurrentPage();

  function isActive(key) {
    return current === key ? ' active' : '';
  }

  function cartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('girGovalanCart') || '[]');
      return cart.reduce((s, i) => s + (i.qty || 1), 0);
    } catch { return 0; }
  }

  function renderHeader() {
    const count = cartCount();
    const el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML = `
      <div class="announcement">
        <p>Free delivery on orders above ₹999 · Authentic Gir Cow Ghee from Gujarat</p>
      </div>
      <header class="header">
        <div class="container header-inner">
          <button class="mobile-toggle" aria-label="Menu" type="button">
            <span></span><span></span><span></span>
          </button>
          <a href="${URLS.home}" class="logo-link">
            <img src="${SITE.logo}" alt="${SITE.name}" class="logo-img" width="190" height="72">
          </a>
          <nav class="nav" aria-label="Main">
            <ul class="nav-list">
              <li><a href="${URLS.home}" class="nav-link${isActive('home')}">Home</a></li>
              <li class="has-dropdown">
                <a href="${URLS.products}" class="nav-link${isActive('products')}">Products <span class="caret">▾</span></a>
                <ul class="dropdown">
                  <li><a href="${URLS.products}">All Products</a></li>
                  <li><a href="${URLS.productsCategory('ghee')}">Ghee</a></li>
                  <li><a href="${URLS.productsCategory('dairy')}">Dairy Products</a></li>
                  <li><a href="${URLS.productsCategory('sweets')}">Traditional Sweets</a></li>
                  <li><a href="${URLS.productsCategory('seeds-nuts')}">Seeds & Nuts</a></li>
                </ul>
              </li>
              <li><a href="${URLS.about}" class="nav-link${isActive('about')}">About</a></li>
              <li><a href="${URLS.gallery}" class="nav-link${isActive('gallery')}">Gallery</a></li>
              <li><a href="${URLS.blog}" class="nav-link${isActive('blog')}">Blog</a></li>
              <li><a href="${URLS.contact}" class="nav-link${isActive('contact')}">Contact</a></li>
            </ul>
          </nav>
          <div class="header-actions">
            <button type="button" class="icon-btn search-toggle" aria-label="Search">⌕</button>
            <a href="${URLS.cart}" class="icon-btn cart-link" aria-label="Cart">
              🛒<span class="cart-badge">${count || ''}</span>
            </a>
          </div>
        </div>
        <div class="search-bar" hidden>
          <div class="container">
            <input type="search" id="global-search" placeholder="Search products..." autocomplete="off">
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = `
      <footer class="footer">
        <div class="footer-wave" aria-hidden="true"></div>
        <div class="container footer-grid">
          <div class="footer-brand">
            <img src="${SITE.logoFooter}" alt="${SITE.name}" width="160" class="footer-logo">
            <p>At Gir Govalan, we honor the timeless legacy of Gir Cow Ghee, crafted the way nature intended. Born in the heart of the Gir region, our ghee is hand-churned using the ancient bilona method.</p>
            <p class="footer-tagline"><em>${SITE.tagline}</em></p>
            <div class="social-links">
              <a href="${SITE.social.facebook}" target="_blank" rel="noopener">Facebook</a>
              <a href="${SITE.social.instagram}" target="_blank" rel="noopener">Instagram</a>
              <a href="${SITE.social.youtube}" target="_blank" rel="noopener">YouTube</a>
              <a href="${SITE.social.twitter}" target="_blank" rel="noopener">Twitter</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><a href="${URLS.products}">All Products</a></li>
              <li><a href="${URLS.productsCategory('ghee')}">Ghee</a></li>
              <li><a href="${URLS.productsCategory('dairy')}">Dairy</a></li>
              <li><a href="${URLS.productsCategory('sweets')}">Sweets</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="${URLS.about}">Who Is Gir Govalan</a></li>
              <li><a href="${URLS.gallery}">Gallery</a></li>
              <li><a href="${URLS.blog}">Blog</a></li>
              <li><a href="${URLS.contact}">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <ul class="contact-list">
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li><a href="tel:${SITE.phone.replace(/\s/g,'')}">${SITE.phone}</a></li>
              <li>${SITE.address}</li>
            </ul>
          </div>
        </div>
        <div class="footer-cows">
          <picture>
            <source media="(max-width: 500px)" srcset="${SITE.footerImageMobile}">
            <img src="${SITE.footerImageDesktop}" alt="Gir cows at Gir Govalan farm" class="footer-cows-img" width="1200" height="289" loading="lazy">
          </picture>
        </div>
        <div class="footer-bottom container">
          <p>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  function sectionLabel(text) {
    return `<div class="section-label"><img src="${SITE.decor}" alt="" width="90" height="23"><span>${text}</span></div>`;
  }

  window.renderHeader = renderHeader;
  window.renderFooter = renderFooter;
  window.sectionLabel = sectionLabel;

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();
