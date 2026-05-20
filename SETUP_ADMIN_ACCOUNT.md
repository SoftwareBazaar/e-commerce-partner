# 🔐 Setup Admin Account for Client

## Admin Credentials

**Email:** `neuroalgoforexedge@gmail.com`
**Password:** `RobertKe@54`

---

## Step 1: Create Admin User in Supabase

Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/auth/users

1. Click **"Add user"** button
2. Enter:
   - **Email:** `neuroalgoforexedge@gmail.com`
   - **Password:** `RobertKe@54`
3. Click **"Create user"**

---

## Step 2: Make User an Admin

Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/editor

Run this SQL:

```sql
-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Add admin role for the client
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'neuroalgoforexedge@gmail.com'
ON CONFLICT DO NOTHING;
```

---

## Step 3: Test Admin Login

1. Go to: https://neuroalgofxedge.com/auth
2. Sign in with:
   - Email: `neuroalgoforexedge@gmail.com`
   - Password: `RobertKe@54`
3. You should see **Admin Panel** link in the user dropdown
4. Click it to access admin dashboard

---

## Admin Panel Features

The admin can:
- ✅ View all bookings
- ✅ View all custom EA requests
- ✅ View all contact submissions
- ✅ View newsletter signups
- ✅ Manage content (if CMS is set up)

---

## What Admin Can Do

Currently the admin panel shows:
- All bookings with details
- All custom EA requests
- All contact form submissions
- All newsletter subscribers

---

## Next Steps

If you want the admin to be able to:
- Add/edit products
- Upload images
- Manage prices
- Edit page content

We need to build a **Content Management System (CMS)** section in the admin panel.

Would you like me to add that?

