import { useState } from "react";

const TrackLeave = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="px-2">
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-3xl text-[#222] font-bold">Leave Management</h2>
        <p className="text-lg text-[#333]">
          Track and manage leave requests from all campuses
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 text-lg font-medium ${
            activeTab === "pending"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Pending Requests
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-2 text-lg font-medium ${
            activeTab === "history"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Leave History
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "pending" ? (
          <div>Show Pending Requests Table or List here</div>
        ) : (
          <div>Show Leave History Table or List here</div>
        )}
      </div>
    </div>
  );
};

export default TrackLeave;
