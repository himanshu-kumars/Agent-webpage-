"use client";

import React, { useEffect, useState } from "react";

export interface RedactedProps {
  children: string;
  forceReveal?: boolean;
}

/**
 * AEGIS // OPS GRID — Interactive Click-to-Unredact Classified Span (<Redacted />)
 * Accessible <button> with aria-pressed semantics (FR-010, FR-011).
 */
export function Redacted({ children, forceReveal = false }: RedactedProps) {
  const [revealed, setRevealed] = useState(forceReveal);

  useEffect(() => {
    setRevealed(forceReveal);
  }, [forceReveal]);

  const maskBlocks = "█".repeat(Math.min(22, Math.max(8, Math.ceil(children.length * 0.7))));

  return (
    <button
      type="button"
      aria-pressed={revealed}
      aria-label={
        revealed
          ? `Declassified span: ${children}. Click to re-mask.`
          : "Redacted intelligence span. Click or press Enter to declassify."
      }
      onClick={() => setRevealed((prev) => !prev)}
      className={`mx-1 inline-flex items-center gap-1.5 rounded-[2px] border px-1.5 py-0.5 font-mono-tech text-xs transition-all ${
        revealed
          ? "border-[#3ee0ff]/60 bg-[#3ee0ff]/15 text-[#3ee0ff]"
          : "border-[#ffb454]/40 bg-[#04070d] text-[#ffb454] hover:border-[#3ee0ff] hover:text-[#3ee0ff]"
      }`}
    >
      {revealed ? (
        <>
          <span aria-hidden="true" className="text-[10px] text-[#39ff9d]">
            [DECLASSIFIED]
          </span>
          <span className="font-semibold tracking-wide">{children}</span>
        </>
      ) : (
        <>
          <span aria-hidden="true" className="tracking-tighter select-none">
            {maskBlocks}
          </span>
          <span className="text-[10px] tracking-widest uppercase opacity-85">
            [UNREDACT]
          </span>
        </>
      )}
    </button>
  );
}
