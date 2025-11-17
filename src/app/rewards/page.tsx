import PageLayout from "@/components/PageLayout"

export default function RewardsPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Fresh Tropics Rewards Program</h2>
          <p className="text-gray-600 text-lg">Earn points on every purchase and redeem for discounts and rewards</p>
        </div>

        {/* How It Works */}
        <div className="bg-white border-2 border-emerald-200 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">How Rewards Work</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-3xl">🎁</span>
              <div>
                <h4 className="font-bold text-emerald-900">Earn 1 Point per $1</h4>
                <p className="text-gray-700">Every dollar you spend gets you one reward point, every time</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">⭐</span>
              <div>
                <h4 className="font-bold text-emerald-900">Bonus Points on Specials</h4>
                <p className="text-gray-700">Get 2x or 3x points during special promotions and seasonal sales</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className="font-bold text-emerald-900">Unlock Tier Benefits</h4>
                <p className="text-gray-700">Reach Silver, Gold, or Platinum tiers to unlock exclusive perks</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">💸</span>
              <div>
                <h4 className="font-bold text-emerald-900">Redeem Points</h4>
                <p className="text-gray-700">100 points = $10 off, 250 points = $30 off, plus exclusive items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Tiers */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Rewards Tiers</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">🥈 Silver</h4>
              <p className="text-sm text-blue-800 mb-4">Starts at 250 points</p>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ 5% bonus points</li>
                <li>✓ Birthday reward</li>
                <li>✓ Free shipping</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h4 className="font-bold text-yellow-900 mb-3 text-lg">🥇 Gold</h4>
              <p className="text-sm text-yellow-800 mb-4">Starts at 500 points</p>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>✓ 10% bonus points</li>
                <li>✓ Early access sales</li>
                <li>✓ Free shipping + gifts</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
              <h4 className="font-bold text-purple-900 mb-3 text-lg">💎 Platinum</h4>
              <p className="text-sm text-purple-800 mb-4">Starts at 1,000 points</p>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>✓ 15% bonus points</li>
                <li>✓ VIP early access</li>
                <li>✓ Exclusive items</li>
                <li>✓ 24/7 concierge</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Redemption Options */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">What You Can Redeem</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900 mb-3">Discount Codes</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>100 pts = $10 off</li>
                <li>250 pts = $30 off</li>
                <li>500 pts = $75 off</li>
                <li>1000 pts = $200 off</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900 mb-3">Exclusive Items</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Exclusive merch & tees</li>
                <li>Rare fruit samples</li>
                <li>Recipe books</li>
                <li>Free premium boxes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Start Earning Rewards Today</h3>
          <p className="mb-8 text-emerald-50">Sign in to your account to view your current points balance and redeem rewards</p>
          <a href="/account" className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-bold inline-block">
            View Your Rewards
          </a>
        </div>
      </div>
    </PageLayout>
  )
}
