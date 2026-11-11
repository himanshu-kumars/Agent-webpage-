import React from "react";

export interface SigilProps {
  size?: number;
  className?: string;
}

/**
 * AEGIS // OPS GRID — Ten-Pointed Orbital Astrolabe Crest (<Sigil />)
 */
export function Sigil({ size = 36, className = "" }: SigilProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <polygon
        points="60,6 108,33 108,87 60,114 12,87 12,33"
        stroke="#3ee0ff"
        strokeWidth="2.2"
        fill="#0a1322"
      />
      <circle
        cx="60"
        cy="60"
        r="36"
        stroke="#ffb454"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <circle cx="60" cy="60" r="21" stroke="#3ee0ff" strokeWidth="1.8" />
      <path
        d="M60 14 V106 M14 60 H106 M27 27 L93 93 M93 27 L27 93"
        stroke="#3ee0ff"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      <polygon
        points="60,32 68,52 88,60 68,68 60,88 52,68 32,60 52,52"
        fill="#3ee0ff"
        fillOpacity="0.22"
        stroke="#3ee0ff"
        strokeWidth="1.8"
      />
      <circle cx="60" cy="60" r="4.5" fill="#39ff9d" />
    </svg>
  );
}
