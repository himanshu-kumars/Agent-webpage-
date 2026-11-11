import React from "react";
import { CornerBrackets } from "./CornerBrackets";

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * AEGIS // OPS GRID — Radar-Sweep Zero-Match Filter Recovery Panel (<EmptyState />)
 */
export function EmptyState({
  title = "ZERO TELEMETRY RECORDS MATCH CURRENT FILTER",
  message = "No active records match the selected classification or theatre constraint.",
  actionLabel = "RESET FILTER PARAMETERS",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="relative rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/80 p-8 text-center">
      <CornerBrackets tone="amber" />
      <p className="font-mono-tech text-xs tracking-widest text-[#ffb454] uppercase">
        {"// QUERY RETURNED 0 ROWS //"}
      </p>
      <h3 className="mt-2 font-display text-base font-bold tracking-[0.12em] text-[#e6f1ff] uppercase">
        {title}
      </h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-[#8da4c4]">{message}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/15 px-4 py-2 font-mono-tech text-xs font-bold tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
