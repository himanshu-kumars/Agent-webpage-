# AEGIS // OPS GRID — UI/UX Architecture & Design System (`UIUX.md`)

> **UNOFFICIAL FAN CONCEPT // FICTIONAL 2087 SPECULATIVE INTERFACE**  
> This document specifies the Information Architecture, the **OBSIDIAN PARALLAX** visual design system, the 21-component catalog, per-page wireframes-in-words, in-world copy bank, and accessibility/motion governance for **AEGIS // OPS GRID**.

---

## 1. Information Architecture (IA) & Navigation Model

### 1.1 Route Hierarchy Tree

```text
AEGIS // OPS GRID (RootLayout: ClassifiedBanner[top] + PowerOn + Route Content + ClassifiedBanner[bottom])
├── PUBLIC DIRECTORATE SURFACE (SiteNav + Main + SiteFooter)
│   ├── /                        [Command Masthead, SITREP Ticker, 10-Agency Grid, Doctrine, Dossier Tease, Recruit CTA]
│   ├── /agencies                [Filterable 10-Agency Directory: ALL / HUMINT / SIGINT / FUSION + SVG Capability Radar]
│   ├── /history                 [Chronological Archive: 1909–2026 Verified Public Record + 2054–2087 Fictional Capstones]
│   └── /recruitment             [5-Stage Pipeline, Clearance Matrix, 3-Puzzle Aptitude Terminal, Application Form]
│
├── BREACH BOUNDARY
│   └── /portal                  [THE GATE: Codename/Passphrase Terminal, Blast-Door Unlock, Demo Credential Loader]
│
├── CLEARED WATCHFLOOR CONSOLE (ConsoleShell Guard + 5-Item Sidebar + Zulu/Threat Topbar)
│   ├── /portal/dashboard        [Watchfloor Overview: KPI Strip, SVG GeoHud Map, ThreatGauge T5..T1, Top-4 Ops, Mini Comms]
│   ├── /portal/missions         [Case Files: ALL / ACTIVE / STANDBY / DARK Filter, Focus-Trap Modal Reader, <Redacted />]
│   ├── /portal/dossiers         [Subject & Artifact Dossiers: 8 Classified Files, <Stamp />, Document Reader Modal]
│   ├── /portal/comms            [Live SIGINT/Quantum Stream: Auto-Streaming Intercepts, Pause/Resume/Clear, <DecryptText />]
│   └── /portal/vault            [Encrypted Field-Notes Vault: Web Crypto AES-256-GCM, Ciphertext Inspector, Burn, Export .txt]
│
└── TELEMETRY LOSS FALLBACK
    └── /* (not-found.tsx)       ["YOU ARE OFF THE MAP" Dead-Reckoning 404 Screen + Recovery Vectors]
```

### 1.2 Dual Navigation Model
1. **Public Directorate Navbar (`<SiteNav />`)**:
   - **Left**: SVG `<Sigil />` + Brand Lockup (`AEGIS // OPS GRID` · `EST. 2054 GENEVA-REYKJAVIK ACCORD`).
   - **Center (4 Primary Links)**:
     1. `01 // OVERVIEW` (`/`)
     2. `02 // AGENCIES` (`/agencies`)
     3. `03 // HISTORY` (`/history`)
     4. `04 // RECRUITMENT` (`/recruitment`)
   - **Right**: Live 1 Hz `<ZuluClock />` + Primary Amber/Cyan CTA Button `THE GATE // PORTAL` (`/portal`).
2. **Cleared Console Navigation (`<ConsoleShell />`)**:
   - **Desktop (`>= 1024px`)**: Fixed 260px left tactical sidebar with operator badge (`CODENAME`, `CLEARANCE: UMBRA-7`), 5 navigation modules:
     1. `WATCHFLOOR` (`/portal/dashboard`)
     2. `MISSIONS` (`/portal/missions`)
     3. `DOSSIERS` (`/portal/dossiers`)
     4. `COMMS STREAM` (`/portal/comms`)
     5. `FIELD VAULT` (`/portal/vault`)
     Plus bottom actions: `PUBLIC ARCHIVE` (`/`) and crimson `PURGE SESSION` button.
   - **Tablet & Mobile (`< 1024px`, including `768px` and `360px`)**: Sidebar transforms into a sticky horizontal top command strip with scrollable module pills and a compact topbar housing the `ZuluClock`, active `THREAT CONDITION` badge, and `PURGE` control (`NFR-007`).

---

## 2. Design System: "OBSIDIAN PARALLAX"

### 2.1 Color Tokens (`src/styles/globals.css`)

| CSS Custom Property | Hex / Value | Semantic Role | Contrast vs `--bg` (`#04070d`) |
| :--- | :--- | :--- | :--- |
| `--bg` | `#04070d` | Deep obsidian primary canvas background | `1.0:1` (Base) |
| `--bg-elevated` | `#070d18` | Secondary recessed watchfloor well | `1.12:1` |
| `--panel` | `#0a1322` | Tactical HUD panel fill | `1.32:1` |
| `--panel-hi` | `#101f36` | Hover / active card surface | `1.65:1` |
| `--border` | `rgba(62, 224, 255, 0.22)` | Hairline structural grid border | Hairline decorative |
| `--border-hi` | `rgba(62, 224, 255, 0.58)` | Active/focused panel border | `8.4:1` |
| `--cy` | `#3ee0ff` | Primary phosphor cyan HUD accent & interactive highlights | `12.6:1` (AAA) |
| `--amber` | `#ffb454` | Tactical warning / clearance / gate accent | `10.8:1` (AAA) |
| `--red` | `#ff3b4e` | Critical threat (`T1`), top-secret stamp, burn confirmation | `5.9:1` (AA) |
| `--grn` | `#39ff9d` | Verified public record, active uplink, decrypted success | `14.1:1` (AAA) |
| `--text` | `#e6f1ff` | Primary high-legibility titanium-white body copy | `16.8:1` (AAA) |
| `--text-mut` | `#8da4c4` | Secondary telemetry labels & metadata (WCAG AA compliant) | `6.7:1` (AA) |
| `--text-dim` | `#5d7494` | Non-essential coordinate grid ticks | `3.8:1` (Large/Decorative) |

### 2.2 Typography Scale (100% Self-Hosted `.woff2`)

All fonts are loaded locally from `/fonts/*.woff2` via `@font-face` declarations with `font-display: swap`:
- **`--font-display`: `'Orbitron'`** (`public/fonts/Orbitron-Variable.woff2`) — Geometric tactical display header font; uppercase, letter-spacing `0.08em` to `0.16em`.
- **`--font-sans`: `'Rajdhani'`** (`public/fonts/Rajdhani-Regular.woff2`, `Medium`, `SemiBold`, `Bold`) — High-density squared technical sans-serif for narrative briefings, dossier prose, and UI controls.
- **`--font-mono`: `'Share Tech Mono'`** (`public/fonts/ShareTechMono-Regular.woff2`) — Monospaced telemetry font for Zulu timestamps, coordinates, serials, redaction masks, and ciphertext.

| Token | Size (`clamp`) | Line Height | Font Family | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `type-hero` | `clamp(2.1rem, 4.5vw, 3.75rem)` | `1.08` | `Orbitron` (700) | Landing & Gate primary mastheads |
| `type-h1` | `clamp(1.65rem, 3vw, 2.5rem)` | `1.15` | `Orbitron` (700) | Page titles (`/agencies`, `/portal/dashboard`) |
| `type-h2` | `clamp(1.25rem, 2vw, 1.65rem)` | `1.2` | `Orbitron` (600) | Section headers & modal titles |
| `type-h3` | `1.125rem` (`18px`) | `1.3` | `Rajdhani` (700) | Card titles, agency names, operation codenames |
| `type-body` | `1.03rem` (`16.5px`) | `1.6` | `Rajdhani` (500) | Primary narrative copy, remits, dossier bodies |
| `type-mono` | `0.8125rem` (`13px`) | `1.5` | `Share Tech Mono` | Coordinates, Zulu clock, serials, intercepts |
| `type-micro` | `0.72rem` (`11.5px`) | `1.35` | `Share Tech Mono` | Corner tags, classification stamps, axis labels |

### 2.3 Spacing, Radii, Shadows & Atmospheric Layers
- **Radii**: Strictly sharp tactical edges (`--radius: 2px`). Never use pill-rounded cards (`border-radius: 16px` is forbidden).
- **Spacing Scale**: `4px` base grid (`0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`).
- **Shadows & Glows**:
  - `--glow-cy`: `0 0 24px rgba(62, 224, 255, 0.14), inset 0 0 1px rgba(62, 224, 255, 0.35)`
  - `--glow-amber`: `0 0 24px rgba(255, 180, 84, 0.16), inset 0 0 1px rgba(255, 180, 84, 0.4)`
  - `--glow-red`: `0 0 28px rgba(255, 59, 78, 0.22)`
- **Atmospheric Overlays**:
  - **Scanlines**: Fixed `pointer-events: none` CSS repeating linear gradient (`2px` pitch at `3%` opacity).
  - **Film Grain**: Subtle inline SVG fractalNoise data-URI overlay (`opacity: 0.035`).
- **Motion Curves & Durations**:
  - Primary curve: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`
  - Fast micro-interaction: `160ms`
  - Panel/Modal transition: `280ms`
  - Gate blast-door breach: `650ms`
- **Focus Ring Specification**:
  - `:focus-visible { outline: 2px solid var(--cy); outline-offset: 2px; box-shadow: 0 0 0 4px rgba(62, 224, 255, 0.2); }`

---

## 3. Component Catalog (19 Core Components in `src/components/`)

| # | Component | File Path | Responsibility & Accessibility Contract |
| :--- | :--- | :--- | :--- |
| 01 | `ClassifiedBanner` | `src/components/ClassifiedBanner.tsx` | Top/bottom sticky classification bar (`public` cyan vs `console` amber/red) carrying explicit unofficial fan-concept disclaimer (`FR-002`). |
| 02 | `ZuluClock` | `src/components/ZuluClock.tsx` | SSR-safe client island rendering real-time 1 Hz UTC clock + 2087 epoch indicator (`FR-003`). |
| 03 | `SiteNav` | `src/components/SiteNav.tsx` | Public header with `<Sigil />`, 4 route links with active indicators, `<ZuluClock />`, mobile drawer toggle, and `THE GATE` CTA. |
| 04 | `Sigil` | `src/components/Sigil.tsx` | Intricate inline SVG orbital-astrolabe & ten-pointed star crest representing the 10 allied agencies; reusable at `24px`–`160px`. |
| 05 | `HudPanel` | `src/components/HudPanel.tsx` | Framed obsidian container (`#0a1322`) with optional header bar, status LED, telemetry code, and integrated `<CornerBrackets />`. |
| 06 | `CornerBrackets` | `src/components/CornerBrackets.tsx` | 4 L-shaped SVG/CSS corner registration marks (`8px × 8px`) in `--cy`, `--amber`, or `--red`. |
| 07 | `ThreatGauge` | `src/components/ThreatGauge.tsx` | Interactive SVG semicircular arc gauge (`T5 NOMINAL` → `T1 CRITICAL`) with animated needle, tick marks, and posture descriptor (`FR-009`). |
| 08 | `GeoHud` | `src/components/GeoHud.tsx` | Self-contained SVG world graticule map with continental vector contours, 10 allied HQ blips, 4 active theatre nodes, animated Great-Circle bezier arc trails, and clickable node inspector (`FR-009`). |
| 09 | `RadarCard` | `src/components/RadarCard.tsx` | Agency profile card featuring verified public-record facts, 4 linear capability bars, and a 5-axis SVG polar radar polygon (`HUMINT`, `SIGINT`, `CYBER`, `ORBITAL`, `FUSION`) (`FR-004`). |
| 10 | `DecryptText` | `src/components/DecryptText.tsx` | IntersectionObserver-triggered character-scramble reveal (`01#$%&*+<>` → target text). Instant render when `prefers-reduced-motion: reduce` is active. |
| 11 | `Redacted` | `src/components/Redacted.tsx` | Interactive `<button>` span masking sensitive tokens (`█████`) that unredacts to cyan phosphor on click/`Enter`/`Space` with `aria-pressed` semantics (`FR-010`, `FR-011`). |
| 12 | `Ticker` | `src/components/Ticker.tsx` | Horizontal SITREP telemetry tape with keyboard-accessible `PAUSE` / `RESUME` button (`FR-001`). |
| 13 | `Stamp` | `src/components/Stamp.tsx` | Distressed stencil classification badge (`TOP SECRET // UMBRA-7`, `ORCON`, `PUBLIC RECORD`, `2087 SPECULATIVE FICTION`). |
| 14 | `Modal` | `src/components/Modal.tsx` | Accessible dialog (`role="dialog"`, `aria-modal="true"`) with Tab/Shift+Tab focus trap, `ESC` key listener, backdrop click dismissal, and focus restoration (`FR-010`, `FR-011`). |
| 15 | `Toast` | `src/components/Toast.tsx` | Non-blocking bottom-right tactical notification banner (`role="status"`, `aria-live="polite"`) for serial receipts, vault encryption, and session events. |
| 16 | `VaultNote` | `src/components/VaultNote.tsx` | Card displaying a decrypted field note alongside a collapsible raw `AES-256-GCM` ciphertext/IV/salt verification panel and single-note delete button (`FR-013`). |
| 17 | `EmptyState` | `src/components/EmptyState.tsx` | Radar-sweep zero-results panel with reset filter CTA when search/filter combinations return empty. |
| 18 | `NotFound` | `src/components/NotFound.tsx` | Reusable `"YOU ARE OFF THE MAP"` dead-reckoning telemetry loss view (`FR-014`). |
| 19 | `PowerOn` | `src/components/PowerOn.tsx` | Subtle CRT scanline stabilization wrapper on route entry (`220ms`), automatically bypassed when `prefers-reduced-motion: reduce` is enabled. |

---

## 4. Per-Page Wireframes-in-Words

### 4.1 Public Home (`/`)
- **Layout**: Full-bleed masthead hero (`2-column` asymmetric split on desktop: 7 cols copy/CTAs, 5 cols interactive orbital SVG schematic `/images/hero-grid.svg`), followed by full-width `<Ticker />`, 10-agency compact grid (`5×2` desktop, `2×5` tablet, `1×10` mobile), 4-column Doctrine matrix, 2-column Locked Dossier Tease, and full-width Recruitment intake band.
- **Hero Copy Direction**:
  - Eyebrow: `DIRECTIVE 2087-OMEGA // GENEVA-REYKJAVIK CONCORDAT`
  - Headline: `TEN SOVEREIGN AGENCIES. ONE ORBITAL WATCHFLOOR.`
  - Subhead: `An unofficial speculative interface imagining the 2087 Allied Geostrategic Intelligence Grid—grounded in 1909–2026 public record, projected into deep-future orbital telemetry.`

### 4.2 Allied Agencies Directory (`/agencies`)
- **Layout**: Header with classification summary + interactive filter bar (`ALL [10]`, `HUMINT [5]`, `SIGINT [2]`, `FUSION [3]`) + interactive **Coalition Capability Comparator** (select any agency to inspect its high-resolution SVG polar radar) + responsive 2-column grid of `<RadarCard />` modules.
- **Mobile Behavior**: Filter pills wrap cleanly; radar comparator stacks above the card list.

### 4.3 Chronological History (`/history`)
- **Layout**: Epoch filter bar (`ALL EPOCHS`, `VERIFIED PUBLIC RECORD 1909–2026`, `2087 SPECULATIVE CAPSTONES`) + central vertical laser-spine timeline with alternating left/right event nodes on desktop and single-column left-rail timeline on mobile.
- **Key Modules**: Every historical entry displays year, agency tag, verified historical summary, and a green `[PUBLIC RECORD]` stamp; 2054–2087 entries display an amber `[2087 SPECULATIVE FICTION]` stamp.

### 4.4 Recruitment & Aptitude Terminal (`/recruitment`)
- **Layout**:
  1. **5-Stage Pipeline Strip**: Horizontal 5-step chevron grid.
  2. **Clearance Tiers Table**: Responsive tactical table detailing `OBSERVER`, `WATCHER`, `OPERATIVE`, and `UMBRA-7 / AEGIS`.
  3. **Split Terminal Grid (`7 cols` Aptitude Terminal + `5 cols` Candidate Packet Form)**:
     - Left: Interactive 3-question puzzle console with progress indicator (`PUZZLE 01/03`), option selectors, diagnostic readout, and score tally.
     - Right: Validated intake form issuing serial `ARG-2087-XXXX` with instant copy-to-clipboard and local persistence.

### 4.5 THE GATE (`/portal`)
- **Layout**: Centered airlock terminal (`max-w-xl`) flanked by vertical hydraulic door-frame SVG rails that animate outward upon successful authentication.
- **Key Modules**:
  - Security warning header (`RESTRICTED WATCHFLOOR ACCESS // DEMO GATE`).
  - Inputs for `OPERATIVE CODENAME` ($\ge 3$ chars) and `CRYPTO PASSPHRASE` ($\ge 8$ chars).
  - One-click **LOAD DEMO CREDENTIALS (`KESTREL-9` / `OBSIDIAN-2087`)** helper button.
  - Live validation telemetry log + disclaimer footer.

### 4.6 Watchfloor Dashboard (`/portal/dashboard`)
- **Layout**: Inside `<ConsoleShell />`:
  - **Row 1**: 4-column KPI strip (`ACTIVE OPS`, `FIELD ASSETS`, `24H INTERCEPTS`, `THREAT CONDITION`).
  - **Row 2**: `8-col` interactive `<GeoHud />` world map (with clickable HQ & anomaly nodes + detail bar) paired with `4-col` `<ThreatGauge />` (`T5..T1` selector + protocol directive list).
  - **Row 3**: `7-col` Top-4 Active Operations table/cards + `5-col` Mini Live Intercept Feed.

### 4.7 Missions Console (`/portal/missions`)
- **Layout**: Status filter tabs (`ALL`, `ACTIVE`, `STANDBY`, `DARK`) + theatre filter dropdown + 2-column grid of operation case-file cards.
- **Modal Reader**: Clicking any card launches `<Modal />` with operation header, `<Stamp />`, asset callsign roster, and briefing body populated with interactive `<Redacted />` spans + `DECLASSIFY ALL SPANS` toggle.

### 4.8 Dossiers Archive (`/portal/dossiers`)
- **Layout**: Classification filter (`ALL`, `UMBRA-7`, `ORCON`, `EYES ONLY`) + search input + 8 dossier cards styled like metallic microfiche jackets with redaction-density meters.
- **Modal Reader**: Multi-tabbed document reader with `<Stamp />`, subject metadata table, and click-to-unredact narrative paragraphs.

### 4.9 Live Comms Intercepts (`/portal/comms`)
- **Layout**: Top telemetry control deck (`STREAM STATUS: LIVE/PAUSED`, `PAUSE / RESUME`, `INJECT BURST`, `CLEAR`, classification filter) + live signal waveform SVG bar + scrolling terminal log where each intercept reveals via `<DecryptText />`.

### 4.10 Encrypted Field-Notes Vault (`/portal/vault`)
- **Layout**:
  - **Top Cryptography Banner**: Shows active algorithm (`AES-256-GCM // PBKDF2-SHA256 310,000 ITERATIONS // 96-BIT IV // ZERO PLAINTEXT AT REST`), vault passphrase input, `EXPORT .TXT`, and two-step `BURN ALL` button.
  - **Main Split**: `5-col` New Encrypted Note composer + `7-col` stored `<VaultNote />` list with collapsible live Base64 ciphertext inspector.

---

## 5. In-World Copy Bank & Mandatory Disclaimers

### 5.1 Terse Watchfloor Microcopy
- **System Ready**: `UPLINK LOCKED // ORBITAL RELAY NOMINAL // ZERO EXTERNAL TELEMETRY`
- **Redaction Tooltip**: `[CLASSIFIED TOKEN — CLICK OR PRESS ENTER TO DECLASSIFY]`
- **Gate Failure**: `ACCESS DENIED // CREDENTIAL SHAPE VIOLATION (MIN 3-CHAR CODENAME, 8-CHAR PASSPHRASE)`
- **Vault Crypto Proof**: `STORAGE VERIFICATION: PLAINTEXT NEVER WRITTEN TO DISK. INSPECT RAW AES-256-GCM CIPHERTEXT BELOW.`
- **404 Headline**: `404 // YOU ARE OFF THE MAP — DEAD RECKONING FAILED AT SECTOR NULL`

### 5.2 Mandatory Legal Disclaimer Block (Rendered on All Pages)
> **UNOFFICIAL FAN CONCEPT — NO GOVERNMENT AFFILIATION**: *AEGIS // OPS GRID is a speculative fiction and web-engineering showcase set in 2087. It is not affiliated with, endorsed by, or connected to the CIA, MI6/SIS, R&AW, GCHQ, NSA, Mossad, BND, DGSE, ASIS, CSIS, or any government entity. Historical agency dates and headquarters reflect publicly available records; all 2087 operations, dossiers, intercepts, and recruitment serials are fictional.*

---

## 6. Accessibility, Motion & Iconography Spec

- **Reduced Motion (`@media (prefers-reduced-motion: reduce)`)**:
  - `<PowerOn />` skips opacity flicker.
  - `<DecryptText />` renders final plaintext immediately on mount.
  - `<GeoHud />` disables infinite SVG stroke-dashoffset loops while retaining full node click interactivity.
  - `<Ticker />` defaults to static/paused layout.
- **Favicon & App Icon (`src/app/icon.svg`)**:
  - Self-contained SVG rendering the `<Sigil />` ten-point orbital compass in `#3ee0ff` over `#04070d` obsidian octagon.
