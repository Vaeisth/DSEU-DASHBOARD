import React from "react";
import { FaArrowLeft, FaFilter, FaTimesCircle, FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dseu_logo from "../../../assets/logo/dseu_logo.png";
import profile from "../../../assets/logo/profile.png";

const inventoryItems = [
  { id: 1, name: "Item Name", campus: "Campus name", image: profile },
  { id: 2, name: "Item Name", campus: "Campus name", image: profile },
  { id: 3, name: "Item Name", campus: "Campus name", image: profile },
  { id: 4, name: "Item Name", campus: "Campus name", image: profile },
  { id: 5, name: "Item Name", campus: "Campus name", image: profile },
  { id: 6, name: "Item Name", campus: "Campus name", image: profile },
  { id: 7, name: "Item Name", campus: "Campus name", image: profile },
  { id: 8, name: "Item Name", campus: "Campus name", image: profile },
  { id: 9, name: "Item Name", campus: "Campus name", image: profile },
];

const InventoryReject = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between w-full gap-6">
          <img src={dseu_logo} alt="DSEU Logo" className="h-12" />
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="pl-4 pr-10 py-2 border rounded-full bg-gray-100 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="flex items-center space-x-6">
            <FaBell size={20} className="text-gray-600 cursor-pointer" />
            <img src={profile} alt="Profile" className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Subheader */}
      <div className="flex items-center justify-between px-6 py-4 bg-white mt-2 shadow-sm">
        <div className="flex items-center space-x-3">
          <button className="text-gray-700 hover:text-black" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Inventory</h2>
        </div>
        <button className="text-blue-600 flex items-center hover:text-blue-800 transition">
          <FaFilter size={16} className="mr-1" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border border-gray-200 bg-white p-5 shadow-lg rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Requests</h3>
          <ul className="space-y-3 text-base font-medium">
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer transition" onClick={() => navigate("/inventory-approved")}>
              Approved
            </li>
            <li className="text-red-600 font-semibold border-l-4 border-red-500 pl-3 bg-red-50 py-1 rounded-r-md">
              Rejected
            </li>
          </ul>
        </div>

        {/* Inventory List */}
        <div className="flex-1">
          <div className="grid gap-4">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-500 flex items-center space-x-5 hover:shadow-md transition"
              >
                <img src={item.image} alt="Item" className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.campus}</p>
                </div>
                <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <FaTimesCircle size={12} className="mr-1" />
                  Rejected
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
