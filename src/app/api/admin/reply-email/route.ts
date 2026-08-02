import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, customerEmail, subject, message } = body

    if (!orderId || !customerEmail || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key missing, skipping email send block.")
      return NextResponse.json(
        { success: true, message: "Email logged in development (no real send)" }
      )
    }

    // Format the email using a nice HTML wrapper
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="background: #065f46; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Fresh Tropics Asian Fruits</h1>
          </div>
          
          <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none; background: #fff;">
            <p style="margin-top: 0;">Regarding Order: <strong>#${orderId}</strong></p>
            <div style="white-space: pre-wrap; font-size: 15px; color: #374151; margin-top: 20px;">${message}</div>
            
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
            <p style="font-size: 13px; color: #6b7280; margin: 0;">If you have any further questions, simply reply to this email.</p>
          </div>
          
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
            &copy; ${new Date().getFullYear()} Fresh Tropics Asian Fruits. All rights reserved.
          </div>
        </body>
      </html>
    `

    // In sandbox mode, Resend can only send to verified emails. 
    // In production, it sends to the customer.
    const recipientEmail = process.env.NODE_ENV === 'production' 
      ? customerEmail 
      : 'support@freshtropicsasianfruits.com'

    // Force using Resend's onboarding address for now to bypass verification issues
    const senderEmail = "onboarding@resend.dev"
    console.log("Using Resend sandbox sender:", {
      from: senderEmail,
      to: recipientEmail,
      orderId
    })

    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: senderEmail,
        to: recipientEmail,
        subject: subject,
        html: htmlTemplate,
        replyTo: "support@freshtropicsasianfruits.com"
      })
    })

    if (!sendRes.ok) {
      const errorData = await sendRes.json()
      console.error("Resend API error:", errorData)
      return NextResponse.json(
        { 
          error: "Failed to send email.", 
          details: errorData 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully"
    })

  } catch (error) {
    console.error("API Error in /api/admin/reply-email:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
