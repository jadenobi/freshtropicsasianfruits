import { NextRequest, NextResponse } from "next/server"
import { sendPaymentEmail, sendBusinessConfirmationEmail, OrderData } from "@/lib/emailService"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body: OrderData = await request.json()

    // Validate required fields
    if (!body.orderId || !body.customerEmail || !body.customerName || !body.paymentMethodId || !body.address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Save customer to Supabase using admin client
    if (supabaseAdmin) {
      const { error: customerError } = await (supabaseAdmin as any)
        .from('customers')
        .upsert({
          email: body.customerEmail,
          name: body.customerName,
          phone: body.phone,
          address: body.address
        }, {
          onConflict: 'email'
        })
      
      if (customerError) {
        console.error("Customer save error details:", JSON.stringify(customerError))
      }
    } else {
      console.warn("Supabase Admin client not initialized")
    }

    // Save order to Supabase using admin client
    if (supabaseAdmin) {
      const { error: orderError } = await (supabaseAdmin as any)
        .from('orders')
        .insert({
          order_id: body.orderId,
          customer_email: body.customerEmail,
          items: body.items,
          subtotal: body.subtotal,
          shipping: body.shipping,
          tax: body.tax,
          total: body.total,
          status: 'pending',
          payment_method: body.paymentMethodId,
          created_at: new Date().toISOString()
        })

      if (orderError) {
        console.error("Order save error details:", JSON.stringify(orderError))
      }
    }

    // Send the payment email to customer with instructions
    const customerEmailSuccess = await sendPaymentEmail(body)
    
    // Send the business confirmation email with all details
    const businessEmailSuccess = await sendBusinessConfirmationEmail(body)

    if (businessEmailSuccess) {
      return NextResponse.json({
        success: true,
        message: "Order received and business notified for manual review",
        orderId: body.orderId,
        customerEmail: body.customerEmail
      })
    } else {
      return NextResponse.json(
        { error: "Failed to send one or more emails" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
