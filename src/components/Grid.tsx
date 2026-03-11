import { useState } from "react";

const Grid = () => {
  const [cells, setCells] = useState<(number | null)[]>(Array(81).fill(null));

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

  return (
    <div className="grid grid-cols-9">
      {cells.map((cell, index) => (
        <button
          key={index}
          onClick={() => console.log("clicked cell", index)}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-blue-100 ${getCellBorder(index)}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default Grid;
