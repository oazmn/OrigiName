import type { Session } from "@/types";

const store = new Map<string, Session>();
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
