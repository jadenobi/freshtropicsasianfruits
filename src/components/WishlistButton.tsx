'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface WishlistButtonProps {
  productId: string
  productName?: string
  variant?: 'button' | 'icon'
}

export default function WishlistButton({ productId, productName, variant = 'button' }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      setIsInWishlist(wishlist.includes(productId))
    }
    checkWishlist()
  }, [productId])

  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    if (isInWishlist) {
      const updated = wishlist.filter((id: string) => id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(updated))
    } else {
      wishlist.push(productId)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
    
    setIsInWishlist(!isInWishlist)
  }

  if (!mounted) return null

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggleWishlist}
        className={`text-2xl transition-transform hover:scale-110 ${isInWishlist ? 'animate-pulse' : ''}`}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isInWishlist ? <Heart className="w-6 h-6 fill-red-500 text-red-500" /> : <Heart className="w-6 h-6 text-gray-400" />}
      </button>
    )
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
        isInWishlist
          ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isInWishlist ? <Heart className="w-5 h-5 fill-red-500 text-red-500" /> : <Heart className="w-5 h-5" />} {isInWishlist ? 'Saved' : 'Save'}
    </button>
  )
}
