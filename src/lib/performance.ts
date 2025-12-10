'use client'

import { useEffect, useState } from 'react'

// Measure Core Web Vitals
export const measureCoreWebVitals = () => {
  useEffect(() => {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
              console.log('CLS:', clsValue)
            }
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry) => {
            console.log('FID:', (entry as any).processingDuration)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        return () => {
          lcpObserver.disconnect()
          clsObserver.disconnect()
          fidObserver.disconnect()
        }
      } catch (error) {
        console.warn('Performance monitoring not available:', error)
      }
    }
  }, [])
}

// Image optimization utility
export const optimizeImageUrl = (url: string, width?: number, quality?: number) => {
  if (!url) return url
  
  // For Shopify CDN images
  if (url.includes('shopify')) {
    const params = []
    if (width) params.push(`w=${width}`)
    if (quality) params.push(`q=${quality}`)
    
    const separator = url.includes('?') ? '&' : '?'
    return params.length > 0 ? `${url}${separator}${params.join('&')}` : url
  }
  
  return url
}

// Lazy load observer
export const useLazyLoad = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return isVisible
}

// Request idle callback with fallback
export const scheduleIdleTask = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback)
  } else {
    setTimeout(callback, 1)
  }
}

// Debounce utility for expensive operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return function (...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Prefetch links on hover/focus for better UX
export const prefetchLink = (href: string) => {
  if ('prefetch' in document) {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  }
}
