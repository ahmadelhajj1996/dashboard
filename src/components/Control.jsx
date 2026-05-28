import PropTypes from "prop-types";
import { Plus } from "lucide-react";
function Control({
  isPlus = true,
  onClick,
  search,
  setSearch,
  children,
  searchable = true,
}) {
  return (
    <div className="px-8 flex justify-between ">
      <div className="flex items-center gap-x-4">{children}</div>

      <div className="flex gap-x-3 items-center">
        {searchable && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field py-[9px] w-[300px] bordered"
            placeholder="ابحث هنا"
            autoFocus
          />
        )}

        {isPlus && (
          <button
            type="button"
            onClick={onClick}
            className="bordered p-2 rounded  transition-none animate-none"
          >
            <Plus size={20}  />
          </button>
        )}
      </div>
    </div>
  );
}

Control.propTypes = {
  isPlus: PropTypes.bool,
  searchable: PropTypes.bool,
  onClick: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  children: PropTypes.node,
};

export default Control;
