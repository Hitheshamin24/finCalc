import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const DonutChart = ({ invested, returns, total }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    { name: "Invested", value: invested },
    { name: "Returns", value: returns },
  ];

  const COLORS = ["#22c55e", "#38bdf8"];

  // format currency
  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num || 0);

  return (
    <div className="flex flex-col items-center">

      {/* Chart Container */}
      <div className="relative">

        <PieChart width={250} height={250}>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                style={{
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip
            formatter={(value) => formatINR(value)}
            contentStyle={{
              backgroundColor: "#0b1220",
              border: "1px solid #1f2937",
              borderRadius: "10px",
              color: "#fff",
            }}
          />
        </PieChart>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-400">Total Value</p>
          <p className="text-lg font-bold text-green-400">
            {formatINR(total)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-gray-300">Invested:</span>
          <span className="text-white font-semibold">
            {formatINR(invested)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full" />
          <span className="text-gray-300">Returns:</span>
          <span className="text-white font-semibold">
            {formatINR(returns)}
          </span>
        </div>

      </div>
    </div>
  );
};

export default DonutChart;
