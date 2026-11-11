"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { OPERATIONS } from "@/lib/data/operations";
import { AGENCIES } from "@/lib/data/agencies";
import { DOSSIERS } from "@/lib/data/dossiers";
import { generateInterceptByIndex, type InterceptFrame } from "@/lib/data/intercepts";
import { GeoHud } from "@/components/GeoHud";
import { ThreatGauge, type ThreatLevelCode } from "@/components/ThreatGauge";
import { HudPanel } from "@/components/HudPanel";
import { Stamp } from "@/components/Stamp";
import { Ticker } from "@/components/Ticker";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PUBLIC_SITREP_TICKER } from "@/lib/data/intercepts";
import { getClientSession } from "@/lib/session";

const THREAT_NAMES: Record<ThreatLevelCode, string> = {
  5: "MINIMAL",
  4: "GUARDED",
  3: "ELEVATED",
  2: "SEVERE",
  1: "CRITICAL",
};

export function DashboardBody() {
  const reducedMotion = useReducedMotion();
  const [codename, setCodename] = useState("UMBRA-EYES");
  const [level, setLevel] = useState<ThreatLevelCode>(2);
  const [feed, setFeed] = useState<InterceptFrame[]>(() =>
    [0, 1, 2, 3].map((index) => generateInterceptByIndex(index))
  );

  useEffect(() => {
    setCodename(getClientSession()?.codename ?? "UMBRA-EYES");
  }, []);

  const activeOps = OPERATIONS.filter((op) => op.status === "ACTIVE");
  const trackedAssets = OPERATIONS.reduce((sum, op) => sum + op.assets.length, 0);
  const openDossiers = DOSSIERS.length;
  const interceptVolume = 1847 + (new Date().getUTCHours() % 7) * 12;

  useEffect(() => {
    if (reducedMotion) return;
    let index = feed.length;
    const timer = window.setInterval(() => {
      const next = generateInterceptByIndex(index, new Date().toISOString());
      index += 1;
      setFeed((prev) => [next, ...prev].slice(0, 5));
    }, 4200);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const kpis = [
    { label: "ACTIVE OPERATIONS", value: String(activeOps.length).padStart(2, "0"), tone: "cyan", note: "OF 08 INDEXED" },
    { label: "TRACKED ASSETS", value: String(trackedAssets).padStart(2, "0"), tone: "green", note: "ACROSS 10 SERVICES" },
    { label: "24H INTERCEPTS", value: interceptVolume.toLocaleString("en-US"), tone: "amber", note: "SYNTHETIC TRUNK" },
    { label: "THREAT CONDITION", value: `T${level}`, tone: level <= 2 ? "red" : "amber", note: THREAT_NAMES[level] },
  ];

  return (
    <div className="space-y-5">
      <Ticker items={PUBLIC_SITREP_TICKER} />

      {/* KPI STRIP */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="relative rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/85 p-3.5"
          >
            <CornerBracketsInline tone={kpi.tone as "cyan" | "green" | "amber" | "red"} />
            <p className="font-mono-tech text-[10px] tracking-[0.16em] text-[#8da4c4] uppercase">
              {kpi.label}
            </p>
            <p
              className={`mt-1 font-display text-2xl font-extrabold tracking-wider ${
                kpi.tone === "red"
                  ? "text-[#ff3b4e]"
                  : kpi.tone === "amber"
                  ? "text-[#ffb454]"
                  : kpi.tone === "green"
                  ? "text-[#39ff9d]"
                  : "text-[#3ee0ff]"
              }`}
            >
              {kpi.value}
            </p>
            <p className="mt-0.5 font-mono-tech text-[10px] tracking-wider text-[#8da4c4]/80">
              {kpi.note}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        {/* MAP + GAUGE */}
        <div className="space-y-5 xl:col-span-8">
          <HudPanel
            title="Geostationary Watchfloor"
            code="GEO-HUD // SVG"
            headerRight={
              <span className="font-mono-tech text-[10px] tracking-wider text-[#39ff9d]">
                SELF-AUTHORED CARTOGRAPHY // 0 TILE REQUESTS
              </span>
            }
          >
            <div className="p-3">
              <GeoHud />
            </div>
          </HudPanel>

          <div className="grid gap-5 md:grid-cols-12">
            <div className="md:col-span-7">
              <HudPanel title="Threat Condition" code="T5 → T1" tone={level <= 2 ? "red" : "amber"}>
                <div className="p-3">
                  <ThreatGauge level={level} onChangeLevel={setLevel} />
                  <p className="mt-2 border-t border-[#3ee0ff]/15 pt-2 font-mono-tech text-[10px] leading-relaxed text-[#8da4c4]">
                    Threat condition is a scripted narrative dial. It changes nothing outside this
                    screen and reflects no real-world assessment.
                  </p>
                </div>
              </HudPanel>
            </div>

            <div className="md:col-span-5">
              <HudPanel title="Coalition Load" code="TEN CHARTERS" tone="cyan">
                <ul className="divide-y divide-[#3ee0ff]/10">
                  {AGENCIES.slice(0, 5).map((agency) => {
                    const ops = OPERATIONS.filter((op) => op.agencySlug === agency.slug).length;
                    return (
                      <li key={agency.slug} className="flex items-center justify-between px-3.5 py-2">
                        <span className="font-mono-tech text-xs text-[#e6f1ff]">{agency.code}</span>
                        <span className="font-mono-tech text-[11px] text-[#8da4c4]">
                          {agency.category}
                        </span>
                        <span
                          className={`font-mono-tech text-xs ${
                            ops > 0 ? "text-[#39ff9d]" : "text-[#8da4c4]/60"
                          }`}
                        >
                          {String(ops).padStart(2, "0")} OPS
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-[#3ee0ff]/15 px-3.5 py-2 font-mono-tech text-[10px] text-[#8da4c4]">
                  {openDossiers} dossiers held // {DOSSIERS.filter((d) => d.classification === "EYES ONLY").length} EYES ONLY
                </div>
              </HudPanel>
            </div>
          </div>
        </div>

        {/* SIDE COLUMN */}
        <div className="space-y-5 xl:col-span-4">
          <HudPanel title="Top Active Case Files" code="PRIORITY 04" tone="amber">
            <ul className="divide-y divide-[#3ee0ff]/12">
              {activeOps.slice(0, 4).map((op) => (
                <li key={op.id} className="px-3.5 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-xs font-bold tracking-wider text-[#e6f1ff]">
                      {op.codename}
                    </span>
                    <Stamp
                      label={`T${op.threatLevel}`}
                      tone={op.threatLevel <= 2 ? "red" : "amber"}
                    />
                  </div>
                  <p className="mt-1 font-mono-tech text-[10px] tracking-wider text-[#8da4c4]">
                    {op.leadAgency}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[#8da4c4]">
                    {op.summary}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/portal/missions"
              className="block border-t border-[#3ee0ff]/20 bg-[#070d18] px-3.5 py-2.5 font-mono-tech text-[11px] tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff]/10"
            >
              OPEN MISSIONS INDEX →
            </Link>
          </HudPanel>

          <HudPanel
            title="Intercept Trunk — Live"
            code="SIGINT // FICTION"
            headerRight={<span className="font-mono-tech text-[10px] text-[#39ff9d]">200 SEED FRAMES</span>}
          >
            <ul aria-live="off" className="divide-y divide-[#3ee0ff]/10">
              {feed.map((frame) => (
                <li key={frame.id} className="px-3.5 py-2.5">
                  <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] tracking-wider">
                    <span className="text-[#3ee0ff]">{frame.channel}</span>
                    <span
                      className={
                        frame.classification === "FLASH"
                          ? "text-[#ff3b4e]"
                          : frame.classification === "IMMEDIATE"
                          ? "text-[#ffb454]"
                          : "text-[#8da4c4]"
                      }
                    >
                      {frame.classification}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#8da4c4]">
                    {frame.body}
                  </p>
                  <p className="mt-0.5 font-mono-tech text-[10px] text-[#8da4c4]/60">
                    {frame.origin} → {frame.destination}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/portal/comms"
              className="block border-t border-[#3ee0ff]/20 bg-[#070d18] px-3.5 py-2.5 font-mono-tech text-[11px] tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff]/10"
            >
              OPEN FULL STREAM →
            </Link>
          </HudPanel>

          <div className="rounded-[2px] border border-[#ffb454]/35 bg-[#191006]/60 p-3.5 font-mono-tech text-[11px] leading-relaxed text-[#8da4c4]">
            <p className="font-bold tracking-widest text-[#ffb454] uppercase">OPERATOR {codename}</p>
            <p className="mt-1">
              Shift handover is at 06:00Z. Everything on this watchfloor — every codename, coordinate
              and intercept — is authored fiction for an unofficial fan concept.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Minimal inline bracket markers (avoids importing a client component into a loop needlessly). */
function CornerBracketsInline({ tone }: { tone: "cyan" | "green" | "amber" | "red" }) {
  const color =
    tone === "green"
      ? "border-[#39ff9d]"
      : tone === "amber"
      ? "border-[#ffb454]"
      : tone === "red"
      ? "border-[#ff3b4e]"
      : "border-[#3ee0ff]";
  return (
    <span aria-hidden="true">
      <span className={`absolute top-0 left-0 h-2 w-2 border-t border-l ${color}`} />
      <span className={`absolute top-0 right-0 h-2 w-2 border-t border-r ${color}`} />
      <span className={`absolute bottom-0 left-0 h-2 w-2 border-b border-l ${color}`} />
      <span className={`absolute right-0 bottom-0 h-2 w-2 border-b border-r ${color}`} />
    </span>
  );
}
