import { getOperationById } from "@/lib/data/operations";
import { apiError, apiOk } from "@/lib/api-response";
import { verifyServerRequestSession } from "@/lib/session";

/**
 * GET /api/v1/operations/:id — Cleared case-file reader (API.md, FR-010)
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = verifyServerRequestSession(request);
  if (!session) {
    return apiError("UNAUTHORIZED", "Cleared watchfloor session required to read this case file.");
  }

  const { id } = await params;
  const operation = getOperationById(id.toLowerCase());

  if (!operation) {
    return apiError("NOT_FOUND", `Case file "${id}" is not indexed on this watchfloor.`);
  }

  if (operation.classification === "EYES ONLY" && session.clearance !== "UMBRA-7") {
    return apiError("FORBIDDEN", "Insufficient clearance for EYES ONLY compartment.");
  }

  return apiOk({
    ...operation,
    handledBy: session.codename,
    fictionNotice: "Fictional 2087 case file. Not a representation of any real operation.",
  });
}
