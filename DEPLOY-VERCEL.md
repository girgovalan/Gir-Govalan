# Deploy Gir Govalan on Vercel

## Option A — Website (easiest, no terminal)

1. Go to [https://vercel.com](https://vercel.com) and sign up (use GitHub or email).

2. Put your site on **GitHub** (recommended):
   - Create a repo at [https://github.com/new](https://github.com/new)
   - Upload the `gir govalan` folder (or use GitHub Desktop)

3. In Vercel: **Add New → Project → Import** your GitHub repo.

4. **Project settings** (important):
   | Setting | Value |
   |---------|--------|
   | Framework Preset | **Other** |
   | Build Command | *(leave empty)* |
   | Output Directory | *(leave empty or `.`)* |
   | Install Command | *(leave empty)* |

5. Click **Deploy**. You get a URL like `gir-govalan.vercel.app`.

6. **Custom domain** (girgovalan.com):
   - Project → **Settings → Domains**
   - Add `girgovalan.com` and `www.girgovalan.com`
   - Vercel shows DNS records — add them at your domain registrar (GoDaddy, Namecheap, etc.)
   - In Shopify: remove domain or stop using Shopify for the main domain

7. **Google**: submit `https://girgovalan.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

---

## Option B — Terminal (Vercel CLI)

```powershell
cd "f:\gir govalan"
npx vercel login
npx vercel
```

First deploy = preview. Then production:

```powershell
npx vercel --prod
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? your account
- Link to existing project? **N** (first time)
- Project name? `gir-govalan`
- Directory? `./`

---

## After deploy — test these URLs

- `https://your-domain.com/`
- `https://your-domain.com/pages/who-is-gir-govalan/`
- `https://your-domain.com/pages/contact/`
- `https://your-domain.com/blogs/news/`
- `https://your-domain.com/collections/all/`

---

## Switch from Shopify

1. Deploy on Vercel and connect **girgovalan.com**.
2. Wait until Vercel shows the domain as **Valid**.
3. Cancel Shopify subscription when the new site works.
4. Old Google links keep working (same URL paths + redirects in `vercel.json`).

---

## Update the site later

- **GitHub connected**: push changes → Vercel redeploys automatically.
- **CLI only**: run `npx vercel --prod` again from the project folder.
