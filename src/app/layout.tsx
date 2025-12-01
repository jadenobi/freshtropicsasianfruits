import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/lib/cart'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'Fresh Tropics Asian Fruits – Premium Fruit Shop',
  description: 'Buy premium fresh and organic fruits online. Fast delivery, curated selection, and farm-to-table quality.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <CartProvider>
          {children}
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  )
}
