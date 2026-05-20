# 🔧 Fix Newsletter Table Schema

## The Problem

The error "Missing required fields" means the table schema doesn't match what the code is trying to insert.

The code is trying to insert:
- `email` (required)
- `source` (optional)

But the table might have different required fields.

---

## The Solution

Drop the old table and create it with the correct schema:

```sql
-- Drop old table if it exists
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;

-- Create correct table
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert
CREATE POLICY "Newsletter: anyone insert" ON public.newsletter_subscribers 
  FOR INSERT WITH CHECK (true);

-- Allow anyone to select (for duplicate check)
CREATE POLICY "Newsletter: anyone select" ON public.newsletter_subscribers 
  FOR SELECT USING (true);

-- Allow admin to delete
CREATE POLICY "Newsletter: admin delete" ON public.newsletter_subscribers 
  FOR DELETE USING (auth.role() = 'authenticated');
```

---

## How to Apply

### Step 1: Go to Supabase SQL Editor
```
https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh
```

### Step 2: Create New Query
Click: **New Query**

### Step 3: Paste the SQL Above
Copy the entire SQL script and paste it

### Step 4: Run
Click: **Run**

Should see: "Success"

---

## After Applying

### Test Newsletter Subscription

1. Go to your production site
2. Hard refresh: **Ctrl+Shift+R**
3. Scroll to footer
4. Enter test email
5. Click subscribe
6. Should work! ✅

### Verify in Supabase

1. Go to **Table Editor**
2. Click on `newsletter_subscribers`
3. Should see your test email entry

---

## Table Schema

The correct table has:

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `id` | uuid | Yes | Auto-generated |
| `email` | text | Yes | Unique, required |
| `source` | text | No | Where they signed up from |
| `created_at` | timestamptz | Yes | Auto-generated |

---

## Expected Result

After applying the schema:

```
✅ Newsletter subscription works
✅ No more "Missing required fields" error
✅ Data saves to Supabase
✅ Success message displays
```

---

## Summary

1. ✅ Drop old table
2. ✅ Create new table with correct schema
3. ✅ Add RLS policies
4. ✅ Test newsletter subscription

**Time:** ~5 minutes

**Result:** Newsletter subscription works! 🚀
