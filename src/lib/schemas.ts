import { z } from "zod";

/**
 * AEGIS // OPS GRID — Zod Validation Contracts (API.md & SECURITY.md)
 */

export const AuthSessionRequestSchema = z.object({
  codename: z
    .string()
    .trim()
    .min(3, "Codename must be at least 3 characters.")
    .max(32, "Codename cannot exceed 32 characters.")
    .regex(/^[A-Za-z0-9_-]+$/, "Codename may only contain letters, digits, hyphens, and underscores."),
  passphrase: z
    .string()
    .min(8, "Passphrase must be at least 8 characters.")
    .max(128, "Passphrase cannot exceed 128 characters."),
});

export type AuthSessionRequest = z.infer<typeof AuthSessionRequestSchema>;

export const RecruitmentApplicationSchema = z.object({
  codename: z
    .string()
    .trim()
    .min(3, "Candidate codename must be at least 3 characters.")
    .max(32, "Candidate codename cannot exceed 32 characters."),
  contact: z
    .string()
    .trim()
    .min(4, "Provide a fictional relay handle or contact string (min 4 chars).")
    .max(120, "Contact string cannot exceed 120 characters."),
  specialty: z.enum(["HUMINT", "SIGINT", "QUANTUM_CRYPT", "ORBITAL_RECON"]).default("SIGINT"),
  answerGrid: z.record(z.string(), z.string()),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "You must acknowledge that AEGIS // OPS GRID is an unofficial fictional simulation.",
    }),
  }),
});

export type RecruitmentApplicationInput = z.infer<typeof RecruitmentApplicationSchema>;

export const VaultNoteEnvelopeSchema = z.object({
  id: z.string().min(3).max(64).optional(),
  ciphertext: z.string().min(8, "Ciphertext payload is required."),
  iv: z.string().min(8, "96-bit Base64 IV is required."),
  salt: z.string().min(8, "128-bit Base64 PBKDF2 salt is required.").optional(),
  tag: z.string().max(64).default("GCM-128-EMBEDDED"),
  createdAt: z.string().optional(),
});

export type VaultNoteEnvelopeInput = z.infer<typeof VaultNoteEnvelopeSchema>;

export const VaultNotePatchSchema = z.object({
  id: z.string().min(3).max(64),
  ciphertext: z.string().min(8),
  iv: z.string().min(8),
  tag: z.string().max(64).default("GCM-128-EMBEDDED"),
});
