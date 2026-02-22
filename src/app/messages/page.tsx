/**
 * Messages Page Component
 * 
 * Main messaging interface with conversation list and chat
 * Real-time updates with cross-device synchronization
 * Mobile-first responsive design
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ClientHeader } from '@/components/ClientHeader';
import { ConversationList } from '@/components/ConversationList';
import { ChatInterface } from '@/components/ChatInterface';
import { supabase } from '@/lib/supabaseClient';

export default function MessagesPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<any>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  const conversationId = params.conversationId as string;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?returnTo=/messages');
        return;
      }

      setUser(session.user);

      if (conversationId) {
        // Check if user has access to this conversation
        const { data: participants } = await supabase
          .from('conversation_participants')
          .select('user_id')
          .eq('conversation_id', conversationId);

        if (!participants || !participants.some(p => p.user_id === session.user.id)) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        // Fetch conversation details
        const { data: conversations } = await supabase
          .from('conversations')
          .select('*')
          .eq('id', conversationId)
          .single();

        setConversation(conversations || null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ClientHeader />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ClientHeader />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Access Denied
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              You don't have permission to view this conversation.
            </p>
            <button
              onClick={() => router.push('/messages')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Messages
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show chat interface if conversation ID is provided
  if (conversationId && conversation) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ClientHeader />
        <ChatInterface
          conversationId={conversationId}
          currentUserId={user.id}
          conversation={conversation}
        />
      </div>
    );
  }

  // Show conversation list if no specific conversation
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      <ConversationList userId={user.id} />
    </div>
  );
}
