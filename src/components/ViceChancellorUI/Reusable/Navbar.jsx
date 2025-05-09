import { useNavigate } from "react-router-dom";
import dseu_logo from "../../../assets/logo/dseu_logo.png";
import BellIcon from "../../../assets/logo/Bell.png";
import profile from "../../../assets/logo/profile.png";
import searchIcon from "../../../assets/logo/search.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const token = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("currentRole");
    if (!token) {
      navigate("/");
      return;
    }
    switch (role) {
      case "super_admin":
        navigate("/vc-dashboard");
        break;
      case "employee":
      case "Employee":
        navigate("/employee-dashboard");
        break;
      case "Store":
        navigate("/store-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md px-4 sm:px-8 py-3 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-3">

        {/* Left: Logo */}
        <div
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src={dseu_logo} alt="DSEU Logo" className="h-10 sm:h-12" />
        </div>

        {/* Center: Search */}
        <div className="relative w-full sm:w-1/2 order-3 sm:order-none">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <img
            src={searchIcon}
            alt="Search"
            className="absolute right-3 top-2.5 w-4 h-4 opacity-60 pointer-events-none"
          />
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Notifications */}
          <button className="relative focus:outline-none hover:scale-105 transition-transform">
            <img
              src={BellIcon}
              alt="Notifications"
              className="w-6 h-6"
            />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 shadow">
              2
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="focus:outline-none hover:scale-105 transition-transform"
          >
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;