import type { CellData } from "../types/Sudoku";

export const validateCells = (cells: CellData[]): boolean[] => {
  const result = new Array<boolean>(81).fill(false);
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].value === "") {
      continue;
    }
    let value = cells[i].value;
    const row = Math.floor(i / 9);
    const column = i % 9;
    // check row
    for (let j = 0; j < 9; j++) {
      let rowIndex = row * 9 + j;
      if (rowIndex === i) continue;
      if (cells[rowIndex].value === value) {
        result[i] = true;
      }
    }
    // check column
    for (let k = 0; k < 9; k++) {
      let colIndex = k * 9 + column;
      if (colIndex === i) continue;
      if (cells[colIndex].value === value) {
        result[i] = true;
      }
    }
    // check square
    let rowIndices;
    let colIndices;
    if (row <= 2) {
      rowIndices = [0, 1, 2];
    } else if (row <= 5) {
      rowIndices = [3, 4, 5];
    } else {
      rowIndices = [6, 7, 8];
    }
    if (column <= 2) {
      colIndices = [0, 1, 2];
    } else if (column <= 5) {
      colIndices = [3, 4, 5];
    } else {
      colIndices = [6, 7, 8];
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        let index = rowIndices[r] * 9 + colIndices[c];
        if (index === i) continue;
        if (cells[index].value === value) {
          result[i] = true;
        }
      }
    }
  }
  return result;
};
