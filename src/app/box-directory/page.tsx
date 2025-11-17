import PageLayout from "@/components/PageLayout"
import Link from "next/link"

export default function BoxDirectoryPage() {
  const categories = [
    {
      name: "All Boxes",
      link: "/shop",
      emoji: "📦",
      description: "Browse our complete collection of fresh tropical fruit boxes"
    },
    {
      name: "Build Your Own Box",
      link: "/shop",
      emoji: "🎨",
      description: "Create your custom fruit selection - choose what you want"
    },
    {
      name: "🌸 Pink Glow Pineapple",
      link: "/shop?category=pinkglow",
      emoji: "🌸",
      description: "Exclusive Pink Glow Pineapple collection - premium luxury fruit"
    },
    {
      name: "Best Sellers",
      link: "/shop",
      emoji: "🏆",
      description: "Our most popular and loved fruit boxes"
    },
    {
      name: "Gift Boxes",
      link: "/shop",
      emoji: "🎁",
      description: "Perfect for gifting to friends and family"
    },
    {
      name: "New & On Sale",
      link: "/shop",
      emoji: "🔥",
      description: "Latest arrivals and special sale items"
    }
  ]

  const fruitTypes = [
    {
      name: "Soursop | Guanabana",
      price: "from $119.00",
      emoji: "🍃"
    },
    {
      name: "Tropical Mango Box",
      price: "$88.00",
      emoji: "🥭"
    },
    {
      name: "Rambutan Box",
      price: "from $69.00",
      emoji: "🧅"
    },
    {
      name: "Taste the Tropics",
      price: "from $99.00",
      emoji: "🍍"
    },
    {
      name: "Purple Mangosteen",
      price: "from $119.00",
      emoji: "💜"
    },
    {
      name: "Longan / Dragon Eye",
      price: "from $79.00",
      emoji: "👁️"
    },
    {
      name: "Fuyu Persimmons",
      price: "from $59.00",
      emoji: "🧡"
    },
    {
      name: "Pink Pineapple Duo Box",
      price: "$89.00",
      emoji: "🌸"
    },
    {
      name: "Pomegranate Box",
      price: "$79.00",
      emoji: "🍎"
    }
  ]

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Box Directory</h2>
          <p className="text-gray-600 text-lg">Explore all our fruit boxes and specialty collections</p>
        </div>

        {/* Main Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-emerald-900 mb-8">Browse by Category</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="bg-white border-2 border-emerald-200 rounded-lg p-6 hover:border-emerald-500 hover:shadow-lg transition-all group"
              >
                <p className="text-4xl mb-3">{cat.emoji}</p>
                <h4 className="font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-gray-600 text-sm">{cat.description}</p>
                <p className="text-emerald-600 font-semibold text-sm mt-4 group-hover:translate-x-1 transition-transform">
                  Browse →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Fruit Boxes */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-emerald-900 mb-8">Popular Fruit Boxes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fruitTypes.map((fruit, idx) => (
              <Link
                key={idx}
                href="/shop"
                className="bg-gradient-to-br from-emerald-50 to-yellow-50 border border-emerald-200 rounded-lg p-6 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <p className="text-3xl mb-3">{fruit.emoji}</p>
                <h4 className="font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {fruit.name}
                </h4>
                <p className="text-emerald-600 font-semibold text-sm">{fruit.price}</p>
                <button className="text-emerald-600 font-semibold text-sm mt-3 group-hover:translate-x-1 transition-transform">
                  View →
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Collections */}
        <div className="mb-16 bg-white border-2 border-emerald-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Special Collections</h3>
          <div className="space-y-4">
            <Link href="/shop" className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-yellow-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
              <div>
                <h4 className="font-bold text-emerald-900">Seasonal Favorites</h4>
                <p className="text-sm text-gray-600">Fresh fruits picked at peak season</p>
              </div>
              <span className="text-emerald-600 font-bold">→</span>
            </Link>
            <Link href="/shop" className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-yellow-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
              <div>
                <h4 className="font-bold text-emerald-900">Tropical Variety Boxes</h4>
                <p className="text-sm text-gray-600">Mix of our best tropical selections</p>
              </div>
              <span className="text-emerald-600 font-bold">→</span>
            </Link>
            <Link href="/shop" className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-yellow-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
              <div>
                <h4 className="font-bold text-emerald-900">Exotic Fruit Collection</h4>
                <p className="text-sm text-gray-600">Rare and hard-to-find tropical fruits</p>
              </div>
              <span className="text-emerald-600 font-bold">→</span>
            </Link>
            <Link href="/shop" className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-yellow-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
              <div>
                <h4 className="font-bold text-emerald-900">Premium Subscription Boxes</h4>
                <p className="text-sm text-gray-600">Save with monthly or bi-weekly subscriptions</p>
              </div>
              <span className="text-emerald-600 font-bold">→</span>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Can't Decide?</h3>
            <p className="mb-6">Try our Build Your Own Box - select exactly what you want!</p>
            <Link href="/shop" className="bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-bold inline-block">
              Build Your Box
            </Link>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Save More!</h3>
            <p className="mb-6">Subscribe & Save 10-15% on any box + Free Shipping</p>
            <Link href="/subscribe" className="bg-white text-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-50 transition-colors font-bold inline-block">
              View Plans
            </Link>
          </div>
        </div>

        {/* Out of Season Notice */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-900 mb-3">
            <span className="font-bold">❓ Looking for an out-of-season fruit?</span>
          </p>
          <p className="text-blue-800 mb-4">
            We update our collection seasonally. Some fruits may be temporarily out of stock.
          </p>
          <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
            Contact us to request a specific fruit →
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
