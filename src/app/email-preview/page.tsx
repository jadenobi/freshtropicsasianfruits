"use client"

import { useState } from "react"
import PageLayout from "@/components/PageLayout"
import { PAYMENT_METHODS } from "@/config/payments"

const sampleOrder = {
  orderId: "GO-1707392851000-4523",
  customerName: "Sarah Johnson",
  customerEmail: "sarah@example.com",
  items: [
    { name: "Premium Strawberries", quantity: 2, price: 12.99 },
    { name: "Golden Mangoes", quantity: 1, price: 8.99 },
    { name: "Organic Blueberries", quantity: 1, price: 14.99 },
  ],
  subtotal: 49.96,
  shipping: 5.00,
  tax: 4.996,
  total: 59.956,
  paymentMethodId: "paypal",
}

export default function EmailPreviewPage() {
  const [selectedPayment, setSelectedPayment] = useState<string>("paypal")
  const [showPreview, setShowPreview] = useState(false)

  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">📧 Payment Email Preview</h1>
            <p className="text-xl text-gray-600">See exactly what your customers receive after checkout</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            {/* Payment Method Selector */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(method => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedPayment(method.id)
                        setShowPreview(true)
                      }}
                      className={`w-full p-3 rounded-lg font-semibold transition-all text-left ${
                        selectedPayment === method.id
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {method.icon} {method.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Preview */}
            <div className="lg:col-span-3">
              {!showPreview ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-6xl mb-6">📧</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Preview</h3>
                  <p className="text-gray-600 mb-8">Click a payment method on the left to see a sample payment instruction email</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-emerald-600 text-white p-6 text-center">
                    <h3 className="text-xl font-bold">Payment Instructions Email</h3>
                    <p className="text-emerald-100 mt-2">Order #{sampleOrder.orderId} - ${sampleOrder.total.toFixed(2)}</p>
                  </div>
                  <div className="p-8 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6 text-sm text-gray-700">
                      <p className="mb-4"><strong>Subject:</strong> 🍎 Payment Instructions - Order #{sampleOrder.orderId}</p>
                      <div className="border-t pt-4 mt-4">
                        <p className="mb-4">Hi {sampleOrder.customerName},</p>
                        <p className="mb-6">Thank you for your order! Your fresh tropical fruits are being prepared with care. Please complete your payment using the method below.</p>
                        <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
                          <p className="font-bold mb-3">{PAYMENT_METHODS.find(m => m.id === selectedPayment)?.name}</p>
                          <div className="space-y-2 text-xs font-mono bg-white p-3 rounded border border-gray-200">
                            <p>Order Total: ${sampleOrder.total.toFixed(2)}</p>
                            <p>Items: {sampleOrder.items.length} product(s)</p>
                            <p>Order ID: {sampleOrder.orderId}</p>
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
                          <p className="font-bold mb-2">Order Details</p>
                          {sampleOrder.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.name} x{item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between font-bold">
                            <span>Total</span>
                            <span>${sampleOrder.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Need help? Contact us at freshtropicsasianfruits@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Highlight */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">Payment details sent securely via email. Never displayed publicly on the website.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clear Instructions</h3>
              <p className="text-gray-600">Each payment method includes specific, easy-to-follow payment instructions tailored to that method.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Order Info</h3>
              <p className="text-gray-600">Full order summary, delivery address, and customer support contact information included.</p>
            </div>
          </div>

          {/* Integration Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mt-12 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Ready to Integrate Email Sending?</h3>
            <p className="text-gray-700 mb-6">The email system is fully configured and ready. To send real emails, integrate with:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Resend</p>
                <p className="text-sm text-gray-600">Easiest option. React-email compatible.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">SendGrid</p>
                <p className="text-sm text-gray-600">Most popular. Excellent documentation.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Nodemailer</p>
                <p className="text-sm text-gray-600">Self-hosted. Full control.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
