"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  generateInterceptByIndex,
  type InterceptFrame,
  INITIAL_INTERCEPTS,
} from "@/lib/data/intercepts";
import { DecryptText } from "@/components/DecryptText";
import { Stamp } from "@/components/Stamp";
import { HudPanel } from "@/components/HudPanel";
import { Toast } from "@/components/Toast";
import { EmptyState } from "@/components/EmptyState";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Transport = "SSE" | "LOCAL FALLBACK" | "CONNECTING";

export function CommsBody() {
  const reducedMotion = useReducedMotion();
  const [frames, setFrames] = useState<InterceptFrame[]>(INITIAL_INTERCEPTS.slice(0, 8));
  const [paused, setPaused] = useState(false);
  const [transport, setTransport] = useState<Transport>("CONNECTING");
  const [toast, setToast] = useState<string | null>(null);
  const [flashOnly, setFlashOnly] = useState(false);

  const indexRef = useRef(8);
  const pausedRef = useRef(false);
  const sourceRef = useRef<EventSource | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const pushFrame = useCallback((frame: InterceptFrame) => {
    if (pausedRef.current) return;
    setFrames((prev) => [frame, ...prev].slice(0, 40));
  }, []);

  const startLocalFallback = useCallback(() => {
    if (timerRef.current !== null) return;
    setTransport("LOCAL FALLBACK");
    timerRef.current = window.setInterval(() => {
      const frame = generateInterceptByIndex(indexRef.current, new Date().toISOString());
      indexRef.current += 1;
      pushFrame(frame);
    }, 3200);
  }, [pushFrame]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof EventSource === "undefined") {
      startLocalFallback();
      return;
    }

    let closed = false;
    let source: EventSource | null = null;

    try {
      source = new EventSource("/api/v1/intercepts/stream");
      sourceRef.current = source;

      source.addEventListener("hello", () => {
        if (closed) return;
        setTransport("SSE");
        setToast("TRUNK TAP ESTABLISHED — text/event-stream");
      });

      source.addEventListener("intercept", (event) => {
        if (closed) return;
        try {
          const frame = JSON.parse((event as MessageEvent<string>).data) as InterceptFrame;
          pushFrame(frame);
        } catch {
          // Malformed frame; ignore and keep the stream alive.
        }
      });

      source.onerror = () => {
        source?.close();
        sourceRef.current = null;
        if (!closed) startLocalFallback();
      };
    } catch {
      startLocalFallback();
    }

    return () => {
      closed = true;
      source?.close();
      sourceRef.current = null;
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pushFrame, startLocalFallback]);

  const visible = flashOnly ? frames.filter((frame) => frame.classification === "FLASH") : frames;
  const flashCount = frames.filter((frame) => frame.classification === "FLASH").length;

  function clearTrunk() {
    setFrames([]);
    setToast("TRUNK BUFFER CLEARED — incoming frames continue");
  }

  return (
    <div className="space-y-4">
      <Toast message={toast} tone={transport === "SSE" ? "green" : "amber"} onDismiss={() => setToast(null)} />

      <HudPanel
        title="Intercept Trunk 7B"
        code="SIGINT // SYNTHETIC"
        tone={transport === "SSE" ? "green" : "amber"}
        headerRight={
          <span
            className={`font-mono-tech text-[10px] tracking-widest uppercase ${
              transport === "SSE" ? "text-[#39ff9d]" : "text-[#ffb454]"
            }`}
          >
            TRANSPORT: {transport}
          </span>
        }
      >
        <div className="space-y-3 p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => {
                setPaused((prev) => !prev);
                setToast(paused ? "STREAM RESUMED" : "STREAM PAUSED — buffer frozen");
              }}
              className={`rounded-[2px] border px-3 py-1.5 font-mono-tech text-xs font-bold tracking-widest uppercase ${
                paused
                  ? "border-[#39ff9d] bg-[#39ff9d]/15 text-[#39ff9d] hover:bg-[#39ff9d] hover:text-[#04070d]"
                  : "border-[#ffb454] bg-[#ffb454]/15 text-[#ffb454] hover:bg-[#ffb454] hover:text-[#04070d]"
              }`}
            >
              {paused ? "▶ RESUME" : "❚❚ PAUSE"}
            </button>

            <button
              type="button"
              onClick={clearTrunk}
              className="rounded-[2px] border border-[#ff3b4e]/60 bg-[#ff3b4e]/10 px-3 py-1.5 font-mono-tech text-xs font-bold tracking-widest text-[#ff3b4e] uppercase hover:bg-[#ff3b4e] hover:text-[#04070d]"
            >
              CLEAR BUFFER
            </button>

            <button
              type="button"
              aria-pressed={flashOnly}
              onClick={() => setFlashOnly((prev) => !prev)}
              className={`rounded-[2px] border px-3 py-1.5 font-mono-tech text-xs tracking-widest uppercase ${
                flashOnly
                  ? "border-[#ff3b4e] bg-[#ff3b4e]/20 text-[#ff3b4e]"
                  : "border-[#3ee0ff]/35 text-[#8da4c4] hover:border-[#3ee0ff] hover:text-[#e6f1ff]"
              }`}
            >
              FLASH ONLY [{String(flashCount).padStart(2, "0")}]
            </button>

            <span className="ml-auto font-mono-tech text-[11px] text-[#8da4c4]">
              BUFFER {String(frames.length).padStart(2, "0")} / 40
              {reducedMotion && " // MOTION REDUCED — SCRAMBLE DISABLED"}
            </span>
          </div>

          <p className="border-t border-[#3ee0ff]/15 pt-2 font-mono-tech text-[10px] leading-relaxed text-[#8da4c4]">
            Transport note: the console attempts a live{" "}
            <code className="text-[#3ee0ff]">text/event-stream</code> tap on{" "}
            <code className="text-[#3ee0ff]">/api/v1/intercepts/stream</code>. If the stream is
            throttled, unauthenticated, or unavailable in a static deployment, it degrades to a local
            deterministic generator with identical frame shape. Every frame is fabricated.
          </p>
        </div>
      </HudPanel>

      {visible.length === 0 ? (
        <EmptyState
          title="TRUNK BUFFER EMPTY"
          message="No frames are held in the buffer. Incoming traffic continues to arrive — clear the FLASH filter or wait for the next frame."
          actionLabel="SHOW ALL CLASSIFICATIONS"
          onAction={() => setFlashOnly(false)}
        />
      ) : (
        <ol className="space-y-2.5" aria-live="off">
          {visible.map((frame) => (
            <li
              key={frame.id}
              className={`relative rounded-[2px] border bg-[#0a1322]/85 p-3.5 ${
                frame.classification === "FLASH"
                  ? "border-[#ff3b4e]/50"
                  : frame.classification === "IMMEDIATE"
                  ? "border-[#ffb454]/40"
                  : "border-[#3ee0ff]/22"
              }`}
            >
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-tech text-[11px] tracking-[0.16em] text-[#3ee0ff]">
                    {frame.channel}
                  </span>
                  <Stamp
                    label={frame.classification}
                    tone={
                      frame.classification === "FLASH"
                        ? "red"
                        : frame.classification === "IMMEDIATE"
                        ? "amber"
                        : "cyan"
                    }
                  />
                  <span className="font-mono-tech text-[10px] tracking-wider text-[#8da4c4]">
                    {frame.id}
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] text-[#8da4c4]">
                  {frame.capturedAt.slice(0, 19)}Z
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[#e6f1ff]">
                <DecryptText text={frame.body} durationMs={620} />
              </p>

              <p className="mt-1.5 font-mono-tech text-[10px] tracking-wider text-[#8da4c4]">
                ORIGIN {frame.origin} → DEST {frame.destination} // FICTIONAL 2087 TRAFFIC
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
