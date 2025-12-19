'use client'

import { useState, useEffect } from 'react'
import { pwaService } from '@/lib/pwaService'

export default function PWAInstaller() {
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check install availability
    const checkInstall = async () => {
      const can = pwaService.canInstall()
      const installed = await pwaService.isAppInstalled()
      setCanInstall(can)
      setIsInstalled(installed)
      setShowBanner(can && !installed)
    }

    checkInstall()

    // Listen for online/offline
    const unsubOnline = pwaService.on('online', () => {
      setIsOnline(true)
    })

    const unsubOffline = pwaService.on('offline', () => {
      setIsOnline(false)
    })

    const unsubInstallPrompt = pwaService.on('install-prompt', () => {
      setCanInstall(true)
      setShowBanner(true)
    })

    const unsubAppInstalled = pwaService.on('app-installed', () => {
      setIsInstalled(true)
      setShowBanner(false)
    })

    return () => {
      unsubOnline()
      unsubOffline()
      unsubInstallPrompt()
      unsubAppInstalled()
    }
  }, [])

  const handleInstall = async () => {
    const success = await pwaService.promptInstall()
    if (success) {
      setCanInstall(false)
      setIsInstalled(true)
      setShowBanner(false)
    }
  }

  const handleEnableNotifications = async () => {
    const success = await pwaService.subscribeToPushNotifications()
    setHasNotifications(success)
  }

  // Don't show if already installed or not available
  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 border-2 border-emerald-400 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <div>
            <h3 className="font-black text-black text-lg">Install App</h3>
            <p className="text-sm text-black/70">Get Fresh Tropics on your device</p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="ml-auto text-black hover:scale-110 transition-transform font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Features */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-emerald-200">
              <span>✓</span>
              <span>Install on home screen</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-200">
              <span>✓</span>
              <span>Work offline with cached content</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-200">
              <span>✓</span>
              <span>Push notifications for orders</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-200">
              <span>✓</span>
              <span>App-like experience</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4 border-t border-emerald-600/50">
            <button
              onClick={handleInstall}
              className="w-full px-4 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all uppercase text-sm"
            >
              Install Now
            </button>
            <button
              onClick={handleEnableNotifications}
              className="w-full px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all text-sm"
            >
              {hasNotifications ? '✓ Notifications Enabled' : 'Enable Notifications'}
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all text-sm"
            >
              Maybe Later
            </button>
          </div>

          {/* Online Status */}
          {!isOnline && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-400/30">
              <p className="text-xs text-red-300 font-bold">
                📡 You're currently offline. Install the app to browse while offline!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
