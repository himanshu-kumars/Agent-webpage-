import type { Metadata } from "next";
import { NotFound } from "@/components/NotFound";

export const metadata: Metadata = {
  title: "404 — Off The Map",
  description: "SIGNAL LOCK: 0.00% — the requested coordinate does not exist in the 2087 index.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFound />;
}
