import React from "react";
import { CornerBrackets, type CornerBracketsProps } from "./CornerBrackets";

export interface HudPanelProps {
  title?: string;
  code?: string;
  tone?: CornerBracketsProps["tone"];
  className?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * AEGIS // OPS GRID — Framed Obsidian Tactical Container (<HudPanel />)
 */
export function HudPanel({
  title,
  code,
  tone = "cyan",
  className = "",
  headerRight,
  children,
}: HudPanelProps) {
  const borderMap: Record<NonNullable<CornerBracketsProps["tone"]>, string> = {
    cyan: "border-[#3ee0ff]/25",
    amber: "border-[#ffb454]/30",
    red: "border-[#ff3b4e]/35",
    green: "border-[#39ff9d]/30",
  };

  const accentTextMap: Record<NonNullable<CornerBracketsProps["tone"]>, string> = {
    cyan: "text-[#3ee0ff]",
    amber: "text-[#ffb454]",
    red: "text-[#ff3b4e]",
    green: "text-[#39ff9d]",
  };

  return (
    <section
      className={`relative rounded-[2px] border bg-[#0a1322]/90 backdrop-blur-sm ${borderMap[tone]} ${className}`}
    >
      <CornerBrackets tone={tone} />
      {(title || code || headerRight) && (
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3ee0ff]/15 bg-[#070d18]/80 px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            {code && (
              <span
                className={`rounded-[2px] border border-current/30 px-1.5 py-0.5 font-mono-tech text-[11px] tracking-widest uppercase ${accentTextMap[tone]}`}
              >
                {code}
              </span>
            )}
            {title && (
              <h2 className="font-display text-xs font-bold tracking-[0.12em] text-[#e6f1ff] uppercase sm:text-sm">
                {title}
              </h2>
            )}
          </div>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </header>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}
