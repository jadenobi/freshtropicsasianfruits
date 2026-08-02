import PageLayout from '@/components/PageLayout'

export default function LiveChatPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-6"> Live Support</h1>
        <p className="text-xl text-gray-600 mb-12">
          We're here to help! For real-time assistance, please use the chat bubble in the bottom right corner of your screen.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-900 mb-4"> Email Support</h2>
            <p className="text-gray-600 mb-4">
              For order inquiries or specific product questions, reach out to our professional mailbox:
            </p>
            <a 
              href="mailto:support@freshtropicsasianfruits.com" 
              className="text-amber-600 font-bold hover:underline break-all"
            >
              support@freshtropicsasianfruits.com
            </a>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-900 mb-4"> Response Times</h2>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Live Chat:</strong> Usually 2-5 minutes</li>
              <li><strong>Email:</strong> Under 24 hours</li>
              <li><strong>Hours:</strong> Mon-Fri 9am-6pm EST</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
