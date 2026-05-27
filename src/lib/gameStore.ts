import type { GameSession } from "@/types/game";

const g = global as typeof globalThis & {
  _gameStore?: Map<string, GameSession>;
  _gameStoreSweep?: ReturnType<typeof setInterval>;
};

if (!g._gameStore) g._gameStore = new Map();
const store = g._gameStore;

const TTL = 20 * 60 * 1000;
const SESSION_CAP = 10_000;

if (!g._gameStoreSweep) {
  g._gameStoreSweep = setInterval(() => {
    const now = Date.now();
    for (const [id, session] of store) {
      if (now - session.createdAt > TTL) store.delete(id);
    }
  }, 5 * 60 * 1000);
  g._gameStoreSweep.unref?.();
}

export function storeFull(): boolean {
  return store.size >= SESSION_CAP;
}

export function setGame(game: GameSession) {
  store.set(game.id, game);
}

export function getGame(id: string): GameSession | undefined {
  const session = store.get(id);
  if (session && Date.now() - session.createdAt > TTL) {
    store.delete(id);
    return undefined;
  }
  return session;
}
