interface LinkButtonProps {
  children: string;
  color?: string;
  onClick: () => void;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-600 hover: bg-blue-700",
  green: "bg-green-600 hover: bg-green-700",
  red: "bg-red-600 hover: bg-red-700",
  yellow: "bg-yellow-600 hover: bg-yellow-700",
  orange: "bg-orange-600 hover: bg-orange-700",
  gray: "bg-gray-600 hover: bg-gray-700",
};

const LinkButton = ({ children, color = "blue", onClick }: LinkButtonProps) => {
  return (
    <button
      className={`w-128 px-6 py-3 ${colorMap[color]} text-white rounded-lg transition`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LinkButton;
