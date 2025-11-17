"use client"

import PageLayout from "@/components/PageLayout"
import { useState } from "react"

export default function SubscribePage() {
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Subscribe & Save</h2>
          <p className="text-gray-600 text-lg">Get fresh fruit delivered regularly and save 10-15% on every order</p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200">
            <p className="text-3xl mb-3">💰</p>
            <h3 className="font-bold text-emerald-900 mb-3">Save 10-15%</h3>
            <p className="text-gray-700 text-sm">Every subscription box includes an automatic discount. The more you subscribe, the more you save!</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200">
            <p className="text-3xl mb-3">🚚</p>
            <h3 className="font-bold text-emerald-900 mb-3">Free Shipping</h3>
            <p className="text-gray-700 text-sm">Never pay shipping fees again. All subscription boxes include FREE delivery to your door.</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200">
            <p className="text-3xl mb-3">🎯</p>
            <h3 className="font-bold text-emerald-900 mb-3">Never Skip</h3>
            <p className="text-gray-700 text-sm">Going on vacation? Pause your subscription anytime. No penalties, no fees. Restart whenever you want.</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 bg-white border-2 border-emerald-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">How It Works</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 mb-1">Choose Your Box</h4>
                <p className="text-gray-700">Select from our seasonal fresh fruit boxes or customize your own selection.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 mb-1">Select Frequency</h4>
                <p className="text-gray-700">Choose weekly, bi-weekly, or monthly deliveries. Change it anytime from your account.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 mb-1">Get Fresh Fruit</h4>
                <p className="text-gray-700">We hand-select and ship your box at peak freshness. Enjoy amazing fruit delivered!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 mb-1">Modify Anytime</h4>
                <p className="text-gray-700">Pause, skip, change frequency, or modify fruits - all from your account dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Subscription Pricing</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Small Box", regular: "$55", sub: "$45", save: "$10" },
              { name: "Medium Box", regular: "$75", sub: "$63", save: "$12" },
              { name: "Large Box", regular: "$95", sub: "$80", save: "$15" }
            ].map((plan, idx) => (
              <div key={idx} className="bg-white border-2 border-emerald-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-emerald-900 text-lg mb-4">{plan.name}</h4>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-emerald-600">{plan.sub}</span>
                    <span className="text-gray-500 line-through text-sm">{plan.regular}</span>
                  </div>
                  <p className="text-emerald-700 font-semibold text-sm">Save {plan.save}/box</p>
                </div>
                <button onClick={async () => {
                  setIsLoading(true)
                  try {
                    await new Promise(resolve => setTimeout(resolve, 800))
                    setStatus(`✓ ${plan.name} subscription activated!`)
                    setTimeout(() => setStatus(""), 3000)
                  } finally {
                    setIsLoading(false)
                  }
                }} disabled={isLoading} className="w-full bg-emerald-600 text-white font-bold py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50">
                  {isLoading ? "Processing..." : "Subscribe Now"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Subscription FAQs</h3>
          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
              <summary className="font-semibold text-gray-900 cursor-pointer group-open:text-emerald-700">Can I cancel my subscription?</summary>
              <p className="text-gray-700 mt-3">Yes! You can cancel anytime from your account dashboard. No penalties or fees.</p>
            </details>
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
              <summary className="font-semibold text-gray-900 cursor-pointer group-open:text-emerald-700">Can I modify the fruits in my box?</summary>
              <p className="text-gray-700 mt-3">Absolutely! Each month before shipment, you can choose which fruits to include or exclude.</p>
            </details>
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
              <summary className="font-semibold text-gray-900 cursor-pointer group-open:text-emerald-700">Can I pause my subscription?</summary>
              <p className="text-gray-700 mt-3">Yes! Pause anytime and restart whenever you're ready. No minimum commitment.</p>
            </details>
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
              <summary className="font-semibold text-gray-900 cursor-pointer group-open:text-emerald-700">How often can I change my delivery frequency?</summary>
              <p className="text-gray-700 mt-3">You can change from weekly to monthly (or vice versa) before each shipment.</p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Subscription?</h3>
          <p className="mb-8 text-emerald-50">Get fresh fruit delivered to your door with savings and free shipping!</p>
          <button onClick={async () => {
            setIsLoading(true)
            try {
              await new Promise(resolve => setTimeout(resolve, 800))
              setStatus("✓ Let's get you started! Check your email for next steps.")
              setTimeout(() => setStatus(""), 3000)
            } finally {
              setIsLoading(false)
            }
          }} disabled={isLoading} className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-bold disabled:opacity-50">
            {isLoading ? "Processing..." : "Subscribe Now & Save"}
          </button>
          {status && (
            <p className="text-center text-emerald-200 text-sm mt-4">
              {status}
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
