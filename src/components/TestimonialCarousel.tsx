'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  author: string
  location: string
  text: string
  date: string
  verified: boolean
  rating?: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export default function TestimonialCarousel({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  if (testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  return (
    <div className="w-full">
      {/* Main Testimonial */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 md:p-12 border-2 border-amber-200 shadow-lg mb-8">
        {/* Rating Stars */}
        {current.rating && (
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(current.rating!) ? 'text-2xl' : 'text-2xl opacity-30'}>
                ⭐
              </span>
            ))}
          </div>
        )}

        {/* Testimonial Text */}
        <p className="text-lg md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed italic">
          "{current.text}"
        </p>

        {/* Author Info */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-black text-emerald-900">{current.author}</p>
            <p className="text-sm text-gray-600">
              {current.location} • {current.date}
            </p>
          </div>
          {current.verified && (
            <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1">
              ✓ Verified
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
          aria-label="Previous testimonial"
        >
          ←
        </button>

        {/* Dots Navigation */}
        <div className="flex gap-2 justify-center flex-1">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-emerald-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400 w-3'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-sm text-gray-600 mt-4">
        {currentIndex + 1} / {testimonials.length}
      </p>
    </div>
  )
}
