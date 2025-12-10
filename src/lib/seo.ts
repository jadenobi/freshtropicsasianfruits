import { Metadata } from 'next'
import { Fruit } from '@/types'

export const DEFAULT_METADATA: Metadata = {
  title: 'Fresh Tropics Asian Fruits – Premium Fruit Shop',
  description: 'Buy premium fresh and organic fruits online. Fast delivery, curated selection, and farm-to-table quality.',
  keywords: ['Asian fruits', 'fresh fruits', 'tropical fruits', 'organic fruits', 'fruit delivery', 'pink pineapple', 'exotic fruits'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freshtropicsasianfruits.com',
    title: 'Fresh Tropics Asian Fruits',
    description: 'Premium fresh and organic Asian fruits delivered to your door',
    siteName: 'Fresh Tropics',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@freshtropics',
  },
}

export const getProductMetadata = (product: Fruit): Metadata => {
  const url = `https://freshtropicsasianfruits.com/product/${product.id}`
  
  return {
    title: `${product.name} - Fresh Tropics`,
    description: `${product.name} - Fresh ${product.category} fruit delivered. Rating: ${product.rating}/5 (${product.reviews} reviews). $${product.price}`,
    keywords: [
      product.name,
      product.category,
      'fresh fruits',
      'organic',
      'delivery',
      'premium fruits',
    ],
    openGraph: {
      type: 'product',
      url: url,
      title: product.name,
      description: product.description?.substring(0, 160) || 'Premium fresh fruit',
      images: [
        {
          url: product.image,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  }
}

export const getCategoryMetadata = (category: string, productCount: number): Metadata => {
  const categoryNames: Record<string, string> = {
    tropical: 'Tropical Fruits',
    exotic: 'Exotic Fruits',
    berries: 'Fresh Berries',
    citrus: 'Citrus Fruits',
    fresh: 'Fresh Fruits',
    organic: 'Organic Fruits',
  }

  const categoryDescriptions: Record<string, string> = {
    tropical: 'Discover our selection of fresh tropical fruits including mangoes, pineapples, and passion fruits.',
    exotic: 'Explore rare and exotic fruits from around the world. Premium quality, freshly delivered.',
    berries: 'Fresh berries including blueberries, strawberries, and raspberries. Organic and pesticide-free.',
    citrus: 'Fresh citrus fruits including oranges, lemons, and grapefruits. Rich in Vitamin C.',
    fresh: 'Our selection of fresh fruits, carefully curated for quality and freshness.',
    organic: 'Certified organic fruits, sustainably grown and delivered fresh to your door.',
  }

  const categoryName = categoryNames[category] || category
  const categoryDescription = categoryDescriptions[category] || `Browse our ${category} fruits`

  return {
    title: `${categoryName} - Fresh Tropics`,
    description: `${categoryDescription} Order online for fast delivery. ${productCount} products available.`,
    keywords: [category, 'fresh fruits', 'organic', 'delivery', 'premium'],
    openGraph: {
      type: 'website',
      title: categoryName,
      description: categoryDescription,
      url: `https://freshtropicsasianfruits.com/shop?category=${category}`,
    },
  }
}

// Structured Data (JSON-LD)
export const getProductStructuredData = (product: Fruit) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': product.images || [product.image],
    'brand': {
      '@type': 'Brand',
      'name': 'Fresh Tropics'
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://freshtropicsasianfruits.com/product/${product.id}`,
      'priceCurrency': 'USD',
      'price': product.price,
      'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': product.rating,
      'reviewCount': product.reviews,
    },
  }
}

export const getOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Fresh Tropics',
    'url': 'https://freshtropicsasianfruits.com',
    'logo': 'https://freshtropicsasianfruits.com/logo.svg',
    'description': 'Premium fresh and organic Asian fruits delivered to your door',
    'sameAs': [
      'https://www.facebook.com/freshtropics',
      'https://www.instagram.com/freshtropics',
      'https://www.twitter.com/freshtropics',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Support',
      'email': 'support@freshtropicsasianfruits.com',
    },
  }
}
