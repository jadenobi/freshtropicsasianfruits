'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlistIds(saved)
  }, [])

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id.toString()))

  const handleRemove = (productId: string) => {
    const updated = wishlistIds.filter(id => id !== productId)
    setWishlistIds(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
  }

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlistIds([])
      localStorage.setItem('wishlist', '[]')
    }
  }

  if (!mounted) return null

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-black text-emerald-900 mb-4">My Wishlist</h1>
            <p className="text-lg text-gray-600">
              {wishlistProducts.length === 0 ? 'Your wishlist is empty' : `${wishlistProducts.length} item${wishlistProducts.length !== 1 ? 's' : ''} saved`}
            </p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-emerald-100">
              <p className="text-5xl mb-4">🤍</p>
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8 text-lg">Start adding products to save them for later</p>
              <Link
                href="/shop"
                className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg shadow-lg hover:shadow-xl"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div>
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {wishlistProducts.map(product => (
                  <div key={product.id} className="group">
                    <ProductCard product={product} />
                    <button
                      onClick={() => handleRemove(product.id.toString())}
                      className="mt-3 w-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-bold transition-all border border-red-200 hover:border-red-300"
                    >
                      ❌ Remove from Wishlist
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/shop"
                  className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg shadow-lg hover:shadow-xl"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={handleClearWishlist}
                  className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-8 py-4 rounded-xl font-bold transition-all border border-red-200 hover:border-red-300 text-lg"
                >
                  Clear Wishlist
                </button>
              </div>

              {/* Summary */}
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border-2 border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">💡 Wishlist Tips</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📌</span>
                    <span>Your wishlist is saved locally on this device</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔄</span>
                    <span>Items will remain saved even if you close the browser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🛒</span>
                    <span>Click any product to add it to your cart</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💚</span>
                    <span>Click the heart icon to remove items from your wishlist</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
