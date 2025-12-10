'use client'

import { useState, useEffect } from 'react'
import { Fruit } from '@/types'

const WISHLIST_STORAGE_KEY = 'userWishlist'

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (saved) setWishlist(JSON.parse(saved))
    } catch (error) {
      console.warn('Failed to load wishlist:', error)
    }
  }, [])

  const addToWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) return prev
      const updated = [...prev, productId]
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = prev.filter(id => id !== productId)
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  const isInWishlist = (productId: string) => wishlist.includes(productId)
  const wishlistCount = wishlist.length

  return { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, wishlistCount }
}

// Wishlist notifications
export const useWishlistNotifications = () => {
  const sendWishlistAlert = (productName: string, type: 'added' | 'removed') => {
    const message = type === 'added' 
      ? `✨ Added "${productName}" to your wishlist!`
      : `❌ Removed "${productName}" from your wishlist`
    
    // Could integrate with toast notifications here
    console.log(message)
  }

  return { sendWishlistAlert }
}
