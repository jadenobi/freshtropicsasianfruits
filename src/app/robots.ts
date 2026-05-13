import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/.next/', '/node_modules/', '/_next/'],
      crawlDelay: 1,
    },
    sitemap: 'https://freshtropicsasianfruits.com/sitemap.xml',
  }
}
