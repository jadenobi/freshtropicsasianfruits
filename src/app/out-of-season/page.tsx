import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import { FRUITS } from "@/lib/data"

export default function OutOfSeasonPage() {
  const outOfSeasonFruits = [
    {
      name: "Purple Mangosteen",
      season: "June - August",
      reason: "Limited availability in winter",
      status: "Currently Out",
      image: "https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Mangosteen_8lbs_2.jpg?v=1762457559"
    },
    {
      name: "Rambutan",
      season: "May - September",
      reason: "Seasonal harvest period",
      status: "Back in September",
      image: "https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Rambutan_3lbs_3.jpg?v=1762457557"
    },
    {
      name: "Red Dragon Fruit",
      season: "July - November",
      reason: "Peak season passed",
      status: "Back in July 2025",
      image: "https://cdn.shopify.com/s/files/1/0054/9512/8152/files/YellowDragon5lbs2.jpg?v=1762457592"
    },
    {
      name: "Longan / Dragon Eye",
      season: "August - October",
      reason: "Harvest season has ended",
      status: "Seasonal Item",
      image: "https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Longans_5lbs_2.jpg?v=1762457539"
    }
  ]

  const seasonalCalendar = [
    { month: "January", fruits: ["Pomegranate", "Persimmon", "Kiwi"] },
    { month: "February", fruits: ["Pomegranate", "Persimmon", "Papaya"] },
    { month: "March", fruits: ["Mango", "Papaya", "Passion Fruit"] },
    { month: "April", fruits: ["Mango", "Pineapple", "Avocado"] },
    { month: "May", fruits: ["Mango", "Rambutan", "Lychee"] },
    { month: "June", fruits: ["Mango", "Mangosteen", "Rambutan"] },
    { month: "July", fruits: ["Mango", "Dragon Fruit", "Mangosteen"] },
    { month: "August", fruits: ["Mango", "Dragon Fruit", "Longan"] },
    { month: "September", fruits: ["Rambutan", "Passion Fruit", "Longan"] },
    { month: "October", fruits: ["Passion Fruit", "Persimmon", "Longan"] },
    { month: "November", fruits: ["Persimmon", "Pomegranate", "Kiwi"] },
    { month: "December", fruits: ["Pomegranate", "Persimmon", "Mango"] }
  ]

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Out of Season Fruits</h2>
          <p className="text-gray-600 text-lg">We work with seasonal harvests to bring you the freshest fruit at peak ripeness</p>
        </div>

        {/* Currently Out of Stock */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Currently Out of Season</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {outOfSeasonFruits.map((fruit, idx) => (
              <div key={idx} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden bg-emerald-50">
                  <img 
                    src={fruit.image}
                    alt={fruit.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {fruit.status}
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-bold text-lg text-emerald-900 group-hover:text-emerald-700 transition-colors">{fruit.name}</h4>
                  <p className="text-xs text-emerald-600 font-semibold mt-1 uppercase tracking-wider">Out of Season</p>
                  
                  <p className="text-gray-600 text-sm mt-3 mb-4">
                    <span className="font-semibold">Peak Season:</span> {fruit.season}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {fruit.reason}
                  </p>

                  <Link 
                    href="/contact"
                    className="w-full block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg text-center transition-all duration-300"
                  >
                    Notify Me
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Calendar */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Seasonal Availability Calendar</h3>
          <div className="bg-white border-2 border-emerald-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonalCalendar.map((month, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-3 text-lg">{month.month}</h4>
                  <ul className="space-y-2">
                    {month.fruits.map((fruit, fIdx) => (
                      <li key={fIdx} className="text-gray-700 text-sm flex items-center gap-2">
                        <span className="text-emerald-600">•</span>
                        {fruit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-emerald-900 mb-4">Why We Go Out of Season</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-emerald-600">✓</span>
                <span>We only source fruits at peak freshness and ripeness</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600">✓</span>
                <span>Seasonal sourcing supports local farmers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600">✓</span>
                <span>Prevents artificial ripening agents</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600">✓</span>
                <span>Ensures maximum nutritional value</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600">✓</span>
                <span>Reduces environmental impact</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Request a Fruit</h3>
            <p className="text-gray-700 mb-6">
              Looking for a specific fruit that's currently out of season? Let us know! We work with farms globally and might be able to source it for you.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request a Fruit
            </Link>
          </div>
        </div>

        {/* Available Now */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">What's Available Now? 🍍</h3>
          <p className="text-gray-700 mb-6">
            Browse our current collection of fresh, in-season fruits available for delivery.
          </p>
          <Link 
            href="/shop" 
            className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Shop Available Fruits
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
