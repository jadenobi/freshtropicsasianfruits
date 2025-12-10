"use client"

import PageLayout from "@/components/PageLayout"
import FreeShippingBanner from "@/components/FreeShippingBanner"
import CheckoutForm from "@/components/CheckoutForm"
import OrderSummary from "@/components/OrderSummary"
import { useCart } from "@/lib/cart"
import { PAYMENT_METHODS } from "@/config/payments"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()
  const [checkoutStep, setCheckoutStep] = useState("review") // review, shipping, payment, confirm
  const [selectedPayment, setSelectedPayment] = useState("stripe")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [deliveryGuarantee, setDeliveryGuarantee] = useState(true)

  // Scroll to top when checkout step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [checkoutStep])

  const MINIMUM_ORDER = 120
  const FREE_SHIPPING_THRESHOLD = 286
  const subtotal = total
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const deliveryGuaranteeCharge = deliveryGuarantee ? 2.25 : 0
  const finalTotal = subtotal + shipping + tax + deliveryGuaranteeCharge
  const belowMinimum = subtotal < MINIMUM_ORDER

  const generateOrderNumber = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    return `GO-${timestamp}-${random}`.substring(0, 16)
  }

  const handleSubmitPayment = async () => {
    if (!customerName || !customerEmail) {
      alert("Please fill in your name and email")
      return
    }

    const newOrderNumber = generateOrderNumber()
    
    try {
      // Call the API to send payment email
      const response = await fetch("/api/send-payment-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: newOrderNumber,
          customerEmail,
          customerName,
          items: items.map(i => ({ name: i.name, quantity: i.cartQuantity, price: i.price })),
          subtotal,
          shipping,
          tax,
          total: finalTotal,
          paymentMethodId: selectedPayment
        })
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setOrderNumber(newOrderNumber)
      setShowConfirmation(true)
      
      // Clear cart after confirmation
      setTimeout(() => {
        clearCart()
      }, 500)
    } catch (error) {
      console.error("Payment error:", error)
      alert("Failed to process payment. Please try again.")
    }
  }

  if (showConfirmation) {
    return (
      <PageLayout>
        <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-2xl p-12 text-center">
              <div className="text-6xl mb-6 animate-bounce">✓</div>
              <h1 className="text-4xl font-black text-gray-900 mb-4">Order Confirmed!</h1>
              <div className="bg-emerald-50 p-6 rounded-lg mb-6 border-2 border-emerald-200">
                <p className="text-2xl font-black text-emerald-600 mb-2">Order #{orderNumber}</p>
                <p className="text-gray-700 mb-4">Thank you for your order, {customerName}!</p>
                <p className="text-lg font-bold text-gray-900 mb-2">Total Due: ${finalTotal.toFixed(2)}</p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                <p className="text-lg font-bold text-blue-900 mb-3">📧 Check Your Email</p>
                <p className="text-gray-700 mb-2">We've sent detailed payment instructions to:</p>
                <p className="font-mono text-lg text-blue-600 mb-4">{customerEmail}</p>
                <p className="text-sm text-gray-600">The email includes:</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>✓ Payment method details</li>
                  <li>✓ Order summary & total amount</li>
                  <li>✓ Security & verification info</li>
                  <li>✓ Tracking number once paid</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Important:</strong> Keep that email safe! It contains your payment details. Never share it with anyone.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-gray-600 mb-6">What happens next?</p>
                <div className="text-left space-y-3 bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <p className="font-bold text-gray-900">Send Payment</p>
                      <p className="text-sm text-gray-600">Follow the instructions in your email</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <p className="font-bold text-gray-900">We Verify Payment</p>
                      <p className="text-sm text-gray-600">Usually within 1-2 hours</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <p className="font-bold text-gray-900">Order Ships</p>
                      <p className="text-sm text-gray-600">Packed and shipped within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl">4️⃣</span>
                    <div>
                      <p className="font-bold text-gray-900">Delivery</p>
                      <p className="text-sm text-gray-600">Fresh fruits arrive in 1-2 business days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/" className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-all">
                  Back to Home
                </Link>
                <Link href="/shop" className="border-2 border-emerald-600 text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-all">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <FreeShippingBanner currentTotal={subtotal} freeShippingThreshold={FREE_SHIPPING_THRESHOLD} />
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <Link href="/shop" className="text-emerald-600 hover:text-emerald-700 font-semibold mb-3 md:mb-4 inline-block text-sm md:text-base">← Continue Shopping</Link>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900">Secure Checkout</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl md:text-6xl mb-4">🛒</div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <Link href="/shop" className="bg-emerald-600 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-emerald-700 transition-all inline-block text-sm md:text-base">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Checkout */}
              <div className="lg:col-span-2">
                {/* Step Indicators */}
                <div className="flex gap-2 mb-8 md:mb-12 overflow-x-auto pb-4">
                  {["review", "shipping", "payment"].map((step, idx) => (
                    <button 
                      key={step}
                      onClick={() => setCheckoutStep(step)}
                      className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold whitespace-nowrap text-sm md:text-base transition-all ${
                        checkoutStep === step 
                          ? "bg-emerald-600 text-white" 
                          : "bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-600"
                      }`}
                    >
                      {idx + 1}. {step.charAt(0).toUpperCase() + step.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Review Step */}
                {checkoutStep === "review" && (
                  <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                    
                    {belowMinimum && (
                      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
                        <p className="text-red-800 font-bold mb-2">⚠️ Minimum Order Not Met</p>
                        <p className="text-red-700">Add ${(MINIMUM_ORDER - subtotal).toFixed(2)} more to your cart to reach the minimum order of ${MINIMUM_ORDER}</p>
                      </div>
                    )}
                    
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b last:border-b-0">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                          <p className="text-gray-600">{item.category}</p>
                          <p className="font-semibold text-emerald-600 mt-2">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center border-3 border-emerald-600 bg-white rounded-lg gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.cartQuantity - 1))}
                              className="px-4 py-3 text-gray-900 font-black text-xl hover:bg-gray-100 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-12 text-center font-black text-lg text-gray-900 bg-white">{item.cartQuantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                              className="px-4 py-3 text-gray-900 font-black text-xl hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-2xl font-black text-gray-900">${(item.price * item.cartQuantity).toFixed(2)}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        if (belowMinimum) {
                          alert(`Minimum order is $${MINIMUM_ORDER}. Please add $${(MINIMUM_ORDER - subtotal).toFixed(2)} more to your cart.`)
                          return
                        }
                        setCheckoutStep("shipping")
                      }}
                      disabled={belowMinimum}
                      className={`w-full font-bold py-3 rounded-lg transition-all mt-6 ${
                        belowMinimum 
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {belowMinimum ? `Add $${(MINIMUM_ORDER - subtotal).toFixed(2)} More (Min: $${MINIMUM_ORDER})` : "Continue to Shipping →"}
                    </button>
                  </div>
                )}

                {/* Shipping Step */}
                {checkoutStep === "shipping" && (
                  <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="px-4 py-4 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base" />
                        <input type="text" placeholder="Last Name" className="px-4 py-4 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base" />
                      </div>
                      <input type="email" placeholder="Email Address" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full px-4 py-4 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base" />
                      <input type="text" placeholder="Street Address" className="w-full px-4 py-4 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base" />
                      <div className="grid grid-cols-3 gap-4">
                        <input type="text" placeholder="City" className="col-span-2 px-4 py-4 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base" />
                        <input type="text" placeholder="ZIP" className="col-span-1 px-4 py-4 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base" />
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg border-2 border-emerald-300">
                        <p className="text-sm font-bold text-emerald-900">✓ Free shipping on orders over $50</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setCheckoutStep("review")}
                        className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        ← Back
                      </button>
                      <button 
                        onClick={() => setCheckoutStep("payment")}
                        className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-all"
                      >
                        Continue to Payment →
                      </button>
                    </div>
                  </div>
                )}

                {/* Payment Method Selection */}
                {checkoutStep === "payment" && (
                  <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>
                    <p className="text-gray-600 mb-6">Select your preferred payment method. You'll receive secure payment instructions via email.</p>
                    
                    <div className="space-y-4">
                      {PAYMENT_METHODS.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPayment === method.id
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-gray-300 bg-white hover:border-emerald-300"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedPayment === method.id ? "border-emerald-600" : "border-gray-300"
                            }`}>
                              {selectedPayment === method.id && <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{method.icon}</span>
                                <h3 className="font-bold text-lg text-gray-900">{method.name}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>🔒 Secure & Private:</strong> Your payment details are sent only to you via email. Never shared publicly.
                      </p>
                    </div>

                    {/* Delivery Guarantee Section (compact) */}
                    <div className="bg-white rounded-xl border border-emerald-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4 flex-1">
                          {/* Shield Icon */}
                          <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg flex-shrink-0">
                            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          
                          {/* Title and Price */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Fresh Tropics Delivery Guarantee
                            </h3>
                            <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                              +$2.25
                            </p>
                          </div>
                        </div>

                        {/* Toggle Switch - compact & accessible */}
                        <div className="flex flex-col items-center gap-2 flex-shrink-0">
                          <button
                            aria-pressed={deliveryGuarantee}
                            title={deliveryGuarantee ? 'Delivery Guarantee on' : 'Delivery Guarantee off'}
                            onClick={() => setDeliveryGuarantee(!deliveryGuarantee)}
                            className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-1 ${
                              deliveryGuarantee ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                              deliveryGuarantee ? 'translate-x-4' : 'translate-x-1'
                            }`} />
                          </button>
                          <span className={`text-sm font-semibold ${deliveryGuarantee ? 'text-emerald-600' : 'text-gray-500'}`}>
                            {deliveryGuarantee ? 'ON' : 'OFF'}
                          </span>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-3 border border-emerald-200 mb-4">
                        <p className="text-gray-800 leading-relaxed text-center font-medium">
                          Get peace of mind with Delivery Guarantee in case your delivery is damaged, stolen, or lost during transit.
                        </p>
                      </div>

                      {/* Benefits Grid */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-2">
                            <span className="text-sm font-bold text-emerald-600">✓</span>
                          </div>
                          <p className="text-xs font-medium text-gray-700">Full Coverage</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-2">
                            <span className="text-sm font-bold text-emerald-600">✓</span>
                          </div>
                          <p className="text-xs font-medium text-gray-700">Fast Resolution</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-2">
                            <span className="text-sm font-bold text-emerald-600">✓</span>
                          </div>
                          <p className="text-xs font-medium text-gray-700">Zero Hassle</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setCheckoutStep("shipping")}
                        className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        ← Back
                      </button>
                      <button 
                        onClick={() => {
                          if (!customerName || !customerEmail) {
                            alert("Please fill in your name and email first")
                            setCheckoutStep("shipping")
                            return
                          }
                          handleSubmitPayment()
                        }}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg"
                      >
                        Send Me Payment Details
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-8 sticky top-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  {belowMinimum && (
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 mb-6">
                      <p className="text-sm text-yellow-800 font-bold">Minimum Order: ${MINIMUM_ORDER}</p>
                      <p className="text-sm text-yellow-700 mt-1">Need ${(MINIMUM_ORDER - subtotal).toFixed(2)} more</p>
                    </div>
                  )}
                  
                  <div className="space-y-4 pb-6 border-b-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({items.length} items)</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? <span className="text-green-600">FREE ✓</span> : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    {deliveryGuarantee && (
                      <div className="flex justify-between text-gray-700">
                        <span>Delivery Guarantee</span>
                        <span className="font-semibold text-emerald-600">${deliveryGuaranteeCharge.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="py-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total Due</span>
                      <span className="text-3xl font-black text-emerald-600">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {checkoutStep === "payment" && (
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg mb-6 border-2 border-emerald-200">
                      <p className="text-sm font-bold text-emerald-900 mb-2">📧 Next Step:</p>
                      <p className="text-xs text-emerald-800">Check your email for secure payment details</p>
                    </div>
                  )}

                  <div className="space-y-2 text-xs text-gray-600">
                    <p className="flex items-center gap-2"><span>✓</span> Free returns within 30 days</p>
                    <p className="flex items-center gap-2"><span>✓</span> Freshness guaranteed</p>
                    <p className="flex items-center gap-2"><span>✓</span> 24/7 customer support</p>
                    <p className="flex items-center gap-2"><span>✓</span> Secure email payment</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
