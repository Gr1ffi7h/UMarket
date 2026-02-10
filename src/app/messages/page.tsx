"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageCircle, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { MobileNavbar } from "@/components/mobile-navbar"
import { AuthGuard } from "@/components/auth-guard"
import { RouteProtection } from "@/components/route-protection"
import { auth } from "@/lib/auth"
import { messaging, Conversation, Message } from "@/lib/messaging"

function MessagesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = auth.getCurrentUser()
    if (!user) {
      router.push("/auth/login")
      return
    }

    const userConversations = messaging.getConversationsForUser(user.id)
    setConversations(userConversations)
    
    // Check for specific conversation in URL
    const conversationId = searchParams.get('conversation')
    if (conversationId) {
      const conversation = messaging.getConversation(conversationId)
      if (conversation) {
        setSelectedConversation(conversation)
      }
    } else if (userConversations.length > 0) {
      // Select first conversation by default
      setSelectedConversation(userConversations[0])
    }
    
    setIsLoading(false)
  }, [router, searchParams])

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return

    const user = auth.getCurrentUser()
    if (!user) return

    const isSeller = user.id === selectedConversation.sellerId
    const receiverId = isSeller ? selectedConversation.buyerId : selectedConversation.sellerId
    const receiverName = isSeller ? selectedConversation.buyerName : selectedConversation.sellerName

    messaging.sendMessage(
      user.id,
      receiverId,
      message.trim(),
      selectedConversation.itemId,
      selectedConversation.itemTitle,
      user.name,
      receiverName
    )

    // Update the conversation
    const updatedConversation = messaging.getConversation(selectedConversation.id)
    if (updatedConversation) {
      setSelectedConversation(updatedConversation)
      setConversations(prev => 
        prev.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
          .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
      )
    }

    setMessage("")
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / 24)

    if (diffDays > 0) return `${diffDays}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    return "Just now"
  }

  if (isLoading) {
    return (
      <RouteProtection requireAuth>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-32"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
                <div className="md:col-span-2">
                  <div className="h-96 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RouteProtection>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <Navbar />
        </div>
        
        {/* Mobile Navbar */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
        
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Mobile Back Button */}
          <div className="md:hidden mb-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {conversations.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start a conversation from an item page</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {conversations.map((conv) => (
                        <div
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv)}
                          className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b last:border-b-0 ${
                            selectedConversation?.id === conv.id ? 'bg-muted/50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{conv.itemTitle}</p>
                              <p className="text-xs text-muted-foreground">
                                {conv.buyerId === auth.getCurrentUser()?.id ? conv.sellerName : conv.buyerName}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">
                              {formatTime(conv.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Chat Panel */}
            <div className="md:col-span-2">
              {selectedConversation ? (
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">
                      {selectedConversation.itemTitle}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.buyerId === auth.getCurrentUser()?.id 
                        ? `Talking to ${selectedConversation.sellerName}`
                        : `Talking to ${selectedConversation.buyerName}`
                      }
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((msg) => {
                        const isOwn = msg.senderId === auth.getCurrentUser()?.id
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                isOwn
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${
                                isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              }`}>
                                {formatTime(msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Select a conversation</p>
                    <p>Choose a conversation from list to start messaging</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <MessagesContent />
    </Suspense>
  )
}
