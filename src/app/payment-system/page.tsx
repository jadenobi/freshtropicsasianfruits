"use client"

import PageLayout from "@/components/PageLayout"
import Link from "next/link"

export default function PaymentSystemPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-6">Secure Payment System</h1>
            <p className="text-2xl text-gray-600 leading-relaxed">
              Fresh Tropics's innovative email-based payment system puts security first. Your payment details are private, secure, and sent directly to you.
            </p>
          </div>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  icon: "🛒",
                  title: "Add to Cart",
                  desc: "Browse and add your favorite fresh fruits"
                },
                {
                  step: "2",
                  icon: "💳",
                  title: "Choose Method",
                  desc: "Select your preferred payment method"
                },
                {
                  step: "3",
                  icon: "📧",
                  title: "Receive Email",
                  desc: "Get secure payment details via email"
                },
                {
                  step: "4",
                  icon: "✓",
                  title: "We Verify",
                  desc: "We confirm payment and ship your order"
                },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-3xl font-black text-emerald-600 mb-3">{item.step}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">7 Payment Methods</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "💳",
                  name: "Credit Card (Stripe)",
                  desc: "Visa, MasterCard, American Express, Discover",
                  benefit: "Most secure, international support"
                },
                {
                  icon: "🅿️",
                  name: "PayPal",
                  desc: "Fast and familiar payment method",
                  benefit: "Buyer protection included"
                },
                {
                  icon: "🍎",
                  name: "Apple Pay",
                  desc: "One-tap payment on Apple devices",
                  benefit: "Fast, Face ID/Touch ID verified"
                },
                {
                  icon: "📱",
                  name: "Venmo",
                  desc: "Peer-to-peer payment via app",
                  benefit: "Instant, personal touch"
                },
                {
                  icon: "💵",
                  name: "Cash App",
                  desc: "Send money via Cash App tag",
                  benefit: "Easy, instant verification"
                },
                {
                  icon: "🏦",
                  name: "Zelle",
                  desc: "Direct bank transfer",
                  benefit: "Fastest option (1-3 minutes)"
                },
              ].map((method, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{method.name}</h3>
                      <p className="text-gray-600 mb-3">{method.desc}</p>
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-emerald-700">✓ {method.benefit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Security Features */}
          <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-12 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🔒 Security Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Private Email Delivery",
                  items: [
                    "Payment details sent only to your email",
                    "Never displayed publicly on website",
                    "Unique order-specific information",
                    "Encrypted transmission standard"
                  ]
                },
                {
                  title: "Customer Protection",
                  items: [
                    "Secure email with security warnings",
                    "Order confirmation with all details",
                    "Payment method-specific instructions",
                    "Anti-fraud verification steps"
                  ]
                },
                {
                  title: "Order Verification",
                  items: [
                    "Unique order numbers (GO-XXXXX format)",
                    "Customer email confirmation required",
                    "Timestamp-based order tracking",
                    "Payment verification before shipping"
                  ]
                },
                {
                  title: "Support & Accountability",
                  items: [
                    "24/7 customer support available",
                    "Email-based payment confirmation",
                    "Order status tracking",
                    "30-day payment guarantee"
                  ]
                },
              ].map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Email Preview */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📧 What You'll Receive</h2>
            <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-emerald-200">
              <p className="text-lg text-gray-700 mb-6">Your order confirmation email includes:</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Order Information</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>✓ Order number & timestamp</li>
                    <li>✓ Customer name & email</li>
                    <li>✓ Delivery address</li>
                    <li>✓ Complete order summary</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Payment Details</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>✓ Payment method & account info</li>
                    <li>✓ Amount due & total cost</li>
                    <li>✓ Step-by-step instructions</li>
                    <li>✓ Security & verification tips</li>
                  </ul>
                </div>
              </div>
              <Link
                href="/email-preview"
                className="mt-8 inline-block bg-emerald-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all"
              >
                View Email Preview →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Is my payment information secure?",
                  a: "Yes! Payment details are sent only to your email and never displayed publicly on our website. Each payment method has specific security measures."
                },
                {
                  q: "What if I don't receive the email?",
                  a: "Check your spam/junk folder first. If you still don't see it, contact us immediately at support@goldenliveorchard.com or +1 (555) 123-4567."
                },
                {
                  q: "Can I change my payment method after checkout?",
                  a: "Yes! You can reply to your order email and request a different payment method before sending payment."
                },
                {
                  q: "How long to verify payment?",
                  a: "Most payments verify within 1-2 hours. Zelle transfers verify within minutes. We'll email you once verified."
                },
                {
                  q: "What if payment fails?",
                  a: "Contact us immediately. We can resend instructions or help you try a different payment method."
                },
                {
                  q: "Are international payments supported?",
                  a: "Stripe and crypto support international payments. Most other methods are US-only. Contact us to arrange alternatives."
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Q: {faq.q}</h3>
                  <p className="text-gray-600">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Shop?</h2>
            <p className="text-xl mb-8 opacity-90">Experience our secure, straightforward checkout process</p>
            <Link
              href="/shop"
              className="inline-block bg-white text-emerald-600 font-bold px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all"
            >
              Browse Fresh Fruits →
            </Link>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
