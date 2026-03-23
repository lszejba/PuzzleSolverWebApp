import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";

function HomePage() {
  const navigate = useNavigate();
  const beginnerSudokuState: string =
    "859367401130508690062149385085931760000074058201850934000490813013002540540603279";
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <h1>Select puzzle type:</h1>
      <LinkButton
        children="Sudoku"
        color="green"
        onClick={() =>
          navigate("/sudoku", { state: { initialState: beginnerSudokuState } })
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
