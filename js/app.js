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

function addToCart(productId, qty = 1, variantLabel) {
  const product = getProduct(productId);
  if (!product) return;
  const cart = getCart();
  const key = variantLabel ? `${productId}::${variantLabel}` : productId;
  const existing = cart.find(i => i.key === key);
  const price = variantLabel && product.variants
    ? (product.variants.find(v => v.label === variantLabel)?.price || product.price)
    : product.price;
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

function whatsappOrderLink(cart) {
  const lines = cart.map(i => `• ${i.name}${i.variant ? ' (' + i.variant + ')' : ''} × ${i.qty} — ${formatPrice(i.price * i.qty)}`);
  const text = `Hello Gir Govalan! I would like to order:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(cartTotal(cart))}\n\nPlease confirm availability and payment details.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
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

function productCardHTML(p) {
  const stars = '★'.repeat(Math.round(p.rating || 5));
  const productUrl = typeof URLS !== 'undefined' ? URLS.product(p.id) : `/products/${p.id}/`;
  return `
    <article class="product-card" data-name="${p.name.toLowerCase()}">
      <a href="${productUrl}" class="product-card-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.compareAt ? '<span class="badge-sale">Sale</span>' : ''}
      </a>
      <div class="product-card-body">
        <p class="product-vendor">${p.vendor}</p>
        <h3><a href="${productUrl}">${p.name}</a></h3>
        <p class="product-rating">${stars}</p>
        <p class="product-price">${formatPrice(p.price)}${p.compareAt ? ` <s>${formatPrice(p.compareAt)}</s>` : ''}</p>
        <button type="button" class="btn btn-primary btn-sm" data-add-cart="${p.id}">Add to Cart</button>
      </div>
    </article>
  `;
}

function bindGlobalUI() {
  document.body.addEventListener('click', e => {
    const add = e.target.closest('[data-add-cart]');
    if (add) {
      e.preventDefault();
      addToCart(add.dataset.addCart, 1);
    }
  });

  document.addEventListener('click', e => {
    const toggle = e.target.closest('.mobile-toggle');
    if (toggle) document.querySelector('.nav-list')?.classList.toggle('open');

    const searchBtn = e.target.closest('.search-toggle');
    if (searchBtn) {
      const bar = document.querySelector('.search-bar');
      if (bar) {
        bar.hidden = !bar.hidden;
        if (!bar.hidden) document.getElementById('global-search')?.focus();
      }
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
