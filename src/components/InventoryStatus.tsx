'use client'

import { useState, useEffect } from 'react'
import { getInventory, isInStock } from '@/lib/inventoryService'

interface InventoryStatusProps {
  productId: string
}

export default function InventoryStatus({ productId }: InventoryStatusProps) {
  const [inventory, setInventory] = useState<number>(0)
  const [inStockStatus, setInStockStatus] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inv = await getInventory(productId)
        const stock = await isInStock(productId)
        setInventory(inv)
        setInStockStatus(stock)
      } catch (error) {
        console.error('Error fetching inventory:', error)
        setInventory(50) // Default fallback
        setInStockStatus(true)
      } finally {
        setLoading(false)
      }
    }
    fetchInventory()
  }, [productId])

  if (loading) {
    return (
      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold text-center animate-pulse">
        Loading...
      </div>
    )
  }

  const isLowStock = inventory > 0 && inventory <= 10

  if (!inStockStatus) {
    return (
      <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-center">
        ❌ Out of Stock
      </div>
    )
  }

  if (isLowStock) {
    return (
      <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold text-center">
        ⚠️ Only {inventory} left in stock!
      </div>
    )
  }

  return (
    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold text-center">
      ✓ In Stock ({inventory} available)
    </div>
  )
}
