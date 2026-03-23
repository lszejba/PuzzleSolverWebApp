import { useEffect, useState } from "react";
import { useGameStore } from "../store/GameStore";
import ButtonsRow from "./ButtonsRow";
import { validateCells, checkIfCompleted } from "../utils/SudokuValidation";
import SudokuGameOverModal from "./SudokuGameOverModal";
import confetti from "canvas-confetti";

interface CellProps {
  index: number;
  selectedIndex: number;
  setSelectedIndex: (newIndex: number) => void;
  value: string;
  hints: string;
  isInitial: boolean;
  error: boolean;
}

const Cell = ({
  index,
  selectedIndex,
  setSelectedIndex,
  value,
  hints,
  isInitial,
  error,
}: CellProps) => {
  const getCellBorder = (index: number) => {
    const row = Math.floor(index / 9);
    const col = index % 9;

    const borderTop =
      row === 0 ? "border-t-4" : row % 3 === 0 ? "border-t-3" : "border-t";
    const borderLeft =
      col === 0 ? "border-l-4" : col % 3 === 0 ? "border-l-3" : "border-l";
    const borderBottom = row === 8 ? "border-b-4" : "border-b-0";
    const borderRight = col === 8 ? "border-r-4" : "border-r-0";

    return `${borderTop} ${borderLeft} ${borderBottom} ${borderRight} border-gray-400`;
  };

  const getText = (value: string, hints: string) => {
    if (value === "") {
      const digits = new Set(Array.from(hints, Number));
      const rows: string[] = [];
      for (let row = 0; row < 3; row++) {
        const cells: string[] = [];
        for (let col = 1; col <= 3; col++) {
          const digit = row * 3 + col;
          cells.push(digits.has(digit) ? String(digit) : " ");
        }
        rows.push(cells.join("\t"));
      }
      return rows.join("\n");
    } else {
      return value;
    }
  };

  const handleButtonPress = () => {
    if (isInitial) return;
    if (selectedIndex === index) {
      setSelectedIndex(-1);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <button
      key={index}
      onClick={() => handleButtonPress()}
      className={`${value === "" ? "text-xs" : isInitial ? "text-3xl" : "text-2xl"} ${error === true ? "text-red-500" : isInitial ? "text-gray-300" : "text-gray-500"} whitespace-pre w-15 h-15 flex items-center justify-center cursor-pointer hover: ${index === selectedIndex ? "bg-blue-100/50" : "bg-transparent"} ${getCellBorder(index)}`}
    >
      {getText(value, hints)}
    </button>
  );
};

const SudokuGrid = () => {
  const cells = useGameStore((state) =>
    state.timeline.cursor >= 0
      ? state.timeline.states[state.timeline.cursor].cells
      : state.initialCells,
  );
  const pushState = useGameStore((state) => state.pushState);

  const [cellErrors, setCellErrors] = useState<boolean[]>(
    Array(81).fill(false),
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (cells.length === 0) return;
    const errors = validateCells(cells);
    setCellErrors(errors);
  }, [cells]);

  useEffect(() => {
    if (cells.length === 0) return;
    if (checkIfCompleted(cells, cellErrors)) {
      setShowGameOver(true);
      confetti({ particleCount: 150, spread: 70 });
    }
  }, [cellErrors]);

  const handleButtonsRowChange = (
    index: number,
    field: "value" | "hints",
    newValue: string,
  ) => {
    const next = cells.map((cell, i) =>
      i === index ? { ...cell, [field]: newValue } : cell,
    );
    pushState(next);
  };

  return (
    <>
      {showGameOver && (
        <SudokuGameOverModal onClose={() => setShowGameOver(false)} />
      )}
      <div className="grid grid-cols-9">
        {cells.map(({ value, hints, isInitial }, index) => (
          <Cell
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            value={value}
            hints={hints}
            isInitial={isInitial}
            error={cellErrors[index]}
          />
        ))}
      </div>
      <ButtonsRow
        type="main"
        selectedIndex={selectedIndex}
        values={selectedIndex === -1 ? "" : cells[selectedIndex].value}
        onChange={(newValue) =>
          handleButtonsRowChange(selectedIndex, "value", newValue)
        }
        onAfterChange={() => setSelectedIndex(-1)}
      />
      <ButtonsRow
        type="hint"
        selectedIndex={selectedIndex}
        values={selectedIndex === -1 ? "" : cells[selectedIndex].hints}
        onChange={(newValue) =>
          handleButtonsRowChange(selectedIndex, "hints", newValue)
        }
      />
    </>
  );
};

export default SudokuGrid;
