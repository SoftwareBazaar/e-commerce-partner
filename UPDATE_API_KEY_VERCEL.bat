@echo off
REM Update Supabase API Key in Vercel
REM This script updates the VITE_SUPABASE_PUBLISHABLE_KEY environment variable

echo.
echo 🔧 Updating Vercel Environment Variables...
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    call npm install -g vercel
)

REM Login to Vercel
echo 🔐 Logging into Vercel...
call vercel login

REM Link project if needed
echo 🔗 Linking project...
call vercel link

REM Remove old API key
echo 🗑️  Removing old API key...
call vercel env rm VITE_SUPABASE_PUBLISHABLE_KEY production

REM Add new API key
echo ➕ Adding new API key...
echo.
echo When prompted, paste this value:
echo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE
echo.
call vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production

echo.
echo ✅ Environment variable updated!
echo.
echo 🚀 Deploying with new API key...
call vercel --prod

echo.
echo ✨ Deployment complete!
echo 🧪 Test your newsletter subscription now!
echo.
pause
