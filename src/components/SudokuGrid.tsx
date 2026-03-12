import { useState } from "react";
import ButtonsRow from "./ButtonsRow";

interface CellProps {
  index: number;
  cell: number | null;
  selectedIndex: number;
  setSelectedIndex: (newIndex: number) => void;
}

const Cell = ({ index, cell, selectedIndex, setSelectedIndex }: CellProps) => {
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
      className={`w-15 h-15 flex items-center justify-center cursor-pointer hover: ${index === selectedIndex ? "bg-blue-100" : "bg-transparent"} ${getCellBorder(index)}`}
    >
      {cell}
    </button>
  );
};

const SudokuGrid = () => {
  const [cells, setCells] = useState<(number | null)[]>(Array(81).fill(null));
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-9">
        {cells.map((cell, index) => (
          <Cell
            index={index}
            cell={cell}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ))}
      </div>
      <ButtonsRow children="!" type="main" disabled={selectedIndex === -1} />
      <ButtonsRow children="?" type="hint" disabled={selectedIndex === -1} />
    </>
  );
};

export default SudokuGrid;
