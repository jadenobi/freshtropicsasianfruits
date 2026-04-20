'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, Gift } from 'lucide-react'

interface PromoBannerProps {
  variant?: 'top' | 'banner'
}

export default function PromoBanner({ variant = 'top' }: PromoBannerProps) {
  // Promotional banner disabled
  return null
}
