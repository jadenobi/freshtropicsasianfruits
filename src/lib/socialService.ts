import { UserGeneratedContent, SocialShare } from '@/types'

// Mock UGC data
const MOCK_UGC: UserGeneratedContent[] = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Sarah Chen',
    userAvatar: '👩‍🦰',
    productId: '1',
    productName: 'Pink Glow Pineapple',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd93b93?w=500',
    caption: 'Obsessed with this pink pineapple! So sweet and juicy 🍍💕',
    likes: 342,
    comments: 28,
    rating: 5,
    platform: 'instagram',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
  {
    id: '2',
    userId: 'user-2',
    userName: 'Marcus Johnson',
    userAvatar: '👨‍💼',
    productId: '2',
    productName: 'Mango',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd93b93?w=500',
    caption: 'Fresh mango delivery arrived! Perfect quality 🥭',
    likes: 289,
    comments: 15,
    rating: 5,
    platform: 'instagram',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
  {
    id: '3',
    userId: 'user-3',
    userName: 'Emma Wilson',
    userAvatar: '👩‍🎨',
    productId: '4',
    productName: 'Dragon Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd93b93?w=500',
    caption: 'Dragon fruit smoothie bowl! 🐉✨ #healthyeating',
    likes: 456,
    comments: 42,
    rating: 5,
    platform: 'instagram',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
  {
    id: '4',
    userId: 'user-4',
    userName: 'David Brown',
    userAvatar: '👨‍🍳',
    productId: '1',
    productName: 'Pink Glow Pineapple',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd93b93?w=500',
    caption: 'Making tropical sorbet with Fresh Tropics 🍨',
    likes: 523,
    comments: 67,
    rating: 5,
    platform: 'tiktok',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
  },
  {
    id: '5',
    userId: 'user-5',
    userName: 'Lisa Chen',
    userAvatar: '👩‍⚕️',
    productId: '6',
    productName: 'Passion Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd93b93?w=500',
    caption: 'Passion fruit nutrition facts! High in vitamin C 🍊',
    likes: 278,
    comments: 34,
    rating: 5,
    platform: 'instagram',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    verified: false,
  },
]

// Get all UGC content
export function getAllUGC(): UserGeneratedContent[] {
  return MOCK_UGC.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get UGC by product
export function getUGCByProduct(productId: string): UserGeneratedContent[] {
  return MOCK_UGC.filter(ugc => ugc.productId === productId).sort(
    (a, b) => b.likes - a.likes
  )
}

// Get trending UGC (by likes)
export function getTrendingUGC(limit = 6): UserGeneratedContent[] {
  return MOCK_UGC.sort((a, b) => b.likes - a.likes).slice(0, limit)
}

// Get verified UGC only
export function getVerifiedUGC(): UserGeneratedContent[] {
  return MOCK_UGC.filter(ugc => ugc.verified).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

// Generate share URLs
export function generateShareURL(platform: string, productName: string, productUrl: string): string {
  const text = `Check out Fresh Tropics ${productName}! 🍎 Premium quality Asian fruits delivered fresh.`
  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(productUrl)

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    case 'instagram':
      return `https://www.instagram.com/`
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    default:
      return '#'
  }
}

// Get share button config
export function getShareButtons(productName: string, productUrl: string) {
  return [
    {
      name: 'Facebook',
      icon: '👍',
      color: '#1877F2',
      url: generateShareURL('facebook', productName, productUrl),
    },
    {
      name: 'Twitter',
      icon: '𝕏',
      color: '#000000',
      url: generateShareURL('twitter', productName, productUrl),
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      url: generateShareURL('whatsapp', productName, productUrl),
    },
    {
      name: 'LinkedIn',
      icon: '🔗',
      color: '#0077B5',
      url: generateShareURL('linkedin', productName, productUrl),
    },
  ]
}

// Simulate social login
export function handleSocialLogin(provider: 'google' | 'facebook' | 'apple') {
  // Mock social login - in production, use OAuth flows
  const mockUsers: Record<string, any> = {
    google: {
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: '👤',
      provider: 'google',
    },
    facebook: {
      email: 'user@facebook.com',
      name: 'Facebook User',
      avatar: '👤',
      provider: 'facebook',
    },
    apple: {
      email: 'user@icloud.com',
      name: 'Apple User',
      avatar: '👤',
      provider: 'apple',
    },
  }

  return mockUsers[provider]
}

// Get Instagram feed (mock)
export function getInstagramFeed() {
  return MOCK_UGC.filter(ugc => ugc.platform === 'instagram').slice(0, 6)
}

// Get TikTok feed (mock)
export function getTikTokFeed() {
  return MOCK_UGC.filter(ugc => ugc.platform === 'tiktok').slice(0, 4)
}

// Like UGC post
export function likeUGCPost(postId: string): UserGeneratedContent | null {
  const post = MOCK_UGC.find(p => p.id === postId)
  if (post) {
    post.likes += 1
  }
  return post || null
}

// Add comment to UGC
export function addCommentToUGC(postId: string): UserGeneratedContent | null {
  const post = MOCK_UGC.find(p => p.id === postId)
  if (post) {
    post.comments += 1
  }
  return post || null
}

// Get hashtag trending posts
export function getHashtagPosts(hashtag: string): UserGeneratedContent[] {
  return MOCK_UGC.filter(ugc => ugc.caption.toLowerCase().includes(hashtag.toLowerCase()))
}

// Share metrics
export function getShareMetrics() {
  return {
    totalShares: MOCK_UGC.reduce((sum, ugc) => sum + ugc.likes + ugc.comments, 0),
    instagramPosts: MOCK_UGC.filter(u => u.platform === 'instagram').length,
    tiktokPosts: MOCK_UGC.filter(u => u.platform === 'tiktok').length,
    verifiedPosts: MOCK_UGC.filter(u => u.verified).length,
    totalEngagement: MOCK_UGC.reduce((sum, ugc) => sum + ugc.likes + ugc.comments, 0),
  }
}
