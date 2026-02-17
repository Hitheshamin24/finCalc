import React, { useState } from "react";
import SIPCalculator from "./pages/SIPCalculator";
import EMI from "./pages/EMI";
import StepUpS from "./pages/StepUpSIPCalculator";
import Lumpsum from "./pages/Lumpsum";
import CurrentValue from "./pages/CurrentValue";
import FutureValue from "./pages/FutureValue";
import TabNavigation from "./components/TabNavigation";

// 🧠 Central config (VERY IMPORTANT)
const TABS = {
  SIP: <SIPCalculator />,
  "Step-Up SIP": <StepUpS />,
  EMI: <EMI />,
  "Lump sum": <Lumpsum />,
  "Current Value": <CurrentValue />,
  "Future Value": <FutureValue />,
};
const App = () => {
  const [active, setActive] = useState("SIP");

  return (
<div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">

  <div className="
    w-full 
    max-w-6xl 
    mx-auto 
    px-3 sm:px-4 md:px-6 
    py-4 sm:py-6
  ">

    {/* NAVBAR */}
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
      <div className="bg-green-500 p-1.5 sm:p-2 rounded-lg text-black font-bold">
        ↗
      </div>
      <h1 className="text-base sm:text-lg font-semibold">
        FinCalc
      </h1>
    </div>

    {/* HEADER */}
    <div className="mb-4 sm:mb-6">
      <p className="text-gray-400 text-xs sm:text-sm">
        Plan your investments and loans with precision.
      </p>
    </div>

    <TabNavigation active={active} setActive={setActive} />

    <div className="mt-4 sm:mt-6">
      {TABS[active]}
    </div>

  </div>
</div>

  );
};


export default App;
