import { Order, Fruit, Customer, AdminStats, SalesMetric, CategoryPerformance, InventoryAlert } from '@/types'

// Mock data for demo
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderId: 'ORD-001',
    items: [],
    total: 245.99,
    subtotal: 225,
    shipping: 9.99,
    tax: 11,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    orderId: 'ORD-002',
    items: [],
    total: 156.50,
    subtotal: 150,
    shipping: 0,
    tax: 6.5,
    status: 'shipped',
    paymentMethod: 'PayPal',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    orderId: 'ORD-003',
    items: [],
    total: 389.99,
    subtotal: 375,
    shipping: 9.99,
    tax: 5,
    status: 'processing',
    paymentMethod: 'Apple Pay',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
]

const MOCK_CUSTOMERS: Customer[] = [
  {
    email: 'john@example.com',
    name: 'John Smith',
    phone: '555-0101',
    address: '123 Main St',
    orders: MOCK_ORDERS,
    reviews: [],
    wishlist: [],
    createdAt: '2024-01-15',
  },
  {
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    phone: '555-0102',
    address: '456 Oak Ave',
    orders: [],
    reviews: [],
    wishlist: [],
    createdAt: '2024-06-20',
  },
  {
    email: 'mike@example.com',
    name: 'Mike Wilson',
    phone: '555-0103',
    address: '789 Pine Rd',
    orders: [],
    reviews: [],
    wishlist: [],
    createdAt: '2024-08-10',
  },
]

const MOCK_PRODUCTS: Fruit[] = [
  {
    id: '1',
    name: 'Pink Glow Pineapple',
    category: 'exotic',
    price: 29.99,
    originalPrice: 34.99,
    image: '/hero/pinkglow.jpg',
    description: 'Bioengineered pink-fleshed pineapple',
    rating: 4.8,
    reviews: 342,
    inStock: true,
    inventory: 45,
  },
  {
    id: '2',
    name: 'Mango',
    category: 'tropical',
    price: 12.99,
    image: '/products/mango.jpg',
    description: 'Sweet, juicy mango',
    rating: 4.6,
    reviews: 289,
    inStock: true,
    inventory: 120,
  },
  {
    id: '3',
    name: 'Rambutan',
    category: 'exotic',
    price: 18.99,
    image: '/products/rambutan.jpg',
    description: 'Exotic spiky red fruit',
    rating: 4.4,
    reviews: 156,
    inStock: false,
    inventory: 0,
  },
]

// Calculate dashboard statistics
export function calculateAdminStats(): AdminStats {
  const totalOrders = MOCK_ORDERS.length
  const totalRevenue = MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0)
  const totalCustomers = MOCK_CUSTOMERS.length

  const thisMonthOrders = MOCK_ORDERS.filter(o => {
    const orderDate = new Date(o.createdAt)
    const now = new Date()
    return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()
  })

  const revenueThisMonth = thisMonthOrders.reduce((sum, order) => sum + order.total, 0)

  return {
    totalOrders,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalCustomers,
    averageOrderValue: parseFloat((totalRevenue / totalOrders).toFixed(2)),
    ordersThisMonth: thisMonthOrders.length,
    revenueThisMonth: parseFloat(revenueThisMonth.toFixed(2)),
    topProduct: MOCK_PRODUCTS[0],
    topCustomer: MOCK_CUSTOMERS[0],
  }
}

// Get inventory alerts
export function getInventoryAlerts(): InventoryAlert[] {
  const alerts = MOCK_PRODUCTS
    .map((product, idx) => {
      const stock = product.inventory || 0
      const threshold: 'critical' | 'warning' | 'ok' = 
        stock === 0 ? 'critical' : stock < 30 ? 'warning' : 'ok'
      
      const alert: InventoryAlert = {
        id: `alert-${product.id}`,
        productId: product.id,
        productName: product.name,
        currentStock: stock,
        minStock: 20,
        threshold,
        lastRestocked: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
      return alert
    })
    .filter(alert => alert.threshold !== 'ok')
  
  return alerts
}

// Get sales metrics (last 30 days)
export function getSalesMetrics(): SalesMetric[] {
  const metrics: SalesMetric[] = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Mock data with some randomness
    const dayOrders = Math.floor(Math.random() * 8) + 1
    const avgValue = 150 + Math.random() * 300
    const revenue = dayOrders * avgValue

    metrics.push({
      date: date.toISOString().split('T')[0],
      orders: dayOrders,
      revenue: parseFloat(revenue.toFixed(2)),
      customers: Math.floor(dayOrders * 1.5),
      averageOrderValue: parseFloat(avgValue.toFixed(2)),
    })
  }

  return metrics
}

// Get category performance
export function getCategoryPerformance(): CategoryPerformance[] {
  const categories = ['exotic', 'tropical', 'berries', 'citrus', 'organic']

  return categories.map((cat, idx) => ({
    category: cat.charAt(0).toUpperCase() + cat.slice(1),
    sales: Math.floor(Math.random() * 150) + 50,
    revenue: Math.floor(Math.random() * 5000) + 1000,
    growth: Math.floor(Math.random() * 40) - 10,
    topProduct: MOCK_PRODUCTS[idx % MOCK_PRODUCTS.length]?.name || 'N/A',
  }))
}

// Get top products by revenue
export function getTopProducts(limit = 10) {
  return MOCK_PRODUCTS.slice(0, limit).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    inventory: p.inventory,
    rating: p.rating,
    sales: Math.floor(Math.random() * 200) + 20,
    revenue: Math.floor(Math.random() * 5000) + 500,
  }))
}

// Get all orders with filters
export function getOrders(filters?: { status?: string; startDate?: string; endDate?: string; limit?: number }) {
  let results = [...MOCK_ORDERS]

  if (filters?.status) {
    results = results.filter(o => o.status === filters.status)
  }

  if (filters?.limit) {
    results = results.slice(0, filters.limit)
  }

  return results
}

// Get customer insights
export function getCustomerInsights() {
  const totalCustomers = MOCK_CUSTOMERS.length
  const activeCustomers = Math.floor(totalCustomers * 0.7)
  const avgOrderValue = 245
  const repeatCustomers = Math.floor(totalCustomers * 0.45)

  return {
    totalCustomers,
    activeThisMonth: activeCustomers,
    repeatCustomers,
    newThisMonth: Math.floor(totalCustomers * 0.2),
    avgOrderValue,
    lifetimeValue: avgOrderValue * 3.5,
    churnRate: 8.5,
    retentionRate: 91.5,
  }
}

// Get revenue breakdown
export function getRevenueBreakdown() {
  const stats = calculateAdminStats()
  return {
    totalRevenue: stats.totalRevenue,
    byPaymentMethod: {
      creditCard: stats.totalRevenue * 0.45,
      paypal: stats.totalRevenue * 0.35,
      applePay: stats.totalRevenue * 0.12,
      googlePay: stats.totalRevenue * 0.08,
    },
    byCategory: {
      exotic: stats.totalRevenue * 0.35,
      tropical: stats.totalRevenue * 0.3,
      berries: stats.totalRevenue * 0.2,
      citrus: stats.totalRevenue * 0.15,
    },
  }
}

// Get recent orders
export function getRecentOrders(limit = 10) {
  return MOCK_ORDERS.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, limit)
}

// Get pending reviews
export function getPendingReviews() {
  return [
    { id: '1', customerName: 'John Smith', productName: 'Pink Glow Pineapple', rating: null, date: new Date().toISOString() },
    { id: '2', customerName: 'Sarah Johnson', productName: 'Mango', rating: null, date: new Date().toISOString() },
  ]
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}
