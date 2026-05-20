# 🔴 URGENT - Update Vercel NOW

## Status

✅ **Code committed:** Yes (commit 5af755f)
✅ **Pushed to GitHub:** Yes
❌ **Vercel updated:** NO - This is why you're still getting 401 errors

---

## The Problem

Vercel is still using the **old/wrong API key**. The code is deployed, but with the wrong credentials.

---

## The Solution (Do This NOW)

### Step 1: Go to Vercel Dashboard
```
https://vercel.com/dashboard
```

### Step 2: Select Your Project
- Click: `e-commerce-partner`

### Step 3: Go to Settings
- Click: **Settings** tab
- Click: **Environment Variables** in sidebar

### Step 4: Update VITE_SUPABASE_PUBLISHABLE_KEY

**Find:** `VITE_SUPABASE_PUBLISHABLE_KEY`

**Replace with (copy exactly):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
```

**Steps:**
1. Click **Edit** (pencil icon)
2. Select all (Ctrl+A)
3. Delete
4. Paste the key above
5. Make sure **Production** is selected
6. Click **Save**

### Step 5: Update NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

**Find:** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

**Replace with (same key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
```

**Steps:**
1. Click **Edit** (pencil icon)
2. Select all (Ctrl+A)
3. Delete
4. Paste the key above
5. Make sure **Production** is selected
6. Click **Save**

### Step 6: Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **•••** (three dots)
4. Click **Redeploy**
5. Confirm
6. **Wait 2-3 minutes** for build to complete

### Step 7: Test

After deployment is ready:
1. Go to your production site
2. Scroll to footer
3. Enter test email
4. Click subscribe
5. Should work! ✅

---

## Verification

After redeploy, check:
- ✅ No 401 errors in console
- ✅ Newsletter subscription works
- ✅ Success message appears
- ✅ Data in Supabase

---

## Quick Reference

**Correct JWT Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
```

**Variables to update:**
1. `VITE_SUPABASE_PUBLISHABLE_KEY`
2. `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

**Dashboard:**
https://vercel.com/dashboard

---

## Summary

✅ Code committed
✅ Pushed to GitHub
⏳ **Update Vercel (DO THIS NOW)**
⏳ Redeploy
⏳ Test

**Time:** 5 minutes

**Result:** Newsletter works! 🚀
