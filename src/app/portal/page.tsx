import type { Metadata } from "next";
import Link from "next/link";
import { ClassifiedBanner } from "@/components/ClassifiedBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { Sigil } from "@/components/Sigil";
import { HudPanel } from "@/components/HudPanel";
import { GateTerminal } from "./GateTerminal";

export const metadata: Metadata = {
  title: "The Gate — Watchfloor Authentication",
  description:
    "Breach-door authentication for the fictional 2087 AEGIS watchfloor. DEMO mode accepts shape-valid credentials only; no real identity system is present.",
  robots: { index: false, follow: false },
};

const ACCESS_FACTS = [
  ["SESSION MODEL", "Opaque token in sessionStorage + cookie mirror; 8-hour TTL."],
  ["ENCRYPTION", "AES-256-GCM at rest for field notes, PBKDF2-SHA256 @ 310k iterations."],
  ["EXTERNAL REQUESTS", "Zero. Fonts, crest and cartography are served from this origin."],
  ["DATA LEAVING BROWSER", "Only what you type into this form, and only to this origin."],
];

export default function GatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#04070d]">
      <ClassifiedBanner variant="console" position="top" />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Sigil size={34} />
            <div>
              <p className="font-display text-xs font-bold tracking-[0.18em] text-[#e6f1ff] uppercase">
                AEGIS // OPS GRID
              </p>
              <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[#8da4c4] uppercase">
                UNOFFICIAL 2087 FAN CONCEPT
              </p>
            </div>
          </Link>
          <Link
            href="/"
            className="rounded-[2px] border border-[#3ee0ff]/35 px-3 py-1.5 font-mono-tech text-xs tracking-widest text-[#8da4c4] uppercase hover:border-[#3ee0ff] hover:text-[#e6f1ff]"
          >
            ← PUBLIC SITE
          </Link>
        </div>

        <div className="grid flex-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <GateTerminal />
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <HudPanel title="Access Facts" code="PRE-FLIGHT" tone="amber">
              <dl className="divide-y divide-[#3ee0ff]/12">
                {ACCESS_FACTS.map(([label, value]) => (
                  <div key={label} className="px-4 py-3">
                    <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[#ffb454] uppercase">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-[#8da4c4]">{value}</dd>
                  </div>
                ))}
              </dl>
            </HudPanel>

            <div className="rounded-[2px] border border-[#ff3b4e]/40 bg-[#160a10]/70 p-4 text-xs leading-relaxed text-[#e6f1ff]">
              <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[#ff3b4e] uppercase">
                What this gate is not
              </p>
              <ul className="mt-2 space-y-1.5 text-[#8da4c4]">
                <li>— It is not an identity provider. There are no accounts, no emails, no resets.</li>
                <li>— It does not query any government system, because it has no such connection.</li>
                <li>— It does not protect anything real. The console behind it is fiction.</li>
                <li>
                  — Every operation, dossier and intercept behind this door is fabricated and labelled
                  as fabricated.
                </li>
              </ul>
            </div>

            <p className="font-mono-tech text-[11px] leading-relaxed text-[#8da4c4]/80">
              Unofficial fan concept. Not affiliated with, endorsed by, or representative of any
              government or intelligence service, including those referenced in the fiction.
            </p>
          </aside>
        </div>
      </main>

      <SiteFooter />
      <ClassifiedBanner variant="console" position="bottom" />
    </div>
  );
}
