# 🔧 Fix Google OAuth Consent Screen

## The Problem

Google is showing "Sign in to zowfbftptnkypdwsnbkh.supabase.co" instead of "Sign in to NeuroAlgo"

This is because the OAuth Consent Screen isn't configured with your app name.

---

## Solution: Update OAuth Consent Screen

### Step 1: Go to Google Cloud Console
**URL:** https://console.cloud.google.com/

### Step 2: Go to OAuth Consent Screen
- Left sidebar → **OAuth consent screen**

### Step 3: Edit the Consent Screen

Click **EDIT APP** button

### Step 4: Update App Information

**App name:**
```
NeuroAlgo
```

**User support email:**
```
neuroalgoforexedge@gmail.com
```

**App logo (optional):**
- You can upload your logo if you want

### Step 5: Save and Continue

Click **SAVE AND CONTINUE**

Skip the rest (Scopes, Test users)

Click **SAVE AND CONTINUE** until done

---

## Step 6: Test Again

1. Go to: https://neuroalgofxedge.com/auth
2. Click **"Sign in with Google"**
3. Now it should say: **"Sign in to NeuroAlgo"** ✅
4. Click **Continue**
5. Should redirect to dashboard

---

## Why This Happened

- Google OAuth Consent Screen shows the app name to users
- It was showing Supabase because we didn't configure the app name
- Now it will show "NeuroAlgo" instead

---

## After This Fix

Your Google Sign-In will look professional and show your brand name!

