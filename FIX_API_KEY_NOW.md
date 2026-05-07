# 🔴 URGENT: Fix API Key in Vercel

## Current Error

```
401 (Unauthorized)
Error: Invalid API key
Hint: Double check your Supabase `anon` or `service_role` API key.
```

## The Problem

✅ **URL is now correct:** `https://zowfbftptnkypdwsnbkh.supabase.co`  
❌ **API key is wrong:** The `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel doesn't match

## The Solution

You need to update **ONE MORE** environment variable in Vercel:

### Update This Variable

**Variable Name:** `VITE_SUPABASE_PUBLISHABLE_KEY`

**Current Value in Vercel:** (Old key with wrong project reference)

**New Value (Copy this exactly):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE
```

## Quick Fix Steps

### 1. Go to Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2. Select Your Project
- Click on your `e-commerce-partner` project

### 3. Update Environment Variable
1. Go to **Settings** → **Environment Variables**
2. Find: `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Click **Edit** (pencil icon)
4. Replace with the new value above
5. Make sure it applies to **Production** environment
6. Click **Save**

### 4. Redeploy
After saving:
1. Go to **Deployments** tab
2. Click **•••** on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

### 5. Test Again
After redeployment completes:
- Go to your site
- Try newsletter subscription
- Should work now! ✅

## Alternative: Get Fresh Keys from Supabase

If you want to be 100% sure, get fresh keys directly from Supabase:

### Step 1: Go to Supabase Dashboard
```
https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh
```

### Step 2: Get API Keys
1. Click on **Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. You'll see:
   - **Project URL:** `https://zowfbftptnkypdwsnbkh.supabase.co`
   - **anon public key:** (Long JWT token starting with `eyJ...`)
   - **service_role secret key:** (Another long token)

### Step 3: Copy the Keys
Copy the **anon public** key (this is your `VITE_SUPABASE_PUBLISHABLE_KEY`)

### Step 4: Update in Vercel
Use the key you just copied from Supabase dashboard

## Summary of All Required Vercel Environment Variables

Make sure these are ALL correct in Vercel:

```env
VITE_SUPABASE_URL=https://zowfbftptnkypdwsnbkh.supabase.co
VITE_SUPABASE_PROJECT_ID=zowfbftptnkypdwsnbkh
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE
```

## Verification

After updating and redeploying:

### ✅ Success Indicators
- No 401 Unauthorized errors
- Newsletter subscription works
- Data saves to Supabase
- Success message appears

### ❌ If Still Failing
1. Double-check you copied the ENTIRE key (it's very long)
2. Make sure there are no extra spaces
3. Verify you saved and redeployed
4. Clear browser cache (Ctrl+Shift+R)
5. Check Supabase project is active

## Quick Commands

### Trigger Redeploy via Git (Alternative)
```bash
cd e-commerce-partner-main
git commit --allow-empty -m "chore: trigger redeploy with updated API key"
git push origin main
```

### Via Vercel CLI
```bash
vercel env rm VITE_SUPABASE_PUBLISHABLE_KEY production
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
# Paste the key when prompted
vercel --prod
```

---

## 🎯 Action Required

1. ✅ URL updated (done)
2. ✅ Project ID updated (done)
3. ⏳ **NOW:** Update `VITE_SUPABASE_PUBLISHABLE_KEY`
4. ⏳ Redeploy
5. ⏳ Test

**Estimated time:** 5 minutes

**This is the last step!** 🚀
