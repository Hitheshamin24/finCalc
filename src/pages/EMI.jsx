import { useState } from "react";
import SliderInput from "../components/SliderInput";
import DonutChart from "../components/DonutChart";
import RangeInput from "../components/RangeInput";

const EMI = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(12);
  const [time, setTime] = useState(10);

  const calculate = () => {
    const r = rate / 100 / 12;
    const n = time * 12;
    if (r == 0) {
      const emi = principal / n;
      return {
        emi: Math.round(emi),
        total: Math.round(principal),
        totalInterest: 0,
      };
    }
    const emi=(principal * r * Math.pow(1+r,n))/(Math.pow(1+r,n)-1)
    const total = emi * n;
    const totalInterest = total - principal;

    

    return {
      emi: Math.round(emi),
      total: Math.round(total),
      totalInterest: Math.round(totalInterest),
    };
  };
  const { emi, total, totalInterest } = calculate();
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* left panel */}
      <div className="bg-[#0b1220] border border-gray-800 p-6 rounded-2xl space-y-6">
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
          label="Interest Rate (p.a)"
          value={rate}
          setValue={setRate}
          min={1}
          max={30}
          step={0.1}
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
        <DonutChart invested={principal} returns={totalInterest} total={total} />

        <div className="mt-4  text-sm space-y-2 text-gray-300">
          <p className="text-lg font-semibold text-green-400">Monthly EMI : ₹{emi.toLocaleString("en-IN")}</p>
          <p>Total Interest :₹{totalInterest.toLocaleString("en-IN")}</p>

          <p >
            Total payment : ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EMI;
