"use client"

import { useCart } from '@/lib/cart'

export default function CartCount(){
  const { items } = useCart()
  const total = items.reduce((s, it) => s + (it.cartQuantity || 0), 0)
  if (total === 0) return null
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">{total}</span>
  )
}
