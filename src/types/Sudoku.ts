export interface CellData {
  value: string;
  hints: string;
  isInitial: boolean;
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

export interface SudokuPuzzle {
  id: string;
  initialString: string;
  difficulty?: "easy" | "medium" | "hard";
}
