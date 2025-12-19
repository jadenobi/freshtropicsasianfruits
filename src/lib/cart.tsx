"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import type { CartItem, Fruit } from '@/types'

type CartContextValue = {
  items: CartItem[]
  total: number
  addToCart: (product: Fruit, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const LOCAL_KEY = 'golden-orchard-cart'

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

  const addToCart = (product: Fruit, quantity = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) return prev.map(i => i.id === product.id ? { ...i, cartQuantity: (i.cartQuantity || 0) + quantity } : i)
      const newItem: CartItem = { ...product, cartQuantity: quantity }
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
