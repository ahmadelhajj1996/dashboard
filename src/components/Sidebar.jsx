import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Sidebar({ items, currentLink, onChange }) {
  const navigate = useNavigate();

  const isActive = (link) => {
    if (!link) return false;

    const cleanCurrent = (currentLink || "").replace(/\/$/, "");
    const cleanLink = link.replace(/\/$/, "");

    // ✅ special case for home "/"
    if (cleanLink === "") return cleanCurrent === "";

    if (cleanLink === "/") {
      return cleanCurrent === "";
    }

    return (
      cleanCurrent === cleanLink || cleanCurrent.startsWith(cleanLink + "/")
    );
  };

  const handleClick = (link) => {
    onChange(link); 
    navigate(link); 
  };

  return (
    <div className="w-[225px] h-screen bordered bg-white">
      <span className="h-[73px] flex justify-center items-center tracking-widest text-lg italic text-cyan-600">
        لوحة التحكم
      </span>

      <div className="flex flex-col  bordered border-x-0 border-b-0">
        {items.map((item) => {
          const active = isActive(item.link);
          return (
            <div
              key={item.link}
              onClick={() => handleClick(item.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(item.link);
                }
              }}
              className={`
                cursor-pointer p-4   rounded  transition-colors
                ${active ? "bg-cyan-600 text-white" : "text-gray-700 "}
              `}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,

  currentLink: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
};

export default Sidebar;
