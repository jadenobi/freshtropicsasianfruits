'use client'

import { useState } from 'react'

interface Address {
  fullName: string
  email: string
  phone: string
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface CheckoutFormProps {
  onSubmit: (address: Address) => void
  disabled?: boolean
  savedAddresses?: Address[]
}

export default function CheckoutForm({ onSubmit, disabled = false, savedAddresses = [] }: CheckoutFormProps) {
  const [address, setAddress] = useState<Address>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })

  const [useSaved, setUseSaved] = useState(false)
  const [selectedSaved, setSelectedSaved] = useState<number | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!address.fullName.trim()) newErrors.fullName = 'Name is required'
    if (!address.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) newErrors.email = 'Invalid email'
    
    if (!address.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10,}$/.test(address.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number'
    
    if (!address.street.trim()) newErrors.street = 'Street address is required'
    if (!address.city.trim()) newErrors.city = 'City is required'
    if (!address.state.trim()) newErrors.state = 'State is required'
    if (!address.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) newErrors.zipCode = 'Invalid ZIP code'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (useSaved && selectedSaved !== null && savedAddresses[selectedSaved]) {
      onSubmit(savedAddresses[selectedSaved])
    } else if (validateForm()) {
      onSubmit(address)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (useSaved && selectedSaved !== null && savedAddresses[selectedSaved]) {
    const saved = savedAddresses[selectedSaved]
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
          <h3 className="font-black text-lg text-gray-900 mb-4">Shipping to:</h3>
          <div className="space-y-2 text-gray-700">
            <p className="font-bold">{saved.fullName}</p>
            <p>{saved.street} {saved.apartment && `Apt ${saved.apartment}`}</p>
            <p>{saved.city}, {saved.state} {saved.zipCode}</p>
            <p className="text-sm text-gray-600">{saved.email} • {saved.phone}</p>
          </div>
          
          <button
            type="button"
            onClick={() => setUseSaved(false)}
            className="mt-4 text-emerald-600 font-semibold text-sm hover:underline"
          >
            Use different address
          </button>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-all text-lg"
        >
          Continue to Payment
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div className="border-2 border-amber-200 bg-amber-50 rounded-lg p-4 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useSaved}
              onChange={(e) => {
                setUseSaved(e.target.checked)
                if (e.target.checked && selectedSaved === null) setSelectedSaved(0)
              }}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="font-bold text-gray-900">Use saved address</span>
          </label>
          
          {useSaved && (
            <div className="mt-4 space-y-2">
              {savedAddresses.map((addr, idx) => (
                <label key={idx} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-white">
                  <input
                    type="radio"
                    checked={selectedSaved === idx}
                    onChange={() => setSelectedSaved(idx)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    {addr.fullName} • {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {!useSaved && (
        <>
          {/* Name and Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-900 mb-2 text-sm">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full border-3 ${errors.fullName ? 'border-red-500' : 'border-emerald-600'} rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {errors.fullName && <p className="text-red-600 text-xs font-bold mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block font-bold text-gray-900 mb-2 text-sm">Email *</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full border-3 ${errors.email ? 'border-red-500' : 'border-emerald-600'} rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {errors.email && <p className="text-red-600 text-xs font-bold mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-bold text-gray-900 mb-2 text-sm">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className={`w-full border-3 ${errors.phone ? 'border-red-500' : 'border-emerald-600'} rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
            {errors.phone && <p className="text-red-600 text-xs font-bold mt-1">{errors.phone}</p>}
          </div>

          {/* Street Address */}
          <div>
            <label className="block font-bold text-gray-900 mb-2 text-sm">Street Address *</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="123 Main Street"
              className={`w-full border-3 ${errors.street ? 'border-red-500' : 'border-emerald-600'} rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
            {errors.street && <p className="text-red-600 text-xs font-bold mt-1">{errors.street}</p>}
          </div>

          {/* Apartment/Suite */}
          <div>
            <label className="block font-bold text-gray-900 mb-2 text-sm">Apartment, Suite, etc. (Optional)</label>
            <input
              type="text"
              name="apartment"
              value={address.apartment || ''}
              onChange={handleChange}
              placeholder="Apt 4B"
              className="w-full border-3 border-emerald-600 rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-gray-900 mb-2 text-sm">City *</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="New York"
                className={`w-full border-3 ${errors.city ? 'border-red-500' : 'border-emerald-600'} rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {errors.city && <p className="text-red-600 text-xs font-bold mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block font-bold text-gray-900 mb-2 text-sm">State *</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="NY"
                className={`w-full border-3 ${errors.state ? 'border-red-500' : 'border-emerald-600'} rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase`}
              />
              {errors.state && <p className="text-red-600 text-xs font-bold mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block font-bold text-gray-900 mb-2 text-sm">ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                placeholder="10001"
                className={`w-full border-3 ${errors.zipCode ? 'border-red-500' : 'border-emerald-600'} rounded-lg px-4 py-4 font-bold bg-white placeholder-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {errors.zipCode && <p className="text-red-600 text-xs font-bold mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-emerald-600 text-white font-black py-4 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-all text-lg"
      >
        Continue to Payment
      </button>
    </form>
  )
}
