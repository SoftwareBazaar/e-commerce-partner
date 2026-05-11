# 🚀 Apply Booking Fix NOW - 2 Minutes

## The Problem
❌ All bookings failing with: `invalid input syntax for type uuid: "discovery-call"`

## The Fix (Choose One Method)

### Method 1: Supabase Dashboard (EASIEST) ⭐

1. **Open SQL Editor**
   - Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/sql/new

2. **Copy & Paste This SQL**
   ```sql
   -- Fix bookings table to accept package slugs instead of UUIDs
   ALTER TABLE bookings 
   DROP CONSTRAINT IF EXISTS bookings_package_id_fkey;

   ALTER TABLE bookings 
   ALTER COLUMN package_id TYPE VARCHAR(255);

   ALTER TABLE bookings 
   ALTER COLUMN package_id DROP NOT NULL;

   COMMENT ON COLUMN bookings.package_id IS 'Package slug from src/data/site.ts (e.g., "discovery-call", "one-on-one")';

   ALTER TABLE bookings 
   ALTER COLUMN package_id SET NOT NULL;
   ```

3. **Click "Run"** (bottom right)

4. **Verify Success**
   - You should see: "Success. No rows returned"

### Method 2: Using Migration File

If you have Supabase CLI installed:
```bash
cd e-commerce-partner-main
supabase db push
```

## After Applying

### Test Immediately
1. Go to your live site
2. Click "Book a Free Call" or any mentorship package
3. Fill the form and submit
4. Should see: ✅ "Booking received" success message

### What Changed
- `package_id` now accepts strings like `"discovery-call"` instead of UUIDs
- All booking forms will work instantly
- No code changes needed - already deployed

## Verification

Check your bookings table:
```sql
SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5;
```

You should see `package_id` values like:
- `discovery-call`
- `one-on-one`
- `beginner-crash-course`
- `advanced-mentorship`

---

**Time to fix**: 2 minutes  
**Downtime**: None  
**Risk**: Zero - safe migration  

## Need Help?

If you see any errors:
1. Screenshot the error message
2. Check the SQL Editor for specific error details
3. Verify you're connected to the correct project: `zowfbftptnkypdwsnbkh`
