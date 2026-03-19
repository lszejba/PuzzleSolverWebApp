export interface CellData {
  value: string;
  hints: string;
}

export interface GameState {
  cells: CellData[];
  timestamp: number;
  source: "user" | "external";
}

export interface GameTimeline {
  states: GameState[];
  cursor: number;
}
