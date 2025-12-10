// Product Types
export interface Nutrition {
  calories?: number;
  protein?: number;
  carbs?: number;
  fiber?: number;
  vitaminC?: number;
  potassium?: number;
  antioxidants?: string[];
  benefits?: string[];
}

export interface Fruit {
  id: string;
  name: string;
  category: 'fresh' | 'organic' | 'exotic' | 'seasonal' | 'tropical' | 'berries' | 'apples' | 'citrus';
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // Gallery of product images
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  inventory?: number;
  quantity?: number;
  nutrition?: Nutrition; // Nutritional information
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

// Loyalty Types
export interface LoyaltyTier {
  name: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  pointsRequired: number;
  discount: number;
  benefits: string[];
  icon: string;
}

export interface LoyaltyAccount {
  userId: string;
  totalPoints: number;
  currentTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  pointsThisMonth: number;
  redeemablePoints: number;
  totalSpent: number;
  referralCode: string;
  referralRewards: number;
  joinDate: string;
  lastActivity: string;
  milestones: {
    firstPurchase: boolean;
    fivePurchases: boolean;
    tenPurchases: boolean;
    birthday: boolean;
  };
}

export interface PointsTransaction {
  id: string;
  userId: string;
  type: 'purchase' | 'referral' | 'birthday' | 'redemption' | 'bonus';
  points: number;
  description: string;
  date: string;
  orderId?: string;
}

// Live Chat Types
export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'user' | 'agent' | 'bot';
  senderName: string;
  message: string;
  timestamp: string;
  isBot?: boolean;
  suggestedReplies?: string[];
}

export interface ChatConversation {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  messages: ChatMessage[];
  status: 'active' | 'waiting' | 'closed';
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  feedback?: string;
}

export interface ChatAgent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  activeChats: number;
  maxChats: number;
}

// Admin Dashboard Types
export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  averageOrderValue: number;
  ordersThisMonth: number;
  revenueThisMonth: number;
  topProduct: Fruit;
  topCustomer: Customer;
}

export interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minStock: number;
  threshold: 'critical' | 'warning' | 'ok';
  lastRestocked: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  permissions: string[];
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface SalesMetric {
  date: string;
  orders: number;
  revenue: number;
  customers: number;
  averageOrderValue: number;
}

export interface CategoryPerformance {
  category: string;
  sales: number;
  revenue: number;
  growth: number;
  topProduct: string;
}

// Product Comparison Types
export interface ComparisonProduct extends Fruit {
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    vitaminC: number;
    potassium: number;
  };
  benefits: string[];
  season: string;
  shelfLife: string;
  storage: string;
  origin: string;
}

export interface ComparisonList {
  id: string;
  products: ComparisonProduct[];
  createdAt: string;
  updatedAt: string;
}

// Social Integration Types
export interface UserGeneratedContent {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  productName: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  rating: number;
  platform: 'instagram' | 'tiktok' | 'user-uploaded';
  createdAt: string;
  verified: boolean;
}

export interface SocialShare {
  platform: 'facebook' | 'twitter' | 'instagram' | 'whatsapp' | 'linkedin';
  url: string;
  text: string;
  imageUrl?: string;
}

export interface SocialLogin {
  provider: 'google' | 'facebook' | 'apple';
  email: string;
  name: string;
  avatar: string;
}

// Seasonal Collections Types
export interface SeasonalBundle {
  id: string;
  name: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  description: string;
  image: string;
  icon: string;
  products: Fruit[];
  bundlePrice: number;
  originalPrice: number;
  discount: number;
  discountPercent: number;
  inStock: boolean;
  theme: string;
  storageNotes: string;
  recipeTips: string;
  quantity: number;
  bestFor: string;
  createdAt: string;
}

export interface SeasonalOffer {
  id: string;
  title: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  description: string;
  discountPercent: number;
  validFrom: string;
  validUntil: string;
  image: string;
  code?: string;
  applicableProducts: string[];
  featured: boolean;
}

export interface SeasonalCalendar {
  month: number;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  fruitInSeason: Fruit[];
  storageNotes: { [key: string]: string };
  recipeHighlights: { [key: string]: string };
}

// Email Marketing Types
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader: string;
  htmlContent: string;
  templateType: 'welcome' | 'abandoned-cart' | 'post-purchase' | 'promotional' | 'newsletter' | 'seasonal';
  createdAt: string;
  updatedAt: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  type: 'welcome' | 'abandoned-cart' | 'post-purchase' | 'promotional' | 'newsletter' | 'seasonal';
  templateId: string;
  recipientCount: number;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  scheduledFor?: string;
  sentAt?: string;
  createdAt: string;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  preferences: {
    promotions: boolean;
    newsletter: boolean;
    seasonal: boolean;
    productUpdates: boolean;
  };
  subscribedAt: string;
  unsubscribedAt?: string;
  lastEmailSent?: string;
  status: 'active' | 'unsubscribed' | 'bounced';
}

export interface EmailSequence {
  id: string;
  name: string;
  type: 'welcome' | 'abandoned-cart' | 'post-purchase';
  emails: Array<{
    templateId: string;
    delayHours: number;
    subject: string;
  }>;
  enabled: boolean;
  triggeredCount: number;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
