/**
 * Messages API Route
 * 
 * Handles message sending and retrieval
 * Serverless compatible with Vercel deployment
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getCurrentUser, isConversationParticipant } from '@/lib/supabase';

/**
 * GET /api/messages?conversationId=xxx
 * 
 * Returns all messages for a specific conversation
 * Validates that user is a participant
 */
export async function GET(request: NextRequest) {
  try {
    // Get current authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get conversation ID from query params
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Missing conversationId parameter' },
        { status: 400 }
      );
    }

    // Verify user is participant in conversation
    const isParticipant = await isConversationParticipant(user.id, conversationId);
    if (!isParticipant) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get messages for the conversation
    const { data: messages, error } = await supabaseAdmin
      .from('messages')
      .select(`
        *,
        sender: users!sender_id(id, username, avatar_url)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages: messages || [] });
  } catch (error) {
    console.error('Messages GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/messages
 * 
 * Sends a new message to a conversation
 * Validates that user is a participant
 */
export async function POST(request: NextRequest) {
  try {
    // Get current authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { conversationId, messageText } = body;

    // Validate required fields
    if (!conversationId || !messageText) {
      return NextResponse.json(
        { error: 'Missing required fields: conversationId, messageText' },
        { status: 400 }
      );
    }

    // Validate message text
    if (messageText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    if (messageText.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long (max 1000 characters)' },
        { status: 400 }
      );
    }

    // Verify user is participant in conversation
    const isParticipant = await isConversationParticipant(user.id, conversationId);
    if (!isParticipant) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Send message
    const { data: newMessage, error } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        message_text: messageText.trim(),
      })
      .select(`
        *,
        sender: users!sender_id(id, username, avatar_url)
      `)
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: newMessage! });
  } catch (error) {
    console.error('Messages POST API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
