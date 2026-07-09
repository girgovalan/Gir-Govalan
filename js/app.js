/* Gir Govalan — cart, UI, forms */
const CART_KEY = 'girGovalanCart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.querySelectorAll('.cart-badge').forEach(b => {
    const n = cart.reduce((s, i) => s + (i.qty || 1), 0);
    b.textContent = n > 0 ? n : '';
  });
}

function addToCart(productId, qty = 1, variantLabel, priceOverride) {
  const product = getProduct(productId);
  if (!product) return;
  const cart = getCart();
  const key = variantLabel ? `${productId}::${variantLabel}` : productId;
  const existing = cart.find(i => i.key === key);
  const price = priceOverride != null
    ? priceOverride
    : (variantLabel && product.variants
      ? (product.variants.find(v => v.label === variantLabel)?.price || product.price)
      : product.price);
  if (existing) existing.qty += qty;
  else cart.push({ key, productId, name: product.name, price, qty: qty, variant: variantLabel || null, image: product.image });
  saveCart(cart);
  showToast(qty > 1 ? `Added ${qty} items to cart` : 'Added to cart');
}

function removeFromCart(key) {
  saveCart(getCart().filter(i => i.key !== key));
}

function updateCartQty(key, qty) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  if (qty < 1) removeFromCart(key);
  else { item.qty = qty; saveCart(cart); }
}

function cartTotal(cart) {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function formatDeliveryAddress(customer) {
  if (!customer) return '';
  const line2 = [customer.city, customer.state, customer.pincode].filter(Boolean).join(', ');
  return [customer.address, customer.landmark, line2].filter(Boolean).join('\n');
}

function getCheckoutCustomerFromForm() {
  return {
    name: document.getElementById('checkout-name')?.value?.trim() || '',
    contact: document.getElementById('checkout-phone')?.value?.trim() || '',
    email: document.getElementById('checkout-email')?.value?.trim() || '',
    address: document.getElementById('checkout-address')?.value?.trim() || '',
    landmark: document.getElementById('checkout-landmark')?.value?.trim() || '',
    city: document.getElementById('checkout-city')?.value?.trim() || '',
    state: document.getElementById('checkout-state')?.value?.trim() || '',
    pincode: document.getElementById('checkout-pincode')?.value?.trim() || ''
  };
}

function validateCheckoutCustomer(customer, opts = {}) {
  if (!customer.name) {
    showToast('Please enter your name.', 'error');
    return false;
  }
  const phone = (customer.contact || '').replace(/\D/g, '');
  if (phone.length < 10) {
    showToast('Please enter a valid 10-digit phone number.', 'error');
    return false;
  }
  if (opts.requireAddress) {
    if (!customer.address) {
      showToast('Please enter your full street address.', 'error');
      return false;
    }
    if (!customer.city) {
      showToast('Please enter your city.', 'error');
      return false;
    }
    if (!customer.state) {
      showToast('Please enter your state.', 'error');
      return false;
    }
    const pin = (customer.pincode || '').replace(/\s/g, '');
    if (!/^\d{6}$/.test(pin)) {
      showToast('Please enter a valid 6-digit PIN code.', 'error');
      return false;
    }
  }
  return true;
}

function whatsappOrderLink(cart, customer) {
  const lines = cart.map(i => `• ${i.name}${i.variant ? ' (' + i.variant + ')' : ''} × ${i.qty} — ${formatPrice(i.price * i.qty)}`);
  const addr = formatDeliveryAddress(customer);
  const text = [
    'Hello Gir Govalan! I would like to order:',
    '',
    ...lines,
    '',
    `Total: ${formatPrice(cartTotal(cart))}`,
    '',
    `Name: ${customer?.name || '—'}`,
    `Phone: ${customer?.contact || '—'}`,
    customer?.email ? `Email: ${customer.email}` : '',
    addr ? `\nDelivery address:\n${addr}` : '',
    '',
    'Please confirm availability and payment details. Thank you!'
  ].filter(Boolean).join('\n');
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

function whatsappPaidOrderLink(cart, customer, paymentId) {
  const lines = cart.map(i => `• ${i.name}${i.variant ? ' (' + i.variant + ')' : ''} × ${i.qty} — ${formatPrice(i.price * i.qty)}`);
  const addr = formatDeliveryAddress(customer);
  const text = [
    'Hello Gir Govalan! My Razorpay payment is complete.',
    '',
    `Payment ID: ${paymentId || '—'}`,
    `Name: ${customer.name || '—'}`,
    `Phone: ${customer.contact || '—'}`,
    customer.email ? `Email: ${customer.email}` : '',
    addr ? `\nDelivery address:\n${addr}` : '',
    '',
    'Order:',
    ...lines,
    '',
    `Total paid: ${formatPrice(cartTotal(cart))}`,
    '',
    'Please confirm my order and arrange delivery. Thank you!'
  ].filter(Boolean).join('\n');
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

function savePaidOrderForWhatsApp(cart, customer, paymentId) {
  try {
    sessionStorage.setItem('girGovalanPaidOrder', JSON.stringify({
      cart,
      customer,
      paymentId,
      savedAt: Date.now()
    }));
  } catch { /* ignore */ }
}

function getPaidOrderForWhatsApp() {
  try {
    const raw = sessionStorage.getItem('girGovalanPaidOrder');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.cart?.length) return null;
    return data;
  } catch {
    return null;
  }
}

function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = `toast toast--${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

function testimonialCardHTML(t) {
  const initials = t.author.split(/\s+/).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const stars = '★'.repeat(5);
  return `
    <div class="testimonial-card">
      <div class="testimonial-card-header">
        <div class="testimonial-avatar" aria-hidden="true">${initials}</div>
        <div class="testimonial-author-meta">
          <strong>${t.author}</strong>
          <span>${t.role}</span>
        </div>
      </div>
      <p class="testimonial-stars" aria-label="5 out of 5 stars">${stars}</p>
      <p>"${t.text}"</p>
    </div>`;
}

function featuredVideoCardHTML(v) {
  const poster = v.poster ? ` poster="${v.poster}"` : '';
  return `
    <article class="featured-video-card">
      <div class="featured-video-wrap">
        <video controls playsinline preload="none"${poster} aria-label="${v.title}">
          <source src="${v.src}" type="video/mp4">
          Your browser does not support video playback.
        </video>
      </div>
      <div class="featured-video-body">
        <h3>${v.title}</h3>
        <p>${v.description}</p>
      </div>
    </article>`;
}

function productCardHTML(p) {
  const stars = '★'.repeat(Math.round(p.rating || 5));
  const emptyStars = '☆'.repeat(5 - Math.round(p.rating || 5));
  const productUrl = typeof URLS !== 'undefined' ? URLS.product(p.id) : `/products/${p.id}/`;
  const extraClass = p.imageStyle === 'portrait' || p.imageStyle === 'fill'
    ? ` product-card--${p.imageStyle}` : '';
  const imgFocus = p.imageFocus ? ` style="object-position:center ${p.imageFocus}"` : '';
  const defaultVariant = p.variants?.[0];
  const price = defaultVariant?.price ?? p.price;
  const compareAt = defaultVariant?.compareAt ?? p.compareAt;
  const savings = compareAt && compareAt > price ? compareAt - price : 0;
  const savePct = savings ? Math.round((savings / compareAt) * 100) : 0;
  const hasVariants = p.variants && p.variants.length > 1;
  const variantSelect = hasVariants ? `
        <select class="product-card-variant" data-product-id="${p.id}" aria-label="Select size">
          ${p.variants.map((v, i) => `<option value="${v.label}" data-price="${v.price}" data-compare="${v.compareAt || ''}"${i === 0 ? ' selected' : ''}>${v.label}</option>`).join('')}
        </select>` : '';

  return `
    <article class="product-card${extraClass}" data-name="${p.name.toLowerCase()}">
      <a href="${productUrl}" class="product-card-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="400" height="500"${imgFocus}>
        ${p.featured ? '<span class="badge-bestseller">Best Seller</span>' : ''}
        ${p.compareAt && !p.featured ? '<span class="badge-sale">Sale</span>' : ''}
      </a>
      <div class="product-card-body">
        <h3><a href="${productUrl}">${p.name}</a></h3>
        <p class="product-rating-row-card">
          <span class="product-rating" aria-label="${Math.round(p.rating || 5)} out of 5 stars">${stars}${emptyStars}</span>
          <span class="product-review-count">${(p.reviewCount || 0).toLocaleString('en-IN')} reviews</span>
        </p>
        <div class="product-card-savings-slot">
          ${savings ? `<p class="product-savings">Your savings: ${formatPrice(savings)}</p>` : ''}
        </div>
        <div class="product-card-variant-slot">
          ${variantSelect}
        </div>
        <div class="product-card-price-row">
          <p class="product-price" data-price-display>${formatPrice(price)}${compareAt && compareAt > price ? ` <s>${formatPrice(compareAt)}</s>` : ''}</p>
          <span class="badge-save-pct${savePct ? '' : ' is-empty'}"${savePct ? '' : ' aria-hidden="true"'}>${savePct ? `Save ${savePct}%` : ''}</span>
        </div>
        <button type="button" class="btn btn-cta btn-sm product-card-cart" data-add-cart="${p.id}"${hasVariants ? ' data-has-variants' : ''}>Add to Cart</button>
      </div>
    </article>
  `;
}

function bindGlobalUI() {
  document.body.addEventListener('click', e => {
    const add = e.target.closest('[data-add-cart]');
    if (add) {
      e.preventDefault();
      if (add.dataset.hasVariants) {
        const sel = add.closest('.product-card')?.querySelector('.product-card-variant');
        addToCart(add.dataset.addCart, 1, sel?.value);
      } else {
        addToCart(add.dataset.addCart, 1);
      }
    }
  });

  document.body.addEventListener('change', e => {
    const sel = e.target.closest('.product-card-variant');
    if (!sel) return;
    const opt = sel.selectedOptions[0];
    const price = +opt.dataset.price;
    const compare = opt.dataset.compare ? +opt.dataset.compare : null;
    const card = sel.closest('.product-card');
    const display = card?.querySelector('[data-price-display]');
    const savingsSlot = card?.querySelector('.product-card-savings-slot');
    let savingsEl = card?.querySelector('.product-savings');
    if (display) {
      display.innerHTML = `${formatPrice(price)}${compare && compare > price ? ` <s>${formatPrice(compare)}</s>` : ''}`;
    }
    if (savingsSlot) {
      if (compare && compare > price) {
        if (!savingsEl) {
          savingsEl = document.createElement('p');
          savingsEl.className = 'product-savings';
          savingsSlot.appendChild(savingsEl);
        }
        savingsEl.textContent = `Your savings: ${formatPrice(compare - price)}`;
        savingsEl.hidden = false;
      } else if (savingsEl) {
        savingsEl.remove();
      }
    }
    const pctBadge = card?.querySelector('.badge-save-pct');
    if (pctBadge && compare && compare > price) {
      pctBadge.textContent = `Save ${Math.round(((compare - price) / compare) * 100)}%`;
      pctBadge.classList.remove('is-empty');
      pctBadge.removeAttribute('aria-hidden');
    } else if (pctBadge) {
      pctBadge.textContent = '';
      pctBadge.classList.add('is-empty');
      pctBadge.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('click', e => {
    const toggle = e.target.closest('.mobile-toggle');
    if (toggle) {
      const list = document.querySelector('.nav-list');
      const open = list?.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  });

  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.product-card').forEach(card => {
        const name = card.dataset.name || '';
        card.style.display = !q || name.includes(q) ? '' : 'none';
      });
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `/collections/all/?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value?.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email', 'error');
        return;
      }
      showToast('Thank you for subscribing!');
      form.reset();
    });
  });

  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bindGlobalUI();
  saveCart(getCart());
});
