# YardFame — Pre-Launch Site

**Fame Doesn't Stop at the Fence.**

Pre-launch marketing and validation site for YardFame, a creator platform connecting incarcerated,
formerly incarcerated, and Free World creators with their supporters. Built with Next.js (App
Router), TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as they become available
npm run dev
```

## Environment variables

See `.env.example`. Nothing is required for the site to build and run — every integration
degrades gracefully when unconfigured.

| Variable | Purpose | If missing |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata/OG/sitemap | Falls back to a placeholder domain |
| `NEXT_PUBLIC_PAYPAL_SUPPORT_URL` | PayPal destination for Founding Supporter contributions | Contribution CTA shows a "checkout being finalized" note instead of linking out |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email | Falls back to `info@yardfame.com` |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Persist waitlist & creator-interest submissions | Forms still validate and respond successfully, but nothing is stored server-side |

## Data model

`supabase/migrations/0001_prelaunch_signups.sql` defines two tables:

- `waitlist_signups` — general waitlist (`/api/waitlist`)
- `creator_interest` — creator interest form (`/api/creator-interest`)

Both are insert-only from the server using the service role key; RLS is enabled with no public
policies, so anon/authenticated clients have no direct access.

## Structure

- `src/app/page.tsx` — the single-page landing experience, composed from `src/components/sections/*`
- `src/lib/content.ts` — centralized copy for ecosystem features, roadmap, FAQ, and contribution tiers
- `src/lib/config.ts` — site config and the PayPal/contact env var wiring
- `src/lib/analytics.ts` — central `trackEvent()` hook; wire a real analytics provider here later
- `src/lib/validation.ts` — shared request validation for both form APIs (roles, stages, email, field limits)
- `src/app/api/*` — waitlist and creator-interest form handlers

## Testing

```bash
npm run lint        # ESLint
npm run typecheck   # tsc, app + tests
npm test            # node:test against src/lib/validation.ts
npm run build       # production build (also type-checks the app)
```

`npm test` covers the form validation logic (email format, required fields, role/stage enums,
optional-field trimming) using Node's built-in test runner and native TypeScript support — no
extra test framework dependency. It does not require Supabase or a running server.

## Notes

This is the pre-launch site only. No prior application code existed in this repository at the
start of this work (empty repo, no commits/branches) — there is nothing else to preserve or
coexist with yet.
