import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { items } from '../utils/constants';

function Sidebar() {
  const navigate = useNavigate();


  const [activePath, setActivePath] = useState(location.pathname);
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

   const isActiveLink = (link) => {
    // Exact match for root paths, or you can use startsWith for nested routes
    return activePath === link;
    // For nested routes: return activePath.startsWith(link);
  };

  const getLinkClasses = (link) => {    
    return `${'cursor-pointer transition-colors duration-200 p-4 '} ${isActiveLink(link) ? "active" : "inactive"}`;
  };

  return (
    <div className="w-[225px]  h-screen border   bg-white">

      <h1 className=" h-[57px]  flex justify-center items-center tracking-widest text-xl  border border-e-0 ">لوحة التحكم</h1>

      <div className="flex flex-col divide">
        {items.map((e, index) => (
          <div key={index}>
            {/* Link item */}
            <div
              className={getLinkClasses(e.link)}
              onClick={() => navigate(e.link)}
              role="button"
              tabIndex={0}
              onKeyPress={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  navigate(e.link);
                }
              }}
              aria-current={isActiveLink(e.link) ? 'page' : undefined}
            >
              {e.title}
            </div>            
            {/* {index < items.length - 1  && (
              <div className="">
                <hr className="border border-gray-400" />
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;