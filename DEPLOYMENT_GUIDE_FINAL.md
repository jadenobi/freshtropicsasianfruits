# 🚀 Fresh Tropics: Vercel & Namecheap Deployment Guide

Follow these steps to take **freshtropicsasianfruits.com** live!

---

## 1. Initial Production Deployment
Run the following command in your terminal. This will build your site and deploy it to a temporary Vercel URL.

```bash
vercel --prod
```

> [!NOTE]
> If you haven't logged in, it will ask you to login first. Follow the prompts in your browser.

---

## 2. Configure Environment Variables
Your site needs several "secrets" to work correctly (like your database and email keys). 

1. Go to your **Vercel Dashboard**.
2. Select your project -> **Settings** -> **Environment Variables**.
3. Add the following keys and values from your `.env.local`:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_jP7Afsv9_NXVtsrfMzfEseVVe6kceiyZN` |
| `NEXT_PUBLIC_PAYMENT_EMAIL` | `support@freshtropics.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://nzwyojrjaugvpccgyugu.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Copy full key from .env.local) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Copy full key from .env.local) |

---

## 3. Connect Your Domain
Now, let's link **freshtropicsasianfruits.com**.

1. In Vercel: **Settings** -> **Domains**.
2. Type `freshtropicsasianfruits.com` and click **Add**.
3. It will recommend adding `www.freshtropicsasianfruits.com` as well. Click **Add**.

---

## 4. Namecheap DNS Configuration
Login to your **Namecheap** account and apply these settings to make the domain point to Vercel.

1. Go to **Domain List** -> Click **Manage** next to your domain.
2. Click the **Advanced DNS** tab.
3. Click **Add New Record** for both entries below:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com.` | Automatic |

> [!IMPORTANT]
> Remove any existing "Parking" records (usually A or CNAME records) that Namecheap might have added by default.

---

## 5. Verification
Once DNS propagates (usually takes 5-30 minutes), your site will be live at:
👉 **[https://freshtropicsasianfruits.com](https://freshtropicsasianfruits.com)**

### Check List:
- [ ] SSL Certificate (Site should show a lock icon 🔒)
- [ ] Email Notifications (Test a checkout)
- [ ] Mobile PWA (Check if it prompts to install on your phone)
