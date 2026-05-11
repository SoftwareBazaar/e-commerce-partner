-- ============================================================================
-- FIX AUTO-GENERATED FIELDS - bookings and custom_ea_requests
-- ============================================================================
-- Both tables have required fields (booking_number, request_number) that
-- are not provided by the forms. This migration adds auto-generation.
-- Date: May 11, 2026
-- ============================================================================

-- ============================================================================
-- 1. FIX BOOKINGS TABLE
-- ============================================================================

-- Make booking_number nullable temporarily
ALTER TABLE bookings 
ALTER COLUMN booking_number DROP NOT NULL;

-- Add a default value generator for bookings
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS VARCHAR(50) AS $$
BEGIN
  RETURN 'BOOK-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Set the default for new rows
ALTER TABLE bookings 
ALTER COLUMN booking_number SET DEFAULT generate_booking_number();

-- Update existing rows that might have NULL
UPDATE bookings 
SET booking_number = generate_booking_number()
WHERE booking_number IS NULL;

-- Make it NOT NULL again
ALTER TABLE bookings 
ALTER COLUMN booking_number SET NOT NULL;

-- Add comment
COMMENT ON COLUMN bookings.booking_number IS 'Auto-generated booking number (BOOK-YYYYMMDD-XXXX)';

-- ============================================================================
-- 2. FIX CUSTOM EA REQUESTS TABLE
-- ============================================================================

-- Make request_number nullable temporarily
ALTER TABLE custom_ea_requests 
ALTER COLUMN request_number DROP NOT NULL;

-- Add a default value generator for custom EA requests
CREATE OR REPLACE FUNCTION generate_request_number()
RETURNS VARCHAR(50) AS $$
BEGIN
  RETURN 'REQ-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Set the default for new rows
ALTER TABLE custom_ea_requests 
ALTER COLUMN request_number SET DEFAULT generate_request_number();

-- Update existing rows that might have NULL
UPDATE custom_ea_requests 
SET request_number = generate_request_number()
WHERE request_number IS NULL;

-- Make it NOT NULL again
ALTER TABLE custom_ea_requests 
ALTER COLUMN request_number SET NOT NULL;

-- Add comment
COMMENT ON COLUMN custom_ea_requests.request_number IS 'Auto-generated request number (REQ-YYYYMMDD-XXXX)';

