import { PAYMENT_METHODS, PAYMENT_INSTRUCTIONS } from "@/config/payments"

export interface OrderData {
  orderId: string
  customerEmail: string
  customerName: string
  phone?: string
  address?: string
  items: Array<{ name: string; quantity: number; price: number }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethodId: string
}

export interface VerificationData {
  orderId: string
  transactionId: string
  customerName: string
  customerEmail: string
  paymentMethod: string
  amount: number
  notes?: string
}



// Send business confirmation email with all order details
export async function sendBusinessConfirmationEmail(order: OrderData): Promise<boolean> {
  try {
    const businessHtmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #065f46 0%, #d97706 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;"> Fresh Tropics Asian Fruits</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">NEW ORDER RECEIVED - SECURE RECORD</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #d1d5db;">Business Order Confirmation</p>
          </div>

          <div style="background: #f9fafb; padding: 30px;">
            <h2 style="color: #065f46; margin-top: 0;"> ORDER DETAILS</h2>

            <div style="background: white; border: 2px solid #065f46; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin: 0 0 15px 0; color: #065f46; border-bottom: 2px solid #d97706; padding-bottom: 10px;">Order #${order.orderId}</h3>
              
              <table style="width: 100%; margin-bottom: 15px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #065f46; width: 40%;">Customer Name:</td>
                  <td style="padding: 8px 0;">${order.customerName}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                  <td style="padding: 8px 0; font-weight: bold; color: #065f46; width: 40%;">Customer Email:</td>
                  <td style="padding: 8px 0;">${order.customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #065f46; width: 40%;">Payment Method:</td>
                  <td style="padding: 8px 0;">${PAYMENT_METHODS.find(m => m.id === order.paymentMethodId)?.name || order.paymentMethodId}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                  <td style="padding: 8px 0; font-weight: bold; color: #065f46; width: 40%;">Order Time:</td>
                  <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <h3 style="color: #065f46; margin-bottom: 15px;"> ITEMS ORDERED</h3>
            <table style="width: 100%; border-collapse: collapse; background: white; margin-bottom: 20px;">
              <thead style="background: #065f46; color: white;">
                <tr>
                  <th style="padding: 12px; text-align: left; border: 1px solid #d1d5db;">Product Name</th>
                  <th style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">Qty</th>
                  <th style="padding: 12px; text-align: right; border: 1px solid #d1d5db;">Unit Price</th>
                  <th style="padding: 12px; text-align: right; border: 1px solid #d1d5db;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item, idx) => `
                  <tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#f9fafb'}; border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px; border: 1px solid #d1d5db;">${item.name}</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">${item.quantity}</td>
                    <td style="padding: 12px; text-align: right; border: 1px solid #d1d5db;">$${item.price.toFixed(2)}</td>
                    <td style="padding: 12px; text-align: right; border: 1px solid #d1d5db; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>

            <h3 style="color: #065f46; margin-bottom: 15px;"> PRICING BREAKDOWN</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <table style="width: 100%; margin-bottom: 10px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Subtotal:</td>
                  <td style="padding: 8px 0; text-align: right;">$${order.subtotal.toFixed(2)}</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 8px 0; font-weight: bold;">Shipping:</td>
                  <td style="padding: 8px 0; text-align: right;">$${order.shipping.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Tax (10%):</td>
                  <td style="padding: 8px 0; text-align: right;">$${order.tax.toFixed(2)}</td>
                </tr>
                <tr style="background: #ecfdf5; border-top: 2px solid #065f46; border-bottom: 2px solid #065f46;">
                  <td style="padding: 12px 0; font-weight: bold; font-size: 16px; color: #065f46;">TOTAL:</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 18px; color: #065f46;">$${order.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #92400e; font-weight: bold;"> ACTION REQUIRED</p>
              <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">Confirm availability and reply to the customer with payment details.</p>
            </div>

            <!-- Professional Response Template -->
            <div style="background: white; border: 2px dashed #065f46; padding: 25px; border-radius: 8px; margin-top: 30px;">
              <h3 style="margin: 0 0 15px 0; color: #065f46; font-size: 16px;"> PROFESSIONAL RESPONSE DRAFT (Copy & Paste)</h3>
              <div style="background: #f9fafb; padding: 20px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #374151; border: 1px solid #e5e7eb;">
                <p style="margin: 0;">Hi ${order.customerName},</p>
                <br/>
                <p style="margin: 0;">Thank you for choosing <strong>Fresh Tropics Asian Fruits</strong>! </p>
                <p style="margin: 10px 0;">We've received your order <strong>#${order.orderId}</strong> and have manually verified your items for the best quality and freshness.</p>
                
                <div style="background: white; padding: 15px; border-left: 4px solid #d97706; margin: 15px 0;">
                  <p style="margin: 0; font-weight: bold; color: #065f46;">Order Summary:</p>
                  <p style="margin: 5px 0;">Total Amount: <strong>$${order.total.toFixed(2)}</strong></p>
                  <p style="margin: 5px 0;">Payment Method: <strong>${PAYMENT_METHODS.find(m => m.id === order.paymentMethodId)?.name || order.paymentMethodId}</strong></p>
                </div>

                <p style="margin: 0;">To finalize your order, please use the details below:</p>
                <p style="margin: 10px 0; font-family: monospace; background: #fff; padding: 10px; border: 1px solid #ddd;">
                  ${PAYMENT_INSTRUCTIONS[order.paymentMethodId]
                    ?.replace("[TOTAL]", order.total.toFixed(2))
                    ?.replace("[ORDER_ID]", order.orderId) || "Payment method details will be provided shortly."}
                </p>

                <p style="margin: 10px 0;">Once payment is confirmed, yours fruits will be carefully packaged and shipped for delivery.</p>
                <p style="margin: 10px 0;">If you have any questions, feel free to reply to this email or reach us on live chat!</p>
                <br/>
                <p style="margin: 0;">Best regards,</p>
                <p style="margin: 5px 0; font-weight: bold; color: #065f46;">The Fresh Tropics Team </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #6b7280; text-align: center;">Tip: Copy the gray box above and paste it as your reply to the customer.</p>
            </div>
          </div>

          <div style="background: #065f46; color: white; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
            <p style="margin: 0 0 10px 0;"> SECURE BUSINESS RECORD</p>
            <p style="margin: 0;">This email contains sensitive customer and order information.</p>
            <p style="margin: 5px 0 0 0; color: #d1d5db;">Fresh Tropics Asian Fruits - Order Management System</p>
          </div>
        </body>
      </html>
    `

    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev", // Use verified sandbox sender for business emails
            to: process.env.NEXT_PUBLIC_PAYMENT_EMAIL || "support@freshtropicsasianfruits.com",
            subject: ` NEW ORDER #${order.orderId} - $${order.total.toFixed(2)} - Business Confirmation`,
            html: businessHtmlTemplate,
            replyTo: order.customerEmail
          })
        })
        
        if (res.ok) {
          console.log(` Business confirmation email sent for order #${order.orderId}`)
          return true
        }
        
        const errorData = await res.json()
        console.error("Resend error:", errorData)
      } catch (e) {
        console.error("Resend fetch error:", e)
      }
    }

    console.log(` Business email would be sent for order #${order.orderId}`)
    return true
  } catch (error) {
    console.error("Business email service error:", error)
    return false
  }
}

export async function sendPaymentEmail(order: OrderData): Promise<boolean> {
  try {
    const method = PAYMENT_METHODS.find(m => m.id === order.paymentMethodId)
    if (!method) return false

    const instructions = PAYMENT_INSTRUCTIONS[order.paymentMethodId]
      ?.replace("[TOTAL]", order.total.toFixed(2))
      ?.replace("[ORDER_ID]", order.orderId) || "Payment method details will be provided shortly."

    const htmlTemplate = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Your Fresh Tropics Order</title>
          <style type="text/css">
            /* Technical Reliability: Email Client Resets */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
            a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
          </style>
        </head>
        <body style="background-color: #f6f9fc; margin: 0 !important; padding: 0 !important;">
          <!-- Preheader Text (Hidden in body, visible in inbox preview) -->
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            Your order #${order.orderId} from Fresh Tropics is ready for payment. Inside: Payment instructions and order summary...
          </div>

          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- BRAND IDENTITY: Header -->
            <tr>
              <td align="center" style="padding: 40px 10px 20px 10px; background-color: #f6f9fc;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" valign="top">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #065f46; letter-spacing: -0.5px;">Fresh Tropics</h1>
                      <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Premium Asian Fruits</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- TEMPLATE DESIGN: Main Card -->
            <tr>
              <td align="center" style="padding: 0px 10px 0px 10px; background-color: #f6f9fc;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; border-top: 4px solid #065f46; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                  
                  <!-- Greeting & Intro -->
                  <tr>
                    <td align="left" style="padding: 40px 40px 20px 40px;">
                      <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #1e293b;">Thank you for your order.</h2>
                      <p style="margin: 15px 0 0 0; font-size: 16px; line-height: 24px; color: #475569;">
                        Hi ${order.customerName.split(' ')[0]},<br><br>
                        We're thrilled to have you! We are currently preparing your fresh fruits for processing. Below, you'll find the details to complete your secure payment.
                      </p>
                    </td>
                  </tr>

                  <!-- Alert Box (Payment Instructions) -->
                  <tr>
                    <td align="left" style="padding: 0px 40px 20px 40px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-left: 4px solid #0ea5e9; border-radius: 0 4px 4px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #0f172a;">Complete your payment via ${method.name}</h3>
                            <p style="margin: 0; font-size: 15px; line-height: 22px; color: #475569;">
                              Our team will send an official email with your exact payment destination (account handle or address) very shortly to complete this order. Keep an eye on your inbox!
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Order Summary Divider -->
                  <tr>
                    <td align="center" style="padding: 20px 40px 10px 40px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">
                            <h3 style="margin: 0; font-size: 14px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Order Summary (#${order.orderId})</h3>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Items Table -->
                  <tr>
                    <td align="left" style="padding: 10px 40px 20px 40px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        ${order.items.map((item) => `
                          <tr>
                            <td align="left" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #1e293b;">
                              ${item.name} <span style="color: #94a3b8; font-size: 13px;">x${item.quantity}</span>
                            </td>
                            <td align="right" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; color: #1e293b; font-weight: 500;">
                              $${(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        `).join("")}
                      </table>
                    </td>
                  </tr>

                  <!-- Totals Breakdown -->
                  <tr>
                    <td align="right" style="padding: 0px 40px 40px 40px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="250" align="right">
                        <tr>
                          <td align="left" style="padding: 8px 0; font-size: 14px; color: #64748b;">Subtotal</td>
                          <td align="right" style="padding: 8px 0; font-size: 14px; color: #1e293b;">$${order.subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td align="left" style="padding: 8px 0; font-size: 14px; color: #64748b;">Shipping</td>
                          <td align="right" style="padding: 8px 0; font-size: 14px; color: #1e293b;">$${order.shipping.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td align="left" style="padding: 8px 0; font-size: 14px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">Tax (10%)</td>
                          <td align="right" style="padding: 8px 0; font-size: 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">$${order.tax.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td align="left" style="padding: 15px 0 0 0; font-size: 16px; font-weight: 700; color: #0f172a;">Total</td>
                          <td align="right" style="padding: 15px 0 0 0; font-size: 24px; font-weight: 700; color: #065f46;">$${order.total.toFixed(2)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- TECHNICAL RELIABILITY: Clean Footer -->
            <tr>
              <td align="center" style="padding: 30px 10px 50px 10px; background-color: #f6f9fc;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" style="font-size: 13px; line-height: 20px; color: #94a3b8;">
                      <p style="margin: 0;">
                        Questions? Reach out to <a href="mailto:support@freshtropicsasianfruits.com" style="color: #065f46; text-decoration: none; font-weight: 500;">support@freshtropicsasianfruits.com</a>
                      </p>
                      <p style="margin: 10px 0 0 0;">
                        &copy; ${new Date().getFullYear()} Fresh Tropics. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    // Try Resend first
    if (process.env.RESEND_API_KEY) {
      try {
        // In sandbox mode, Resend can only send to the verified email
        // For production, this should be the customer email
        const recipientEmail = process.env.NODE_ENV === 'production' 
          ? order.customerEmail 
          : 'support@freshtropicsasianfruits.com'
        
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev", // Use verified sandbox sender for customer emails during setup
            to: recipientEmail,
            subject: ` Payment Instructions - Order #${order.orderId}`,
            html: htmlTemplate,
            replyTo: "support@freshtropicsasianfruits.com"
          })
        })
        
        if (res.ok) {
          console.log(` Email sent successfully to: ${recipientEmail}`)
          return true
        }
        
        const errorData = await res.json()
        console.error("Resend error:", errorData)
      } catch (e) {
        console.error("Resend fetch error:", e)
      }
    }

    // Fallback: log for development
    console.log(` Payment email would be sent to: ${order.customerEmail}`)
    console.log(`Order: #${order.orderId} | Amount: $${order.total.toFixed(2)} | Method: ${method.name}`)
    return true
  } catch (error) {
    console.error("Email service error:", error)
    return false
  }
}

/**
 * Send payment verification notification to the business email.
 * This is triggered when a customer submits their payment details (Transaction ID)
 * on the website after paying via email-based methods (Zelle, Venmo, etc.).
 */
export async function sendPaymentVerificationEmail(data: VerificationData): Promise<boolean> {
  try {
    const businessHtmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
          <div style="background: #10b981; color: white; padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;"> Payment Verification Received</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">Order #${data.orderId}</p>
          </div>

          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
            <h2 style="color: #065f46; margin-top: 0;">Payment Details Submitted by Customer</h2>

            <div style="background: white; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Order ID:</td>
                  <td style="padding: 8px 0;">#${data.orderId}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                  <td style="padding: 8px 0; font-weight: bold;">Transaction ID:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #065f46;">${data.transactionId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Customer:</td>
                  <td style="padding: 8px 0;">${data.customerName} (${data.customerEmail})</td>
                </tr>
                <tr style="background: #f3f4f6;">
                  <td style="padding: 8px 0; font-weight: bold;">Payment Method:</td>
                  <td style="padding: 8px 0;">${data.paymentMethod}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Amount Paid:</td>
                  <td style="padding: 8px 0; font-weight: bold;">$${data.amount.toFixed(2)}</td>
                </tr>
                ${data.notes ? `
                <tr style="background: #f3f4f6;">
                  <td style="padding: 8px 0; font-weight: bold;">Notes:</td>
                  <td style="padding: 8px 0;">${data.notes}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; margin-top: 20px;">
              <p style="margin: 0; color: #065f46; font-weight: bold;">Next Step:</p>
              <p style="margin: 5px 0 0 0; color: #065f46; font-size: 14px;">Verify this transaction in your payment app (Zelle/Venmo/etc.) and process the order.</p>
            </div>
          </div>

          <div style="background: #334155; color: white; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 11px;">
            <p style="margin: 0;">Fresh Tropics Asian Fruits - Payment Verification System</p>
          </div>
        </body>
      </html>
    `

    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: "support@freshtropicsasianfruits.com",
          subject: ` Payment Verification: Order #${data.orderId} - ${data.transactionId}`,
          html: businessHtmlTemplate,
          replyTo: data.customerEmail
        })
      })
      return res.ok
    }

    console.log(" Payment verification email (simulated):", data)
    return true
  } catch (error) {
    console.error("Verification email service error:", error)
    return false
  }
}