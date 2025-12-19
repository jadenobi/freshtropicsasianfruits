"use client"

import PageLayout from "@/components/PageLayout"
import { useState } from "react"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      title: "The freshest fruits I've ever received!",
      content: "I've ordered from Fresh Tropics three times now, and every box has been absolutely incredible. The pineapples are so sweet, the mangoes perfectly ripe. This is the real deal!",
      date: "Nov 15, 2024"
    },
    {
      id: 2,
      author: "Marcus T.",
      rating: 5,
      title: "Better than my local farmer's market",
      content: "Honestly shocked at how fresh everything arrives. The passion fruit was unlike anything I've had before. Customer service was amazing when I had a question about storage.",
      date: "Nov 12, 2024"
    },
    {
      id: 3,
      author: "Jennifer L.",
      rating: 5,
      title: "Perfect for my family",
      content: "My kids are eating so much fruit now! The variety in the boxes is amazing - we get to try new things every month. The packaging is also beautiful and eco-friendly.",
      date: "Nov 8, 2024"
    },
    {
      id: 4,
      author: "David R.",
      rating: 5,
      title: "Worth every penny",
      content: "I was skeptical about buying fruit online, but Fresh Tropics changed my mind. The quality is outstanding and shipping was fast. I'm a repeat customer for life!",
      date: "Nov 5, 2024"
    },
    {
      id: 5,
      author: "Patricia K.",
      rating: 5,
      title: "Authentic tropical experience",
      content: "You can taste the difference when fruit is grown with care. Fresh Tropics clearly sources from people who know what they're doing. Love supporting a family business!",
      date: "Oct 28, 2024"
    },
    {
      id: 6,
      author: "Robert H.",
      rating: 5,
      title: "Free shipping is fantastic",
      content: "Great quality fruit plus free shipping on all orders? Sign me up! The boxes are perfectly sized and nothing arrived damaged.",
      date: "Oct 22, 2024"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    rating: 5,
    title: "",
    content: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.author || !formData.email || !formData.title || !formData.content) {
      alert("Please fill in all fields")
      return
    }

    const newReview = {
      id: reviews.length + 1,
      author: formData.author,
      rating: formData.rating,
      title: formData.title,
      content: formData.content,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }

    setReviews([newReview, ...reviews])
    setFormData({ author: "", email: "", rating: 5, title: "", content: "" })
    setShowForm(false)
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">Join thousands of happy Fresh Tropics customers</p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">⭐</span>
              ))}
            </div>
            <p className="text-gray-700 font-semibold">4.9 average rating • {reviews.length.toLocaleString()} reviews</p>
          </div>
        </div>

        {/* Write Review Form */}
        {showForm ? (
          <div className="bg-white border-2 border-emerald-300 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">Rating *</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ Very Good (4 stars)</option>
                  <option value={3}>⭐⭐⭐ Good (3 stars)</option>
                  <option value={2}>⭐⭐ Fair (2 stars)</option>
                  <option value={1}>⭐ Poor (1 star)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">Review Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base"
                  placeholder="Great quality fruit!"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">Your Review *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900 font-bold placeholder-gray-800 bg-white text-base min-h-24"
                  placeholder="Share your experience with Fresh Tropics..."
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.content.length}/500 characters</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(true)}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold inline-block"
            >
              Write a Review
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
              </div>
              <h3 className="font-bold text-emerald-900 mb-3">{review.title}</h3>
              <p className="text-gray-700 leading-relaxed">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
