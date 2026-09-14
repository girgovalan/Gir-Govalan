const { supabaseRequest } = require('./lib/supabase');

function authorized(req) {
  const expected = (process.env.ADMIN_API_TOKEN || '').trim();
  const supplied = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  return expected && supplied && supplied === expected;
}

module.exports = async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    if (req.method === 'GET') return res.status(200).json({ coupons: await supabaseRequest('coupons?select=*&order=created_at.desc') });
    if (req.method === 'POST' || req.method === 'PATCH') {
      const body = req.body || {};
      if (req.method === 'PATCH' && body.active !== undefined && !body.discount_type) {
        const result = await supabaseRequest(`coupons?id=eq.${encodeURIComponent(body.id)}`, { method: 'PATCH', body: JSON.stringify({ active: Boolean(body.active) }) });
        return res.status(200).json({ coupon: result?.[0] || null });
      }
      const record = {
        code: String(body.code || '').trim().toUpperCase(),
        discount_type: body.discount_type,
        discount_value: body.discount_type === 'fixed' ? Math.round(Number(body.discount_value) * 100) : Number(body.discount_value),
        minimum_order_paise: Math.round(Number(body.minimum_order || 0) * 100),
        maximum_discount_paise: body.maximum_discount ? Math.round(Number(body.maximum_discount) * 100) : null,
        starts_at: body.starts_at || null,
        expires_at: body.expires_at || null,
        usage_limit: body.usage_limit ? Number(body.usage_limit) : null,
        one_per_customer: Boolean(body.one_per_customer),
        product_ids: Array.isArray(body.product_ids) ? body.product_ids : [],
        categories: Array.isArray(body.categories) ? body.categories : [],
        active: body.active !== false
      };
      if (!record.code || !['percentage', 'fixed'].includes(record.discount_type) || !record.discount_value) return res.status(400).json({ error: 'Code, type, and discount are required.' });
      const path = req.method === 'PATCH' ? `coupons?id=eq.${encodeURIComponent(body.id)}` : 'coupons';
      const result = await supabaseRequest(path, { method: req.method, body: JSON.stringify(record) });
      return res.status(200).json({ coupon: result?.[0] || null });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) { return res.status(500).json({ error: error.message || 'Coupon request failed.' }); }
};