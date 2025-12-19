'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FRUITS } from '@/lib/data'

interface RelatedProductsProps {
  currentProductId: string
  category?: string
  limit?: number
}

export default function RelatedProducts({ currentProductId, category, limit = 4 }: RelatedProductsProps) {
  const currentProduct = FRUITS.find(f => f.id === currentProductId)
  
  // Get related products - same category or similar price range
  const related = FRUITS.filter(f => {
    if (f.id === currentProductId) return false
    if (category && f.category === category) return true
    
    const priceDiff = Math.abs(f.price - (currentProduct?.price || 0))
    return priceDiff < 50
  }).slice(0, limit)

  if (related.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Related Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map(product => (
          <Link 
            key={product.id} 
            href={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-emerald-500 transition-all duration-300">
              <div className="relative h-32 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-amber-600 font-bold">⭐ {product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                
                <p className="text-lg font-black text-emerald-600">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
