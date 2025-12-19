'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import PageLayout from '@/components/PageLayout'
import { ComparisonProduct } from '@/types'
import {
  getComparisonProducts,
  getProductsForComparison,
  calculatePriceDifference,
  getNutritionComparison,
  generateComparisonPDF,
  getSimilarProducts,
  getTopRatedProducts,
  getBestValueProducts,
} from '@/lib/comparisonService'

export default function ComparisonPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['1', '2'])
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'benefits'>('overview')
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('price')

  const allProducts = useMemo(() => getComparisonProducts(), [])
  const comparisonProducts = useMemo(() => getProductsForComparison(selectedProducts), [selectedProducts])
  const nutritionData = useMemo(() => getNutritionComparison(selectedProducts), [selectedProducts])
  const topRated = useMemo(() => getTopRatedProducts(4), [])
  const bestValue = useMemo(() => getBestValueProducts(4), [])

  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
    } else if (selectedProducts.length < 5) {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const handleDownloadPDF = () => {
    const pdfUrl = generateComparisonPDF(selectedProducts)
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'product-comparison.pdf'
    link.click()
  }

  const sortedProducts = useMemo(() => {
    const sorted = [...allProducts]
    if (sortBy === 'price') sorted.sort((a, b) => a.price - b.price)
    else if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    else sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [sortBy])

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">🍎 Product Comparison</h1>
          <p className="text-gray-600">Compare up to 5 fruits side-by-side</p>
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Selected Products ({selectedProducts.length}/5)
            </h2>
            {selectedProducts.length > 0 && (
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold transition-all flex items-center gap-2"
              >
                📥 Download PDF
              </button>
            )}
          </div>

          {/* Comparison Table */}
          {selectedProducts.length > 0 ? (
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-gray-200">
                {(['overview', 'nutrition', 'benefits'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 font-bold border-b-2 transition-all ${
                      activeTab === tab
                        ? 'border-amber-600 text-amber-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'overview' && 'Overview'}
                    {tab === 'nutrition' && 'Nutrition'}
                    {tab === 'benefits' && 'Benefits'}
                  </button>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 bg-gray-50">
                        <th className="text-left py-4 px-4 font-bold text-gray-900">Attribute</th>
                        {comparisonProducts.map(product => (
                          <th key={product.id} className="text-center py-4 px-4">
                            <div className="mb-3">
                              <div className="relative w-24 h-24 mx-auto mb-2">
                                <Image
                                  src={product.image || '/placeholder.jpg'}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded-lg"
                                  priority
                                />
                              </div>
                            </div>
                            <div className="font-bold text-gray-900 mb-2 text-sm line-clamp-2">{product.name}</div>
                            <button
                              onClick={() => handleSelectProduct(product.id)}
                              className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-all font-bold"
                            >
                              Remove
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 px-4 font-bold text-gray-900">Price</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center py-4 px-4 font-bold text-amber-600">
                            ${product.price.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="py-4 px-4 font-bold text-gray-900">Rating</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center py-4 px-4">
                            <span className="text-amber-500">⭐</span> {product.rating} ({product.reviews})
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 px-4 font-bold text-gray-900">Stock Status</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center py-4 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="py-4 px-4 font-bold text-gray-900">Origin</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center py-4 px-4">
                            {product.origin}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 px-4 font-bold text-gray-900">Season</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center py-4 px-4">
                            {product.season}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="py-4 px-4 font-bold text-gray-900">Shelf Life</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center py-4 px-4">
                            {product.shelfLife}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-bold text-gray-900">Storage</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center py-4 px-4 text-sm">
                            {product.storage}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Nutrition Tab */}
              {activeTab === 'nutrition' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 bg-gray-50">
                        <th className="text-left py-4 px-4 font-bold text-gray-900">Nutrient (per 100g)</th>
                        {comparisonProducts.map(product => (
                          <th key={product.id} className="text-center py-4 px-4 font-bold text-gray-900">
                            {product.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['calories', 'protein', 'carbs', 'fiber', 'vitaminC', 'potassium'].map((nutrient, idx) => (
                        <tr key={nutrient} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                          <td className="py-4 px-4 font-bold text-gray-900">
                            {nutrient === 'calories' && 'Calories (kcal)'}
                            {nutrient === 'protein' && 'Protein (g)'}
                            {nutrient === 'carbs' && 'Carbs (g)'}
                            {nutrient === 'fiber' && 'Fiber (g)'}
                            {nutrient === 'vitaminC' && 'Vitamin C (mg)'}
                            {nutrient === 'potassium' && 'Potassium (mg)'}
                          </td>
                          {comparisonProducts.map(product => {
                            const value = (nutritionData[nutrient as keyof typeof nutritionData] as any[])?.find(
                              n => n.name === product.name
                            )?.value || 0
                            return (
                              <td key={product.id} className="text-center py-4 px-4 font-bold text-amber-600">
                                {typeof value === 'number' ? value.toFixed(1) : value}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Benefits Tab */}
              {activeTab === 'benefits' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {comparisonProducts.map(product => (
                    <div key={product.id} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm">{product.name}</h3>
                      <ul className="space-y-2">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                            <span className="text-amber-600 font-bold mt-0.5">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg">Select products from the list below to compare</p>
            </div>
          )}
        </div>

        {/* Browse Products */}
        <div className="space-y-6">
          {/* Filter/Sort Controls */}
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Browse Products</h2>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'price' | 'rating' | 'name')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 font-bold"
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map(product => (
              <div
                key={product.id}
                className={`rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${
                  selectedProducts.includes(product.id)
                    ? 'bg-amber-50 border-amber-600 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-amber-300'
                }`}
                onClick={() => handleSelectProduct(product.id)}
              >
                {/* Product Image */}
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority={selectedProducts.includes(product.id)}
                  />
                  {selectedProducts.includes(product.id) && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      ✓
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">{product.name}</h3>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-amber-600">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-bold">
                        <span className="text-amber-500">⭐</span> {product.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Reviews:</span>
                      <span className="font-bold text-gray-700">{product.reviews}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-600 line-clamp-3">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out'}
                    </span>
                    <button
                      className={`px-4 py-1 rounded-lg font-bold text-sm transition-all ${
                        selectedProducts.includes(product.id)
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-amber-600 text-white hover:bg-amber-700'
                      }`}
                      onClick={e => {
                        e.stopPropagation()
                        handleSelectProduct(product.id)
                      }}
                    >
                      {selectedProducts.includes(product.id) ? 'Remove' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Top Rated */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⭐ Top Rated</h2>
            <div className="space-y-3">
              {topRated.map(product => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.image || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                      <span className="text-amber-500 whitespace-nowrap">⭐ {product.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <button
                      onClick={() => handleSelectProduct(product.id)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                        selectedProducts.includes(product.id)
                          ? 'bg-red-600 text-white'
                          : 'bg-amber-600 text-white hover:bg-amber-700'
                      }`}
                    >
                      {selectedProducts.includes(product.id) ? 'Remove' : 'Add to Comparison'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Value */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 Best Value</h2>
            <div className="space-y-3">
              {bestValue.map(product => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.image || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                      <span className="text-green-600 font-bold whitespace-nowrap">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <button
                      onClick={() => handleSelectProduct(product.id)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                        selectedProducts.includes(product.id)
                          ? 'bg-red-600 text-white'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {selectedProducts.includes(product.id) ? 'Remove' : 'Add to Comparison'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
