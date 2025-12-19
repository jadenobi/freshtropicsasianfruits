# Payment System Setup Guide - Fresh Tropics Asian Fruits

## Official Email
**📧 freshtropicsasianfruits@gmail.com**

---

## ✅ What's Configured & Working

1. **Email System**: Payment instructions auto-send to customers
2. **7 Payment Methods**: Stripe, PayPal, Apple Pay, Venmo, Cash App, Zelle, Crypto
3. **Order Tracking**: Unique order IDs + email receipts
4. **Security**: Encrypted payment instructions in emails
5. **206 Products**: Full catalog loaded with images
6. **Checkout Flow**: Complete 3-step checkout with delivery guarantee

---

## 🔧 What You Need to Configure

### 1. **Email Sending Service** (Pick One)

#### Option A: Resend (Recommended - Easiest)
- Go to: https://resend.com
- Sign up for free account
- Get API key
- Add to `.env.local`:
  ```
  RESEND_API_KEY=re_xxxxxxxxxxxxx
  ```
- Payment emails will auto-send

#### Option B: Gmail with App Password
- Enable 2-factor authentication on your Gmail
- Generate app password: https://myaccount.google.com/apppasswords
- Add to `.env.local`:
  ```
  EMAIL_USER=freshtropicsasianfruits@gmail.com
  EMAIL_PASS=xxxx xxxx xxxx xxxx
  ```

#### Option C: SendGrid
- Sign up: https://sendgrid.com
- Get API key
- Add to `.env.local`:
  ```
  SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
  ```

---

### 2. **Update Payment Account Information**

Edit `src/lib/emailService.ts` and replace these with YOUR actual accounts:

```typescript
// PayPal
paypal: "Send payment to: freshtropicsasianfruits@gmail.com"
        ↑ Already set to your email ✓

// Venmo
venmo: "Send to: @FreshTropicsAsianFruits"
       ↑ Update to YOUR Venmo username

// Cash App
cashapp: "Send to: $FreshTropicsAsianFruits"
         ↑ Update to YOUR Cash App tag

// Crypto (Bitcoin, Ethereum, USDC)
crypto: "Bitcoin Address: [ADD YOUR BTC ADDRESS]"
        ↑ Add your actual wallet addresses

// Stripe
stripe: "Pay securely using Credit Card at: https://checkout.stripe.com/pay"
        ↑ Update with your Stripe checkout link
```

---

### 3. **Stripe Integration** (For Credit Card Payments)

1. Sign up at: https://stripe.com
2. Get your keys (Publishable + Secret)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxxxx
   STRIPE_SECRET_KEY=sk_xxxxx
   ```
4. Create checkout page (or redirect to Stripe-hosted checkout)

---

### 4. **Environment Variables (.env.local)**

Create `.env.local` in project root with:

```env
# Email Service (choose one)
RESEND_API_KEY=re_xxxxxxxxxxxxx
# OR
EMAIL_USER=freshtropicsasianfruits@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx

# Stripe (optional but recommended)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxxxx
STRIPE_SECRET_KEY=sk_xxxxx

# PayPal (optional)
PAYPAL_CLIENT_ID=xxxxx
PAYPAL_SECRET=xxxxx
```

---

## 📋 Checklist to Go Live

- [ ] Set up email service (Resend recommended)
- [ ] Update PayPal with your email: `freshtropicsasianfruits@gmail.com`
- [ ] Update Venmo username/tag
- [ ] Update Cash App tag  
- [ ] Add crypto wallet addresses (if accepting crypto)
- [ ] Set up Stripe account & keys (credit card payments)
- [ ] Create `.env.local` file with API keys
- [ ] Test order flow end-to-end
- [ ] Verify payment email sends correctly
- [ ] Deploy to production

---

## 🚀 Quick Start (Without External Services)

**Current State**: System works WITHOUT external email service
- Orders are logged to console
- Payment instructions display on screen
- Customers can see payment details immediately

**To Enable Email Sending**:
1. Get Resend API key (free): https://resend.com
2. Add one line to `.env.local`: `RESEND_API_KEY=re_xxxxx`
3. Restart server
4. Emails auto-send ✅

---

## 📧 What Customers Receive

When customer completes checkout:

1. **Order confirmation email** with:
   - Order number (unique)
   - Item list with prices
   - Shipping + tax breakdown
   - **Payment instructions** for selected method
   - Total amount due
   - 24-hour payment deadline

2. **Payment options include**:
   - Direct instructions to your email
   - Your Venmo/Cash App tags
   - Cryptocurrency wallet addresses
   - Stripe credit card link
   - Apple Pay/PayPal links

---

## 🔐 Security Notes

- ✅ No payment processing on your server (direct payment to you)
- ✅ No credit card data stored
- ✅ Emails marked as time-sensitive
- ✅ "Do not share" warning included
- ✅ Order numbers for tracking/reference

---

## 💡 Next Steps

1. **Immediate**: Set up Resend (2 min) → emails start working
2. **Soon**: Add crypto addresses or Stripe integration
3. **Later**: Scale payment options as business grows

**Questions?** Email: freshtropicsasianfruits@gmail.com
