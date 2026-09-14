const { supabaseRequest } = require('./lib/supabase');

function authorized(req) {
  const expected = (process.env.ADMIN_API_TOKEN || '').trim();
  const supplied = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  return expected && supplied && supplied === expected;
}

module.exports = async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    if (req.method === 'GET') return res.status(200).json({ products: await supabaseRequest('products?select=*&order=name.asc') });
    if (req.method === 'POST' || req.method === 'PATCH') {
      const body = req.body || {};
      const id = String(body.id || '').trim();
      if (req.method === 'PATCH' && !id) return res.status(400).json({ error: 'Product id is required.' });
      if (req.method === 'POST' && !id) return res.status(400).json({ error: 'Product id is required.' });
      const updated = await supabaseRequest(req.method === 'PATCH' ? `products?id=eq.${encodeURIComponent(id)}` : 'products', {
        method: req.method,
        body: JSON.stringify({
          id,
          name: body.name,
          sku: body.sku || null,
          price_paise: Math.round(Number(body.price || 0) * 100),
          sale_price_paise: body.sale_price ? Math.round(Number(body.sale_price) * 100) : null,
          stock_quantity: Math.max(0, Number(body.stock_quantity || 0)),
          low_stock_threshold: Math.max(0, Number(body.low_stock_threshold || 0)),
          active: body.active !== false
        })
      });
      return res.status(200).json({ product: updated?.[0] || null });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) { return res.status(500).json({ error: error.message || 'Product request failed.' }); }
};