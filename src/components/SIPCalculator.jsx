import { useState } from "react";

const SIPCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");

  const getError = () => {
    if (!principal || !rate || !time) {
      return "All fields are required";
    }

    const p = Number(principal);
    const r = Number(rate);
    const t = Number(time);

    if (p <= 0 || r <= 0 || t <= 0) {
      return "Please enter valid positive numbers";
    }

    return null;
  };

  const calculateSIP = () => {
    const error = getError();
    if (error) return null;

    const p = Number(principal);
    const monthlyRate = Number(rate) / 100 / 12;
    const months = Number(time) * 12;

    if (monthlyRate === 0) {
      return (p * months).toFixed(2);
    }

    const futureValue =
      p *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    return futureValue.toFixed(2);
  };

  const error = getError();
  const result = calculateSIP();

  return (
    <div className="bg-gray-100 p-6 max-w-md mx-auto rounded-lg shadow">
      <h1 className="text-3xl font-bold text-center mb-6">SIP Calculator</h1>

      <div className="space-y-4">
        <div>
          <label>Monthly Investment (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label>Expected Rate of Return (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label>Time Period (Years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>

      <div className="mt-6">
        {error && <p className="text-red-500">{error}</p>}

        {!error && result && (
          <p className="text-lg font-semibold text-green-600">
            Future Value: ₹{result}
          </p>
        )}
      </div>
    </div>
  );
};

export default SIPCalculator;
