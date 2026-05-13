import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/lib/cart'
import TawkChat from '@/components/TawkChat'
import PWAInstaller from '@/components/PWAInstaller'

export const metadata: Metadata = {
  title: 'Fresh Tropics Asian Fruits – Premium Exotic & Tropical Fruit Delivery',
  description: 'Shop premium Asian & tropical fruits online: fresh lychee, dragon fruit, mango, durian, pineapple & more. Fast organic fruit delivery. Premium quality guaranteed.',
  keywords: [
    'asian fruits',
    'tropical fruits',
    'exotic fruits',
    'fresh fruit delivery',
    'buy asian fruits online',
    'organic fruits',
    'lychee fruit',
    'dragon fruit',
    'mango delivery',
    'durian',
    'premium fruit box',
    'fresh tropical fruit',
    'fruit gift box',
    'asian pineapple',
    'exotic fruit shop',
    'tropical fruit delivery',
    'fresh fruit online',
    'buy fruit online',
    'fruit baskets',
    'asian grocery'
  ],
  metadataBase: new URL('https://freshtropicsasianfruits.com'),
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://freshtropicsasianfruits.com',
  },
  openGraph: {
    title: 'Fresh Tropics – Premium Asian & Tropical Fruits',
    description: 'Fresh, organic Asian & tropical fruits delivered to your door. Farm-to-table quality.',
    url: 'https://freshtropicsasianfruits.com',
    siteName: 'Fresh Tropics',
    images: [
      {
        url: 'https://freshtropicsasianfruits.com/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Fresh Tropics Asian Fruits',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fresh Tropics – Premium Asian & Tropical Fruits',
    description: 'Fresh, organic Asian & tropical fruits delivered to your door.',
    images: ['https://freshtropicsasianfruits.com/logo.svg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Fresh Tropics',
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fresh Tropics',
    url: 'https://freshtropicsasianfruits.com',
    logo: 'https://freshtropicsasianfruits.com/logo.svg',
    description: 'Premium Asian & tropical fruits delivered fresh to your door',
    sameAs: [
      'https://www.facebook.com/freshtropics',
      'https://www.instagram.com/freshtropics',
      'https://www.twitter.com/freshtropics'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fresh Tropics',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@freshtropicsasianfruits.com'
    }
  }

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
        
        {/* JSON-LD Schema for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }} />
          </>
        )}
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        <CartProvider>
          {children}
          <TawkChat />
          <PWAInstaller />
        </CartProvider>
      </body>
    </html>
  )
}
