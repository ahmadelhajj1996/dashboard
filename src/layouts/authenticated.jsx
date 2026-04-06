// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AuthenticatedLayout = () => {
  // const { token, isLoading } = useSelector((state) => state.auth);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex flex-col h-screenw ">
      <div className="flex overflow-hidden flex-1 ">
        {/* <Navbar /> */}

        <Sidebar />

        <main className="flex-1 overflow-y-auto w-4/5 ">
          <Navbar />        
          <div className="p-4"> 
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
