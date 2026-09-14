const { supabaseRequest } = require('./lib/supabase');

function authorized(req) {
  const expected = (process.env.ADMIN_API_TOKEN || '').trim();
  const supplied = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  return expected && supplied && supplied === expected;
}

module.exports = async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const [orders, customers, products] = await Promise.all([
      supabaseRequest('orders?payment_status=eq.paid&select=amount_paise,discount_paise,customer_id,customer_phone,items,created_at'),
      supabaseRequest('customers?select=id'),
      supabaseRequest('products?select=id,name')
    ]);
    const now = Date.now();
    const day = 86400000;
    const paidOrders = orders || [];
    const revenue = paidOrders.reduce((sum, order) => sum + (order.amount_paise || 0), 0);
    const customerCounts = paidOrders.reduce((map, order) => {
      const key = order.customer_id || order.customer_phone;
      map[key] = (map[key] || 0) + 1;
      return map;
    }, {});
    const repeatCustomers = Object.values(customerCounts).filter(count => count > 1).length;
    const paidCustomerCount = Object.keys(customerCounts).length;
    const productsById = Object.fromEntries((products || []).map(product => [product.id, product.name]));
    const bestSellers = {};
    paidOrders.forEach(order => (order.items || []).forEach(item => { bestSellers[item.productId] = (bestSellers[item.productId] || 0) + Math.max(1, Number(item.qty) || 1); }));
    const salesSince = milliseconds => paidOrders.filter(order => now - Date.parse(order.created_at) < milliseconds).reduce((sum, order) => sum + order.amount_paise, 0);
    return res.status(200).json({
      revenue, paidOrders: paidOrders.length, customers: (customers || []).length,
      repeatCustomers, repeatRate: paidCustomerCount ? repeatCustomers / paidCustomerCount * 100 : 0,
      newCustomers: Object.values(customerCounts).filter(count => count === 1).length,
      averageOrderValue: paidOrders.length ? revenue / paidOrders.length : 0,
      today: salesSince(day), week: salesSince(day * 7), month: salesSince(day * 30),
      couponDiscounts: paidOrders.reduce((sum, order) => sum + (order.discount_paise || 0), 0),
      bestSellers: Object.entries(bestSellers).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([id, quantity]) => ({ name: productsById[id] || id, quantity }))
    });
  } catch (error) { return res.status(500).json({ error: error.message || 'Analytics request failed.' }); }
};