# Blog publishing schedule — 6-month plan (Jun–Dec 2026)

**60 scheduled posts** auto-publish every **3 days**. A post appears on the website when its `date` arrives — no manual work needed.

| Block | Posts | Dates | File |
|-------|-------|-------|------|
| Original | 4 | Dec 2024 – Mar 2025 | `js/data.js` |
| Batch 1 | 10 | 14 Jun – 11 Jul 2026 | `js/blog-scheduled.js` |
| Batch 2 | 50 | 14 Jul – 8 Dec 2026 | `js/blog-scheduled-extended.js` |
| Batch 3 (Pinterest) | 6 | 11 Dec – 26 Dec 2026 | `js/blog-scheduled-recommended.js` |
| **Total** | **70** | | |

## How auto-publish works

Posts are stored with a `date` field. Only posts where `date <= today` appear on:
- Blog page (`/blogs/news/`)
- Home page blog section
- Individual article pages

Scripts load in order: `data.js` → `blog-scheduled.js` → `blog-scheduled-extended.js` → `blog-scheduled-recommended.js`

## Batch 1 — Jun–Jul 2026

| # | Date | Title |
|---|------|-------|
| 1 | 14 Jun | A2 Milk vs A1 Milk |
| 2 | 17 Jun | How to Identify Pure Gir Cow Ghee |
| 3 | 20 Jun | Bilona Ghee vs Regular Ghee |
| 4 | 23 Jun | Milk Peda: Traditional Gujarati Sweet |
| 5 | 26 Jun | Gir Cow Ghee Benefits for Children |
| 6 | 29 Jun | Ayurveda and Gir Cow Ghee: 8 Daily Uses |
| 7 | 2 Jul | Why Gir Region Ghee Is Famous |
| 8 | 5 Jul | How to Store Ghee and Sweets |
| 9 | 8 Jul | Maldhari Community and Gir Cow Farming |
| 10 | 11 Jul | Buy Pure Gir Cow Ghee Online |

## Batch 2 — Jul–Dec 2026 (50 posts)

Starts **14 Jul 2026**, ends **8 Dec 2026**. Topics include:
- Festival guides (Diwali, Navratri, Janmashtami, Raksha Bandhan, Gurpurab, Bestu Varas)
- Product guides (milk, curd, peda, ladoo, shrikhand)
- Health & Ayurveda (pregnancy, children, seniors, winter, weight)
- Farm story, ethical cow care, wholesale orders, corporate gifting
- Cooking tips (tadka, paratha, khichdi, South Indian)

Run `node scripts/generate-blog-extended.js` to regenerate extended posts if needed.

## Blog hero images

Each post has a dedicated hero at `/images/blog/{slug}.jpg`.

- **First 10 scheduled posts** — custom photo-style heroes (created earlier)
- **50 extended posts + 4 original posts** — branded 1200×630 heroes (purple/gold overlay + title)

Regenerate images anytime:

```bash
node scripts/generate-blog-images.js
```

Uses local product photos as backgrounds with Gir Govalan brand styling.

## SEO features

Each post includes:
- Keyword-rich title and meta description
- Keywords meta tag
- BlogPosting schema (JSON-LD) via `seo.js`
- Internal links to products and collections
- URLs in `sitemap.xml`

## To add more posts

1. Add entry to `js/blog-scheduled-extended.js` (or re-run generator)
2. Create `blogs/news/{slug}/index.html` (copy from any existing article page)
3. Add URL to `sitemap.xml`

## Google Search Console

After deploy, submit: `https://www.girgovalan.com/sitemap.xml`

Request indexing for new posts when they go live for faster discovery.
