// import { useState } from "react";

const RangeInput = ({
  label,
  value,
  setValue,
  min,
  max,
  step,
  suffix = "",
}) => {
  const handleSliderChange = (e) => {
    setValue(Number(e.target.value));
  };

  const handleInputChange = (e) => {
    let val = e.target.value;

    // Allow empty input
    if (val === "") {
      setValue("");
      return;
    }

    val = Number(val);

    // Clamp values
    if (val < min) val = min;
    if (val > max) val = max;

    setValue(val);
  };

  return (
    <div className="space-y-3">

      {/* LABEL + VALUE */}
      <div className="flex justify-between text-sm text-gray-300">
        <span>{label}</span>
        <span className="text-green-400 font-semibold">
          {suffix === "₹" ? "₹" : ""}
          {value}
          {suffix !== "₹" ? suffix : ""}
        </span>
      </div>

      {/* SLIDER */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value || 0}
        onChange={handleSliderChange}
        className="w-full accent-green-400"
      />

      {/* INPUT FIELD */}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
};

export default RangeInput;
