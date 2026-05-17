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

// On Vercel, x-vercel-forwarded-for is injected by the platform and cannot be
// spoofed by the client. x-real-ip is the fallback for other proxy setups.
export function getIp(req: Request): string {
  return (
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
