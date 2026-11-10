import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy, shared service-role client for the Flows engine.
// Mirrors src/lib/automations/admin-client.ts — same shape so anyone
// reading either file picks up the convention immediately.
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
