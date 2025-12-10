'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useWishlist } from '@/lib/wishlist'
import { Fruit } from '@/types'

interface MobileProductCardProps {
  product: Fruit
}

export default function MobileProductCard({ product }: MobileProductCardProps) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-gray-100 flex flex-col h-full">
      {/* Image Container - Mobile optimized */}
      <Link href={`/product/${product.id}`} className="relative block w-full h-40 sm:h-48 bg-gray-100 overflow-hidden group">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="flex-1 flex flex-col p-3 sm:p-4">
        {/* Product Info */}
        <Link href={`/product/${product.id}`} className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 capitalize">
            {product.category}
          </p>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 mb-3">
          <span className="text-yellow-500">⭐</span>
          <span className="font-bold text-xs sm:text-sm text-gray-800">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-3 border-t pt-2">
          <p className="text-2xl sm:text-3xl font-black text-emerald-600">
            ${product.price}
          </p>
        </div>

        {/* Action Buttons - Touch optimized */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-emerald-600 text-white font-bold py-3 px-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-all text-sm sm:text-base active:scale-95 min-h-12 flex items-center justify-center"
          >
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`px-4 py-3 rounded-lg font-bold transition-all min-h-12 min-w-12 flex items-center justify-center text-lg ${
              inWishlist
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  )
}
