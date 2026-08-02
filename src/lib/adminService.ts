import { Order, Customer, AdminStats, SalesMetric, CategoryPerformance, InventoryAlert } from '@/types'
import { FRUITS } from '@/lib/products'

// Calculate dashboard statistics from raw data
export function calculateAdminStats(orders: any[], customers: any[]): AdminStats {
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)
  const totalCustomers = customers.length

  const thisMonthOrders = orders.filter(o => {
    const orderDate = new Date(o.createdAt || o.created_at)
    const now = new Date()
    return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()
  })

  const revenueThisMonth = thisMonthOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)

  return {
    totalOrders,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalCustomers,
    averageOrderValue: totalOrders > 0 ? parseFloat((totalRevenue / totalOrders).toFixed(2)) : 0,
    ordersThisMonth: thisMonthOrders.length,
    revenueThisMonth: parseFloat(revenueThisMonth.toFixed(2)),
    topProduct: FRUITS[0],
    topCustomer: customers[0] || null,
  }
}

let adminDataCache: any = null;
let adminDataPromise: Promise<any> | null = null;

async function getAdminData() {
  if (adminDataCache) return adminDataCache;
  if (!adminDataPromise) {
    adminDataPromise = fetch('/api/admin/data')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        adminDataCache = data;
        return data;
      })
      .catch(err => {
        // Clear so next attempt retries
        adminDataPromise = null;
        throw err;
      });
  }
  return adminDataPromise;
}

export async function fetchRealOrders() {
  try {
    const data = await getAdminData();
    return data.orders || [];
  } catch (e) {
    console.error('Error fetching orders:', e);
    return [];
  }
}

export async function fetchRealCustomers() {
  try {
    const data = await getAdminData();
    return data.customers || [];
  } catch (e) {
    console.error('Error fetching customers:', e);
    return [];
  }
}

// Get inventory alerts using real product catalog
export function getInventoryAlerts(): InventoryAlert[] {
  const alerts = FRUITS.map(product => {
      const stock = product.inventory ?? 0
      const threshold: 'critical' | 'warning' | 'ok' = 
        stock === 0 ? 'critical' : stock < 30 ? 'warning' : 'ok'
      
      const alert: InventoryAlert = {
        id: `alert-${product.id}`,
        productId: product.id,
        productName: product.name,
        currentStock: stock,
        minStock: 20,
        threshold,
        lastRestocked: new Date().toISOString(),
      }
      return alert
    })
    .filter(alert => alert.threshold !== 'ok')
  
  return alerts
}

// Get sales metrics (last 30 days) based on real orders
export function getSalesMetrics(orders: any[]): SalesMetric[] {
  const metrics: SalesMetric[] = []
  const now = new Date()

  // Pre-calculate daily totals
  const dailyStats: Record<string, { orders: number, revenue: number, customers: Set<string> }> = {}
  orders.forEach(o => {
    const dStr = new Date(o.createdAt || o.created_at).toISOString().split('T')[0]
    if (!dailyStats[dStr]) dailyStats[dStr] = { orders: 0, revenue: 0, customers: new Set() }
    dailyStats[dStr].orders += 1
    dailyStats[dStr].revenue += Number(o.total || 0)
    if (o.customerEmail) dailyStats[dStr].customers.add(o.customerEmail)
  })

  // Fill in the last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dStr = date.toISOString().split('T')[0]
    
    const dayData = dailyStats[dStr] || { orders: 0, revenue: 0, customers: new Set() }
    
    metrics.push({
      date: dStr,
      orders: dayData.orders,
      revenue: parseFloat(dayData.revenue.toFixed(2)),
      customers: dayData.customers.size,
      averageOrderValue: dayData.orders > 0 ? parseFloat((dayData.revenue / dayData.orders).toFixed(2)) : 0,
    })
  }

  return metrics
}

// Get category performance
export function getCategoryPerformance(orders: any[]): CategoryPerformance[] {
  const categories = ['fresh', 'tropical', 'apples', 'citrus', 'exotic', 'berries']
  const catStats: Record<string, { sales: number, revenue: number }> = {}
  categories.forEach(c => catStats[c] = { sales: 0, revenue: 0 })

  // Link items to category via FRUITS
  const productCatMap: Record<string, string> = {}
  FRUITS.forEach(f => { productCatMap[f.id] = f.category.toLowerCase() })

  orders.forEach(o => {
    if (!o.items) return;
    o.items.forEach((item: any) => {
      const cat = productCatMap[item.id] || 'fresh'
      if (!catStats[cat]) catStats[cat] = { sales: 0, revenue: 0 }
      catStats[cat].sales += Number(item.quantity || 1)
      catStats[cat].revenue += Number(item.price || 0) * Number(item.quantity || 1)
    })
  })

  return categories.map(cat => ({
    category: cat.charAt(0).toUpperCase() + cat.slice(1),
    sales: catStats[cat]?.sales || 0,
    revenue: catStats[cat]?.revenue || 0,
    growth: 0, // Cannot easily calculate growth without historical baseline
    topProduct: 'N/A', // Simplified for minimal interface
  }))
}

// Get top products by revenue
export function getTopProducts(orders: any[], limit = 10) {
  const productStats: Record<string, { id: string, name: string, quantity: number, revenue: number }> = {}
  
  orders.forEach(o => {
    if (!o.items) return;
    o.items.forEach((item: any) => {
      if (!productStats[item.id]) {
        productStats[item.id] = { id: item.id, name: item.name, quantity: 0, revenue: 0 }
      }
      productStats[item.id].quantity += Number(item.quantity || 1)
      productStats[item.id].revenue += Number(item.price || 0) * Number(item.quantity || 1)
    })
  })

  const sortedIds = Object.keys(productStats).sort((a, b) => productStats[b].revenue - productStats[a].revenue).slice(0, limit)
  
  return sortedIds.map(id => {
    const stat = productStats[id]
    // Look up real product defaults if missing
    const realProd = FRUITS.find(f => f.id === id)
    return {
      id: id,
      name: stat.name || realProd?.name || id,
      price: realProd?.price || 0,
      inventory: realProd?.inventory || 0,
      rating: realProd?.rating || 0,
      sales: stat.quantity,
      revenue: parseFloat(stat.revenue.toFixed(2)),
    }
  })
}

// Get all orders with filters
export function getOrders(orders: any[], filters?: { status?: string; startDate?: string; endDate?: string; limit?: number }) {
  let results = [...orders]

  if (filters?.status) {
    results = results.filter(o => o.status === filters.status)
  }

  if (filters?.limit) {
    results = results.slice(0, filters.limit)
  }

  return results
}

// Get customer insights
export function getCustomerInsights(customers: any[], orders: any[]) {
  const totalCustomers = customers.length
  
  // Actually active this month
  const now = new Date()
  const activeEmails = new Set(
    orders.filter(o => new Date(o.createdAt || o.created_at).getMonth() === now.getMonth())
          .map(o => o.customerEmail)
  )

  const avgOrderValue = orders.length > 0 ? (orders.reduce((sum, o) => sum + Number(o.total || 0), 0) / orders.length) : 0
  
  // Repeat customers (more than 1 order)
  const orderCounts: Record<string, number> = {}
  orders.forEach(o => {
    if (o.customerEmail) {
      orderCounts[o.customerEmail] = (orderCounts[o.customerEmail] || 0) + 1
    }
  })
  const repeatCustomers = Object.values(orderCounts).filter(c => c > 1).length

  return {
    totalCustomers,
    activeThisMonth: activeEmails.size,
    repeatCustomers,
    newThisMonth: customers.filter(c => new Date(c.createdAt).getMonth() === now.getMonth()).length,
    avgOrderValue,
    lifetimeValue: parseFloat((avgOrderValue * 2.5).toFixed(2)),
    churnRate: totalCustomers === 0 ? 0 : 5.0, // Simplified metric
    retentionRate: totalCustomers === 0 ? 100 : 95.0,
  }
}

// Get revenue breakdown
export function getRevenueBreakdown(orders: any[], stats: AdminStats) {
  const byPaymentMethod: Record<string, number> = {}
  const byCategory: Record<string, number> = {}
  
  const productCatMap: Record<string, string> = {}
  FRUITS.forEach(f => { productCatMap[f.id] = f.category.toLowerCase() })

  orders.forEach(o => {
    const pMethod = o.paymentMethod || 'Unknown'
    if (!byPaymentMethod[pMethod]) byPaymentMethod[pMethod] = 0
    byPaymentMethod[pMethod] += Number(o.total || 0)

    if (o.items) {
      o.items.forEach((item: any) => {
        const cat = productCatMap[item.id] || 'fresh'
        if (!byCategory[cat]) byCategory[cat] = 0
        byCategory[cat] += Number(item.price || 0) * Number(item.quantity || 1)
      })
    }
  })

  return {
    totalRevenue: stats.totalRevenue,
    byPaymentMethod,
    byCategory,
  }
}

// Get recent orders
export function getRecentOrders(orders: any[], limit = 10) {
  return [...orders].sort(
    (a, b) => new Date(b.createdAt || b.created_at).getTime() - new Date(a.createdAt || a.created_at).getTime()
  ).slice(0, limit)
}

// Get pending reviews
export function getPendingReviews() {
  return [] // Minimal real data fallback
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
