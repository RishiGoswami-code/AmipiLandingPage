# AMIPI Website

The marketing site for AMIPI, a wholesale diamond and fine jewelry supplier. It includes the landing page, company pages, a blog ("The Journal") edited in Sanity, and a virtual-meeting booking page backed by AMIPI's Microsoft Bookings calendar.

All application code lives in [`frontend/`](frontend/).

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | GSAP + ScrollTrigger, Lenis smooth scrolling, three.js for the hero |
| Blog content | Sanity (Studio embedded at `/studio`) |
| Meeting booking | Microsoft Bookings |
| Hosting | Vercel, deployed from `main` |

## Getting started

Requires Node.js 20 or newer.

```bash
cd frontend
npm install
cp .env.example .env.local   # then fill in the values, see below
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build (run before pushing) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |

> This project is on a recent Next.js release whose conventions differ from older versions. Before changing framework-level code, check the bundled docs in `frontend/node_modules/next/dist/docs/` (see [`frontend/AGENTS.md`](frontend/AGENTS.md)).

## Environment variables

Set these in `frontend/.env.local` for local work and in the Vercel project's Environment Variables for the live site. [`frontend/.env.example`](frontend/.env.example) lists them all. None are secrets (they are all `NEXT_PUBLIC_`), but real values are kept out of the repository.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For the blog | Sanity project that holds Journal posts. Empty shows built-in sample posts. |
| `NEXT_PUBLIC_SANITY_DATASET` | For the blog | Sanity dataset, normally `production`. |
| `NEXT_PUBLIC_SITE_URL` | Once the final domain is live | Public address used for canonical links, the sitemap and `robots.txt`. On Vercel it falls back to the project's production address. |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). Empty turns analytics off. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console "HTML tag" verification code. |

## Project structure

```
.
├── README.md
├── LICENSE
└── frontend/
    ├── .env.example            Environment variable template
    ├── next.config.ts          Next.js config (allowed image hosts, Turbopack root)
    ├── sanity.config.ts        Sanity Studio config (mounted at /studio)
    ├── public/                 Static images served as-is (logo, hero, categories, partners...)
    ├── Hero-Images/            Source artwork for the hero; not served directly
    └── src/
        ├── app/                Routes: one folder per page (see "Pages" below)
        │   ├── layout.tsx      Root layout: fonts, navbar, footer, site-wide metadata, analytics
        │   ├── globals.css     Tailwind theme tokens and global styles
        │   ├── robots.ts       Generates /robots.txt
        │   ├── sitemap.ts      Generates /sitemap.xml (static pages + Journal posts)
        │   ├── api/meet/       Server routes for the booking page (slots, book)
        │   └── studio/         The embedded Sanity Studio
        ├── components/         UI, grouped by the page or feature that uses it
        │   ├── nav/            Navbar, menus, footer, partner strip, navigation.ts (menu data)
        │   ├── hero/           Scroll-driven landing hero
        │   ├── home/           Landing page sections
        │   ├── blog/           Post card, category tabs, post body, share links
        │   ├── meet/           Booking flow (details form, calendar, time slots)
        │   ├── account/        Login / create account forms and the shared form fields
        │   ├── analytics/      Google Analytics loader
        │   ├── providers/      Smooth-scroll provider
        │   ├── ui/             Shared primitives (PillButton, icons, assistant button)
        │   └── about, categories, contact, gift-guide, legal, philosophy, sell, testimonials
        ├── proxy.ts            Lower-cases page addresses (old amipi.com links use capitals)
        ├── content/            Long-form copy kept out of components
        ├── lib/                Non-UI logic
        │   ├── bookings.ts     Microsoft Bookings client (staff, availability, booking)
        │   ├── windowsTimeZones.ts
        │   ├── analytics.ts    GA4 id and the track() helper
        │   └── site.ts         The site's public URL
        ├── sanity/             Blog data layer
        │   ├── schemaTypes/    Content model (post)
        │   ├── categories.ts   Journal categories
        │   ├── client.ts       Sanity client, queries, image URLs
        │   ├── posts.ts        Functions the pages call (with sample-post fallback)
        │   └── samplePosts.ts  Placeholder posts shown until Sanity is connected
        └── styles/             Self-hosted fonts and their definitions
```

## Pages

| Route | Page |
|---|---|
| `/` | Landing page |
| `/categories` | Shop by category |
| `/blog`, `/blog/[slug]` | The Journal: list (filter with `?category=`) and post |
| `/meet` | Schedule a virtual meeting |
| `/sell` | Sell your diamonds |
| `/contact-us` | Contact |
| `/gift-guide` | Holiday gift guide |
| `/about`, `/about-us`, `/philosophy`, `/amipi-cares`, `/testimonials` | Company pages |
| `/privacy-policy`, `/terms-of-use` | Legal |
| `/login`, `/register`, `/forgot-password` | Account pages (not indexed by search engines) |
| `/studio` | Sanity Studio for editors (not indexed) |

## Addresses carried over from amipi.com

Pages use the same paths as the existing amipi.com site, so links and search results keep working when the domain points here.

| amipi.com address | Here |
|---|---|
| `/about-us/`, `/amipi-cares/`, `/testimonials/`, `/contact-us/`, `/sell/`, `/meet`, `/register/`, `/privacy-policy/`, `/terms-of-use/` | Same path |
| `/sell.php` | Redirects to `/sell` |
| `/schedule-appointment/` | Redirects to `/meet` |
| Capitalised forms such as `/Privacy-Policy/` | Redirect to lower-case (`src/proxy.ts`) |
| Trailing slash | Redirects to the same path without it (Next.js default) |

Redirects are in `redirects()` in `next.config.ts`. Its sources match regardless of case, so never add one whose destination differs from the source only by case; that loops.

Not built here yet, and returning 404 until they are: the store and catalogue (`/diamonds/`, `/basics/`, `/studs/`, `/hoops/`, `/bracelets/`, `/flexi-bangles/`, `/bands/`, `/rings/`, `/necklaces/`, `/specials/`, `/lastcall/`, `/my-cart/`, `/certified.php`, `/compare-product.php`), `/pay/`, `/remote/`, and the trade-show pages (`/trade-show`, `/jis-fall-2026`, `/JCK2026`, `/jck-fine-jewelry/`, `/rjo-winter`, `/rjolibertytour`).

## The Journal (Sanity)

- Editors write posts at `/studio`, signing in with their Sanity account.
- Published posts appear on the site within about a minute; no deploy is needed.
- Categories are defined in `src/sanity/categories.ts` and used by both the Studio and the site.
- Each address the Studio is opened from (localhost, the Vercel address, the final domain) must be added in the Sanity project under **API → CORS origins** with **Allow credentials** ticked.
- The site reads a public dataset without a token.

## Virtual meeting booking

`/meet` collects the visitor's details and preferred team member, shows that person's real availability, and creates the appointment in AMIPI's Microsoft Bookings calendar, which sends the confirmation email.

- `src/lib/bookings.ts` talks to the same public endpoints Microsoft's own booking page uses. No credentials are needed, but the endpoints are not an officially documented API.
- If a call fails, the page shows a link to Microsoft's booking page so visitors can still book.
- Staff, service hours, lead time and the custom question are read from Bookings, so changes made there show up on the site.
- The officially supported alternative is Microsoft Graph, which needs an app registration approved by a Microsoft 365 administrator.

## SEO and analytics

- Every page exports its own `metadata` (title, description, canonical link). Site-wide defaults are in `src/app/layout.tsx`. When adding a page, add its metadata and list it in `src/app/sitemap.ts`.
- `/sitemap.xml` and `/robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.
- Google Analytics loads only when `NEXT_PUBLIC_GA_ID` is set. Use `track()` from `src/lib/analytics.ts` for events; a completed meeting booking sends `generate_lead`.
- For Search Console, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, verify the property, then submit `/sitemap.xml`.

## Deployment

Vercel builds the `frontend/` folder and deploys every push to `main` to production. Run `npm run lint` and `npm run build` locally first.

When the site moves to its final domain: add the domain in Vercel, set `NEXT_PUBLIC_SITE_URL`, and add the domain to Sanity's CORS origins.

## Known gaps

- The contact and sell forms are not yet connected to email or a database.
- Login and account pages are front-end only.

## License

See [LICENSE](LICENSE).
