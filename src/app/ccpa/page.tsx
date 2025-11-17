import PageLayout from "@/components/PageLayout"

export default function CCPAOptOutPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">California Consumer Privacy Act (CCPA) Opt-Out</h2>
          <p className="text-gray-600 text-lg">Manage your personal data privacy preferences</p>
        </div>

        {/* CCPA Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-12">
          <h3 className="text-xl font-bold text-blue-900 mb-4">About CCPA</h3>
          <p className="text-gray-700 mb-4">
            The California Consumer Privacy Act (CCPA) gives California residents the right to know, delete, and opt-out of the sale or sharing of their personal information. Fresh Tropics Asian Fruits respects your privacy rights.
          </p>
          <p className="text-gray-700">
            If you are a California resident, you have the right to request that we delete any personal information we have collected from you and refrain from further collection and use of that information.
          </p>
        </div>

        {/* Your Rights */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">Your Rights Under CCPA</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">1</span>
                <div>
                  <p className="font-semibold">Right to Know</p>
                  <p className="text-sm">Know what personal data we collect about you</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">2</span>
                <div>
                  <p className="font-semibold">Right to Delete</p>
                  <p className="text-sm">Request deletion of your personal data</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">3</span>
                <div>
                  <p className="font-semibold">Right to Opt-Out</p>
                  <p className="text-sm">Opt out of the sale or sharing of personal data</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">4</span>
                <div>
                  <p className="font-semibold">Right to Non-Discrimination</p>
                  <p className="text-sm">Not be discriminated against for exercising your rights</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">What Data We Don't Sell</h3>
            <p className="text-gray-700 mb-4 font-semibold">
              Fresh Tropics does NOT sell or share your personal information with third parties for monetary consideration.
            </p>
            <p className="text-gray-700 mb-4">
              We use your information solely to:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Process your orders</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Provide customer service</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Send order updates</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Improve our services</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Comply with legal obligations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Opt-Out Form */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Submit Your Request</h3>
          <form className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Full Name *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">Email Address *</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">Phone Number (Optional)</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                placeholder="(786) 758-4787"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-3">Request Type *</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="request" value="opt-out" required />
                  <span className="text-gray-700">Opt-Out of Sale or Sharing of Personal Data</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="request" value="know" />
                  <span className="text-gray-700">Request to Know What Personal Data We Have</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="request" value="delete" />
                  <span className="text-gray-700">Request Deletion of Personal Data</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">Additional Information (Optional)</label>
              <textarea 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 min-h-24"
                placeholder="Any additional details about your request..."
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm text-gray-700">
                  I certify that I am a California resident and am authorized to submit this request. I understand that Fresh Tropics will use this information only to verify my identity and respond to my request.
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Response Timeline */}
        <div className="bg-gradient-to-r from-emerald-50 to-yellow-50 border-2 border-emerald-200 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Response Timeline</h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <p className="font-semibold text-emerald-900">Submission Received</p>
                <p className="text-gray-600 text-sm">Your request is logged and you receive a confirmation email</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <p className="font-semibold text-emerald-900">Identity Verification</p>
                <p className="text-gray-600 text-sm">We verify your California residency and identity (within 10 business days)</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <p className="font-semibold text-emerald-900">Request Processing</p>
                <p className="text-gray-600 text-sm">We process your request and provide a response (within 45 days)</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <p className="font-semibold text-emerald-900">Confirmation</p>
                <p className="text-gray-600 text-sm">You receive a confirmation once your request has been completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white border-2 border-emerald-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">Questions About CCPA?</h3>
          <p className="text-gray-700 mb-6">
            If you have any questions about your privacy rights or need assistance, please contact us.
          </p>
          <div className="space-y-3">
            <p>
              <a href="mailto:privacy@freshtropicsasianfruits.com" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                privacy@freshtropicsasianfruits.com
              </a>
            </p>
            <p>
              <a href="tel:+17867584787" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                (786) 758-4787
              </a>
            </p>
            <p className="text-gray-600 text-sm">Available 24/7</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
