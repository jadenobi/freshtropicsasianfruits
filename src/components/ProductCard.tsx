"use client"

import { Fruit } from '@/types'
import { useCart } from '@/lib/cart'
import { useState } from 'react'

export default function ProductCard({product}:{product:Fruit}){
  const { addToCart } = useCart()
  const [isClicked, setIsClicked] = useState(false)

  const handleAddClick = () => {
    addToCart(product, 1)
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
  }

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
      {/* Image Container with Overlay */}
      <div className="relative w-full h-56 overflow-hidden bg-emerald-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      </div>

      <div className="p-4 sm:p-5">
        {/* Product Name & Category */}
        <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-emerald-600 font-semibold mt-1 uppercase tracking-wider">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-xs sm:text-sm font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="font-black text-xl sm:text-2xl text-emerald-600">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through ml-2 font-medium">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddClick}
          className={`w-full mt-3 sm:mt-4 px-3 sm:px-4 py-2 sm:py-3 font-bold text-white text-sm sm:text-base rounded-lg transition-all duration-300 transform
            ${isClicked 
              ? 'bg-emerald-500 scale-95 shadow-inner' 
              : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg hover:shadow-xl hover:-translate-y-1'
            }
          `}
        >
          {isClicked ? '✓ Added!' : '+ Add to Cart'}
        </button>

        {/* Stock Status */}
        {product.inStock && (
          <p className="text-xs text-emerald-600 font-semibold mt-2 text-center">In Stock</p>
        )}
      </div>

      {/* Decorative Border on Hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </article>
  )
}
