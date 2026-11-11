import { apiError, apiOk } from "@/lib/api-response";
import { verifyServerRequestSession } from "@/lib/session";

/**
 * GET /api/v1/session — Current watchfloor session or 401 (API.md)
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) {
    return apiError("UNAUTHORIZED", "No valid UMBRA-7 watchfloor session present.");
  }

  return apiOk({
    sessionId: session.sessionId,
    codename: session.codename,
    clearance: session.clearance,
    expiresAt: session.expiresAt,
    watchfloor: "AEGIS // OPS GRID — 2087 (FICTION)",
  });
}
