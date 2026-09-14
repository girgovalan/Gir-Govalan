const crypto = require('crypto');
const { getSupabaseConfig, supabaseRequest } = require('./lib/supabase');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keySecret = (process.env.RAZORPAY_KEY_SECRET || process.env.SECRET_API_KEY || '').trim();
  if (!keySecret) {
    return res.status(500).json({ success: false, error: 'Payment not configured.' });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing payment details.' });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid payment signature.' });
    }

    if (getSupabaseConfig()) {
      const orders = await supabaseRequest(`orders?razorpay_order_id=eq.${encodeURIComponent(razorpay_order_id)}&select=coupon_code,payment_status`);
      await supabaseRequest(`orders?razorpay_order_id=eq.${encodeURIComponent(razorpay_order_id)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          razorpay_payment_id,
          payment_status: 'paid'
        })
      });
      const order = orders?.[0];
      if (order?.coupon_code && order.payment_status !== 'paid') {
        await supabaseRequest('rpc/redeem_coupon', { method: 'POST', body: JSON.stringify({ coupon_code_input: order.coupon_code }) });
      }
    }

    return res.status(200).json({ success: true, paymentId: razorpay_payment_id });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Verification failed.' });
  }
};
