const { calculateCartTotal } = require('./lib/prices');

function getRazorpayCredentials() {
  const keyId = (process.env.RAZORPAY_KEY_ID || process.env.LIVE_API_KEY || '').trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || process.env.SECRET_API_KEY || '').trim();
  return { keyId, keySecret };
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyId, keySecret } = getRazorpayCredentials();

  if (!keyId || !keySecret) {
    return res.status(500).json({
      error: 'Payment is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel, then redeploy.'
    });
  }

  if (!keyId.startsWith('rzp_')) {
    return res.status(500).json({
      error: 'RAZORPAY_KEY_ID looks wrong. It must be your Key ID (starts with rzp_live_ or rzp_test_), not the secret.'
    });
  }

  if (keySecret.startsWith('rzp_')) {
    return res.status(500).json({
      error: 'RAZORPAY_KEY_SECRET looks wrong. Paste the secret key from Razorpay, not the Key ID.'
    });
  }

  const isLive = keyId.startsWith('rzp_live_');
  const isTest = keyId.startsWith('rzp_test_');
  if (!isLive && !isTest) {
    return res.status(500).json({ error: 'Invalid Razorpay Key ID format.' });
  }

  try {
    const { items, customer } = req.body || {};
    const total = calculateCartTotal(items);

    if (total == null || total < 1) {
      return res.status(400).json({ error: 'Invalid cart items.' });
    }

    const amountPaise = Math.round(total * 100);
    const receipt = `gg${Date.now()}`.slice(0, 40);
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
          customer_email: customer?.email || ''
        }
      })
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      const msg = orderData.error?.description || 'Could not create Razorpay order.';
      const hint = /auth/i.test(msg)
        ? ' Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel match the same Live (or Test) pair from Razorpay, then redeploy.'
        : '';
      return res.status(500).json({ error: msg + hint });
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
