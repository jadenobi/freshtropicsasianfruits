import ProductCard from "@/components/ProductCard"
import PageLayout from "@/components/PageLayout"
import { FRUITS } from "@/lib/data"
import Link from "next/link"

const FEATURED = FRUITS.slice(0, 4)
const TOP_RATED = FRUITS.sort((a, b) => b.rating - a.rating).slice(0, 3)
const POPULAR_BOXES = FRUITS.slice(0, 8)

const WHY_US = [
  { icon: "🌿", title: "Farm Fresh", description: "Harvested fresh" },
  { icon: "🚚", title: "Fast Delivery", description: "Same-day delivery" },
  { icon: "⭐", title: "Sustainable", description: "Eco-friendly" },
  { icon: "✓", title: "Quality Guaranteed", description: "Perfection" },
  { icon: "🏆", title: "Premium Selection", description: "Best orchards" },
  { icon: "💚", title: "Health First", description: "No pesticides" }
]

const TESTIMONIALS = [
  {
    author: "Glenda A",
    location: "Shawnee",
    text: "All the fruit is wonderfully tasty! I'm so glad I ordered the Tropical Fruit Box!! We are all enjoying each bite!",
    date: "3 days ago",
    verified: true
  },
  {
    author: "Rebecca S",
    location: "Hickory Hills",
    text: "Best ordering, delivery, and product experience ever!!! The pink pineapples are so delicious!!",
    date: "6 days ago",
    verified: true
  },
  {
    author: "James W",
    location: "Birmingham",
    text: "Excellent fruit, fresh, juicy and delicious. My boxes arrived on time.",
    date: "6 days ago",
    verified: true
  },
  {
    author: "James C",
    location: "Atlanta",
    text: "Tropical Fruit Box are rockstars! They've been so helpful. The fruit was perfect and so good!!",
    date: "1 week ago",
    verified: true
  },
  {
    author: "Steven W",
    location: "Miami",
    text: "Arrived quickly and as advertised. Couldn't be happier with the service!",
    date: "1 week ago",
    verified: true
  }
]

const FAQS = [
  {
    q: "What is the difference between exotic fruits & tropical fruits?",
    a: "It depends on where you live! For us, living in South Florida, exotic fruits are just lesser-known tropical fruits. Fruits like Soursop, Lychees, Mangosteens, Dragon Fruits are tropical fruits that are made 'exotic' just because of their limited availability in the United States."
  },
  {
    q: "What is your fruit freshness guarantee?",
    a: "We know we are shipping perishable fruit and we take all measures to ensure your fruits get to you fresh. If for ANY reason your fruit is not fresh, reach out and we'll make it right, even if the carrier messed it up. We want you to be our customer for life."
  },
  {
    q: "Do you really offer free shipping on all fruit boxes?",
    a: "Yes! The short answer is YES, but only in the U.S. We have an optimized shipping schedule to ensure freshness. We ship Monday through Thursday, and you should expect to receive your box within one week of ordering."
  },
  {
    q: "How fresh is the fruit when it arrives?",
    a: "Our fruits are hand-selected and shipped within 24 hours of harvest. We use specialized packaging to maintain freshness during transit. Most customers report their fruit is perfect and ready to eat upon arrival."
  }
]

export default function Home() {
  return (
    <PageLayout>
      <section className="h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white flex items-center justify-center relative overflow-hidden">
        {/* Decorative emoji removed — replaced by a real hero image */}

        <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto px-8 items-center relative z-10">
          <div className="space-y-8 animate-fade-in">
            <div className="animate-slide-up" style={{animationDelay: "0.2s"}}>
                            <h1 className="text-6xl font-bold mb-4 text-yellow-300">Fresh Tropics</h1>
              <p className="text-2xl text-amber-100 font-semibold mb-2">Asian Fruits</p>
            </div>

            <div className="flex gap-6 animate-slide-up" style={{animationDelay: "0.4s"}}>
              <Link href="/shop" className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block">Shop Now</Link>
              <Link href="/about" className="border-2 border-yellow-300 text-yellow-300 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 hover:text-emerald-900 transition-all duration-300 inline-block">Learn More</Link>
            </div>

            <div className="flex gap-8 pt-4 animate-slide-up" style={{animationDelay: "0.6s"}}>
              <div className="flex items-center gap-2"><span className="text-2xl">✓</span><span className="text-emerald-100">100% Fresh</span></div>
              <div className="flex items-center gap-2"><span className="text-2xl">✓</span><span className="text-emerald-100">Fast Delivery</span></div>
            </div>
          </div>

          <div className="relative h-80 md:h-96 animate-scale-in" style={{animationDelay: "0.3s"}}>
            {/* subtle warm gradient behind the hero image */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-3xl opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/hero/hero-image.jpg"
                alt="Fruit basket"
                className="w-full h-full object-cover object-center rounded-3xl shadow-2xl transform transition-transform duration-700 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Fruit Boxes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-2">Featured Collection</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Popular Fruit Boxes</h2>
            <p className="text-gray-600 text-lg">Hand-selected tropical fruits, fresh from our partner farms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {POPULAR_BOXES.map((fruit) => (
              <div key={fruit.id} className="relative group">
                <div className="absolute -top-3 -right-3 z-10"><div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-4 py-2 rounded-full shadow-lg text-xs">⭐ {fruit.rating}</div></div>
                <ProductCard product={fruit} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <Link href="/shop" className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold px-10 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block hover:from-emerald-700 hover:to-emerald-800">View All Boxes</Link>
          </div>
        </div>
      </section>

      {/* Featured This Week Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-2">Bestsellers</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Featured This Week</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED.map((fruit) => (
              <div key={fruit.id} className="relative group">
                <div className="absolute -top-3 -right-3 z-10"><div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-4 py-2 rounded-full shadow-lg text-xs">NEW</div></div>
                <ProductCard product={fruit} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Freshness Guarantee Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-emerald-900 mb-4">Our Freshness Guarantee</h2>
                <p className="text-xl text-gray-700 font-semibold mb-6">If for ANY reason, your fruit is not fresh, reach out and we'll make it right!</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="text-4xl">✓</span>
                  <div>
                    <h3 className="font-bold text-emerald-900 text-lg mb-2">100% Fresh Guarantee</h3>
                    <p className="text-gray-600">We take all measures to ensure your fruits arrive fresh. Even if the carrier messes up, we'll make it right.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-4xl">🚚</span>
                  <div>
                    <h3 className="font-bold text-emerald-900 text-lg mb-2">Optimized Shipping</h3>
                    <p className="text-gray-600">We ship Monday-Thursday and your order arrives within one week to ensure peak freshness.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-4xl">💚</span>
                  <div>
                    <h3 className="font-bold text-emerald-900 text-lg mb-2">Customer for Life</h3>
                    <p className="text-gray-600">We're not satisfied until you are. We want you to be our customer for life!</p>
                  </div>
                </div>
              </div>

              <Link href="/refund" className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">Learn More</Link>
            </div>

            <div className="bg-gradient-to-br from-emerald-100 to-yellow-100 rounded-2xl p-12 text-center">
              <div className="text-8xl mb-6">🍍</div>
              <h3 className="text-3xl font-black text-emerald-900 mb-4">Fresh From Farm</h3>
              <p className="text-gray-700 font-semibold mb-8">Delivered straight to your doorstep within 7 days of harvest</p>
              <div className="flex gap-8 justify-center mb-8">
                <div className="text-center">
                  <p className="text-3xl font-black text-emerald-600">206+</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-emerald-600">50K+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Gift Orders Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Corporate Gift Orders</h2>
              <p className="text-xl text-emerald-50 mb-8">Yes, we'll accommodate your special request with fancy and elaborate requirements. Contact our team and let us make it happen for you.</p>
              <div className="space-y-4 mb-8">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="font-semibold">Bulk Discounts</p>
                    <p className="text-sm text-emerald-100">10% off 10+ boxes, 15% off 25+</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-semibold">Custom Packaging</p>
                    <p className="text-sm text-emerald-100">Personalized branding available</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-semibold">Flexible Delivery</p>
                    <p className="text-sm text-emerald-100">Schedule delivery for any date</p>
                  </div>
                </div>
              </div>
              <Link href="/corporate" className="inline-block bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">Start Your Corporate Order</Link>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-12 border border-white border-opacity-20">
              <div className="text-7xl text-center mb-6">💼</div>
              <h3 className="text-3xl font-black text-center mb-6">Perfect For</h3>
              <ul className="space-y-3 text-emerald-50">
                <li className="flex gap-2 items-center"><span>✓</span> Corporate Events</li>
                <li className="flex gap-2 items-center"><span>✓</span> Employee Gifts</li>
                <li className="flex gap-2 items-center"><span>✓</span> Client Appreciation</li>
                <li className="flex gap-2 items-center"><span>✓</span> Trade Shows</li>
                <li className="flex gap-2 items-center"><span>✓</span> Team Building</li>
                <li className="flex gap-2 items-center"><span>✓</span> Company Wellness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews/Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Tropi ❤️</h2>
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>
              <p className="text-xl font-bold text-emerald-600">Excellent 4.9 average</p>
              <a href="https://www.reviews.io/company-reviews/store/tropical-fruit-box1" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">Read all 50,000+ reviews</a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 to-yellow-50 rounded-lg p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-emerald-200">
                  <p className="font-bold text-emerald-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.verified && '✓ Verified Customer'} • {testimonial.location} • {testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews" className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">See More Reviews</Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-emerald-900 mb-4">Frequently Asked Fruity Questions</h2>
            <p className="text-gray-600 text-lg">Got questions? We have answers!</p>
          </div>

          <div className="space-y-4 mb-12">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group bg-white border-2 border-emerald-200 rounded-lg p-6 hover:border-emerald-400 transition-colors">
                <summary className="font-bold text-emerald-900 cursor-pointer flex items-center justify-between hover:text-emerald-700">
                  <span>{faq.q}</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="bg-white border-2 border-emerald-300 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-emerald-900 mb-3">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">Our customer service team is available 24/7 to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+17867584787" className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                📞 (786) 758-4787
              </a>
              <a href="mailto:hello@freshtropicsasianfruits.com" className="bg-yellow-400 text-emerald-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors">
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item, idx) => (
              <div key={idx} className="p-8 border-2 border-emerald-100 rounded-2xl hover:border-amber-400 hover:shadow-xl transition-all duration-300 animate-scale-in" style={{animationDelay: `${0.1 * (idx + 1)}s`}}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Picks */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-2">Customer Favorites</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Top Rated Picks</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOP_RATED.map((fruit) => (
              <div key={fruit.id} className="relative group">
                <div className="absolute -top-3 -right-3 z-10"><div className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-4 py-2 rounded-full shadow-lg text-xs">🏆 Top Rated</div></div>
                <ProductCard product={fruit} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready for Paradise CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-6 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Ready for Paradise?</h2>
          <p className="text-xl text-emerald-100 mb-8">Order your first Fresh Tropics box today and taste the difference</p>
          <Link href="/shop" className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-12 py-4 rounded-lg text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block">Shop Now</Link>
        </div>
      </section>
    </PageLayout>
  )
}
