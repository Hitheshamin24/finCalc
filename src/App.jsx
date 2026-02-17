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
{/* NAVBAR */}
<div className="flex items-center justify-between mb-4 sm:mb-6">

  {/* LEFT: LOGO + NAME */}
  <div className="flex items-center gap-2 sm:gap-3">

    {/* LOGO */}
    <div className="w-8 h-8 sm:w-10 sm:h-10">
      <img
        src="/finlytics.png"
        alt="FinLytics Logo"
        className="w-full h-full object-contain"
      />
    </div>

    {/* BRAND NAME */}
    <h1 className="text-base sm:text-lg md:text-xl font-semibold tracking-wide">
      Fin<span className="text-green-400">Lytics</span>
    </h1>

  </div>

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
