import type { Metadata } from "next";
import { RECRUITMENT_PIPELINE } from "@/lib/data/aptitude";
import { Stamp } from "@/components/Stamp";
import { HudPanel } from "@/components/HudPanel";
import { CornerBrackets } from "@/components/CornerBrackets";
import { RecruitmentTerminal } from "./RecruitmentTerminal";

export const metadata: Metadata = {
  title: "Candidate Intake ARG-2087",
  description:
    "A five-stage fictional recruitment pipeline, a four-tier clearance matrix and a three-vector aptitude terminal. No real recruitment occurs; every serial issued is a fiction.",
};

export default function RecruitmentPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-[#3ee0ff]/20 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Stamp label="CANDIDATE INTAKE OPEN" tone="green" />
          <Stamp label="NO REAL VACANCY EXISTS" tone="red" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[0.06em] text-[#e6f1ff] uppercase sm:text-4xl">
          Five stages. One serial.
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#8da4c4]">
          The intake pipeline below is a narrative device: it explains how the fiction imagines
          recruitment into a ten-service coalition, then lets you run the only part that exists here —
          a three-vector aptitude terminal that issues a fabricated tracking serial of the form{" "}
          <code className="font-mono-tech text-[#39ff9d]">ARG-2087-XXXX</code>.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {RECRUITMENT_PIPELINE.map((stage, index) => (
            <div
              key={stage.step}
              className="relative rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/80 p-3.5"
            >
              <CornerBrackets tone={index === 0 ? "green" : "cyan"} />
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[#ffb454] uppercase">
                  {stage.step}
                </span>
                <span className="font-mono-tech text-[10px] text-[#8da4c4]">{stage.duration}</span>
              </div>
              <h2 className="mt-2 font-display text-[11px] leading-snug font-bold tracking-wide text-[#e6f1ff] uppercase">
                {stage.title}
              </h2>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#8da4c4]">{stage.summary}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RecruitmentTerminal />
        </div>

        <aside className="space-y-4 lg:col-span-4">
          <HudPanel title="What Happens To Your Data" code="PRIVACY" tone="green">
            <div className="space-y-3 p-4 text-xs leading-relaxed text-[#8da4c4]">
              <p>
                The form posts to <code className="font-mono-tech text-[#3ee0ff]">/api/v1/recruitment/applications</code>.
                In DEMO mode the record lives in a bounded in-memory ring on the server and vanishes
                when the process restarts.
              </p>
              <p>
                If the relay is unreachable, the serial is derived locally and written to this
                browser&apos;s localStorage under <code className="font-mono-tech text-[#3ee0ff]">aegis_candidate_serial_v1</code>.
                Nothing is sent anywhere else.
              </p>
              <p className="border-t border-[#3ee0ff]/15 pt-3 text-[#ffb454]">
                Never enter a real password, real government identifier, or a contact string you would
                not want retained on a public demo host.
              </p>
            </div>
          </HudPanel>

          <HudPanel title="Aptitude Domains" code="SYLLABUS" tone="cyan">
            <ul className="space-y-2.5 p-4 text-xs leading-relaxed text-[#8da4c4]">
              <li>
                <span className="font-mono-tech text-[#3ee0ff]">VECTOR 01</span> — modular lattice
                parity and prime-stride cryptanalysis.
              </li>
              <li>
                <span className="font-mono-tech text-[#3ee0ff]">VECTOR 02</span> — great-circle relay
                triangulation across coalition ground stations.
              </li>
              <li>
                <span className="font-mono-tech text-[#3ee0ff]">VECTOR 03</span> — authenticated
                encryption hygiene: nonce discipline and tag length.
              </li>
              <li className="border-t border-[#3ee0ff]/15 pt-2.5 text-[#39ff9d]">
                All three answers are published in-line after each attempt. Nothing here is an
                assessment instrument, and no score is stored.
              </li>
            </ul>
          </HudPanel>

          <HudPanel title="Discordant Note" code="LEGAL" tone="amber">
            <p className="p-4 text-xs leading-relaxed text-[#8da4c4]">
              If this page were real, it would be an unlawful recruiting front. It is not real. It
              exists to demonstrate in-world interface writing, accessible form design, and
              boundary-side validation — not to solicit anything from anyone.
            </p>
          </HudPanel>
        </aside>
      </div>
    </div>
  );
}
