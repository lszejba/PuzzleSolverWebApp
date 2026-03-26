import { getSudoku } from "sudoku-gen";

export const GenerateRandomSudoku = (): string => {
  const sudoku = getSudoku();
  const result = sudoku.puzzle.replaceAll("-", "0");
  return result;
};

export const GenerateSudoku = (
  difficulty: "easy" | "medium" | "hard",
): string => {
  const sudoku = getSudoku(difficulty);
  const result = sudoku.puzzle.replaceAll("-", "0");
  return result;
};
