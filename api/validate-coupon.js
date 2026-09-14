const { calculateCartTotal } = require('./lib/prices');
const { getSupabaseConfig } = require('./lib/supabase');
const { validateCoupon } = require('./lib/coupons');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!getSupabaseConfig()) return res.status(500).json({ error: 'Coupons are not configured.' });
  try {
    const items = req.body?.items;
    const subtotal = calculateCartTotal(items);
    if (subtotal == null) return res.status(400).json({ error: 'Invalid cart items.' });
    const result = await validateCoupon(req.body?.code, items, req.body?.customer, subtotal * 100);
    return res.status(200).json({ code: result.code, subtotal: subtotal * 100, discount: result.discount, total: subtotal * 100 - result.discount });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Coupon could not be applied.' });
  }
};