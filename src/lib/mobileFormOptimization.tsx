'use client'

import { useEffect } from 'react'

// Mobile form optimization hook
export const useMobileFormOptimization = () => {
  useEffect(() => {
    // Prevent zoom on input focus on iOS
    const inputs = document.querySelectorAll('input, select, textarea')
    inputs.forEach(input => {
      const fontSizeStr = window.getComputedStyle(input).fontSize
      const fontSize = parseInt(fontSizeStr, 10)
      
      // Set font size to at least 16px to prevent iOS auto-zoom
      if (fontSize < 16) {
        (input as HTMLElement).style.fontSize = '16px'
      }
    })

    // Handle viewport changes
    const handleOrientationChange = () => {
      // Reset scroll position on orientation change
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }

    window.addEventListener('orientationchange', handleOrientationChange)
    return () => window.removeEventListener('orientationchange', handleOrientationChange)
  }, [])
}

// Mobile input component wrapper
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function MobileOptimizedInput({
  label,
  error,
  className,
  ...props
}: MobileInputProps) {
  const finalClassName = className || ''
  
  return (
    <div className="w-full">
      {label && (
        <label className="block font-bold text-gray-900 mb-2 text-sm">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full
          border-3 border-emerald-600
          rounded-lg
          px-4 py-3
          font-bold
          bg-white
          placeholder-gray-800
          text-base
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-500
          ${error ? 'border-red-500' : ''}
          ${finalClassName}
        `}
        style={{
          fontSize: '16px', // Prevent iOS zoom
          WebkitAppearance: 'none', // Remove iOS default styling
        }}
      />
      {error && (
        <p className="text-red-600 text-xs font-bold mt-1">{error}</p>
      )}
    </div>
  )
}

// Mobile button component
interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function MobileOptimizedButton({
  variant,
  size,
  children,
  className,
  ...props
}: MobileButtonProps) {
  const variantValue = variant || 'primary'
  const sizeValue = size || 'md'
  const classNameValue = className || ''

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-black',
  }

  const variantClasses: Record<string, string> = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
    secondary: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50',
  }

  return (
    <button
      {...props}
      className={`
        rounded-lg
        font-bold
        transition-all
        duration-200
        min-h-12
        min-w-12
        ${sizeClasses[sizeValue]}
        ${variantClasses[variantValue]}
        ${classNameValue}
      `}
      style={{
        WebkitAppearance: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
      }}
    >
      {children}
    </button>
  )
}
