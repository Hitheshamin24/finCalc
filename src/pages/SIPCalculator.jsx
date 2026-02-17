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

const SIPCalculator = () => {
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(12);
  const [time, setTime] = useState(10);

  // calculation
  const { invested, returns, total } = useMemo(() => {
    if (principal <= 0 || rate <= 0 || time <= 0) {
      return { invested: 0, returns: 0, total: 0 };
    }

    const monthlyRate = rate / 100 / 12;
    const months = time * 12;

    let futureValue = 0;

    if (monthlyRate === 0) {
      futureValue = principal * months;
    } else {
      futureValue =
        principal *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const investedAmount = principal * months;
    const returnsAmount = futureValue - investedAmount;

    return {
      invested: Math.round(investedAmount),
      returns: Math.round(returnsAmount),
      total: Math.round(futureValue),
    };
  }, [principal, rate, time]);

return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 sm:mt-6">

    {/* LEFT PANEL */}
    <div className="
      bg-[#0b1220] 
      border border-gray-800 
      p-3 sm:p-4 
      rounded-xl 
      space-y-3 sm:space-y-4
      shadow-lg
    ">

      <RangeInput
        label="Total Investment"
        value={principal}
        setValue={setPrincipal}
        min={500}
        max={100000}
        step={500}
        suffix="₹"
      />

      <RangeInput
        label="Expected Return (%)"
        value={rate}
        setValue={setRate}
        min={0}
        max={30}
        step={0.5}
        suffix="%"
      />

      <RangeInput
        label="Time Period"
        value={time}
        setValue={setTime}
        min={1}
        max={30}
        step={1}
        suffix="Years"
      />

    </div>

    {/* RIGHT PANEL */}
    <div className="
      bg-[#0b1220] 
      border border-gray-800 
      p-3 sm:p-4 
      rounded-xl 
      flex flex-col items-center 
      shadow-lg
    ">

      {/* CHART */}
      <div className="w-full flex justify-center">
        <div className="scale-90 sm:scale-100">
          <DonutChart
            invested={invested}
            returns={returns}
            total={total}
          />
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="
        grid 
        grid-cols-1 sm:grid-cols-3 
        gap-3 
        mt-4 sm:mt-6 
        w-full 
        text-xs sm:text-sm
      ">

        <div className="bg-gray-900 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-gray-400">Invested</p>
          <p className="text-white font-semibold">
            {formatINR(invested)}
          </p>
        </div>

        <div className="bg-gray-900 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-gray-400">Returns</p>
          <p className="text-blue-400 font-semibold">
            {formatINR(returns)}
          </p>
        </div>

        <div className="bg-gray-900 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-gray-400">Total</p>
          <p className="text-green-400 font-bold">
            {formatINR(total)}
          </p>
        </div>

      </div>

      {/* EXTRA INFO */}
      <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-400 text-center">
        Investment of {formatINR(principal)} grows at {rate}% for {time} years
      </div>

    </div>

  </div>
);

};

export default SIPCalculator;
