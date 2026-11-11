"use client";

import React from "react";

export type ThreatLevelCode = 1 | 2 | 3 | 4 | 5;

export interface ThreatGaugeProps {
  level: ThreatLevelCode;
  onChangeLevel?: (next: ThreatLevelCode) => void;
}

const THREAT_META: Record<
  ThreatLevelCode,
  {
    code: string;
    label: string;
    color: string;
    angleDeg: number; // -72 deg (left T5) to +72 deg (right T1)
    directive: string;
  }
> = {
  5: {
    code: "T5",
    label: "NOMINAL // BASELINE WATCH",
    color: "#39ff9d",
    angleDeg: -72,
    directive: "Standard orbital & terrestrial telemetry polling. Passive QKD rotation every 60m.",
  },
  4: {
    code: "T4",
    label: "ELEVATED // SECTOR VIGILANCE",
    color: "#3ee0ff",
    angleDeg: -36,
    directive: "Increased synthetic-aperture radar passes over polar and maritime cable corridors.",
  },
  3: {
    code: "T3",
    label: "SUBSTANTIAL // ACTIVE INTERDICTION",
    color: "#ffb454",
    angleDeg: 0,
    directive: "Cross-directorate fusion cells active; decoy quantum entropy injection authorized.",
  },
  2: {
    code: "T2",
    label: "SEVERE // ORBITAL LOCK",
    color: "#ff7b3b",
    angleDeg: 36,
    directive: "Continuous 1550nm phase-tracking on graveyard slots; deep-benthic gliders at standoff.",
  },
  1: {
    code: "T1",
    label: "CRITICAL // MAXIMUM READINESS",
    color: "#ff3b4e",
    angleDeg: 72,
    directive: "EMCON-ALPHA enforced across dark cells; ten-agency concordat emergency quorum active.",
  },
};

/**
 * AEGIS // OPS GRID — SVG Semicircular Threat Condition Gauge (<ThreatGauge />) (FR-009)
 */
export function ThreatGauge({ level, onChangeLevel }: ThreatGaugeProps) {
  const current = THREAT_META[level];
  const levels: ThreatLevelCode[] = [5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col items-center">
      <svg
        width="260"
        height="155"
        viewBox="0 0 260 155"
        role="img"
        aria-label={`Threat Condition Gauge set to ${current.code}: ${current.label}`}
        className="overflow-visible"
      >
        {/* Background Arc Track */}
        <path
          d="M 30 130 A 100 100 0 0 1 230 130"
          fill="none"
          stroke="#101f36"
          strokeWidth="16"
          strokeLinecap="butt"
        />

        {/* 5 Segmented Threat Sectors (T5 Left -> T1 Right) */}
        <path
          d="M 30 130 A 100 100 0 0 1 50 70"
          fill="none"
          stroke="#39ff9d"
          strokeWidth="12"
          strokeOpacity={level === 5 ? "1" : "0.35"}
        />
        <path
          d="M 53 66 A 100 100 0 0 1 96 36"
          fill="none"
          stroke="#3ee0ff"
          strokeWidth="12"
          strokeOpacity={level === 4 ? "1" : "0.35"}
        />
        <path
          d="M 101 34 A 100 100 0 0 1 159 34"
          fill="none"
          stroke="#ffb454"
          strokeWidth="12"
          strokeOpacity={level === 3 ? "1" : "0.35"}
        />
        <path
          d="M 164 36 A 100 100 0 0 1 207 66"
          fill="none"
          stroke="#ff7b3b"
          strokeWidth="12"
          strokeOpacity={level === 2 ? "1" : "0.35"}
        />
        <path
          d="M 210 70 A 100 100 0 0 1 230 130"
          fill="none"
          stroke="#ff3b4e"
          strokeWidth="12"
          strokeOpacity={level === 1 ? "1" : "0.35"}
        />

        {/* Sector Labels */}
        <g fontFamily="monospace" fontSize="10" fontWeight="bold">
          <text x="14" y="102" fill="#39ff9d">
            T5
          </text>
          <text x="58" y="42" fill="#3ee0ff">
            T4
          </text>
          <text x="123" y="20" fill="#ffb454">
            T3
          </text>
          <text x="190" y="42" fill="#ff7b3b">
            T2
          </text>
          <text x="235" y="102" fill="#ff3b4e">
            T1
          </text>
        </g>

        {/* Needle Pivot Group */}
        <g transform={`translate(130, 130) rotate(${current.angleDeg})`}>
          <polygon points="-4,0 0,-84 4,0" fill={current.color} />
          <circle cx="0" cy="0" r="9" fill="#04070d" stroke={current.color} strokeWidth="2.5" />
        </g>

        {/* Center Readout */}
        <text
          x="130"
          y="150"
          textAnchor="middle"
          fill={current.color}
          fontFamily="monospace"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="1.5"
        >
          CONDITION {current.code}
        </text>
      </svg>

      <div className="mt-2 w-full rounded-[2px] border border-[#3ee0ff]/20 bg-[#070d18] p-3 text-center">
        <p
          className="font-display text-xs font-bold tracking-widest uppercase"
          style={{ color: current.color }}
        >
          {current.label}
        </p>
        <p className="mt-1 text-xs text-[#8da4c4]">{current.directive}</p>
      </div>

      {onChangeLevel && (
        <div
          role="group"
          aria-label="Simulate Watchfloor Threat Condition Level"
          className="mt-3 grid w-full grid-cols-5 gap-1.5"
        >
          {levels.map((lvl) => {
            const meta = THREAT_META[lvl];
            const active = lvl === level;
            return (
              <button
                key={lvl}
                type="button"
                aria-pressed={active}
                onClick={() => onChangeLevel(lvl)}
                className={`rounded-[2px] border py-1 font-mono-tech text-xs font-bold transition-all ${
                  active
                    ? "border-[#e6f1ff] bg-[#101f36] text-[#e6f1ff]"
                    : "border-[#3ee0ff]/25 bg-[#04070d] text-[#8da4c4] hover:border-[#3ee0ff]"
                }`}
              >
                {meta.code}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
