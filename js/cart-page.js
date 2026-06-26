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
        <p class="checkout-heading">Delivery details</p>
        <div class="field"><label for="checkout-name">Full name *</label><input type="text" id="checkout-name" name="checkout-name" required autocomplete="name"></div>
        <div class="field"><label for="checkout-phone">Mobile number *</label><input type="tel" id="checkout-phone" name="checkout-phone" required autocomplete="tel" placeholder="10-digit mobile"></div>
        <div class="field"><label for="checkout-email">Email</label><input type="email" id="checkout-email" name="checkout-email" autocomplete="email" placeholder="Optional"></div>
        <div class="field"><label for="checkout-address">Full address *</label><textarea id="checkout-address" name="checkout-address" rows="3" required placeholder="House / flat no., street, area" autocomplete="street-address"></textarea></div>
        <div class="field"><label for="checkout-landmark">Landmark</label><input type="text" id="checkout-landmark" name="checkout-landmark" placeholder="Near temple, school, etc. (optional)"></div>
        <div class="checkout-fields-row">
          <div class="field"><label for="checkout-city">City *</label><input type="text" id="checkout-city" name="checkout-city" required autocomplete="address-level2"></div>
          <div class="field"><label for="checkout-state">State *</label><input type="text" id="checkout-state" name="checkout-state" required autocomplete="address-level1" placeholder="e.g. Gujarat"></div>
        </div>
        <div class="field"><label for="checkout-pincode">PIN code *</label><input type="text" id="checkout-pincode" name="checkout-pincode" required autocomplete="postal-code" inputmode="numeric" maxlength="6" placeholder="6-digit PIN"></div>
      </div>
      <button type="button" class="btn btn-primary btn-block" id="razorpay-pay" style="margin-top:16px">Pay with Razorpay</button>
      <button type="button" class="btn btn-outline btn-block" id="whatsapp-order" style="margin-top:8px">Order on WhatsApp</button>
      <a href="${URLS.contact}" class="btn btn-outline btn-block" style="margin-top:8px">Contact Us</a>
      <p class="checkout-note">We deliver across India. Fill your full address so we can ship your order after payment.</p>
    </div>`;
  root.querySelectorAll('.cart-remove').forEach(btn => { btn.onclick = () => { removeFromCart(btn.dataset.key); renderCart(); }; });
  root.querySelectorAll('.cart-minus').forEach(btn => {
    btn.onclick = () => { const item = cart.find(i => i.key === btn.dataset.key); updateCartQty(btn.dataset.key, item.qty - 1); renderCart(); };
  });
  root.querySelectorAll('.cart-plus').forEach(btn => {
    btn.onclick = () => { const item = cart.find(i => i.key === btn.dataset.key); updateCartQty(btn.dataset.key, item.qty + 1); renderCart(); };
  });
  bindRazorpayPayButton(cart);
  const waBtn = document.getElementById('whatsapp-order');
  if (waBtn) {
    waBtn.onclick = () => {
      const customer = getCheckoutCustomerFromForm();
      if (!validateCheckoutCustomer(customer, { requireAddress: true })) return;
      window.open(whatsappOrderLink(cart, customer), '_blank', 'noopener');
    };
  }
}

function initCartPage() {
  if (document.getElementById('cart-root')) renderCart();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCartPage);
} else {
  initCartPage();
}
