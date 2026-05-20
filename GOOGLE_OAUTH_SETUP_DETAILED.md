# 🔐 Google OAuth Setup - Step by Step

## The Problem
You're seeing Supabase's Google settings, but the "Client IDs" field is empty because you haven't created the credentials in Google Cloud yet.

**The flow is:**
1. Create OAuth credentials in Google Cloud Console ← YOU ARE HERE
2. Copy the Client ID from Google
3. Paste it into Supabase ← THEN YOU'LL DO THIS

---

## Step 1: Go to Google Cloud Console

**URL:** https://console.cloud.google.com/

### If you don't have a Google Cloud account:
1. Click "Create account" or sign in with your Google account
2. Create a new project

### If you already have one:
1. Sign in
2. You'll see your projects

---

## Step 2: Create a New Project (if needed)

1. At the top, click the **Project dropdown**
2. Click **NEW PROJECT**
3. Enter project name: `NeuroAlgo` (or whatever you want)
4. Click **CREATE**
5. Wait for it to create (takes ~30 seconds)

---

## Step 3: Enable Google+ API

1. In the left sidebar, click **APIs & Services**
2. Click **Library**
3. Search for: `Google+ API`
4. Click on it
5. Click **ENABLE**
6. Wait for it to enable

---

## Step 4: Create OAuth 2.0 Credentials

1. Go back to **APIs & Services**
2. Click **Credentials** (in left sidebar)
3. Click **+ Create Credentials** (blue button at top)
4. Select **OAuth client ID**

### Configure the OAuth Consent Screen (first time only)

If you see "OAuth consent screen" - you need to configure it first:

1. Click **CONFIGURE CONSENT SCREEN**
2. Select **External** (for external users)
3. Click **CREATE**
4. Fill in:
   - **App name:** NeuroAlgo
   - **User support email:** neuroalgoforexedge@gmail.com
   - **Developer contact:** neuroalgoforexedge@gmail.com
5. Click **SAVE AND CONTINUE**
6. Skip scopes (click **SAVE AND CONTINUE**)
7. Skip test users (click **SAVE AND CONTINUE**)
8. Review and click **BACK TO DASHBOARD**

---

## Step 5: Create OAuth 2.0 Client ID

1. Click **+ Create Credentials** again
2. Select **OAuth client ID**
3. Choose **Web application**
4. Name it: `NeuroAlgo Web`
5. Under **Authorized redirect URIs**, add these 3 URLs:
   ```
   https://zowfbftptnkypdwsnbkh.supabase.co/auth/v1/callback
   https://neuroalgofxedge.com/auth/v1/callback
   https://localhost:5173/auth/v1/callback
   ```
6. Click **CREATE**

---

## Step 6: Copy Your Client ID

A popup will appear with:
- **Client ID** ← COPY THIS
- **Client Secret** ← COPY THIS TOO (save it somewhere safe)

**Example:**
```
Client ID: 123456789-abcdefghijklmnop.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 7: Paste into Supabase

1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/auth/providers
2. Click **Google**
3. In the **Client IDs** field, paste your Client ID from step 6
4. In the **Client Secret** field, paste your Client Secret
5. Click **SAVE**

---

## ✅ Done!

Your Google Sign-In is now configured!

Test it:
1. Go to: https://neuroalgofxedge.com/auth
2. Click **"Sign in with Google"**
3. Should work! ✅

---

## Troubleshooting

**"Invalid redirect URI"?**
- Make sure you added all 3 redirect URIs in Google Cloud
- Check for typos

**"Client ID not working"?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Try incognito window

**"Google button not showing"?**
- Vercel might still be deploying
- Wait 2-3 minutes and refresh

