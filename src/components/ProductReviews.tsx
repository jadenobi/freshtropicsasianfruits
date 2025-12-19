'use client'

import { useState, useEffect } from 'react'
import { addReview, getProductReviews, markHelpful } from '@/lib/reviewService'
import { Review } from '@/types'

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [author, setAuthor] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getProductReviews(productId)
      setReviews(fetchedReviews || [])
    }
    fetchReviews()
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !comment.trim() || !author.trim()) {
      alert('Please fill in all fields')
      return
    }

    const newReview = await addReview(productId, rating, title, comment, author)
    setReviews([newReview, ...reviews])

    // Reset form
    setRating(5)
    setTitle('')
    setComment('')
    setAuthor('')
    setSubmitted(true)

    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleHelpful = (reviewId: string) => {
    markHelpful(reviewId)
    setReviews(
      reviews.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    )
  }

  return (
    <div className="space-y-8">
      {/* Write Review Form */}
      <div className="bg-gradient-to-r from-emerald-50 to-yellow-50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Write a Review</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Your Name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Very Good</option>
              <option value={3}>⭐⭐⭐ Good</option>
              <option value={2}>⭐⭐ Fair</option>
              <option value={1}>⭐ Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Submit Review
          </button>

          {submitted && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg font-bold text-center">
              ✓ Thank you for your review!
            </div>
          )}
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{review.title}</p>
                    <p className="text-sm text-gray-600">
                      by {review.author} •{' '}
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl mb-2">
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{review.comment}</p>

                <button
                  onClick={() => handleHelpful(review.id)}
                  className="text-sm text-emerald-600 font-bold hover:text-emerald-700"
                >
                  👍 Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
