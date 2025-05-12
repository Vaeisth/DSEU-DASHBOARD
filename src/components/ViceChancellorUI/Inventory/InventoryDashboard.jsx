import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, FaClock, FaBoxOpen } from "react-icons/fa";
import { format } from "date-fns";

const fetchInventoryCounts = async () => {
  const response = await apiRequestAxios({ 
    url: 'http://134.209.144.96:8081/vc/counts',
    method: 'GET'
  });
  return response.data;
};

const fetchInventoryRequests = async (status) => {
  const response = await apiRequestAxios({ 
    url: `http://134.209.144.96:8081/vc/all_${status.toLowerCase()}`,
    method: 'GET'
  });
  return response.data;
};

const InventoryDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCampuses, setSelectedCampuses] = useState([]);

  const { data: counts, isLoading: countsLoading } = useQuery({
    queryKey: ["inventoryCounts"],
    queryFn: fetchInventoryCounts
  });

  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ["inventoryRequests", activeTab],
    queryFn: () => fetchInventoryRequests(activeTab)
  });

  const filteredRequests = requests?.filter(request => {
    const matchesSearch = request.campus_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.items.some(item => item.item_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCampus = selectedCampuses.length === 0 || selectedCampuses.includes(request.campus_name);
    return matchesSearch && matchesCampus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <FaCheckCircle className="mr-1" />;
      case "rejected":
        return <FaTimesCircle className="mr-1" />;
      default:
        return <FaClock className="mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Manage and track inventory requests across all campuses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{counts?.Pending || 0}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved Requests</p>
              <p className="text-2xl font-bold text-green-600">{counts?.Approved || 0}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rejected Requests</p>
              <p className="text-2xl font-bold text-red-600">{counts?.Rejected || 0}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <FaTimesCircle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex space-x-2">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FaFilter />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Drawer */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Filter Requests</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campus</label>
                <div className="space-y-2">
                  {["Ambedkar DSEU Campus - 1", "BhaiParamanand DSEU Campus"].map((campus) => (
                    <label key={campus} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCampuses.includes(campus)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCampuses([...selectedCampuses, campus]);
                          } else {
                            setSelectedCampuses(selectedCampuses.filter(c => c !== campus));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{campus}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedCampuses([]);
                  setShowFilter(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requestsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : filteredRequests?.length === 0 ? (
          <div className="text-center py-12">
            <FaBoxOpen className="mx-auto text-gray-400 text-4xl mb-4" />
            <p className="text-gray-600">No requests found</p>
          </div>
        ) : (
          filteredRequests?.map((request) => (
            <div
              key={request.request_id}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4">
                {/* Requested Items Section */}
                <div className="space-y-3">
                  {request.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <FaBoxOpen className="text-blue-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{item.item_name}</h3>
                          <p className="text-sm text-gray-500">Requested by {request.campus_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="text-xl font-bold text-blue-600">{item.qty}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Request Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  <div className="flex items-center gap-4">
                    <span>Request ID: #{request.request_id}</span>
                    <span>•</span>
                    <span>Requested on {format(new Date(request.date_of_request), "MMM dd, yyyy")}</span>
                  </div>
                  {request.reason && (
                    <p className="text-sm text-gray-600">Reason: {request.reason}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryDashboard; 