"use client";

import React, { useEffect, useState } from "react";
import { formatZuluClock, SSR_ZULU_PLACEHOLDER } from "@/lib/clock";

export interface ZuluClockProps {
  compact?: boolean;
}

/**
 * AEGIS // OPS GRID — 1 Hz SSR-Safe Zulu (UTC) Clock (FR-003)
 */
export function ZuluClock({ compact = false }: ZuluClockProps) {
  const [display, setDisplay] = useState<string>(SSR_ZULU_PLACEHOLDER);
  const [doy, setDoy] = useState<string>("2087.314");

  useEffect(() => {
    const tick = () => {
      const formatted = formatZuluClock(new Date());
      setDisplay(formatted.watchfloorDisplay);
      setDoy(formatted.dayOfYear);
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      aria-label="Live Zulu UTC Chronometer"
      className="inline-flex items-center gap-2 rounded-[2px] border border-[#3ee0ff]/30 bg-[#070d18]/90 px-2.5 py-1 font-mono-tech text-xs text-[#e6f1ff]"
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-[#39ff9d]"
      />
      <span className="text-[#8da4c4]">ZULU:</span>
      <time className="tracking-wider text-[#3ee0ff]">{display}</time>
      {!compact && (
        <span className="hidden border-l border-[#3ee0ff]/25 pl-2 text-[11px] text-[#ffb454] sm:inline">
          EPOCH {doy}
        </span>
      )}
    </div>
  );
}
