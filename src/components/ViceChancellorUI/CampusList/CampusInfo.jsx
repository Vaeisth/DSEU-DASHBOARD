import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { API_ENDPOINTS } from '../../../config/api.config';
import { FaMapMarkerAlt, FaBuilding, FaInfoCircle, FaPhone, FaEnvelope, FaGlobe, FaTrash } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";


const fetchCampusDetails = async (campusId) => {
  if (!campusId) {
    throw new Error('Campus ID is required');
  }

  try {
    const response = await apiRequestAxios({ 
      endpoint: API_ENDPOINTS.ALL_CAMPUSES,
      method: 'GET' 
    });
    
    if (!response.data || !response.data.data) {
      throw new Error('Invalid API response format');
    }

    const campus = response.data.data.find(c => c._id === campusId);
    
    if (!campus) {
      throw new Error(`Campus with ID ${campusId} not found`);
    }
    
    return campus;
  } catch (error) {
    console.error('Error fetching campus details:', error);
    throw error;
  }
};

const CampusInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: campus, isLoading, isError, error } = useQuery({
    queryKey: ["campus", id],
    queryFn: () => fetchCampusDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const deleteCampusMutation = useMutation({
    mutationFn: async () => {
      if (!campus?.campus_id) {
        throw new Error('Campus ID not found');
      }
      const response = await apiRequestAxios({
        endpoint: `${API_ENDPOINTS.DELETE_CAMPUS}/${campus.campus_id}`,
        method: 'DELETE'
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["campuses"]);
      setShowDeleteModal(false);
      // Navigate back to the campus list
      setTimeout(() => {
        navigate(-1);
      }, 100);
      showSuccessToast("Campus Deleted")
    },
    onError: (error) => {
      console.error(error.response?.data?.message || "Failed to approve leave request");
      showErrorToast("Failed");
    }
  });

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteCampusMutation.isLoading) {
      deleteCampusMutation.mutate();
    }
  };

  // If no ID is provided, show error and redirect
  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Invalid Campus ID</h3>
          <p className="text-gray-600 mb-4">No campus ID provided in the URL.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600">Loading campus information...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Campus Details</h3>
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

  if (!campus) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Campus Details</h2>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <FaTrash className="w-4 h-4" />
              Delete Campus
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-50 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this campus? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={deleteCampusMutation.isLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={deleteCampusMutation.isLoading}
              >
                {deleteCampusMutation.isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campus Header */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex justify-center">
              <div className="relative -mt-16">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <FaBuilding className="w-16 h-16 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">{campus.name}</h2>
              <p className="text-gray-600 mt-1">{campus.zone}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaInfoCircle className="mr-2 text-blue-500" />
                About Campus
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-600">{campus.description || "No description available."}</p>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                Location Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Address</label>
                  <p className="text-gray-800">{campus.address || "Address not provided"}</p>
                </div>
                {campus.geo_boundary && campus.geo_boundary.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-500 block mb-2">Boundary Coordinates</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {campus.geo_boundary.map((coord, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Point {index + 1}</div>
                          <div className="text-gray-800">
                            <div>Longitude: {coord[0]}</div>
                            <div>Latitude: {coord[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Campus Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Campus Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaBuilding className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Campus ID: {campus.campus_id}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Zone: {campus.zone}</span>
                </div>
              </div>
            </div>

            {/* Boundary Points */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Boundary Points</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Total Points: {campus.geo_boundary?.length || 0}</div>
                <div className="text-sm text-gray-600">Coordinates define the campus boundary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusInfo;
