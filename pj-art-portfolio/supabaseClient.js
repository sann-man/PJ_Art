import {createClient} from '@supabase/supabase-js'

// Use runtime env vars for SSR, fallback to build-time env vars for client
const supabaseUrl = typeof process !== 'undefined' && process.env.SUPABASE_URL
  ? process.env.SUPABASE_URL
  : import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonKey = typeof process !== 'undefined' && process.env.SUPABASE_ANON_KEY
  ? process.env.SUPABASE_ANON_KEY
  : import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 



