'use client'

import { CartItem } from '@/types'

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  deliveryGuarantee?: number
  discounts?: number
}

export default function OrderSummary({ 
  items, 
  subtotal, 
  shipping, 
  tax, 
  deliveryGuarantee = 0,
  discounts = 0
}: OrderSummaryProps) {
  const total = subtotal + shipping + tax + deliveryGuarantee - discounts

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border-3 border-gray-200 rounded-xl p-6 shadow-md sticky top-4">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-3 mb-6 max-h-48 overflow-y-auto border-b-2 border-gray-200 pb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{item.name}</p>
              <p className="text-xs text-gray-600">Qty: {item.cartQuantity}</p>
            </div>
            <p className="font-black text-emerald-600 text-sm">
              ${(item.price * item.cartQuantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700 font-semibold">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {discounts > 0 && (
          <div className="flex justify-between text-green-600 font-black">
            <span>Discount</span>
            <span>-${discounts.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700 font-semibold">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'text-green-600 font-black' : ''}>
            {shipping === 0 ? '🎉 FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-700 font-semibold">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {deliveryGuarantee > 0 && (
          <div className="flex justify-between text-gray-700 font-semibold">
            <span>Delivery Guarantee</span>
            <span>${deliveryGuarantee.toFixed(2)}</span>
          </div>
        )}

        {/* Total */}
        <div className="border-t-3 border-gray-300 pt-3 mt-3 flex justify-between">
          <span className="text-xl font-black text-gray-900">Total</span>
          <span className="text-3xl font-black text-emerald-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-6 space-y-2 bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
        <p className="text-xs font-bold text-gray-600 uppercase">Order Includes:</p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>✓ Free Shipping on orders over $286</li>
          <li>✓ 100% Fresh Fruit Guarantee</li>
          <li>✓ 24-48 hour delivery</li>
          <li>✓ Track your order in real-time</li>
        </ul>
      </div>
    </div>
  )
}
