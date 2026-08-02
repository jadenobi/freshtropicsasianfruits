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

const GENERIC_REVIEWS = [
  "Absolutely incredible! The freshness and quality are unmatched. I will definitely be ordering again.",
  "Quick delivery and the fruit was perfectly ripe. Best service I've experienced in a long time.",
  "You can really taste the difference compared to what you get at the local grocery store. Highly recommended!",
  "Arrived in pristine condition. The packaging was careful, and the flavor was out of this world.",
  "Honestly blew my expectations away. My family loved it, and I'll be buying a subscription soon.",
  "Perfect for gifting! I sent this to a friend and they couldn't stop raving about how sweet it was.",
  "Great customer service and even better fruit. It's totally worth the price point.",
  "Five stars! The texture, the smell, and the taste were 10/10.",
  "I was skeptical at first, but wow. This is the real deal. So fresh it feels like I picked it myself.",
  "Consistently amazing. This is my third order and they never disappoint. Top tier quality."
];

const NAMES = ["Sarah M.", "David J.", "Michelle T.", "Christopher K.", "Amanda L.", "James B.", "Jessica W.", "Robert C.", "Emily R.", "Michael P."];

function generateFallbackReviews(productId: string): Review[] {
  // Use characters of productId to deterministically pick reviews so they don't change on refresh
  const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || Math.random() * 1000;
  
  let count = (seed % 350) + 120; // Give every product between 120 and 470 reviews
  
  if (productId === 'fgt_lanzone') {
    count = 9;
  }
  
  const fallback: Review[] = [];
  
  for (let i = 0; i < count; i++) {
    const reviewIdx = (seed + i * 13) % GENERIC_REVIEWS.length;
    const nameIdx = (seed + i * 7) % NAMES.length;
    
    // Generate a recent date (within the last 30 days)
    const daysAgo = (seed + i * 11) % 30 + 1;
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - daysAgo);
    
    // Mostly 5 stars, occasionally 4 stars (makes average ~4.7 - 4.9)
    const starRating = (i % 5 === 0) ? 4 : 5;
    
    fallback.push({
      rating: starRating,
      review: GENERIC_REVIEWS[reviewIdx],
      name: NAMES[nameIdx],
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: dateObj.getTime()
    });
  }
  
  return fallback.sort((a, b) => b.timestamp - a.timestamp);
}

export default function CustomerReviews({ productId }: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load reviews from localStorage
    try {
      const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}')
      let productReviews = ratings[productId] || []
      
      if (productReviews.length === 0) {
        productReviews = generateFallbackReviews(productId)
      } else {
        // Sort by most recent first
        productReviews.sort((a: Review, b: Review) => b.timestamp - a.timestamp)
      }
      
      setReviews(productReviews)
    } catch (error) {
      console.error('Error loading reviews:', error)
      setReviews(generateFallbackReviews(productId))
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
        {reviews.slice(0, 5).map((review, idx) => (
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
