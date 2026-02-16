import React from "react";

const SliderInput = ({ label, value, setValue, min, max, step, suffix }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-300">
        <span>{label}</span>
        <span className="text-green-400 font-semibold">
          {suffix === "₹" ? "₹" : ""}
          {value}
          {suffix !== "₹" ? suffix : ""}
        </span>
      </div>
      <input type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 accent-green-400" />
    
    </div>
  );
};

export default SliderInput;
