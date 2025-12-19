'use client'

import { useState, useEffect } from 'react'
import { useReferralProgram } from '@/lib/marketing'

export default function ReferralProgram() {
  const { generateReferralCode, shareReferralLink } = useReferralProgram()
  const [referralCode, setReferralCode] = useState('')
  const [referralUrl, setReferralUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Generate a referral code for demo (in real app, use user ID)
    const code = generateReferralCode('user123')
    setReferralCode(code)
    setReferralUrl(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://freshtropicsasianfruits.com'}?ref=${code}`)
  }, [])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    shareReferralLink(referralCode)
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-3 border-amber-200 rounded-xl p-8 shadow-md">
      <h2 className="text-3xl font-black text-gray-900 mb-2">🎉 Refer & Earn</h2>
      <p className="text-gray-600 mb-6">Share Fresh Tropics with friends and earn rewards!</p>

      <div className="space-y-6">
        {/* Referral Code */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">Your Referral Code</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralCode}
              readOnly
              className="flex-1 border-3 border-amber-600 rounded-lg px-4 py-3 font-black text-lg bg-white"
            />
            <button
              onClick={handleCopyCode}
              className={`px-6 py-3 rounded-lg font-black transition-all ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Referral Link */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">Your Referral Link</p>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-3">
            <code className="text-xs text-gray-600 break-all">{referralUrl}</code>
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-white border-2 border-amber-100 rounded-lg p-4">
          <p className="text-sm font-bold text-gray-700 mb-3">Rewards</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ <strong>$10 credit</strong> when your friend makes their first purchase</li>
            <li>✓ <strong>Unlimited earnings</strong> - refer as many friends as you want</li>
            <li>✓ <strong>Bonus rewards</strong> for every 5 successful referrals</li>
          </ul>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-black py-4 rounded-lg hover:shadow-lg transition-all text-lg"
        >
          📤 Share with Friends
        </button>
      </div>
    </div>
  )
}
