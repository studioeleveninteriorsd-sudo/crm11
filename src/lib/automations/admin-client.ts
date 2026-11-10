import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy, shared service-role client for automation engine work.
// Mirrors the pattern used by the webhook handler
// (src/app/api/whatsapp/webhook/route.ts).
let _adminClient: SupabaseClient | null = null

export function supabaseAdmin(): SupabaseClient {
  if (!_adminClient) {
    const url =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://nejwfgyyailjbifcemow.supabase.co'
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5landmZ3l5YWlsamJpZmNlbW93Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5Mzg4NjExNSwiZXhwIjoyMTA5NDYyMTE1fQ.oU_EHnjV86I2Nf4b8-0U8v3g-xpRihKHH6iE3qomj3c'
    _adminClient = createClient(url, key)
  }
  return _adminClient
}
