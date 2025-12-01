'use client'

import { useState, useEffect, useRef } from 'react'
import PageLayout from '@/components/PageLayout'
import { ChatConversation, ChatMessage } from '@/types'
import {
  processUserMessage,
  rateConversation,
  getMockChatHistory,
  createConversation,
  MOCK_AGENTS,
} from '@/lib/chatService'

export default function LiveChatPage() {
  const [conversation, setConversation] = useState<ChatConversation | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatConversation[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat')
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize
  useEffect(() => {
    if (!conversation) {
      const newConv = createConversation('user-123', 'user@example.com', 'You')
      const welcomeMsg: ChatMessage = {
        id: 'welcome-1',
        conversationId: newConv.id,
        sender: 'bot',
        senderName: 'Fresh Tropics Bot',
        message: '👋 Welcome to Fresh Tropics Live Chat! I\'m here to help with any questions about our products, shipping, returns, or anything else. What can I help you with today?',
        timestamp: new Date().toISOString(),
        suggestedReplies: ['How does shipping work?', 'What\'s your return policy?', 'Tell me about loyalty rewards', 'Connect me with an agent'],
      }
      newConv.messages.push(welcomeMsg)
      setConversation(newConv)
      setChatHistory(getMockChatHistory('user-123'))
    }
  }, [conversation])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages])

  const handleSendMessage = async (msg?: string) => {
    if (!conversation) return
    const messageText = msg || messageInput.trim()
    if (!messageText) return

    setMessageInput('')
    setIsLoading(true)

    setTimeout(() => {
      const result = processUserMessage(conversation, messageText)
      if (result.botResponse) {
        const updated = result.updatedConversation
        if (result.agentAssigned) {
          const agentMsg: ChatMessage = {
            id: `agent-assign-${Date.now()}`,
            conversationId: updated.id,
            sender: 'bot',
            senderName: 'Fresh Tropics Bot',
            message: `🎯 Connecting with ${result.agentAssigned.name} (${result.agentAssigned.avatar})...`,
            timestamp: new Date().toISOString(),
          }
          updated.messages.push(agentMsg)
        }
        setConversation(updated)
      }
      setIsLoading(false)
    }, 600)
  }

  const handleSuggestedReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleRateConversation = (score: number) => {
    if (conversation) {
      const updated = rateConversation(conversation, score, feedback)
      setConversation(updated)
      setRating(score)
    }
  }

  const handleLoadHistory = (hist: ChatConversation) => {
    setConversation(hist)
    setRating(hist.rating || 0)
    setFeedback(hist.feedback || '')
    setActiveTab('chat')
  }

  const handleStartNewChat = () => {
    const newConv = createConversation('user-123', 'user@example.com', 'You')
    const welcomeMsg: ChatMessage = {
      id: 'welcome-' + Date.now(),
      conversationId: newConv.id,
      sender: 'bot',
      senderName: 'Fresh Tropics Bot',
      message: '👋 Welcome to Fresh Tropics Live Chat! How can I assist you today?',
      timestamp: new Date().toISOString(),
      suggestedReplies: ['How does shipping work?', 'What\'s your return policy?', 'Tell me about loyalty rewards', 'Connect me with an agent'],
    }
    newConv.messages.push(welcomeMsg)
    setConversation(newConv)
    setRating(0)
    setFeedback('')
  }

  // Count unread messages from agents
  const agentMessages = conversation?.messages.filter(m => m.sender === 'agent') || []
  const isAgentActive = conversation?.assignedAgent || agentMessages.length > 0

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">💬 Live Chat Support</h1>
          <p className="text-gray-600">Real-time support with AI chatbot and human agents</p>
        </div>

        <div className="flex gap-4 mb-8">
          {(['chat', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === tab
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-amber-300'
              }`}
            >
              {tab === 'chat' ? '💬 Active Chat' : '📋 History'}
            </button>
          ))}
        </div>

        {activeTab === 'chat' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chat */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col h-96 lg:h-auto lg:min-h-96">
                {/* Chat Header */}
                <div className={`p-4 flex items-center justify-between border-b ${isAgentActive ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <div>
                    <h2 className="font-bold text-gray-900">Support Chat</h2>
                    {conversation?.assignedAgent && (
                      <p className="text-sm text-green-700">✓ Agent available</p>
                    )}
                    {conversation?.status === 'waiting' && (
                      <p className="text-sm text-orange-700">⏳ Waiting for agent</p>
                    )}
                    {conversation?.status === 'closed' && (
                      <p className="text-sm text-gray-600">Chat closed</p>
                    )}
                  </div>
                  {conversation?.status === 'closed' && (
                    <button
                      onClick={handleStartNewChat}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold text-sm transition-all"
                    >
                      New Chat
                    </button>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {conversation?.messages.length === 0 ? (
                    <div className="text-center text-gray-600 py-8">Loading...</div>
                  ) : (
                    <>
                      {conversation?.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`max-w-sm px-4 py-3 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-amber-500 text-white rounded-br-none'
                                : msg.sender === 'agent'
                                  ? 'bg-green-100 text-gray-900 rounded-bl-none border-l-4 border-green-500'
                                  : 'bg-white text-gray-900 border border-gray-300 rounded-bl-none'
                            }`}
                          >
                            {msg.sender !== 'user' && (
                              <div className="text-xs font-bold text-gray-600 mb-1">{msg.senderName}</div>
                            )}
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                            <p className="text-xs mt-2 opacity-70">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      ))}

                      {/* Suggested Replies */}
                      {!conversation?.assignedAgent && conversation?.status !== 'closed' && (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-600 font-bold">Quick replies:</p>
                          <div className="flex flex-wrap gap-2">
                            {['How does shipping work?', 'Return policy', 'Loyalty program', 'Connect with agent'].map(reply => (
                              <button
                                key={reply}
                                onClick={() => handleSuggestedReply(reply)}
                                className="text-xs px-3 py-1.5 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Rating Section */}
                {conversation?.status === 'closed' && !rating && (
                  <div className="p-4 bg-amber-50 border-t border-amber-200">
                    <p className="text-sm font-bold text-gray-900 mb-3">Rate this conversation</p>
                    <div className="flex gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => handleRateConversation(star)}
                          className={`text-2xl transition-all ${star <= rating ? 'scale-125' : 'hover:scale-110'}`}
                        >
                          {star <= rating ? '⭐' : '☆'}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      placeholder="Any feedback? (Optional)"
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                {/* Input */}
                {conversation?.status !== 'closed' && (
                  <div className="border-t border-gray-200 p-4 bg-white flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter' && !isLoading) handleSendMessage()
                      }}
                      disabled={isLoading}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 disabled:bg-gray-100"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={isLoading || !messageInput.trim()}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-bold transition-all"
                    >
                      {isLoading ? '⏳' : '📤'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Available Agents */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  👥 Available Agents
                </h3>
                <div className="space-y-3">
                  {MOCK_AGENTS.map(agent => (
                    <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{agent.avatar}</span>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{agent.name}</p>
                          <p className="text-xs text-gray-600">{agent.activeChats}/{agent.maxChats} chats</p>
                        </div>
                      </div>
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          agent.status === 'online' ? 'bg-green-500' : agent.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-200">
                <h3 className="font-bold text-amber-900 mb-4">💡 Quick Info</h3>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li>⏱️ Response: Usually 2-5 min</li>
                  <li>📍 Hours: Mon-Fri 9am-6pm EST</li>
                  <li>🤖 AI Bot available 24/7</li>
                  <li>✓ Chat history saved</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chatHistory.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600 text-lg">No previous conversations</p>
              </div>
            ) : (
              chatHistory.map(hist => (
                <button
                  key={hist.id}
                  onClick={() => handleLoadHistory(hist)}
                  className="text-left p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:border-amber-400 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(hist.createdAt).toLocaleDateString()}{' '}
                        {new Date(hist.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {hist.assignedAgent && (
                        <p className="text-xs text-green-700 mt-1">✓ Agent: Sarah</p>
                      )}
                    </div>
                    {hist.rating && (
                      <span className="text-lg">{'⭐'.repeat(hist.rating)}</span>
                    )}
                  </div>
                  <p className="text-gray-700 line-clamp-2 mb-3">{hist.messages[0]?.message}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded ${hist.status === 'closed' ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                      {hist.status === 'closed' ? '✓ Closed' : '🟢 Active'}
                    </span>
                    <span className="text-gray-600">{hist.messages.length} messages</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{hist.feedback && '💬 ' + hist.feedback.substring(0, 40)}</p>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
