import { useNavigate } from "react-router-dom";
import dseu_logo from "../../assets/logo/dseu_logo.png";
import BellIcon from "../../assets/logo/Bell.png";
import profile from "../../assets/logo/profile.png";
import searchIcon from "../../assets/logo/search.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-4 sm:px-6 py-3 flex items-center justify-between z-50 flex-wrap">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-3">
        <img src={dseu_logo} alt="DSEU Logo" className="h-10 sm:h-12" />
      </div>

      {/* Center: Search Bar */}
      <div className="relative w-full sm:w-1/3 mt-3 sm:mt-0 sm:mx-6 order-3 sm:order-none">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <img
          src={searchIcon}
          alt="Search"
          className="absolute right-3 top-2.5 w-4 h-4"
        />
      </div>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative p-1 sm:p-2">
          <img src={BellIcon} alt="Notifications" className="w-5 sm:w-6 h-5 sm:h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] sm:text-xs rounded-full px-1">
            2
          </span>
        </button>

        <button onClick={() => navigate("/profile")} className="focus:outline-none">
          <img
            src={profile}
            alt="Profile"
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-gray-300 cursor-pointer"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
