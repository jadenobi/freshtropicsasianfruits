'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import { generate3DProductVisual } from '@/lib/premiumOptimization'

export default function Premium3DExperiencePage() {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [rotationX, setRotationX] = useState(20)
  const [rotationY, setRotationY] = useState(50)
  const [scale, setScale] = useState(1.2)
  const [lightingMode, setLightingMode] = useState<'luxury' | 'natural' | 'cinematic' | 'studio'>('luxury')

  const products = [
    {
      id: 'pineapple',
      name: 'Pink Glow Pineapple',
      category: 'Luxury Edition',
      price: 45.99,
      emoji: '🍍',
      description: 'The crown jewel of our collection. Hand-selected pink glow pineapples with unprecedented sweetness.',
      specs: {
        origin: 'Costa Rica, Exclusive Farm',
        ripeness: 'Perfect',
        size: 'Extra Large',
        weight: '5.2 lbs',
      },
    },
    {
      id: 'dragon',
      name: 'Dragon Fruit Ensemble',
      category: 'Premium Collection',
      price: 38.50,
      emoji: '🐉',
      description: 'Vibrant pink and white dragon fruit with creamy, delicate texture.',
      specs: {
        origin: 'Vietnam, Mountain Farms',
        ripeness: 'Optimal',
        size: 'Large',
        weight: '1.8 lbs each',
      },
    },
    {
      id: 'mango',
      name: 'Ataulfo Mango Supreme',
      category: 'Luxury Selection',
      price: 52.00,
      emoji: '🥭',
      description: 'The world\'s finest mango variety, with golden, buttery flesh and complex flavor profile.',
      specs: {
        origin: 'Mexico, Heritage Orchards',
        ripeness: 'Peak Season',
        size: 'Premium Grade',
        weight: '12 oz each',
      },
    },
    {
      id: 'tropical',
      name: 'Tropical Paradise Box',
      category: 'Curated Collection',
      price: 67.99,
      emoji: '🎁',
      description: 'The ultimate luxury assortment: pineapple, mango, dragon fruit, and passion fruit.',
      specs: {
        origin: 'Multi-origin Selection',
        ripeness: 'Staggered Delivery',
        size: 'Premium Assortment',
        weight: '12 lbs total',
      },
    },
  ]

  const currentProduct = products[selectedProduct]
  const visual3d = useMemo(() => generate3DProductVisual(currentProduct.id, currentProduct.name), [currentProduct.id])

  const lightingPresets = {
    luxury: {
      name: '✨ Luxury',
      description: 'Premium jewelry lighting with warm accents',
      colors: ['#FFD700', '#FFA500', '#FF69B4'],
    },
    natural: {
      name: '☀️ Natural',
      description: 'Soft natural sunlight with shadows',
      colors: ['#FFFFFF', '#F0E68C', '#FFE4B5'],
    },
    cinematic: {
      name: '🎬 Cinematic',
      description: 'Movie production lighting',
      colors: ['#00FFFF', '#FF1493', '#FFD700'],
    },
    studio: {
      name: '📸 Studio',
      description: 'Professional photography setup',
      colors: ['#FFFFFF', '#E6E6FA', '#F5F5DC'],
    },
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-400 mb-4">IMMERSIVE 3D EXPERIENCE</p>
            <h1 className="text-6xl md:text-7xl font-black mb-4 text-white">
              Explore in <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">360°</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Rotate, zoom, and interact with every product in stunning detail before you order
            </p>
          </div>

          {/* Main 3D Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* 3D Viewer Panel */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl bg-gradient-to-br from-black to-emerald-950/30 border-2 border-white/10 overflow-hidden aspect-square flex items-center justify-center">
                {/* 3D Effect Background */}
                <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 to-transparent opacity-50"></div>

                {/* Product Visualization */}
                <div
                  className="relative text-9xl transition-transform duration-300"
                  style={{
                    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`,
                    perspective: '1200px',
                  }}
                >
                  {currentProduct.emoji}
                </div>

                {/* Lighting Indicator */}
                <div className="absolute top-4 right-4 text-xs font-bold text-emerald-400 bg-black/50 px-3 py-2 rounded-lg backdrop-blur">
                  💡 {lightingPresets[lightingMode].name}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 space-y-6">
                {/* Rotation Controls */}
                <div>
                  <p className="text-sm font-bold text-white mb-4">🔄 Rotation Control</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/60 mb-2 block">X-Axis: {rotationX}°</label>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={rotationX}
                        onChange={e => setRotationX(Number(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/60 mb-2 block">Y-Axis: {rotationY}°</label>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={rotationY}
                        onChange={e => setRotationY(Number(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Zoom Control */}
                <div>
                  <label className="text-sm font-bold text-white mb-4 block">🔍 Zoom: {(scale * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={scale}
                    onChange={e => setScale(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Lighting Presets */}
                <div>
                  <p className="text-sm font-bold text-white mb-4">💡 Lighting Modes</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(Object.keys(lightingPresets) as Array<'luxury' | 'natural' | 'cinematic' | 'studio'>).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setLightingMode(mode)}
                        className={`px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                          lightingMode === mode
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                            : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        {lightingPresets[mode].name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-white/50 mt-3">{lightingPresets[lightingMode].description}</p>
                </div>
              </div>
            </div>

            {/* Product Info Panel */}
            <div className="space-y-6">
              {/* Current Product Info */}
              <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 backdrop-blur">
                <div className="text-5xl mb-4">{currentProduct.emoji}</div>
                <h2 className="text-3xl font-black text-white mb-2">{currentProduct.name}</h2>
                <p className="text-sm text-emerald-400 font-bold mb-4">{currentProduct.category}</p>
                <p className="text-lg font-black text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text mb-6">
                  ${currentProduct.price}
                </p>
                <p className="text-sm text-white/70 mb-6">{currentProduct.description}</p>

                {/* Specifications */}
                <div className="space-y-3 mb-6 p-4 rounded-lg bg-black/50 border border-white/10">
                  {Object.entries(currentProduct.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-white/60 capitalize">{key}:</span>
                      <span className="font-bold text-white">{value as string}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all uppercase">
                    Add to Cart
                  </button>
                  <button className="w-full px-6 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all uppercase">
                    Add to Wishlist ♥
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">4.9</div>
                  <p className="text-xs text-white/60">Rating</p>
                </div>
                <div className="text-center border-l border-r border-white/10">
                  <div className="text-2xl font-black text-cyan-400">2.3K</div>
                  <p className="text-xs text-white/60">Reviews</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-purple-400">98%</div>
                  <p className="text-xs text-white/60">Satisfied</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Carousel */}
          <div className="mt-16">
            <p className="text-sm font-bold text-white mb-6 uppercase tracking-widest">EXPLORE OTHER PRODUCTS</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedProduct(idx)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedProduct === idx
                      ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-400 shadow-lg shadow-emerald-500/30'
                      : 'bg-white/5 border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="text-4xl mb-2">{product.emoji}</div>
                  <p className="font-bold text-white text-sm">{product.name}</p>
                  <p className="text-xs text-white/50 mt-2">${product.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🌐', title: '360° Interactive', desc: 'Rotate, zoom, and inspect every angle' },
              { icon: '⚡', title: 'Instant Load', desc: 'Sub-100ms rendering with WebGL' },
              { icon: '📱', title: 'Mobile Ready', desc: 'Touch gestures on all devices' },
              { icon: '🎨', title: 'Studio Lighting', desc: '4 professional lighting modes' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-400/5 transition-all text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <p className="font-bold text-white mb-2">{feature.title}</p>
                <p className="text-sm text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
