# Razorpay setup for Gir Govalan

Your site now supports **Pay with Razorpay** on the cart page (`/cart/`).

## 1. Add your website in Razorpay Dashboard

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com) → **Account & Settings** → **Websites & API keys**
2. Click **Add website/app**
3. Enter: `https://www.girgovalan.com`
4. Submit for verification (usually 24–48 hours)

## 2. Add API keys in Vercel (required)

The **Key Secret** must never go in your website code. Add it only in Vercel:

1. Open [Vercel Dashboard](https://vercel.com) → your **Gir-Govalan** project
2. Go to **Settings → Environment Variables**
3. Add these two variables (for **Production**, **Preview**, and **Development**):

| Name | Value |
|------|--------|
| `RAZORPAY_KEY_ID` | `rzp_test_T0zsP03ZYMa7B5` |
| `RAZORPAY_KEY_SECRET` | Your secret key from Razorpay (click reveal in dashboard) |

4. Click **Save**
5. **Redeploy** the project (Deployments → ⋯ → Redeploy) so the API routes pick up the keys

## 3. Test a payment

1. Add a product to cart on [girgovalan.com/cart/](https://www.girgovalan.com/cart/)
2. Enter name and phone
3. Click **Pay with Razorpay**
4. Use Razorpay **test mode** details:
   - UPI: `success@razorpay`
   - Test card: `4111 1111 1111 1111`, any future expiry, any CVV

## 4. Go live

1. Complete Razorpay **KYC** and activate your account
2. In Razorpay → **API Keys** → switch to **Live mode** and generate live keys
3. Update Vercel environment variables with live `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
4. Redeploy

## How it works

```
Cart → Pay with Razorpay
  → /api/create-order (creates order, validates prices)
  → Razorpay checkout popup
  → /api/verify-payment (confirms payment)
  → /pages/order-success/
```

WhatsApp ordering remains available as a backup option.

## Files added

- `api/create-order.js` — creates Razorpay order
- `api/verify-payment.js` — verifies payment signature
- `api/lib/prices.js` — server-side price validation
- `js/razorpay-checkout.js` — checkout button logic
- `pages/order-success/` — thank-you page after payment

## If payment button shows an error

- **"Payment is not configured"** → Add both env vars in Vercel and redeploy
- **Website not verified** → Complete Razorpay website submission
- **Test mode only** → Normal until KYC is complete
