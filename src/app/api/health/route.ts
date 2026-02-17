/**
 * Health Check API Route
 * 
 * Simple health check endpoint for monitoring and load balancers
 * Demonstrates serverless API route structure
 */

import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse, validateMethod } from '@/server/utils';

/**
 * GET /api/health
 * 
 * Health check endpoint
 * Returns application status and environment info
 */
export async function GET(request: NextRequest) {
  try {
    // Validate request method
    const methodValidation = validateMethod(request, ['GET']);
    if (!methodValidation.success) {
      return NextResponse.json(methodValidation, { status: 405 });
    }

    // Get environment info safely
    const envInfo = {
      nodeEnv: process.env.NODE_ENV || 'unknown',
      appUrl: process.env.APP_URL || 'not-set',
      timestamp: new Date().toISOString(),
    };

    // Create success response
    const response = createApiResponse({
      status: 'healthy',
      version: '1.0.0',
      environment: envInfo,
      uptime: process.uptime(),
    });

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('Health check error:', error);
    
    const errorResponse = createApiResponse(
      undefined,
      'Health check failed',
      'Internal server error',
      'error'
    );

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Handle other HTTP methods
 */
export async function POST(request: NextRequest) {
  const methodValidation = validateMethod(request, ['GET']);
  return NextResponse.json(methodValidation, { status: 405 });
}

export async function PUT(request: NextRequest) {
  const methodValidation = validateMethod(request, ['GET']);
  return NextResponse.json(methodValidation, { status: 405 });
}

export async function DELETE(request: NextRequest) {
  const methodValidation = validateMethod(request, ['GET']);
  return NextResponse.json(methodValidation, { status: 405 });
}

export async function PATCH(request: NextRequest) {
  const methodValidation = validateMethod(request, ['GET']);
  return NextResponse.json(methodValidation, { status: 405 });
}
