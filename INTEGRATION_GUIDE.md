# Integration Guide: Supabase, SendGrid, and Vercel

This guide covers the setup and usage of Supabase MCP, SendGrid email notifications, and Vercel deployment integration.

## Table of Contents

1. [Supabase Setup](#supabase-setup)
2. [SendGrid Configuration](#sendgrid-configuration)
3. [Vercel Integration](#vercel-integration)
4. [Email Notifications](#email-notifications)
5. [Database Schema](#database-schema)
6. [Testing](#testing)

---

## Supabase Setup

### Environment Variables

Your `.env` file has been updated with the following Supabase credentials:

```env
VITE_SUPABASE_PROJECT_ID="zowfbftptnkypdwsnbkhh"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_URL="https://zowfbftptnkypdwsnbkhh.supabase.co"
SUPABASE_SECRET_KEY="sb_secret_YGpw6w4ivFZH3g0uifUHAw_cTz5pSyRJWT"
SUPABASE_LEGACY_KEY="uOVqJ4Jmmt/ICl9PYhEo4cERI/ItUwLiy8suUk8Y5cAN4wfaxeD9dNR4ZjgcvTUAkoYpgmTVc/Uo5TQ5OGCaHg=="
```

### MCP Configuration

The MCP configuration has been set up in `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "uvx",
      "args": ["supabase-mcp@latest"],
      "env": {
        "SUPABASE_URL": "https://zowfbftptnkypdwsnbkhh.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "sb_secret_YGpw6w4ivFZH3g0uifUHAw_cTz5pSyRJWT"
      },
      "disabled": false,
      "autoApprove": ["query_database", "execute_sql", "manage_auth"]
    }
  }
}
```

### Running Migrations

To set up the database schema, run the migration:

```bash
# Using Supabase CLI
supabase migration up

# Or manually execute the SQL in Supabase dashboard:
# Go to SQL Editor > New Query > Paste content from:
# supabase/migrations/20250505_create_email_notifications.sql
```

This creates the following tables:
- `email_notifications` - Tracks all email sends
- `email_templates` - Stores email templates
- `orders` - Customer orders
- `custom_ea_requests` - Custom EA requests
- `bookings` - Consultation bookings
- `contact_submissions` - Contact form submissions

---

## SendGrid Configuration

### API Key Setup

1. **Get your SendGrid API Key:**
   - Go to https://app.sendgrid.com/settings/api_keys
   - Create a new API key with "Mail Send" permissions
   - Copy the key

2. **Update `.env`:**
   ```env
   VITE_SENDGRID_API_KEY="SG.your_api_key_here"
   SENDGRID_FROM_EMAIL="neuroalgoforexedge@gmail.com"
   SENDGRID_VERIFIED_EMAIL="neuroalgoforexedge@gmail.com"
   ```

3. **Verify Sender Email:**
   - Go to https://app.sendgrid.com/settings/sender_auth
   - Click "Create New Sender"
   - Enter your email: `neuroalgoforexedge@gmail.com`
   - Verify the email by clicking the link in the confirmation email

### MCP Configuration

The SendGrid MCP server is configured in `.kiro/settings/mcp.json`:

```json
{
  "sendgrid": {
    "command": "uvx",
    "args": ["sendgrid-mcp@latest"],
    "env": {
      "SENDGRID_API_KEY": "SG.your_sendgrid_api_key_here",
      "SENDGRID_FROM_EMAIL": "neuroalgoforexedge@gmail.com"
    },
    "disabled": false,
    "autoApprove": ["send_email"]
  }
}
```

---

## Vercel Integration

### Setup

1. **Get your Vercel Token:**
   - Go to https://vercel.com/account/tokens
   - Create a new token with "Full Access"
   - Copy the token

2. **Update `.env`:**
   ```env
   VITE_VERCEL_URL="https://vercelsg.i6jVPQVdRo-eZblpepC3yg.O3l1HhGtknHNu264eGZKebHBTiymc9epOKZ-QrvzjUAon.vercel.app"
   VERCEL_TOKEN="your_vercel_token_here"
   ```

3. **MCP Configuration:**
   ```json
   {
     "vercel": {
       "command": "uvx",
       "args": ["vercel-mcp@latest"],
       "env": {
         "VERCEL_TOKEN": "your_vercel_token_here"
       },
       "disabled": false,
       "autoApprove": ["deploy", "get_deployments"]
     }
   }
   ```

### Deployment

To deploy to Vercel:

```bash
# Using Vercel CLI
vercel deploy

# Or push to GitHub and Vercel will auto-deploy
git push origin main
```

---

## Email Notifications

### Email Service

The email service is located at `src/integrations/email/emailService.ts` and provides:

- **Pre-built templates** for common notifications
- **Variable substitution** for dynamic content
- **Automatic logging** to database
- **Error handling** and retry logic

### Available Templates

1. **Order Confirmation** (`order-confirmation`)
   - Variables: `customerName`, `orderId`, `productName`, `amount`, `orderDate`

2. **Custom EA Request** (`custom-ea-request`)
   - Variables: `clientName`, `requestId`, `strategy`, `budgetRange`, `deadline`

3. **Booking Confirmation** (`booking-confirmation`)
   - Variables: `clientName`, `packageName`, `dateTime`, `duration`, `bookingId`

4. **Contact Form** (`contact-form`)
   - Variables: `senderName`, `subject`, `messageId`

5. **Download Link** (`download-link`)
   - Variables: `customerName`, `productName`, `orderId`, `downloadUrl`

### Usage Examples

#### Send Order Confirmation

```typescript
import { sendOrderConfirmation } from "@/integrations/email/emailService";

await sendOrderConfirmation(
  "customer@example.com",
  "John Doe",
  "ORD-12345",
  "Smart Reversal Pro",
  249,
  "2025-05-05"
);
```

#### Send Custom EA Request Confirmation

```typescript
import { sendCustomEARequestConfirmation } from "@/integrations/email/emailService";

await sendCustomEARequestConfirmation(
  "client@example.com",
  "Jane Smith",
  "REQ-67890",
  "Scalping EA with news filter",
  "$500-$1000",
  "2025-06-05"
);
```

#### Send Booking Confirmation

```typescript
import { sendBookingConfirmation } from "@/integrations/email/emailService";

await sendBookingConfirmation(
  "client@example.com",
  "Jane Smith",
  "One-on-One Mentorship",
  "2025-05-15 14:00",
  "60 minutes",
  "BOOK-11111"
);
```

#### Send Generic Email

```typescript
import { sendEmailNotification } from "@/integrations/email/emailService";

await sendEmailNotification({
  recipientEmail: "user@example.com",
  templateId: "order-confirmation",
  templateVariables: {
    customerName: "John Doe",
    orderId: "ORD-12345",
    productName: "Smart Reversal Pro",
    amount: "249",
    orderDate: "2025-05-05"
  }
});
```

### Supabase Edge Function

The email sending is handled by a Supabase Edge Function at `supabase/functions/send-email/index.ts`.

To deploy the function:

```bash
# Using Supabase CLI
supabase functions deploy send-email

# Or manually:
# 1. Go to Supabase Dashboard > Functions
# 2. Create new function "send-email"
# 3. Paste content from supabase/functions/send-email/index.ts
# 4. Add environment variable: SENDGRID_API_KEY
```

---

## Database Schema

### email_notifications

Tracks all email sends:

```sql
CREATE TABLE email_notifications (
  id UUID PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  template_id VARCHAR(100) NOT NULL,
  template_variables JSONB NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'pending', 'sent', 'failed'
  message_id VARCHAR(255),
  error TEXT,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### orders

Customer orders:

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  mode VARCHAR(50) NOT NULL, -- 'buy', 'rent'
  status VARCHAR(50) NOT NULL, -- 'pending', 'completed', 'failed', 'refunded'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### custom_ea_requests

Custom EA requests:

```sql
CREATE TABLE custom_ea_requests (
  id UUID PRIMARY KEY,
  client_email VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  strategy TEXT NOT NULL,
  entry_rules TEXT,
  exit_rules TEXT,
  indicators TEXT,
  pairs TEXT,
  timeframes TEXT,
  budget_range VARCHAR(100),
  deadline DATE,
  risk_preferences JSONB,
  file_url VARCHAR(500),
  status VARCHAR(50) NOT NULL, -- 'pending', 'quoted', 'in_progress', 'completed', 'rejected'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### bookings

Consultation bookings:

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  client_email VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  package_id VARCHAR(100) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  trading_experience VARCHAR(100),
  goals TEXT,
  notes TEXT,
  status VARCHAR(50) NOT NULL, -- 'pending', 'confirmed', 'completed', 'cancelled'
  zoom_link VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### contact_submissions

Contact form submissions:

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY,
  sender_email VARCHAR(255) NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'new', 'read', 'responded'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Testing

### Test Email Sending

```typescript
import { sendOrderConfirmation } from "@/integrations/email/emailService";

// Test in browser console or component
const result = await sendOrderConfirmation(
  "test@example.com",
  "Test User",
  "TEST-001",
  "Test Product",
  99.99,
  new Date().toISOString().split('T')[0]
);

console.log(result);
// Expected: { success: true, messageId: "..." }
```

### Test SendGrid Integration

```typescript
import { sendEmail } from "@/integrations/sendgrid/sendgridService";

const result = await sendEmail({
  to: "test@example.com",
  subject: "Test Email",
  html: "<h1>Hello World</h1>",
  text: "Hello World"
});

console.log(result);
// Expected: { success: true, messageId: "..." }
```

### Test Vercel Integration

```typescript
import { getDeployments } from "@/integrations/vercel/vercelService";

const deployments = await getDeployments();
console.log(deployments);
```

### Check Email Notification History

```typescript
import { getEmailNotificationHistory } from "@/integrations/email/emailService";

const history = await getEmailNotificationHistory("test@example.com");
console.log(history);
```

---

## Troubleshooting

### SendGrid API Key Not Working

1. Verify the API key is correct in `.env`
2. Check that the key has "Mail Send" permissions
3. Ensure the sender email is verified

### Supabase Connection Issues

1. Verify the project URL and key in `.env`
2. Check that the project is active in Supabase dashboard
3. Ensure Row Level Security (RLS) policies are configured

### Email Not Sending

1. Check the `email_notifications` table for failed sends
2. Review the error message in the `error` column
3. Verify SendGrid API key and sender email
4. Check Supabase Edge Function logs

### Vercel Deployment Issues

1. Verify the Vercel token is correct
2. Check that the project is connected to GitHub
3. Review deployment logs in Vercel dashboard

---

## Next Steps

1. **Update form handlers** to send emails on submission
2. **Add email preferences** to user profiles
3. **Create email templates** in SendGrid dashboard
4. **Set up webhooks** for email events (opens, clicks, bounces)
5. **Implement email scheduling** for campaigns
6. **Add unsubscribe links** to all emails

---

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [SendGrid API Reference](https://docs.sendgrid.com/api-reference)
