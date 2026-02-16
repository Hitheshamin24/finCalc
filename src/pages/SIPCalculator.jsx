import { useState } from "react";
import SliderInput from "../components/SliderInput";
import DonutChart from "../components/DonutChart";
import RangeInput from "../components/RangeInput";

const SIPCalculator = () => {
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(12);
  const [time, setTime] = useState(10);

  const calculate = () => {
    if (!principal || !rate || !time)
      return { invested: 0, returns: 0, total: 0 };

    const r = rate / 100 / 12;
    const n = time * 12;

    const futureValue = principal * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = principal * n;
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
      {/* left panel */}
      <div className="bg-[#0b1220] border border-gray-800 p-6 rounded-2xl space-y-6">
        <RangeInput
          label="Monthly investment"
          value={principal}
          setValue={setPrincipal}
          min={500}
          max={100000}
          step={500}
          suffix="₹"
        />
        <RangeInput
          label="Expected Return (p.a)"
          value={rate}
          setValue={setRate}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
        />
        <RangeInput
          label="Time Period (Years)"
          value={time}
          setValue={setTime}
          min={1}
          max={30}
          step={1}
          suffix="Years"
        />
      </div>

      {/* Right Panel */}
      <div className="bg-[#0b1220] border border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center">
        <DonutChart invested={invested} returns={returns} total={total} />

        <div className="mt-4  text-sm space-y-2 text-gray-300">
          <p>Invested Amount : ₹{invested.toLocaleString("en-IN")}</p>
          <p>Est. Returns :₹{returns.toLocaleString("en-IN")}</p>

          <p className="text-green-400 font-bold text-lg">
            Total Value : ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
