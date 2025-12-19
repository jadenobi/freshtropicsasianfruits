'use client'

interface FreeShippingBannerProps {
  currentTotal: number
  freeShippingThreshold?: number
}

export default function FreeShippingBanner({ 
  currentTotal, 
  freeShippingThreshold = 286 
}: FreeShippingBannerProps) {
  const remaining = Math.max(0, freeShippingThreshold - currentTotal)
  const percentage = Math.min(100, (currentTotal / freeShippingThreshold) * 100)
  const isFreeShipping = currentTotal >= freeShippingThreshold

  if (currentTotal === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 shadow-lg py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {isFreeShipping ? (
          <div className="text-center">
            <p className="text-white font-black text-lg animate-pulse">
              🎉 FREE SHIPPING! Your order qualifies for free shipping!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-white font-bold text-sm">
              <span>Free Shipping at ${freeShippingThreshold}</span>
              <span className="font-black text-lg">${remaining.toFixed(2)} to go</span>
            </div>
            <div className="w-full bg-emerald-700 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-300 transition-all duration-500 ease-out shadow-lg rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-emerald-100 text-xs font-semibold">
              Add ${remaining.toFixed(2)} more to unlock free shipping
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
