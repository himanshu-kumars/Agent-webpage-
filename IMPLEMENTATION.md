# AEGIS // OPS GRID — Phased Implementation Plan (`IMPLEMENTATION.md`)

> **UNOFFICIAL FAN CONCEPT // FICTIONAL 2087 SPECULATIVE INTERFACE**  
> This document breaks down the end-to-end engineering delivery of **AEGIS // OPS GRID** into four sequential phases (`P0` → `P3`) with t-shirt estimates (`S`, `M`, `L`), task checkboxes, per-phase exit gates, a complete file-tree ownership map, and the final Definition of Done checklist.

---

## 1. Phase Breakdown & Task Checklists

### Phase 0 (`P0`) — Foundation, Design Tokens & Self-Hosted Assets
- **Estimate**: `S` (~4 engineering hours)
- **Objective**: Establish the Next.js 16 + React 19 + TypeScript strict workspace, self-hosted `.woff2` typography, local hero SVG/imagery, `OBSIDIAN PARALLAX` CSS tokens, and lint/test tooling with zero external CDN requests.
- **Tasks**:
  - [x] **P0.1**: Initialize `package.json`, `tsconfig.json` (`strict: true`), `next.config.ts` (security headers), and `.env.example`.
  - [x] **P0.2**: Self-host `.woff2` font files in `public/fonts/` (`Orbitron`, `Rajdhani` 400/500/600/700, `Share Tech Mono`) and wire `@font-face` declarations in `src/styles/globals.css`.
  - [x] **P0.3**: Define `OBSIDIAN PARALLAX` design tokens (`--bg #04070d`, `--panel #0a1322`, `--cy #3ee0ff`, `--amber #ffb454`, `--red #ff3b4e`, `--grn #39ff9d`), scanline overlay, film grain texture, and `@media (prefers-reduced-motion: reduce)` rules in `src/styles/globals.css`.
  - [x] **P0.4**: Generate local SVG hero schematic (`public/images/hero-grid.svg` $\le 220\text{ KB}$) and app favicon sigil (`src/app/icon.svg`).
  - [x] **P0.5**: Build core atomic framing primitives: `<Sigil />`, `<CornerBrackets />`, `<HudPanel />`, `<Stamp />`, `<PowerOn />`, `<Toast />`, `<EmptyState />`, and `<NotFound />`.
  - [x] **P0.6**: Author canonical strongly-typed seed catalogs in `src/lib/data/` (`agencies.ts`, `timeline.ts`, `operations.ts`, `dossiers.ts`, `intercepts.ts`, `aptitude.ts`) and Drizzle reference schema (`src/lib/db/schema.ts`).
- **Phase 0 Exit Criteria**:
  - `npm run typecheck` exits `0`.
  - Zero references to `fonts.googleapis.com` or external CDNs anywhere in source.

---

### Phase 1 (`P1`) — Public Directorate Front Door (`/`, `/agencies`, `/history`, `/recruitment`)
- **Estimate**: `M` (~10 engineering hours)
- **Objective**: Deliver the complete unauthenticated public experience combining verified 1909–2026 intelligence history with labeled 2087 worldbuilding and the interactive recruitment pipeline.
- **Tasks**:
  - [x] **P1.1**: Implement `<ClassifiedBanner />` (top + bottom `public` vs `console` variants) and `<SiteFooter />` carrying mandatory unofficial fan-concept disclaimers (`FR-002`, `FR-015`).
  - [x] **P1.2**: Implement SSR-safe 1 Hz `<ZuluClock />` (`src/lib/clock.ts` + `src/components/ZuluClock.tsx`) and `<SiteNav />` (`FR-003`).
  - [x] **P1.3**: Build `/` (Public Home): Hero masthead with `/images/hero-grid.svg` and `<DecryptText />`, accessible `<Ticker />` with pause/resume, 10-agency compact preview grid, 4 Doctrine pillars, locked dossier tease, and recruitment CTA band (`FR-001`).
  - [x] **P1.4**: Build `/agencies`: Category filter (`ALL` / `HUMINT` / `SIGINT` / `FUSION`), coalition radar comparator, and 10 `<RadarCard />` modules with verified public-record facts (CIA 1947, SIS 1909, R&AW 1968, GCHQ 1919, NSA 1952, Mossad 1951, BND 1956, DGSE 1982, ASIS 1952, CSIS 1984) (`FR-004`).
  - [x] **P1.5**: Build `/history`: Chronological timeline from `1909 → 2026` (`[PUBLIC RECORD]`) + `2054 → 2087` (`[2087 SPECULATIVE FICTION]`) with epoch filter buttons (`FR-005`).
  - [x] **P1.6**: Build `/recruitment`: 5-stage pipeline, 4-tier clearance matrix, interactive 3-question aptitude terminal with diagnostic feedback, and candidate application form issuing serial `ARG-2087-XXXX` (`FR-006`).
  - [x] **P1.7**: Implement public REST endpoints: `GET /api/v1/agencies`, `GET /api/v1/agencies/[id]`, `GET /api/v1/timeline`, `POST /api/v1/recruitment/applications`, and `GET /api/v1/health`.
- **Phase 1 Exit Criteria**:
  - All 4 public routes build cleanly, pass keyboard tab order checks, and display accurate historical metadata + mandatory disclaimers.

---

### Phase 2 (`P2`) — The Gate & Cleared Watchfloor Console (`/portal`, `/portal/dashboard`, `/portal/missions`, `/portal/dossiers`)
- **Estimate**: `M` (~12 engineering hours)
- **Objective**: Implement breach-door authentication, the `/portal/*` session guard, the watchfloor Geo-HUD dashboard, and the interactive case-file and dossier readers.
- **Tasks**:
  - [x] **P2.1**: Implement session management (`src/lib/session.ts`) and auth endpoints (`POST /api/v1/auth/session`, `DELETE /api/v1/auth/session`, `GET /api/v1/session`).
  - [x] **P2.2**: Build `/portal` ("THE GATE"): Codename ($\ge 3$ chars) + passphrase ($\ge 8$ chars) validation, invalid-shape chassis shake + alert, one-click demo credential loader (`KESTREL-9` / `OBSIDIAN-2087`), and blast-door unlock transition to `/portal/dashboard` (`FR-007`).
  - [x] **P2.3**: Build `<ConsoleShell />` layout guard wrapping `/portal/dashboard`, `/portal/missions`, `/portal/dossiers`, `/portal/comms`, and `/portal/vault`—redirecting unauthenticated visitors to `/portal` and providing responsive sidebar/top-strip navigation + `PURGE SESSION` (`FR-008`, `NFR-007`).
  - [x] **P2.4**: Build `<GeoHud />` (inline SVG graticule world map with 10 agency HQ blips, 4 active theatre nodes, animated Great-Circle bezier arc trails, and interactive node inspector) and `<ThreatGauge />` (`T5..T1` SVG arc + needle) (`FR-009`).
  - [x] **P2.5**: Assemble `/portal/dashboard`: 4-card KPI strip, `<GeoHud />`, `<ThreatGauge />`, top-4 active operations panel, and mini intercept feed (`FR-009`).
  - [x] **P2.6**: Build focus-trapped `<Modal />` (`ESC` + backdrop dismissal + focus return) and interactive `<Redacted />` click-to-unredact component (`FR-010`, `FR-011`).
  - [x] **P2.7**: Build `/portal/missions` (`ALL` / `ACTIVE` / `STANDBY` / `DARK` filters + modal case file reader) and `/portal/dossiers` (8 classified dossiers + `<Stamp />` + modal document reader) (`FR-010`, `FR-011`) plus `GET /api/v1/operations`, `GET /api/v1/operations/[id]`, `GET /api/v1/dossiers`, `GET /api/v1/dossiers/[id]`.
- **Phase 2 Exit Criteria**:
  - Unauthenticated access to any `/portal/*` route redirects to `/portal`.
  - Modals trap focus, close on `ESC` and backdrop click, and `<Redacted />` spans toggle cleanly via mouse and keyboard.

---

### Phase 3 (`P3`) — Live Comms Stream, AES-256-GCM Vault & Production Hardening
- **Estimate**: `L` (~12 engineering hours)
- **Objective**: Complete the live SSE intercept decoder, the Web Crypto `AES-256-GCM` field-notes vault, custom 404 route, reduced-motion & responsive sweep, automated tests, and documentation audit.
- **Tasks**:
  - [x] **P3.1**: Build `GET /api/v1/intercepts/stream` (`text/event-stream` SSE) and `/portal/comms` with auto-streaming fictional intercepts, `PAUSE` / `RESUME` / `INJECT` / `CLEAR` controls, classification filters, and `<DecryptText />` scramble reveal (`FR-012`).
  - [x] **P3.2**: Implement Web Crypto API module (`src/lib/crypto.ts`) using `PBKDF2-SHA256` (`310,000` iterations, 16-byte random salt) and `AES-256-GCM` (12-byte random IV, 128-bit auth tag).
  - [x] **P3.3**: Build `/portal/vault`, `<VaultNote />`, and `/api/v1/vault/notes` (`GET`/`POST`/`PATCH`/`DELETE`): client-side note encryption, raw Base64 ciphertext + IV verification drawer, `.txt` file export, and two-step cryptographic burn confirmation (`FR-013`).
  - [x] **P3.4**: Wire custom 404 route (`src/app/not-found.tsx`: `"YOU ARE OFF THE MAP"`) (`FR-014`).
  - [x] **P3.5**: Execute full accessibility (`WCAG 2.2 AA`), `@media (prefers-reduced-motion: reduce)`, and responsive viewport (`360px` → `768px` → `2560px`) audit (`NFR-002`, `NFR-007`).
  - [x] **P3.6**: Finalize `README.md` and `AGENT.md`, run Vitest suite (`tests/smoke.test.ts`), and verify clean `npm run build`.
- **Phase 3 Exit Criteria**:
  - Vault notes store zero plaintext in `localStorage`; round-trip encrypt/decrypt and two-step burn pass automated tests.
  - `npm run test`, `npm run typecheck`, and `npm run build` succeed with zero errors.

---

## 2. File-Tree Ownership Map

```text
/home/user/Agent-webpage-/
├── PRD.md                                 [Deliverable 1: Product Requirements Document]
├── REQUIREMENTS.md                        [Deliverable 2: Traceable FR-xxx & NFR-xxx Spec]
├── USER_FLOWS.md                          [Deliverable 3: Mermaid Flows & State Machines]
├── UIUX.md                                [Deliverable 4: OBSIDIAN PARALLAX Design System]
├── TECH_STACK.md                          [Deliverable 5: Stack ADR & Deployment Modes]
├── API.md                                 [Deliverable 6: /api/v1 REST & SSE Contract]
├── DATABASE.md                            [Deliverable 7: Postgres 15+ DDL, ERD & Seed Plan]
├── SECURITY.md                            [Deliverable 8: Threat Model, Crypto & OWASP Matrix]
├── IMPLEMENTATION.md                      [Deliverable 9: Phased Plan & DoD Checklist]
├── README.md                              [Deliverable 10: Quickstart, Scripts, Env & Disclaimer]
├── AGENT.md                               [Deliverable 11: AI Agent Constitution & Invariants]
├── .env.example                           [Environment Variable Template]
├── package.json                           [Scripts & Minimal Self-Contained Dependencies]
├── tsconfig.json                          [Strict TypeScript Configuration]
├── next.config.ts                         [Hardened Security Headers & Next.js Config]
├── vitest.config.ts                       [Vitest Test Runner Configuration]
├── public/
│   ├── fonts/                             [Self-Hosted .woff2: Orbitron, Rajdhani, Share Tech Mono]
│   └── images/
│       ├── hero-grid.svg                  [Self-Hosted 2087 Orbital Masthead Artwork <= 220KB]
│       └── agency-crest-grid.svg          [Coalition Sigil Vector Sheet]
├── src/
│   ├── styles/
│   │   └── globals.css                    [OBSIDIAN PARALLAX Tokens, Fonts, Scanlines, Motion Rules]
│   ├── lib/
│   │   ├── clock.ts                       [UTC / 2087 Epoch Formatting Helpers]
│   │   ├── crypto.ts                      [Web Crypto PBKDF2 (310k) + AES-256-GCM Vault Engine]
│   │   ├── session.ts                     [Client + Server Watchfloor Session Envelope Manager]
│   │   ├── schemas.ts                     [Zod Validation Contracts for API & Forms]
│   │   ├── rate-limit.ts                  [In-Memory Token Bucket Rate Limiter]
│   │   ├── db/
│   │   │   └── schema.ts                  [Drizzle ORM PostgreSQL 15+ Table Definitions]
│   │   └── data/
│   │       ├── agencies.ts                [10 Allied Agencies: Verified Public Record + Capabilities]
│   │       ├── timeline.ts                [22 Timeline Events: 1909-2026 Record + 2087 Fiction]
│   │       ├── operations.ts              [8 Fictional 2087 Case Files + Redacted Briefings]
│   │       ├── dossiers.ts                [10 Seed Dossiers / 8 Primary Dossier Cards]
│   │       ├── intercepts.ts              [200 Synthetic Comms Intercept Generator & Seed Catalog]
│   │       └── aptitude.ts                [3-Question Cryptographic/Orbital Aptitude Puzzles]
│   ├── hooks/
│   │   ├── useReducedMotion.ts            [SSR-Safe prefers-reduced-motion Listener]
│   │   └── useSession.ts                  [Watchfloor Session Hook + Guard Redirector]
│   ├── components/
│   │   ├── ClassifiedBanner.tsx           [01: Top/Bottom Public vs Console Classification Strip]
│   │   ├── ZuluClock.tsx                  [02: 1 Hz SSR-Safe UTC Clock]
│   │   ├── SiteNav.tsx                    [03: Public 4-Link Navigation + THE GATE CTA]
│   │   ├── Sigil.tsx                      [04: Inline SVG 10-Agency Orbital Crest]
│   │   ├── HudPanel.tsx                   [05: Obsidian Tactical Panel Frame]
│   │   ├── CornerBrackets.tsx             [06: 4-Corner HUD Registration Marks]
│   │   ├── ThreatGauge.tsx                [07: SVG Semicircular Arc + Needle (T5..T1)]
│   │   ├── GeoHud.tsx                     [08: Inline SVG World Map + Blips + Bezier Arc Trails]
│   │   ├── RadarCard.tsx                  [09: Agency Card + Capability Bars + SVG Polar Radar]
│   │   ├── DecryptText.tsx                [10: IO-Triggered Character Scramble Reveal]
│   │   ├── Redacted.tsx                   [11: Click/Keyboard-to-Unredact Classified Token]
│   │   ├── Ticker.tsx                     [12: Pausable Live SITREP Telemetry Strip]
│   │   ├── Stamp.tsx                      [13: Stencil Classification Stamp]
│   │   ├── Modal.tsx                      [14: Focus-Trapped Accessible Reader Dialog]
│   │   ├── Toast.tsx                      [15: Tactical Status Notification Banner]
│   │   ├── VaultNote.tsx                  [16: Decrypted Note + Raw Ciphertext Verification Card]
│   │   ├── EmptyState.tsx                 [17: Zero-Match Filter Recovery Panel]
│   │   ├── NotFound.tsx                   [18: "YOU ARE OFF THE MAP" 404 Component]
│   │   ├── PowerOn.tsx                    [19: Route-Entry CRT Stabilization Wrapper]
│   │   ├── SiteFooter.tsx                 [Mandatory Public & Gate Legal Disclaimer Footer]
│   │   └── ConsoleShell.tsx               [Cleared /portal/* Guard, 5-Item Sidebar & Topbar]
│   └── app/
│       ├── layout.tsx                     [Root Layout: Fonts, Metadata, Scanlines, Grain]
│       ├── icon.svg                       [SVG Sigil App Icon]
│       ├── not-found.tsx                  [FR-014 Custom 404 Route]
│       ├── page.tsx                       [FR-001 Public Landing (/)]
│       ├── agencies/
│       │   └── page.tsx                   [FR-004 Filterable 10-Agency Directory (/agencies)]
│       ├── history/
│       │   └── page.tsx                   [FR-005 1909-2026 + 2087 Timeline (/history)]
│       ├── recruitment/
│       │   └── page.tsx                   [FR-006 Pipeline, Aptitude Terminal & Form (/recruitment)]
│       ├── portal/
│       │   ├── page.tsx                   [FR-007 THE GATE Breach-Door Login (/portal)]
│       │   ├── dashboard/
│       │   │   └── page.tsx               [FR-009 Watchfloor Dashboard (/portal/dashboard)]
│       │   ├── missions/
│       │   │   └── page.tsx               [FR-010 Filterable Case Files + Modal (/portal/missions)]
│       │   ├── dossiers/
│       │   │   └── page.tsx               [FR-011 8 Redacted Dossiers + Modal (/portal/dossiers)]
│       │   ├── comms/
│       │   │   └── page.tsx               [FR-012 Auto-Streaming Intercepts (/portal/comms)]
│       │   └── vault/
│       │       └── page.tsx               [FR-013 AES-256-GCM Encrypted Vault (/portal/vault)]
│       └── api/v1/
│           ├── health/route.ts            [GET /api/v1/health]
│           ├── session/route.ts           [GET /api/v1/session]
│           ├── auth/session/route.ts      [POST, DELETE /api/v1/auth/session]
│           ├── agencies/route.ts          [GET /api/v1/agencies]
│           ├── agencies/[id]/route.ts     [GET /api/v1/agencies/:id]
│           ├── timeline/route.ts          [GET /api/v1/timeline]
│           ├── operations/route.ts        [GET /api/v1/operations]
│           ├── operations/[id]/route.ts   [GET /api/v1/operations/:id]
│           ├── dossiers/route.ts          [GET /api/v1/dossiers]
│           ├── dossiers/[id]/route.ts     [GET /api/v1/dossiers/:id]
│           ├── intercepts/stream/route.ts [GET /api/v1/intercepts/stream (SSE)]
│           ├── recruitment/applications/route.ts [POST /api/v1/recruitment/applications]
│           └── vault/notes/route.ts       [GET, POST, PATCH, DELETE /api/v1/vault/notes]
└── tests/
    └── smoke.test.ts                      [Automated Smoke Suite: Data, Guard, API, AES-GCM Vault]
```

---

## 3. Definition of Done (DoD) Checklist

- [x] **Legal & Factual Safety**: Every page displays top/bottom `ClassifiedBanner` and footer disclaimer stating **UNOFFICIAL FAN CONCEPT — NO GOVERNMENT AFFILIATION**; all 10 historical agency profiles match public record; all 2087 items are explicitly badged as fiction.
- [x] **Zero External Runtime Calls (`NFR-001`)**: Fonts (`Orbitron`, `Rajdhani`, `Share Tech Mono`), hero graphics, and SVG cartography load 100% locally.
- [x] **Complete Route Coverage**: All 10 routes (`/`, `/agencies`, `/history`, `/recruitment`, `/portal`, `/portal/dashboard`, `/portal/missions`, `/portal/dossiers`, `/portal/comms`, `/portal/vault`) + `not-found.tsx` + `/api/v1/*` endpoints are implemented without stubs.
- [x] **Accessibility & Motion (`NFR-002`)**: Contrast $\ge 4.5:1$, visible `:focus-visible` rings, focus-trapped modals (`ESC` + backdrop close), pausable tickers/streams, and `@media (prefers-reduced-motion: reduce)` honored everywhere.
- [x] **Real Client Cryptography (`FR-013`)**: `/portal/vault` derives keys with `PBKDF2-SHA256` (`310,000` iterations) and encrypts notes with `AES-256-GCM` before storing in `localStorage`.
- [x] **Verification Green**: `npm run typecheck`, `npm run test`, and `npm run build` complete with zero errors.
