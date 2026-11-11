import type { Metadata } from "next";
import { ConsoleShell } from "@/components/ConsoleShell";
import { CommsBody } from "./CommsBody";

export const metadata: Metadata = {
  title: "Comms Stream",
  description: "Synthetic 2087 intercept trunk with pause, clear and flash-only filtering.",
  robots: { index: false, follow: false },
};

export default function CommsPage() {
  return (
    <ConsoleShell
      title="Comms // Intercept Trunk 7B"
      subtitle="Server-sent event tap with a deterministic local fallback. All traffic is invented."
      code="MODULE 04 — COMMS"
    >
      <CommsBody />
    </ConsoleShell>
  );
}
