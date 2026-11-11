# AEGIS // OPS GRID — System Requirements Specification (`REQUIREMENTS.md`)

> **UNOFFICIAL FAN CONCEPT // FICTIONAL 2087 SPECULATIVE INTERFACE**  
> This document specifies the traceable functional (`FR-xxx`) and non-functional (`NFR-xxx`) requirements for **AEGIS // OPS GRID**. All real-agency profiles cite public record only; all operations, agents, dossiers, intercepts, and threat assessments are **100% fiction** and carry no affiliation with any government or intelligence agency.

---

## 1. Requirement Conventions & Priority Scale

- **Requirement IDs**:
  - `FR-001` .. `FR-015`: Functional Requirements (User-visible behaviors, routes, state transitions, and data rules).
  - `NFR-001` .. `NFR-007`: Non-Functional Requirements (Network isolation, accessibility, performance budgets, type safety, security headers, RSC boundaries, responsiveness).
- **Priority Levels**:
  - `P0 (Mandatory / Release Blocker)`: Must pass 100% of acceptance criteria before build sign-off.

---

## 2. Functional Requirements (`FR-001` — `FR-015`)

### `FR-001` — Public Landing Page (`/`)
- **Priority**: `P0`
- **Description**: The public root route (`/`) shall render without authentication and display:
  1. **Command Masthead Hero**: Self-hosted vector/raster hero artwork (`/images/hero-grid.svg`), classification eyebrow (`DIRECTIVE 2087-OMEGA // ALLIED TEN-AGENCY CONCORDAT`), headline with `<DecryptText />` reveal, and primary CTAs to `/portal` ("ENTER THE GATE") and `/agencies` ("INSPECT COALITION").
  2. **Live SITREP Ticker**: Horizontal ticker displaying synthetic 2087 theatre headlines with an accessible `PAUSE` / `RESUME` toggle.
  3. **Agency Preview Grid**: Compact cards for all 10 partner agencies (`CIA`, `MI6/SIS`, `R&AW`, `GCHQ`, `NSA`, `Mossad`, `BND`, `DGSE`, `ASIS`, `CSIS`) linking to `/agencies`.
  4. **Doctrine Pillars**: 4 architectural tenets of the 2087 AEGIS accord (`ORBITAL SIGINT FUSION`, `QUANTUM-RESISTANT LEDGER`, `SOVEREIGN COMPARTMENTATION`, `PARLIAMENTARY OVERSIGHT`).
  5. **Dossier Tease & Recruitment CTA Band**: Locked preview of classified dossiers (prompting authentication at `/portal`) and a direct intake banner linking to `/recruitment`.
- **Acceptance Criteria**:
  - Renders completely with zero active session.
  - Hero art loads from local `public/images/hero-grid.svg` ($\le 220\text{ KB}$).
  - All 10 agencies appear with accurate public-record founding years and headquarters.

---

### `FR-002` — Persistent Classified & Disclaimer Banner (Top + Bottom)
- **Priority**: `P0`
- **Description**: Every route in the application shall render a top and bottom `ClassifiedBanner` strip whose copy and styling adapt between the **Public Surface** and the **Cleared Ops Console**:
  - **Public Surface Variant**: Cyan/Obsidian strip reading `UNCLASSIFIED // PUBLIC DIRECTORATE ARCHIVE // UNOFFICIAL FAN CONCEPT — NOT AFFILIATED WITH ANY GOVERNMENT AGENCY — ALL 2087 OPERATIONS ARE FICTION`.
  - **Ops Console Variant**: Amber/Crimson strip reading `TOP SECRET // AEGIS-UMBRA // FICTIONAL 2087 WATCHFLOOR SIMULATION — FOR SPECULATIVE DESIGN DEMONSTRATION ONLY`.
- **Acceptance Criteria**:
  - Visible at top and bottom of viewport on all 10 routes plus the 404 fallback.
  - Never obscures interactive controls or keyboard focus indicators.

---

### `FR-003` — SSR-Safe 1 Hz Zulu (`UTC`) Chronometer
- **Priority**: `P0`
- **Description**: A live `ZuluClock` component shall appear in both the public top navigation bar and the cleared console topbar, updating once per second (`1 Hz`) in strict ISO/military Zulu format (`YYYY-MM-DD // HH:MM:SS Z` + simulated `2087` epoch offset indicator).
- **Acceptance Criteria**:
  - Server-side render outputs a deterministic static placeholder (`2087-11-10 // --:--:-- Z`) to guarantee zero React hydration mismatch errors.
  - Client hydration starts a `1000ms` interval synced to UTC (`new Date().toISOString()`) and cleans up the timer on unmount.

---

### `FR-004` — Allied Agencies Directory (`/agencies`)
- **Priority**: `P0`
- **Description**: The `/agencies` route shall render a filterable grid (`ALL` / `HUMINT` / `SIGINT` / `FUSION`) of all 10 allied agencies with accurate public-record facts alongside labeled 2087 coalition capabilities:
  - **CIA** (Est. `1947` · HQ: `Langley, Virginia, USA` · Category: `HUMINT`)
  - **MI6 / SIS** (Est. `1909` · HQ: `Vauxhall Cross, London, UK` · Category: `HUMINT`)
  - **R&AW** (Est. `1968` · HQ: `New Delhi, India` · Category: `HUMINT`)
  - **GCHQ** (Est. `1919` · HQ: `Cheltenham, Gloucestershire, UK` · Category: `SIGINT`)
  - **NSA** (Est. `1952` · HQ: `Fort Meade, Maryland, USA` · Category: `SIGINT`)
  - **Mossad** (Est. `1949` / `1951` reorganization · HQ: `Tel Aviv, Israel` · Category: `HUMINT`)
  - **BND** (Est. `1956` · HQ: `Berlin (formerly Pullach), Germany` · Category: `FUSION`)
  - **DGSE** (Est. `1982` · HQ: `Paris, France` · Category: `FUSION`)
  - **ASIS** (Est. `1952` · HQ: `Canberra (founded Melbourne), Australia` · Category: `HUMINT`)
  - **CSIS** (Est. `1984` · HQ: `Ottawa, Ontario, Canada` · Category: `FUSION`)
- **Acceptance Criteria**:
  - Clicking `ALL`, `HUMINT`, `SIGINT`, or `FUSION` immediately filters the visible agency cards and updates an `aria-live="polite"` result counter.
  - Each card renders founding year, HQ city/country, verified statutory remit summary, 4 capability progress bars (`HUMINT`, `SIGINT`, `CYBER`, `ORBITAL`), and an interactive SVG `RadarCard` polar polygon.

---

### `FR-005` — Chronological History Timeline (`/history`)
- **Priority**: `P0`
- **Description**: The `/history` route shall present a chronological timeline from `1909` to `2026` grounded strictly in verifiable public record, followed by clearly demarcated `2054 → 2087` fictional capstone entries explaining the genesis of the AEGIS Ops Grid.
- **Acceptance Criteria**:
  - Includes filter toggles (`ALL EPOCHS` / `VERIFIED PUBLIC RECORD (1909–2026)` / `2087 SPECULATIVE CAPSTONES`).
  - Every `1909–2026` entry carries a `[PUBLIC RECORD]` badge; every post-2026 entry carries a high-contrast `[2087 SPECULATIVE FICTION]` badge.

---

### `FR-006` — Recruitment Pipeline & Cryptographic Aptitude Terminal (`/recruitment`)
- **Priority**: `P0`
- **Description**: The `/recruitment` route shall display:
  1. **5-Stage Intake Pipeline**: (`01 SIGNAL INTAKE` → `02 POLYGRAPH & COGNITIVE MATRIX` → `03 ZERO-TRUST VETTING` → `04 TRADECRAFT CRUCIBLE` → `05 UMBRA INDOC`).
  2. **Clearance Tiers Table**: (`TIER-1 OBSERVER`, `TIER-3 WATCHER`, `TIER-5 OPERATIVE`, `TIER-7 UMBRA / AEGIS`).
  3. **3-Question Aptitude Terminal**: Interactive multi-choice logical/cryptographic/spatial puzzles with instant per-question telemetry feedback and score calculation (`0/3` to `3/3`).
  4. **Candidate Packet Form**: Inputs for candidate codename ($\ge 3$ chars), encrypted contact handle, primary specialty (`HUMINT`, `SIGINT`, `QUANTUM CRYPT`, `ORBITAL RECON`), and fiction-acknowledgment consent checkbox.
- **Acceptance Criteria**:
  - Submitting a valid form calls `POST /api/v1/recruitment/applications` (with resilient client fallback), persists the record in `localStorage`, and renders a deterministic tracking serial matching `^ARG-2087-[A-Z0-9]{4}$`.
  - Invalid inputs render inline accessible error messages without page reload.

---

### `FR-007` — THE GATE Breach-Door Authentication (`/portal`)
- **Priority**: `P0`
- **Description**: The `/portal` route shall serve as the high-security login gate into the cleared console:
  - Accepts `codename` (trimmed length $\ge 3$ characters) and `passphrase` (length $\ge 8$ characters).
  - Includes a one-click **"LOAD DEMO CREDENTIALS (`KESTREL-9` / `OBSIDIAN-2087`)"** button for evaluators.
  - On valid submission: requests `POST /api/v1/auth/session`, stores the session envelope (`sessionId`, `codename`, `clearance: "UMBRA-7"`, `expiresAt`) in `sessionStorage` + cookie, triggers the blast-door unlock sequence, and navigates to `/portal/dashboard`.
  - On invalid shape (`codename < 3` or `passphrase < 8`): triggers a horizontal CSS error shake (`prefers-reduced-motion` safe), increments the failed attempt counter, and displays `ACCESS DENIED // CREDENTIAL SHAPE VIOLATION`.
- **Acceptance Criteria**:
  - Valid credentials always establish an active session and redirect to `/portal/dashboard`.
  - Invalid credentials never establish a session and announce the error via `role="alert"`.

---

### `FR-008` — Cleared Console Session Guard (`/portal/*`)
- **Priority**: `P0`
- **Description**: Every route under `/portal/*` (`/portal/dashboard`, `/portal/missions`, `/portal/dossiers`, `/portal/comms`, `/portal/vault`) shall verify an active, non-expired session before rendering watchfloor data.
- **Acceptance Criteria**:
  - Direct navigation to any `/portal/*` child route without a valid session immediately redirects to `/portal?reason=auth_required`.
  - Clicking `PURGE SESSION` in the console sidebar clears `sessionStorage`, calls `DELETE /api/v1/auth/session`, and returns the operator to `/portal`.

---

### `FR-009` — Cleared Watchfloor Dashboard (`/portal/dashboard`)
- **Priority**: `P0`
- **Description**: The `/portal/dashboard` route shall render the primary watchfloor command view:
  1. **KPI Strip (4 Modules)**: `ACTIVE OPERATIONS` (`08`), `DEPLOYED ASSETS` (`142`), `24H INTERCEPTS` (`18,490`), and `THREAT CONDITION` (`T2 // SEVERE`).
  2. **Animated SVG Geo-HUD Map (`<GeoHud />`)**: Self-contained equirectangular graticule world map plotting all 10 allied HQ city blips (`Langley`, `London`, `New Delhi`, `Cheltenham`, `Fort Meade`, `Tel Aviv`, `Berlin`, `Paris`, `Canberra`, `Ottawa`) plus active theatre anomalies (`Svalbard Vault`, `Low-Earth Orbit Node-4`, `Strait of Malacca Relay`, `Atacama Deep Array`) connected by animated SVG bezier arc trails and interactive node selection.
  3. **Threat Condition Gauge (`<ThreatGauge />`)**: Custom SVG radial arc + animated needle reading `T5` (Nominal) through `T1` (Critical), with interactive simulation switcher so analysts can inspect watchfloor posture across `T5..T1`.
  4. **Top-4 Active Operations Panel**: Quick-status cards with direct links to `/portal/missions`.
  5. **Mini Live Intercept Feed**: Real-time preview of the last 4 decoded traffic frames linking to `/portal/comms`.
- **Acceptance Criteria**:
  - Map uses 100% inline SVG with zero external tile/script calls.
  - Selecting a city/theatre blip on the Geo-HUD updates the telemetry readout drawer.

---

### `FR-010` — Operations & Case Files Console (`/portal/missions`)
- **Priority**: `P0`
- **Description**: The `/portal/missions` route shall list all 8 fictional 2087 coalition operations with filter tabs (`ALL` / `ACTIVE` / `STANDBY` / `DARK`) and a theatre search filter.
- **Acceptance Criteria**:
  - Selecting any operation opens a focus-trapped `<Modal />` case-file reader displaying operation codename, lead agency, threat level (`1–5`), assigned asset callsigns, chronological log, and narrative briefing containing `<Redacted />` spans.
  - Clicking or pressing `Enter`/`Space` on any `<Redacted />` span toggles its state from masked black bar (`[REDACTED // CLICK TO DECLASSIFY]`) to revealed cyan text, plus a "DECLASSIFY ALL SPANS" utility button.
  - Pressing `ESC` or clicking the modal backdrop closes the case file and restores focus to the triggering button.

---

### `FR-011` — Classified Dossiers Archive (`/portal/dossiers`)
- **Priority**: `P0`
- **Description**: The `/portal/dossiers` route shall render 8 redaction-heavy intelligence dossier cards filterable by classification (`ALL` / `UMBRA-7` / `ORCON` / `EYES ONLY`) and category (`PERSONNEL`, `ARTIFACT`, `ORBITAL`, `SYNDICATE`).
- **Acceptance Criteria**:
  - All 8 dossiers render with classification stamp (`<Stamp />`), page count, last-updated Zulu timestamp, lead agency attribution, and redaction density percentage.
  - Clicking a dossier card opens the full multi-section document reader `<Modal />` with interactive `<Redacted />` tokens and keyboard focus trapping.

---

### `FR-012` — Live Intercept Stream Console (`/portal/comms`)
- **Priority**: `P0`
- **Description**: The `/portal/comms` route shall stream synthetic 2087 communications intercepts (`QUANTUM-BURST`, `LASERCOM-LEO`, `DEEP-CABLE`, `IONO-SCATTER`) every 3.5 seconds via `/api/v1/intercepts/stream` (with seamless client-side deterministic stream engine):
  - Controls: `PAUSE STREAM`, `RESUME STREAM`, `INJECT TEST BURST`, `CLEAR BUFFER`, and classification filter (`ALL` / `FLASH` / `IMMEDIATE` / `PRIORITY`).
  - Each intercept frame displays a `<Stamp />` classification badge, UTC capture timestamp, origin → destination vector, channel frequency, and `<DecryptText />` character-scramble reveal.
- **Acceptance Criteria**:
  - Stream can be paused, resumed, manually stepped, and cleared via mouse or keyboard.
  - Under `prefers-reduced-motion: reduce`, intercepts render decoded text immediately without rapid glyph scrambling.

---

### `FR-013` — Local Encrypted Field-Notes Vault (`/portal/vault`)
- **Priority**: `P0`
- **Description**: The `/portal/vault` route shall provide a genuine client-side encrypted field-notes vault powered by the browser Web Crypto API (`window.crypto.subtle`):
  - Derives a 256-bit `AES-GCM` key from the operator's vault passphrase (defaulting to session passphrase or custom vault key) using `PBKDF2` (`SHA-256`, `310,000` iterations, random 16-byte salt).
  - Encrypts note title, body, and classification tag with a fresh 12-byte random IV (`AES-256-GCM`) before persisting to `localStorage` (and optional `/api/v1/vault/notes` ciphertext mirror).
  - Displays both the decrypted analyst view and the raw Base64 `ciphertext` + `iv` + `salt` verification inspector so evaluators can verify zero plaintext at rest.
  - Provides **Export `.txt`** (downloads formatted declassified/encrypted report) and **Burn All Notes** protected by a mandatory **two-step confirmation** (`ARM BURN SEQUENCE` → `CONFIRM CRYPTO-SHRED`).
- **Acceptance Criteria**:
  - Inspecting `localStorage.getItem("aegis_vault_v1")` reveals only JSON containing Base64 `ciphertext`, `iv`, and `salt`—never plaintext note content.
  - Two-step burn permanently wipes all stored notes and rotates the vault salt.
  - Export `.txt` triggers a browser file download (`aegis-vault-export-YYYYMMDD.txt`).

---

### `FR-014` — Custom 404 Telemetry Loss Route (`not-found.tsx`)
- **Priority**: `P0`
- **Description**: Navigating to any undefined route shall render the custom 404 screen headlined `"YOU ARE OFF THE MAP"` with simulated dead-reckoning telemetry (`SIGNAL LOCK: 0.00% // SECTOR UNCHARTED`) and direct recovery links to `/` (Public Directorate) and `/portal/dashboard` (Watchfloor).
- **Acceptance Criteria**:
  - Returns HTTP `404` status code and preserves top/bottom `ClassifiedBanner` + keyboard recovery links.

---

### `FR-015` — Mandatory Legal & Factual Safety Disclaimer Footer
- **Priority**: `P0`
- **Description**: All public routes (`/`, `/agencies`, `/history`, `/recruitment`), `/portal`, the console shell, and `README.md` shall include an explicit legal disclaimer stating that **AEGIS // OPS GRID** is an unofficial fan concept, unaffiliated with any real intelligence agency or government, using public-record facts for historical profiles and pure fiction for all 2087 content.
- **Acceptance Criteria**:
  - Present and legible on every page and in repository documentation.

---

## 3. Non-Functional Requirements (`NFR-001` — `NFR-007`)

### `NFR-001` — Self-Contained Zero-External-CDN Runtime
- **Requirement**: The application shall execute with **zero runtime requests to third-party domains or CDNs**. Fonts (`Orbitron`, `Rajdhani`, `Share Tech Mono`) must be self-hosted `.woff2` files in `public/fonts/`; imagery and sigils must reside in `public/images/` or inline SVG; cartography must be inline SVG.
- **Verification**: `grep -rn "https://fonts.googleapis" src/` returns empty; CSP `default-src 'self'` blocks any external fetch.

### `NFR-002` — Accessibility (`WCAG 2.2 AA`) & Reduced Motion
- **Requirement**:
  - Foreground/background text contrast ratio $\ge 4.5:1$ for body copy and $\ge 3:1$ for large HUD headings/icons.
  - Visible 2px cyan/amber `:focus-visible` outlines on every interactive element.
  - Semantic ARIA roles on modals (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), tickers/streams (`aria-live="polite"`), and filter buttons (`aria-pressed`).
  - `@media (prefers-reduced-motion: reduce)` disables CRT power-on flicker, radar rotation, arc dash animations, and glyph scramble loops.
- **Verification**: Automated accessibility assertions and keyboard-only traversal.

### `NFR-003` — Performance Budgets
- **Requirement**:
  - Hero graphical asset transfer size $\le 220\text{ KB}$.
  - First-load client JavaScript bundle $\le 250\text{ KB}$ gzipped.
  - Time to Interactive (TTI) $< 2.5\text{s}$ on mid-tier hardware.
- **Verification**: `npm run build` output inspection and asset size check in `public/images/` and `public/fonts/`.

### `NFR-004` — Strict Type Safety & Clean Production Build
- **Requirement**: TypeScript configured with `"strict": true`, `"noImplicitAny": true`, and `"strictNullChecks": true`. Zero TypeScript errors (`npm run typecheck`), zero lint errors (`npm run lint`), and clean `next build` (`npm run build`).
- **Verification**: Automated CLI checks during CI/build verification.

### `NFR-005` — Hardened HTTP Security Headers
- **Requirement**: Next.js response headers / proxy configuration shall emit:
  - `Content-Security-Policy`: strict self-hosted policy (`default-src 'self'; img-src 'self' data: blob:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'; base-uri 'self'; form-action 'self'`).
  - `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options`: `nosniff`
  - `Referrer-Policy`: `strict-origin-when-cross-origin`
  - `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), interest-cohort=()`
- **Verification**: Inspect HTTP headers returned by the Next.js server.

### `NFR-006` — Server Components by Default (RSC Architecture)
- **Requirement**: Route layouts, static metadata, historical data shells, and framing layers shall be React Server Components (RSC) by default. `"use client"` directives shall be scoped strictly to interactive leaves (clock, filters, gate form, modals, comms stream, encrypted vault).
- **Verification**: Codebase audit confirming server-first `page.tsx` and `layout.tsx` entrypoints.

### `NFR-007` — Responsive Viewport Continuity (`360px` → `2560px`)
- **Requirement**: Every public and console route must adapt cleanly from `360px` mobile handsets through `768px` tactical tablets (where the console sidebar collapses into a sticky horizontal command strip) up to `2560px` ultrawide watchfloor displays without horizontal overflow.
- **Verification**: CSS grid/flex breakpoint rules and responsive layout audit.

---

## 4. Requirements Traceability Matrix (RTM)

| Req ID | Summary | Primary Route(s) | Primary Component(s) / Module(s) | API / Storage Backing | Verification Test |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `FR-001` | Public landing page | `/` | `SiteNav`, `Ticker`, `RadarCard`, `DecryptText` | `src/lib/data/agencies.ts` | `tests/smoke.test.ts` |
| `FR-002` | Classified banner (top+bottom) | All routes | `ClassifiedBanner` | Static props (`variant`) | `tests/smoke.test.ts` |
| `FR-003` | 1 Hz SSR-safe Zulu UTC clock | All routes | `ZuluClock`, `src/lib/clock.ts` | Client timer (`1000ms`) | `tests/smoke.test.ts` |
| `FR-004` | Filterable 10-agency directory | `/agencies` | `AgenciesClient`, `RadarCard`, `Sigil` | `GET /api/v1/agencies` | `tests/smoke.test.ts` |
| `FR-005` | 1909–2026 + 2087 timeline | `/history` | `HistoryClient`, `HudPanel` | `GET /api/v1/timeline` | `tests/smoke.test.ts` |
| `FR-006` | Recruitment + aptitude + serial | `/recruitment` | `RecruitmentClient`, `Toast` | `POST /api/v1/recruitment/applications` | `tests/smoke.test.ts` |
| `FR-007` | THE GATE login & door animation | `/portal` | `GateClient`, `PowerOn` | `POST /api/v1/auth/session` | `tests/smoke.test.ts` |
| `FR-008` | Console route guard | `/portal/*` | `ConsoleShell`, `src/lib/session.ts` | `sessionStorage` + cookie | `tests/smoke.test.ts` |
| `FR-009` | Watchfloor dashboard + GeoHud | `/portal/dashboard` | `GeoHud`, `ThreatGauge`, `HudPanel` | `src/lib/data/operations.ts` | `tests/smoke.test.ts` |
| `FR-010` | Filterable missions + modal + unredact | `/portal/missions` | `MissionsClient`, `Modal`, `Redacted` | `GET /api/v1/operations` | `tests/smoke.test.ts` |
| `FR-011` | 8 dossiers + modal reader | `/portal/dossiers` | `DossiersClient`, `Modal`, `Stamp`, `Redacted` | `GET /api/v1/dossiers` | `tests/smoke.test.ts` |
| `FR-012` | Auto-streaming intercepts | `/portal/comms` | `CommsClient`, `DecryptText`, `Stamp` | `GET /api/v1/intercepts/stream` | `tests/smoke.test.ts` |
| `FR-013` | AES-256-GCM local vault + burn | `/portal/vault` | `VaultClient`, `VaultNote`, `src/lib/crypto.ts` | Web Crypto API + `localStorage` | `tests/smoke.test.ts` |
| `FR-014` | Custom 404 off-the-map route | `not-found.tsx` | `NotFound` | Static RSC | `tests/smoke.test.ts` |
| `FR-015` | Legal disclaimer footer | All routes + docs | `SiteFooter`, `ClassifiedBanner` | Static copy | `tests/smoke.test.ts` |
| `NFR-001` | Zero external runtime CDN calls | Global | `src/styles/globals.css`, `public/fonts/*` | Local static assets | Build & asset check |
| `NFR-002` | WCAG 2.2 AA + reduced motion | Global | All components | CSS media queries + ARIA | A11y audit |
| `NFR-003` | Performance budgets | Global | SVG assets + RSC split | Next.js bundler | `next build` report |
| `NFR-004` | Strict TypeScript & clean build | Global | `tsconfig.json` | TypeScript 5.x | `npm run build` |
| `NFR-005` | Security headers | Global | `next.config.ts` | HTTP response headers | Header inspection |
| `NFR-006` | Server Components default | `src/app/**` | RSC page shells + client islands | React 19 / Next.js 16 | Architecture check |
| `NFR-007` | Responsive 360→2560px | Global | CSS Grid + console top-strip fallback | Tailwind v4 + custom CSS | Viewport check |
