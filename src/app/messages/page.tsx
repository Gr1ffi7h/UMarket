/**
 * Minimal Messages Page Component
 * 
 * Compact messaging interface with reduced visual bulk
 * Clean layout with minimal spacing and elements
 * Lightweight design optimized for fast messaging
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    participant: {
      name: 'John Doe',
      email: 'john.doe@university.edu',
      avatar: '/api/placeholder/40/40',
    },
    lastMessage: {
      content: 'Is the MacBook still available?',
      timestamp: '2024-01-15T14:30:00Z',
      isFromMe: false,
    },
    item: {
      id: '1',
      title: 'MacBook Pro 14"',
      price: 1200,
    },
    unreadCount: 2,
  },
  {
    id: '2',
    participant: {
      name: 'Jane Smith',
      email: 'jane.smith@university.edu',
      avatar: '/api/placeholder/40/40',
    },
    lastMessage: {
      content: 'Thanks for the quick response!',
      timestamp: '2024-01-15T12:15:00Z',
      isFromMe: true,
    },
    item: {
      id: '2',
      title: 'Calculus Textbook',
      price: 45,
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participant: {
      name: 'Mike Wilson',
      email: 'mike.wilson@university.edu',
      avatar: '/api/placeholder/40/40',
    },
    lastMessage: {
      content: 'Can we meet tomorrow to look at the desk lamp?',
      timestamp: '2024-01-14T18:45:00Z',
      isFromMe: false,
    },
    item: {
      id: '3',
      title: 'Desk Lamp',
      price: 25,
    },
    unreadCount: 1,
  },
];

// Mock messages for selected conversation
const mockMessages = [
  {
    id: '1',
    content: 'Hi! Is the MacBook still available?',
    timestamp: '2024-01-15T14:00:00Z',
    isFromMe: false,
  },
  {
    id: '2',
    content: 'Yes, it is! Are you interested in seeing it?',
    timestamp: '2024-01-15T14:15:00Z',
    isFromMe: true,
  },
  {
    id: '3',
    content: 'Is the MacBook still available?',
    timestamp: '2024-01-15T14:30:00Z',
    isFromMe: false,
  },
];

/**
 * Minimal Messages Page Component
 * 
 * Compact messaging interface with clean layout
 * Reduced spacing and minimal visual elements
 */
export default function MinimalMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  /**
   * Handle sending a new message
   */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg = {
      id: String(messages.length + 1),
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isFromMe: true,
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Update conversation's last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: newMsg, unreadCount: 0 }
        : conv
    ));
  };

  /**
   * Mark conversation as read
   */
  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      
      <main className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-96px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Conversations List */}
          <div className="lg:col-span-1 border-r border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                Messages
              </h2>
            </div>
            
            <div className="overflow-y-auto h-[calc(100vh-160px)]">
              {conversations.length > 0 ? (
                <div className="space-y-1">
                  {conversations.map(conversation => (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation.id);
                        markAsRead(conversation.id);
                      }}
                      className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {conversation.participant.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {conversation.participant.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                            {conversation.participant.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                          {conversation.lastMessage.content}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimestamp(conversation.lastMessage.timestamp)}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">
                    No conversations yet
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Start messaging buyers and sellers from your listings
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Message View */}
          <div className="lg:col-span-2 flex flex-col">
            {selectedConv ? (
              <>
                {/* Conversation Header */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {selectedConv.participant.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedConv.participant.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {selectedConv.participant.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedConv.item.title} • ${selectedConv.item.price}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-3 py-2 rounded text-sm ${
                          message.isFromMe
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isFromMe
                            ? 'text-blue-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">
                    Select a conversation
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Choose from your conversations on the left
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
