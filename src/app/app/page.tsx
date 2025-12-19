'use client'

import { useState, useEffect } from 'react'
import { pwaService } from '@/lib/pwaService'
import PageLayout from '@/components/PageLayout'

export default function PWADashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)
  const [swActive, setSwActive] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(false)
  const [stats, setStats] = useState({
    cachedPages: 24,
    cachedImages: 156,
    cacheSize: '42.5 MB',
    lastSync: new Date().toLocaleDateString(),
  })
  const [devices, setDevices] = useState([
    { id: 1, name: 'My iPhone', os: 'iOS', lastActive: '2 hours ago' },
    { id: 2, name: 'My iPad', os: 'iPadOS', lastActive: '1 day ago' },
    { id: 3, name: 'My Android Phone', os: 'Android', lastActive: '3 days ago' },
  ])

  useEffect(() => {
    const checkStatus = async () => {
      setIsOnline(pwaService.getOnlineStatus())
      setSwActive(pwaService.isServiceWorkerAvailable())
      setIsInstalled(await pwaService.isAppInstalled())
    }

    checkStatus()

    const unsubOnline = pwaService.on('online', () => setIsOnline(true))
    const unsubOffline = pwaService.on('offline', () => setIsOnline(false))

    return () => {
      unsubOnline()
      unsubOffline()
    }
  }, [])

  const handleEnableNotifications = async () => {
    const success = await pwaService.subscribeToPushNotifications()
    setHasNotifications(success)
  }

  const handleDisableNotifications = async () => {
    const success = await pwaService.unsubscribeFromPushNotifications()
    if (success) setHasNotifications(false)
  }

  const handleBiometricAuth = async () => {
    const success = await pwaService.requestBiometricAuth()
    if (success) {
      alert('✓ Biometric authentication enabled!')
    }
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-400 mb-4">MOBILE APP</p>
            <h1 className="text-6xl md:text-7xl font-black mb-4 text-white">
              Fresh Tropics <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">PWA</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Install our app on any device for offline access, push notifications, and seamless shopping
            </p>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: isOnline ? '✓' : '✕', label: 'Online Status', value: isOnline ? 'Connected' : 'Offline', color: isOnline ? 'emerald' : 'red' },
              { icon: swActive ? '✓' : '✕', label: 'Service Worker', value: swActive ? 'Active' : 'Inactive', color: swActive ? 'emerald' : 'red' },
              { icon: isInstalled ? '✓' : '✕', label: 'App Installed', value: isInstalled ? 'Yes' : 'No', color: isInstalled ? 'emerald' : 'yellow' },
              { icon: hasNotifications ? '🔔' : '✕', label: 'Notifications', value: hasNotifications ? 'Enabled' : 'Disabled', color: hasNotifications ? 'emerald' : 'yellow' },
            ].map((item, idx) => (
              <div key={idx} className={`p-6 rounded-lg border-2 bg-${item.color}-900/20 border-${item.color}-400`}>
                <div className="text-4xl font-black text-white mb-2">{item.icon}</div>
                <p className="text-sm text-white/60 mb-1">{item.label}</p>
                <p className={`text-lg font-bold text-${item.color}-400`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Cache Stats */}
            <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8">
              <h2 className="text-2xl font-black text-white mb-6">📦 Cache Statistics</h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Cached Pages', value: stats.cachedPages, emoji: '📄' },
                  { label: 'Cached Images', value: stats.cachedImages, emoji: '🖼️' },
                  { label: 'Cache Size', value: stats.cacheSize, emoji: '💾' },
                  { label: 'Last Sync', value: stats.lastSync, emoji: '🔄' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-black/50 border border-white/10">
                    <p className="text-3xl mb-2">{stat.emoji}</p>
                    <p className="text-xs text-white/60 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-emerald-400">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Cache Actions */}
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all">
                  🔄 Refresh Cache
                </button>
                <button className="w-full px-4 py-3 bg-red-900/50 hover:bg-red-800/50 text-red-300 font-bold rounded-lg transition-all">
                  🗑️ Clear Cache
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8">
              <h2 className="text-2xl font-black text-white mb-6">⚙️ Quick Actions</h2>

              <div className="space-y-3">
                {hasNotifications ? (
                  <button
                    onClick={handleDisableNotifications}
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    🔔 Disable Notifications
                  </button>
                ) : (
                  <button
                    onClick={handleEnableNotifications}
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    🔔 Enable Notifications
                  </button>
                )}

                <button
                  onClick={handleBiometricAuth}
                  className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all"
                >
                  👆 Biometric Login
                </button>

                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all">
                  🌍 Sync Data
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/30">
                <p className="text-xs text-cyan-300 font-bold mb-2">💡 Pro Tip</p>
                <p className="text-xs text-white/70">
                  Enable notifications to get real-time order updates even when the app is closed!
                </p>
              </div>
            </div>
          </div>

          {/* Devices */}
          <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 mb-12">
            <h2 className="text-2xl font-black text-white mb-6">📱 Your Devices</h2>

            <div className="space-y-3">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between hover:border-emerald-400/50 transition-all"
                >
                  <div>
                    <p className="font-bold text-white">{device.name}</p>
                    <p className="text-sm text-white/60">{device.os} • {device.lastActive}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded">
                      Sync
                    </button>
                    <button className="px-3 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-300 text-sm font-bold rounded">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-black text-white mb-6">✨ App Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { emoji: '📡', title: 'Offline Mode', desc: 'Browse your cart and saved items offline' },
                { emoji: '🔔', title: 'Push Notifications', desc: 'Get notified about orders and deals' },
                { emoji: '💾', title: 'Smart Caching', desc: 'Automatic smart caching for faster loads' },
                { emoji: '👆', title: 'Biometric Auth', desc: 'Fingerprint or face ID login' },
                { emoji: '🔄', title: 'Background Sync', desc: 'Orders sync when you reconnect' },
                { emoji: '⚡', title: 'Lightning Fast', desc: 'App-like performance and speed' },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-all">
                  <div className="text-4xl mb-3">{feature.emoji}</div>
                  <p className="font-bold text-white mb-2">{feature.title}</p>
                  <p className="text-sm text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
