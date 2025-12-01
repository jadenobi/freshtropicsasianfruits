'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PromoBannerProps {
  variant?: 'top' | 'banner'
}

export default function PromoBanner({ variant = 'top' }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  if (variant === 'top') {
    return (
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white py-3 px-4 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-lg">
        <div className="flex-1 text-center">
          <p className="font-bold text-sm md:text-base">
            🎉 LIMITED TIME: Get 20% off your first order! Use code: <span className="bg-white text-red-600 px-2 py-1 rounded font-black">FRESH20</span>
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 transition-colors flex-shrink-0"
        >
          ✕
        </button>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl p-8 md:p-12 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">🍌</div>
          <div className="absolute bottom-4 right-4 text-6xl">🥭</div>
          <div className="absolute top-1/2 right-1/4 text-5xl">🍍</div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">SUMMER SALE 🌞</h2>
          <p className="text-xl text-white font-bold mb-6">
            🔥 Up to 40% OFF on selected tropical fruits! 🔥
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <div className="bg-white bg-opacity-90 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-semibold">PROMO CODE</p>
              <p className="text-3xl font-black text-red-600">SUMMER40</p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-semibold">ENDS IN</p>
              <p className="text-3xl font-black text-red-600">7 DAYS</p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/shop?collection=sale"
              className="bg-white text-red-600 font-black px-8 py-4 rounded-xl hover:shadow-lg transition-all text-lg"
            >
              SHOP SALE →
            </Link>
            <Link
              href="/shop"
              className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-4 rounded-xl transition-all text-lg border-2 border-white"
            >
              BROWSE ALL
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
