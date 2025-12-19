'use client'

import { useState } from 'react'

interface EmailCampaign {
  id: string
  name: string
  subject: string
  recipientCount: number
  status: 'draft' | 'scheduled' | 'sent'
  createdAt: Date
  sentAt?: Date
}

interface ReferralReward {
  referrerId: string
  refereeEmail: string
  reward: number
  status: 'pending' | 'claimed' | 'expired'
}

// Email campaign management
export const useEmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])

  const createCampaign = (name: string, subject: string, content: string, recipients: string[]) => {
    const campaign: EmailCampaign = {
      id: Date.now().toString(),
      name,
      subject,
      recipientCount: recipients.length,
      status: 'draft',
      createdAt: new Date(),
    }
    setCampaigns(prev => [...prev, campaign])
    return campaign
  }

  const scheduleCampaign = (campaignId: string, sendTime: Date) => {
    setCampaigns(prev =>
      prev.map(c =>
        c.id === campaignId
          ? { ...c, status: 'scheduled' as const, sentAt: sendTime }
          : c
      )
    )
  }

  const sendCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c =>
        c.id === campaignId
          ? { ...c, status: 'sent' as const, sentAt: new Date() }
          : c
      )
    )
  }

  return { campaigns, createCampaign, scheduleCampaign, sendCampaign }
}

// Referral program
export const useReferralProgram = () => {
  const generateReferralCode = (userId: string) => {
    return `REFER${userId.substring(0, 4)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  }

  const shareReferralLink = (referralCode: string) => {
    const referralUrl = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referralCode}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Fresh Tropics Asian Fruits',
        text: 'Join me and get amazing fresh fruits delivered!',
        url: referralUrl,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(referralUrl)
    }
  }

  const trackReferral = (referralCode: string, refereeEmail: string) => {
    const referral: ReferralReward = {
      referrerId: referralCode,
      refereeEmail,
      reward: 10, // $10 credit
      status: 'pending',
    }
    
    // Store in localStorage or send to API
    const stored = JSON.parse(localStorage.getItem('referrals') || '[]')
    stored.push(referral)
    localStorage.setItem('referrals', JSON.stringify(stored))

    return referral
  }

  return { generateReferralCode, shareReferralLink, trackReferral }
}

// Social sharing utilities
export const useSocialSharing = () => {
  const shareOnFacebook = (productName: string, productUrl: string) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    window.open(url, 'facebook-share', 'width=600,height=400')
  }

  const shareOnTwitter = (productName: string, productUrl: string) => {
    const text = `Check out ${productName} from Fresh Tropics Asian Fruits! 🍎🌴`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(productUrl)}`
    window.open(url, 'twitter-share', 'width=600,height=400')
  }

  const shareOnPinterest = (productName: string, imageUrl: string, productUrl: string) => {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(productName)}`
    window.open(url, 'pinterest-share', 'width=600,height=400')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return { shareOnFacebook, shareOnTwitter, shareOnPinterest, copyToClipboard }
}
