import { randomInt } from "crypto";
import db from "./nameDatabase.json";
import type { Culture } from "@/types/game";

type NameEntry = { name: string; pronunciation: string; meaning: string; notes: string };
const pool = db as Record<string, NameEntry[]>;

export function getNameFromPool(culture: Culture): NameEntry | null {
  const entries = pool[culture.id];
  if (!entries?.length) return null;
  // Use a cryptographically-random index so name selection is not predictable.
  return entries[randomInt(0, entries.length)];
}
