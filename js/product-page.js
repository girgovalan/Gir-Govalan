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
  link.href = 'https://www.girgovalan.com/products/' + id + '/';
  document.head.appendChild(link);

  const imgs = product.images || [product.image];
  const milkPricing = product.variantPricing;
  let milkSelection = milkPricing
    ? { material: milkPricing.default.material, litres: milkPricing.default.litres }
    : null;

  function milkRate(material) {
    return milkPricing?.rates[material] || 0;
  }

  function milkPrice(material, litres) {
    return milkRate(material) * litres;
  }

  function milkCompareAt(material, litres) {
    const sale = milkPrice(material, litres);
    if (material === 'pouch') return milkPrice('glass', litres);
    return sale;
  }

  function milkMaterialLabel(material) {
    return material === 'pouch' ? 'Pouch' : 'Glass Bottle';
  }

  function milkVariantLabel(material, litres) {
    return `${milkMaterialLabel(material)} · ${litres} Litres`;
  }

  let selectedVariant = !milkPricing && product.variants ? product.variants[0] : null;
  let price = milkPricing
    ? milkPrice(milkSelection.material, milkSelection.litres)
    : (selectedVariant ? selectedVariant.price : product.price);
  let compareAt = milkPricing
    ? milkCompareAt(milkSelection.material, milkSelection.litres)
    : (selectedVariant?.compareAt ?? product.compareAt);

  function priceHtml(p, compare) {
    if (compare && compare > p) {
      return `<span class="product-price-sale">${formatPrice(p)}</span> <s class="product-price-was">${formatPrice(compare)}</s>`;
    }
    return formatPrice(p);
  }

  function shopifyPriceBlock(p, compare) {
    const regular = compare && compare >= p ? compare : p;
    const sale = p;
  if (regular > sale) {
      return `
        <div class="product-price-block">
          <p class="product-price-line"><span class="product-price-label">Regular price</span> <s class="product-price-was">${formatPrice(regular)}</s></p>
          <p class="product-price-line product-price-line--sale"><span class="product-price-label">Sale price</span> <span class="product-price-sale" id="product-price">${formatPrice(sale)}</span></p>
        </div>`;
    }
    return `
      <div class="product-price-block">
        <p class="product-price-line"><span class="product-price-label">Regular price</span> <span id="product-price-regular">${formatPrice(regular)}</span></p>
        <p class="product-price-line product-price-line--sale"><span class="product-price-label">Sale price</span> <span class="product-price-sale" id="product-price">${formatPrice(sale)}</span></p>
      </div>`;
  }

  function updateMainPrice() {
    const block = document.getElementById('product-price-block');
    if (!block) return;
    block.innerHTML = shopifyPriceBlock(price, compareAt).trim();
  }

  function variantButtons() {
    if (!product.variants) return '';
    return product.variants.map((v, i) => `
      <button type="button" class="variant-pill${i === 0 ? ' active' : ''}" data-label="${v.label}" data-price="${v.price}" data-compare="${v.compareAt || ''}">
        <span class="variant-pill-label">${v.label}</span>
        <span class="variant-pill-price">${formatPrice(v.price)}</span>
      </button>`).join('');
  }

  function milkVariantSection() {
    const presets = milkPricing.litrePresets;
    const materialButtons = ['pouch', 'glass'].map(id => {
      const active = milkSelection.material === id ? ' active' : '';
      const label = milkMaterialLabel(id);
      const rate = milkRate(id);
      const total = milkPrice(id, milkSelection.litres);
      return `<button type="button" class="variant-pill${active}" data-milk-material="${id}">
        <span class="variant-pill-label">${label} <small>(Rs ${rate}/ltr)</small></span>
        <span class="variant-pill-price">${formatPrice(total)}</span>
      </button>`;
    }).join('');

    const litreButtons = presets.map(p => {
      const active = milkSelection.litres === p.litres ? ' active' : '';
      const total = milkPrice(milkSelection.material, p.litres);
      return `<button type="button" class="variant-pill${active}" data-milk-litres="${p.litres}">
        <span class="variant-pill-label">${p.litres} Litres <small>${p.hint}</small></span>
        <span class="variant-pill-price">${formatPrice(total)}</span>
      </button>`;
    }).join('');

    const { min, max } = milkPricing.customLitres;
    const calcNote = `Rs ${milkRate(milkSelection.material)}/ltr × ${milkSelection.litres} litres = ${formatPrice(price)}`;

    return `
      <p class="variant-label"><strong>Material:</strong> <span id="selected-material">${milkMaterialLabel(milkSelection.material)}</span></p>
      <div class="variant-pills variant-pills-stacked" id="variants-material">${materialButtons}</div>
      <p class="variant-label"><strong>Select litres:</strong> <span id="selected-litres">${milkSelection.litres} Litres</span></p>
      <div class="variant-pills variant-pills-stacked" id="variants-litres">${litreButtons}</div>
      <div class="litre-custom-row">
        <label class="litre-custom-label" for="custom-litres">Custom litres (${min}–${max})</label>
        <div class="delivery-check-row">
          <input type="number" class="delivery-pincode-input" id="custom-litres" min="${min}" max="${max}" placeholder="e.g. 10" inputmode="numeric">
          <button type="button" class="btn btn-outline btn-delivery-check" id="apply-custom-litres">Apply</button>
        </div>
      </div>
      <p class="product-price-calc-note" id="price-calc-note">${calcNote}</p>`;
  }

  function refreshMilkVariantUi() {
    price = milkPrice(milkSelection.material, milkSelection.litres);
    compareAt = milkCompareAt(milkSelection.material, milkSelection.litres);
    selectedVariant = { label: milkVariantLabel(milkSelection.material, milkSelection.litres), price, compareAt };
    updateMainPrice();

    document.querySelectorAll('[data-milk-material]').forEach(btn => {
      const id = btn.dataset.milkMaterial;
      btn.classList.toggle('active', milkSelection.material === id);
      const priceEl = btn.querySelector('.variant-pill-price');
      if (priceEl) priceEl.textContent = formatPrice(milkPrice(id, milkSelection.litres));
    });

    document.querySelectorAll('[data-milk-litres]').forEach(btn => {
      const litres = +btn.dataset.milkLitres;
      btn.classList.toggle('active', milkSelection.litres === litres);
      const priceEl = btn.querySelector('.variant-pill-price');
      if (priceEl) priceEl.textContent = formatPrice(milkPrice(milkSelection.material, litres));
    });

    const matEl = document.getElementById('selected-material');
    const litresEl = document.getElementById('selected-litres');
    const noteEl = document.getElementById('price-calc-note');
    if (matEl) matEl.textContent = milkMaterialLabel(milkSelection.material);
    if (litresEl) litresEl.textContent = `${milkSelection.litres} Litres`;
    if (noteEl) {
      noteEl.textContent = `Rs ${milkRate(milkSelection.material)}/ltr × ${milkSelection.litres} litres = ${formatPrice(price)}`;
    }
  }

  function deliveryCheckSection() {
    if (!product.deliveryCheck) return '';
    return `
      <div class="product-delivery-check">
        <p class="variant-label product-delivery-check-title"><strong>DELIVERY OPTIONS</strong></p>
        <div class="delivery-check-row">
          <input type="text" class="delivery-pincode-input" id="delivery-pincode" placeholder="Enter your zipcode" maxlength="6" inputmode="numeric" autocomplete="postal-code">
          <button type="button" class="btn btn-outline btn-delivery-check" id="delivery-check-btn">Check</button>
        </div>
        <p class="delivery-check-result" id="delivery-check-result" hidden></p>
      </div>`;
  }

  function checkPincode(pin) {
    const cleaned = String(pin || '').replace(/\D/g, '');
    if (cleaned.length !== 6) return { ok: false, message: 'Please enter a valid 6-digit Indian pin code.' };
    if (cleaned.startsWith('395')) {
      return { ok: true, message: 'Delivery available in Surat (including Varachha, Mota Varachha, Adajan, Vesu, Katargam). Confirm slot on WhatsApp after order.' };
    }
    const gujaratPrefixes = ['360', '361', '362', '363', '364', '365', '366', '370', '380', '382', '383', '384', '385', '387', '388', '389', '390', '391', '392', '393', '394', '396'];
    if (gujaratPrefixes.some(p => cleaned.startsWith(p))) {
      return { ok: true, message: 'Gujarat delivery available. Share your full address on WhatsApp to confirm timing.' };
    }
    return { ok: false, message: 'This pin code is outside our regular Surat/Gujarat milk route. Message us on WhatsApp for a custom quote.' };
  }


  function featureBadges() {
    if (!product.features?.length) return '';
    return `<div class="product-features">${product.features.map(f => `<span class="product-feature-badge">${f}</span>`).join('')}</div>`;
  }

  function imageGallery() {
    const galleryClass = product.imageStyle === 'portrait' ? ' product-gallery--portrait'
      : product.imageStyle === 'fill' ? ' product-gallery--fill' : '';
    const imgFocusStyle = product.imageFocus
      ? ` style="object-position:${product.imageFocus === 'center' ? 'center' : `center ${product.imageFocus}`}"`
      : '';
    const thumbs = imgs.map((src, i) => `
      <button type="button" class="product-thumb${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="View image ${i + 1}">
        <img src="${src}" alt=""${product.imageFocus ? ` style="object-position:center ${product.imageFocus}"` : ''}>
      </button>`).join('');
    return `
      <div class="product-gallery${galleryClass}">
        <button type="button" class="product-main-image-btn" id="open-image-modal" aria-label="Open image">
          <img id="main-img" src="${imgs[0]}" alt="${product.name}"${imgFocusStyle}>
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
  const trustHeadline = product.category === 'ghee'
    ? 'Authentic Gir Cow A2 Bilona Ghee — Made Traditionally From Gir Cows'
    : product.category === 'dairy' && product.id === 'a2-gir-milk'
      ? 'Fresh A2 Gir Cow Milk — Farm to Home in Surat & Gujarat'
      : product.category === 'dairy'
        ? 'Fresh A2 Gir Cow Dairy — Farm-Sourced Quality from Gir Govalan'
        : 'Authentic farm-sourced quality from Gir Govalan';
  const deliveryInfo = '<p class="product-delivery-note">Free delivery above ₹999 | Dispatch in 24-48 hours | WhatsApp support available</p>';
  const trustRow = `
    <div class="product-trust-row">
      <a href="/pages/gallery/">Farm photos</a>
      <a href="/#home-videos">Process video</a>
      <a href="/#label-testimonials">Customer reviews</a>
      <a href="/pages/who-is-gir-govalan/">Customer stories</a>
    </div>`;

  root.innerHTML = `
    <div class="featured-product product-page-layout">
      <div>${imageGallery()}</div>
      <div class="product-buy-box">
        <p class="product-trust-headline">${trustHeadline}</p>
        <p class="product-vendor">${product.vendor}</p>
        <h1>${product.name}${product.productSubtitle ? ` <span class="product-subtitle">— ${product.productSubtitle}</span>` : ''}</h1>
        <p class="product-rating-row">
          <span class="product-rating">${'★'.repeat(Math.round(product.rating || 5))}</span>
          ${reviewCount}
        </p>
        <div id="product-price-block">${shopifyPriceBlock(price, compareAt)}</div>
        ${deliveryInfo}
        <p class="product-tax-note">Inclusive of all taxes</p>
        <p class="product-short-desc">${product.description}</p>
        ${trustRow}
        ${featureBadges()}
        ${milkPricing ? milkVariantSection() : (product.variants ? `
          <p class="variant-label"><strong>Size:</strong> <span id="selected-size">${product.variants[0].label}</span></p>
          <div class="variant-pills variant-pills-grid" id="variants">${variantButtons()}</div>
        ` : '')}
        ${deliveryCheckSection()}
        <div class="product-purchase-row">
          <div class="qty-row">
            <button type="button" class="qty-btn" id="qty-minus" aria-label="Decrease quantity">−</button>
            <input type="number" class="qty-input" id="qty" value="1" min="1" aria-label="Quantity">
            <button type="button" class="qty-btn" id="qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="btn btn-cta btn-add-cart-lg" id="add-cart">Add To Cart</button>
        </div>
        <div class="product-cta-row product-cta-row--primary">
          <button type="button" class="btn btn-secondary" id="wa-single">Order on WhatsApp</button>
        </div>
        <div class="product-cta-row product-cta-row--secondary">
          ${product.id === 'a2-gir-milk'
            ? '<a href="/blogs/news/gir-cow-milk-for-toddlers/" class="btn btn-outline">A2 Milk Guide for Families</a>'
            : product.category === 'ghee'
              ? '<a href="/blogs/news/how-to-identify-pure-gir-cow-ghee/" class="btn btn-outline">How to Identify Pure Ghee</a>'
              : '<a href="/blogs/news/benefits-of-gir-cow-ghee/" class="btn btn-outline">Gir Cow Ghee Benefits</a>'}
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

  // Variants (flat)
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
      updateMainPrice();
      const sizeEl = document.getElementById('selected-size');
      if (sizeEl) sizeEl.textContent = selectedVariant.label;
    });
  });

  // Milk pricing (material × litres)
  if (milkPricing) {
    selectedVariant = { label: milkVariantLabel(milkSelection.material, milkSelection.litres), price, compareAt };
    document.querySelectorAll('[data-milk-material]').forEach(btn => {
      btn.addEventListener('click', () => {
        milkSelection.material = btn.dataset.milkMaterial;
        refreshMilkVariantUi();
      });
    });
    document.querySelectorAll('[data-milk-litres]').forEach(btn => {
      btn.addEventListener('click', () => {
        milkSelection.litres = +btn.dataset.milkLitres;
        const customInput = document.getElementById('custom-litres');
        if (customInput) customInput.value = '';
        refreshMilkVariantUi();
      });
    });
    document.getElementById('apply-custom-litres')?.addEventListener('click', () => {
      const input = document.getElementById('custom-litres');
      if (!input) return;
      const val = Math.round(+input.value);
      const { min, max } = milkPricing.customLitres;
      if (!val || val < min || val > max) {
        showToast(`Enter litres between ${min} and ${max}`);
        return;
      }
      milkSelection.litres = val;
      refreshMilkVariantUi();
    });
  }


  document.getElementById('delivery-check-btn')?.addEventListener('click', () => {
    const input = document.getElementById('delivery-pincode');
    const result = document.getElementById('delivery-check-result');
    if (!input || !result) return;
    const status = checkPincode(input.value);
    result.hidden = false;
    result.className = 'delivery-check-result' + (status.ok ? ' delivery-check-result--ok' : ' delivery-check-result--warn');
    result.textContent = status.message;
  });
  document.getElementById('delivery-pincode')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('delivery-check-btn')?.click();
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
    addToCart(product.id, +document.getElementById('qty').value, selectedVariant?.label, price);
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
