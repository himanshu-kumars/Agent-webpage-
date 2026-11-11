import { DOSSIERS, type DossierCategory } from "@/lib/data/dossiers";
import { apiError, apiOk } from "@/lib/api-response";
import { verifyServerRequestSession } from "@/lib/session";

/**
 * GET /api/v1/dossiers?cls=&category= — Cleared dossier index (API.md, FR-011)
 * Body segments are stripped from list responses; only the abstract is exposed.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) {
    return apiError("UNAUTHORIZED", "Cleared watchfloor session required to list dossiers.");
  }

  const url = new URL(request.url);
  const cls = url.searchParams.get("cls")?.toUpperCase();
  const category = url.searchParams.get("category")?.toUpperCase();

  const clsAllowed = ["UMBRA-7", "ORCON", "EYES ONLY"];
  const catAllowed: DossierCategory[] = ["ARTIFACT", "SYNDICATE", "ORBITAL", "PERSONNEL"];

  let rows = DOSSIERS;
  if (cls && clsAllowed.includes(cls)) rows = rows.filter((d) => d.classification === cls);
  if (category && (catAllowed as string[]).includes(category)) {
    rows = rows.filter((d) => d.category === category);
  }

  return apiOk({
    total: rows.length,
    clearance: session.clearance,
    dossiers: rows.map((d) => ({
      id: d.id,
      code: d.code,
      title: d.title,
      subject: d.subject,
      category: d.category,
      classification: d.classification,
      leadAgency: d.leadAgency,
      pages: d.pages,
      redactionDensity: d.redactionDensity,
      updatedAt: d.updatedAt,
      abstract: d.abstract,
      featured: d.featured,
    })),
    fictionNotice: "All dossier subjects are fictional 2087 entities.",
  });
}
