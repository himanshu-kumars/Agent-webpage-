"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GLYPHS = "0123456789ABCDEF#%&*+<>?/";

export interface DecryptTextProps {
  text: string;
  className?: string;
  durationMs?: number;
}

/**
 * AEGIS // OPS GRID — IO-Triggered Cryptographic Scramble Reveal (<DecryptText />)
 * Immediately renders plaintext when prefers-reduced-motion is active (NFR-002).
 */
export function DecryptText({
  text,
  className = "",
  durationMs = 520,
}: DecryptTextProps) {
  const reducedMotion = useReducedMotion();
  const [output, setOutput] = useState<string>(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setOutput(text);
      return;
    }

    const node = spanRef.current;
    if (!node || hasAnimated) return;

    const runScramble = () => {
      setHasAnimated(true);
      const totalSteps = 12;
      const stepTime = Math.max(24, Math.floor(durationMs / totalSteps));
      let step = 0;

      const timer = window.setInterval(() => {
        step += 1;
        if (step >= totalSteps) {
          setOutput(text);
          window.clearInterval(timer);
          return;
        }

        const revealCount = Math.floor((step / totalSteps) * text.length);
        let next = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < revealCount || ch === " " || ch === "/" || ch === "-") {
            next += ch;
          } else {
            next += GLYPHS[(i + step * 3) % GLYPHS.length];
          }
        }
        setOutput(next);
      }, stepTime);
    };

    if (typeof IntersectionObserver === "undefined") {
      runScramble();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          runScramble();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [durationMs, hasAnimated, reducedMotion, text]);

  return (
    <span ref={spanRef} aria-label={text} className={className}>
      {output}
    </span>
  );
}
