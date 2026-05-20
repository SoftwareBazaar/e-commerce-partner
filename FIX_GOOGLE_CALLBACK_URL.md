# 🔧 Fix Google Sign-In Callback URL

## The Problem

Google is redirecting to `localhost:3000` instead of your live site because the callback URL in Google Cloud needs to include your production domain.

---

## Solution: Add Production Callback URL to Google Cloud

### Step 1: Go to Google Cloud Console
**URL:** https://console.cloud.google.com/

### Step 2: Go to Credentials
- Left sidebar → **Credentials**

### Step 3: Find Your OAuth Client
- Look for: `NeuroAlgo Web` (or your web application)
- Click on it to edit

### Step 4: Add Production Redirect URI

Under **Authorized redirect URIs**, add this:
```
https://neuroalgofxedge.com/auth/v1/callback
```

You should now have 3 URIs:
1. `https://zowfbftptnkypdwsnbkh.supabase.co/auth/v1/callback`
2. `https://neuroalgofxedge.com/auth/v1/callback` ← ADD THIS
3. `https://localhost:5173/auth/v1/callback`

### Step 5: Save in Google Cloud
- Click **SAVE**

---

## Also Update Supabase Callback URL

Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/auth/providers

Under **Google** settings:

**Callback URL (for OAuth)** should be:
```
https://neuroalgofxedge.com/auth/v1/callback
```

(Not localhost)

Click **SAVE**

---

## Test Again

1. Go to: https://neuroalgofxedge.com/auth
2. Click **"Sign in with Google"**
3. Should redirect to dashboard on your live site
4. ✅ Success!

---

## Why This Happened

- Google was configured with only the Supabase callback URL
- When you click "Sign in with Google", it needs to know where to redirect after authentication
- We need to add your production domain to Google's authorized URIs

