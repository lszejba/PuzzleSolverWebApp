import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { SudokuPuzzleLoader } from "../utils/SudokuPuzzleLoader";

function HomePage() {
  const navigate = useNavigate();
  const [
    easySudokuState,
    mediumSudokuState,
    hardSudokuState,
    randomSudokuState,
  ] = SudokuPuzzleLoader();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <h1>Select puzzle type:</h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <h2>Sudoku</h2>
        <LinkButton
          children="Easy"
          color="green"
          onClick={() =>
            navigate("/sudoku", { state: { initialState: easySudokuState } })
          }
          width="32"
        />
        <LinkButton
          children="Medium"
          color="green"
          onClick={() =>
            navigate("/sudoku", { state: { initialState: mediumSudokuState } })
          }
          width="32"
        />
        <LinkButton
          children="Hard"
          color="green"
          onClick={() =>
            navigate("/sudoku", { state: { initialState: hardSudokuState } })
          }
          width="32"
        />
        <LinkButton
          children="Random"
          color="green"
          onClick={() =>
            navigate("/sudoku", { state: { initialState: randomSudokuState } })
          }
          width="32"
        />{" "}
      </div>
      <LinkButton
        children="Griddlers"
        color="yellow"
        onClick={() => navigate("/griddlers")}
        width="128"
      />
    </div>
  );
}

export default HomePage;
