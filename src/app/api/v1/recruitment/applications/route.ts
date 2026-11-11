import { NextResponse } from "next/server";
import { RecruitmentApplicationSchema } from "@/lib/schemas";
import { apiError } from "@/lib/api-response";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateCandidateSerial } from "@/lib/data/aptitude";

/**
 * POST /api/v1/recruitment/applications — Candidate intake (API.md, FR-006)
 * Returns a 201 with an `ARG-2087-XXXX` candidate serial. In DEMO mode the
 * application is held in a bounded in-memory ring; PRODUCTION REFERENCE writes
 * to `applications` with the contact string AES-256-GCM encrypted at rest.
 */
export const dynamic = "force-dynamic";

interface StoredApplication {
  serial: string;
  codename: string;
  specialty: string;
  receivedAt: string;
  status: "RECEIVED";
}

const RECENT_APPLICATIONS: StoredApplication[] = [];
const MAX_IN_MEMORY_APPLICATIONS = 200;

export async function POST(request: Request) {
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = checkRateLimit(`recruit:${clientIp}`, 10, 60_000);
  if (!limit.allowed) {
    return apiError("RATE_LIMITED", "Intake throttle engaged. 10 submissions per minute.", {
      headers: { "Retry-After": String(limit.retryAfterSeconds) },
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiError("VALIDATION", "Request body must be valid JSON.");
  }

  const parsed = RecruitmentApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return apiError("VALIDATION", issue?.message ?? "Application failed schema validation.");
  }

  const serial = generateCandidateSerial(parsed.data.codename);
  const receivedAt = new Date().toISOString();

  RECENT_APPLICATIONS.unshift({
    serial,
    codename: parsed.data.codename.trim().toUpperCase(),
    specialty: parsed.data.specialty,
    receivedAt,
    status: "RECEIVED",
  });
  if (RECENT_APPLICATIONS.length > MAX_IN_MEMORY_APPLICATIONS) {
    RECENT_APPLICATIONS.length = MAX_IN_MEMORY_APPLICATIONS;
  }

  return NextResponse.json(
    {
      ok: true,
      data: {
        serial,
        codename: parsed.data.codename.trim().toUpperCase(),
        specialty: parsed.data.specialty,
        status: "RECEIVED",
        receivedAt,
        nextStage: "STAGE 02 // CRYPTOGRAPHIC SCREEN — T+14 DAYS",
        contactHandling:
          "Relay handle stored encrypted at rest (AES-256-GCM) in PRODUCTION REFERENCE mode; discarded after 12 months.",
        notice:
          "This is an unofficial fan simulation. No real intelligence service will contact you, and no real vacancy exists.",
      },
    },
    { status: 201, headers: { "Cache-Control": "no-store" } }
  );
}
