import PageLayout from '@/components/PageLayout'

export default function ContactPage(){
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Contact Us</h1>
            <p className="text-gray-700 mb-8 text-lg">Have a question or want to order in bulk? Reach out and we'll get back to you quickly.</p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Name</label>
                <input 
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-emerald-600 text-gray-900 font-semibold placeholder-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                <input 
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-emerald-600 text-gray-900 font-semibold placeholder-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                <textarea 
                  placeholder="Tell us what you need..."
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-emerald-600 text-gray-900 font-semibold placeholder-gray-700"
                  rows={5}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg text-lg"
              >
                Send Message
              </button>
            </form>

            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">📞 Phone</p>
                  <p className="text-lg font-bold text-gray-900">1-800-TROPICS</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">📧 Email</p>
                  <p className="text-lg font-bold text-gray-900">support@freshtropics.com</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">🕐 Business Hours</p>
                  <p className="text-lg font-bold text-gray-900">Mon-Fri 9AM-6PM EST</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">📍 Address</p>
                  <p className="text-lg font-bold text-gray-900">Miami, Florida, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
