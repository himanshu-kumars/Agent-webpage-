"use client";

import React from "react";
import { CornerBrackets } from "./CornerBrackets";

export interface ToastProps {
  message: string | null;
  tone?: "cyan" | "amber" | "red" | "green";
  onDismiss?: () => void;
}

/**
 * AEGIS // OPS GRID — Tactical Status Notification Banner (<Toast />)
 */
export function Toast({ message, tone = "cyan", onDismiss }: ToastProps) {
  if (!message) return null;

  const toneStyle: Record<NonNullable<ToastProps["tone"]>, string> = {
    cyan: "border-[#3ee0ff] bg-[#070d18]/95 text-[#3ee0ff]",
    amber: "border-[#ffb454] bg-[#191006]/95 text-[#ffb454]",
    red: "border-[#ff3b4e] bg-[#1a080b]/95 text-[#ff3b4e]",
    green: "border-[#39ff9d] bg-[#061810]/95 text-[#39ff9d]",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-4 bottom-10 z-50 flex max-w-md items-center justify-between gap-4 rounded-[2px] border px-4 py-3 font-mono-tech text-xs shadow-lg ${toneStyle[tone]}`}
    >
      <CornerBrackets tone={tone} />
      <span>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="rounded-[2px] border border-current/40 px-2 py-0.5 text-[10px] uppercase hover:bg-current/15"
        >
          [OK]
        </button>
      )}
    </div>
  );
}
