import { apiOk } from "@/lib/api-response";

/**
 * GET /api/v1/health — Liveness probe (API.md)
 * Public, uncached, zero external dependency.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk({
    status: "NOMINAL",
    service: "aegis-ops-grid",
    build: process.env.NEXT_PUBLIC_AEGIS_BUILD_ID || "AEGIS-2087.314-OMEGA",
    mode: process.env.AEGIS_MODE === "production" ? "PRODUCTION_REFERENCE" : "DEMO",
    zulu: new Date().toISOString(),
    disclaimer: "Unofficial fan concept. All 2087 operations, dossiers and intercepts are fiction.",
  });
}
