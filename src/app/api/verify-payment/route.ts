import { NextRequest, NextResponse } from "next/server"
import { sendPaymentVerificationEmail, VerificationData } from "@/lib/emailService"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body: VerificationData = await request.json()

    // Validate required fields
    if (!body.orderId || !body.transactionId || !body.customerEmail || !body.amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Optional: Update order status in Supabase if it exists
    if (supabase) {
      try {
        const { error: updateError } = await (supabase as any)
          .from('orders')
          .update({ 
            status: 'verification_submitted',
            transaction_id: body.transactionId,
            verification_notes: body.notes
          })
          .eq('order_id', body.orderId)
        
        if (updateError) {
          console.error("Order status update error:", updateError)
        }
      } catch (dbError) {
        console.error("Database interaction error:", dbError)
      }
    }

    // Send the verification email to business
    const emailSuccess = await sendPaymentVerificationEmail(body)

    if (emailSuccess) {
      return NextResponse.json({
        success: true,
        message: "Verification submitted successfully. We will review your payment shortly."
      })
    } else {
      return NextResponse.json(
        { error: "Failed to process verification email. Please contact support." },
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
