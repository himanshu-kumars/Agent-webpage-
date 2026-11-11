"use client";

import React, { useEffect, useRef } from "react";
import { CornerBrackets } from "./CornerBrackets";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code?: string;
  children: React.ReactNode;
}

/**
 * AEGIS // OPS GRID — Accessible Focus-Trapped Reader Dialog (<Modal />) (FR-010, FR-011, NFR-002)
 */
export function Modal({ isOpen, onClose, title, code, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move initial keyboard focus into the close button inside the dialog
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 10);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="aegis-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#04070d]/85 backdrop-blur-md"
      />

      {/* Dialog Surface */}
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col rounded-[2px] border border-[#3ee0ff]/55 bg-[#0a1322] shadow-[0_0_45px_rgba(62,224,255,0.22)]"
      >
        <CornerBrackets tone="cyan" />

        {/* Header */}
        <header className="flex items-center justify-between gap-3 border-b border-[#3ee0ff]/25 bg-[#070d18] px-5 py-3.5">
          <div>
            {code && (
              <span className="font-mono-tech text-[11px] tracking-widest text-[#ffb454] uppercase">
                {code} // FICTIONAL 2087 RECORD
              </span>
            )}
            <h2
              id="aegis-modal-title"
              className="font-display text-sm font-bold tracking-[0.12em] text-[#e6f1ff] uppercase sm:text-base"
            >
              {title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close document reader modal (Escape)"
            className="rounded-[2px] border border-[#3ee0ff]/45 bg-[#0a1322] px-3 py-1.5 font-mono-tech text-xs font-bold tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
          >
            CLOSE [ESC]
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
