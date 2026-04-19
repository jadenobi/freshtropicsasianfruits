# Email-Based Payment System Documentation

## Overview

Fresh Tropics uses a **secure email-based payment system** where customers select their preferred payment method and receive secure payment instructions via email instead of direct online payment processing.

### Benefits
- 🔒 **Secure**: Payment details sent only to verified customer email
- 💳 **Flexible**: 7 payment methods (Stripe, PayPal, Apple Pay, Venmo, Cash App, Zelle, Crypto)
- 🌍 **Global**: Works with international payment methods
- 📧 **Verified**: Customer receives order details to verify authenticity
- ⚡ **Simple**: No complex payment gateway integrations needed

---

## Payment Methods

| Method | Icon | Details |
|--------|------|---------|
| **Credit Card** | 💳 | Pay via Stripe with card |
| **PayPal** | 🅿️ | PayPal account transfer |
| **Apple Pay** | 🍎 | Apple Pay via merchant ID |
| **Venmo** | 💙 | Peer-to-peer payment |
| **Cash App** | 💵 | Cash App tag payment |
| **Zelle** | 🏦 | Bank transfer via Zelle |
| **Crypto** | ₿ | Bitcoin, Ethereum, USDC |

---

## System Architecture

### 1. User Journey

```
Customer → Selects Payment Method → 
Enters Name/Email → 
API Call to /api/send-payment-email → 
Email Service → 
Customer Receives Secure Instructions → 
Customer Completes Payment
```

### 2. Frontend Components

**Cart Page (`src/app/cart/page.tsx`)**
- 3-step checkout: Review → Shipping → Payment
- Payment method selection UI
- Order summary with totals
- Submits to API when "Send Me Payment Details" clicked

### 3. API Route (`src/app/api/send-payment-email/route.ts`)

```typescript
POST /api/send-payment-email
Content-Type: application/json

{
  orderId: "GO-1699123456-5678",
  customerEmail: "customer@example.com",
  customerName: "John Doe",
  items: [
    { name: "Organic Apples", quantity: 2, price: 5.99 },
    { name: "Bananas", quantity: 1, price: 3.99 }
  ],
  subtotal: 15.97,
  shipping: 0,
  tax: 1.60,
  total: 17.57,
  paymentMethodId: "paypal"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment instructions sent to your email",
  "orderId": "GO-1699123456-5678"
}
```

### 4. Email Service (`src/lib/emailService.ts`)

Handles email delivery with multiple provider support:
- **Primary**: Resend (Next.js optimized)
- **Fallback 1**: SendGrid
- **Fallback 2**: Gmail SMTP
- **Development**: Console logging

Each email includes:
- Order summary with items
- Total amount due
- Payment-specific instructions
- Security notice
- Contact information

### 5. Configuration (`src/config/payments.ts`)

Defines all payment methods with icons and metadata:

```typescript
export const PAYMENT_METHODS = [
  { id: "stripe", name: "Credit Card", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
  // ... more methods
]
```

---

## Setup Instructions

### Step 1: Environment Variables

Copy `.env.local.example` to `.env.local` and add your API key:

```bash
# Option A: Use Resend (Recommended)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Option B: Use SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxx

# Option C: Use Gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password

# Public email
NEXT_PUBLIC_PAYMENT_EMAIL=support@goldenorchard.com
```

### Step 2: Email Provider Setup

#### **Resend** (Recommended)
1. Sign up at https://resend.com
2. Create API key in dashboard
3. Add domain verification (optional but recommended)
4. Copy API key to `.env.local`

#### **SendGrid**
1. Sign up at https://sendgrid.com
2. Create API key in Settings → API Keys
3. Copy API key to `.env.local`

#### **Gmail SMTP**
1. Enable 2-factor authentication
2. Generate app password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`

### Step 3: Test Email Sending

```javascript
// In any API route or server action
import { sendPaymentEmail } from '@/lib/emailService'

const result = await sendPaymentEmail({
  orderId: "GO-test-123",
  customerEmail: "test@example.com",
  customerName: "Test User",
  items: [{ name: "Test", quantity: 1, price: 10.00 }],
  subtotal: 10,
  shipping: 5,
  tax: 1.50,
  total: 16.50,
  paymentMethodId: "paypal"
})

console.log(result) // { success: true }
```

---

## Email Template Structure

### Standard Payment Email

```
┌─────────────────────────────────────┐
│  🍎 Fresh Tropics (Gradient)       │
│  Premium Fresh Fruits Delivered     │
└─────────────────────────────────────┘
│                                     │
│  Payment Instructions               │
│  ─────────────────────────────────  │
│                                     │
│  Hi John Doe,                       │
│  Thank you for your order!          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Order #GO-1699123456-5678   │   │
│  │ Total: $17.57               │   │
│  └─────────────────────────────┘   │
│                                     │
│  📱 PayPal 🅿️                       │
│                                     │
│  Send to: paypal@goldenorchard.com │
│  Amount: $17.57                     │
│  Reference: Order GO-123-456       │
│                                     │
│  Order Summary                      │
│  ─────────────────────────────────  │
│  Apples (2) × $5.99 = $11.98       │
│  Bananas (1) × $3.99 = $3.99       │
│                                     │
│  Subtotal:           $15.97         │
│  Shipping:           $0.00 (FREE)   │
│  Tax (10%):          $1.60          │
│  ────────────────────────────       │
│  TOTAL:              $17.57         │
│                                     │
│  ⏰ Time-sensitive                  │
│  Please complete payment within     │
│  24 hours to secure your order.     │
│                                     │
│  🔒 This email contains sensitive   │
│  payment information. Do not share. │
│                                     │
└─────────────────────────────────────┘
```

---

## Payment Method Details

### 💳 Credit Card (Stripe)
- **Link**: https://checkout.stripe.com/pay
- **Security**: PCI DSS compliant
- **Processing Time**: Instant
- **Merchant**: Fresh Tropics Stripe account

### 🅿️ PayPal
- **Email**: paypal@goldenorchard.com
- **Method**: Friends & Family transfer recommended
- **Processing Time**: 1-2 minutes
- **Security**: PayPal buyer protection

### 🍎 Apple Pay
- **Merchant ID**: com.goldenorchard.payment
- **Device**: Apple device only
- **Instant Verification**: Face/Touch ID
- **Security**: Tokenized payment

### 💙 Venmo
- **Username**: @goldenorchard
- **Payment Type**: Private payment recommended
- **Processing Time**: Instant
- **Note**: Reference order ID in memo

### 💵 Cash App
- **Tag**: $GoldenOrchard
- **Processing Time**: Instant
- **Verification**: Order ID confirmation
- **Note**: Maximum $250/week for new users

### 🏦 Zelle
- **Email**: zelle@goldenorchard.com
- **Type**: Bank-to-bank transfer
- **Speed**: Same-day or next-day
- **Security**: Bank-level encryption

### ₿ Cryptocurrency
- **Bitcoin**: bc1qy2jzklqdhyzy8d2ytp4mfsq3orwxvvsqyujgm7
- **Ethereum**: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
- **USDC**: 0xA0b8991eFFc1b8b0991b5e4d37A6F9d1eF2c8f1a
- **Network**: Ethereum mainnet for USDC/ETH
- **Time-lock**: 24-hour hold for security

---

## Error Handling

### API Error Responses

```json
// Missing required fields
{
  "error": "Missing required fields"
}

// Invalid email format
{
  "error": "Invalid email address"
}

// Email service failure
{
  "error": "Failed to send payment email"
}

// Internal error
{
  "error": "Internal server error"
}
```

### Frontend Fallback

If email service is unavailable:
- Console logs order details for debugging
- Returns success response (order recorded)
- Logs visible in server logs for manual follow-up

---

## Security Considerations

✅ **What We Do:**
- Send payment details ONLY to verified customer email
- Include order confirmation to verify authenticity
- Never store payment details in database
- Use HTTPS for all communications
- 24-hour time limit encourages quick action
- Clear warnings about information sensitivity

⚠️ **What Users Should Do:**
- Never share payment email with others
- Verify payment instructions match the order
- Use trusted payment methods
- Check email security before entering credentials
- Report suspicious emails immediately

---

## Testing Workflow

### Development Mode
```bash
npm run dev
```

1. Go to http://localhost:3000/shop
2. Add items to cart
3. Proceed to checkout
4. Fill in shipping info
5. Select payment method
6. Enter email (can be test email)
7. Click "Send Me Payment Details"
8. Check server console for logged email details

### Production Testing
```bash
npm run build
npm start
```

With `RESEND_API_KEY` set, emails will be sent via Resend API.

---

## Monitoring & Debugging

### Check Email Logs
```bash
# Development: Watch server console
npm run dev

# Production: Check server logs for email details
```

### Verify API Endpoint
```bash
curl -X POST http://localhost:3000/api/send-payment-email \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "GO-test-123",
    "customerEmail": "test@example.com",
    "customerName": "Test User",
    "items": [{"name": "Test", "quantity": 1, "price": 10}],
    "subtotal": 10,
    "shipping": 0,
    "tax": 1,
    "total": 11,
    "paymentMethodId": "paypal"
  }'
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Emails not sending | Check `RESEND_API_KEY` in `.env.local` |
| Wrong payment details | Update `paymentInstructions` in `emailService.ts` |
| Email formatting broken | Check HTML template for syntax errors |
| 404 on API route | Ensure `src/app/api/send-payment-email/route.ts` exists |
| Cart not clearing | Check browser's localStorage is not blocking |

---

## Future Enhancements

- [ ] Webhook integration to auto-update order status when payment received
- [ ] SMS notification option alongside email
- [ ] In-app order tracking dashboard
- [ ] Payment confirmation upload interface
- [ ] Automated refund request system
- [ ] Multi-language email templates
- [ ] QR code for mobile payments
- [ ] Cryptocurrency price lock for 30 minutes

---

## Support

For issues or questions:
- **Email**: support@goldenorchard.com
- **Documentation**: See `PAYMENT_SYSTEM_README.md`
- **Issues**: Check `.github/SYSTEM_OVERVIEW.txt`

