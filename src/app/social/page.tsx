'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import {
  getAllUGC,
  getTrendingUGC,
  getVerifiedUGC,
  getShareButtons,
  getInstagramFeed,
  getTikTokFeed,
  getShareMetrics,
  likeUGCPost,
} from '@/lib/socialService'

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'instagram' | 'tiktok' | 'ugc'>('feed')
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null)

  const allUGC = useMemo(() => getAllUGC(), [])
  const trendingUGC = useMemo(() => getTrendingUGC(6), [])
  const instagramFeed = useMemo(() => getInstagramFeed(), [])
  const tiktokFeed = useMemo(() => getTikTokFeed(), [])
  const metrics = useMemo(() => getShareMetrics(), [])

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

  const ShareButtons = ({ productName = 'Fresh Tropics Fruits' }) => (
    <div className="flex flex-wrap gap-2">
      {getShareButtons(productName, 'https://freshtropics.com').map((btn, idx) => (
        <a
          key={idx}
          href={btn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 rounded-lg font-bold text-xs text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: btn.color }}
          title={btn.name}
        >
          {btn.icon} {btn.name}
        </a>
      ))}
    </div>
  )

  const PostCard = ({ post }: { post: any }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200">
      <div className="aspect-square bg-gray-200 overflow-hidden">
        <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{post.userAvatar}</span>
          <div>
            <p className="font-bold text-sm text-gray-900">{post.userName}</p>
            <p className="text-xs text-gray-600">{post.platform}</p>
          </div>
          {post.verified && <span className="ml-auto text-blue-500 font-bold">✓</span>}
        </div>
        <p className="text-sm text-gray-700 mb-3">{post.caption}</p>
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <span>❤️ {post.likes}</span>
          <span>💬 {post.comments}</span>
          <span>⭐ {post.rating}/5</span>
        </div>
        <button
          onClick={() => handleLike(post.id)}
          className={`w-full px-3 py-2 rounded-lg font-bold transition-all ${
            likedPosts.has(post.id)
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {likedPosts.has(post.id) ? '❤️ Liked' : '🤍 Like'}
        </button>
      </div>
    </div>
  )

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">🌍 Social Community</h1>
          <p className="text-gray-600">Connect with us on social media and share your Fresh Tropics moments</p>
        </div>

        {/* Share Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-lg border-2 border-red-200">
            <p className="text-sm font-bold text-red-900 mb-2">Total Engagement</p>
            <p className="text-3xl font-black text-red-600">{metrics.totalEngagement}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
            <p className="text-sm font-bold text-purple-900 mb-2">Instagram Posts</p>
            <p className="text-3xl font-black text-purple-600">{metrics.instagramPosts}</p>
          </div>
          <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-lg border-2 border-gray-400">
            <p className="text-sm font-bold text-white mb-2">TikTok Videos</p>
            <p className="text-3xl font-black text-white">{metrics.tiktokPosts}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
            <p className="text-sm font-bold text-green-900 mb-2">Verified Posts</p>
            <p className="text-3xl font-black text-green-600">{metrics.verifiedPosts}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-200">
            <p className="text-sm font-bold text-amber-900 mb-2">Total Shares</p>
            <p className="text-3xl font-black text-amber-600">{metrics.totalShares}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['feed', 'instagram', 'tiktok', 'ugc'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-amber-300'
              }`}
            >
              {tab === 'feed' && '📱 Social Feed'}
              {tab === 'instagram' && '📸 Instagram'}
              {tab === 'tiktok' && '🎬 TikTok'}
              {tab === 'ugc' && '🎨 User Gallery'}
            </button>
          ))}
        </div>

        {/* Social Feed Tab */}
        {activeTab === 'feed' && (
          <div className="space-y-8">
            {/* Share Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📢 Share Fresh Tropics</h2>
              <p className="text-gray-700 mb-4">Love Fresh Tropics? Share with your friends on social media!</p>
              <ShareButtons />
            </div>

            {/* Social Login Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔐 Connect with Social Login</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Google', icon: '🔍', color: '#4285F4' },
                  { name: 'Facebook', icon: '👍', color: '#1877F2' },
                  { name: 'Apple', icon: '🍎', color: '#000000' },
                ].map(provider => (
                  <button
                    key={provider.name}
                    className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg"
                    style={{ backgroundColor: provider.color }}
                  >
                    {provider.icon} Sign in with {provider.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔥 Trending Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingUGC.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instagram Tab */}
        {activeTab === 'instagram' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📸 Instagram Feed</h2>
            <p className="text-gray-600 mb-6">Follow us @freshtropics for daily fresh fruit updates</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instagramFeed.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="https://instagram.com/freshtropics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                View Full Instagram Profile
              </a>
            </div>
          </div>
        )}

        {/* TikTok Tab */}
        {activeTab === 'tiktok' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎬 TikTok Videos</h2>
            <p className="text-gray-600 mb-6">Check out our viral fruit videos and recipes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiktokFeed.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="https://tiktok.com/@freshtropics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-black text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Follow on TikTok
              </a>
            </div>
          </div>
        )}

        {/* UGC Gallery Tab */}
        {activeTab === 'ugc' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 User Gallery</h2>
            <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 mb-6">
              <p className="text-gray-900 font-bold mb-2">📤 Share Your Fresh Tropics Moment</p>
              <p className="text-gray-700 text-sm mb-4">Tag #FreshTropics on Instagram or TikTok for a chance to be featured!</p>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all">
                Upload Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allUGC.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-black mb-4">🌱 Join Our Community</h2>
          <p className="mb-6">Follow Fresh Tropics on all social platforms for exclusive deals and fresh fruit tips</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://instagram.com/freshtropics" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-emerald-600 rounded-lg font-bold hover:shadow-lg transition-all">
              📸 Instagram
            </a>
            <a href="https://tiktok.com/@freshtropics" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:shadow-lg transition-all">
              🎬 TikTok
            </a>
            <a href="https://facebook.com/freshtropics" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:shadow-lg transition-all">
              👍 Facebook
            </a>
            <a href="https://twitter.com/freshtropics" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:shadow-lg transition-all">
              𝕏 Twitter
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
