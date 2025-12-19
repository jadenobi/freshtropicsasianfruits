import PageLayout from "@/components/PageLayout"

export default function PressPage() {
  const pressReleases = [
    {
      date: "Nov 2024",
      title: "Fresh Tropics Launches Pink Glow Pineapple Collection",
      excerpt: "New luxury fruit line brings premium tropical experience to American homes",
      link: "#"
    },
    {
      date: "Oct 2024",
      title: "Fresh Tropics Featured in 'Best Fruit Delivery Services'",
      excerpt: "Named top emerging fruit e-commerce business by Organic Living Magazine",
      link: "#"
    },
    {
      date: "Sep 2024",
      title: "Women-Owned Business Spotlight: Fresh Tropics",
      excerpt: "Celebrating diverse entrepreneurs in the sustainable food sector",
      link: "#"
    }
  ]

  const mediaKits = [
    {
      name: "Brand Guidelines",
      description: "Logo, colors, and brand standards",
      file: "brand-guidelines.pdf"
    },
    {
      name: "High-Resolution Photos",
      description: "Product images and team photos for media use",
      file: "fresh-tropics-media-kit.zip"
    },
    {
      name: "Company Information",
      description: "Background, mission, and company facts",
      file: "company-info.pdf"
    }
  ]

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Press Center</h2>
          <p className="text-gray-600 text-lg">Newsroom and media resources for Fresh Tropics</p>
        </div>

        {/* Press Releases */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Latest Press Releases</h3>
          <div className="space-y-4">
            {pressReleases.map((release, idx) => (
              <a key={idx} href={release.link} className="block bg-white border-l-4 border-emerald-500 p-6 rounded-lg hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-emerald-600 font-semibold mb-1">{release.date}</p>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {release.title}
                    </h4>
                    <p className="text-gray-600">{release.excerpt}</p>
                  </div>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition-transform ml-4">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Media Kit */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Media Kit</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {mediaKits.map((kit, idx) => (
              <a key={idx} href={`/media/${kit.file}`} className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg hover:shadow-md transition-shadow border border-emerald-200 group">
                <h4 className="font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {kit.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{kit.description}</p>
                <button className="text-emerald-600 font-semibold text-sm hover:text-emerald-700 group-hover:translate-x-1 transition-transform">
                  Download →
                </button>
              </a>
            ))}
          </div>
        </div>

        {/* Press Contact */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">For Press Inquiries</h3>
          <p className="mb-6 text-emerald-50">Have a story idea or media inquiry? We'd love to hear from you!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:press@freshtropicsasianfruits.com" className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-semibold">
              press@freshtropicsasianfruits.com
            </a>
            <a href="tel:+17867584787" className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-400 transition-colors font-semibold">
              (786) 758-4787
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
