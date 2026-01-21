import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('[SUPABASE DEBUG] Initializing Supabase client...');
console.log('[SUPABASE DEBUG] URL:', supabaseUrl);
console.log('[SUPABASE DEBUG] Anon Key exists:', !!supabaseAnonKey);
console.log('[SUPABASE DEBUG] Anon Key length:', supabaseAnonKey?.length);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[SUPABASE DEBUG] ERROR: Missing environment variables!');
  console.error('[SUPABASE DEBUG] Make sure .env.local has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  throw new Error('Supabase environment variables are not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 



