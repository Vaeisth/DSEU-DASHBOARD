import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import dseu_logo from "../../../assets/logo/dseu_logo.png";
import {
  FaBell,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";
import placeholder from "../../../assets/placeholder-pfp.jpg";
import { showSuccessToast } from "@/utils/toasts.js";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { getProfile } from "../../../utils/apiservice";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: userProfile, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
    staleTime: 7 * 60 * 1000,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("currentRole");
    sessionStorage.removeItem("tokenExpiry");
    showSuccessToast("Logged out successfully");
    navigate("/");
  };

  if (isLoading) {
    return <Loader className="animate-spin hidden" />;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-2.5 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <img src={dseu_logo} alt="DSEU Logo" className="h-10" />
        </div>

        {/* Center: Search */}
        <div className="relative flex-1 max-w-2xl mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>

          {/* Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <img
                src={userProfile?.picture || placeholder}
                alt={userProfile?.name || "Profile"}
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={userProfile?.picture || placeholder}
                      alt={userProfile?.name || "Profile"}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {userProfile?.name || "User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {userProfile?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaBuilding className="w-4 h-4 text-gray-400" />
                    <span>{userProfile?.campus?.name || "No Campus"}</span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                  >
                    <FaUser className="w-4 h-4 text-gray-400" />
                    Profile Info
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
