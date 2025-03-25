import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dseu_logo from "../assets/logo/dseu_logo.png";
import profile from "../assets/logo/profile.png";
import { FaArrowLeft, FaFilter, FaClock, FaSearch, FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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

  // Toggle selection for zones and campuses
  const toggleSelection = (item, setSelection, selection) => {
    if (selection.includes(item)) {
      setSelection(selection.filter((zone) => zone !== item));
    } else {
      setSelection([...selection, item]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedZones([]);
    setSelectedCampuses([]);
  };

  return (
    <div className="min-h-screen bg-white-100">
      {/* Navbar */}
      <div className="w-[100%] flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-[700px]">
          <img src={dseu_logo} alt="DSEU Logo" className="h-12" />
          <div className="relative ml-[70px]">
            <input
              type="text"
              placeholder="Search..."
              className="pl-4 pr-10 py-2 border rounded-full bg-gray-100 text-gray-700 w-full"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <FaBell size={20} className="text-gray-600 cursor-pointer" />
          <img src={profile} alt="Profile" className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white mt-2">
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

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 h-[300px] border border-gray-200 bg-white p-4 shadow-lg rounded-2xl mt-[8px]">
          <h3 className="text-[25px] font-semibold text-gray-700 mb-3 ml-9">Requests</h3>
          <ul className="ml-12 space-y-2 text-[18px]">
            <li
              className={`cursor-pointer ${status === "pending" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`}
              onClick={() => setStatus("pending")}
            >
              Pending
            </li>
            <li
              className={`cursor-pointer ${status === "approved" ? "text-green-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`}
              onClick={() => setStatus("approved")}
            >
              Approved
            </li>
            <li
              className={`cursor-pointer ${status === "rejected" ? "text-red-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`}
              onClick={() => setStatus("rejected")}
            >
              Rejected
            </li>
          </ul>
        </div>

        {/* Inventory List */}
        <div className="flex-1 p-6">
          <div className="grid gap-4">
            {inventoryItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                <img src={profile} alt="Item" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.campus}</p>
                </div>
                <div className={`text-xs px-3 py-1 rounded-full flex items-center 
                  ${status === "approved" ? "bg-green-200 text-green-600" : 
                  status === "rejected" ? "bg-red-200 text-red-600" : "bg-gray-200 text-gray-600"}`}>
                  {status === "approved" ? <FaCheckCircle className="mr-1" /> : 
                  status === "rejected" ? <FaTimesCircle className="mr-1" /> : 
                  <FaClock className="mr-1" />}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold text-blue-600">Filter by</h3>
            <hr className="my-2" />
            
            <h4 className="text-md font-medium mt-4">Campus zone</h4>
            {campusZones.map((zone) => (
              <div key={zone} className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={selectedZones.includes(zone)}
                  onChange={() => toggleSelection(zone, setSelectedZones, selectedZones)}
                />
                <span>{zone}</span>
              </div>
            ))}

            <h4 className="text-md font-medium mt-4">Campus Name</h4>
            {campusNames.map((campus) => (
              <div key={campus} className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={selectedCampuses.includes(campus)}
                  onChange={() => toggleSelection(campus, setSelectedCampuses, selectedCampuses)}
                />
                <span>{campus}</span>
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={clearFilters} className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg">
                Clear all
              </button>
              <button onClick={() => setShowFilter(false)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
