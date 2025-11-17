// Product Types
export interface Fruit {
  id: string;
  name: string;
  category: 'fresh' | 'organic' | 'exotic' | 'seasonal' | 'tropical' | 'berries' | 'apples' | 'citrus';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  inventory?: number;
  quantity?: number;
}

// Cart Types
export interface CartItem extends Fruit {
  cartQuantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
  helpful: number;
}

// Order Types
export interface Order {
  id: string;
  orderId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: string;
  createdAt: Date;
  deliveryDate?: Date;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Customer Account Types
export interface Customer {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  orders: Order[];
  reviews: Review[];
  wishlist: string[];
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
