# Deployment Checklist

Complete this checklist before deploying to production.

## Pre-Deployment

### Environment Setup
- [ ] `.env` file updated with all credentials
- [ ] `VITE_SENDGRID_API_KEY` set correctly
- [ ] `VERCEL_TOKEN` obtained and set
- [ ] All Supabase credentials verified

### SendGrid Setup
- [ ] SendGrid account created
- [ ] API key generated with "Mail Send" permissions
- [ ] Sender email verified (neuroalgoforexedge@gmail.com)
- [ ] Sender email appears in verified senders list
- [ ] API key tested and working

### Supabase Setup
- [ ] Supabase project active and accessible
- [ ] Database migrations executed successfully
- [ ] All tables created:
  - [ ] email_notifications
  - [ ] email_templates
  - [ ] orders
  - [ ] custom_ea_requests
  - [ ] bookings
  - [ ] contact_submissions
- [ ] Row Level Security (RLS) policies configured
- [ ] Edge Function deployed: `send-email`
- [ ] Edge Function has `SENDGRID_API_KEY` secret set

### Vercel Setup
- [ ] Vercel account created
- [ ] Project connected to GitHub
- [ ] Vercel token obtained
- [ ] Environment variables configured in Vercel:
  - [ ] VITE_SUPABASE_PROJECT_ID
  - [ ] VITE_SUPABASE_PUBLISHABLE_KEY
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SENDGRID_API_KEY

### MCP Configuration
- [ ] `.kiro/settings/mcp.json` created
- [ ] Supabase MCP server configured
- [ ] SendGrid MCP server configured
- [ ] Vercel MCP server configured
- [ ] MCP servers tested and connected

## Code Quality

### Testing
- [ ] All forms tested locally
- [ ] Email notifications tested
- [ ] Custom EA form sends email
- [ ] Booking form sends email
- [ ] Contact form sends email
- [ ] Email appears in inbox within 1 minute
- [ ] Email contains correct variables
- [ ] Failed emails logged in Supabase

### Build & Lint
- [ ] `npm run lint` passes without errors
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] No console warnings in browser

### Performance
- [ ] Lighthouse score > 80
- [ ] Page load time < 3 seconds
- [ ] No memory leaks
- [ ] No infinite loops

### Security
- [ ] No API keys in code
- [ ] No secrets in git history
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Input validation on all forms
- [ ] SQL injection prevention verified

## Documentation

- [ ] `QUICK_START.md` created
- [ ] `INTEGRATION_GUIDE.md` created
- [ ] `SETUP_INSTRUCTIONS.md` created
- [ ] `INTEGRATION_SUMMARY.md` created
- [ ] `DEPLOYMENT_CHECKLIST.md` created
- [ ] README updated with new features
- [ ] Code comments added where needed

## Database

- [ ] Backup created before migration
- [ ] All migrations executed successfully
- [ ] Indexes created for performance
- [ ] RLS policies configured
- [ ] Test data inserted
- [ ] Queries tested and optimized

## Email Service

- [ ] Email templates created and tested
- [ ] Variable substitution working
- [ ] Error handling implemented
- [ ] Retry logic implemented
- [ ] Email logging working
- [ ] SendGrid webhook configured (optional)

## Deployment

### Local Testing
- [ ] `npm run dev` starts without errors
- [ ] All pages load correctly
- [ ] All forms work correctly
- [ ] Email notifications send correctly
- [ ] Database queries work correctly

### Build Testing
- [ ] `npm run build` completes successfully
- [ ] `npm run preview` works correctly
- [ ] Build size acceptable
- [ ] No missing dependencies

### Staging Deployment
- [ ] Deploy to staging environment
- [ ] All tests pass on staging
- [ ] Email notifications work on staging
- [ ] Database queries work on staging
- [ ] Performance acceptable on staging

### Production Deployment
- [ ] Final backup created
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test all forms on production
- [ ] Test email notifications on production
- [ ] Monitor error logs
- [ ] Monitor performance metrics

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up performance monitoring
- [ ] Set up email monitoring
- [ ] Set up database monitoring
- [ ] Set up uptime monitoring

### Analytics
- [ ] Google Analytics configured
- [ ] Email statistics tracked
- [ ] Form submission tracking
- [ ] Conversion tracking

### Maintenance
- [ ] Set up automated backups
- [ ] Set up log rotation
- [ ] Set up security updates
- [ ] Set up dependency updates

## Rollback Plan

- [ ] Rollback procedure documented
- [ ] Previous version backed up
- [ ] Rollback tested
- [ ] Team trained on rollback

## Sign-Off

- [ ] Product Owner approval
- [ ] QA approval
- [ ] Security approval
- [ ] DevOps approval

---

## Deployment Commands

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy --prod
```

### Deploy Edge Function
```bash
supabase functions deploy send-email
```

### Run Migrations
```bash
supabase migration up
```

---

## Rollback Commands

### Revert to Previous Vercel Deployment
```bash
vercel rollback
```

### Revert Database Migration
```bash
supabase migration down
```

---

## Emergency Contacts

- **SendGrid Support:** https://support.sendgrid.com
- **Supabase Support:** https://supabase.com/support
- **Vercel Support:** https://vercel.com/support

---

## Notes

Use this section to add any additional notes or observations:

```
[Add notes here]
```

---

## Sign-Off

- **Deployed By:** _______________
- **Date:** _______________
- **Time:** _______________
- **Status:** ✅ Success / ❌ Failed

---

## Post-Deployment Verification

### 24 Hours After Deployment
- [ ] No critical errors in logs
- [ ] Email notifications working
- [ ] Database performing well
- [ ] No user complaints

### 1 Week After Deployment
- [ ] All metrics normal
- [ ] No performance degradation
- [ ] Email delivery rate > 95%
- [ ] User feedback positive

### 1 Month After Deployment
- [ ] System stable
- [ ] No major issues
- [ ] Performance metrics good
- [ ] Ready for next release

