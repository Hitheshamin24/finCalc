import React, { useRef, useEffect, useState } from "react";

const tabs = [
  "SIP",
  "Step-Up SIP",
  "EMI",
  "Lump sum",
  "Current Value",
  "Future Value",
];

const TabNavigation = ({ active, setActive }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);

  useEffect(() => {
    const index = tabs.indexOf(active);
    const el = tabRefs.current[index];

    if (el) {
      setIndicatorStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
      });
    }
  }, [active]);

  return (
    <div className="mt-6">
      <div className="relative flex gap-2 overflow-x-auto bg-[#0b1220] border border-gray-800 p-2 rounded-xl">

        {/* Sliding Indicator */}
        <div
          className="absolute bottom-2 h-1 bg-green-400 rounded-full transition-all duration-300"
          style={indicatorStyle}
        />

        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => setActive(tab)}
            className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
              ${
                active === tab
                  ? "text-green-400"
                  : "text-gray-300 hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
