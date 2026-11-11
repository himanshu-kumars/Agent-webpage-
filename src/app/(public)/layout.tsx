import React from "react";
import { ClassifiedBanner } from "@/components/ClassifiedBanner";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PowerOn } from "@/components/PowerOn";

/**
 * AEGIS // OPS GRID — Public Directorate Shell (FR-002, FR-015)
 * Every public route is wrapped in the classified banner pair, nav, footer disclaimer.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#04070d]">
      <ClassifiedBanner variant="public" position="top" />
      <SiteNav />
      <main id="main" className="flex-1">
        <PowerOn>{children}</PowerOn>
      </main>
      <SiteFooter />
      <ClassifiedBanner variant="public" position="bottom" />
    </div>
  );
}
