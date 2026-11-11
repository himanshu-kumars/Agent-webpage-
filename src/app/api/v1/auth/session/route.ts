import { NextResponse } from "next/server";
import { AuthSessionRequestSchema } from "@/lib/schemas";
import { apiError, apiOk } from "@/lib/api-response";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  DEFAULT_SESSION_TTL_SECONDS,
  SESSION_COOKIE_NAME,
  createSessionEnvelope,
  deleteServerSession,
  verifyServerRequestSession,
} from "@/lib/session";

/**
 * POST /api/v1/auth/session — THE GATE credential exchange (FR-007, API.md)
 * DEMO MODE: shape-validated credentials (>=3 char codename, >=8 char passphrase).
 * PRODUCTION REFERENCE: argon2id verification against `users.pass_hash`.
 * Rate limited to 5 attempts / minute / client (SECURITY.md).
 */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = checkRateLimit(`auth:${clientIp}`, 5, 60_000);
  if (!limit.allowed) {
    return apiError("RATE_LIMITED", "Watchfloor gate throttled. 5 attempts per minute.", {
      headers: { "Retry-After": String(limit.retryAfterSeconds) },
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiError("VALIDATION", "Request body must be valid JSON.");
  }

  const parsed = AuthSessionRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return apiError(
      "VALIDATION",
      parsed.error.issues[0]?.message ?? "Credential shape rejected by gate validator."
    );
  }

  const ttl = Number(process.env.AEGIS_SESSION_TTL_SECONDS || DEFAULT_SESSION_TTL_SECONDS);
  const session = createSessionEnvelope(
    parsed.data.codename,
    Number.isFinite(ttl) && ttl > 0 ? ttl : DEFAULT_SESSION_TTL_SECONDS
  );

  const response = NextResponse.json(
    {
      ok: true,
      data: {
        sessionId: session.sessionId,
        codename: session.codename,
        clearance: session.clearance,
        expiresAt: session.expiresAt,
        mode: "DEMO — NOT REAL SECURITY",
      },
    },
    {
      status: 201,
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "X-Aegis-Session": session.sessionId,
      },
    }
  );

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: session.sessionId,
    httpOnly: false, // Demo mode mirrors the token into sessionStorage; prod uses httpOnly+Secure.
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ttl > 0 ? ttl : DEFAULT_SESSION_TTL_SECONDS,
  });

  return response;
}

/**
 * DELETE /api/v1/auth/session — Purge / crypto-shred the active watchfloor session.
 */
export async function DELETE(request: Request) {
  const session = verifyServerRequestSession(request);
  deleteServerSession(session?.sessionId);

  const response = NextResponse.json(
    { ok: true, data: { purged: true, at: new Date().toISOString() } },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  return response;
}
