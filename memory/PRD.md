# Born In Flight — Product Requirements Document

## Original Problem Statement
Redesign and modernize **borninflight.com** into a premium, conversion-focused portal that positions Born In Flight as a strategic capability-building and organizational transformation partner.

## Tech Stack
FastAPI · React 19 · MongoDB · Tailwind 3 · Framer Motion · lucide-react · Sonner

## Architecture
```
/app/backend/server.py            — FastAPI APIs + seed migration (SEED_VERSION)
/app/frontend/src/
  App.js                          — Router (7 pages + /admin)
  components/Layout.jsx           — Big logo, 7-item nav, footer with socials
  pages/Home.jsx                  — Hero, Arc, Pillars, Why, Journey, Testimonials, CTA
  pages/About.jsx                 — Hero, Philosophy, F.L.I.G.H.T, Values, Stats, Prakash Rao, Book
  pages/Framework.jsx             — Interactive 3-pillar selector
  pages/Programs.jsx              — Born In Flight Learning Experience + 27 programs
  pages/SuccessStories.jsx        — 6 case studies (2 per pillar)
  pages/Media.jsx                 — 5 awards/features + 4 socials
  pages/Contact.jsx               — New copy + phone + address + Google Maps + dropdown
  pages/Admin.jsx                 — Token-protected CMS
```

## Visual System
- **Fonts:** Bricolage Grotesque (display), Fraunces (italic accents), IBM Plex Sans (body), IBM Plex Mono (overlines)
- **Palette:** Ink `#0B1220` · Cream paper `#F6F3EC` · Bronze `#B45309` · Line `#DCD3C0`
- **Aesthetic:** Swiss/editorial — left-aligned, hairline 1px dividers, monospace section tags, grain overlay on dark sections, sharp corners

## API Endpoints (/api prefix)
- `GET /` — health
- `POST /leads` — public lead capture (201)
- `GET /leads` — admin
- `POST /admin/login` — token validation
- `GET /programs?pillar=` — 27 programs `{id, pillar, name, description}`
- `PUT/DELETE /programs/{id}` — admin
- `GET /testimonials` — 12 testimonials
- `PUT/DELETE /testimonials/{id}` — admin

## Implementation Log

### Iteration 1 — Initial build (Jan 2026)
- Multi-page premium editorial site (Home/About/Framework/Programs/Contact + Admin CMS)
- 9 programs + 4 testimonials seeded
- 17/17 backend + 9/9 frontend tests pass

### Iteration 2 — Content refresh per client doc (Jan 2026)
- **Backend:** SEED_VERSION='v2-2026-01' migration · 27 programs (9 per pillar, simplified to name+description) · 12 testimonials (verbatim from doc) · POST /leads now returns 201
- **Layout:** Bigger logo (h-12/14) · 7 nav links (added Success Stories + Media) · footer socials updated to new URLs
- **Home:** "100k+ leaders" / "12+ cities" stats · "Leadership. Organisational Development. Talent Transformation." tagline · new Arc copy ("organizations don't invest in learning — they invest in results")
- **About:** New "Born In Flight" philosophy (mythical Himalayan bird) · Change/Breakthrough/Transformation chips · stats grid (12+ yrs / 100k+ / 12+ / 93%) · **Meet Prakash Rao** section (MCC ICF · NLP Trainer · Author · Architect) with LinkedIn · **Featured Book** "Go On — Become the Athlete Within" with 5 buy links (Amazon IN/Global/UK, Flipkart, Notion Press)
- **Programs:** New "Born In Flight Learning Experience" section with 8 principles (Business-Aligned, Tailored Not Templated, Built on Coaching & Discovery, Experiential by Design, Journey-Based, Application-Centered, Driven by Behavioral Science, Measured for Business Impact)
- **Contact:** New headline "Every Transformation Starts With a Conversation" · subhead "Your Next Breakthrough Starts Here" · phone +91 80 4394 3531 · full Basaveshwarnagar address · Google Maps embed · dropdown w/ NLP Certification & Assessment Centers
- **NEW Success Stories** page — 6 case studies (2 per pillar) with Challenge/Solution/Impact blocks
- **NEW Media** page — 5 features (Asia Business Outlook, VYGR Founder Life, VYGR Brand Story, World HRD Congress, Digital Revolution Seminar) + 4 social cards
- **Admin:** Simplified program editor to (name, pillar, description)
- **Tested:** 21/21 backend + all frontend flows pass

## Backlog (P1/P2)
- **P1** Email notification on new lead (SendGrid/Resend/Mailgun)
- **P1** Inbound webhook handler for WordPress form forwarding (`/api/leads/inbound`)
- **P1** Calendly booking embed on CTA buttons
- **P2** SEO meta tags + sitemap.xml + JSON-LD structured data
- **P2** Image lazy-loading + WebP optimization
- **P2** Blog/Insights CMS
- **P2** GA4 / Plausible analytics
- **P2** Domain migration to borninflight.com via Entri (after deploy)

## Test Credentials
See `/app/memory/test_credentials.md`
