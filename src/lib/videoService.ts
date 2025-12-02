// Video data and utilities for Fresh Tropics platform
// Provides mock video content for products, recipes, and storage tips

export type VideoCategory = 'product-demo' | 'recipe' | 'storage-tips' | 'hero' | 'testimonial'

export type Video = {
  id: string
  title: string
  description: string
  category: VideoCategory
  productId?: string
  productName?: string
  videoId: string // YouTube video ID
  thumbnail: string
  duration: string
  views: number
  likes: number
  uploadedAt: string
  creator: string
  tags: string[]
}

export const videos: Video[] = [
  // Hero Videos
  {
    id: 'hero-1',
    title: 'Welcome to Fresh Tropics - Premium Asian Fruits',
    description: 'Discover the world of exotic, premium Asian fruits delivered fresh to your door.',
    category: 'hero',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: '🍍',
    duration: '2:15',
    views: 145000,
    likes: 8900,
    uploadedAt: '2025-11-15',
    creator: 'Fresh Tropics Team',
    tags: ['intro', 'premium', 'exotic'],
  },

  // Product Demo Videos
  {
    id: 'product-1',
    title: 'Pink Glow Pineapple - The Crown Jewel',
    description: 'Experience the legendary Pink Glow Pineapple - the most coveted fruit in the world.',
    category: 'product-demo',
    productId: 'pinkglow',
    productName: 'Pink Glow Pineapple',
    videoId: 'H-XxNQHXLKA',
    thumbnail: '🍍',
    duration: '3:45',
    views: 267000,
    likes: 19200,
    uploadedAt: '2025-10-20',
    creator: 'Fruit Expert Mike',
    tags: ['pineapple', 'luxury', 'review'],
  },
  {
    id: 'product-2',
    title: 'Dragon Fruit - Nature\'s Masterpiece',
    description: 'Unbox and slice into the vibrant dragon fruit with creamy white or magenta flesh.',
    category: 'product-demo',
    productId: 'dragonfruit',
    productName: 'Dragon Fruit',
    videoId: 'lKxXwJ-dZ7M',
    thumbnail: '🐉',
    duration: '2:30',
    views: 189000,
    likes: 14300,
    uploadedAt: '2025-10-18',
    creator: 'Tropical Taste Test',
    tags: ['dragon-fruit', 'exotic', 'unboxing'],
  },
  {
    id: 'product-3',
    title: 'Ataulfo Mango - The Golden King',
    description: 'The world\'s finest mango with buttery, complex flavor profile.',
    category: 'product-demo',
    productId: 'mango',
    productName: 'Ataulfo Mango',
    videoId: 'I8gx1pMbFLg',
    thumbnail: '🥭',
    duration: '4:00',
    views: 312000,
    likes: 25600,
    uploadedAt: '2025-10-15',
    creator: 'Culinary Chronicles',
    tags: ['mango', 'premium', 'tasting'],
  },
  {
    id: 'product-4',
    title: 'Rambutan - The Hairy Delight',
    description: 'Soft, sweet, and translucent - the rambutan is a tropical gem.',
    category: 'product-demo',
    productId: 'rambutan',
    productName: 'Rambutan',
    videoId: 'o5k_j_jYa9U',
    thumbnail: '🍒',
    duration: '2:15',
    views: 98000,
    likes: 7200,
    uploadedAt: '2025-10-10',
    creator: 'Exotic Fruits Daily',
    tags: ['rambutan', 'exotic', 'how-to'],
  },

  // Recipe Videos
  {
    id: 'recipe-1',
    title: 'Tropical Mango Smoothie Bowl',
    description: 'Create a gorgeous and nutritious smoothie bowl with fresh dragon fruit and mango.',
    category: 'recipe',
    productId: 'mango',
    productName: 'Ataulfo Mango',
    videoId: 'WxWH7p6Aew8',
    thumbnail: '🥣',
    duration: '5:30',
    views: 421000,
    likes: 38500,
    uploadedAt: '2025-10-25',
    creator: 'Wellness Kitchen',
    tags: ['recipe', 'breakfast', 'smoothie'],
  },
  {
    id: 'recipe-2',
    title: 'Dragon Fruit Chia Pudding',
    description: 'No-cook dessert that\'s healthy, beautiful, and incredibly delicious.',
    category: 'recipe',
    productId: 'dragonfruit',
    productName: 'Dragon Fruit',
    videoId: 'lXb3EKusqe8',
    thumbnail: '🍮',
    duration: '4:15',
    views: 267000,
    likes: 22100,
    uploadedAt: '2025-10-22',
    creator: 'Dessert Simple',
    tags: ['recipe', 'dessert', 'healthy'],
  },
  {
    id: 'recipe-3',
    title: 'Asian Fruit Sorbet Trio',
    description: 'Make refreshing sorbets using fresh dragon fruit, mango, and passion fruit.',
    category: 'recipe',
    videoId: 'q5EsJFH6DEc',
    thumbnail: '🍨',
    duration: '6:45',
    views: 189000,
    likes: 15600,
    uploadedAt: '2025-10-19',
    creator: 'Ice Cream Dreams',
    tags: ['recipe', 'dessert', 'sorbet'],
  },
  {
    id: 'recipe-4',
    title: 'Tropical Fruit Salad with Honey Lime',
    description: 'A vibrant, refreshing salad perfect for any occasion.',
    category: 'recipe',
    videoId: 'TIvPt1Laq2I',
    thumbnail: '🥗',
    duration: '3:50',
    views: 342000,
    likes: 29800,
    uploadedAt: '2025-10-16',
    creator: 'Healthy Eats',
    tags: ['recipe', 'salad', 'healthy'],
  },

  // Storage Tips Videos
  {
    id: 'storage-1',
    title: 'How to Store Dragon Fruit - Keep It Fresh for 2 Weeks',
    description: 'Expert tips on properly storing dragon fruit to maximize freshness and flavor.',
    category: 'storage-tips',
    productId: 'dragonfruit',
    productName: 'Dragon Fruit',
    videoId: 'I9Qy0YHWrFY',
    thumbnail: '❄️',
    duration: '2:40',
    views: 156000,
    likes: 11200,
    uploadedAt: '2025-10-14',
    creator: 'Fresh Food Expert',
    tags: ['storage', 'tips', 'preservation'],
  },
  {
    id: 'storage-2',
    title: 'Perfect Mango Ripening - Temperature & Timing Guide',
    description: 'Learn the science behind perfect mango ripening for optimal sweetness.',
    category: 'storage-tips',
    productId: 'mango',
    productName: 'Ataulfo Mango',
    videoId: 'zEBTZjD0Cs0',
    thumbnail: '⏱️',
    duration: '3:20',
    views: 234000,
    likes: 18900,
    uploadedAt: '2025-10-12',
    creator: 'Fruit Science',
    tags: ['storage', 'ripening', 'tips'],
  },
  {
    id: 'storage-3',
    title: 'Pineapple Storage Secrets - 3 Methods Compared',
    description: 'Compare three storage methods to find what works best for your lifestyle.',
    category: 'storage-tips',
    videoId: 'bCmfVrq7YkM',
    thumbnail: '🍍',
    duration: '4:10',
    views: 187000,
    likes: 14500,
    uploadedAt: '2025-10-08',
    creator: 'Kitchen Hacks',
    tags: ['storage', 'pineapple', 'comparison'],
  },

  // Testimonial Videos
  {
    id: 'testimonial-1',
    title: 'Customer Review - Premium Pink Glow Pineapple',
    description: 'Real customer shares their unboxing and tasting experience.',
    category: 'testimonial',
    productId: 'pinkglow',
    productName: 'Pink Glow Pineapple',
    videoId: 'fLGT2_cQN3U',
    thumbnail: '⭐',
    duration: '3:15',
    views: 98000,
    likes: 8200,
    uploadedAt: '2025-11-01',
    creator: 'Sarah M.',
    tags: ['review', 'testimonial', 'customer'],
  },
  {
    id: 'testimonial-2',
    title: 'Why I Subscribe to Fresh Tropics Monthly',
    description: 'A loyal customer explains why the subscription is worth it.',
    category: 'testimonial',
    videoId: 'ZX3vr28KLyI',
    thumbnail: '👍',
    duration: '2:45',
    views: 142000,
    likes: 11800,
    uploadedAt: '2025-10-28',
    creator: 'James L.',
    tags: ['testimonial', 'subscription', 'review'],
  },
]

/**
 * Get videos by category
 */
export function getVideosByCategory(category: VideoCategory): Video[] {
  return videos.filter((v) => v.category === category)
}

/**
 * Get videos for product
 */
export function getProductVideos(productId: string): Video[] {
  return videos.filter((v) => v.productId === productId)
}

/**
 * Get featured videos
 */
export function getFeaturedVideos(limit: number = 6): Video[] {
  return videos
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

/**
 * Search videos
 */
export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase()
  return videos.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

/**
 * Get related videos
 */
export function getRelatedVideos(videoId: string, limit: number = 3): Video[] {
  const video = videos.find((v) => v.id === videoId)
  if (!video) return []

  return videos
    .filter((v) => v.id !== videoId && v.category === video.category)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

/**
 * Format view count
 */
export function formatViewCount(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

/**
 * Get video embed URL
 */
export function getVideoEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`
}
