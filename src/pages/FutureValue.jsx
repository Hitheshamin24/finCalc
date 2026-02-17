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

const FutureValue = () => {
  const [currentValue, setCurrentValue] = useState(5000);
  const [rate, setRate] = useState(6);
  const [time, setTime] = useState(10);

  //  calculation
  const { invested, returns, total } = useMemo(() => {
    if (currentValue <= 0 || time <= 0) {
      return { invested: 0, returns: 0, total: 0 };
    }

    const inflationRate = rate / 100;

    let futureValue = 0;

    // edge case
    if (inflationRate === 0) {
      futureValue = currentValue;
    } else {
      futureValue =
        currentValue * Math.pow(1 + inflationRate, time);
    }

    const increase = futureValue - currentValue;

    return {
      invested: Math.round(currentValue),
      returns: Math.round(increase),
      total: Math.round(futureValue),
    };
  }, [currentValue, rate, time]);

  return (
  <div className="grid md:grid-cols-2 gap-4 h-full min-h-0">

    {/* LEFT PANEL */}
    <div className="bg-[#0b1220] border border-gray-800 p-4 rounded-xl space-y-3 shadow-lg min-h-0">

      <RangeInput
        label="Current Price"
        value={currentValue}
        setValue={setCurrentValue}
        min={500}
        max={100000000}
        step={500}
        suffix="₹"
      />

      <RangeInput
        label="Inflation"
        value={rate}
        setValue={setRate}
        min={0}
        max={12}
        step={0.1}
        suffix="%"
      />

      <RangeInput
        label="Time"
        value={time}
        setValue={setTime}
        min={1}
        max={30}
        step={1}
        suffix="Years"
      />

    </div>

    {/* RIGHT PANEL */}
    <div className="bg-[#0b1220] border border-gray-800 p-4 rounded-xl flex flex-col justify-between items-center shadow-lg min-h-0">

      {/* CHART */}
      <div className="scale-90">
        <DonutChart
          invested={invested}
          returns={returns}
          total={total}
        />
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-2 w-full text-xs text-center">

        <div className="bg-gray-900 p-2 rounded-lg">
          <p className="text-gray-400">Current</p>
          <p className="text-white font-semibold">
            {formatINR(invested)}
          </p>
        </div>

        <div className="bg-gray-900 p-2 rounded-lg">
          <p className="text-gray-400">Increase</p>
          <p className="text-red-400 font-semibold">
            {formatINR(returns)}
          </p>
        </div>

        <div className="bg-gray-900 p-2 rounded-lg">
          <p className="text-gray-400">Future</p>
          <p className="text-green-400 font-bold">
            {formatINR(total)}
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <p className="text-[10px] text-yellow-400 text-center">
        Inflation raises future cost
      </p>

    </div>

  </div>
);

};

export default FutureValue;
