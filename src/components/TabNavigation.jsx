const tabs = [
  "SIP",
  "Step-Up SIP",
  "EMI",
  "Lump sum",
  "Current Value",
  "Future Value",
];

const TabNavigation = ({active, setActive}) => {
  return (
    <div className="flex gap-2 bg-gray-800 p-2 rounded-xl mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-lg text-sm ${active == tab ? "bg-green-500 text-black " : "text-gray-300"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
