import PageLayout from "@/components/PageLayout"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Tropical Fruits You Probably Haven't Tried Yet",
      excerpt: "Discover exotic fruits that'll transport your taste buds straight to the tropics",
      date: "Nov 15, 2024",
      category: "Guides",
      image: "🌴"
    },
    {
      id: 2,
      title: "Dragon Fruit: The Most Beautiful Fruit You'll Ever Eat",
      excerpt: "Learn about the nutritional benefits and taste profile of this stunning fruit",
      date: "Nov 10, 2024",
      category: "Nutrition",
      image: "🐉"
    },
    {
      id: 3,
      title: "Easy Tropical Smoothie Recipes for Beginners",
      excerpt: "Simple recipes to make delicious tropical smoothies at home",
      date: "Nov 5, 2024",
      category: "Recipes",
      image: "🥤"
    },
    {
      id: 4,
      title: "How to Pick the Perfect Mango Every Time",
      excerpt: "Pro tips for selecting the ripest, sweetest mangoes like an expert",
      date: "Oct 28, 2024",
      category: "Guides",
      image: "🥭"
    },
    {
      id: 5,
      title: "The Health Benefits of Passion Fruit",
      excerpt: "Why this little powerhouse should be part of your daily diet",
      date: "Oct 22, 2024",
      category: "Nutrition",
      image: "💜"
    },
    {
      id: 6,
      title: "Behind the Scenes: Our Farm Partners",
      excerpt: "Meet the families who grow the fruits that make your boxes special",
      date: "Oct 15, 2024",
      category: "Community",
      image: "👨‍🌾"
    }
  ]

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Fresh Tropics Blog</h2>
          <p className="text-gray-600 text-lg">Recipes, guides, and stories from the tropical fruit world</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="bg-gradient-to-br from-emerald-100 to-yellow-100 h-40 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <button className="text-emerald-600 font-semibold text-sm hover:text-emerald-700 group-hover:translate-x-1 transition-transform">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-yellow-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-700 mb-6">Get weekly recipes, fruit tips, and exclusive offers delivered to your inbox</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
            />
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
