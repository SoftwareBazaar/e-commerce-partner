# 🚀 DEPLOY NOW - Quick Commands

## ✅ Everything is Fixed and Ready!

Your platform is working perfectly on localhost. Time to deploy!

---

## Step 1: Deploy Supabase Edge Function (2 minutes)

Copy and paste these commands one by one:

```bash
cd e-commerce-partner-main
```

```bash
supabase link --project-ref zowfbftptnkypdwsnbkhh
```

```bash
supabase functions deploy send-email
```

```bash
supabase secrets set SENDGRID_API_KEY="SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon"
```

**Expected output**: "Function deployed successfully"

---

## Step 2: Get Your Supabase Anon Key (1 minute)

1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/settings/api
2. Copy the **"anon public"** key (starts with `eyJ...`)
3. Keep it ready for Vercel

---

## Step 3: Deploy to Vercel (5 minutes)

### 3.1 Import Repository
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: `SoftwareBazaar/e-commerce-partner`
4. Click **"Import"**

### 3.2 Add Environment Variables

Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://zowfbftptnkypdwsnbkhh.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | *(Paste the key from Step 2)* |
| `VITE_SENDGRID_API_KEY` | `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon` |
| `VITE_SENDGRID_FROM_EMAIL` | `neuroalgoforexedge@gmail.com` |

### 3.3 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your production URL (e.g., `https://e-commerce-partner.vercel.app`)

### 3.4 Add Site URL
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add one more variable:
   - Name: `VITE_SITE_URL`
   - Value: *(Your production URL from step 3.3)*
3. Click **"Redeploy"** to apply

---

## Step 4: Test Your Live Site (2 minutes)

Visit your production URL and check:

✅ Homepage loads  
✅ Marketplace shows products  
✅ WhatsApp button works (+254 791 282295)  
✅ Sign up/Login works  
✅ No console errors  

---

## 🎉 You're Live!

Your e-commerce platform is now live and accessible worldwide!

### What's Deployed:
- ✅ Full marketplace with products
- ✅ User authentication
- ✅ Shopping cart & checkout
- ✅ Custom EA request system
- ✅ Booking system
- ✅ Blog
- ✅ Affiliate program
- ✅ Admin dashboard
- ✅ Email notifications
- ✅ WhatsApp integration (+254 791 282295)

### Automatic Updates:
Every time you push to GitHub, Vercel will automatically rebuild and deploy your site!

---

## Need Help?

If you encounter any issues during deployment, share:
1. The exact error message
2. Which step you're on
3. Screenshot if possible

**WhatsApp**: +254 791 282295  
**Email**: neuroalgoforexedge@gmail.com

---

**Ready?** Start with Step 1 above! 🚀
