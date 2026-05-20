# 🔐 Google Auth Platform Setup

## You're in the Right Place!

You're now in **Google Auth Platform / OAuth Overview**

This is where you configure Google Sign-In for your app.

---

## Steps:

### 1. Click "Get started" button (blue button)

### 2. Configure OAuth Consent Screen

You'll see options:
- **User type**: Select **External** (for public users)
- Click **CREATE**

### 3. Fill in App Information

**App name:**
```
NeuroAlgo
```

**User support email:**
```
neuroalgoforexedge@gmail.com
```

**Developer contact information:**
```
neuroalgoforexedge@gmail.com
```

Click **SAVE AND CONTINUE**

### 4. Scopes (Skip this)
- Just click **SAVE AND CONTINUE**

### 5. Test users (Skip this)
- Just click **SAVE AND CONTINUE**

### 6. Review and Finish
- Click **BACK TO DASHBOARD**

---

## After OAuth Consent Screen is Set Up

### 7. Create OAuth 2.0 Client ID

1. Go to **Credentials** (left sidebar)
2. Click **+ Create Credentials**
3. Select **OAuth client ID**
4. Choose **Web application**
5. Name: `NeuroAlgo Web`

### 8. Add Authorized Redirect URIs

Click **ADD URI** and add these 3 URLs:

**URI 1:**
```
https://zowfbftptnkypdwsnbkh.supabase.co/auth/v1/callback
```

**URI 2:**
```
https://neuroalgofxedge.com/auth/v1/callback
```

**URI 3:**
```
https://localhost:5173/auth/v1/callback
```

### 9. Click CREATE

A popup will show:
- **Client ID** ← COPY THIS
- **Client Secret** ← COPY THIS

---

## Then Paste in Supabase

1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/auth/providers
2. Click **Google**
3. Paste **Client ID** in the field
4. Paste **Client Secret** in the field
5. Click **SAVE**

---

## Done! ✅

Your Google Sign-In is now configured!

