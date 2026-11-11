import React from "react";
import Link from "next/link";
import { ClassifiedBanner } from "./ClassifiedBanner";
import { CornerBrackets } from "./CornerBrackets";
import { Sigil } from "./Sigil";

/**
 * AEGIS // OPS GRID — Custom 404 Telemetry Loss Screen (<NotFound />) (FR-014)
 */
export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#04070d]">
      <ClassifiedBanner variant="public" position="top" />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="relative w-full rounded-[2px] border border-[#ff3b4e]/50 bg-[#0a1322]/95 p-8 shadow-[0_0_40px_rgba(255,59,78,0.18)] sm:p-12">
          <CornerBrackets tone="red" />

          <div className="mb-5 flex justify-center">
            <Sigil size={64} />
          </div>

          <p className="font-mono-tech text-xs font-bold tracking-[0.22em] text-[#ff3b4e] uppercase">
            ERR_404 // SIGNAL LOCK: 0.00% // DEAD RECKONING FAILED
          </p>

          <h1 className="mt-3 font-display text-2xl font-extrabold tracking-[0.14em] text-[#e6f1ff] uppercase sm:text-4xl">
            YOU ARE OFF THE MAP
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#8da4c4]">
            The requested geostationary sector or dossier coordinate does not exist in the 2087
            AEGIS Directorate index. Re-establish telemetry uplink via one of the verified routing
            vectors below.
          </p>

          <div className="mt-6 rounded-[2px] border border-[#3ee0ff]/20 bg-[#04070d] p-3 font-mono-tech text-xs text-[#3ee0ff]">
            AZIMUTH: NULL // EPHEMERIS: UNCHARTED // FALLBACK VECTOR: READY
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/15 px-5 py-2.5 font-display text-xs font-bold tracking-[0.15em] text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
            >
              RETURN TO PUBLIC DIRECTORATE (/)
            </Link>
            <Link
              href="/portal/dashboard"
              className="rounded-[2px] border border-[#ffb454] bg-[#ffb454]/15 px-5 py-2.5 font-display text-xs font-bold tracking-[0.15em] text-[#ffb454] uppercase hover:bg-[#ffb454] hover:text-[#04070d]"
            >
              WATCHFLOOR CONSOLE (/PORTAL)
            </Link>
          </div>
        </div>
      </main>

      <ClassifiedBanner variant="public" position="bottom" />
    </div>
  );
}
