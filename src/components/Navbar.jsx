import axios from "axios";
import { User, Bell } from "lucide-react";
import Dropdown from "../components/Dropdown";
import { useDropdown } from "../hooks/useDropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import notify from "../utils/toastr";


import { useNotifications } from "../context/NotificationContext";


function Navbar() {

  const { token } = useSelector((state) => state.auth);
   
  const {
    unreadCount,
    markAllAsRead,
  } = useNotifications();

  const { open, toggle, dropdownRef, close } = useDropdown();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      label: "تسجيل الخروج",
      onClick: async () => {
        try {
          await axios.post(
            // "http://127.0.0.1:8000/api/admin/logout",
            "https://phplaravel-1626350-6427540.cloudwaysapps.com/api/admin/logout",

            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          dispatch(logout());
          localStorage.clear();
          navigate("/login");
          notify("تم تسجيل الخروج ", "success");
        } catch (error) {
          console.error("Logout error:", error.message);
        } finally {
          close();
        }
      },
    },
  ];

  return (
    <div className="p-4 bordered border-s-0 flex justify-end items-center gap-x-6">

      <button
        onClick={() => {
          markAllAsRead();
          navigate("/notifications");
        }}
        className="relative flex items-center justify-center rounded-full p-2  transition hover:bg-gray-100"
      >
        <Bell className=" cursor-pointer  text-cyan-600" />

        {unreadCount > 0 && (
          <span className="absolute -right-1  top-0 flex min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white shadow">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggle}
          className="p-2 -mt-1 rounded-full hover:bg-gray-100 transition"
        >
          <User className="cursor-pointer text-cyan-600" />
        </button>

        <Dropdown open={open} items={menuItems} className={"w-52 mt-5"} />
      </div>
    </div>
  );
}

export default Navbar;
