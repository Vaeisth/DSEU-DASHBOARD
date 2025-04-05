import React from "react";
import { FaArrowLeft, FaFilter, FaCheck, FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dseu_logo from "../../assets/logo/dseu_logo.png";
import profile from "../../assets/logo/profile.png";

const inventoryItems = [
  { id: 1, name: "Item Name", campus: "Campus name", image: profile },
  { id: 2, name: "Item Name", campus: "Campus name", image: profile },
  { id: 3, name: "Item Name", campus: "Campus name", image: profile },
];

const InventoryApproved = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white-100">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white mt-2">
        <div className="flex items-center space-x-3">
          <button className="text-gray-700" onClick={() => navigate(-1)}>
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
        <div className="w-1/4 h-[300px] border border-gray-200 bg-white p-4 shadow-lg rounded-2xl mt-[8px]">
          <h3 className="text-[25px] font-semibold text-gray-700 mb-3 ml-9">Requests</h3>
          <ul className="ml-12 space-y-2 text-[18px]">
            <li className="text-gray-600 cursor-pointer hover:text-blue-500" onClick={() => navigate("/inventory")}>Pending</li>
            <li className="text-green-600 font-semibold border-l-4 border-green-500 pl-2">Approved</li>
            <li className="text-gray-600 cursor-pointer hover:text-blue-500">Rejected</li>
          </ul>
        </div>

        {/* Inventory List */}
        <div className="flex-1 p-6">
          <div className="grid gap-4">     
            {inventoryItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 border-l-4 border-green-500">
                <img src={item.image} alt="Item" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{item.name}</p>
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
