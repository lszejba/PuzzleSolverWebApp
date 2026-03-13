import ControlHeader from "../components/ControlHeader";
import SudokuGrid from "../components/SudokuGrid";

function SudokuPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-orange-600">Sudoku</h2>
      <ControlHeader children="Sudoku solver" />
      <SudokuGrid />
    </div>
  );
}

export default SudokuPage;
