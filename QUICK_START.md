# 🚀 Quick Start: Payment System Integration

Get your email-based payment system live in 5 minutes!

## Step 1: Choose Email Service ⚙️

**Recommended:** Resend (easiest for React projects)

### Option A: Resend (Easiest) ✨
```bash
npm install resend
```

Go to: https://resend.com
- Sign up (free trial available)
- Create API key
- Verify sender domain (optional, use default for testing)

### Option B: SendGrid
```bash
npm install @sendgrid/mail
```

Go to: https://sendgrid.com
- Sign up (free trial: 100 emails/day)
- Create API key

### Option C: Nodemailer (Gmail)
```bash
npm install nodemailer
```

- Use Gmail SMTP settings
- Create app-specific password

## Step 2: Add Environment Variables 🔐

Create `.env.local` in project root:

### For Resend:
```
RESEND_API_KEY=re_your_actual_api_key_here
```

### For SendGrid:
```
SENDGRID_API_KEY=SG.your_actual_api_key_here
```

### For Nodemailer:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Step 3: Update Email Service 📧

Open `src/lib/emailService.ts`

Replace the `sendOrderConfirmationEmail` function:

### For Resend:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail(order: OrderData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailHtml = generateOrderConfirmationEmail(order)
    
    const response = await resend.emails.send({
      from: 'orders@goldenliveorchard.com',
      to: order.customerEmail,
      subject: `Order Confirmed: ${order.orderNumber} - Golden Orchard`,
      html: emailHtml,
    })

    if (response.error) {
      console.error('❌ Failed to send email:', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('✅ Email sent successfully:', response.id)
    return { success: true, messageId: response.id }
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

### For SendGrid:
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function sendOrderConfirmationEmail(order: OrderData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailHtml = generateOrderConfirmationEmail(order)
    
    const msg = {
      to: order.customerEmail,
      from: 'orders@goldenliveorchard.com',
      subject: `Order Confirmed: ${order.orderNumber} - Golden Orchard`,
      html: emailHtml,
    }

    const response = await sgMail.send(msg)
    console.log('✅ Email sent successfully')
    return { success: true, messageId: response[0].headers['x-message-id'] }
  } catch (error) {
    console.error('❌ Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

### For Nodemailer:
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendOrderConfirmationEmail(order: OrderData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailHtml = generateOrderConfirmationEmail(order)
    
    const info = await transporter.sendMail({
      from: 'orders@goldenliveorchard.com',
      to: order.customerEmail,
      subject: `Order Confirmed: ${order.orderNumber} - Golden Orchard`,
      html: emailHtml,
    })

    console.log('✅ Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

## Step 4: Update Cart Checkout 🛒

Open `src/app/cart/page.tsx`

Import the email service at the top:
```typescript
import { sendOrderConfirmationEmail, type OrderData } from "@/lib/emailService"
```

Replace `handleSubmitPayment` function:
```typescript
const handleSubmitPayment = async () => {
  if (!customerName || !customerEmail) {
    alert("Please fill in your name and email first")
    setCheckoutStep("shipping")
    return
  }

  const newOrderNumber = generateOrderNumber()
  
  // Create order data
  const orderData: OrderData = {
    orderNumber: newOrderNumber,
    customerName,
    customerEmail,
    items: items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      cartQuantity: item.cartQuantity,
      category: item.category,
    })),
    subtotal,
    shipping: subtotal > 50 ? 0 : 5.99,
    tax,
    total: finalTotal,
    paymentMethod: selectedPayment,
  }

  // Send email
  const result = await sendOrderConfirmationEmail(orderData)
  
  if (result.success) {
    setOrderNumber(newOrderNumber)
    setShowConfirmation(true)
    clearCart()
  } else {
    alert(`Failed to send email: ${result.error}\n\nOrder was recorded but email failed.`)
  }
}
```

## Step 5: Test It Out 🧪

### Test in Development:
```bash
npm run dev
```

1. Visit http://localhost:3000
2. Go to /shop
3. Add items to cart
4. Proceed to checkout
5. Fill in all details
6. Click "Send Me Payment Details"
7. Check your email! 📧

### View Email Preview:
Visit http://localhost:3000/email-preview to see what emails look like for each payment method

### Read Documentation:
Visit http://localhost:3000/payment-system for complete payment system info

## Step 6: Deploy to Production 🚀

### Build for production:
```bash
npm run build
```

### Deploy to Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

**Important:** Add environment variables in Vercel dashboard:
1. Go to Project Settings
2. Environment Variables
3. Add your API key

### Or deploy to your hosting:
- Copy `.env.local` to production environment
- Deploy built files
- Test again with real orders

## Troubleshooting 🔧

### Email not sending?
- [ ] Check API key in `.env.local`
- [ ] Verify environment variable name is correct
- [ ] Check email service dashboard for errors
- [ ] Look at console logs for error messages

### Email looks different?
- [ ] Different email clients render HTML differently
- [ ] Test in multiple email providers
- [ ] Check mobile version
- [ ] Preview tool at `/email-preview` shows how it should look

### Payment method not showing?
- [ ] Refresh browser (clear cache)
- [ ] Check `PAYMENT_METHODS` in `src/config/payments.ts`
- [ ] Verify all methods have correct structure

### Order not saving?
- [ ] Check browser console for errors
- [ ] Verify all form fields are filled
- [ ] Check localStorage for cart data
- [ ] Clear browser storage and try again

## What's Next? 🎯

### Immediate:
- ✅ Email integration complete
- ✅ Payment system live
- ✅ Customers receiving emails

### Short Term (1-2 weeks):
- [ ] Monitor orders & emails
- [ ] Collect customer feedback
- [ ] Add payment verification webhook
- [ ] Set up automatic payment notifications

### Medium Term (1-2 months):
- [ ] Add SMS reminders
- [ ] Implement subscription orders
- [ ] Create admin dashboard
- [ ] Add order tracking system

### Long Term (3+ months):
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Loyalty program
- [ ] B2B wholesale

## Quick Reference 📚

### Files Modified:
- `src/lib/emailService.ts` - Add email service integration
- `src/app/cart/page.tsx` - Add email sending to checkout
- `.env.local` - Add API credentials (create this file)

### Key Functions:
- `generateOrderConfirmationEmail(order)` - Creates HTML email
- `sendOrderConfirmationEmail(order)` - Sends email via service
- `generateOrderNumber()` - Creates unique order ID

### Testing URLs:
- `http://localhost:3000` - Home page
- `http://localhost:3000/shop` - Shop products
- `http://localhost:3000/cart` - Checkout
- `http://localhost:3000/email-preview` - Email templates
- `http://localhost:3000/payment-system` - Documentation

## Support 💬

**Need help?**
- Review `PAYMENT_SYSTEM.md` for detailed guide
- Check `IMPLEMENTATION_SUMMARY.md` for complete overview
- Email service docs:
  - Resend: https://resend.com/docs
  - SendGrid: https://sendgrid.com/docs
  - Nodemailer: https://nodemailer.com

**Got it working?** 🎉

That's awesome! You now have a professional, secure payment system handling customer orders with beautiful emails. Time to celebrate! 🌳✨

