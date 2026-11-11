import type { Metadata } from "next";
import { AGENCIES } from "@/lib/data/agencies";
import { Stamp } from "@/components/Stamp";
import { HudPanel } from "@/components/HudPanel";
import { AgenciesExplorer } from "./AgenciesExplorer";

export const metadata: Metadata = {
  title: "The Ten Services",
  description:
    "Public-record profile of the ten allied intelligence services in the fictional 2087 AEGIS coalition: CIA, MI6/SIS, R&AW, GCHQ, NSA, Mossad, BND, DGSE, ASIS and CSIS.",
};

export default function AgenciesPage() {
  const humint = AGENCIES.filter((a) => a.category === "HUMINT").length;
  const sigint = AGENCIES.filter((a) => a.category === "SIGINT").length;
  const fusion = AGENCIES.filter((a) => a.category === "FUSION").length;
  const earliest = AGENCIES.reduce((min, a) => Math.min(min, a.founded), 9999);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-[#3ee0ff]/20 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Stamp label="PUBLIC RECORD" tone="green" />
          <Stamp label="CAPABILITY RATINGS: FICTION" tone="amber" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[0.06em] text-[#e6f1ff] uppercase sm:text-4xl">
          Ten services. Ten charters.
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#8da4c4]">
          Each profile below leads with verifiable history: the enabling statute or origin, the
          headquarters city, and the statutory remit. Everything the coalition does in 2087 —
          orbital shadowing, benthic photonics, fusion desks — is invented and labelled as such.
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["SERVICES IN DIRECTORY", String(AGENCIES.length).padStart(2, "0"), "text-[#3ee0ff]"],
            ["HUMINT / SIGINT / FUSION", `${humint} / ${sigint} / ${fusion}`, "text-[#e6f1ff]"],
            ["EARLIEST CHARTER", String(earliest), "text-[#ffb454]"],
            ["RUNTIME EXTERNAL REQUESTS", "00", "text-[#39ff9d]"],
          ].map(([label, value, tone]) => (
            <div
              key={label}
              className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#0a1322]/70 px-3 py-2.5"
            >
              <dt className="font-mono-tech text-[10px] tracking-widest text-[#8da4c4] uppercase">
                {label}
              </dt>
              <dd className={`mt-0.5 font-display text-lg font-bold ${tone}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <AgenciesExplorer agencies={AGENCIES} />
        </div>

        <aside className="space-y-4 lg:col-span-3">
          <HudPanel title="Sourcing Note" code="PROVENANCE" tone="amber">
            <div className="space-y-3 p-4 text-xs leading-relaxed text-[#8da4c4]">
              <p>
                Founding years, headquarters cities and remits are drawn from public record —
                agency-published histories, national statutes and open reference works.
              </p>
              <p>
                Headcounts appear only where a service or its supervising ministry has published one —
                and each note names that source. Where establishment strength is genuinely classified,
                the record says so rather than inventing a number.
              </p>
              <p className="border-t border-[#3ee0ff]/15 pt-3 text-[#39ff9d]">
                Capability indices are authored fiction for a 2087 scenario. They describe no real
                agency, capability, or assessment.
              </p>
            </div>
          </HudPanel>

          <HudPanel title="Category Key" code="LEGEND" tone="cyan">
            <ul className="space-y-2.5 p-4 font-mono-tech text-[11px] text-[#8da4c4]">
              <li>
                <span className="text-[#39ff9d]">HUMINT</span> — human-source collection services
              </li>
              <li>
                <span className="text-[#3ee0ff]">SIGINT</span> — signals and communications
                intelligence services
              </li>
              <li>
                <span className="text-[#ffb454]">FUSION</span> — all-source, technical or
                military-intelligence fusion services
              </li>
            </ul>
          </HudPanel>
        </aside>
      </div>
    </div>
  );
}
