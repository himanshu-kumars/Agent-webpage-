"use client";

import React, { useMemo, useState } from "react";
import {
  APTITUDE_QUESTIONS,
  CLEARANCE_TIERS,
  RECRUITMENT_PIPELINE,
  generateCandidateSerial,
} from "@/lib/data/aptitude";
import { HudPanel } from "@/components/HudPanel";
import { Stamp } from "@/components/Stamp";
import { Toast } from "@/components/Toast";
import { EmptyState } from "@/components/EmptyState";
import { CornerBrackets } from "@/components/CornerBrackets";

const STORAGE_KEY = "aegis_candidate_serial_v1";
const SPECIALTIES = ["HUMINT", "SIGINT", "QUANTUM_CRYPT", "ORBITAL_RECON"] as const;

type Specialty = (typeof SPECIALTIES)[number];

interface SubmittedRecord {
  serial: string;
  codename: string;
  specialty: Specialty;
  receivedAt: string;
  persisted: boolean;
}

export function RecruitmentTerminal() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);

  const [codename, setCodename] = useState("");
  const [contact, setContact] = useState("");
  const [specialty, setSpecialty] = useState<Specialty>("SIGINT");
  const [consent, setConsent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedRecord | null>(null);

  const current = APTITUDE_QUESTIONS[step - 1];
  const correctCount = useMemo(
    () =>
      APTITUDE_QUESTIONS.reduce(
        (total, question) => total + (answers[question.id] === question.correctOptionId ? 1 : 0),
        0
      ),
    [answers]
  );

  function chooseAnswer(questionId: string, optionId: string) {
    if (locked[questionId]) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    const question = APTITUDE_QUESTIONS.find((q) => q.id === questionId);
    const option = question?.options.find((o) => o.id === optionId);
    const correct = question?.correctOptionId === optionId;

    setLocked((prev) => ({ ...prev, [questionId]: true }));
    setFeedback({
      correct,
      text: option?.explanation ?? "Frame decoded.",
    });
    setToast(correct ? "VECTOR LOCKED — PARITY CONFIRMED" : "PARITY DRIFT — ANALYSIS LOGGED");
  }

  async function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const cleanCodename = codename.trim();
    if (cleanCodename.length < 3) {
      setFormError("Candidate codename requires at least 3 characters.");
      return;
    }
    if (contact.trim().length < 4) {
      setFormError("Provide a relay handle or contact string of at least 4 characters.");
      return;
    }
    if (!consent) {
      setFormError("You must acknowledge that this is an unofficial fictional simulation.");
      return;
    }

    setSubmitting(true);
    const localSerial = generateCandidateSerial(cleanCodename);

    try {
      const response = await fetch("/api/v1/recruitment/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codename: cleanCodename,
          contact: contact.trim(),
          specialty,
          answerGrid: answers,
          consent: true,
        }),
      });

      const json = (await response.json()) as {
        ok: boolean;
        data?: { serial: string; receivedAt: string };
        error?: { message: string };
      };

      if (!response.ok || !json.ok || !json.data) {
        throw new Error(json.error?.message ?? "Intake relay returned an unexpected frame.");
      }

      finalize({
        serial: json.data.serial,
        codename: cleanCodename.toUpperCase(),
        specialty,
        receivedAt: json.data.receivedAt,
        persisted: true,
      });
    } catch {
      // Offline / static-export fallback: serial is derived locally, nothing leaves the browser.
      finalize({
        serial: localSerial,
        codename: cleanCodename.toUpperCase(),
        specialty,
        receivedAt: new Date().toISOString(),
        persisted: false,
      });
    } finally {
      setSubmitting(false);
    }
  }

  function finalize(record: SubmittedRecord) {
    setSubmitted(record);
    setToast(`CANDIDATE SERIAL ISSUED — ${record.serial}`);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Storage disabled; serial remains visible on screen only.
    }
  }

  if (submitted) {
    const persistedCopy = submitted.persisted
      ? "Transmitted to the DEMO intake relay (in-memory, purged on restart)."
      : "Relay unreachable. Serial derived locally — nothing left this browser.";

    return (
      <div className="space-y-6">
        <Toast message={toast} tone="green" onDismiss={() => setToast(null)} />

        <div className="relative rounded-[2px] border border-[#39ff9d]/55 bg-[#061810]/80 p-6">
          <CornerBrackets tone="green" />
          <div className="flex flex-wrap items-center gap-2">
            <Stamp label="INTAKE ACCEPTED" tone="green" />
            <Stamp label="FICTIONAL SIMULATION" tone="amber" />
          </div>

          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[0.08em] text-[#e6f1ff] uppercase">
            Candidate serial issued
          </h2>

          <p className="mt-4 rounded-[2px] border border-[#39ff9d]/45 bg-[#04070d] px-4 py-3 font-mono-tech text-2xl font-bold tracking-[0.18em] text-[#39ff9d]">
            {submitted.serial}
          </p>

          <dl className="mt-4 grid gap-2 font-mono-tech text-xs sm:grid-cols-2">
            <div className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#0a1322] p-2.5">
              <dt className="text-[10px] tracking-widest text-[#8da4c4] uppercase">CODENAME</dt>
              <dd className="text-[#e6f1ff]">{submitted.codename}</dd>
            </div>
            <div className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#0a1322] p-2.5">
              <dt className="text-[10px] tracking-widest text-[#8da4c4] uppercase">SPECIALTY</dt>
              <dd className="text-[#ffb454]">{submitted.specialty}</dd>
            </div>
            <div className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#0a1322] p-2.5">
              <dt className="text-[10px] tracking-widest text-[#8da4c4] uppercase">APTITUDE</dt>
              <dd className="text-[#3ee0ff]">
                {correctCount} / {APTITUDE_QUESTIONS.length} VECTORS LOCKED
              </dd>
            </div>
            <div className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#0a1322] p-2.5">
              <dt className="text-[10px] tracking-widest text-[#8da4c4] uppercase">RECEIVED (ZULU)</dt>
              <dd className="text-[#e6f1ff]">{submitted.receivedAt.slice(0, 19)}Z</dd>
            </div>
          </dl>

          <p className="mt-4 text-xs leading-relaxed text-[#8da4c4]">{persistedCopy}</p>

          <div className="mt-4 rounded-[2px] border border-[#ffb454]/35 bg-[#191006]/70 p-3 text-xs leading-relaxed text-[#e6f1ff]">
            <strong className="text-[#ffb454]">NO REAL RECRUITMENT:</strong> this serial is a
            fictional artefact. No agency was contacted, no CV was reviewed, and no vacancy exists.
            The serial is stored in this browser&apos;s localStorage only.
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/portal"
              className="rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/15 px-4 py-2.5 font-display text-xs font-bold tracking-[0.16em] text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
            >
              CONTINUE TO THE GATE →
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(null);
                setStep(1);
                setAnswers({});
                setLocked({});
                setFeedback(null);
                setConsent(false);
              }}
              className="rounded-[2px] border border-[#3ee0ff]/35 px-4 py-2.5 font-mono-tech text-xs tracking-widest text-[#8da4c4] uppercase hover:border-[#3ee0ff] hover:text-[#e6f1ff]"
            >
              RE-RUN APTITUDE TERMINAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toast message={toast} tone={feedback?.correct ? "green" : "amber"} onDismiss={() => setToast(null)} />

      {/* APTITUDE TERMINAL */}
      <HudPanel
        title={`Aptitude Terminal — Vector ${String(step).padStart(2, "0")} / 03`}
        code="ARG-2087 // INTAKE"
        tone="cyan"
        headerRight={
          <span className="font-mono-tech text-[11px] text-[#39ff9d]">
            PARITY {correctCount}/{APTITUDE_QUESTIONS.length}
          </span>
        }
      >
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono-tech text-[11px] tracking-[0.18em] text-[#ffb454] uppercase">
              {current.code}
            </span>
            <span className="font-mono-tech text-[11px] tracking-widest text-[#8da4c4]">
              DOMAIN: {current.domain}
            </span>
          </div>

          <div className="mb-4 flex gap-1.5" aria-hidden="true">
            {APTITUDE_QUESTIONS.map((question, index) => (
              <span
                key={question.id}
                className={`h-1 flex-1 rounded-[1px] ${
                  index + 1 < step || locked[question.id]
                    ? "bg-[#39ff9d]"
                    : index + 1 === step
                    ? "bg-[#3ee0ff]"
                    : "bg-[#3ee0ff]/20"
                }`}
              />
            ))}
          </div>

          <p className="text-sm leading-relaxed text-[#e6f1ff]">{current.prompt}</p>

          <pre className="mt-3 overflow-x-auto rounded-[2px] border border-[#3ee0ff]/25 bg-[#04070d] p-3 font-mono-tech text-[11px] whitespace-pre-wrap text-[#3ee0ff]">
{current.cipherSample}
          </pre>

          <div className="mt-4 space-y-2" role="group" aria-label="Answer options">
            {current.options.map((option) => {
              const selected = answers[current.id] === option.id;
              const isCorrect = current.correctOptionId === option.id;
              const answered = Boolean(locked[current.id]);

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={answered}
                  aria-pressed={selected}
                  onClick={() => chooseAnswer(current.id, option.id)}
                  className={`w-full rounded-[2px] border px-3 py-2.5 text-left font-mono-tech text-xs transition-colors ${
                    answered
                      ? selected && isCorrect
                        ? "border-[#39ff9d] bg-[#39ff9d]/12 text-[#39ff9d]"
                        : selected
                        ? "border-[#ff3b4e] bg-[#ff3b4e]/12 text-[#ff3b4e]"
                        : "border-[#3ee0ff]/15 text-[#8da4c4]/70"
                      : "border-[#3ee0ff]/30 bg-[#0a1322] text-[#e6f1ff] hover:border-[#3ee0ff] hover:bg-[#3ee0ff]/10"
                  }`}
                >
                  <span className="mr-2 text-[#8da4c4]">{selected ? "█" : "░"}</span>
                  {option.label}
                </button>
              );
            })}
          </div>

          {feedback && locked[current.id] && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-3 rounded-[2px] border p-3 font-mono-tech text-[11px] leading-relaxed ${
                feedback.correct
                  ? "border-[#39ff9d]/50 bg-[#061810] text-[#39ff9d]"
                  : "border-[#ffb454]/50 bg-[#191006] text-[#ffb454]"
              }`}
            >
              {feedback.text}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#3ee0ff]/15 pt-3">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => {
                setStep((prev) => Math.max(1, prev - 1));
                setFeedback(null);
              }}
              className="rounded-[2px] border border-[#3ee0ff]/35 px-3 py-1.5 font-mono-tech text-xs tracking-widest text-[#8da4c4] uppercase disabled:opacity-35"
            >
              ← PREVIOUS VECTOR
            </button>

            {step < APTITUDE_QUESTIONS.length ? (
              <button
                type="button"
                disabled={!locked[current.id]}
                onClick={() => {
                  setStep((prev) => Math.min(APTITUDE_QUESTIONS.length, prev + 1));
                  setFeedback(null);
                }}
                className="rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/15 px-4 py-1.5 font-mono-tech text-xs font-bold tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d] disabled:opacity-35"
              >
                NEXT VECTOR →
              </button>
            ) : (
              <a
                href="#application-form"
                className="rounded-[2px] border border-[#39ff9d] bg-[#39ff9d]/15 px-4 py-1.5 font-mono-tech text-xs font-bold tracking-widest text-[#39ff9d] uppercase hover:bg-[#39ff9d] hover:text-[#04070d]"
              >
                PROCEED TO APPLICATION ↓
              </a>
            )}
          </div>
        </div>
      </HudPanel>

      {/* APPLICATION FORM */}
      <HudPanel title="Candidate Dossier Intake" code="FORM A-2087" tone="amber">
        <form id="application-form" onSubmit={submitApplication} className="space-y-4 p-4 sm:p-5" noValidate>
          <p className="text-xs leading-relaxed text-[#8da4c4]">
            Fields are validated in the browser first and re-validated by Zod at the boundary. The
            contact string is a fictional relay handle — do not enter a real email address unless you
            accept it being stored locally in this browser.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block font-mono-tech text-[11px] tracking-widest text-[#8da4c4] uppercase">
                CANDIDATE CODENAME (≥3)
              </span>
              <input
                type="text"
                value={codename}
                onChange={(event) => setCodename(event.target.value)}
                required
                minLength={3}
                maxLength={32}
                autoComplete="off"
                placeholder="E.G. QUIET-LANTERN"
                className="w-full rounded-[2px] border border-[#3ee0ff]/30 bg-[#04070d] px-3 py-2 font-mono-tech text-sm text-[#e6f1ff] uppercase placeholder:text-[#8da4c4]/50 focus:border-[#3ee0ff] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-mono-tech text-[11px] tracking-widest text-[#8da4c4] uppercase">
                RELAY HANDLE / CONTACT (≥4)
              </span>
              <input
                type="text"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                required
                minLength={4}
                maxLength={120}
                autoComplete="off"
                placeholder="RELAY-7B // NODE-991"
                className="w-full rounded-[2px] border border-[#3ee0ff]/30 bg-[#04070d] px-3 py-2 font-mono-tech text-sm text-[#e6f1ff] placeholder:text-[#8da4c4]/50 focus:border-[#3ee0ff] focus:outline-none"
              />
            </label>
          </div>

          <fieldset>
            <legend className="mb-1.5 font-mono-tech text-[11px] tracking-widest text-[#8da4c4] uppercase">
              SPECIALTY TRACK
            </legend>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={specialty === option}
                  onClick={() => setSpecialty(option)}
                  className={`rounded-[2px] border px-3 py-1.5 font-mono-tech text-xs tracking-widest uppercase ${
                    specialty === option
                      ? "border-[#ffb454] bg-[#ffb454] font-bold text-[#04070d]"
                      : "border-[#3ee0ff]/30 bg-[#04070d] text-[#8da4c4] hover:border-[#ffb454]/70"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex items-start gap-2.5 rounded-[2px] border border-[#ffb454]/30 bg-[#191006]/50 p-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#39ff9d]"
            />
            <span className="text-xs leading-relaxed text-[#e6f1ff]">
              I understand that <strong>AEGIS // OPS GRID</strong> is an unofficial fan concept, that
              every operation and dossier in it is fiction, and that no real intelligence service will
              receive this submission.
            </span>
          </label>

          {formError && (
            <p role="alert" className="rounded-[2px] border border-[#ff3b4e]/55 bg-[#1a080b] px-3 py-2 font-mono-tech text-xs text-[#ff3b4e]">
              {formError}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-[#3ee0ff]/15 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-[2px] border border-[#39ff9d] bg-[#39ff9d]/15 px-5 py-2.5 font-display text-xs font-bold tracking-[0.16em] text-[#39ff9d] uppercase hover:bg-[#39ff9d] hover:text-[#04070d] disabled:opacity-50"
            >
              {submitting ? "TRANSMITTING…" : "SUBMIT FOR SERIAL ISSUANCE"}
            </button>
            <span className="font-mono-tech text-[11px] text-[#8da4c4]">
              ZOD-VALIDATED // RATE LIMITED 10/MIN
            </span>
          </div>
        </form>
      </HudPanel>

      {Object.keys(answers).length === 0 && (
        <EmptyState
          title="APTITUDE GRID UNANSWERED"
          message="No vectors have been locked yet. Answer at least one aptitude vector to populate your intake record; the form itself accepts submissions at any time."
        />
      )}

      {/* TIER TABLE */}
      <section aria-labelledby="clearance-heading" className="rounded-[2px] border border-[#3ee0ff]/22 bg-[#0a1322]/70">
        <header className="border-b border-[#3ee0ff]/15 bg-[#070d18] px-4 py-2.5">
          <h2 id="clearance-heading" className="font-display text-xs font-bold tracking-[0.14em] text-[#e6f1ff] uppercase">
            Clearance Tier Matrix — what this demo would never grant you
          </h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#3ee0ff]/20 font-mono-tech text-[10px] tracking-widest text-[#8da4c4] uppercase">
                <th scope="col" className="px-3 py-2">TIER</th>
                <th scope="col" className="px-3 py-2">CODENAME</th>
                <th scope="col" className="px-3 py-2">SCOPE</th>
                <th scope="col" className="px-3 py-2">WATCHFLOOR ACCESS</th>
                <th scope="col" className="px-3 py-2">VETTING</th>
              </tr>
            </thead>
            <tbody>
              {CLEARANCE_TIERS.map((tier) => (
                <tr key={tier.tier} className="border-b border-[#3ee0ff]/10 align-top">
                  <td className="px-3 py-2.5 font-mono-tech text-[#3ee0ff]">{tier.tier}</td>
                  <td className="px-3 py-2.5 font-display text-[#e6f1ff]">{tier.codename}</td>
                  <td className="px-3 py-2.5 text-[#8da4c4]">{tier.scope}</td>
                  <td className="px-3 py-2.5 font-mono-tech text-[#ffb454]">{tier.watchfloorAccess}</td>
                  <td className="px-3 py-2.5 text-[#8da4c4]">{tier.vettingRequirement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
