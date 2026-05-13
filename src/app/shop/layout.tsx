import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Asian & Tropical Fruits | Fresh Tropics',
  description: 'Browse our premium collection of fresh Asian and tropical fruits. Exotic fruits, organic produce, and fruit gift boxes with fast delivery.',
  openGraph: {
    title: 'Shop Fresh Asian & Tropical Fruits',
    description: 'Browse our premium collection of fresh Asian and tropical fruits with fast delivery',
    url: 'https://freshtropicsasianfruits.com/shop',
    type: 'website',
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
