import { NextResponse } from "next/server";

/**
 * AEGIS // OPS GRID — Standardized `/api/v1` JSON Envelope Helpers (API.md §Envelope)
 * Every response is strictly `{ ok: boolean, data?: T, error?: { code, message } }`.
 */

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "VALIDATION"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL";

export const ERROR_STATUS: Record<ApiErrorCode, number> = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  VALIDATION: 422,
  RATE_LIMITED: 429,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL: 500,
};

export const PUBLIC_CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
} as const;

export const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0, must-revalidate",
} as const;

export function apiOk<T>(
  data: T,
  init?: { status?: number; headers?: Record<string, string> }
): NextResponse {
  return NextResponse.json(
    { ok: true, data },
    {
      status: init?.status ?? 200,
      headers: { ...NO_STORE_HEADERS, ...(init?.headers ?? {}) },
    }
  );
}

export function apiError(
  code: ApiErrorCode,
  message: string,
  init?: { headers?: Record<string, string> }
): NextResponse {
  return NextResponse.json(
    { ok: false, error: { code, message } },
    {
      status: ERROR_STATUS[code],
      headers: { ...NO_STORE_HEADERS, ...(init?.headers ?? {}) },
    }
  );
}

/** Extracts the caller key (session id or anonymised origin) for token-bucket limits. */
export function callerKey(request: Request, salt = "anon"): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || salt;
  const token =
    request.headers.get("x-aegis-session") ||
    (request.headers.get("cookie") || "").split(";").find((p) => p.trim().startsWith("aegis_session="));
  return `${salt}:${token || ip}`;
}
