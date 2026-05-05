# 🗄️ SQL Editor Guide - Apply Database Schema

Complete guide to apply the database schema using Supabase SQL Editor.

---

## 📋 What's Included

This migration creates **20 comprehensive tables** with all necessary columns:

### Core Tables
1. **users** - User profiles and authentication
2. **products** - Trading tools (EAs, Indicators, Bots, Bundles)
3. **orders** - Purchase orders and transactions
4. **custom_ea_requests** - Custom EA development requests
5. **mentorship_packages** - Consultation packages
6. **bookings** - Consultation bookings
7. **contact_submissions** - Contact form submissions
8. **email_notifications** - Email tracking
9. **email_templates** - Email templates

### Additional Tables
10. **product_reviews** - Product reviews and ratings
11. **cart_items** - Shopping cart items
12. **wishlist** - User wishlists
13. **affiliates** - Affiliate program
14. **affiliate_referrals** - Affiliate referrals
15. **blog_posts** - Blog articles
16. **blog_comments** - Blog comments
17. **activity_log** - User activity tracking
18. **system_settings** - System configuration
19. **notifications** - User notifications
20. **analytics** - Event analytics

---

## 🚀 How to Apply the Schema

### Method 1: Using Supabase Dashboard (Recommended)

#### Step 1: Open SQL Editor
1. Go to https://app.supabase.com
2. Select your project: `zowfbftptnkypdwsnbkhh`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

#### Step 2: Copy the SQL
1. Open file: `supabase/migrations/20260505_complete_database_schema.sql`
2. Copy all the SQL code

#### Step 3: Paste and Execute
1. Paste the SQL into the Supabase SQL Editor
2. Click **Run** button (or press Ctrl+Enter)
3. Wait for execution to complete
4. You should see: "Database schema migration completed successfully!"

#### Step 4: Verify Tables
1. Go to **Table Editor** in left sidebar
2. You should see all 20 tables listed
3. Click each table to verify columns

---

### Method 2: Using Supabase CLI

#### Step 1: Create Migration File
```bash
cd e-commerce-partner-main
supabase migration new complete_database_schema
```

#### Step 2: Copy SQL Content
Copy the content from `supabase/migrations/20260505_complete_database_schema.sql` into the new migration file.

#### Step 3: Run Migration
```bash
supabase migration up
```

#### Step 4: Verify
```bash
supabase db pull
```

---

## 📊 Table Structure Overview

### 1. USERS Table
```sql
Columns:
- id (UUID) - Primary key
- email (VARCHAR) - Unique email
- full_name (VARCHAR) - User's name
- phone (VARCHAR) - Contact number
- avatar_url (VARCHAR) - Profile picture
- bio (TEXT) - User bio
- trading_experience (VARCHAR) - Experience level
- preferred_pairs (TEXT) - Favorite trading pairs
- preferred_timeframes (TEXT) - Favorite timeframes
- notification_preferences (JSONB) - Email/SMS preferences
- is_active (BOOLEAN) - Account status
- is_admin (BOOLEAN) - Admin flag
- created_at (TIMESTAMP) - Creation date
- updated_at (TIMESTAMP) - Last update
```

### 2. PRODUCTS Table
```sql
Columns:
- id (UUID) - Primary key
- slug (VARCHAR) - URL-friendly name
- name (VARCHAR) - Product name
- category (VARCHAR) - EA/Indicator/Bot/Bundle
- compatibility (VARCHAR) - MT4/MT5/Both
- short_description (TEXT) - Brief description
- description (TEXT) - Full description
- buy_price (DECIMAL) - Purchase price
- rent_price (DECIMAL) - Monthly rental price
- rating (DECIMAL) - Average rating (1-5)
- reviews_count (INTEGER) - Number of reviews
- pairs (TEXT) - Trading pairs
- timeframes (TEXT) - Supported timeframes
- youtube_id (VARCHAR) - Demo video ID
- featured (BOOLEAN) - Featured flag
- tags (TEXT) - Product tags
- image_url (VARCHAR) - Product image
- demo_url (VARCHAR) - Demo link
- documentation_url (VARCHAR) - Docs link
- support_email (VARCHAR) - Support contact
- version (VARCHAR) - Product version
- last_updated (TIMESTAMP) - Last update
- is_active (BOOLEAN) - Active status
- created_at (TIMESTAMP) - Creation date
- updated_at (TIMESTAMP) - Last update
```

### 3. ORDERS Table
```sql
Columns:
- id (UUID) - Primary key
- order_number (VARCHAR) - Unique order number
- user_id (UUID) - Foreign key to users
- customer_email (VARCHAR) - Customer email
- customer_name (VARCHAR) - Customer name
- product_id (UUID) - Foreign key to products
- product_name (VARCHAR) - Product name
- amount (DECIMAL) - Order amount
- mode (VARCHAR) - 'buy' or 'rent'
- status (VARCHAR) - pending/completed/failed/refunded/cancelled
- payment_method (VARCHAR) - Payment method used
- transaction_id (VARCHAR) - Payment transaction ID
- download_url (VARCHAR) - Download link
- license_key (VARCHAR) - License key
- expiry_date (DATE) - License expiry
- notes (TEXT) - Order notes
- created_at (TIMESTAMP) - Creation date
- updated_at (TIMESTAMP) - Last update
```

### 4. CUSTOM_EA_REQUESTS Table
```sql
Columns:
- id (UUID) - Primary key
- request_number (VARCHAR) - Unique request number
- user_id (UUID) - Foreign key to users
- client_name (VARCHAR) - Client name
- client_email (VARCHAR) - Client email
- client_phone (VARCHAR) - Client phone
- strategy_name (VARCHAR) - Strategy name
- strategy_description (TEXT) - Strategy details
- entry_rules (TEXT) - Entry conditions
- exit_rules (TEXT) - Exit conditions
- indicators (TEXT) - Indicators to use
- pairs (TEXT) - Trading pairs
- timeframes (TEXT) - Timeframes
- budget_range (VARCHAR) - Budget range
- deadline (DATE) - Project deadline
- risk_preferences (JSONB) - Risk settings
- lot_sizing (VARCHAR) - Lot sizing method
- stop_loss_pips (INTEGER) - Stop loss in pips
- take_profit_pips (INTEGER) - Take profit in pips
- trailing_stop (BOOLEAN) - Trailing stop enabled
- max_daily_loss (DECIMAL) - Max daily loss
- file_url (VARCHAR) - Attached file
- file_name (VARCHAR) - File name
- platform (VARCHAR) - MT4/MT5/Both
- status (VARCHAR) - pending/quoted/in_progress/completed/rejected
- quote_amount (DECIMAL) - Quote price
- quote_date (TIMESTAMP) - Quote date
- completion_date (TIMESTAMP) - Completion date
- notes (TEXT) - Client notes
- admin_notes (TEXT) - Admin notes
- created_at (TIMESTAMP) - Creation date
- updated_at (TIMESTAMP) - Last update
```

### 5. BOOKINGS Table
```sql
Columns:
- id (UUID) - Primary key
- booking_number (VARCHAR) - Unique booking number
- user_id (UUID) - Foreign key to users
- client_name (VARCHAR) - Client name
- client_email (VARCHAR) - Client email
- client_phone (VARCHAR) - Client phone
- package_id (UUID) - Foreign key to mentorship_packages
- package_name (VARCHAR) - Package name
- scheduled_date (DATE) - Booking date
- scheduled_time (TIME) - Booking time
- duration_minutes (INTEGER) - Session duration
- trading_experience (VARCHAR) - Experience level
- goals (TEXT) - Session goals
- notes (TEXT) - Additional notes
- status (VARCHAR) - pending/confirmed/completed/cancelled/rescheduled
- zoom_link (VARCHAR) - Zoom meeting link
- recording_url (VARCHAR) - Session recording
- feedback_rating (INTEGER) - Rating (1-5)
- feedback_text (TEXT) - Feedback
- created_at (TIMESTAMP) - Creation date
- updated_at (TIMESTAMP) - Last update
```

### 6. CONTACT_SUBMISSIONS Table
```sql
Columns:
- id (UUID) - Primary key
- message_id (VARCHAR) - Unique message ID
- sender_name (VARCHAR) - Sender name
- sender_email (VARCHAR) - Sender email
- sender_phone (VARCHAR) - Sender phone
- subject (VARCHAR) - Message subject
- message (TEXT) - Message content
- category (VARCHAR) - Message category
- priority (VARCHAR) - low/normal/high/urgent
- status (VARCHAR) - new/read/responded/closed
- response_text (TEXT) - Response message
- responded_by (UUID) - Admin who responded
- responded_at (TIMESTAMP) - Response time
- created_at (TIMESTAMP) - Creation date
- updated_at (TIMESTAMP) - Last update
```

### 7. EMAIL_NOTIFICATIONS Table
```sql
Columns:
- id (UUID) - Primary key
- recipient_email (VARCHAR) - Email recipient
- template_id (VARCHAR) - Email template ID
- template_variables (JSONB) - Template variables
- status (VARCHAR) - pending/sent/failed/bounced
- message_id (VARCHAR) - SendGrid message ID
- error_message (TEXT) - Error details
- retry_count (INTEGER) - Retry attempts
- sent_at (TIMESTAMP) - Send time
- created_at (TIMESTAMP) - Creation date
- updated_at (TIMESTAMP) - Last update
```

---

## 🔑 Key Features

### Indexes
- All tables have indexes on frequently queried columns
- Improves query performance
- Automatically created with the migration

### Row Level Security (RLS)
- Enabled on all tables
- Public read access for products, blog posts, reviews
- User-specific access for personal data
- Admin-only access for sensitive data

### Foreign Keys
- Referential integrity maintained
- Cascade delete where appropriate
- Prevents orphaned records

### Default Values
- Timestamps auto-populated
- Status fields have defaults
- Counters initialized to 0

---

## 📝 Sample Queries

### Get All Active Products
```sql
SELECT * FROM products WHERE is_active = true;
```

### Get User Orders
```sql
SELECT * FROM orders WHERE user_id = 'user-uuid' ORDER BY created_at DESC;
```

### Get Pending Custom EA Requests
```sql
SELECT * FROM custom_ea_requests WHERE status = 'pending' ORDER BY created_at DESC;
```

### Get Upcoming Bookings
```sql
SELECT * FROM bookings 
WHERE scheduled_date >= CURRENT_DATE 
AND status != 'cancelled'
ORDER BY scheduled_date, scheduled_time;
```

### Get Email Notification Stats
```sql
SELECT 
  status,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE sent_at IS NOT NULL) as sent
FROM email_notifications
GROUP BY status;
```

### Get Product Reviews
```sql
SELECT * FROM product_reviews 
WHERE product_id = 'product-uuid' 
AND status = 'approved'
ORDER BY created_at DESC;
```

---

## ✅ Verification Checklist

After applying the schema, verify:

- [ ] All 20 tables created
- [ ] All columns present
- [ ] Indexes created
- [ ] RLS policies enabled
- [ ] Email templates inserted
- [ ] Foreign keys working
- [ ] Default values set

---

## 🚀 Next Steps

### Step 1: Apply Schema
1. Open Supabase SQL Editor
2. Copy and paste the SQL
3. Click Run

### Step 2: Verify Tables
1. Go to Table Editor
2. Check all 20 tables exist
3. Verify columns

### Step 3: Create Storage Buckets
1. Go to Storage
2. Create 3 buckets:
   - custom-ea-files
   - product-images
   - user-documents

### Step 4: Deploy Edge Function
```bash
supabase functions deploy send-email
```

### Step 5: Test
1. Submit a form
2. Check database for data
3. Verify email sent

---

## 📞 Troubleshooting

### Error: "Relation already exists"
- The table already exists
- Drop the table first or use `IF NOT EXISTS`

### Error: "Foreign key constraint failed"
- Referenced table doesn't exist
- Create parent table first

### Error: "Permission denied"
- Check RLS policies
- Verify user authentication

### Slow queries
- Check indexes are created
- Use EXPLAIN ANALYZE to debug

---

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs
- **SQL Tutorial:** https://www.w3schools.com/sql

---

## 🎉 You're Ready!

Your database schema is complete with:
- ✅ 20 comprehensive tables
- ✅ Proper indexes for performance
- ✅ Row Level Security policies
- ✅ Email templates
- ✅ Foreign key relationships

**Next:** Create storage buckets and deploy Edge Function!

