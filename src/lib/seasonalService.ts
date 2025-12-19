import { SeasonalBundle, SeasonalOffer, SeasonalCalendar, Fruit } from '@/types'

// Mock Seasonal Bundles Database
const SEASONAL_BUNDLES: SeasonalBundle[] = [
  {
    id: 'bundle-spring-1',
    name: 'Spring Fresh Start',
    season: 'spring',
    description: 'Refresh your palate with vibrant spring fruits full of natural energy',
    image: '/products/spring-bundle.jpg',
    icon: '🌸',
    products: [
      { id: '1', name: 'Dragon Fruit', category: 'exotic', price: 8.99, image: '/products/dragon-fruit.jpg', description: 'Sweet pink dragon fruit', rating: 4.8, reviews: 245, inStock: true },
      { id: '2', name: 'Mango', category: 'tropical', price: 5.99, image: '/products/mango.jpg', description: 'Golden sweet mango', rating: 4.9, reviews: 312, inStock: true },
      { id: '3', name: 'Strawberry', category: 'berries', price: 6.99, image: '/products/strawberry.jpg', description: 'Fresh red strawberries', rating: 4.7, reviews: 289, inStock: true },
    ],
    bundlePrice: 18.99,
    originalPrice: 21.97,
    discount: 2.98,
    discountPercent: 13,
    inStock: true,
    theme: 'Bright pastels with floral elements',
    storageNotes: 'Keep at room temperature for 2-3 days, then refrigerate',
    recipeTips: 'Perfect for smoothie bowls, spring salads, and fresh desserts',
    quantity: 3,
    bestFor: 'Natural energy boost',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bundle-summer-1',
    name: 'Tropical Summer Escape',
    season: 'summer',
    description: 'Beat the heat with juicy tropical fruits perfect for summer',
    image: '/products/summer-bundle.jpg',
    icon: '☀️',
    products: [
      { id: '4', name: 'Pineapple', category: 'tropical', price: 6.99, image: '/products/pineapple.jpg', description: 'Juicy golden pineapple', rating: 4.8, reviews: 278, inStock: true },
      { id: '5', name: 'Coconut', category: 'tropical', price: 4.99, image: '/products/coconut.jpg', description: 'Fresh young coconut', rating: 4.6, reviews: 201, inStock: true },
      { id: '6', name: 'Watermelon', category: 'seasonal', price: 7.99, image: '/products/watermelon.jpg', description: 'Sweet red watermelon', rating: 4.9, reviews: 356, inStock: true },
      { id: '7', name: 'Mango', category: 'tropical', price: 5.99, image: '/products/mango.jpg', description: 'Golden sweet mango', rating: 4.9, reviews: 312, inStock: true },
    ],
    bundlePrice: 22.99,
    originalPrice: 25.96,
    discount: 2.97,
    discountPercent: 11,
    inStock: true,
    theme: 'Vibrant tropical colors',
    storageNotes: 'Keep pineapple and watermelon cool, best consumed within 4-5 days',
    recipeTips: 'Great for smoothies, grilling, and refreshing drinks',
    quantity: 4,
    bestFor: 'Hydration and cooling down',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bundle-fall-1',
    name: 'Autumn Harvest Gold',
    season: 'fall',
    description: 'Celebrate fall with warm, rich flavors and golden harvest fruits',
    image: '/products/fall-bundle.jpg',
    icon: '🍂',
    products: [
      { id: '8', name: 'Apple', category: 'apples', price: 4.99, image: '/products/apple.jpg', description: 'Crisp red apple', rating: 4.7, reviews: 234, inStock: true },
      { id: '9', name: 'Pear', category: 'seasonal', price: 5.49, image: '/products/pear.jpg', description: 'Sweet golden pear', rating: 4.6, reviews: 189, inStock: true },
      { id: '10', name: 'Pomegranate', category: 'exotic', price: 7.99, image: '/products/pomegranate.jpg', description: 'Jewel-like pomegranate', rating: 4.8, reviews: 267, inStock: true },
      { id: '11', name: 'Kiwi', category: 'exotic', price: 3.99, image: '/products/kiwi.jpg', description: 'Tart green kiwi', rating: 4.5, reviews: 156, inStock: true },
    ],
    bundlePrice: 21.99,
    originalPrice: 22.46,
    discount: 0.47,
    discountPercent: 2,
    inStock: true,
    theme: 'Warm amber and deep reds',
    storageNotes: 'Store at room temperature, gradually move to fridge as ripens',
    recipeTips: 'Perfect for baking, warm dishes, and cozy desserts',
    quantity: 4,
    bestFor: 'Comfort and seasonal joy',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bundle-winter-1',
    name: 'Winter Citrus Immunity',
    season: 'winter',
    description: 'Boost immunity with citrus fruits rich in Vitamin C',
    image: '/products/winter-bundle.jpg',
    icon: '❄️',
    products: [
      { id: '12', name: 'Orange', category: 'citrus', price: 5.99, image: '/products/orange.jpg', description: 'Juicy sweet orange', rating: 4.8, reviews: 290, inStock: true },
      { id: '13', name: 'Lemon', category: 'citrus', price: 2.99, image: '/products/lemon.jpg', description: 'Tangy fresh lemon', rating: 4.6, reviews: 178, inStock: true },
      { id: '14', name: 'Grapefruit', category: 'citrus', price: 4.49, image: '/products/grapefruit.jpg', description: 'Pink juicy grapefruit', rating: 4.7, reviews: 212, inStock: true },
      { id: '15', name: 'Blueberry', category: 'berries', price: 8.99, image: '/products/blueberry.jpg', description: 'Antioxidant-rich blueberries', rating: 4.9, reviews: 334, inStock: true },
    ],
    bundlePrice: 21.99,
    originalPrice: 22.46,
    discount: 0.47,
    discountPercent: 2,
    inStock: true,
    theme: 'Cool blues and fresh whites',
    storageNotes: 'Citrus keeps 2 weeks in cool place, berries best consumed fresh',
    recipeTips: 'Great for immunity juices, hot beverages, and brightening dishes',
    quantity: 4,
    bestFor: 'Immune system boost',
    createdAt: new Date().toISOString(),
  },
]

// Mock Seasonal Offers Database
const SEASONAL_OFFERS: SeasonalOffer[] = [
  {
    id: 'offer-spring-1',
    title: '🌸 Spring into Savings! 15% OFF Spring Bundles',
    season: 'spring',
    description: 'Limited time offer on our Spring Fresh Start bundle',
    discountPercent: 15,
    validFrom: '2025-03-01',
    validUntil: '2025-05-31',
    image: '/offers/spring-15off.jpg',
    code: 'SPRING15',
    applicableProducts: ['bundle-spring-1'],
    featured: true,
  },
  {
    id: 'offer-summer-1',
    title: '☀️ Summer Sizzle Sale! 20% OFF Tropical Bundles',
    season: 'summer',
    description: 'Beat the heat with our hottest summer deals',
    discountPercent: 20,
    validFrom: '2025-06-01',
    validUntil: '2025-08-31',
    image: '/offers/summer-20off.jpg',
    code: 'SUMMER20',
    applicableProducts: ['bundle-summer-1'],
    featured: true,
  },
  {
    id: 'offer-fall-1',
    title: '🍂 Harvest Special! 18% OFF Fall Bundles',
    season: 'fall',
    description: 'Celebrate the harvest season with fantastic savings',
    discountPercent: 18,
    validFrom: '2025-09-01',
    validUntil: '2025-11-30',
    image: '/offers/fall-18off.jpg',
    code: 'HARVEST18',
    applicableProducts: ['bundle-fall-1'],
    featured: true,
  },
  {
    id: 'offer-winter-1',
    title: '❄️ Winter Wellness! 12% OFF Immunity Bundles',
    season: 'winter',
    description: 'Stay healthy all winter with our immunity-boosting bundles',
    discountPercent: 12,
    validFrom: '2025-12-01',
    validUntil: '2026-02-28',
    image: '/offers/winter-12off.jpg',
    code: 'WINTER12',
    applicableProducts: ['bundle-winter-1'],
    featured: true,
  },
]

// Mock Seasonal Calendar Database
const SEASONAL_CALENDAR: Record<number, SeasonalCalendar> = {
  3: {
    month: 3,
    season: 'spring',
    fruitInSeason: [
      { id: '1', name: 'Dragon Fruit', category: 'exotic', price: 8.99, image: '/products/dragon-fruit.jpg', description: 'Sweet pink dragon fruit', rating: 4.8, reviews: 245, inStock: true },
      { id: '2', name: 'Mango', category: 'tropical', price: 5.99, image: '/products/mango.jpg', description: 'Golden sweet mango', rating: 4.9, reviews: 312, inStock: true },
      { id: '3', name: 'Strawberry', category: 'berries', price: 6.99, image: '/products/strawberry.jpg', description: 'Fresh red strawberries', rating: 4.7, reviews: 289, inStock: true },
    ],
    storageNotes: {
      'Dragon Fruit': 'Keep at room temperature for 2-3 days',
      'Mango': 'Ripen at room temperature, then refrigerate',
      'Strawberry': 'Store in refrigerator in original container',
    },
    recipeHighlights: {
      'Dragon Fruit': 'Perfect for smoothie bowls',
      'Mango': 'Great in fresh salsas and smoothies',
      'Strawberry': 'Ideal for jams and fresh desserts',
    },
  },
  6: {
    month: 6,
    season: 'summer',
    fruitInSeason: [
      { id: '4', name: 'Pineapple', category: 'tropical', price: 6.99, image: '/products/pineapple.jpg', description: 'Juicy golden pineapple', rating: 4.8, reviews: 278, inStock: true },
      { id: '5', name: 'Coconut', category: 'tropical', price: 4.99, image: '/products/coconut.jpg', description: 'Fresh young coconut', rating: 4.6, reviews: 201, inStock: true },
      { id: '6', name: 'Watermelon', category: 'seasonal', price: 7.99, image: '/products/watermelon.jpg', description: 'Sweet red watermelon', rating: 4.9, reviews: 356, inStock: true },
    ],
    storageNotes: {
      'Pineapple': 'Keep cool, lasts 4-5 days',
      'Coconut': 'Refrigerate for best taste',
      'Watermelon': 'Best served chilled',
    },
    recipeHighlights: {
      'Pineapple': 'Great grilled or in tropical drinks',
      'Coconut': 'Perfect for smoothies and curries',
      'Watermelon': 'Ideal for hot summer refreshment',
    },
  },
  9: {
    month: 9,
    season: 'fall',
    fruitInSeason: [
      { id: '8', name: 'Apple', category: 'apples', price: 4.99, image: '/products/apple.jpg', description: 'Crisp red apple', rating: 4.7, reviews: 234, inStock: true },
      { id: '9', name: 'Pear', category: 'seasonal', price: 5.49, image: '/products/pear.jpg', description: 'Sweet golden pear', rating: 4.6, reviews: 189, inStock: true },
      { id: '10', name: 'Pomegranate', category: 'exotic', price: 7.99, image: '/products/pomegranate.jpg', description: 'Jewel-like pomegranate', rating: 4.8, reviews: 267, inStock: true },
    ],
    storageNotes: {
      'Apple': 'Store in cool place for up to 2 weeks',
      'Pear': 'Ripen at room temp, then refrigerate',
      'Pomegranate': 'Lasts several weeks in fridge',
    },
    recipeHighlights: {
      'Apple': 'Perfect for baking and pies',
      'Pear': 'Great fresh or poached',
      'Pomegranate': 'Beautiful garnish and juice',
    },
  },
  12: {
    month: 12,
    season: 'winter',
    fruitInSeason: [
      { id: '12', name: 'Orange', category: 'citrus', price: 5.99, image: '/products/orange.jpg', description: 'Juicy sweet orange', rating: 4.8, reviews: 290, inStock: true },
      { id: '13', name: 'Lemon', category: 'citrus', price: 2.99, image: '/products/lemon.jpg', description: 'Tangy fresh lemon', rating: 4.6, reviews: 178, inStock: true },
      { id: '14', name: 'Grapefruit', category: 'citrus', price: 4.49, image: '/products/grapefruit.jpg', description: 'Pink juicy grapefruit', rating: 4.7, reviews: 212, inStock: true },
    ],
    storageNotes: {
      'Orange': 'Keeps 2 weeks in cool, dark place',
      'Lemon': 'Stores well at room temperature',
      'Grapefruit': 'Lasts up to 3 weeks in fridge',
    },
    recipeHighlights: {
      'Orange': 'Perfect for juicing and holiday recipes',
      'Lemon': 'Essential for cooking and beverages',
      'Grapefruit': 'Great for breakfast or cocktails',
    },
  },
}

// Get current season based on date
export function getCurrentSeason(date: Date = new Date()): 'spring' | 'summer' | 'fall' | 'winter' {
  const month = date.getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'fall'
  return 'winter'
}

// Get all seasonal bundles
export function getAllSeasonalBundles(): SeasonalBundle[] {
  return SEASONAL_BUNDLES
}

// Get seasonal bundles by season
export function getSeasonalBundlesBySeason(season: 'spring' | 'summer' | 'fall' | 'winter'): SeasonalBundle[] {
  return SEASONAL_BUNDLES.filter(bundle => bundle.season === season)
}

// Get current season bundles
export function getCurrentSeasonBundles(): SeasonalBundle[] {
  const season = getCurrentSeason()
  return getSeasonalBundlesBySeason(season)
}

// Get bundle by ID
export function getSeasonalBundleById(id: string): SeasonalBundle | undefined {
  return SEASONAL_BUNDLES.find(bundle => bundle.id === id)
}

// Get featured seasonal offers
export function getFeaturedSeasonalOffers(): SeasonalOffer[] {
  return SEASONAL_OFFERS.filter(offer => offer.featured)
}

// Get seasonal offers by season
export function getSeasonalOffersBySeason(season: 'spring' | 'summer' | 'fall' | 'winter'): SeasonalOffer[] {
  return SEASONAL_OFFERS.filter(offer => offer.season === season)
}

// Get current seasonal offers
export function getCurrentSeasonalOffers(): SeasonalOffer[] {
  const season = getCurrentSeason()
  return getSeasonalOffersBySeason(season)
}

// Get seasonal calendar for specific month
export function getSeasonalCalendarByMonth(month: number): SeasonalCalendar | undefined {
  const key = [3, 6, 9, 12].includes(month) ? month : Math.round(month / 3) * 3
  return SEASONAL_CALENDAR[key]
}

// Get current seasonal calendar
export function getCurrentSeasonalCalendar(): SeasonalCalendar | undefined {
  const month = new Date().getMonth() + 1
  return getSeasonalCalendarByMonth(month)
}

// Calculate savings for bundle
export function calculateBundleSavings(bundle: SeasonalBundle): { amount: number; percent: number } {
  return {
    amount: bundle.originalPrice - bundle.bundlePrice,
    percent: bundle.discountPercent,
  }
}

// Get bundle recommendations based on season and preferences
export function getBundleRecommendations(season?: 'spring' | 'summer' | 'fall' | 'winter', limit: number = 3): SeasonalBundle[] {
  const targetSeason = season || getCurrentSeason()
  return getSeasonalBundlesBySeason(targetSeason).slice(0, limit)
}

// Get all seasonal statistics
export function getSeasonalStatistics(): {
  totalBundles: number
  activeSeason: 'spring' | 'summer' | 'fall' | 'winter'
  bundlesThisSeason: number
  activeOffers: number
  totalSavingsAvailable: number
} {
  const season = getCurrentSeason()
  const bundlesThisSeason = getSeasonalBundlesBySeason(season).length
  const activeOffers = getSeasonalOffersBySeason(season).length
  const totalSavingsAvailable = getSeasonalBundlesBySeason(season).reduce((sum, bundle) => sum + bundle.discount, 0)

  return {
    totalBundles: SEASONAL_BUNDLES.length,
    activeSeason: season,
    bundlesThisSeason,
    activeOffers,
    totalSavingsAvailable: Math.round(totalSavingsAvailable * 100) / 100,
  }
}

// Get fruits in season for display
export function getFruitsInSeason(season?: 'spring' | 'summer' | 'fall' | 'winter'): Fruit[] {
  const targetSeason = season || getCurrentSeason()
  const bundles = getSeasonalBundlesBySeason(targetSeason)
  const fruits = new Map<string, Fruit>()

  bundles.forEach(bundle => {
    bundle.products.forEach(fruit => {
      if (!fruits.has(fruit.id)) {
        fruits.set(fruit.id, fruit)
      }
    })
  })

  return Array.from(fruits.values())
}

// Apply seasonal discount code
export function applySeasonalDiscountCode(code: string): { valid: boolean; discountPercent: number; bundleIds: string[] } {
  const offer = SEASONAL_OFFERS.find(o => o.code === code)
  if (!offer) {
    return { valid: false, discountPercent: 0, bundleIds: [] }
  }

  const now = new Date()
  const validFrom = new Date(offer.validFrom)
  const validUntil = new Date(offer.validUntil)

  if (now < validFrom || now > validUntil) {
    return { valid: false, discountPercent: 0, bundleIds: [] }
  }

  return {
    valid: true,
    discountPercent: offer.discountPercent,
    bundleIds: offer.applicableProducts,
  }
}

// Get storage tips for fruits
export function getStorageTips(fruitName: string, season?: 'spring' | 'summer' | 'fall' | 'winter'): string | undefined {
  const calendar = season ? getSeasonalCalendarByMonth(season === 'spring' ? 3 : season === 'summer' ? 6 : season === 'fall' ? 9 : 12) : getCurrentSeasonalCalendar()
  return calendar?.storageNotes[fruitName]
}

// Get recipe highlights for fruits
export function getRecipeHighlights(fruitName: string, season?: 'spring' | 'summer' | 'fall' | 'winter'): string | undefined {
  const calendar = season ? getSeasonalCalendarByMonth(season === 'spring' ? 3 : season === 'summer' ? 6 : season === 'fall' ? 9 : 12) : getCurrentSeasonalCalendar()
  return calendar?.recipeHighlights[fruitName]
}
