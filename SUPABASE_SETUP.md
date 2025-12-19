# Supabase Setup Guide for Fresh Tropics

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with email
4. Create a new project (name it: `fresh-tropics`)
5. Wait for database to initialize (~2-3 min)

## Step 2: Get Your Keys
1. In Supabase dashboard, go to **Settings → API**
2. Copy these:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Key**: `eyJxx...` (public key)
   - **Service Role Key**: `eyJxx...` (secret key)

## Step 3: Add to .env.local
Add to `c:\Users\OBI AKOM\OneDrive\Documents\fruit-selling-website\.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...
```

## Step 4: Create Database Tables
Run this SQL in Supabase SQL Editor (copy all):

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

## Step 5: Verify Installation
After setup, restart your server:
```powershell
taskkill /F /IM node.exe
npm run dev
```

Everything should work! Data will now persist permanently in Supabase.
