import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "./../Reusable/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("request");
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-white min-h-screen">
      <Navbar/>
      {/* Header */}
      <div className="flex justify-between items-center mt-15">
        <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>

        <div className="flex items-center gap-4">
          <button  onClick={() => navigate("/request")}
        className="bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
            + Request
          </button>
          <div className="flex items-center text-blue-500 cursor-pointer">
            <span className="text-base font-medium">Filter</span>
            <SlidersHorizontal className="ml-1" size={18} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-full p-1 w-max mb-6">
        <button
          onClick={() => setActiveTab("request")}
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            activeTab === "request" ? "bg-white shadow text-blue-600" : "text-gray-600"
          }`}
        >
          Request
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            activeTab === "history" ? "bg-white shadow text-blue-600" : "text-gray-600"
          }`}
        >
          History
        </button>
      </div>

      {/* Your Requests */}
      <div className="mb-4">
        <h2 className="text-base font-medium text-gray-700">Your requests</h2>
        <p className="text-sm text-gray-500">Following request has been made you.</p>
        <p className="text-sm font-medium text-gray-600 mt-1">Total: 05</p>
      </div>

      {/* List Items */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl flex items-center justify-between px-4 py-3 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/48"
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Item 1</h3>
                <p className="text-xs text-gray-600">Designation Name</p>
                <p className="text-xs text-gray-600">Campus Name</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                ⏳ Pending Approval
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
