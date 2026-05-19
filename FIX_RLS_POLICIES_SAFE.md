# ✅ Safe RLS Policy Fix (Already Exists)

## The Error Means
The policy "Allow public booking submissions" already exists - which is GOOD! It means the previous migration partially worked.

## What To Do Now

Run this corrected SQL that checks if policies exist before creating them:

```sql
-- Safely update RLS policies (won't error if they exist)

-- For bookings table
DROP POLICY IF EXISTS "Allow public booking submissions" ON bookings;
DROP POLICY IF EXISTS "Allow users to view own bookings" ON bookings;

CREATE POLICY "Allow public booking submissions" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view own bookings" ON bookings
  FOR SELECT USING (
    auth.uid()::text = user_id::text 
    OR client_email = auth.jwt()->>'email'
    OR auth.role() = 'authenticated'
  );

-- For custom_ea_requests table
DROP POLICY IF EXISTS "Allow public custom EA submissions" ON custom_ea_requests;
DROP POLICY IF EXISTS "Allow users to view own custom EA requests" ON custom_ea_requests;

CREATE POLICY "Allow public custom EA submissions" ON custom_ea_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view own custom EA requests" ON custom_ea_requests
  FOR SELECT USING (
    auth.uid()::text = user_id::text 
    OR client_email = auth.jwt()->>'email'
    OR auth.role() = 'authenticated'
  );

-- For contact_submissions table
DROP POLICY IF EXISTS "Allow public contact submissions" ON contact_submissions;

CREATE POLICY "Allow public contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

## Steps:
1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/sql/new
2. Copy the SQL above
3. Click "Run"
4. Should see: ✅ "Success. No rows returned"

## Then Test:
- Try booking a free call on your site
- Try custom EA request form
- Try contact form

All should work now! 🚀
