import { useState } from "react";
import RangeInput from "../components/RangeInput";
import DonutChart from "../components/DonutChart";

const FutureValue = () => {
  const [currentValue, setCurrentValue] = useState(5000);
  const [rate, setRate] = useState(6); // inflation default
  const [time, setTime] = useState(10);

  const calculate = () => {
    if (!currentValue || !rate || !time)
      return { invested: 0, returns: 0, total: 0 };

    const r = rate / 100;

    if (r === 0) {
      return {
        invested: currentValue,
        returns: 0,
        total: currentValue,
      };
    }

    const futureValue = currentValue * Math.pow(1 + r, time);
    const invested = currentValue;
    const returns = futureValue - invested;

    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(futureValue),
    };
  };

  const { invested, returns, total } = calculate();

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">

      {/* LEFT PANEL */}
      <div className="bg-[#0b1220] border border-gray-800 p-6 rounded-2xl space-y-6">

        <RangeInput
          label="Current Price"
          value={currentValue}
          setValue={setCurrentValue}
          min={500}
          max={100000}
          step={500}
          suffix="₹"
        />

        <RangeInput
          label="Inflation Rate (p.a)"
          value={rate}
          setValue={setRate}
          min={1}
          max={12}
          step={0.1}
          suffix="%"
        />

        <RangeInput
          label="Time Period"
          value={time}
          setValue={setTime}
          min={1}
          max={30}
          step={1}
          suffix=" yrs"
        />

      </div>

      {/* RIGHT PANEL */}
      <div className="bg-[#0b1220] border border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center">

        <DonutChart invested={invested} returns={returns} />

        <div className="mt-4 text-sm space-y-2 text-gray-300">

          <p>
            Current Price: ₹{invested.toLocaleString("en-IN")}
          </p>

          <p>
            Price Increase:{" "}
            <span className="text-red-400">
              ₹{returns.toLocaleString("en-IN")}
            </span>
          </p>

          <p className="text-green-400 font-bold text-lg">
            Future Price: ₹{total.toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-yellow-400 mt-2">
            Estimated future cost considering inflation
          </p>

        </div>

      </div>

    </div>
  );
};

export default FutureValue;
