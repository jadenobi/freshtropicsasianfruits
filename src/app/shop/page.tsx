'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PageLayout from '@/components/PageLayout'
import ProductCard from '@/components/ProductCard'
import { FRUITS } from '@/lib/data'

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams?.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  // Get unique categories
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'pinkglow', label: '🌸 Pink Glow Pineapple', icon: '🍍' },
    { id: 'exotic', label: 'Exotic' },
    { id: 'tropical', label: 'Tropical' },
    { id: 'berries', label: 'Berries' },
    { id: 'citrus', label: 'Citrus' }
  ]

  // Filter products
  const filteredProducts = selectedCategory === 'all' 
    ? FRUITS 
    : selectedCategory === 'pinkglow'
    ? FRUITS.filter(p => p.name.toLowerCase().includes('pinkglow'))
    : FRUITS.filter(p => p.category === selectedCategory)

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-black">
          {selectedCategory === 'pinkglow' ? '🌸 Pink Pineapple Pinkglow Collection' : 'Shop Our Fruits'}
        </h1>
        
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600 mb-6">
            Showing <span className="font-bold text-emerald-600">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p=> (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    )
}

export default function ShopPage() {
  return (
    <PageLayout>
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </PageLayout>
  )
}
