# 🎨 Supabase Setup - Visual Step-by-Step Guide

**Time Required:** 20 minutes total  
**Difficulty:** Easy (Copy & Paste)

---

## 📍 STEP 1: Apply Database Schema (5 minutes)

### 1.1 Open Supabase Dashboard

```
1. Go to: https://app.supabase.com
2. You should see your projects
3. Click on project: "zowfbftptnkypdwsnbkhh"
```

**Screenshot Reference:**
```
┌─────────────────────────────────────────┐
│ Supabase Dashboard                      │
├─────────────────────────────────────────┤
│ Projects:                               │
│ ┌─────────────────────────────────────┐ │
│ │ zowfbftptnkypdwsnbkhh              │ │ ← Click here
│ │ Robert Trading Tools Platform       │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

### 1.2 Open SQL Editor

```
1. In left sidebar, find "SQL Editor"
2. Click on it
3. Click "New Query" button
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Left Sidebar                             │
├──────────────────────────────────────────┤
│ 📊 Dashboard                             │
│ 📋 Table Editor                          │
│ 🗄️  SQL Editor          ← Click here    │
│ 💾 Storage                               │
│ 🔐 Authentication                        │
│ ⚙️  Settings                             │
└──────────────────────────────────────────┘

After clicking SQL Editor:
┌──────────────────────────────────────────┐
│ SQL Editor                               │
├──────────────────────────────────────────┤
│ [+ New Query]  ← Click here              │
│                                          │
│ Recent Queries:                          │
│ (none)                                   │
└──────────────────────────────────────────┘
```

---

### 1.3 Copy the SQL Schema

**In your code editor:**

```
1. Open file: e-commerce-partner-main/supabase/migrations/20260505_complete_database_schema.sql
2. Select all: Ctrl+A
3. Copy: Ctrl+C
```

**File Location:**
```
C:\Users\.User\Desktop\NeuroAlgo\
└── e-commerce-partner-main\
    └── supabase\
        └── migrations\
            └── 20260505_complete_database_schema.sql  ← This file
```

---

### 1.4 Paste into SQL Editor

**In Supabase SQL Editor:**

```
1. Click in the SQL editor text area
2. Paste: Ctrl+V
3. You should see the SQL code appear
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ SQL Editor                               │
├──────────────────────────────────────────┤
│ -- ============================================ │
│ -- ROBERT TRADING TOOLS - DATABASE SCHEMA    │
│ -- ============================================ │
│                                          │
│ CREATE TABLE IF NOT EXISTS users (       │
│   id UUID PRIMARY KEY DEFAULT ...        │
│   ...                                    │
│                                          │
│ [Run]  [Save]  [Format]                  │
└──────────────────────────────────────────┘
```

---

### 1.5 Run the Query

```
1. Click the [Run] button (or press Ctrl+Enter)
2. Wait for execution (should take 10-30 seconds)
3. You should see: "Database schema migration completed successfully!"
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ SQL Editor                               │
├──────────────────────────────────────────┤
│ [Run] ← Click here                       │
│                                          │
│ Query Results:                           │
│ ┌────────────────────────────────────┐  │
│ │ status                             │  │
│ ├────────────────────────────────────┤  │
│ │ Database schema migration          │  │
│ │ completed successfully!            │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

### 1.6 Verify Tables Created

```
1. Click "Table Editor" in left sidebar
2. You should see 20 tables listed:
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
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Table Editor                             │
├──────────────────────────────────────────┤
│ Tables:                                  │
│ ✓ users                                  │
│ ✓ products                               │
│ ✓ orders                                 │
│ ✓ custom_ea_requests                     │
│ ✓ bookings                               │
│ ✓ contact_submissions                    │
│ ✓ email_notifications                    │
│ ✓ email_templates                        │
│ ... (12 more)                            │
└──────────────────────────────────────────┘
```

✅ **STEP 1 COMPLETE!**

---

## 📍 STEP 2: Create Storage Buckets (5 minutes)

### 2.1 Open Storage

```
1. In left sidebar, click "Storage"
2. You should see storage dashboard
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Left Sidebar                             │
├──────────────────────────────────────────┤
│ 📊 Dashboard                             │
│ 📋 Table Editor                          │
│ 🗄️  SQL Editor                           │
│ 💾 Storage          ← Click here         │
│ 🔐 Authentication                        │
│ ⚙️  Settings                             │
└──────────────────────────────────────────┘
```

---

### 2.2 Create First Bucket: custom-ea-files

```
1. Click [Create a new bucket]
2. Fill in:
   - Name: custom-ea-files
   - Public: OFF (toggle to private)
   - Max file size: 10 MB
3. Click [Create bucket]
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Create Bucket Dialog                     │
├──────────────────────────────────────────┤
│ Bucket name:                             │
│ [custom-ea-files________________]        │
│                                          │
│ Public bucket:                           │
│ [OFF] ← Make sure this is OFF            │
│                                          │
│ Max file size (MB):                      │
│ [10_________________]                    │
│                                          │
│ [Cancel]  [Create bucket]                │
└──────────────────────────────────────────┘
```

---

### 2.3 Create Second Bucket: product-images

```
1. Click [Create a new bucket]
2. Fill in:
   - Name: product-images
   - Public: ON (toggle to public)
   - Max file size: 5 MB
3. Click [Create bucket]
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Create Bucket Dialog                     │
├──────────────────────────────────────────┤
│ Bucket name:                             │
│ [product-images________________]         │
│                                          │
│ Public bucket:                           │
│ [ON] ← Make sure this is ON              │
│                                          │
│ Max file size (MB):                      │
│ [5__________________]                    │
│                                          │
│ [Cancel]  [Create bucket]                │
└──────────────────────────────────────────┘
```

---

### 2.4 Create Third Bucket: user-documents

```
1. Click [Create a new bucket]
2. Fill in:
   - Name: user-documents
   - Public: OFF (toggle to private)
   - Max file size: 20 MB
3. Click [Create bucket]
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Create Bucket Dialog                     │
├──────────────────────────────────────────┤
│ Bucket name:                             │
│ [user-documents________________]         │
│                                          │
│ Public bucket:                           │
│ [OFF] ← Make sure this is OFF            │
│                                          │
│ Max file size (MB):                      │
│ [20_________________]                    │
│                                          │
│ [Cancel]  [Create bucket]                │
└──────────────────────────────────────────┘
```

---

### 2.5 Verify Buckets Created

```
1. You should see all 3 buckets listed:
   - custom-ea-files (Private)
   - product-images (Public)
   - user-documents (Private)
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Storage                                  │
├──────────────────────────────────────────┤
│ Buckets:                                 │
│ ┌────────────────────────────────────┐  │
│ │ 📁 custom-ea-files (Private)       │  │
│ │ 📁 product-images (Public)         │  │
│ │ 📁 user-documents (Private)        │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

✅ **STEP 2 COMPLETE!**

---

## 📍 STEP 3: Deploy Edge Function (5 minutes)

### 3.1 Open Terminal

```
1. Open Command Prompt or PowerShell
2. Navigate to project:
   cd C:\Users\.User\Desktop\NeuroAlgo\e-commerce-partner-main
```

---

### 3.2 Deploy Function

```bash
# Deploy the Edge Function
supabase functions deploy send-email

# Set SendGrid API key
supabase secrets set SENDGRID_API_KEY="SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon"
```

**Expected Output:**
```
✓ Function deployed successfully
✓ Function URL: https://zowfbftptnkypdwsnbkhh.supabase.co/functions/v1/send-email
✓ Secret SENDGRID_API_KEY set successfully
```

---

### 3.3 Verify in Supabase

```
1. Go to Supabase Dashboard
2. Click "Edge Functions" in left sidebar
3. You should see "send-email" function listed
4. Status should be "Active"
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Edge Functions                           │
├──────────────────────────────────────────┤
│ Functions:                               │
│ ┌────────────────────────────────────┐  │
│ │ send-email                         │  │
│ │ Status: Active ✓                   │  │
│ │ URL: https://...supabase.co/...    │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

✅ **STEP 3 COMPLETE!**

---

## 📍 STEP 4: Connect Vercel to GitHub (5 minutes)

### 4.1 Open Vercel Dashboard

```
1. Go to: https://vercel.com/dashboard
2. Find your "Robert Trading Tools" project
3. Click on it
```

---

### 4.2 Connect GitHub Repository

```
1. Click "Settings" tab
2. Click "Git" in left sidebar
3. Click "Connect Git Repository"
4. Select "GitHub"
5. Authorize Vercel (if prompted)
6. Select repository: SoftwareBazaar/e-commerce-partner
7. Click "Connect"
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Vercel Project Settings                  │
├──────────────────────────────────────────┤
│ [General] [Git] [Environment] [Domains]  │
│                                          │
│ Git Configuration:                       │
│ ┌────────────────────────────────────┐  │
│ │ [Connect Git Repository]           │  │
│ │                                    │  │
│ │ Repository:                        │  │
│ │ SoftwareBazaar/e-commerce-partner  │  │
│ │ Status: Connected ✓                │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

### 4.3 Add Environment Variables

```
1. Click "Environment Variables" in left sidebar
2. Add each variable:
```

**Variables to Add:**

```
VITE_SUPABASE_PROJECT_ID
Value: zowfbftptnkypdwsnbkhh
Environment: Production, Preview, Development

VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE
Environment: Production, Preview, Development

VITE_SUPABASE_URL
Value: https://zowfbftptnkypdwsnbkhh.supabase.co
Environment: Production, Preview, Development

SENDGRID_FROM_EMAIL
Value: neuroalgoforexedge@gmail.com
Environment: Production, Preview, Development

SENDGRID_VERIFIED_EMAIL
Value: neuroalgoforexedge@gmail.com
Environment: Production, Preview, Development

SUPABASE_SECRET_KEY
Value: sb_secret_YGpw6w4ivFZH3g0uifUHAw_cTz5pSyRJWT
Environment: Production, Preview, Development

SUPABASE_LEGACY_KEY
Value: uOVqJ4Jmmt/ICl9PYhEo4cERI/ItUwLiy8suUk8Y5cAN4wfaxeD9dNR4ZjgcvTUAkoYpgmTVc/Uo5TQ5OGCaHg==
Environment: Production, Preview, Development
```

**Screenshot Reference:**
```
┌──────────────────────────────────────────┐
│ Environment Variables                    │
├──────────────────────────────────────────┤
│ [+ Add New]                              │
│                                          │
│ Variables:                               │
│ ┌────────────────────────────────────┐  │
│ │ VITE_SUPABASE_PROJECT_ID           │  │
│ │ Value: zowfbftptnkypdwsnbkhh       │  │
│ │ Env: Prod, Preview, Dev            │  │
│ │                                    │  │
│ │ VITE_SUPABASE_PUBLISHABLE_KEY      │  │
│ │ Value: eyJhbGciOi...               │  │
│ │ Env: Prod, Preview, Dev            │  │
│ │ ... (5 more)                       │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

### 4.4 Verify Automatic Deployments

```
1. Click "Deployments" tab
2. You should see deployment history
3. Next push to GitHub will trigger automatic deployment
```

✅ **STEP 4 COMPLETE!**

---

## ✅ ALL SETUP COMPLETE!

You now have:
- ✅ 20 database tables
- ✅ 3 storage buckets
- ✅ Edge Function deployed
- ✅ Vercel connected to GitHub
- ✅ Automatic deployments enabled

---

## 🧪 QUICK TEST

### Test 1: Make a GitHub Push

```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify github integration"
git push origin main

# Check Vercel dashboard
# You should see automatic deployment starting
```

### Test 2: Test Form Submission

```
1. Start dev server: npm run dev
2. Go to http://localhost:5173/custom-ea
3. Fill out the form
4. Submit
5. Check your email for confirmation
6. Check Supabase Table Editor for the submission
```

### Test 3: Verify Email Templates

```
1. Go to Supabase
2. Click Table Editor
3. Click "email_templates"
4. You should see 5 templates:
   - order-confirmation
   - custom-ea-request
   - booking-confirmation
   - contact-form
   - download-link
```

---

## 🎉 YOU'RE DONE!

Your Robert Trading Tools Platform is now fully set up with:

✅ Database (20 tables)  
✅ Email notifications (5 templates)  
✅ Storage buckets (3 buckets)  
✅ Edge Functions (send-email)  
✅ GitHub integration  
✅ Automatic Vercel deployments  

**Next Steps:**
1. Add products to the database
2. Configure affiliate program
3. Create blog posts
4. Set up analytics
5. Add payment processing

**Happy trading! 🚀**

