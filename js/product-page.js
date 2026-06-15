(function () {
  const parts = location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
  const id = parts[parts.indexOf('products') + 1];
  const product = getProduct(id);
  const root = document.getElementById('product-root');

  if (!product) {
    root.innerHTML = '<div class="text-center"><h2>Product not found</h2><a href="/collections/all/" class="btn btn-primary">Browse products</a></div>';
    return;
  }

  document.title = product.name + ' — Gir Govalan';
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = 'https://girgovalan.com/products/' + id + '/';
  document.head.appendChild(link);

  const imgs = product.images || [product.image];
  let selectedVariant = product.variants ? product.variants[0] : null;
  let price = selectedVariant ? selectedVariant.price : product.price;
  let compareAt = selectedVariant?.compareAt ?? product.compareAt;

  function priceHtml(p, compare) {
    if (compare && compare > p) {
      return `<span class="product-price-sale">${formatPrice(p)}</span> <s class="product-price-was">${formatPrice(compare)}</s>`;
    }
    return formatPrice(p);
  }

  function variantButtons() {
    if (!product.variants) return '';
    return product.variants.map((v, i) => `
      <button type="button" class="variant-pill${i === 0 ? ' active' : ''}" data-label="${v.label}" data-price="${v.price}" data-compare="${v.compareAt || ''}">
        <span class="variant-pill-label">${v.label}</span>
        <span class="variant-pill-price">${formatPrice(v.price)}</span>
      </button>`).join('');
  }

  function featureBadges() {
    if (!product.features?.length) return '';
    return `<div class="product-features">${product.features.map(f => `<span class="product-feature-badge">${f}</span>`).join('')}</div>`;
  }

  function imageGallery() {
    const thumbs = imgs.map((src, i) => `
      <button type="button" class="product-thumb${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="View image ${i + 1}">
        <img src="${src}" alt="">
      </button>`).join('');
    return `
      <div class="product-gallery">
        <button type="button" class="product-main-image-btn" id="open-image-modal" aria-label="Open image">
          <img id="main-img" src="${imgs[0]}" alt="${product.name}">
        </button>
        ${imgs.length > 1 ? `<div class="product-thumbs">${thumbs}</div>` : ''}
      </div>
      <div class="product-image-modal" id="image-modal" hidden>
        <button type="button" class="product-image-modal-close" id="close-image-modal" aria-label="Close">&times;</button>
        <img id="modal-img" src="${imgs[0]}" alt="${product.name}">
      </div>`;
  }

  function tabsSection() {
    if (!product.tabs) return product.longDescription
      ? `<div class="product-details article-content">${product.longDescription}</div>`
      : '';

    const tabKeys = Object.keys(product.tabs);
    const panels = tabKeys.map((key, i) => `
      <div class="product-tab-panel${i === 0 ? ' active' : ''}" data-tab="${key}" role="tabpanel">
        ${product.tabs[key]}
      </div>`).join('');
    const buttons = tabKeys.map((key, i) => `
      <button type="button" class="product-tab-btn${i === 0 ? ' active' : ''}" data-tab="${key}" role="tab">${product.tabLabels?.[key] || key}</button>`).join('');

    return `
      <div class="product-tabs-wrap">
        <div class="product-tabs" role="tablist">${buttons}</div>
        <div class="product-tab-panels">${panels}</div>
      </div>
      ${product.longDescription ? `<div class="product-details article-content product-details-extra">${product.longDescription}</div>` : ''}`;
  }

  const reviewCount = product.reviewCount ? `<span class="product-review-count">${product.reviewCount.toLocaleString('en-IN')} reviews</span>` : '';

  root.innerHTML = `
    <div class="featured-product product-page-layout">
      <div>${imageGallery()}</div>
      <div class="product-buy-box">
        <p class="product-vendor">${product.vendor}</p>
        <h1>${product.name}</h1>
        <p class="product-rating-row">
          <span class="product-rating">${'★'.repeat(Math.round(product.rating || 5))}</span>
          ${reviewCount}
        </p>
        <p class="product-price" id="product-price">${priceHtml(price, compareAt)}</p>
        <p class="product-tax-note">Inclusive of all taxes</p>
        <p class="product-short-desc">${product.description}</p>
        ${featureBadges()}
        ${product.variants ? `
          <p class="variant-label"><strong>Size:</strong> <span id="selected-size">${product.variants[0].label}</span></p>
          <div class="variant-pills variant-pills-stacked" id="variants">${variantButtons()}</div>
        ` : ''}
        <div class="qty-row">
          <button type="button" class="qty-btn" id="qty-minus" aria-label="Decrease quantity">−</button>
          <input type="number" class="qty-input" id="qty" value="1" min="1" aria-label="Quantity">
          <button type="button" class="qty-btn" id="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <div class="product-cta-row">
          <button type="button" class="btn btn-primary" id="add-cart">Add to Cart</button>
          <button type="button" class="btn btn-secondary" id="wa-single">Order on WhatsApp</button>
        </div>
      </div>
    </div>
    ${tabsSection()}`;

  // Image gallery
  document.querySelectorAll('.product-thumb').forEach(btn => {
    btn.onclick = () => {
      const idx = +btn.dataset.index;
      document.getElementById('main-img').src = imgs[idx];
      const modalImg = document.getElementById('modal-img');
      if (modalImg) modalImg.src = imgs[idx];
      document.querySelectorAll('.product-thumb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });

  const modal = document.getElementById('image-modal');
  document.getElementById('open-image-modal')?.addEventListener('click', () => {
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });
  document.getElementById('close-image-modal')?.addEventListener('click', () => {
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
  });
  modal?.addEventListener('click', e => {
    if (e.target === modal) {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
  });

  // Variants
  document.querySelectorAll('#variants .variant-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#variants .variant-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedVariant = {
        label: btn.dataset.label,
        price: +btn.dataset.price,
        compareAt: btn.dataset.compare ? +btn.dataset.compare : null
      };
      price = selectedVariant.price;
      compareAt = selectedVariant.compareAt;
      document.getElementById('product-price').innerHTML = priceHtml(price, compareAt);
      const sizeEl = document.getElementById('selected-size');
      if (sizeEl) sizeEl.textContent = selectedVariant.label;
    });
  });

  // Tabs
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.onclick = () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.product-tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.product-tab-panel[data-tab="${tab}"]`)?.classList.add('active');
    };
  });

  document.getElementById('qty-minus').onclick = () => {
    const el = document.getElementById('qty');
    if (+el.value > 1) el.value = +el.value - 1;
  };
  document.getElementById('qty-plus').onclick = () => {
    document.getElementById('qty').value = +document.getElementById('qty').value + 1;
  };
  document.getElementById('add-cart').onclick = () => {
    addToCart(product.id, +document.getElementById('qty').value, selectedVariant?.label);
  };
  document.getElementById('wa-single').onclick = () => {
    const qty = +document.getElementById('qty').value;
    window.open(whatsappOrderLink([{
      key: 'wa', productId: product.id, name: product.name, price, qty,
      variant: selectedVariant?.label, image: product.image
    }]), '_blank');
  };

  document.getElementById('related-products').innerHTML =
    PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map(productCardHTML).join('') ||
    PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(productCardHTML).join('');
})();
