# SEO setup — Gir Govalan

## Files included

| File | Purpose |
|------|---------|
| `sitemap.xml` | All pages for Google/Bing |
| `robots.txt` | Crawler rules + sitemap link |
| `js/seo.js` | Meta tags, Open Graph, Twitter Card, JSON-LD |
| `site.webmanifest` | Mobile / PWA hints |
| `humans.txt` | Optional credits file |

## After Vercel deploy — Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: **https://girgovalan.com**
3. Verify domain (DNS TXT record from Google)
4. **Sitemaps** → Submit: `https://girgovalan.com/sitemap.xml`
5. **URL inspection** → Request indexing for:
   - `https://girgovalan.com/`
   - `https://girgovalan.com/pages/who-is-gir-govalan/`
   - `https://girgovalan.com/collections/all/`
   - `https://girgovalan.com/blogs/news/`

## Same URLs as old Shopify (important)

Google already knows these paths — keep them:

- `/pages/who-is-gir-govalan/`
- `/pages/contact/`
- `/pages/gallery/`
- `/blogs/news/`
- `/collections/all/`
- `/products/{product-handle}/`

## When you add products or blog posts

1. Add to `js/data.js`
2. Create folder under `products/` or `blogs/news/`
3. Add URL to `sitemap.xml`
4. `git push` → Vercel redeploys
5. Request indexing in Search Console (optional)

## Structured data (JSON-LD)

Automatically added by `seo.js`:

- **Organization** — all pages
- **WebSite** + search — home page
- **Product** — product pages
- **BlogPosting** — blog articles
- **BreadcrumbList** — inner pages

Test: [Google Rich Results Test](https://search.google.com/test/rich-results)
