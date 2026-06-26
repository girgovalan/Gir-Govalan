/* Product prices — keep in sync with js/data.js */
const PRICES = {
  'pure-organic-a2-gir-cow-ghee': {
    price: 1300,
    variants: { '250ml': 725, '500ml': 1300, '1L': 2500, '5L': 12000 }
  },
  'a2-gir-milk': { price: 120 },
  'fresh-curd': {
    price: 150,
    variants: { '1kg': 150 }
  },
  'traditional-ladoo': { price: 349 },
  'milk-peda': {
    price: 650,
    variants: { '500g': 650, '1kg': 1200 }
  },
  'shrikhand': { price: 299 }
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
