import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../../assets/logo/profile.png";
import {
  FaArrowLeft,
  FaFilter,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import Navbar from "../Reusable/Navbar";

const inventoryItems = [
  { id: 1, name: "Item Name", campus: "Campus name", image: profile },
  { id: 2, name: "Item Name", campus: "Campus name", image: profile },
  { id: 3, name: "Item Name", campus: "Campus name", image: profile }
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
    setSelection(
      selection.includes(item)
        ? selection.filter((zone) => zone !== item)
        : [...selection, item]
    );
  };

  const clearFilters = () => {
    setSelectedZones([]);
    setSelectedCampuses([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Inventory Management</h2>
          </div>
        </div>
      </div>

      <div className="flex px-8 py-6 space-x-6">
        <aside className="w-64 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Requests</h3>
          <ul className="space-y-2">
            {["pending", "approved", "rejected"].map((state) => (
              <li
                key={state}
                className={`cursor-pointer capitalize py-1 px-2 rounded-md transition ${
                  status === state
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setStatus(state)}
              >
                {state}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1">
          <div className="grid gap-4">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt="Item" className="w-14 h-14 rounded-full" />
                  <div>
                    <p className="text-gray-900 font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">{item.campus}</p>
                  </div>
                </div>
                <span
                  className={`text-sm px-4 py-1.5 rounded-full font-medium flex items-center space-x-1 ${
                    status === "approved"
                      ? "bg-green-100 text-green-700"
                      : status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {status === "approved" ? <FaCheckCircle /> : status === "rejected" ? <FaTimesCircle /> : <FaClock />}
                  <span>{status}</span>
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Filter by</h3>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Campus Zone</h4>
              {campusZones.map((zone) => (
                <label key={zone} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedZones.includes(zone)}
                    onChange={() => toggleSelection(zone, setSelectedZones, selectedZones)}
                  />
                  <span className="text-sm text-gray-700">{zone}</span>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Campus Name</h4>
              {campusNames.map((campus) => (
                <label key={campus} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCampuses.includes(campus)}
                    onChange={() => toggleSelection(campus, setSelectedCampuses, selectedCampuses)}
                  />
                  <span className="text-sm text-gray-700">{campus}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={clearFilters}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
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
