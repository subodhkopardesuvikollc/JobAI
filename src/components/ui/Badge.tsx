interface BadgeProps {
  value: number; // 0-100
  showPercentage?: boolean; // Whether to show % symbol
}

const Badge = ({ value, showPercentage = true }: BadgeProps) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  const getColors = (val: number) => {
    if (val < 30)
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-200",
      };
    if (val >= 30 && val < 60)
      return {
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-200",
      };
    if (val >= 60 && val < 70)
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        border: "border-amber-200",
      };
    if (val >= 70 && val < 80)
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
      };
    if (val >= 80 && val < 85)
      return {
        bg: "bg-lime-100",
        text: "text-lime-700",
        border: "border-lime-200",
      };
    return {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
    };
  };

  const colors = getColors(clampedValue);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[13px] font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <p className="mr-[1.5px]">{Math.round(clampedValue)}</p>
      {showPercentage && "%"}
    </span>
  );
};

export default Badge;
