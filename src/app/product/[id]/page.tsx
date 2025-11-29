'use client'

import PageLayout from '@/components/PageLayout'
import Image from 'next/image'
import { FRUITS } from '@/lib/data'
import { useCart } from '@/context/CartContext'
import { useState, use } from 'react'

export default function ProductPage({params}:{params:Promise<{id:string}>}){
  const {id} = use(params)
  const product = FRUITS.find(f=> f.id === id)
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if(!product) return (
    <PageLayout>
      <div className="grid place-items-center min-h-[60vh]">Product not found</div>
    </PageLayout>
  )

  // Use gallery images if available, otherwise fall back to single image
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image]
  const currentImage = galleryImages[selectedImageIndex]

  return (
    <PageLayout>
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-96 relative">
                <Image 
                  src={currentImage} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-all ${
                      selectedImageIndex === idx ? 'border-emerald-600' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`${product.name} view ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-2">Category: <span className="capitalize font-semibold">{product.category}</span></p>
            
            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews) {product.rating}/5</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-emerald-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-3 text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ In Stock' : 'Out of Stock'}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8 text-gray-700 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <button 
                onClick={()=> addToCart(product, 1)} 
                disabled={!product.inStock}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add to Cart
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
