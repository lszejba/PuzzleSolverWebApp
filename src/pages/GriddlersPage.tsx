import { useNavigate } from "react-router-dom";
import ControlHeader from "../components/ControlHeader";

function GriddlersPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <ControlHeader children="Griddlers" />
    </div>
  );
}

export default GriddlersPage;
