# AEGIS // OPS GRID — REST & SSE API Specification (`API.md`)

> **UNOFFICIAL FAN CONCEPT // FICTIONAL 2087 SPECULATIVE INTERFACE**  
> This document specifies the versioned HTTP REST & Server-Sent Events (SSE) contract (`/api/v1/*`) for **AEGIS // OPS GRID**. All operations, dossiers, and intercepts transmitted by these endpoints are works of speculative 2087 fiction.

---

## 1. API Design Conventions & Standard Envelope

### 1.1 Base Path & Content Type
- **Base URI**: `/api/v1`
- **Request/Response Content-Type**: `application/json; charset=utf-8` (except `GET /api/v1/intercepts/stream`, which returns `text/event-stream; charset=utf-8`, and `DELETE /api/v1/auth/session`, which returns `204 No Content`).
- **Timestamps**: All timestamps use strict ISO-8601 Zulu format (`YYYY-MM-DDTHH:mm:ss.sssZ`).

### 1.2 Standard JSON Response Envelope
Every JSON endpoint wraps its response in a deterministic discriminated union envelope:

```ts
export interface ApiSuccessEnvelope<T> {
  ok: true;
  data: T;
  meta?: {
    zulu: string;
    nextCursor?: string | null;
    total?: number;
  };
}

export interface ApiErrorEnvelope {
  ok: false;
  error: {
    code:
      | "UNAUTHORIZED"
      | "FORBIDDEN"
      | "VALIDATION"
      | "RATE_LIMITED"
      | "NOT_FOUND"
      | "CONFLICT"
      | "INTERNAL";
    message: string;
    details?: Record<string, string[]>;
  };
}
```

### 1.3 Error Code Mapping

| Error Code | HTTP Status | Meaning |
| :--- | :---: | :--- |
| `VALIDATION` | `400` | Request body or query parameters failed Zod schema validation. |
| `UNAUTHORIZED` | `401` | Missing, malformed, or expired watchfloor session token. |
| `FORBIDDEN` | `403` | Authenticated session lacks required clearance tier (`UMBRA-7`) or row ownership. |
| `NOT_FOUND` | `404` | Requested agency slug, operation ID, dossier ID, or vault note ID does not exist. |
| `CONFLICT` | `409` | Duplicate `Idempotency-Key` with mismatched payload or duplicate serial constraint. |
| `RATE_LIMITED` | `429` | Client exceeded token-bucket window (`Retry-After` header included). |
| `INTERNAL` | `500` | Unexpected unhandled server error (sanitized; stack traces never leaked). |

### 1.4 Authentication Scheme
- **Demo Mode (`AEGIS_MODE=demo`)**:
  - `POST /api/v1/auth/session` validates credential shape (`codename.trim().length >= 3` and `passphrase.length >= 8`), issues a signed session token stored in the `aegis_session` cookie (`Path=/; SameSite=Lax`) AND returned in the JSON payload so client islands can also pass `X-Aegis-Session: <sessionId>` or `Authorization: Bearer <sessionId>`.
- **Production Reference Mode (`AEGIS_MODE=production`)**:
  - Verifies `passphrase` against `users.pass_hash` using `Argon2id` (`m=65536, t=3, p=4`), inserts a server-side row into `sessions`, and sets an `httpOnly; Secure; SameSite=Lax; Path=/` cookie (`__Host-aegis_session`).

### 1.5 Cursor Pagination, Rate Limits & Idempotency
- **Cursor Pagination**: Collection endpoints accept `?cursor=<opaque_id>&limit=<1..50>` and return `meta.nextCursor`.
- **Rate Limits**:
  - `POST /api/v1/auth/session`: `5 requests / 60s` per IP hash.
  - `POST /api/v1/recruitment/applications`: `10 requests / 60s` per IP hash.
  - `GET /api/v1/intercepts/stream`: `1 active SSE stream` per client session.
  - General read endpoints: `120 requests / 60s`.
- **Idempotency Keys**: All `POST` endpoints accept an optional `Idempotency-Key` UUID header (cached for 24h) to guarantee safe client retries without duplicate side effects.

---

## 2. Complete Endpoint Reference Table

| Method | Path | Auth Required | Summary |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/v1/auth/session` | Public | Validate codename + passphrase and issue `UMBRA-7` watchfloor session. |
| `DELETE` | `/api/v1/auth/session` | Session | Purge active session cookie/record (`204 No Content`). |
| `GET` | `/api/v1/session` | Session | Return current operator session envelope or `401 UNAUTHORIZED`. |
| `GET` | `/api/v1/agencies` | Public | List all 10 allied agencies (optional `?category=HUMINT\|SIGINT\|FUSION`). |
| `GET` | `/api/v1/agencies/:id` | Public | Retrieve single agency profile by slug (e.g., `/api/v1/agencies/cia`). |
| `GET` | `/api/v1/timeline` | Public | Retrieve chronological 1909–2026 public record + 2087 fiction events. |
| `GET` | `/api/v1/operations` | Cleared (`UMBRA-7`) | List operations filterable by `?status=ACTIVE\|STANDBY\|DARK` & `?theatre=`. |
| `GET` | `/api/v1/operations/:id` | Cleared (`UMBRA-7`) | Retrieve full operation case file + asset roster by ID. |
| `GET` | `/api/v1/dossiers` | Cleared (`UMBRA-7`) | List 8 classified dossiers filterable by `?cls=UMBRA-7\|ORCON\|EYES_ONLY`. |
| `GET` | `/api/v1/dossiers/:id` | Cleared (`UMBRA-7`) | Retrieve full multi-section dossier document + redaction map by ID. |
| `GET` | `/api/v1/intercepts/stream` | Cleared (`UMBRA-7`) | `text/event-stream` (SSE) emitting live synthetic 2087 intercepts. |
| `POST` | `/api/v1/recruitment/applications` | Public | Validate candidate aptitude & intake packet; return `201 { serial }`. |
| `GET` | `/api/v1/vault/notes` | Cleared (`UMBRA-7`) | List caller-scoped encrypted vault note envelopes (`ciphertext`, `iv`, `salt`). |
| `POST` | `/api/v1/vault/notes` | Cleared (`UMBRA-7`) | Store a new AES-256-GCM encrypted note envelope (`ciphertext` + `iv` only). |
| `PATCH` | `/api/v1/vault/notes` | Cleared (`UMBRA-7`) | Re-encrypt / update an existing vault note envelope by `id`. |
| `DELETE` | `/api/v1/vault/notes` | Cleared (`UMBRA-7`) | Delete a single note (`?id=`) or crypto-shred all caller notes (`?burnAll=true`). |
| `GET` | `/api/v1/health` | Public | Liveness & build telemetry probe (`{ status, build, mode, zulu }`). |

---

## 3. Detailed Endpoint Contracts & Full Example Payloads

### 3.1 Example 1: Establish Watchfloor Session (`POST /api/v1/auth/session`)

#### Request
```http
POST /api/v1/auth/session HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Idempotency-Key: 9b2f7e1c-4a51-4e88-9012-1b88a7d6c301

{
  "codename": "KESTREL-9",
  "passphrase": "OBSIDIAN-2087-PROTOCOL"
}
```

#### Response (`200 OK`)
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Set-Cookie: aegis_session=ses_2087_kestrel9_9f8a7b6c; Path=/; Max-Age=28800; SameSite=Lax

{
  "ok": true,
  "data": {
    "sessionId": "ses_2087_kestrel9_9f8a7b6c",
    "codename": "KESTREL-9",
    "clearance": "UMBRA-7",
    "expiresAt": "2026-11-11T01:55:00.000Z"
  },
  "meta": {
    "zulu": "2026-11-10T17:55:00.000Z"
  }
}
```

#### Error Response (`400 Bad Request` — Invalid Shape)
```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION",
    "message": "CREDENTIAL SHAPE VIOLATION: Codename must be at least 3 characters and passphrase at least 8 characters.",
    "details": {
      "codename": ["Minimum length is 3 characters"],
      "passphrase": ["Minimum length is 8 characters"]
    }
  }
}
```

---

### 3.2 Example 2: Submit Recruitment Application (`POST /api/v1/recruitment/applications`)

#### Request
```http
POST /api/v1/recruitment/applications HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Idempotency-Key: 31e8c400-88b2-44a9-b811-77f4d2e9901a

{
  "codename": "SIGNAL-ZERO",
  "contact": "signal.zero@relay-2087.invalid",
  "specialty": "SIGINT",
  "answerGrid": {
    "q1": "0x7F-DELTA",
    "q2": "GCHQ-ASIS-LEO4",
    "q3": "NONCE-REUSE-DETECTED"
  },
  "consent": true
}
```

#### Response (`201 Created`)
```json
{
  "ok": true,
  "data": {
    "serial": "ARG-2087-84F2",
    "codename": "SIGNAL-ZERO",
    "specialty": "SIGINT",
    "aptitudeScore": 3,
    "status": "SCREENING",
    "receivedAt": "2026-11-10T17:56:12.000Z",
    "notice": "UNOFFICIAL FAN SIMULATION — NO REAL GOVERNMENT APPLICATION CREATED"
  },
  "meta": {
    "zulu": "2026-11-10T17:56:12.000Z"
  }
}
```

---

### 3.3 Example 3: Cleared Operations Query (`GET /api/v1/operations?status=ACTIVE`)

#### Request
```http
GET /api/v1/operations?status=ACTIVE HTTP/1.1
Host: localhost:3000
Cookie: aegis_session=ses_2087_kestrel9_9f8a7b6c
```

#### Response (`200 OK`)
```json
{
  "ok": true,
  "data": [
    {
      "id": "op-glass-horizon",
      "codename": "GLASS HORIZON",
      "theatre": "ORBITAL // LEO INCLINATION 53.2°",
      "agencySlug": "nsa",
      "leadAgency": "NSA · GCHQ Joint Orbital Cell",
      "status": "ACTIVE",
      "threatLevel": 2,
      "classification": "UMBRA-7",
      "startedAt": "2087-10-14T04:10:00Z",
      "summary": "Counter-interception sweep across twelve decommissioned relay satellites exhibiting unauthorized lasercom heartbeats.",
      "briefingSegments": [
        { "type": "text", "value": "Telemetry captured by " },
        { "type": "redacted", "value": "CHELTENHAM DEEP ARRAY-04" },
        { "type": "text", "value": " confirmed coherent 1550nm optical bursts originating from orbital slot " },
        { "type": "redacted", "value": "NORAD-99412 // GHOST-LATTICE" },
        { "type": "text", "value": " directed toward an uncharted receiver buoy in the North Atlantic." }
      ],
      "assets": [
        { "callsign": "VANGUARD-12", "role": "Orbital SIGINT Spec" },
        { "callsign": "MIRROR-ECHO", "role": "Quantum Cryptanalyst" }
      ],
      "isFiction": true
    }
  ],
  "meta": {
    "zulu": "2026-11-10T17:58:00.000Z",
    "nextCursor": null,
    "total": 4
  }
}
```

---

### 3.4 Example 4: Encrypted Vault Envelope (`POST /api/v1/vault/notes`)

Notice that the API schema **rejects plaintext** fields; it accepts only Base64 `ciphertext`, `iv`, `salt`, and `tag` produced client-side by `AES-256-GCM`:

```json
{
  "id": "vn_9012_a8f3",
  "ciphertext": "6q9L1vN4mP8xR2zW5kY7bC0dF3gH6jK9lM2nP5qR8sT1uV4wX7yZ0aB3cE6f",
  "iv": "r4T8yU2iO6pA0sD3",
  "salt": "z9X7cV5bN3mQ1wE4rT6yU8iO",
  "tag": "GCM-128-EMBEDDED",
  "createdAt": "2026-11-10T18:00:00.000Z"
}
```

---

### 3.5 SSE Stream Format (`GET /api/v1/intercepts/stream`)

Returns `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`:

```text
event: intercept
id: int-2087-0491
data: {"id":"int-2087-0491","channel":"LASERCOM-LEO // 193.4 THz","origin":"SVALBARD RELAY-02","destination":"CHELTENHAM CORE","classification":"FLASH","body":"QUANTUM KEY ROTATION CONFIRMED ON SECTOR 09; ANOMALOUS PHASE DRIFT +0.004 RAD DETECTED.","capturedAt":"2026-11-10T18:01:05.000Z","isFiction":true}
```

---

## 4. Webhook-Less Architecture Rationale

**AEGIS // OPS GRID** intentionally omits outbound webhooks and third-party callback dispatchers for three security and architectural reasons:
1. **Zero Outbound Network Surface (`NFR-001`)**: Allowing user-supplied or system-triggered outbound HTTP webhooks introduces Server-Side Request Forgery (SSRF) vectors and violates the self-contained watchfloor isolation invariant.
2. **Pull + Unidirectional SSE Telemetry**: Watchfloor clients receive real-time intercept frames over authenticated, server-to-browser unidirectional Server-Sent Events (`/api/v1/intercepts/stream`) without opening inbound webhook listeners or third-party message brokers.
3. **Zero Third-Party Data Egress**: Candidate packets (`/recruitment`) and encrypted vault notes (`/portal/vault`) remain strictly inside the local instance, eliminating external data-processor compliance exposure.
