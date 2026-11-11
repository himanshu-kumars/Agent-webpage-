import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AGENCIES } from "@/lib/data/agencies";
import { FEATURED_DOSSIERS } from "@/lib/data/dossiers";
import { PUBLIC_SITREP_TICKER } from "@/lib/data/intercepts";
import { OPERATIONS } from "@/lib/data/operations";
import { Ticker } from "@/components/Ticker";
import { HudPanel } from "@/components/HudPanel";
import { DecryptText } from "@/components/DecryptText";
import { Stamp } from "@/components/Stamp";
import { Sigil } from "@/components/Sigil";
import { ThreatGauge } from "@/components/ThreatGauge";
import { CornerBrackets } from "@/components/CornerBrackets";

export const metadata: Metadata = {
  title: "Public Directorate Archive — Epoch 2087",
  description:
    "Ten allied services. One watchfloor. Enter the unofficial speculative archive of the 2087 AEGIS Directorate: agency dossiers, a chronology from 1909 to 2087, and the recruitment gate.",
};

const DOCTRINE_PILLARS = [
  {
    code: "PILLAR 01",
    title: "SILENCE IS A FEATURE",
    body:
      "No notification chimes. No cookie wall. No third-party beacons phoning home to an advertising broker. The only signals on this grid are the ones we print ourselves.",
    metric: "0 EXTERNAL RUNTIME REQUESTS",
  },
  {
    code: "PILLAR 02",
    title: "FICTION IS LABELLED FICTION",
    body:
      "Every operation on this watchfloor carries a FICTION stamp in the same typeface as its classification. The 2087 coalition is invented. The 1909–2026 record is cited from public archives.",
    metric: "100% DISCLOSED INVENTED DATA",
  },
  {
    code: "PILLAR 03",
    title: "NO TEMPLATE GRAVITY",
    body:
      "Obsidian ground, cyan ranging light, amber cautionary light. Sharp two-pixel corners. Type set in Orbitron, Rajdhani and Share Tech Mono — self-hosted, never fetched from a font CDN.",
    metric: "3 SELF-HOSTED TYPEFACES",
  },
  {
    code: "PILLAR 04",
    title: "ZERO EXTERNAL RUNTIME REQUESTS",
    body:
      "Open the network panel. The map is hand-authored SVG. The crest is inline SVG. The fonts ship in /public/fonts. Nothing leaves this origin unless you press a button that says it will.",
    metric: "SELF-CONTAINED BUILD",
  },
];

export default function HomePage() {
  const activeOps = OPERATIONS.filter((op) => op.status === "ACTIVE").length;
  const totalAssets = OPERATIONS.reduce((sum, op) => sum + op.assets.length, 0);
  const previewAgencies = AGENCIES.slice(0, 5);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-[#3ee0ff]/20">
        <Image
          src="/images/hero-grid.svg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04070d]/70 via-[#04070d]/85 to-[#04070d]" />

        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <Stamp label="UNCLASSIFIED // PUBLIC DIRECTORATE" tone="cyan" />
              <Stamp label="STORY EPOCH 2087.314" tone="amber" />
            </div>

            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-[0.02em] text-[#e6f1ff] uppercase sm:text-5xl lg:text-6xl">
              Ten services.
              <br />
              <span className="text-[#3ee0ff]">One watchfloor.</span>
              <br />
              Zero quiet nights.
            </h1>

            <div className="mt-5 max-w-2xl text-base leading-relaxed text-[#8da4c4] sm:text-lg">
              <DecryptText
                text="AEGIS // OPS GRID is a speculative operations grid for a fictional 2087 alliance of ten allied intelligence services. The public surface is a museum of verifiable history. The gate below is a simulation of what a cleared watchfloor might look like — fabricated operations, invented dossiers, synthetic intercepts, and a field-notes vault that never leaves your browser."
                durationMs={1100}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/portal"
                className="group relative rounded-[2px] border border-[#ffb454] bg-[#ffb454]/15 px-6 py-3.5 font-display text-sm font-bold tracking-[0.16em] text-[#ffb454] uppercase transition-colors hover:bg-[#ffb454] hover:text-[#04070d]"
              >
                OPEN THE GATE →
              </Link>
              <Link
                href="/agencies"
                className="rounded-[2px] border border-[#3ee0ff]/45 bg-[#0a1322] px-6 py-3.5 font-display text-sm font-bold tracking-[0.16em] text-[#3ee0ff] uppercase transition-colors hover:border-[#3ee0ff] hover:bg-[#3ee0ff]/15"
              >
                REVIEW THE TEN SERVICES
              </Link>
              <Link
                href="/recruitment"
                className="font-mono-tech text-xs tracking-[0.18em] text-[#8da4c4] uppercase underline decoration-[#39ff9d]/60 underline-offset-4 hover:text-[#39ff9d]"
              >
                Candidate intake // ARG-2087
              </Link>
            </div>

            <p className="mt-6 max-w-xl font-mono-tech text-[11px] leading-relaxed tracking-wide text-[#8da4c4]/80">
              DEMO CREDENTIALS — any codename ≥ 3 characters and any passphrase ≥ 8 characters.
              The gate is a shape validator, not an identity system. Do not enter a real password.
            </p>
          </div>

          {/* Telemetry Sidebar */}
          <div className="lg:col-span-5">
            <HudPanel
              title="Watchfloor Snapshot"
              code="LIVE // FICTION"
              tone="cyan"
              headerRight={<span className="font-mono-tech text-[11px] text-[#39ff9d]">SYNC: NOMINAL</span>}
            >
              <dl className="divide-y divide-[#3ee0ff]/12">
                {[
                  ["ACTIVE OPERATIONS", String(activeOps).padStart(2, "0"), "cyan"],
                  ["TRACKED ASSETS", String(totalAssets).padStart(2, "0"), "cyan"],
                  ["ALLIED SERVICES", String(AGENCIES.length).padStart(2, "0"), "green"],
                  ["DOSSIERS HELD", String(FEATURED_DOSSIERS.length).padStart(2, "0"), "amber"],
                ].map(([label, value, tone]) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3">
                    <dt className="font-mono-tech text-xs tracking-widest text-[#8da4c4] uppercase">
                      {label}
                    </dt>
                    <dd
                      className={`font-display text-xl font-bold ${
                        tone === "amber" ? "text-[#ffb454]" : tone === "green" ? "text-[#39ff9d]" : "text-[#3ee0ff]"
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-[#3ee0ff]/15 p-3">
                <ThreatGauge level={2} />
              </div>

              <div className="flex items-center gap-3 border-t border-[#3ee0ff]/15 bg-[#070d18]/70 px-4 py-3">
                <Sigil size={30} />
                <p className="font-mono-tech text-[11px] leading-snug text-[#8da4c4]">
                  Coalition threat condition is a scripted narrative value. It reflects no real-world
                  intelligence assessment.
                </p>
              </div>
            </HudPanel>
          </div>
        </div>

        <div className="relative">
          <Ticker items={PUBLIC_SITREP_TICKER} />
        </div>
      </section>

      {/* ================= AGENCY PREVIEW GRID ================= */}
      <section className="border-b border-[#3ee0ff]/20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono-tech text-xs tracking-[0.2em] text-[#3ee0ff] uppercase">
                {"// SECTION 02 — THE COALITION"}
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-[0.08em] text-[#e6f1ff] uppercase sm:text-3xl">
                Ten charters. Public record only.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8da4c4]">
                Founding years, headquarters cities and statutory remits below are cited from public
                record. The 2087 coalition roles are invented — the constraints of the fiction, not of
                history.
              </p>
            </div>
            <Link
              href="/agencies"
              className="rounded-[2px] border border-[#3ee0ff]/45 px-4 py-2 font-mono-tech text-xs tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff]/15"
            >
              FULL DIRECTORY →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {previewAgencies.map((agency) => (
              <Link
                key={agency.slug}
                href={`/agencies#${agency.slug}`}
                className="group relative rounded-[2px] border border-[#3ee0ff]/22 bg-[#0a1322]/80 p-4 transition-all hover:-translate-y-0.5 hover:border-[#3ee0ff]/70 hover:shadow-[0_0_28px_rgba(62,224,255,0.14)]"
              >
                <CornerBrackets tone="cyan" />
                <div className="flex items-start justify-between">
                  <span className="font-display text-lg font-bold tracking-wider text-[#e6f1ff]">
                    {agency.code}
                  </span>
                  <span className="font-mono-tech text-[10px] tracking-widest text-[#ffb454]">
                    {agency.isoCode}
                  </span>
                </div>
                <p className="mt-1 font-mono-tech text-[11px] text-[#8da4c4]">
                  EST. {agency.founded} // {agency.hqCity.split(",")[0].toUpperCase()}
                </p>
                <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-[#8da4c4]">
                  {agency.remit}
                </p>
                <p className="mt-3 border-t border-[#3ee0ff]/15 pt-2 font-mono-tech text-[10px] tracking-widest text-[#39ff9d] uppercase">
                  {agency.category} // CHARTER OPEN
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOCTRINE ================= */}
      <section className="border-b border-[#3ee0ff]/20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-tech text-xs tracking-[0.2em] text-[#ffb454] uppercase">
            {"// SECTION 03 — BUILD DOCTRINE"}
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-2xl font-extrabold tracking-[0.08em] text-[#e6f1ff] uppercase sm:text-3xl">
            The rules the interface obeys.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {DOCTRINE_PILLARS.map((pillar) => (
              <article
                key={pillar.code}
                className="relative rounded-[2px] border border-[#3ee0ff]/22 bg-[#0a1322]/70 p-5"
              >
                <CornerBrackets tone="amber" />
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono-tech text-[11px] tracking-[0.18em] text-[#ffb454] uppercase">
                    {pillar.code}
                  </span>
                  <span className="rounded-[2px] border border-[#39ff9d]/40 bg-[#39ff9d]/10 px-2 py-0.5 font-mono-tech text-[10px] tracking-wider text-[#39ff9d]">
                    {pillar.metric}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold tracking-[0.1em] text-[#e6f1ff] uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8da4c4]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOSSIER TEASE ================= */}
      <section className="border-b border-[#3ee0ff]/20 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono-tech text-xs tracking-[0.2em] text-[#ff3b4e] uppercase">
              {"// SECTION 04 — COMPARTMENT LOCKED"}
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-[0.08em] text-[#e6f1ff] uppercase sm:text-3xl">
              Eight dossiers are sitting behind the gate.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#8da4c4]">
              The public archive shows covers and classification stamps only. Inside the watchfloor,
              redacted spans unlock on click — every revealed word is fabricated fiction, clearly
              stamped as such.
            </p>
            <Link
              href="/portal"
              className="mt-5 inline-block rounded-[2px] border border-[#ff3b4e]/60 bg-[#ff3b4e]/10 px-5 py-3 font-display text-xs font-bold tracking-[0.16em] text-[#ff3b4e] uppercase hover:bg-[#ff3b4e] hover:text-[#04070d]"
            >
              REQUEST WATCHFLOOR ACCESS
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {FEATURED_DOSSIERS.slice(0, 4).map((dossier) => (
              <article
                key={dossier.id}
                className="relative overflow-hidden rounded-[2px] border border-[#3ee0ff]/20 bg-[#0a1322]/80 p-4"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                  <span className="font-display text-4xl font-extrabold tracking-[0.3em] text-[#ff3b4e]">
                    REDACTED
                  </span>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tech text-[11px] tracking-widest text-[#3ee0ff]">
                      {dossier.code}
                    </span>
                    <Stamp
                      label={dossier.classification}
                      tone={dossier.classification === "EYES ONLY" ? "red" : "amber"}
                    />
                  </div>
                  <h3 className="mt-2 font-display text-sm font-bold tracking-wide text-[#e6f1ff]">
                    {dossier.title}
                  </h3>
                  <p className="mt-1 font-mono-tech text-[11px] text-[#8da4c4]">
                    {dossier.subject} // {dossier.pages} PP // {dossier.redactionDensity}% REDACTED
                  </p>
                  <div className="mt-3 space-y-1.5" aria-hidden="true">
                    <div className="h-1.5 w-full bg-[#3ee0ff]/15" />
                    <div className="h-1.5 w-11/12 bg-[#3ee0ff]/12" />
                    <div className="h-1.5 w-4/5 bg-[#3ee0ff]/10" />
                    <div className="h-1.5 w-2/3 bg-[#ff3b4e]/25" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECRUITMENT BAND ================= */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[2px] border border-[#39ff9d]/35 bg-gradient-to-r from-[#061810] via-[#0a1322] to-[#04070d] p-8 sm:p-10">
            <CornerBrackets tone="green" />
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <p className="font-mono-tech text-xs tracking-[0.2em] text-[#39ff9d] uppercase">
                  {"// SECTION 05 — CANDIDATE INTAKE ARG-2087"}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-[0.06em] text-[#e6f1ff] uppercase sm:text-3xl">
                  Three questions. No CV. No interview panel.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#8da4c4]">
                  The intake terminal poses a lattice-parity puzzle, an orbital triangulation problem
                  and a cryptographic-hygiene question. Answer them, receive a fabricated candidate
                  serial, and read exactly which clearance tier you would not be granted. Nothing is
                  transmitted to any real organisation — there is no real organisation.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/recruitment"
                  className="inline-block rounded-[2px] border border-[#39ff9d] bg-[#39ff9d]/15 px-6 py-3.5 font-display text-sm font-bold tracking-[0.16em] text-[#39ff9d] uppercase hover:bg-[#39ff9d] hover:text-[#04070d]"
                >
                  BEGIN APTITUDE TERMINAL →
                </Link>
                <p className="mt-3 font-mono-tech text-[11px] text-[#8da4c4]">
                  ISSUES SERIAL: ARG-2087-XXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
