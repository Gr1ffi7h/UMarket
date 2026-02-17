/**
 * Server-Side Utilities
 * 
 * Server-only functions for database operations, API calls, etc.
 * These functions should never be imported in client components
 */

import { ApiResponse } from '@/types';

/**
 * Create a standardized API response
 * Server-side only function for API routes
 */
export function createApiResponse<T>(
  data?: T,
  error?: string,
  message?: string,
  status: 'success' | 'error' = 'success'
): ApiResponse<T> {
  return {
    success: status === 'success',
    data,
    error,
    message,
  };
}

/**
 * Handle API errors safely
 * Server-side only error handling
 */
export function handleApiError(error: unknown): ApiResponse {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    return createApiResponse(undefined, error.message, 'Internal server error', 'error');
  }
  
  return createApiResponse(undefined, 'Unknown error occurred', 'Internal server error', 'error');
}

/**
 * Validate request method
 * Server-side only validation
 */
export function validateMethod(request: Request, allowedMethods: string[]): ApiResponse {
  if (!allowedMethods.includes(request.method)) {
    return createApiResponse(
      undefined,
      `Method ${request.method} not allowed. Allowed methods: ${allowedMethods.join(', ')}`,
      'Method not allowed',
      'error'
    );
  }
  
  return createApiResponse(null, undefined, 'Method validated');
}

/**
 * Get client IP address safely
 * Server-side only function
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}

/**
 * Rate limiting helper (placeholder for future implementation)
 * Server-side only rate limiting
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000
): Promise<{ allowed: boolean; remaining: number }> {
  // This is a placeholder implementation
  // In a real application, you would use Redis or a database
  // to track rate limits across serverless function invocations
  
  console.log(`Rate limit check for ${identifier}: ${limit} requests per ${windowMs}ms`);
  
  return {
    allowed: true,
    remaining: limit - 1,
  };
}

/**
 * Safe JSON parsing with error handling
 * Server-side only utility
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('JSON parsing error:', error);
    return fallback;
  }
}
