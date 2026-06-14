function renderCart() {
  const cart = getCart();
  const root = document.getElementById('cart-root');
  if (!cart.length) {
    root.innerHTML = `<div class="cart-empty"><h2>Your cart is empty</h2><p>Discover our authentic Gir cow ghee.</p><a href="${URLS.products}" class="btn btn-primary">Shop Products</a></div>`;
    return;
  }
  root.innerHTML = `
    <table class="cart-table">
      <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead>
      <tbody>${cart.map(item => `
        <tr data-key="${item.key}">
          <td><div class="cart-product"><img src="${item.image}" alt=""><div><strong>${item.name}</strong>${item.variant ? `<br><small>${item.variant}</small>` : ''}</div></div></td>
          <td>${formatPrice(item.price)}</td>
          <td><div class="qty-row"><button type="button" class="qty-btn cart-minus" data-key="${item.key}">−</button><span>${item.qty}</span><button type="button" class="qty-btn cart-plus" data-key="${item.key}">+</button></div></td>
          <td>${formatPrice(item.price * item.qty)}</td>
          <td><button type="button" class="btn btn-sm btn-outline cart-remove" data-key="${item.key}">Remove</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="cart-summary">
      <h3>Order summary</h3>
      <p><strong>Subtotal:</strong> ${formatPrice(cartTotal(cart))}</p>
      <div class="checkout-fields">
        <div class="field"><label for="checkout-name">Name *</label><input type="text" id="checkout-name" name="checkout-name" required autocomplete="name"></div>
        <div class="field"><label for="checkout-phone">Phone *</label><input type="tel" id="checkout-phone" name="checkout-phone" required autocomplete="tel" placeholder="10-digit mobile"></div>
        <div class="field"><label for="checkout-email">Email</label><input type="email" id="checkout-email" name="checkout-email" autocomplete="email"></div>
      </div>
      <button type="button" class="btn btn-primary btn-block" id="razorpay-pay" style="margin-top:16px">Pay with Razorpay</button>
      <a href="${whatsappOrderLink(cart)}" class="btn btn-outline btn-block" target="_blank" rel="noopener" style="margin-top:8px">Order on WhatsApp</a>
      <a href="${URLS.contact}" class="btn btn-outline btn-block" style="margin-top:8px">Contact Us</a>
      <p class="checkout-note">Secure online payment via UPI, card, or netbanking. Test mode active until Razorpay account is live.</p>
    </div>`;
  root.querySelectorAll('.cart-remove').forEach(btn => { btn.onclick = () => { removeFromCart(btn.dataset.key); renderCart(); }; });
  root.querySelectorAll('.cart-minus').forEach(btn => {
    btn.onclick = () => { const item = cart.find(i => i.key === btn.dataset.key); updateCartQty(btn.dataset.key, item.qty - 1); renderCart(); };
  });
  root.querySelectorAll('.cart-plus').forEach(btn => {
    btn.onclick = () => { const item = cart.find(i => i.key === btn.dataset.key); updateCartQty(btn.dataset.key, item.qty + 1); renderCart(); };
  });
  bindRazorpayPayButton(cart);
}

function initCartPage() {
  if (document.getElementById('cart-root')) renderCart();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCartPage);
} else {
  initCartPage();
}
