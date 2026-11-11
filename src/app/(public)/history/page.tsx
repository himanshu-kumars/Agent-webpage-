import type { Metadata } from "next";
import Link from "next/link";
import { TIMELINE_EVENTS } from "@/lib/data/timeline";
import { Stamp } from "@/components/Stamp";
import { HudPanel } from "@/components/HudPanel";
import { CornerBrackets } from "@/components/CornerBrackets";

export const metadata: Metadata = {
  title: "Chronology 1909 → 2087",
  description:
    "A public-record chronology of the ten allied intelligence services from 1909 to 2026, followed by explicitly labelled speculative 2087 capstone events.",
};

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function HistoryPage() {
  const publicRecord = TIMELINE_EVENTS.filter((event) => !event.isFiction);
  const fiction = TIMELINE_EVENTS.filter((event) => event.isFiction);
  const futureEvents = TIMELINE_EVENTS.filter((event) => event.year > 2026);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-[#3ee0ff]/20 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Stamp label="1909 → 2026 PUBLIC RECORD" tone="green" />
          <Stamp label="2054 → 2087 LABELLED FICTION" tone="red" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[0.06em] text-[#e6f1ff] uppercase sm:text-4xl">
          A chronology in two registers.
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#8da4c4]">
          The first register is history: institutional foundings, relocations, statutory changes and
          public scandals, cited from open sources. The second register is invention: the 2054
          Reykjavík Concordat, the 2087 watchfloor, and the political weather that produced them. The
          interface never blurs the boundary — every fictional entry carries a red FICTION stamp and a
          distinct border treatment.
        </p>

        <div className="mt-5 flex flex-wrap gap-2 font-mono-tech text-[11px]">
          <span className="rounded-[2px] border border-[#39ff9d]/40 bg-[#39ff9d]/10 px-2.5 py-1 text-[#39ff9d]">
            {publicRecord.length} PUBLIC-RECORD ENTRIES
          </span>
          <span className="rounded-[2px] border border-[#ff3b4e]/40 bg-[#ff3b4e]/10 px-2.5 py-1 text-[#ff3b4e]">
            {fiction.length} FICTIONAL CAPSTONES
          </span>
          <span className="rounded-[2px] border border-[#3ee0ff]/40 bg-[#3ee0ff]/10 px-2.5 py-1 text-[#3ee0ff]">
            SPAN {TIMELINE_EVENTS[0]?.year} → {TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1]?.year}
          </span>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ol className="relative space-y-4 border-l border-[#3ee0ff]/25 pl-5">
            {TIMELINE_EVENTS.map((event) => {
              const isFuture = event.year > 2026;
              return (
                <li key={event.id} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute top-4 -left-[26px] h-2.5 w-2.5 rotate-45 border ${
                      event.isFiction
                        ? "border-[#ff3b4e] bg-[#ff3b4e]"
                        : "border-[#3ee0ff] bg-[#04070d]"
                    }`}
                  />
                  <article
                    className={`relative rounded-[2px] border p-4 ${
                      event.isFiction
                        ? "border-dashed border-[#ff3b4e]/45 bg-[#160a10]/70"
                        : "border-[#3ee0ff]/22 bg-[#0a1322]/80"
                    }`}
                  >
                    <CornerBrackets tone={event.isFiction ? "red" : "cyan"} />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`font-display text-xl font-extrabold tracking-wider ${
                            event.isFiction ? "text-[#ff3b4e]" : "text-[#3ee0ff]"
                          }`}
                        >
                          {event.year}
                        </span>
                        <span className="font-mono-tech text-[11px] tracking-widest text-[#8da4c4]">
                          {event.month ? `${MONTHS[(event.month - 1) % 12]} // ` : ""}
                          {event.agencyCode}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-[2px] border px-1.5 py-0.5 font-mono-tech text-[10px] tracking-widest uppercase ${
                            isFuture
                              ? "border-[#ffb454]/45 text-[#ffb454]"
                              : "border-[#3ee0ff]/35 text-[#3ee0ff]"
                          }`}
                        >
                          {event.tag}
                        </span>
                        {event.isFiction && <Stamp label="FICTION" tone="red" />}
                      </div>
                    </div>
                    <h2 className="mt-2 font-display text-sm font-bold tracking-wide text-[#e6f1ff] sm:text-base">
                      {event.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#8da4c4]">{event.body}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="space-y-4 lg:col-span-4">
          <HudPanel title="Register Key" code="METHOD" tone="cyan">
            <div className="space-y-3 p-4 text-xs leading-relaxed text-[#8da4c4]">
              <div className="rounded-[2px] border border-[#3ee0ff]/25 bg-[#04070d] p-2.5">
                <p className="font-mono-tech text-[10px] tracking-widest text-[#3ee0ff] uppercase">
                  SOLID BORDER // PUBLIC RECORD
                </p>
                <p className="mt-1">
                  Founded dates, relocations and statutory changes drawn from open sources. Presented
                  without interpretation of capability.
                </p>
              </div>
              <div className="rounded-[2px] border border-dashed border-[#ff3b4e]/45 bg-[#160a10] p-2.5">
                <p className="font-mono-tech text-[10px] tracking-widest text-[#ff3b4e] uppercase">
                  DASHED BORDER // INVENTED
                </p>
                <p className="mt-1">
                  Concordats, orbital protocols and coalition machinery authored for this fiction.
                  Nothing here describes a real agreement or real event.
                </p>
              </div>
              <p className="border-t border-[#3ee0ff]/15 pt-3">
                Twenty-two entries are indexed in the seed dataset; {publicRecord.length} are cited
                history and {fiction.length} are capstones set after {futureEvents[0]?.year}.
              </p>
            </div>
          </HudPanel>

          <HudPanel title="Continue" code="ROUTE" tone="amber">
            <nav className="space-y-2 p-4 font-mono-tech text-xs">
              <Link
                href="/agencies"
                className="block rounded-[2px] border border-[#3ee0ff]/25 px-3 py-2 text-[#3ee0ff] uppercase hover:border-[#3ee0ff] hover:bg-[#3ee0ff]/10"
              >
                → REVIEW THE TEN SERVICES
              </Link>
              <Link
                href="/recruitment"
                className="block rounded-[2px] border border-[#39ff9d]/30 px-3 py-2 text-[#39ff9d] uppercase hover:border-[#39ff9d] hover:bg-[#39ff9d]/10"
              >
                → CANDIDATE INTAKE ARG-2087
              </Link>
              <Link
                href="/portal"
                className="block rounded-[2px] border border-[#ffb454]/35 px-3 py-2 text-[#ffb454] uppercase hover:border-[#ffb454] hover:bg-[#ffb454]/10"
              >
                → REQUEST WATCHFLOOR ACCESS
              </Link>
            </nav>
          </HudPanel>
        </aside>
      </div>
    </div>
  );
}
