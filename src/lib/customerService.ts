import { Customer, Order } from '@/types'
import { supabase } from './supabase'

// Get or create customer
export async function createOrGetCustomer(email: string, name: string): Promise<Customer | null> {
  try {
    // Return null if supabase not initialized
    if (!supabase) {
      return null
    }

    // Check if customer exists
    let { data: customer, error: fetchError } = await (supabase as any)
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError
    }

    // If doesn't exist, create
    if (!customer) {
      const { data: newCustomer, error: insertError } = await (supabase as any)
        .from('customers')
        .insert([{ email, name }])
        .select()
        .single()

      if (insertError) throw insertError
      customer = newCustomer
    }

    return {
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      orders: await getOrders(email),
      reviews: [],
      wishlist: await getWishlist(email),
      createdAt: customer.created_at,
    }
  } catch (error) {
    console.error('Customer service error:', error)
    throw error
  }
}

export async function getCustomer(email: string): Promise<Customer | null> {
  try {
    if (!supabase) return null
    const { data: customer, error } = await (supabase as any)
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    if (!customer) return null

    return {
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      orders: await getOrders(email),
      reviews: [],
      wishlist: await getWishlist(email),
      createdAt: customer.created_at,
    }
  } catch (error) {
    console.error('Get customer error:', error)
    return null
  }
}

export async function addOrder(email: string, order: Order): Promise<void> {
  try {
    await (supabase as any)
      .from('orders')
      .insert([
        {
          order_id: order.orderId,
          customer_email: email,
          items: order.items,
          subtotal: order.subtotal,
          shipping: order.shipping,
          tax: order.tax,
          total: order.total,
          status: order.status,
          payment_method: order.paymentMethod,
        },
      ])
  } catch (error) {
    console.error('Add order error:', error)
    throw error
  }
}

export async function getOrders(email: string): Promise<Order[]> {
  try {
    const { data: orders, error } = await (supabase as any)
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (orders || []).map((o: any) => ({
      id: o.id,
      orderId: o.order_id,
      items: o.items,
      subtotal: o.subtotal,
      shipping: o.shipping,
      tax: o.tax,
      total: o.total,
      status: o.status,
      paymentMethod: o.payment_method,
      createdAt: new Date(o.created_at),
    }))
  } catch (error) {
    console.error('Get orders error:', error)
    return []
  }
}

export async function addToWishlist(email: string, productId: string): Promise<void> {
  try {
    await (supabase as any)
      .from('wishlist')
      .insert([{ customer_email: email, product_id: productId }])
  } catch (error) {
    console.error('Add to wishlist error:', error)
  }
}

export async function removeFromWishlist(email: string, productId: string): Promise<void> {
  try {
    await (supabase as any)
      .from('wishlist')
      .delete()
      .eq('customer_email', email)
      .eq('product_id', productId)
  } catch (error) {
    console.error('Remove from wishlist error:', error)
  }
}

export async function getWishlist(email: string): Promise<string[]> {
  try {
    const { data: items, error } = await (supabase as any)
      .from('wishlist')
      .select('product_id')
      .eq('customer_email', email)

    if (error) throw error
    return (items || []).map((i: any) => i.product_id)
  } catch (error) {
    console.error('Get wishlist error:', error)
    return []
  }
}

export async function updateCustomerProfile(
  email: string,
  updates: Partial<Customer>
): Promise<void> {
  try {
    await (supabase as any)
      .from('customers')
      .update({
        name: updates.name,
        phone: updates.phone,
        address: updates.address,
      })
      .eq('email', email)
  } catch (error) {
    console.error('Update profile error:', error)
  }
}
