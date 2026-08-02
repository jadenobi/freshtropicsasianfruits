import React from "react"

interface PaymentIconProps {
  methodId: string
  className?: string
  size?: number
}

export default function PaymentIcon({ methodId, className = "", size = 24 }: PaymentIconProps) {
  switch (methodId) {
    case "stripe":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M13.4 9.1c0-.7.6-1.1 1.6-1.1 1.1 0 2.3.4 3.3.9l.6-3.3c-1.1-.5-2.6-.9-4.1-.9-3.9 0-6.4 2.1-6.4 5.6 0 3.8 5.2 3.1 5.2 4.7 0 .8-.8 1.2-1.9 1.2-1.3 0-2.8-.5-3.8-1.2l-.7 3.3c1.3.7 3 1.2 4.6 1.2 4 0 6.7-2 6.7-5.6 0-4-5.1-3.3-5.1-4.8z" fill="#635BFF"/>
        </svg>
      )
    case "gift_card":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="5" fill="#FE4164"/>
          <path d="M12 6c-2-2-5-1-5 2 0 1.5 2.5 3.5 5 4.5 2.5-1 5-3 5-4.5 0-3-3-4-5-2z" fill="white"/>
        </svg>
      )
    case "apple_pay":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12.4 12.9c-.8.6-1.6.9-2.5.9-1.5 0-2.4-1.1-2.4-2.6 0-1.6 1-2.6 2.4-2.6.9 0 1.7.3 2.5.9l1-1.1c-1-.9-2.3-1.3-3.5-1.3-2.3 0-4 1.6-4 4.1s1.7 4.1 4 4.1c1.2 0 2.5-.4 3.5-1.3l-1-1.1zM11.6 4.8c-.2-1 .4-1.9 1.4-2.1.2 0 .4-.1.6-.1.8 0 1.5.5 1.7 1.3.2 1-.4 1.9-1.4 2.1-.2 0-.4 0-.6 0-.8-.1-1.5-.6-1.7-1.3zM15 15.5c-1.3 0-2.4-.7-2.4-2.1s1.1-2.1 2.4-2.1 2.4.7 2.4 2.1-1.1 2.1-2.4 2.1zm0-3.1c-.6 0-1.1.3-1.1.9s.5.9 1.1.9 1.1-.3 1.1-.9-.5-.9-1.1-.9z" fill="black"/>
        </svg>
      )
    case "venmo":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M19.6 4.4C18.6 3.4 17.5 3 16.4 3c-2.4 0-4.6 1.8-6.1 4.4L8.2 13h-.1L6 4.4H2L6.1 21h4c4.5 0 8.5-3.2 11.2-10.4 1.1-2.7 1-4.8-.7-6.2z" fill="#3D95CE"/>
        </svg>
      )
    case "cashapp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="5" fill="#00D036"/>
          <path d="M12 6.5C10.5 6.5 9 7.3 8.2 8.5l.8.5c.6-.9 1.8-1.5 3-1.5 1.5 0 2.5.8 2.5 1.8 0 .8-.5 1.4-1.5 1.7l-1 .3c-2 .5-2.8 1.5-2.8 2.7 0 1.5 1.2 2.5 3 2.5 1.2 0 2.3-.5 3-1.5l-.8-.5c-.5.8-1.3 1.2-2.2 1.2-1.2 0-2-.5-2-1.5 0-.8.5-1.3 1.8-1.7l.8-.2c2-.5 3-1.5 3-3 0-1.7-1.5-3-3.8-3zm-.5-1.5v2h1v-2h-1zm0 10v2h1v-2h-1z" fill="white"/>
        </svg>
      )
    case "zelle":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" fill="#6716D0"/>
          <path d="M8.5 7h7c.3 0 .5.2.5.5v1.2c0 .3-.2.5-.5.5h-4.3l4.3 6.3c.1.2.1.4 0 .6-.1.2-.3.4-.6.4h-7.1c-.3 0-.5-.2-.5-.5v-1.2c0-.3.2-.5.5-.5h4.3L8 8.1c-.1-.2-.1-.4 0-.6.1-.2.3-.5.5-.5z" fill="white"/>
        </svg>
      )
    case "chime":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="5" fill="#25D366"/>
          <path d="M12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" fill="white"/>
          <path d="M15 12h2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    case "bank_account":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="5" fill="#1e293b"/>
          <path d="M4 10v7h2v-7H4zm6 0v7h2v-7h-2zm-8 9v2h20v-2H2zm14-9v7h2v-7h-2zm-6-5.5L2 9h20l-10-4.5z" fill="white"/>
        </svg>
      )
    case "crypto":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="#F7931A"/>
          <path d="M16.5 10c0-1.4-1.1-2.5-2.5-2.5h-4v2h1.5v5h-1.5v2h4c1.4 0 2.5-1.1 2.5-2.5v-2zm-3.5 0h-1v-1h1c.3 0 .5.2.5.5s-.2.5-.5.5zm0 4h-1v-1h1c.3 0 .5.2.5.5s-.2.5-.5.5z" fill="white"/>
        </svg>
      )
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="4" fill="#E2E8F0"/>
          <path d="M12 7v10M7 12h10" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
  }
}
