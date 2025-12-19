'use client'

import Link from 'next/link'
import Image from 'next/image'
import CartCount from './CartCount'
import { useState } from 'react'

export default function Header(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  return (
    <header className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 shadow-2xl border-b-4 border-amber-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" onClick={closeMobileMenu}>
            <div className="transform group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
              <Image src="/logo.svg" alt="Fresh Tropics Asian Fruits" width={56} height={56} className="filter brightness-110" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 tracking-tight drop-shadow-md leading-tight">
                Fresh Tropics
              </span>
              <span className="text-xs font-bold text-amber-100 tracking-widest uppercase drop-shadow-md">
                ✦ Asian Fruits ✦
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Simplified */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="relative px-3 py-2 text-amber-50 font-semibold text-xs uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/shop" className="relative px-3 py-2 text-amber-50 font-semibold text-xs uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/comparison" className="relative px-3 py-2 text-amber-50 font-semibold text-xs uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Compare
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <div className="h-4 w-px bg-amber-300/30"></div>
            <Link href="/videos" className="relative px-3 py-2 text-transparent bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text font-bold text-xs uppercase tracking-wide hover:from-pink-200 hover:to-orange-200 transition-all duration-300 group">
              🎬 Videos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-300 to-orange-300 group-hover:w-full transition-all duration-500"></span>
            </Link>
            
            {/* More dropdown */}
            <div className="relative group">
              <button
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="relative px-3 py-2 text-amber-50 font-semibold text-xs uppercase tracking-wide hover:text-amber-200 transition-all duration-300 flex items-center gap-1"
              >
                More
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
              </button>
              
              {/* Dropdown menu */}
              <div 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute left-0 mt-0 w-48 bg-gradient-to-b from-emerald-800 to-emerald-700 shadow-2xl rounded-lg border border-amber-400/30 overflow-hidden transition-all duration-300 origin-top z-50 ${
                  isDropdownOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
                }`}
              >
                <Link href="/seasonal" className="block px-4 py-3 text-amber-50 font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 border-l-4 border-transparent hover:border-amber-300">
                  🌍 Seasonal
                </Link>
                <Link href="/app" className="block px-4 py-3 text-amber-50 font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 border-l-4 border-transparent hover:border-amber-300">
                  📱 Mobile App
                </Link>
                <Link href="/rewards" className="block px-4 py-3 text-amber-50 font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 border-l-4 border-transparent hover:border-amber-300">
                  🎁 Rewards
                </Link>
                <Link href="/subscribe" className="block px-4 py-3 text-amber-50 font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 border-l-4 border-transparent hover:border-amber-300">
                  🔄 Subscribe
                </Link>
                <div className="h-px bg-amber-300/20"></div>
                <Link href="/about" className="block px-4 py-3 text-amber-50 font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 border-l-4 border-transparent hover:border-amber-300">
                  ℹ️ About
                </Link>
                <Link href="/contact" className="block px-4 py-3 text-amber-50 font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 border-l-4 border-transparent hover:border-amber-300">
                  📧 Contact
                </Link>
              </div>
            </div>
          </nav>

          {/* Cart & Menu Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            <Link href="/wishlist" className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-all text-xs lg:text-sm hover:shadow-lg h-10 min-w-10 justify-center lg:justify-start" onClick={closeMobileMenu}>
              <span className="text-lg">🤍</span>
              <span className="hidden lg:inline">Wishlist</span>
            </Link>
            <Link href="/cart" className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-3 sm:px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 font-bold rounded-full shadow-lg hover:shadow-2xl hover:from-amber-300 hover:via-amber-200 hover:to-yellow-200 transition-all duration-300 group text-xs lg:text-sm h-10 sm:h-auto" onClick={closeMobileMenu}>
              <svg className="w-4 lg:w-5 h-4 lg:h-5 fill-current group-hover:scale-110 transition-transform flex-shrink-0" viewBox="0 0 24 24">
                <path d="M7 4V3c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v1h4c.6 0 1 .4 1 1v2c0 .3-.1.5-.3.7L19 20c-.2 1.1-1.1 2-2.3 2H7.3c-1.2 0-2.1-.9-2.3-2L2.3 7.7C2.1 7.5 2 7.3 2 7V5c0-.6.4-1 1-1h4zm2 2h6V4H9v2zm8.2 15H6.8l1.5-11h11.4l-1.5 11z"/>
              </svg>
              <span className="font-black hidden sm:inline">CART</span>
              <CartCount />
            </Link>

            {/* Mobile Menu Button - Touch optimized */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-emerald-600 rounded-lg transition-all duration-300 h-10 w-10 justify-center items-center"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`w-6 h-0.5 bg-amber-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-amber-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-amber-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Optimized for touch */}
      <div
        style={{ top: 'calc(5rem + env(safe-area-inset-top))' }}
        className={`lg:hidden fixed left-0 right-0 bottom-0 bg-gradient-to-b from-emerald-800 to-emerald-700 shadow-2xl border-b-2 border-amber-500 overflow-y-auto transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col py-2 px-3 gap-1">
          <Link 
            href="/" 
            className="block px-4 py-4 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300 text-sm touch-target"
            onClick={closeMobileMenu}
          >
            🏠 Home
          </Link>
          <Link 
            href="/shop" 
            className="block px-4 py-4 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300 text-sm touch-target"
            onClick={closeMobileMenu}
          >
            🛒 Shop
          </Link>
          <Link 
            href="/shop?category=pinkglow" 
            className="block px-4 py-4 text-pink-200 font-bold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-pink-300 text-sm touch-target"
            onClick={closeMobileMenu}
          >
            🌸 Pink Glow Pineapple
          </Link>
          <Link 
            href="/build-box" 
            className="block px-4 py-4 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300 text-sm touch-target"
            onClick={closeMobileMenu}
          >
            📦 Build Your Own Box
          </Link>
          <Link 
            href="/blog" 
            className="block px-4 py-4 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300 text-sm touch-target"
            onClick={closeMobileMenu}
          >
            📰 Blog
          </Link>
          <Link 
            href="/comparison" 
            className="block px-4 py-4 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300 text-sm touch-target"
            onClick={closeMobileMenu}
          >
            🍎 Compare
          </Link>
          <Link 
            href="/about" 
            className="block px-4 py-4 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300 text-sm touch-target"
            onClick={closeMobileMenu}
          >
            ℹ️ About
          </Link>
          <Link 
            href="/subscribe" 
            className="block px-4 py-4 text-amber-50 font-semibold uppercase tracking-wide hover:bg-emerald-600 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-amber-300 text-sm touch-target"
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
            href="/app" 
            className="block px-4 py-3 text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-black uppercase tracking-wide hover:bg-purple-600/30 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-purple-300"
            onClick={closeMobileMenu}
          >
            📱 App
          </Link>
          <Link 
            href="/videos" 
            className="block px-4 py-3 text-transparent bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text font-black uppercase tracking-wide hover:bg-pink-600/30 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-pink-300"
            onClick={closeMobileMenu}
          >
            🎬 Videos
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
          onClick={closeMobileMenu}
          style={{ top: 'calc(5rem + env(safe-area-inset-top))' }}
          className="lg:hidden fixed left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      <style jsx>{`
        .touch-target {
          min-height: 44px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </header>
  )
}
