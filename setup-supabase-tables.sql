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
