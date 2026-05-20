# 🎯 QUICK REFERENCE CARD - Final Setup

**Print this page or keep it open while completing the 4 steps!**

---

## 📋 THE 4 STEPS (25 minutes total)

### STEP 1: DATABASE SCHEMA (5 min)
```
1. Go to: https://app.supabase.com
2. Select project: zowfbftptnkypdwsnbkhh
3. Click: SQL Editor → New Query
4. Open file: supabase/migrations/20260505_complete_database_schema_safe.sql
5. Copy all (Ctrl+A, Ctrl+C)
6. Paste in SQL Editor (Ctrl+V)
7. Click: Run
8. Wait for: "Query executed successfully"
9. Verify: Go to Table Editor, see 20 tables
```

**✅ Success:** 20 tables visible in Table Editor

---

### STEP 2: STORAGE BUCKETS (5 min)
```
1. Go to: Supabase → Storage
2. Click: Create a new bucket

BUCKET 1:
- Name: custom-ea-files
- Public: OFF
- Max size: 10 MB
- Click: Create bucket

BUCKET 2:
- Name: product-images
- Public: ON
- Max size: 5 MB
- Click: Create bucket

BUCKET 3:
- Name: user-documents
- Public: OFF
- Max size: 20 MB
- Click: Create bucket

3. Verify: All 3 buckets in Storage
```

**✅ Success:** 3 buckets visible in Storage

---

### STEP 3: EDGE FUNCTION (5 min)
```
1. Open Terminal/PowerShell
2. Navigate: cd e-commerce-partner-main
3. Run: supabase link --project-ref zowfbftptnkypdwsnbkhh
4. Enter: Your Supabase password
5. Run: supabase functions deploy send-email
6. Wait for: "✓ Function deployed successfully"
7. Run: supabase secrets set SENDGRID_API_KEY="SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon"
8. Wait for: "✓ Secret set successfully"
9. Verify: Supabase → Edge Functions → send-email (Active)
```

**✅ Success:** send-email function shows as Active

---

### STEP 4: VERCEL GITHUB (5 min)
```
1. Go to: https://vercel.com/dashboard
2. Find: Robert Trading Tools project
3. Click: Settings → Git
4. Click: Connect Git Repository
5. Select: GitHub
6. Authorize: Vercel (if prompted)
7. Search: e-commerce-partner
8. Click: Connect

ADD ENVIRONMENT VARIABLES:
Go to: Settings → Environment Variables

Add these 7 variables (copy-paste):

1. VITE_SUPABASE_PROJECT_ID
   Value: zowfbftptnkypdwsnbkhh

2. VITE_SUPABASE_PUBLISHABLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2ZiZnRwdG5reXBkd3NuYmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjM4NTUsImV4cCI6MjA5MzMzOTg1NX0.qtE931OtEmApjvaoeKnB3Cffy4C9Mn_cDTJcsGIKHGE

3. VITE_SUPABASE_URL
   Value: https://zowfbftptnkypdwsnbkhh.supabase.co

4. SENDGRID_FROM_EMAIL
   Value: neuroalgoforexedge@gmail.com

5. SENDGRID_VERIFIED_EMAIL
   Value: neuroalgoforexedge@gmail.com

6. SUPABASE_SECRET_KEY
   Value: sb_secret_YGpw6w4ivFZH3g0uifUHAw_cTz5pSyRJWT

7. SUPABASE_LEGACY_KEY
   Value: uOVqJ4Jmmt/ICl9PYhEo4cERI/ItUwLiy8suUk8Y5cAN4wfaxeD9dNR4ZjgcvTUAkoYpgmTVc/Uo5TQ5OGCaHg==

For each variable:
- Click: Add New
- Paste: Key name
- Paste: Value
- Select: Production, Preview, Development
- Click: Save

9. Verify: All 7 variables listed
10. Verify: Deployment started in Deployments tab
```

**✅ Success:** All 7 variables set, deployment started

---

## 🧪 QUICK TESTS (5 min)

### Test 1: Database
```
1. npm run dev
2. Go to: http://localhost:5173/custom-ea
3. Fill form and submit
4. Check: Supabase → Table Editor → custom_ea_requests
5. ✅ Your submission appears
```

### Test 2: Email
```
1. Submit any form
2. Check email: neuroalgoforexedge@gmail.com
3. ✅ Confirmation email arrives (within 1 min)
```

### Test 3: GitHub
```
1. Make small change to a file
2. git add . && git commit -m "test: verify"
3. git push origin main
4. Check: Vercel dashboard
5. ✅ Automatic deployment starts
```

### Test 4: Storage
```
1. Go to: Supabase → Storage
2. Click any bucket
3. Upload test file
4. ✅ File appears in bucket
```

---

## 🔑 KEY CREDENTIALS

| Item | Value |
|------|-------|
| Supabase Project ID | `zowfbftptnkypdwsnbkhh` |
| Supabase URL | `https://zowfbftptnkypdwsnbkhh.supabase.co` |
| GitHub Repo | `SoftwareBazaar/e-commerce-partner` |
| SendGrid Email | `neuroalgoforexedge@gmail.com` |
| SendGrid API Key | `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon` |

---

## 🆘 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "relation already exists" | Use SAFE schema file (has IF NOT EXISTS) |
| Supabase CLI not found | `npm install -g supabase` |
| Vercel deployment fails | Check all 7 env vars are set |
| Email not sending | Check Edge Function logs in Supabase |
| GitHub not connecting | Disconnect and reconnect in Vercel |

---

## ✅ COMPLETION CHECKLIST

- [ ] Step 1: Database Schema ✅
- [ ] Step 2: Storage Buckets ✅
- [ ] Step 3: Edge Function ✅
- [ ] Step 4: Vercel GitHub ✅
- [ ] Test 1: Database ✅
- [ ] Test 2: Email ✅
- [ ] Test 3: GitHub ✅
- [ ] Test 4: Storage ✅
- [ ] 🎉 Platform Live!

---

## 📞 HELP

**Detailed Guide:** `FINAL_SETUP_ACTION_PLAN.md`  
**Status Dashboard:** `PLATFORM_STATUS_DASHBOARD.md`  
**Current Status:** `CURRENT_STATUS_AND_NEXT_STEPS.md`

---

## ⏱️ TIME TRACKER

```
Step 1: _____ min (Target: 5 min)
Step 2: _____ min (Target: 5 min)
Step 3: _____ min (Target: 5 min)
Step 4: _____ min (Target: 5 min)
Tests:  _____ min (Target: 5 min)
─────────────────────────────
Total:  _____ min (Target: 25 min)
```

---

## 🚀 YOU'VE GOT THIS!

**Status:** 80% Complete  
**Time Left:** 25 minutes  
**Difficulty:** Easy  

**Start with Step 1 now!**
