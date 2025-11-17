import { Review } from '@/types'
import { supabase } from './supabase'

export async function addReview(
  productId: string,
  rating: number,
  title: string,
  comment: string,
  author: string
): Promise<Review> {
  try {
    const { data: review, error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id: productId,
          rating,
          title,
          comment,
          author,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return {
      id: review.id,
      productId: review.product_id,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      author: review.author,
      date: review.created_at,
      helpful: review.helpful,
    }
  } catch (error) {
    console.error('Add review error:', error)
    throw error
  }
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (reviews || []).map((r: any) => ({
      id: r.id,
      productId: r.product_id,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      author: r.author,
      date: r.created_at,
      helpful: r.helpful,
    }))
  } catch (error) {
    console.error('Get reviews error:', error)
    return []
  }
}

export async function markHelpful(reviewId: string): Promise<void> {
  try {
    const { data: review, error: fetchError } = await supabase
      .from('reviews')
      .select('helpful')
      .eq('id', reviewId)
      .single()

    if (fetchError) throw fetchError

    await supabase
      .from('reviews')
      .update({ helpful: (review?.helpful || 0) + 1 })
      .eq('id', reviewId)
  } catch (error) {
    console.error('Mark helpful error:', error)
  }
}

export async function getAverageRating(productId: string): Promise<number> {
  try {
    const reviews = await getProductReviews(productId)
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
  } catch (error) {
    console.error('Get average rating error:', error)
    return 0
  }
}
