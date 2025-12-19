import PageLayout from "@/components/PageLayout"

export default function CorporatePage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Corporate Orders & Bulk Pricing</h2>
          <p className="text-gray-600 text-lg">Delight your team, clients, or event guests with fresh tropical fruits</p>
        </div>

        {/* Why Fresh Tropics */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200">
            <p className="text-3xl mb-3">🎁</p>
            <h3 className="font-bold text-emerald-900 mb-3">Memorable Gifting</h3>
            <p className="text-gray-700 text-sm">Make a lasting impression with premium, fresh fruit boxes that wow your clients and employees.</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200">
            <p className="text-3xl mb-3">📦</p>
            <h3 className="font-bold text-emerald-900 mb-3">Customizable Solutions</h3>
            <p className="text-gray-700 text-sm">Choose fruit varieties, box sizes, and packaging to match your brand and budget.</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 p-6 rounded-lg border border-emerald-200">
            <p className="text-3xl mb-3">💰</p>
            <h3 className="font-bold text-emerald-900 mb-3">Bulk Discounts</h3>
            <p className="text-gray-700 text-sm">Special pricing on orders of 10+ boxes, plus flexible delivery scheduling.</p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Perfect For</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { emoji: "🏢", title: "Corporate Events", desc: "Conferences, meetings, and networking events" },
              { emoji: "🏥", title: "Healthcare Facilities", desc: "Wellness initiatives and patient appreciation" },
              { emoji: "🎓", title: "Educational Programs", desc: "School events and student wellness programs" },
              { emoji: "💒", title: "Weddings & Celebrations", desc: "Add fresh fruit to any special occasion" },
              { emoji: "🏠", title: "Moving & Welcome Gifts", desc: "Delight new team members or neighbors" },
              { emoji: "🎉", title: "Trade Shows & Exhibitions", desc: "Stand out with premium giveaways" }
            ].map((useCase, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-3xl">{useCase.emoji}</span>
                <div>
                  <h4 className="font-bold text-emerald-900 mb-1">{useCase.title}</h4>
                  <p className="text-gray-600 text-sm">{useCase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Guide */}
        <div className="mb-12 bg-white border-2 border-emerald-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Corporate Pricing Guide</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="font-semibold text-gray-900">Small Boxes (5-8 lbs)</span>
              <span className="text-emerald-600 font-bold">$45-65</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="font-semibold text-gray-900">Medium Boxes (8-12 lbs)</span>
              <span className="text-emerald-600 font-bold">$65-85</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="font-semibold text-gray-900">Large Boxes (12-16 lbs)</span>
              <span className="text-emerald-600 font-bold">$85-110</span>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-gray-700"><span className="font-semibold">Bulk Discount:</span> 10% off 10-24 boxes, 15% off 25+ boxes. Free delivery on all corporate orders!</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Order?</h3>
          <p className="mb-8 text-emerald-50">Our corporate team will work with you to create the perfect fruit solution for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:corporate@freshtropicsasianfruits.com" 
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-semibold"
            >
              Email Corporate Sales
            </a>
            <a 
              href="tel:+17867584787" 
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-400 transition-colors font-semibold"
            >
              Call: (786) 758-4787
            </a>
          </div>
          <p className="text-emerald-100 text-sm mt-6">Available Monday-Friday, 9am-6pm EST</p>
        </div>
      </div>
    </PageLayout>
  )
}
