import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/GameStore";
import { usePlayback } from "../hooks/UsePlayback";

interface ControlHeaderProps {
  children: string;
}

const ControlHeader = ({ children }: ControlHeaderProps) => {
  const navigate = useNavigate();
  const { undo, redo } = useGameStore();
  const { play, pause, isPlaying, canUndo, canRedo } = usePlayback();

  return (
    <div className="flex flex-row items-center gap-4 p-1">
      <span className="font-bold text-lg">{children}</span>
      <div className="h-10 w-1 bg-gray-300"></div>
      <button
        onClick={undo}
        disabled={!canUndo}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
      >
        Prev
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
      >
        Next
      </button>
      <div className="h-10 w-1 bg-gray-300"></div>
      <button
        onClick={isPlaying ? pause : play}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
      >
        Play / Pause
      </button>
      <div className="h-10 w-1 bg-gray-300"></div>
      <button
        onClick={() => navigate("/")}
        className="ml-auto px-4 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
      >
        ← Home
      </button>
    </div>
  );
};

export default ControlHeader;
