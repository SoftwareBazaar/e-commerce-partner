#!/bin/bash

# Update Supabase API Key in Vercel
# This script updates the VITE_SUPABASE_PUBLISHABLE_KEY environment variable

echo "🔧 Updating Vercel Environment Variables..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel
echo "🔐 Logging into Vercel..."
vercel login

# Link project if needed
echo "🔗 Linking project..."
vercel link

# Remove old API key
echo "🗑️  Removing old API key..."
vercel env rm VITE_SUPABASE_PUBLISHABLE_KEY production

# Add new API key
echo "➕ Adding new API key..."
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production

# When prompted, paste this value:
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE

echo ""
echo "✅ Environment variable updated!"
echo ""
echo "🚀 Deploying with new API key..."
vercel --prod

echo ""
echo "✨ Deployment complete!"
echo "🧪 Test your newsletter subscription now!"
