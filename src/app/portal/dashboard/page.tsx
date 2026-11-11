import type { Metadata } from "next";
import { ConsoleShell } from "@/components/ConsoleShell";
import { DashboardBody } from "./DashboardBody";

export const metadata: Metadata = {
  title: "Watchfloor Dashboard",
  description: "Cleared 2087 watchfloor: geostationary HUD, threat condition, active operations.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <ConsoleShell
      title="Watchfloor // Geostationary Overview"
      subtitle="Ten-service coalition telemetry, fabricated operations, synthetic intercept volume."
      code="MODULE 01 — DASHBOARD"
    >
      <DashboardBody />
    </ConsoleShell>
  );
}
