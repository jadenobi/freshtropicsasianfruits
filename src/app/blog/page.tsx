'use client'

import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import { useState, useMemo } from 'react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: number
  featured: boolean
  image: string
  author: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'dragon-fruit-benefits',
    title: '🐉 Dragon Fruit: Superfood Benefits & How to Eat It',
    excerpt: 'Discover the amazing health benefits of dragon fruit and learn the best techniques for cutting and enjoying this exotic beauty.',
    category: 'Nutrition',
    date: '2025-11-15',
    readTime: 5,
    featured: true,
    image: '🐉',
    author: 'Sarah Chen'
  },
  {
    id: 'mango-recipes',
    title: '🥭 5 Delicious Mango Recipes to Try Today',
    excerpt: 'From smoothie bowls to salsa, explore our favorite mango-inspired recipes that will elevate your cooking game.',
    category: 'Recipes',
    date: '2025-11-10',
    readTime: 7,
    featured: true,
    image: '🥭',
    author: 'Chef Marcus'
  },
  {
    id: 'pineapple-guide',
    title: '🍍 The Complete Guide to Selecting Perfect Pineapples',
    excerpt: 'Learn how to pick the ripest pineapples and store them properly for maximum sweetness and shelf life.',
    category: 'Tips',
    date: '2025-11-05',
    readTime: 4,
    featured: true,
    image: '🍍',
    author: 'James Rodriguez'
  },
  {
    id: 'tropical-smoothie-bowls',
    title: '🍲 Tropical Smoothie Bowls: 3 Easy Recipes',
    excerpt: 'Create Instagram-worthy smoothie bowls using our fresh tropical fruits. Perfect for breakfast or healthy snacks.',
    category: 'Recipes',
    date: '2025-10-28',
    readTime: 6,
    featured: false,
    image: '🍲',
    author: 'Nina Kumar'
  },
  {
    id: 'passion-fruit-health',
    title: '💛 Passion Fruit: Antioxidant Powerhouse',
    excerpt: 'Explore the incredible health benefits of passion fruit and why nutritionists recommend it daily.',
    category: 'Nutrition',
    date: '2025-10-20',
    readTime: 5,
    featured: false,
    image: '💛',
    author: 'Dr. Lisa Chen'
  },
  {
    id: 'guava-tropical-guide',
    title: '🟩 Guava 101: Everything You Need to Know',
    excerpt: 'A complete guide to this often-overlooked tropical fruit including nutrition, taste profile, and best uses.',
    category: 'Tips',
    date: '2025-10-15',
    readTime: 6,
    featured: false,
    image: '🟩',
    author: 'Carlos Miguel'
  },
  {
    id: 'litchi-season',
    title: '❤️ Litchi Season: A Tropical Delicacy',
    excerpt: 'Learn about the seasonal nature of lychees and why they\'re a must-try during peak season.',
    category: 'Seasonal',
    date: '2025-10-10',
    readTime: 4,
    featured: false,
    image: '❤️',
    author: 'Wei Zhang'
  },
  {
    id: 'fruit-preservation',
    title: '🏺 Preserving Fresh Fruits: Jam & Compote Recipes',
    excerpt: 'Extend your fresh fruit experience with our easy recipes for jams, compotes, and syrups.',
    category: 'Recipes',
    date: '2025-10-05',
    readTime: 8,
    featured: false,
    image: '🏺',
    author: 'Grandma Rosa'
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(BLOG_POSTS.map(p => p.category))]

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const featuredPosts = BLOG_POSTS.filter(p => p.featured)
  const recentPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-emerald-900 mb-4">🌴 Tropical Fruit Blog</h1>
            <p className="text-lg text-gray-600 mb-8">Tips, recipes, nutrition guides, and seasonal recommendations</p>
          </div>

          {/* Search & Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 rounded-xl border-2 border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-lg"
                />
                <span className="absolute right-6 top-4 text-2xl">🔍</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-white border-2 border-emerald-200 text-gray-700 hover:border-emerald-600'
                  }`}
                >
                  {cat === 'all' ? '📚 All Posts' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts Section */}
          {selectedCategory === 'all' && (
            <div className="mb-16">
              <h2 className="text-3xl font-black text-emerald-900 mb-8">⭐ Featured</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredPosts.map(post => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                  >
                    <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-40 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                      {post.image}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.readTime} min read</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-3xl font-black text-emerald-900 mb-8">
              {selectedCategory === 'all' ? '📖 All Articles' : `📖 ${selectedCategory}`}
            </h2>
            {recentPosts.length > 0 ? (
              <div className="space-y-6">
                {recentPosts.map(post => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:bg-emerald-50"
                  >
                    <div className="p-6 flex gap-6">
                      <div className="text-5xl flex-shrink-0">{post.image}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500">{post.readTime} min</span>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span className="font-semibold">{post.author}</span>
                          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <p className="text-lg text-gray-600">No articles found matching your search</p>
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-black mb-4">📧 Get Fresh Content Weekly</h3>
            <p className="text-lg mb-6 opacity-90">Subscribe to our newsletter for exclusive recipes and tips</p>
            <Link
              href="/"
              className="inline-block bg-white text-emerald-600 font-black px-8 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
