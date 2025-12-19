import { LoyaltyAccount, LoyaltyTier, PointsTransaction } from '@/types'

// Loyalty tiers with benefits
export const LOYALTY_TIERS: Record<string, LoyaltyTier> = {
  Bronze: {
    name: 'Bronze',
    pointsRequired: 0,
    discount: 0,
    benefits: ['1 point per $1 spent', 'Access to loyalty program'],
    icon: '🥉'
  },
  Silver: {
    name: 'Silver',
    pointsRequired: 500,
    discount: 0.05,
    benefits: ['1.5 points per $1 spent', '5% discount on all orders', 'Free shipping on $50+', 'Birthday bonus points'],
    icon: '🥈'
  },
  Gold: {
    name: 'Gold',
    pointsRequired: 1500,
    discount: 0.1,
    benefits: ['2 points per $1 spent', '10% discount on all orders', 'Free shipping on all orders', 'Birthday bonus points', 'Early access to sales'],
    icon: '🥇'
  },
  Platinum: {
    name: 'Platinum',
    pointsRequired: 3000,
    discount: 0.15,
    benefits: ['3 points per $1 spent', '15% discount on all orders', 'Free expedited shipping', 'Birthday bonus (50 points)', 'VIP customer support', 'Exclusive products'],
    icon: '💎'
  }
}

// Points earning rates
export const POINTS_RATES = {
  purchaseBase: 1,
  referralReward: 100,
  referrerReward: 50,
  birthdayBonus: 50,
  firstPurchaseBonus: 25,
  milestoneReward: 100
}

// Get current tier based on points
export function getCurrentTier(points: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' {
  if (points >= LOYALTY_TIERS.Platinum.pointsRequired) return 'Platinum'
  if (points >= LOYALTY_TIERS.Gold.pointsRequired) return 'Gold'
  if (points >= LOYALTY_TIERS.Silver.pointsRequired) return 'Silver'
  return 'Bronze'
}

// Calculate points earned from purchase
export function calculatePurchasePoints(
  amount: number,
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
  isFirstPurchase: boolean = false
): number {
  const tierData = LOYALTY_TIERS[tier]
  const pointsPerDollar = {
    Bronze: 1,
    Silver: 1.5,
    Gold: 2,
    Platinum: 3
  }
  
  let points = Math.floor(amount * pointsPerDollar[tier])
  if (isFirstPurchase) points += POINTS_RATES.firstPurchaseBonus
  
  return points
}

// Generate referral code
export function generateReferralCode(email: string): string {
  const hash = email.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)
  const code = `REF${Math.abs(hash).toString(36).toUpperCase().substring(0, 8)}`
  return code
}

// Create mock loyalty account (in production, use database)
export function createLoyaltyAccount(email: string): LoyaltyAccount {
  return {
    userId: email,
    totalPoints: 0,
    currentTier: 'Bronze',
    pointsThisMonth: 0,
    redeemablePoints: 0,
    totalSpent: 0,
    referralCode: generateReferralCode(email),
    referralRewards: 0,
    joinDate: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    milestones: {
      firstPurchase: false,
      fivePurchases: false,
      tenPurchases: false,
      birthday: false
    }
  }
}

// Calculate redemption value
export function calculateRedemptionValue(points: number): number {
  return Math.floor(points / 100) // 100 points = $1
}

// Get points breakdown
export function getPointsBreakdown(account: LoyaltyAccount) {
  const tier = LOYALTY_TIERS[account.currentTier]
  const nextTier = 
    account.currentTier === 'Bronze' ? LOYALTY_TIERS.Silver :
    account.currentTier === 'Silver' ? LOYALTY_TIERS.Gold :
    account.currentTier === 'Gold' ? LOYALTY_TIERS.Platinum :
    null

  const pointsToNextTier = nextTier 
    ? Math.max(0, nextTier.pointsRequired - account.totalPoints)
    : 0

  const redemptionValue = calculateRedemptionValue(account.redeemablePoints)
  const discount = tier.discount * 100

  return {
    currentTierName: account.currentTier,
    currentTierIcon: tier.icon,
    totalPoints: account.totalPoints,
    pointsThisMonth: account.pointsThisMonth,
    redeemablePoints: account.redeemablePoints,
    redemptionValue,
    discount,
    nextTierName: nextTier?.name || null,
    pointsToNextTier,
    progress: nextTier ? Math.round((account.totalPoints / nextTier.pointsRequired) * 100) : 100
  }
}

// Mock transaction history (in production, fetch from database)
export function getMockTransactionHistory(email: string): PointsTransaction[] {
  return [
    {
      id: '1',
      userId: email,
      type: 'purchase',
      points: 150,
      description: 'Purchase of Fresh Mango Bundle',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      orderId: 'ORD-001'
    },
    {
      id: '2',
      userId: email,
      type: 'referral',
      points: 50,
      description: 'Referral reward from friend signup',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      userId: email,
      type: 'purchase',
      points: 89,
      description: 'Purchase of Organic Berry Selection',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      orderId: 'ORD-002'
    },
    {
      id: '4',
      userId: email,
      type: 'bonus',
      points: 25,
      description: 'First purchase bonus',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      orderId: 'ORD-000'
    }
  ]
}
