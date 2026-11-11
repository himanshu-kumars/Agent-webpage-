"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  getClientSession,
  purgeClientSession,
  type WatchfloorSession,
} from "@/lib/session";

/**
 * AEGIS // OPS GRID — Watchfloor Session & Guard Hook (FR-007, FR-008)
 */
export function useWatchfloorSession(options?: { requireAuth?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<WatchfloorSession | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const active = getClientSession();
    setSession(active);
    setChecked(true);

    if (options?.requireAuth && !active) {
      const nextParam = pathname ? `&next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/portal?reason=auth_required${nextParam}`);
    }
  }, [options?.requireAuth, pathname, router]);

  const purge = useCallback(async () => {
    purgeClientSession();
    setSession(null);
    try {
      await fetch("/api/v1/auth/session", { method: "DELETE" });
    } catch {
      // Ignore offline errors during purge
    }
    router.replace("/portal?reason=purged");
  }, [router]);

  return {
    session,
    checked,
    isAuthenticated: Boolean(session),
    purge,
  };
}
