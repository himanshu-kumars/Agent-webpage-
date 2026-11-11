"use client";

import React, { useState } from "react";
import { PUBLIC_SITREP_TICKER } from "@/lib/data/intercepts";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface TickerProps {
  items?: string[];
}

/**
 * AEGIS // OPS GRID — Pausable Live SITREP Telemetry Strip (<Ticker />)
 */
export function Ticker({ items = PUBLIC_SITREP_TICKER }: TickerProps) {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const isPaused = paused || reducedMotion;

  return (
    <section
      aria-label="Live 2087 Fictional SITREP Telemetry Feed"
      className="border-y border-[#3ee0ff]/30 bg-[#070d18]/95 px-3 py-2"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-3">
        <div className="flex shrink-0 items-center gap-2 rounded-[2px] border border-[#3ee0ff]/45 bg-[#3ee0ff]/15 px-2.5 py-1 font-mono-tech text-xs font-bold tracking-widest text-[#3ee0ff] uppercase">
          <span
            aria-hidden="true"
            className={`inline-block h-2 w-2 rounded-full ${
              isPaused ? "bg-[#ffb454]" : "bg-[#39ff9d]"
            }`}
          />
          LIVE SITREP
        </div>

        <div
          aria-live="off"
          className="relative flex-1 overflow-hidden whitespace-nowrap font-mono-tech text-xs text-[#e6f1ff]"
        >
          <div
            className={`inline-flex items-center gap-10 ${
              isPaused ? "flex-wrap whitespace-normal" : "animate-ticker-scroll"
            }`}
          >
            {[...items, ...(isPaused ? [] : items)].map((headline, idx) => (
              <span key={`${idx}-${headline.slice(0, 14)}`} className="inline-flex items-center gap-2">
                <span className="text-[#ffb454]">{"//"}</span>
                <span>{headline}</span>
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
          className="shrink-0 rounded-[2px] border border-[#3ee0ff]/40 bg-[#0a1322] px-2.5 py-1 font-mono-tech text-[11px] tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
        >
          {paused ? "RESUME [▶]" : "PAUSE [‖]"}
        </button>
      </div>
    </section>
  );
}
