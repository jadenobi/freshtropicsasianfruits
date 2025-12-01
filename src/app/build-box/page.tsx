'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FRUITS } from '@/lib/data'
import { useCart } from '@/context/CartContext'

interface BoxItem {
  productId: string
  quantity: number
  name: string
  price: number
}

const BOX_SIZES = [
  { id: 'small', name: 'Small Box', capacity: 3, basePrice: 0 },
  { id: 'medium', name: 'Medium Box', capacity: 6, basePrice: 5 },
  { id: 'large', name: 'Large Box', capacity: 12, basePrice: 10 }
]

export default function BuildYourOwnBox() {
  const { addToCart } = useCart()
  const [selectedBox, setSelectedBox] = useState('medium')
  const [selectedItems, setSelectedItems] = useState<BoxItem[]>([])
  const [isCustomizing, setIsCustomizing] = useState(true)
  const [boxName, setBoxName] = useState('')

  const currentBox = BOX_SIZES.find(b => b.id === selectedBox)!
  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const itemsTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalPrice = itemsTotal + currentBox.basePrice

  const categories = useMemo(() => {
    const cats = new Set(FRUITS.map(f => f.category))
    return Array.from(cats).sort()
  }, [])

  const addItem = (product: typeof FRUITS[0]) => {
    if (itemCount >= currentBox.capacity) return

    setSelectedItems(prev => {
      const existing = prev.find(item => item.productId === product.id.toString())
      if (existing) {
        return prev.map(item =>
          item.productId === product.id.toString()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, {
        productId: product.id.toString(),
        quantity: 1,
        name: product.name,
        price: product.price
      }]
    })
  }

  const removeItem = (productId: string) => {
    setSelectedItems(prev => prev.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const totalWithoutThis = itemCount - (selectedItems.find(i => i.productId === productId)?.quantity || 0)
    if (totalWithoutThis + quantity > currentBox.capacity) return

    setSelectedItems(prev => prev.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    ))
  }

  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one fruit for your box')
      return
    }

    const customBox = {
      id: `custom-box-${Date.now()}`,
      name: boxName || `${currentBox.name} - Custom Selection`,
      image: FRUITS[0].image,
      category: 'custom-box',
      price: totalPrice,
      originalPrice: totalPrice + 5,
      rating: 5,
      reviews: 0,
      inStock: true,
      description: `Custom ${currentBox.name} with ${selectedItems.length} selected fruits`,
      items: selectedItems
    }

    addToCart(customBox as any, 1)
    setSelectedItems([])
    setBoxName('')
    alert('✓ Your custom fruit box has been added to cart!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-emerald-900 mb-4">🎁 Build Your Own Box</h1>
          <p className="text-lg text-gray-600">Create the perfect tropical fruit box with your favorite selections</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Selection Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Box Size Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-emerald-100">
              <h2 className="text-2xl font-black text-emerald-900 mb-6">Step 1: Choose Your Box Size</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {BOX_SIZES.map(box => (
                  <button
                    key={box.id}
                    onClick={() => {
                      setSelectedBox(box.id)
                      setSelectedItems([])
                    }}
                    className={`p-6 rounded-xl border-2 transition-all font-bold ${
                      selectedBox === box.id
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">{box.capacity === 3 ? '📦' : box.capacity === 6 ? '📫' : '📦📦'}</div>
                    <p className="text-lg">{box.name}</p>
                    <p className="text-sm text-gray-600">{box.capacity} items max</p>
                    {box.basePrice > 0 && <p className="text-emerald-600 font-black">+${box.basePrice}</p>}
                  </button>
                ))}
              </div>
            </div>

            {/* Fruit Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-emerald-100">
              <h2 className="text-2xl font-black text-emerald-900 mb-6">Step 2: Select Your Fruits</h2>
              <p className="text-gray-600 mb-6">Space used: {itemCount}/{currentBox.capacity}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all"
                  style={{ width: `${(itemCount / currentBox.capacity) * 100}%` }}
                />
              </div>

              <div className="space-y-6">
                {categories.map(category => {
                  const categoryFruits = FRUITS.filter(f => f.category === category && f.inStock)
                  return (
                    <div key={category}>
                      <h3 className="text-lg font-bold text-gray-800 capitalize mb-3">{category}</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {categoryFruits.slice(0, 4).map(fruit => (
                          <button
                            key={fruit.id}
                            onClick={() => addItem(fruit)}
                            disabled={itemCount >= currentBox.capacity}
                            className="p-3 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
                          >
                            <p className="font-bold text-gray-900">{fruit.name}</p>
                            <p className="text-sm text-gray-600">${fruit.price.toFixed(2)}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            {/* Box Summary */}
            <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-black mb-6">Your Box</h3>

              {/* Box Size Info */}
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                <p className="text-sm opacity-90 mb-1">Box Size</p>
                <p className="text-xl font-bold">{currentBox.name}</p>
                <p className="text-sm opacity-90">Capacity: {itemCount}/{currentBox.capacity}</p>
              </div>

              {/* Items List */}
              {selectedItems.length > 0 ? (
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {selectedItems.map(item => (
                    <div key={item.productId} className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs opacity-75">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded text-xs font-bold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded text-xs font-bold"
                          disabled={itemCount >= currentBox.capacity}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-300 hover:text-red-100 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm opacity-75 mb-6 text-center py-6">Select fruits to build your box</p>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-white border-opacity-30 pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fruits:</span>
                  <span>${itemsTotal.toFixed(2)}</span>
                </div>
                {currentBox.basePrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Box:</span>
                    <span>${currentBox.basePrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-black border-t border-white border-opacity-30 pt-2">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Custom Box Name */}
              <input
                type="text"
                value={boxName}
                onChange={(e) => setBoxName(e.target.value)}
                placeholder="Name your box (optional)"
                className="w-full px-4 py-2 rounded-lg mb-4 text-gray-900 placeholder-gray-500 text-sm"
              />

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={selectedItems.length === 0}
                className="w-full bg-white text-emerald-600 font-black py-3 rounded-lg hover:bg-gray-50 disabled:bg-gray-300 disabled:text-gray-500 transition-all"
              >
                {selectedItems.length > 0 ? '🛒 Add to Cart' : 'Select fruits to continue'}
              </button>

              <Link
                href="/shop"
                className="block text-center mt-3 text-sm font-bold opacity-80 hover:opacity-100 transition-opacity"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Info Box */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <p className="text-sm font-semibold text-amber-900 mb-3">💡 Tips:</p>
              <ul className="text-xs text-amber-800 space-y-2">
                <li>✓ Mix and match any fruits</li>
                <li>✓ Adjust quantities easily</li>
                <li>✓ Add a custom name to gift</li>
                <li>✓ Get free shipping on all boxes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
