import React, { useState } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import dseu_logo from "../assets/logo/dseu_logo.png";


const Inventory = () => {
  const [selectedTab, setSelectedTab] = useState("Pending");
  const tabs = ["Pending", "Approved", "Rejected"];

  const inventoryItems = [
    { id: 1, name: "Item Name", campus: "Campus name", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Item Name", campus: "Campus name", image: "https://via.placeholder.com/50" },
    { id: 3, name: "Item Name", campus: "Campus name", image: "https://via.placeholder.com/50" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <img src={dseu_logo} alt="DSEU Logo" className="h-12" />
        </div>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
        <div className="flex items-center gap-5">
          <button className="relative p-2">
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">2</span>
          </button>
          <FaUserCircle className="text-gray-600 text-3xl" />
        </div>
      </nav>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center">Inventory</h2>
        <div className="flex mt-6">
          {/* Sidebar */}
          <div className="w-1/4 bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Requests</h3>
            <ul>
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer py-2 ${selectedTab === tab ? "text-blue-600 font-bold" : "text-gray-600"}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          {/* Inventory Items */}
          <div className="w-3/4 ml-6">
            <div className="space-y-4">
              {inventoryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
                >
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full" />
                  <div>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-gray-600">{item.campus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
