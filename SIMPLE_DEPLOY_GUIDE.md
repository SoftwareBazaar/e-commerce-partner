# 🚀 SIMPLE DEPLOY GUIDE (No CLI Needed!)

Follow these steps exactly. Takes 15 minutes total.

---

## PART 1: Deploy Email Function (5 minutes)

### Step 1: Open Supabase Functions Page
Click this link: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/functions

### Step 2: Create New Function
1. Click the green **"Create a new function"** button
2. In the popup:
   - Function name: `send-email`
   - Click **"Create function"**

### Step 3: Copy This Code
Open the file on your computer:
```
e-commerce-partner-main/supabase/functions/send-email/index.ts
```

Select ALL the code (Ctrl+A) and copy it (Ctrl+C)

**OR** copy this code:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send";

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
  text?: string;
  replyTo?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const emailRequest: EmailRequest = await req.json();

    if (!emailRequest.to || !emailRequest.subject || !emailRequest.html) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: to, subject, html",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: emailRequest.to }],
          subject: emailRequest.subject,
        },
      ],
      from: {
        email: emailRequest.from || "neuroalgoforexedge@gmail.com",
        name: "Robert Trading Tools",
      },
      content: [
        {
          type: "text/html",
          value: emailRequest.html,
        },
      ],
      ...(emailRequest.text && {
        content: [
          { type: "text/plain", value: emailRequest.text },
          { type: "text/html", value: emailRequest.html },
        ],
      }),
      ...(emailRequest.replyTo && {
        replyTo: {
          email: emailRequest.replyTo,
        },
      }),
    };

    const response = await fetch(SENDGRID_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("SendGrid error:", error);
      throw new Error(`SendGrid API error: ${response.status} - ${error}`);
    }

    const messageId = response.headers.get("x-message-id") || `msg_${Date.now()}`;

    return new Response(
      JSON.stringify({
        success: true,
        messageId,
        message: "Email sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error in send-email function:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
```

### Step 4: Paste and Deploy
1. In the Supabase dashboard, **delete** any existing code in the editor
2. **Paste** the code you copied (Ctrl+V)
3. Click the **"Deploy"** button (top right)
4. Wait 30 seconds for "Deployed successfully" message

### Step 5: Add SendGrid API Key
1. Click this link: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/settings/vault
2. Click **"New secret"** button
3. Fill in:
   - Name: `SENDGRID_API_KEY`
   - Value: `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon`
4. Click **"Save"**

✅ **Part 1 Done!** Email function is deployed.

---

## PART 2: Get Supabase Key (1 minute)

### Step 6: Copy Your Supabase Anon Key
1. Click this link: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh/settings/api
2. Find the section **"Project API keys"**
3. Copy the **"anon public"** key (it's a long string starting with `eyJ...`)
4. **Save it in a notepad** - you'll need it in the next part

---

## PART 3: Deploy to Vercel (10 minutes)

### Step 7: Import Repository to Vercel
1. Go to: https://vercel.com/new
2. If not logged in, sign in with GitHub
3. Click **"Import Git Repository"**
4. Find and select: `SoftwareBazaar/e-commerce-partner`
5. Click **"Import"**

### Step 8: Add Environment Variables
**BEFORE clicking Deploy**, scroll down to **"Environment Variables"** section.

Add these 4 variables one by one:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://zowfbftptnkypdwsnbkhh.supabase.co`
- Click **"Add"**

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: *(Paste the key you copied in Step 6)*
- Click **"Add"**

**Variable 3:**
- Name: `VITE_SENDGRID_API_KEY`
- Value: `SG.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon`
- Click **"Add"**

**Variable 4:**
- Name: `VITE_SENDGRID_FROM_EMAIL`
- Value: `neuroalgoforexedge@gmail.com`
- Click **"Add"**

### Step 9: Deploy!
1. Click the big **"Deploy"** button
2. Wait 2-3 minutes (you'll see a progress screen)
3. When done, you'll see "Congratulations!" with your live URL
4. **Copy your URL** (something like `https://e-commerce-partner-xyz.vercel.app`)

### Step 10: Add Site URL and Redeploy
1. In Vercel, click **"Continue to Dashboard"**
2. Click **"Settings"** tab (top menu)
3. Click **"Environment Variables"** (left sidebar)
4. Click **"Add New"** button
5. Add:
   - Name: `VITE_SITE_URL`
   - Value: *(Paste your Vercel URL from Step 9)*
   - Click **"Save"**
6. Click **"Deployments"** tab (top menu)
7. Find the latest deployment (top of list)
8. Click the **"..."** menu button
9. Click **"Redeploy"**
10. Click **"Redeploy"** to confirm

✅ **Part 3 Done!** Your site is live!

---

## PART 4: Test Your Site (2 minutes)

### Step 11: Visit Your Live Site
1. Go to your Vercel URL (from Step 9)
2. Test these things:
   - ✅ Homepage loads
   - ✅ Click "Marketplace" - see products
   - ✅ Click "Sign Up" - create account
   - ✅ Add product to cart
   - ✅ WhatsApp button works (+254 791 282295)

### Step 12: Check for Errors
1. Press **F12** to open browser console
2. Look for any red error messages
3. If you see errors, take a screenshot and share with me

---

## 🎉 YOU'RE LIVE!

Your e-commerce platform is now live at your Vercel URL!

### What's Working:
✅ Full marketplace with products  
✅ User authentication (sign up/login)  
✅ Shopping cart & checkout  
✅ Custom EA requests  
✅ Booking system  
✅ Blog  
✅ Affiliate program  
✅ Admin dashboard  
✅ Email notifications  
✅ WhatsApp integration (+254 791 282295)  

### Automatic Updates:
Every time you push code to GitHub, Vercel automatically rebuilds and deploys!

---

## 📞 Got Stuck?

If you get stuck on any step:
1. Take a screenshot
2. Tell me which step number
3. Share any error messages

**WhatsApp**: +254 791 282295

---

## 🔗 Important Links

- **Your Live Site**: *(Your Vercel URL)*
- **Supabase Dashboard**: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkhh
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/SoftwareBazaar/e-commerce-partner

---

**Ready?** Start with Part 1, Step 1! 🚀
