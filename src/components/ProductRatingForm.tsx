'use client'

import { useState } from 'react'

interface ProductRatingFormProps {
  productId: string
  productName: string
  onSubmit?: () => void
}

export default function ProductRatingForm({
  productId,
  productName,
  onSubmit
}: ProductRatingFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setSubmitMessage('Please select a rating')
      return
    }

    if (!reviewerName.trim()) {
      setSubmitMessage('Please enter your name')
      return
    }

    setIsSubmitting(true)

    try {
      // Store rating in localStorage (client-side) for demo
      const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}')
      
      if (!ratings[productId]) {
        ratings[productId] = []
      }

      ratings[productId].push({
        rating,
        review: review.trim(),
        name: reviewerName.trim(),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      })

      localStorage.setItem('productRatings', JSON.stringify(ratings))

      // Reset form
      setRating(0)
      setReview('')
      setReviewerName('')
      setSubmitMessage('✓ Thank you for your rating!')

      setTimeout(() => {
        setSubmitMessage('')
        onSubmit?.()
      }, 2000)
    } catch (error) {
      setSubmitMessage('Error submitting rating. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-12 p-8 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Rate This Product</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">Your Rating *</label>
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-4xl transition-transform hover:scale-110"
              >
                <span className={
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }>
                  ★
                </span>
              </button>
            ))}
            {rating > 0 && <span className="ml-3 text-lg font-semibold text-gray-700">{rating} / 5</span>}
          </div>
        </div>

        {/* Reviewer Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border-3 border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none text-gray-900 font-bold placeholder-gray-800 bg-white text-base"
          />
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <label htmlFor="review" className="block text-sm font-semibold text-gray-700">
            Your Review (Optional)
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts about this product..."
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 border-3 border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none resize-none text-gray-900 font-bold placeholder-gray-800 bg-white text-base"
          />
          <p className="text-xs text-gray-600 font-bold">{review.length} / 500 characters</p>
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div className={`p-3 rounded-lg text-sm font-medium ${
            submitMessage.includes('✓')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {submitMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
      </form>
    </div>
  )
}
