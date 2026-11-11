import { describe, expect, it, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { AGENCIES, getAgencyBySlug } from "@/lib/data/agencies";
import { TIMELINE_EVENTS } from "@/lib/data/timeline";
import { OPERATIONS, getOperationById } from "@/lib/data/operations";
import { DOSSIERS, FEATURED_DOSSIERS, getDossierById } from "@/lib/data/dossiers";
import {
  INITIAL_INTERCEPTS,
  SEED_200_INTERCEPTS,
  generateInterceptByIndex,
} from "@/lib/data/intercepts";
import { APTITUDE_QUESTIONS, generateCandidateSerial } from "@/lib/data/aptitude";
import {
  createSessionEnvelope,
  getClientSession,
  isSessionValid,
  purgeClientSession,
  saveClientSession,
  SESSION_STORAGE_KEY,
} from "@/lib/session";
import {
  PBKDF2_ITERATIONS,
  decryptVaultNote,
  encryptVaultNote,
  formatVaultExportTxt,
  loadVaultEnvelopeFromStorage,
} from "@/lib/crypto";
import { ClassifiedBanner } from "@/components/ClassifiedBanner";
import { Stamp } from "@/components/Stamp";
import { SiteFooter } from "@/components/SiteFooter";

const ROOT = path.resolve(__dirname, "..");

/* ------------------------------------------------------------------ */
/* Seed data integrity + the factual-safety constraints                */
/* ------------------------------------------------------------------ */

describe("allied agency directory — public record only", () => {
  it("indexes exactly ten services", () => {
    expect(AGENCIES).toHaveLength(10);
    expect(new Set(AGENCIES.map((a) => a.slug)).size).toBe(10);
  });

  it("carries the correct public-record founding year and headquarters", () => {
    const expected: Record<string, [number, string]> = {
      cia: [1947, "Langley, Virginia"],
      sis: [1909, "London"],
      raw: [1968, "New Delhi"],
      gchq: [1919, "Cheltenham"],
      nsa: [1952, "Fort Meade, Maryland"],
      mossad: [1951, "Tel Aviv"],
      bnd: [1956, "Pullach / Berlin"],
      dgse: [1982, "Paris"],
      asis: [1952, "Canberra"],
      csis: [1984, "Ottawa"],
    };

    for (const [slug, [founded, hq]] of Object.entries(expected)) {
      const agency = getAgencyBySlug(slug);
      expect(agency, `agency ${slug} must exist`).toBeDefined();
      expect(agency?.founded).toBe(founded);
      expect(agency?.hqCity).toContain(hq.split(",")[0]);
    }
  });

  it("attributes every numeric staffing figure to a public source", () => {
    const sourceMarkers = ["declassified", "public", "estimate", "disclosure", "reports", "statements"];
    for (const agency of AGENCIES) {
      const note = agency.publicFacts.publicStaffingNote.toLowerCase();
      if (/\d/.test(note)) {
        expect(
          sourceMarkers.some((marker) => note.includes(marker)),
          `${agency.code} staffing note must name its public source: ${note}`
        ).toBe(true);
      }
    }
  });

  it("labels every 2087 capability index as fiction", () => {
    const markup = renderToStaticMarkup(React.createElement(Stamp, { label: "FICTION", tone: "red" }));
    expect(markup).toContain("FICTION");
    expect(OPERATIONS.every((op) => op.isFiction === true)).toBe(true);
    expect(DOSSIERS.every((dossier) => dossier.isFiction === true)).toBe(true);
  });
});

describe("timeline registers", () => {
  it("indexes 22 events with an explicit fiction flag on every row", () => {
    expect(TIMELINE_EVENTS).toHaveLength(22);
    expect(TIMELINE_EVENTS.every((event) => typeof event.isFiction === "boolean")).toBe(true);
  });

  it("keeps every fictional capstone in the future and every public record in the past", () => {
    const fiction = TIMELINE_EVENTS.filter((event) => event.isFiction);
    const record = TIMELINE_EVENTS.filter((event) => !event.isFiction);

    expect(fiction.length).toBeGreaterThan(0);
    expect(record.length).toBeGreaterThan(10);
    expect(fiction.every((event) => event.year > 2026)).toBe(true);
    expect(record.every((event) => event.year <= 2026)).toBe(true);
    expect(TIMELINE_EVENTS[0]?.year).toBe(1909);
  });
});

describe("fictional operations and dossiers", () => {
  it("indexes eight operations across three statuses", () => {
    expect(OPERATIONS).toHaveLength(8);
    const statuses = new Set(OPERATIONS.map((op) => op.status));
    expect([...statuses].sort()).toEqual(["ACTIVE", "DARK", "STANDBY"]);
    expect(OPERATIONS.every((op) => op.threatLevel >= 1 && op.threatLevel <= 5)).toBe(true);
  });

  it("resolves a case file by id and rejects unknown ids", () => {
    expect(getOperationById(OPERATIONS[0].id)?.codename).toBe(OPERATIONS[0].codename);
    expect(getOperationById("op-nope")).toBeUndefined();
  });

  it("holds ten dossiers, eight of them featured on the watchfloor", () => {
    expect(DOSSIERS).toHaveLength(10);
    expect(FEATURED_DOSSIERS).toHaveLength(8);
    expect(FEATURED_DOSSIERS.every((dossier) => dossier.featured)).toBe(true);
    expect(getDossierById(FEATURED_DOSSIERS[0].id)?.id).toBe(FEATURED_DOSSIERS[0].id);
  });

  it("redacts a meaningful share of every dossier body", () => {
    for (const dossier of DOSSIERS) {
      const segments = dossier.sections.flatMap((section) => section.segments);
      const redacted = segments.filter((segment) => segment.type === "redacted");
      expect(redacted.length, `${dossier.id} should contain redacted spans`).toBeGreaterThan(0);
    }
  });
});

describe("synthetic intercept trunk", () => {
  it("seeds 200 deterministic frames with unique ids", () => {
    expect(SEED_200_INTERCEPTS).toHaveLength(200);
    expect(new Set(SEED_200_INTERCEPTS.map((frame) => frame.id)).size).toBe(200);
    expect(INITIAL_INTERCEPTS.length).toBeGreaterThan(0);
  });

  it("is deterministic for a given index", () => {
    const a = generateInterceptByIndex(7);
    const b = generateInterceptByIndex(7);
    expect(a.id).toBe(b.id);
    expect(a.body).toBe(b.body);
    expect(["FLASH", "IMMEDIATE", "PRIORITY"]).toContain(a.classification);
  });

  it("accepts a timestamp override for stream emission", () => {
    const frame = generateInterceptByIndex(3, "2087-11-10T12:00:00.000Z");
    expect(frame.capturedAt).toBe("2087-11-10T12:00:00.000Z");
  });
});

/* ------------------------------------------------------------------ */
/* Recruitment aptitude + serial issuance                              */
/* ------------------------------------------------------------------ */

describe("candidate intake", () => {
  it("poses three aptitude vectors with one published correct option each", () => {
    expect(APTITUDE_QUESTIONS).toHaveLength(3);
    for (const question of APTITUDE_QUESTIONS) {
      expect(question.options.some((option) => option.id === question.correctOptionId)).toBe(true);
      expect(question.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("issues an ARG-2087-XXXX serial", () => {
    for (let i = 0; i < 25; i += 1) {
      expect(generateCandidateSerial("quiet-lantern")).toMatch(/^ARG-2087-[0-9A-F]{4}$/);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Session guard (FR-007 / FR-008)                                     */
/* ------------------------------------------------------------------ */

describe("watchfloor session guard", () => {
  const memory = new Map<string, string>();

  beforeEach(() => {
    memory.clear();
    const sessionStorage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => void memory.set(key, value),
      removeItem: (key: string) => void memory.delete(key),
    };
    const documentStub = { cookie: "" };
    (globalThis as unknown as { window: unknown }).window = { sessionStorage };
    (globalThis as unknown as { document: unknown }).document = documentStub;
  });

  afterEach(() => {
    delete (globalThis as unknown as { window?: unknown }).window;
    delete (globalThis as unknown as { document?: unknown }).document;
  });

  it("mints a well-formed UMBRA-7 token", () => {
    const session = createSessionEnvelope("umbra-eyes");
    expect(session.sessionId).toMatch(/^ses_2087_[a-z0-9]+_[a-f0-9]{16}$/);
    expect(session.codename).toBe("UMBRA-EYES");
    expect(session.clearance).toBe("UMBRA-7");
    expect(isSessionValid(session)).toBe(true);
  });

  it("rejects an expired token", () => {
    expect(
      isSessionValid({
        sessionId: "ses_2087_x_0011223344556677",
        codename: "X",
        clearance: "UMBRA-7",
        expiresAt: new Date(Date.now() - 60_000).toISOString(),
      })
    ).toBe(false);
  });

  it("round-trips a session through sessionStorage and drops expired records", () => {
    const session = createSessionEnvelope("relay-ghost");
    saveClientSession(session);
    expect(getClientSession()?.sessionId).toBe(session.sessionId);

    memory.set(
      SESSION_STORAGE_KEY,
      JSON.stringify({ ...session, expiresAt: new Date(Date.now() - 1).toISOString() })
    );
    expect(getClientSession()).toBeNull();
    expect(memory.has(SESSION_STORAGE_KEY)).toBe(false);
  });

  it("purges the token and clears the cookie jar", () => {
    saveClientSession(createSessionEnvelope("burn-check"));
    purgeClientSession();
    expect(memory.has(SESSION_STORAGE_KEY)).toBe(false);
    expect(getClientSession()).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
/* Vault cryptography (FR-013)                                         */
/* ------------------------------------------------------------------ */

describe("AES-256-GCM field vault", () => {
  it("round-trips a note and never stores plaintext", async () => {
    const record = await encryptVaultNote(
      { title: "BENTHIC DRIFT", body: "Repeater coupler at 4,200 m — signature drifted +0.7 Hz.", classification: "EYES ONLY" },
      "correct-horse-battery",
      undefined,
      1_000 // reduced work factor for test runtime only
    );

    expect(record.ciphertext).not.toContain("BENTHIC");
    expect(record.tag).toBe("AES-256-GCM-128");

    const opened = await decryptVaultNote(record, "correct-horse-battery", 1_000);
    expect(opened.title).toBe("BENTHIC DRIFT");
    expect(opened.classification).toBe("EYES ONLY");
  });

  it("fails closed on a wrong passphrase (authentication tag mismatch)", async () => {
    const record = await encryptVaultNote(
      { title: "SEALED", body: "fabricated 2087 observation", classification: "UMBRA-7" },
      "passphrase-one",
      undefined,
      1_000
    );
    await expect(decryptVaultNote(record, "passphrase-two", 1_000)).rejects.toBeDefined();
  });

  it("pins the production KDF work factor and builds a labelled export", () => {
    expect(PBKDF2_ITERATIONS).toBe(310_000);

    const header = formatVaultExportTxt(
      [
        {
          id: "vn_2087_dead",
          title: "EXPORT CHECK",
          body: "body",
          classification: "ORCON",
          createdAt: "2087-11-10T00:00:00.000Z",
          ciphertext: "AAAA",
          iv: "BBBB",
          salt: "CCCC",
        },
      ],
      "UMBRA-EYES"
    );

    expect(header).toContain("UNOFFICIAL FAN CONCEPT");
    expect(header).toContain("AES-256-GCM");
    expect(header).toContain("UMBRA-EYES");
  });

  it("returns an initialised empty envelope when storage is unavailable", () => {
    const envelope = loadVaultEnvelopeFromStorage();
    expect(envelope.version).toBe(1);
    expect(envelope.cipher).toBe("AES-256-GCM");
    expect(envelope.kdf).toBe("PBKDF2-SHA256");
    expect(envelope.notes).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* Route surface + guard wiring                                        */
/* ------------------------------------------------------------------ */

describe("route surface", () => {
  const ROUTES = [
    "src/app/(public)/page.tsx",
    "src/app/(public)/agencies/page.tsx",
    "src/app/(public)/history/page.tsx",
    "src/app/(public)/recruitment/page.tsx",
    "src/app/portal/page.tsx",
    "src/app/portal/dashboard/page.tsx",
    "src/app/portal/missions/page.tsx",
    "src/app/portal/dossiers/page.tsx",
    "src/app/portal/comms/page.tsx",
    "src/app/portal/vault/page.tsx",
    "src/app/not-found.tsx",
  ];

  it("ships all ten product routes plus the custom 404", () => {
    for (const route of ROUTES) {
      expect(fs.existsSync(path.join(ROOT, route)), `${route} must exist`).toBe(true);
    }
  });

  it("exports a default component from every route module", async () => {
    for (const route of ROUTES) {
      const mod = await import(path.join(ROOT, route));
      expect(typeof mod.default, `${route} must default-export a component`).toBe("function");
    }
  });

  it("wires the /portal/* guard through the console shell", () => {
    const shell = fs.readFileSync(path.join(ROOT, "src/components/ConsoleShell.tsx"), "utf8");
    expect(shell).toContain("requireAuth: true");
    for (const page of [
      "src/app/portal/dashboard/page.tsx",
      "src/app/portal/missions/page.tsx",
      "src/app/portal/dossiers/page.tsx",
      "src/app/portal/comms/page.tsx",
      "src/app/portal/vault/page.tsx",
    ]) {
      expect(fs.readFileSync(path.join(ROOT, page), "utf8")).toContain("ConsoleShell");
    }
  });

  it("ships the full /api/v1 surface", () => {
    for (const route of [
      "src/app/api/v1/health/route.ts",
      "src/app/api/v1/auth/session/route.ts",
      "src/app/api/v1/session/route.ts",
      "src/app/api/v1/agencies/route.ts",
      "src/app/api/v1/agencies/[id]/route.ts",
      "src/app/api/v1/timeline/route.ts",
      "src/app/api/v1/operations/route.ts",
      "src/app/api/v1/operations/[id]/route.ts",
      "src/app/api/v1/dossiers/route.ts",
      "src/app/api/v1/dossiers/[id]/route.ts",
      "src/app/api/v1/intercepts/stream/route.ts",
      "src/app/api/v1/recruitment/applications/route.ts",
      "src/app/api/v1/vault/notes/route.ts",
    ]) {
      expect(fs.existsSync(path.join(ROOT, route)), `${route} must exist`).toBe(true);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Disclaimer discipline (FR-002 / FR-015)                             */
/* ------------------------------------------------------------------ */

describe("mandatory disclaimers", () => {
  it("prints the unofficial-fan-conception notice on both banner variants", () => {
    const top = renderToStaticMarkup(React.createElement(ClassifiedBanner, { variant: "public", position: "top" }));
    const consoleBanner = renderToStaticMarkup(
      React.createElement(ClassifiedBanner, { variant: "console", position: "bottom" })
    );

    expect(top.toUpperCase()).toContain("UNOFFICIAL");
    expect(consoleBanner.toUpperCase()).toContain("FICTION");
  });

  it("embeds the non-affiliation clause in the footer", () => {
    const markup = renderToStaticMarkup(React.createElement(SiteFooter));
    expect(markup).toContain("not affiliated with");
    expect(markup).toContain("fiction");
  });

  it("keeps the disclaimer in the README", () => {
    const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8").toLowerCase();
    expect(readme).toContain("unofficial");
    expect(readme).toContain("not affiliated");
  });
});
