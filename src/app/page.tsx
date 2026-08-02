import ProductCard from "@/components/ProductCard"
import PageLayout from "@/components/PageLayout"
import FlashSaleBanner from "@/components/FlashSaleBanner"
import { ProductService } from "@/lib/productService"
import Link from "next/link"
import NewsletterSignup from "@/components/NewsletterSignup"
import TestimonialCarousel from "@/components/TestimonialCarousel"
import { Leaf, Truck, Leaf as LeafAlt, CheckCircle, Trophy, Heart, Star, Sparkles, Flame, Gift, Palette, Package, Briefcase, Phone, Mail, Droplet } from "lucide-react"
import { Metadata } from "next"
import type { Fruit } from "@/types"

export const metadata: Metadata = {
  title: 'Fresh Tropics – Buy Asian Fruits Online | Tropical Fruit Delivery',
  description: 'Buy fresh tropical and Asian fruits online with fast delivery. Premium lychee, dragon fruit, mango, durian & more. Farm-to-table quality guaranteed.',
  openGraph: {
    title: 'Fresh Tropics – Premium Asian & Tropical Fruits',
    description: 'Buy fresh tropical and Asian fruits online with fast delivery',
    url: 'https://freshtropicsasianfruits.com',
    type: 'website',
  },
}

const allProducts = ProductService.getAllProducts()

// Helper filtering to completely separate hardware (Trees/Bushes) from standard Fruit Boxes
const ALL_TREES = allProducts.filter(p => p.id.startsWith('fgt_') || p.name.includes('Tree') || p.name.includes('Bush') || p.sizes?.some(s => s.name?.includes('Tree') || s.name?.includes('Bush')))
const STANDARD_FRUITS = allProducts.filter(p => !ALL_TREES.includes(p))

// Mixed section explicitly: 2 standard tropical fruit boxes, 2 fruit trees
const POPULAR_BOXES = [...STANDARD_FRUITS.slice(0, 2), ...ALL_TREES.slice(0, 2)]

// Dedicated tree section limits to 8 top trees to naturally boost attention
const TREES_SECTION = ALL_TREES.slice(0, 8)

const TOP_RATED = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 3)

const WHY_US = [
  { iconName: "Leaf", title: "Farm Fresh", description: "Harvested fresh" },
  { iconName: "Truck", title: "Fast Delivery", description: "Same-day delivery" },
  { iconName: "LeafAlt", title: "Sustainable", description: "Eco-friendly" },
  { iconName: "CheckCircle", title: "Quality Guaranteed", description: "Perfection" },
  { iconName: "Trophy", title: "Premium Selection", description: "Best orchards" },
  { iconName: "Heart", title: "Health First", description: "No pesticides" }
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
      <FlashSaleBanner />
      <section className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white flex items-center justify-center relative overflow-hidden py-12 md:py-0">
        {/* 3D Background Effect with Animated Gradient Orbs */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 opacity-60"></div>
        
        {/* Animated gradient orbs for 3D effect */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-4 md:px-8 items-center relative z-10">
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="animate-slide-up" style={{animationDelay: "0.2s"}}>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 text-yellow-300">Fresh Tropics</h1>
              <p className="text-lg md:text-2xl text-amber-100 font-semibold mb-2">Asian Fruits</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-6 animate-slide-up" style={{animationDelay: "0.4s"}}>
              <Link href="/shop" className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block text-center text-sm md:text-base">Shop Now</Link>
              <Link href="/about" className="border-2 border-yellow-300 text-yellow-300 font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-yellow-300 hover:text-emerald-900 transition-all duration-300 inline-block text-center text-sm md:text-base">Learn More</Link>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-8 pt-2 md:pt-4 animate-slide-up" style={{animationDelay: "0.6s"}}>
              <div className="flex items-center gap-2"><span className="text-lg md:text-2xl">✓</span><span className="text-sm md:text-base text-emerald-100">100% Fresh</span></div>
              <div className="flex items-center gap-2"><span className="text-lg md:text-2xl">✓</span><span className="text-sm md:text-base text-emerald-100">Fast Delivery</span></div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 animate-scale-in" style={{animationDelay: "0.3s"}}>
            {/* subtle warm gradient behind the hero image with 3D depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-3xl opacity-30 blur-lg"></div>
            <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-3xl opacity-10 blur-2xl"></div>
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

      {/* Fruit Trees Section (Shifted to top for high visibility) */}
      <section className="py-20 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 border-t-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-amber-300 font-bold tracking-widest uppercase text-sm mb-2">Grow Your Own</p>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">Fruit Trees Collection</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TREES_SECTION.map((fruit) => (
              <div key={fruit.id} className="relative group">
                <div className="absolute -top-3 -right-3 z-10"><div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-4 py-2 rounded-full shadow-lg text-xs">NEW</div></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <ProductCard product={fruit} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <Link href="/shop?collection=trees" className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-10 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block hover:scale-105">View All Trees</Link>
          </div>
        </div>
      </section>

      {/* Popular Fruit Boxes Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-600 border-t-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-amber-300 font-bold tracking-widest uppercase text-sm mb-2">Featured Collection</p>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">Popular Fruit Boxes</h2>
            <p className="text-emerald-100 text-lg">Hand-selected tropical fruits, fresh from our partner farms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {POPULAR_BOXES.map((fruit) => (
              <div key={fruit.id} className="relative group">
                <div className="absolute -top-3 -right-3 z-10"><div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-emerald-900 font-bold px-4 py-2 rounded-full shadow-lg text-xs flex items-center gap-1"><Star size={12} className="fill-emerald-900" /> {fruit.rating}</div></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <ProductCard product={fruit} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <Link href="/shop" className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold px-10 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block hover:from-emerald-700 hover:to-emerald-800">View All Boxes</Link>
          </div>
        </div>
      </section>



      {/* Featured Collections Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-12 text-center">Shop Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-12 w-full place-items-center">
            <Link href="/shop?collection=bestsellers" className="block w-full max-w-sm md:max-w-none group relative overflow-hidden rounded-xl h-40 md:h-56 bg-gradient-to-br from-orange-400 to-red-500 shadow-lg hover:shadow-2xl transition-all mx-auto">
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white p-4 text-center">
                <Trophy size={36} className="md:w-12 md:h-12 mb-2 md:mb-3 text-orange-200 mx-auto" />
                <h3 className="text-2xl md:text-3xl font-black mb-1 md:mb-2 text-center w-full">Best Sellers</h3>
                <p className="text-xs md:text-sm text-orange-50 text-center w-full">Most loved by customers</p>
              </div>
            </Link>

            <Link href="/shop?collection=toprated" className="block w-full max-w-sm md:max-w-none group relative overflow-hidden rounded-xl h-40 md:h-56 bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg hover:shadow-2xl transition-all mx-auto">
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white p-4 text-center">
                <Star size={36} className="md:w-12 md:h-12 mb-2 md:mb-3 text-yellow-200 fill-yellow-200 mx-auto" />
                <h3 className="text-2xl md:text-3xl font-black mb-1 md:mb-2 text-center w-full">Top Rated</h3>
                <p className="text-xs md:text-sm text-yellow-50 text-center w-full">Highest customer ratings</p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full place-items-center">
            <Link href="/shop?collection=new" className="block w-full max-w-sm md:max-w-none group relative overflow-hidden rounded-xl h-40 md:h-56 bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg hover:shadow-2xl transition-all mx-auto">
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white p-4 text-center">
                <Sparkles size={36} className="md:w-12 md:h-12 mb-2 md:mb-3 text-green-200 mx-auto" />
                <h3 className="text-2xl md:text-3xl font-black mb-1 md:mb-2 text-center w-full">New Arrivals</h3>
                <p className="text-xs md:text-sm text-green-50 text-center w-full">Fresh additions</p>
              </div>
            </Link>

            <Link href="/shop?collection=sale" className="block w-full max-w-sm md:max-w-none group relative overflow-hidden rounded-xl h-40 md:h-56 bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg hover:shadow-2xl transition-all mx-auto">
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white p-4 text-center">
                <Flame size={36} className="md:w-12 md:h-12 mb-2 md:mb-3 text-pink-200 fill-pink-200 mx-auto" />
                <h3 className="text-2xl md:text-3xl font-black mb-1 md:mb-2 text-center w-full">On Sale</h3>
                <p className="text-xs md:text-sm text-pink-50 text-center w-full">Limited time offers</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Freshness Guarantee Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-600">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">Our Freshness Guarantee</h2>
                <p className="text-base md:text-xl text-amber-50 font-semibold mb-6">If for ANY reason, your fruit is not fresh, reach out and we'll make it right!</p>
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
                  <Truck size={36} className="text-emerald-900" />
                  <div>
                    <h3 className="font-bold text-emerald-900 text-lg mb-2">Optimized Shipping</h3>
                    <p className="text-gray-600">We ship Monday-Thursday and your order arrives within one week to ensure peak freshness.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Heart size={36} className="text-emerald-900 fill-emerald-900" />
                  <div>
                    <h3 className="font-bold text-emerald-900 text-lg mb-2">Customer for Life</h3>
                    <p className="text-gray-600">We're not satisfied until you are. We want you to be our customer for life!</p>
                  </div>
                </div>
              </div>

              <Link href="/refund" className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">Learn More</Link>
            </div>

            <div className="bg-emerald-900/40 backdrop-blur-md rounded-2xl p-6 md:p-12 text-center border border-amber-400/30">
              <div className="flex justify-center mb-4 md:mb-6"><Droplet size={64} className="text-amber-300" /></div>
              <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-100 mb-3 md:mb-4">Fresh From Farm</h3>
              <p className="text-sm md:text-base text-amber-50 font-semibold mb-6 md:mb-8">Delivered straight to your doorstep within 7 days of harvest</p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center mb-6 md:mb-8">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-amber-300">206+</p>
                  <p className="text-xs md:text-sm text-amber-200">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-amber-300">50K+</p>
                  <p className="text-xs md:text-sm text-amber-200">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Gift Orders Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">Corporate Gift Orders</h2>
              <p className="text-base md:text-xl text-emerald-50 mb-6 md:mb-8">Yes, we'll accommodate your special request with fancy and elaborate requirements. Contact our team and let us make it happen for you.</p>
              <div className="space-y-4 mb-8">
                <div className="flex gap-3 items-start">
                  <Gift size={24} className="text-emerald-100" />
                  <div>
                    <p className="font-semibold">Bulk Discounts</p>
                    <p className="text-sm text-emerald-100">10% off 10+ boxes, 15% off 25+</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Palette size={24} className="text-emerald-100" />
                  <div>
                    <p className="font-semibold">Custom Packaging</p>
                    <p className="text-sm text-emerald-100">Personalized branding available</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Package size={24} className="text-emerald-100" />
                  <div>
                    <p className="font-semibold">Flexible Delivery</p>
                    <p className="text-sm text-emerald-100">Schedule delivery for any date</p>
                  </div>
                </div>
              </div>
              <Link href="/corporate" className="inline-block bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">Start Your Corporate Order</Link>
            </div>

            <div className="relative h-64 md:h-full min-h-[350px] rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-500">
              <img src="/products/water12.jpeg" alt="Corporate Fruit Gifts" className="absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/60 to-transparent"></div>
              <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-black mb-4">Perfect For:</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-emerald-50 text-sm md:text-base font-semibold">
                  <span className="flex items-center gap-2">✓ Corporate Events</span>
                  <span className="flex items-center gap-2">✓ Employee Gifts</span>
                  <span className="flex items-center gap-2">✓ Client Appreciation</span>
                  <span className="flex items-center gap-2">✓ Trade Shows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews/Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">Tropi </h2>
            <div className="flex justify-center items-center gap-3 mb-6 flex-wrap">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-amber-400"><Star size={24} className="fill-amber-400" /></span>
                ))}
              </div>
              <p className="text-xl font-bold text-amber-300">Excellent 4.9 average</p>
              <a href="https://www.reviews.io/company-reviews/store/tropical-fruit-box1" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 font-semibold underline">Read all 50,000+ reviews</a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="bg-emerald-900/40 backdrop-blur-md rounded-lg p-6 border border-amber-400/30 hover:border-amber-300/60 transition-all">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg text-amber-400"><Star size={16} className="fill-amber-400" /></span>
                  ))}
                </div>
                <p className="text-amber-50 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-amber-400/20">
                  <p className="font-bold text-amber-200">{testimonial.author}</p>
                  <p className="text-sm text-amber-100">{testimonial.verified && '✓ Verified Customer'} • {testimonial.location} • {testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews" className="inline-block bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 font-bold px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all">See More Reviews</Link>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 border-y-4 border-amber-400">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">What Our Customers Say</h2>
            <p className="text-amber-50 text-lg">Swipe through real reviews from happy customers</p>
          </div>

          <TestimonialCarousel 
            testimonials={TESTIMONIALS.slice(0, 10)}
            autoPlay={true}
            interval={6000}
          />
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">Frequently Asked Fruity Questions</h2>
            <p className="text-amber-50 text-lg">Got questions? We have answers!</p>
          </div>

          <div className="space-y-4 mb-12">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group bg-emerald-900/40 backdrop-blur-md border border-amber-400/30 rounded-lg p-6 hover:border-amber-300/60 transition-colors">
                <summary className="font-bold text-amber-200 cursor-pointer flex items-center justify-between hover:text-amber-100">
                  <span>{faq.q}</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="text-amber-50 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="bg-emerald-900/40 backdrop-blur-md border border-amber-400/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-100 mb-3">Still Have Questions?</h3>
            <p className="text-amber-50 mb-6">Our customer service team is available 24/7 to help!</p>
              <a href="tel:+13052902974" className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all">
                <Phone size={18} /> (305) 290-2974
              </a>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:hello@freshtropicsasianfruits.com" className="flex items-center justify-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:bg-emerald-50 transition-all">
                  <Mail size={18} /> hello@freshtropics...
                </a>
                <a href="mailto:support@freshtropicsasianfruits.com" className="flex items-center justify-center gap-2 bg-transparent border-2 border-amber-300 text-amber-300 font-bold px-6 py-3 rounded-lg hover:bg-amber-300 hover:text-emerald-900 transition-all">
                  <Mail size={18} /> support@freshtropics...
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 to-emerald-800 border-y-4 border-amber-400">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <NewsletterSignup variant="banner" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-600">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item, idx) => {
              const iconMap: { [key: string]: React.ReactNode } = {
                Leaf: <Leaf size={48} className="text-amber-300 mb-4" />,
                Truck: <Truck size={48} className="text-amber-300 mb-4" />,
                LeafAlt: <LeafAlt size={48} className="text-amber-300 mb-4" />,
                CheckCircle: <CheckCircle size={48} className="text-amber-300 mb-4" />,
                Trophy: <Trophy size={48} className="text-amber-300 mb-4" />,
                Heart: <Heart size={48} className="text-amber-300 mb-4" />
              }
              return (
              <div key={idx} className="p-8 bg-emerald-900/40 backdrop-blur-md border border-amber-400/30 rounded-2xl hover:border-amber-300/60 hover:shadow-xl transition-all duration-300 animate-scale-in" style={{animationDelay: `${0.1 * (idx + 1)}s`}}>
                <div className="mb-4">{iconMap[item.iconName]}</div>
                <h3 className="text-2xl font-bold text-amber-200 mb-2">{item.title}</h3>
                <p className="text-amber-50">{item.description}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Top Rated Picks */}
      <section className="py-20 bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-700 border-y-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-amber-300 font-bold tracking-widest uppercase text-sm mb-2">Customer Favorites</p>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-4">Top Rated Picks</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOP_RATED.map((fruit) => (
              <div key={fruit.id} className="relative group">
                <div className="absolute -top-3 -right-3 z-10"><div className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-4 py-2 rounded-full shadow-lg text-xs flex items-center gap-1"><Trophy size={14} /> Top Rated</div></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <ProductCard product={fruit} />
                </div>
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
