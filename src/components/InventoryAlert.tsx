'use client'

import { useState } from 'react'

interface InventoryAlertProps {
  productId: string
  productName: string
}

export default function InventoryAlert({ productId, productName }: InventoryAlertProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    try {
      // Get existing alerts
      const alerts = JSON.parse(localStorage.getItem('inventory_alerts') || '[]')
      
      // Check if already subscribed to this product
      const existingAlert = alerts.find((a: any) => a.productId === productId && a.email === email)
      if (existingAlert) {
        setStatus('error')
        setMessage('You are already subscribed to alerts for this product')
        return
      }

      // Add new alert
      alerts.push({
        productId,
        productName,
        email,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('inventory_alerts', JSON.stringify(alerts))
      
      setStatus('success')
      setMessage('✓ We will notify you when this item is back in stock!')
      setEmail('')
      
      // Reset message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-orange-900 mb-2">🔔 Out of Stock</h3>
      <p className="text-orange-800 text-sm mb-4">
        Be the first to know when this item is back in stock! Enter your email below.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:bg-gray-400 transition-colors whitespace-nowrap"
          >
            {status === 'loading' ? '...' : status === 'success' ? '✓ Subscribed' : 'Notify Me'}
          </button>
        </div>
        {message && (
          <p className={`text-sm font-semibold ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
