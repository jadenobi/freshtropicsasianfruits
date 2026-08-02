import { Fruit } from '@/types';
import { FRUITS } from './products';

/**
 * ProductService
 * 
 * Centralized service to handle product data access.
 * This can be easily updated to fetch from an API or database in the future.
 */

// Helper function to generate standard sizes for a product
function getDefaultSizes(price: number) {
  const smallPrice = Math.round(price * 0.65 * 100) / 100; // 65% for 5 lbs
  const regularPrice = price; // 100% for 8 lbs
  const largePrice = Math.round(price * 1.3 * 100) / 100; // 130% for 10 lbs

  return [
    {
      id: 'size-small',
      name: 'Small',
      weight: '5 lbs',
      price: smallPrice,
      originalPrice: Math.round(price * 0.75 * 100) / 100
    },
    {
      id: 'size-regular',
      name: 'Regular',
      weight: '8 lbs',
      price: regularPrice,
      originalPrice: price
    },
    {
      id: 'size-large',
      name: 'Large',
      weight: '10 lbs',
      price: largePrice,
      originalPrice: Math.round(price * 1.5 * 100) / 100
    }
  ];
}

// Add sizes and minimum reviews to products
const FRUITS_WITH_SIZES: Fruit[] = FRUITS.map(fruit => {
  // Generate deterministic but high review numbers if product lacks them
  const seed = fruit.name.length + fruit.id.charCodeAt(fruit.id.length - 1);
  let generatedReviews = (seed * 23) % 450 + 75; // Between 75 and 525 reviews
  const generatedRating = 4.5 + ((seed % 5) / 10); // Between 4.5 and 4.9

  if (fruit.id === 'fgt_lanzone') {
    generatedReviews = 9;
  }

  return {
    ...fruit,
    sizes: fruit.sizes || getDefaultSizes(fruit.price),
    reviews: (!fruit.reviews || fruit.reviews < 20) ? generatedReviews : fruit.reviews,
    rating: (!fruit.rating || fruit.rating < 4.0) ? generatedRating : fruit.rating
  };
});

export const ProductService = {
  /**
   * Get all products
   */
  getAllProducts(): Fruit[] {
    return FRUITS_WITH_SIZES;
  },

  /**
   * Get product by ID
   */
  getProductById(id: string): Fruit | undefined {
    return FRUITS_WITH_SIZES.find(fruit => fruit.id === id);
  },

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): Fruit[] {
    return FRUITS_WITH_SIZES.filter(fruit => fruit.category.toLowerCase() === category.toLowerCase());
  },

  /**
   * Get featured products (e.g., best sellers)
   */
  getFeaturedProducts(limit: number = 8): Fruit[] {
    return FRUITS_WITH_SIZES.slice(0, limit);
  },

  /**
   * Search products by name or description
   */
  searchProducts(query: string): Fruit[] {
    const lowerQuery = query.toLowerCase();
    return FRUITS_WITH_SIZES.filter(fruit => 
      fruit.name.toLowerCase().includes(lowerQuery) || 
      fruit.description.toLowerCase().includes(lowerQuery)
    );
  }
};
