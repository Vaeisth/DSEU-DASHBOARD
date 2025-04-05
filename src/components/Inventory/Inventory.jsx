import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dseu_logo from "../../assets/logo/dseu_logo.png";
import profile from "../../assets/logo/profile.png";
import { FaArrowLeft, FaFilter, FaClock, FaSearch, FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Navbar from "../Reusable/Navbar";

const inventoryItems = [
  { id: 1, name: "Item Name", campus: "Campus name", image: profile },
  { id: 2, name: "Item Name", campus: "Campus name", image: profile },
  { id: 3, name: "Item Name", campus: "Campus name", image: profile },
];

const campusZones = ["North zone", "South zone", "West zone", "East zone", "Central zone"];
const campusNames = ["Ambedkar Dseu Shakarpur Campus - 1", "Bhai Parmanand Shakarpur Campus"];

const InventoryPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedCampuses, setSelectedCampuses] = useState([]);

  const toggleSelection = (item, setSelection, selection) => {
    setSelection(selection.includes(item) ? selection.filter((zone) => zone !== item) : [...selection, item]);
  };

  const clearFilters = () => {
    setSelectedZones([]);
    setSelectedCampuses([]);
  };

  return (
    
    <div className="min-h-screen bg-white-100">
      <Navbar/>

      <div className="flex items-center justify-between px-6 py-4 bg-white mt-20">
        <div className="flex items-center space-x-3">
          <button className="text-gray-700" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Inventory</h2>
        </div>
        <button className="text-blue-500 flex items-center" onClick={() => setShowFilter(true)}>
          <FaFilter size={18} className="mr-1" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      <div className="flex">
        <div className="w-1/4 h-[300px] border border-gray-200 bg-white p-4 shadow-lg rounded-2xl mt-[8px]">
          <h3 className="text-[25px] font-semibold text-gray-700 mb-3 ml-9">Requests</h3>
          <ul className="ml-12 space-y-2 text-[18px]">
            {['pending', 'approved', 'rejected'].map((state) => (
              <li key={state} className={`cursor-pointer ${status === state ? "font-semibold text-blue-600" : "text-gray-600 hover:text-blue-500"}`} onClick={() => setStatus(state)}>
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-6">
          <div className="grid gap-4">
            {inventoryItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                <img src={profile} alt="Item" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.campus}</p>
                </div>
                <div className={`text-xs px-3 py-1 rounded-full flex items-center ${status === "approved" ? "bg-green-200 text-green-600" : status === "rejected" ? "bg-red-200 text-red-600" : "bg-gray-200 text-gray-600"}`}>
                  {status === "approved" ? <FaCheckCircle className="mr-1" /> : status === "rejected" ? <FaTimesCircle className="mr-1" /> : <FaClock className="mr-1" />}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold text-blue-600">Filter by</h3>
            <hr className="my-2" />
            <h4 className="text-md font-medium mt-4">Campus zone</h4>
            {campusZones.map((zone) => (
              <div key={zone} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" checked={selectedZones.includes(zone)} onChange={() => toggleSelection(zone, setSelectedZones, selectedZones)} />
                <span>{zone}</span>
              </div>
            ))}
            <h4 className="text-md font-medium mt-4">Campus Name</h4>
            {campusNames.map((campus) => (
              <div key={campus} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" checked={selectedCampuses.includes(campus)} onChange={() => toggleSelection(campus, setSelectedCampuses, selectedCampuses)} />
                <span>{campus}</span>
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <button onClick={clearFilters} className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg">Clear all</button>
              <button onClick={() => setShowFilter(false)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
