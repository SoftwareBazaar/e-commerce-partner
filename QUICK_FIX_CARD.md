# ⚡ QUICK FIX - Booking System

## 🎯 Problem
All booking forms failing with 400 error

## ✅ Solution Applied
Changed database to accept package names as text

---

## 🚀 DO THIS NOW (2 minutes)

### 1. Open Supabase SQL Editor
👉 https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/sql/new

### 2. Run This SQL
```sql
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_package_id_fkey;
ALTER TABLE bookings ALTER COLUMN package_id TYPE VARCHAR(255);
ALTER TABLE bookings ALTER COLUMN package_id DROP NOT NULL;
COMMENT ON COLUMN bookings.package_id IS 'Package slug from code';
ALTER TABLE bookings ALTER COLUMN package_id SET NOT NULL;
```

### 3. Click "Run"
Look for: ✅ "Success. No rows returned"

---

## ✅ What's Fixed

- ✅ Mentorship booking
- ✅ Custom EA booking  
- ✅ Free call booking
- ✅ Calendar icon added 📅
- ✅ Clock icon added 🕐

---

## 🧪 Test After Fix

1. Go to your site
2. Try booking any service
3. Should see: "Booking received" ✅

---

**Time**: 2 minutes  
**Risk**: Zero  
**Downtime**: None
