# 🚀 Production Setup Guide

Your site is **95% complete**. Here's exactly what needs to happen to go live:

## ✅ Already Complete
- ✅ All pages built and working (home, shop, product, about, newsletter, subscribe, etc.)
- ✅ Product catalog with 100+ items and real images
- ✅ Shopping cart functionality
- ✅ Email templates (7 payment methods)
- ✅ Resend API key configured
- ✅ Supabase credentials in .env.local
- ✅ Build passing (0 errors)

## 🔧 3 Steps to Production

### Step 1: Set Up Supabase Tables (5 minutes)

1. Go to **https://supabase.com** and log in to your project
2. Click **SQL Editor** on the left sidebar
3. Click **New Query** (top right)
4. Copy this entire SQL block:

```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL REFERENCES customers(email),
  items JSONB NOT NULL,
  subtotal DECIMAL NOT NULL,
  shipping DECIMAL NOT NULL,
  tax DECIMAL NOT NULL,
  total DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  rating INTEGER NOT NULL,
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  author TEXT NOT NULL,
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Wishlist table
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT NOT NULL REFERENCES customers(email),
  product_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(customer_email, product_id)
);

-- Inventory table
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT UNIQUE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 50,
  updated_at TIMESTAMP DEFAULT now()
);
```

5. Paste it into the SQL editor
6. Click **Run** (or Ctrl+Enter)
7. ✅ You should see "5 rows created" message

### Step 2: Configure Resend for Production (5 minutes)

Currently, Resend is in **sandbox mode** - it can only send to `freshtropicsasianfruits@gmail.com`.

**For Production (Optional but Recommended):**

1. Go to **https://resend.com/dashboard**
2. Click **Domains** on the left
3. Add your domain (e.g., `notifications.yourfruitsite.com`)
4. Complete DNS verification
5. Update `src/lib/emailService.ts`:

Change this line (around line 234):
```typescript
from: "onboarding@resend.dev",
```

To your verified domain:
```typescript
from: "noreply@yourfruitsite.com",
```

**For Now (Development/Testing):**
- Leave as `from: "onboarding@resend.dev"` - it will still work
- Orders will be logged in the server console

### Step 3: Deploy to Vercel (10 minutes)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Production ready: Supabase setup complete"
   git push origin main
   ```

2. **Go to https://vercel.com and import your repository**
   - Select your GitHub repo
   - Select the branch to deploy (main)

3. **Configure Environment Variables:**
   - Add these from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` (starts with https://...)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY` (re_jP7A...)

4. **Click Deploy**
   - Vercel will build and deploy automatically
   - You'll get a live URL like: `https://fruit-selling-website.vercel.app`

5. **Set custom domain (optional):**
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain
   - Update DNS records per Vercel instructions

## 🧪 Testing Production

1. Go to your deployed URL
2. Click **Shop** → select a product
3. Add to cart → go to **Cart**
4. **Checkout** → enter name/email → select payment method
5. Click **Process Payment**
6. Check email for payment instructions
7. Test all 7 payment methods display correctly

## 📊 What Happens After Checkout

When customer submits payment form:
1. ✅ Order saved to Supabase `orders` table
2. ✅ Customer saved to Supabase `customers` table
3. ✅ Payment email sent via Resend with instructions
4. ✅ Business confirmation email sent with full order details
5. ✅ Success message shows on page
6. ✅ Cart cleared

## 🔑 Your API Keys (Already Set)

```
RESEND_API_KEY=re_jP7Afsv9_NXVtsrfMzfEseVVe6kceiyZN
NEXT_PUBLIC_SUPABASE_URL=https://nzwyojrjaugvpccgyugu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ALREADY SET]
SUPABASE_SERVICE_ROLE_KEY=[ALREADY SET]
```

## 📝 Troubleshooting

**Emails not sending in production?**
- Check `RESEND_API_KEY` is in Vercel environment variables
- Check email address is verified on Resend (in sandbox mode)
- Check server logs in Vercel dashboard

**Supabase connection fails?**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Make sure SQL tables were created successfully

**Build fails on Vercel?**
- Check console output for TypeScript errors
- Run `npm run build` locally to debug
- All errors must be fixed before deploying

## ⏱️ Total Time to Live

- Supabase setup: **5 min**
- Resend config: **5 min** (optional)
- Deploy to Vercel: **10 min**
- Testing: **10 min**

**Total: 30 minutes to fully live production site! 🎉**

---

**Questions?** Check these docs in your project:
- Payment system: `PAYMENT_SYSTEM.md`
- Supabase setup: `SUPABASE_SETUP.md`
- Email system: `PAYMENT_EMAIL_SYSTEM.md`
