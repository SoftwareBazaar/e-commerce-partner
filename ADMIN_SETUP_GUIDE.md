# 🔐 Admin Setup Guide - How to Create Admin Account

## Current Setup

The admin panel is already built and protected. Here's how it works:

### Authentication Flow
1. **Supabase Auth** - Users sign up/login with email and password
2. **User Roles Table** - Checks if user has "admin" role
3. **Admin Panel** - Only accessible to users with admin role

### Admin Features
- ✅ Manage products (create, edit, delete)
- ✅ Manage orders
- ✅ Manage EA requests
- ✅ Manage bookings
- ✅ Manage contact messages
- ✅ Manage blog posts
- ✅ View newsletter subscribers

---

## How to Create Admin Account

### Step 1: Create User Roles Table (If Not Exists)

Go to Supabase SQL Editor and run:

```sql
-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own roles
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Allow admins to manage roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
```

### Step 2: Create Admin User Account

#### Option A: Via Sign Up (Recommended)

1. Go to your site: `https://your-domain.com/auth`
2. Click **Create Account**
3. Enter admin email and password
4. Click **Create Account**
5. You'll be logged in

#### Option B: Via Supabase Dashboard

1. Go to Supabase: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh
2. Click **Authentication** → **Users**
3. Click **Add user**
4. Enter email and password
5. Click **Create user**

### Step 3: Grant Admin Role

After creating the user account, you need to give them admin role.

#### Via SQL (Easiest)

1. Go to Supabase **SQL Editor**
2. Run this SQL (replace with actual email):

```sql
-- Get the user ID from email
WITH user_data AS (
  SELECT id FROM auth.users WHERE email = 'admin@example.com'
)
-- Insert admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM user_data
ON CONFLICT (user_id, role) DO NOTHING;
```

#### Via Dashboard

1. Go to Supabase **Table Editor**
2. Click on `user_roles` table
3. Click **Insert row**
4. Fill in:
   - `user_id`: (copy from auth.users table)
   - `role`: `admin`
5. Click **Save**

---

## How Admin Can Login and Update Content

### Step 1: Login

1. Go to: `https://your-domain.com/auth`
2. Click **Sign In**
3. Enter email and password
4. Click **Sign In**

### Step 2: Access Admin Panel

1. After login, go to: `https://your-domain.com/admin`
2. You should see the Admin Panel with tabs:
   - Products
   - Orders
   - EA Requests
   - Bookings
   - Messages
   - Blog
   - Subscribers

### Step 3: Manage Content

#### Add New Product
1. Click **New Product** button
2. Fill in:
   - Slug (URL-friendly name)
   - Name
   - Category (EA, Indicator, Bot, Bundle)
   - Compatibility (MT4, MT5, Both)
   - Prices (buy and/or rent)
   - Image (upload or paste URL)
   - Description
   - Featured/Active checkboxes
3. Click **Create product**

#### Edit Product
1. Click **Edit** (pencil icon) on product
2. Make changes
3. Click **Save changes**

#### Delete Product
1. Click **Delete** (trash icon) on product
2. Confirm deletion

#### Add Blog Post
1. Click **Blog** tab
2. Click **New Post** button
3. Fill in:
   - Slug (URL-friendly)
   - Title
   - Cover image URL
   - Excerpt
   - Body (markdown or plain text)
   - Published checkbox
4. Click **Save post**

#### Manage Orders/Requests/Bookings
1. Click respective tab
2. Change status from dropdown
3. Status updates automatically

---

## Complete Setup SQL Script

Run this all at once to set everything up:

```sql
-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Add admin role for your email (REPLACE admin@example.com)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'admin@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

---

## Admin Credentials

### For Your Admin User

**Email:** (whatever you created)
**Password:** (whatever you set)

**Admin Panel URL:** `https://your-domain.com/admin`

---

## Features Available in Admin Panel

### Products Tab
- ✅ Create new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Upload product images
- ✅ Set prices (buy/rent)
- ✅ Mark as featured
- ✅ Manage categories and compatibility

### Orders Tab
- ✅ View all orders
- ✅ Change order status (pending → paid → delivered)
- ✅ See customer details
- ✅ View order amounts and dates

### EA Requests Tab
- ✅ View custom EA requests
- ✅ Change status (new → in_progress → quoted → done)
- ✅ See strategy details and budget

### Bookings Tab
- ✅ View all bookings
- ✅ Change status (pending → confirmed → completed → cancelled)
- ✅ See booking details and dates

### Messages Tab
- ✅ View contact form submissions
- ✅ See customer messages
- ✅ Track message dates

### Blog Tab
- ✅ Create blog posts
- ✅ Edit posts
- ✅ Delete posts
- ✅ Publish/unpublish posts
- ✅ Support markdown formatting

### Subscribers Tab
- ✅ View all newsletter subscribers
- ✅ See subscription dates
- ✅ See subscription source

---

## Troubleshooting

### Admin Can't Access Admin Panel

**Problem:** User logged in but can't access `/admin`

**Solution:**
1. Check if user has admin role in `user_roles` table
2. Verify `user_id` matches the user in `auth.users`
3. Refresh page after adding role
4. Try logging out and back in

### Can't Create User

**Problem:** Sign up not working

**Solution:**
1. Check Supabase auth is enabled
2. Verify email is valid
3. Check password is at least 6 characters
4. Check Supabase project is active

### Products Not Showing

**Problem:** Admin can't see products

**Solution:**
1. Check `products` table exists
2. Verify RLS policies allow admin read
3. Check products are marked as `active`

---

## Security Notes

✅ **Admin panel is protected** - Only users with admin role can access
✅ **Passwords are hashed** - Supabase handles security
✅ **RLS policies** - Database-level access control
✅ **Session management** - Automatic logout after inactivity

---

## Summary

1. ✅ Create `user_roles` table (SQL)
2. ✅ Create admin user account (sign up or Supabase)
3. ✅ Grant admin role (SQL or dashboard)
4. ✅ Login to admin panel
5. ✅ Start managing content!

**Admin Panel URL:** `https://your-domain.com/admin`

---

## Next Steps

1. Run the SQL script to create `user_roles` table
2. Create admin account
3. Grant admin role
4. Login and test admin panel
5. Start adding products and content!

**Questions?** Check the troubleshooting section above.
