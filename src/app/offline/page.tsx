'use client'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="text-8xl mb-6 animate-bounce">
          📡
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black text-white mb-4">
          You're <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Offline</span>
        </h1>

        {/* Message */}
        <p className="text-lg text-white/70 mb-8">
          It looks like you've lost your internet connection. Don't worry, we've cached your experience!
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8 p-6 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 text-white/80">
            <span className="text-2xl">✅</span>
            <span>Browse previously viewed pages</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <span className="text-2xl">✅</span>
            <span>View saved products and carts</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <span className="text-2xl">✅</span>
            <span>Access your loyalty rewards info</span>
          </div>
        </div>

        {/* Tips */}
        <div className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-400/30 mb-8">
          <p className="text-sm font-bold text-emerald-300 mb-3">💡 Pro Tips</p>
          <ul className="text-sm text-white/70 space-y-2 text-left">
            <li>• Check your WiFi or mobile connection</li>
            <li>• Reload the page when back online</li>
            <li>• Your orders are safely queued</li>
            <li>• We'll sync when you reconnect</li>
          </ul>
        </div>

        {/* Actions */}
        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all uppercase mb-3"
        >
          Try Again
        </button>

        <button
          onClick={() => window.history.back()}
          className="w-full px-6 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all uppercase"
        >
          Go Back
        </button>

        {/* Status */}
        <div className="mt-8 p-4 rounded-lg bg-black/50 border border-white/10">
          <p className="text-xs text-white/50 mb-2">SERVICE STATUS</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Connected:</span>
            <span className="text-sm font-bold text-red-400">● Offline</span>
          </div>
        </div>
      </div>
    </div>
  )
}
