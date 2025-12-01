import { ChatMessage, ChatConversation, ChatAgent } from '@/types'

// FAQ Knowledge Base for AI Bot
const FAQ_KNOWLEDGE_BASE: Record<string, string> = {
  'shipping': 'We offer free shipping on orders over $50. Standard shipping takes 5-7 business days. Express shipping (1-2 days) is available for $9.99.',
  'returns': 'We accept returns within 30 days of purchase if items are unopened and in original condition. Fresh produce has a 3-day return window. Refunds are processed within 5-7 business days.',
  'payment': 'We accept credit/debit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are secured with 256-bit SSL encryption.',
  'organic': 'Our organic fruits are certified by USDA and sourced from local farms. We don\'t use pesticides or artificial fertilizers.',
  'storage': 'Store citrus fruits at room temperature for 2-3 weeks. Berries should be refrigerated and used within 3-5 days. Tropical fruits should be kept cool.',
  'quality': 'All our fruits are hand-selected for quality and freshness. We inspect every item before packaging and offer a freshness guarantee.',
  'bulk': 'We offer bulk orders with volume discounts starting at 5+ boxes. Contact our bulk orders team for custom pricing.',
  'corporate': 'We serve corporate clients with custom gift baskets, employee wellness programs, and bulk office fruit delivery. Special rates available.',
  'subscription': 'Subscribe & Save offers 10% off recurring orders. Choose weekly, bi-weekly, or monthly delivery. Cancel anytime.',
  'seasonal': 'Seasonal fruit availability changes throughout the year. Check our Seasonal Collections page for current offerings and limited-time boxes.',
  'track': 'Order tracking information is sent to your email. You can also track orders from your account dashboard.',
  'contact': 'You can reach our team via email (support@freshtropics.com), phone (1-800-FRESH-01), or this chat. We\'re available Monday-Friday, 9am-6pm EST.',
  'hours': 'Our customer service team is available Monday-Friday, 9am-6pm EST, and Saturday 10am-4pm EST.',
  'loyalty': 'Our loyalty program rewards you with points on every purchase. Earn discounts, free shipping, and VIP perks at Bronze, Silver, Gold, and Platinum tiers.',
  'refer': 'Refer a friend and earn 50 points! They\'ll get 100 bonus points on their first purchase. Share your code: REFG2K8X9P',
}

const FAQ_QUESTIONS = {
  'shipping': ['How long does shipping take?', 'Do you offer free shipping?', 'Express shipping options?'],
  'returns': ['What\'s your return policy?', 'How do I return items?', 'Fresh produce returns?'],
  'payment': ['What payment methods?', 'Is it secure?', 'Do you take PayPal?'],
  'organic': ['Are fruits organic?', 'Certified organic?', 'Pesticide free?'],
  'storage': ['How to store fruits?', 'Shelf life of berries?', 'Citrus storage?'],
  'quality': ['Quality guarantee?', 'Fresh products?', 'How fresh?'],
  'loyalty': ['How does rewards work?', 'Loyalty tiers?', 'How to earn points?'],
  'refer': ['Referral program?', 'How to refer?', 'What\'s the referral bonus?'],
}

// Mock agents available
export const MOCK_AGENTS: ChatAgent[] = [
  {
    id: 'agent-1',
    name: 'Sarah',
    avatar: '👩‍💼',
    status: 'online',
    activeChats: 2,
    maxChats: 5,
  },
  {
    id: 'agent-2',
    name: 'Marcus',
    avatar: '👨‍💼',
    status: 'online',
    activeChats: 3,
    maxChats: 5,
  },
  {
    id: 'agent-3',
    name: 'Emma',
    avatar: '👩‍💼',
    status: 'busy',
    activeChats: 5,
    maxChats: 5,
  },
]

// Generate unique IDs
export function generateChatId(): string {
  return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Find relevant FAQ answers based on user message
export function findFAQMatch(message: string): { topic: string; answer: string; replies: string[] } | null {
  const lowerMsg = message.toLowerCase()

  for (const [topic, answer] of Object.entries(FAQ_KNOWLEDGE_BASE)) {
    if (lowerMsg.includes(topic) || lowerMsg.includes(topic.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase())) {
      const replies = FAQ_QUESTIONS[topic as keyof typeof FAQ_QUESTIONS] || []
      return { topic, answer, replies }
    }
  }

  // Fuzzy matching for common keywords
  const keywords = [
    { word: 'ship', topic: 'shipping' },
    { word: 'return', topic: 'returns' },
    { word: 'pay', topic: 'payment' },
    { word: 'organic', topic: 'organic' },
    { word: 'store', topic: 'storage' },
    { word: 'fresh', topic: 'quality' },
    { word: 'bulk', topic: 'bulk' },
    { word: 'track', topic: 'track' },
    { word: 'hour', topic: 'hours' },
    { word: 'point', topic: 'loyalty' },
    { word: 'refer', topic: 'refer' },
  ]

  for (const { word, topic } of keywords) {
    if (lowerMsg.includes(word)) {
      const answer = FAQ_KNOWLEDGE_BASE[topic]
      const replies = FAQ_QUESTIONS[topic as keyof typeof FAQ_QUESTIONS] || []
      return { topic, answer, replies }
    }
  }

  return null
}

// Route chat to available agent
export function getAvailableAgent(): ChatAgent | null {
  const available = MOCK_AGENTS.filter(a => a.status !== 'offline' && a.activeChats < a.maxChats)
  if (available.length === 0) return null

  // Return agent with fewest active chats
  return available.reduce((prev, current) =>
    prev.activeChats < current.activeChats ? prev : current
  )
}

// Generate bot response
export function generateBotResponse(userMessage: string): { message: string; suggestedReplies: string[] } {
  const faqMatch = findFAQMatch(userMessage)

  if (faqMatch) {
    return {
      message: faqMatch.answer,
      suggestedReplies: faqMatch.replies.slice(0, 3),
    }
  }

  // Default responses for unmatched queries
  const defaultResponses = [
    "I'd love to help! Could you provide more details about your question?",
    "Thanks for reaching out! Let me connect you with a team member who can better assist.",
    "I'm here to help! Feel free to ask about shipping, returns, products, or anything else.",
    "I'm not sure I fully understood. Could you rephrase your question?",
  ]

  const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]

  return {
    message: randomResponse,
    suggestedReplies: [
      'Talk to an agent',
      'Shipping info',
      'Return policy',
      'Loyalty program',
    ],
  }
}

// Create new chat conversation
export function createConversation(
  userId: string,
  userEmail: string,
  userName: string
): ChatConversation {
  const now = new Date().toISOString()
  return {
    id: generateChatId(),
    userId,
    userEmail,
    userName,
    messages: [],
    status: 'active',
    createdAt: now,
    updatedAt: now,
  }
}

// Add message to conversation
export function addMessage(
  conversation: ChatConversation,
  sender: 'user' | 'agent' | 'bot',
  message: string,
  senderName: string
): ChatMessage {
  const newMessage: ChatMessage = {
    id: generateChatId(),
    conversationId: conversation.id,
    sender,
    senderName,
    message,
    timestamp: new Date().toISOString(),
  }

  conversation.messages.push(newMessage)
  conversation.updatedAt = new Date().toISOString()

  return newMessage
}

// Process incoming user message and generate response(s)
export function processUserMessage(
  conversation: ChatConversation,
  userMessage: string
): { botResponse?: ChatMessage; agentAssigned?: ChatAgent; updatedConversation: ChatConversation } {
  const updatedConversation = { ...conversation }

  // Add user message
  addMessage(updatedConversation, 'user', userMessage, updatedConversation.userName)

  // Try to match FAQ
  const botResponse = generateBotResponse(userMessage)

  // If user asks to talk to agent or FAQ doesn't match well
  if (userMessage.toLowerCase().includes('agent') || userMessage.toLowerCase().includes('human') || !botResponse.suggestedReplies.length) {
    const agent = getAvailableAgent()
    if (agent) {
      updatedConversation.status = 'active'
      updatedConversation.assignedAgent = agent.id

      const agentIntro = addMessage(
        updatedConversation,
        'agent',
        `Hi! I'm ${agent.name}, one of our customer service specialists. How can I help you today?`,
        agent.name
      )

      return {
        botResponse: agentIntro,
        agentAssigned: agent,
        updatedConversation,
      }
    } else {
      const queueMessage = addMessage(
        updatedConversation,
        'bot',
        "All our agents are currently busy. You're in the queue and will be connected to the next available agent. We appreciate your patience!",
        'Fresh Tropics Bot'
      )
      updatedConversation.status = 'waiting'

      return {
        botResponse: queueMessage,
        updatedConversation,
      }
    }
  }

  // Otherwise, send FAQ answer as bot
  const botMsg = addMessage(
    updatedConversation,
    'bot',
    botResponse.message,
    'Fresh Tropics Bot'
  )
  ;(botMsg as any).suggestedReplies = botResponse.suggestedReplies

  return {
    botResponse: botMsg,
    updatedConversation,
  }
}

// Rate conversation
export function rateConversation(conversation: ChatConversation, rating: number, feedback?: string): ChatConversation {
  const updated = { ...conversation }
  updated.rating = rating
  updated.feedback = feedback
  updated.status = 'closed'
  return updated
}

// Mock chat history retrieval (in production, this would come from database)
export function getMockChatHistory(userId: string): ChatConversation[] {
  const now = new Date()
  return [
    {
      id: 'chat-1',
      userId,
      userEmail: 'user@example.com',
      userName: 'You',
      status: 'closed',
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 5,
      messages: [
        {
          id: 'msg-1',
          conversationId: 'chat-1',
          sender: 'user',
          senderName: 'You',
          message: 'How long does shipping take?',
          timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg-2',
          conversationId: 'chat-1',
          sender: 'bot',
          senderName: 'Fresh Tropics Bot',
          message: 'We offer free shipping on orders over $50. Standard shipping takes 5-7 business days.',
          timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
        },
      ],
    },
    {
      id: 'chat-2',
      userId,
      userEmail: 'user@example.com',
      userName: 'You',
      status: 'closed',
      assignedAgent: 'agent-1',
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 5,
      messages: [
        {
          id: 'msg-3',
          conversationId: 'chat-2',
          sender: 'user',
          senderName: 'You',
          message: 'Can I return items?',
          timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg-4',
          conversationId: 'chat-2',
          sender: 'agent',
          senderName: 'Sarah',
          message: 'Absolutely! We accept returns within 30 days of purchase if items are unopened.',
          timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
        },
      ],
    },
  ]
}
