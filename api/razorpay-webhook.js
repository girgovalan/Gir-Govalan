const crypto = require('crypto');
const { getSupabaseConfig, supabaseRequest } = require('./lib/supabase');

function statusForEvent(event) {
  if (event === 'payment.captured' || event === 'order.paid') return { payment_status: 'paid' };
  if (event === 'payment.failed') return { payment_status: 'failed' };
  if (event === 'refund.created' || event === 'refund.processed') return { payment_status: 'refunded' };
  return null;
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, endpoint: 'razorpay-webhook' });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const secret = (process.env.RAZORPAY_WEBHOOK_SECRET || '').trim();
  const signature = req.headers['x-razorpay-signature'];
  if (!secret || !signature) return res.status(401).json({ error: 'Webhook is not configured.' });

  const rawBody = req.rawBody
    ? Buffer.from(req.rawBody)
    : Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}));
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
    return res.status(401).json({ error: 'Invalid webhook signature.' });
  }

  const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const update = statusForEvent(payload.event);
  if (update && getSupabaseConfig()) {
    const entity = payload.payload?.payment?.entity || payload.payload?.order?.entity || payload.payload?.refund?.entity;
    const orderId = entity?.order_id || (payload.event.startsWith('refund.') ? null : entity?.id);
    const paymentId = entity?.id;
    if (orderId) {
      await supabaseRequest(`orders?razorpay_order_id=eq.${encodeURIComponent(orderId)}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...update, ...(paymentId && payload.event.startsWith('payment.') ? { razorpay_payment_id: paymentId } : {}) })
      });
    } else if (entity?.payment_id && payload.event.startsWith('refund.')) {
      await supabaseRequest(`orders?razorpay_payment_id=eq.${encodeURIComponent(entity.payment_id || paymentId)}`, {
        method: 'PATCH',
        body: JSON.stringify(update)
      });
    }
  }
  return res.status(200).json({ received: true });
};