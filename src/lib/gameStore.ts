import type { GameSession } from "@/types/game";

const g = global as typeof globalThis & { _gameStore?: Map<string, GameSession> };
if (!g._gameStore) g._gameStore = new Map();
const store = g._gameStore;

const TTL = 60 * 60 * 1000;

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

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateScore(distanceKm: number): number {
  return Math.round(1000 * Math.exp(-distanceKm / 4000));
}

export const HINT_SCORE_CAP = 750;
