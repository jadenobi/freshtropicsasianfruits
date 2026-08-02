import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    if (!supabaseAdmin) {
      console.error("Admin data: Supabase Admin client not initialized")
      return NextResponse.json({ orders: [], customers: [] })
    }

    const [ordersRes, customersRes] = await Promise.all([
      supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("customers").select("*").order("created_at", { ascending: false })
    ])

    if (ordersRes.error) {
      console.error("Supabase orders error:", JSON.stringify(ordersRes.error))
      // Table might not exist yet, return empty
      return NextResponse.json({ orders: [], customers: [] })
    }
    if (customersRes.error) {
      console.error("Supabase customers error:", JSON.stringify(customersRes.error))
      return NextResponse.json({ orders: ordersRes.data || [], customers: [] })
    }

    const orders = ordersRes.data.map((o: any) => ({
      id: o.id,
      orderId: o.order_id,
      customerEmail: o.customer_email,
      items: o.items || [],
      total: o.total,
      subtotal: o.subtotal,
      shipping: o.shipping,
      tax: o.tax,
      status: o.status,
      paymentMethod: o.payment_method,
      createdAt: o.created_at
    }))

    const customers = customersRes.data.map((c: any) => ({
      id: c.id,
      email: c.email,
      name: c.name,
      phone: c.phone || '',
      address: c.address || '',
      createdAt: c.created_at
    }))

    return NextResponse.json({ orders, customers })
  } catch (error: any) {
    console.error("Admin data fetch error:", error?.message || error)
    // Return empty arrays instead of error so dashboard renders gracefully
    return NextResponse.json({ orders: [], customers: [] })
  }
}
