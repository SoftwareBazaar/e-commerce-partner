# ✅ Verify Admin Role is Set

## The Issue

Admin user is not seeing the admin panel link because the admin role might not be properly set in the database.

---

## Step 1: Verify Admin Role in Database

Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/sql/new

Run this SQL to check:

```sql
-- Check if admin role exists for the user
SELECT * FROM user_roles 
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email = 'neuroalgoforexedge@gmail.com'
);
```

Click **"Run"**

**You should see:**
- One row with role = 'admin'

**If no rows appear:**
- The admin role wasn't created properly
- Run the fix below

---

## Step 2: Fix - Add Admin Role if Missing

If no rows appeared, run this:

```sql
-- Make sure user_roles table exists
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Add admin role for the user
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'neuroalgoforexedge@gmail.com'
ON CONFLICT DO NOTHING;

-- Verify it was added
SELECT * FROM user_roles 
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email = 'neuroalgoforexedge@gmail.com'
);
```

Click **"Run"**

---

## Step 3: Clear Cache and Refresh

1. Go to: https://neuroalgofxedge.com
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+Shift+R)
4. Sign out and sign back in
5. Click user avatar
6. Should now see **"Admin Panel"** link ✅

---

## Step 4: Access Admin Panel

1. Click **"Admin Panel"** link
2. You should see all the admin tabs:
   - Products
   - Orders
   - EA Requests
   - Bookings
   - Messages
   - Blog
   - Subscribers

---

## If Still Not Working

1. Check browser console (F12 → Console)
2. Look for any error messages
3. Try incognito window
4. Try different browser

