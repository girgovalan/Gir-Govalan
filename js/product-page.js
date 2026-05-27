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

  root.innerHTML = `
    <div class="featured-product">
      <div><img id="main-img" src="${imgs[0]}" alt="${product.name}"></div>
      <div>
        <p class="product-vendor">${product.vendor}</p>
        <h1>${product.name}</h1>
        <p class="product-rating">${'★'.repeat(Math.round(product.rating || 5))}</p>
        <p class="product-price" id="product-price">${formatPrice(price)}</p>
        <p>${product.description}</p>
        ${product.variants ? `<div class="variant-pills" id="variants">${product.variants.map((v, i) =>
          `<button type="button" class="variant-pill${i === 0 ? ' active' : ''}" data-label="${v.label}" data-price="${v.price}">${v.label}</button>`
        ).join('')}</div>` : ''}
        <div class="qty-row">
          <button type="button" class="qty-btn" id="qty-minus">−</button>
          <input type="number" class="qty-input" id="qty" value="1" min="1">
          <button type="button" class="qty-btn" id="qty-plus">+</button>
        </div>
        <button type="button" class="btn btn-primary" id="add-cart">Add to Cart</button>
        <button type="button" class="btn btn-secondary" style="margin-left:8px" id="wa-single">Order on WhatsApp</button>
      </div>
    </div>`;

  document.querySelectorAll('#variants .variant-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#variants .variant-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedVariant = { label: btn.dataset.label, price: +btn.dataset.price };
      price = selectedVariant.price;
      document.getElementById('product-price').textContent = formatPrice(price);
    });
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
