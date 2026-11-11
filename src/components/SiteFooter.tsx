import React from "react";
import Link from "next/link";
import { Sigil } from "./Sigil";

/**
 * AEGIS // OPS GRID — Mandatory Public & Gate Legal Disclaimer Footer (FR-015)
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-[#3ee0ff]/25 bg-[#04070d] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-8 border-b border-[#3ee0ff]/15 pb-8 lg:grid-cols-12">
          {/* Brand + Non-Negotiable Disclaimer */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center gap-3">
              <Sigil size={30} />
              <span className="font-display text-sm font-bold tracking-[0.16em] text-[#e6f1ff]">
                AEGIS // OPS GRID — SPECULATIVE 2087 ARCHIVE
              </span>
            </div>
            <div className="rounded-[2px] border border-[#ffb454]/35 bg-[#0a1322]/90 p-3.5 text-xs leading-relaxed text-[#e6f1ff]">
              <p className="mb-1 font-mono-tech text-[11px] font-bold tracking-widest text-[#ffb454] uppercase">
                MANDATORY LEGAL &amp; FACTUAL SAFETY NOTICE (UNOFFICIAL FAN CONCEPT)
              </p>
              <p className="text-[#8da4c4]">
                <strong className="text-[#e6f1ff]">AEGIS // OPS GRID</strong> is an independent,
                unofficial speculative design and software engineering showcase set in the fictional
                year <strong className="text-[#3ee0ff]">2087</strong>. It is{" "}
                <strong className="text-[#e6f1ff]">
                  not affiliated with, endorsed by, sponsored by, or representative of
                </strong>{" "}
                the CIA, MI6/SIS, R&amp;AW, GCHQ, NSA, Mossad, BND, DGSE, ASIS, CSIS, or any
                government or intelligence authority. Real-agency founding dates, headquarters, and
                statutory remits cite publicly available record only; all 2087 treaties, operations,
                agents, dossiers, intercepts, and threat indices are{" "}
                <strong className="text-[#ffb454]">100% works of fiction</strong>.
              </p>
            </div>
          </div>

          {/* Route Links */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="mb-2.5 font-mono-tech text-xs font-bold tracking-widest text-[#3ee0ff] uppercase">
                PUBLIC DIRECTORATE
              </h3>
              <ul className="space-y-1.5 font-mono-tech text-xs text-[#8da4c4]">
                <li>
                  <Link href="/" className="hover:text-[#3ee0ff]">
                    01 // OVERVIEW
                  </Link>
                </li>
                <li>
                  <Link href="/agencies" className="hover:text-[#3ee0ff]">
                    02 // 10 AGENCIES
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="hover:text-[#3ee0ff]">
                    03 // 1909–2087 TIMELINE
                  </Link>
                </li>
                <li>
                  <Link href="/recruitment" className="hover:text-[#3ee0ff]">
                    04 // RECRUITMENT
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2.5 font-mono-tech text-xs font-bold tracking-widest text-[#ffb454] uppercase">
                CLEARED CONSOLE
              </h3>
              <ul className="space-y-1.5 font-mono-tech text-xs text-[#8da4c4]">
                <li>
                  <Link href="/portal" className="hover:text-[#ffb454]">
                    THE GATE // LOGIN
                  </Link>
                </li>
                <li>
                  <Link href="/portal/dashboard" className="hover:text-[#ffb454]">
                    WATCHFLOOR GEO-HUD
                  </Link>
                </li>
                <li>
                  <Link href="/portal/missions" className="hover:text-[#ffb454]">
                    CASE FILES
                  </Link>
                </li>
                <li>
                  <Link href="/portal/dossiers" className="hover:text-[#ffb454]">
                    DOSSIER ARCHIVE
                  </Link>
                </li>
                <li>
                  <Link href="/portal/comms" className="hover:text-[#ffb454]">
                    LIVE INTERCEPTS
                  </Link>
                </li>
                <li>
                  <Link href="/portal/vault" className="hover:text-[#ffb454]">
                    AES-GCM VAULT
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="mb-2.5 font-mono-tech text-xs font-bold tracking-widest text-[#39ff9d] uppercase">
                RUNTIME POSTURE
              </h3>
              <ul className="space-y-1.5 font-mono-tech text-[11px] text-[#8da4c4]">
                <li>EXTERNAL CDNs: ZERO</li>
                <li>FONTS: LOCAL WOFF2</li>
                <li>VAULT: AES-256-GCM</li>
                <li>A11Y: WCAG 2.2 AA</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-[#8da4c4]">
          <span>
            BUILD: {process.env.NEXT_PUBLIC_AEGIS_BUILD_ID || "AEGIS-2087.314-OMEGA"} // OBSIDIAN PARALLAX
          </span>
          <span>MIT LICENSE // FAN WORK — NO GOVERNMENT ENDORSEMENT</span>
        </div>
      </div>
    </footer>
  );
}
