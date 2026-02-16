import React ,{useState} from 'react'
import SIPCalculator from './pages/SIPCalculator'
import EMI from './pages/EMI'
import StepUpS from './pages/StepUpSIPCalculator'
import Lumpsum from './pages/Lumpsum'
import CurrentValue from './pages/CurrentValue'
import FutureValue from './pages/FutureValue'
import TabNavigation from './components/TabNavigation'
const App = () => {
  const [active, setActive] = useState("SIP");
  return (
    <div className='min-h-screen bg-black text-white p-6 '>
      <h1 className='text-3xl font-bold'>FinCalc</h1>
      <p className='text-gray-400'>Plan your investments and loans with precision</p>
      <TabNavigation active={active} setActive={setActive} />
      {active === "SIP" && <SIPCalculator />}
      {active === "Step-Up SIP" && <StepUpS />}
      {active === "EMI" && <EMI />}
      {active === "Lump sum" && <Lumpsum />}
      {active === "Current Value" && <CurrentValue />}
      {active === "Future Value" && <FutureValue />}
    </div>
  )
}

export default App
