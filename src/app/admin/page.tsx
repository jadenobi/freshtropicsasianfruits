'use client'

import { useState, useMemo } from 'react'
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
} from '@/lib/adminService'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'analytics'>('overview')
  const [searchTerm, setSearchTerm] = useState('')

  // Compute analytics
  const stats = useMemo(() => calculateAdminStats(), [])
  const alerts = useMemo(() => getInventoryAlerts(), [])
  const salesMetrics = useMemo(() => getSalesMetrics(), [])
  const categoryPerf = useMemo(() => getCategoryPerformance(), [])
  const topProducts = useMemo(() => getTopProducts(8), [])
  const customerInsights = useMemo(() => getCustomerInsights(), [])
  const revenueBreakdown = useMemo(() => getRevenueBreakdown(), [])
  const recentOrders = useMemo(() => getRecentOrders(10), [])

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
          <h1 className="text-4xl font-black text-gray-900 mb-2">📊 Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders, inventory, sales, and customers</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
          <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold transition-all">
            🔍 Search
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['overview', 'orders', 'products', 'customers', 'analytics'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-amber-300'
              }`}
            >
              {tab === 'overview' && '📈 Overview'}
              {tab === 'orders' && '📦 Orders'}
              {tab === 'products' && '🍎 Products'}
              {tab === 'customers' && '👥 Customers'}
              {tab === 'analytics' && '📊 Analytics'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <p className="text-sm font-bold text-blue-900 mb-2">Total Orders</p>
                <p className="text-3xl font-black text-blue-600">{stats.totalOrders}</p>
                <p className="text-xs text-blue-700 mt-2">This Month: {stats.ordersThisMonth}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                <p className="text-sm font-bold text-green-900 mb-2">Total Revenue</p>
                <p className="text-3xl font-black text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-green-700 mt-2">This Month: {formatCurrency(stats.revenueThisMonth)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                <p className="text-sm font-bold text-purple-900 mb-2">Total Customers</p>
                <p className="text-3xl font-black text-purple-600">{stats.totalCustomers}</p>
                <p className="text-xs text-purple-700 mt-2">New This Month: 8</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
                <p className="text-sm font-bold text-orange-900 mb-2">Avg Order Value</p>
                <p className="text-3xl font-black text-orange-600">{formatCurrency(stats.averageOrderValue)}</p>
                <p className="text-xs text-orange-700 mt-2">Per Transaction</p>
              </div>
            </div>

            {/* Alerts & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inventory Alerts */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  ⚠️ Inventory Alerts ({alerts.length})
                </h2>
                <div className="space-y-3">
                  {alerts.length === 0 ? (
                    <p className="text-gray-600">All inventory levels normal</p>
                  ) : (
                    alerts.slice(0, 5).map(alert => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-lg border-l-4 ${
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
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  ⭐ Top Products
                </h2>
                <div className="space-y-3">
                  {topProducts.slice(0, 5).map((product, idx) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-900">{idx + 1}. {product.name}</p>
                        <p className="text-xs text-gray-600">{product.sales} sales • {formatCurrency(product.revenue)}</p>
                      </div>
                      <span className="text-lg font-black text-amber-600">{product.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📦 Recent Orders</h2>
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
                        <td className="py-3 px-4 font-bold text-amber-600">{order.orderId}</td>
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

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-bold">Order ID</th>
                    <th className="text-left py-3 px-4 font-bold">Subtotal</th>
                    <th className="text-left py-3 px-4 font-bold">Shipping</th>
                    <th className="text-left py-3 px-4 font-bold">Tax</th>
                    <th className="text-left py-3 px-4 font-bold">Total</th>
                    <th className="text-left py-3 px-4 font-bold">Status</th>
                    <th className="text-left py-3 px-4 font-bold">Date</th>
                    <th className="text-left py-3 px-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-amber-600">{order.orderId}</td>
                      <td className="py-3 px-4">{formatCurrency(order.subtotal)}</td>
                      <td className="py-3 px-4">{formatCurrency(order.shipping)}</td>
                      <td className="py-3 px-4">{formatCurrency(order.tax)}</td>
                      <td className="py-3 px-4 font-bold">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 font-bold">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex-1">{product.name}</h3>
                    <span className="text-lg">🍎</span>
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
                      <span className="text-amber-500">⭐</span>
                      <span className="font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold text-sm transition-all">
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
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <p className="text-sm font-bold text-blue-900 mb-2">Total Customers</p>
              <p className="text-3xl font-black text-blue-600">{customerInsights.totalCustomers}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <p className="text-sm font-bold text-green-900 mb-2">Active This Month</p>
              <p className="text-3xl font-black text-green-600">{customerInsights.activeThisMonth}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
              <p className="text-sm font-bold text-purple-900 mb-2">Repeat Rate</p>
              <p className="text-3xl font-black text-purple-600">{customerInsights.repeatCustomers}</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <p className="text-sm font-bold text-orange-900 mb-2">Retention</p>
              <p className="text-3xl font-black text-orange-600">{formatPercentage(customerInsights.retentionRate)}</p>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue by Payment Method</h2>
                <div className="space-y-3">
                  {Object.entries(revenueBreakdown.byPaymentMethod).map(([method, amount]) => (
                    <div key={method} className="flex items-center justify-between">
                      <span className="font-bold capitalize text-gray-900">{method.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-amber-600 font-bold">{formatCurrency(amount as number)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue by Category</h2>
                <div className="space-y-3">
                  {Object.entries(revenueBreakdown.byCategory).map(([cat, amount]) => (
                    <div key={cat} className="flex items-center justify-between">
                      <span className="font-bold capitalize text-gray-900">{cat}</span>
                      <span className="text-amber-600 font-bold">{formatCurrency(amount as number)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Category Performance</h2>
              <div className="space-y-3">
                {categoryPerf.map(cat => (
                  <div key={cat.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-900">{cat.category}</p>
                      <p className="text-sm text-gray-600">{cat.sales} sales • {formatCurrency(cat.revenue)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${cat.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
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
