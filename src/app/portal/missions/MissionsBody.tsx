"use client";

import React, { useMemo, useState } from "react";
import { OPERATIONS, type OperationCaseFile, type OperationStatus } from "@/lib/data/operations";
import { HudPanel } from "@/components/HudPanel";
import { Modal } from "@/components/Modal";
import { Stamp } from "@/components/Stamp";
import { DecryptText } from "@/components/DecryptText";
import { Redacted } from "@/components/Redacted";
import { EmptyState } from "@/components/EmptyState";
import { CornerBrackets } from "@/components/CornerBrackets";

type Filter = "ALL" | OperationStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "ALL", label: "ALL CASE FILES" },
  { id: "ACTIVE", label: "ACTIVE" },
  { id: "STANDBY", label: "STANDBY" },
  { id: "DARK", label: "DARK" },
];

export function MissionsBody() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "ALL" ? OPERATIONS : OPERATIONS.filter((op) => op.status === filter)),
    [filter]
  );

  const open = openId ? OPERATIONS.find((op) => op.id === openId) ?? null : null;

  return (
    <div className="space-y-4">
      <div className="relative flex flex-wrap items-center gap-2 rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/70 p-3">
        <CornerBrackets tone="cyan" />
        <span className="mr-1 font-mono-tech text-[11px] tracking-[0.18em] text-[#8da4c4] uppercase">
          STATUS FILTER:
        </span>
        {FILTERS.map((option) => {
          const count =
            option.id === "ALL"
              ? OPERATIONS.length
              : OPERATIONS.filter((op) => op.status === option.id).length;
          const active = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.id)}
              className={`rounded-[2px] border px-3 py-1.5 font-mono-tech text-xs tracking-widest uppercase ${
                active
                  ? "border-[#3ee0ff] bg-[#3ee0ff] font-bold text-[#04070d]"
                  : "border-[#3ee0ff]/30 bg-[#04070d] text-[#8da4c4] hover:border-[#3ee0ff]/70 hover:text-[#e6f1ff]"
              }`}
            >
              {option.label} [{String(count).padStart(2, "0")}]
            </button>
          );
        })}
        <span className="ml-auto font-mono-tech text-[11px] text-[#ffb454]">
          ALL RECORDS ARE FICTIONAL 2087 SCENARIOS
        </span>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          message="No case file currently holds this status on the watchfloor. Switch the filter to ALL to review every indexed operation."
          onAction={() => setFilter("ALL")}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((op) => (
            <article
              key={op.id}
              className="relative flex flex-col rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/85 p-4"
            >
              <CornerBrackets
                tone={op.status === "ACTIVE" ? "red" : op.status === "STANDBY" ? "amber" : "cyan"}
              />

              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[#8da4c4] uppercase">
                    {op.id}
                  </p>
                  <h2 className="mt-0.5 font-display text-base font-bold tracking-[0.08em] text-[#e6f1ff]">
                    OP // {op.codename}
                  </h2>
                </div>
                <span
                  className={`rounded-[2px] border px-1.5 py-0.5 font-mono-tech text-[10px] font-bold tracking-widest ${
                    op.status === "ACTIVE"
                      ? "border-[#39ff9d]/60 bg-[#39ff9d]/10 text-[#39ff9d]"
                      : op.status === "STANDBY"
                      ? "border-[#ffb454]/60 bg-[#ffb454]/10 text-[#ffb454]"
                      : "border-[#8da4c4]/50 bg-[#8da4c4]/10 text-[#8da4c4]"
                  }`}
                >
                  {op.status}
                </span>
              </div>

              <p className="mt-2 font-mono-tech text-[11px] tracking-wider text-[#3ee0ff]">
                {op.theatre}
              </p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-[#8da4c4]">{op.summary}</p>

              <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-[#3ee0ff]/15 pt-2.5 font-mono-tech text-[10px]">
                <div>
                  <dt className="tracking-widest text-[#8da4c4] uppercase">LEAD</dt>
                  <dd className="text-[#e6f1ff]">{op.leadAgency}</dd>
                </div>
                <div>
                  <dt className="tracking-widest text-[#8da4c4] uppercase">THREAT / CLS</dt>
                  <dd className="text-[#ffb454]">
                    T{op.threatLevel} // {op.classification}
                  </dd>
                </div>
              </dl>

              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="font-mono-tech text-[10px] text-[#8da4c4]">
                  {op.assets.length} ASSETS // OPENED {op.startedAt.slice(0, 10)}
                </span>
                <button
                  type="button"
                  onClick={() => setOpenId(op.id)}
                  className="rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/15 px-3 py-1.5 font-mono-tech text-[11px] font-bold tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
                >
                  OPEN FILE
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal
        isOpen={Boolean(open)}
        onClose={() => setOpenId(null)}
        title={open ? `OP // ${open.codename}` : ""}
        code={open?.id}
      >
        {open && <CaseFile op={open} />}
      </Modal>
    </div>
  );
}

function CaseFile({ op }: { op: OperationCaseFile }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Stamp label={`TOP SECRET // ${op.classification}`} tone="red" />
        <Stamp label={`THREAT T${op.threatLevel}`} tone={op.threatLevel <= 2 ? "red" : "amber"} />
        <Stamp label="FICTION // 2087" tone="cyan" />
      </div>

      <dl className="grid gap-2 font-mono-tech text-[11px] sm:grid-cols-3">
        {[
          ["THEATRE", op.theatre],
          ["LEAD FORMATION", op.leadAgency],
          ["STATUS", op.status],
          ["OPENED (ZULU)", op.startedAt],
          ["AGENCY SLUG", op.agencySlug.toUpperCase()],
          ["MAP NODE", op.mapNode.label],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#04070d] p-2">
            <dt className="text-[9px] tracking-widest text-[#8da4c4] uppercase">{label}</dt>
            <dd className="mt-0.5 text-[#e6f1ff]">{value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h3 className="font-mono-tech text-[11px] tracking-[0.18em] text-[#3ee0ff] uppercase">
          {"// BRIEFING — CLICK ANY REDACTED SPAN TO DECLASSIFY"}
        </h3>
        <div className="mt-2 rounded-[2px] border border-[#3ee0ff]/25 bg-[#04070d] p-3.5 text-sm leading-relaxed text-[#e6f1ff]">
          {op.briefingSegments.map((segment, index) =>
            segment.type === "redacted" ? (
              <Redacted key={index}>{segment.value}</Redacted>
            ) : (
              <span key={index}>{segment.value}</span>
            )
          )}
        </div>
        <p className="mt-1.5 font-mono-tech text-[10px] text-[#8da4c4]">
          Declassified spans are fabricated for this demo. Nothing revealed here describes a real
          operation, source, or capability.
        </p>
      </section>

      <section>
        <h3 className="font-mono-tech text-[11px] tracking-[0.18em] text-[#3ee0ff] uppercase">
          {"// ASSET ROSTER"}
        </h3>
        <ul className="mt-2 divide-y divide-[#3ee0ff]/10 rounded-[2px] border border-[#3ee0ff]/20">
          {op.assets.map((asset) => (
            <li
              key={asset.callsign}
              className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 font-mono-tech text-[11px]"
            >
              <span className="font-bold text-[#39ff9d]">{asset.callsign}</span>
              <span className="text-[#e6f1ff]">{asset.role}</span>
              <span className="text-[#8da4c4]">{asset.agency}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-mono-tech text-[11px] tracking-[0.18em] text-[#3ee0ff] uppercase">
          {"// TELEMETRY LOG"}
        </h3>
        <ul className="mt-2 space-y-1 rounded-[2px] border border-[#3ee0ff]/20 bg-[#04070d] p-3 font-mono-tech text-[11px] text-[#39ff9d]">
          {op.telemetryLog.map((line) => (
            <li key={line}>
              <DecryptText text={line} durationMs={700} />
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-[2px] border border-[#ffb454]/40 bg-[#191006]/70 p-3 font-mono-tech text-[11px] leading-relaxed text-[#e6f1ff]">
        <strong className="text-[#ffb454]">FICTION NOTICE:</strong> {op.codename} is an invented
        scenario authored for an unofficial fan concept. It is not a description of any real
        intelligence activity, and it contains no operational tradecraft.
      </div>
    </div>
  );
}
