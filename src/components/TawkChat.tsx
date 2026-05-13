'use client'

import { useEffect } from 'react'

export default function TawkChat() {
  useEffect(() => {
    try {
      const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || 'placeholder'
      const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || 'placeholder'

      if (propertyId === 'placeholder') {
        console.warn('Tawk.to Property ID is missing. Please add NEXT_PUBLIC_TAWK_PROPERTY_ID to your environment variables.')
        return
      }

      // Check if Tawk is already loaded
      if ((window as any).Tawk_API) {
        return
      }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      
      script.onerror = () => {
        console.error('Failed to load Tawk widget')
      }

      script.onload = () => {
        // Ensure Tawk API is properly initialized
        setTimeout(() => {
          if ((window as any).Tawk_API) {
            (window as any).Tawk_API.hideWidget()
          }
        }, 1000)
      }
      
      const s0 = document.getElementsByTagName('script')[0]
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(script, s0)
      } else {
        document.head.appendChild(script)
      }

      return () => {
        // Cleanup script if component unmounts
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    } catch (error) {
      console.error('Error initializing Tawk widget:', error)
    }
  }, [])

  return null
}
