-- ============================================================================
-- ROBERT TRADING TOOLS - COMPLETE DATABASE SCHEMA (FIXED VERSION)
-- ============================================================================
-- This migration creates all tables needed for the platform
-- Uses IF NOT EXISTS for tables and indexes (but NOT for policies)
-- Date: May 5, 2026
-- ============================================================================

-- ============================================================================
-- 1. USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  bio TEXT,
  trading_experience VARCHAR(100),
  preferred_pairs TEXT,
  preferred_timeframes TEXT,
  notification_preferences JSONB DEFAULT '{"email": true, "sms": false}',
  is_active BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin);

-- ============================================================================
-- 2. PRODUCTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('EA', 'Indicator', 'Bot', 'Bundle')),
  compatibility VARCHAR(50) NOT NULL CHECK (compatibility IN ('MT4', 'MT5', 'Both')),
  short_description TEXT,
  description TEXT,
  buy_price DECIMAL(10, 2),
  rent_price DECIMAL(10, 2),
  rating DECIMAL(3, 1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  pairs TEXT,
  timeframes TEXT,
  youtube_id VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  tags TEXT,
  image_url VARCHAR(500),
  demo_url VARCHAR(500),
  documentation_url VARCHAR(500),
  support_email VARCHAR(255),
  version VARCHAR(50),
  last_updated TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- ============================================================================
-- 3. ORDERS & PURCHASES
-- ============================================================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  mode VARCHAR(50) NOT NULL CHECK (mode IN ('buy', 'rent')),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  payment_method VARCHAR(100),
  transaction_id VARCHAR(255),
  download_url VARCHAR(500),
  license_key VARCHAR(255),
  expiry_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ============================================================================
-- 4. CUSTOM EA REQUESTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS custom_ea_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number VARCHAR(50) NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  strategy_name VARCHAR(255),
  strategy_description TEXT NOT NULL,
  entry_rules TEXT,
  exit_rules TEXT,
  indicators TEXT,
  pairs TEXT,
  timeframes TEXT,
  budget_range VARCHAR(100),
  deadline DATE,
  risk_preferences JSONB,
  lot_sizing VARCHAR(100),
  stop_loss_pips INTEGER,
  take_profit_pips INTEGER,
  trailing_stop BOOLEAN DEFAULT false,
  max_daily_loss DECIMAL(10, 2),
  file_url VARCHAR(500),
  file_name VARCHAR(255),
  platform VARCHAR(50) CHECK (platform IN ('MT4', 'MT5', 'Both')),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'in_progress', 'completed', 'rejected')),
  quote_amount DECIMAL(10, 2),
  quote_date TIMESTAMP WITH TIME ZONE,
  completion_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_custom_ea_requests_user_id ON custom_ea_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_ea_requests_client_email ON custom_ea_requests(client_email);
CREATE INDEX IF NOT EXISTS idx_custom_ea_requests_status ON custom_ea_requests(status);
CREATE INDEX IF NOT EXISTS idx_custom_ea_requests_created_at ON custom_ea_requests(created_at DESC);

-- ============================================================================
-- 5. MENTORSHIP PACKAGES
-- ============================================================================

CREATE TABLE IF NOT EXISTS mentorship_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10, 2),
  includes TEXT,
  level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  max_participants INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mentorship_packages_slug ON mentorship_packages(slug);
CREATE INDEX IF NOT EXISTS idx_mentorship_packages_is_active ON mentorship_packages(is_active);

-- ============================================================================
-- 6. BOOKINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number VARCHAR(50) NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  package_id UUID NOT NULL REFERENCES mentorship_packages(id),
  package_name VARCHAR(255) NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  trading_experience VARCHAR(100),
  goals TEXT,
  notes TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
  zoom_link VARCHAR(500),
  recording_url VARCHAR(500),
  feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_client_email ON bookings(client_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_date ON bookings(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- ============================================================================
-- 7. CONTACT SUBMISSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id VARCHAR(50) NOT NULL UNIQUE,
  sender_name VARCHAR(255) NOT NULL,
  sender_email VARCHAR(255) NOT NULL,
  sender_phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(100),
  priority VARCHAR(50) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'closed')),
  response_text TEXT,
  responded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_sender_email ON contact_submissions(sender_email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_priority ON contact_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- ============================================================================
-- 8. EMAIL NOTIFICATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email VARCHAR(255) NOT NULL,
  template_id VARCHAR(100) NOT NULL,
  template_variables JSONB NOT NULL DEFAULT '{}',
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  message_id VARCHAR(255),
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_notifications_recipient ON email_notifications(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_notifications_status ON email_notifications(status);
CREATE INDEX IF NOT EXISTS idx_email_notifications_template_id ON email_notifications(template_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_created_at ON email_notifications(created_at DESC);

-- ============================================================================
-- 9. EMAIL TEMPLATES
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_templates (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  variables JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 10. PRODUCT REVIEWS
-- ============================================================================

CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT,
  helpful_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews(status);
CREATE INDEX IF NOT EXISTS idx_product_reviews_created_at ON product_reviews(created_at DESC);

-- ============================================================================
-- 11. CART ITEMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  mode VARCHAR(50) NOT NULL CHECK (mode IN ('buy', 'rent')),
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_items_unique ON cart_items(user_id, product_id, mode);

-- ============================================================================
-- 12. WISHLIST
-- ============================================================================

CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlist(product_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_wishlist_unique ON wishlist(user_id, product_id);

-- ============================================================================
-- 13. AFFILIATE PROGRAM
-- ============================================================================

CREATE TABLE IF NOT EXISTS affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  affiliate_code VARCHAR(50) NOT NULL UNIQUE,
  commission_rate DECIMAL(5, 2) DEFAULT 10.00,
  total_referrals INTEGER DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliates_user_id ON affiliates(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_affiliate_code ON affiliates(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_affiliates_status ON affiliates(status);

-- ============================================================================
-- 14. AFFILIATE REFERRALS
-- ============================================================================

CREATE TABLE IF NOT EXISTS affiliate_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  referred_email VARCHAR(255),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  commission_amount DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_affiliate_id ON affiliate_referrals(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_referred_user_id ON affiliate_referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_status ON affiliate_referrals(status);

-- ============================================================================
-- 15. BLOG POSTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  featured_image_url VARCHAR(500),
  category VARCHAR(100),
  tags TEXT,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- ============================================================================
-- 16. BLOG COMMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  commenter_name VARCHAR(255),
  commenter_email VARCHAR(255),
  comment_text TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_user_id ON blog_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);

-- ============================================================================
-- 17. ACTIVITY LOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id VARCHAR(255),
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_action ON activity_log(action);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON activity_log(created_at DESC);

-- ============================================================================
-- 18. SYSTEM SETTINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(255) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type VARCHAR(50),
  description TEXT,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(setting_key);

-- ============================================================================
-- 19. NOTIFICATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50),
  related_entity_type VARCHAR(100),
  related_entity_id VARCHAR(255),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================================================
-- 20. ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  page_url VARCHAR(500),
  referrer_url VARCHAR(500),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_ea_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PUBLIC READ POLICIES (WITHOUT IF NOT EXISTS - Supabase limitation)
-- ============================================================================

-- Products - Public read
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (is_active = true);

-- Mentorship packages - Public read
DROP POLICY IF EXISTS "Allow public read access to mentorship_packages" ON mentorship_packages;
CREATE POLICY "Allow public read access to mentorship_packages" ON mentorship_packages
  FOR SELECT USING (is_active = true);

-- Blog posts - Public read published posts
DROP POLICY IF EXISTS "Allow public read access to published blog posts" ON blog_posts;
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Product reviews - Public read approved reviews
DROP POLICY IF EXISTS "Allow public read access to approved reviews" ON product_reviews;
CREATE POLICY "Allow public read access to approved reviews" ON product_reviews
  FOR SELECT USING (status = 'approved');

-- Email templates - Public read
DROP POLICY IF EXISTS "Allow public read access to email_templates" ON email_templates;
CREATE POLICY "Allow public read access to email_templates" ON email_templates
  FOR SELECT USING (true);

-- ============================================================================
-- USER-SPECIFIC POLICIES
-- ============================================================================

-- Users - Can view own profile
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text OR auth.role() = 'authenticated');

-- Orders - Users can view own orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid()::text = user_id::text OR auth.role() = 'authenticated');

-- Custom EA Requests - Users can view own requests
DROP POLICY IF EXISTS "Users can view own custom EA requests" ON custom_ea_requests;
CREATE POLICY "Users can view own custom EA requests" ON custom_ea_requests
  FOR SELECT USING (auth.uid()::text = user_id::text OR auth.role() = 'authenticated');

-- Bookings - Users can view own bookings
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid()::text = user_id::text OR auth.role() = 'authenticated');

-- Cart items - Users can view own cart
DROP POLICY IF EXISTS "Users can view own cart" ON cart_items;
CREATE POLICY "Users can view own cart" ON cart_items
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Wishlist - Users can view own wishlist
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlist;
CREATE POLICY "Users can view own wishlist" ON wishlist
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Notifications - Users can view own notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- ============================================================================
-- INSERT DEFAULT DATA
-- ============================================================================

-- Insert email templates (only if they don't exist)
INSERT INTO email_templates (id, name, subject, html_content, variables, is_active) VALUES
('order-confirmation', 'Order Confirmation', 'Your Order Confirmation - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Order Confirmation</h2><p>Hi {{customerName}},</p><p>Thank you for your purchase! Your order has been confirmed.</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Order ID:</strong> {{orderId}}</p><p><strong>Product:</strong> {{productName}}</p><p><strong>Amount:</strong> ${{amount}}</p><p><strong>Date:</strong> {{orderDate}}</p></div><p>You will receive a download link shortly.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["customerName", "orderId", "productName", "amount", "orderDate"]', true),

('custom-ea-request', 'Custom EA Request Received', 'Your Custom EA Request - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Custom EA Request Received</h2><p>Hi {{clientName}},</p><p>Thank you for submitting your custom EA request. We''ve received your details and will review them shortly.</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Request ID:</strong> {{requestId}}</p><p><strong>Strategy:</strong> {{strategy}}</p><p><strong>Budget Range:</strong> {{budgetRange}}</p><p><strong>Deadline:</strong> {{deadline}}</p></div><p>We''ll contact you within 24 hours with a quote and timeline.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["clientName", "requestId", "strategy", "budgetRange", "deadline"]', true),

('booking-confirmation', 'Booking Confirmation', 'Your Booking Confirmation - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Booking Confirmation</h2><p>Hi {{clientName}},</p><p>Your consultation booking has been confirmed!</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Package:</strong> {{packageName}}</p><p><strong>Date & Time:</strong> {{dateTime}}</p><p><strong>Duration:</strong> {{duration}}</p><p><strong>Booking ID:</strong> {{bookingId}}</p></div><p>A Zoom link will be sent 24 hours before your session.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["clientName", "packageName", "dateTime", "duration", "bookingId"]', true),

('contact-form', 'Contact Form Submission', 'We Received Your Message - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Message Received</h2><p>Hi {{senderName}},</p><p>Thank you for reaching out. We''ve received your message and will get back to you as soon as possible.</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Subject:</strong> {{subject}}</p><p><strong>Message ID:</strong> {{messageId}}</p></div><p>Expected response time: 24-48 hours</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["senderName", "subject", "messageId"]', true),

('download-link', 'Download Link', 'Your Download Link - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Your Download is Ready</h2><p>Hi {{customerName}},</p><p>Your {{productName}} is ready to download!</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Product:</strong> {{productName}}</p><p><strong>Order ID:</strong> {{orderId}}</p><a href="{{downloadUrl}}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 10px 0;">Download Now</a></div><p>This link will expire in 7 days.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["customerName", "productName", "orderId", "downloadUrl"]', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
