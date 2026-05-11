-- ============================================================================
-- FIX BOOKINGS TABLE - Remove UUID constraint on package_id
-- ============================================================================
-- The package_id should be a string slug, not a UUID foreign key
-- Packages are defined in code (src/data/site.ts), not in the database
-- Date: May 11, 2026
-- ============================================================================

-- Drop the foreign key constraint
ALTER TABLE bookings 
DROP CONSTRAINT IF EXISTS bookings_package_id_fkey;

-- Change package_id from UUID to VARCHAR to accept slugs like "discovery-call"
ALTER TABLE bookings 
ALTER COLUMN package_id TYPE VARCHAR(255);

-- Update the column to be nullable temporarily for data migration
ALTER TABLE bookings 
ALTER COLUMN package_id DROP NOT NULL;

-- Add a comment to clarify the column purpose
COMMENT ON COLUMN bookings.package_id IS 'Package slug from src/data/site.ts (e.g., "discovery-call", "one-on-one")';

-- Re-add NOT NULL constraint
ALTER TABLE bookings 
ALTER COLUMN package_id SET NOT NULL;
