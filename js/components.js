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
            <img src="${SITE.logo}" alt="${SITE.name}" class="logo-img" width="300" height="100">
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
            <div class="social-links social-links-icons" aria-label="Social media links">
              <a class="social-icon-link" href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
                  <path d="M13.5 8.5V6.8c0-.7.5-1.2 1.2-1.2h1.8V2.5h-2.7c-2.5 0-4.1 1.6-4.1 4.2v1.8H7v3.1h2.7v9h3.8v-9h2.8l.4-3.1h-3.2z"></path>
                </svg>
              </a>
              <a class="social-icon-link" href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
                  <path d="M7.8 2.5h8.4c2.9 0 5.3 2.4 5.3 5.3v8.4c0 2.9-2.4 5.3-5.3 5.3H7.8c-2.9 0-5.3-2.4-5.3-5.3V7.8c0-2.9 2.4-5.3 5.3-5.3zm0 1.9c-1.9 0-3.4 1.5-3.4 3.4v8.4c0 1.9 1.5 3.4 3.4 3.4h8.4c1.9 0 3.4-1.5 3.4-3.4V7.8c0-1.9-1.5-3.4-3.4-3.4H7.8zm8.8 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4zm0 1.9a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z"></path>
                </svg>
              </a>
              <a class="social-icon-link" href="${SITE.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
                  <path d="M21.6 8.2a3 3 0 0 0-2.1-2.1C17.7 5.6 12 5.6 12 5.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1C2 10 2 12 2 12s0 2 .4 3.8a3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1c.4-1.8.4-3.8.4-3.8s0-2-.4-3.8zM10 15.1V8.9L15.2 12 10 15.1z"></path>
                </svg>
              </a>
              <a class="social-icon-link" href="${SITE.social.twitter}" target="_blank" rel="noopener" aria-label="Twitter">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
                  <path d="M18.9 3H22l-6.8 7.8L23 21h-6.2l-4.9-6.4L6.3 21H3.2l7.3-8.4L1 3h6.3l4.4 5.8L18.9 3zm-1.1 16h1.7L6.4 4.9H4.6L17.8 19z"></path>
                </svg>
              </a>
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
