'use client'

import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import ProductCard from '@/components/ProductCard'
import { FRUITS } from '@/lib/data'
import Link from 'next/link'

export default function SalePage(){
  // Get products that have original prices (indicating they're on sale)
  const onSaleProducts = FRUITS.filter(p => p.originalPrice && p.originalPrice > p.price)
  
  // All products as "new" and "featured"
  const allProducts = FRUITS
  
  // If no products on sale, show all products
  const displayProducts = onSaleProducts.length > 0 ? FRUITS : FRUITS

  return (
    <PageLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="mb-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">🎉 New & On Sale!</h1>
            <p className="text-lg text-red-50 mb-6">
              Discover our latest arrivals and exclusive deals on premium tropical fruits. Limited time offers!
            </p>
            <div className="flex flex-wrap gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <p className="font-bold text-sm">✨ NEW ARRIVALS</p>
              <p className="text-2xl">{FRUITS.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <p className="font-bold text-sm">🔥 ON SALE</p>
              <p className="text-2xl">{onSaleProducts.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <p className="font-bold text-sm">💰 TOTAL ITEMS</p>
              <p className="text-2xl">{displayProducts.length}</p>
            </div>
            </div>
          </div>

          {/* Sale Info Banner */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
              <p className="text-3xl mb-2">🏷️</p>
              <h3 className="font-bold text-red-900 mb-2">Hot Deals</h3>
              <p className="text-sm text-red-800">Limited time offers on select premium fruits</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-3xl mb-2">✨</p>
              <h3 className="font-bold text-yellow-900 mb-2">Fresh Arrivals</h3>
              <p className="text-sm text-yellow-800">Newest tropical fruits just arrived at Fresh Tropics</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <p className="text-3xl mb-2">⭐</p>
              <h3 className="font-bold text-green-900 mb-2">Best Value</h3>
              <p className="text-sm text-green-800">Premium quality at unbeatable prices</p>
            </div>
          </div>

          {/* Filters / Info */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
              <p className="text-gray-600 mt-2">
                Showing <span className="font-bold text-emerald-600">{displayProducts.length}</span> products
              </p>
            </div>
            <Link 
              href="/shop"
              className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm underline"
            >
              Browse All Products →
            </Link>
          </div>

          {/* Products Grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {displayProducts.map((p) => (
                <div key={p.id} className="relative">
                  {/* Sale Badge */}
                  {p.originalPrice && p.originalPrice > p.price && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF
                      </div>
                    </div>
                  )}
                  {/* New Badge */}
                  {FRUITS.indexOf(p) < 20 && !(p.originalPrice && p.originalPrice > p.price) && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        NEW ✨
                      </div>
                    </div>
                  )}
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items currently on sale.</p>
              <Link href="/shop" className="text-emerald-600 hover:text-emerald-700 font-semibold mt-4 inline-block">
                Browse all products instead
              </Link>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
            <p className="text-lg mb-6 text-emerald-50">
              These special deals won't last long. Subscribe to get notified about new arrivals and exclusive sales.
            </p>
            <Link 
              href="/newsletter"
              className="inline-block bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Subscribe to Updates
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
