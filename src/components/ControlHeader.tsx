import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ControlHeaderProps {
  children: string;
}

const ControlHeader = ({ children }: ControlHeaderProps) => {
  const navigate = useNavigate();
  const [isAuto, setIsAuto] = useState(false);

  return (
    <div className="flex flex-row items-center gap-4 p-2 border-b">
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
  );
};

export default ControlHeader;
