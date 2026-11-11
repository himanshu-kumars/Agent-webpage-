import { OPERATIONS, type OperationStatus } from "@/lib/data/operations";
import { apiError, apiOk } from "@/lib/api-response";
import { verifyServerRequestSession } from "@/lib/session";

/**
 * GET /api/v1/operations?status=&theatre= — Cleared case-file index (API.md, FR-010)
 * Requires a valid UMBRA-7 watchfloor session.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) {
    return apiError("UNAUTHORIZED", "Cleared watchfloor session required to list operations.");
  }

  const url = new URL(request.url);
  const statusParam = url.searchParams.get("status")?.toUpperCase();
  const theatreParam = url.searchParams.get("theatre")?.toLowerCase();

  const allowed: OperationStatus[] = ["ACTIVE", "STANDBY", "DARK"];
  let rows = OPERATIONS;

  if (statusParam && (allowed as string[]).includes(statusParam)) {
    rows = rows.filter((op) => op.status === (statusParam as OperationStatus));
  }
  if (theatreParam) {
    rows = rows.filter((op) => op.theatre.toLowerCase().includes(theatreParam));
  }

  return apiOk({
    total: rows.length,
    filter: { status: statusParam ?? "ALL", theatre: theatreParam ?? "ALL" },
    clearance: session.clearance,
    operations: rows,
    fictionNotice:
      "Every operation, callsign, and briefing below is fabricated 2087 fiction. No real operation is described.",
  });
}
