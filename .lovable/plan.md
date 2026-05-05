
# Robert — Trading Tools Platform (Phase 1)

A premium dark-themed storefront for selling EAs, indicators and bots, plus consultation booking and custom EA requests. No payments, accounts or admin in this phase — those come later.

## Brand & design system

- **Theme:** dark by default, premium fintech feel
- **Palette:** deep near-black background (#0A0E14), elevated card surface, neon green primary (success/buy), electric blue secondary (accent), soft white text, muted grey supporting text
- **Type:** bold display headings, clean sans body (Inter)
- **Motifs:** subtle animated candle/chart pattern in hero, soft glow on CTAs, smooth fade/slide on scroll
- **Components:** semantic tokens defined in `index.css` + `tailwind.config.ts`, all colors HSL, shadcn components restyled via tokens (no hard-coded colors in components)

## Pages & routes

```text
/                       Home
/marketplace            All products with filters
/marketplace/:slug      Single product detail
/custom-ea              Custom EA request form
/mentorship             Consultation & mentorship packages
/booking                Booking form (pick package + slot)
/about                  About Robert
/contact                Contact form + socials
*                       NotFound
```

## Page-by-page

### Home
- Sticky transparent → solid header with logo, nav, social icons, "Book Free Call" CTA
- Hero: headline "Trade Smarter. Automate Everything.", subhead, two CTAs (Browse Marketplace / Book Free Consultation), animated candle/particle background, trust badges row
- Animated stats bar (Clients Served, EAs Built, Win Rate, Years Experience)
- Featured products: 4 cards from the marketplace
- How It Works: 3-step visual (Browse → Purchase/Book → Trade)
- Testimonials carousel (name, country, rating)
- "Can't find what you need? Request a Custom EA" CTA banner
- Footer with full nav, socials, newsletter input (visual only for now)

### Marketplace
- Category tabs/filter: All / EAs / Indicators / Bots / Bundles
- Sort + compatibility filter (MT4 / MT5 / Both)
- Responsive grid of product cards: image, category badge, name, short description, price (Buy / Rent), star rating, MT4/MT5 badge, "View" + "Add to Cart" buttons
- Cart is a slide-out sheet (client-side only in v1, "Contact to purchase" CTA at checkout)

### Product detail
- Image gallery + embedded YouTube demo
- Full description, recommended pairs/timeframes
- Pricing card with Buy / Rent toggle, "Contact to Purchase" button (payments later)
- Product-specific FAQ accordion
- Related products
- Reviews list (static seed for now)

### Custom EA Request
- Multi-section form: contact info, strategy description, entry/exit rules, risk preferences (lot, SL, TP, trailing), indicators, pairs/timeframes, deadline, budget range, optional file upload (UI only — stored locally in v1)
- Submit shows confirmation screen + WhatsApp/email fallback

### Mentorship
- Package cards (Free Discovery Call, One-on-One, Beginner Crash Course, etc.) with duration, what's included, CTA to /booking

### Booking
- Form: select package, name, email, phone, preferred date/time, trading experience, goals, notes
- Confirmation screen

### About / Contact
- About: Robert's story, credentials, philosophy, trust signals
- Contact: form + WhatsApp button + social grid + email/phone

## Persistent UI

- Floating WhatsApp button (bottom-right)
- Sticky social icon strip in footer (and small set in header)
- Mobile: hamburger sheet menu, all sections fully responsive
- Smooth scroll reveal animations

## Out of scope for Phase 1 (planned for later)

- Real payments (Stripe / M-Pesa / Paystack)
- User accounts, login, customer dashboard
- Admin panel and product CMS (products are seeded from a typed local data file in v1 — easy to swap to a backend later)
- AI chatbot
- Affiliate program, blog, newsletter sending, email automations
- Real booking calendar with availability sync

## Technical notes

- Stack: React + Vite + Tailwind + shadcn (no backend this phase)
- Products, testimonials, packages live in `src/data/*.ts` as typed arrays — single source of truth, trivial to migrate to Supabase later
- Routing via `react-router-dom` (already installed); add new routes above the catch-all in `App.tsx`
- Cart state via lightweight context + `localStorage`
- Forms use `react-hook-form` + `zod` with shadcn form components; submissions show toast + log payload (no backend yet)
- Animations: Tailwind transitions + a few keyframe utilities; intersection-observer hook for on-scroll reveals
- All colors/gradients/shadows defined as HSL tokens in `index.css`, exposed in `tailwind.config.ts` — components reference tokens only

## After approval

Once you approve, I'll build it in this order so you can preview as it grows:
1. Design system + layout shell (header, footer, theme tokens, fonts)
2. Homepage
3. Marketplace + product detail (with seed products)
4. Custom EA request form
5. Mentorship + booking
6. About + contact

Then we can iterate on copy, real product data, images, and queue up Phase 2 (auth + admin + payments).
