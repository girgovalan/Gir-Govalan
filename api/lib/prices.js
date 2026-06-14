/* Product prices — keep in sync with js/data.js */
const PRICES = {
  'pure-organic-a2-gir-cow-ghee': {
    price: 1299,
    variants: { '250ml': 699, '500ml': 1299, '1L': 2499 }
  },
  'bilona-gir-ghee-500ml': { price: 1199 },
  'bilona-gir-ghee-1l': { price: 2299 },
  'a2-gir-milk': { price: 89 },
  'fresh-curd': { price: 79 },
  'traditional-ladoo': { price: 349 },
  'milk-peda': {
    price: 399,
    variants: { '250g': 249, '500g': 399, '1kg': 749 }
  },
  'shrikhand': { price: 299 },
  'premium-almonds': { price: 449 },
  'mixed-dry-fruits': { price: 599 }
};

function getItemPrice(productId, variant) {
  const product = PRICES[productId];
  if (!product) return null;
  if (variant && product.variants && product.variants[variant] != null) {
    return product.variants[variant];
  }
  return product.price;
}

function calculateCartTotal(items) {
  if (!Array.isArray(items) || !items.length) return null;
  let total = 0;
  for (const item of items) {
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
    const price = getItemPrice(item.productId, item.variant || null);
    if (price == null) return null;
    total += price * qty;
  }
  return total;
}

module.exports = { PRICES, getItemPrice, calculateCartTotal };
