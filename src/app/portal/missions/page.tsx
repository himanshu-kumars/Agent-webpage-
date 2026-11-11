import type { Metadata } from "next";
import { ConsoleShell } from "@/components/ConsoleShell";
import { MissionsBody } from "./MissionsBody";

export const metadata: Metadata = {
  title: "Missions Index",
  description: "Filterable fictional 2087 case files with click-to-declassify briefing spans.",
  robots: { index: false, follow: false },
};

export default function MissionsPage() {
  return (
    <ConsoleShell
      title="Missions // Case File Index"
      subtitle="Eight fabricated operations across orbital, benthic, arctic and civic theatres."
      code="MODULE 02 — MISSIONS"
    >
      <MissionsBody />
    </ConsoleShell>
  );
}
