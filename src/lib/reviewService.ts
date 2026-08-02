import { Review } from '@/types'

// Supabase is disabled per user request
// This service now returns local/mock data only

export async function addReview(
  productId: string,
  rating: number,
  title: string,
  comment: string,
  author: string
): Promise<Review> {
  console.log('Review feature is currently in local-only mode. Review not saved to database.')
  return {
    id: Math.random().toString(36).substr(2, 9),
    productId,
    rating,
    title,
    comment,
    author,
    date: new Date().toISOString(),
    helpful: 0
  }
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  // If the product is a Tree (uses fgt_ prefix)
  if (productId.startsWith('fgt_')) {
    return [
      {
        id: 'rt_1',
        productId,
        rating: 5,
        title: 'Arrived healthy and beautiful!',
        comment: 'I was initially worried about shipping a live tree, but it was packaged perfectly. The leaves are vibrant and it already has new growth forming after just two weeks!',
        author: 'Sarah M.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        helpful: 12
      },
      {
        id: 'rt_2',
        productId,
        rating: 5,
        title: 'Exceeded my expectations',
        comment: 'This tree is much larger than I anticipated and the root system looks incredibly healthy. It is settling into my garden nicely. Can\'t wait for it to bear fruit.',
        author: 'James H.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
        helpful: 8
      },
      {
        id: 'rt_3',
        productId,
        rating: 4,
        title: 'Great quality tree',
        comment: 'The tree looks very healthy overall. It dropped a couple of leaves after unpacking, but the support team told me that is normal transplant shock. It is bouncing back beautifully now.',
        author: 'Linda K.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
        helpful: 5
      }
    ]
  }

  // Returns generic mock data for standard fruit boxes
  return [
    {
      id: 'r_g_1',
      productId,
      rating: 5,
      title: 'Absolutely delicious!',
      comment: 'The quality of this fruit is unmatched. It arrived perfectly ripe and packaged with so much care. Will definitely be ordering again.',
      author: 'Michael T.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      helpful: 24
    },
    {
      id: 'r_g_2',
      productId,
      rating: 5,
      title: 'Best exotic fruits online',
      comment: 'I\'ve tried several fruit delivery services and Fresh Tropics is by far the best. The freshness is guaranteed and shipping is incredibly fast.',
      author: 'Jessica W.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
      helpful: 16
    }
  ]
}

export async function markHelpful(reviewId: string): Promise<void> {
  return
}

export async function getAverageRating(productId: string): Promise<number> {
  return 0
}
