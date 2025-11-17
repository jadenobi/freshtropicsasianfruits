import { FRUITS } from './data'
import { supabase } from './supabase'

export async function initializeInventory(): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('inventory')
      .select('product_id')
      .limit(1)

    if (existing && existing.length > 0) return // Already initialized

    const items = FRUITS.map((fruit) => ({
      product_id: fruit.id,
      quantity: 50 + Math.floor(Math.random() * 200),
    }))

    await supabase
      .from('inventory')
      .insert(items)
  } catch (error) {
    console.error('Initialize inventory error:', error)
  }
}

export async function getInventory(productId: string): Promise<number> {
  try {
    const { data: item, error } = await supabase
      .from('inventory')
      .select('quantity')
      .eq('product_id', productId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return item?.quantity || 0
  } catch (error) {
    console.error('Get inventory error:', error)
    return 0
  }
}

export async function getAllInventory(): Promise<Record<string, number>> {
  try {
    const { data: items, error } = await supabase
      .from('inventory')
      .select('product_id, quantity')

    if (error) throw error

    const result: Record<string, number> = {}
    ;(items || []).forEach((item: any) => {
      result[item.product_id] = item.quantity
    })
    return result
  } catch (error) {
    console.error('Get all inventory error:', error)
    return {}
  }
}

export async function decreaseInventory(productId: string, quantity: number): Promise<boolean> {
  try {
    const current = await getInventory(productId)
    if (current < quantity) return false

    await supabase
      .from('inventory')
      .update({ quantity: current - quantity })
      .eq('product_id', productId)

    return true
  } catch (error) {
    console.error('Decrease inventory error:', error)
    return false
  }
}

export async function increaseInventory(productId: string, quantity: number): Promise<void> {
  try {
    const current = await getInventory(productId)
    await supabase
      .from('inventory')
      .update({ quantity: current + quantity })
      .eq('product_id', productId)
  } catch (error) {
    console.error('Increase inventory error:', error)
  }
}

export async function isInStock(productId: string): Promise<boolean> {
  const quantity = await getInventory(productId)
  return quantity > 0
}

export async function getLowStockProducts(threshold: number = 10): Promise<string[]> {
  try {
    const { data: items, error } = await supabase
      .from('inventory')
      .select('product_id')
      .gt('quantity', 0)
      .lte('quantity', threshold)

    if (error) throw error
    return (items || []).map((i: any) => i.product_id)
  } catch (error) {
    console.error('Get low stock error:', error)
    return []
  }
}

export async function getOutOfStockProducts(): Promise<string[]> {
  try {
    const { data: items, error } = await supabase
      .from('inventory')
      .select('product_id')
      .lte('quantity', 0)

    if (error) throw error
    return (items || []).map((i: any) => i.product_id)
  } catch (error) {
    console.error('Get out of stock error:', error)
    return []
  }
}
