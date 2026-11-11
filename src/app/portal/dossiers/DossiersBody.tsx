"use client";

import React, { useMemo, useState } from "react";
import {
  DOSSIERS,
  FEATURED_DOSSIERS,
  type DossierCategory,
  type DossierFile,
} from "@/lib/data/dossiers";
import { Modal } from "@/components/Modal";
import { Stamp } from "@/components/Stamp";
import { Redacted } from "@/components/Redacted";
import { EmptyState } from "@/components/EmptyState";
import { CornerBrackets } from "@/components/CornerBrackets";

type CatFilter = "ALL" | DossierCategory;

const CATEGORY_FILTERS: { id: CatFilter; label: string }[] = [
  { id: "ALL", label: "ALL SUBJECTS" },
  { id: "ARTIFACT", label: "ARTIFACT" },
  { id: "SYNDICATE", label: "SYNDICATE" },
  { id: "ORBITAL", label: "ORBITAL" },
  { id: "PERSONNEL", label: "PERSONNEL" },
];

export function DossiersBody() {
  const [category, setCategory] = useState<CatFilter>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const [revealAll, setRevealAll] = useState(false);

  const visible = useMemo(() => {
    const base = FEATURED_DOSSIERS;
    return category === "ALL" ? base : base.filter((d) => d.category === category);
  }, [category]);

  const open = openId ? DOSSIERS.find((d) => d.id === openId) ?? null : null;

  return (
    <div className="space-y-4">
      <div className="relative flex flex-wrap items-center gap-2 rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/70 p-3">
        <CornerBrackets tone="red" />
        <span className="mr-1 font-mono-tech text-[11px] tracking-[0.18em] text-[#8da4c4] uppercase">
          SUBJECT CLASS:
        </span>
        {CATEGORY_FILTERS.map((option) => {
          const active = category === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(option.id)}
              className={`rounded-[2px] border px-3 py-1.5 font-mono-tech text-xs tracking-widest uppercase ${
                active
                  ? "border-[#ff3b4e] bg-[#ff3b4e] font-bold text-[#04070d]"
                  : "border-[#3ee0ff]/30 bg-[#04070d] text-[#8da4c4] hover:border-[#ff3b4e]/70 hover:text-[#e6f1ff]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
        <span className="ml-auto font-mono-tech text-[11px] text-[#ffb454]">
          {String(visible.length).padStart(2, "0")} FEATURED // {DOSSIERS.length} HELD
        </span>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          message="No featured dossier carries this subject class. Clear the class filter to restore the eight watchfloor dossiers."
          onAction={() => setCategory("ALL")}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visible.map((dossier) => (
            <article
              key={dossier.id}
              className="relative flex flex-col overflow-hidden rounded-[2px] border border-[#ff3b4e]/30 bg-[#100b14]/80 p-3.5"
            >
              <CornerBrackets tone="red" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
                <span className="font-display text-3xl font-extrabold tracking-[0.28em] text-[#ff3b4e]">
                  FICTION
                </span>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[#3ee0ff]">
                    {dossier.code}
                  </span>
                  <Stamp
                    label={dossier.classification}
                    tone={
                      dossier.classification === "EYES ONLY"
                        ? "red"
                        : dossier.classification === "ORCON"
                        ? "amber"
                        : "cyan"
                    }
                  />
                </div>

                <h2 className="mt-2 font-display text-sm leading-snug font-bold tracking-wide text-[#e6f1ff]">
                  {dossier.title}
                </h2>
                <p className="mt-1 font-mono-tech text-[10px] tracking-wider text-[#8da4c4]">
                  {dossier.subject}
                </p>

                <div aria-hidden="true" className="mt-3 space-y-1.5">
                  <div className="h-1.5 w-full bg-[#3ee0ff]/15" />
                  <div className="h-1.5 w-10/12 bg-[#3ee0ff]/12" />
                  <div className="h-1.5 w-3/4 bg-[#ff3b4e]/30" />
                  <div className="h-1.5 w-5/6 bg-[#3ee0ff]/10" />
                </div>

                <p className="mt-2.5 line-clamp-3 flex-1 text-[11px] leading-relaxed text-[#8da4c4]">
                  {dossier.abstract}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-[#3ee0ff]/15 pt-2 font-mono-tech text-[10px]">
                  <span className="text-[#ffb454]">
                    {dossier.pages} PP // {dossier.redactionDensity}% REDACTED
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenId(dossier.id);
                      setRevealAll(false);
                    }}
                    className="rounded-[2px] border border-[#3ee0ff] bg-[#3ee0ff]/15 px-2.5 py-1 font-bold tracking-widest text-[#3ee0ff] uppercase hover:bg-[#3ee0ff] hover:text-[#04070d]"
                  >
                    READ
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal
        isOpen={Boolean(open)}
        onClose={() => setOpenId(null)}
        title={open ? open.title : ""}
        code={open?.code}
      >
        {open && <DossierReadingRoom dossier={open} revealAll={revealAll} setRevealAll={setRevealAll} />}
      </Modal>
    </div>
  );
}

function DossierReadingRoom({
  dossier,
  revealAll,
  setRevealAll,
}: {
  dossier: DossierFile;
  revealAll: boolean;
  setRevealAll: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Stamp label={`${dossier.classification} // REDACTED`} tone="red" />
        <Stamp label={dossier.category} tone="amber" />
        <Stamp label="FICTIONAL SUBJECT" tone="cyan" />
        <button
          type="button"
          aria-pressed={revealAll}
          onClick={() => setRevealAll(!revealAll)}
          className="ml-auto rounded-[2px] border border-[#39ff9d]/60 bg-[#39ff9d]/10 px-2.5 py-1 font-mono-tech text-[10px] font-bold tracking-widest text-[#39ff9d] uppercase hover:bg-[#39ff9d] hover:text-[#04070d]"
        >
          {revealAll ? "RE-REDACT ALL" : "DECLASSIFY ALL SPANS"}
        </button>
      </div>

      <dl className="grid gap-2 font-mono-tech text-[11px] sm:grid-cols-4">
        {[
          ["SUBJECT", dossier.subject],
          ["LEAD SERVICE", dossier.leadAgency],
          ["PAGES", String(dossier.pages)],
          ["UPDATED", dossier.updatedAt],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#04070d] p-2">
            <dt className="text-[9px] tracking-widest text-[#8da4c4] uppercase">{label}</dt>
            <dd className="mt-0.5 text-[#e6f1ff]">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-[2px] border border-[#3ee0ff]/20 bg-[#04070d] p-3">
        <p className="font-mono-tech text-[10px] tracking-widest text-[#3ee0ff] uppercase">
          {"// ABSTRACT"}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#e6f1ff]">{dossier.abstract}</p>
      </div>

      {dossier.sections.map((section) => (
        <section key={section.heading}>
          <h3 className="border-b border-[#ff3b4e]/30 pb-1 font-mono-tech text-[11px] tracking-[0.16em] text-[#ff3b4e] uppercase">
            {section.heading}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#e6f1ff]">
            {section.segments.map((segment, index) =>
              segment.type === "redacted" ? (
                <Redacted key={index} forceReveal={revealAll}>
                  {segment.value}
                </Redacted>
              ) : (
                <span key={index}>{segment.value}</span>
              )
            )}
          </p>
        </section>
      ))}

      <p className="rounded-[2px] border border-[#ffb454]/40 bg-[#191006]/70 p-3 font-mono-tech text-[11px] leading-relaxed text-[#e6f1ff]">
        <strong className="text-[#ffb454]">FICTION NOTICE:</strong> {dossier.subject} is an invented
        entity. Revealed spans are authored fiction — not reconstructions of real documents, and not
        derived from any classified source.
      </p>
    </div>
  );
}
