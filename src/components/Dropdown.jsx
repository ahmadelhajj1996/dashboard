import PropTypes from "prop-types";

function Dropdown({ open, items , className }) {

  if (!open) return null;

  return (
    <div className={`absolute end-1 mt-2 w-52 rounded-md border bg-white shadow-lg overflow-hidden z-50 ${className}`}>
      {items?.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="w-full text-right px-4 py-3 hover:bg-gray-100 transition text-sm"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  className : PropTypes.string,  
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]).isRequired,

      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default Dropdown;