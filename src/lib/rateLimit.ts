import { createHash } from "crypto";

// Simple in-memory sliding-window rate limiter.
// Works per-process — swap the store for Upstash Redis for multi-instance production.
const g = global as typeof globalThis & {
  _rateLimitStore?: Map<string, { count: number; resetAt: number }>;
  _rateLimitSweep?: ReturnType<typeof setInterval>;
};
if (!g._rateLimitStore) g._rateLimitStore = new Map();
const store = g._rateLimitStore;

// Evict expired entries every 5 minutes to prevent unbounded memory growth.
if (!g._rateLimitSweep) {
  g._rateLimitSweep = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 5 * 60 * 1000);
  g._rateLimitSweep.unref?.();
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// IP extraction priority:
//
// 1. x-vercel-forwarded-for — injected by the Vercel edge and CANNOT be spoofed by
//    the client. Use this first when running on Vercel.
//
// 2. x-forwarded-for — set by most reverse proxies (nginx, Cloudflare, etc.).
//    IMPORTANT: this header CAN be forged by a client when there is no trusted proxy
//    in front of the server. Only trust it if you know a proxy strips/overwrites it.
//    We take only the LAST entry (rightmost), which is appended by the nearest trusted
//    proxy and cannot be faked by the client.
//
// 3. Fingerprint fallback — when no IP header is present (local dev, bare Node.js
//    without a proxy). All requests from the same browser end up in the same bucket.
//    Trivially bypassable by changing UA — only use in dev.
//
// Security note: on Vercel the rate limiter is fully reliable. On other deployments,
// ensure a trusted reverse proxy is in place so that x-forwarded-for is set correctly.
export function getIp(req: Request): string {
  // Vercel-injected — authoritative, cannot be spoofed by the client.
  const vercelIp = req.headers.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim();

  // Take the rightmost IP from X-Forwarded-For, which is appended by the nearest proxy.
  // A client can prepend arbitrary IPs but cannot fake the entry added by the proxy itself.
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    const rightmost = parts[parts.length - 1].trim();
    if (rightmost) return rightmost;
  }

  // Last resort: browser fingerprint. Effective in dev; trivially bypassable in prod.
  // Log a warning so operators know the rate limiter is in degraded mode.
  console.warn(
    "[rateLimit] No trusted IP header found. Rate limiting is using a browser " +
    "fingerprint, which can be bypassed. Ensure a trusted reverse proxy sets " +
    "X-Forwarded-For, or deploy on Vercel where x-vercel-forwarded-for is injected."
  );
  const ua = req.headers.get("user-agent") ?? "";
  const lang = req.headers.get("accept-language") ?? "";
  return "fp:" + createHash("sha256").update(ua + lang).digest("hex").slice(0, 16);
}
