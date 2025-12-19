import { PAYMENT_METHODS } from "@/config/payments"

export interface OrderData {
  orderId: string
  customerEmail: string
  customerName: string
  items: Array<{ name: string; quantity: number; price: number }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethodId: string
}

const paymentInstructions: Record<string, string> = {
  stripe: "Pay securely using Credit Card at: https://checkout.stripe.com/pay\nMerchant: Fresh Tropics Asian Fruits\nAmount: $[TOTAL]",
  paypal: "Send payment to: freshtropicsasianfruits@gmail.com\nAmount: $[TOTAL]\nReference: Order [ORDER_ID]\nNote: Include order number in payment notes",
  apple_pay: "Recipient: Fresh Tropics Asian Fruits\nAmount: $[TOTAL]\nReference: Order [ORDER_ID]",
  venmo: "Send to: @FreshTropicsAsianFruits\nAmount: $[TOTAL]\nMemo: Order [ORDER_ID]",
  cashapp: "Send to: $FreshTropicsAsianFruits\nAmount: $[TOTAL]\nNote: Order [ORDER_ID]",
  zelle: "Send to email: freshtropicsasianfruits@gmail.com\nAmount: $[TOTAL]\nReference: Order [ORDER_ID]",
  crypto: "Bitcoin Address: [ADD YOUR BTC ADDRESS]\nEthereum: [ADD YOUR ETH ADDRESS]\nUSDC: [ADD YOUR USDC ADDRESS]\n\nNote: Include order number in transaction memo"
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
            <h1 style="margin: 0; font-size: 28px;">🍎 Fresh Tropics Asian Fruits</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">NEW ORDER RECEIVED - SECURE RECORD</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #d1d5db;">Business Order Confirmation</p>
          </div>

          <div style="background: #f9fafb; padding: 30px;">
            <h2 style="color: #065f46; margin-top: 0;">📋 ORDER DETAILS</h2>

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

            <h3 style="color: #065f46; margin-bottom: 15px;">🛍️ ITEMS ORDERED</h3>
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

            <h3 style="color: #065f46; margin-bottom: 15px;">💰 PRICING BREAKDOWN</h3>
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
              <p style="margin: 0; color: #92400e; font-weight: bold;">⚠️ ACTION REQUIRED</p>
              <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">Awaiting payment confirmation. Customer has been sent payment instructions.</p>
            </div>
          </div>

          <div style="background: #065f46; color: white; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
            <p style="margin: 0 0 10px 0;">🔒 SECURE BUSINESS RECORD</p>
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
            from: "onboarding@resend.dev",
            to: "freshtropicsasianfruits@gmail.com",
            subject: `🍎 NEW ORDER #${order.orderId} - $${order.total.toFixed(2)} - Business Confirmation`,
            html: businessHtmlTemplate,
            replyTo: order.customerEmail
          })
        })
        
        if (res.ok) {
          console.log(`✅ Business confirmation email sent for order #${order.orderId}`)
          return true
        }
        
        const errorData = await res.json()
        console.error("Resend error:", errorData)
      } catch (e) {
        console.error("Resend fetch error:", e)
      }
    }

    console.log(`📧 Business email would be sent for order #${order.orderId}`)
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

    const instructions = paymentInstructions[order.paymentMethodId]
      .replace("[TOTAL]", order.total.toFixed(2))
      .replace("[ORDER_ID]", order.orderId)

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); color: white; padding: 40px 30px; text-align: center;">
            <div style="font-size: 40px; margin-bottom: 15px;">🍎</div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Fresh Tropics</h1>
            <p style="margin: 8px 0 0 0; font-size: 15px; font-weight: 300; opacity: 0.95;">Premium Asian Tropical Fruits</p>
          </div>

          <!-- Main Content -->
          <div style="background: white; padding: 40px 30px;">
            <!-- Greeting -->
            <p style="margin: 0 0 10px 0; font-size: 15px; color: #64748b;">Hi ${order.customerName},</p>
            <h2 style="margin: 0 0 25px 0; font-size: 24px; color: #1e293b; font-weight: 700;">Thank You for Your Order! ✨</h2>
            <p style="margin: 0 0 30px 0; font-size: 15px; color: #475569; line-height: 1.6;">We're delighted to have you as a customer. Your fresh tropical fruits are being prepared with care. Please complete your payment using one of the methods below.</p>

            <!-- Order Summary Card -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #f0fdfa 100%); border: 2px solid #065f46; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 14px; color: #065f46; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Order Number</span>
                <span style="font-size: 20px; font-weight: 700; color: #065f46; font-family: 'Courier New', monospace;">#${order.orderId}</span>
              </div>
              <div style="border-top: 1px solid rgba(6, 95, 70, 0.2); padding-top: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span style="font-size: 14px; color: #64748b;">Order Total</span>
                  <span style="font-size: 28px; font-weight: 700; color: #065f46;">$${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div style="margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1e293b; font-weight: 600;">Payment Method</h3>
              <div style="background: #f8fafc; border-left: 4px solid #d97706; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 24px; margin-right: 12px;">${method.icon}</span>
                  <span style="font-size: 16px; font-weight: 600; color: #1e293b;">${method.name}</span>
                </div>
                <div style="background: white; border-radius: 6px; padding: 15px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.8; color: #334155; white-space: pre-wrap; word-wrap: break-word; border: 1px solid #e2e8f0;">${instructions}</div>
              </div>
            </div>

            <!-- Items Breakdown -->
            <div style="margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1e293b; font-weight: 600;">Order Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                <thead>
                  <tr style="border-bottom: 2px solid #e2e8f0;">
                    <th style="padding: 12px 0; text-align: left; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Item</th>
                    <th style="padding: 12px 0; text-align: center; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Qty</th>
                    <th style="padding: 12px 0; text-align: right; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items.map((item, idx) => `
                    <tr style="border-bottom: 1px solid #e2e8f0; background: ${idx % 2 === 0 ? '#f8fafc' : 'white'};">
                      <td style="padding: 14px 0; font-size: 14px; color: #1e293b;">${item.name}</td>
                      <td style="padding: 14px 0; text-align: center; font-size: 14px; color: #475569; font-weight: 500;">${item.quantity}</td>
                      <td style="padding: 14px 0; text-align: right; font-size: 14px; color: #1e293b; font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>

              <!-- Pricing Summary -->
              <div style="background: #f0fdf4; border-radius: 8px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #bbf7d0;">
                  <span style="color: #475569; font-size: 14px;">Subtotal</span>
                  <span style="color: #1e293b; font-weight: 600;">$${order.subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #bbf7d0;">
                  <span style="color: #475569; font-size: 14px;">Shipping</span>
                  <span style="color: #1e293b; font-weight: 600;">$${order.shipping.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 2px solid #065f46;">
                  <span style="color: #475569; font-size: 14px;">Tax (10%)</span>
                  <span style="color: #1e293b; font-weight: 600;">$${order.tax.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span style="color: #065f46; font-size: 15px; font-weight: 600; text-transform: uppercase;">Total</span>
                  <span style="font-size: 26px; font-weight: 700; color: #065f46;">$${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <!-- Action Reminder -->
            <div style="background: #fef3c7; border-left: 4px solid #d97706; border-radius: 8px; padding: 18px; margin-bottom: 30px;">
              <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 14px;">⏰ Complete Payment Within 24 Hours</p>
              <p style="margin: 8px 0 0 0; color: #92400e; font-size: 13px; line-height: 1.5;">Your order will be processed immediately upon payment confirmation to ensure the freshest delivery.</p>
            </div>

            <!-- Support Section -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
              <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #1e293b;">Need Help?</p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Contact us at <span style="color: #d97706; font-weight: 600;">freshtropicsasianfruits@gmail.com</span>
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #065f46; color: white; padding: 30px; text-align: center;">
            <p style="margin: 0 0 15px 0; font-size: 13px; font-weight: 600;">Fresh Tropics Asian Fruits</p>
            <p style="margin: 0 0 15px 0; font-size: 12px; opacity: 0.8; line-height: 1.6;">
              🌏 Premium Quality | 🚚 Fast Delivery | 🍎 100% Fresh
            </p>
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 15px; margin-top: 15px;">
              <p style="margin: 0; font-size: 11px; opacity: 0.7;">🔒 Secure Transaction | This email contains your payment details. Please do not share.</p>
            </div>
          </div>
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
          : 'freshtropicsasianfruits@gmail.com'
        
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: "freshtropicsasianfruits@gmail.com",
            to: recipientEmail,
            subject: `🍎 Payment Instructions - Order #${order.orderId}`,
            html: htmlTemplate,
            replyTo: "freshtropicsasianfruits@gmail.com"
          })
        })
        
        if (res.ok) {
          console.log(`✅ Email sent successfully to: ${recipientEmail}`)
          return true
        }
        
        const errorData = await res.json()
        console.error("Resend error:", errorData)
      } catch (e) {
        console.error("Resend fetch error:", e)
      }
    }

    // Fallback: log for development
    console.log(`📧 Payment email would be sent to: ${order.customerEmail}`)
    console.log(`Order: #${order.orderId} | Amount: $${order.total.toFixed(2)} | Method: ${method.name}`)
    return true
  } catch (error) {
    console.error("Email service error:", error)
    return false
  }
}