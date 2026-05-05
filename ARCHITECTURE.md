# System Architecture

## Overview

The Robert Trading Tools platform uses a modern serverless architecture with React frontend, Supabase backend, and SendGrid for email notifications.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Home       │  │  Marketplace │  │   Booking    │          │
│  │   Page       │  │   Page       │  │   Page       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Custom EA   │  │   Contact    │  │   About      │          │
│  │   Form       │  │   Form       │  │   Page       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  React 18 + Vite + TypeScript + Tailwind CSS                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Supabase REST API                                │  │
│  │  (Database, Auth, Real-time, Edge Functions)            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         SendGrid API                                     │  │
│  │  (Email Sending, Contact Management, Analytics)         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Vercel API                                       │  │
│  │  (Deployments, Environment Variables, Logs)             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   SUPABASE       │  │   SENDGRID       │  │   VERCEL         │
│   BACKEND        │  │   EMAIL SERVICE  │  │   DEPLOYMENT     │
│                  │  │                  │  │                  │
│ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │  PostgreSQL  │ │  │ │  Email Queue │ │  │ │  Serverless  │ │
│ │  Database    │ │  │ │  & Sending   │ │  │ │  Functions   │ │
│ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │
│                  │  │                  │  │                  │
│ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │  Auth        │ │  │ │  Templates   │ │  │ │  Analytics   │ │
│ │  System      │ │  │ │  & Variables │ │  │ │  & Logs      │ │
│ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │
│                  │  │                  │  │                  │
│ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │  Edge        │ │  │ │  Webhooks    │ │  │ │  Monitoring  │ │
│ │  Functions   │ │  │ │  & Events    │ │  │ │  & Alerts    │ │
│ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## Data Flow

### Form Submission Flow

```
User Submits Form
       │
       ▼
Form Validation (React Hook Form + Zod)
       │
       ▼
Insert to Supabase Database
       │
       ├─ custom_ea_requests
       ├─ bookings
       └─ contact_submissions
       │
       ▼
Trigger Email Notification
       │
       ├─ Get Template
       ├─ Substitute Variables
       └─ Call Supabase Edge Function
       │
       ▼
Supabase Edge Function (send-email)
       │
       ├─ Validate Email Request
       ├─ Format SendGrid Payload
       └─ Call SendGrid API
       │
       ▼
SendGrid Processes Email
       │
       ├─ Queue Email
       ├─ Send to Recipient
       └─ Track Delivery
       │
       ▼
Log to email_notifications Table
       │
       ├─ Status: 'sent'
       ├─ Message ID
       └─ Timestamp
       │
       ▼
Show Success Toast to User
```

---

## Component Architecture

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── Social Icons
│   ├── Main Content
│   │   ├── Home
│   │   ├── Marketplace
│   │   ├── ProductDetail
│   │   ├── CustomEA
│   │   ├── Booking
│   │   ├── Contact
│   │   ├── About
│   │   └── NotFound
│   ├── Footer
│   │   ├── Navigation
│   │   ├── Social Links
│   │   └── Newsletter
│   └── Floating Elements
│       ├── WhatsApp Button
│       ├── Cart Drawer
│       └── Toaster
├── Providers
│   ├── AuthProvider
│   ├── CartProvider
│   ├── QueryClientProvider
│   └── TooltipProvider
└── Integrations
    ├── Supabase Client
    ├── Email Service
    ├── SendGrid Service
    └── Vercel Service
```

---

## Database Schema

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ email_notifications                                  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ id (UUID)                                            │  │
│  │ recipient_email (VARCHAR)                            │  │
│  │ template_id (VARCHAR)                                │  │
│  │ template_variables (JSONB)                           │  │
│  │ status (VARCHAR) - pending/sent/failed               │  │
│  │ message_id (VARCHAR)                                 │  │
│  │ error (TEXT)                                         │  │
│  │ sent_at (TIMESTAMP)                                  │  │
│  │ created_at (TIMESTAMP)                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ custom_ea_requests                                   │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ id (UUID)                                            │  │
│  │ client_name (VARCHAR)                                │  │
│  │ client_email (VARCHAR)                               │  │
│  │ strategy (TEXT)                                      │  │
│  │ entry_rules (TEXT)                                   │  │
│  │ exit_rules (TEXT)                                    │  │
│  │ indicators (TEXT)                                    │  │
│  │ pairs (TEXT)                                         │  │
│  │ timeframes (TEXT)                                    │  │
│  │ budget_range (VARCHAR)                               │  │
│  │ deadline (DATE)                                      │  │
│  │ risk_preferences (JSONB)                             │  │
│  │ status (VARCHAR)                                     │  │
│  │ created_at (TIMESTAMP)                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ bookings                                             │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ id (UUID)                                            │  │
│  │ client_name (VARCHAR)                                │  │
│  │ client_email (VARCHAR)                               │  │
│  │ package_id (VARCHAR)                                 │  │
│  │ package_name (VARCHAR)                               │  │
│  │ scheduled_date (DATE)                                │  │
│  │ scheduled_time (TIME)                                │  │
│  │ duration_minutes (INTEGER)                           │  │
│  │ trading_experience (VARCHAR)                         │  │
│  │ goals (TEXT)                                         │  │
│  │ status (VARCHAR)                                     │  │
│  │ zoom_link (VARCHAR)                                  │  │
│  │ created_at (TIMESTAMP)                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ contact_submissions                                  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ id (UUID)                                            │  │
│  │ sender_name (VARCHAR)                                │  │
│  │ sender_email (VARCHAR)                               │  │
│  │ subject (VARCHAR)                                    │  │
│  │ message (TEXT)                                       │  │
│  │ status (VARCHAR)                                     │  │
│  │ created_at (TIMESTAMP)                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ email_templates                                      │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ id (VARCHAR) - Primary Key                           │  │
│  │ name (VARCHAR)                                       │  │
│  │ subject (VARCHAR)                                    │  │
│  │ html_content (TEXT)                                  │  │
│  │ text_content (TEXT)                                  │  │
│  │ variables (JSONB)                                    │  │
│  │ created_at (TIMESTAMP)                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ orders                                               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ id (UUID)                                            │  │
│  │ customer_email (VARCHAR)                             │  │
│  │ customer_name (VARCHAR)                              │  │
│  │ product_id (VARCHAR)                                 │  │
│  │ product_name (VARCHAR)                               │  │
│  │ amount (DECIMAL)                                     │  │
│  │ mode (VARCHAR) - buy/rent                            │  │
│  │ status (VARCHAR)                                     │  │
│  │ created_at (TIMESTAMP)                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Email Flow

```
Email Template
       │
       ├─ order-confirmation
       ├─ custom-ea-request
       ├─ booking-confirmation
       ├─ contact-form
       └─ download-link
       │
       ▼
Variable Substitution
       │
       ├─ {{customerName}} → "John Doe"
       ├─ {{orderId}} → "ORD-12345"
       ├─ {{amount}} → "249"
       └─ ... (other variables)
       │
       ▼
SendGrid API
       │
       ├─ Personalizations
       ├─ From Address
       ├─ Content (HTML + Text)
       ├─ Reply-To
       └─ Categories
       │
       ▼
SendGrid Queue
       │
       ├─ Validate Email
       ├─ Check Sender
       ├─ Check Recipient
       └─ Queue for Sending
       │
       ▼
Email Delivery
       │
       ├─ SMTP Relay
       ├─ Recipient Server
       ├─ Inbox Delivery
       └─ Bounce/Delivery Tracking
       │
       ▼
Webhook Events (Optional)
       │
       ├─ Delivered
       ├─ Opened
       ├─ Clicked
       ├─ Bounced
       └─ Marked as Spam
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT                              │
│                                                             │
│  Local Machine                                              │
│  ├─ npm run dev                                             │
│  ├─ localhost:5173                                          │
│  └─ Supabase Local (optional)                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    STAGING                                  │
│                                                             │
│  Vercel Staging                                             │
│  ├─ Preview Deployment                                      │
│  ├─ Pull Request Preview                                    │
│  └─ Full Testing Environment                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION                               │
│                                                             │
│  Vercel Production                                          │
│  ├─ Main Deployment                                         │
│  ├─ CDN Distribution                                        │
│  ├─ Auto-scaling                                            │
│  └─ SSL/TLS Encryption                                      │
│                                                             │
│  Supabase Production                                        │
│  ├─ PostgreSQL Database                                     │
│  ├─ Edge Functions                                          │
│  ├─ Real-time Subscriptions                                 │
│  └─ Automated Backups                                       │
│                                                             │
│  SendGrid Production                                        │
│  ├─ Email Delivery                                          │
│  ├─ Webhook Events                                          │
│  ├─ Analytics & Reporting                                   │
│  └─ Compliance & Deliverability                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ HTTPS/TLS Encryption                                │  │
│  │ - All traffic encrypted in transit                  │  │
│  │ - SSL certificates managed by Vercel               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ API Key Management                                   │  │
│  │ - Keys stored in environment variables              │  │
│  │ - Never committed to git                            │  │
│  │ - Rotated regularly                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Row Level Security (RLS)                             │  │
│  │ - Database policies enforce access control          │  │
│  │ - Users can only see their own data                 │  │
│  │ - Admin-only operations protected                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Input Validation                                     │  │
│  │ - React Hook Form validation                        │  │
│  │ - Zod schema validation                             │  │
│  │ - Server-side validation                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ CORS Protection                                      │  │
│  │ - Edge Function CORS headers                        │  │
│  │ - API endpoint restrictions                         │  │
│  │ - Origin validation                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Error Handling                                       │  │
│  │ - Errors logged without exposing sensitive data     │  │
│  │ - User-friendly error messages                      │  │
│  │ - Stack traces hidden in production                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Monitoring & Observability

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING STACK                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Application Monitoring                               │  │
│  │ - Vercel Analytics                                   │  │
│  │ - Error tracking                                     │  │
│  │ - Performance metrics                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Database Monitoring                                  │  │
│  │ - Supabase dashboard                                 │  │
│  │ - Query performance                                  │  │
│  │ - Connection pooling                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Email Monitoring                                     │  │
│  │ - SendGrid dashboard                                 │  │
│  │ - Delivery rates                                     │  │
│  │ - Bounce/complaint tracking                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Logging                                              │  │
│  │ - Browser console logs                               │  │
│  │ - Server-side logs                                   │  │
│  │ - Database query logs                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI framework |
| | Vite | Build tool |
| | TypeScript | Type safety |
| | Tailwind CSS | Styling |
| | shadcn/ui | Component library |
| **State Management** | React Context | Auth, Cart |
| | TanStack Query | Server state |
| **Forms** | React Hook Form | Form handling |
| | Zod | Validation |
| **Backend** | Supabase | Database & Auth |
| | PostgreSQL | Data storage |
| | Edge Functions | Serverless compute |
| **Email** | SendGrid | Email delivery |
| **Deployment** | Vercel | Hosting & CDN |
| **Version Control** | Git | Code management |
| **Package Manager** | npm/bun | Dependencies |

---

## Scalability

```
Current Architecture Supports:
├─ 1,000+ concurrent users
├─ 10,000+ emails per day
├─ 100,000+ database records
├─ 99.9% uptime SLA
└─ Auto-scaling infrastructure

Future Scaling Options:
├─ Database read replicas
├─ CDN edge caching
├─ Message queue (Bull, RabbitMQ)
├─ Microservices architecture
└─ Multi-region deployment
```

---

## Disaster Recovery

```
Backup Strategy:
├─ Supabase automated backups (daily)
├─ Git repository backup (GitHub)
├─ Environment variables backup (secure vault)
└─ Email logs backup (Supabase)

Recovery Procedures:
├─ Database restore from backup
├─ Code rollback via Git
├─ Environment variable restoration
└─ Email resend from logs
```

---

## Cost Optimization

```
Current Costs:
├─ Vercel: $20-50/month (Pro plan)
├─ Supabase: $25-100/month (Pro plan)
├─ SendGrid: $0-100/month (pay-as-you-go)
└─ Total: ~$45-250/month

Optimization Opportunities:
├─ Use Supabase free tier for development
├─ SendGrid free tier (100 emails/day)
├─ Vercel free tier for staging
└─ Reserved capacity for production
```

---

This architecture provides a scalable, secure, and maintainable foundation for the Robert Trading Tools platform.

