# Quick Start Guide

Get the Robert Trading Tools platform up and running in 5 minutes.

## 1. Install Dependencies

```bash
npm install
# or
bun install
```

## 2. Update Environment Variables

Edit `.env` and add your SendGrid API key:

```env
VITE_SENDGRID_API_KEY="SG.your_api_key_here"
```

Get your API key from: https://app.sendgrid.com/settings/api_keys

## 3. Run Database Migrations

```bash
# Option A: Using Supabase CLI
supabase migration up

# Option B: Manual - Copy content from supabase/migrations/20250505_create_email_notifications.sql
# and paste into Supabase SQL Editor
```

## 4. Deploy Supabase Edge Function

```bash
supabase functions deploy send-email
supabase secrets set SENDGRID_API_KEY="SG.your_api_key_here"
```

## 5. Start Development Server

```bash
npm run dev
# or
bun run dev
```

Visit http://localhost:5173

## 6. Test Email Notifications

1. Go to http://localhost:5173/custom-ea
2. Fill out the form
3. Submit
4. Check your email for confirmation

---

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint

# Test
npm run test

# Deploy to Vercel
vercel deploy --prod
```

---

## Verify Setup

### Check Supabase Connection
```typescript
import { supabase } from "@/integrations/supabase/client";

const { data } = await supabase.from("email_notifications").select("*").limit(1);
console.log(data);
```

### Check SendGrid Connection
```typescript
import { getSenderVerificationStatus } from "@/integrations/sendgrid/sendgridService";

const status = await getSenderVerificationStatus();
console.log(status);
```

### Check Email Logs
In Supabase dashboard:
1. Go to Table Editor
2. Click `email_notifications`
3. Verify entries exist

---

## Troubleshooting

### Emails not sending?
1. Check `.env` has correct `VITE_SENDGRID_API_KEY`
2. Verify sender email is verified in SendGrid
3. Check Supabase Edge Function logs

### Build errors?
```bash
npm run lint
npm run build
```

### Database connection issues?
1. Verify `.env` has correct Supabase credentials
2. Check project is active in Supabase dashboard

---

## Next Steps

1. Read `INTEGRATION_GUIDE.md` for detailed documentation
2. Read `SETUP_INSTRUCTIONS.md` for complete setup
3. Customize email templates in `src/integrations/email/emailService.ts`
4. Deploy to Vercel: `vercel deploy --prod`

---

## Key Files

- **Email Service:** `src/integrations/email/emailService.ts`
- **SendGrid Integration:** `src/integrations/sendgrid/sendgridService.ts`
- **Vercel Integration:** `src/integrations/vercel/vercelService.ts`
- **Database Schema:** `supabase/migrations/20250505_create_email_notifications.sql`
- **Edge Function:** `supabase/functions/send-email/index.ts`
- **MCP Config:** `.kiro/settings/mcp.json`

---

## Support

- 📖 See `INTEGRATION_GUIDE.md` for detailed docs
- 🚀 See `SETUP_INSTRUCTIONS.md` for complete setup
- 📋 See `INTEGRATION_SUMMARY.md` for overview

