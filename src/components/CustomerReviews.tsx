'use client'

import { useState, useEffect } from 'react'

interface Review {
  rating: number
  review: string
  name: string
  date: string
  timestamp: number
}

interface CustomerReviewsProps {
  productId: string
}

export default function CustomerReviews({ productId }: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load reviews from localStorage
    try {
      const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}')
      const productReviews = ratings[productId] || []
      // Sort by most recent first
      productReviews.sort((a: Review, b: Review) => b.timestamp - a.timestamp)
      setReviews(productReviews)
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }, [productId])

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No customer reviews yet. Be the first to rate this product!
      </div>
    )
  }

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1)

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">{averageRating}</div>
            <div className="text-xs text-gray-600">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</div>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xl ${i < Math.round(parseFloat(averageRating)) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
            {/* Rating and Name */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
              <span className="text-sm font-bold text-emerald-600">{review.rating}/5</span>
            </div>

            {/* Review Text */}
            {review.review && (
              <p className="text-gray-700 text-sm leading-relaxed">{review.review}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
