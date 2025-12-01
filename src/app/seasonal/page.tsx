'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import {
  getAllSeasonalBundles,
  getCurrentSeasonalOffers,
  getCurrentSeasonalCalendar,
  getSeasonalStatistics,
  calculateBundleSavings,
  getFruitsInSeason,
  getStorageTips,
  getRecipeHighlights,
} from '@/lib/seasonalService'

export default function SeasonalPage() {
  const [activeTab, setActiveTab] = useState<'bundles' | 'calendar' | 'offers'>('bundles')
  const [selectedSeason, setSelectedSeason] = useState<'spring' | 'summer' | 'fall' | 'winter'>('spring')
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)

  const allBundles = useMemo(() => getAllSeasonalBundles(), [])
  const currentOffers = useMemo(() => getCurrentSeasonalOffers(), [])
  const seasonalCalendar = useMemo(() => getCurrentSeasonalCalendar(), [])
  const statistics = useMemo(() => getSeasonalStatistics(), [])
  const fruitsInSeason = useMemo(() => getFruitsInSeason(selectedSeason), [selectedSeason])

  const seasonBundles = useMemo(() => allBundles.filter(b => b.season === selectedSeason), [allBundles, selectedSeason])
  const selectedBundleData = useMemo(() => allBundles.find(b => b.id === selectedBundle), [allBundles, selectedBundle])

  const seasonInfo = {
    spring: { color: 'pink', emoji: '🌸', gradient: 'from-pink-50 to-rose-50', accent: 'pink' },
    summer: { color: 'yellow', emoji: '☀️', gradient: 'from-yellow-50 to-orange-50', accent: 'yellow' },
    fall: { color: 'orange', emoji: '🍂', gradient: 'from-orange-50 to-amber-50', accent: 'orange' },
    winter: { color: 'blue', emoji: '❄️', gradient: 'from-blue-50 to-cyan-50', accent: 'blue' },
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">🌍 Seasonal Collections</h1>
          <p className="text-gray-600">Discover fresh fruits at their peak season with special bundles and offers</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border-2 border-emerald-200">
            <p className="text-sm font-bold text-emerald-900 mb-2">Total Bundles</p>
            <p className="text-3xl font-black text-emerald-600">{statistics.totalBundles}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
            <p className="text-sm font-bold text-blue-900 mb-2">Active Offers</p>
            <p className="text-3xl font-black text-blue-600">{statistics.activeOffers}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
            <p className="text-sm font-bold text-purple-900 mb-2">Savings Available</p>
            <p className="text-3xl font-black text-purple-600">${statistics.totalSavingsAvailable}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg border-2 border-amber-200">
            <p className="text-sm font-bold text-amber-900 mb-2">Current Season</p>
            <p className="text-3xl font-black text-amber-600">{seasonInfo[statistics.activeSeason].emoji}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['bundles', 'calendar', 'offers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-emerald-300'
              }`}
            >
              {tab === 'bundles' && '📦 Seasonal Bundles'}
              {tab === 'calendar' && '📅 Fruit Calendar'}
              {tab === 'offers' && '🎉 Featured Offers'}
            </button>
          ))}
        </div>

        {/* Seasonal Bundles Tab */}
        {activeTab === 'bundles' && (
          <div className="space-y-8">
            {/* Season Selector */}
            <div className="flex flex-wrap gap-2 justify-center">
              {(['spring', 'summer', 'fall', 'winter'] as const).map(season => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    selectedSeason === season
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {seasonInfo[season].emoji} {season.charAt(0).toUpperCase() + season.slice(1)}
                </button>
              ))}
            </div>

            {/* Bundles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seasonBundles.map(bundle => {
                const savings = calculateBundleSavings(bundle)
                return (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundle(selectedBundle === bundle.id ? null : bundle.id)}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-emerald-400 cursor-pointer overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-4xl">{bundle.icon}</span>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                          Save {bundle.discountPercent}%
                        </span>
                      </div>
                      <h3 className="text-2xl font-black mb-1">{bundle.name}</h3>
                      <p className="text-sm opacity-90">{bundle.description}</p>
                    </div>

                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-4">{bundle.theme}</p>

                      {/* Bundle Price */}
                      <div className="mb-4">
                        <p className="text-gray-700 font-bold mb-2">
                          💰 Bundle Price: <span className="text-emerald-600 text-xl">${bundle.bundlePrice.toFixed(2)}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Originally ${bundle.originalPrice.toFixed(2)} • Save ${savings.amount.toFixed(2)}
                        </p>
                      </div>

                      {/* Products List */}
                      <div className="mb-4">
                        <p className="font-bold text-gray-900 mb-2">📦 Included ({bundle.quantity} items):</p>
                        <div className="grid grid-cols-2 gap-2">
                          {bundle.products.map(product => (
                            <div key={product.id} className="bg-gray-50 p-2 rounded text-sm">
                              <p className="font-bold text-gray-900">{product.name}</p>
                              <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Best For */}
                      <p className="text-sm font-bold text-emerald-700 mb-4">
                        ✨ Best for: {bundle.bestFor}
                      </p>

                      {/* Expanded Details */}
                      {selectedBundle === bundle.id && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-emerald-600 space-y-3">
                          <div>
                            <p className="font-bold text-gray-900">🏠 Storage Notes:</p>
                            <p className="text-sm text-gray-700">{bundle.storageNotes}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">🍳 Recipe Tips:</p>
                            <p className="text-sm text-gray-700">{bundle.recipeTips}</p>
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg font-bold hover:shadow-lg transition-all">
                        🛒 Add to Cart - ${bundle.bundlePrice.toFixed(2)}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Fruit Calendar Tab */}
        {activeTab === 'calendar' && seasonalCalendar && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Fruits In Season Now</h2>

            {/* Fruits In Season Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {fruitsInSeason.map(fruit => (
                <div key={fruit.id} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border-2 border-emerald-200">
                  <div className="text-center mb-3">
                    <img src={fruit.image} alt={fruit.name} className="w-20 h-20 mx-auto object-cover rounded-lg mb-2" />
                    <h3 className="font-bold text-gray-900">{fruit.name}</h3>
                    <p className="text-emerald-600 font-bold">${fruit.price.toFixed(2)}</p>
                  </div>

                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="font-bold">🏠 Storage:</p>
                    <p className="text-xs">{getStorageTips(fruit.name, statistics.activeSeason)}</p>

                    <p className="font-bold mt-2">🍳 Recipe Use:</p>
                    <p className="text-xs">{getRecipeHighlights(fruit.name, statistics.activeSeason)}</p>

                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span>⭐ {fruit.rating} ({fruit.reviews} reviews)</span>
                      <span className="font-bold text-emerald-600">In Stock</span>
                    </div>
                  </div>

                  <button className="w-full mt-3 px-3 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all text-sm">
                    Shop Now
                  </button>
                </div>
              ))}
            </div>

            {/* Storage & Recipe Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏠 General Storage Tips</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Keep most fruits at room temperature until ripe</li>
                  <li>• Refrigerate once they reach desired ripeness</li>
                  <li>• Avoid storing with ethylene-producing fruits (bananas, avocados)</li>
                  <li>• Use within recommended timeframe for best flavor</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🍳 Recipe Ideas</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Fresh smoothie bowls with seasonal fruits</li>
                  <li>• Grilled fruit skewers for BBQ season</li>
                  <li>• Seasonal salads with fresh harvest</li>
                  <li>• Preserved jams and compotes for year-round enjoyment</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Featured Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            {currentOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentOffers.map(offer => (
                  <div
                    key={offer.id}
                    className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-lg border-4 border-red-500 p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900">{offer.title}</h3>
                        <p className="text-gray-700 mt-2">{offer.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-black text-red-600">{offer.discountPercent}%</p>
                        <p className="text-sm font-bold text-gray-600">OFF</p>
                      </div>
                    </div>

                    {offer.code && (
                      <div className="bg-white p-3 rounded-lg mb-4 border-2 border-red-300">
                        <p className="text-xs font-bold text-gray-600 mb-1">PROMO CODE</p>
                        <p className="text-2xl font-black text-red-600 font-mono">{offer.code}</p>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-sm font-bold text-gray-900">📅 Valid Period:</p>
                      <p className="text-sm text-gray-700">
                        {new Date(offer.validFrom).toLocaleDateString()} - {new Date(offer.validUntil).toLocaleDateString()}
                      </p>
                    </div>

                    <button className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg transition-all">
                      🛒 Shop {offer.title.split('!')[0].trim()}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-700 text-lg">No active offers at the moment. Check back soon!</p>
              </div>
            )}

            {/* Email Signup */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-black mb-4">🎁 Never Miss a Seasonal Deal</h2>
              <p className="mb-6">Subscribe to get exclusive seasonal offers delivered to your inbox</p>
              <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <button className="px-6 py-2 bg-white text-emerald-600 rounded-lg font-bold hover:bg-gray-100 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
