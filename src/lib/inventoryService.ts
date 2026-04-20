import { FRUITS } from './products'

// Supabase is disabled per user request
// This service now returns mock data only

export async function initializeInventory(): Promise<void> {
  // Local initialization only
  return
}

export async function getInventory(productId: string): Promise<number> {
  // Return a static mock quantity
  return 99
}

export async function getAllInventory(): Promise<Record<string, number>> {
  const result: Record<string, number> = {}
  FRUITS.forEach((fruit) => {
    result[fruit.id] = 99
  })
  return result
}

export async function decreaseInventory(productId: string, quantity: number): Promise<boolean> {
  // Always succeed in mock mode
  return true
}

export async function increaseInventory(productId: string, quantity: number): Promise<void> {
  return
}

export async function isInStock(productId: string): Promise<boolean> {
  return true
}

export async function getLowStockProducts(threshold: number = 10): Promise<string[]> {
  return []
}

export async function getOutOfStockProducts(): Promise<string[]> {
  return []
} 