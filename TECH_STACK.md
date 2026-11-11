# AEGIS // OPS GRID — Architecture & Technology Stack Decision Record (`TECH_STACK.md`)

> **UNOFFICIAL FAN CONCEPT // FICTIONAL 2087 SPECULATIVE INTERFACE**  
> This Architecture Decision Record (ADR) documents the chosen technology stack, rejected alternatives, dual deployment topologies (`DEMO` vs `PRODUCTION REFERENCE`), and environment variable contract for **AEGIS // OPS GRID**.

---

## 1. Chosen Core Stack Summary

| Layer | Selected Technology | Version / Standard | Architectural Justification |
| :--- | :--- | :--- | :--- |
| **Runtime** | **Node.js LTS** | `>= 20.x` (`v22.x` in sandbox) | Native Web Crypto API support, fast startup, first-class Next.js 16 compatibility. |
| **Framework** | **Next.js (App Router, RSC)** | `16.x` | Server Components by default (`NFR-006`), colocated Route Handlers (`/api/v1/*`), zero-JS static/server shells for public pages, built-in response header hardening. |
| **UI Library** | **React** | `19.x` | Concurrent rendering, clean Server/Client component boundaries, zero-overhead SVG hydration. |
| **Language** | **TypeScript** | `5.x` (`strict: true`) | Compile-time guarantees across data models, API contracts, and cryptographic envelopes (`NFR-004`). |
| **Styling** | **Tailwind CSS v4 + Vanilla CSS Tokens** | `4.x` + `src/styles/globals.css` | CSS-first `@theme` variables, deterministic custom properties (`--bg`, `--cy`, `--amber`), scanline/grain layers, and `@media (prefers-reduced-motion: reduce)` governance. |
| **Typography** | **Self-Hosted `.woff2` Fonts** | `Orbitron`, `Rajdhani`, `Share Tech Mono` | Served directly from `public/fonts/*.woff2`. Eliminates Google Fonts DNS/TLS lookups and satisfies `NFR-001` (zero external runtime requests). |
| **Cartography & Telemetry** | **Inline Bespoke SVG (`<GeoHud />`, `<ThreatGauge />`, `<RadarCard />`)** | Native SVG 2 | Zero third-party tile fetches, sub-15 KB vector footprint, full keyboard/DOM accessibility, crisp scaling up to `2560px` (`NFR-003`). |
| **Client Cryptography** | **Web Crypto API (`window.crypto.subtle`)** | W3C Standard (`AES-256-GCM` + `PBKDF2-SHA256`) | Native hardware-accelerated browser cryptography with zero external crypto bundle bloat (`FR-013`). |
| **Validation & Contracts** | **Zod** | `3.x` | Runtime request validation across all `/api/v1/*` Route Handlers and form submissions. |
| **ORM & Database (Prod Mode)** | **PostgreSQL 15+ & Drizzle ORM** | `drizzle-orm` (Schema Reference) | Type-safe SQL schema (`src/lib/db/schema.ts`), zero-overhead query generation, first-class migration workflow (`DATABASE.md`). |
| **Session Signing (Prod Mode)** | **Web-Standard HMAC / `jose` JWT** | Web Crypto HMAC-SHA256 / `jose` | Edge- and Node-compatible signed session tokens for stateless/stateful verification. |
| **Testing** | **Vitest** | `3.x` | Fast TypeScript-native unit & smoke test runner verifying routes, guard logic, API envelopes, and AES-GCM round-trip encryption (`tests/smoke.test.ts`). |

---

## 2. Rejected Alternatives & Trade-Off Analysis

| Candidate Technology | Category | Reason for Rejection |
| :--- | :--- | :--- |
| **Vite SPA (Client-Only React)** | Framework | Ships a monolithic client JS bundle for public marketing/archive pages, lacks native Server Components (`NFR-006`), and requires a separate backend process for `/api/v1/*` endpoints and HTTP security headers. |
| **Create React App (CRA)** | Framework | Deprecated, unmaintained, slow Webpack pipeline, no SSR/RSC, and fails modern performance and security header standards. |
| **Mapbox GL JS / Leaflet / Google Maps** | Cartography | Violates `NFR-001` (requires outbound tile/API requests) and `NFR-003` (Mapbox GL adds `> 220 KB` gzipped JS alone, exhausting the entire first-load budget). Inline SVG `<GeoHud />` costs `< 12 KB` and works 100% offline. |
| **Google Fonts CDN (`fonts.googleapis.com`)** | Typography | Violates `NFR-001` (external runtime requests leak visitor IPs to third-party servers and fail under air-gapped CSP `default-src 'self'`). Self-hosted `.woff2` files in `public/fonts/` guarantee instant, private rendering. |
| **Framer Motion / Three.js** | Animation / 3D | Adds `40 KB–180 KB` gzipped JS to every interactive route and complicates `prefers-reduced-motion` accessibility overrides. Pure CSS keyframes (`cubic-bezier(0.16, 1, 0.3, 1)`) and lightweight React hooks achieve 60fps at `0 KB` library cost. |
| **CryptoJS (Userland JS Crypto)** | Cryptography | Legacy userland implementation vulnerable to timing side-channels and adds unnecessary bundle weight when `window.crypto.subtle` (`AES-256-GCM` + `PBKDF2`) is built into every modern browser and Node 20+. |

---

## 3. Dual Deployment Topologies

**AEGIS // OPS GRID** is architected to run out-of-the-box in **DEMO MODE** with zero external infrastructure while maintaining full parity for promotion to **PRODUCTION REFERENCE MODE**.

### 3.1 Mode 1 — `DEMO MODE` (Default Zero-Infrastructure Runtime)
- **Activation**: `AEGIS_MODE=demo` (default when `DATABASE_URL` is unset).
- **Public & Console Data**: Served from strongly-typed, deterministic in-memory catalogs (`src/lib/data/*`) through both RSC direct imports and `/api/v1/*` Route Handlers.
- **Authentication & Guard**: `/portal` validates credential shape (`codename >= 3`, `passphrase >= 8`), signs a session envelope via `/api/v1/auth/session`, sets an HTTP cookie + `sessionStorage` state, and unlocks `/portal/*`.
- **Comms Intercepts**: `/api/v1/intercepts/stream` serves standard `text/event-stream` (SSE) bursts with an automatic client-side generator fallback.
- **Field-Notes Vault**: Encrypted client-side with `AES-256-GCM` (`PBKDF2` 310,000 iterations) and stored as Base64 ciphertext in `localStorage` (`aegis_vault_v1`) with an optional ephemeral server ciphertext mirror.

### 3.2 Mode 2 — `PRODUCTION REFERENCE MODE` (Enterprise Cloud Topology)
- **Activation**: `AEGIS_MODE=production` with `DATABASE_URL` and `REDIS_URL` configured.
- **Database**: PostgreSQL 15+ managed via Drizzle ORM (`DATABASE.md`), enforcing Row-Level Security (RLS) on `vault_notes` and `sessions`.
- **Authentication**: `users.pass_hash` verified with `Argon2id`; server-side session record written to `sessions` table and backed by `httpOnly; Secure; SameSite=Lax` cookie.
- **Rate Limiting & SSE**: Redis token-bucket limiter (`5 req/min` on `/api/v1/auth/session`, `1 SSE stream/client` on `/api/v1/intercepts/stream`).
- **Vault Persistence**: Client still performs 100% of `PBKDF2` + `AES-256-GCM` encryption in the browser; server stores only opaque `{ ciphertext, iv, tag }` in Postgres `vault_notes`.

```mermaid
flowchart LR
    subgraph Browser["Browser Client (Zero External CDN)"]
        UI["RSC + Client Islands\n(OBSIDIAN PARALLAX)"]
        WC["Web Crypto API\nPBKDF2 (310k) + AES-256-GCM"]
        LS["sessionStorage / localStorage\n(Ciphertext Only)"]
    end

    subgraph NextServer["Next.js 16 App Server (Node >= 20)"]
        HDR["CSP + HSTS + Security Headers"]
        RSC["Server Components\n(/, /agencies, /history, /recruitment)"]
        API["REST & SSE Route Handlers\n(/api/v1/*)"]
        MEM["Deterministic In-Memory Seed\n(DEMO MODE Default)"]
    end

    subgraph ProdInfra["Optional Production Infrastructure"]
        PG[("PostgreSQL 15+\n(Drizzle ORM + RLS)")]
        RD[("Redis 7+\n(Rate Limits & Sessions)")]
    end

    UI <--> HDR
    HDR <--> RSC
    HDR <--> API
    UI <--> WC
    WC <--> LS
    API <--> MEM
    API -.->|AEGIS_MODE=production| PG
    API -.->|AEGIS_MODE=production| RD
```

---

## 4. Environment Variable Matrix (`.env.example`)

| Variable Name | Required in `DEMO`? | Required in `PROD`? | Example / Default | Description |
| :--- | :---: | :---: | :--- | :--- |
| `NODE_ENV` | No | Yes | `development` / `production` | Standard Node environment mode. |
| `AEGIS_MODE` | No | Yes | `demo` | Runtime storage adapter (`demo` or `production`). |
| `AEGIS_SESSION_SECRET` | No | Yes | `demo-fallback-32-byte-umbra-secret-2087` | 32+ byte secret used to sign session tokens. |
| `AEGIS_SESSION_TTL_SECONDS` | No | No | `28800` (8 hours) | Watchfloor session expiration window. |
| `DATABASE_URL` | No | Yes | `postgresql://aegis_app:REDACTED@localhost:5432/aegis_grid` | Postgres 15+ connection string for Drizzle ORM. |
| `REDIS_URL` | No | Yes | `redis://localhost:6379/0` | Redis endpoint for rate-limiting and SSE fanout. |
| `AEGIS_CONTACT_ENC_KEY` | No | Yes | `base64-encoded-32-byte-aes-gcm-key` | Server-side key for encrypting recruitment contact strings in Prod Mode. |
| `NEXT_PUBLIC_AEGIS_BUILD_ID` | No | No | `AEGIS-2087.314-OMEGA` | Build identifier displayed in console footer and `/api/v1/health`. |
