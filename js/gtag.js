window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-X9CF28C02R');

function ga4Items(items) {
	return (items || []).map(item => ({
		item_id: String(item.productId || item.id || ''),
		item_name: String(item.name || ''),
		item_variant: item.variant || undefined,
		price: Number(item.price || 0),
		quantity: Number(item.qty || item.quantity || 1)
	}));
}

function trackGa4(eventName, parameters = {}) {
	if (typeof gtag === 'function') gtag('event', eventName, parameters);
}

function trackGa4Purchase(paymentId, items, amountPaise, currency = 'INR', coupon = '') {
	const guardKey = `ga4-purchase-${paymentId}`;
	try {
		if (sessionStorage.getItem(guardKey)) return;
		sessionStorage.setItem(guardKey, '1');
	} catch { /* session storage may be unavailable */ }
	trackGa4('purchase', {
		transaction_id: String(paymentId || ''),
		value: Number(amountPaise || 0) / 100,
		currency,
		coupon: coupon || undefined,
		items: ga4Items(items)
	});
}
