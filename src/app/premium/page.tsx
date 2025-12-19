'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  getPersonalizedExperience,
  generateAIUserProfile,
  getLuxuryBrandMessaging,
  getTrustSignals,
  getNextGenUXPatterns,
  calculatePerformanceMetrics,
  getPremiumLoyaltyTiers,
} from '@/lib/premiumOptimization'

export default function PremiumHomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d')

  const messaging = useMemo(() => getLuxuryBrandMessaging(), [])
  const trustSignals = useMemo(() => getTrustSignals(), [])
  const uxPatterns = useMemo(() => getNextGenUXPatterns(), [])
  const performance = useMemo(() => calculatePerformanceMetrics(), [])
  const loyaltyTiers = useMemo(() => getPremiumLoyaltyTiers(), [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const premiumProducts = [
    {
      name: 'Pink Glow Pineapple',
      category: 'Luxury',
      price: 45.99,
      rating: 4.9,
      badge: '✨ LIMITED EDITION',
      image: '/products/pink-glow.jpg',
    },
    {
      name: 'Dragon Fruit Trio',
      category: 'Premium',
      price: 34.99,
      rating: 4.8,
      badge: '🌟 BESTSELLER',
      image: '/products/dragon-trio.jpg',
    },
    {
      name: 'Mango Concierge',
      category: 'Luxury',
      price: 52.50,
      rating: 5.0,
      badge: '👑 PLATINUM CHOICE',
      image: '/products/mango-concierge.jpg',
    },
    {
      name: 'Exotic Paradise',
      category: 'Premium',
      price: 38.75,
      rating: 4.7,
      badge: '🎁 SEASONAL SPECIAL',
      image: '/products/exotic-paradise.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white overflow-hidden">
      {/* ============================================
          PREMIUM MINIMALIST NAVIGATION
          ============================================ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-emerald-900/80 backdrop-blur-xl border-b border-amber-400/30 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-black bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 bg-clip-text text-transparent">
              ✦ FRESH TROPICS
            </span>
            <span className="text-xs font-black text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
              LUXURY CURATED
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Shop', 'Experience', 'Loyalty', 'Concierge'].map(item => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm uppercase tracking-widest font-bold text-amber-50 hover:text-amber-200 transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 group-hover:w-full transition-all duration-500"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-amber-400/20 hover:bg-amber-400/40 transition-all flex items-center justify-center text-amber-100 hover:text-amber-200">
              🔍
            </button>
            <Link
              href="/cart"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center font-bold text-emerald-900"
            >
              🛒
            </Link>
          </div>
        </div>
      </nav>

      {/* ============================================
          IMMERSIVE HERO SECTION - ULTRA MINIMALIST
          ============================================ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 opacity-60"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.3em] font-bold text-amber-300 animate-fade-in">
              PINNACLE OF LUXURY
            </div>
            <h1 className="text-7xl md:text-8xl font-black leading-tight">
              <span className="block text-amber-50">Indulgence</span>
              <span className="block bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 bg-clip-text text-transparent">
                Delivered
              </span>
            </h1>
            <p className="text-xl text-amber-100 font-light max-w-2xl mx-auto leading-relaxed">
              {messaging.subheader}
            </p>
          </div>

          {/* Value Propositions - Minimal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              { icon: '✨', text: 'Hand-selected luxury fruits' },
              { icon: '⚡', text: '48-hour fresh delivery' },
              { icon: '🎯', text: 'AI-curated for you' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="px-6 py-4 rounded-lg bg-emerald-900/40 backdrop-blur-md border border-amber-400/30 hover:border-amber-300/60 hover:bg-emerald-900/50 transition-all duration-300"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-bold text-amber-100 mt-2">{item.text}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Link
              href="/shop"
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all duration-300 uppercase tracking-wider"
            >
              Explore Collection
            </Link>
            <Link
              href="/experience"
              className="px-8 py-4 bg-emerald-900/40 backdrop-blur-md border border-amber-400/30 text-amber-100 font-bold rounded-lg hover:bg-emerald-900/60 transition-all duration-300 uppercase tracking-wider"
            >
              View 3D Gallery
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-widest text-amber-100/50">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-transparent"></div>
        </div>
      </section>

      {/* ============================================
          PREMIUM PRODUCT SHOWCASE - IMMERSIVE 3D
          ============================================ */}
      <section className="relative py-32 bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-amber-300 mb-4">LUXURY COLLECTION</p>
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100">Curated Selections</h2>
            <p className="text-amber-50 text-lg max-w-2xl mx-auto">Each piece carefully selected from the world's most exclusive farms</p>
          </div>

          {/* Product Grid - Minimalist Masonry */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumProducts.map((product, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl bg-emerald-900/40 backdrop-blur-md border border-amber-400/30 hover:border-amber-300/60 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/20"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
                  {product.badge}
                </div>

                {/* Image Placeholder - 3D Effect */}
                <div className="relative h-64 mb-6 rounded-lg bg-gradient-to-br from-amber-400/20 to-yellow-300/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="text-6xl animate-pulse">{['🍍', '🐉', '🥭', '🎁'][idx % 4]}</div>
                </div>

                {/* Product Info */}
                <h3 className="text-lg font-bold text-amber-50 mb-2">{product.name}</h3>
                <p className="text-sm text-amber-100 mb-4">{product.category}</p>

                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-black text-amber-300">${product.price}</span>
                  <span className="text-sm font-bold">⭐ {product.rating}</span>
                </div>

                {/* CTA */}
                <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 hover:shadow-lg text-emerald-900 font-bold rounded-lg transition-all duration-300 uppercase text-sm tracking-wider">
                  Claim Selection
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST & SECURITY - PREMIUM SIGNALS
          ============================================ */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-800 to-emerald-700">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-amber-300 text-center mb-12">WHY LUXURY BUYERS CHOOSE US</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustSignals.map((signal, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-lg bg-emerald-900/40 backdrop-blur-md border border-amber-400/30 hover:border-amber-300/60 hover:bg-emerald-900/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{signal.icon}</div>
                <p className="font-bold text-amber-50 mb-2 text-sm">{signal.text}</p>
                <p className="text-xs text-amber-100/70">{signal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PERFORMANCE METRICS - TRANSPARENCY
          ============================================ */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-amber-300 mb-4">2025 OPTIMIZATION</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100">Sub-Second Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-yellow-300/20 border border-amber-400/40">
              <div className="text-4xl font-black text-amber-300 mb-2">{performance.timeToFirstByte}ms</div>
              <p className="text-amber-100">Time to First Byte</p>
              <p className="text-xs text-amber-100/70 mt-2">Lightning-fast server response</p>
            </div>

            <div className="p-8 rounded-lg bg-gradient-to-br from-yellow-300/20 to-amber-400/20 border border-amber-400/40">
              <div className="text-4xl font-black text-amber-300 mb-2">{performance.largestContentfulPaint}ms</div>
              <p className="text-amber-100">Largest Contentful Paint</p>
              <p className="text-xs text-amber-100/70 mt-2">Instant visual completeness</p>
            </div>

            <div className="p-8 rounded-lg bg-gradient-to-br from-amber-300/20 to-amber-400/20 border border-amber-400/40">
              <div className="text-4xl font-black text-amber-300 mb-2">{performance.overallScore}</div>
              <p className="text-amber-100">Performance Score</p>
              <p className="text-xs text-amber-100/70 mt-2">Industry-leading optimization</p>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-lg bg-emerald-900/40 backdrop-blur-md border border-amber-400/30">
            <p className="text-sm font-bold text-amber-200 mb-6">Optimization Technologies:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performance.optimization.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-lg">{opt.split(':')[0]}</span>
                  <span className="text-sm text-amber-100">{opt.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PREMIUM LOYALTY TIERS
          ============================================ */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-700 to-emerald-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-amber-300 mb-4">EXCLUSIVE REWARDS</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100">Concierge Tiers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(loyaltyTiers).map(([key, tier]: any) => (
              <div
                key={key}
                className="relative p-8 rounded-xl border-2 border-amber-400/30 hover:border-amber-300/60 transition-all duration-300 bg-gradient-to-br from-emerald-900/40 to-emerald-900/20 backdrop-blur-md group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl"></div>

                <h3 className="text-2xl font-black text-amber-200 mb-2">{tier.name}</h3>
                <p className="text-sm text-amber-100/70 mb-6">From ${tier.requiredSpend.toLocaleString()}</p>

                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-amber-300">✓</span>
                      <span className="text-sm text-amber-50">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-400/30 to-yellow-300/30 hover:from-amber-400/50 hover:to-yellow-300/50 text-amber-100 font-bold rounded-lg transition-all duration-300 uppercase text-sm border border-amber-400/50 hover:border-amber-300/80">
                  Unlock {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER - MINIMALIST
          ============================================ */}
      <footer className="relative py-12 bg-emerald-900 border-t border-amber-400/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: 'Shop', links: ['All Products', 'Seasonal', 'Luxury'] },
              { title: 'Experience', links: ['3D Gallery', 'Concierge', 'Stories'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'FAQ'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map((col, idx) => (
              <div key={idx}>
                <p className="font-bold text-amber-200 mb-4 text-sm">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      <Link href="#" className="text-sm text-amber-100/60 hover:text-amber-200 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-amber-400/30 pt-8 flex items-center justify-between">
            <p className="text-sm text-amber-100/50">© 2025 Fresh Tropics. Premium Luxury Curated.</p>
            <div className="flex items-center gap-4">
              {['Instagram', 'Twitter', 'YouTube'].map((social, idx) => (
                <Link key={idx} href="#" className="text-sm text-amber-100/60 hover:text-amber-300 transition-colors">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
