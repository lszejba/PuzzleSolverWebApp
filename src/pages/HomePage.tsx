import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { GenerateRandomSudoku } from "../utils/SudokuGenerator";

function HomePage() {
  const navigate = useNavigate();
  const randomSudokuState: string = GenerateRandomSudoku();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <h1>Select puzzle type:</h1>
      <LinkButton
        children="Sudoku"
        color="green"
        onClick={() =>
          navigate("/sudoku", { state: { initialState: randomSudokuState } })
        }
      />
      <LinkButton
        children="Griddlers"
        color="yellow"
        onClick={() => navigate("/griddlers")}
      />
    </div>
  );
}

export default HomePage;
