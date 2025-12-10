'use client'

import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export const useTouchSupport = () => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        () =>
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          (navigator as any).msMaxTouchPoints > 0
      )
    }

    checkTouch()
    window.addEventListener('touchstart', () => setIsTouch(true))
    return () => window.removeEventListener('touchstart', () => setIsTouch(true))
  }, [])

  return isTouch
}

// Mobile navigation helper
export const useResponsiveNav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleMenu = () => setShowMobileMenu(!showMobileMenu)
  const closeMenu = () => setShowMobileMenu(false)

  return { showMobileMenu, toggleMenu, closeMenu }
}

// Accessibility helpers
export const improveA11y = () => {
  useEffect(() => {
    // Ensure proper focus management
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close any open modals/menus
        document.querySelectorAll('[role="dialog"]').forEach(el => {
          const closeBtn = el.querySelector('[aria-label="Close"]')
          if (closeBtn) (closeBtn as HTMLElement).click()
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
}

// Viewport height on mobile (for address bar)
export const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState<number | null>(null)

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    window.addEventListener('orientationchange', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('orientationchange', updateHeight)
    }
  }, [])

  return viewportHeight
}

// Touch-friendly button sizes
export const TOUCH_TARGET_SIZE = '44px' // 44x44 minimum for touch targets

// Mobile viewport meta tag helper
export const getMobileViewportConfig = () => {
  return {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 5.0,
    userScalable: true,
    viewportFit: 'cover',
  }
}
