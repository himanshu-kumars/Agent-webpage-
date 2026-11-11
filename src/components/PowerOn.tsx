import React from "react";

export interface PowerOnProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AEGIS // OPS GRID — Route-Entry CRT Stabilization Wrapper (<PowerOn />)
 * Automatically disabled by @media (prefers-reduced-motion: reduce) in globals.css.
 */
export function PowerOn({ children, className = "" }: PowerOnProps) {
  return <div className={`animate-power-on ${className}`}>{children}</div>;
}
