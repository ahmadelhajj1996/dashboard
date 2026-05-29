import PropTypes from "prop-types";

function Tabs({ tabs, currentTab, onChange }) {
  return (
    <div className="flex overflow-hidden rounded-t-lg mx-8 border border-gray-200 divide-x divide-gray-200 bg-white">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`w-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "bg-white text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,

  currentTab: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
};

export default Tabs;