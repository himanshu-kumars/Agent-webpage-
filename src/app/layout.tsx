import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "AEGIS // OPS GRID — 2087 Allied Intelligence Directorate (Unofficial Concept)",
    template: "%s | AEGIS // OPS GRID (2087 Fiction)",
  },
  description:
    "Unofficial speculative sci-fi web platform imagining a 2087 ten-agency allied intelligence coalition portal (CIA · MI6/SIS · R&AW · GCHQ · NSA · Mossad · BND · DGSE · ASIS · CSIS). Historical profiles cite public record; all 2087 operations are fiction.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#04070d] text-[#e6f1ff] antialiased">
        {/* Atmospheric CRT Scanlines & Film Grain Overlays */}
        <div aria-hidden="true" className="aegis-scanlines" />
        <div aria-hidden="true" className="aegis-grain" />
        {children}
      </body>
    </html>
  );
}
