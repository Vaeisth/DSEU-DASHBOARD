import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import dseu_logo from "../../../assets/logo/dseu_logo.png";
import BellIcon from "../../../assets/logo/Bell.png";
import profile from "../../../assets/logo/profile.png";
import searchIcon from "../../../assets/logo/search.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("currentRole");
    sessionStorage.removeItem("tokenExpiry");
    navigate("/");
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

          {/* Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none hover:scale-105 transition-transform"
            >
              <img
                src={profile}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Profile Info
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;