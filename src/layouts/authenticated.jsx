import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GlobalLoader from "../components/GlobalLoader";
import { useGlobalLoading } from "../hooks/useGlobalLoading";

const AuthenticatedLayout = () => {
  const { token } = useSelector((state) => state.auth);
  const isLoading = useGlobalLoading();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen   ">
      <div className="flex overflow-hidden flex-1 ">
        {/* <Navbar /> */}

        <Sidebar />

        <main className="flex-1 overflow-y-auto w-4/5  ">
          <Navbar />
          <div className=" p-4 relative">
            {isLoading && <GlobalLoader />}

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
