import { getAgencyBySlug } from "@/lib/data/agencies";
import { apiError, apiOk, PUBLIC_CACHE_HEADERS } from "@/lib/api-response";

/**
 * GET /api/v1/agencies/:id — Single agency dossier profile (API.md)
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = getAgencyBySlug(id.toLowerCase());

  if (!agency) {
    return apiError("NOT_FOUND", `No allied agency registered under slug "${id}".`);
  }

  return apiOk(
    {
      ...agency,
      disclaimer:
        "Agency charter facts are public record. All 2087 alliance roles and capability ratings are fiction.",
    },
    { headers: PUBLIC_CACHE_HEADERS }
  );
}
