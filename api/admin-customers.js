const { supabaseRequest } = require('./lib/supabase');

function authorized(req) {
  const expected = (process.env.ADMIN_API_TOKEN || '').trim();
  const supplied = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  return expected && supplied && supplied === expected;
}

module.exports = async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const customers = await supabaseRequest('customers?select=*&order=created_at.desc');
    const orders = await supabaseRequest('orders?select=customer_id,amount_paise&payment_status=eq.paid');
    const totals = (orders || []).reduce((map, order) => {
      if (!order.customer_id) return map;
      const current = map[order.customer_id] || { count: 0, spent: 0 };
      current.count += 1;
      current.spent += order.amount_paise || 0;
      map[order.customer_id] = current;
      return map;
    }, {});
    return res.status(200).json({ customers: (customers || []).map(customer => ({
      ...customer,
      order_count: totals[customer.id]?.count || 0,
      total_spent_paise: totals[customer.id]?.spent || 0
    })) });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Could not load customers.' });
  }
};