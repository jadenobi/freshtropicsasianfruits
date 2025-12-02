'use client'

import { useState, useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import { getVideosByCategory, getFeaturedVideos, getRelatedVideos, formatViewCount, getVideoEmbedUrl, type Video, type VideoCategory } from '@/lib/videoService'

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('product-demo')
  const [searchQuery, setSearchQuery] = useState('')

  const categories: { id: VideoCategory; label: string; emoji: string }[] = [
    { id: 'hero', label: 'Welcome', emoji: '🎬' },
    { id: 'product-demo', label: 'Product Demos', emoji: '📹' },
    { id: 'recipe', label: 'Recipes', emoji: '👨‍🍳' },
    { id: 'storage-tips', label: 'Storage Tips', emoji: '❄️' },
    { id: 'testimonial', label: 'Reviews', emoji: '⭐' },
  ]

  const videos = useMemo(() => getVideosByCategory(activeCategory), [activeCategory])
  const currentVideo = selectedVideo || videos[0]
  const relatedVideos = useMemo(() => getRelatedVideos(currentVideo?.id || '', 3), [currentVideo?.id])

  if (!currentVideo) {
    return null
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-400 mb-4">VIDEO GALLERY</p>
            <h1 className="text-6xl md:text-7xl font-black mb-4 text-white">
              Fresh Tropics <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Videos</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Explore product demos, recipes, storage tips, and customer reviews
            </p>
          </div>

          {/* Video Player */}
          <div className="mb-12 rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl">
            {/* Player */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={getVideoEmbedUrl(currentVideo.videoId)}
                title={currentVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="p-8 bg-gradient-to-b from-white/10 to-white/5 border-t border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-white mb-2">{currentVideo.title}</h2>
                  <p className="text-white/60 mb-4">{currentVideo.description}</p>
                </div>
              </div>

              {/* Video Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeCategory === 'product-demo' ? '📹' : activeCategory === 'recipe' ? '👨‍🍳' : '⭐'}</span>
                  <div>
                    <p className="text-xs text-white/50">Creator</p>
                    <p className="font-bold text-white">{currentVideo.creator}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/50">Duration</p>
                  <p className="font-bold text-white">{currentVideo.duration}</p>
                </div>

                <div>
                  <p className="text-xs text-white/50">Views</p>
                  <p className="font-bold text-emerald-400">{formatViewCount(currentVideo.views)}</p>
                </div>

                <div>
                  <p className="text-xs text-white/50">Likes</p>
                  <p className="font-bold text-pink-400">❤️ {formatViewCount(currentVideo.likes)}</p>
                </div>

                <div className="ml-auto">
                  <p className="text-xs text-white/50">Uploaded</p>
                  <p className="font-bold text-white">{currentVideo.uploadedAt}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentVideo.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-sm font-bold text-emerald-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSelectedVideo(null)
                  }}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/50'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`group rounded-lg overflow-hidden border-2 transition-all ${
                  currentVideo.id === video.id
                    ? 'border-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-500/30'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition-transform">{video.thumbnail}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-white line-clamp-2 mb-2 text-sm">{video.title}</h3>

                  <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                    <span>{formatViewCount(video.views)} views</span>
                    <span>❤️ {formatViewCount(video.likes)}</span>
                  </div>

                  <p className="text-xs text-white/50 line-clamp-2">{video.creator}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Related Videos */}
          {relatedVideos.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-black text-white mb-6">🎬 Related Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="group rounded-lg overflow-hidden border border-white/10 bg-white/5 hover:border-emerald-400/50 hover:bg-emerald-400/5 transition-all"
                  >
                    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                      <div className="text-4xl group-hover:scale-110 transition-transform">{video.thumbnail}</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-white text-sm line-clamp-2">{video.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
