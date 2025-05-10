import React from "react";
import { FaArrowLeft, FaFilter, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import profile from "../../../assets/logo/profile.png";

const inventoryItems = [
  { id: 1, name: "Item Name", campus: "Campus name", image: profile },
  { id: 2, name: "Item Name", campus: "Campus name", image: profile },
  { id: 3, name: "Item Name", campus: "Campus name", image: profile },
];

const InventoryApproved = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Approved Inventory</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border border-gray-200 bg-white p-5 shadow-lg rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Requests</h3>
          <ul className="space-y-3 text-base font-medium">
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer transition" onClick={() => navigate("/inventory")}>Pending</li>
            <li className="text-green-600 font-semibold border-l-4 border-green-500 pl-3 bg-green-50 py-1 rounded-r-md">Approved</li>
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer transition">Rejected</li>
          </ul>
        </div>

        {/* Inventory List */}
        <div className="flex-1">
          <div className="grid gap-4">
            {inventoryItems.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition flex items-center space-x-5">
                <img src={item.image} alt="Item" className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.campus}</p>
                </div>
                <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <FaCheck size={12} className="mr-1" />
                  Approved
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryApproved;
