'use client'

import { useState, useEffect } from 'react'

interface FlashSale {
  id: string
  name: string
  discount: number
  endsAt: Date
  products?: string[]
  emoji?: string
}

const ACTIVE_FLASH_SALES: FlashSale[] = [
  {
    id: 'tropical-tuesday',
    name: '🌴 Tropical Tuesday Flash Sale',
    discount: 25,
    endsAt: new Date('2025-12-16 23:59:59'),
    products: ['tropical']
  },
  {
    id: 'berry-bonanza',
    name: '🫐 Berry Bonanza - 20% Off',
    discount: 20,
    endsAt: new Date('2025-12-15 23:59:59'),
    products: ['berries']
  }
]

export default function FlashSaleBanner() {
  const [currentSale, setCurrentSale] = useState<FlashSale | null>(null)
  const [timeLeft, setTimeLeft] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Get the sale that ends soonest
    const now = new Date()
    const activeSales = ACTIVE_FLASH_SALES.filter(sale => sale.endsAt > now)
    
    if (activeSales.length > 0) {
      const soonest = activeSales.reduce((prev, current) =>
        current.endsAt < prev.endsAt ? current : prev
      )
      setCurrentSale(soonest)
    } else {
      setIsActive(false)
    }
  }, [])

  useEffect(() => {
    if (!currentSale) return

    const interval = setInterval(() => {
      const now = new Date()
      const diff = currentSale.endsAt.getTime() - now.getTime()

      if (diff <= 0) {
        setIsActive(false)
        clearInterval(interval)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m remaining`)
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s remaining`)
      } else {
        setTimeLeft(`${seconds}s remaining`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [currentSale])

  if (!isActive || !currentSale) return null

  return (
    <div className="relative bg-gradient-to-r from-red-600 via-pink-500 to-red-600 shadow-lg py-3 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full animate-pulse animation-delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left flex-1">
            <p className="text-white font-black text-lg sm:text-xl animate-pulse">
              ⚡ {currentSale.name} ⚡
            </p>
            <p className="text-red-100 text-sm font-semibold">
              Save {currentSale.discount}% on selected items
            </p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-white font-black text-2xl sm:text-3xl">
              {currentSale.discount}% OFF
            </p>
            <p className="text-red-100 text-xs sm:text-sm font-bold animate-bounce">
              {timeLeft}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
