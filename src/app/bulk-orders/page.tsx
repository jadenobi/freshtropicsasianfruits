'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import { FRUITS } from '@/lib/data'

interface BulkOrderItem {
  productId: string
  productName: string
  price: number
  quantity: number
}

const VOLUME_TIERS = [
  { min: 1, max: 9, discount: 0, label: 'Retail' },
  { min: 10, max: 19, discount: 0.05, label: 'Bulk (5% OFF)' },
  { min: 20, max: 49, discount: 0.10, label: 'Wholesale (10% OFF)' },
  { min: 50, max: 99, discount: 0.15, label: 'Large Order (15% OFF)' },
  { min: 100, max: Infinity, discount: 0.20, label: 'Corporate (20% OFF)' }
]

export default function BulkOrdersPage() {
  const [selectedProducts, setSelectedProducts] = useState<BulkOrderItem[]>([])
  const [companyName, setCompanyName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // Calculate totals
  const calculations = useMemo(() => {
    const totalQuantity = selectedProducts.reduce((sum, item) => sum + item.quantity, 0)
    
    // Find the appropriate tier
    const tier = VOLUME_TIERS.find(t => totalQuantity >= t.min && totalQuantity <= t.max) || VOLUME_TIERS[0]
    
    const subtotal = selectedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discountAmount = subtotal * tier.discount
    const discountedSubtotal = subtotal - discountAmount
    const tax = discountedSubtotal * 0.08
    const shipping = totalQuantity > 50 ? 0 : Math.max(25, totalQuantity * 2)
    const total = discountedSubtotal + tax + shipping

    return {
      totalQuantity,
      tier,
      subtotal,
      discountAmount,
      discountedSubtotal,
      tax,
      shipping,
      total
    }
  }, [selectedProducts])

  const addProduct = (productId: string) => {
    const product = FRUITS.find(p => p.id === productId)
    if (!product) return

    const existingIndex = selectedProducts.findIndex(p => p.productId === productId)
    if (existingIndex > -1) {
      const updated = [...selectedProducts]
      updated[existingIndex].quantity += 10
      setSelectedProducts(updated)
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId,
          productName: product.name,
          price: product.price,
          quantity: 10
        }
      ])
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId)
      return
    }
    setSelectedProducts(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(item => item.productId !== productId))
  }

  const generateQuote = () => {
    if (!companyName || !contactEmail || selectedProducts.length === 0) {
      alert('Please fill in company name, email, and select products')
      return
    }

    const quoteContent = `
BULK ORDER QUOTE
================
Generated: ${new Date().toLocaleDateString()}

Company: ${companyName}
Contact: ${contactEmail}
Phone: ${contactPhone}

ORDER DETAILS:
${selectedProducts.map(item => 
  `${item.productName} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

Total Quantity: ${calculations.totalQuantity} units
Tier: ${calculations.tier.label}
Subtotal: $${calculations.subtotal.toFixed(2)}
Discount (${(calculations.tier.discount * 100).toFixed(0)}%): -$${calculations.discountAmount.toFixed(2)}
Subtotal After Discount: $${calculations.discountedSubtotal.toFixed(2)}
Tax (8%): $${calculations.tax.toFixed(2)}
Shipping: $${calculations.shipping.toFixed(2)}
TOTAL: $${calculations.total.toFixed(2)}

${deliveryDate ? `Requested Delivery: ${deliveryDate}` : ''}
${specialRequests ? `\nSpecial Requests:\n${specialRequests}` : ''}

This quote is valid for 30 days.
Contact us for final confirmation: sales@freshtropic.com
    `.trim()

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(quoteContent))
    element.setAttribute('download', `bulk-quote-${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    alert('Quote generated and downloaded!')
  }

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-emerald-900 mb-4">📦 Bulk Order Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Special pricing for wholesale, corporate, and large quantity orders. Get volume discounts starting at 10 units!
            </p>
          </div>

          {/* Volume Tier Info */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {VOLUME_TIERS.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  calculations.tier.min === tier.min
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-sm font-bold text-gray-600 mb-1">{tier.label}</div>
                <div className="text-xs text-gray-500 mb-2">{tier.min}-{tier.max === Infinity ? '+' : tier.max} units</div>
                <div className="text-2xl font-black text-emerald-600">{(tier.discount * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-600">discount</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Select Products</h2>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {FRUITS.slice(0, 30).map(product => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
                        <p className="text-emerald-600 font-bold text-sm">${product.price.toFixed(2)} each</p>
                      </div>
                      <button
                        onClick={() => addProduct(product.id)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all text-sm whitespace-nowrap ml-4"
                      >
                        Add to Order
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">👥 Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your company name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="contact@company.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Requested Delivery Date</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Special Requests</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Custom packaging, special handling, etc."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Order Summary</h2>

                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No products selected</p>
                    <p className="text-sm text-gray-400">Add products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Selected Items */}
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {selectedProducts.map(item => (
                        <div key={item.productId} className="pb-3 border-b border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-sm text-gray-900 flex-1 pr-2 line-clamp-2">
                              {item.productName}
                            </h3>
                            <button
                              onClick={() => removeProduct(item.productId)}
                              className="text-red-500 hover:text-red-700 font-bold text-xs flex-shrink-0"
                            >
                              ✕
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 10)}
                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded font-bold text-xs hover:bg-gray-300"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                                className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-xs font-bold outline-none"
                              />
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 10)}
                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded font-bold text-xs hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-emerald-600 text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Qty:</span>
                        <span className="font-bold text-gray-900">{calculations.totalQuantity} units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tier:</span>
                        <span className="font-bold text-emerald-600">{calculations.tier.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-bold text-gray-900">${calculations.subtotal.toFixed(2)}</span>
                      </div>

                      {calculations.discountAmount > 0 && (
                        <div className="flex justify-between text-sm bg-emerald-50 px-2 py-1 rounded">
                          <span className="text-emerald-600 font-bold">Discount:</span>
                          <span className="font-bold text-emerald-600">
                            -${calculations.discountAmount.toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">After Discount:</span>
                        <span className="font-bold text-gray-900">${calculations.discountedSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (8%):</span>
                        <span className="font-bold text-gray-900">${calculations.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping:</span>
                        <span className={`font-bold ${calculations.shipping === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {calculations.shipping === 0 ? 'FREE' : `$${calculations.shipping.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="border-t-2 border-gray-200 pt-2 flex justify-between items-center">
                        <span className="font-black text-gray-900">TOTAL:</span>
                        <span className="font-black text-2xl text-emerald-600">${calculations.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={generateQuote}
                        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-lg"
                      >
                        📥 Download Quote
                      </button>
                      <button
                        onClick={() => setShowQuoteForm(!showQuoteForm)}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
                      >
                        ✉️ Send Request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">Orders over 50 units ship free. Standard delivery 3-5 business days.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Wholesale Support</h3>
              <p className="text-gray-600 text-sm">Dedicated account manager for orders over 100 units. Custom packaging available.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Personal Service</h3>
              <p className="text-gray-600 text-sm">Questions? Contact sales@freshtropic.com or call 1-800-FRUITS-1 for quotes.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
