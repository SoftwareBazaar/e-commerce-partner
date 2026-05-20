-- ============================================================================
-- CREATE PROFILES TABLE
-- ============================================================================
-- This table stores user profile information linked to auth.users
-- Date: May 20, 2026
-- ============================================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255),
  phone VARCHAR(20),
  country VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Allow admins to update any profile
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- ============================================================================
-- GRANT ADMIN ACCESS TO YOUR ACCOUNT
-- ============================================================================
-- Update this email with your actual email address, then run:
-- Note: This assumes you're already logged in to auth
-- You may need to manually insert a row with your email first

-- First, create a profile for the admin user (replace with actual email and user ID from auth.users):
INSERT INTO profiles (id, email, display_name, is_admin, is_active)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT email FROM auth.users LIMIT 1),
  'Admin',
  true,
  true
)
ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- Also add admin role to user_roles:
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'admin'
)
ON CONFLICT (user_id, role) DO NOTHING;
