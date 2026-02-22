/**
 * Conversation List Component
 * 
 * Displays all conversations for the logged-in user
 * Shows listing title, participant name, last message preview
 * Minimal, responsive design with real-time updates
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Conversation } from '@/lib/supabase';

interface ConversationListProps {
  userId: string;
}

export function ConversationList({ userId }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
    
    // Subscribe to real-time updates for conversations
    const subscription = supabase
      .channel('conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `buyer_id=eq.${userId},seller_id=eq.${userId}`,
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();
      
      if (data.conversations) {
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOtherParticipant = (conversation: Conversation) => {
    const currentUser = userId;
    
    if (conversation.buyer?.id === currentUser) {
      return conversation.seller;
    } else {
      return conversation.buyer;
    }
  };

  const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Loading conversations...
          </div>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
            No conversations yet
          </h2>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Start a conversation by contacting sellers from listings
          </p>
          <Link 
            href="/browse" 
            className="inline-block mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Browse Listings →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark mb-6">
        Messages
      </h1>
      
      <div className="space-y-2">
        {conversations.map((conversation) => {
          const otherParticipant = getOtherParticipant(conversation);
          
          return (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className="block bg-background-light dark:bg-background-dark border border-gray-200 dark:border-primary-700 rounded p-4 hover:bg-gray-50 dark:hover:bg-primary-800 transition-colors"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-300 dark:bg-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                  {otherParticipant?.avatar_url ? (
                    <img 
                      src={otherParticipant.avatar_url} 
                      alt={otherParticipant.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                      {otherParticipant?.username?.charAt(0) || '?'}
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark truncate">
                        {otherParticipant?.username || 'Unknown User'}
                      </h3>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                        {conversation.listing?.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        {formatLastMessageTime(conversation.created_at)}
                      </p>
                      {conversation.listing?.price && (
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          ${conversation.listing.price}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Last message preview would go here */}
                  <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                    Tap to view conversation
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
