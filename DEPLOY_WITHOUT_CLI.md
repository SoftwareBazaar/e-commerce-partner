# 🚀 Deploy WITHOUT Supabase CLI (Easy Method)

Since the Supabase CLI installation is having issues, let's deploy using the **Supabase Dashboard** instead. This is actually easier!

---

## Step 1: Deploy Edge Function via Dashboard (5 minutes)

### 1.1 Go to Supabase Dashboard
Open this link: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/functions

### 1.2 Create New Function
1. Click **"Create a new function"** button
2. Function name: `send-email`
3. Click **"Create function"**

### 1.3 Copy the Function Code
Open the file: `e-commerce-partner-main/supabase/functions/send-email/index.ts`

Copy ALL the code from that file.

### 1.4 Paste and Deploy
1. In the Supabase dashboard, paste the code into the editor
2. Click **"Deploy"** button
3. Wait for deployment to complete (30 seconds)

### 1.5 Set SendGrid API Key
1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/settings/vault
2. Click **"New secret"**
3. Name: `SENDGRID_API_KEY`
4. Value: `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon`
5. Click **"Save"**

✅ **Done!** Your Edge Function is deployed!

---

## Step 2: Deploy to Vercel (10 minutes)

### 2.1 Get Your Supabase Anon Key
1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/settings/api
2. Copy the **"anon public"** key (starts with `eyJ...`)
3. Keep it ready for next step

### 2.2 Import to Vercel
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: `SoftwareBazaar/e-commerce-partner`
4. Click **"Import"**

### 2.3 Add Environment Variables
Before clicking Deploy, add these environment variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://zowfbftptnkypdwsnbkhh.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | *(Paste the key from step 2.1)* |
| `VITE_SENDGRID_API_KEY` | `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon` |
| `VITE_SENDGRID_FROM_EMAIL` | `neuroalgoforexedge@gmail.com` |

**How to add them:**
1. Click **"Environment Variables"** section
2. For each variable:
   - Type the **Name** in first box
   - Type the **Value** in second box
   - Click **"Add"**
3. Repeat for all 4 variables

### 2.4 Deploy!
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://e-commerce-partner.vercel.app`

### 2.5 Add Site URL (Important!)
1. Copy your Vercel URL from step 2.4
2. Go to Vercel → Your Project → **Settings** → **Environment Variables**
3. Add one more variable:
   - Name: `VITE_SITE_URL`
   - Value: *(Your Vercel URL)*
4. Go to **Deployments** tab
5. Click **"Redeploy"** on the latest deployment

✅ **Done!** Your site is live!

---

## Step 3: Test Your Live Site (2 minutes)

Visit your Vercel URL and test:

1. ✅ Homepage loads
2. ✅ Click "Marketplace" - products show
3. ✅ Click "Sign Up" - create account
4. ✅ Add product to cart
5. ✅ Go to checkout
6. ✅ WhatsApp button works (+254 791 282295)
7. ✅ No errors in browser console (F12)

---

## 🎉 You're Live!

Your e-commerce platform is now live and accessible worldwide!

### What's Working:
- ✅ Full marketplace
- ✅ User authentication
- ✅ Shopping cart & checkout
- ✅ Custom EA requests
- ✅ Booking system
- ✅ Blog
- ✅ Affiliate program
- ✅ Admin dashboard
- ✅ Email notifications
- ✅ WhatsApp integration

### Automatic Updates:
Every time you push to GitHub, Vercel automatically rebuilds and deploys!

---

## 📞 Need Help?

If you get stuck on any step:
1. Take a screenshot
2. Share the exact error message
3. Tell me which step you're on

**WhatsApp**: +254 791 282295

---

## 🔄 Alternative: Install Supabase CLI (Optional)

If you want to install the CLI for future use, here's how:

### Method 1: Download Installer
1. Go to: https://github.com/supabase/cli/releases/latest
2. Download: `supabase_windows_amd64.zip`
3. Extract the zip file
4. Move `supabase.exe` to `C:\Windows\System32\`
5. Restart PowerShell
6. Test: `supabase --version`

### Method 2: Install Scoop First, Then Supabase
```powershell
# Install Scoop (run in PowerShell as Admin)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install Supabase CLI
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

But honestly, **using the Dashboard is easier** and you don't need the CLI! 😊

---

**Ready?** Start with Step 1 above! 🚀
