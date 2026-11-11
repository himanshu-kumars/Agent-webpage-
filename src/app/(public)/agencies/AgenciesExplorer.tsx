"use client";

import React, { useMemo, useState } from "react";
import type { AgencyCategory, AgencyProfile } from "@/lib/data/agencies";
import { RadarCard } from "@/components/RadarCard";
import { EmptyState } from "@/components/EmptyState";
import { CornerBrackets } from "@/components/CornerBrackets";

type Filter = "ALL" | AgencyCategory;

const FILTERS: { id: Filter; label: string; note: string }[] = [
  { id: "ALL", label: "ALL SERVICES", note: "10 CHARTERS" },
  { id: "HUMINT", label: "HUMINT", note: "HUMAN INTELLIGENCE" },
  { id: "SIGINT", label: "SIGINT", note: "SIGNALS INTELLIGENCE" },
  { id: "FUSION", label: "FUSION", note: "ALL-SOURCE / TECHNICAL" },
];

export function AgenciesExplorer({ agencies }: { agencies: AgencyProfile[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agencies.filter((agency) => {
      const matchesFilter = filter === "ALL" || agency.category === filter;
      const matchesQuery =
        q.length === 0 ||
        agency.code.toLowerCase().includes(q) ||
        agency.fullName.toLowerCase().includes(q) ||
        agency.hqCity.toLowerCase().includes(q) ||
        agency.hqCountry.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [agencies, filter, query]);

  return (
    <div>
      {/* Filter Rail */}
      <div className="relative mb-6 rounded-[2px] border border-[#3ee0ff]/25 bg-[#0a1322]/70 p-3">
        <CornerBrackets tone="cyan" />
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono-tech text-[11px] tracking-[0.18em] text-[#8da4c4] uppercase">
            CAPABILITY FILTER:
          </span>
          {FILTERS.map((option) => {
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.id)}
                className={`rounded-[2px] border px-3 py-1.5 font-mono-tech text-xs tracking-widest uppercase transition-colors ${
                  active
                    ? "border-[#3ee0ff] bg-[#3ee0ff] font-bold text-[#04070d]"
                    : "border-[#3ee0ff]/30 bg-[#04070d] text-[#8da4c4] hover:border-[#3ee0ff]/70 hover:text-[#e6f1ff]"
                }`}
              >
                {option.label}
              </button>
            );
          })}

          <span className="mx-1 hidden h-5 w-px bg-[#3ee0ff]/25 sm:block" />

          <label className="flex flex-1 items-center gap-2">
            <span className="sr-only">Search allied services by code, name or headquarters</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="QUERY: CODE / HQ CITY / COUNTRY"
              className="w-full min-w-0 rounded-[2px] border border-[#3ee0ff]/30 bg-[#04070d] px-3 py-1.5 font-mono-tech text-xs tracking-wider text-[#e6f1ff] uppercase placeholder:text-[#8da4c4]/60 focus:border-[#3ee0ff] focus:outline-none"
            />
          </label>

          <span className="font-mono-tech text-[11px] tracking-widest text-[#39ff9d]">
            {String(visible.length).padStart(2, "0")} MATCH
          </span>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          message="No allied service matches this capability class and query string. Clear the filter to restore the full ten-service directory."
          onAction={() => {
            setFilter("ALL");
            setQuery("");
          }}
        />
      ) : (
        <div className="grid gap-4">
          {visible.map((agency) => (
            <div key={agency.slug} id={agency.slug} className="scroll-mt-28">
              <RadarCard agency={agency} showExpandedFacts />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
