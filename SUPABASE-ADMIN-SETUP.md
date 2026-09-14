# Supabase and admin setup

## 1. Create the database

1. Create a Supabase project.
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
3. In Vercel, add these environment variables for Production, Preview, and Development:

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key; server only |
| `ADMIN_API_TOKEN` | A long random admin token |
| `RAZORPAY_WEBHOOK_SECRET` | The secret configured for the Razorpay webhook |

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `ADMIN_API_TOKEN` in frontend code.

## 2. Configure Razorpay webhooks

In Razorpay Dashboard, create a webhook with this URL:

`https://www.girgovalan.com/api/razorpay-webhook`

After deploying, opening that URL in a browser should return JSON containing `"ok": true`. If it returns Vercel `404 NOT_FOUND`, the Vercel project is deploying a different root directory or an older deployment; redeploy the repository with the project root set to the folder containing `index.html`, `package.json`, and `api/`.

Use the same secret as `RAZORPAY_WEBHOOK_SECRET` and subscribe to:

- `payment.captured`
- `payment.failed`
- `order.paid`
- `refund.created`
- `refund.processed`

## 3. Open the dashboard

Visit `/admin/` and enter the value of `ADMIN_API_TOKEN`. The dashboard supports order filtering, customer records, paid-order totals, fulfillment status, partner selection, tracking/AWB numbers, invoice printing, and shipping-label printing. Create shipment is provider-neutral until courier API credentials are configured; Track shipment opens supported carrier tracking pages when an AWB is present.

The Coupons tab supports percentage and fixed discounts, minimum orders, maximum percentage discounts, expiry dates, usage limits, one-use-per-customer, and product IDs. Coupon validation and the final Razorpay amount are calculated server-side. Category-specific coupons are not enabled until a server-side category catalogue is added.

The current shipping fields are provider-neutral. A carrier integration still needs the selected partner's API credentials and shipment endpoint.