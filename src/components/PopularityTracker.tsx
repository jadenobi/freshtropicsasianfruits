'use client'

import { useEffect, useState } from 'react'

interface ProductView {
  productId: string
  productName: string
  timestamp: number
}

const STORAGE_KEY = 'productViews'
const MAX_VIEWS = 100

export const useProductPopularity = () => {
  const trackProductView = (productId: string, productName: string) => {
    try {
      const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as ProductView[]
      
      views.push({
        productId,
        productName,
        timestamp: Date.now(),
      })

      // Keep only recent views
      const recentViews = views.slice(-MAX_VIEWS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentViews))

      // Emit custom event for analytics
      const event = new CustomEvent('productViewed', {
        detail: { productId, productName, timestamp: Date.now() }
      })
      window.dispatchEvent(event)
    } catch (error) {
      console.warn('Failed to track product view:', error)
    }
  }

  const getPopularProducts = (limit = 10) => {
    try {
      const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as ProductView[]
      
      // Count views by product
      const counts: Record<string, { name: string; count: number }> = {}
      views.forEach(view => {
        if (!counts[view.productId]) {
          counts[view.productId] = { name: view.productName, count: 0 }
        }
        counts[view.productId].count++
      })

      // Sort by count and return
      return Object.entries(counts)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, limit)
        .map(([id, data]) => ({
          productId: id,
          productName: data.name,
          viewCount: data.count,
        }))
    } catch (error) {
      console.warn('Failed to get popular products:', error)
      return []
    }
  }

  return { trackProductView, getPopularProducts }
}

export default function PopularityTracker() {
  const [popular, setPopular] = useState<any[]>([])

  useEffect(() => {
    const { getPopularProducts } = useProductPopularity()
    setPopular(getPopularProducts(5))

    const handleProductViewed = () => {
      setPopular(getPopularProducts(5))
    }

    window.addEventListener('productViewed', handleProductViewed)
    return () => window.removeEventListener('productViewed', handleProductViewed)
  }, [])

  if (popular.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border-3 border-red-200 rounded-lg p-6">
      <h3 className="font-black text-lg text-gray-900 mb-4">🔥 Trending Now</h3>
      <ul className="space-y-2">
        {popular.map((product, idx) => (
          <li key={product.productId} className="flex items-center gap-3 p-2 rounded">
            <span className="font-black text-2xl text-red-600">#{idx + 1}</span>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{product.productName}</p>
              <p className="text-xs text-gray-600">{product.viewCount} views</p>
            </div>
            <span className="text-lg">👀</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
