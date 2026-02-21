/**
 * Supabase Client Configuration
 * 
 * Handles database connection, authentication, and real-time subscriptions
 * Configured for Vercel deployment with environment variables
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key';

/**
 * Create Supabase client for browser usage
 * 
 * Uses public anon key for client-side operations
 * Includes realtime subscriptions for messaging
 */
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

/**
 * Create Supabase client for server-side usage
 * 
 * Uses service role key for privileged operations
 * Used in API routes for database operations
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Database table types
 */

export interface User {
  id: string;
  username: string;
  email: string;
  campus: string;
  avatar_url?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  created_at: string;
  listing?: {
    id: string;
    title: string;
    price: number;
    image?: string;
  };
  buyer?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
  seller?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
  sender?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  image?: string;
  seller_id: string;
  posted_at: string;
}

/**
 * Real-time subscription types
 */

export interface MessageSubscription {
  id: string;
  conversation_id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
  sender?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

/**
 * Helper functions for database operations
 */

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

/**
 * Create or get conversation between buyer and seller for a listing
 */
export async function createOrGetConversation(
  listingId: string,
  buyerId: string,
  sellerId: string
): Promise<Conversation> {
  // Check if conversation already exists
  const { data: existingConversation, error: fetchError } = await supabase
    .from('conversations')
    .select('*')
    .eq('listing_id', listingId)
    .eq('buyer_id', buyerId)
    .eq('seller_id', sellerId)
    .single();

  if (existingConversation && !fetchError) {
    return existingConversation;
  }

  // Create new conversation
  const { data: newConversation, error: createError } = await supabase
    .from('conversations')
    .insert({
      listing_id: listingId,
      buyer_id: buyerId,
      seller_id: sellerId,
    })
    .select()
    .single();

  if (createError) throw createError;
  return newConversation!;
}

/**
 * Get all conversations for a user
 */
export async function getUserConversations(userId: string): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      listing: listings(id, title, price, image),
      buyer: users!buyer_id(id, username, avatar_url),
      seller: users!seller_id(id, username, avatar_url)
    `)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get messages for a conversation
 */
export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender: users!sender_id(id, username, avatar_url)
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Send a message
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  messageText: string
): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      message_text: messageText,
    })
    .select(`
      *,
      sender: users!sender_id(id, username, avatar_url)
    `)
    .single();

  if (error) throw error;
  return data!;
}

/**
 * Subscribe to real-time messages for a conversation
 */
export function subscribeToMessages(
  conversationId: string,
  callback: (message: MessageSubscription) => void
) {
  return supabase
    .channel(`conversation:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload: any) => {
        callback(payload.new as MessageSubscription);
      }
    )
    .subscribe();
}

/**
 * Check if user is participant in conversation
 */
export async function isConversationParticipant(
  userId: string,
  conversationId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('conversations')
    .select('id')
    .eq('id', conversationId)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .single();

  if (error) return false;
  return !!data;
}
