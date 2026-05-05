export type ConversationPhase = "idle" | "questioning" | "analysing" | "done";
export type ConfidenceLevel = "high" | "medium" | "low";

export interface ParsedName {
  firstName: string;
  middleNames?: string[];
  lastName: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Session {
  id: string;
  name: ParsedName;
  messages: ChatMessage[];
  turnCount: number;
  createdAt: number;
}

export interface NameComponent {
  component: "first" | "last";
  value: string;
  linguisticRoot: string;
  culturalOrigin: string;
  likelyRegion: string;
  confidence: ConfidenceLevel;
  notes: string;
}

export interface OriginPin {
  label: string;
  lat: number;
  lng: number;
  associatedComponents: Array<"first" | "last">;
}

export interface HeritageAnalysis {
  summary: string;
  components: NameComponent[];
  pins: OriginPin[];
  caveats: string;
}
