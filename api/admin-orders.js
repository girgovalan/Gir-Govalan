const { supabaseRequest } = require('./lib/supabase');

function authorized(req) {
  const expected = (process.env.ADMIN_API_TOKEN || '').trim();
  const supplied = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  return expected && supplied && supplied === expected;
}

module.exports = async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });

  try {
    if (req.method === 'GET') {
      const status = String(req.query?.status || '').trim();
      const filter = status ? `&order_status=eq.${encodeURIComponent(status)}` : '';
      const orders = await supabaseRequest(`orders?select=*&order=created_at.desc${filter}`);
      return res.status(200).json({ orders });
    }

    if (req.method === 'PATCH') {
      const id = String(req.body?.id || '').trim();
      const allowed = ['new', 'processing', 'shipped', 'delivered', 'cancelled'];
      const orderStatus = String(req.body?.order_status || '').trim();
      if (!id || !allowed.includes(orderStatus)) {
        return res.status(400).json({ error: 'A valid order id and status are required.' });
      }
      const updated = await supabaseRequest(`orders?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          order_status: orderStatus,
          tracking_number: req.body.tracking_number || null,
          shipping_partner: req.body.shipping_partner || null
        })
      });
      return res.status(200).json({ order: updated?.[0] || null });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Admin request failed.' });
  }
};