import { generateInterceptByIndex } from "@/lib/data/intercepts";
import { apiError } from "@/lib/api-response";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyServerRequestSession } from "@/lib/session";

/**
 * GET /api/v1/intercepts/stream — Server-Sent Events ticker (API.md, FR-012)
 * Emits one fabricated 2087 intercept every 2.5s. Rate limited to 1 concurrent
 * connection per client; the console degrades gracefully to a client-side
 * generator when the stream is unavailable (offline / static export).
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = verifyServerRequestSession(request);
  if (!session) {
    return apiError("UNAUTHORIZED", "Cleared watchfloor session required to tap the intercept trunk.");
  }

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    session.sessionId;

  const limit = checkRateLimit(`sse:${clientIp}`, 1, 10_000);
  if (!limit.allowed) {
    return apiError("RATE_LIMITED", "Single intercept stream connection permitted per client.", {
      headers: { "Retry-After": String(limit.retryAfterSeconds) },
    });
  }

  const encoder = new TextEncoder();
  let index = 0;
  let timer: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (event: string, payload: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`)
        );
      };

      send("hello", {
        channel: "AEGIS-TRUNK-7B",
        operator: session.codename,
        clearance: session.clearance,
        zulu: new Date().toISOString(),
        fictionNotice: "All intercept traffic on this trunk is fabricated 2087 fiction.",
      });

      const push = () => {
        try {
          const frame = generateInterceptByIndex(index, new Date().toISOString());
          index += 1;
          send("intercept", frame);
        } catch {
          if (timer) clearInterval(timer);
          try {
            controller.close();
          } catch {
            // Stream already closed by client.
          }
        }
      };

      push();
      timer = setInterval(push, 2500);

      request.signal.addEventListener("abort", () => {
        if (timer) clearInterval(timer);
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      });
    },
    cancel() {
      if (timer) clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
