import { NextRequest, NextResponse } from "next/server"
import { sendPaymentEmail, sendBusinessConfirmationEmail, OrderData } from "@/lib/emailService"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body: OrderData = await request.json()

    // Validate required fields
    if (!body.orderId || !body.customerEmail || !body.customerName || !body.paymentMethodId) {
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

    // Save customer to Supabase
    if (supabase) {
      const { error: customerError } = await (supabase as any)
        .from('customers')
        .upsert({
          email: body.customerEmail,
          name: body.customerName,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'email'
        })
      
      if (customerError) {
        console.error("Customer save error:", customerError)
      }
    }

    // Save order to Supabase
    if (supabase) {
      const { error: orderError } = await (supabase as any)
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
        console.error("Order save error:", orderError)
      }
    }

    // Send the payment email to customer
    const customerEmailSuccess = await sendPaymentEmail(body)
    
    // Send the business confirmation email with all details
    const businessEmailSuccess = await sendBusinessConfirmationEmail(body)

    if (customerEmailSuccess && businessEmailSuccess) {
      return NextResponse.json({
        success: true,
        message: "Order received, payment instructions sent to customer, and confirmation sent to business",
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
