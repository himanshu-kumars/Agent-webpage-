import { AGENCIES, type AgencyCategory } from "@/lib/data/agencies";
import { apiOk, PUBLIC_CACHE_HEADERS } from "@/lib/api-response";

/**
 * GET /api/v1/agencies?category=HUMINT|SIGINT|FUSION — Public, cacheable (API.md)
 * Real-world founding years, HQs, and remits are public record; 2087 capabilities are fiction.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("category")?.toUpperCase();
  const allowed: AgencyCategory[] = ["HUMINT", "SIGINT", "FUSION"];
  const category =
    raw && (allowed as string[]).includes(raw) ? (raw as AgencyCategory) : undefined;

  const rows = category ? AGENCIES.filter((a) => a.category === category) : AGENCIES;

  return apiOk(
    {
      total: rows.length,
      filter: category ?? "ALL",
      agencies: rows.map((a) => ({
        slug: a.slug,
        code: a.code,
        name: a.name,
        fullName: a.fullName,
        isoCode: a.isoCode,
        founded: a.founded,
        hqCity: a.hqCity,
        hqCountry: a.hqCountry,
        remit: a.remit,
        category: a.category,
        capabilities: a.capabilities,
        coordinatesLabel: a.coordinatesLabel,
        fictionNotice: "2087 capability ratings are speculative fiction.",
      })),
      disclaimer:
        "Unofficial fan concept. Agency facts are cited from public record; 2087 coalition data is fiction.",
    },
    { headers: PUBLIC_CACHE_HEADERS }
  );
}
