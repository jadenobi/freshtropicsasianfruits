import { MetadataRoute } from 'next'
import { FRUITS } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://freshtropicsasianfruits.com'

  // Static pages
  const staticPages = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faq',
    '/terms',
    '/privacy',
    '/comparison',
    '/cart',
    '/reviews',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/shop' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Product pages
  const productPages = FRUITS.map(product => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Category pages
  const categories = ['tropical', 'exotic', 'berries', 'citrus', 'fresh', 'organic']
  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/shop?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages, ...categoryPages]
}
