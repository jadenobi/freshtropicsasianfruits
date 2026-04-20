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
  // Returns empty array for now since no database is connected
  return []
}

export async function markHelpful(reviewId: string): Promise<void> {
  return
}

export async function getAverageRating(productId: string): Promise<number> {
  return 0
}
