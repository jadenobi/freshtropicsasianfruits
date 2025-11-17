'use client'

import { useState, useEffect } from 'react'
import { addToWishlist, removeFromWishlist, getWishlist } from '@/lib/customerService'

interface WishlistButtonProps {
  productId: string
  productName: string
}

export default function WishlistButton({ productId, productName }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const checkWishlist = async () => {
      const savedEmail = localStorage.getItem('customerEmail')
      if (savedEmail) {
        setEmail(savedEmail)
        const wishlist = await getWishlist(savedEmail)
        setIsInWishlist((wishlist || []).includes(productId))
      }
    }
    checkWishlist()
  }, [productId])

  const handleToggleWishlist = async () => {
    if (!email) {
      localStorage.setItem('redirectAfterLogin', `/product/${productId}`)
      window.location.href = '/account'
      return
    }

    if (isInWishlist) {
      await removeFromWishlist(email, productId)
      setIsInWishlist(false)
    } else {
      await addToWishlist(email, productId)
      setIsInWishlist(true)
    }
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
        isInWishlist
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isInWishlist ? '❤️' : '🤍'} {isInWishlist ? 'Saved' : 'Save'}
    </button>
  )
}
