"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  PBKDF2_ITERATIONS,
  cryptoShredLocalVault,
  decryptVaultNote,
  encryptVaultNote,
  formatVaultExportTxt,
  loadVaultEnvelopeFromStorage,
  saveVaultEnvelopeToStorage,
  type DecryptedVaultItem,
  type VaultNotePlaintext,
  type VaultStorageEnvelope,
} from "@/lib/crypto";
import { getClientSession } from "@/lib/session";
import { HudPanel } from "@/components/HudPanel";
import { VaultNote } from "@/components/VaultNote";
import { Toast } from "@/components/Toast";
import { EmptyState } from "@/components/EmptyState";
import { Stamp } from "@/components/Stamp";
import { CornerBrackets } from "@/components/CornerBrackets";

type Classification = VaultNotePlaintext["classification"];

const CLASSIFICATIONS: Classification[] = ["UMBRA-7", "ORCON", "EYES ONLY"];

export function VaultBody() {
  const [envelope, setEnvelope] = useState<VaultStorageEnvelope | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const [notes, setNotes] = useState<DecryptedVaultItem[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [classification, setClassification] = useState<Classification>("UMBRA-7");
  const [writing, setWriting] = useState(false);

  const [burnArmed, setBurnArmed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastTone, setToastTone] = useState<"cyan" | "amber" | "red" | "green">("green");
  const [codename, setCodename] = useState("UMBRA-EYES");

  useEffect(() => {
    setEnvelope(loadVaultEnvelopeFromStorage());
    setCodename(getClientSession()?.codename ?? "UMBRA-EYES");
  }, []);

  const cipherBytes = useMemo(
    () => (envelope ? envelope.notes.length : 0),
    [envelope]
  );

  function notify(message: string, tone: "cyan" | "amber" | "red" | "green" = "green") {
    setToastTone(tone);
    setToast(message);
  }

  async function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUnlockError(null);

    if (passphrase.length < 8) {
      setUnlockError("Vault passphrase must be at least 8 characters (key derivation input).");
      return;
    }

    const current = envelope ?? loadVaultEnvelopeFromStorage();
    const decrypted: DecryptedVaultItem[] = [];
    let failures = 0;

    for (const record of current.notes) {
      try {
        decrypted.push(await decryptVaultNote(record, passphrase, current.iterations));
      } catch {
        failures += 1;
      }
    }

    if (failures > 0 && decrypted.length === 0 && current.notes.length > 0) {
      setUnlockError(
        "AUTHENTICATION TAG MISMATCH — wrong passphrase, or the ciphertext has been tampered with. AES-256-GCM rejects both identically."
      );
      return;
    }

    setEnvelope(current);
    setNotes(decrypted);
    setUnlocked(true);
    notify(
      current.notes.length === 0
        ? `VAULT OPEN — key derived in-browser (PBKDF2 ${PBKDF2_ITERATIONS.toLocaleString("en-US")} iterations). Vault is empty.`
        : `VAULT OPEN — ${decrypted.length} record(s) authenticated${failures ? `, ${failures} rejected` : ""}.`
    );
  }

  async function writeNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!envelope) return;

    if (title.trim().length < 3) {
      notify("Record title requires at least 3 characters.", "amber");
      return;
    }
    if (body.trim().length < 3) {
      notify("Record body requires at least 3 characters.", "amber");
      return;
    }

    setWriting(true);
    try {
      const record = await encryptVaultNote(
        { title: title.trim(), body: body.trim(), classification },
        passphrase,
        envelope.salt,
        envelope.iterations
      );

      const nextEnvelope: VaultStorageEnvelope = {
        ...envelope,
        notes: [...envelope.notes, record],
      };
      saveVaultEnvelopeToStorage(nextEnvelope);
      setEnvelope(nextEnvelope);

      const decrypted = await decryptVaultNote(record, passphrase, envelope.iterations);
      setNotes((prev) => [decrypted, ...prev]);

      setTitle("");
      setBody("");
      notify(`RECORD SEALED — ${record.id} written as AES-256-GCM ciphertext only.`);

      // Best-effort mirror to the owner-scoped server vault (ciphertext only, never plaintext).
      void fetch("/api/v1/vault/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: record.id,
          ciphertext: record.ciphertext,
          iv: record.iv,
          salt: record.salt,
          tag: record.tag,
          createdAt: record.createdAt,
        }),
      }).catch(() => undefined);
    } catch {
      notify("ENCRYPTION FAILED — Web Crypto unavailable in this context.", "red");
    } finally {
      setWriting(false);
    }
  }

  function shredOne(id: string) {
    if (!envelope) return;
    const nextEnvelope: VaultStorageEnvelope = {
      ...envelope,
      notes: envelope.notes.filter((record) => record.id !== id),
    };
    saveVaultEnvelopeToStorage(nextEnvelope);
    setEnvelope(nextEnvelope);
    setNotes((prev) => prev.filter((note) => note.id !== id));
    notify(`RECORD ${id} SHREDDED — ciphertext row deleted from localStorage.`, "amber");
    void fetch(`/api/v1/vault/notes?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(
      () => undefined
    );
  }

  function burnAll() {
    if (!burnArmed) {
      setBurnArmed(true);
      notify("BURN ARMED — press CONFIRM BURN within 8 seconds to destroy the vault.", "red");
      window.setTimeout(() => setBurnArmed(false), 8000);
      return;
    }

    const rotated = cryptoShredLocalVault();
    setEnvelope(rotated);
    setNotes([]);
    setBurnArmed(false);
    setUnlocked(false);
    setPassphrase("");
    notify("VAULT BURNED — salt rotated, ciphertext dropped, all keys invalidated.", "red");
    void fetch("/api/v1/vault/notes?all=true", { method: "DELETE" }).catch(() => undefined);
  }

  function exportTxt() {
    const payload = formatVaultExportTxt(notes, codename);
    const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aegis-vault-${codename.toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    notify("EXPORT WRITTEN — plaintext left your browser only because you asked it to.");
  }

  /* ---------------- LOCKED STATE ---------------- */
  if (!unlocked) {
    return (
      <div className="grid gap-4 lg:grid-cols-12">
        <Toast message={toast} tone={toastTone} onDismiss={() => setToast(null)} />

        <div className="lg:col-span-7">
          <HudPanel title="Vault Lock" code="AES-256-GCM" tone="cyan">
            <form onSubmit={unlock} className="space-y-4 p-4 sm:p-5">
              <div className="flex flex-wrap gap-2">
                <Stamp label="LOCAL ONLY" tone="green" />
                <Stamp label="ZERO PLAINTEXT AT REST" tone="cyan" />
                <Stamp label={`${cipherBytes} SEALED RECORD(S)`} tone="amber" />
              </div>

              <p className="text-sm leading-relaxed text-[#8da4c4]">
                This vault encrypts notes in your browser with a key derived from the passphrase you
                type below. The ciphertext is written to{" "}
                <code className="font-mono-tech text-[#3ee0ff]">localStorage</code>; the plaintext never
                touches storage, and the server never sees either. There is no recovery path — forget
                the passphrase and the records stay sealed permanently.
              </p>

              <label className="block">
                <span className="mb-1 block font-mono-tech text-[11px] tracking-[0.18em] text-[#8da4c4] uppercase">
                  VAULT PASSPHRASE (≥8) — DERIVES AES-256 KEY
                </span>
                <input
                  type="password"
                  value={passphrase}
                  onChange={(event) => setPassphrase(event.target.value)}
                  autoComplete="new-password"
                  maxLength={128}
                  placeholder="••••••••"
                  className="w-full rounded-[2px] border border-[#3ee0ff]/35 bg-[#04070d] px-3 py-2.5 font-mono-tech text-sm tracking-[0.18em] text-[#e6f1ff] placeholder:text-[#8da4c4]/45 focus:border-[#3ee0ff] focus:outline-none"
                />
              </label>

              {unlockError && (
                <p role="alert" className="rounded-[2px] border border-[#ff3b4e]/55 bg-[#1a080b] px-3 py-2 font-mono-tech text-[11px] leading-relaxed text-[#ff3b4e]">
                  {unlockError}
                </p>
              )}

              <button
                type="submit"
                className="rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/18 px-5 py-2.5 font-display text-xs font-bold tracking-[0.16em] text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
              >
                DERIVE KEY & OPEN VAULT
              </button>
            </form>
          </HudPanel>
        </div>

        <aside className="space-y-4 lg:col-span-5">
          <HudPanel title="Cryptographic Parameters" code="SPEC" tone="amber">
            <dl className="divide-y divide-[#3ee0ff]/12 font-mono-tech text-[11px]">
              {[
                ["CIPHER", "AES-256-GCM"],
                ["KEY DERIVATION", "PBKDF2-HMAC-SHA256"],
                ["ITERATIONS", PBKDF2_ITERATIONS.toLocaleString("en-US")],
                ["SALT", "128-bit random, per vault"],
                ["IV / NONCE", "96-bit random, per record"],
                ["AUTH TAG", "128-bit (tamper-evident)"],
                ["STORAGE", "localStorage · ciphertext only"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-4 py-2">
                  <dt className="tracking-widest text-[#8da4c4] uppercase">{label}</dt>
                  <dd className="text-[#e6f1ff]">{value}</dd>
                </div>
              ))}
            </dl>
          </HudPanel>

          <div className="rounded-[2px] border border-[#ff3b4e]/40 bg-[#160a10]/70 p-3.5 font-mono-tech text-[11px] leading-relaxed text-[#8da4c4]">
            <p className="font-bold tracking-widest text-[#ff3b4e] uppercase">Threat honesty</p>
            <p className="mt-1.5">
              Browser-held keys protect against casual disk inspection, not against malware on this
              device, a compromised browser, or someone who knows the passphrase. This is a
              demonstration of cryptographic plumbing, not a secure courier.
            </p>
          </div>
        </aside>
      </div>
    );
  }

  /* ---------------- UNLOCKED STATE ---------------- */
  return (
    <div className="space-y-4">
      <Toast message={toast} tone={toastTone} onDismiss={() => setToast(null)} />

      <div className="relative flex flex-wrap items-center gap-2 rounded-[2px] border border-[#39ff9d]/40 bg-[#061810]/70 p-3">
        <CornerBrackets tone="green" />
        <span className="font-mono-tech text-[11px] tracking-widest text-[#39ff9d] uppercase">
          VAULT UNLOCKED // {notes.length} RECORD(S) // KEY IN MEMORY ONLY
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportTxt}
            disabled={notes.length === 0}
            className="rounded-[2px] border border-[#3ee0ff]/50 px-3 py-1.5 font-mono-tech text-[11px] font-bold tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d] disabled:opacity-40"
          >
            EXPORT .TXT
          </button>
          <button
            type="button"
            onClick={burnAll}
            className={`rounded-[2px] border px-3 py-1.5 font-mono-tech text-[11px] font-bold tracking-widest uppercase ${
              burnArmed
                ? "border-[#ff3b4e] bg-[#ff3b4e] text-[#04070d]"
                : "border-[#ff3b4e]/60 bg-[#ff3b4e]/10 text-[#ff3b4e] hover:bg-[#ff3b4e] hover:text-[#04070d]"
            }`}
          >
            {burnArmed ? "CONFIRM BURN — ALL RECORDS" : "BURN ALL (2-STEP)"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <HudPanel title="Seal New Field Note" code="WRITE // AES-GCM" tone="cyan">
            <form onSubmit={writeNote} className="space-y-3 p-4">
              <label className="block">
                <span className="mb-1 block font-mono-tech text-[11px] tracking-widest text-[#8da4c4] uppercase">
                  RECORD TITLE
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={120}
                  placeholder="E.G. BENTHIC RELAY DRIFT — SHIFT 04"
                  className="w-full rounded-[2px] border border-[#3ee0ff]/30 bg-[#04070d] px-3 py-2 font-mono-tech text-sm text-[#e6f1ff] placeholder:text-[#8da4c4]/50 focus:border-[#3ee0ff] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-mono-tech text-[11px] tracking-widest text-[#8da4c4] uppercase">
                  BODY — ENCRYPTED BEFORE STORAGE
                </span>
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  rows={5}
                  maxLength={4000}
                  placeholder="Observations, timestamps, doubts. Nothing typed here leaves this browser."
                  className="w-full resize-y rounded-[2px] border border-[#3ee0ff]/30 bg-[#04070d] px-3 py-2 font-mono-tech text-sm leading-relaxed text-[#e6f1ff] placeholder:text-[#8da4c4]/50 focus:border-[#3ee0ff] focus:outline-none"
                />
              </label>

              <fieldset>
                <legend className="mb-1.5 font-mono-tech text-[11px] tracking-widest text-[#8da4c4] uppercase">
                  SELF-ASSIGNED CLASSIFICATION (FICTION)
                </legend>
                <div className="flex flex-wrap gap-2">
                  {CLASSIFICATIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={classification === option}
                      onClick={() => setClassification(option)}
                      className={`rounded-[2px] border px-2.5 py-1 font-mono-tech text-[11px] tracking-widest uppercase ${
                        classification === option
                          ? "border-[#ffb454] bg-[#ffb454] font-bold text-[#04070d]"
                          : "border-[#3ee0ff]/30 text-[#8da4c4] hover:border-[#ffb454]/60"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={writing}
                className="w-full rounded-[2px] border border-[#39ff9d] bg-[#39ff9d]/15 px-4 py-2.5 font-display text-xs font-bold tracking-[0.16em] text-[#39ff9d] uppercase hover:bg-[#39ff9d] hover:text-[#04070d] disabled:opacity-50"
              >
                {writing ? "DERIVING KEY & SEALING…" : "SEAL RECORD"}
              </button>

              <p className="font-mono-tech text-[10px] leading-relaxed text-[#8da4c4]">
                Each seal runs PBKDF2 at {PBKDF2_ITERATIONS.toLocaleString("en-US")} iterations before
                AES-GCM encryption. Expect a deliberate half-second of work per record.
              </p>
            </form>
          </HudPanel>
        </div>

        <div className="space-y-3 lg:col-span-7">
          {notes.length === 0 ? (
            <EmptyState
              title="NO SEALED RECORDS IN THIS VAULT"
              message="The vault is open and empty. Seal a note on the left; it will be stored as ciphertext with a fresh 96-bit IV and a 128-bit authentication tag."
            />
          ) : (
            notes.map((note) => <VaultNote key={note.id} note={note} onDelete={shredOne} />)
          )}
        </div>
      </div>
    </div>
  );
}
