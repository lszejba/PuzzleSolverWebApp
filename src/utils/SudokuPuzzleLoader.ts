import { GenerateRandomSudoku, GenerateSudoku } from "./SudokuGenerator";

export const SudokuPuzzleLoader = (): [string, string, string, string] => {
  const easy = GenerateSudoku("easy");
  const medium = GenerateSudoku("medium");
  const hard = GenerateSudoku("hard");
  const random = GenerateRandomSudoku();
  return [easy, medium, hard, random];
};
