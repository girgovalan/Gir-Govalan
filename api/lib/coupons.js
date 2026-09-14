const { supabaseRequest } = require('./supabase');
const { getItemPrice } = require('./prices');

function normalizedCode(code) {
  return String(code || '').trim().toUpperCase();
}

function itemMatchesCoupon(item, coupon) {
  const productIds = Array.isArray(coupon.product_ids) ? coupon.product_ids : [];
  return !productIds.length || productIds.includes(item.productId);
}

async function validateCoupon(code, items, customer, subtotal) {
  const normalized = normalizedCode(code);
  if (!normalized) return { code: null, discount: 0 };
  const rows = await supabaseRequest(`coupons?code=eq.${encodeURIComponent(normalized)}&active=eq.true&limit=1`);
  const coupon = rows?.[0];
  if (!coupon) throw new Error('Coupon is invalid or inactive.');
  const now = Date.now();
  if (coupon.starts_at && now < Date.parse(coupon.starts_at)) throw new Error('Coupon is not active yet.');
  if (coupon.expires_at && now > Date.parse(coupon.expires_at)) throw new Error('Coupon has expired.');
  if (coupon.usage_limit != null && coupon.usage_count >= coupon.usage_limit) throw new Error('Coupon usage limit reached.');
  if (subtotal < coupon.minimum_order_paise) throw new Error(`Minimum order is ₹${Math.ceil(coupon.minimum_order_paise / 100)}.`);
  if (coupon.one_per_customer && customer?.contact) {
    const used = await supabaseRequest(`orders?coupon_code=eq.${encodeURIComponent(normalized)}&customer_phone=eq.${encodeURIComponent(customer.contact)}&select=id&limit=1`);
    if (used?.length) throw new Error('This coupon was already used for this customer.');
  }
  if (Array.isArray(coupon.categories) && coupon.categories.length) throw new Error('Category-specific coupons are not configured yet.');
  const eligibleItems = (items || []).filter(item => itemMatchesCoupon(item, coupon));
  if (!eligibleItems.length) throw new Error('Coupon does not apply to these products.');
  const eligibleSubtotal = eligibleItems.reduce((total, item) => total + (getItemPrice(item.productId, item.variant || null) || 0) * Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1)), 0) * 100;
  let discount = coupon.discount_type === 'percentage'
    ? Math.floor(eligibleSubtotal * coupon.discount_value / 100)
    : coupon.discount_value;
  if (coupon.maximum_discount_paise != null) discount = Math.min(discount, coupon.maximum_discount_paise);
  return { code: normalized, discount: Math.max(0, Math.min(discount, subtotal)), coupon };
}

module.exports = { normalizedCode, validateCoupon };