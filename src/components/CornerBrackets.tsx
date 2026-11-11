import React from "react";

export interface CornerBracketsProps {
  tone?: "cyan" | "amber" | "red" | "green";
}

/**
 * AEGIS // OPS GRID — 4-Corner Tactical Registration Marks (<CornerBrackets />)
 */
export function CornerBrackets({ tone = "cyan" }: CornerBracketsProps) {
  const colorMap: Record<NonNullable<CornerBracketsProps["tone"]>, string> = {
    cyan: "border-[#3ee0ff]",
    amber: "border-[#ffb454]",
    red: "border-[#ff3b4e]",
    green: "border-[#39ff9d]",
  };

  const borderClass = colorMap[tone];

  return (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 ${borderClass}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 ${borderClass}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 ${borderClass}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 ${borderClass}`}
      />
    </>
  );
}
