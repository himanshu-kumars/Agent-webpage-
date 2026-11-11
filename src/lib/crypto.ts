/**
 * AEGIS // OPS GRID — Client-Side Authenticated Cryptography Engine (FR-013, SECURITY.md)
 * Algorithm: AES-256-GCM (96-bit random IV, 128-bit auth tag)
 * Key Derivation: PBKDF2-HMAC-SHA256 (310,000 iterations, 128-bit random salt)
 * Zero plaintext ever touches localStorage or network packets.
 */

export const VAULT_STORAGE_KEY = "aegis_vault_v1";
export const PBKDF2_ITERATIONS = 310_000;

export interface VaultNotePlaintext {
  title: string;
  body: string;
  classification: "UMBRA-7" | "ORCON" | "EYES ONLY";
}

export interface EncryptedVaultRecord {
  id: string;
  ciphertext: string; // Base64 (encrypted payload + 128-bit GCM authentication tag)
  iv: string; // Base64 (12 bytes / 96 bits)
  salt: string; // Base64 (16 bytes / 128 bits)
  tag: string; // Algorithm descriptor
  createdAt: string;
}

export interface VaultStorageEnvelope {
  version: 1;
  kdf: "PBKDF2-SHA256";
  iterations: number;
  cipher: "AES-256-GCM";
  salt: string;
  notes: EncryptedVaultRecord[];
}

export interface DecryptedVaultItem {
  id: string;
  title: string;
  body: string;
  classification: "UMBRA-7" | "ORCON" | "EYES ONLY";
  createdAt: string;
  ciphertext: string;
  iv: string;
  salt: string;
}

export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToBytes(base64: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(base64, "base64"));
  }
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

export function generateRandomSaltBase64(): string {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  return bytesToBase64(salt);
}

export async function deriveAesGcmKey(
  passphrase: string,
  saltBase64: string,
  iterations: number = PBKDF2_ITERATIONS
): Promise<CryptoKey> {
  const subtle = globalThis.crypto.subtle;
  const encoder = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const saltBytes = base64ToBytes(saltBase64);
  return subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes.buffer.slice(
        saltBytes.byteOffset,
        saltBytes.byteOffset + saltBytes.byteLength
      ) as ArrayBuffer,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptVaultNote(
  plaintext: VaultNotePlaintext,
  passphrase: string,
  existingSaltBase64?: string,
  iterations: number = PBKDF2_ITERATIONS
): Promise<EncryptedVaultRecord> {
  const subtle = globalThis.crypto.subtle;
  const salt = existingSaltBase64 || generateRandomSaltBase64();
  const key = await deriveAesGcmKey(passphrase, salt, iterations);

  const ivBytes = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const encodedPayload = new TextEncoder().encode(JSON.stringify(plaintext));

  const encryptedBuffer = await subtle.encrypt(
    {
      name: "AES-GCM",
      iv: ivBytes,
      tagLength: 128,
    },
    key,
    encodedPayload
  );

  const randomHex = Array.from(globalThis.crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return {
    id: `vn_2087_${randomHex}`,
    ciphertext: bytesToBase64(new Uint8Array(encryptedBuffer)),
    iv: bytesToBase64(ivBytes),
    salt,
    tag: "AES-256-GCM-128",
    createdAt: new Date().toISOString(),
  };
}

export async function decryptVaultNote(
  record: EncryptedVaultRecord,
  passphrase: string,
  iterations: number = PBKDF2_ITERATIONS
): Promise<DecryptedVaultItem> {
  const subtle = globalThis.crypto.subtle;
  const key = await deriveAesGcmKey(passphrase, record.salt, iterations);
  const ivBytes = base64ToBytes(record.iv);
  const cipherBytes = base64ToBytes(record.ciphertext);

  const decryptedBuffer = await subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivBytes.buffer.slice(
        ivBytes.byteOffset,
        ivBytes.byteOffset + ivBytes.byteLength
      ) as ArrayBuffer,
      tagLength: 128,
    },
    key,
    cipherBytes.buffer.slice(
      cipherBytes.byteOffset,
      cipherBytes.byteOffset + cipherBytes.byteLength
    ) as ArrayBuffer
  );

  const decodedJson = new TextDecoder().decode(decryptedBuffer);
  const parsed = JSON.parse(decodedJson) as VaultNotePlaintext;

  return {
    id: record.id,
    title: parsed.title,
    body: parsed.body,
    classification: parsed.classification || "UMBRA-7",
    createdAt: record.createdAt,
    ciphertext: record.ciphertext,
    iv: record.iv,
    salt: record.salt,
  };
}

export function loadVaultEnvelopeFromStorage(): VaultStorageEnvelope {
  if (typeof window === "undefined") {
    return {
      version: 1,
      kdf: "PBKDF2-SHA256",
      iterations: PBKDF2_ITERATIONS,
      cipher: "AES-256-GCM",
      salt: generateRandomSaltBase64(),
      notes: [],
    };
  }

  try {
    const raw = window.localStorage.getItem(VAULT_STORAGE_KEY);
    if (!raw) {
      const fresh: VaultStorageEnvelope = {
        version: 1,
        kdf: "PBKDF2-SHA256",
        iterations: PBKDF2_ITERATIONS,
        cipher: "AES-256-GCM",
        salt: generateRandomSaltBase64(),
        notes: [],
      };
      window.localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return JSON.parse(raw) as VaultStorageEnvelope;
  } catch {
    return {
      version: 1,
      kdf: "PBKDF2-SHA256",
      iterations: PBKDF2_ITERATIONS,
      cipher: "AES-256-GCM",
      salt: generateRandomSaltBase64(),
      notes: [],
    };
  }
}

export function saveVaultEnvelopeToStorage(envelope: VaultStorageEnvelope): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(envelope));
}

export function cryptoShredLocalVault(): VaultStorageEnvelope {
  const rotated: VaultStorageEnvelope = {
    version: 1,
    kdf: "PBKDF2-SHA256",
    iterations: PBKDF2_ITERATIONS,
    cipher: "AES-256-GCM",
    salt: generateRandomSaltBase64(),
    notes: [],
  };
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(VAULT_STORAGE_KEY);
    window.localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(rotated));
  }
  return rotated;
}

export function formatVaultExportTxt(notes: DecryptedVaultItem[], codename: string): string {
  const header = [
    "================================================================================",
    "AEGIS // OPS GRID — ENCRYPTED FIELD-NOTES VAULT EXPORT",
    "UNOFFICIAL FAN CONCEPT — FICTIONAL 2087 SPECULATIVE INTERFACE",
    `OPERATOR CODENAME : ${codename}`,
    `EXPORT TIMESTAMP  : ${new Date().toISOString()}`,
    `CRYPTOGRAPHY      : AES-256-GCM // PBKDF2-SHA256 (${PBKDF2_ITERATIONS} ITERATIONS)`,
    `TOTAL RECORDS     : ${notes.length}`,
    "================================================================================",
    "",
  ].join("\n");

  const body = notes
    .map((n, idx) =>
      [
        `--- RECORD #${String(idx + 1).padStart(2, "0")} [${n.id}] ---`,
        `CLASSIFICATION : ${n.classification}`,
        `CREATED (ZULU) : ${n.createdAt}`,
        `TITLE          : ${n.title}`,
        `DECRYPTED BODY :`,
        n.body,
        `AT-REST PROOF  : IV=${n.iv} | CIPHERTEXT=${n.ciphertext.slice(0, 48)}...`,
        "",
      ].join("\n")
    )
    .join("\n");

  return `${header}${body}`;
}
