import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import { useGlobalLoading } from "../hooks/useGlobalLoading";
import { items } from "../utils/constants";
import { useSidebar } from "../hooks/useSidebar";




const AuthenticatedLayout = () => {
  
  const { token } = useSelector((state) => state.auth);
  // const isLoading = useGlobalLoading();

  const {currentLink , handleChange} =  useSidebar()
 

  if (!token) {
    return <Navigate to="/login" replace />;
  }




  return (
    <div className="flex flex-col h-screen   ">
      <div className="flex overflow-hidden flex-1 ">
        {/* <Navbar /> */}

        <Sidebar
          items={items}
          currentLink={currentLink}
          onChange={handleChange}
        />

        <main className="flex-1 overflow-y-auto w-4/5  ">
          <Navbar />
          <div className=" p-4 relative">
            {/* {isLoading && <GlobalLoader />} */}

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
