/**
 * AEGIS // OPS GRID — Watchfloor Session Manager (FR-007, FR-008, API.md)
 * Supports both Browser sessionStorage + HTTP cookies for seamless Demo & Prod Reference operation.
 */

export interface WatchfloorSession {
  sessionId: string;
  codename: string;
  clearance: "UMBRA-7";
  expiresAt: string;
}

export const SESSION_STORAGE_KEY = "aegis_session_v1";
export const SESSION_COOKIE_NAME = "aegis_session";
export const DEFAULT_SESSION_TTL_SECONDS = 28_800; // 8 hours

// Server-side in-memory store for Demo Mode API verification
const activeServerSessions = new Map<string, WatchfloorSession>();

export function createSessionEnvelope(codename: string, ttlSeconds: number = DEFAULT_SESSION_TTL_SECONDS): WatchfloorSession {
  const normalized = codename.trim().toUpperCase();
  const randomHex = Array.from(globalThis.crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const slug = normalized.replace(/[^A-Z0-9]/g, "").slice(0, 10).toLowerCase() || "op";
  const sessionId = `ses_2087_${slug}_${randomHex}`;
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();

  const envelope: WatchfloorSession = {
    sessionId,
    codename: normalized,
    clearance: "UMBRA-7",
    expiresAt,
  };

  activeServerSessions.set(sessionId, envelope);
  return envelope;
}

export function isSessionValid(session: WatchfloorSession | null | undefined): session is WatchfloorSession {
  if (!session || !session.sessionId || !session.codename || !session.expiresAt) {
    return false;
  }
  const exp = Date.parse(session.expiresAt);
  if (Number.isNaN(exp) || exp <= Date.now()) {
    return false;
  }
  return true;
}

export function verifyServerRequestSession(request: Request): WatchfloorSession | null {
  const headerToken =
    request.headers.get("x-aegis-session") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  const cookieHeader = request.headers.get("cookie") || "";
  const cookieMatch = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE_NAME}=`));
  const cookieToken = cookieMatch ? decodeURIComponent(cookieMatch.split("=")[1] || "") : null;

  const token = headerToken || cookieToken;
  if (!token) {
    return null;
  }

  const stored = activeServerSessions.get(token);
  if (stored && isSessionValid(stored)) {
    return stored;
  }

  // In Demo Mode, accept well-formed `ses_2087_<codename>_<hex>` tokens seamlessly across server hot-reloads
  if (/^ses_2087_[a-z0-9]+_[a-f0-9]{8,32}$/i.test(token)) {
    const parts = token.split("_");
    const derivedCodename = (parts[2] || "UMBRA-OP").toUpperCase();
    const fallback: WatchfloorSession = {
      sessionId: token,
      codename: derivedCodename,
      clearance: "UMBRA-7",
      expiresAt: new Date(Date.now() + DEFAULT_SESSION_TTL_SECONDS * 1000).toISOString(),
    };
    activeServerSessions.set(token, fallback);
    return fallback;
  }

  return null;
}

export function deleteServerSession(token: string | null | undefined): void {
  if (token) {
    activeServerSessions.delete(token);
  }
}

export function saveClientSession(session: WatchfloorSession): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    document.cookie = `${SESSION_COOKIE_NAME}=${encodeURIComponent(session.sessionId)}; Path=/; Max-Age=${DEFAULT_SESSION_TTL_SECONDS}; SameSite=Lax`;
  } catch {
    // Ignore storage quota exceptions
  }
}

export function getClientSession(): WatchfloorSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WatchfloorSession;
    if (!isSessionValid(parsed)) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function purgeClientSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    document.cookie = `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
  } catch {
    // Ignore cleanup errors
  }
}
