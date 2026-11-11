"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sigil } from "./Sigil";
import { ZuluClock } from "./ZuluClock";

const PUBLIC_LINKS = [
  { href: "/", code: "01", label: "OVERVIEW" },
  { href: "/agencies", code: "02", label: "AGENCIES" },
  { href: "/history", code: "03", label: "HISTORY" },
  { href: "/recruitment", code: "04", label: "RECRUITMENT" },
];

/**
 * AEGIS // OPS GRID — Public Directorate Navigation Bar (<SiteNav />)
 */
export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#3ee0ff]/25 bg-[#04070d]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand Lockup */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-[2px] focus-visible:outline-none"
        >
          <Sigil
            size={38}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold tracking-[0.16em] text-[#e6f1ff] sm:text-base">
                AEGIS <span className="text-[#3ee0ff]">//</span> OPS GRID
              </span>
              <span className="hidden rounded-[2px] border border-[#ffb454]/40 bg-[#ffb454]/10 px-1.5 py-0.5 font-mono-tech text-[10px] tracking-widest text-[#ffb454] md:inline-block">
                2087 FICTION
              </span>
            </div>
            <p className="font-mono-tech text-[11px] tracking-[0.12em] text-[#8da4c4]">
              ALLIED TEN-AGENCY DIRECTORATE // UNOFFICIAL CONCEPT
            </p>
          </div>
        </Link>

        {/* Primary Desktop Links */}
        <nav
          aria-label="Primary Directorate Navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {PUBLIC_LINKS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-[2px] border px-3.5 py-2 font-mono-tech text-xs tracking-[0.14em] uppercase transition-all ${
                  active
                    ? "border-[#3ee0ff]/70 bg-[#3ee0ff]/15 text-[#e6f1ff] shadow-[0_0_18px_rgba(62,224,255,0.18)]"
                    : "border-transparent text-[#8da4c4] hover:border-[#3ee0ff]/30 hover:bg-[#0a1322] hover:text-[#e6f1ff]"
                }`}
              >
                <span className="mr-1.5 text-[#3ee0ff]">{item.code}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Zulu Clock + THE GATE CTA */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <ZuluClock compact />
          </div>

          <Link
            href="/portal"
            className="inline-flex items-center gap-2 rounded-[2px] border border-[#ffb454] bg-[#ffb454]/15 px-3.5 py-2 font-display text-xs font-bold tracking-[0.14em] text-[#ffb454] uppercase shadow-[0_0_20px_rgba(255,180,84,0.18)] transition-all hover:bg-[#ffb454] hover:text-[#04070d]"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-full bg-current"
            />
            THE GATE
          </Link>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="aegis-mobile-nav"
            aria-label="Toggle Directorate Menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-[2px] border border-[#3ee0ff]/40 bg-[#0a1322] px-2.5 py-2 font-mono-tech text-xs text-[#3ee0ff] lg:hidden"
          >
            {mobileOpen ? "CLOSE [X]" : "MENU [≡]"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="aegis-mobile-nav"
          className="border-t border-[#3ee0ff]/25 bg-[#070d18] px-4 py-3 lg:hidden"
        >
          <div className="mb-3 sm:hidden">
            <ZuluClock />
          </div>
          <nav
            aria-label="Mobile Directorate Navigation"
            className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          >
            {PUBLIC_LINKS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-[2px] border px-3 py-2 font-mono-tech text-xs tracking-widest uppercase ${
                    active
                      ? "border-[#3ee0ff] bg-[#3ee0ff]/15 text-[#e6f1ff]"
                      : "border-[#3ee0ff]/20 bg-[#0a1322] text-[#8da4c4]"
                  }`}
                >
                  <span className="mr-2 text-[#3ee0ff]">{item.code}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
