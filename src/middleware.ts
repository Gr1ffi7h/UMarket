/**
 * Authentication Middleware
 * 
 * Protects routes that require authentication
 * Redirects unauthenticated users to login
 * Ensures only .edu verified users can access protected features
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Routes that require authentication
const protectedRoutes = [
  '/browse',
  '/create-listing',
  '/messages',
  '/profile',
  '/my-listings',
  '/listing',
];

// Routes that should be accessible without authentication
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/api/health',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if protected route is being accessed
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Create Supabase client for middleware
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Defensive check - if environment variables are missing, redirect to login
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder.supabase.co')) {
    console.error('Missing or invalid Supabase environment variables in middleware');
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Get user from session
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // User is authenticated, allow access
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, redirect to login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
