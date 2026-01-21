import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwNjg0MDAsImV4cCI6MTk2MTY0NDQwMH0.placeholder';

console.log('[SUPABASE DEBUG] Initializing Supabase client...');
console.log('[SUPABASE DEBUG] URL:', supabaseUrl);
console.log('[SUPABASE DEBUG] Anon Key exists:', !!supabaseAnonKey);
console.log('[SUPABASE DEBUG] Anon Key length:', supabaseAnonKey?.length);
console.log('[SUPABASE DEBUG] Using placeholder?', supabaseUrl === 'https://placeholder.supabase.co');

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('[SUPABASE DEBUG] WARNING: Missing environment variables!');
  console.error('[SUPABASE DEBUG] Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deployment platform');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 



