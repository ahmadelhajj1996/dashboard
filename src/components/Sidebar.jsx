import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { items } from "../utils/constants";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  const isActiveLink = useMemo(() => {
    return (link) => {
      if (!link) return false;

      // Normalize trailing slashes
      const cleanPath = activePath.replace(/\/$/, "");
      const cleanLink = link.replace(/\/$/, "");

      // Root exact match OR nested routes match
      return cleanPath === cleanLink || cleanPath.startsWith(cleanLink + "/");
    };
  }, [activePath]);

  const getLinkClasses = (link) => {
    return `
      cursor-pointer transition-colors duration-200 p-4 tracking-widest text-lg 
      ${isActiveLink(link) ? "active" : "inactive"}
    `;
  };

  return (
    <div className="w-[225px] h-screen border bg-white bordered">
      <h1 className="h-[73px] flex justify-center items-center tracking-widest text-lg italic text-cyan-600 bordered border-e-0 ">
        لوحة التحكم
      </h1>

      <div className="flex flex-col divide ">
        {items.map((e, index) => (
          <div key={index}>
            <div
              className={getLinkClasses(e.link)}
              onClick={() => navigate(e.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  navigate(e.link);
                }
              }}
              aria-current={isActiveLink(e.link) ? "page" : undefined}
            >
              {e.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;