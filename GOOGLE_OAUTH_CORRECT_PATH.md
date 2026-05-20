# 🔐 Google OAuth - Correct Path

## You're in the Wrong Section

The screen you're showing is for **API Keys**, but you need **OAuth 2.0 Client ID** instead.

---

## Correct Steps:

### 1. Go to Google Cloud Console
**URL:** https://console.cloud.google.com/

### 2. Make sure you're in the right project
- Top left, click the **Project dropdown**
- Select your project (or create one if needed)

### 3. Go to APIs & Services
- Left sidebar → Click **APIs & Services**

### 4. Click "Credentials" (NOT "API Keys")
- You should see these options in left sidebar:
  - Library
  - **Credentials** ← CLICK THIS
  - OAuth consent screen
  - API keys

### 5. Click "+ Create Credentials" button
- Top of the page, blue button
- Select **OAuth client ID**

### 6. You might see "Configure OAuth consent screen first"
If so:
1. Click **CONFIGURE CONSENT SCREEN**
2. Select **External**
3. Click **CREATE**
4. Fill in:
   - App name: `NeuroAlgo`
   - User support email: `neuroalgoforexedge@gmail.com`
   - Developer contact: `neuroalgoforexedge@gmail.com`
5. Click **SAVE AND CONTINUE** (skip the rest)
6. Go back and click **+ Create Credentials** again

### 7. Create OAuth Client ID
1. Select **Web application**
2. Name: `NeuroAlgo Web`
3. Under **Authorized redirect URIs**, click **ADD URI** and add:
   ```
   https://zowfbftptnkypdwsnbkh.supabase.co/auth/v1/callback
   ```
4. Click **ADD URI** again and add:
   ```
   https://neuroalgofxedge.com/auth/v1/callback
   ```
5. Click **ADD URI** again and add:
   ```
   https://localhost:5173/auth/v1/callback
   ```
6. Click **CREATE**

### 8. Copy Your Client ID
A popup shows:
- **Client ID** ← COPY THIS
- **Client Secret** ← COPY THIS TOO

---

## Then Paste in Supabase

1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/auth/providers
2. Click **Google**
3. Paste **Client ID** in the "Client IDs" field
4. Paste **Client Secret** in the "Client Secret" field
5. Click **SAVE**

---

## Visual Guide

**You should see this flow:**
```
Google Cloud Console
  ↓
APIs & Services
  ↓
Credentials (NOT API Keys)
  ↓
+ Create Credentials
  ↓
OAuth client ID
  ↓
Web application
  ↓
Add redirect URIs
  ↓
CREATE
  ↓
Copy Client ID & Secret
  ↓
Paste in Supabase
```

---

## Key Differences

| What You're Seeing | What You Need |
|---|---|
| API Key creation | OAuth 2.0 Client ID |
| "Select API restrictions" | "Authorized redirect URIs" |
| For backend services | For user login |

You're close! Just go back and click **Credentials** instead of **API Keys**.

