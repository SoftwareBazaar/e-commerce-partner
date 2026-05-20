# Enhanced Admin Panel - Complete Guide

## Overview
The admin panel has been significantly enhanced with comprehensive content management capabilities. Admins now have a centralized dashboard to manage all aspects of the NeuroAlgo platform.

## New Features Added

### 1. Dashboard Tab
- **Overview Statistics**: Display of total products, orders, users, and pending bookings
- **Quick Actions**: Shortcuts to create new products, posts, pages, and FAQs

### 2. User Management Tab
- View all registered users with their profiles
- Display user information: name, email, phone, country
- User status indicators (Active/Inactive)
- Registration date tracking

### 3. Site Settings Tab
- **Company Information**:
  - Company name
  - Company email
  - Phone number
  - Address
  
- **Localization**:
  - Currency selection (USD, EUR, GBP, JPY, AUD)
  - Timezone configuration
  
- **Branding**:
  - Logo URL
  - Footer text
  - Social media links

### 4. Content Management Tab
- Create and edit custom pages
- Page slug for URL structure (e.g., `/about`, `/faq`)
- Rich content support (HTML/Markdown)
- Publish/Draft status control
- Create pages for:
  - About Us
  - Privacy Policy
  - Terms of Service
  - How It Works
  - Custom landing pages

### 5. FAQs Management Tab
- Create frequently asked questions
- Organize by category (General, Technical, Pricing, Support, etc.)
- Set display order
- Active/Inactive status toggle
- Features:
  - Question field
  - Answer field with rich text
  - Category grouping
  - Display order control

### 6. Existing Features (Maintained)
- **Products Management**: Create, edit, delete products with pricing
- **Orders Management**: Track and update order status
- **EA Requests**: Manage custom EA requests with status tracking
- **Bookings Management**: Track mentorship bookings
- **Messages**: View contact form submissions
- **Blog Management**: Create and publish blog posts
- **Subscribers**: View newsletter subscribers

## Database Tables

### site_settings
Stores global site configuration:
```sql
- id (UUID)
- company_name
- company_email
- phone
- address
- currency
- timezone
- logo_url
- footer_text
- social_links (JSONB)
- created_at
- updated_at
```

### page_contents
Manages custom pages:
```sql
- id (UUID)
- page_slug (unique)
- title
- content
- meta_description
- meta_keywords
- is_published
- created_at
- updated_at
```

### faqs
Manages frequently asked questions:
```sql
- id (UUID)
- question
- answer
- category
- display_order
- is_active
- created_at
- updated_at
```

## Access Control
- **Admin Only**: All admin panel features require admin privileges
- **RLS Policies**: Row-level security ensures only admins can modify content
- **Public Visibility**: Published pages and active FAQs are visible to all users

## How to Deploy

1. **Apply Database Migration**:
   - Run the migration: `20260520_add_content_management_tables.sql`
   - Or apply through Supabase console

2. **Verify Admin Status**:
   - Current user must claim admin role first
   - Use "Claim admin (first-time setup)" button if available

3. **Access Admin Panel**:
   - Navigate to `/admin` route
   - Click "Admin Panel" button in dashboard if you have admin privileges

## Using the Admin Panel

### Create a New Product
1. Go to **Products** tab
2. Click **"New Product"** button
3. Fill in product details (name, price, category, etc.)
4. Upload product image
5. Click **"Create product"**

### Create a New Page
1. Go to **Content** tab
2. Click **"New Page"** button
3. Enter page slug (e.g., `about-us`)
4. Enter page title
5. Add content (HTML or Markdown)
6. Check "Published" to make it live
7. Click **"Save Page"**

### Create FAQ Items
1. Go to **FAQs** tab
2. Click **"New FAQ"** button
3. Enter question
4. Enter answer
5. Set category
6. Set display order (lower numbers appear first)
7. Check "Active" to make it visible
8. Click **"Save FAQ"**

### Configure Site Settings
1. Go to **Settings** tab
2. Enter company information
3. Set currency and timezone
4. Add logo URL
5. Add footer text
6. Click **"Save Settings"**

## Best Practices

1. **Page Slugs**: Use lowercase, hyphenated URLs (e.g., `privacy-policy`, `how-it-works`)
2. **FAQs**: Group related questions in the same category
3. **Content**: Test published pages in different browsers
4. **Backups**: Export important data regularly
5. **Metadata**: Add meta descriptions for SEO (future feature)

## Future Enhancements

- Email template management
- Email campaign automation
- Analytics dashboard
- Import/export functionality
- Advanced search and filtering
- Bulk actions
- Webhook management
- API key management

## Support

For issues with the admin panel:
1. Check console for errors (F12 → Console)
2. Verify admin privileges
3. Ensure all required tables exist in database
4. Contact support with screenshots

## Notes

- All changes are saved immediately
- Deletion operations require confirmation
- Dashboard updates in real-time
- Settings apply globally to the site
