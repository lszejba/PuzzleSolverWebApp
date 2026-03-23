import type { CellData } from "../types/Sudoku";

export const parseInitialState = (str: string): CellData[] => {
  const result: CellData[] = str.split("").map((val) => ({
    value: val === "0" ? "" : val,
    hints: "",
    isInitial: val != "0" && val != "",
  }));
  return result;
};

export const serializeState = (cells: CellData[]): string => {
  const result = cells.map((cell) => cell.value).join("");
  return result;
};
