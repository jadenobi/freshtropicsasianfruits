'use client'

import { useState } from 'react'
import { getProductVideos, formatViewCount, getVideoEmbedUrl, type Video } from '@/lib/videoService'

interface ProductVideoGalleryProps {
  productId: string
  productName: string
}

export default function ProductVideoGallery({ productId, productName }: ProductVideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const videos = getProductVideos(productId)

  if (videos.length === 0) {
    return null
  }

  const currentVideo = selectedVideo || videos[0]

  return (
    <div className="w-full bg-gradient-to-b from-white/5 to-white/0 rounded-xl border border-white/10 p-8">
      <h3 className="text-2xl font-black text-white mb-6">📹 {productName} Videos</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-white/10 bg-black">
            <iframe
              src={getVideoEmbedUrl(currentVideo.videoId)}
              title={currentVideo.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-4">
            <h4 className="text-xl font-bold text-white mb-2">{currentVideo.title}</h4>
            <p className="text-sm text-white/70 mb-3">{currentVideo.description}</p>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span>👤 {currentVideo.creator}</span>
              <span>⏱️ {currentVideo.duration}</span>
              <span>👁️ {formatViewCount(currentVideo.views)} views</span>
              <span>❤️ {formatViewCount(currentVideo.likes)}</span>
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-white/60 uppercase tracking-widest">More Videos</p>
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                currentVideo.id === video.id
                  ? 'bg-emerald-500/20 border-emerald-400'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex gap-3">
                <div className="text-3xl flex-shrink-0">{video.thumbnail}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm line-clamp-2">{video.title}</p>
                  <p className="text-xs text-white/50 mt-1">{video.duration}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
