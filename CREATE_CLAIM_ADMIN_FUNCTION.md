# 🔧 Fix Claim Admin Function

## The Problem

The `claim_admin` function is missing from the database.

---

## Solution: Create the Function

Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/sql/new

Run this SQL:

```sql
-- Create the claim_admin function
CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS TABLE (success BOOLEAN, message TEXT) AS $$
DECLARE
  current_user_id UUID;
BEGIN
  -- Get current user ID
  current_user_id := auth.uid();
  
  -- Check if user exists
  IF current_user_id IS NULL THEN
    RETURN QUERY SELECT false, 'Not authenticated'::TEXT;
    RETURN;
  END IF;
  
  -- Check if user already has admin role
  IF EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = current_user_id AND role = 'admin'
  ) THEN
    RETURN QUERY SELECT true, 'Already admin'::TEXT;
    RETURN;
  END IF;
  
  -- Grant admin role
  INSERT INTO user_roles (user_id, role)
  VALUES (current_user_id, 'admin')
  ON CONFLICT DO NOTHING;
  
  RETURN QUERY SELECT true, 'Admin role granted'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;
```

Click **"Run"** → Should see ✅ "Success"

---

## After Creating Function

1. Go back to dashboard
2. Click **"Claim admin (first-time setup)"** button
3. Should now work! ✅

---

## What This Does

- Creates a function that grants admin role to the current user
- Only works for authenticated users
- Prevents duplicate admin roles
- Secure and database-level

