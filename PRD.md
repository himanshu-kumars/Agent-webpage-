# AEGIS // OPS GRID — Product Requirements Document (PRD)

> **UNOFFICIAL FAN CONCEPT // FICTIONAL 2087 SPECULATIVE INTERFACE**  
> **AEGIS // OPS GRID** is an independent, non-commercial speculative design and software engineering showcase set in the fictional year **2087**. It is **not affiliated with, endorsed by, sponsored by, or representative of** the Central Intelligence Agency (CIA), Secret Intelligence Service (MI6/SIS), Research and Analysis Wing (R&AW), Government Communications Headquarters (GCHQ), National Security Agency (NSA), Institute for Intelligence and Special Operations (Mossad), Federal Intelligence Service (BND), Directorate-General for External Security (DGSE), Australian Secret Intelligence Service (ASIS), Canadian Security Intelligence Service (CSIS), or any sovereign government or intelligence authority. Historical agency profiles cite publicly available record only; all 2087 treaties, operations, agents, dossiers, intercepts, and threat indices are **entirely works of fiction**.

---

## Document Metadata

| Field | Value |
| :--- | :--- |
| **Document ID** | `AEGIS-PRD-2087-REV4` |
| **Product Name** | `AEGIS // OPS GRID` (Allied Earth Geostrategic Intelligence Directorate) |
| **Visual Language** | `OBSIDIAN PARALLAX` |
| **Status** | Approved for Implementation (Baseline v1.0) |
| **Target Release** | 2026-11-10 (In-Universe Epoch: `2087.314 // ZULU`) |
| **Architecture Mode** | Dual-Headed Web Platform (Public Directorate Front Door + Cleared Watchfloor Console) |

---

## 1. Executive Summary & Product Vision

### 1.1 Executive Summary
**AEGIS // OPS GRID** is a two-headed, production-grade speculative sci-fi web platform imagining the digital architecture of a **2087 ten-agency allied intelligence coalition** (`CIA · MI6/SIS · R&AW · GCHQ · NSA · Mossad · BND · DGSE · ASIS · CSIS`) formed under the fictional **2054 Geneva-Reykjavik Orbital & Terrestrial Intelligence Accord**.

The platform bifurcates into two cohesive experiences:
1. **THE PUBLIC DIRECTORATE (`/` · `/agencies` · `/history` · `/recruitment`)**: A classified-aesthetic civic museum, historical archive, and cryptographic aptitude recruitment front door accessible without credentials. It grounds the world in verifiable 1909–2026 public-record intelligence history before projecting forward into labeled 2087 speculative milestones.
2. **THE GATE & OPS CONSOLE (`/portal` · `/portal/dashboard` · `/portal/missions` · `/portal/dossiers` · `/portal/comms` · `/portal/vault`)**: A breach-door authentication boundary leading to a cleared-analyst watchfloor featuring a real-time SVG geostationary HUD map, threat-condition telemetry (`T5` through `T1`), interactive redaction-heavy case files and dossiers, a live-streaming synthetic intercept decoder, and a client-side AES-256-GCM encrypted field-notes vault.

### 1.2 Vision Statement
To craft an atmospheric, tactile, uncompromisingly ethical speculative intelligence terminal on the modern web—combining cinema-grade diegetic HUD interfaces (`OBSIDIAN PARALLAX`) with strict accessibility (`WCAG 2.2 AA`), zero third-party runtime leaks, and verifiable factual demarcation between real public-record history and 2087 worldbuilding.

### 1.3 Core Product Principles

1. **"Silence is a feature."**  
   Every visual element on the watchfloor earns its pixels. Negative space in deep obsidian (`#04070d`) frames high-contrast phosphor cyan (`#3ee0ff`) and tactical amber (`#ffb454`) telemetry. Motion is purposeful, deterministic, and immediately yields to `prefers-reduced-motion`.
2. **"Fiction is labeled fiction."**  
   Real-world intelligence history (1909–2026 founding dates, headquarters, statutory remits) is rigorously accurate to public record. Every speculative 2087 operation, intercept, asset callsign, and threat assessment carries explicit `[2087 SPECULATIVE FICTION]` provenance markers and top/bottom classification banners stating the unofficial fan-concept status. No operational uplift, real tradecraft, or targeting logic ever appears in the system.
3. **"No template gravity."**  
   The interface rejects generic SaaS cards, rounded pastel gradients, and stock marketing tropes. Instead, it uses 2px tactical chamfers, corner registration brackets, SVG polar radar charts, inline graticule cartography, interactive black-bar redactions, and 1 Hz Zulu (`UTC`) chronometers.
4. **"Zero external runtime requests."**  
   A true high-assurance terminal never phones home to third-party CDNs. All typography (`Orbitron`, `Rajdhani`, `Share Tech Mono`), hero artwork, sigils, and vector cartography are self-hosted inside the application bundle. Opening the browser Network panel reveals zero outbound calls beyond `self`.

---

## 2. Problem Statement & Opportunity

### 2.1 The Problem
Public-facing historical intelligence exhibits and speculative sci-fi web projects routinely fail in one of two directions:
- **Sterile Bureaucratic Brochureware**: Institutional portals often read like static walls of text with poor visual hierarchy, no interactive storytelling, and zero atmospheric immersion.
- **Unusable "Movie UI" Demos**: Conversely, sci-fi FUI (Fantasy User Interface) concepts are usually non-interactive video loops or brittle WebGL toys that fail basic keyboard navigation, screen-reader semantics, color contrast, mobile responsiveness, and network privacy.

### 2.2 The Opportunity
By uniting **Next.js App Router server-first architecture**, **bespoke inline SVG telemetry**, **Web Crypto API (`AES-256-GCM` + `PBKDF2`)**, and **strict WCAG 2.2 AA engineering**, **AEGIS // OPS GRID** proves that a deeply atmospheric, diegetic 2087 command console can simultaneously achieve:
- Sub-2.5-second Time to Interactive on mid-tier hardware;
- Full keyboard operability and reduced-motion compliance;
- Real cryptographic primitives for local field notes; and
- Unambiguous legal and factual safety.

---

## 3. Target Personas

### Persona A — "The Archivist" (Civilian Curious Visitor / Sci-Fi & History Enthusiast)
- **Profile**: Design-savvy civilian, intelligence history reader, or speculative fiction fan exploring the public portal without prior credentials.
- **Goals**:
  - Browse accurate public-record histories of the ten allied agencies alongside cohesive 2087 lore.
  - Inspect agency capability radar profiles (`HUMINT`, `SIGINT`, `FUSION`, `CYBER`, `ORBITAL`).
  - Experience the cinematic polish of the public site and discover how to unlock the demo console.
- **Anxieties / Pain Points**:
  - Confusing real historical facts with fictional 2087 lore.
  - Janky scroll hijacking, unreadable low-contrast text, or heavy 3D bundles that stall mobile browsers.
- **Primary Devices**:
  - 14" laptop (`1512×982`), high-DPI smartphone (`390×844`), tablet (`768×1024`).

### Persona B — "SIGNAL" (Prospective Recruit / Puzzle Solver)
- **Profile**: Interactive visitor drawn to the `/recruitment` pipeline who wants to test their analytical acuity against the Directorate's aptitude terminal.
- **Goals**:
  - Understand the 5-stage recruitment pipeline and clearance hierarchy (`OBSERVER` → `WATCHER` → `OPERATIVE` → `UMBRA-7 / AEGIS`).
  - Solve the 3-question cryptographic/spatial/pattern aptitude terminal with immediate diagnostic feedback.
  - Submit a fictional candidate packet and receive a verifiable tracking serial (`ARG-2087-XXXX`) persisted locally and via API.
- **Anxieties / Pain Points**:
  - Submitting personal data into an untrusted form (needs explicit notice that contact strings are fictional/encrypted and never transmitted to third parties).
  -Opaque form validation errors that break immersion.
- **Primary Devices**:
  - Desktop workstation (`1920×1080`), ultrawide monitor (`2560×1440`), mobile phone (`360×800`).

### Persona C — "UMBRA-EYES" (Cleared Watchfloor Analyst — Demo Persona)
- **Profile**: Authenticated operator entering through `/portal` ("THE GATE") using demo credentials (any codename $\ge 3$ chars + passphrase $\ge 8$ chars, e.g., `KESTREL-9` / `OBSIDIAN-2087`) to operate the watchfloor console.
- **Goals**:
  - Monitor global theatre anomalies on `/portal/dashboard` via the animated SVG Geo-HUD and Threat Condition gauge (`T5` to `T1`).
  - Filter active/standby/dark operations on `/portal/missions`, open modal case files, and selectively unredact `[REDACTED]` intelligence spans.
  - Cross-reference 8 subject/artifact dossiers on `/portal/dossiers` and monitor live synthetic intercepts on `/portal/comms`.
  - Record, decrypt, export (`.txt`), and cryptographically burn sensitive analytical notes inside `/portal/vault`.
- **Anxieties / Pain Points**:
  - Losing modal keyboard focus or being unable to dismiss overlays with `ESC`.
  - Distracting ticker/stream movement during deep reading (requires pause/resume controls and `prefers-reduced-motion` support).
  - Leaving residual session or vault artifacts after watch shift ends (requires one-click session purge and two-step vault burn).
- **Primary Devices**:
  - Dual-monitor desktop (`1920×1080` / `2560×1440`) and tactical field tablet (`768×1024`).

---

## 4. Scope Definition

### 4.1 In-Scope (10 Core Routes + Versioned REST API)

| Surface | Route | Summary |
| :--- | :--- | :--- |
| **Public Site** | `/` | Hero command masthead (self-hosted SVG/canvas art), live SITREP ticker, 10-agency preview grid, 4 doctrine pillars, locked dossier tease, recruitment CTA band. |
| **Public Site** | `/agencies` | Filterable (`ALL` / `HUMINT` / `SIGINT` / `FUSION`) directory of all 10 partner agencies with verified public-record metadata (founded year, HQ, statutory remit) + SVG capability bars & polar radar chart. |
| **Public Site** | `/history` | Interactive chronological timeline spanning `1909 → 2026` verified public record + explicitly badged `2054 → 2087` fictional capstone events. |
| **Public Site** | `/recruitment` | 5-stage intake pipeline, clearance tiers matrix, interactive 3-question aptitude terminal, validated application packet form issuing serial `ARG-2087-XXXX`. |
| **The Gate** | `/portal` | Breach-door terminal login enforcing codename ($\ge 3$ chars) and passphrase ($\ge 8$ chars), error shake choreography, mechanical blast-door unlock sequence, and demo credential helper. |
| **Ops Console** | `/portal/dashboard` | Cleared watchfloor: animated SVG Geo-HUD map with 10 agency nodes, orbital/terrestrial blips & Great-Circle arc trails, 4-card KPI strip, `T5..T1` threat gauge, top-4 active operations, and mini intercept feed. |
| **Ops Console** | `/portal/missions` | Filterable operation case files (`ALL` / `ACTIVE` / `STANDBY` / `DARK`), threat badges, focus-trapped modal reader (`ESC` + backdrop close), click-to-unredact classified tokens. |
| **Ops Console** | `/portal/dossiers` | 8 redaction-heavy intelligence dossiers with classification filters, page counts, masked `TOP SECRET // AEGIS` stamps, and interactive document reader modal. |
| **Ops Console** | `/portal/comms` | Auto-streaming synthetic SIGINT/QUANTUM intercept console (SSE endpoint with deterministic client generator fallback), `PAUSE` / `RESUME` / `CLEAR` controls, classification filter, and character-scramble decrypt reveal. |
| **Ops Console** | `/portal/vault` | Local-first `AES-256-GCM` (`PBKDF2` 310,000-iteration key derivation) encrypted field-notes vault, live ciphertext inspector, `.txt` dossier export, and two-step cryptographic burn confirmation. |
| **Recovery** | `/*` (`not-found.tsx`) | Custom 404 route: `"YOU ARE OFF THE MAP"` telemetry loss screen with coordinate diagnostic and direct recovery CTAs. |
| **API Layer** | `/api/v1/*` | Versioned Route Handlers for auth session, agencies, timeline, operations, dossiers, SSE intercept stream, recruitment applications, vault sync envelope, and health check. |

### 4.2 Explicit Out-of-Scope
- **Zero Real Classified or Sensitive Material**: No real current operations, real non-public personnel names, real SIGINT selectors, exploit payloads, evasion tradecraft, or disinformation tooling.
- **No Real Government SSO / PKI Integration**: No CAC/PIV smartcard bindings, SAML/OIDC federation to government IdPs, or biometric hardware gateways.
- **No Commercial Monetization or Payments**: No Stripe/billing flows, paid tiers, or crypto token integrations.
- **No Third-Party Map Engines or External CDNs**: No Mapbox, Google Maps, Leaflet tile servers, or Google Fonts runtime fetches.
- **No Native iOS/Android Binary Wrappers**: Delivered as a responsive web platform spanning `360px` to `2560px`.

---

## 5. Success Metrics & Quality Gates

| Metric Category | Target KPI | Verification Method |
| :--- | :--- | :--- |
| **Performance** | Lighthouse Performance Score $\ge 90$; First Load JS $\le 250\text{ KB}$ gzipped; Hero asset $\le 220\text{ KB}$ | `next build` bundle analyzer + Lighthouse audit |
| **Interactivity** | Time to Interactive (TTI) $< 2.5\text{s}$ on simulated mid-tier hardware; 60fps CSS/SVG animations | Performance trace & zero blocking external scripts |
| **Accessibility** | Lighthouse Accessibility $\ge 95$; WCAG 2.2 AA contrast $\ge 4.5:1$; 100% routes & modals keyboard-navigable | Automated ARIA validation + manual Tab/Shift+Tab/ESC sweep |
| **Network Isolation** | `0` third-party network requests at build or runtime | Browser DevTools Network waterfall & strict CSP header (`default-src 'self'`) |
| **Recruitment Flow** | 100% deterministic serial generation (`ARG-2087-XXXX`) upon completing the 3-stage aptitude terminal + form | End-to-end smoke test & API contract test |
| **Console Guard & Crypto** | 100% unauthenticated requests to `/portal/*` redirected to `/portal`; 100% vault notes encrypted with `AES-256-GCM` before touching storage | Automated Vitest suite (`tests/smoke.test.ts`) |

---

## 6. MoSCoW Prioritization Matrix

| Priority | Feature / Capability | Requirement IDs | Rationale |
| :--- | :--- | :--- | :--- |
| **MUST HAVE** | Top & bottom classified/disclaimer banner + footer on all routes | `FR-002`, `FR-015` | Non-negotiable legal & factual safety constraint. |
| **MUST HAVE** | Public landing (`/`), Agencies (`/agencies`), History (`/history`), Recruitment (`/recruitment`) | `FR-001`, `FR-004`, `FR-005`, `FR-006` | Complete public front-door experience with verified public-record facts. |
| **MUST HAVE** | SSR-safe 1 Hz Zulu (`UTC`) clock in public nav & console topbar | `FR-003` | Core diegetic anchor across every screen without React hydration mismatches. |
| **MUST HAVE** | THE GATE (`/portal`) credential validation + `/portal/*` session guard | `FR-007`, `FR-008` | Enforces boundary between public visitor surface and cleared watchfloor. |
| **MUST HAVE** | Watchfloor Dashboard (`/portal/dashboard`) with inline SVG Geo-HUD, KPIs & Threat Gauge | `FR-009` | Centerpiece visual showcase of the cleared console. |
| **MUST HAVE** | Missions (`/portal/missions`) & Dossiers (`/portal/dossiers`) with focus-trap modals & click-to-unredact | `FR-010`, `FR-011` | Core interactive storytelling mechanics. |
| **MUST HAVE** | Live Intercept Stream (`/portal/comms`) with pause/resume/clear & decrypt scramble | `FR-012` | Real-time watchfloor telemetry atmosphere with accessibility controls. |
| **MUST HAVE** | Encrypted Field-Notes Vault (`/portal/vault`) with `AES-256-GCM`, two-step burn, and `.txt` export | `FR-013` | Demonstrates genuine client-side Web Crypto engineering. |
| **MUST HAVE** | Self-contained runtime (`NFR-001`), WCAG 2.2 AA (`NFR-002`), strict TypeScript (`NFR-004`) | `NFR-001`..`NFR-007` | Production readiness and zero external dependency compliance. |
| **SHOULD HAVE** | Full `/api/v1/*` REST + SSE endpoints backing both Demo Mode and Reference Prod Mode | `API-001`..`API-011` | Allows seamless promotion from zero-DB demo to Postgres-backed deployment. |
| **SHOULD HAVE** | Interactive SVG Polar Capability Radar on `/agencies` comparison selector | `FR-004` | Elevates agency exploration beyond static progress bars. |
| **COULD HAVE** | Audio-free visual haptic feedback (CSS scanline pulse & breach door telemetry logs) | `UI-018` | Enhances immersion without intrusive autoplay sound. |
| **WON'T HAVE** | Real government SSO, external map tiles, third-party analytics trackers, real classified claims | Out-of-Scope | Violates safety, privacy, and zero-external-runtime invariants. |

---

## 7. Risks & Mitigations

| Risk ID | Category | Risk Description | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **Legal & Factual Safety** | A visitor mistakes 2087 speculative operations or recruitment forms for an official government website. | Low | Critical | Persistent top/bottom `UNOFFICIAL FAN CONCEPT` banners (`FR-002`), mandatory disclaimer footers (`FR-015`), `[2087 SPECULATIVE FICTION]` badges on all non-historical items, and explicit notices above recruitment/login inputs. |
| **RSK-02** | **Accessibility & Motion** | Scanlines, decrypt character scrambles, radar sweeps, or power-on flickers trigger vestibular discomfort or impede screen readers. | Medium | High | Honor `@media (prefers-reduced-motion: reduce)` globally to disable flickers/sweeps/scrambles instantaneously; provide manual `PAUSE` buttons on tickers and `/portal/comms`; maintain `aria-live="polite"` throttling and $\ge 4.5:1$ text contrast. |
| **RSK-03** | **Hydration Mismatch** | Live 1 Hz Zulu clock or `sessionStorage` checks cause SSR/CSR hydration warnings in Next.js 16. | Medium | Medium | Render deterministic placeholder `----.--.-- // --:--:--Z` on the server and populate live UTC timestamps strictly inside `useEffect` client islands (`FR-003`). |
| **RSK-04** | **Performance Budget** | Complex HUD graphics or fonts exceed the 220 KB hero budget or 250 KB gzip JS budget. | Low | Medium | Use hand-crafted inline SVG cartography and local `.woff2` subsets (`Orbitron`, `Rajdhani`, `Share Tech Mono`); avoid heavy 3D/WebGL or charting libraries (`NFR-003`). |
| **RSK-05** | **Cryptographic Misuse** | Storing plaintext notes in `localStorage` under the guise of an "encrypted vault". | Low | High | Implement real Web Crypto API (`crypto.subtle.deriveKey` with `PBKDF2-SHA256` at 310,000 iterations + `AES-256-GCM` with random 96-bit IV and 128-bit salt) so storage only ever holds base64 ciphertext (`FR-013`). |

---

## 8. Release Phases

### Phase 1 (`P1`) — Public Directorate Front Door
- Deliver global `OBSIDIAN PARALLAX` design tokens, self-hosted `.woff2` fonts, scanline/grain overlays, `ClassifiedBanner`, `SiteNav` with `ZuluClock`, and disclaimer footer.
- Ship `/` (Hero, SITREP ticker, 10-agency compact grid, doctrine pillars, locked dossier tease, recruitment CTA).
- Ship `/agencies` (category filters, verified public-record metadata for CIA, MI6/SIS, R&AW, GCHQ, NSA, Mossad, BND, DGSE, ASIS, CSIS, capability bars, and SVG polar radar).
- Ship `/history` (1909–2026 verified public record + 2054–2087 labeled speculative capstones).
- Ship `/recruitment` (5-stage pipeline, clearance tiers table, 3-question aptitude terminal, and application packet generator).

### Phase 2 (`P2`) — The Gate & Core Watchfloor Console
- Ship `/portal` ("THE GATE") with codename/passphrase validation, error shake, blast-door unlock sequence, and `/api/v1/auth/session` handshake.
- Ship `/portal/*` route guard redirecting unauthenticated users back to `/portal`.
- Ship `/portal/dashboard` with inline SVG Geo-HUD map (city blips + animated arc trails), 4 KPI cards, SVG `ThreatGauge` (`T5..T1`), top-4 active operations, and mini intercept feed.
- Ship `/portal/missions` and `/portal/dossiers` with status/classification filters, focus-trapped modal document readers, and interactive `<Redacted />` spans.

### Phase 3 (`P3`) — Deep Telemetry, Encrypted Vault & Hardening
- Ship `/portal/comms` live synthetic intercept stream (`/api/v1/intercepts/stream` SSE + client generator) with pause/resume/clear and `<DecryptText />` reveals.
- Ship `/portal/vault` with client-side `AES-256-GCM` encryption, passphrase key derivation, two-step burn-all confirmation, and `.txt` export.
- Ship custom 404 route (`not-found.tsx`: `"YOU ARE OFF THE MAP"`), strict security headers (`CSP`, `HSTS`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`), responsive `360px → 2560px` polish, and automated verification suite.
