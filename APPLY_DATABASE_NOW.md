# ⚡ Apply Database Schema NOW

**Quick 5-minute guide to apply the complete database schema**

---

## 🚀 Fastest Way (Copy & Paste)

### Step 1: Open Supabase SQL Editor
1. Go to https://app.supabase.com
2. Select project: `zowfbftptnkypdwsnbkhh`
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**

### Step 2: Copy the SQL
1. Open file: `e-commerce-partner-main/supabase/migrations/20260505_complete_database_schema.sql`
2. Select all (Ctrl+A)
3. Copy (Ctrl+C)

### Step 3: Paste and Run
1. Paste into SQL Editor (Ctrl+V)
2. Click **Run** button (or Ctrl+Enter)
3. Wait for completion
4. You should see: "Database schema migration completed successfully!"

### Step 4: Verify
1. Go to **Table Editor** (left sidebar)
2. You should see 20 tables:
   - users
   - products
   - orders
   - custom_ea_requests
   - bookings
   - contact_submissions
   - email_notifications
   - email_templates
   - product_reviews
   - cart_items
   - wishlist
   - affiliates
   - affiliate_referrals
   - blog_posts
   - blog_comments
   - activity_log
   - system_settings
   - notifications
   - analytics
   - mentorship_packages

---

## ✅ Done!

Your database now has:
- ✅ 20 comprehensive tables
- ✅ 200+ columns
- ✅ 50+ indexes
- ✅ Row Level Security
- ✅ 5 email templates
- ✅ Foreign key relationships

---

## 📦 Next: Create Storage Buckets

### Step 1: Go to Storage
1. In Supabase, click **Storage** (left sidebar)
2. Click **Create a new bucket**

### Step 2: Create Bucket 1
- Name: `custom-ea-files`
- Public: OFF
- Click **Create bucket**

### Step 3: Create Bucket 2
- Name: `product-images`
- Public: ON
- Click **Create bucket**

### Step 4: Create Bucket 3
- Name: `user-documents`
- Public: OFF
- Click **Create bucket**

---

## 🎉 Complete!

Your database is now ready with:
- ✅ 20 tables
- ✅ 3 storage buckets
- ✅ Security policies
- ✅ Email templates
- ✅ Indexes

**Next:** Deploy Edge Function and test!

---

## 📋 What Each Table Does

| Table | Purpose |
|-------|---------|
| **users** | User accounts and profiles |
| **products** | Trading tools (EAs, Indicators, etc.) |
| **orders** | Purchase orders and transactions |
| **custom_ea_requests** | Custom EA development requests |
| **bookings** | Consultation bookings |
| **contact_submissions** | Contact form messages |
| **email_notifications** | Email tracking and logs |
| **email_templates** | Email templates (5 pre-built) |
| **product_reviews** | Product reviews and ratings |
| **cart_items** | Shopping cart items |
| **wishlist** | User wishlists |
| **affiliates** | Affiliate program members |
| **affiliate_referrals** | Affiliate referrals and commissions |
| **blog_posts** | Blog articles |
| **blog_comments** | Blog comments |
| **activity_log** | User activity tracking |
| **system_settings** | System configuration |
| **notifications** | User notifications |
| **analytics** | Event analytics |
| **mentorship_packages** | Consultation packages |

---

## 🔐 Security

All tables have:
- ✅ Row Level Security (RLS)
- ✅ Public/private access control
- ✅ User-specific data isolation
- ✅ Admin-only sensitive data

---

## 📊 Storage Buckets

| Bucket | Type | Purpose |
|--------|------|---------|
| **custom-ea-files** | Private | Custom EA uploads |
| **product-images** | Public | Product images |
| **user-documents** | Private | User documents |

---

## 🧪 Test Your Database

After applying schema, run these queries:

```sql
-- Check tables created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check email templates
SELECT * FROM email_templates;

-- Check products (empty initially)
SELECT COUNT(*) FROM products;

-- Check users (empty initially)
SELECT COUNT(*) FROM users;
```

---

## ⚠️ Troubleshooting

### Error: "Relation already exists"
- Table already created
- Drop and recreate or skip

### Error: "Permission denied"
- Check RLS policies
- Verify authentication

### Error: "Foreign key constraint"
- Parent table doesn't exist
- Create parent table first

### Slow execution
- Large migration
- Wait for completion
- Check Supabase status

---

## 📞 Need Help?

- **Supabase Docs:** https://supabase.com/docs
- **SQL Guide:** See `SQL_EDITOR_GUIDE.md`
- **Storage Guide:** See `STORAGE_BUCKETS_GUIDE.md`

---

## 🎯 Your Progress

- [x] GitHub connected
- [x] Code pushed
- [ ] **Database schema applied** ← YOU ARE HERE
- [ ] Storage buckets created
- [ ] Edge Function deployed
- [ ] Everything tested

---

**Ready? Go to Supabase and apply the schema now! 🚀**

