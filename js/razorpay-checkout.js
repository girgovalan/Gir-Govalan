/* Razorpay checkout — cart & single-item payments */
async function startRazorpayCheckout(cart, customer) {
  if (!cart.length) {
    showToast('Your cart is empty.', 'error');
    return;
  }

  if (!customer.name || !customer.contact) {
    showToast('Please enter your name and phone number.', 'error');
    return;
  }
  if (!validateCheckoutCustomer(customer, { requireAddress: true })) return;

  // Track InitiateCheckout event with Meta Pixel
  if (typeof MetaPixel !== 'undefined') {
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    MetaPixel.trackInitiateCheckout(cart, cartTotal);
  }

  const payBtn = document.getElementById('razorpay-pay');
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.textContent = 'Starting payment…';
  }

  try {
    const items = cart.map(item => ({
      productId: item.productId,
      variant: item.variant || null,
      qty: item.qty,
      name: item.name
    }));

    const res = await fetch('/api/create-order/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, customer })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Could not start payment.');
    }

    if (typeof Razorpay === 'undefined') {
      throw new Error('Razorpay script not loaded.');
    }

    const options = {
      key: data.keyId,
      amount: data.amount,
      currency: data.currency || 'INR',
      name: SITE.name,
      description: 'Gir Govalan order',
      order_id: data.orderId,
      prefill: {
        name: customer.name,
        email: customer.email || '',
        contact: customer.contact
      },
      theme: { color: '#7b5495' },
      handler: async function (response) {
        try {
          const verifyRes = await fetch('/api/verify-payment/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          const result = await verifyRes.json();

          if (result.success) {
            // Track Purchase event with Meta Pixel
            const cart = getCart();
            const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            
            if (typeof MetaPixel !== 'undefined') {
              MetaPixel.trackPurchase(result.paymentId, cart, total, {
                email: customer.email || '',
                contact: customer.contact || ''
              });
            }
            
            savePaidOrderForWhatsApp(getCart(), customer, result.paymentId);
            saveCart([]);
            window.location.href = `/pages/order-success/?payment_id=${encodeURIComponent(result.paymentId)}`;
            return;
          }

          showToast('Payment verification failed. Contact us on WhatsApp.', 'error');
        } catch (err) {
          showToast('Payment verification failed. Contact us on WhatsApp.', 'error');
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function () {
      showToast('Payment failed. Try again or order on WhatsApp.', 'error');
    });
    rzp.open();
  } catch (err) {
    showToast(err.message || 'Could not start payment.', 'error');
  } finally {
    if (payBtn) {
      payBtn.disabled = false;
      payBtn.textContent = 'Pay with Razorpay';
    }
  }
}

function getCheckoutCustomer() {
  return typeof getCheckoutCustomerFromForm === 'function'
    ? getCheckoutCustomerFromForm()
    : {
        name: document.getElementById('checkout-name')?.value?.trim() || '',
        contact: document.getElementById('checkout-phone')?.value?.trim() || '',
        email: document.getElementById('checkout-email')?.value?.trim() || ''
      };
}

function bindRazorpayPayButton(cart) {
  const btn = document.getElementById('razorpay-pay');
  if (!btn) return;
  btn.onclick = () => startRazorpayCheckout(cart, getCheckoutCustomer());
}
