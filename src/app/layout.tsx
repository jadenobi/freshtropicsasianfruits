import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/lib/cart'
import ChatWidget from '@/components/ChatWidget'
import PWAInstaller from '@/components/PWAInstaller'

export const metadata: Metadata = {
  title: 'Fresh Tropics Asian Fruits – Premium Fruit Shop',
  description: 'Buy premium fresh and organic fruits online. Fast delivery, curated selection, and farm-to-table quality.',
  metadataBase: new URL('https://freshtropicsasianfruits.com'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Fresh Tropics',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fresh Tropics" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        <CartProvider>
          {children}
          <ChatWidget />
          <PWAInstaller />
        </CartProvider>
      </body>
    </html>
  )
}
