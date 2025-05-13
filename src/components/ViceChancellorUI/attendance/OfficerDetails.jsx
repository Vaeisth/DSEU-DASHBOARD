import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { FaArrowLeft, FaMapMarkerAlt, FaBuilding, FaUserTie, FaClock, FaCalendarAlt } from "react-icons/fa";
import { API_ENDPOINTS } from "../../../config/api.config";
import placeholder from "../../../assets/placeholder-pfp.jpg";


const fetchOfficerDetails = async (officerId) => {
  const { data } = await apiRequestAxios({ 
    endpoint: API_ENDPOINTS.ALL_ON_DUTY_USERS,
    method: "GET", 
  });
  
  const officer = data.data.find(o => o._id === officerId);
  if (!officer) {
    throw new Error('Officer not found');
  }
  return officer;
};

const OfficerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: officer, isLoading, isError, error } = useQuery({
    queryKey: ["officerDetails", id],
    queryFn: () => fetchOfficerDetails(id),
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600">Loading officer details...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Officer Details</h3>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  if (!officer) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Officer Details</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Officer Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex justify-center">
              <div className="relative -mt-16">
                <img
                  src={officer.link_id?.picture || "https://via.placeholder.com/150"}
                  alt={officer.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">{officer.name}</h2>
              <p className="text-gray-600 mt-1">{officer.link_id?.designation?.[0] || "No Designation"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaClock className="mr-2 text-blue-500" />
                Current Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium text-green-700">On Duty</span>
                  </div>
                  <span className="text-sm text-gray-600">{officer.Date}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Punch In Time</p>
                    <p className="font-medium text-gray-800">{officer.punch_in_time || "Not recorded"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Punch Out Time</p>
                    <p className="font-medium text-gray-800">{officer.punch_out_time || "Not recorded"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                Location Details
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Location Status</p>
                  <p className="font-medium text-gray-800">
                    {officer.location_status ? "Within Campus" : "Outside Campus"}
                  </p>
                </div>
                {officer.total_out_of_bound_time_in_minutes > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Time Outside Campus</p>
                    <p className="font-medium text-gray-800">
                      {officer.total_out_of_bound_time_in_minutes} minutes
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Additional Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaBuilding className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{officer.link_id?.campus?.name || "No Campus"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUserTie className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{officer.link_id?.staff_type || "No Staff Type"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Date: {officer.Date}</span>
                </div>
              </div>
            </div>

            {/* Remarks Section */}
            {officer.remarks && (
              <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Remarks</h3>
                <p className="text-gray-600">{officer.remarks}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDetails; 