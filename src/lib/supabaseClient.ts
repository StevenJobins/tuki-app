import { createClient } from '@supabase/supabase-js'

// Supabase project: Tuki-App (eu-west-1)
// The anon key is safe to expose in client-side code (RLS protects data)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tziiohzrsyqyqalwiyqe.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWlvaHpyc3lxeXFhbHdpeXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTE2ODEsImV4cCI6MjA4OTkyNzY4MX0.VOJERvErjjXfbgelpn_-c8EoYFh2bcQJduqbUoo8fPs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
