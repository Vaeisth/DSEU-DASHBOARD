import React from "react";
import dseu_logo from "../assets/logo/dseu_logo.png";
import profile from "../assets/logo/profile.png";
import { FaArrowLeft, FaFilter, FaClock, FaSearch, FaBell } from "react-icons/fa";

const inventoryItems = [
  {
    id: 1,
    name: "Item Name",
    campus: "Campus name",
    image: "profile", // Replace with actual image
  },
  {
    id: 2,
    name: "Item Name",
    campus: "Campus name",
    image: "profile",
  },
  {
    id: 3,
    name: "Item Name",
    campus: "Campus name",
    image: "profile",
  },
];

const InventoryReject = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <img src={dseu_logo} alt="DSEU Logo" className="h-12" />
          <div className="relative">
            <FaSearch className="absolute left-3 top-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <FaBell size={20} className="text-gray-600 cursor-pointer" />
          <img
                      src={profile}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                    />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md mt-2">
        <div className="flex items-center space-x-3">
          <button className="text-gray-700">
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Inventory</h2>
        </div>
        <button className="text-blue-500 flex items-center">
          <FaFilter size={18} className="mr-1" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 shadow-md min-h-screen">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Requests</h3>
          <ul className="space-y-2">
            <li className="text-blue-600 font-semibold cursor-pointer">Pending</li>
            <li className="text-gray-600 cursor-pointer hover:text-blue-500">Approved</li>
            <li className="text-gray-600 cursor-pointer hover:text-blue-500">Rejected</li>
          </ul>
        </div>

        {/* Inventory List */}
        <div className="flex-1 p-6">
          <div className="grid gap-4">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
              >
                <img src={profile} alt={profile} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.campus}</p>
                </div>
                <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full flex items-center">
                  <FaClock size={12} className="mr-1" />
                  Reject
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReject;