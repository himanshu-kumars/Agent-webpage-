import type { Metadata } from "next";
import { ConsoleShell } from "@/components/ConsoleShell";
import { VaultBody } from "./VaultBody";

export const metadata: Metadata = {
  title: "Field Vault",
  description:
    "Local-only AES-256-GCM field notes with PBKDF2-SHA256 key derivation, two-step burn and .txt export.",
  robots: { index: false, follow: false },
};

export default function VaultPage() {
  return (
    <ConsoleShell
      title="Vault // Encrypted Field Notes"
      subtitle="Client-side AES-256-GCM. Ciphertext at rest, plaintext only in memory."
      code="MODULE 05 — VAULT"
    >
      <VaultBody />
    </ConsoleShell>
  );
}
