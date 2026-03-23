import { create } from "zustand";
import type { GameTimeline, CellData } from "../types/Sudoku";
import { parseInitialState } from "../utils/SudokuEncoding";

interface GameStore {
  initialCells: CellData[];
  timeline: GameTimeline;
  pushState: (cells: CellData[], source?: "user" | "external") => void;
  goTo: (index: number) => void;
  undo: () => void;
  redo: () => void;
  currentCells: () => CellData[];
  loadPuzzle: (initialState: string) => void;
}

const emptyTimeline: GameTimeline = {
  states: [],
  cursor: -1,
};

const emptyCellData: CellData[] = Array.from({ length: 81 }, () => ({
  value: "",
  hints: "",
  isInitial: false,
}));

export const useGameStore = create<GameStore>((set, get) => ({
  initialCells: emptyCellData,
  timeline: emptyTimeline,

  pushState: (cells, source = "user") => {
    set((prev) => {
      const { states, cursor } = prev.timeline;
      const trimmed = states.slice(0, cursor + 1);
      const next = [...trimmed, { cells, timestamp: Date.now(), source }];
      return { timeline: { states: next, cursor: next.length - 1 } };
    });
  },

  goTo: (index) => {
    set((prev) => {
      const { states } = prev.timeline;
      if (index < 0 || index >= states.length) return prev;
      return { timeline: { ...prev.timeline, cursor: index } };
    });
  },

  undo: () => {
    set((prev) => {
      const { cursor } = prev.timeline;
      if (cursor < 0) return prev;
      return { timeline: { ...prev.timeline, cursor: cursor - 1 } };
    });
  },

  redo: () => {
    set((prev) => {
      const { states, cursor } = prev.timeline;
      if (cursor >= states.length - 1) return prev;
      return { timeline: { ...prev.timeline, cursor: cursor + 1 } };
    });
  },

  currentCells: () => {
    const { states, cursor } = get().timeline;
    return cursor >= 0 ? states[cursor].cells : get().initialCells;
  },

  loadPuzzle: (initialState: string) => {
    set({
      initialCells: parseInitialState(initialState),
      timeline: emptyTimeline,
    });
  },
}));
