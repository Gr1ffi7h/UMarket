import { User } from './auth'

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  itemId: string
  senderName: string
  receiverName: string
}

export interface Conversation {
  id: string
  itemId: string
  itemTitle: string
  sellerId: string
  sellerName: string
  buyerId: string
  buyerName: string
  messages: Message[]
  lastMessage: string
  lastMessageTime: string
  createdAt: string
}

class MockMessaging {
  private static instance: MockMessaging
  private conversations: Conversation[] = []
  private readonly STORAGE_KEY = 'umarket_messages'

  static getInstance(): MockMessaging {
    if (!MockMessaging.instance) {
      MockMessaging.instance = new MockMessaging()
    }
    return MockMessaging.instance
  }

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        try {
          this.conversations = JSON.parse(stored)
        } catch {
          this.conversations = []
        }
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.conversations))
    }
  }

  sendMessage(
    senderId: string,
    receiverId: string,
    content: string,
    itemId: string,
    itemTitle: string,
    senderName: string,
    receiverName: string
  ): Message {
    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      itemId,
      senderName,
      receiverName
    }

    // Find existing conversation or create new one
    let conversation = this.findConversation(senderId, receiverId, itemId)
    
    if (!conversation) {
      conversation = {
        id: Math.random().toString(36).substr(2, 9),
        itemId,
        itemTitle,
        sellerId: receiverId,
        sellerName: receiverName,
        buyerId: senderId,
        buyerName: senderName,
        messages: [],
        lastMessage: content,
        lastMessageTime: message.timestamp,
        createdAt: message.timestamp
      }
      this.conversations.push(conversation)
    }

    conversation.messages.push(message)
    conversation.lastMessage = content
    conversation.lastMessageTime = message.timestamp
    
    this.saveToStorage()
    return message
  }

  getConversationsForUser(userId: string): Conversation[] {
    return this.conversations
      .filter(conv => conv.buyerId === userId || conv.sellerId === userId)
      .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
  }

  getConversation(conversationId: string): Conversation | null {
    return this.conversations.find(conv => conv.id === conversationId) || null
  }

  findConversation(userId1: string, userId2: string, itemId: string): Conversation | null {
    return this.conversations.find(conv => 
      conv.itemId === itemId &&
      ((conv.buyerId === userId1 && conv.sellerId === userId2) ||
       (conv.buyerId === userId2 && conv.sellerId === userId1))
    ) || null
  }

  getConversationBetweenUsers(userId1: string, userId2: string, itemId: string): Conversation | null {
    return this.findConversation(userId1, userId2, itemId)
  }

  markAsRead(conversationId: string, userId: string): void {
    const conversation = this.getConversation(conversationId)
    if (conversation) {
      // In a real app, we'd mark individual messages as read
      // For now, we'll just save to trigger re-render
      this.saveToStorage()
    }
  }
}

export const messaging = MockMessaging.getInstance()
