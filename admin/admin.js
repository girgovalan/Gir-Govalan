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
$('#views').onclick = event => { const view = event.target.dataset.view; if (!view) return; document.querySelectorAll('#views button').forEach(button => button.classList.toggle('active', button.dataset.view === view)); $('#orders-view').hidden = view !== 'orders'; $('#customers-view').hidden = view !== 'customers'; if (view === 'customers') loadCustomers(); else loadOrders(); };
$('#filters').onclick = event => { if (!event.target.dataset.status && event.target.tagName !== 'BUTTON') return; activeStatus = event.target.dataset.status || ''; document.querySelectorAll('#filters button').forEach(button => button.classList.toggle('active', button.dataset.status === activeStatus)); loadOrders(); };
if (token()) showDashboard(); else showLogin();