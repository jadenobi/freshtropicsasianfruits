'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatConversation, ChatMessage } from '@/types'
import {
  processUserMessage,
  rateConversation,
  getMockChatHistory,
  createConversation,
  MOCK_AGENTS,
} from '@/lib/chatService'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversation, setConversation] = useState<ChatConversation | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatConversation[]>([])
  const [rating, setRating] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  // Initialize chat
  useEffect(() => {
    if (isOpen && !conversation) {
      const newConv = createConversation('user-123', 'user@example.com', 'You')

      // Add welcome message
      const welcomeMsg: ChatMessage = {
        id: 'welcome-1',
        conversationId: newConv.id,
        sender: 'bot',
        senderName: 'Fresh Tropics Bot',
        message: '👋 Welcome! How can we help you today? Ask about shipping, returns, products, or anything else!',
        timestamp: new Date().toISOString(),
        suggestedReplies: ['Shipping info', 'Return policy', 'Loyalty program', 'Talk to agent'],
      }

      newConv.messages.push(welcomeMsg)
      setConversation(newConv)
      setChatHistory(getMockChatHistory('user-123'))
    }
  }, [isOpen, conversation])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages])

  const handleSendMessage = async (msg?: string) => {
    if (!conversation) return

    const messageText = msg || messageInput.trim()
    if (!messageText) return

    setMessageInput('')
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const result = processUserMessage(conversation, messageText)

      if (result.botResponse) {
        // Add bot response
        const updated = result.updatedConversation
        if (result.agentAssigned) {
          // Show agent assignment
          const agentMsg: ChatMessage = {
            id: `agent-assign-${Date.now()}`,
            conversationId: updated.id,
            sender: 'bot',
            senderName: 'Fresh Tropics Bot',
            message: `Connected with ${result.agentAssigned.name}! ${result.agentAssigned.avatar}`,
            timestamp: new Date().toISOString(),
          }
          updated.messages.push(agentMsg)
        }
        setConversation(updated)
      }

      setIsLoading(false)
    }, 500)
  }

  const handleSuggestedReply = (reply: string) => {
    setMessageInput(reply)
    setTimeout(() => {
      handleSendMessage(reply)
    }, 100)
  }

  const handleCloseChat = () => {
    if (conversation && conversation.status === 'active') {
      setConversation({ ...conversation, status: 'closed' })
    }
    setIsOpen(false)
    setRating(0)
  }

  const handleRateConversation = (score: number) => {
    if (conversation) {
      setConversation(rateConversation(conversation, score))
      setRating(score)
    }
  }

  const handleLoadHistory = (hist: ChatConversation) => {
    setConversation(hist)
    setShowHistory(false)
  }

  const unreadMessages = conversation?.messages.filter(m => m.sender !== 'user').length || 0

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            setIsOpen(true)
            setUnreadCount(0)
          }}
          className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center text-2xl hover:from-amber-600 hover:to-orange-700"
          title="Open chat"
        >
          💬
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-96 max-h-96 bg-white rounded-lg shadow-2xl border-2 border-amber-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Fresh Tropics Support</h3>
          <p className="text-sm text-amber-100">Typically replies in minutes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="hover:bg-amber-600 p-2 rounded-lg transition-all"
            title="Chat history"
          >
            📋
          </button>
          <button
            onClick={handleCloseChat}
            className="hover:bg-amber-600 p-2 rounded-lg transition-all font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Chat History View */}
      {showHistory ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          <h4 className="font-bold text-gray-900 mb-3">Chat History</h4>
          {chatHistory.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No previous conversations</p>
          ) : (
            chatHistory.map(hist => (
              <button
                key={hist.id}
                onClick={() => handleLoadHistory(hist)}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-900">
                    {new Date(hist.createdAt).toLocaleDateString()}
                  </span>
                  {hist.rating && <span className="text-amber-500">{'⭐'.repeat(hist.rating)}</span>}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{hist.messages[0]?.message}</p>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${hist.status === 'closed' ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                  {hist.status}
                </span>
              </button>
            ))
          )}
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {conversation?.messages && conversation.messages.length > 0 ? (
              conversation.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
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
                    <p className="text-xs mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 py-8">Loading chat...</div>
            )}

            {/* Suggested Replies */}
            {conversation?.messages && conversation.messages.length > 0 && !conversation.assignedAgent && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-gray-600 font-bold">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {['Shipping info', 'Return policy', 'Loyalty program', 'Talk to agent'].map(reply => (
                    <button
                      key={reply}
                      onClick={() => handleSuggestedReply(reply)}
                      className="text-xs px-3 py-1 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rating Section */}
            {conversation?.status === 'closed' && !rating && (
              <div className="mt-4 p-3 bg-white rounded-lg border-2 border-amber-200">
                <p className="text-sm font-bold text-gray-900 mb-2">Rate this conversation</p>
                <div className="flex gap-2">
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
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {conversation?.status !== 'closed' && (
            <div className="border-t border-gray-200 p-4 bg-white flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage()
                  }
                }}
                disabled={isLoading}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 disabled:bg-gray-100"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !messageInput.trim()}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-bold"
              >
                {isLoading ? '...' : '📤'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
