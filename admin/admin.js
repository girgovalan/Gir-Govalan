const tokenKey = 'gir-govalan-admin-token';
let activeStatus = '';

const $ = selector => document.querySelector(selector);
const token = () => sessionStorage.getItem(tokenKey) || '';

function money(paise, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(paise / 100);
}

const shippingPartners = ['Manual / local carrier', 'Delhivery', 'Shiprocket', 'DHL', 'FedEx', 'UPS', 'Other'];

function trackingUrl(partner, trackingNumber) {
  if (!trackingNumber) return '';
  const encoded = encodeURIComponent(trackingNumber);
  if (partner === 'Delhivery') return `https://www.delhivery.com/track/package/${encoded}`;
  if (partner === 'DHL') return `https://www.dhl.com/global-en/home/tracking.html?tracking-id=${encoded}`;
  if (partner === 'FedEx') return `https://www.fedex.com/fedextrack/?trknbr=${encoded}`;
  if (partner === 'UPS') return `https://www.ups.com/track?tracknum=${encoded}`;
  return '';
}

function printOrder(order, label = false) {
  if (!order) return;
  const title = label ? 'Shipping label' : 'Invoice';
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const items = (order.items || []).map(item => `<li>${escapeHtml(item.name || item.productId)}${item.variant ? ` (${escapeHtml(item.variant)})` : ''} x ${escapeHtml(item.qty)}</li>`).join('');
  const popup = window.open('', '_blank');
  if (!popup) {
    alert('Please allow pop-ups for the admin dashboard to print this document.');
    return;
  }
  popup.document.open();
  popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)} #${escapeHtml(order.order_number)}</title><style>body{font:16px Arial,sans-serif;max-width:760px;margin:40px auto;color:#241d18}h1{font:28px Georgia,serif;border-bottom:2px solid #76528d;padding-bottom:12px}li{margin:8px 0}.total{font-size:20px;margin-top:24px}</style></head><body><h1>Gir Govalan - ${escapeHtml(title)}</h1><p>Order #${escapeHtml(order.order_number)}</p><h2>${escapeHtml(order.customer_name)}</h2><p>${escapeHtml(order.customer_phone)}<br>${escapeHtml(order.address)}<br>${escapeHtml(order.landmark)}<br>${escapeHtml(order.city)}, ${escapeHtml(order.state)} - ${escapeHtml(order.pincode)}</p><ul>${items}</ul><p class="total"><strong>Total: ${escapeHtml(money(order.amount_paise, order.currency))}</strong></p></body></html>`);
  popup.document.close();
  popup.onload = () => { popup.focus(); popup.print(); };
}

function orderCard(order) {
  const items = (order.items || []).map(item => `${item.name || item.productId}${item.variant ? ` (${item.variant})` : ''} × ${item.qty}`).join(', ');
  return `<article class="order"><div><h3>#${order.order_number} · ${order.customer_name}</h3><p class="meta">${new Date(order.created_at).toLocaleString()} · ${order.customer_phone}</p><p>${items}</p><p><strong>${money(order.amount_paise, order.currency)}</strong> · Payment: ${order.payment_status}</p></div><div><p>${order.address}<br>${order.city}, ${order.state} - ${order.pincode}</p><select class="order-status" data-id="${order.id}">${['new', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => `<option ${status === order.order_status ? 'selected' : ''}>${status}</option>`).join('')}</select><select class="shipping-partner" data-id="${order.id}"><option value="">Shipping partner</option>${shippingPartners.map(partner => `<option ${partner === order.shipping_partner ? 'selected' : ''}>${partner}</option>`).join('')}</select><input class="tracking" data-id="${order.id}" value="${order.tracking_number || ''}" placeholder="Tracking / AWB number"><div class="shipping-actions"><button data-shipment="create" data-order="${order.id}">Create shipment</button><button class="secondary" data-shipment="track" data-order="${order.id}">Track shipment</button></div></div><div class="order-actions"><button data-print="invoice" data-order="${order.id}">Print invoice</button><button class="secondary" data-print="label" data-order="${order.id}">Print label</button></div></article>`;
}

async function loadOrders() {
  $('#status').textContent = 'Loading orders...';
  const response = await fetch(`/api/admin-orders?status=${encodeURIComponent(activeStatus)}`, { headers: { Authorization: `Bearer ${token()}` } });
  if (response.status === 401) return showLogin('Invalid admin token.');
  const data = await response.json();
  $('#orders').innerHTML = data.orders?.length ? data.orders.map(orderCard).join('') : '<div class="panel" style="padding:24px">No orders found.</div>';
  $('#status').textContent = `${data.orders?.length || 0} order(s)`;
  document.querySelectorAll('.order-status').forEach(select => { select.onchange = () => saveShipping(select.dataset.id); });
  document.querySelectorAll('.shipping-partner').forEach(select => { select.onchange = () => saveShipping(select.dataset.id); });
  document.querySelectorAll('.tracking').forEach(input => { input.onchange = () => saveShipping(input.dataset.id); });
  document.querySelectorAll('[data-print]').forEach(button => { button.onclick = () => printOrder(data.orders.find(order => order.id === button.dataset.order), button.dataset.print === 'label'); });
  document.querySelectorAll('[data-shipment="create"]').forEach(button => { button.onclick = () => { const order = data.orders.find(item => item.id === button.dataset.order); alert(order?.shipping_partner ? 'Shipment creation is ready for this partner once its API credentials are configured.' : 'Select a shipping partner first.'); }; });
  document.querySelectorAll('[data-shipment="track"]').forEach(button => { button.onclick = () => { const order = data.orders.find(item => item.id === button.dataset.order); const url = trackingUrl(order?.shipping_partner, order?.tracking_number); if (url) window.open(url, '_blank', 'noopener'); else alert('Add a supported shipping partner and tracking/AWB number first.'); }; });
}

function customerCard(customer) {
  return `<article class="customer"><div><h3>${customer.name}</h3><p class="meta">${customer.phone}${customer.email ? ` · ${customer.email}` : ''}</p></div><div><p>${customer.address || 'No address saved'}<br>${[customer.city, customer.state, customer.pincode].filter(Boolean).join(', ')}</p></div><div><strong>${customer.order_count} order(s)</strong><p class="meta">${money(customer.total_spent_paise)}</p></div></article>`;
}

async function loadCustomers() {
  $('#customers-status').textContent = 'Loading customers...';
  const response = await fetch('/api/admin-customers', { headers: { Authorization: `Bearer ${token()}` } });
  if (response.status === 401) return showLogin('Invalid admin token.');
  const data = await response.json();
  $('#customers').innerHTML = data.customers?.length ? data.customers.map(customerCard).join('') : '<div class="panel" style="padding:24px">No customers found.</div>';
  $('#customers-status').textContent = `${data.customers?.length || 0} customer(s)`;
}

async function loadCoupons() {
  $('#coupons-status').textContent = 'Loading coupons...';
  const response = await fetch('/api/admin-coupons', { headers: { Authorization: `Bearer ${token()}` } });
  const data = await response.json();
  $('#coupons').innerHTML = data.coupons?.length ? data.coupons.map(coupon => `<article class="customer"><div><h3>${coupon.code}</h3><p class="meta">${coupon.discount_type === 'percentage' ? `${coupon.discount_value}% off` : money(coupon.discount_value * 100) + ' off'} · ${coupon.active ? 'Active' : 'Inactive'}</p></div><div><p>Used: ${coupon.usage_count}${coupon.usage_limit ? ` / ${coupon.usage_limit}` : ''}<br>${coupon.minimum_order_paise ? `Minimum order ${money(coupon.minimum_order_paise)}` : 'No minimum order'}</p></div><div><button class="secondary coupon-toggle" data-id="${coupon.id}" data-active="${coupon.active}">${coupon.active ? 'Disable' : 'Enable'}</button></div></article>`).join('') : '<div class="panel" style="padding:24px">No coupons found.</div>';
  $('#coupons-status').textContent = `${data.coupons?.length || 0} coupon(s)`;
  document.querySelectorAll('.coupon-toggle').forEach(button => { button.onclick = async () => { await fetch('/api/admin-coupons', { method: 'PATCH', headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ id: button.dataset.id, active: button.dataset.active !== 'true' }) }); loadCoupons(); }; });
}

async function loadProducts() {
  $('#products-status').textContent = 'Loading products...';
  const response = await fetch('/api/admin-products', { headers: { Authorization: `Bearer ${token()}` } });
  const data = await response.json();
  $('#products').innerHTML = (data.products || []).map(product => `<article class="product-row"><div><h3>${product.name}</h3><p class="meta">${product.id} · ${product.active ? 'Active' : 'Inactive'}</p></div><label>Price<input class="product-price" data-id="${product.id}" type="number" value="${(product.price_paise / 100).toFixed(2)}"></label><label>Stock<input class="product-stock" data-id="${product.id}" type="number" min="0" value="${product.stock_quantity}"></label><label>Low stock<input class="product-threshold" data-id="${product.id}" type="number" min="0" value="${product.low_stock_threshold}"></label><button class="save-product" data-id="${product.id}">Save</button></article>`).join('') || '<div class="panel" style="padding:24px">No products found.</div>';
  $('#products-status').textContent = `${data.products?.length || 0} product(s)`;
  document.querySelectorAll('.save-product').forEach(button => { button.onclick = async () => { const id = button.dataset.id; await fetch('/api/admin-products', { method: 'PATCH', headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ id, price: document.querySelector(`.product-price[data-id="${id}"]`).value, stock_quantity: document.querySelector(`.product-stock[data-id="${id}"]`).value, low_stock_threshold: document.querySelector(`.product-threshold[data-id="${id}"]`).value }) }); loadProducts(); }; });
}

async function loadAnalytics() {
  $('#analytics-status').textContent = 'Loading analytics...';
  const response = await fetch('/api/admin-analytics', { headers: { Authorization: `Bearer ${token()}` } });
  const data = await response.json();
  if (!response.ok) { $('#analytics-status').textContent = data.error || 'Could not load analytics.'; return; }
  const metric = (label, value) => `<article class="metric"><span class="meta">${label}</span><strong>${value}</strong></article>`;
  $('#analytics-cards').innerHTML = [metric('Total revenue', money(data.revenue)), metric('Paid orders', data.paidOrders), metric('Customers', data.customers), metric('New customers', data.newCustomers), metric('Repeat customers', data.repeatCustomers), metric('Repeat purchase rate', `${data.repeatRate.toFixed(1)}%`), metric('Average order value', money(data.averageOrderValue)), metric('Today', money(data.today)), metric('This month', money(data.month)), metric('Coupon discounts', money(data.couponDiscounts))].join('');
  $('#best-sellers').innerHTML = `<h2>Best-selling products</h2>${data.bestSellers?.length ? `<ol>${data.bestSellers.map(item => `<li>${item.name} · ${item.quantity} sold</li>`).join('')}</ol>` : '<p class="muted">No paid product sales yet.</p>'}`;
  $('#analytics-status').textContent = 'Paid orders only';
}

async function saveShipping(id) {
  const orderStatus = document.querySelector(`.order-status[data-id="${id}"]`).value;
  const trackingNumber = document.querySelector(`.tracking[data-id="${id}"]`).value;
  const shippingPartner = document.querySelector(`.shipping-partner[data-id="${id}"]`).value;
  await updateOrder(id, orderStatus, trackingNumber, shippingPartner);
}

async function updateOrder(id, orderStatus, trackingNumber, shippingPartner = '') {
  await fetch('/api/admin-orders', { method: 'PATCH', headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ id, order_status: orderStatus, tracking_number: trackingNumber, shipping_partner: shippingPartner }) });
}

function showLogin(error = '') { $('#login').hidden = false; $('#dashboard').hidden = true; $('#login-error').textContent = error; }
function showDashboard() { $('#login').hidden = true; $('#dashboard').hidden = false; loadOrders().catch(error => { $('#status').textContent = error.message; }); }

$('#login-form').onsubmit = event => { event.preventDefault(); sessionStorage.setItem(tokenKey, $('#token').value.trim()); showDashboard(); };
$('#logout').onclick = () => { sessionStorage.removeItem(tokenKey); showLogin(); };
$('#refresh').onclick = loadOrders;
$('#views').onclick = event => { const view = event.target.dataset.view; if (!view) return; document.querySelectorAll('#views button').forEach(button => button.classList.toggle('active', button.dataset.view === view)); ['orders', 'customers', 'coupons', 'products', 'analytics'].forEach(name => { $(`#${name}-view`).hidden = view !== name; }); if (view === 'customers') loadCustomers(); else if (view === 'coupons') loadCoupons(); else if (view === 'products') loadProducts(); else if (view === 'analytics') loadAnalytics(); else loadOrders(); };
$('#coupon-form').onsubmit = async event => { event.preventDefault(); const body = Object.fromEntries(new FormData(event.target)); body.one_per_customer = event.target.one_per_customer.checked; const response = await fetch('/api/admin-coupons', { method: 'POST', headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); const result = await response.json(); $('#coupons-status').textContent = response.ok ? 'Coupon created.' : result.error; event.target.reset(); loadCoupons(); };
$('#filters').onclick = event => { if (!event.target.dataset.status && event.target.tagName !== 'BUTTON') return; activeStatus = event.target.dataset.status || ''; document.querySelectorAll('#filters button').forEach(button => button.classList.toggle('active', button.dataset.status === activeStatus)); loadOrders(); };
if (token()) showDashboard(); else showLogin();