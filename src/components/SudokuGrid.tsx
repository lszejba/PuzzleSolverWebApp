import { useState } from "react";
import ButtonsRow from "./ButtonsRow";

interface CellData {
  value: string;
  hints: string;
}

interface CellProps {
  index: number;
  selectedIndex: number;
  setSelectedIndex: (newIndex: number) => void;
  value: string;
  hints: string;
}

const Cell = ({
  index,
  selectedIndex,
  setSelectedIndex,
  value,
  hints,
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
    if (selectedIndex === -1) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(-1);
    }
  };

  return (
    <button
      key={index}
      onClick={() => handleButtonPress()}
      className={`${value === "" ? "text-xs" : "text-2xl"} whitespace-pre w-15 h-15 flex items-center justify-center cursor-pointer hover: ${index === selectedIndex ? "bg-blue-100" : "bg-transparent"} ${getCellBorder(index)}`}
    >
      {getText(value, hints)}
    </button>
  );
};

const SudokuGrid = () => {
  const [cells, setCells] = useState<CellData[]>(
    Array(81)
      .fill(null)
      .map(() => ({ value: "", hints: "" })),
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleButtonsRowChange = (
    index: number,
    field: "value" | "hints",
    newValue: string,
  ) => {
    setCells((prev) =>
      prev.map((cell, i) =>
        i === index ? { ...cell, [field]: newValue } : cell,
      ),
    );
  };

  return (
    <>
      <div className="grid grid-cols-9">
        {cells.map(({ value, hints }, index) => (
          <Cell
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            value={value}
            hints={hints}
          />
        ))}
      </div>
      <ButtonsRow
        children="!"
        type="main"
        selectedIndex={selectedIndex}
        values={selectedIndex === -1 ? "" : cells[selectedIndex].value}
        onChange={(newValue) =>
          handleButtonsRowChange(selectedIndex, "value", newValue)
        }
      />
      <ButtonsRow
        children="?"
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
