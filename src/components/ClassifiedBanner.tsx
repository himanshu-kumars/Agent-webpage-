import React from "react";

/**
 * AEGIS // OPS GRID — Persistent Classified & Legal Disclaimer Banner (FR-002, FR-015)
 * Appears at top and bottom of every route; text varies between Public Surface and Cleared Console.
 */

export interface ClassifiedBannerProps {
  variant?: "public" | "console";
  position?: "top" | "bottom";
}

export function ClassifiedBanner({
  variant = "public",
  position = "top",
}: ClassifiedBannerProps) {
  const isConsole = variant === "console";

  return (
    <div
      role="region"
      aria-label={`Classification and Disclaimer Banner (${position})`}
      className={`w-full select-none border-y px-3 py-1.5 text-center font-mono-tech text-[11px] tracking-[0.14em] uppercase transition-colors ${
        isConsole
          ? "border-[#ffb454]/45 bg-[#190c08]/95 text-[#ffb454]"
          : "border-[#3ee0ff]/35 bg-[#050b14]/95 text-[#3ee0ff]"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 font-semibold">
          <span
            aria-hidden="true"
            className={`inline-block h-2 w-2 rounded-full ${
              isConsole ? "bg-[#ff3b4e]" : "bg-[#39ff9d]"
            }`}
          />
          {isConsole
            ? "TOP SECRET // AEGIS-UMBRA-7 // CLEARED 2087 WATCHFLOOR SIMULATION"
            : "UNCLASSIFIED // PUBLIC DIRECTORATE ARCHIVE // EPOCH 2087.314"}
        </span>

        <span className="text-[#e6f1ff]/90">
          UNOFFICIAL FAN CONCEPT — NOT AFFILIATED WITH ANY GOVERNMENT OR AGENCY — ALL 2087 OPS &amp; INTERCEPTS ARE FICTION
        </span>

        <span className="hidden text-[#8da4c4] xl:inline">
          {isConsole
            ? "DEMO MODE // ZERO EXTERNAL RUNTIME REQUESTS"
            : "HISTORICAL PROFILES: PUBLIC RECORD (1909–2026)"}
        </span>
      </div>
    </div>
  );
}
