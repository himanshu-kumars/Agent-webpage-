"use client";

import React, { useState } from "react";
import { AGENCIES } from "@/lib/data/agencies";
import { OPERATIONS } from "@/lib/data/operations";

export interface SelectedGeoNode {
  id: string;
  kind: "AGENCY_HQ" | "OPERATION_NODE";
  title: string;
  subtitle: string;
  coords: string;
  status: string;
  detail: string;
}

/**
 * AEGIS // OPS GRID — Self-Contained SVG Geostationary Watchfloor Map (<GeoHud />) (FR-009)
 * Zero external map libraries or tile requests (NFR-001).
 */
export function GeoHud() {
  const defaultNode: SelectedGeoNode = {
    id: "op-glass-horizon",
    kind: "OPERATION_NODE",
    title: "OP // GLASS HORIZON",
    subtitle: "ORBITAL // LEO INCLINATION 53.2° (NSA · GCHQ)",
    coords: "58.410° N, 24.890° W",
    status: "ACTIVE // THREAT T2",
    detail:
      "Counter-interception sweep across twelve decommissioned graveyard-orbit relay satellites exhibiting unauthorized 1550nm lasercom heartbeats.",
  };

  const [selected, setSelected] = useState<SelectedGeoNode>(defaultNode);

  return (
    <div className="space-y-3">
      {/* SVG Cartography Viewport */}
      <div className="relative overflow-hidden rounded-[2px] border border-[#3ee0ff]/35 bg-[#04070d]">
        <svg
          viewBox="0 0 960 480"
          role="img"
          aria-label="AEGIS 2087 Global Geostationary Watchfloor Map showing 10 allied agency headquarters and active operation vectors"
          className="block h-auto w-full"
        >
          <defs>
            <pattern id="geoGridMinor" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#3ee0ff"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            </pattern>
            <pattern id="geoGridMajor" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 120 0 L 0 0 0 120"
                fill="none"
                stroke="#3ee0ff"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Graticule Background */}
          <rect width="960" height="480" fill="#04070d" />
          <rect width="960" height="480" fill="url(#geoGridMinor)" />
          <rect width="960" height="480" fill="url(#geoGridMajor)" />

          {/* Equator, Polar Circles & Prime Meridian */}
          <line
            x1="0"
            y1="240"
            x2="960"
            y2="240"
            stroke="#3ee0ff"
            strokeOpacity="0.32"
            strokeDasharray="6 4"
          />
          <line
            x1="0"
            y1="80"
            x2="960"
            y2="80"
            stroke="#ffb454"
            strokeOpacity="0.22"
            strokeDasharray="3 5"
          />
          <line
            x1="0"
            y1="400"
            x2="960"
            y2="400"
            stroke="#ffb454"
            strokeOpacity="0.22"
            strokeDasharray="3 5"
          />
          <line
            x1="480"
            y1="0"
            x2="480"
            y2="480"
            stroke="#3ee0ff"
            strokeOpacity="0.28"
            strokeDasharray="6 4"
          />

          {/* Stylized Continental Vector Contours (Inline SVG Cartography) */}
          <g
            fill="#0a182c"
            fillOpacity="0.72"
            stroke="#3ee0ff"
            strokeOpacity="0.38"
            strokeWidth="1.2"
          >
            {/* North America */}
            <polygon points="75,78 195,62 310,92 325,145 278,195 230,226 188,215 142,165 88,125" />
            {/* Greenland */}
            <polygon points="335,44 415,38 402,86 348,92" />
            {/* South America */}
            <polygon points="242,242 318,262 345,320 302,422 262,432 248,340" />
            {/* Europe */}
            <polygon points="438,85 548,74 576,125 542,165 452,164 432,128" />
            {/* Africa */}
            <polygon points="442,182 552,184 598,252 566,368 510,378 468,288 435,232" />
            {/* Asia */}
            <polygon points="562,74 795,68 858,132 820,226 735,252 652,240 584,185" />
            {/* Maritime SE Asia & Japan */}
            <polygon points="745,258 815,266 832,302 762,296" />
            {/* Australia / Oceania */}
            <polygon points="738,325 838,318 852,384 768,396 732,362" />
          </g>

          {/* Animated Great-Circle Quantum Mesh & Operation Arc Trails */}
          <g fill="none">
            {/* Langley <-> London <-> Berlin <-> New Delhi <-> Canberra Backbone */}
            <path
              d="M 256 168 Q 362 92 468 132"
              stroke="#3ee0ff"
              strokeWidth="1.6"
              strokeOpacity="0.75"
              className="animate-arc-flow"
            />
            <path
              d="M 468 132 Q 565 142 662 205"
              stroke="#39ff9d"
              strokeWidth="1.6"
              strokeOpacity="0.75"
              className="animate-arc-flow"
            />
            <path
              d="M 662 205 Q 742 275 792 365"
              stroke="#3ee0ff"
              strokeWidth="1.6"
              strokeOpacity="0.75"
              className="animate-arc-flow"
            />
            <path
              d="M 268 140 Q 380 48 492 58"
              stroke="#ffb454"
              strokeWidth="1.5"
              strokeOpacity="0.85"
              className="animate-arc-flow"
            />
            <path
              d="M 458 126 Q 420 96 382 112"
              stroke="#ff3b4e"
              strokeWidth="1.8"
              strokeOpacity="0.9"
              className="animate-arc-flow"
            />
            <path
              d="M 662 205 Q 685 248 695 292"
              stroke="#ff3b4e"
              strokeWidth="1.8"
              strokeOpacity="0.9"
              className="animate-arc-flow"
            />
            <path
              d="M 256 168 Q 238 226 245 285"
              stroke="#ffb454"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              className="animate-arc-flow"
            />
          </g>

          {/* 10 Allied Agency HQ Blips */}
          {AGENCIES.map((agency) => {
            const isSelected = selected.id === `hq-${agency.slug}`;
            return (
              <g
                key={agency.slug}
                onClick={() =>
                  setSelected({
                    id: `hq-${agency.slug}`,
                    kind: "AGENCY_HQ",
                    title: `${agency.code} // ${agency.hqCity.toUpperCase()}`,
                    subtitle: `${agency.fullName} (Est. ${agency.founded} — Public Record)`,
                    coords: agency.coordinatesLabel,
                    status: `UPLINK LOCKED // ${agency.category}`,
                    detail: agency.publicFacts["2087RoleNote"],
                  })
                }
                className="cursor-pointer"
              >
                <circle
                  cx={agency.mapX}
                  cy={agency.mapY}
                  r={isSelected ? 10 : 7}
                  fill="none"
                  stroke="#3ee0ff"
                  strokeOpacity={isSelected ? "0.95" : "0.45"}
                  strokeWidth="1.4"
                />
                <circle
                  cx={agency.mapX}
                  cy={agency.mapY}
                  r="4"
                  fill={isSelected ? "#39ff9d" : "#3ee0ff"}
                />
                <text
                  x={agency.mapX + 8}
                  y={agency.mapY - 6}
                  fill="#e6f1ff"
                  fontFamily="monospace"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  {agency.code}
                </text>
              </g>
            );
          })}

          {/* Active Operation Theatre Anomaly Blips */}
          {OPERATIONS.slice(0, 6).map((op) => {
            const isSelected = selected.id === op.id;
            const color =
              op.status === "ACTIVE"
                ? "#ff3b4e"
                : op.status === "DARK"
                ? "#ffb454"
                : "#39ff9d";

            return (
              <g
                key={op.id}
                onClick={() =>
                  setSelected({
                    id: op.id,
                    kind: "OPERATION_NODE",
                    title: `OP // ${op.codename}`,
                    subtitle: `${op.theatre} (${op.leadAgency})`,
                    coords: op.mapNode.label,
                    status: `${op.status} // THREAT T${op.threatLevel}`,
                    detail: op.summary,
                  })
                }
                className="cursor-pointer"
              >
                <circle
                  cx={op.mapNode.x}
                  cy={op.mapNode.y}
                  r="11"
                  fill="none"
                  stroke={color}
                  strokeWidth="1.4"
                  className="animate-blip-pulse"
                />
                <polygon
                  points={`${op.mapNode.x},${op.mapNode.y - 5} ${op.mapNode.x + 5},${op.mapNode.y} ${op.mapNode.x},${op.mapNode.y + 5} ${op.mapNode.x - 5},${op.mapNode.y}`}
                  fill={color}
                  stroke={isSelected ? "#e6f1ff" : "none"}
                  strokeWidth="1.5"
                />
                <text
                  x={op.mapNode.x + 9}
                  y={op.mapNode.y + 3}
                  fill={color}
                  fontFamily="monospace"
                  fontSize="9"
                  fontWeight="bold"
                >
                  [{op.codename}]
                </text>
              </g>
            );
          })}

          {/* Corner HUD Coordinates */}
          <g fontFamily="monospace" fontSize="10" fill="#8da4c4">
            <text x="14" y="20">
              PROJECTION: EQUIRECTANGULAR // 10 ALLIED STATIONS + 6 THEATRE ANOMALIES
            </text>
            <text x="14" y="468" fill="#39ff9d">
              CLICK ANY STATION OR ANOMALY NODE TO INSPECT TELEMETRY
            </text>
            <text x="755" y="468" fill="#ffb454">
              FICTIONAL 2087 WATCHFLOOR
            </text>
          </g>
        </svg>
      </div>

      {/* Accessible Keyboard Node Selector Buttons + Selected Node Readout */}
      <div className="rounded-[2px] border border-[#3ee0ff]/25 bg-[#070d18] p-3.5">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#3ee0ff]/15 pb-2">
          <div>
            <span className="font-mono-tech text-[11px] tracking-widest text-[#3ee0ff] uppercase">
              {selected.kind === "AGENCY_HQ" ? "STATION TELEMETRY" : "THEATRE ANOMALY LOCK"}
            </span>
            <h3 className="font-display text-sm font-bold tracking-wider text-[#e6f1ff]">
              {selected.title}
            </h3>
            <p className="font-mono-tech text-xs text-[#8da4c4]">{selected.subtitle}</p>
          </div>
          <div className="text-right font-mono-tech text-xs">
            <div className="font-bold text-[#ffb454]">{selected.status}</div>
            <div className="text-[#39ff9d]">{selected.coords}</div>
          </div>
        </div>

        <p className="mb-3 text-xs leading-relaxed text-[#e6f1ff]">{selected.detail}</p>

        {/* Keyboard-Accessible Node Quick-Jump Pills */}
        <div
          role="group"
          aria-label="Select Watchfloor Map Node"
          className="flex flex-wrap gap-1.5"
        >
          {OPERATIONS.slice(0, 4).map((op) => (
            <button
              key={op.id}
              type="button"
              aria-pressed={selected.id === op.id}
              onClick={() =>
                setSelected({
                  id: op.id,
                  kind: "OPERATION_NODE",
                  title: `OP // ${op.codename}`,
                  subtitle: `${op.theatre} (${op.leadAgency})`,
                  coords: op.mapNode.label,
                  status: `${op.status} // THREAT T${op.threatLevel}`,
                  detail: op.summary,
                })
              }
              className={`rounded-[2px] border px-2 py-0.5 font-mono-tech text-[11px] uppercase transition-colors ${
                selected.id === op.id
                  ? "border-[#ff3b4e] bg-[#ff3b4e]/20 text-[#e6f1ff]"
                  : "border-[#ff3b4e]/35 bg-[#0a1322] text-[#ffb454] hover:border-[#ff3b4e]"
              }`}
            >
              ◆ {op.codename}
            </button>
          ))}
          {AGENCIES.slice(0, 6).map((agency) => (
            <button
              key={agency.slug}
              type="button"
              aria-pressed={selected.id === `hq-${agency.slug}`}
              onClick={() =>
                setSelected({
                  id: `hq-${agency.slug}`,
                  kind: "AGENCY_HQ",
                  title: `${agency.code} // ${agency.hqCity.toUpperCase()}`,
                  subtitle: `${agency.fullName} (Est. ${agency.founded})`,
                  coords: agency.coordinatesLabel,
                  status: `UPLINK LOCKED // ${agency.category}`,
                  detail: agency.publicFacts["2087RoleNote"],
                })
              }
              className={`rounded-[2px] border px-2 py-0.5 font-mono-tech text-[11px] uppercase transition-colors ${
                selected.id === `hq-${agency.slug}`
                  ? "border-[#3ee0ff] bg-[#3ee0ff]/20 text-[#e6f1ff]"
                  : "border-[#3ee0ff]/30 bg-[#0a1322] text-[#8da4c4] hover:border-[#3ee0ff]"
              }`}
            >
              ● {agency.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
