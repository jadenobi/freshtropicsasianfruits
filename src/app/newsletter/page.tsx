"use client"

import PageLayout from "@/components/PageLayout"
import { useState } from "react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [frequency, setFrequency] = useState("weekly")
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus("Please enter an email address")
      return
    }

    setIsLoading(true)
    try {
      // Simulate subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus(`✓ Subscribed! Check your email for your 20% welcome discount.`)
      setEmail("")
      
      setTimeout(() => setStatus(""), 4000)
    } catch (error) {
      setStatus("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 text-lg">Get exclusive recipes, farming tips, and special offers delivered to your inbox</p>
        </div>

        {/* Newsletter Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200 text-center">
            <p className="text-3xl mb-3">🎁</p>
            <h3 className="font-bold text-emerald-900 mb-2">20% Off Welcome</h3>
            <p className="text-gray-700 text-sm">Get 20% off your first order after signing up</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200 text-center">
            <p className="text-3xl mb-3">📖</p>
            <h3 className="font-bold text-emerald-900 mb-2">Exclusive Recipes</h3>
            <p className="text-gray-700 text-sm">Weekly recipes from our chefs using fresh seasonal fruit</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200 text-center">
            <p className="text-3xl mb-3">🌾</p>
            <h3 className="font-bold text-emerald-900 mb-2">Farm Stories</h3>
            <p className="text-gray-700 text-sm">Learn about our farming partners and fruit sourcing</p>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="mb-12 bg-white border-2 border-emerald-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">What You'll Receive</h3>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Weekly Recipes</h4>
                <p className="text-gray-600 text-sm">Easy-to-follow recipes using our fresh fruits - smoothies, desserts, salads, and more</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Exclusive Discounts</h4>
                <p className="text-gray-600 text-sm">Subscriber-only sales and special offers sent directly to your inbox</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Fruit Storage Tips</h4>
                <p className="text-gray-600 text-sm">How to keep your fruit fresh longer and maximize ripeness</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Farm Updates</h4>
                <p className="text-gray-600 text-sm">Behind-the-scenes stories from our partner farms</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">New Product Launches</h4>
                <p className="text-gray-600 text-sm">First access to new fruits and products before everyone else</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-emerald-600 font-bold">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Nutrition Tips</h4>
                <p className="text-gray-600 text-sm">Health benefits and nutritional info for seasonal fruits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequency */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Newsletter Frequency</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h4 className="font-bold text-emerald-900 mb-2">Weekly Digest 📧</h4>
              <p className="text-gray-700 text-sm mb-4">Every Monday morning with the week's recipes and tips</p>
              <p className="text-gray-600 text-xs">Most popular option</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h4 className="font-bold text-emerald-900 mb-2">Bi-Weekly 📧</h4>
              <p className="text-gray-700 text-sm mb-4">Every other week - enough to stay updated without the inbox noise</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h4 className="font-bold text-emerald-900 mb-2">Monthly Roundup 📧</h4>
              <p className="text-gray-700 text-sm mb-4">Once a month - just the highlights and special offers</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Subscribe to Our Newsletter</h3>
          <form onSubmit={handleSubscribe} className="max-w-lg mx-auto space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-900"
              required
            />
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-emerald-50 cursor-pointer">
                <input type="radio" name="frequency" value="weekly" checked={frequency === "weekly"} onChange={(e) => setFrequency(e.target.value)} className="w-4 h-4" />
                <span className="text-sm">Weekly Digest</span>
              </label>
              <label className="flex items-center gap-3 text-emerald-50 cursor-pointer">
                <input type="radio" name="frequency" value="biweekly" checked={frequency === "biweekly"} onChange={(e) => setFrequency(e.target.value)} className="w-4 h-4" />
                <span className="text-sm">Bi-Weekly</span>
              </label>
              <label className="flex items-center gap-3 text-emerald-50 cursor-pointer">
                <input type="radio" name="frequency" value="monthly" checked={frequency === "monthly"} onChange={(e) => setFrequency(e.target.value)} className="w-4 h-4" />
                <span className="text-sm">Monthly</span>
              </label>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-white text-emerald-600 font-bold py-3 rounded-lg hover:bg-emerald-50 transition-colors disabled:opacity-50">
              {isLoading ? "Subscribing..." : "Subscribe & Get 20% Off"}
            </button>
            {status && (
              <p className={`text-center text-sm ${status.includes("✓") ? "text-emerald-200" : "text-yellow-200"}`}>
                {status}
              </p>
            )}
          </form>
          <p className="text-center text-emerald-100 text-xs mt-6">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>
    </PageLayout>
  )
}
