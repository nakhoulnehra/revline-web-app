# Landing Page — Frontend

The landing page (`/`, `src/pages/LandingPage/`) is a public single-page marketing site. Its only job is to present Revline and funnel visitors into sign in / sign up; the real product lives behind auth (portal not built yet).

## Structure

- `LandingPage.tsx` — shell: `SiteHeader` + `ScrollJourney` + `SiteFooter`.
- `ScrollJourney` — the scroll-driven sections: Revline (hero), Diagnosis, Tracking, FAQ, Contact. Section anchors (`#revline`, `#diagnosis`, …) drive the header nav highlight via `onActiveSectionChange`.
- `SiteHeader` — sticky header; nav from `src/config/site-navigation.ts`. Right side is auth-aware:
  - Guest → red pill "Register" button linking to `/auth`.
  - Authenticated → user's name + outlined "Log out" button (stays on the landing page after logout).
- `SiteFooter` — footer nav mirroring the header.

## Auth flow from the landing

1. Visitor clicks Register → `/auth` (sign in / create account tabs, brand-styled card).
2. On successful login or registration → redirect to `/thank-you`: red brand-font message "Thank you for registering, the portal is under construction and will be available soon" + button back to the landing page.
3. Back on the landing, the header shows their name and a logout button (session persists via Sanctum cookies; `AuthProvider` loads `/api/user` on app start).

## Style

White background, red brand color `var(--color-brand)` (#7c1015) with `--color-brand-deep` hover, DM Sans body / Manrope display, uppercase micro-labels, pill-shaped CTAs. Tokens in `src/styles/tokens.css`.
