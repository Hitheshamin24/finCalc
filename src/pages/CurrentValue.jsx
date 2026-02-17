import { useState, useMemo } from "react";
import RangeInput from "../components/RangeInput";
import DonutChart from "../components/DonutChart";

//  Currency formatter
const formatINR = (num) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num || 0);

const CurrentValue = () => {
  const [futureValue, setFutureValue] = useState(100000);
  const [inflation, setInflation] = useState(6);
  const [years, setYears] = useState(10);

  //  calculation
  const { presentValue, invested, returns, total } = useMemo(() => {
    if (futureValue <= 0 || years <= 0) {
      return { presentValue: 0, invested: 0, returns: 0, total: 0 };
    }

    const inflationRate = inflation / 100;

    let pv = 0;

    // edge case
    if (inflationRate === 0) {
      pv = futureValue;
    } else {
      pv = futureValue / Math.pow(1 + inflationRate, years);
    }

    const inflationLoss = futureValue - pv;

    return {
      presentValue: Math.round(pv),
      invested: Math.round(pv),
      returns: Math.round(inflationLoss),
      total: Math.round(futureValue),
    };
  }, [futureValue, inflation, years]);

  return (
    <div className="grid md:grid-cols-2 gap-4 h-full min-h-0">
      {/* LEFT PANEL */}
      <div className="bg-[#0B1220] border border-gray-800 p-4 rounded-xl space-y-3 shadow-lg min-h-0">
        <RangeInput
          label="Future Value"
          value={futureValue}
          setValue={setFutureValue}
          min={1000}
          max={1000000000}
          step={1000}
          suffix="₹"
        />

        <RangeInput
          label="Inflation Rate (%)"
          value={inflation}
          setValue={setInflation}
          min={0}
          max={12}
          step={0.1}
          suffix="%"
        />

        <RangeInput
          label="Time Period"
          value={years}
          setValue={setYears}
          min={1}
          max={40}
          step={1}
          suffix="Years"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-[#0B1220] border border-gray-800 p-4 rounded-xl flex flex-col items-center justify-between shadow-lg min-h-0">
        {/* CHART (smaller) */}
        <div className="scale-90">
          <DonutChart invested={invested} returns={returns} total={total} />
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-2 w-full text-center text-xs">
          <div className="bg-gray-900 p-2 rounded-lg">
            <p className="text-gray-400">Current</p>
            <p className="text-white font-semibold">
              {formatINR(presentValue)}
            </p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg">
            <p className="text-gray-400">Loss</p>
            <p className="text-red-400 font-semibold">{formatINR(returns)}</p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg">
            <p className="text-gray-400">Future</p>
            <p className="text-green-400 font-bold">{formatINR(total)}</p>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-[10px] text-yellow-400 text-center">
          Inflation reduces purchasing power
        </p>
      </div>
    </div>
  );
};

export default CurrentValue;
