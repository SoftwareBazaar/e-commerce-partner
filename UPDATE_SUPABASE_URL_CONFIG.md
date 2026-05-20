# ✅ Update Supabase URL Configuration

## You're in the Right Place!

You're in: **Authentication → URL Configuration**

This is where we configure the redirect URLs for your production site.

---

## Step 1: Update Site URL

**Current:** `http://localhost:3000`

**Change to:**
```
https://neuroalgofxedge.com
```

1. Click in the **Site URL** field
2. Clear the current text
3. Paste: `https://neuroalgofxedge.com`
4. Click **Save Changes**

---

## Step 2: Add Redirect URLs

Click **Add URL** button and add these 3 URLs:

**URL 1:**
```
https://neuroalgofxedge.com
```

**URL 2:**
```
https://neuroalgofxedge.com/dashboard
```

**URL 3:**
```
https://neuroalgofxedge.com/auth
```

(Optional - for local development)
**URL 4:**
```
http://localhost:5173
```

---

## Step 3: Save

Click **Save Changes** button

---

## After Saving

Test Google Sign-In:
1. Go to: https://neuroalgofxedge.com/auth
2. Click **"Sign in with Google"**
3. Sign in with your Google account
4. Should redirect to dashboard
5. ✅ Success!

---

## Why This Matters

- **Site URL**: Default redirect after authentication
- **Redirect URLs**: Allowed URLs that Supabase can redirect to after OAuth

Without these configured, Supabase won't allow redirects to your production site.

