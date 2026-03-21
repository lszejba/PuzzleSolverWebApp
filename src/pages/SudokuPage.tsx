import ControlHeader from "../components/ControlHeader";
import SudokuGrid from "../components/SudokuGrid";

function SudokuPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <ControlHeader children="Sudoku" />
      <SudokuGrid />
    </div>
  );
}

export default SudokuPage;
