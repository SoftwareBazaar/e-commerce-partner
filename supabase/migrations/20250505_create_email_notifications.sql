-- Create email_notifications table
CREATE TABLE IF NOT EXISTS email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email VARCHAR(255) NOT NULL,
  template_id VARCHAR(100) NOT NULL,
  template_variables JSONB NOT NULL DEFAULT '{}',
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  message_id VARCHAR(255),
  error TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_email_notifications_recipient ON email_notifications(recipient_email);
CREATE INDEX idx_email_notifications_status ON email_notifications(status);
CREATE INDEX idx_email_notifications_template_id ON email_notifications(template_id);
CREATE INDEX idx_email_notifications_created_at ON email_notifications(created_at DESC);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  variables JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO email_templates (id, name, subject, html_content, variables) VALUES
('order-confirmation', 'Order Confirmation', 'Your Order Confirmation - Robert Trading Tools', 
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Order Confirmation</h2><p>Hi {{customerName}},</p><p>Thank you for your purchase! Your order has been confirmed.</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Order ID:</strong> {{orderId}}</p><p><strong>Product:</strong> {{productName}}</p><p><strong>Amount:</strong> ${{amount}}</p><p><strong>Date:</strong> {{orderDate}}</p></div><p>You will receive a download link shortly.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["customerName", "orderId", "productName", "amount", "orderDate"]'),
('custom-ea-request', 'Custom EA Request Received', 'Your Custom EA Request - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Custom EA Request Received</h2><p>Hi {{clientName}},</p><p>Thank you for submitting your custom EA request. We''ve received your details and will review them shortly.</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Request ID:</strong> {{requestId}}</p><p><strong>Strategy:</strong> {{strategy}}</p><p><strong>Budget Range:</strong> {{budgetRange}}</p><p><strong>Deadline:</strong> {{deadline}}</p></div><p>We''ll contact you within 24 hours with a quote and timeline.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["clientName", "requestId", "strategy", "budgetRange", "deadline"]'),
('booking-confirmation', 'Booking Confirmation', 'Your Booking Confirmation - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Booking Confirmation</h2><p>Hi {{clientName}},</p><p>Your consultation booking has been confirmed!</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Package:</strong> {{packageName}}</p><p><strong>Date & Time:</strong> {{dateTime}}</p><p><strong>Duration:</strong> {{duration}}</p><p><strong>Booking ID:</strong> {{bookingId}}</p></div><p>A Zoom link will be sent 24 hours before your session.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["clientName", "packageName", "dateTime", "duration", "bookingId"]'),
('contact-form', 'Contact Form Submission', 'We Received Your Message - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Message Received</h2><p>Hi {{senderName}},</p><p>Thank you for reaching out. We''ve received your message and will get back to you as soon as possible.</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Subject:</strong> {{subject}}</p><p><strong>Message ID:</strong> {{messageId}}</p></div><p>Expected response time: 24-48 hours</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["senderName", "subject", "messageId"]'),
('download-link', 'Download Link', 'Your Download Link - Robert Trading Tools',
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>Your Download is Ready</h2><p>Hi {{customerName}},</p><p>Your {{productName}} is ready to download!</p><div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Product:</strong> {{productName}}</p><p><strong>Order ID:</strong> {{orderId}}</p><a href="{{downloadUrl}}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 10px 0;">Download Now</a></div><p>This link will expire in 7 days.</p><p>Best regards,<br>Robert Trading Tools Team</p></div>',
'["customerName", "productName", "orderId", "downloadUrl"]')
ON CONFLICT (id) DO NOTHING;

-- Create orders table (if not exists)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  mode VARCHAR(50) NOT NULL CHECK (mode IN ('buy', 'rent')),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Create custom_ea_requests table
CREATE TABLE IF NOT EXISTS custom_ea_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  strategy TEXT NOT NULL,
  entry_rules TEXT,
  exit_rules TEXT,
  indicators TEXT,
  pairs TEXT,
  timeframes TEXT,
  budget_range VARCHAR(100),
  deadline DATE,
  risk_preferences JSONB,
  file_url VARCHAR(500),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'in_progress', 'completed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_custom_ea_requests_client_email ON custom_ea_requests(client_email);
CREATE INDEX idx_custom_ea_requests_status ON custom_ea_requests(status);
CREATE INDEX idx_custom_ea_requests_created_at ON custom_ea_requests(created_at DESC);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  package_id VARCHAR(100) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  trading_experience VARCHAR(100),
  goals TEXT,
  notes TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  zoom_link VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bookings_client_email ON bookings(client_email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_date ON bookings(scheduled_date);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_email VARCHAR(255) NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_sender_email ON contact_submissions(sender_email);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_ea_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access to templates
CREATE POLICY "Allow public read access to email_templates" ON email_templates
  FOR SELECT USING (true);

-- Create RLS policies for authenticated users
CREATE POLICY "Allow users to view their own notifications" ON email_notifications
  FOR SELECT USING (auth.uid()::text = recipient_email OR auth.role() = 'authenticated');

CREATE POLICY "Allow users to view their own orders" ON orders
  FOR SELECT USING (auth.uid()::text = customer_email OR auth.role() = 'authenticated');

CREATE POLICY "Allow users to view their own custom EA requests" ON custom_ea_requests
  FOR SELECT USING (auth.uid()::text = client_email OR auth.role() = 'authenticated');

CREATE POLICY "Allow users to view their own bookings" ON bookings
  FOR SELECT USING (auth.uid()::text = client_email OR auth.role() = 'authenticated');

CREATE POLICY "Allow users to view their own contact submissions" ON contact_submissions
  FOR SELECT USING (auth.uid()::text = sender_email OR auth.role() = 'authenticated');
