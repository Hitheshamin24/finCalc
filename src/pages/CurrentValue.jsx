import { useState } from "react";
import RangeInput from "../components/RangeInput";
import DonutChart from "../components/DonutChart";

const CurrentValue = () => {
  const [futureValue, setFutureValue] = useState(100000);
  const [inflation, setInflation] = useState(6);
  const [years, setYears] = useState(10);

  const format = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const calculate = () => {
    if (!futureValue  || !years) {
      return { presentValue: 0, invested: 0, returns: 0, total: 0 };
    }

    const i = inflation / 100;

    // if inflation = 0
    if (i === 0) {
      return {
        presentValue: futureValue,
        invested: futureValue,
        returns: 0,
        total: futureValue,
      };
    }

    const pv = futureValue / Math.pow(1 + i, years);

    return {
      presentValue: Math.round(pv),
      invested: Math.round(pv),
      returns: Math.round(futureValue - pv),
      total: Math.round(futureValue),
    };
  };

  const { presentValue, invested, returns, total } = calculate();

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">

      {/* LEFT PANEL */}
      <div className="bg-[#0B1220] border border-gray-800 p-6 rounded-2xl space-y-6">

        <RangeInput
          label="Future Value"
          value={futureValue}
          setValue={setFutureValue}
          min={1000}
          max={10000000}
          step={1000}
          suffix="₹"
        />

        <RangeInput
          label="Inflation Rate (p.a)"
          value={inflation}
          setValue={setInflation}
          min={1}
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
          suffix=" yrs"
        />

      </div>

      {/* RIGHT PANEL */}
      <div className="bg-[#0B1220] border border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center">

        <DonutChart invested={invested} returns={returns} />

        <div className="mt-4 text-sm space-y-2 text-gray-300 text-center">

          <p>
            Current Value:{" "}
            <span className="text-white font-semibold">
              ₹{format(presentValue)}
            </span>
          </p>

          <p>
            Inflation Loss:{" "}
            <span className="text-red-400">
              ₹{format(returns)}
            </span>
          </p>

          <p className="text-green-400 font-bold text-lg">
            Future Value: ₹{format(total)}
          </p>

          <p className="text-xs text-yellow-400 mt-2">
            Value adjusted for inflation (real purchasing power)
          </p>

        </div>

      </div>

    </div>
  );
};

export default CurrentValue;
