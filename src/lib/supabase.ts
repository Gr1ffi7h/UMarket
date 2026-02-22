/**
 * Supabase Client Configuration
 * 
 * Handles database connection, authentication, and real-time subscriptions
 * Configured for Vercel deployment with environment variables
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Defensive check - if environment variables are missing, return null
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder.supabase.co')) {
  console.error('Missing or invalid Supabase environment variables');
}

/**
 * Create Supabase client for browser usage
 * 
 * Uses public anon key for client-side operations
 * Includes realtime subscriptions for messaging
 */
export const supabase = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder.supabase.co')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Create Supabase client for server-side usage
 * 
 * Uses service role key for privileged operations
 * Used in API routes for database operations
 */
export const supabaseAdmin = supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY && !supabaseUrl.includes('placeholder.supabase.co')
  ? createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null;

/**
 * Database table types
 */

export interface User {
  id: string;
  full_name?: string;
  role?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  created_at: string;
}

/**
 * Real-time subscription types
 */

export interface MessageSubscription {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

/**
 * Helper functions for database operations
 */

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }
  return user;
}

/**
 * Get all listings
 */
export async function getAllListings(): Promise<Listing[]> {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

/**
 * Create a new listing
 */
export async function createListing(listing: Omit<Listing, 'id' | 'created_at'>): Promise<Listing | null> {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('listings')
      .insert(listing)
      .select()
      .single();

    if (error) {
      console.error('Error creating listing:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

/**
 * Get messages for a conversation
 */
export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching conversation messages:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Database error in getConversationMessages:', error);
    return [];
  }
}

/**
 * Send a message
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
): Promise<Message | null> {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content: content,
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }
    return data!;
  } catch (error) {
    console.error('Database error in sendMessage:', error);
    return null;
  }
}

/**
 * Subscribe to real-time messages for a conversation
 */
export function subscribeToMessages(
  conversationId: string,
  callback: (message: MessageSubscription) => void
) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

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
