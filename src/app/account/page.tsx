'use client'

import { useState, useEffect } from 'react'
import PageLayout from '@/components/PageLayout'
import { getOrders, getWishlist, removeFromWishlist } from '@/lib/customerService'
import { FRUITS } from '@/lib/data'
import Link from 'next/link'

export default function AccountPage() {
  const [email, setEmail] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('orders')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      localStorage.setItem('customerEmail', email)
      setIsLogged(true)
      const userOrders = await getOrders(email)
      const userWishlist = await getWishlist(email)
      setOrders(userOrders || [])
      setWishlist(userWishlist || [])
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('customerEmail')
    setIsLogged(false)
    setEmail('')
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('customerEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setIsLogged(true)
      // Fetch data after state update
      const fetchData = async () => {
        const userOrders = await getOrders(savedEmail)
        const userWishlist = await getWishlist(savedEmail)
        setOrders(userOrders || [])
        setWishlist(userWishlist || [])
      }
      fetchData()
    }
  }, [])

  const wishlistProducts = FRUITS.filter((f) => wishlist.includes(f.id))

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(email, productId)
    setWishlist(wishlist.filter((id) => id !== productId))
  }

  if (!isLogged) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-yellow-50 py-20">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-emerald-600 mb-6 text-center">My Account</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Sign In / Create Account
              </button>
            </form>

            <p className="text-sm text-gray-600 text-center mt-4">
              Enter your email to access your account (no password needed)
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-yellow-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
                <p className="text-gray-600 mt-2">{email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-bold rounded-lg transition-all ${
                activeTab === 'orders'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-emerald-600 border-2 border-emerald-600'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-6 py-3 font-bold rounded-lg transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-emerald-600 border-2 border-emerald-600'
              }`}
            >
              Wishlist ({wishlist.length})
            </button>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <p className="text-gray-600 text-lg mb-4">No orders yet</p>
                  <Link
                    href="/shop"
                    className="inline-block bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Order ID</p>
                        <p className="font-bold text-lg">#{order.orderId}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Date</p>
                        <p className="font-bold">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="font-bold text-lg text-emerald-600">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Status</p>
                        <p className="font-bold capitalize bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full inline-block">
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-bold mb-2">Items:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {order.items.map((item: any) => (
                          <li key={item.id}>
                            {item.name} × {item.cartQuantity} @ ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlist.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <p className="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
                  <Link
                    href="/shop"
                    className="inline-block bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-emerald-600 font-bold text-xl mb-3">${product.price}</p>
                        <div className="flex gap-2">
                          <Link
                            href={`/product/${product.id}`}
                            className="flex-1 bg-emerald-600 text-white text-center py-2 rounded font-bold hover:bg-emerald-700"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleRemoveFromWishlist(product.id)}
                            className="flex-1 bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
