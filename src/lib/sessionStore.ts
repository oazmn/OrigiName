import type { Session } from "@/types";

// Persist across Next.js hot reloads in dev mode
const g = global as typeof globalThis & { _sessionStore?: Map<string, Session> };
if (!g._sessionStore) g._sessionStore = new Map();
const store = g._sessionStore;

const TTL = 30 * 60 * 1000;

export function setSession(session: Session) {
  store.set(session.id, session);
}

export function getSession(id: string): Session | undefined {
  const s = store.get(id);
  if (s && Date.now() - s.createdAt > TTL) {
    store.delete(id);
    return undefined;
  }
  return s;
}
