import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tziiohzrsyqyqalwiyqe.supabase.co'
const supabaseAnonKey = 'sb_publishable_SEjKBl9Sut0M8-22Au72ww_lcK3XO5S'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
