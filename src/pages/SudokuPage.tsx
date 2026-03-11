import { useNavigate } from "react-router-dom";
import ControlHeader from "../components/ControlHeader";
import Grid from "../components/Grid";

function SudokuPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-orange-600">Sudoku</h2>
      <ControlHeader children="Sudoku solver" />
      <Grid />
    </div>
  );
}

export default SudokuPage;
