import axios from "axios";
import { User } from "lucide-react";
import Dropdown from "../components/Dropdown";
import { useDropdown } from "../hooks/useDropdown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useToastr from "../hooks/useToastr";

function Navbar() {
  const { open, toggle, dropdownRef, close } = useDropdown();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const toastr = useToastr();

  const menuItems = [
    // {
    //   label: "الملف الشخصي",
    //   onClick: () => {
    //     console.log("Profile");
    //     close();
    //   },
    // },
    // {
    //   label: "الإعدادات",
    //   onClick: () => {
    //     console.log("Settings");
    //     close();
    //   },
    // },
    {
      label: "تسجيل الخروج",
      onClick: async () => {
        try {
          await axios.post(
            "http://127.0.0.1:8000/api/admin/logout",
            // https://phplaravel-1626350-6427540.cloudwaysapps.com/api/
            
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          localStorage.clear();
          navigate("/login");
          toastr("تم تسجيل الخروج ", "success");
        } catch (error) {
          console.error("Logout error:", error.message);
        } finally {
          close();
        }
      },
    },
  ];

  return (
    <div className="p-4 border border-s-0 flex justify-end">

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggle}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <User className="cursor-pointer" />
        </button>

        <Dropdown open={open} items={menuItems} className={"w-52"} />
      </div>
    </div>
  );
}

export default Navbar;
