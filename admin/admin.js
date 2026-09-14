const tokenKey = 'gir-govalan-admin-token';
let activeStatus = '';

const $ = selector => document.querySelector(selector);
const token = () => sessionStorage.getItem(tokenKey) || '';

function money(paise, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(paise / 100);
}

function printOrder(order, label = false) {
  const title = label ? 'Shipping label' : 'Invoice';
  const items = (order.items || []).map(item => `<li>${item.name || item.productId}${item.variant ? ` (${item.variant})` : ''} × ${item.qty}</li>`).join('');
  const popup = window.open('', '_blank', 'noopener');
  popup.document.write(`<title>${title} #${order.order_number}</title><h1>Gir Govalan - ${title}</h1><p>Order #${order.order_number}</p><h2>${order.customer_name}</h2><p>${order.customer_phone}<br>${order.address}<br>${order.landmark || ''}<br>${order.city}, ${order.state} - ${order.pincode}</p><ul>${items}</ul><strong>Total: ${money(order.amount_paise, order.currency)}</strong>`);
  popup.print();
}

function orderCard(order) {
  const items = (order.items || []).map(item => `${item.name || item.productId}${item.variant ? ` (${item.variant})` : ''} × ${item.qty}`).join(', ');
  return `<article class="order"><div><h3>#${order.order_number} · ${order.customer_name}</h3><p class="meta">${new Date(order.created_at).toLocaleString()} · ${order.customer_phone}</p><p>${items}</p><p><strong>${money(order.amount_paise, order.currency)}</strong> · Payment: ${order.payment_status}</p></div><div><p>${order.address}<br>${order.city}, ${order.state} - ${order.pincode}</p><select class="order-status" data-id="${order.id}">${['new', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => `<option ${status === order.order_status ? 'selected' : ''}>${status}</option>`).join('')}</select><input class="tracking" data-id="${order.id}" value="${order.tracking_number || ''}" placeholder="Tracking number"></div><div class="order-actions"><button data-print="invoice" data-order="${order.id}">Print invoice</button><button class="secondary" data-print="label" data-order="${order.id}">Print label</button></div></article>`;
}

async function loadOrders() {
  $('#status').textContent = 'Loading orders...';
  const response = await fetch(`/api/admin-orders?status=${encodeURIComponent(activeStatus)}`, { headers: { Authorization: `Bearer ${token()}` } });
  if (response.status === 401) return showLogin('Invalid admin token.');
  const data = await response.json();
  $('#orders').innerHTML = data.orders?.length ? data.orders.map(orderCard).join('') : '<div class="panel" style="padding:24px">No orders found.</div>';
  $('#status').textContent = `${data.orders?.length || 0} order(s)`;
  document.querySelectorAll('.order-status').forEach(select => { select.onchange = () => updateOrder(select.dataset.id, select.value, document.querySelector(`.tracking[data-id="${select.dataset.id}"]`).value); });
  document.querySelectorAll('.tracking').forEach(input => { input.onchange = () => updateOrder(input.dataset.id, document.querySelector(`.order-status[data-id="${input.dataset.id}"]`).value, input.value); });
  document.querySelectorAll('[data-print]').forEach(button => { button.onclick = () => printOrder(data.orders.find(order => order.id === button.dataset.order), button.dataset.print === 'label'); });
}

async function updateOrder(id, orderStatus, trackingNumber) {
  await fetch('/api/admin-orders', { method: 'PATCH', headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ id, order_status: orderStatus, tracking_number: trackingNumber }) });
}

function showLogin(error = '') { $('#login').hidden = false; $('#dashboard').hidden = true; $('#login-error').textContent = error; }
function showDashboard() { $('#login').hidden = true; $('#dashboard').hidden = false; loadOrders().catch(error => { $('#status').textContent = error.message; }); }

$('#login-form').onsubmit = event => { event.preventDefault(); sessionStorage.setItem(tokenKey, $('#token').value.trim()); showDashboard(); };
$('#logout').onclick = () => { sessionStorage.removeItem(tokenKey); showLogin(); };
$('#refresh').onclick = loadOrders;
$('#filters').onclick = event => { if (!event.target.dataset.status && event.target.tagName !== 'BUTTON') return; activeStatus = event.target.dataset.status || ''; document.querySelectorAll('#filters button').forEach(button => button.classList.toggle('active', button.dataset.status === activeStatus)); loadOrders(); };
if (token()) showDashboard(); else showLogin();