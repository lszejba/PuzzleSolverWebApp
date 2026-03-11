import { useNavigate } from "react-router-dom";
import ControlHeader from "../components/ControlHeader";

function GriddlersPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-green-600">Griddlers</h2>
      <ControlHeader children="Griddlers solver" />
    </div>
  );
}

export default GriddlersPage;
