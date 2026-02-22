/**
 * Chat Interface Component
 * 
 * Displays full conversation with message bubbles
 * Real-time messaging with scroll to latest
 * Minimal design with mobile-first responsive layout
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase, subscribeToMessages } from '@/lib/supabase';
import { Message, Conversation } from '@/lib/supabase';

interface ChatInterfaceProps {
  conversationId: string;
  currentUserId: string;
  conversation: Conversation;
}

export function ChatInterface({ conversationId, currentUserId, conversation }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    
    // Subscribe to real-time messages
    const subscription = subscribeToMessages(conversationId, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      scrollToBottom();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages?conversationId=${conversationId}`);
      const data = await response.json();
      
      if (data.messages) {
        setMessages(data.messages);
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) {
      return;
    }

    setSending(true);
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          messageText: newMessage.trim(),
        }),
      });

      const data = await response.json();
      
      if (data.message) {
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getOtherParticipant = () => {
    if (conversation.buyer?.id === currentUserId) {
      return conversation.seller;
    } else {
      return conversation.buyer;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-96px)]">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Loading messages...
          </div>
        </div>
      </div>
    );
  }

  const otherParticipant = getOtherParticipant();

  return (
    <div className="flex flex-col h-[calc(100vh-96px)]">
      {/* Header */}
      <div className="bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-primary-700 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 dark:bg-primary-700 rounded-full flex items-center justify-center">
            {otherParticipant?.avatar_url ? (
              <img 
                src={otherParticipant.avatar_url} 
                alt={otherParticipant.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                {otherParticipant?.username?.charAt(0) || '?'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark truncate">
              {otherParticipant?.username || 'Unknown User'}
            </p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
              {conversation.listing?.title} • ${conversation.listing?.price}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.sender_id === currentUserId;
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${
                  isOwnMessage 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 dark:bg-primary-800 text-text-primary-light dark:text-text-primary-dark'
                } rounded-lg px-3 py-2`}>
                  {/* Sender info for others' messages */}
                  {!isOwnMessage && (
                    <p className="text-xs font-medium mb-1 opacity-75">
                      {message.sender?.username || 'Unknown'}
                    </p>
                  )}
                  
                  {/* Message content */}
                  <p className="text-sm break-words">
                    {message.message_text}
                  </p>
                  
                  {/* Timestamp */}
                  <p className={`text-xs mt-1 ${
                    isOwnMessage ? 'text-primary-100' : 'text-text-secondary-light dark:text-text-secondary-dark'
                  }`}>
                    {formatMessageTime(message.created_at)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-primary-700 px-4 py-3">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-lg bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            maxLength={1000}
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
