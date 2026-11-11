/**
 * AEGIS // OPS GRID — Zulu (UTC) Clock & 2087 Speculative Epoch Utilities
 * SSR-safe helpers for deterministic initial render and 1 Hz live updates (FR-003).
 */

export const SSR_ZULU_PLACEHOLDER = "2087-11-10 // --:--:-- Z";

/**
 * Formats a Date into military/ISO Zulu telemetry string, projecting the year into 2087
 * while preserving true UTC month, day, hour, minute, and second.
 */
export function formatZuluClock(date: Date = new Date()): {
  realUtcIso: string;
  watchfloorDisplay: string;
  dayOfYear: string;
} {
  const iso = date.toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ
  const monthDay = iso.slice(5, 10); // MM-DD
  const timePart = iso.slice(11, 19); // HH:mm:ss

  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const doy = String(Math.floor(diff / oneDay)).padStart(3, "0");

  return {
    realUtcIso: iso,
    watchfloorDisplay: `2087-${monthDay} // ${timePart} Z`,
    dayOfYear: `2087.${doy}`,
  };
}
