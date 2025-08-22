interface MeterProps {
  value: number;
  title: string;
  size: number;
}

const Meter = ({ value, title, size }: MeterProps) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  const getColor = (val: number) => {
    if (val < 50) return "#dc2626";
    if (val >= 50 && val < 65) return "#ea580c";
    if (val >= 65 && val < 75) return "#ca8a04";
    if (val >= 75 && val < 85) return "#65a30d";
    return "#16a34a";
  };

  const color = getColor(clampedValue);

  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.5s ease-in-out",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-bold text-gray-700"
            style={{ fontSize: size * 0.19, color: color }}
          >
            {Math.round(clampedValue)}%
          </span>
        </div>
      </div>

      <p
        className="text-center text-gray-600 font-medium mt-2"
        style={{ fontSize: size * 0.11 }}
      >
        {title}
      </p>
    </div>
  );
};

export default Meter;
