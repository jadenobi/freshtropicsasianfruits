'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface PromoBannerProps {
  variant?: 'top' | 'banner'
}

export default function PromoBanner({ variant = 'top' }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isChristmasSeason, setIsChristmasSeason] = useState(true)
  const [timeUntilExpiry, setTimeUntilExpiry] = useState('')

  // Check if we're still in the Christmas season (until Jan 1st, 2025 11:59 PM)
  useEffect(() => {
    const checkSeason = () => {
      const now = new Date()
      const year = now.getFullYear()
      const newYearExpiry = new Date(year + 1, 0, 1, 23, 59, 59, 999) // Jan 1st of next year
      
      if (now > newYearExpiry) {
        setIsChristmasSeason(false)
        return
      }

      // Calculate countdown
      const diff = newYearExpiry.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      
      if (days > 0) {
        setTimeUntilExpiry(`${days}d ${hours}h`)
      } else if (hours > 0) {
        setTimeUntilExpiry(`${hours}h ${minutes}m`)
      } else {
        setTimeUntilExpiry(`${minutes}m`)
      }
      
      setIsChristmasSeason(true)
    }

    checkSeason()
    const interval = setInterval(checkSeason, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (!isVisible || !isChristmasSeason) return null

  if (variant === 'top') {
    return (
      <div className="bg-gradient-to-r from-emerald-700 via-red-600 to-emerald-700 text-white py-3 px-4 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-2xl animate-pulse">
        <div className="flex-1 text-center">
          <p className="font-bold text-sm md:text-base">
            🎄 FESTIVE SEASON: Get 30% off on Premium Gift Boxes! Use code: <span className="bg-white text-red-600 px-2 py-1 rounded font-black animate-bounce">XMAS30</span> ✨
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 transition-colors flex-shrink-0 text-xl"
        >
          ✕
        </button>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-b from-emerald-800 via-red-700 to-emerald-800 rounded-2xl shadow-2xl overflow-hidden relative border-4 border-yellow-300">
        {/* Premium animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>❄️</div>
          <div className="absolute bottom-4 right-4 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>❄️</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-spin" style={{ animationDuration: '3s' }}>🎄</div>
          <div className="absolute top-1/2 left-1/4 text-5xl animate-bounce" style={{ animationDelay: '1s' }}>🎁</div>
        </div>

        {/* Premium sparkle effects */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300"></div>
        
        <div className="relative z-10 p-8 md:p-12 text-center">
          <div className="mb-4 flex justify-center gap-2">
            <span className="text-3xl animate-bounce">🎄</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎅</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.6s' }}>⭐</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.8s' }}>❄️</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">
            🎄 PREMIUM CHRISTMAS 🎄
          </h2>
          <p className="text-2xl md:text-3xl font-black text-yellow-300 mb-4 drop-shadow-lg">
            LUXURY GIFT BOXES
          </p>
          
          <p className="text-lg md:text-xl text-white font-bold mb-8 max-w-2xl mx-auto">
            ✨ Celebrate with our Exclusive Premium Holiday Collections ✨
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-200 rounded-xl p-4 shadow-lg transform hover:scale-105 transition">
              <p className="text-xs font-bold text-emerald-900 mb-1">PROMO CODE</p>
              <p className="text-2xl md:text-3xl font-black text-red-600 drop-shadow">XMAS30</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-4 shadow-lg transform hover:scale-105 transition">
              <p className="text-xs font-bold text-emerald-900 mb-1">DISCOUNT</p>
              <p className="text-2xl md:text-3xl font-black text-emerald-600 drop-shadow">30% OFF</p>
            </div>
            <div className="bg-gradient-to-br from-red-300 to-red-200 rounded-xl p-4 shadow-lg transform hover:scale-105 transition">
              <p className="text-xs font-bold text-white mb-1">EXPIRES IN</p>
              <p className="text-xl md:text-2xl font-black text-white drop-shadow">{timeUntilExpiry}</p>
            </div>
          </div>
          
          <p className="text-sm md:text-base text-yellow-200 font-bold mb-6 italic">
            🌟 Premium Gift Boxes Only • Limited to Top Tier Products • Free Shipping Available
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop?category=exotic"
              className="bg-gradient-to-r from-yellow-300 to-yellow-200 text-emerald-900 font-black px-8 py-4 rounded-xl hover:shadow-2xl transition-all text-lg transform hover:scale-105 shadow-lg"
            >
              ✨ SHOP PREMIUM GIFTS ✨
            </Link>
            <Link
              href="/gift-finder"
              className="bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-700 hover:to-emerald-700 text-white font-black px-8 py-4 rounded-xl transition-all text-lg border-3 border-yellow-300 transform hover:scale-105 shadow-lg"
            >
              🎁 FIND THE PERFECT GIFT 🎁
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
