# 🔍 Diagnose 401 Error - RLS Policies Issue

## The Problem

Still getting 401 Unauthorized even after updating API key. This suggests:

1. **API key is correct** ✅ (otherwise we'd get different error)
2. **But RLS policies are blocking access** ❌

---

## What's Happening

Supabase has **Row Level Security (RLS)** enabled on the `newsletter_subscribers` table.

RLS policies control who can access data:
- Without proper policies, even with correct API key, requests are denied (401)
- The API key is valid, but the policy says "no access"

---

## How to Fix

### Step 1: Go to Supabase Dashboard
```
https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh
```

### Step 2: Go to Authentication
- Click: **Authentication** in left sidebar
- Click: **Policies** tab

### Step 3: Check newsletter_subscribers Table
- Look for: `newsletter_subscribers` table
- Check if RLS is **enabled** (it probably is)

### Step 4: View Policies
- Click on `newsletter_subscribers` table
- You should see existing policies

### Step 5: Create/Update Policies

You need these policies for public newsletter signup:

#### Policy 1: Allow Public SELECT
```sql
CREATE POLICY "Allow public to check email"
ON newsletter_subscribers
FOR SELECT
USING (true);
```

#### Policy 2: Allow Public INSERT
```sql
CREATE POLICY "Allow public to insert"
ON newsletter_subscribers
FOR INSERT
WITH CHECK (true);
```

---

## How to Add Policies in Supabase Dashboard

### Via SQL Editor (Easiest)

1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Paste this SQL:

```sql
-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public to check if email exists
CREATE POLICY "Allow public SELECT"
ON newsletter_subscribers
FOR SELECT
USING (true);

-- Allow public to insert new subscribers
CREATE POLICY "Allow public INSERT"
ON newsletter_subscribers
FOR INSERT
WITH CHECK (true);
```

4. Click **Run**
5. Should see success message

### Via Dashboard UI

1. Go to **Authentication** → **Policies**
2. Click on `newsletter_subscribers` table
3. Click **New Policy**
4. Select: **For SELECT**
5. Name: "Allow public SELECT"
6. Expression: `true`
7. Click **Review**
8. Click **Save policy**
9. Repeat for INSERT policy

---

## After Adding Policies

### Test Again

1. Go to your production site
2. Scroll to footer
3. Enter test email
4. Click subscribe
5. Should work now! ✅

### Verify in Console

1. Open DevTools (F12)
2. Go to Console tab
3. Should see **NO 401 errors**
4. Should see successful API calls

---

## Complete SQL Script

If you want to run everything at once:

```sql
-- Enable RLS on newsletter_subscribers table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public SELECT" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public INSERT" ON newsletter_subscribers;

-- Create new policies
CREATE POLICY "Allow public SELECT"
ON newsletter_subscribers
FOR SELECT
USING (true);

CREATE POLICY "Allow public INSERT"
ON newsletter_subscribers
FOR INSERT
WITH CHECK (true);
```

---

## Why This Works

- `FOR SELECT` - Allows reading data
- `FOR INSERT` - Allows adding new data
- `USING (true)` / `WITH CHECK (true)` - Allows everyone (public/anon role)

---

## Summary

✅ **API key is correct**
❌ **RLS policies are blocking access**
⏳ **Add RLS policies to newsletter_subscribers table**
⏳ **Test newsletter subscription**

**Time:** ~5 minutes

**Result:** Newsletter subscription will work! 🚀

---

## 👉 Next Action

1. Go to Supabase dashboard
2. Go to SQL Editor
3. Run the SQL script above
4. Test newsletter subscription

**That's it!** 🎉
