import React from "react";

export interface StampProps {
  label?: string;
  tone?: "red" | "amber" | "cyan" | "green";
  className?: string;
}

/**
 * AEGIS // OPS GRID — Stencil Classification Stamp (<Stamp />)
 */
export function Stamp({
  label = "TOP SECRET // UMBRA-7",
  tone = "red",
  className = "",
}: StampProps) {
  const toneClasses: Record<NonNullable<StampProps["tone"]>, string> = {
    red: "border-[#ff3b4e] text-[#ff3b4e] bg-[#ff3b4e]/10",
    amber: "border-[#ffb454] text-[#ffb454] bg-[#ffb454]/10",
    cyan: "border-[#3ee0ff] text-[#3ee0ff] bg-[#3ee0ff]/10",
    green: "border-[#39ff9d] text-[#39ff9d] bg-[#39ff9d]/10",
  };

  return (
    <span
      className={`inline-block rounded-[2px] border-2 px-2 py-0.5 font-mono-tech text-[11px] font-bold tracking-[0.18em] uppercase select-none ${toneClasses[tone]} ${className}`}
    >
      {label}
    </span>
  );
}
