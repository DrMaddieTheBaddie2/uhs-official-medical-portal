# UHS Medical Portal

Official UHS Medical Handbook, SOPs, Clinical Guidelines, Medications and Training Portal.
Single-page React application — content-driven, no backend; all content currently lives in typed data files under `src/data/`.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6** (strict, `tsc -b` runs before every build)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/index.css` — there is no `tailwind.config.js`)
- **React Router 7** (`react-router-dom`), routes declared in `src/App.tsx`
- **motion** (`motion/react`) for animation — *not* `framer-motion`; never add framer-motion
- **lucide-react** icons, **cmdk** command palette, `clsx` + `tailwind-merge` via the `cn()` helper
- **oxlint** for linting (`.oxlintrc.json`)

## Commands

```bash
npm run dev       # Vite dev server on http://localhost:5173
npm run build     # tsc -b && vite build  → dist/
npm run lint      # oxlint
npm run preview   # serve the production build
```

There is no test runner yet. Verify changes with `npm run build` + `npm run lint` and by checking the dev server.

## Folder structure

```
src/
├── main.tsx              # Entry: BrowserRouter + ThemeProvider
├── App.tsx               # Route table only — every page is registered here
├── index.css             # Design tokens (@theme), dark-mode overrides, global styles
├── components/
│   ├── home/             # Portal homepage: HeroSection, CrestDisplay, EcgDecoration
│   ├── layout/           # Portal chrome: Header, Navigation, FooterInfoBar
│   │                     # Handbook chrome: AppLayout, Sidebar, TopBar, BottomNav,
│   │                     #   Breadcrumbs, CommandPalette, AmbientBackground, SplashScreen
│   ├── profile/          # Discord auth UI: DiscordProfileCard, ProfileMenu, SignedOutProfile
│   ├── theme/            # ThemeToggle
│   ├── ui/               # Reusable primitives: Button, Card, Badge, Tabs, Accordion,
│   │                     #   Skeleton, PageHeader, SearchResultList, AnimatedCounter,
│   │                     #   DonutProgress, EkgTrace, AnatomicalHeart, EmergencyAlertBanner
│   └── motion/           # variants.ts (shared easing/variants), PageTransition, Reveal,
│                         #   MagneticButton
├── pages/                # One file per route (Home, Dashboard, SopHandbook, …)
├── data/                 # Typed static content: navigation.ts, dashboard.ts
├── context/              # theme-context.tsx (light/dark/system), AuthContext.tsx (Discord session)
├── hooks/                # useTheme, useAuth re-exports
└── lib/                  # cn.ts, theme.ts (preference storage), auth.ts (session API contract)
```

### Portal homepage ("/")
- `/` is the crest-based UHS portal homepage rendered outside `AppLayout`; the old handbook dashboard lives at `/dashboard`.
- **Theming:** light / dark / system via `ThemeProvider` (`uhs-theme` in localStorage, pre-paint script in `index.html` prevents FOUC). All portal colours come from the semantic tokens scoped under `.portal` in `index.css` (`--page-background`, `--accent`, `--ecg-line`, …) — never hardcode theme colours in portal components. Header and footer are navy in BOTH themes.
- **Crest:** the official crest at `public/images/uhs-crest.png` is displayed by `CrestDisplay` with `object-contain`, never cropped, never redrawn, no generated lettering. It is the supplied artwork only; a neutral pending panel shows if the file is absent.
- **Auth:** the header profile area is driven by `AuthContext` against the `/api/auth/*` contract (session/login/logout). No hardcoded users. Discord tokens/secrets never enter frontend code, `VITE_` vars, or localStorage; see `.env.example`. Backend implementation pending owner approval.
- Homepage navigation (`portalNavItems`) is visual-only; sections (Clinical Library, Medications, SOPs & Policies, Career Centre, Resources) are not built yet.
- Copy is **British English**; approved homepage wording must not change without the owner's sign-off.

Path alias: `@/` → `src/` (configured in `vite.config.ts` and `tsconfig.app.json`). Always import with `@/…`, never long relative paths.

## Conventions

### Naming
- Components: PascalCase file and export, named exports (`export function Card…`). Pages use default exports.
- Non-component modules (`lib/`, `data/`, `context/`): kebab-case or camelCase filenames.
- One component per file; colocate small subcomponents only if private to that file.

### Styling & design tokens
- All colors, radii and shadows come from the tokens in `src/index.css` — never hardcode hex values in components (decorative SVG art like EkgTrace is the only exception).
- Use Tailwind v4 arbitrary-var syntax: `text-(--text-primary)`, `bg-(--bg-surface)`, `rounded-(--radius-card)`.
- Brand palette: NHS blue family (`--color-nhs-blue*`) with a sparing pink accent (`--color-accent-pink`) reserved for emergency/medical emphasis.
- Dark mode is class-based (`.dark` on the root element, managed by `theme-context`); semantic vars (`--bg-*`, `--text-*`, `--border-subtle`) flip automatically — style with those, not raw palette colors, wherever possible.

### Motion
- Import from `motion/react`. All timing/easing comes from `src/components/motion/variants.ts` (`softEase`, `transitionFast/Base/Slow`, shared variants) — do not invent new easings per component.
- Animations are calm: fades, small lifts, no bounce or overshoot. Page enters use `PageTransition`; list/grid reveals use `RevealGroup`/`RevealItem`.
- Always respect `prefers-reduced-motion` (global CSS kill-switch exists; interactive/looping animations should also check `useReducedMotion`).

### Accessibility
- Decorative visuals are `aria-hidden`; the equivalent information must exist as text (see `DonutProgress` for the pattern).
- Interactive non-button elements get `role="button"`, `tabIndex`, and keyboard handling.
- Keep the visible focus ring (`:focus-visible` styles in `index.css`); never `outline: none`.

### Content & data
- Portal content is mock/static for now and lives in `src/data/*.ts` as typed exports. Add new content there, not inline in pages.
- Adding a page: create `src/pages/X.tsx`, register the route in `App.tsx`, add a `navItems` entry in `src/data/navigation.ts`.

## Development workflow

1. Branch from `main` for any change.
2. Make the change; keep components token-driven and reuse existing primitives before adding new ones.
3. Verify: `npm run build` and `npm run lint` must pass with no new warnings; smoke-test affected routes in the dev server (light + dark, desktop + mobile widths).
4. Commit with a clear message; do not commit `dist/` or `node_modules/` (gitignored).

## History note

This repo was consolidated from two prototypes in July 2026: the `uhs-handbook` app (kept as the base) and an older `uhs-app` cinematic prototype (CHS-branded). The reusable pieces of the prototype (AnimatedCounter, DonutProgress, EkgTrace, AnatomicalHeart, EmergencyAlertBanner, MagneticButton, AmbientBackground, SplashScreen, extra dashboard data) were migrated and adapted to this app's tokens; the rest was intentionally dropped. `SplashScreen`, `AmbientBackground`, `EmergencyAlertBanner` and the migrated ui/motion extras are not yet wired into the UI — they are available for the next design phase.
