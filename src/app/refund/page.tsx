import PageLayout from "@/components/PageLayout"

export default function RefundPolicyPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Refund Policy</h2>
          <p className="text-gray-600">At Fresh Tropics, customer satisfaction is our top priority.</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <section className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Our Promise: 100% Satisfaction Guarantee</h3>
            <p className="font-semibold">If you're not completely satisfied with your Fresh Tropics order for any reason, we'll make it right.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">30-Day Money Back Guarantee</h3>
            <p>We offer a full refund or replacement within 30 days of your purchase if:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Fruits arrived damaged or in poor condition</li>
              <li>Products were not fresh upon arrival</li>
              <li>Items didn't match the product description</li>
              <li>You're unsatisfied with your order for any reason</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">How to Request a Refund</h3>
            <ol className="list-decimal list-inside space-y-3 ml-4 mt-3">
              <li><span className="font-semibold">Contact Us:</span> Email hello@freshtropicsasianfruits.com or call (786) 758-4787 with your order number and reason for the refund</li>
              <li><span className="font-semibold">Provide Photos:</span> If applicable, send photos of damaged or expired items</li>
              <li><span className="font-semibold">We Respond:</span> Our team will review your request within 24 hours</li>
              <li><span className="font-semibold">Choose Option:</span> Receive a replacement shipment or full refund</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Subscription Cancellations</h3>
            <p><span className="font-semibold">Cancel Anytime:</span> If you have a subscription, you can cancel at any time from your account dashboard with no penalties or fees.</p>
            <p className="mt-3"><span className="font-semibold">Pause Subscription:</span> Not ready to cancel? You can pause your subscription for a month or longer and restart whenever you're ready.</p>
            <p className="mt-3"><span className="font-semibold">Modify Preferences:</span> Change your fruit selections, box size, or delivery frequency anytime.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Processing Refunds</h3>
            <p>Once your refund is approved:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Refunds are typically processed within 5-7 business days</li>
              <li>The refund will be credited to the original payment method</li>
              <li>Some credit card companies may take an additional 2-3 business days to post the credit</li>
              <li>For alternative payment methods (PayPal, Venmo, etc.), processing may vary</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Damaged Shipments</h3>
            <p><span className="font-semibold">Immediate Action:</span> If your shipment arrives damaged, contact us immediately. Take photos of the damage and packaging.</p>
            <p className="mt-3"><span className="font-semibold">No Return Needed:</span> We don't require you to return damaged fresh produce. We'll issue a refund or send a replacement right away.</p>
            <p className="mt-3"><span className="font-semibold">Responsibility:</span> While we take great care with packaging, shipping damage is sometimes unavoidable. Our guarantee protects you completely.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Non-Returnable Items</h3>
            <p>Due to the perishable nature of fresh produce, we cannot accept returns of fresh fruits. However, if the fruit doesn't meet our quality standards (damaged, spoiled, or not fresh), we will refund your money or send a replacement at no cost.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Exceptions</h3>
            <p>Refunds may not be available for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Orders made during promotional/clearance events (unless specifically stated)</li>
              <li>Requests made more than 30 days after purchase</li>
              <li>Orders where the customer can't be contacted to verify damage or issues</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Shipping Costs</h3>
            <p><span className="font-semibold">Free Shipping Both Ways:</span> If we issue a refund or replacement due to our error or product quality issues, you receive a prepaid return label and free replacement shipping.</p>
            <p className="mt-3"><span className="font-semibold">Your Change of Mind:</span> If you're canceling due to a change of mind and within 24 hours of order placement, contact us for options.</p>
          </section>

          <section className="bg-gradient-to-r from-emerald-50 to-yellow-50 border border-emerald-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Questions About Our Refund Policy?</h3>
            <p className="mb-4">We're here to help! Our customer service team is available 24/7.</p>
            <div className="space-y-2">
              <p><span className="font-semibold">Email:</span> <a href="mailto:hello@freshtropicsasianfruits.com" className="text-emerald-600 hover:text-emerald-700">hello@freshtropicsasianfruits.com</a></p>
              <p><span className="font-semibold">Phone:</span> <a href="tel:+17867584787" className="text-emerald-600 hover:text-emerald-700">(786) 758-4787</a></p>
              <p><span className="font-semibold">Hours:</span> 24/7 support</p>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
