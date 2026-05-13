"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import type { CartItem, Fruit } from '@/types'

type CartContextValue = {
  items: CartItem[]
  total: number
  addToCart: (product: Fruit, quantity?: number, selectedSizeId?: string) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const LOCAL_KEY = 'fresh-tropics-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items))
    } catch (_) {}
  }, [items])

  const addToCart = (product: Fruit, quantity = 1, selectedSizeId?: string) => {
    setItems(prev => {
      // Create a unique key that combines product ID and selected size
      const cartKey = selectedSizeId ? `${product.id}--${selectedSizeId}` : product.id
      
      // Get the price based on selected size
      let itemPrice = product.price
      let selectedSize = undefined
      
      if (selectedSizeId && product.sizes) {
        selectedSize = product.sizes.find(s => s.id === selectedSizeId)
        if (selectedSize) {
          itemPrice = selectedSize.price
        }
      }
      
      const found = prev.find(i => (i.selectedSizeId ? `${i.id}--${i.selectedSizeId}` : i.id) === cartKey)
      
      if (found) {
        return prev.map(i => 
          (i.selectedSizeId ? `${i.id}--${i.selectedSizeId}` : i.id) === cartKey 
            ? { ...i, cartQuantity: (i.cartQuantity || 0) + quantity } 
            : i
        )
      }
      
      const newItem: CartItem = { 
        ...product, 
        cartQuantity: quantity,
        selectedSizeId: selectedSizeId,
        price: itemPrice // Override price with selected size's price
      }
      return [...prev, newItem]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, cartQuantity: Math.max(0, quantity) } : i).filter(i => i.cartQuantity > 0))
  }

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.id !== id))
  const clearCart = () => setItems([])

  const total = items.reduce((s, it) => s + (it.price * (it.cartQuantity || 0)), 0)

  return (
    <CartContext.Provider value={{ items, total, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
