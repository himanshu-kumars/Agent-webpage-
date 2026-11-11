# AEGIS // OPS GRID — AI Coding Agent Constitution (`AGENT.md`)

> **UNOFFICIAL FAN CONCEPT // REPOSITORY CONSTITUTION FOR AUTONOMOUS & HUMAN ENGINEERS**  
> Read this file **before** modifying any source file, stylesheet, route, or API endpoint in **AEGIS // OPS GRID**. Every rule below is an architectural invariant traced to `REQUIREMENTS.md` and `SECURITY.md`.

---

## 1. Repository Identity & Core Purpose

**AEGIS // OPS GRID** is a speculative 2087 ten-agency allied intelligence platform (`CIA · MI6/SIS · R&AW · GCHQ · NSA · Mossad · BND · DGSE · ASIS · CSIS`) comprising:
- **Surface A — Public Directorate (`/`, `/agencies`, `/history`, `/recruitment`)**: Historical archive (`1909–2026` public record), capability radar comparator, and 3-puzzle cryptographic recruitment terminal.
- **Surface B — The Gate & Watchfloor Console (`/portal`, `/portal/dashboard`, `/portal/missions`, `/portal/dossiers`, `/portal/comms`, `/portal/vault`)**: Cleared analyst watchfloor with inline SVG Geo-HUD map, `T5..T1` threat gauge, redacted case files/dossiers, live SSE intercept stream, and a client-side `AES-256-GCM` encrypted field-notes vault.

---

## 2. Non-Negotiable Ground Rules (Invariants)

1. **Self-Contained Runtime (`NFR-001`)**:
   - **NEVER** add `<link href="https://fonts.googleapis.com/...">`, `next/font/google`, external script tags, external image URLs, or third-party map tiles.
   - All fonts (`Orbitron`, `Rajdhani`, `Share Tech Mono`) must load from `public/fonts/*.woff2`. All maps/charts must use local inline SVG.
2. **Mandatory Legal Disclaimer Must Stay (`FR-002`, `FR-015`)**:
   - Every page must render `<ClassifiedBanner />` (top and bottom) and the legal disclaimer stating that this is an **UNOFFICIAL FAN CONCEPT** with **zero government affiliation**.
3. **Strict Historical Fact vs. 2087 Fiction Demarcation**:
   - Real-world agency attributes in `src/lib/data/agencies.ts` and `1909–2026` rows in `src/lib/data/timeline.ts` must remain historically accurate to public record (`CIA 1947 Langley`, `SIS 1909 London`, `R&AW 1968 New Delhi`, `GCHQ 1919 Cheltenham`, `NSA 1952 Fort Meade`, `Mossad 1951 Tel Aviv`, `BND 1956 Pullach/Berlin`, `DGSE 1982 Paris`, `ASIS 1952 Melbourne/Canberra`, `CSIS 1984 Ottawa`).
   - All operations, agents, dossiers, intercepts, and threat assessments must remain explicitly fictional (`isFiction: true`) and never contain real classified claims, targeting logic, exploit payloads, or operational tradecraft uplift.
4. **No New Runtime Dependencies Without ADR**:
   - Do not install heavy UI frameworks, animation libraries (`framer-motion`), or charting libraries (`recharts`, `mapbox-gl`). Update `TECH_STACK.md` first if a dependency change is ever proposed.
5. **Accessibility (`WCAG 2.2 AA`) & Reduced Motion (`NFR-002`)**:
   - Maintain contrast $\ge 4.5:1$, explicit `:focus-visible` outlines, focus-trapped `<Modal />` dialogs (`ESC` + backdrop close), pausable tickers/streams, and `@media (prefers-reduced-motion: reduce)` bypasses on all animations.
6. **Never Commit Secrets**:
   - `.env.local` and any private keys must remain gitignored. Only `.env.example` with safe placeholder values may be committed.
7. **Respect Server / Client Component Boundaries (`NFR-006`)**:
   - Keep `layout.tsx` and route `page.tsx` shells as React Server Components (RSC) by default. Add `"use client"` only on interactive leaf components.

---

## 3. Canonical Commands

Run these commands from the repository root (`/home/user/Agent-webpage-`):

```bash
# Start local development server (bound to 0.0.0.0:3000 for live preview)
npm run dev

# Run strict TypeScript typechecker
npm run typecheck

# Run static code & type check
npm run lint

# Run automated Vitest smoke suite (routes, guard, API, AES-GCM vault round-trip)
npm run test

# Build production bundle (must exit 0 with zero errors)
npm run build
```

---

## 4. File & Code Conventions

- **Paths & Imports**: Use the `@/*` path alias mapped to `./src/*` (e.g., `import { AGENCIES } from "@/lib/data/agencies"`).
- **Styling (`OBSIDIAN PARALLAX`)**:
  - Use CSS custom properties defined in `src/styles/globals.css` (`--bg`, `--panel`, `--cy`, `--amber`, `--red`, `--grn`, `--text`, `--text-mut`).
  - Keep corners sharp (`border-radius: 2px`) and frame major HUD modules with `<HudPanel />` and `<CornerBrackets />`.
- **API Route Handlers (`src/app/api/v1/**/route.ts`)**:
  - Always return the standard discriminated envelope: `{ ok: true, data, meta }` or `{ ok: false, error: { code, message, details } }`.
  - Validate all incoming payloads and query parameters with Zod schemas from `src/lib/schemas.ts`.

---

## 5. "Do-Not-Touch" Protected Zones

Do not weaken, delete, or bypass the following modules without explicit architectural sign-off:
1. **`src/components/ClassifiedBanner.tsx` & `src/components/SiteFooter.tsx`**: Contains mandatory legal and factual safety notices (`FR-002`, `FR-015`).
2. **`src/lib/crypto.ts`**: Implements `PBKDF2-SHA256` (`310,000` iterations) + `AES-256-GCM` encryption for `/portal/vault`. Never downgrade this to Base64 encoding or plaintext `localStorage`.
3. **`src/components/ConsoleShell.tsx` & `src/lib/session.ts`**: Enforces the `/portal/*` authentication guard (`FR-008`). Never allow unauthenticated rendering of watchfloor routes.
4. **`next.config.ts` Security Headers**: Preserves `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` (`NFR-005`).

---

## 6. Known Engineering Gotchas

1. **`ZuluClock` Must Hydrate Client-Only (`FR-003`)**:
   - Calling `new Date().toISOString()` during Server Component render and again during client hydration causes React Error #418 (Hydration Mismatch) because milliseconds/seconds tick between SSR and CSR.
   - **Rule**: `ZuluClock` must render a deterministic static string (`2087-11-10 // --:--:-- Z`) on initial render and start its `1000ms` `setInterval` strictly inside `useEffect`.
2. **`sessionStorage` & `localStorage` SSR Guards (`FR-008`, `FR-013`)**:
   - Browser storage globals (`window.sessionStorage`, `window.localStorage`, `window.crypto.subtle`) do not exist on the server during SSR/prerendering (or use Node's `globalThis.crypto.subtle`).
   - **Rule**: Always check `typeof window !== "undefined"` before accessing `sessionStorage` or `localStorage`, and gate `<ConsoleShell />` redirects inside a mounted state check so SSR does not crash.
3. **Next.js 16 `cacheComponents` & Async Route Params**:
   - In Next.js 15/16 App Router, dynamic route segment `context.params` in Route Handlers (`src/app/api/v1/agencies/[id]/route.ts`, etc.) is a **`Promise<{ id: string }>`** and must be awaited (`const { id } = await context.params;`).
   - Avoid experimental unstable flags in `next.config.ts` that conflict with standard dynamic Route Handlers or SSE (`text/event-stream`) responses.

---

## 7. Pre-Merge / Review Checklist

Before concluding any task or opening a pull request, verify every item below:

- [ ] `npm run typecheck` passes with `0` errors.
- [ ] `npm run test` passes all smoke assertions (data integrity, gate validation, guard redirect logic, AES-256-GCM encrypt/decrypt round-trip).
- [ ] `npm run build` succeeds cleanly.
- [ ] Network panel shows `0` requests to external domains (`fonts.googleapis.com`, external CDNs, external map tiles).
- [ ] Top and bottom `<ClassifiedBanner />` and legal disclaimer footer are visible on all routes.
- [ ] All modals (`<Modal />`) trap keyboard focus, close on `ESC` and backdrop click, and restore focus on close.
- [ ] `<Redacted />` spans toggle via click and keyboard (`Enter`/`Space`).
- [ ] `/portal/vault` stores only Base64 `AES-256-GCM` ciphertext + `iv` + `salt` in `localStorage`.
