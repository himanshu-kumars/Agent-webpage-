import type { Metadata } from "next";
import { ConsoleShell } from "@/components/ConsoleShell";
import { DossiersBody } from "./DossiersBody";

export const metadata: Metadata = {
  title: "Dossier Reading Room",
  description: "Eight redaction-heavy fictional 2087 dossiers with click-to-declassify spans.",
  robots: { index: false, follow: false },
};

export default function DossiersPage() {
  return (
    <ConsoleShell
      title="Dossiers // Reading Room"
      subtitle="Redacted subject files. Every span unlocks into authored fiction."
      code="MODULE 03 — DOSSIERS"
    >
      <DossiersBody />
    </ConsoleShell>
  );
}
