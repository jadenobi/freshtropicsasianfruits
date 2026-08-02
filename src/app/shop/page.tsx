'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Leaf, Sun, Crown, Star, Activity, Zap, Heart, Trees, Palette, Circle } from 'lucide-react'
import { useCart } from '@/lib/cart'
import PageLayout from '@/components/PageLayout'
import FreeShippingBanner from '@/components/FreeShippingBanner'
import LoyaltyRewardsPanel from '@/components/LoyaltyRewardsPanel'
import ProductCard from '@/components/ProductCard'
import { ProductService } from '@/lib/productService'

function ShopContent() {
  const searchParams = useSearchParams()
  const { total } = useCart()
  const categoryParam = searchParams?.get('category') || 'all'
  const collectionParam = searchParams?.get('collection') || null
  const qParam = searchParams?.get('q') || ''
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState(qParam)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedNutrition, setSelectedNutrition] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string>('all')
  const [selectedPlantTypes, setSelectedPlantTypes] = useState<string[]>([])

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  useEffect(() => {
    if (qParam) setSearchQuery(qParam)
  }, [qParam])

  // Dynamically generated categories
  const categories = useMemo(() => {
    const allProducts = ProductService.getAllProducts();
    const uniqueCats = new Set<string>(allProducts.map(p => p.category as string));
    const catArray = [{ id: 'all', label: 'All Products' }];
    
    // Add specific featured categories first
    if (uniqueCats.has('pinkglow')) {
      catArray.push({ id: 'pinkglow', label: 'Pink Glow Pineapple' });
      uniqueCats.delete('pinkglow');
    }
    
    uniqueCats.forEach(c => {
      if (c && c !== 'exotic') {
        catArray.push({ id: c, label: c.charAt(0).toUpperCase() + c.slice(1) });
      } else if (c === 'exotic') {
        catArray.push({ id: c, label: 'Exotic & Trees' });
      }
    });
    return catArray;
  }, []);

  // Tag filters
  const availableTags = [
    { id: 'organic', label: 'Organic', icon: <Leaf size={16} className="inline mr-2" />, color: 'bg-green-100 text-green-800' },
    { id: 'seasonal', label: 'Seasonal', icon: <Sun size={16} className="inline mr-2" />, color: 'bg-amber-100 text-amber-800' },
    { id: 'premium', label: 'Premium', icon: <Crown size={16} className="inline mr-2" />, color: 'bg-purple-100 text-purple-800' },
    { id: 'bestseller', label: 'Bestseller', icon: <Star size={16} className="inline mr-2" />, color: 'bg-blue-100 text-blue-800' }
  ]

  // Nutrition benefits
  const nutritionFilters = [
    { id: 'vitamin-c', label: 'High Vitamin C', icon: <Activity size={16} className="inline mr-2" />, benefit: 'Immune Support' },
    { id: 'antioxidants', label: 'Antioxidants', icon: <Zap size={16} className="inline mr-2" />, benefit: 'Anti-aging' },
    { id: 'fiber', label: 'High Fiber', icon: <Trees size={16} className="inline mr-2" />, benefit: 'Digestive Health' },
    { id: 'potassium', label: 'Potassium', icon: <Heart size={16} className="inline mr-2" />, benefit: 'Heart Health' }
  ]

  // Color-based filtering
  const colorFilters = [
    { id: 'all', label: 'All Colors', icon: <Palette size={16} className="inline mr-2 text-gray-500" /> },
    { id: 'red', label: 'Red/Pink', icon: <Circle size={16} fill="currentColor" className="inline mr-2 text-red-500" /> },
    { id: 'yellow', label: 'Yellow/Golden', icon: <Circle size={16} fill="currentColor" className="inline mr-2 text-yellow-500" /> },
    { id: 'green', label: 'Green', icon: <Circle size={16} fill="currentColor" className="inline mr-2 text-green-500" /> },
    { id: 'orange', label: 'Orange', icon: <Circle size={16} fill="currentColor" className="inline mr-2 text-orange-500" /> },
    { id: 'purple', label: 'Purple', icon: <Circle size={16} fill="currentColor" className="inline mr-2 text-purple-500" /> }
  ]

  // Product color mapping (example - could be extended in data.ts)
  const getProductColor = (productName: string): string => {
    const name = productName.toLowerCase()
    if (name.includes('dragon') || name.includes('pink') || name.includes('red') || name.includes('pomegr') || name.includes('straw') || name.includes('cherry')) return 'red'
    if (name.includes('mango') || name.includes('golden') || name.includes('pineapple') || name.includes('banana') || name.includes('yellow')) return 'yellow'
    if (name.includes('avocado') || name.includes('green') || name.includes('lime') || name.includes('kiwi')) return 'green'
    if (name.includes('orange') || name.includes('peach') || name.includes('apricot') || name.includes('passion') || name.includes('papaya')) return 'orange'
    if (name.includes('grape') || name.includes('blueberry') || name.includes('purple') || name.includes('plum') || name.includes('acai')) return 'purple'
    return 'yellow'
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = ProductService.getAllProducts()

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'pinkglow') {
        products = products.filter(p => p.name.toLowerCase().includes('pinkglow'))
      } else {
        products = products.filter(p => p.category === selectedCategory)
      }
    }

    // Collection filter
    if (collectionParam) {
      if (collectionParam === 'bestsellers') {
        products = products.sort((a, b) => b.reviews - a.reviews).slice(0, 50)
      } else if (collectionParam === 'new') {
        products = products.slice(0, 30)
      } else if (collectionParam === 'sale') {
        products = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 50)
      } else if (collectionParam === 'toprated') {
        products = products.filter(p => p.rating >= 4.5).slice(0, 50)
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // Price filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Rating filter
    products = products.filter(p => p.rating >= minRating)

    // Tag filter
    if (selectedTags.length > 0) {
      products = products.filter(p => {
        const pName = p.name.toLowerCase()
        return selectedTags.some(tag => {
          if (tag === 'organic') return pName.includes('organic')
          if (tag === 'seasonal') return pName.includes('seasonal') || p.category === 'seasonal'
          if (tag === 'premium') return pName.includes('premium') || pName.includes('special')
          if (tag === 'bestseller') return p.reviews >= 100
          return false
        })
      })
    }

    // Nutrition filter
    if (selectedNutrition.length > 0) {
      products = products.filter(p => {
        const pName = p.name.toLowerCase()
        return selectedNutrition.some(nut => {
          if (nut === 'vitamin-c') return pName.includes('citrus') || pName.includes('berry') || pName.includes('pineapple') || pName.includes('mango')
          if (nut === 'antioxidants') return pName.includes('berry') || pName.includes('acai') || pName.includes('grape') || pName.includes('pomegr')
          if (nut === 'fiber') return pName.includes('berry') || pName.includes('pear') || pName.includes('apple') || pName.includes('kiwi')
          if (nut === 'potassium') return pName.includes('banana') || pName.includes('avocado') || pName.includes('mango')
          return false
        })
      })
    }

    // Color filter
    if (selectedColor !== 'all') {
      products = products.filter(p => getProductColor(p.name) === selectedColor)
    }

    // Plant Class filter for Trees/Shrubs
    if (selectedPlantTypes.length > 0) {
      products = products.filter(p => {
        return selectedPlantTypes.some(pt => {
          if (pt === 'trees') {
            return p.category !== 'fresh' && p.category !== 'organic' && p.category !== 'exotic' && p.category !== 'berries' && p.category !== 'apples' && p.category !== 'citrus';
          }
          return p.category === pt;
        });
      });
    }

    // Sorting
    if (sortBy === 'price-low') {
      products = [...products].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      products = [...products].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      products = [...products].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'newest') {
      products = [...products].reverse()
    }

    return products
  }, [selectedCategory, searchQuery, priceRange, minRating, sortBy, collectionParam, selectedTags, selectedNutrition, selectedColor, selectedPlantTypes])

  const maxPrice = Math.max(...ProductService.getAllProducts().map(p => p.price))

  return (
    <div className="bg-white">
      <FreeShippingBanner currentTotal={total} freeShippingThreshold={286} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-black">
              {collectionParam === 'bestsellers' ? ' Best Sellers' :
               collectionParam === 'new' ? ' New Arrivals' :
               collectionParam === 'sale' ? ' On Sale' :
               collectionParam === 'toprated' ? ' Top Rated' :
               selectedCategory === 'pinkglow' ? ' Pink Pineapple Collection' : 'Shop Our Fruits'}
            </h1>
            <p className="text-gray-600">
              Showing <span className="font-bold text-emerald-600">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
          >
             Filters
          </button>
        </div>

        {/* Collection Tabs - Prominent Display */}
        <div className="mb-8 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-4 border-2 border-emerald-200">
          <p className="text-sm font-semibold text-emerald-700 mb-3">Browse Collections:</p>
          <div className="flex flex-wrap gap-2">
            <Link 
              href="/shop" 
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                !collectionParam 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Products
            </Link>
            <Link 
              href="/shop?collection=bestsellers" 
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                collectionParam === 'bestsellers' 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
               Best Sellers
            </Link>
            <Link 
              href="/shop?collection=toprated" 
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                collectionParam === 'toprated' 
                  ? 'bg-yellow-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
               Top Rated
            </Link>
            <Link 
              href="/shop?collection=new" 
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                collectionParam === 'new' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
               New Arrivals
            </Link>
            <Link 
              href="/shop?collection=sale" 
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                collectionParam === 'sale' 
                  ? 'bg-pink-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
               On Sale
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6`}>
            {/* Search */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Search Products</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fruits..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-base"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Price Range</label>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Plant Class Multi-Select */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <label className="block text-sm font-black text-emerald-900 mb-3 flex items-center"><Trees size={18} className="mr-2" /> Plant Class (New!)</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {[
                  { id: 'trees', label: 'All Trees & Plants' },
                  { id: 'evergreen', label: 'Evergreen Trees' },
                  { id: 'shrubs', label: 'Shrubs & Bushes' },
                  { id: 'flowering', label: 'Flowering Trees' },
                  { id: 'shade', label: 'Shade Trees' },
                  { id: 'tropical', label: 'Tropical Plants' },
                  { id: 'perennials', label: 'Perennials' },
                  { id: 'indoor', label: 'Indoor Plants' },
                  { id: 'supplies', label: 'Garden Supplies' }
                ].map(pt => (
                  <label key={pt.id} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedPlantTypes.includes(pt.id)}
                      onChange={() => setSelectedPlantTypes(prev => 
                        prev.includes(pt.id) ? prev.filter(t => t !== pt.id) : [...prev, pt.id]
                      )}
                      className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 bg-white shadow-sm"
                    />
                    <span className="text-sm text-emerald-900 font-medium group-hover:text-emerald-700 transition-colors">{pt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Minimum Rating</label>
              <div className="space-y-2">
                {[0, 3, 3.5, 4, 4.5, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                      minRating === rating
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {rating === 0 ? 'All Ratings' : `${rating}+ `}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Color Profile</label>
              <div className="space-y-2">
                {colorFilters.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all font-medium text-sm ${
                      selectedColor === color.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {color.icon} {color.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filters */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Curated Tags</label>
              <div className="space-y-2">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedTags(prev =>
                      prev.includes(tag.id) ? prev.filter(t => t !== tag.id) : [...prev, tag.id]
                    )}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all font-medium text-sm ${
                      selectedTags.includes(tag.id)
                        ? `${tag.color} ring-2 ring-offset-2 ring-emerald-600`
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {tag.icon} {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nutrition Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Nutrition Benefits</label>
              <div className="space-y-2">
                {nutritionFilters.map(nut => (
                  <button
                    key={nut.id}
                    onClick={() => setSelectedNutrition(prev =>
                      prev.includes(nut.id) ? prev.filter(n => n !== nut.id) : [...prev, nut.id]
                    )}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all font-medium text-sm ${
                      selectedNutrition.includes(nut.id)
                        ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-400'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{nut.icon} {nut.label}</div>
                    <div className="text-xs opacity-75 font-normal ml-6">{nut.benefit}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchQuery('')
                setPriceRange([0, maxPrice])
                setMinRating(0)
                setSelectedTags([])
                setSelectedNutrition([])
                setSelectedColor('all')
                setSelectedPlantTypes([])
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Clear All Filters
            </button>

            {/* Loyalty Rewards Panel */}
            <div className="mt-8">
              <LoyaltyRewardsPanel />
            </div>
          </div>

          {/* Products Section */}
          <div className="md:col-span-3 space-y-6">
            {/* Category Tabs */}
            {!collectionParam && (
              <div className="w-full mb-4">
                <div className="flex flex-wrap gap-2 pb-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex-grow sm:flex-grow-0 text-center ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort By */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600"></p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Products Grid - Mobile Optimized */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setPriceRange([0, maxPrice])
                    setMinRating(0)
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <PageLayout>
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </PageLayout>
  )
}
