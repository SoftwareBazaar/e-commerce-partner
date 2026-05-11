-- ============================================================================
-- FIX RLS POLICIES - Allow public booking submissions
-- ============================================================================
-- The bookings and custom_ea_requests tables need INSERT policies
-- to allow anonymous users to submit booking requests
-- Date: May 11, 2026
-- ============================================================================

-- ============================================================================
-- 1. BOOKINGS TABLE - Allow public inserts
-- ============================================================================

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Allow users to view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Bookings: anyone insert" ON bookings;
DROP POLICY IF EXISTS "Bookings: own select" ON bookings;

-- Allow anyone to insert bookings (for public booking forms)
CREATE POLICY "Allow public booking submissions" ON bookings
  FOR INSERT 
  WITH CHECK (true);

-- Allow users to view their own bookings (by email or user_id)
CREATE POLICY "Allow users to view own bookings" ON bookings
  FOR SELECT 
  USING (
    auth.uid()::text = user_id::text 
    OR client_email = auth.jwt()->>'email'
    OR auth.role() = 'authenticated'
  );

-- Allow authenticated users to update their own bookings
CREATE POLICY "Allow users to update own bookings" ON bookings
  FOR UPDATE
  USING (
    auth.uid()::text = user_id::text 
    OR client_email = auth.jwt()->>'email'
  );

-- ============================================================================
-- 2. CUSTOM EA REQUESTS TABLE - Allow public inserts
-- ============================================================================

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own custom EA requests" ON custom_ea_requests;
DROP POLICY IF EXISTS "Allow users to view their own custom EA requests" ON custom_ea_requests;

-- Allow anyone to insert custom EA requests (for public request forms)
CREATE POLICY "Allow public custom EA submissions" ON custom_ea_requests
  FOR INSERT 
  WITH CHECK (true);

-- Allow users to view their own requests (by email or user_id)
CREATE POLICY "Allow users to view own custom EA requests" ON custom_ea_requests
  FOR SELECT 
  USING (
    auth.uid()::text = user_id::text 
    OR client_email = auth.jwt()->>'email'
    OR auth.role() = 'authenticated'
  );

-- Allow authenticated users to update their own requests
CREATE POLICY "Allow users to update own custom EA requests" ON custom_ea_requests
  FOR UPDATE
  USING (
    auth.uid()::text = user_id::text 
    OR client_email = auth.jwt()->>'email'
  );

-- ============================================================================
-- 3. CONTACT SUBMISSIONS TABLE - Allow public inserts
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow users to view own contact submissions" ON contact_submissions;

-- Allow anyone to submit contact forms
CREATE POLICY "Allow public contact submissions" ON contact_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Allow users to view their own submissions
CREATE POLICY "Allow users to view own contact submissions" ON contact_submissions
  FOR SELECT 
  USING (
    sender_email = auth.jwt()->>'email'
    OR auth.role() = 'authenticated'
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON POLICY "Allow public booking submissions" ON bookings IS 
  'Allows anonymous users to submit booking requests via public forms';

COMMENT ON POLICY "Allow public custom EA submissions" ON custom_ea_requests IS 
  'Allows anonymous users to submit custom EA requests via public forms';

COMMENT ON POLICY "Allow public contact submissions" ON contact_submissions IS 
  'Allows anonymous users to submit contact form messages';
