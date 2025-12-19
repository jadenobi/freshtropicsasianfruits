'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import { FRUITS } from '@/lib/data'

interface GiftRecommendation {
  reason: string
  product: typeof FRUITS[0]
  score: number
}

const GIFT_OCCASIONS = [
  { id: 'birthday', label: '🎂 Birthday', emoji: '🎈' },
  { id: 'anniversary', label: '💕 Anniversary', emoji: '💐' },
  { id: 'get-well', label: '🏥 Get Well', emoji: '🌺' },
  { id: 'thank-you', label: '🙏 Thank You', emoji: '🌹' },
  { id: 'corporate', label: '💼 Corporate', emoji: '📊' },
  { id: 'holiday', label: '🎄 Holiday', emoji: '❄️' }
]

export default function GiftRecommendationsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [budget, setBudget] = useState(50)
  const [occasion, setOccasion] = useState('birthday')
  const [preferences, setPreferences] = useState<string[]>([])
  const [recipientName, setRecipientName] = useState('')
  const [giftMessage, setGiftMessage] = useState('')
  const [recommendations, setRecommendations] = useState<GiftRecommendation[]>([])
  const [selectedProduct, setSelectedProduct] = useState<typeof FRUITS[0] | null>(null)

  const preferenceOptions = [
    { id: 'organic', label: '🌿 Organic & Natural' },
    { id: 'exotic', label: '🌴 Exotic & Rare' },
    { id: 'healthy', label: '💪 Health-Focused' },
    { id: 'sweet', label: '🍯 Sweet & Indulgent' },
    { id: 'variety', label: '🎨 Variety Pack' },
    { id: 'premium', label: '👑 Premium Quality' }
  ]

  const togglePreference = (pref: string) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    )
  }

  const generateRecommendations = () => {
    const filtered = FRUITS.filter(product => {
      const matchesBudget = product.price <= budget * 1.2 // Allow 20% over budget
      const matchesOccasion = true // All products work for all occasions

      if (preferences.length === 0) return matchesBudget && matchesOccasion

      return matchesBudget && matchesOccasion && preferences.some(pref => {
        const name = product.name.toLowerCase()
        if (pref === 'organic') return name.includes('organic')
        if (pref === 'exotic') return product.category === 'exotic'
        if (pref === 'healthy') return name.includes('berry') || name.includes('apple') || product.category === 'berries'
        if (pref === 'sweet') return name.includes('honey') || name.includes('mango') || product.category === 'tropical'
        if (pref === 'variety') return product.category === 'tropical' || product.category === 'exotic'
        if (pref === 'premium') return product.price > 30 || product.reviews > 100
        return true
      })
    })

    // Score and sort recommendations
    const scored = filtered.map(product => ({
      product,
      score: Math.random() * 100 + (product.rating * 10) + (budget - Math.abs(product.price - budget)) * 2,
      reason: getRecommendationReason(product, occasion)
    }))

    const topRecommendations = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)

    setRecommendations(topRecommendations)
    setCurrentStep(4)
  }

  const getRecommendationReason = (product: typeof FRUITS[0], occ: string): string => {
    const name = product.name.toLowerCase()
    
    if (occ === 'birthday') return `Perfect for celebrations! ${product.reviews > 100 ? 'Highly rated by customers.' : 'Delicious choice for a special day.'}`
    if (occ === 'anniversary') return `A romantic and thoughtful gift. ${name.includes('honey') ? 'Sweet just like your relationship!' : 'Show your love and appreciation.'}`
    if (occ === 'get-well') return `Nutritious and wholesome. ${name.includes('berry') ? 'Full of antioxidants for wellness.' : 'Perfect for recovery and health.'}`
    if (occ === 'thank-you') return `Express your gratitude with a premium fruit selection.`
    if (occ === 'corporate') return `Impress clients and colleagues with premium quality and presentation.`
    if (occ === 'holiday') return `A festive choice perfect for holiday celebrations and gatherings.`
    
    return 'Great choice for any occasion!'
  }

  const occasionObj = GIFT_OCCASIONS.find(o => o.id === occasion)

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-pink-900 mb-4">🎁 Smart Gift Finder</h1>
            <p className="text-lg text-gray-600">
              Discover the perfect fruit gift for any occasion and budget
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 px-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 mx-1 rounded-full transition-all ${
                  step <= currentStep ? 'bg-pink-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Budget */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 What's Your Budget?</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-lg font-bold text-gray-900">Budget Range</label>
                    <span className="text-2xl font-black text-pink-600">${budget}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="500"
                    step="10"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$15</span>
                    <span>$500</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 25, label: 'Budget' },
                    { value: 50, label: 'Standard' },
                    { value: 100, label: 'Premium' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setBudget(option.value)}
                      className={`p-4 rounded-lg border-2 font-bold transition-all ${
                        budget === option.value
                          ? 'border-pink-600 bg-pink-50 text-pink-900'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-pink-300'
                      }`}
                    >
                      ${option.value}<br/><span className="text-xs font-normal">{option.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-all"
                >
                  Next: Choose Occasion →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Occasion */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎉 What's the Occasion?</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {GIFT_OCCASIONS.map(occ => (
                  <button
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className={`p-6 rounded-lg border-2 font-bold text-center transition-all hover:shadow-lg ${
                      occasion === occ.id
                        ? 'border-pink-600 bg-pink-50 text-pink-900'
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  >
                    <div className="text-3xl mb-2">{occ.emoji}</div>
                    <div className="text-sm">{occ.label}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3 bg-gray-300 text-gray-900 rounded-lg font-bold hover:bg-gray-400 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-all"
                >
                  Next: Preferences →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Any Preferences?</h2>
              <p className="text-gray-600 mb-6">(Optional - Select as many as you like)</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {preferenceOptions.map(pref => (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`p-4 rounded-lg border-2 font-bold text-center transition-all ${
                      preferences.includes(pref.id)
                        ? 'border-pink-600 bg-pink-50 text-pink-900'
                        : 'border-gray-300 bg-white text-gray-900 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{pref.label.split(' ')[0]}</div>
                    <div className="text-xs">{pref.label.split(' ').slice(1).join(' ')}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-3 bg-gray-300 text-gray-900 rounded-lg font-bold hover:bg-gray-400 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={generateRecommendations}
                  className="flex-1 py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-all"
                >
                  ✨ Get Recommendations →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results & Selection */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              {!selectedProduct ? (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {occasionObj?.emoji} Perfect for {occasionObj?.label}
                    </h2>
                    <p className="text-gray-600">Budget: ${budget} | Showing {recommendations.length} recommendations</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.product.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                        onClick={() => setSelectedProduct(rec.product)}
                      >
                        <div className="aspect-video bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center overflow-hidden">
                          {rec.product.images?.[0] ? (
                            <img 
                              src={rec.product.images[0]} 
                              alt={rec.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-5xl">🍎</div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{rec.product.name}</h3>
                          
                          <div className="mb-3">
                            <div className="text-2xl font-black text-pink-600 mb-1">
                              ${rec.product.price.toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 text-sm">⭐ {rec.product.rating}</span>
                              <span className="text-gray-500 text-sm">({rec.product.reviews} reviews)</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedProduct(rec.product)}
                            className="w-full py-2 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-all text-sm"
                          >
                            View & Customize
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-3 bg-gray-300 text-gray-900 rounded-lg font-bold hover:bg-gray-400 transition-all"
                  >
                    ← Back to Preferences
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">🎀 Customize Your Gift</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {selectedProduct.images?.[0] ? (
                        <img 
                          src={selectedProduct.images[0]} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-8xl">🍎</div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                      <div className="text-3xl font-black text-pink-600 mb-4">${selectedProduct.price.toFixed(2)}</div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg mb-6">
                        <div className="flex gap-2 mb-2">
                          <span className="text-xl">⭐ {selectedProduct.rating}</span>
                          <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
                        </div>
                        <p className="text-gray-700">{selectedProduct.description}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">Recipient Name</label>
                          <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Who is this for?"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">Gift Message (Optional)</label>
                          <textarea
                            value={giftMessage}
                            onChange={(e) => setGiftMessage(e.target.value)}
                            placeholder="Add a personal message..."
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none"
                          />
                        </div>

                        <button
                          onClick={() => {
                            // Add to cart logic would go here
                            alert(`Added ${selectedProduct.name} to cart!\n\nFor: ${recipientName}\n${giftMessage ? `Message: ${giftMessage}` : ''}`);
                          }}
                          className="w-full py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-all text-lg"
                        >
                          🛒 Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-3 bg-gray-300 text-gray-900 rounded-lg font-bold hover:bg-gray-400 transition-all"
                    >
                      ← Back to Recommendations
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(3);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 bg-gray-300 text-gray-900 rounded-lg font-bold hover:bg-gray-400 transition-all"
                    >
                      New Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
