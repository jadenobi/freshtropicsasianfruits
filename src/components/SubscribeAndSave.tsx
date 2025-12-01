'use client'

import { useState } from 'react'

interface SubscriptionOption {
  id: string
  name: string
  frequency: string
  discount: number
  description: string
}

const SUBSCRIPTION_OPTIONS: SubscriptionOption[] = [
  {
    id: 'weekly',
    name: 'Weekly Delivery',
    frequency: 'Every Week',
    discount: 10,
    description: 'Fresh fruit box delivered every week'
  },
  {
    id: 'biweekly',
    name: 'Bi-Weekly Delivery',
    frequency: 'Every 2 Weeks',
    discount: 15,
    description: 'Fresh fruit delivered every two weeks'
  },
  {
    id: 'monthly',
    name: 'Monthly Delivery',
    frequency: 'Every Month',
    discount: 20,
    description: 'Fresh fruit box delivered monthly'
  }
]

interface SubscribeAndSaveProps {
  productId?: string
  productName?: string
  productPrice?: number
}

export default function SubscribeAndSave({ productId, productName, productPrice }: SubscribeAndSaveProps) {
  const [selectedOption, setSelectedOption] = useState<string>('monthly')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const option = SUBSCRIPTION_OPTIONS.find(o => o.id === selectedOption)
  const discountedPrice = productPrice ? productPrice * (1 - option!.discount / 100) : 0
  const savings = productPrice ? productPrice - discountedPrice : 0

  const handleSubscribe = () => {
    // Save subscription to localStorage
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]')
    subscriptions.push({
      productId,
      productName,
      originalPrice: productPrice,
      frequency: selectedOption,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    setIsSubscribed(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
    }, 3000)
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-8">
      <div className="flex items-start gap-3 mb-6">
        <span className="text-4xl">💚</span>
        <div>
          <h3 className="text-2xl font-black text-emerald-900">Subscribe & Save</h3>
          <p className="text-emerald-700 text-sm">Save up to 20% with recurring deliveries</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {SUBSCRIPTION_OPTIONS.map(option => (
          <label
            key={option.id}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedOption === option.id
                ? 'border-emerald-600 bg-emerald-100'
                : 'border-emerald-200 bg-white hover:border-emerald-400'
            }`}
          >
            <input
              type="radio"
              name="subscription"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-5 h-5 text-emerald-600 cursor-pointer"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-emerald-900">{option.name}</p>
                  <p className="text-sm text-emerald-700">{option.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{option.frequency}</p>
                  <p className="text-lg font-black text-red-600">Save {option.discount}%</p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {productPrice && option && (
        <div className="bg-white rounded-lg p-4 mb-6 border border-emerald-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Original price:</span>
            <span className="line-through text-gray-400">${productPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-emerald-600 font-bold">Your price ({option.frequency}):</span>
            <span className="text-2xl font-black text-emerald-600">${discountedPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-green-200">
            <span className="text-green-600 font-bold">💚 You save:</span>
            <span className="text-lg font-black text-green-600">${savings.toFixed(2)} per {option.frequency.toLowerCase()}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleSubscribe}
        className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
          isSubscribed
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isSubscribed ? '✓ Subscribed!' : `Subscribe Now & Save ${option?.discount}%`}
      </button>

      <p className="text-xs text-emerald-700 text-center mt-4">
        ✓ Cancel anytime. No commitment required.
      </p>
    </div>
  )
}
