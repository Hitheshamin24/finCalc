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

const EMI = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [time, setTime] = useState(10);

  //   calculation
  const { emi, total, totalInterest } = useMemo(() => {
    if (principal <= 0 || time <= 0) {
      return { emi: 0, total: 0, totalInterest: 0 };
    }

    const monthlyRate = rate / 100 / 12;
    const months = time * 12;

    let emiValue = 0;

    if (monthlyRate === 0) {
      emiValue = principal / months;
    } else {
      emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emiValue * months;
    const interest = totalPayment - principal;

    return {
      emi: Math.round(emiValue),
      total: Math.round(totalPayment),
      totalInterest: Math.round(interest),
    };
  }, [principal, rate, time]);

return (
  <div className="grid md:grid-cols-2 gap-4 h-full min-h-0">

    {/* LEFT PANEL */}
    <div className="bg-[#0b1220] border border-gray-800 p-4 rounded-xl space-y-3 shadow-lg min-h-0">

      <RangeInput
        label="Loan Amount"
        value={principal}
        setValue={setPrincipal}
        min={10000}
        max={10000000}
        step={500}
        suffix="₹"
      />

      <RangeInput
        label="Interest Rate (%)"
        value={rate}
        setValue={setRate}
        min={0}
        max={30}
        step={0.1}
        suffix="%"
      />

      <RangeInput
        label="Tenure"
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
          invested={principal}
          returns={totalInterest}
          total={total}
        />
      </div>

      {/* EMI */}
      <div className="text-center">
        <p className="text-xs text-gray-400">EMI</p>
        <p className="text-lg font-bold text-green-400">
          {formatINR(emi)}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-2 w-full text-xs text-center">

        <div className="bg-gray-900 p-2 rounded-lg">
          <p className="text-gray-400">Principal</p>
          <p className="text-white font-semibold">
            {formatINR(principal)}
          </p>
        </div>

        <div className="bg-gray-900 p-2 rounded-lg">
          <p className="text-gray-400">Interest</p>
          <p className="text-blue-400 font-semibold">
            {formatINR(totalInterest)}
          </p>
        </div>

        <div className="bg-gray-900 p-2 rounded-lg">
          <p className="text-gray-400">Total</p>
          <p className="text-green-400 font-bold">
            {formatINR(total)}
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <p className="text-[10px] text-gray-400 text-center">
        {time} yrs • {rate}%
      </p>

    </div>

  </div>
);

};

export default EMI;
