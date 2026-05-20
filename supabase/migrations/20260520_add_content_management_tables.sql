-- ============================================================================
-- CONTENT MANAGEMENT TABLES
-- ============================================================================
-- This migration adds tables for site settings, page content, and FAQs
-- Date: May 20, 2026
-- ============================================================================

-- ============================================================================
-- SITE SETTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255),
  company_email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  currency VARCHAR(10) DEFAULT 'USD',
  timezone VARCHAR(50) DEFAULT 'UTC',
  logo_url VARCHAR(500),
  footer_text TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_settings_created_at ON site_settings(created_at);

-- ============================================================================
-- PAGE CONTENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS page_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(500),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_contents_slug ON page_contents(page_slug);
CREATE INDEX IF NOT EXISTS idx_page_contents_published ON page_contents(is_published);

-- ============================================================================
-- FAQs TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(display_order);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Site Settings - Only admins can modify
CREATE POLICY "site_settings_read_all" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_write_admin" ON site_settings FOR ALL USING (
  auth.jwt()->>'role' = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  )
);

-- Page Contents - Published pages visible to all, admins can edit
CREATE POLICY "page_contents_read_published" ON page_contents FOR SELECT USING (is_published = true);
CREATE POLICY "page_contents_read_admin" ON page_contents FOR SELECT USING (
  auth.jwt()->>'role' = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  )
);
CREATE POLICY "page_contents_write_admin" ON page_contents FOR ALL USING (
  auth.jwt()->>'role' = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  )
);

-- FAQs - Visible to all
CREATE POLICY "faqs_read_all" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "faqs_read_admin" ON faqs FOR SELECT USING (
  auth.jwt()->>'role' = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  )
);
CREATE POLICY "faqs_write_admin" ON faqs FOR ALL USING (
  auth.jwt()->>'role' = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  )
);

-- ============================================================================
-- SEED DATA (OPTIONAL)
-- ============================================================================
INSERT INTO site_settings (company_name, company_email, phone, currency, timezone) 
VALUES ('NeuroAlgo', 'admin@neuroalgo.com', '+1-800-000-0000', 'USD', 'UTC')
ON CONFLICT DO NOTHING;

INSERT INTO faqs (question, answer, category, display_order, is_active) VALUES
('What is NeuroAlgo?', 'NeuroAlgo is a leading platform for algorithmic trading tools and expert advisors for MetaTrader.', 'General', 1, true),
('How do I download products?', 'After purchasing, you can download your product from your dashboard immediately.', 'Technical', 2, true),
('Do you offer support?', 'Yes, we offer 24/7 support through our contact form and email.', 'Support', 3, true),
('Is there a money-back guarantee?', 'We offer a 7-day money-back guarantee for all products.', 'Pricing', 4, true)
ON CONFLICT DO NOTHING;
