# 🔧 Fix Authorized Domains Order

## The Problem

Your authorized domains are in the wrong order:
- Domain 1: `zowfbftptnkypdwsnbkh.supabase.co` ← Should be second
- Domain 2: `neuroalgofxedge.com` ← Should be first

---

## The Fix

### Step 1: Delete Domain 1
- Click the X or delete button next to `zowfbftptnkypdwsnbkh.supabase.co`

### Step 2: Delete Domain 2
- Click the X or delete button next to `neuroalgofxedge.com`

### Step 3: Add Domains in Correct Order

**Add Domain 1 (Your Site):**
```
neuroalgofxedge.com
```

**Add Domain 2 (Supabase Backend):**
```
zowfbftptnkypdwsnbkh.supabase.co
```

### Step 4: Save Changes

Click **"Save changes"** button

---

## Why This Matters

- Domain 1 should be your main production domain
- Domain 2 is your backend OAuth provider
- Google will use Domain 1 as the primary domain for the consent screen

---

## After Saving

Test Google Sign-In:
1. Go to: https://neuroalgofxedge.com/auth
2. Click **"Sign in with Google"**
3. Should now show "Sign in to NeuroAlgo" ✅
4. Click Continue
5. Should redirect to dashboard ✅

