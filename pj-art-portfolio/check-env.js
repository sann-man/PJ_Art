// Simple script to check if environment variables are set before build
import { readFileSync, existsSync } from 'fs';

console.log('=== Environment Variables Check ===');
console.log('VITE_SUPABASE_URL (process.env):', process.env.VITE_SUPABASE_URL || 'NOT SET');
console.log('VITE_SUPABASE_ANON_KEY (process.env):', process.env.VITE_SUPABASE_ANON_KEY ? 'SET (length: ' + process.env.VITE_SUPABASE_ANON_KEY.length + ')' : 'NOT SET');

// Check .env.local file
if (existsSync('.env.local')) {
  const envFile = readFileSync('.env.local', 'utf8');
  const hasURL = envFile.includes('VITE_SUPABASE_URL=');
  const hasKey = envFile.includes('VITE_SUPABASE_ANON_KEY=');
  console.log('.env.local file exists:', hasURL && hasKey ? '✅ Has both variables' : '⚠️  Missing variables');
}

console.log('===================================');

const hasEnvVars = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY;
const hasPlaceholder = process.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co';

if (!hasEnvVars && !existsSync('.env.local')) {
  console.error('⚠️  WARNING: No environment variables found!');
  console.error('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your deployment platform.');
  console.error('Build will continue but will use placeholder values.');
}

if (hasPlaceholder) {
  console.error('⚠️  WARNING: Using placeholder Supabase URL!');
}

console.log(hasEnvVars ? '✅ Environment variables found in process.env' : 'ℹ️  Will use .env.local or vite.config.ts fallback');
