import PageLayout from '@/components/PageLayout'

export default function AboutPage(){
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 min-h-screen">
        {/* Hero Section with Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100">Our Story</h1>
              <p className="text-lg text-amber-50 leading-relaxed mb-4">
                My family has always been connected to the land. Growing up in a Cuban-American household, our kitchen was always filled with fresh avocados, mangos, yuca, and other fruits with names that to this day, I still have trouble pronouncing.
              </p>
              <p className="text-lg text-amber-50 leading-relaxed">
                My father is a tropical produce entrepreneur that for over 35 years has been sourcing exotic and tropical produce from Florida, the Caribbean, Central and South America to all corners of the United States.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-amber-400/30 backdrop-blur-sm bg-white/10">
              <img 
                src="https://cdn.shopify.com/s/files/1/0054/9512/8152/files/TropicalFruit.jpg?v=1583671710"
                alt="Tropical Fruit Warehouse"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Family Story Section */}
        <div className="bg-gradient-to-br from-emerald-800/50 via-emerald-700/50 to-emerald-600/50 backdrop-blur-md border-t border-b border-amber-400/20 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-200">A Memory From Ecuador</h2>
            <div className="prose prose-lg max-w-none text-amber-50 space-y-6">
              <p className="text-lg leading-relaxed">
                Because of our family's business, I was raised visiting farms in the Caribbean, Central, and South America. One of my first memories, was as a young girl in the mountains of Ecuador. I was holding my Dad's hand as I saw a pack of mules with large sacks draped over their sides, guided down a mountain by a farmer. They were carrying a load of a local root, known as malanga. Covered in fresh dirt, the root was brown with thread-like hairs on the outside. 
              </p>

              <p className="text-lg leading-relaxed italic bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 backdrop-blur-sm p-6 rounded-lg border-l-4 border-amber-400 text-amber-50">
                "It doesn't get any fresher than this!" the proud farmer said as he broke the root in half with a crisp snap. Ugly-looking on the outside, the inside was pristine and white as snow.
              </p>

              <p className="text-lg leading-relaxed">
                My Dad smiled, examined the freshness and passed it to me. At the time, I had no idea what this strange root was, but seeing my father light up and how proud the farmer was, I knew it had to be something special. That moment changed my perspective on food forever.
              </p>
            </div>
          </div>
        </div>

        {/* Family & Mission */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100">My Family & Mission</h2>
          
          <div className="bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 backdrop-blur-md border-2 border-amber-400/30 rounded-lg p-8 mb-12">
            <p className="text-lg leading-relaxed text-amber-50 mb-6">
              I have now started a family of my own. As a Cuban-American mother of 3, married to a Costa Rican, whose mother is from El Salvador and father is from Nicaragua, my family is as diverse as my experience. We represent the true multicultural heritage of the tropical Americas.
            </p>

            <p className="text-lg leading-relaxed font-semibold text-amber-100 bg-gradient-to-r from-amber-600/40 to-yellow-600/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-amber-300">
              As I've travelled the country, I've learned just how hard it can be to find and enjoy fresh tropical produce. That's why I decided to start Fresh Tropics Asian Fruits. It's my hope that this produce can nourish and bring your family together just as it has mine.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-md p-8 rounded-lg border-2 border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/20 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">🌱</div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-3">35+ Years Heritage</h3>
              <p className="text-amber-50 leading-relaxed">Family expertise in sourcing authentic tropical produce directly from farms in Florida, the Caribbean, Central and South America.</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-md p-8 rounded-lg border-2 border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/20 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">🥭</div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-3">Peak Freshness</h3>
              <p className="text-amber-50 leading-relaxed">Direct from trusted partner farms to your doorstep. Harvested at peak ripeness, shipped within 24 hours. "It doesn't get any fresher than this!"</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-md p-8 rounded-lg border-2 border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/20 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">❤️</div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-3">Bringing Families Together</h3>
              <p className="text-amber-50 leading-relaxed">We celebrate the diversity and heritage of our multicultural family through authentic tropical fruits that nourish yours.</p>
            </div>
          </div>
        </div>

        {/* Diversity Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 py-16 border-t-2 border-b-2 border-emerald-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8 text-emerald-900">Our Diverse Heritage</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
                <p className="text-2xl mb-2">🇨🇺</p>
                <p className="font-bold text-emerald-900">Cuban-American</p>
                <p className="text-sm text-gray-600">Founder & Family Heritage</p>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
                <p className="text-2xl mb-2">🇨🇷</p>
                <p className="font-bold text-emerald-900">Costa Rican</p>
                <p className="text-sm text-gray-600">Spouse Heritage</p>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
                <p className="text-2xl mb-2">🇸🇻</p>
                <p className="font-bold text-emerald-900">Salvadoran</p>
                <p className="text-sm text-gray-600">In-Law Heritage</p>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
                <p className="text-2xl mb-2">🇳🇮</p>
                <p className="font-bold text-emerald-900">Nicaraguan</p>
                <p className="text-sm text-gray-600">In-Law Heritage</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our family represents the true spirit of the tropical Americas. This multicultural heritage shapes everything we do - from how we source fruits to how we serve our customers.
            </p>
          </div>
        </div>

        {/* Community Commitment */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8 text-emerald-900 text-center">Our Commitment</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-emerald-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Women-Powered Business</h3>
              <p className="text-gray-700 leading-relaxed">
                Fresh Tropics is a women-powered small business. We believe in supporting female entrepreneurs and creating opportunities in the agricultural sector.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Sustainable Farming</h3>
              <p className="text-gray-700 leading-relaxed">
                We partner with farms practicing sustainable and organic methods. By supporting Fresh Tropics, you're supporting responsible agriculture and fair-trade practices.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Community Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                A portion of our profits goes back to farming communities in the Caribbean, Central, and South America through direct farmer support programs.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Customer Satisfaction</h3>
              <p className="text-gray-700 leading-relaxed">
                We're committed to 100% customer satisfaction. Every fruit is guaranteed fresh, and our team is available 24/7 to ensure you're happy.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Experience Fresh Tropics</h2>
            <p className="text-emerald-50 mb-8 text-lg">
              Join our family and discover the difference authentic tropical produce makes
            </p>
            <a href="/shop" className="inline-block bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
