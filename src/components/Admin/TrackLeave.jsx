import { useState } from "react";

const TrackLeave = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingCount = 4;
  const historyCount = 9;

  return (
    <div className="px-6 py-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Leave Management
        </h2>
        <p className="text-base text-gray-600">
          Track and manage leave requests from all campuses
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-1 mb-6">
        <div className="flex">
          <button
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "pending"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Requests
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
              {pendingCount}
            </span>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "history"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Leave History
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
              {historyCount}
            </span>
          </button>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {activeTab === "pending" ? (
          <p className="text-gray-600">Pending leave requests will show here.</p>
        ) : (
          <p className="text-gray-600">Leave history will show here.</p>
        )}
      </div>
    </div>
  );
};

export default TrackLeave;
