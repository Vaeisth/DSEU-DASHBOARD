import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLeavesAdmin } from "../../utils/apiservice";
import {  FaSearch, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { format } from "date-fns";

const TrackLeave = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");


   const {
    data: pendingLeaves = [],
    isLoading: pendingLoading,
    isError: pendingError,
  } = useQuery({
    queryKey: ["leaves", "pending"],
    queryFn: () => fetchLeavesAdmin("pending"),
  });

  const {
    data: historyLeaves = [],
    isLoading: historyLoading,
    isError: historyError,
  } = useQuery({
    queryKey: ["leaves", "history"],
    queryFn: () => fetchLeavesAdmin("history"),
  });

    const filterLeaves = (leaves) => {
    return leaves.filter((leave) => {
      const matchesSearch = leave.user_id?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          leave.user_id?.campus?.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCampus = selectedCampus === "all" || leave.user_id?.campus?.name === selectedCampus;
      const matchesDate = !selectedDate || leave.start_date === selectedDate;
      return matchesSearch && matchesCampus && matchesDate;
    });
  };

   const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderLeaveCard = (leave) => {
    const statusColor = getStatusColor(leave.status);
  
  
     return (
          <div
            key={leave._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => navigate(`/leave-details/${leave._id}`)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={leave.user_id?.picture || "https://via.placeholder.com/50"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{leave.user_id?.name}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaBuilding className="mr-1" />
                      <span>{leave.user_id?.campus?.name}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColor}`}>
                  {leave.status}
                </span>
              </div>
    
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <span className={`font-medium `}>{leave.leave_type}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  <span>{format(new Date(leave.start_date), "MMM dd, yyyy")} - {format(new Date(leave.end_date), "MMM dd, yyyy")}</span>
                </div>
              </div>
            </div>
          </div>
        );
      };

  return (
   <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
        <p className="text-gray-500 mt-1">Track and manage leave requests from all campuses</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or campus..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
            >
              <option value="all">All Campuses</option>
              {/* Add campus options dynamically */}
            </select>
            <input
              type="date"
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
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
              {pendingLeaves.length}
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
              {historyLeaves.length}
            </span>
          </button>
        </div>
      </div>

      {/* Leave Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === "pending" ? (
          pendingLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading pending requests...</p>
            </div>
          ) : pendingError ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-500">Failed to load pending requests</p>
            </div>
          ) : filterLeaves(pendingLeaves).length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No pending leave requests found</p>
            </div>
          ) : (
            filterLeaves(pendingLeaves).map(renderLeaveCard)
          )
        ) : (
          historyLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading leave history...</p>
            </div>
          ) : historyError ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-500">Failed to load leave history</p>
            </div>
          ) : filterLeaves(historyLeaves).length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No leave history found</p>
            </div>
          ) : (
            filterLeaves(historyLeaves).map(renderLeaveCard)
          )
        )}
      </div>
    </div>
  );
};

export default TrackLeave;
