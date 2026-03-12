import { useState } from "react";

interface ButtonsRowProps {
  children: string;
  type: "main" | "hint";
  disabled: boolean;
}

const buttonSizeMap: Record<string, string> = {
  main: "w-13 h-13 rounded-full font-bold transition text-2xl",
  hint: "w-12 h-12 rounded-full font-semibold transition text-base",
};

const buttonPressedMap: Record<string, string> = {
  main: "bg-orange-800 text-gray-200 shadow-inner",
  hint: "bg-orange-600 text-gray-300 shadow-inner",
};

const buttonDefaultMap: Record<string, string> = {
  main: "bg-orange-200 text-gray-800 hover:bg-gray-300 shadow",
  hint: "bg-orange-300 text-gray-600 hover:bg-gray-400 shadow",
};

const buttonDisabled: string = "bg-gray-200 text-gray-600 shadow";

const ButtonsRow = ({
  children,
  type = "main",
  disabled = false,
}: ButtonsRowProps) => {
  const [pressedButtons, setPressedButtons] = useState<Set<number>>(new Set());

  const handleButtonPress = (num: number) => {
    setPressedButtons((prev) => {
      if (disabled) {
        return prev;
      }
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const getButtonStyle = (num: number): string => {
    if (disabled) return buttonDisabled;
    return pressedButtons.has(num)
      ? buttonPressedMap[type]
      : buttonDefaultMap[type];
  };

  return (
    <div className="flex gap-2">
      <h3>{children}</h3>
      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => {
        const isPressed = pressedButtons.has(num);
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
    </div>
  );
};

export default ButtonsRow;
