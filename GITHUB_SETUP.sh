#!/bin/bash

# GitHub & Supabase Setup Script
# This script helps you set up GitHub integration and Supabase connection

echo "🚀 Robert Trading Tools - GitHub & Supabase Setup"
echo "=================================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Initialize git repository
echo "📝 Initializing Git repository..."
git init
echo "✅ Git repository initialized"
echo ""

# Add all files
echo "📦 Adding files to git..."
git add .
echo "✅ Files added"
echo ""

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Robert Trading Tools Platform with Supabase, SendGrid, and Vercel integration"
echo "✅ Initial commit created"
echo ""

# Get GitHub username and repository name
echo "🔗 GitHub Configuration"
echo "======================"
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name (default: robert-trading-tools): " REPO_NAME
REPO_NAME=${REPO_NAME:-robert-trading-tools}

echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository with the name: $REPO_NAME"
echo "3. Do NOT initialize with README, .gitignore, or license"
echo "4. Click 'Create repository'"
echo ""
read -p "Press Enter after creating the repository on GitHub..."

# Add remote repository
echo ""
echo "🔗 Adding remote repository..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
echo "✅ Remote repository added"
echo ""

# Rename branch to main if needed
echo "🌿 Setting up main branch..."
git branch -M main
echo "✅ Branch renamed to main"
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main
echo "✅ Pushed to GitHub successfully!"
echo ""

# Supabase setup
echo "🗄️  Supabase Configuration"
echo "========================="
echo ""
echo "📋 Next steps for Supabase:"
echo "1. Install Supabase CLI: npm install -g supabase"
echo "2. Login: supabase login"
echo "3. Link project: supabase link --project-ref zowfbftptnkypdwsnbkhh"
echo "4. Run migrations: supabase migration up"
echo "5. Deploy function: supabase functions deploy send-email"
echo ""

# Vercel setup
echo "🚀 Vercel Configuration"
echo "======================="
echo ""
echo "📋 Next steps for Vercel:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click on your project"
echo "3. Go to Settings > Git"
echo "4. Click 'Connect Git Repository'"
echo "5. Select your GitHub repository: $GITHUB_USERNAME/$REPO_NAME"
echo "6. Add environment variables from .env file"
echo "7. Deployments will now happen automatically on git push!"
echo ""

echo "✨ Setup complete!"
echo ""
echo "📚 For detailed instructions, see: GITHUB_SUPABASE_SETUP.md"
