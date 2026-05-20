# Vercel Build Fix - May 20, 2026

## Issue
Build failure on Vercel with error: `sh: line 1: vite: command not found`

## Solution Applied

Updated `vercel.json` with improved build configuration:

```json
{
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "installCommand": "npm install --legacy-peer-deps",
  "outputDirectory": "dist",
  "nodeVersion": "20.x",
  "rewrites": [...]
}
```

## Changes Made:
1. ✅ Added `--legacy-peer-deps` flag (handles peer dependency conflicts)
2. ✅ Explicit `installCommand` for npm installation
3. ✅ Specified Node.js version 20.x
4. ✅ Ensured build order (install → build)

## What to Do Next:

### 1. Verify Local Build
```bash
cd e-commerce-partner-main
npm install --legacy-peer-deps
npm run build
```

If successful, you should see:
- `dist/` folder created
- No TypeScript errors
- No missing dependencies

### 2. Push Changes
```bash
git add vercel.json
git commit -m "Fix Vercel build configuration"
git push
```

### 3. Trigger Rebuild on Vercel
- Go to Vercel dashboard
- Click on your project
- Go to "Deployments"
- Click "Redeploy" on the latest deployment
- OR wait for the push to auto-trigger

### 4. Monitor Build
- Watch the build log for errors
- Should see "✓ Build completed successfully"

## If Build Still Fails:

**Option A - Clean Installation:**
```bash
# Remove lock files
rm package-lock.json

# Reinstall
npm install --legacy-peer-deps
npm run build
```

**Option B - Check for Missing Vite:**
```bash
npm list vite
npm install vite --save-dev
```

**Option C - Environment Issue:**
Check Vercel environment variables:
- Go to Project Settings → Environment Variables
- Ensure no conflicting NODE_OPTIONS
- Ensure NODE_ENV is not explicitly set to conflict with build

## Alternative Fix (If Above Doesn't Work):

Update Vercel settings directly:
1. Go to Vercel Dashboard
2. Project Settings → Build & Development Settings
3. Set:
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Output Directory**: `dist`
   - **Node.js Version**: `20.x`
4. Click Save and redeploy

## Status
- ✅ vercel.json updated
- ⏳ Awaiting build verification
- 📝 Changes committed and ready to push

---
**Next Step**: Run local build test or push to Vercel to trigger rebuild
