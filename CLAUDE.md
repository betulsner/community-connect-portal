# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Build with Vite then serve locally via custom Node.js HTTP server on http://127.0.0.1:5173
npm run build    # tsc -b && vite build (TypeScript check + Vite production build → dist/)
npm run preview  # Vite preview of dist/
```

There are no tests. TypeScript compilation (`tsc -b`) is the only static check — always run `npm run build` before calling a change done.

## Architecture

### Routing and state

This is a single-page app with **hash-based routing** — no React Router. `App.tsx` reads `window.location.hash`, maps it to a `PageId`, and renders the matching page component inside a `<main>`. Navigation calls `window.history.replaceState` and `window.scrollTo`.

All app-wide state lives in `App.tsx`:
- `user: PortalUser | null` — null = not logged in, `mode: "guest"` = guest (redirected to login), `mode: "demo"` = the only real authenticated state
- `reminders: CommunityEvent[]` — persisted to localStorage
- `settings: PortalSettings` — `largeText` and `language`, persisted to localStorage. `largeText` is toggled via `document.documentElement.classList.toggle("large-text", ...)` which scales rem-based Tailwind text globally via `html.large-text { font-size: 18px }` in `index.css`.

### Auth model

There is no real authentication. The "login" is `demo / connect123` which sets `user.mode = "demo"`. Guest mode exists but is deliberately blocked from dashboard and stamps pages — both redirect to login. This is enforced in `App.tsx`'s `renderPage()`.

### Pages

| Route | Component | Notes |
|---|---|---|
| `#home` | `Home.tsx` | Landing, feature cards |
| `#connect` | `ConnectCity.tsx` → `MapSection.tsx` | Map + filter + events with reminders |
| `#digital` | `DigitalHelp.tsx` | 8 help topics with expandable guides |
| `#refurbishment` | `Refurbishment.tsx` | Nav label is **"Device Support"**; device hubs, National Devicebank, eligibility links |
| `#access-data` | `AccessData.tsx` | Free SIM, mobile data, social tariffs |
| `#free-sim` | `FreeSim.tsx` | Free SIM card schemes |
| `#affordable-internet` | `AffordableInternet.tsx` | Low-cost broadband deals |
| `#donate` | `Donate.tsx` | Device donation flow |
| `#volunteer` | `Volunteer.tsx` | Digital Champion volunteering |
| `#stamps` | `Stamps.tsx` | Demo-only stamp/rewards page |
| `#dashboard` | `Dashboard.tsx` | Demo-only user dashboard |
| `#about` | `About.tsx` | Project info, fake team, bench request form |
| `#login` | `Login.tsx` | Demo login + guest option |

Events are **not a separate page** — they are rendered inside `MapSection.tsx` below the map.

### Map

`LeafletMap.tsx` is lazy-loaded (via `React.lazy` + `Suspense`) and only mounted when the Connect page is open. Map markers use `L.divIcon` with inline SVG icons (not letter labels). Icon shape corresponds to location type: bench shape → bench, coffee cup → cafe, wrench → refurbishment, calendar → event, wifi waves → Wi-Fi, laptop → digital/library support.

Marker z-index: only `.leaflet-pane` is overridden to `z-index: 1 !important` in `index.css` to keep layers within the map stacking context. `.leaflet-top`/`.leaflet-bottom` are left at Leaflet's default so zoom controls work correctly.

### Data

All data is static TypeScript arrays in `src/data/`:
- `locations.ts` — `MapLocation[]` with lat/lng, tags, services, accessibility
- `events.ts` — `CommunityEvent[]` with dates, category, locationId
- `refurbishment.ts` — `RefurbishmentPoint[]`
- `rewards.ts` — `Reward[]` with point costs
- `user.ts` — single `mockUser` (Demo User, 70 points, refurbished laptop)

No backend database. No API calls except the AI chatbot.

### AI Chatbot

The floating `Chatbot.tsx` posts to `/api/chat`. The system prompt restricts the model to Ladywood community services only.

**Local dev**: `scripts/dev.mjs` reads `.env.local` at startup and handles `POST /api/chat` inline using `@google/generative-ai` (`gemini-2.5-flash`). `.env.local` must contain `GEMINI_API_KEY=...`.

**Production (Netlify)**: `netlify/functions/chat.ts` is the serverless function. `netlify.toml` redirects `/api/chat` → `/.netlify/functions/chat`. `GEMINI_API_KEY` must be set in Netlify environment variables.

**Vercel**: `api/chat.ts` exists as an alternative if deploying to Vercel.

The API key is **never** committed. `.env.local` is gitignored. Conversation content is never logged server-side (only error names on failure).

### Navbar

`Navbar.tsx` has three layout zones inside `.site-header__inner`:
1. **Logo** — always visible.
2. **`.site-nav`** — desktop nav links, shown at **`min-width: 1400px`** (hidden below that). Nav links use `white-space: normal` and `max-width: 118px` so long translated labels wrap to two lines rather than overflowing. Gap between links is `0.1rem`.
3. **`.site-header__actions`** — always visible; contains `AccessibilityControls`, an optional Stamps icon button (demo mode only), and the Dashboard/Login button. Uses `margin-inline-start: auto` (logical property, RTL-safe). Below 1400 px a hamburger **`.site-menu-button`** is shown here instead of the desktop nav.

"My Stamps" appears **only** in `site-header__actions` (compact icon button) and in the mobile menu — it was removed from the desktop `site-nav` to prevent overflow when logged in.

### Styling

Tailwind CSS with custom utility classes in `index.css`. GovUK-inspired design system:
- `.govuk-panel` — bordered card
- `.govuk-button` — green primary button; `.govuk-button--secondary` — blue outline
- `.govuk-inset` — uses `border-inline-start` (logical, RTL-safe)
- `.hc-panel` — panel compatible with any contrast setting
- Colour tokens: `text-ink` (#0b0c0c), `bg-lagoon-50/700`, `bg-sun-100/600`

All buttons/inputs have `border-radius: 0` globally (GovUK convention) except `.govuk-button` which has `border-radius: 6px`.

RTL hero gradient is mirrored via `[dir="rtl"] .home-hero-real__overlay` so the dark text overlay appears on the correct (reading-start) side for Arabic, Persian, and Kurdish.

### i18n

`src/i18n.tsx` provides a React context with **11 languages**, all with complete coverage of every UI key (~100 keys each):

| Language | Script | Direction |
|---|---|---|
| English | Latin | LTR |
| Chinese | CJK | LTR |
| Polish | Latin | LTR |
| Persian | Arabic script | **RTL** |
| Arabic | Arabic script | **RTL** |
| French | Latin | LTR |
| Somali | Latin | LTR |
| Punjabi | Gurmukhi | LTR |
| Spanish | Latin | LTR |
| Kurdish (Sorani) | Arabic script | **RTL** |
| Dutch | Latin | LTR |

All UI strings must use `const { t } = useI18n()` and be keyed in `i18n.tsx`. The `t(key, fallback?)` function has a 3-level fallback: active dict → English → fallback → key. Never hardcode UI text in components.

**RTL**: `App.tsx` sets `document.documentElement.dir` to `"rtl"` when the language is Arabic, Persian, or Kurdish; `"ltr"` for all others. Mobile menu link alignment uses `text-align: start` (logical) for correct RTL behaviour.

### Deployment

Netlify is the primary deployment target. `netlify.toml` configures:
- Build: `npm run build`, publish `dist/`
- Functions: `netlify/functions/`
- Redirects: `/api/chat` → function, `/*` → `index.html` (SPA fallback)

## Key constraints from the spec

- Portal is designed for low-income adults with low digital confidence — keep UI simple and plain-English
- Chatbot is a side feature (floating bottom-right), not a main navigation item
- All services shown must be real or plausible Ladywood locations — do not invent fictitious services
- Never log or echo back personal information in the chatbot
- Always show cost, opening hours, and accessibility info on location/event cards
