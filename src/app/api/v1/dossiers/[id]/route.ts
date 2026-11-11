import { getDossierById } from "@/lib/data/dossiers";
import { apiError, apiOk } from "@/lib/api-response";
import { verifyServerRequestSession } from "@/lib/session";

/**
 * GET /api/v1/dossiers/:id — Full redaction-heavy dossier document (API.md, FR-011)
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = verifyServerRequestSession(request);
  if (!session) {
    return apiError("UNAUTHORIZED", "Cleared watchfloor session required to read this dossier.");
  }

  const { id } = await params;
  const dossier = getDossierById(id.toLowerCase());

  if (!dossier) {
    return apiError("NOT_FOUND", `Dossier "${id}" is not held in the AEGIS index.`);
  }

  return apiOk({
    ...dossier,
    handledBy: session.codename,
    redactionPolicy:
      "Segments typed `redacted` are fabricated 2087 artifacts. Click-to-unredact reveals fiction only.",
  });
}
