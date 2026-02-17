import React from "react";

const SliderInput = ({
  label,
  value,
  setValue,
  min,
  max,
  step,
  suffix,
}) => {
  // calculate progress %
  const progress = ((value - min) / (max - min)) * 100;

  // format value
  const formatValue = () => {
    if (suffix === "₹") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value);
    }
    return `${value} ${suffix}`;
  };

  return (
    <div className="space-y-3">
      {/* Label + Value */}
      <div className="flex justify-between text-sm text-gray-300">
        <span>{label}</span>
        <span className="text-green-400 font-semibold">
          {formatValue()}
        </span>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Track */}
        <div className="w-full h-2 bg-gray-700 rounded-full">
          {/* Progress */}
          <div
            className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tooltip */}
        <div
          className="absolute -top-7 text-xs bg-black px-2 py-1 rounded text-white"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        >
          {suffix === "₹"
            ? new Intl.NumberFormat("en-IN").format(value)
            : value}
        </div>

        {/* Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute top-0 w-full h-2 appearance-none bg-transparent cursor-pointer"
        />
      </div>

      {/* Min Max */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SliderInput;
