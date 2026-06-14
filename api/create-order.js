const { calculateCartTotal } = require('./lib/prices');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(500).json({
      error: 'Payment is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables.'
    });
  }

  try {
    const { items, customer } = req.body || {};
    const total = calculateCartTotal(items);

    if (total == null || total < 1) {
      return res.status(400).json({ error: 'Invalid cart items.' });
    }

    const amountPaise = Math.round(total * 100);
    const receipt = `gg_${Date.now()}`;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt,
        notes: {
          customer_name: customer?.name || '',
          customer_phone: customer?.contact || '',
          customer_email: customer?.email || '',
          items: JSON.stringify(items)
        }
      })
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      return res.status(500).json({
        error: orderData.error?.description || 'Could not create Razorpay order.'
      });
    }

    return res.status(200).json({
      orderId: orderData.id,
      amount: amountPaise,
      keyId,
      currency: 'INR'
    });
  } catch (err) {
    return res.status(500).json({ error: 'Payment server error. Please try again.' });
  }
};
