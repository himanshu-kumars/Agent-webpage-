import React from "react";
import type { AgencyProfile } from "@/lib/data/agencies";
import { CornerBrackets } from "./CornerBrackets";
import { Stamp } from "./Stamp";

export interface RadarCardProps {
  agency: AgencyProfile;
  showExpandedFacts?: boolean;
}

/**
 * Computes SVG polygon points for a 5-axis capability radar chart.
 */
function buildRadarPoints(values: number[], cx = 75, cy = 75, maxRadius = 52): string {
  return values
    .map((val, idx) => {
      const angle = (Math.PI * 2 * idx) / values.length - Math.PI / 2;
      const r = (Math.max(10, Math.min(100, val)) / 100) * maxRadius;
      const x = (cx + r * Math.cos(angle)).toFixed(1);
      const y = (cy + r * Math.sin(angle)).toFixed(1);
      return `${x},${y}`;
    })
    .join(" ");
}

/**
 * AEGIS // OPS GRID — Agency Public-Record Profile + SVG Polar Radar (<RadarCard />)
 */
export function RadarCard({ agency, showExpandedFacts = true }: RadarCardProps) {
  const axes = [
    { label: "HUMINT", value: agency.capabilities.humint },
    { label: "SIGINT", value: agency.capabilities.sigint },
    { label: "CYBER", value: agency.capabilities.cyber },
    { label: "ORBITAL", value: agency.capabilities.orbital },
    { label: "FUSION", value: agency.capabilities.fusion },
  ];

  const polygonPoints = buildRadarPoints(axes.map((a) => a.value));
  const outerRingPoints = buildRadarPoints([100, 100, 100, 100, 100]);
  const midRingPoints = buildRadarPoints([65, 65, 65, 65, 65]);

  return (
    <article className="relative flex flex-col justify-between rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/90 p-5 transition-colors hover:border-[#3ee0ff]/55">
      <CornerBrackets tone="cyan" />

      <div>
        {/* Card Header */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2 border-b border-[#3ee0ff]/15 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-[2px] border border-[#3ee0ff]/40 bg-[#3ee0ff]/10 px-1.5 py-0.5 font-mono-tech text-xs font-bold text-[#3ee0ff]">
                {agency.isoCode}
              </span>
              <h3 className="font-display text-lg font-bold tracking-[0.12em] text-[#e6f1ff]">
                {agency.code}
              </h3>
            </div>
            <p className="mt-0.5 text-sm font-semibold text-[#8da4c4]">{agency.fullName}</p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Stamp
              label={agency.category}
              tone={
                agency.category === "SIGINT"
                  ? "cyan"
                  : agency.category === "FUSION"
                  ? "amber"
                  : "green"
              }
            />
            <span className="font-mono-tech text-[11px] text-[#39ff9d]">
              [PUBLIC RECORD VERIFIED]
            </span>
          </div>
        </div>

        {/* Public Record Metadata Grid */}
        <dl className="mb-4 grid grid-cols-2 gap-2 rounded-[2px] border border-[#3ee0ff]/15 bg-[#070d18] p-3 font-mono-tech text-xs">
          <div>
            <dt className="text-[10px] text-[#8da4c4] uppercase">EST. YEAR (PUBLIC RECORD)</dt>
            <dd className="font-bold text-[#e6f1ff]">{agency.founded}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-[#8da4c4] uppercase">HEADQUARTERS</dt>
            <dd className="font-bold text-[#3ee0ff]">
              {agency.hqCity}, {agency.hqCountry}
            </dd>
          </div>
          <div className="col-span-2 border-t border-[#3ee0ff]/10 pt-1.5">
            <dt className="text-[10px] text-[#8da4c4] uppercase">GEODETIC VECTOR</dt>
            <dd className="text-[#ffb454]">{agency.coordinatesLabel}</dd>
          </div>
        </dl>

        {/* Remit */}
        <p className="mb-4 text-sm leading-relaxed text-[#e6f1ff]">{agency.remit}</p>

        {/* Capability Bars + SVG Polar Radar */}
        <div className="grid grid-cols-1 items-center gap-4 border-t border-[#3ee0ff]/15 pt-4 sm:grid-cols-12">
          <div className="space-y-2 sm:col-span-7">
            <p className="font-mono-tech text-[11px] tracking-widest text-[#8da4c4] uppercase">
              2087 COALITION CAPABILITY INDEX [FICTION]
            </p>
            {axes.slice(0, 4).map((axis) => (
              <div key={axis.label}>
                <div className="mb-0.5 flex justify-between font-mono-tech text-xs">
                  <span className="text-[#8da4c4]">{axis.label}</span>
                  <span className="text-[#3ee0ff]">{axis.value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-[1px] bg-[#04070d]">
                  <div
                    className="h-full bg-gradient-to-r from-[#3ee0ff] to-[#39ff9d]"
                    style={{ width: `${axis.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center sm:col-span-5">
            <svg
              width="150"
              height="150"
              viewBox="0 0 150 150"
              role="img"
              aria-label={`${agency.code} 5-axis capability radar chart`}
              className="overflow-visible"
            >
              <polygon
                points={outerRingPoints}
                fill="#04070d"
                stroke="#3ee0ff"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
              <polygon
                points={midRingPoints}
                fill="none"
                stroke="#3ee0ff"
                strokeOpacity="0.2"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <line x1="75" y1="23" x2="75" y2="127" stroke="#3ee0ff" strokeOpacity="0.2" />
              <line x1="25" y1="75" x2="125" y2="75" stroke="#3ee0ff" strokeOpacity="0.2" />
              <polygon
                points={polygonPoints}
                fill="#3ee0ff"
                fillOpacity="0.24"
                stroke="#3ee0ff"
                strokeWidth="1.8"
              />
              <text x="75" y="15" textAnchor="middle" fill="#8da4c4" fontSize="8" fontFamily="monospace">
                HUMINT
              </text>
              <text x="135" y="58" textAnchor="start" fill="#8da4c4" fontSize="8" fontFamily="monospace">
                SIGINT
              </text>
              <text x="115" y="138" textAnchor="middle" fill="#8da4c4" fontSize="8" fontFamily="monospace">
                CYBER
              </text>
              <text x="35" y="138" textAnchor="middle" fill="#8da4c4" fontSize="8" fontFamily="monospace">
                ORBITAL
              </text>
              <text x="15" y="58" textAnchor="end" fill="#8da4c4" fontSize="8" fontFamily="monospace">
                FUSION
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded Public Record Footnotes */}
      {showExpandedFacts && (
        <div className="mt-4 space-y-1.5 border-t border-[#3ee0ff]/15 pt-3 text-xs text-[#8da4c4]">
          <p>
            <strong className="font-mono-tech text-[#e6f1ff]">STATUTORY ORIGIN:</strong>{" "}
            {agency.publicFacts.enablingActOrOrigin}
          </p>
          <p>
            <strong className="font-mono-tech text-[#e6f1ff]">HQ RECORD:</strong>{" "}
            {agency.publicFacts.historicalHeadquartersNote}
          </p>
          <p className="text-[#ffb454]">{agency.publicFacts["2087RoleNote"]}</p>
        </div>
      )}
    </article>
  );
}
