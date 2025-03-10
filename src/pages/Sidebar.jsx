import { Link, useLocation } from "react-router-dom";
import { FaBars, FaUserMd, FaTicketAlt, FaSignInAlt, FaHome } from "react-icons/fa";
import { MdDashboard, MdViewCarousel } from "react-icons/md";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: <MdDashboard /> },
    { path: "/doctors", name: "Doctors", icon: <FaUserMd /> },
    { path: "/tokens", name: "Token Booking", icon: <FaTicketAlt /> },
    { path: "/token-panel", name: "Token Panel", icon: <MdViewCarousel /> },
    { path: "/login", name: "Login", icon: <FaSignInAlt /> },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-gray-900 h-screen text-white flex flex-col shadow-lg transition-all ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <FaBars className="text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
          {isOpen && <h1 className="text-lg font-bold">Admin Panel</h1>}
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 m-2 rounded-md transition-all ${
                location.pathname === item.path ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="ml-4 text-md">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
