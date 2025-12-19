import { EmailTemplate, EmailCampaign, EmailSubscriber, EmailSequence } from '@/types'

// Mock Email Templates Database
const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'template-welcome-1',
    name: 'Welcome Series - Day 1',
    subject: '🎉 Welcome to Fresh Tropics! Your $5 Welcome Offer Inside',
    preheader: 'Get 20% off your first order when you shop today',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Welcome to Fresh Tropics Asian Fruits! 🌴</h1>
      <p>We're thrilled to have you join our community of fruit lovers!</p>
      <p>As a special welcome gift, enjoy <strong>20% OFF</strong> your first order with code: <code style="background: #f0f0f0; padding: 5px 10px;">WELCOME20</code></p>
      <p>Fresh, exotic fruits delivered right to your door. Shop now!</p>
      <a href="https://freshtropics.com/shop" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Shop Now</a>
    </div>`,
    templateType: 'welcome',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-welcome-2',
    name: 'Welcome Series - Day 3',
    subject: '📚 Learn: How to Store & Enjoy Your Fresh Fruits',
    preheader: 'Pro tips for keeping your fruit fresh and delicious',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Master Your Fruit Storage! 🥝</h1>
      <p>Store your exotic fruits like a pro with our comprehensive storage guide:</p>
      <ul>
        <li><strong>Dragon Fruit:</strong> Keep at room temp 2-3 days, then refrigerate</li>
        <li><strong>Mango:</strong> Ripen at room temperature before chilling</li>
        <li><strong>Coconut:</strong> Best served chilled for maximum freshness</li>
      </ul>
      <p>Read our full guide for maximum freshness and flavor!</p>
      <a href="https://freshtropics.com/storage-guide" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Read Full Guide</a>
    </div>`,
    templateType: 'welcome',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-welcome-3',
    name: 'Welcome Series - Day 7',
    subject: '💝 Join Our Loyalty Program & Earn Points on Every Order',
    preheader: 'Earn rewards on every purchase - up to 3x multipliers!',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Earn Rewards on Every Purchase! 🎁</h1>
      <p>Join our 4-tier loyalty program and unlock amazing benefits:</p>
      <ul>
        <li><strong>Bronze:</strong> 1x points multiplier, 0% discount</li>
        <li><strong>Silver:</strong> 1.5x points multiplier, 5% discount</li>
        <li><strong>Gold:</strong> 2x points multiplier, 10% discount</li>
        <li><strong>Platinum:</strong> 3x points multiplier, 15% discount</li>
      </ul>
      <p>Start earning today and unlock exclusive tier benefits!</p>
      <a href="https://freshtropics.com/rewards" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Join Now</a>
    </div>`,
    templateType: 'welcome',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-abandoned-1',
    name: 'Abandoned Cart - First Reminder',
    subject: '🛒 You left something delicious behind!',
    preheader: 'Your cart is waiting. Complete your order now.',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Don't Miss Out! 🥭</h1>
      <p>We noticed you left fresh fruit in your cart. Here's a gentle reminder:</p>
      <p>Your items are still available, but fresh stock can go quickly!</p>
      <p><strong>Limited Time:</strong> Get 10% off orders over $30 with code: <code style="background: #f0f0f0; padding: 5px 10px;">FRESH10</code></p>
      <a href="https://freshtropics.com/cart" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Complete Your Order</a>
    </div>`,
    templateType: 'abandoned-cart',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-abandoned-2',
    name: 'Abandoned Cart - Final Reminder',
    subject: '⏰ Last Chance: 15% off your Fresh Tropics order!',
    preheader: 'Your exclusive offer expires in 24 hours',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>This Is Your Last Chance! ⏰</h1>
      <p>We're offering an extra special discount just for you:</p>
      <p style="font-size: 24px; color: #10b981; font-weight: bold;">15% OFF</p>
      <p>Code: <code style="background: #f0f0f0; padding: 5px 10px;">LASTCHANCE15</code></p>
      <p><strong>⚠️ Expires in 24 hours</strong></p>
      <a href="https://freshtropics.com/cart" style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Complete Order Now</a>
    </div>`,
    templateType: 'abandoned-cart',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-postpurchase-1',
    name: 'Post-Purchase - Order Confirmation',
    subject: '✅ Order Confirmed! Your Fresh Tropics Fruits Are On The Way 🚚',
    preheader: 'Order #[ORDER_ID] - Delivery in 2-3 business days',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Thank You for Your Order! 🙏</h1>
      <p>Your fresh fruit order has been confirmed and is being prepared for shipment.</p>
      <p><strong>Order #[ORDER_ID]</strong></p>
      <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
      <p>Track your order status anytime by clicking the link below.</p>
      <a href="https://freshtropics.com/account/orders" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Track Order</a>
    </div>`,
    templateType: 'post-purchase',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-postpurchase-2',
    name: 'Post-Purchase - Follow-up & Review Request',
    subject: '⭐ Love Your Fresh Tropics Order? Share Your Review!',
    preheader: 'Help other fruit lovers find their favorites + earn 50 loyalty points',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>We'd Love Your Feedback! 🌟</h1>
      <p>How did you enjoy your Fresh Tropics order?</p>
      <p>Your honest review helps other fruit lovers discover amazing products and earns you <strong>50 Loyalty Points!</strong></p>
      <a href="https://freshtropics.com/reviews" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Leave a Review</a>
    </div>`,
    templateType: 'post-purchase',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-promo-1',
    name: 'Promotional - Weekend Flash Sale',
    subject: '⚡ Weekend Flash Sale! 25% Off Selected Tropical Fruits',
    preheader: 'Friday-Sunday only. Shop your favorites before they sell out!',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>⚡ WEEKEND FLASH SALE ⚡</h1>
      <p style="font-size: 32px; color: #ef4444; font-weight: bold;">25% OFF</p>
      <p>Selected Tropical Fruits - This Weekend Only!</p>
      <ul>
        <li>🥭 Mangoes - Stock up now!</li>
        <li>🍍 Pineapples - Limited quantity</li>
        <li>🥥 Young Coconuts - Fresh delivery</li>
      </ul>
      <p><strong>⏰ Sale ends Sunday at midnight</strong></p>
      <a href="https://freshtropics.com/sale" style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Shop Flash Sale</a>
    </div>`,
    templateType: 'promotional',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-seasonal-1',
    name: 'Seasonal - Spring Collection Launch',
    subject: '🌸 Spring Fresh Start! New Season Collections Available Now',
    preheader: 'Spring bundles, seasonal favorites, and limited-time offers',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>🌸 Celebrate Spring with Fresh Tropics! 🌸</h1>
      <p>Our new Spring Fresh Start collection is here with vibrant, energizing fruits:</p>
      <ul>
        <li>🐉 Dragon Fruit - Perfect for spring energy</li>
        <li>🥭 Fresh Mango - Peak season arrival</li>
        <li>🍓 Strawberries - Spring favorites</li>
      </ul>
      <p><strong>Spring Bundle Special:</strong> Save 15% on seasonal bundles with code <code style="background: #f0f0f0; padding: 5px 10px;">SPRING15</code></p>
      <a href="https://freshtropics.com/seasonal" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Shop Spring Collection</a>
    </div>`,
    templateType: 'seasonal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Mock Email Campaigns Database
const EMAIL_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 'campaign-welcome-1',
    name: 'Welcome Series Week 1',
    type: 'welcome',
    templateId: 'template-welcome-1',
    recipientCount: 2450,
    sentCount: 2387,
    openRate: 42.5,
    clickRate: 18.3,
    conversionRate: 12.7,
    status: 'sent',
    sentAt: '2025-01-15T09:00:00Z',
    createdAt: '2025-01-14T14:30:00Z',
  },
  {
    id: 'campaign-flash-1',
    name: 'Weekend Flash Sale Jan 18',
    type: 'promotional',
    templateId: 'template-promo-1',
    recipientCount: 5678,
    sentCount: 5612,
    openRate: 38.9,
    clickRate: 22.1,
    conversionRate: 16.4,
    status: 'sent',
    sentAt: '2025-01-18T08:00:00Z',
    createdAt: '2025-01-17T10:00:00Z',
  },
  {
    id: 'campaign-abandoned-1',
    name: 'Abandoned Cart Recovery',
    type: 'abandoned-cart',
    templateId: 'template-abandoned-1',
    recipientCount: 834,
    sentCount: 812,
    openRate: 51.2,
    clickRate: 28.5,
    conversionRate: 22.3,
    status: 'sent',
    sentAt: '2025-01-16T14:00:00Z',
    createdAt: '2025-01-16T13:00:00Z',
  },
]

// Mock Email Subscribers Database
const EMAIL_SUBSCRIBERS: EmailSubscriber[] = [
  {
    id: 'subscriber-1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    preferences: { promotions: true, newsletter: true, seasonal: true, productUpdates: true },
    subscribedAt: '2025-01-10T10:00:00Z',
    lastEmailSent: '2025-01-25T09:00:00Z',
    status: 'active',
  },
  {
    id: 'subscriber-2',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    preferences: { promotions: true, newsletter: true, seasonal: false, productUpdates: true },
    subscribedAt: '2024-12-15T14:30:00Z',
    lastEmailSent: '2025-01-20T08:00:00Z',
    status: 'active',
  },
  {
    id: 'subscriber-3',
    email: 'bob@example.com',
    firstName: 'Bob',
    lastName: 'Johnson',
    preferences: { promotions: false, newsletter: true, seasonal: false, productUpdates: true },
    subscribedAt: '2024-11-20T09:15:00Z',
    lastEmailSent: '2025-01-18T14:00:00Z',
    status: 'active',
  },
]

// Mock Email Sequences Database
const EMAIL_SEQUENCES: EmailSequence[] = [
  {
    id: 'sequence-welcome',
    name: 'Welcome Series',
    type: 'welcome',
    emails: [
      { templateId: 'template-welcome-1', delayHours: 0, subject: 'Welcome to Fresh Tropics!' },
      { templateId: 'template-welcome-2', delayHours: 72, subject: 'Storage Tips & Tricks' },
      { templateId: 'template-welcome-3', delayHours: 168, subject: 'Join Our Loyalty Program' },
    ],
    enabled: true,
    triggeredCount: 2456,
    createdAt: '2024-09-01T00:00:00Z',
  },
  {
    id: 'sequence-abandoned-cart',
    name: 'Abandoned Cart Recovery',
    type: 'abandoned-cart',
    emails: [
      { templateId: 'template-abandoned-1', delayHours: 2, subject: 'You left something behind!' },
      { templateId: 'template-abandoned-2', delayHours: 26, subject: 'Final reminder - 15% off!' },
    ],
    enabled: true,
    triggeredCount: 834,
    createdAt: '2024-10-15T00:00:00Z',
  },
  {
    id: 'sequence-post-purchase',
    name: 'Post-Purchase Follow-up',
    type: 'post-purchase',
    emails: [
      { templateId: 'template-postpurchase-1', delayHours: 0, subject: 'Order Confirmation' },
      { templateId: 'template-postpurchase-2', delayHours: 120, subject: 'Leave a Review & Earn Points' },
    ],
    enabled: true,
    triggeredCount: 1523,
    createdAt: '2024-09-20T00:00:00Z',
  },
]

// Get all email templates
export function getAllEmailTemplates(): EmailTemplate[] {
  return EMAIL_TEMPLATES
}

// Get template by ID
export function getEmailTemplateById(id: string): EmailTemplate | undefined {
  return EMAIL_TEMPLATES.find(t => t.id === id)
}

// Get templates by type
export function getEmailTemplatesByType(type: EmailTemplate['templateType']): EmailTemplate[] {
  return EMAIL_TEMPLATES.filter(t => t.templateType === type)
}

// Get all campaigns
export function getAllEmailCampaigns(): EmailCampaign[] {
  return EMAIL_CAMPAIGNS
}

// Get campaign by ID
export function getEmailCampaignById(id: string): EmailCampaign | undefined {
  return EMAIL_CAMPAIGNS.find(c => c.id === id)
}

// Get campaigns by status
export function getEmailCampaignsByStatus(status: EmailCampaign['status']): EmailCampaign[] {
  return EMAIL_CAMPAIGNS.filter(c => c.status === status)
}

// Get all subscribers
export function getAllEmailSubscribers(): EmailSubscriber[] {
  return EMAIL_SUBSCRIBERS
}

// Get subscriber by email
export function getEmailSubscriberByEmail(email: string): EmailSubscriber | undefined {
  return EMAIL_SUBSCRIBERS.find(s => s.email === email)
}

// Get active subscribers
export function getActiveEmailSubscribers(): EmailSubscriber[] {
  return EMAIL_SUBSCRIBERS.filter(s => s.status === 'active')
}

// Get subscribers by preference
export function getSubscribersByPreference(preference: keyof EmailSubscriber['preferences'], value: boolean): EmailSubscriber[] {
  return EMAIL_SUBSCRIBERS.filter(s => s.preferences[preference] === value && s.status === 'active')
}

// Get all email sequences
export function getAllEmailSequences(): EmailSequence[] {
  return EMAIL_SEQUENCES
}

// Get sequence by ID
export function getEmailSequenceById(id: string): EmailSequence | undefined {
  return EMAIL_SEQUENCES.find(s => s.id === id)
}

// Get enabled sequences
export function getEnabledEmailSequences(): EmailSequence[] {
  return EMAIL_SEQUENCES.filter(s => s.enabled)
}

// Email statistics
export function getEmailStatistics(): {
  totalSubscribers: number
  activeSubscribers: number
  totalCampaigns: number
  averageOpenRate: number
  averageClickRate: number
  averageConversionRate: number
  totalEmailsSent: number
} {
  const activeSubs = getActiveEmailSubscribers()
  const sentCampaigns = getEmailCampaignsByStatus('sent')

  const avgOpenRate = sentCampaigns.length > 0 ? sentCampaigns.reduce((sum, c) => sum + c.openRate, 0) / sentCampaigns.length : 0
  const avgClickRate = sentCampaigns.length > 0 ? sentCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / sentCampaigns.length : 0
  const avgConversionRate = sentCampaigns.length > 0 ? sentCampaigns.reduce((sum, c) => sum + c.conversionRate, 0) / sentCampaigns.length : 0
  const totalEmailsSent = sentCampaigns.reduce((sum, c) => sum + c.sentCount, 0)

  return {
    totalSubscribers: EMAIL_SUBSCRIBERS.length,
    activeSubscribers: activeSubs.length,
    totalCampaigns: EMAIL_CAMPAIGNS.length,
    averageOpenRate: Math.round(avgOpenRate * 10) / 10,
    averageClickRate: Math.round(avgClickRate * 10) / 10,
    averageConversionRate: Math.round(avgConversionRate * 10) / 10,
    totalEmailsSent,
  }
}

// Subscribe new email
export function subscribeEmail(email: string, firstName: string, lastName: string): { success: boolean; message: string } {
  const existing = getEmailSubscriberByEmail(email)
  if (existing) {
    return { success: false, message: 'Email already subscribed' }
  }

  const newSubscriber: EmailSubscriber = {
    id: `subscriber-${Date.now()}`,
    email,
    firstName,
    lastName,
    preferences: { promotions: true, newsletter: true, seasonal: true, productUpdates: true },
    subscribedAt: new Date().toISOString(),
    status: 'active',
  }

  EMAIL_SUBSCRIBERS.push(newSubscriber)
  return { success: true, message: 'Successfully subscribed!' }
}

// Unsubscribe email
export function unsubscribeEmail(email: string): { success: boolean; message: string } {
  const subscriber = getEmailSubscriberByEmail(email)
  if (!subscriber) {
    return { success: false, message: 'Email not found' }
  }

  subscriber.status = 'unsubscribed'
  subscriber.unsubscribedAt = new Date().toISOString()
  return { success: true, message: 'Successfully unsubscribed' }
}

// Update subscriber preferences
export function updateSubscriberPreferences(email: string, preferences: Partial<EmailSubscriber['preferences']>): { success: boolean; message: string } {
  const subscriber = getEmailSubscriberByEmail(email)
  if (!subscriber) {
    return { success: false, message: 'Email not found' }
  }

  subscriber.preferences = { ...subscriber.preferences, ...preferences }
  return { success: true, message: 'Preferences updated!' }
}

// Get campaign performance metrics
export function getCampaignPerformanceMetrics(campaignId: string): any {
  const campaign = getEmailCampaignById(campaignId)
  if (!campaign) return null

  return {
    campaignId: campaign.id,
    campaignName: campaign.name,
    type: campaign.type,
    recipients: campaign.recipientCount,
    sent: campaign.sentCount,
    deliveryRate: ((campaign.sentCount / campaign.recipientCount) * 100).toFixed(1),
    openRate: campaign.openRate.toFixed(1),
    clickRate: campaign.clickRate.toFixed(1),
    conversionRate: campaign.conversionRate.toFixed(1),
    estimatedRevenue: (campaign.sentCount * (campaign.conversionRate / 100) * 35).toFixed(2), // Avg order $35
  }
}

// Get all A/B test campaigns (mock)
export function getABTestCampaigns(): any[] {
  return [
    {
      id: 'ab-test-1',
      name: 'Subject Line Test - Welcome Series',
      variant_a: 'Welcome to Fresh Tropics! Your $5 Welcome Offer Inside',
      variant_b: '🎉 Welcome! Get 20% Off Your First Order',
      winner: 'variant_b',
      improvement: 23.5,
    },
    {
      id: 'ab-test-2',
      name: 'CTA Button Test - Abandoned Cart',
      variant_a: 'Complete Your Order',
      variant_b: 'Finish Checking Out - Save 10%',
      winner: 'variant_b',
      improvement: 18.2,
    },
  ]
}
