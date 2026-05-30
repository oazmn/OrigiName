import db from "./nameDatabase.json";
import type { Culture } from "@/types/game";

type NameEntry = { name: string; pronunciation: string; meaning: string; notes: string };
const pool = db as Record<string, NameEntry[]>;

export function getNameFromPool(culture: Culture): NameEntry | null {
  const entries = pool[culture.id];
  if (!entries?.length) return null;
  return entries[Math.floor(Math.random() * entries.length)];
}
