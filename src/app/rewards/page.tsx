'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import { LOYALTY_TIERS, getPointsBreakdown, getMockTransactionHistory } from '@/lib/loyaltyService'
import { LoyaltyAccount } from '@/types'

export default function RewardsPage() {
  const [loyaltyAccount] = useState<LoyaltyAccount>({
    userId: 'user@example.com',
    totalPoints: 789,
    currentTier: 'Silver',
    pointsThisMonth: 124,
    redeemablePoints: 650,
    totalSpent: 1240,
    referralCode: 'REFG2K8X9P',
    referralRewards: 100,
    joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date().toISOString(),
    milestones: {
      firstPurchase: true,
      fivePurchases: true,
      tenPurchases: false,
      birthday: false
    }
  })

  const [activeTab, setActiveTab] = useState<'overview' | 'redeem' | 'history' | 'referral'>('overview')
  const [copiedCode, setCopiedCode] = useState(false)

  const breakdown = useMemo(() => getPointsBreakdown(loyaltyAccount), [loyaltyAccount])
  const transactions = useMemo(() => getMockTransactionHistory(loyaltyAccount.userId), [loyaltyAccount.userId])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const redemptionOptions = [
    { points: 100, value: 1, label: '$1 Off' },
    { points: 500, value: 5, label: '$5 Off', popular: true },
    { points: 1000, value: 10, label: '$10 Off' },
    { points: 2500, value: 25, label: '$25 Off' },
    { points: 5000, value: 50, label: '$50 Off' }
  ]

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-amber-900 mb-4">🎁 Loyalty & Rewards</h1>
            <p className="text-lg text-gray-600">Earn points on every purchase and unlock exclusive benefits</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Status</h2>
                
                <div className="text-center p-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg mb-6">
                  <div className="text-6xl mb-3">{breakdown.currentTierIcon}</div>
                  <h3 className="text-3xl font-black text-amber-900 mb-2">{breakdown.currentTierName}</h3>
                  <p className="text-amber-700 font-bold mb-4">{LOYALTY_TIERS[breakdown.currentTierName].discount * 100}% Discount</p>
                  
                  {breakdown.nextTierName && (
                    <div className="text-sm text-amber-700">
                      <p className="font-bold">{breakdown.pointsToNextTier} points until {breakdown.nextTierName}</p>
                      <div className="w-full bg-white rounded-full h-2 mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all"
                          style={{ width: `${breakdown.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-black text-blue-600">{breakdown.totalPoints}</div>
                    <div className="text-xs font-bold text-gray-600">Total Points</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-black text-green-600">${breakdown.redemptionValue}</div>
                    <div className="text-xs font-bold text-gray-600">Redeemable</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-black text-purple-600">{breakdown.pointsThisMonth}</div>
                    <div className="text-xs font-bold text-gray-600">This Month</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-black text-orange-600">{breakdown.discount}%</div>
                    <div className="text-xs font-bold text-gray-600">Tier Discount</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Benefits</h2>
                
                <div className="space-y-3">
                  {LOYALTY_TIERS[breakdown.currentTierName].benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-lg flex-shrink-0">✓</span>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {breakdown.nextTierName && (
                  <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                    <h3 className="font-bold text-amber-900 mb-2">Next: {breakdown.nextTierName} {LOYALTY_TIERS[breakdown.nextTierName].icon}</h3>
                    <p className="text-sm text-amber-800 mb-3">Earn {breakdown.pointsToNextTier} more points</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {(['overview', 'redeem', 'history', 'referral'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-amber-300'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'redeem' && '💰 Redeem'}
                {tab === 'history' && '📜 History'}
                {tab === 'referral' && '👥 Refer'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { icon: '🛒', title: '1. Shop', desc: 'Make purchases' },
                    { icon: '📈', title: '2. Earn', desc: 'Accumulate points' },
                    { icon: '⬆️', title: '3. Unlock', desc: 'Reach new tiers' },
                    { icon: '🎉', title: '4. Enjoy', desc: 'Redeem rewards' }
                  ].map((step, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-4xl mb-3">{step.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Tier Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4">Tier</th>
                        <th className="text-left py-3 px-4">Points</th>
                        <th className="text-left py-3 px-4">Discount</th>
                        <th className="text-left py-3 px-4">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(LOYALTY_TIERS).map(tier => (
                        <tr key={tier.name} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4 font-bold">{tier.icon} {tier.name}</td>
                          <td className="py-3 px-4">{tier.pointsRequired}</td>
                          <td className="py-3 px-4">{tier.discount * 100}%</td>
                          <td className="py-3 px-4">{['1', '1.5', '2', '3'][['Bronze', 'Silver', 'Gold', 'Platinum'].indexOf(tier.name)]}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'redeem' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Redeem Points</h2>
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mb-8">
                  <h3 className="font-bold text-green-900 mb-2">Available</h3>
                  <div className="text-3xl font-black text-green-600">{breakdown.redeemablePoints} Points = ${breakdown.redemptionValue}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {redemptionOptions.map(opt => (
                    <div
                      key={opt.points}
                      className={`relative p-4 rounded-lg border-2 text-center ${
                        opt.popular ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-400' : 'border-gray-300 bg-white'
                      } ${breakdown.redeemablePoints < opt.points ? 'opacity-50' : ''}`}
                    >
                      {opt.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">POPULAR</div>
                      )}
                      <div className="font-black text-2xl text-gray-900 mb-1">${opt.value}</div>
                      <div className="text-sm text-gray-600 mb-3">{opt.points} pts</div>
                      <button
                        disabled={breakdown.redeemablePoints < opt.points}
                        className={`w-full px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                          breakdown.redeemablePoints >= opt.points
                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {breakdown.redeemablePoints >= opt.points ? 'Redeem' : 'Not Enough'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
                <div className="space-y-4">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-2xl">
                          {{purchase: '🛒', referral: '👥', birthday: '🎂', bonus: '⭐', redemption: '💰'}[tx.type]}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{tx.description}</h3>
                          <p className="text-sm text-gray-600">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className={`font-bold text-lg ${tx.type === 'redemption' ? 'text-red-600' : 'text-green-600'}`}>
                        {tx.type === 'redemption' ? '-' : '+'}{tx.points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'referral' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Refer & Earn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">Your Code</h3>
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-300 mb-4">
                      <div className="text-2xl font-black text-blue-600 text-center font-mono">{loyaltyAccount.referralCode}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(loyaltyAccount.referralCode)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 mb-2"
                    >
                      {copiedCode ? '✓ Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                    <h3 className="text-lg font-bold text-green-900 mb-4">How It Works</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>1️⃣ Share your code with friends</p>
                      <p>2️⃣ They enter code at signup</p>
                      <p>3️⃣ You get 50 pts, they get 100 pts</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
            <div className="space-y-4">
              {[
                { q: 'Do points expire?', a: 'No! Points never expire with account activity.' },
                { q: 'Can I stack redemptions?', a: 'Yes! Stack up to 5 on one order.' },
                { q: 'When do I get my discount?', a: 'Automatically at checkout after redemption.' },
                { q: 'What if I cancel?', a: 'Points are credited back immediately.' }
              ].map((faq, idx) => (
                <details key={idx} className="group border border-gray-300 rounded-lg p-4 hover:border-amber-400 cursor-pointer">
                  <summary className="font-bold text-gray-900 group-open:text-amber-700">{faq.q}</summary>
                  <p className="text-gray-700 mt-3">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
