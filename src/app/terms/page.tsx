import PageLayout from "@/components/PageLayout"

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Terms of Service</h2>
          <p className="text-gray-600">Last Updated: November 2024</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">1. Agreement to Terms</h3>
            <p>By accessing and using the Fresh Tropics Asian Fruits website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Fresh Tropics Asian Fruits' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on Fresh Tropics website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">3. Product Information</h3>
            <p>We strive to ensure that product descriptions, pricing, and availability information on our website is accurate. However, we do not guarantee that all product descriptions, pricing, or other content of any Fresh Tropics website is accurate, complete, or error-free.</p>
            <p>We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders if any information on our website or the related services is inaccurate at any time without prior notice.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">4. Pricing and Availability</h3>
            <p>All prices are subject to change without notice. Fresh Tropics reserves the right to limit quantities. Products are subject to availability. We reserve the right to discontinue any product at any time.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">5. Order Acceptance</h3>
            <p>We reserve the right to refuse any order. We reserve the right to limit or cancel quantities purchased per person, per household, or per order. We will confirm receipt of your order by email. This confirmation does not constitute an acceptance of your order.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">6. Payment</h3>
            <p>Payment must be received before shipment of your order. We accept all major payment methods as listed on our website. By submitting an order, you warrant that you are legally able to authorize this payment.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">7. Limitation of Liability</h3>
            <p>In no event shall Fresh Tropics Asian Fruits, its suppliers, or their respective officers, directors, employees, or agents be liable for any damages whatsoever (including, without limitation, indirect, incidental, special, consequential, or punitive damages, lost profits, or damages for loss of data) arising out of or in connection with the use or inability to use the materials on Fresh Tropics website.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">8. Accuracy of Materials</h3>
            <p>The materials appearing on Fresh Tropics website could include technical, typographical, or photographic errors. Fresh Tropics does not warrant that any of the materials on its website are accurate, complete, or current.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">9. Links</h3>
            <p>Fresh Tropics has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Fresh Tropics of the site. Use of any such linked website is at the user's own risk.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">10. Modifications</h3>
            <p>Fresh Tropics may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">11. Governing Law</h3>
            <p>These Terms and Conditions are governed by and construed in accordance with the laws of the State of Florida, and you irrevocably submit to the exclusive jurisdiction of the courts located in Miami, Florida.</p>
          </section>

          <section className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Questions?</h3>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="font-semibold text-emerald-700 mt-2">hello@freshtropicsasianfruits.com</p>
            <p className="font-semibold text-emerald-700">(786) 758-4787</p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
