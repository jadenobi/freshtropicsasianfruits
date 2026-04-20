import { Customer, Order } from '@/types'

// Supabase is disabled per user request
// This service now returns mock/local data only

export async function createOrGetCustomer(email: string, name: string): Promise<Customer | null> {
  return {
    email,
    name,
    phone: '',
    address: '',
    orders: [],
    reviews: [],
    wishlist: [],
    createdAt: new Date().toISOString(),
  }
}

export async function getCustomer(email: string): Promise<Customer | null> {
  return null
}

export async function addOrder(email: string, order: Order): Promise<void> {
  console.log('Order logged locally (Mock mode). Not saved to database.')
}

export async function getOrders(email: string): Promise<Order[]> {
  return []
}

export async function addToWishlist(email: string, productId: string): Promise<void> {
  return
}

export async function removeFromWishlist(email: string, productId: string): Promise<void> {
  return
}

export async function getWishlist(email: string): Promise<string[]> {
  return []
}

export async function updateCustomerProfile(
  email: string,
  updates: Partial<Customer>
): Promise<void> {
  return
}
