import PageLayout from "@/components/PageLayout"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long does shipping take?",
          a: "We offer FREE shipping on all U.S. orders! Most orders arrive within 3-5 business days. We ship Monday through Friday to ensure your fruits arrive fresh and stay cool."
        },
        {
          q: "Do you ship internationally?",
          a: "Currently, we ship only to the continental United States. We're working on expanding to Canada and other countries soon!"
        },
        {
          q: "What if my order arrives damaged?",
          a: "We guarantee the freshness of every box! If anything arrives damaged or in poor condition, contact us within 24 hours and we'll send a replacement or issue a full refund."
        },
        {
          q: "Can I schedule a delivery date?",
          a: "Yes! During checkout, you can select your preferred delivery date. We'll do our best to accommodate your request."
        }
      ]
    },
    {
      category: "Products & Quality",
      questions: [
        {
          q: "How do you ensure fruit freshness?",
          a: "We hand-select all fruits from certified organic farms and trusted suppliers. Fruits are picked at peak ripeness and shipped within 24 hours of harvest."
        },
        {
          q: "Are all your fruits organic?",
          a: "Most of our fruits are certified organic. Where organic isn't available, we source from farms using sustainable, pesticide-free farming practices."
        },
        {
          q: "How should I store my fruits?",
          a: "Store ripe fruits in the refrigerator to extend shelf life. Unripe fruits can ripen at room temperature. Check our blog for specific storage tips for each fruit!"
        },
        {
          q: "What's the difference between the box sizes?",
          a: "Small boxes (4-6 servings), Medium boxes (6-8 servings), and Large boxes (8-10+ servings). All include a variety of seasonal fruits."
        }
      ]
    },
    {
      category: "Account & Subscriptions",
      questions: [
        {
          q: "Can I skip a month with a subscription?",
          a: "Absolutely! You can pause your subscription anytime and restart whenever you're ready. No penalties or fees."
        },
        {
          q: "How do I cancel my subscription?",
          a: "You can cancel anytime from your account dashboard. We'll send you a confirmation email."
        },
        {
          q: "Do I get a discount with Subscribe & Save?",
          a: "Yes! Subscribe & Save customers get 10-15% off regular prices, plus free shipping on all orders."
        },
        {
          q: "Can I customize my subscription box?",
          a: "You can choose which fruits to include or exclude each month from your account preferences."
        }
      ]
    },
    {
      category: "Payments & Returns",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept PayPal, Apple Pay, Venmo, Cash App, Zelle, Cryptocurrency, Visa, Mastercard, American Express, and Google Pay."
        },
        {
          q: "Is my payment information secure?",
          a: "Yes! We use industry-standard SSL encryption and never store credit card details on our servers."
        },
        {
          q: "What's your refund policy?",
          a: "We offer a 30-day money-back guarantee on all orders. If you're not satisfied, contact us for a full refund or replacement."
        },
        {
          q: "Do you offer corporate discounts?",
          a: "Yes! For bulk orders and corporate accounts, contact our corporate sales team at corporate@freshtropicsasianfruits.com"
        }
      ]
    }
  ]

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Can't find what you're looking for? <a href="mailto:hello@freshtropicsasianfruits.com" className="text-emerald-600 hover:text-emerald-700 font-semibold">Contact us</a></p>
        </div>

        <div className="space-y-8">
          {faqs.map((section, idx) => (
            <div key={idx} className="border-b-2 border-amber-400/20 pb-8 last:border-b-0">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-6">{section.category}</h3>
              <div className="space-y-4">
                {section.questions.map((item, qIdx) => (
                  <details key={qIdx} className="group bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 backdrop-blur-sm border border-amber-400/30 rounded-lg p-4 hover:border-amber-300/50 transition-all hover:shadow-lg hover:shadow-amber-400/20">
                    <summary className="font-semibold text-amber-50 cursor-pointer group-open:text-amber-200 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-amber-500/50 to-yellow-500/50 rounded-full group-open:from-amber-400 group-open:to-yellow-300 group-open:text-emerald-900 text-sm font-bold transition-all text-amber-100 group-open:shadow-lg group-open:shadow-amber-400/50">+</span>
                      {item.q}
                    </summary>
                    <p className="text-amber-50 mt-4 ml-8 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-600/30 via-yellow-600/30 to-amber-600/30 backdrop-blur-md rounded-lg p-8 text-center border-2 border-amber-400/30">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100 mb-4">Still Have Questions?</h3>
          <p className="text-amber-50 mb-6 text-lg">Our customer service team is available 24/7 to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@freshtropicsasianfruits.com" className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 px-8 py-3 rounded-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all font-bold uppercase">
              Email Us
            </a>
            <a href="tel:+17867584787" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-lg hover:shadow-2xl hover:shadow-emerald-400/50 transition-all font-bold uppercase">
              Call Us: (786) 758-4787
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
