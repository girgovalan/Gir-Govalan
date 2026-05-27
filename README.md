# Gir Govalan — Standalone Website

A complete, **Shopify-free** website for Gir Govalan — authentic Gir Cow Ghee and farm products from Gujarat.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Who Is Gir Govalan (About) | `who-is-gir-govalan.html` |
| Gallery | `gallery.html` |
| Blog | `blog.html` |
| Blog post | `blog-post.html?slug=...` |
| All products | `products.html` |
| Products by category | `products.html?category=ghee` |
| Product detail | `product.html?id=...` |
| Cart | `cart.html` |
| Contact | `contact.html` |

## Run locally

```powershell
cd "f:\gir govalan"
npx http-server -p 8000
```

Open **http://localhost:8000**

## Project structure

```
gir-govalan/
├── index.html              # Home
├── who-is-gir-govalan.html # About
├── gallery.html
├── blog.html / blog-post.html
├── products.html / product.html
├── cart.html
├── contact.html
├── css/site.css            # Main styles
├── js/
│   ├── data.js             # Products, blog, site info
│   ├── components.js       # Header & footer
│   └── app.js              # Cart, search, forms
└── (Shopify theme folders — not used by this site)
```

## Features

- Responsive design matching brand colors (#7b5495 purple, cream accents)
- Product catalog with categories: Ghee, Dairy, Sweets, Seeds & Nuts
- Shopping cart (localStorage)
- **Order on WhatsApp** checkout (no Shopify fees)
- Contact form (opens email)
- Newsletter signup
- Blog with 4 articles

## Customize content

Edit **`js/data.js`** to update:

- Products, prices, descriptions
- Blog posts
- Phone, email, WhatsApp number
- Social media links

## Go live (free hosting)

1. Upload all HTML, `css/`, and `js/` folders to [Netlify](https://netlify.com) or [GitHub Pages](https://pages.github.com)
2. Point your domain (e.g. girgovalan.com) to the host
3. Update `SITE.whatsapp` in `data.js` with your real WhatsApp number (country code, no +)

## Note

The `templates/`, `sections/`, and `.liquid` folders are from the old Shopify theme and are **not used** by this site. You can archive or delete them once you no longer need Shopify.
