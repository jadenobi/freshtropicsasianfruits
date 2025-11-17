"use client"

import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscriptionStatus, setSubscriptionStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setSubscriptionStatus("Please enter an email address")
      return
    }

    setIsLoading(true)
    try {
      // For now, just show success message
      // In production, this would send to a backend/email service
      setSubscriptionStatus("✓ Thank you for subscribing!")
      setEmail("")
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus("")
      }, 3000)
    } catch (error) {
      setSubscriptionStatus("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-emerald-950 to-emerald-900 text-gray-100">
      {/* Main Footer Content - 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About Fresh Tropics */}
          <div>
            <h3 className="text-lg font-bold text-yellow-300 mb-6">About Fresh Tropics</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Our Story</Link></li>
              <li><Link href="/reviews" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Reviews ❤️🍍🥑</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">FAQs</Link></li>
              <li><Link href="/box-directory" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Box 📦 Directory</Link></li>
              <li><Link href="/out-of-season" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Out of Season</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Our Blog</Link></li>
              <li><Link href="/press" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Press 🗞️</Link></li>
              <li><Link href="/corporate" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Corporate Orders 💼</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/refund" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Refund Policy</Link></li>
              <li><Link href="/ccpa" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">CCPA Opt-Out</Link></li>
            </ul>
          </div>

          {/* Column 2: Tropifruiter's Corner */}
          <div>
            <h3 className="text-lg font-bold text-yellow-300 mb-6">Tropifruiter's Corner</h3>
            <ul className="space-y-3">
              <li><Link href="/account" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Access Your Account</Link></li>
              <li><Link href="/subscribe" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Subscribe & Save</Link></li>
              <li><Link href="/rewards" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Rewards Program 💙</Link></li>
              <li><Link href="/newsletter" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Newsletter Updates 📧</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/ccpa" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">CCPA Opt-Out</Link></li>
            </ul>
          </div>

          {/* Column 3: Additional Links */}
          <div>
            <h3 className="text-lg font-bold text-yellow-300 mb-6">Additional Links</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">All Boxes</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Build Your Own Box</Link></li>
              <li><Link href="/shop?category=pinkglow" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">🌸 Pink Glow Pineapple</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Best Sellers</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">Gift Boxes 🎁</Link></li>
              <li><Link href="/sale" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">New & On Sale</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Info */}
          <div>
            <h3 className="text-lg font-bold text-yellow-300 mb-6">Best Customer Service</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              We are here for you 24/7 📞
            </p>
            <p className="text-gray-300 text-sm mb-4 font-semibold">
              (786) 758-4787
            </p>
            <p className="text-gray-300 text-sm mb-4">
              Email: <a href="mailto:hello@tropicalfruitbox.com" className="text-emerald-300 hover:text-emerald-200">hello@tropicalfruitbox.com</a>
            </p>
            <div className="border-t border-emerald-700 pt-4 mt-4">
              <p className="text-gray-300 text-sm font-semibold mb-2">Address:</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                1471 NW 21st St<br />
                Miami, FL 33142
              </p>
            </div>
          </div>
        </div>

        {/* Guarantees Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 py-12 border-t border-b border-emerald-800">
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-300 mb-2">✓ Free Shipping</p>
            <p className="text-sm text-gray-400">On All U.S. Orders!</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-300 mb-2">✓ Freshness Guaranteed</p>
            <p className="text-sm text-gray-400">Get it fresh or we'll make it right!</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-300 mb-2">✓ Best Customer Service</p>
            <p className="text-sm text-gray-400">We are here for you 24/7</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-12 pb-12 border-b border-emerald-800">
          <p className="text-emerald-300 font-semibold text-sm mb-4 text-center">Accepted Payment Methods</p>
          <div className="flex flex-wrap justify-center gap-3">
            {/* PayPal */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">PP</span>
            </div>
            
            {/* Apple Pay */}
            <div className="bg-gradient-to-br from-black to-gray-800 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">🍎</span>
            </div>
            
            {/* Venmo */}
            <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">V</span>
            </div>
            
            {/* Cash App */}
            <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">$</span>
            </div>
            
            {/* Zelle */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">Z</span>
            </div>
            
            {/* Crypto */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">₿</span>
            </div>

            {/* Visa */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs text-xs">VISA</span>
            </div>

            {/* Mastercard */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">MC</span>
            </div>

            {/* AMEX */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">AX</span>
            </div>

            {/* Google Pay */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-2 w-14 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs">GP</span>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-lg p-8 mb-12 border border-emerald-600">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Don't miss out on the latest fruit scoops!</h3>
              <p className="text-gray-200 text-sm">Sign up to get the latest fruit updates, specials & more!</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-sm"
                  required
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-yellow-400 text-emerald-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-all whitespace-nowrap disabled:opacity-50"
                >
                  {isLoading ? "Signing up..." : "Sign up"}
                </button>
              </div>
              {subscriptionStatus && (
                <p className={`text-sm ${subscriptionStatus.includes("✓") ? "text-emerald-200" : "text-yellow-200"}`}>
                  {subscriptionStatus}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-emerald-800 pt-8 text-center">
          <div className="mb-6">
            <p className="text-gray-400 text-xs mb-4">
              © 2024 Fresh Tropics Asian Fruits. All rights reserved. 
            </p>
            <div className="flex justify-center gap-4 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-emerald-300">Privacy Policy</Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-emerald-300">Terms of Service</Link>
              <span>|</span>
              <Link href="/ccpa" className="hover:text-emerald-300">CCPA Opt-Out</Link>
            </div>
          </div>
          <p className="text-gray-500 text-xs">
            Fresh Tropics Asian Fruits is a women-powered small business that grows and procures tropical and exotic fruits and delivers them fresh right to your doorstep.
          </p>
        </div>
      </div>
    </footer>
  )
}
