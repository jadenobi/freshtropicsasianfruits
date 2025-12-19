'use client'

import { useSocialSharing } from '@/lib/marketing'

interface SocialShareProps {
  productName: string
  productUrl: string
  imageUrl?: string
}

export default function SocialShare({ productName, productUrl, imageUrl }: SocialShareProps) {
  const { shareOnFacebook, shareOnTwitter, shareOnPinterest, copyToClipboard } = useSocialSharing()
  const [copied, setCopied] = require('react').useState(false)

  const handleCopyLink = () => {
    copyToClipboard(productUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <button
        onClick={() => shareOnFacebook(productName, productUrl)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
        title="Share on Facebook"
      >
        📘 Facebook
      </button>

      <button
        onClick={() => shareOnTwitter(productName, productUrl)}
        className="bg-blue-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition-all flex items-center gap-2"
        title="Share on Twitter"
      >
        🐦 Twitter
      </button>

      {imageUrl && (
        <button
          onClick={() => shareOnPinterest(productName, imageUrl, productUrl)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2"
          title="Share on Pinterest"
        >
          📌 Pinterest
        </button>
      )}

      <button
        onClick={handleCopyLink}
        className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
          copied
            ? 'bg-green-600 text-white'
            : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
        title="Copy link to clipboard"
      >
        {copied ? '✓ Copied!' : '🔗 Copy Link'}
      </button>
    </div>
  )
}
