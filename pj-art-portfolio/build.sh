#!/bin/bash

echo "=== Custom Build Script ==="
echo "Checking environment variables..."

# Export env vars if they exist in the environment
if [ -n "$VITE_SUPABASE_URL" ]; then
  echo "✅ VITE_SUPABASE_URL is set"
  export VITE_SUPABASE_URL=$VITE_SUPABASE_URL
else
  echo "❌ VITE_SUPABASE_URL is NOT set"
fi

if [ -n "$VITE_SUPABASE_ANON_KEY" ]; then
  echo "✅ VITE_SUPABASE_ANON_KEY is set (length: ${#VITE_SUPABASE_ANON_KEY})"
  export VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
else
  echo "❌ VITE_SUPABASE_ANON_KEY is NOT set"
fi

echo "=========================="

# Run the actual build
npm run build:skip-check
