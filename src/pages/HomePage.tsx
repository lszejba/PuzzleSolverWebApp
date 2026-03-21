import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <h1>Select puzzle type:</h1>
      <LinkButton
        children="Sudoku"
        color="green"
        onClick={() => navigate("/sudoku")}
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
