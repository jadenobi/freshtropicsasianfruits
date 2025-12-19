import PageLayout from "@/components/PageLayout"

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Privacy Policy</h2>
          <p className="text-gray-600">Last Updated: November 2024</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">1. Introduction</h3>
            <p>Fresh Tropics Asian Fruits ("we", "us", "our", or "Company") operates the freshtropicsasianfruits.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">2. Information Collection and Use</h3>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            
            <h4 className="font-bold text-emerald-800 mt-4 mb-2">Types of Data Collected:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><span className="font-semibold">Personal Data:</span> Name, email address, phone number, shipping address, payment information</li>
              <li><span className="font-semibold">Usage Data:</span> Browser type, IP address, pages visited, time spent on pages, referring URLs</li>
              <li><span className="font-semibold">Cookie Data:</span> Information stored on your device to enhance your experience</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">3. Use of Data</h3>
            <p>Fresh Tropics Asian Fruits uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To send you marketing and promotional communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">4. Security of Data</h3>
            <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">5. Cookies</h3>
            <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">6. Links to Other Sites</h3>
            <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">7. Children's Privacy</h3>
            <p>Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us immediately.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">8. Changes to This Privacy Policy</h3>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">9. Your Rights</h3>
            <p>Depending on your location, you may have certain rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to opt-out of marketing communications</li>
              <li>The right to request a copy of your personal data</li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-emerald-50 to-yellow-50 border border-emerald-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">10. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="space-y-2 mt-4">
              <p><span className="font-semibold">Email:</span> <a href="mailto:privacy@freshtropicsasianfruits.com" className="text-emerald-600 hover:text-emerald-700">privacy@freshtropicsasianfruits.com</a></p>
              <p><span className="font-semibold">Mailing Address:</span></p>
              <p className="ml-4">Fresh Tropics Asian Fruits<br/>1471 NW 21st St<br/>Miami, FL 33142</p>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
