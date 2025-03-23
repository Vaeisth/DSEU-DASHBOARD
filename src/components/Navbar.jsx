import { useNavigate } from "react-router-dom";
import dseu_logo from "../assets/logo/dseu_logo.png";
import BellIcon from "../assets/logo/Bell.png";
import profile from "../assets/logo/profile.png";
import searchIcon from "../assets/logo/search.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-3">
        <img src={dseu_logo} alt="DSEU Logo" className="h-12" />
      </div>

      {/* Center: Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <img src={searchIcon} alt="Search" className="absolute right-3 top-2 w-5 h-5" />
      </div>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center gap-5">
        <button className="relative p-2">
          <img src={BellIcon} alt="Notifications" className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            2
          </span>
        </button>

        {/* ✅ Make Profile Clickable */}
        <button onClick={() => navigate("/profile")} className="focus:outline-none">
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
