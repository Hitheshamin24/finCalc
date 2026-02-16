import { PieChart, Pie, Cell } from "recharts";
import React from "react";

const DonutChart = ({ invested, returns }) => {
  const data = [
    { name: "Invested Amount", value: invested },
    { name: "Returns", value: returns },
  ];

  const COLORS = ["#34D399", "#38BDF8"];

  return (
    <div>
      <PieChart width={220} height={220}>
        {/* Notice how data, innerRadius, outerRadius, and dataKey are INSIDE the opening <Pie> tag */}
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default DonutChart;