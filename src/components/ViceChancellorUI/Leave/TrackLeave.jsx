import { useNavigate } from "react-router-dom";
import { apiRequestAxios } from '../../../utils/api';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchLeaves = async (type) => {
  const token = sessionStorage.getItem("access_token");
  const url =
    type === "pending"
      ? "http://134.209.144.96:8081/superadmin/get-leave-requests"
      : "http://134.209.144.96:8081/superadmin/get-leave-requests-history";

  const { data } = await apiRequestAxios({ url, method: 'GET' });

  return data.data;
};

const TrackLeave = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  const {
    data: pendingLeaves = [],
    isLoading: pendingLoading,
    isError: pendingError,
  } = useQuery({
    queryKey: ["leaves", "pending"],
    queryFn: () => fetchLeaves("pending"),
  });

  const {
    data: historyLeaves = [],
    isLoading: historyLoading,
    isError: historyError,
  } = useQuery({
    queryKey: ["leaves", "history"],
    queryFn: () => fetchLeaves("history"),
  });

  const getColor = (status) => {
    if (status === "Approved") return "green";
    if (status === "Rejected") return "red";
    if (status === "Pending") return "gray";
    return "gray";
  };

  const renderLeaveCard = (leave) => {
    const color = getColor(leave.status);
    return (
      <div 
        key={leave._id} 
        className="bg-white p-4 rounded-lg shadow-md flex items-center cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigate(`/leave-details/${leave._id}`)}
      >
        <div className={`w-1.5 h-full bg-${color}-500 rounded-l-lg`}></div>
        <img 
          src={leave.user_id?.picture || "https://via.placeholder.com/50"} 
          alt="Profile" 
          className="w-12 h-12 rounded-full mx-3 object-cover"
        />
        <div className="flex-grow">
          <h4 className="text-sm font-semibold">{leave.user_id?.name}</h4>
          <p className="text-xs text-gray-500">{leave.user_id?.campus?.name}</p>
          <p className="text-xs font-semibold text-gray-600">{leave.leave_type}</p>
          <p className="text-xs text-gray-500">📅 {leave.start_date} ⬇️ 📅 {leave.end_date}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-bold text-white bg-${color}-500 rounded-md`}>
          {leave.status}
        </span>
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex bg-gray-200 p-1 rounded-lg mb-4">
        <button
          className={`flex-1 py-2 rounded-lg ${
            activeTab === "pending" ? "bg-white shadow-md font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`flex-1 py-2 rounded-lg ${
            activeTab === "history" ? "bg-white shadow-md font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {activeTab === "pending" && (
        <div>
          <h2 className="text-md font-semibold">Pending Leave Requests</h2>
          <p className="text-sm font-medium mt-1">Total: {pendingLeaves.length}</p>
          <div className="space-y-3 mt-3">
            {pendingLoading ? (
              <p>Loading...</p>
            ) : pendingError ? (
              <p className="text-red-500">Failed to load pending requests.</p>
            ) : (
              pendingLeaves.map(renderLeaveCard)
            )}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <h2 className="text-md font-semibold">Leave History (Approved/Rejected)</h2>
          <p className="text-sm font-medium mt-1">Total: {historyLeaves.length}</p>
          <div className="space-y-3 mt-3">
            {historyLoading ? (
              <p>Loading...</p>
            ) : historyError ? (
              <p className="text-red-500">Failed to load leave history.</p>
            ) : (
              historyLeaves.map(renderLeaveCard)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackLeave;
