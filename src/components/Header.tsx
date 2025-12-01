'use client'

import Link from 'next/link'
import Image from 'next/image'
import CartCount from './CartCount'
import { useState } from 'react'

export default function Header(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 shadow-2xl border-b-4 border-amber-500 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-24">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-4 group" onClick={closeMobileMenu}>
            <div className="transform group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
              <Image src="/logo.svg" alt="Fresh Tropics Asian Fruits" width={64} height={64} className="filter brightness-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 tracking-tight drop-shadow-md">
                Fresh Tropics
              </span>
              <span className="text-xs font-bold text-amber-100 tracking-widest uppercase drop-shadow-md">
                ✦ Asian Fruits ✦
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/shop" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/comparison" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Compare
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/social" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              📱 Social
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/seasonal" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              🌍 Seasonal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <div className="h-6 w-px bg-amber-300/30"></div>
            <Link href="/premium" className="relative text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text font-black text-sm uppercase tracking-wide hover:from-emerald-200 hover:to-cyan-200 transition-all duration-300 group">
              ✨ Premium
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-300 to-cyan-300 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/experience" className="relative text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-black text-sm uppercase tracking-wide hover:from-cyan-200 hover:to-blue-200 transition-all duration-300 group">
              🌐 3D Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-300 to-blue-300 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/app" className="relative text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-black text-sm uppercase tracking-wide hover:from-purple-200 hover:to-pink-200 transition-all duration-300 group">
              📱 App
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/about" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/contact" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
          </nav>

          {/* Cart & Menu Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-all text-sm hover:shadow-lg" onClick={closeMobileMenu}>
              <span className="text-lg">🤍</span>
              <span className="hidden md:inline">Wishlist</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 font-bold rounded-full shadow-lg hover:shadow-2xl hover:from-amber-300 hover:via-amber-200 hover:to-yellow-200 transition-all duration-300 group" onClick={closeMobileMenu}>
              <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M7 4V3c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v1h4c.6 0 1 .4 1 1v2c0 .3-.1.5-.3.7L19 20c-.2 1.1-1.1 2-2.3 2H7.3c-1.2 0-2.1-.9-2.3-2L2.3 7.7C2.1 7.5 2 7.3 2 7V5c0-.6.4-1 1-1h4zm2 2h6V4H9v2zm8.2 15H6.8l1.5-11h11.4l-1.5 11z"/>
              </svg>
              <span className="text-sm font-black">CART</span>
              <CartCount />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-emerald-600 rounded-lg transition-all duration-300"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`w-6 h-0.5 bg-amber-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-amber-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-amber-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute left-0 right-0 top-24 bg-gradient-to-b from-emerald-800 to-emerald-700 shadow-2xl border-b-2 border-amber-500 overflow-hidden transition-all duration-300 ease-in-out origin-top ${
        isMobileMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
      }`}>
        <nav className="flex flex-col py-4 px-6 gap-2">
          <Link 
            href="/" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            🏠 Home
          </Link>
          <Link 
            href="/shop" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            🛒 Shop
          </Link>
          <Link 
            href="/shop?category=pinkglow" 
            className="block px-4 py-3 text-pink-200 font-bold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-pink-300"
            onClick={closeMobileMenu}
          >
            🌸 Pink Glow Pineapple
          </Link>
          <Link 
            href="/build-box" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            📦 Build Your Own Box
          </Link>
          <Link 
            href="/blog" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            📰 Blog
          </Link>
          <Link 
            href="/comparison" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            🍎 Compare
          </Link>
          <Link 
            href="/social" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            📱 Social
          </Link>
          <Link 
            href="/about" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            ℹ️ About
          </Link>
          <Link 
            href="/social" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            📱 Social
          </Link>
          <Link 
            href="/subscribe" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            🔄 Subscribe & Save
          </Link>
          
          {/* Mobile Menu Divider */}
          <div className="my-2 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-300 opacity-50"></div>
          
          {/* Additional Mobile Menu Items */}
          <Link 
            href="/seasonal" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            🌍 Seasonal
          </Link>
          <Link 
            href="/premium" 
            className="block px-4 py-3 text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text font-black uppercase tracking-wide hover:bg-emerald-600/30 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-emerald-300"
            onClick={closeMobileMenu}
          >
            ✨ Premium
          </Link>
          <Link 
            href="/experience" 
            className="block px-4 py-3 text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-black uppercase tracking-wide hover:bg-cyan-600/30 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-cyan-300"
            onClick={closeMobileMenu}
          >
            🌐 3D Experience
          </Link>
          <Link 
            href="/app" 
            className="block px-4 py-3 text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-black uppercase tracking-wide hover:bg-purple-600/30 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-purple-300"
            onClick={closeMobileMenu}
          >
            📱 App
          </Link>
          <Link 
            href="/email-marketing" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            ✉️ Email Marketing
          </Link>
          <Link 
            href="/rewards" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            🎁 Rewards Program
          </Link>
          <Link 
            href="/live-chat" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            💬 Live Chat
          </Link>
          <Link 
            href="/admin" 
            className="block px-4 py-3 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300"
            onClick={closeMobileMenu}
          >
            📊 Admin
          </Link>
        </nav>
      </div>

      {/* Decorative bottom bar */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-70"></div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-24"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  )
}
