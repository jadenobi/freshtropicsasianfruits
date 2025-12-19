// PWA Service - handles service worker registration, push notifications, and app installation
// Provides offline detection, push notification management, and app shell caching

export type PushNotificationPayload = {
  title: string
  body: string
  tag?: string
  icon?: string
  badge?: string
  actions?: Array<{ action: string; title: string }>
}

export type PWAInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

class PWAService {
  private registration: ServiceWorkerRegistration | null = null
  private deferredPrompt: PWAInstallPrompt | null = null
  private isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
  private listeners: Map<string, Set<(data: any) => void>> = new Map()

  /**
   * Initialize PWA service
   */
  async init(): Promise<void> {
    if (typeof window === 'undefined') return

    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })
        console.log('✓ Service Worker registered successfully')

        // Listen for updates
        this.registration.addEventListener('updatefound', () => {
          const newWorker = this.registration?.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                this.emit('update-available')
              }
            })
          }
        })
      } catch (error) {
        console.warn('Service Worker registration error:', error instanceof Error ? error.message : error)
        // Service Worker failure is not critical - app will still work offline partially
      }
    }

    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline())
    window.addEventListener('offline', () => this.handleOffline())

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault()
      this.deferredPrompt = e as PWAInstallPrompt
      this.emit('install-prompt')
    })

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null
      this.emit('app-installed')
    })
  }

  /**
   * Request push notification permission and subscribe
   */
  async subscribeToPushNotifications(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications not supported')
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        return false
      }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      
      // Only proceed if VAPID key is configured
      if (!vapidKey) {
        console.warn('Push notifications not configured - missing VAPID key')
        return false
      }

      const subscription = await this.registration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidKey),
      })

      if (subscription) {
        // Send subscription to backend
        await fetch('/api/push-subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        }).catch(err => console.error('Failed to store subscription:', err))
        return true
      }
    } catch (error) {
      console.error('Push subscription error:', error)
    }
    return false
  }

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribeFromPushNotifications(): Promise<boolean> {
    try {
      const subscription = await this.registration?.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        // Notify backend
        await fetch('/api/push-subscriptions', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        })
        return true
      }
    } catch (error) {
      console.error('Unsubscribe error:', error)
    }
    return false
  }

  /**
   * Show local notification
   */
  async showNotification(payload: PushNotificationPayload): Promise<void> {
    if (!('serviceWorker' in navigator)) return

    try {
      const registration = await navigator.serviceWorker.ready
      const options: NotificationOptions & { actions?: any } = {
        body: payload.body,
        icon: payload.icon || '/logo.svg',
        badge: payload.badge || '/logo.svg',
        tag: payload.tag,
        requireInteraction: false,
      }
      if (payload.actions) {
        options.actions = payload.actions
      }
      await registration.showNotification(payload.title, options)
    } catch (error) {
      console.error('Notification error:', error)
    }
  }

  /**
   * Request biometric authentication
   */
  async requestBiometricAuth(): Promise<boolean> {
    if (!('credentials' in navigator)) {
      console.warn('Credential API not supported')
      return false
    }

    try {
      const publicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: 'preferred' as const,
      }

      const assertion = await (navigator.credentials as any).get({
        publicKey: publicKeyCredentialRequestOptions,
      })

      return !!assertion
    } catch (error) {
      console.error('Biometric auth error:', error)
      return false
    }
  }

  /**
   * Register biometric credential
   */
  async registerBiometricCredential(
    userId: string,
    displayName: string
  ): Promise<boolean> {
    if (!('credentials' in navigator)) return false

    try {
      const publicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32),
        rp: {
          name: 'Fresh Tropics',
          id: typeof window !== 'undefined' ? window.location.hostname : '',
        },
        user: {
          id: new TextEncoder().encode(userId),
          name: userId,
          displayName,
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' as const }],
        timeout: 60000,
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          residentKey: 'preferred',
          userVerification: 'preferred',
        },
      }

      const credential = await (navigator.credentials as any).create({
        publicKey: publicKeyCredentialCreationOptions,
      })

      return !!credential
    } catch (error) {
      console.error('Biometric registration error:', error)
      return false
    }
  }

  /**
   * Request install prompt
   */
  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false
    }

    try {
      await this.deferredPrompt.prompt()
      const choiceResult = await this.deferredPrompt.userChoice

      if (choiceResult.outcome === 'accepted') {
        this.deferredPrompt = null
        return true
      }
    } catch (error) {
      console.error('Install prompt error:', error)
    }
    return false
  }

  /**
   * Unregister service worker
   */
  async unregister(): Promise<void> {
    if (this.registration) {
      await this.registration.unregister()
      this.registration = null
    }
  }

  /**
   * Check if service worker is available
   */
  isServiceWorkerAvailable(): boolean {
    return this.registration !== null
  }

  /**
   * Check online status
   */
  getOnlineStatus(): boolean {
    return this.isOnline
  }

  /**
   * Get install prompt availability
   */
  canInstall(): boolean {
    return this.deferredPrompt !== null
  }

  /**
   * Check if app is installed
   */
  async isAppInstalled(): Promise<boolean> {
    if (!('getInstalledRelatedApps' in navigator)) {
      return false
    }

    try {
      const apps = await (navigator as any).getInstalledRelatedApps()
      return apps.length > 0
    } catch (error) {
      return false
    }
  }

  /**
   * Handle online event
   */
  private handleOnline(): void {
    this.isOnline = true
    this.emit('online')
  }

  /**
   * Handle offline event
   */
  private handleOffline(): void {
    this.isOnline = false
    this.emit('offline')
  }

  /**
   * Event emitter - emit events
   */
  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  /**
   * Event emitter - on
   */
  on(event: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)?.add(callback)

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback)
    }
  }

  /**
   * Convert VAPID key
   */
  private urlBase64ToUint8Array(base64String: string): BufferSource {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray as BufferSource
  }
}

// Export singleton
export const pwaService = new PWAService()

// Auto-init on client
if (typeof window !== 'undefined') {
  pwaService.init().catch(console.error)
}
