/**
 * Environment Variable Utilities
 * 
 * Safe environment variable handling with fallbacks
 * Prevents runtime errors from missing environment variables
 */

/**
 * Get environment variable with type safety and fallback
 */
export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  
  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback;
    }
    
    throw new Error(`Required environment variable ${key} is not set`);
  }
  
  return value;
}

/**
 * Get environment variable with optional fallback (returns undefined if not found)
 */
export function getOptionalEnvVar(key: string): string | undefined {
  return process.env[key];
}

/**
 * Check if we're in development environment
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if we're in test environment
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

/**
 * Get the application URL with proper fallback
 */
export function getAppUrl(): string {
  return getEnvVar('APP_URL', isDevelopment() ? 'http://localhost:3000' : 'https://umarket.vercel.app');
}

/**
 * Get NextAuth configuration
 */
export function getNextAuthConfig() {
  return {
    secret: getEnvVar('NEXTAUTH_SECRET'),
    url: getEnvVar('NEXTAUTH_URL', getAppUrl()),
  };
}

/**
 * Validate required environment variables on startup
 */
export function validateEnvVars(): void {
  const requiredVars = ['NEXTAUTH_SECRET'];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
}
