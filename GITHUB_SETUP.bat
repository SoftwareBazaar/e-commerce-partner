@echo off
REM GitHub & Supabase Setup Script for Windows
REM This script helps you set up GitHub integration and Supabase connection

echo.
echo 🚀 Robert Trading Tools - GitHub ^& Supabase Setup
echo ==================================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Initialize git repository
echo 📝 Initializing Git repository...
git init
echo ✅ Git repository initialized
echo.

REM Add all files
echo 📦 Adding files to git...
git add .
echo ✅ Files added
echo.

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: Robert Trading Tools Platform with Supabase, SendGrid, and Vercel integration"
echo ✅ Initial commit created
echo.

REM Get GitHub username and repository name
echo 🔗 GitHub Configuration
echo ======================
set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter your repository name (default: robert-trading-tools): "
if "%REPO_NAME%"=="" set REPO_NAME=robert-trading-tools

echo.
echo 📋 Next steps:
echo 1. Go to https://github.com/new
echo 2. Create a new repository with the name: %REPO_NAME%
echo 3. Do NOT initialize with README, .gitignore, or license
echo 4. Click 'Create repository'
echo.
pause

REM Add remote repository
echo.
echo 🔗 Adding remote repository...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
echo ✅ Remote repository added
echo.

REM Rename branch to main if needed
echo 🌿 Setting up main branch...
git branch -M main
echo ✅ Branch renamed to main
echo.

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push -u origin main
if errorlevel 1 (
    echo ❌ Push failed. Please check your credentials and try again.
    pause
    exit /b 1
)
echo ✅ Pushed to GitHub successfully!
echo.

REM Supabase setup
echo 🗄️  Supabase Configuration
echo =========================
echo.
echo 📋 Next steps for Supabase:
echo 1. Install Supabase CLI: npm install -g supabase
echo 2. Login: supabase login
echo 3. Link project: supabase link --project-ref zowfbftptnkypdwsnbkhh
echo 4. Run migrations: supabase migration up
echo 5. Deploy function: supabase functions deploy send-email
echo.

REM Vercel setup
echo 🚀 Vercel Configuration
echo =======================
echo.
echo 📋 Next steps for Vercel:
echo 1. Go to https://vercel.com/dashboard
echo 2. Click on your project
echo 3. Go to Settings ^> Git
echo 4. Click 'Connect Git Repository'
echo 5. Select your GitHub repository: %GITHUB_USERNAME%/%REPO_NAME%
echo 6. Add environment variables from .env file
echo 7. Deployments will now happen automatically on git push!
echo.

echo ✨ Setup complete!
echo.
echo 📚 For detailed instructions, see: GITHUB_SUPABASE_SETUP.md
echo.
pause
