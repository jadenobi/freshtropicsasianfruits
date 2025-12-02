import { ComparisonProduct, Fruit } from '@/types'
import { FRUITS } from './data'

// Convert Fruit to ComparisonProduct with default nutrition data
function convertToComparisonProduct(fruit: Fruit): ComparisonProduct {
  return {
    id: fruit.id,
    name: fruit.name,
    category: fruit.category,
    price: fruit.price,
    originalPrice: fruit.originalPrice,
    image: fruit.image,
    images: fruit.images,
    description: fruit.description,
    rating: fruit.rating,
    reviews: fruit.reviews,
    inStock: fruit.inStock,
    inventory: 50, // Default inventory
    nutrition: {
      calories: 80,
      protein: 0.8,
      carbs: 20,
      fiber: 1.5,
      vitaminC: 30,
      potassium: 200,
    },
    benefits: ['Rich in nutrients', 'Contains antioxidants', 'Supports digestion', 'Boosts immunity', 'Natural energy source'],
    season: 'Year-round',
    shelfLife: '5-7 days',
    storage: 'Refrigerate as needed',
    origin: 'Various',
  }
}

// Get comparison products from shop products
export function getComparisonProducts(): ComparisonProduct[] {
  return FRUITS.map(convertToComparisonProduct)
}

// Get product by ID
export function getComparisonProductById(id: string): ComparisonProduct | undefined {
  return getComparisonProducts().find(p => p.id === id)
}

// Get products by IDs (for comparison list)
export function getProductsForComparison(ids: string[]): ComparisonProduct[] {
  const products = getComparisonProducts()
  return ids
    .map(id => products.find(p => p.id === id))
    .filter((p): p is ComparisonProduct => p !== undefined)
}

// Calculate price difference
export function calculatePriceDifference(price1: number, price2: number): number {
  return Math.round(((price2 - price1) / price1) * 100)
}

// Get nutrition comparison data
export function getNutritionComparison(productIds: string[]) {
  const products = getProductsForComparison(productIds)
  
  return {
    calories: products.map(p => ({ name: p.name, value: p.nutrition.calories })),
    protein: products.map(p => ({ name: p.name, value: p.nutrition.protein })),
    carbs: products.map(p => ({ name: p.name, value: p.nutrition.carbs })),
    fiber: products.map(p => ({ name: p.name, value: p.nutrition.fiber })),
    vitaminC: products.map(p => ({ name: p.name, value: p.nutrition.vitaminC })),
    potassium: products.map(p => ({ name: p.name, value: p.nutrition.potassium })),
  }
}

// Generate PDF comparison (mock)
export function generateComparisonPDF(productIds: string[]): string {
  const products = getProductsForComparison(productIds)
  
  let pdfContent = 'FRESH TROPICS PRODUCT COMPARISON\n\n'
  pdfContent += `Generated: ${new Date().toLocaleDateString()}\n\n`
  
  products.forEach((product, idx) => {
    pdfContent += `${idx + 1}. ${product.name}\n`
    pdfContent += `   Price: $${product.price}\n`
    pdfContent += `   Rating: ${product.rating}/5 (${product.reviews} reviews)\n`
    pdfContent += `   Origin: ${product.origin}\n`
    pdfContent += `   Benefits: ${product.benefits.join(', ')}\n\n`
  })
  
  // In production, use a library like jsPDF or pdfkit
  return 'data:text/plain;base64,' + btoa(pdfContent)
}

// Get similar products
export function getSimilarProducts(productId: string, limit = 4): ComparisonProduct[] {
  const allProducts = getComparisonProducts()
  const product = allProducts.find(p => p.id === productId)
  if (!product) return []
  
  return allProducts
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}

// Price range for category
export function getPriceRange(category: string): { min: number; max: number } {
  const products = getComparisonProducts().filter(p => p.category === category)
  if (products.length === 0) return { min: 0, max: 0 }
  
  const prices = products.map(p => p.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

// Top rated products
export function getTopRatedProducts(limit = 5): ComparisonProduct[] {
  return [...getComparisonProducts()]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// Best value products (rating / price ratio)
export function getBestValueProducts(limit = 5): ComparisonProduct[] {
  return [...getComparisonProducts()]
    .map(p => ({
      ...p,
      value: p.rating / (p.price / 10),
    }))
    .sort((a, b) => b.value - a.value)
    .map(({ value, ...p }) => p)
    .slice(0, limit)
}
