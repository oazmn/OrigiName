export interface Culture {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
}

export type GamePhase =
  | "menu"
  | "loading"
  | "guessing"
  | "submitting"
  | "revealing"
  | "advancing"
  | "done";

export interface GameRound {
  culture: Culture;
  name: string;
  meaning: string;
  notes: string;
  hintUsed?: boolean;
  guessLat?: number;
  guessLng?: number;
  score?: number;
  distanceKm?: number;
}

export interface GameSession {
  id: string;
  cultures: Culture[];
  rounds: GameRound[];
  currentRound: number;
  createdAt: number;
}

export interface RoundResult {
  score: number;
  distanceKm: number;
  correctLat: number;
  correctLng: number;
  cultureName: string;
  cultureRegion: string;
  name: string;
  meaning: string;
  notes: string;
  isLastRound: boolean;
  totalScore: number;
  hintUsed: boolean;
}

export interface CompletedRound {
  name: string;
  cultureName: string;
  cultureRegion: string;
  score: number;
  distanceKm: number;
}
