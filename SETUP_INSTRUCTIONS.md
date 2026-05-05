# Setup Instructions: Supabase, SendGrid & Vercel Integration

Complete step-by-step guide to set up and deploy the Robert Trading Tools platform with email notifications.

## Prerequisites

- Node.js 18+ installed
- npm or bun package manager
- Git installed
- Accounts created for:
  - Supabase (https://supabase.com)
  - SendGrid (https://sendgrid.com)
  - Vercel (https://vercel.com)

---

## Step 1: Environment Setup

### 1.1 Update Environment Variables

Your `.env` file has been pre-configured with the following credentials:

```env
# Supabase
VITE_SUPABASE_PROJECT_ID="zowfbftptnkypdwsnbkhh"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_URL="https://zowfbftptnkypdwsnbkhh.supabase.co"
SUPABASE_SECRET_KEY="sb_secret_YGpw6w4ivFZH3g0uifUHAw_cTz5pSyRJWT"

# SendGrid - NEEDS UPDATE
VITE_SENDGRID_API_KEY="SG.your_api_key_here"
SENDGRID_FROM_EMAIL="neuroalgoforexedge@gmail.com"

# Vercel - NEEDS UPDATE
VERCEL_TOKEN="your_vercel_token_here"
```

### 1.2 Get SendGrid API Key

1. Go to https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Name it "Robert Trading Tools"
4. Select "Mail Send" permissions
5. Copy the key and update `.env`:
   ```env
   VITE_SENDGRID_API_KEY="SG.your_key_here"
   ```

### 1.3 Verify SendGrid Sender Email

1. Go to https://app.sendgrid.com/settings/sender_auth
2. Click "Create New Sender"
3. Fill in:
   - From Email: `neuroalgoforexedge@gmail.com`
   - From Name: `Robert Trading Tools`
   - Reply To: `neuroalgoforexedge@gmail.com`
4. Click "Create"
5. Check your email for verification link
6. Click the link to verify

### 1.4 Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it "Robert Trading Tools"
4. Set expiration to 90 days
5. Copy the token and update `.env`:
   ```env
   VERCEL_TOKEN="your_token_here"
   ```

---

## Step 2: Database Setup

### 2.1 Run Migrations

Option A: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref zowfbftptnkypdwsnbkhh

# Run migrations
supabase migration up
```

Option B: Manual SQL Execution

1. Go to https://app.supabase.com/project/zowfbftptnkypdwsnbkhh
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the entire content from `supabase/migrations/20250505_create_email_notifications.sql`
5. Paste it into the query editor
6. Click "Run"

### 2.2 Verify Tables Created

In Supabase dashboard, go to "Table Editor" and verify these tables exist:
- `email_notifications`
- `email_templates`
- `orders`
- `custom_ea_requests`
- `bookings`
- `contact_submissions`

---

## Step 3: Deploy Supabase Edge Function

### 3.1 Using Supabase CLI

```bash
# Deploy the send-email function
supabase functions deploy send-email

# Set environment variable
supabase secrets set SENDGRID_API_KEY="SG.your_key_here"
```

### 3.2 Manual Deployment

1. Go to https://app.supabase.com/project/zowfbftptnkypdwsnbkhh
2. Click "Functions" in the left sidebar
3. Click "Create a new function"
4. Name it `send-email`
5. Copy content from `supabase/functions/send-email/index.ts`
6. Paste into the editor
7. Click "Deploy"
8. Go to "Settings" > "Secrets"
9. Add secret: `SENDGRID_API_KEY` = `SG.your_key_here`

---

## Step 4: Local Development

### 4.1 Install Dependencies

```bash
cd e-commerce-partner-main
npm install
# or
bun install
```

### 4.2 Start Development Server

```bash
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`

### 4.3 Test Email Notifications

1. Go to http://localhost:5173/custom-ea
2. Fill out the form with test data
3. Submit the form
4. Check your email for confirmation

---

## Step 5: MCP Configuration

### 5.1 Verify MCP Setup

The MCP configuration is already set up in `.kiro/settings/mcp.json`

To verify it's working:

1. Open the Kiro command palette
2. Search for "MCP"
3. Click "MCP Server View"
4. You should see three servers:
   - supabase
   - sendgrid
   - vercel

### 5.2 Test MCP Connections

In Kiro chat, you can test:

```
Test Supabase connection by querying the email_notifications table
```

```
Test SendGrid by checking sender verification status
```

```
Test Vercel by listing recent deployments
```

---

## Step 6: Build & Deploy to Vercel

### 6.1 Build Locally

```bash
npm run build
# or
bun run build
```

Verify the build completes without errors.

### 6.2 Deploy to Vercel

Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel deploy --prod
```

Option B: Using Git

```bash
# Push to GitHub
git add .
git commit -m "feat: add email notifications and integrations"
git push origin main

# Vercel will auto-deploy if connected to GitHub
```

Option C: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..." > "Project"
3. Select your GitHub repository
4. Click "Import"
5. Add environment variables:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SENDGRID_API_KEY`
6. Click "Deploy"

### 6.3 Verify Deployment

1. Go to your Vercel project dashboard
2. Check the deployment status
3. Click the deployment URL to test
4. Test the email notification flow

---

## Step 7: Testing

### 7.1 Test Custom EA Request

1. Go to `/custom-ea`
2. Fill out the form:
   - Name: Test User
   - Email: your-email@example.com
   - Strategy: Test strategy
   - Budget: $300 - $700
3. Submit
4. Check your email for confirmation

### 7.2 Test Booking

1. Go to `/booking`
2. Fill out the form:
   - Package: One-on-One Mentorship
   - Name: Test User
   - Email: your-email@example.com
   - Date: Tomorrow's date
   - Time: 14:00
3. Submit
4. Check your email for confirmation

### 7.3 Test Contact Form

1. Go to `/contact`
2. Fill out the form:
   - Name: Test User
   - Email: your-email@example.com
   - Subject: Test Message
   - Message: This is a test
3. Submit
4. Check your email for confirmation

### 7.4 Check Email Logs

In Supabase dashboard:
1. Go to "Table Editor"
2. Click `email_notifications`
3. Verify entries for each test with status "sent"

---

## Step 8: Monitoring & Maintenance

### 8.1 Monitor Email Sending

```typescript
// In browser console or component
import { getEmailNotificationHistory } from "@/integrations/email/emailService";

const history = await getEmailNotificationHistory();
console.log(history);
```

### 8.2 Check SendGrid Stats

```typescript
import { getEmailStats } from "@/integrations/sendgrid/sendgridService";

const stats = await getEmailStats("2025-05-01", "2025-05-31");
console.log(stats);
```

### 8.3 Monitor Vercel Deployments

```typescript
import { getDeployments } from "@/integrations/vercel/vercelService";

const deployments = await getDeployments();
console.log(deployments);
```

---

## Troubleshooting

### Email Not Sending

**Problem:** Emails not being sent after form submission

**Solutions:**
1. Check `.env` has correct `VITE_SENDGRID_API_KEY`
2. Verify sender email is verified in SendGrid
3. Check Supabase Edge Function logs:
   - Go to Functions > send-email > Logs
4. Check `email_notifications` table for error messages
5. Verify Supabase Edge Function has `SENDGRID_API_KEY` secret set

### Supabase Connection Issues

**Problem:** "Cannot connect to Supabase" error

**Solutions:**
1. Verify `.env` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
2. Check project is active in Supabase dashboard
3. Verify Row Level Security (RLS) policies are configured
4. Check browser console for CORS errors

### Vercel Deployment Failed

**Problem:** Deployment fails on Vercel

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Run `npm run build` locally to test
4. Check for TypeScript errors: `npm run lint`

### MCP Servers Not Connecting

**Problem:** MCP servers show as disconnected

**Solutions:**
1. Verify `.kiro/settings/mcp.json` is correct
2. Check that `uv` and `uvx` are installed
3. Restart Kiro IDE
4. Check MCP server logs in Kiro output panel

---

## Next Steps

1. **Customize Email Templates**
   - Edit templates in `src/integrations/email/emailService.ts`
   - Add your branding and colors

2. **Add More Email Types**
   - Create new templates for order confirmations, refunds, etc.
   - Use the existing templates as examples

3. **Set Up Email Webhooks**
   - Configure SendGrid webhooks for opens, clicks, bounces
   - Store events in Supabase for analytics

4. **Implement Email Preferences**
   - Add user email preferences to profiles
   - Allow users to unsubscribe from certain emails

5. **Create Admin Dashboard**
   - View email sending statistics
   - Resend failed emails
   - Manage email templates

---

## Support

For issues or questions:
1. Check the INTEGRATION_GUIDE.md for detailed documentation
2. Review SendGrid docs: https://docs.sendgrid.com
3. Review Supabase docs: https://supabase.com/docs
4. Review Vercel docs: https://vercel.com/docs

---

## Checklist

- [ ] Environment variables updated in `.env`
- [ ] SendGrid API key obtained and verified
- [ ] SendGrid sender email verified
- [ ] Vercel token obtained
- [ ] Database migrations run
- [ ] Supabase Edge Function deployed
- [ ] MCP servers configured
- [ ] Local development tested
- [ ] Build completes without errors
- [ ] Deployed to Vercel
- [ ] Email notifications tested
- [ ] All forms tested
- [ ] Email logs verified in Supabase

