/* SEO-friendly URLs (match old Shopify paths for Google) */
const URLS = {
  home: '/',
  about: '/pages/who-is-gir-govalan/',
  contact: '/pages/contact/',
  gallery: '/pages/gallery/',
  blog: '/blogs/news/',
  blogPost: (slug) => `/blogs/news/${slug}/`,
  products: '/collections/all/',
  productsCategory: (cat) => `/collections/all/?category=${cat}`,
  product: (id) => `/products/${id}/`,
  cart: '/cart/'
};
