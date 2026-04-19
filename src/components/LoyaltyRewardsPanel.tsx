'use client'

import { useState, useEffect } from 'react'
import { Apple, PalmtreeIcon as Palmtree, Crown, Flower2 } from 'lucide-react'

interface LoyaltyReward {
  name: string
  pointsRequired: number
  description: string
  iconName: string
  discount?: number
}

const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    name: 'Fruit Lover',
    pointsRequired: 100,
    description: '5% off next order',
    iconName: 'Apple',
    discount: 5
  },
  {
    name: 'Tropical Enthusiast',
    pointsRequired: 250,
    description: '10% off + Free Shipping',
    iconName: 'Palmtree',
    discount: 10
  },
  {
    name: 'Premium Member',
    pointsRequired: 500,
    description: '15% off + VIP Support',
    iconName: 'Crown',
    discount: 15
  },
  {
    name: 'Exotic Explorer',
    pointsRequired: 1000,
    description: '20% off + Exclusive Access',
    iconName: 'Flower2',
    discount: 20
  }
]

export default function LoyaltyRewardsPanel() {
  const [points, setPoints] = useState(0)
  const [currentTier, setCurrentTier] = useState(0)
  const [nextReward, setNextReward] = useState<LoyaltyReward | null>(null)

  useEffect(() => {
    // Get stored points from localStorage
    const storedPoints = parseInt(localStorage.getItem('loyaltyPoints') || '0')
    setPoints(storedPoints)

    // Calculate current tier
    let tier = 0
    for (let i = 0; i < LOYALTY_REWARDS.length; i++) {
      if (storedPoints >= LOYALTY_REWARDS[i].pointsRequired) {
        tier = i
      } else {
        break
      }
    }
    setCurrentTier(tier)

    // Set next reward
    if (tier < LOYALTY_REWARDS.length - 1) {
      setNextReward(LOYALTY_REWARDS[tier + 1])
    } else {
      setNextReward(null)
    }
  }, [])

  const pointsToNextReward = nextReward 
    ? nextReward.pointsRequired - points 
    : 0

  const progressPercentage = nextReward
    ? ((points - LOYALTY_REWARDS[currentTier].pointsRequired) / 
       (nextReward.pointsRequired - LOYALTY_REWARDS[currentTier].pointsRequired)) * 100
    : 100

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-3 border-amber-200 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {(() => {
            const iconMap: { [key: string]: React.ReactNode } = {
              Apple: <Apple size={28} className="text-red-600" />,
              Palmtree: <Palmtree size={28} className="text-green-600" />,
              Crown: <Crown size={28} className="text-yellow-600" />,
              Flower2: <Flower2 size={28} className="text-pink-600" />
            }
            return iconMap[LOYALTY_REWARDS[currentTier].iconName]
          })()}
          <h3 className="text-xl font-black text-gray-900">Loyalty Rewards</h3>
        </div>
        <span className="text-3xl font-black text-amber-600">{points} pts</span>
      </div>

      <div className="mb-6">
        <p className="text-sm font-bold text-gray-700 mb-2">
          Current Tier: <span className="text-amber-600">{LOYALTY_REWARDS[currentTier].name}</span>
        </p>
        <p className="text-xs text-gray-600 mb-3">{LOYALTY_REWARDS[currentTier].description}</p>
        
        {nextReward && (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700">Next Tier</span>
              <span className="text-xs font-bold text-amber-600">{pointsToNextReward} points to go</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">Earn {pointsToNextReward} more points to unlock {nextReward.name}</p>
          </>
        )}
      </div>

      <div className="bg-white border-2 border-amber-100 rounded-lg p-4">
        <p className="text-xs font-bold text-gray-700 mb-3">How to Earn Points:</p>
        <ul className="text-xs text-gray-600 space-y-2">
          <li>✓ 1 point per dollar spent</li>
          <li>✓ 5 bonus points on first order</li>
          <li>✓ 10 bonus points on birthday month</li>
          <li>✓ Double points on sales & promotions</li>
        </ul>
      </div>
    </div>
  )
}
