# ✅ Admin Account Setup Complete

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
   - Check **"Auto confirm user"** (optional)
3. Click **"Create user"**

---

## Step 2: Make User an Admin

Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/sql/new

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

Click **"Run"** → Should see: ✅ "Success"

---

## Step 3: Test Admin Login

1. Go to: https://neuroalgofxedge.com/auth
2. Sign in with:
   - Email: `neuroalgoforexedge@gmail.com`
   - Password: `RobertKe@54`
3. Click the user avatar in top right
4. You should see **"Admin Panel"** link
5. Click it to access admin dashboard

---

## Admin Panel Features

Your client can now:

### 📦 Products Management
- ✅ Add new products (EAs, Indicators, Bots, Bundles)
- ✅ Edit product details (name, price, description)
- ✅ Upload product images
- ✅ Set buy/rent prices
- ✅ Mark products as featured
- ✅ Delete products

### 📋 Orders Management
- ✅ View all orders
- ✅ Update order status (pending → paid → delivered)
- ✅ See customer details and payment info

### 🎯 Booking Requests
- ✅ View all booking requests
- ✅ Update booking status (pending → confirmed → completed)
- ✅ See customer details and preferred dates/times

### 💬 Custom EA Requests
- ✅ View all custom EA requests
- ✅ Update request status (new → in_progress → quoted → done)
- ✅ See customer requirements and budget

### 📧 Messages & Subscribers
- ✅ View all contact form messages
- ✅ View newsletter subscribers
- ✅ See subscriber source and signup date

### 📝 Blog Management
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Upload cover images
- ✅ Publish/unpublish posts
- ✅ Delete posts

---

## What Admin Can Do

### Add/Edit Products
1. Go to Admin Panel → Products tab
2. Click "New Product"
3. Fill in:
   - Product name
   - Category (EA, Indicator, Bot, Bundle)
   - Compatibility (MT4, MT5, Both)
   - Buy price
   - Rent price (optional)
   - Upload image
   - Description
   - Mark as featured/active
4. Click "Create product"

### Upload Images
- Click "Upload Image" button
- Select image from computer
- Or paste image URL directly

### Manage Prices
- Edit any product
- Change buy price
- Change rent price
- Save changes

### Manage Content
- Blog posts with markdown support
- Product descriptions
- Contact messages
- Booking details

---

## Admin Dashboard Tabs

1. **Products** - Add/edit/delete products with images and prices
2. **Orders** - View and manage customer orders
3. **EA Requests** - Track custom EA development requests
4. **Bookings** - Manage consultation bookings
5. **Messages** - View contact form submissions
6. **Blog** - Create and manage blog posts
7. **Subscribers** - View newsletter subscribers

---

## Security Notes

- Admin can only access the admin panel (not customer data)
- All changes are logged in Supabase
- Images are stored securely in Supabase Storage
- Passwords are encrypted

---

## Next Steps

1. Create the admin user (Step 1 & 2 above)
2. Test login with the credentials
3. Add first product to test
4. Share admin URL with client: https://neuroalgofxedge.com/admin

---

## Support

If admin can't access:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Try incognito window
4. Verify user was created in Supabase
5. Verify user_roles table has admin entry

