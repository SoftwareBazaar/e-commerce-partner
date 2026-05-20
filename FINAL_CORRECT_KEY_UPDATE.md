# ✅ FINAL - Use the CORRECT Anon Public JWT Key

## 🎯 The Correct Key (From Supabase Dashboard)

**Type:** Anon Public Key (JWT format)

**Value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
```

---

## Why This Key?

✅ **Anon Public Key** - For client-side authentication
✅ **JWT Format** - Correct format for Supabase
✅ **From Dashboard** - Verified from Supabase API settings
✅ **Has correct role** - `"role":"anon"` in the JWT

---

## Update in Vercel

### Variable 1: VITE_SUPABASE_PUBLISHABLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
```

### Variable 2: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
```

---

## Step-by-Step Update

### 1. Go to Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2. Select Project
- Click: `e-commerce-partner`

### 3. Go to Settings
- Click: **Settings** tab
- Click: **Environment Variables**

### 4. Update VITE_SUPABASE_PUBLISHABLE_KEY
- Find the variable
- Click **Edit** (pencil icon)
- Replace with the JWT key above
- Make sure **Production** is selected
- Click **Save**

### 5. Update NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- Find the variable
- Click **Edit** (pencil icon)
- Replace with the JWT key above
- Make sure **Production** is selected
- Click **Save**

### 6. Redeploy
1. Go to **Deployments** tab
2. Click **•••** on latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

---

## All Correct Vercel Variables (Final)

```env
VITE_SUPABASE_URL=https://zowfbftptnkypdwsnbkh.supabase.co
VITE_SUPABASE_PROJECT_ID=zowfbftptnkypdwsnbkh
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAyMjEsImV4cCI6MjA5MzU0NjIyMX0.HgnIYibSwygMbCB3aBqtnZUsISjk0OSs1mxvatEJofcA
```

---

## Test After Update

### 1. Wait for Deployment
- Check Vercel dashboard
- Wait for "Deployment Ready"

### 2. Test Newsletter
- Go to your production site
- Scroll to footer
- Enter test email
- Click subscribe
- Should see success message ✅

### 3. Check Console
- Open DevTools (F12)
- Go to Console tab
- Should see NO errors
- Should see successful API calls

### 4. Verify in Supabase
- Go to Supabase dashboard
- Open `newsletter_subscribers` table
- Should see your test email

---

## Expected Result

### Before
```
❌ 401 Unauthorized
❌ Invalid API key
```

### After
```
✅ Newsletter works
✅ Data saves
✅ Success message
```

---

## Summary

✅ **Correct Anon Public JWT key identified**
✅ **Local .env updated**
✅ **Committed and pushed**
⏳ **Update Vercel (FINAL STEP)**
⏳ **Redeploy**
⏳ **Test**

---

## 👉 Next Action

1. Go to Vercel dashboard
2. Update both API key variables with the JWT key above
3. Redeploy
4. Test newsletter subscription

**This is the final step!** 🚀
