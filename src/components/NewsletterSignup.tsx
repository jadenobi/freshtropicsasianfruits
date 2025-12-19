'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  variant?: 'default' | 'footer' | 'banner'
  placeholder?: string
}

export default function NewsletterSignup({ variant = 'default', placeholder = 'Enter your email...' }: NewsletterSignupProps) {
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
      // Get existing subscribers
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]')
      
      // Check if already subscribed
      if (subscribers.includes(email)) {
        setStatus('error')
        setMessage('This email is already subscribed!')
        return
      }

      // Add new subscriber
      subscribers.push(email)
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers))
      
      setStatus('success')
      setMessage(`Welcome to Fresh Tropics! We'll send you exclusive deals and updates.`)
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

  if (variant === 'footer') {
    return (
      <div className="w-full">
        <h3 className="text-lg font-black text-white mb-4">📧 Newsletter</h3>
        <p className="text-amber-50 text-sm mb-4">Get exclusive offers and fresh fruit updates delivered to your inbox</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-amber-400 bg-white text-gray-900 font-bold placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-base"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-3 bg-amber-400 text-emerald-900 font-black rounded-lg hover:bg-amber-300 disabled:bg-gray-400 transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </div>
          {message && (
            <p className={`text-sm font-bold ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-black text-emerald-900 mb-3">🍌 Join Our Newsletter 🥭</h2>
        <p className="text-emerald-800 font-semibold mb-6 text-lg">Get exclusive tropical fruit deals, recipes, and updates straight to your inbox!</p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 rounded-lg border-3 border-emerald-600 bg-white text-gray-900 font-bold placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 text-lg"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-black rounded-lg disabled:bg-gray-400 transition-all text-lg whitespace-nowrap"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </div>
          {message && (
            <p className={`text-sm font-bold ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    )
  }

  // Default variant (compact)
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-emerald-400 bg-white text-gray-900 font-bold placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-base"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-emerald-600 text-white font-black rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p className={`text-sm mt-2 font-bold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
