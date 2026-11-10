import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// Singleton instance — one client shared across the whole browser session.
// Creating multiple clients causes auth-lock contention ("Lock was released
// because another request stole it") and intermittent fetch failures.
let browserClient: SupabaseClient | undefined

export function createClient() {
  if (browserClient) return browserClient

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://nejwfgyyailjbifcemow.supabase.co'
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5landmZ3l5YWlsamJpZmNlbW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4ODYxMTUsImV4cCI6MjEwOTQ2MjExNX0.864mSAGYA6-d0EJ6Kd9RdVcMYjkXS_yoJyONS7awtpg'

  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey)

  return browserClient
}
