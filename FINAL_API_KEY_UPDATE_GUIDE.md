# 🎯 Final Step: Update API Key in Vercel

## Status Update

✅ **URL Fixed:** `zowfbftptnkypdwsnbkh.supabase.co`  
✅ **Project ID Fixed:** `zowfbftptnkypdwsnbkh`  
❌ **API Key:** Still needs update (causing 401 error)

## The Problem

The API key in Vercel is from the old project (with double 'h'). It doesn't match the new project, so Supabase rejects the request with `401 Unauthorized`.

## The Solution

Update **ONE** environment variable in Vercel:

**Variable Name:** `VITE_SUPABASE_PUBLISHABLE_KEY`

**New Value (copy exactly):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE
```

## Method 1: Via Vercel Dashboard (Easiest)

### Step 1: Open Vercel Dashboard
```
https://vercel.com/dashboard
```

### Step 2: Select Your Project
- Look for `e-commerce-partner` project
- Click on it to open

### Step 3: Go to Settings
- Click the **Settings** tab at the top
- You should see a menu on the left side

### Step 4: Find Environment Variables
- In the left sidebar, click **Environment Variables**
- You'll see a list of all environment variables

### Step 5: Find and Edit the API Key
- Look for: `VITE_SUPABASE_PUBLISHABLE_KEY`
- Click the **pencil icon** (edit button) next to it
- A text field will appear

### Step 6: Replace the Value
1. **Select all** the current value (Ctrl+A)
2. **Delete** it
3. **Paste** the new value:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE
   ```
4. Make sure **Production** is selected
5. Click **Save**

### Step 7: Redeploy
After saving:
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots** (•••) button
4. Click **Redeploy**
5. Confirm the redeploy

### Step 8: Wait for Deployment
- Watch the deployment progress
- Should take 2-3 minutes
- Wait for "Deployment Ready" status

### Step 9: Test
- Go to your production site
- Scroll to footer
- Try newsletter subscription
- Should work now! ✅

## Method 2: Via Vercel CLI

### Prerequisites
```bash
# Install Vercel CLI if not already installed
npm install -g vercel
```

### Steps

```bash
# 1. Login to Vercel
vercel login

# 2. Navigate to project
cd e-commerce-partner-main

# 3. Link project (if not already linked)
vercel link

# 4. Remove old API key
vercel env rm VITE_SUPABASE_PUBLISHABLE_KEY production

# 5. Add new API key
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
# When prompted, paste:
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE

# 6. Deploy with new variables
vercel --prod
```

## Method 3: Automated Script

### Windows
```bash
cd e-commerce-partner-main
UPDATE_API_KEY_VERCEL.bat
```

### Mac/Linux
```bash
cd e-commerce-partner-main
chmod +x UPDATE_API_KEY_VERCEL.sh
./UPDATE_API_KEY_VERCEL.sh
```

## Method 4: Via Git Trigger (Simplest)

If you just want to trigger a redeploy without CLI:

```bash
cd e-commerce-partner-main
git commit --allow-empty -m "chore: trigger redeploy with updated API key"
git push origin main
```

Then manually update the API key in Vercel dashboard while it redeploys.

## Verification Checklist

After updating and redeploying:

- [ ] Vercel deployment shows "Ready"
- [ ] No build errors in logs
- [ ] Go to your production site
- [ ] Scroll to footer
- [ ] Enter test email
- [ ] Click subscribe
- [ ] See success message ✅
- [ ] No console errors (F12)
- [ ] Check Supabase dashboard - data appears

## Expected Results

### Before Fix
```
❌ 401 Unauthorized
❌ Invalid API key
❌ Newsletter subscription fails
```

### After Fix
```
✅ 200 OK
✅ Newsletter subscription works
✅ Data saves to Supabase
✅ Success message shows
✅ Welcome email sent
```

## Troubleshooting

### Issue: Still getting 401 error

**Solutions:**
1. Verify you copied the ENTIRE API key (it's very long)
2. Check there are no extra spaces at the beginning or end
3. Make sure you saved the change
4. Verify you redeployed after saving
5. Clear browser cache (Ctrl+Shift+R)
6. Wait 2-3 minutes for CDN to update

### Issue: Can't find the environment variable

**Solutions:**
1. Make sure you're in the correct project
2. Check you're looking at **Production** environment
3. Scroll down - there might be many variables
4. Use Ctrl+F to search for "VITE_SUPABASE"

### Issue: Deployment fails

**Solutions:**
1. Check Vercel build logs for specific error
2. Verify the API key doesn't have extra characters
3. Try redeploying again
4. Check all three Supabase variables are correct

### Issue: Newsletter still not working

**Solutions:**
1. Use test page: `your-domain.vercel.app/test-supabase-connection.html`
2. Check browser console (F12) for specific errors
3. Verify Supabase project is active
4. Check RLS policies allow public insert
5. Verify table schema is correct

## All Required Vercel Environment Variables

Make sure these three are ALL correct:

```env
VITE_SUPABASE_URL=https://zowfbftptnkypdwsnbkh.supabase.co
VITE_SUPABASE_PROJECT_ID=zowfbftptnkypdwsnbkh
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE
```

## Quick Reference

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://zowfbftptnkypdwsnbkh.supabase.co` |
| `VITE_SUPABASE_PROJECT_ID` | `zowfbftptnkypdwsnbkh` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE` |

## Timeline

- **Now:** Update API key (5 minutes)
- **Then:** Redeploy (2-3 minutes)
- **Then:** Test (2 minutes)
- **Total:** ~10 minutes

## 🎯 Summary

This is the **FINAL STEP** to fix the newsletter subscription!

After this:
- ✅ Newsletter will work perfectly
- ✅ No more 401 errors
- ✅ Data will save to Supabase
- ✅ Emails will send

---

## Choose Your Method

1. **Easiest:** Method 1 (Dashboard) - 5 minutes
2. **Fastest:** Method 4 (Git trigger) - 2 minutes
3. **Automated:** Method 3 (Script) - 3 minutes
4. **CLI:** Method 2 (Vercel CLI) - 5 minutes

**Pick one and let's finish this!** 🚀
