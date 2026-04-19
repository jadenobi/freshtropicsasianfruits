import { Fruit } from '@/types';
import { FRUITS } from './products';

/**
 * ProductService
 * 
 * Centralized service to handle product data access.
 * This can be easily updated to fetch from an API or database in the future.
 */
export const ProductService = {
  /**
   * Get all products
   */
  getAllProducts(): Fruit[] {
    return FRUITS;
  },

  /**
   * Get product by ID
   */
  getProductById(id: string): Fruit | undefined {
    return FRUITS.find(fruit => fruit.id === id);
  },

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): Fruit[] {
    return FRUITS.filter(fruit => fruit.category.toLowerCase() === category.toLowerCase());
  },

  /**
   * Get featured products (e.g., best sellers)
   */
  getFeaturedProducts(limit: number = 8): Fruit[] {
    return FRUITS.slice(0, limit);
  },

  /**
   * Search products by name or description
   */
  searchProducts(query: string): Fruit[] {
    const lowerQuery = query.toLowerCase();
    return FRUITS.filter(fruit => 
      fruit.name.toLowerCase().includes(lowerQuery) || 
      fruit.description.toLowerCase().includes(lowerQuery)
    );
  }
};
