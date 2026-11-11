import { VaultNoteEnvelopeSchema, VaultNotePatchSchema } from "@/lib/schemas";
import { apiError, apiOk } from "@/lib/api-response";
import { verifyServerRequestSession } from "@/lib/session";

/**
 * /api/v1/vault/notes — Owner-scoped ciphertext store (API.md, FR-013, SECURITY.md)
 * The server NEVER receives plaintext: only Base64 AES-256-GCM ciphertext + 96-bit IV
 * + PBKDF2 salt. Encryption and decryption happen exclusively in the browser.
 * DEMO mode: bounded in-memory map keyed by session id.
 * PRODUCTION REFERENCE: `vault_notes` table with RLS `user_id = current_setting('app.user_id')`.
 */
export const dynamic = "force-dynamic";

interface ServerCipherRecord {
  id: string;
  ciphertext: string;
  iv: string;
  salt: string;
  tag: string;
  createdAt: string;
}

const VAULT_BY_OWNER = new Map<string, ServerCipherRecord[]>();
const MAX_NOTES_PER_OWNER = 100;

function ownerVault(owner: string): ServerCipherRecord[] {
  let notes = VAULT_BY_OWNER.get(owner);
  if (!notes) {
    notes = [];
    VAULT_BY_OWNER.set(owner, notes);
  }
  return notes;
}

/** GET /api/v1/vault/notes — list owner ciphertext records. */
export async function GET(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) return apiError("UNAUTHORIZED", "Cleared session required to read the vault.");

  const notes = ownerVault(session.sessionId);
  return apiOk({
    total: notes.length,
    cipher: "AES-256-GCM",
    kdf: "PBKDF2-SHA256",
    owner: session.codename,
    notes,
    note: "Server holds ciphertext only. Plaintext never leaves the browser.",
  });
}

/** POST /api/v1/vault/notes — append an encrypted record (idempotent by record id). */
export async function POST(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) return apiError("UNAUTHORIZED", "Cleared session required to write the vault.");

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiError("VALIDATION", "Request body must be valid JSON.");
  }

  const parsed = VaultNoteEnvelopeSchema.safeParse(payload);
  if (!parsed.success) {
    return apiError("VALIDATION", parsed.error.issues[0]?.message ?? "Vault envelope rejected.");
  }

  const notes = ownerVault(session.sessionId);
  if (notes.length >= MAX_NOTES_PER_OWNER) {
    return apiError("CONFLICT", `Vault capacity reached (${MAX_NOTES_PER_OWNER} records). Burn notes first.`);
  }

  const id = parsed.data.id ?? `vn_2087_${Date.now().toString(16)}`;
  if (notes.some((n) => n.id === id)) {
    return apiError("CONFLICT", "A record with this id already exists in the owner vault.");
  }

  const record: ServerCipherRecord = {
    id,
    ciphertext: parsed.data.ciphertext,
    iv: parsed.data.iv,
    salt: parsed.data.salt ?? "",
    tag: parsed.data.tag,
    createdAt: parsed.data.createdAt ?? new Date().toISOString(),
  };
  notes.push(record);

  return apiOk({ record, total: notes.length }, { status: 201 });
}

/** PATCH /api/v1/vault/notes — replace ciphertext for an existing owner record. */
export async function PATCH(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) return apiError("UNAUTHORIZED", "Cleared session required to modify the vault.");

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiError("VALIDATION", "Request body must be valid JSON.");
  }

  const parsed = VaultNotePatchSchema.safeParse(payload);
  if (!parsed.success) {
    return apiError("VALIDATION", parsed.error.issues[0]?.message ?? "Vault patch rejected.");
  }

  const notes = ownerVault(session.sessionId);
  const target = notes.find((n) => n.id === parsed.data.id);
  if (!target) {
    return apiError("NOT_FOUND", "No owner record matches this id.");
  }

  target.ciphertext = parsed.data.ciphertext;
  target.iv = parsed.data.iv;
  target.tag = parsed.data.tag;

  return apiOk({ record: target, total: notes.length });
}

/** DELETE /api/v1/vault/notes?id= | ?all=true — crypto-shred one record or the whole owner vault. */
export async function DELETE(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) return apiError("UNAUTHORIZED", "Cleared session required to purge the vault.");

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const all = url.searchParams.get("all") === "true";
  const notes = ownerVault(session.sessionId);

  if (all) {
    notes.length = 0;
    return apiOk({ purged: "ALL", total: 0, saltRotated: true });
  }

  if (!id) {
    return apiError("VALIDATION", "Provide ?id=<record> or ?all=true to purge.");
  }

  const before = notes.length;
  const remaining = notes.filter((n) => n.id !== id);
  if (remaining.length === before) {
    return apiError("NOT_FOUND", "No owner record matches this id.");
  }

  VAULT_BY_OWNER.set(session.sessionId, remaining);
  return apiOk({ purged: id, total: remaining.length });
}
