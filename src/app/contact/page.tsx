import PageLayout from '@/components/PageLayout'

export default function ContactPage(){
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 backdrop-blur-md rounded-xl shadow-2xl border-2 border-amber-400/30 p-8">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 mb-2">Contact Us</h1>
            <p className="text-amber-50 mb-8 text-lg">Have a question or want to order in bulk? Reach out and we'll get back to you quickly.</p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-amber-100 mb-2">Name</label>
                <input 
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-4 border-3 border-amber-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-900 font-bold placeholder-gray-800 text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-amber-100 mb-2">Email</label>
                <input 
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-4 border-3 border-amber-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-900 font-bold placeholder-gray-800 text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-amber-100 mb-2">Message</label>
                <textarea 
                  placeholder="Tell us what you need..."
                  className="w-full px-4 py-4 border-3 border-amber-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-900 font-bold placeholder-gray-800 text-base"
                  rows={5}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full px-6 py-4 min-h-12 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all shadow-lg text-lg uppercase active:scale-95"
              >
                Send Message
              </button>
            </form>

            <div className="mt-12 pt-8 border-t-2 border-amber-400/20">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100 mb-6">Other Ways to Reach Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-sm p-6 rounded-lg border-2 border-amber-400/30">
                  <p className="text-sm text-amber-200 mb-1">📞 Phone</p>
                  <p className="text-lg font-bold text-amber-50">1-800-TROPICS</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-sm p-6 rounded-lg border-2 border-amber-400/30">
                  <p className="text-sm text-amber-200 mb-1">📧 Email</p>
                  <p className="text-lg font-bold text-amber-50">support@freshtropics.com</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-sm p-6 rounded-lg border-2 border-amber-400/30">
                  <p className="text-sm text-amber-200 mb-1">🕐 Business Hours</p>
                  <p className="text-lg font-bold text-amber-50">Mon-Fri 9AM-6PM EST</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-sm p-6 rounded-lg border-2 border-amber-400/30">
                  <p className="text-sm text-amber-200 mb-1">📍 Address</p>
                  <p className="text-lg font-bold text-amber-50">Miami, Florida, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
