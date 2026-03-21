import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/GameStore";
import { usePlayback } from "../hooks/UsePlayback";

interface ControlHeaderProps {
  children: string;
}

const ControlHeader = ({ children }: ControlHeaderProps) => {
  const navigate = useNavigate();
  const [isAuto, setIsAuto] = useState(false);
  const { undo, redo } = useGameStore();
  const { play, pause, isPlaying, canUndo, canRedo } = usePlayback();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row items-center gap-4 p-1">
        <span className="font-bold text-lg">{children}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Manual</span>
          <button
            role="switch"
            aria-checked={isAuto}
            onClick={() => setIsAuto(!isAuto)}
            className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
              isAuto ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 mt-0.5 ${
                isAuto ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm">Auto</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="ml-auto px-4 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          ← Home
        </button>
      </div>
      <div className="flex flex-row items-center gap-4 p-1">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
        >
          Prev
        </button>
        <button
          onClick={isPlaying ? pause : play}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
        >
          Play / Pause
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ControlHeader;
