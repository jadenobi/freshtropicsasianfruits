'use client'

import PageLayout from '@/components/PageLayout'
import Image from 'next/image'
import Link from 'next/link'
import { ProductService } from '@/lib/productService'
import { useCart } from '@/context/CartContext'
import ProductRatingForm from '@/components/ProductRatingForm'
import CustomerReviews from '@/components/CustomerReviews'
import RelatedProducts from '@/components/RelatedProducts'
import NutritionalDisplay from '@/components/NutritionalDisplay'
import WishlistButton from '@/components/WishlistButton'
import InventoryAlert from '@/components/InventoryAlert'
import SubscribeAndSave from '@/components/SubscribeAndSave'
import { useState, use, useEffect } from 'react'

export default function ProductPage({params}:{params:Promise<{id:string}>}){
  const {id} = use(params)
  const product = ProductService.getProductById(id)
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const selectedSizeObj = product?.sizes?.find(s => s.id === selectedSizeId)
  const isOneLb = selectedSizeObj?.name?.toLowerCase().includes('1 lb') || selectedSizeObj?.name?.toLowerCase().includes('1 pound')

  useEffect(() => {
    if (isOneLb && quantity < 2) {
      setQuantity(2)
    }
  }, [isOneLb, quantity])

  // Set default size on product load
  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSizeId(product.sizes[1].id) // Default to Regular size
    }
  }, [product?.id])

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

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
            {/* Main Image - Clickable for Lightbox */}
            <div className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setIsLightboxOpen(true)}>
              <div className="w-full h-96 relative group">
                <Image 
                  src={currentImage} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:opacity-90 transition-opacity" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Click to expand</span>
                </div>
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
              {product.sizes && product.sizes.length > 0 && selectedSizeId ? (() => {
                const selectedSize = product.sizes.find(s => s.id === selectedSizeId)
                return (
                  <>
                    <span className="text-4xl font-bold text-emerald-600">${selectedSize?.price.toFixed(2)}</span>
                    {selectedSize?.originalPrice && selectedSize.originalPrice > selectedSize.price && (
                      <span className="ml-3 text-xl text-gray-400 line-through">${selectedSize.originalPrice.toFixed(2)}</span>
                    )}
                  </>
                )
              })() : (
                <>
                  <span className="text-4xl font-bold text-emerald-600">${product?.price.toFixed(2)}</span>
                  {product?.originalPrice && product.originalPrice > product.price && (
                    <span className="ml-3 text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </>
              )}
            </div>

            {/* Size Selection */}
            {product?.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Size:</label>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSizeId(size.id)}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                        selectedSizeId === size.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="font-bold text-lg">{size.name}</div>
                      <div className="text-sm text-gray-600">{size.weight}</div>
                      <div className="text-emerald-600 font-semibold">${size.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ In Stock' : 'Out of Stock'}
              </p>
            </div>

            {/* Inventory Alert for Out of Stock */}
            {!product.inStock && (
              <div className="mb-8">
                <InventoryAlert productId={id} productName={product.name} />
              </div>
            )}

            {/* Description */}
            <div className="mb-8 text-gray-700 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex space-x-4 items-center">
              <label className="text-sm font-semibold text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(isOneLb ? 2 : 1, quantity - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold"
                >-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1
                    setQuantity(Math.max(isOneLb ? 2 : 1, val))
                  }}
                  className="w-12 text-center py-1 outline-none"
                  min={isOneLb ? 2 : 1}
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold"
                >+</button>
              </div>
              {isOneLb && <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded">Min 2 required for 1 lb size</span>}
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    if (product?.sizes && selectedSizeId) {
                      addToCart(product, quantity, selectedSizeId)
                    } else {
                      addToCart(product, quantity)
                    }
                  }}
                  disabled={!product?.inStock}
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add to Cart
                </button>
                <button className="flex-1 px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                  Buy Now
                </button>
              </div>
              <div className="flex gap-3">
                <WishlistButton productId={id} productName={product?.name || ''} />
                <Link 
                  href="/wishlist"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  View Wishlist
                </Link>
              </div>
            </div>

            {/* Subscribe & Save */}
            <SubscribeAndSave productId={id} productName={product.name} productPrice={product.price} />
          </div>
        </div>
      </div>

      {/* Rating and Reviews Section */}
      <div className="bg-white mt-12 pt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Customer Reviews Display */}
          <CustomerReviews productId={id} />

          {/* Rating Form */}
          <ProductRatingForm 
            productId={id} 
            productName={product.name}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-60"
          >
            ✕
          </button>

          {/* Main Lightbox Image */}
          <div className="w-full max-w-5xl h-[70vh] relative mb-4 flex items-center justify-center">
            <Image
              src={galleryImages[selectedImageIndex]}
              alt={`${product.name} - view ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Lightbox Controls */}
          <div className="w-full max-w-5xl flex flex-col gap-4">
            {/* Navigation Buttons */}
            {galleryImages.length > 1 && (
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  className="text-white text-2xl hover:text-emerald-400 transition-colors p-2"
                >
                  ← Previous
                </button>
                <span className="text-white text-sm">
                  {selectedImageIndex + 1} / {galleryImages.length}
                </span>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length)}
                  className="text-white text-2xl hover:text-emerald-400 transition-colors p-2"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Thumbnail Grid in Lightbox */}
            <div className="flex gap-2 justify-center overflow-x-auto">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded border-2 overflow-hidden transition-all ${
                    selectedImageIndex === idx
                      ? 'border-emerald-400 shadow-lg shadow-emerald-400'
                      : 'border-gray-500 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Close hint */}
          <div className="text-gray-400 text-sm mt-4">Press ESC or click X to close</div>
        </div>
      )}

      {/* Nutritional Information Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NutritionalDisplay productName={product.name} nutrition={product.nutrition} />
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CustomerReviews productId={id} />
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RelatedProducts currentProductId={id} category={product.category} />
      </div>
    </PageLayout>
  )
}
