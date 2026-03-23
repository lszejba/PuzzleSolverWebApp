import { useLocation } from "react-router-dom";
import ControlHeader from "../components/ControlHeader";
import SudokuGrid from "../components/SudokuGrid";
import { useGameStore } from "../store/GameStore";
import { useEffect } from "react";

function SudokuPage() {
  const location = useLocation();
  const loadPuzzle = useGameStore((state) => state.loadPuzzle);

  useEffect(() => {
    const initialState = location.state?.initialState;
    if (initialState) {
      loadPuzzle(initialState);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <ControlHeader children="Sudoku" />
      <SudokuGrid />
    </div>
  );
}

export default SudokuPage;
