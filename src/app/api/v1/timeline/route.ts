import { TIMELINE_EVENTS } from "@/lib/data/timeline";
import { apiOk, PUBLIC_CACHE_HEADERS } from "@/lib/api-response";

/**
 * GET /api/v1/timeline?fiction=false|true — Public history ledger (API.md, FR-005)
 * Entries with `isFiction: true` are explicitly labeled speculative 2087 capstones.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const fictionParam = url.searchParams.get("fiction");

  let rows = TIMELINE_EVENTS;
  if (fictionParam === "true") rows = rows.filter((e) => e.isFiction);
  if (fictionParam === "false") rows = rows.filter((e) => !e.isFiction);

  return apiOk(
    {
      total: rows.length,
      publicRecordCount: TIMELINE_EVENTS.filter((e) => !e.isFiction).length,
      fictionCapstoneCount: TIMELINE_EVENTS.filter((e) => e.isFiction).length,
      events: rows,
    },
    { headers: PUBLIC_CACHE_HEADERS }
  );
}
