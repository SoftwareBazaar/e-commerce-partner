# 🔧 Update Vercel Environment Variables

## 🔴 CRITICAL: Environment Variables Need Update

Your code has been deployed, but the environment variables in Vercel still have the old (incorrect) Supabase URL.

### What Needs to Change

```diff
- VITE_SUPABASE_URL=https://zowfbftptnkypdwsnbkhh.supabase.co  ❌ (wrong)
+ VITE_SUPABASE_URL=https://zowfbftptnkypdwsnbkh.supabase.co   ✅ (correct)

- VITE_SUPABASE_PROJECT_ID=zowfbftptnkypdwsnbkhh  ❌ (wrong)
+ VITE_SUPABASE_PROJECT_ID=zowfbftptnkypdwsnbkh   ✅ (correct)
```

**The difference:** Remove one 'h' from the end (double 'h' → single 'h')

## 🚀 Quick Fix - Via Vercel Dashboard (Recommended)

### Step 1: Go to Vercel
```
https://vercel.com/dashboard
```

### Step 2: Select Your Project
- Look for: `e-commerce-partner` or similar name
- Click on it

### Step 3: Go to Settings
- Click **Settings** tab at the top
- Click **Environment Variables** in the left sidebar

### Step 4: Update Variables
Find these two variables and edit them:

**Variable 1: VITE_SUPABASE_URL**
- Current value: `https://zowfbftptnkypdwsnbkhh.supabase.co`
- New value: `https://zowfbftptnkypdwsnbkh.supabase.co`
- Click **Save**

**Variable 2: VITE_SUPABASE_PROJECT_ID**
- Current value: `zowfbftptnkypdwsnbkhh`
- New value: `zowfbftptnkypdwsnbkh`
- Click **Save**

### Step 5: Redeploy
After updating the variables:
1. Go to **Deployments** tab
2. Click the **three dots** (•••) on the latest deployment
3. Click **Redeploy**
4. Confirm the redeploy

**OR** just push a small change to trigger auto-deploy:
```bash
cd e-commerce-partner-main
git commit --allow-empty -m "chore: trigger redeploy with updated env vars"
git push origin main
```

## 🖥️ Alternative - Via Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Link Project (if not already linked)
```bash
cd e-commerce-partner-main
vercel link
```

### Update Environment Variables
```bash
# Remove old variables
vercel env rm VITE_SUPABASE_URL production
vercel env rm VITE_SUPABASE_PROJECT_ID production

# Add new variables
vercel env add VITE_SUPABASE_URL production
# When prompted, enter: https://zowfbftptnkypdwsnbkh.supabase.co

vercel env add VITE_SUPABASE_PROJECT_ID production
# When prompted, enter: zowfbftptnkypdwsnbkh
```

### Deploy with New Variables
```bash
vercel --prod
```

## 📋 Verification Checklist

After updating and redeploying:

### 1. Check Build Logs
- Go to Vercel dashboard
- Click on latest deployment
- Check logs for any errors
- Verify build completed successfully

### 2. Test Connection Page
```
https://your-domain.vercel.app/test-supabase-connection.html
```

Should show:
- ✅ Connection Successful
- ✅ Table Access Successful
- ✅ Insert Successful

### 3. Test Newsletter
- Go to your production site
- Scroll to footer
- Enter test email
- Click subscribe
- Should work without errors!

### 4. Check Browser Console
- Open DevTools (F12)
- Go to Console tab
- Should see no errors
- Network tab should show successful API calls

### 5. Verify in Supabase
- Go to Supabase dashboard
- Open `newsletter_subscribers` table
- Should see test email entry

## 🎯 Quick Commands Summary

```bash
# Via Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Select project → Settings → Environment Variables
3. Edit VITE_SUPABASE_URL and VITE_SUPABASE_PROJECT_ID
4. Redeploy

# Via CLI
vercel login
cd e-commerce-partner-main
vercel env rm VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_URL production
# Enter: https://zowfbftptnkypdwsnbkh.supabase.co
vercel env rm VITE_SUPABASE_PROJECT_ID production
vercel env add VITE_SUPABASE_PROJECT_ID production
# Enter: zowfbftptnkypdwsnbkh
vercel --prod

# Trigger redeploy via Git
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

## 🆘 Troubleshooting

### Issue: Can't find environment variables in Vercel

**Solution:**
- Make sure you're in the correct project
- Check all environments: Production, Preview, Development
- Variables might be in a different environment

### Issue: Changes not taking effect

**Solution:**
1. Verify variables were saved
2. Make sure you redeployed after updating
3. Clear browser cache (Ctrl+Shift+R)
4. Wait 2-3 minutes for CDN to update

### Issue: Build fails after updating

**Solution:**
1. Check build logs for specific error
2. Verify variable names are correct (case-sensitive)
3. Ensure values don't have extra spaces or quotes
4. Check all required variables are set

## 📞 Support

If you need help:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Test with the diagnostic page first

---

## Summary

✅ **Code deployed** to GitHub  
⏳ **Action needed:** Update Vercel environment variables  
⏳ **Then:** Redeploy and test  

**Estimated time:** 5 minutes

**Start here:** Go to https://vercel.com/dashboard
