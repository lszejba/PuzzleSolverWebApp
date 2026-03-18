import { useEffect, useState } from "react";

interface ButtonsRowProps {
  type: "main" | "hint";
  selectedIndex: number;
  values: string;
  onChange?: (newValue: string) => void;
  onAfterChange?: () => void;
}

const buttonSizeMap: Record<string, string> = {
  main: "w-13 h-13 rounded-full font-bold transition text-2xl",
  hint: "w-11 h-12 rounded-xl font-semibold transition text-base",
};

const buttonPressedMap: Record<string, string> = {
  main: "bg-green-800 text-gray-200 shadow-inner",
  hint: "bg-green-600 text-gray-300 shadow-inner",
};

const buttonDefaultMap: Record<string, string> = {
  main: "bg-green-200 text-gray-800 hover:bg-gray-300 shadow",
  hint: "bg-green-300 text-gray-600 hover:bg-gray-400 shadow",
};

const buttonDisabled: string = "bg-gray-200 text-gray-600 shadow";

const ButtonsRow = ({
  type = "main",
  selectedIndex,
  values = "",
  onChange,
  onAfterChange,
}: ButtonsRowProps) => {
  const [pressedButtons, setPressedButtons] = useState(
    () => new Set<number>(Array.from(values, Number)),
  );

  const allSelected = type === "hint" && pressedButtons.size === 9;

  useEffect(() => {
    setPressedButtons(new Set(Array.from(values, Number)));
  }, [values, selectedIndex]);

  const handleButtonPress = (num: number) => {
    setPressedButtons((prev) => {
      if (selectedIndex === -1) {
        return prev;
      }

      let next: Set<number>;
      if (type === "main" && prev.size > 0) {
        next = prev.has(num) ? new Set() : new Set([num]);
      } else {
        next = new Set(prev);
        next.has(num) ? next.delete(num) : next.add(num);
      }

      onChange?.(
        Array.from(next)
          .sort((a, b) => a - b)
          .join(""),
      );
      onAfterChange?.();
      return next;
    });
  };

  const handleAllPress = () => {
    if (selectedIndex === -1) return;

    const next = allSelected
      ? new Set<number>()
      : new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    onChange?.(
      Array.from(next)
        .sort((a, b) => a - b)
        .join(""),
    );
    onAfterChange?.();
    setPressedButtons(next);
  };

  const getButtonStyle = (num: number): string => {
    if (selectedIndex === -1) return buttonDisabled;
    return pressedButtons.has(num)
      ? buttonPressedMap[type]
      : buttonDefaultMap[type];
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => {
        return (
          <button
            key={num}
            onClick={() => handleButtonPress(num)}
            className={`${buttonSizeMap[type]} ${getButtonStyle(num)}`}
          >
            {num}
          </button>
        );
      })}
      {type === "hint" && (
        <button
          onClick={handleAllPress}
          className={`w-11 h-12 rounded-xl font-semibold transition text-sm ${
            selectedIndex === -1
              ? buttonDisabled
              : allSelected
                ? buttonPressedMap[type]
                : buttonDefaultMap[type]
          }`}
        >
          All
        </button>
      )}
    </div>
  );
};

export default ButtonsRow;
