"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWatchfloorSession } from "@/hooks/useSession";
import { ClassifiedBanner } from "./ClassifiedBanner";
import { ZuluClock } from "./ZuluClock";
import { Sigil } from "./Sigil";
import { PowerOn } from "./PowerOn";

const CONSOLE_NAV_ITEMS = [
  { href: "/portal/dashboard", code: "01", label: "WATCHFLOOR", badge: "GEO-HUD" },
  { href: "/portal/missions", code: "02", label: "MISSIONS", badge: "08 OPS" },
  { href: "/portal/dossiers", code: "03", label: "DOSSIERS", badge: "08 FILES" },
  { href: "/portal/comms", code: "04", label: "COMMS STREAM", badge: "LIVE SSE" },
  { href: "/portal/vault", code: "05", label: "FIELD VAULT", badge: "AES-GCM" },
];

export interface ConsoleShellProps {
  title: string;
  subtitle: string;
  code: string;
  children: React.ReactNode;
}

/**
 * AEGIS // OPS GRID — Cleared Watchfloor Console Guard & Responsive Frame (<ConsoleShell />)
 * Enforces FR-008 (/portal/* guard) and NFR-007 (sidebar on desktop -> top command strip at 768px/mobile).
 */
export function ConsoleShell({ title, subtitle, code, children }: ConsoleShellProps) {
  const pathname = usePathname();
  const { session, checked, isAuthenticated, purge } = useWatchfloorSession({
    requireAuth: true,
  });

  if (!checked || !isAuthenticated || !session) {
    return (
      <div className="flex min-h-screen flex-col justify-between bg-[#04070d]">
        <ClassifiedBanner variant="console" position="top" />
        <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 text-center">
          <Sigil size={52} />
          <p className="mt-4 font-mono-tech text-xs tracking-[0.2em] text-[#ffb454] uppercase">
            WATCHFLOOR GUARD // VERIFYING UMBRA-7 SESSION TOKEN...
          </p>
          <p className="mt-2 text-xs text-[#8da4c4]">
            Unauthenticated requests to /portal/* are automatically redirected to THE GATE (/portal).
          </p>
          <Link
            href="/portal"
            className="mt-5 rounded-[2px] border border-[#ffb454] bg-[#ffb454]/15 px-4 py-2 font-mono-tech text-xs font-bold tracking-widest text-[#ffb454] uppercase hover:bg-[#ffb454] hover:text-[#04070d]"
          >
            AUTHENTICATE AT THE GATE (/PORTAL)
          </Link>
        </main>
        <ClassifiedBanner variant="console" position="bottom" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#04070d]">
      <ClassifiedBanner variant="console" position="top" />

      {/* Console Top Telemetry Strip */}
      <header className="sticky top-0 z-40 border-b border-[#3ee0ff]/25 bg-[#070d18]/95 px-4 py-2.5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/portal/dashboard" className="flex items-center gap-2.5">
              <Sigil size={32} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xs font-bold tracking-[0.16em] text-[#e6f1ff] sm:text-sm">
                    AEGIS // WATCHFLOOR CONSOLE
                  </span>
                  <span className="rounded-[2px] border border-[#ff3b4e]/60 bg-[#ff3b4e]/15 px-1.5 py-0.5 font-mono-tech text-[10px] font-bold tracking-widest text-[#ff3b4e]">
                    T2 // SEVERE
                  </span>
                </div>
                <p className="font-mono-tech text-[11px] text-[#8da4c4]">
                  OPERATIVE: <strong className="text-[#3ee0ff]">{session.codename}</strong> {"//"}{" "}
                  CLEARANCE: <strong className="text-[#ffb454]">{session.clearance}</strong>
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <ZuluClock compact />

            <Link
              href="/"
              className="rounded-[2px] border border-[#3ee0ff]/35 bg-[#0a1322] px-2.5 py-1 font-mono-tech text-xs text-[#8da4c4] uppercase hover:border-[#3ee0ff] hover:text-[#e6f1ff]"
            >
              PUBLIC SITE [/]
            </Link>

            <button
              type="button"
              onClick={purge}
              className="rounded-[2px] border border-[#ff3b4e] bg-[#ff3b4e]/15 px-3 py-1 font-mono-tech text-xs font-bold tracking-widest text-[#ff3b4e] uppercase transition-colors hover:bg-[#ff3b4e] hover:text-[#04070d]"
            >
              PURGE SESSION
            </button>
          </div>
        </div>

        {/* Tablet & Mobile Horizontal Command Strip (< 1024px, including 768px per NFR-007) */}
        <nav
          aria-label="Watchfloor Console Mobile and Tablet Navigation"
          className="mt-2.5 flex gap-1.5 overflow-x-auto border-t border-[#3ee0ff]/15 pt-2.5 lg:hidden"
        >
          {CONSOLE_NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-[2px] border px-3 py-1.5 font-mono-tech text-xs tracking-wider uppercase ${
                  active
                    ? "border-[#3ee0ff] bg-[#3ee0ff]/20 font-bold text-[#e6f1ff]"
                    : "border-[#3ee0ff]/20 bg-[#0a1322] text-[#8da4c4]"
                }`}
              >
                <span className="mr-1 text-[#3ee0ff]">{item.code}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Main Console Body: Sidebar (>= 1024px) + Content Area */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-1">
        {/* Desktop 5-Item Tactical Sidebar */}
        <aside
          aria-label="Watchfloor Console Primary Sidebar"
          className="hidden w-64 shrink-0 flex-col justify-between border-r border-[#3ee0ff]/20 bg-[#070d18]/85 p-4 lg:flex"
        >
          <div className="space-y-4">
            <div className="rounded-[2px] border border-[#ffb454]/30 bg-[#0a1322] p-3 font-mono-tech text-xs">
              <div className="text-[10px] tracking-widest text-[#ffb454] uppercase">
                ACTIVE WATCH SHIFT
              </div>
              <div className="mt-1 font-bold text-[#e6f1ff]">{session.codename}</div>
              <div className="mt-0.5 text-[11px] text-[#39ff9d]">
                TOKEN: {session.sessionId.slice(0, 18)}...
              </div>
            </div>

            <nav aria-label="Console Modules" className="space-y-1.5">
              {CONSOLE_NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-[2px] border px-3 py-2.5 font-mono-tech text-xs tracking-wider uppercase transition-all ${
                      active
                        ? "border-[#3ee0ff] bg-[#3ee0ff]/15 font-bold text-[#e6f1ff] shadow-[0_0_16px_rgba(62,224,255,0.16)]"
                        : "border-[#3ee0ff]/15 bg-[#0a1322]/60 text-[#8da4c4] hover:border-[#3ee0ff]/45 hover:text-[#e6f1ff]"
                    }`}
                  >
                    <span>
                      <span className="mr-2 text-[#3ee0ff]">{item.code}</span>
                      {item.label}
                    </span>
                    <span className="rounded-[2px] border border-current/30 px-1.5 py-0.5 text-[10px] text-[#ffb454]">
                      {item.badge}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 border-t border-[#3ee0ff]/15 pt-4 font-mono-tech text-[11px] text-[#8da4c4]">
            <div className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#04070d] p-2.5">
              <p className="font-bold text-[#ffb454]">FICTION DISCLAIMER</p>
              <p className="mt-1 leading-snug">
                Unofficial 2087 fan simulation. All operations, dossiers, and intercepts are
                fictional.
              </p>
            </div>
            <button
              type="button"
              onClick={purge}
              className="w-full rounded-[2px] border border-[#ff3b4e]/60 bg-[#ff3b4e]/10 py-2 font-bold tracking-widest text-[#ff3b4e] uppercase hover:bg-[#ff3b4e] hover:text-[#04070d]"
            >
              PURGE WATCHFLOOR SESSION
            </button>
          </div>
        </aside>

        {/* Console Workspace */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <PowerOn>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#3ee0ff]/20 pb-4">
              <div>
                <span className="font-mono-tech text-xs tracking-[0.18em] text-[#3ee0ff] uppercase">
                  {code} // FICTIONAL 2087 WATCHFLOOR
                </span>
                <h1 className="mt-1 font-display text-xl font-extrabold tracking-[0.12em] text-[#e6f1ff] uppercase sm:text-2xl">
                  {title}
                </h1>
                <p className="mt-0.5 text-sm text-[#8da4c4]">{subtitle}</p>
              </div>
              <div className="font-mono-tech text-xs text-[#39ff9d]">
                ENCRYPTION: AES-256-GCM READY // ZERO EXTERNAL REQUESTS
              </div>
            </div>

            {children}
          </PowerOn>
        </main>
      </div>

      <ClassifiedBanner variant="console" position="bottom" />
    </div>
  );
}
