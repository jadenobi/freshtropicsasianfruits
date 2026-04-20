"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, CreditCard, Send, ArrowLeft, Loader2, Info } from "lucide-react"

function VerifyPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get("order") || ""
  const amountParam = searchParams.get("amount") || ""

  const [formData, setFormData] = useState({
    orderId: orderIdParam,
    transactionId: "",
    customerName: "",
    customerEmail: "",
    paymentMethod: "Zelle",
    amount: amountParam,
    notes: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        })
      })

      if (response.ok) {
        setIsSuccess(true)
        window.scrollTo(0, 0)
      } else {
        const data = await response.json()
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-emerald-100 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Sent!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for submitting your payment details. Our team will verify your transaction 
            <span className="font-bold text-emerald-600"> Order #{formData.orderId}</span> shortly. 
            You will receive a confirmation email once your order is processed.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-emerald-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-10 text-white">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Payment Verification</h1>
            </div>
            <p className="text-emerald-50 opacity-90 leading-relaxed font-light">
              Submit your payment details below so we can verify your order and begin preparing your fresh fruits for shipment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Order Number
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. FT-12345"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Amount Paid ($)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                Transaction ID / Reference Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="From your bank or payment app"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
              />
              <p className="text-[10px] text-gray-400 mt-1">Found in your Zelle, Venmo, or CashApp confirmation screen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Your Full Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="As it appears on your account"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Payment Method</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none appearance-none bg-no-repeat bg-[right_1rem_center]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundSize: '1.2em' }}
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option>Zelle</option>
                <option>Venmo</option>
                <option>CashApp</option>
                <option>PayPal</option>
                <option>Apple Pay</option>
                <option>Crypto</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Anything else we should know?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Verification</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-amber-50 rounded-2xl p-4 flex items-start space-x-3 border border-amber-100">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-bold uppercase tracking-wider block mb-1">Privacy Notice</span>
                Your payment details are sent via encrypted connection directly to our verification team. 
                Standard verification time is 1-4 hours during business hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading verification form...</p>
        </div>
      </div>
    }>
      <VerifyPaymentContent />
    </Suspense>
  )
}
