"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authHint } from "./gate-copy";
import { createSessionEnvelope, getClientSession, saveClientSession, type WatchfloorSession } from "@/lib/session";
import { CornerBrackets } from "@/components/CornerBrackets";
import { Sigil } from "@/components/Sigil";
import { Stamp } from "@/components/Stamp";
import { Toast } from "@/components/Toast";

const REASONS: Record<string, string> = {
  auth_required: "SESSION ABSENT — a cleared token is required for every /portal/* route.",
  purged: "SESSION PURGED — token destroyed, cookie cleared, in-memory record dropped.",
  expired: "SESSION EXPIRED — 8-hour TTL elapsed. Re-authenticate to resume the watchfloor.",
};

export function GateTerminal() {
  const router = useRouter();
  const [codename, setCodename] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "verifying" | "opening">("idle");
  const [toast, setToast] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [existing, setExisting] = useState<WatchfloorSession | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("reason");
    if (code) setReason(REASONS[code] ?? null);
    setExisting(getClientSession());
  }, []);

  const checks = useMemo(
    () => [
      { label: "CODENAME ≥ 3 CHARACTERS", pass: codename.trim().length >= 3 },
      { label: "PASSPHRASE ≥ 8 CHARACTERS", pass: passphrase.length >= 8 },
      { label: "CODEPOINT SET [A-Z0-9_-]", pass: /^[A-Za-z0-9_-]*$/.test(codename) },
    ],
    [codename, passphrase]
  );

  const shapeValid = checks.every((check) => check.pass);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase !== "idle") return;
    setError(null);

    if (!shapeValid) {
      setShake(true);
      window.setTimeout(() => setShake(false), 460);
      setError(
        !checks[0].pass
          ? "CODENAME REJECTED — minimum three characters required."
          : !checks[2].pass
          ? "CODENAME REJECTED — only letters, digits, hyphens and underscores."
          : "PASSPHRASE REJECTED — minimum eight characters required."
      );
      return;
    }

    setPhase("verifying");

    try {
      const response = await fetch("/api/v1/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codename: codename.trim(), passphrase }),
      });
      const json = (await response.json()) as {
        ok: boolean;
        data?: { sessionId: string; codename: string; clearance: "UMBRA-7"; expiresAt: string };
        error?: { message: string };
      };

      if (!response.ok || !json.ok || !json.data) {
        throw new Error(json.error?.message ?? "Gate relay rejected the credential envelope.");
      }

      saveClientSession({
        sessionId: json.data.sessionId,
        codename: json.data.codename,
        clearance: json.data.clearance,
        expiresAt: json.data.expiresAt,
      });
      openDoor();
    } catch {
      // Offline / static-export fallback: the DEMO gate validates shape, nothing else.
      saveClientSession(createSessionEnvelope(codename.trim()));
      openDoor();
      setToast("RELAY OFFLINE — SESSION ISSUED LOCALLY (DEMO MODE)");
    }
  }

  function openDoor() {
    setPhase("opening");
    setToast("UMBRA-7 TOKEN ACCEPTED — WATCHFLOOR DOOR OPENING");
    window.setTimeout(() => router.push("/portal/dashboard"), 900);
  }

  return (
    <div className="w-full max-w-xl">
      <Toast message={toast} tone="green" onDismiss={() => setToast(null)} />

      {reason && (
        <p
          role="status"
          className="mb-3 rounded-[2px] border border-[#ffb454]/50 bg-[#191006]/80 px-3 py-2 font-mono-tech text-[11px] tracking-wide text-[#ffb454]"
        >
          {reason}
        </p>
      )}

      <div
        className={`relative overflow-hidden rounded-[2px] border border-[#3ee0ff]/45 bg-[#0a1322]/95 p-6 shadow-[0_0_50px_rgba(62,224,255,0.14)] sm:p-8 ${
          shake ? "animate-gate-shake" : ""
        }`}
      >
        <CornerBrackets tone="cyan" />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[#3ee0ff]/12 transition-opacity duration-700 ${
            phase === "opening" ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#ff3b4e] uppercase">
                {"// BREACH DOOR // AUTH CHALLENGE"}
              </p>
              <h1 className="mt-2 font-display text-2xl font-extrabold tracking-[0.1em] text-[#e6f1ff] uppercase">
                THE GATE
              </h1>
            </div>
            <Sigil size={46} />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#8da4c4]">
            Present a codename and a passphrase to request a UMBRA-7 watchfloor token. The gate
            validates <em>shape only</em> — three characters, eight characters — and mints a session
            for the demo console. It does not know who you are.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Stamp label="DEMO — NOT REAL SECURITY" tone="amber" />
            <Stamp label="FICTION WATCHFLOOR" tone="red" />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <label className="block">
              <span className="mb-1 block font-mono-tech text-[11px] tracking-[0.18em] text-[#8da4c4] uppercase">
                OPERATIVE CODENAME
              </span>
              <input
                type="text"
                value={codename}
                onChange={(event) => setCodename(event.target.value)}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="characters"
                maxLength={32}
                placeholder="UMBRA-EYES"
                aria-describedby="gate-checks"
                className="w-full rounded-[2px] border border-[#3ee0ff]/40 bg-[#04070d] px-3.5 py-3 font-mono-tech text-base tracking-[0.12em] text-[#e6f1ff] uppercase placeholder:text-[#8da4c4]/45 focus:border-[#3ee0ff] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-mono-tech text-[11px] tracking-[0.18em] text-[#8da4c4] uppercase">
                WATCHFLOOR PASSPHRASE
              </span>
              <input
                type="password"
                value={passphrase}
                onChange={(event) => setPassphrase(event.target.value)}
                autoComplete="new-password"
                maxLength={128}
                placeholder="••••••••"
                className="w-full rounded-[2px] border border-[#3ee0ff]/40 bg-[#04070d] px-3.5 py-3 font-mono-tech text-base tracking-[0.2em] text-[#e6f1ff] placeholder:text-[#8da4c4]/45 focus:border-[#3ee0ff] focus:outline-none"
              />
            </label>

            <ul id="gate-checks" className="space-y-1 font-mono-tech text-[11px] tracking-wider">
              {checks.map((check) => (
                <li
                  key={check.label}
                  className={check.pass ? "text-[#39ff9d]" : "text-[#8da4c4]/70"}
                >
                  [{check.pass ? "✓" : " "}] {check.label}
                </li>
              ))}
            </ul>

            {error && (
              <p
                role="alert"
                className="rounded-[2px] border border-[#ff3b4e]/55 bg-[#1a080b] px-3 py-2 font-mono-tech text-xs text-[#ff3b4e]"
              >
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCodename("KESTREL-9");
                  setPassphrase("OBSIDIAN-2087");
                  setError(null);
                }}
                className="rounded-[2px] border border-[#ffb454]/50 bg-[#191006]/70 px-3 py-1.5 font-mono-tech text-[11px] tracking-widest text-[#ffb454] uppercase hover:border-[#ffb454] hover:bg-[#ffb454] hover:text-[#04070d]"
              >
                LOAD DEMO CREDENTIALS
              </button>
              <span className="font-mono-tech text-[10px] tracking-wider text-[#8da4c4]">
                KESTREL-9 // OBSIDIAN-2087
              </span>
            </div>

            <button
              type="submit"
              disabled={phase !== "idle"}
              className="w-full rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/18 px-5 py-3.5 font-display text-sm font-bold tracking-[0.18em] text-[#3ee0ff] uppercase transition-colors hover:bg-[#3ee0ff] hover:text-[#04070d] disabled:opacity-60"
            >
              {phase === "idle"
                ? "REQUEST UMBRA-7 TOKEN →"
                : phase === "verifying"
                ? "VERIFYING SHAPE…"
                : "DOOR OPEN — ENTERING"}
            </button>
          </form>

          <p className="mt-4 font-mono-tech text-[11px] leading-relaxed text-[#8da4c4]/80">
            {authHint}
          </p>

          {existing && (
            <div className="mt-4 rounded-[2px] border border-[#39ff9d]/40 bg-[#061810]/70 p-3 font-mono-tech text-[11px] text-[#39ff9d]">
              ACTIVE SESSION DETECTED — {existing.codename} // expires{" "}
              {existing.expiresAt.slice(0, 19)}Z{" "}
              <button
                type="button"
                onClick={() => router.push("/portal/dashboard")}
                className="ml-1 underline decoration-current/50 underline-offset-2 hover:text-[#e6f1ff]"
              >
                RESUME →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
