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

// Add sizes to products that don't have them
const FRUITS_WITH_SIZES: Fruit[] = FRUITS.map(fruit => ({
  ...fruit,
  sizes: fruit.sizes || getDefaultSizes(fruit.price)
}));

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
