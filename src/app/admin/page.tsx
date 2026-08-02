'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/PageLayout'
import {
  calculateAdminStats,
  getInventoryAlerts,
  getSalesMetrics,
  getCategoryPerformance,
  getTopProducts,
  getCustomerInsights,
  getRevenueBreakdown,
  getRecentOrders,
  formatCurrency,
  formatPercentage,
  fetchRealOrders,
  fetchRealCustomers
} from '@/lib/adminService'
import { PAYMENT_METHODS, PAYMENT_INSTRUCTIONS } from '@/config/payments'
import { Copy, Send } from 'lucide-react'

// Define the Professional Email Template Generator
const generateProfessionalEmailHtml = (order: any) => {
  const method = PAYMENT_METHODS.find(m => m.id === order.paymentMethod)
  const instructions = PAYMENT_INSTRUCTIONS[order.paymentMethod]
    ?.replace("[TOTAL]", order.total.toFixed(2))
    ?.replace("[ORDER_ID]", order.orderId) || "Payment details will be provided shortly."

  const itemsHtml = order.items.map((item: any) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('')

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; color: #1f2937; line-height: 1.6; background-color: #f9fafb; padding: 20px;">
      <div style="background: linear-gradient(135deg, #065f46 0%, #064e3b 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; border-bottom: 4px solid #f59e0b;">
        <img src="https://www.freshtropicsasianfruits.com/custom-logo.png" alt="Fresh Tropics Logo" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(251, 191, 36, 0.5); margin-bottom: 15px;">
        <h1 style="margin: 0; color: #fef3c7; font-size: 28px; letter-spacing: -0.5px;">Fresh Tropics</h1>
        <p style="margin: 5px 0 0 0; color: #fbbf24; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">✦ Premium Asian Fruits ✦</p>
      </div>

      <div style="background-color: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #111827; margin-top: 0; font-size: 22px;">Order Confirmation & Payment Request</h2>
        <p>Dear <strong>${order.customerName}</strong>,</p>
        <p>Thank you for choosing Fresh Tropics! We have received your order <strong>#${order.orderId}</strong> and have personally inspected your fruits for maximum quality and freshness.</p>

        <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">💳 Secure Payment Details</h3>
          <p style="margin: 0; color: #b45309; font-size: 15px;">
            Please complete your payment of <strong>$${order.total.toFixed(2)}</strong> via <strong>${method?.name || order.paymentMethod}</strong> using the instructions below:
          </p>
          <div style="margin-top: 15px; padding: 15px; background: white; border: 1px dashed #d97706; font-family: monospace; font-size: 14px; color: #1f2937;">
            ${instructions}
          </div>
        </div>

        <h3 style="color: #065f46; font-size: 18px; border-bottom: 2px solid #ecfdf5; padding-bottom: 8px; margin-top: 30px;">📦 Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Item</th>
              <th style="padding: 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #6b7280;">Qty</th>
              <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280;">Price</th>
              <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 12px; text-align: right; color: #6b7280;">Subtotal:</td>
              <td style="padding: 12px; text-align: right; color: #111827;">$${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" style="padding: 12px; text-align: right; color: #6b7280;">Shipping:</td>
              <td style="padding: 12px; text-align: right; color: #111827;">$${order.shipping.toFixed(2)}</td>
            </tr>
            <tr style="background-color: #f0fdf4;">
              <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; color: #065f46; font-size: 16px;">Total Amount Due:</td>
              <td style="padding: 12px; text-align: right; font-weight: bold; color: #065f46; font-size: 18px;">$${order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 13px;">
          <p>Once payment is confirmed, your order will be shipped immediately.</p>
          <p style="margin-top: 10px;">For any questions or issues, please contact our support team at <strong>support@freshtropicsasianfruits.com</strong>.</p>
          <p style="margin-top: 5px; font-size: 11px;">Note: <strong>orders@freshtropicsasianfruits.com</strong> is for order confirmation only. All support inquiries must go to the support address above.</p>
          <p style="margin-top: 15px; font-weight: bold; color: #065f46; font-size: 15px;">Fresh Tropics Asian Fruits</p>
          <p>www.freshtropicsasianfruits.com</p>
        </div>
      </div>
    </div>
  `
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'analytics'>('overview')

  const [searchTerm, setSearchTerm] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [isReplying, setIsReplying] = useState(false)
  const [replyLoading, setReplyLoading] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth === 'true') {
      setIsAuthenticated(true)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Auto-fill template when an order is clicked
  useEffect(() => {
    if (selectedOrder) {
      const template = PAYMENT_INSTRUCTIONS[selectedOrder.paymentMethod] 
        || "Payment method details will be provided manually.";
      const formatted = template
        .replace("[TOTAL]", (selectedOrder.total || 0).toFixed(2))
        .replace("[ORDER_ID]", selectedOrder.orderId);
      
      const customerName = customers.find(c => c.email === selectedOrder.customerEmail)?.name || 'there';
      
      setReplyMessage(`Hi ${customerName},\n\nThank you for choosing Fresh Tropics Asian Fruits!\nWe successfully verified your order #${selectedOrder.orderId}.\n\nTo finalize your order, please use the details below:\n\n${formatted}\n\nOnce payment is confirmed, your fruits will be carefully packaged and shipped for delivery.\n\nBest regards,\nThe Fresh Tropics Team`);
    } else {
      setReplyMessage("");
    }
  }, [selectedOrder, customers])

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const [o, c] = await Promise.all([fetchRealOrders(), fetchRealCustomers()])
      setOrders(o)
      setCustomers(c)
      setIsLoading(false)
    }
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  // Compute analytics dynamically
  const stats = useMemo(() => calculateAdminStats(orders, customers), [orders, customers])
  const alerts = useMemo(() => getInventoryAlerts(), [])
  const salesMetrics = useMemo(() => getSalesMetrics(orders), [orders])
  const categoryPerf = useMemo(() => getCategoryPerformance(orders), [orders])
  const topProducts = useMemo(() => getTopProducts(orders, 8), [orders])
  const customerInsights = useMemo(() => getCustomerInsights(customers, orders), [customers, orders])
  const revenueBreakdown = useMemo(() => getRevenueBreakdown(orders, stats), [orders, stats])
  const recentOrders = useMemo(() => getRecentOrders(orders, 10), [orders])

  const handleLogin = async () => {
    setIsAuthLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (res.ok) {
        localStorage.setItem('adminAuth', 'true')
        setIsAuthenticated(true)
      } else {
        alert('Invalid password')
      }
    } catch {
      alert('Authentication error. Please try again.')
    } finally {
      setIsAuthLoading(false)
    }
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="max-w-md mx-auto px-4 py-16 h-screen flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-sm p-8 w-full">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2"> Admin Access</h1>
            <p className="text-gray-600 mb-6">Enter password to access admin dashboard</p>
            
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black mb-4 text-base"
            />
            
            <button
              onClick={handleLogin}
              disabled={isAuthLoading}
              className="w-full px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 hover:shadow-lg font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isAuthLoading ? 'Checking...' : ' Login'}
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'shipped':
        return 'bg-blue-100 text-blue-700'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2"> Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders, inventory, sales, and customers</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
          />
          <button className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 hover:shadow-lg font-bold transition-all">
             Search
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['overview', 'orders', 'products', 'customers', 'analytics'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-black'
              }`}
            >
              {tab === 'overview' && ' Overview'}
              {tab === 'orders' && ' Orders'}
              {tab === 'products' && ' Products'}
              {tab === 'customers' && ' Customers'}
              {tab === 'analytics' && ' Analytics'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && !isLoading && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Orders</p>
                <p className="text-3xl font-semibold tracking-tight text-black">{stats.totalOrders}</p>
                <p className="text-xs text-blue-700 mt-2">This Month: {stats.ordersThisMonth}</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Revenue</p>
                <p className="text-3xl font-semibold tracking-tight text-black">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-green-700 mt-2">This Month: {formatCurrency(stats.revenueThisMonth)}</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Customers</p>
                <p className="text-3xl font-semibold tracking-tight text-black">{stats.totalCustomers}</p>
                <p className="text-xs text-purple-700 mt-2">New This Month: 8</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Avg Order Value</p>
                <p className="text-3xl font-semibold tracking-tight text-black">{formatCurrency(stats.averageOrderValue)}</p>
                <p className="text-xs text-orange-700 mt-2">Per Transaction</p>
              </div>
            </div>

            {/* Alerts & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inventory Alerts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                   Inventory Alerts ({alerts.length})
                </h2>
                <div className="space-y-3">
                  {alerts.length === 0 ? (
                    <p className="text-gray-600">All inventory levels normal</p>
                  ) : (
                    alerts.slice(0, 5).map(alert => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-xl border-l-4 ${
                          alert.threshold === 'critical'
                            ? 'bg-red-50 border-red-500 text-red-900'
                            : 'bg-yellow-50 border-yellow-500 text-yellow-900'
                        }`}
                      >
                        <p className="font-bold text-sm">{alert.productName}</p>
                        <p className="text-xs mt-1">
                          Stock: {alert.currentStock} / Min: {alert.minStock}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                   Top Products
                </h2>
                <div className="space-y-3">
                  {topProducts.slice(0, 5).map((product, idx) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-900">{idx + 1}. {product.name}</p>
                        <p className="text-xs text-gray-600">{product.sales} sales • {formatCurrency(product.revenue)}</p>
                      </div>
                      <span className="text-lg font-semibold tracking-tight text-black">{product.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4"> Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-4 font-bold">Order ID</th>
                      <th className="text-left py-2 px-4 font-bold">Total</th>
                      <th className="text-left py-2 px-4 font-bold">Status</th>
                      <th className="text-left py-2 px-4 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-black">{order.orderId}</td>
                        <td className="py-3 px-4 font-bold">{formatCurrency(order.total)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && isAuthenticated && (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 font-bold">Loading dashboard data...</p>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && !isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Orders</h2>
            {recentOrders.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-sm mt-1">Orders will appear here once customers make purchases</p>
              </div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-900">
                <thead>
                  <tr className="border-b-2 border-gray-100 bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-900">{order.orderId || '—'}</td>
                      <td className="py-4 px-4 text-gray-700">{order.customerEmail || '—'}</td>
                      <td className="py-4 px-4 text-gray-700">{order.paymentMethod || '—'}</td>
                      <td className="py-4 px-4 font-bold text-gray-900">{formatCurrency(order.total)}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                          {(order.status || 'pending').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => setSelectedOrder(order)} 
                          className="font-semibold px-4 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-all text-xs"
                        >View & Reply</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
            <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-sm relative animate-in slide-in-from-right duration-300">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 text-3xl font-semibold tracking-tight"
              >×</button>
              
              <div className="p-8">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">Order #{selectedOrder.orderId}</h2>
                <div className="flex items-center gap-3 mb-8">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.toUpperCase()}
                  </span>
                  <span className="text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm text-gray-500 uppercase tracking-wider">Customer</h3>
                    <p className="font-bold text-lg">{customers.find(c => c.email === selectedOrder.customerEmail)?.name || 'Unknown'}</p>
                    <p className="text-gray-600">{selectedOrder.customerEmail}</p>
                    <p className="text-gray-600 font-mono text-sm mt-2">{customers.find(c => c.email === selectedOrder.customerEmail)?.phone || 'No phone'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm text-gray-500 uppercase tracking-wider">Shipping Address</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{customers.find(c => c.email === selectedOrder.customerEmail)?.address || 'No address provided'}</p>
                  </div>
                </div>

                <div className="mb-8 font-bold">
                  Payment Method: <span className="text-black">{selectedOrder.paymentMethod}</span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-2">Items</h3>
                <div className="space-y-3 mb-8">
                  {(selectedOrder.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="font-bold text-gray-800">{item.quantity}x {item.name}</div>
                      <div className="text-gray-900 font-semibold">{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                  ))}
                  <div className="flex justify-end pt-4 font-semibold tracking-tight flex-col items-end text-right">
                    <div className="text-sm font-normal text-gray-600 mb-1">Subtotal: {formatCurrency(selectedOrder.subtotal)}</div>
                    <div className="text-sm font-normal text-gray-600 mb-1">Tax: {formatCurrency(selectedOrder.tax)}</div>
                    <div className="text-sm font-normal text-gray-600 mb-2">Shipping: {formatCurrency(selectedOrder.shipping)}</div>
                    <div className="text-2xl text-emerald-600">Total: {formatCurrency(selectedOrder.total)}</div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Reply to Customer</h3>
                  <textarea 
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your message to the customer here. It will be sent as an official business email..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-white placeholder-gray-400 mb-4"
                  />
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={async () => {
                        try {
                          const html = generateProfessionalEmailHtml({ ...selectedOrder, customerName: customers.find(c => c.email === selectedOrder.customerEmail)?.name || 'Customer' })
                          const blob = new Blob([html], { type: 'text/html' })
                          const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([html.replace(/<[^>]*>/g, '')], { type: 'text/plain' }) })]
                          await navigator.clipboard.write(data)
                          alert("Premium Branded Email Template copied to clipboard! You can now paste it directly into Gmail or Outlook.")
                        } catch (err) {
                          console.error("Clipboard error:", err)
                          const html = generateProfessionalEmailHtml({ ...selectedOrder, customerName: customers.find(c => c.email === selectedOrder.customerEmail)?.name || 'Customer' })
                          await navigator.clipboard.writeText(html)
                          alert("HTML Template copied as code (browser restricted rich copy). You can paste this into an HTML editor.")
                        }
                      }}
                      className="px-6 py-2 bg-amber-500 text-emerald-900 font-bold rounded-lg hover:bg-amber-600 flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Professional Email
                    </button>
                    <button 
                      disabled={replyLoading || !replyMessage.trim()}
                      onClick={async () => {
                        setReplyLoading(true)
                        try {
                          const res = await fetch("/api/admin/reply-email", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              orderId: selectedOrder.orderId,
                              customerEmail: selectedOrder.customerEmail,
                              subject: "Update on your order #" + selectedOrder.orderId,
                              message: replyMessage
                            })
                          })
                          if (res.ok) {
                            alert("Reply sent successfully!")
                            setReplyMessage("")
                          } else {
                            const errData = await res.json()
                            const detail = errData.details?.message || errData.error || "Check console"
                            alert(`Failed to send reply: ${detail}`)
                          }
                        } catch (e) {
                          alert("Error sending reply")
                        } finally {
                          setReplyLoading(false)
                        }
                      }}
                      className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {replyLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Email Reply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex-1">{product.name}</h3>
                    <span className="text-lg"></span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-bold">Price:</span> {formatCurrency(product.price)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Stock:</span> {product.inventory}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Sales:</span> {product.sales}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Revenue:</span> {formatCurrency(product.revenue)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500"></span>
                      <span className="font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 hover:shadow-lg font-bold text-sm transition-all">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <p className="text-sm font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Total Customers</p>
              <p className="text-3xl font-semibold tracking-tight text-black">{customerInsights.totalCustomers}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <p className="text-sm font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Active This Month</p>
              <p className="text-3xl font-semibold tracking-tight text-black">{customerInsights.activeThisMonth}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <p className="text-sm font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Repeat Rate</p>
              <p className="text-3xl font-semibold tracking-tight text-black">{customerInsights.repeatCustomers}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <p className="text-sm font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Retention</p>
              <p className="text-3xl font-semibold tracking-tight text-black">{formatPercentage(customerInsights.retentionRate)}</p>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue by Payment Method</h2>
                <div className="space-y-3">
                  {Object.entries(revenueBreakdown.byPaymentMethod).map(([method, amount]) => (
                    <div key={method} className="flex items-center justify-between">
                      <span className="font-bold capitalize text-gray-900">{method.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-black font-bold">{formatCurrency(amount as number)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue by Category</h2>
                <div className="space-y-3">
                  {Object.entries(revenueBreakdown.byCategory).map(([cat, amount]) => (
                    <div key={cat} className="flex items-center justify-between">
                      <span className="font-bold capitalize text-gray-900">{cat}</span>
                      <span className="text-black font-bold">{formatCurrency(amount as number)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Category Performance</h2>
              <div className="space-y-3">
                {categoryPerf.map(cat => (
                  <div key={cat.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-900">{cat.category}</p>
                      <p className="text-sm text-gray-600">{cat.sales} sales • {formatCurrency(cat.revenue)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${cat.growth > 0 ? 'text-black' : 'text-red-600'}`}>
                        {formatPercentage(cat.growth)}
                      </p>
                      <p className="text-xs text-gray-600">vs last month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
