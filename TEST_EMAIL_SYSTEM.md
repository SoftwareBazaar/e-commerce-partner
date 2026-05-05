# 🔍 TEST EMAIL SYSTEM - Troubleshooting Guide

## Why Emails Aren't Being Sent

The email system requires:
1. ✅ Edge Function deployed to Supabase
2. ✅ SendGrid API key set in Supabase Vault
3. ✅ Code deployed to Vercel

Let's verify each step:

---

## Step 1: Verify Edge Function is Deployed

### Check if Function Exists:
1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/functions
2. Look for a function called **"send-email"**
3. Check if it shows status: **"Active"** or **"Deployed"**

**If you DON'T see "send-email" function:**
- The Edge Function wasn't deployed yet
- Follow the deployment steps below

**If you DO see it:**
- Click on the function
- Check the "Logs" tab for any errors
- Proceed to Step 2

---

## Step 2: Verify SendGrid API Key is Set

### Check Vault:
1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/settings/vault
2. Look for a secret called **"SENDGRID_API_KEY"**

**If you DON'T see it:**
1. Click **"New secret"**
2. Name: `SENDGRID_API_KEY`
3. Secret: `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon`
4. Click **"Create secret"**

**If you DO see it:**
- Proceed to Step 3

---

## Step 3: Deploy Edge Function (If Not Done)

### Option A: Via Supabase Dashboard (Easiest)

1. **Go to Functions Page**:
   https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/functions

2. **Create New Function** (if not exists):
   - Click **"Create a new function"**
   - Name: `send-email`
   - Click **"Create function"**

3. **Copy the Code**:
   Open file: `e-commerce-partner-main/supabase/functions/send-email/index.ts`
   
   Copy ALL the code from that file.

4. **Paste and Deploy**:
   - In Supabase dashboard, paste the code
   - Click **"Deploy"** button
   - Wait 30 seconds

5. **Verify Deployment**:
   - You should see "Function deployed successfully"
   - Status should show "Active"

---

## Step 4: Test the Email System

### Quick Test:

1. **Open Browser Console** (F12)
2. **Go to your live site**
3. **Scroll to footer**
4. **Enter your email**
5. **Click send**
6. **Check Console for errors**

Look for messages like:
- ✅ `[emailService] Sending email notification`
- ✅ `[emailService] Email sent successfully`
- ❌ `Error: Failed to fetch` (means Edge Function not deployed)
- ❌ `SENDGRID_API_KEY not configured` (means API key not set)

---

## Step 5: Check SendGrid API Key is Valid

### Verify SendGrid Key:

1. Go to: https://app.sendgrid.com/settings/api_keys
2. Check if your API key exists and is active
3. Key should start with: `SG.i6jVPQVdRo-eZblpepC3yg...`

**If key is invalid or revoked:**
1. Create a new API key in SendGrid
2. Update it in Supabase Vault
3. Update it in Vercel environment variables

---

## Step 6: Check Vercel Environment Variables

### Verify Vercel Has SendGrid Key:

1. Go to: https://vercel.com/dashboard
2. Click on your project: `e-commerce-partner`
3. Go to **Settings** → **Environment Variables**
4. Check if these exist:
   - `VITE_SENDGRID_API_KEY`
   - `VITE_SENDGRID_FROM_EMAIL`

**If missing:**
1. Add `VITE_SENDGRID_API_KEY` = `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon`
2. Add `VITE_SENDGRID_FROM_EMAIL` = `neuroalgoforexedge@gmail.com`
3. Redeploy

---

## Common Issues & Solutions

### Issue 1: "Failed to fetch"
**Cause**: Edge Function not deployed  
**Solution**: Deploy Edge Function (Step 3)

### Issue 2: "SENDGRID_API_KEY not configured"
**Cause**: API key not in Supabase Vault  
**Solution**: Add API key to Vault (Step 2)

### Issue 3: Email sends but not received
**Cause**: SendGrid API key invalid or email not verified  
**Solution**: 
- Check SendGrid dashboard for errors
- Verify sender email in SendGrid
- Check spam folder

### Issue 4: "Function not found"
**Cause**: Edge Function name mismatch  
**Solution**: Ensure function is named exactly `send-email`

---

## Quick Fix: Deploy Everything Now

If you want to fix everything in one go:

### 1. Deploy Edge Function:
```
Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/functions
Click: "Create a new function"
Name: send-email
Paste code from: e-commerce-partner-main/supabase/functions/send-email/index.ts
Click: "Deploy"
```

### 2. Add SendGrid Key to Vault:
```
Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/settings/vault
Click: "New secret"
Name: SENDGRID_API_KEY
Value: SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon
Click: "Create secret"
```

### 3. Test:
```
Go to your live site
Scroll to footer
Enter email
Click send
Check email inbox (and spam folder)
```

---

## Still Not Working?

If emails still don't send after following all steps:

1. **Take screenshots of**:
   - Supabase Functions page (showing send-email function)
   - Supabase Vault page (showing SENDGRID_API_KEY exists)
   - Browser console when submitting email
   - Any error messages

2. **Share with me**:
   - Which step failed
   - What error message you see
   - Screenshots

3. **Alternative Solution**:
   - We can switch to a simpler email service
   - Or handle newsletter subscriptions manually via WhatsApp

---

## 📞 Need Help?

**WhatsApp**: +254 791 282295

I'll help you get the email system working!

---

**Most Common Fix**: Just deploy the Edge Function (Step 3) and add the API key to Vault (Step 2). That solves 90% of email issues!
