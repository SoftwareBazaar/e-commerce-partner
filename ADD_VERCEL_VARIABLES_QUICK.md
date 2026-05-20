# ⚡ Add Vercel Variables - Quick Guide

**Time:** 5 minutes  
**Files:** 
- `VERCEL_ENVIRONMENT_VARIABLES.md` - Detailed format
- `VERCEL_ENV_SIMPLE.txt` - Simple copy-paste format

---

## 🚀 QUICK STEPS

### Step 1: Open Vercel
```
Go to: https://vercel.com/dashboard
Find: Robert Trading Tools
Click: On the project
```

### Step 2: Go to Environment Variables
```
Click: Settings tab
Click: Environment Variables (left sidebar)
```

### Step 3: Add Variables
```
For each of the 7 variables:
1. Click: Add New
2. Copy Name from VERCEL_ENVIRONMENT_VARIABLES.md
3. Paste into: Name field
4. Copy Value from VERCEL_ENVIRONMENT_VARIABLES.md
5. Paste into: Value field
6. Select: Production, Preview, Development
7. Click: Add
```

### Step 4: Verify
```
You should see 7 variables listed
All should show: Production, Preview, Development
```

---

## 📋 THE 7 VARIABLES

1. VITE_SUPABASE_PROJECT_ID
2. VITE_SUPABASE_PUBLISHABLE_KEY
3. VITE_SUPABASE_URL
4. SENDGRID_FROM_EMAIL
5. SENDGRID_VERIFIED_EMAIL
6. SUPABASE_SECRET_KEY
7. SUPABASE_LEGACY_KEY

---

## 📄 FILES TO USE

**For detailed format with instructions:**
- Open: `VERCEL_ENVIRONMENT_VARIABLES.md`

**For simple copy-paste:**
- Open: `VERCEL_ENV_SIMPLE.txt`

---

## ✅ DONE!

After adding all 7 variables:
- ✅ Vercel can connect to Supabase
- ✅ Vercel can send emails
- ✅ Automatic deployments work
- ✅ Your platform is configured

---

## 🎯 NEXT STEPS

After adding variables:

1. Apply Database Schema (5 min)
2. Create Storage Buckets (5 min)
3. Deploy Edge Function (5 min)
4. Quick Tests (5 min)

**Total remaining:** 20 minutes

---

**Let's go! 🚀**

