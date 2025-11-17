# Fresh Tropics Asian Fruits — Premium Fruit Shop

A modern e-commerce platform for selling fresh, organic, and exotic fruits online. Built with [Next.js](https://nextjs.org), React, and Tailwind CSS.

## 🌟 Features

- **Product Catalog**: Browse fresh, organic, and exotic fruits with detailed descriptions and reviews
- **Shopping Cart**: Add items to cart with persistent localStorage storage
- **Secure Payment**: Email-based payment system with 7 payment methods (Stripe, PayPal, Apple Pay, Venmo, Cash App, Zelle, Crypto)
- **Order Confirmation**: Automated email with secure payment instructions
- **Premium UI**: Gradient animations, hover effects, and world-class design
- **Responsive Design**: Mobile-first design that works on all devices
- **Fast & Modern**: Built with Next.js 16 and React 19 for optimal performance
- **SEO Optimized**: Server-side rendering and metadata for better search visibility

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

   Or use the VS Code task: press `Ctrl+Shift+B` (or `Cmd+Shift+B` on macOS) and select "npm: dev"

3. **Open in browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app auto-reloads as you edit files

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Header, Footer, CartProvider
│   ├── page.tsx            # Home page with product grid
│   ├── not-found.tsx       # Custom 404 page
│   ├── about/              # About page
│   ├── cart/               # Shopping cart page
│   ├── contact/            # Contact page
│   ├── product/[id]/       # Product detail page
│   ├── shop/               # Shop/catalog page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header with cart count
│   ├── Footer.tsx          # Site footer
│   ├── ProductCard.tsx     # Product card component with add-to-cart
│   └── CartCount.tsx       # Cart item count badge
├── context/
│   └── CartContext.tsx     # Cart context exports (re-exports from lib/cart)
├── lib/
│   ├── cart.tsx            # Cart context and hooks (useCart, CartProvider)
│   └── data.ts             # Product data (FRUITS array)
└── types/
    └── index.ts            # TypeScript type definitions
```

## � Payment System

Fresh Tropics Asian Fruits features an **email-based secure payment system** where customers select their preferred payment method and receive secure payment instructions via email.

### Supported Payment Methods

| Method | Icon | Details |
|--------|------|---------|
| Credit Card | 💳 | Stripe checkout |
| PayPal | 🅿️ | PayPal transfer |
| Apple Pay | 🍎 | Apple merchant |
| Venmo | 💙 | Peer-to-peer |
| Cash App | 💵 | Cash App tag |
| Zelle | 🏦 | Bank transfer |
| Crypto | ₿ | Bitcoin/Ethereum/USDC |

### Setup Email Service

1. Copy `.env.local.example` to `.env.local`
2. Add your email provider API key:
   - **Resend** (recommended): `RESEND_API_KEY=re_...`
   - **SendGrid**: `SENDGRID_API_KEY=SG....`
   - **Gmail**: `EMAIL_USER=... EMAIL_PASS=...`

For detailed setup, see [PAYMENT_EMAIL_SYSTEM.md](./PAYMENT_EMAIL_SYSTEM.md)

## �🛠️ Tech Stack

- **Framework**: Next.js 16.0.1
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4 + PostCSS
- **TypeScript**: ^5
- **Linting**: ESLint 9
- **Fonts**: Geist (via next/font/google)
- **Email Service**: Resend (with SendGrid/SMTP fallbacks)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Recommended VS Code Extensions

To enhance your development experience, install these extensions:

- **[ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)** - Quick React snippets
- **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** - Tailwind class autocompletion
- **[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)** - Better TypeScript support
- **[Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** - Code formatting
- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** - Linting support

## 🔄 How to Add Products

Edit `src/lib/data.ts` and add new fruit objects to the `FRUITS` array following this structure:

```typescript
{
  id: '13',
  name: 'Your Fruit Name',
  category: 'fresh' | 'organic' | 'exotic' | 'seasonal',
  price: 9.99,
  originalPrice: 14.99,
  image: 'https://...',
  description: 'Fruit description',
  rating: 4.8,
  reviews: 120,
  inStock: true,
}
```

## 🛒 Cart Persistence

The cart is automatically saved to localStorage under the key `golden-orchard-cart`. Users' carts persist across browser sessions.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚢 Deployment

This app is ready to deploy on [Vercel](https://vercel.com), the creators of Next.js:

1. Push your code to GitHub
2. Import the repo in Vercel
3. Vercel will auto-detect Next.js and deploy

For other deployment options, see [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying).

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is open source and available under the MIT License.
