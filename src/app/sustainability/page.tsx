'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'

interface SustainabilityMetric {
  title: string
  value: string
  unit: string
  icon: string
  description: string
  trend?: number
}

export default function SustainabilityPage() {
  const [selectedImpact, setSelectedImpact] = useState('carbon')
  const [orderQuantity, setOrderQuantity] = useState(10)

  // Calculate eco-impact based on order quantity
  const calculateImpact = useMemo(() => {
    const carbonPerUnit = 0.5 // kg CO2e per fruit unit
    const waterPerUnit = 50 // liters per fruit unit
    const plasticSaved = orderQuantity * 0.2 // kg of plastic avoided through eco packaging
    const treesPlanted = Math.floor(orderQuantity * 0.05) // Trees equivalent

    return {
      carbon: (orderQuantity * carbonPerUnit).toFixed(2),
      water: (orderQuantity * waterPerUnit).toFixed(0),
      plastic: plasticSaved.toFixed(2),
      trees: treesPlanted
    }
  }, [orderQuantity])

  // Overall sustainability metrics
  const sustainabilityStats: SustainabilityMetric[] = [
    {
      title: 'Carbon Footprint Reduced',
      value: '15,432',
      unit: 'kg CO2e',
      icon: '🌍',
      description: 'Through eco-friendly packaging and local sourcing',
      trend: -12
    },
    {
      title: 'Water Conserved',
      value: '892,450',
      unit: 'gallons',
      icon: '💧',
      description: 'Sustainable farming practices',
      trend: -8
    },
    {
      title: 'Plastic Eliminated',
      value: '8,234',
      unit: 'kg',
      icon: '♻️',
      description: 'Using recyclable and biodegradable packaging',
      trend: -15
    },
    {
      title: 'Trees Planted',
      value: '2,156',
      unit: 'trees',
      icon: '🌱',
      description: 'Through our reforestation partnership',
      trend: 45
    }
  ]

  const shippingOptions = [
    { id: 'standard', label: '🚚 Standard (5-7 days)', carbon: 2.5, cost: 0, eco: 'Standard shipping' },
    { id: 'eco', label: '🌱 Eco-Friendly (5-7 days)', carbon: 0.8, cost: 2.99, eco: 'Carbon offset included' },
    { id: 'carbon-neutral', label: '🌍 Carbon Neutral (3-5 days)', carbon: 0, cost: 7.99, eco: '100% carbon neutral' }
  ]

  const packagingOptions = [
    {
      id: 'standard',
      label: 'Standard Packaging',
      materials: 'Recyclable cardboard & plastic cushioning',
      impact: 'Standard impact',
      image: '📦'
    },
    {
      id: 'eco',
      label: 'Eco-Friendly (Recommended)',
      materials: '100% recyclable, plastic-free cushioning',
      impact: '30% less waste',
      image: '🌿'
    },
    {
      id: 'premium',
      label: 'Premium Sustainable',
      materials: 'Biodegradable packaging + tree planting',
      impact: 'Carbon negative',
      image: '🌳'
    }
  ]

  const composabilityGuide = [
    { item: 'Cardboard Box', time: '2-3 months', tip: 'Compost or recycle' },
    { item: 'Paper Cushioning', time: '1-2 weeks', tip: 'Add to compost' },
    { item: 'Tape (Eco)', time: '1-2 months', tip: 'Remove before composting' },
    { item: 'Labels (Ink-based)', time: '2-3 weeks', tip: 'Compostable ink used' }
  ]

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-green-900 mb-4">🌱 Sustainability Dashboard</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how your Fresh Tropics purchases contribute to a healthier planet
            </p>
          </div>

          {/* Global Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sustainabilityStats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{stat.title}</h3>
                <div className="mb-2">
                  <span className="text-2xl font-black text-green-600">{stat.value}</span>
                  <span className="text-gray-600 ml-2 text-sm">{stat.unit}</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{stat.description}</p>
                {stat.trend && (
                  <div className={`text-xs font-bold ${stat.trend < 0 ? 'text-green-600' : 'text-blue-600'}`}>
                    {stat.trend < 0 ? '📉' : '📈'} {Math.abs(stat.trend)}% this quarter
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Your Impact Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">💚 Your Personal Impact</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Input */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Calculate Your Impact</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Estimated Monthly Order Quantity: <span className="text-2xl text-green-600 font-black">{orderQuantity}</span> units
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>1 unit</span>
                    <span>100 units</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[10, 25, 50].map(qty => (
                    <button
                      key={qty}
                      onClick={() => setOrderQuantity(qty)}
                      className={`w-full p-3 rounded-lg border-2 font-bold transition-all ${
                        orderQuantity === qty
                          ? 'border-green-600 bg-green-50 text-green-900'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-green-300'
                      }`}
                    >
                      {qty} units/month
                    </button>
                  ))}
                </div>
              </div>

              {/* Impact Results */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Monthly Impact</h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">💨</span>
                      <span className="text-sm text-gray-600">Carbon Prevented</span>
                    </div>
                    <div className="text-3xl font-black text-blue-600">{calculateImpact.carbon} kg CO2e</div>
                    <p className="text-xs text-gray-600 mt-1">Equivalent to driving {Math.round(parseFloat(calculateImpact.carbon) * 0.62)} km less</p>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">💧</span>
                      <span className="text-sm text-gray-600">Water Saved</span>
                    </div>
                    <div className="text-3xl font-black text-cyan-600">{calculateImpact.water} L</div>
                    <p className="text-xs text-gray-600 mt-1">Equivalent to {Math.round(parseInt(calculateImpact.water) / 2650)} person's daily water use</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">♻️</span>
                      <span className="text-sm text-gray-600">Plastic Avoided</span>
                    </div>
                    <div className="text-3xl font-black text-green-600">{calculateImpact.plastic} kg</div>
                    <p className="text-xs text-gray-600 mt-1">Through sustainable packaging</p>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">🌳</span>
                      <span className="text-sm text-gray-600">Trees Planted Equivalent</span>
                    </div>
                    <div className="text-3xl font-black text-emerald-600">{calculateImpact.trees} trees</div>
                    <p className="text-xs text-gray-600 mt-1">Your impact in carbon sequestration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sustainable Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Shipping Options */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚚 Sustainable Shipping</h2>
              
              <div className="space-y-3">
                {shippingOptions.map(option => (
                  <div
                    key={option.id}
                    className="p-4 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{option.label}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        option.carbon === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {option.carbon} kg CO2
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{option.eco}</div>
                    {option.cost > 0 && (
                      <div className="text-sm font-bold text-gray-900">+${option.cost.toFixed(2)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging Options */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📦 Packaging Choices</h2>
              
              <div className="space-y-3">
                {packagingOptions.map(option => (
                  <div
                    key={option.id}
                    className="p-4 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{option.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{option.label}</h3>
                        <p className="text-xs text-gray-600 mb-2">{option.materials}</p>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          option.id === 'premium' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {option.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Composability Guide */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🌿 End-of-Life Composability</h2>
            <p className="text-gray-600 mb-6">All our packaging is designed to biodegrade responsibly</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {composabilityGuide.map((guide, idx) => (
                <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-2">{guide.item}</h3>
                  <div className="text-2xl font-black text-green-600 mb-3">{guide.time}</div>
                  <p className="text-sm text-gray-600">{guide.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Partnerships */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-5xl mb-3">🌍</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Carbon Neutral Certified</h3>
              <p className="text-sm text-gray-600">All shipping and operations offset through verified carbon credits</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-5xl mb-3">♻️</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Certified Sustainable</h3>
              <p className="text-sm text-gray-600">Partnered with verified sustainable farming organizations</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-5xl mb-3">🌳</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Reforestation Partner</h3>
              <p className="text-sm text-gray-600">1% of sales support global tree planting initiatives</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-8 text-center mt-12">
            <h2 className="text-3xl font-black text-white mb-3">Ready to Make an Impact?</h2>
            <p className="text-green-100 mb-6">Start shopping with sustainability in mind</p>
            <button className="px-8 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition-all text-lg">
              🛒 Shop Sustainably
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
