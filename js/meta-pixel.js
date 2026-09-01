/* Meta Pixel Event Tracking Helper */

const MetaPixel = {
  // Track when a product is viewed
  trackViewContent: function(product) {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: product.currency || 'INR'
      });
    }
  },

  // Track when product is added to cart
  trackAddToCart: function(product, quantity = 1) {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'AddToCart', {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price * quantity,
        currency: product.currency || 'INR',
        quantity: quantity
      });
    }
  },

  // Track when checkout is initiated
  trackInitiateCheckout: function(cartItems, cartTotal) {
    if (typeof fbq !== 'undefined') {
      const productIds = cartItems.map(item => item.productId);
      fbq('track', 'InitiateCheckout', {
        content_ids: productIds,
        content_type: 'product_group',
        value: cartTotal,
        currency: 'INR',
        num_items: cartItems.length
      });
    }
  },

  // Track purchase/payment completion
  trackPurchase: function(orderId, cartItems, cartTotal, customer = {}) {
    if (typeof fbq !== 'undefined') {
      const productIds = cartItems.map(item => item.productId);
      fbq('track', 'Purchase', {
        content_ids: productIds,
        content_type: 'product_group',
        value: cartTotal,
        currency: 'INR',
        num_items: cartItems.length,
        content_name: `Order ${orderId}`,
        custom_data: {
          order_id: orderId,
          customer_email: customer.email || '',
          customer_phone: customer.contact || ''
        }
      });
    }
  },

  // Track add to wishlist/favorites
  trackAddToWishlist: function(product) {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'AddToWishlist', {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: 'INR'
      });
    }
  },

  // Track search
  trackSearch: function(searchQuery) {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Search', {
        search_string: searchQuery
      });
    }
  },

  // Track contact form submission
  trackContact: function(customerEmail, customerPhone) {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Contact', {
        value: 0,
        currency: 'INR',
        content_name: 'Customer Inquiry',
        custom_data: {
          customer_email: customerEmail,
          customer_phone: customerPhone
        }
      });
    }
  },

  // Manual event tracking
  trackCustomEvent: function(eventName, data = {}) {
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, data);
    }
  }
};
