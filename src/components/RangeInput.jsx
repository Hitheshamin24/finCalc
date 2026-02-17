import React from "react";

const RangeInput = ({
  label,
  value,
  setValue,
  min,
  max,
  step,
  suffix = "",
}) => {

  // Ensure number
  const safeValue = value === "" ? "" : Number(value);

  // 🎚 Slider Change
  const handleSliderChange = (e) => {
    setValue(Number(e.target.value));
  };

  // Input Change
  const handleInputChange = (e) => {
    let val = e.target.value;

    if (val === "") {
      setValue("");
      return;
    }

    val = Number(val);

    if (isNaN(val)) return;

    // clamp
    val = Math.max(min, Math.min(max, val));

    setValue(val);
  };


  // Progress
  const progress =
    safeValue === "" ? 0 : ((safeValue - min) / (max - min)) * 100;

  //  Format Value
  const formatValue = (num = safeValue) => {
  if (suffix === "₹") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num || 0);
  }
  return `${num || 0} ${suffix}`;
};


  return (
    <div className="space-y-4">

      {/* LABEL + VALUE */}
      <div className="flex justify-between items-center text-sm text-gray-300">
        <span>{label}</span>
        <span className="text-green-400 font-semibold">
          {formatValue()}
        </span>
      </div>

      {/* SLIDER */}
      <div className="relative">

        {/* Track */}
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tooltip */}
        <div
          className="absolute -top-7 text-xs bg-black px-2 py-1 rounded text-white whitespace-nowrap"
          style={{
            left: `${progress}%`,
            transform: "translateX(-50%)",
          }}
        >
          {formatValue()}
        </div>

        {/* Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue || 0}
          onChange={handleSliderChange}
          className="absolute top-0 w-full h-2 appearance-none bg-transparent cursor-pointer"
        />
      </div>

      {/* INPUT + BUTTONS */}
      <div className="flex gap-2">

        {/* Number Input */}
        <input
          type="number"
          value={safeValue}
          onChange={handleInputChange}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* - Button */}
        <button
          onClick={() =>
            setValue(Math.max((safeValue || 0) - step, min))
          }
          className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 active:scale-95 transition"
        >
          -
        </button>

        {/* + Button */}
        <button
          onClick={() =>
            setValue(Math.min((safeValue || 0) + step, max))
          }
          className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 active:scale-95 transition"
        >
          +
        </button>
      </div>

      {/* MIN MAX */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>

    </div>
  );
};

export default RangeInput;
