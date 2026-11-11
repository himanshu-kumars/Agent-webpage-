# AEGIS // OPS GRID — 2087 Allied Intelligence Watchfloor & Public Directorate

> **UNOFFICIAL FAN CONCEPT // FICTIONAL 2087 SPECULATIVE INTERFACE**  
> **AEGIS // OPS GRID** is an independent, non-commercial speculative design and full-stack engineering showcase imagining what a **2087 ten-agency allied intelligence coalition portal** (`CIA · MI6/SIS · R&AW · GCHQ · NSA · Mossad · BND · DGSE · ASIS · CSIS`) would look like.  
> **Not affiliated with, endorsed by, sponsored by, or representative of any government or intelligence agency.** All real-world agency founding years, headquarters, and statutory remits are sourced strictly from public record; all 2087 treaties, operations, agents, dossiers, intercepts, and threat assessments are **100% fiction**.

---

## 1. Overview & Visual Language (`OBSIDIAN PARALLAX`)

**AEGIS // OPS GRID** is a dual-surface web application built with **Next.js 16 (App Router, RSC)**, **React 19**, **strict TypeScript**, **Tailwind CSS v4 + bespoke CSS custom properties**, **inline SVG geostationary cartography**, and the **Web Crypto API (`AES-256-GCM`)**:

1. **Public Directorate Surface (`/`, `/agencies`, `/history`, `/recruitment`)**:
   - A classified-aesthetic museum, agency capability comparator, chronological history archive (`1909–2026 [PUBLIC RECORD]` + `2054–2087 [2087 SPECULATIVE FICTION]`), and interactive 3-puzzle cryptographic recruitment terminal issuing verifiable candidate serials (`ARG-2087-XXXX`).
2. **The Gate & Cleared Watchfloor Console (`/portal`, `/portal/dashboard`, `/portal/missions`, `/portal/dossiers`, `/portal/comms`, `/portal/vault`)**:
   - A breach-door authentication boundary unlocking an animated SVG geostationary watchfloor map (`<GeoHud />`), radial threat condition gauge (`T5..T1`), focus-trapped operation & dossier readers with click-to-unredact (`<Redacted />`) intelligence tokens, a live SSE synthetic intercept decoder (`<DecryptText />`), and a local-first `AES-256-GCM` (`PBKDF2-SHA256`, `310,000` iterations) encrypted field-notes vault.
3. **Zero External Runtime Dependencies (`NFR-001`)**:
   - All fonts (`Orbitron`, `Rajdhani`, `Share Tech Mono`), hero artwork (`/images/hero-grid.svg`), sigils, and vector maps are self-hosted inside the repository. The browser makes **zero outbound requests to third-party CDNs**.

---

## 2. Quickstart

### Prerequisites
- **Node.js**: `>= 20.0.0` (tested on `v22.x`)
- **npm**: `>= 10.0.0`

### Installation & Local Development
```bash
# 1. Install dependencies
npm install

# 2. (Optional) Copy environment template — defaults to zero-infrastructure DEMO mode
cp .env.example .env.local

# 3. Start development server on http://0.0.0.0:3000
npm run dev
```

### Production Build & Verification
```bash
# Run strict TypeScript check, Vitest smoke suite, and production build
npm run typecheck
npm run test
npm run build

# Start production server
npm run start
```

### Demo Watchfloor Credentials (`/portal`)
In default `DEMO` mode, **THE GATE** (`/portal`) accepts any codename with **$\ge 3$ characters** and passphrase with **$\ge 8$ characters**, or you can click the **"LOAD DEMO CREDENTIALS"** button on `/portal`:
- **Demo Codename**: `KESTREL-9`
- **Demo Passphrase**: `OBSIDIAN-2087`

---

## 3. NPM Scripts Reference

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `next dev --hostname 0.0.0.0 --port 3000` | Starts the Next.js development server bound to `0.0.0.0:3000`. |
| `npm run build` | `next build` | Compiles an optimized production build and verifies route types. |
| `npm run start` | `next start --hostname 0.0.0.0 --port 3000` | Serves the compiled production build. |
| `npm run typecheck` | `tsc --noEmit` | Runs strict TypeScript compiler checks across `src/` and `tests/`. |
| `npm run lint` | `tsc --noEmit` | Verifies static code & type hygiene across the workspace. |
| `npm run test` | `vitest run` | Executes the automated smoke test suite (`tests/smoke.test.ts`). |

---

## 4. Environment Variables (`DEMO` vs `PRODUCTION REFERENCE`)

Copy `.env.example` to `.env.local` to customize runtime behavior:

| Variable | Mode | Default Value | Purpose |
| :--- | :---: | :--- | :--- |
| `AEGIS_MODE` | `DEMO` / `PROD` | `demo` | Selects zero-DB deterministic memory store (`demo`) or Postgres/Redis (`production`). |
| `AEGIS_SESSION_SECRET` | `DEMO` / `PROD` | `demo-fallback-32-byte-umbra-secret-2087` | HMAC key for signing watchfloor session tokens. |
| `AEGIS_SESSION_TTL_SECONDS` | `DEMO` / `PROD` | `28800` | Watchfloor session time-to-live (8 hours). |
| `NEXT_PUBLIC_AEGIS_BUILD_ID` | `DEMO` / `PROD` | `AEGIS-2087.314-OMEGA` | Build telemetry identifier surfaced in UI & `/api/v1/health`. |
| `DATABASE_URL` | `PROD` only | *(unset in demo)* | PostgreSQL 15+ connection string for Drizzle ORM (`DATABASE.md`). |
| `REDIS_URL` | `PROD` only | *(unset in demo)* | Redis 7+ connection string for distributed rate limits & SSE. |
| `AEGIS_CONTACT_ENC_KEY` | `PROD` only | *(unset in demo)* | 32-byte key for encrypting candidate contact handles at rest. |

---

## 5. Architecture & Route Map

### 5.1 Application Routes (10 Core Routes + Custom 404)

| Surface | Route | Auth | Key Capabilities |
| :--- | :--- | :---: | :--- |
| **Public** | `/` | None | Command masthead, self-hosted hero SVG, pausable SITREP ticker, 10-agency compact grid, 4 doctrine pillars, locked dossier tease, recruitment CTA. |
| **Public** | `/agencies` | None | Filterable (`ALL` / `HUMINT` / `SIGINT` / `FUSION`) directory of 10 allied agencies with verified public-record facts, capability bars, and SVG polar radar. |
| **Public** | `/history` | None | Chronological `1909–2026` public-record timeline + explicitly badged `2054–2087` fictional capstones. |
| **Public** | `/recruitment` | None | 5-stage pipeline, clearance tiers table, 3-question cryptographic aptitude terminal, and application form issuing serial `ARG-2087-XXXX`. |
| **Boundary** | `/portal` | None | **THE GATE**: Codename ($\ge 3$) & passphrase ($\ge 8$) validation, error shake, demo credential loader, and blast-door unlock sequence. |
| **Console** | `/portal/dashboard` | `UMBRA-7` | Watchfloor KPI strip, interactive inline SVG `<GeoHud />` world map (10 HQ blips + 4 theatre nodes + arc trails), `<ThreatGauge />` (`T5..T1`), top-4 active ops, mini intercept feed. |
| **Console** | `/portal/missions` | `UMBRA-7` | Filterable case files (`ALL` / `ACTIVE` / `STANDBY` / `DARK`), focus-trapped `<Modal />` reader, click-to-unredact `<Redacted />` spans. |
| **Console** | `/portal/dossiers` | `UMBRA-7` | 8 redaction-heavy intelligence dossiers, `<Stamp />` badges, and multi-section modal document reader. |
| **Console** | `/portal/comms` | `UMBRA-7` | Auto-streaming synthetic intercepts (`/api/v1/intercepts/stream` SSE + `LOCAL FALLBACK` generator), `PAUSE` / `RESUME` / `CLEAR BUFFER` / `FLASH ONLY` controls, `<DecryptText />` reveals. |
| **Console** | `/portal/vault` | `UMBRA-7` | Local-only `AES-256-GCM` (`PBKDF2` 310k iterations) encrypted field-notes vault, live ciphertext inspector, `.txt` export, two-step cryptographic burn. |
| **Fallback** | `/*` (`not-found.tsx`) | None | `"YOU ARE OFF THE MAP"` telemetry loss screen with recovery navigation. |

### 5.2 Specification Suite Index
1. [`PRD.md`](./PRD.md) — Executive summary, vision, personas, scope, metrics, MoSCoW, risks, release phases.
2. [`REQUIREMENTS.md`](./REQUIREMENTS.md) — Traceable `FR-001`..`FR-015` and `NFR-001`..`NFR-007` with RTM.
3. [`USER_FLOWS.md`](./USER_FLOWS.md) — Mermaid flowcharts and state machines for Civilian, Recruit, and Cleared Analyst personas.
4. [`UIUX.md`](./UIUX.md) — IA tree, `OBSIDIAN PARALLAX` tokens, 21-component catalog, per-page specs, copy bank.
5. [`TECH_STACK.md`](./TECH_STACK.md) — Stack decision record, rejected alternatives, `DEMO` vs `PROD` topologies.
6. [`API.md`](./API.md) — Versioned `/api/v1/*` REST & SSE contracts, schemas, error envelopes, example payloads.
7. [`DATABASE.md`](./DATABASE.md) — PostgreSQL 15+ schema, Mermaid ERD, indexes, RLS policies, seed plan.
8. [`SECURITY.md`](./SECURITY.md) — Threat model, CSP/HSTS headers, Web Crypto `AES-256-GCM` vault spec, OWASP Top 10 mapping.
9. [`IMPLEMENTATION.md`](./IMPLEMENTATION.md) — Phased breakdown (`P0`–`P3`), file-tree ownership map, Definition of Done.
10. [`AGENT.md`](./AGENT.md) — Repository constitution and invariant checklist for AI coding agents.

---

## 6. Security & Accessibility Summary

- **Zero External Runtime Requests (`NFR-001`)**: Enforced by self-hosted `.woff2` fonts, inline SVG cartography, and `Content-Security-Policy: default-src 'self'`.
- **Authenticated Encryption at Rest (`FR-013`)**: `/portal/vault` derives a 256-bit key in browser RAM via `PBKDF2-SHA256` (`310,000` iterations, 128-bit random salt) and encrypts each note with `AES-256-GCM` (fresh 96-bit random IV). Plaintext is never written to `localStorage`.
- **Accessibility (`WCAG 2.2 AA`, `NFR-002`)**: High-contrast obsidian/cyan/titanium palette ($\ge 4.5:1$), full keyboard navigation, focus-trapped modals (`ESC` + backdrop close), pausable streams, and automatic `@media (prefers-reduced-motion: reduce)` compliance.

---

## 7. Mandatory Legal Disclaimer & License

### Legal & Factual Safety Disclaimer
> **UNOFFICIAL FAN CONCEPT — NO GOVERNMENT ENDORSEMENT OR AFFILIATION**  
> **AEGIS // OPS GRID** is a work of speculative design and creative software engineering set in the fictional year **2087**. It is **not affiliated with, endorsed by, authorized by, or connected to** the Central Intelligence Agency (CIA), Secret Intelligence Service (MI6/SIS), Research and Analysis Wing (R&AW), Government Communications Headquarters (GCHQ), National Security Agency (NSA), Mossad, Federal Intelligence Service (BND), Directorate-General for External Security (DGSE), Australian Secret Intelligence Service (ASIS), Canadian Security Intelligence Service (CSIS), or any sovereign government.  
> Historical agency metadata (founding years, headquarters cities, and public statutory remits) are compiled strictly from publicly available open records. Every operation, case file, agent callsign, dossier, intercept stream, threat gauge reading, and recruitment serial (`ARG-2087-XXXX`) in this repository is **entirely fictional**.

### License
Released under the **MIT License**. Free for educational, portfolio, and speculative UI research use, subject to preserving the unofficial fan-concept disclaimer above (`FR-015`).
