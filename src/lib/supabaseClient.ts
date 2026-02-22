/**
 * Supabase Client Configuration
 * 
 * Handles database connection and authentication
 * Configured for Vercel deployment with environment variables
 */

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
