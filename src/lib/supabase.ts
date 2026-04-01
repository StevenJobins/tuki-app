import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tziiohzrsyqyqalwiyqe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWlvaHpyc3lxeXFhbHdpeXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTE2ODEsImV4cCI6MjA4OTkyNzY4MX0.VOJERvErjjXfbgelpn_-c8EoYFh2bcQJduqbUoo8fPs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'implicit',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Use a simple no-op lock to avoid navigator.locks deadlocks
    lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<any>) => {
      return fn()
    },
  }
})
