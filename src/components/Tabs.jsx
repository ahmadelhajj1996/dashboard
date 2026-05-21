
function Tabs({ tabs, currentTab, onChange }) {
  return (
    <div className="border flex text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-3 py-2  w-full transition ${
            currentTab === tab.key
              ? "active "
              : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;